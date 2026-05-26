import { NextResponse, type NextRequest } from "next/server";
import { deleteComment, editComment, EditCommentSchema } from "@/lib/feedback-store";
import { getActor, handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json().catch(() => null);
  const parsed = EditCommentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const actor = getActor(req);
  return handle(() => editComment(params.id, parsed.data.text, actor));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const actor = getActor(req);
  return handle(async () => {
    await deleteComment(params.id, actor);
    return { ok: true };
  });
}
