import { ulid } from "ulid";
import { z } from "zod";
import { getDriver } from "./feedback-driver";
import type { Comment, Stage, Store } from "./feedback-types";

export type { Comment, Stage, Store, StageStatus } from "./feedback-types";

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
  status: z.enum(["approved", "changes_required", "pending"]),
  statusNote: z.string().max(500).nullable().optional(),
  title: z.string().max(200).optional(),
});

export const ResolveSchema = z.object({
  resolutionNote: z.string().max(500).nullable().optional(),
});

export type Actor = { email: string; name: string };

export async function getStore(): Promise<Store> {
  return getDriver().read();
}

export async function addComment(
  input: z.infer<typeof NewCommentSchema>,
  actor: Actor,
): Promise<Comment> {
  const driver = getDriver();
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
  await driver.putComment(comment);
  await driver.appendAudit({
    kind: "comment_create",
    commentId: comment.id,
    stageId: comment.stageId,
    stepId: comment.stepId,
    actor: actor.email,
  });
  return comment;
}

export async function editComment(
  id: string,
  text: string,
  actor: Actor,
): Promise<Comment> {
  const driver = getDriver();
  const c = await driver.getComment(id);
  if (!c) throw new HttpError(404, "Comment not found");
  if (c.author !== actor.email) throw new HttpError(403, "Not your comment");
  c.text = text.trim();
  c.updatedAt = new Date().toISOString();
  c.edited = true;
  await driver.putComment(c);
  await driver.appendAudit({ kind: "comment_edit", commentId: c.id, actor: actor.email });
  return c;
}

export async function deleteComment(id: string, actor: Actor): Promise<void> {
  const driver = getDriver();
  const c = await driver.getComment(id);
  if (!c) throw new HttpError(404, "Comment not found");
  if (c.author !== actor.email) throw new HttpError(403, "Not your comment");
  await driver.removeComment(id);
  await driver.appendAudit({ kind: "comment_delete", commentId: id, actor: actor.email });
}

export async function resolveComment(
  id: string,
  note: string | null | undefined,
  actor: Actor,
): Promise<Comment> {
  const driver = getDriver();
  const c = await driver.getComment(id);
  if (!c) throw new HttpError(404, "Comment not found");
  c.resolved = true;
  c.resolvedBy = actor.email;
  c.resolvedByName = actor.name;
  c.resolvedAt = new Date().toISOString();
  c.resolutionNote = note?.trim() || null;
  await driver.putComment(c);
  await driver.appendAudit({
    kind: "comment_resolve",
    commentId: c.id,
    actor: actor.email,
    note: c.resolutionNote,
  });
  return c;
}

export async function reopenComment(id: string, actor: Actor): Promise<Comment> {
  const driver = getDriver();
  const c = await driver.getComment(id);
  if (!c) throw new HttpError(404, "Comment not found");
  c.resolved = false;
  c.resolvedBy = null;
  c.resolvedByName = null;
  c.resolvedAt = null;
  c.resolutionNote = null;
  await driver.putComment(c);
  await driver.appendAudit({ kind: "comment_reopen", commentId: c.id, actor: actor.email });
  return c;
}

export async function setStageStatus(
  stageId: string,
  input: z.infer<typeof StageStatusSchema>,
  actor: Actor,
): Promise<Stage> {
  const driver = getDriver();
  const prevStage = await driver.getStage(stageId);
  const prev = prevStage?.status ?? "pending";
  const stage: Stage = {
    title: input.title ?? prevStage?.title,
    status: input.status,
    statusBy: actor.email,
    statusByName: actor.name,
    statusAt: new Date().toISOString(),
    statusNote: input.statusNote?.trim() || null,
  };
  await driver.putStage(stageId, stage);
  await driver.appendAudit({
    kind: "stage_status",
    stageId,
    from: prev,
    to: input.status,
    actor: actor.email,
    note: stage.statusNote,
  });
  return stage;
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
