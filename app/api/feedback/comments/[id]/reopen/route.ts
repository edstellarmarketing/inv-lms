import type { NextRequest } from "next/server";
import { reopenComment } from "@/lib/feedback-store";
import { getActor, handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const actor = getActor(req);
  return handle(() => reopenComment(params.id, actor));
}
