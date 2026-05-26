import { NextResponse, type NextRequest } from "next/server";
import { resolveComment, ResolveSchema } from "@/lib/feedback-store";
import { getActor, handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json().catch(() => ({}));
  const parsed = ResolveSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const actor = getActor(req);
  return handle(() =>
    resolveComment(params.id, parsed.data.resolutionNote ?? null, actor),
  );
}
