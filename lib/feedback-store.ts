import { promises as fs } from "fs";
import path from "path";
import lockfile from "proper-lockfile";
import { ulid } from "ulid";
import { z } from "zod";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "feedback.json");
const AUDIT_PATH = path.join(DATA_DIR, "feedback-audit.log");

const STAGE_STATUS = z.enum(["approved", "changes_required", "pending"]);
export type StageStatus = z.infer<typeof STAGE_STATUS>;

const StageSchema = z.object({
  title: z.string().optional(),
  status: STAGE_STATUS,
  statusBy: z.string().nullable(),
  statusByName: z.string().nullable(),
  statusAt: z.string().nullable(),
  statusNote: z.string().nullable(),
});

const CommentSchema = z.object({
  id: z.string(),
  scope: z.enum(["step", "stage"]),
  stageId: z.string(),
  stepId: z.string().nullable(),
  text: z.string().min(1).max(2000),
  author: z.string(),
  authorName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  edited: z.boolean(),
  resolved: z.boolean(),
  resolvedBy: z.string().nullable(),
  resolvedByName: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  resolutionNote: z.string().nullable(),
});
export type Comment = z.infer<typeof CommentSchema>;
export type Stage = z.infer<typeof StageSchema>;

const StoreSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string(),
  stages: z.record(StageSchema),
  comments: z.array(CommentSchema),
});
export type Store = z.infer<typeof StoreSchema>;

export const NewCommentSchema = z.object({
  scope: z.enum(["step", "stage"]),
  stageId: z.string().regex(/^chapter-[\w-]+$/),
  stepId: z
    .string()
    .regex(/^\d+\.\d+$/)
    .nullable()
    .optional(),
  text: z.string().min(1).max(2000),
});

export const EditCommentSchema = z.object({
  text: z.string().min(1).max(2000),
});

export const StageStatusSchema = z.object({
  status: STAGE_STATUS,
  statusNote: z.string().max(500).nullable().optional(),
  title: z.string().max(200).optional(),
});

export const ResolveSchema = z.object({
  resolutionNote: z.string().max(500).nullable().optional(),
});

async function ensureFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    const seed: Store = {
      version: 1,
      updatedAt: new Date().toISOString(),
      stages: {},
      comments: [],
    };
    await fs.writeFile(STORE_PATH, JSON.stringify(seed, null, 2), "utf8");
  }
  try {
    await fs.access(AUDIT_PATH);
  } catch {
    await fs.writeFile(AUDIT_PATH, "", "utf8");
  }
}

async function readStore(): Promise<Store> {
  await ensureFiles();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { version: 1, updatedAt: new Date().toISOString(), stages: {}, comments: [] };
  }
  const result = StoreSchema.safeParse(parsed);
  if (!result.success) {
    return { version: 1, updatedAt: new Date().toISOString(), stages: {}, comments: [] };
  }
  return result.data;
}

