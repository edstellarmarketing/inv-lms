import type { NextRequest } from "next/server";
import { getStore } from "@/lib/feedback-store";
import { handle } from "@/lib/feedback-http";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  return handle(() => getStore());
}
