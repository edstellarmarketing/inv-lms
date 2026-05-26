import { promises as fs } from "fs";
import path from "path";
import lockfile from "proper-lockfile";
import { Redis } from "@upstash/redis";
import type { Comment, Stage, Store } from "./feedback-types";

/**
 * Storage abstraction for the feedback feature.
 * - Production (and any env with Upstash/Vercel-KV vars): RedisDriver.
 * - Local dev (no Redis env): FileDriver writing data/feedback.json.
 *
 * Comments and stages are stored as independent hash fields in Redis, so
 * concurrent writers touching different comments/stages never collide and no
 * distributed lock is needed. The file driver keeps the lockfile + atomic
 * write it had before (single-machine dev use).
 */

export interface FeedbackDriver {
  read(): Promise<Store>;
  getComment(id: string): Promise<Comment | null>;
  putComment(c: Comment): Promise<void>;
  removeComment(id: string): Promise<void>;
  getStage(id: string): Promise<Stage | null>;
  putStage(id: string, s: Stage): Promise<void>;
  appendAudit(entry: Record<string, unknown>): Promise<void>;
}

function emptyStore(): Store {
  return { version: 1, updatedAt: new Date().toISOString(), stages: {}, comments: [] };
}

// ---------- Redis ----------

const K_COMMENTS = "feedback:comments";
const K_STAGES = "feedback:stages";
const K_AUDIT = "feedback:audit";
const K_UPDATED = "feedback:updatedAt";

function redisEnv(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
  if (url && token) return { url, token };
  return null;
}

class RedisDriver implements FeedbackDriver {
  private redis: Redis;
  constructor(env: { url: string; token: string }) {
    this.redis = new Redis({ url: env.url, token: env.token });
  }

  async read(): Promise<Store> {
    const [commentsMap, stagesMap, updatedAt] = await Promise.all([
      this.redis.hgetall<Record<string, Comment>>(K_COMMENTS),
      this.redis.hgetall<Record<string, Stage>>(K_STAGES),
      this.redis.get<string>(K_UPDATED),
    ]);
    const comments = Object.values(commentsMap || {}).sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
    );
    return {
      version: 1,
      updatedAt: updatedAt || new Date().toISOString(),
      stages: stagesMap || {},
      comments,
    };
  }

  private async touch() {
    await this.redis.set(K_UPDATED, new Date().toISOString());
  }

  async getComment(id: string): Promise<Comment | null> {
    const c = await this.redis.hget<Comment>(K_COMMENTS, id);
    return c ?? null;
  }

  async putComment(c: Comment): Promise<void> {
    await this.redis.hset(K_COMMENTS, { [c.id]: c });
    await this.touch();
  }

  async removeComment(id: string): Promise<void> {
    await this.redis.hdel(K_COMMENTS, id);
    await this.touch();
  }

  async getStage(id: string): Promise<Stage | null> {
    const s = await this.redis.hget<Stage>(K_STAGES, id);
    return s ?? null;
  }

  async putStage(id: string, s: Stage): Promise<void> {
    await this.redis.hset(K_STAGES, { [id]: s });
    await this.touch();
  }

  async appendAudit(entry: Record<string, unknown>): Promise<void> {
    await this.redis.rpush(K_AUDIT, JSON.stringify({ ts: new Date().toISOString(), ...entry }));
  }
}

// ---------- File (local dev) ----------

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "feedback.json");
const AUDIT_PATH = path.join(DATA_DIR, "feedback-audit.log");

class FileDriver implements FeedbackDriver {
  private async ensure() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(STORE_PATH);
    } catch {
      await fs.writeFile(STORE_PATH, JSON.stringify(emptyStore(), null, 2), "utf8");
    }
    try {
      await fs.access(AUDIT_PATH);
    } catch {
      await fs.writeFile(AUDIT_PATH, "", "utf8");
    }
  }

  private async readRaw(): Promise<Store> {
    await this.ensure();
    try {
      const raw = await fs.readFile(STORE_PATH, "utf8");
      const parsed = JSON.parse(raw) as Store;
      if (!parsed || typeof parsed !== "object") return emptyStore();
      return {
        version: 1,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        stages: parsed.stages || {},
        comments: parsed.comments || [],
      };
    } catch {
      return emptyStore();
    }
  }

  private async writeRaw(store: Store): Promise<void> {
    store.updatedAt = new Date().toISOString();
    const tmp = `${STORE_PATH}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(tmp, STORE_PATH);
  }

  private async mutate<T>(fn: (s: Store) => T): Promise<T> {
    await this.ensure();
    const release = await lockfile.lock(STORE_PATH, {
      retries: { retries: 5, minTimeout: 50, maxTimeout: 300 },
      stale: 5000,
    });
    try {
      const store = await this.readRaw();
      const result = fn(store);
      await this.writeRaw(store);
      return result;
    } finally {
      await release();
    }
  }

  read(): Promise<Store> {
    return this.readRaw();
  }

  async getComment(id: string): Promise<Comment | null> {
    const s = await this.readRaw();
    return s.comments.find((c) => c.id === id) ?? null;
  }

  putComment(c: Comment): Promise<void> {
    return this.mutate((s) => {
      const i = s.comments.findIndex((x) => x.id === c.id);
      if (i === -1) s.comments.push(c);
      else s.comments[i] = c;
    });
  }

  removeComment(id: string): Promise<void> {
    return this.mutate((s) => {
      const i = s.comments.findIndex((x) => x.id === id);
      if (i > -1) s.comments.splice(i, 1);
    });
  }

  async getStage(id: string): Promise<Stage | null> {
    const s = await this.readRaw();
    return s.stages[id] ?? null;
  }

  putStage(id: string, stage: Stage): Promise<void> {
    return this.mutate((s) => {
      s.stages[id] = stage;
    });
  }

  async appendAudit(entry: Record<string, unknown>): Promise<void> {
    await this.ensure();
    const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
    await fs.appendFile(AUDIT_PATH, line, "utf8");
  }
}

// ---------- selection ----------

let cached: FeedbackDriver | null = null;

export function getDriver(): FeedbackDriver {
  if (cached) return cached;
  const env = redisEnv();
  cached = env ? new RedisDriver(env) : new FileDriver();
  return cached;
}

export function usingRedis(): boolean {
  return redisEnv() !== null;
}
