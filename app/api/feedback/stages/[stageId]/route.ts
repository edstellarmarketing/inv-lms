import { NextResponse, type NextRequest } from "next/server";
import { setStageStatus, StageStatusSchema } from "@/lib/feedback-store";
import { getActor, handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { stageId: string } },
) {
  if (!/^chapter-[\w-]+$/.test(params.stageId)) {
    return NextResponse.json({ error: "Invalid stageId" }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  const parsed = StageStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const actor = getActor(req);
  return handle(() => setStageStatus(params.stageId, parsed.data, actor));
}