async function writeStoreAtomic(store: Store): Promise<void> {
  store.updatedAt = new Date().toISOString();
  const tmp = `${STORE_PATH}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
  await fs.rename(tmp, STORE_PATH);
}

async function appendAudit(entry: Record<string, unknown>): Promise<void> {
  const line = JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
  await fs.appendFile(AUDIT_PATH, line, "utf8");
}

async function withLock<T>(fn: (store: Store) => Promise<{ store: Store; result: T }>): Promise<T> {
  await ensureFiles();
  const release = await lockfile.lock(STORE_PATH, {
    retries: { retries: 5, minTimeout: 50, maxTimeout: 300 },
    stale: 5000,
  });
  try {
    const store = await readStore();
    const { store: next, result } = await fn(store);
    await writeStoreAtomic(next);
    return result;
  } finally {
    await release();
  }
}

export async function getStore(): Promise<Store> {
  return readStore();
}

export type Actor = { email: string; name: string };

export async function addComment(
  input: z.infer<typeof NewCommentSchema>,
  actor: Actor,
): Promise<Comment> {
  return withLock(async (store) => {
    const now = new Date().toISOString();
    const comment: Comment = {
      id: `cmt_${ulid()}`,
      scope: input.scope,
      stageId: input.stageId,
      stepId: input.scope === "step" ? input.stepId ?? null : null,
      text: input.text.trim(),
      author: actor.email,
      authorName: actor.name,
      createdAt: now,
      updatedAt: now,
      edited: false,
      resolved: false,
      resolvedBy: null,
      resolvedByName: null,
      resolvedAt: null,
      resolutionNote: null,
    };
    store.comments.push(comment);
    await appendAudit({
      kind: "comment_create",
      commentId: comment.id,
      stageId: comment.stageId,
      stepId: comment.stepId,
      actor: actor.email,
    });
    return { store, result: comment };
  });
}

export async function editComment(
  id: string,
  text: string,
  actor: Actor,
): Promise<Comment> {
  return withLock(async (store) => {
    const idx = store.comments.findIndex((c) => c.id === id);
    if (idx === -1) throw new HttpError(404, "Comment not found");
    const c = store.comments[idx];
    if (c.author !== actor.email) throw new HttpError(403, "Not your comment");
    c.text = text.trim();
    c.updatedAt = new Date().toISOString();
    c.edited = true;
    await appendAudit({
      kind: "comment_edit",
      commentId: c.id,
      actor: actor.email,
    });
    return { store, result: c };
  });
}

export async function deleteComment(id: string, actor: Actor): Promise<void> {
  return withLock(async (store) => {
    const idx = store.comments.findIndex((c) => c.id === id);
    if (idx === -1) throw new HttpError(404, "Comment not found");
    const c = store.comments[idx];
    if (c.author !== actor.email) throw new HttpError(403, "Not your comment");
    store.comments.splice(idx, 1);
    await appendAudit({
      kind: "comment_delete",
      commentId: id,
      actor: actor.email,
    });
    return { store, result: undefined };
  });
}

export async function resolveComment(
  id: string,
  note: string | null | undefined,
  actor: Actor,
): Promise<Comment> {
  return withLock(async (store) => {
    const c = store.comments.find((c) => c.id === id);
    if (!c) throw new HttpError(404, "Comment not found");
    c.resolved = true;
    c.resolvedBy = actor.email;
    c.resolvedByName = actor.name;
    c.resolvedAt = new Date().toISOString();
    c.resolutionNote = note?.trim() || null;
    await appendAudit({
      kind: "comment_resolve",
      commentId: c.id,
      actor: actor.email,
      note: c.resolutionNote,
    });
    return { store, result: c };
  });
}

export async function reopenComment(id: string, actor: Actor): Promise<Comment> {
  return withLock(async (store) => {
    const c = store.comments.find((c) => c.id === id);
    if (!c) throw new HttpError(404, "Comment not found");
    c.resolved = false;
    c.resolvedBy = null;
    c.resolvedByName = null;
    c.resolvedAt = null;
    c.resolutionNote = null;
    await appendAudit({
      kind: "comment_reopen",
      commentId: c.id,
      actor: actor.email,
    });
    return { store, result: c };
  });
}

export async function setStageStatus(
  stageId: string,
  input: z.infer<typeof StageStatusSchema>,
  actor: Actor,
): Promise<Stage> {
  return withLock(async (store) => {
    const prev = store.stages[stageId]?.status ?? "pending";
    const stage: Stage = {
      title: input.title ?? store.stages[stageId]?.title,
      status: input.status,
      statusBy: actor.email,
      statusByName: actor.name,
      statusAt: new Date().toISOString(),
      statusNote: input.statusNote?.trim() || null,
    };
    store.stages[stageId] = stage;
    await appendAudit({
      kind: "stage_status",
      stageId,
      from: prev,
      to: input.status,
      actor: actor.email,
      note: stage.statusNote,
    });
    return { store, result: stage };
  });
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
