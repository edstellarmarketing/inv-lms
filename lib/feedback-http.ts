import { NextResponse, type NextRequest } from "next/server";
import { HttpError, type Actor } from "./feedback-store";

export function getActor(req: NextRequest): Actor {
  const name =
    (req.headers.get("x-reviewer-name") || "").trim() ||
    "Anonymous Reviewer";
  const email =
    (req.headers.get("x-reviewer-email") || "").trim() ||
    `${slug(name)}@local`;
  return { name, email };
}

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "anonymous"
  );
}

export function ok<T>(data: T): NextResponse {
  return NextResponse.json(data, { status: 200 });
}

export function created<T>(data: T): NextResponse {
  return NextResponse.json(data, { status: 201 });
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export async function handle<T>(
  fn: () => Promise<T>,
): Promise<NextResponse> {
  try {
    const result = await fn();
    return ok(result);
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("[feedback] error", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
