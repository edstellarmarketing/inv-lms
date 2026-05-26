import { NextResponse, type NextRequest } from "next/server";
import { addComment, NewCommentSchema } from "@/lib/feedback-store";
import { getActor, handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = NewCommentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const actor = getActor(req);
  return handle(() => addComment(parsed.data, actor));
}
