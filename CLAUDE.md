# CLAUDE.md

Invensis LMS prototype (Next.js 14, App Router, port 4001). The static walkthrough lives at `public/userjourney.html`.

## Acting on user-journey review feedback

The evaluation teams review `public/userjourney.html` in the browser using the feedback widget
(`public/feedback-widget.js` + `.css`). Their comments and stage decisions are stored via a
storage driver (`lib/feedback-driver.ts`):

- **Production / any env with Upstash (Vercel KV) vars** → **Upstash Redis** is the source of truth.
  Vars: `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL`/`KV_REST_API_TOKEN`).
- **Local dev (no Redis vars)** → `data/feedback.json` + `data/feedback-audit.log` (the committed file
  is only the local store / seed, **not** the production data).

**To read the real feedback the teams entered, always go through the API, not the committed file:**
`GET <deployment>/api/feedback` (e.g. `https://inv-lms.vercel.app/api/feedback`). The widget's
"Copy for Claude" button produces the same punch list from live state.

**Trigger phrases** — when the user says any of these, run the workflow below:
- "apply feedback", "fix feedback", "resolve open comments", "action the review"
- "what's in feedback.json", "summarise the review", "show me the feedback"
- "fix changes-required stages"

**Workflow:**
1. **Read the live store.** In production use WebFetch on `<deployment>/api/feedback`. Locally, read
   `data/feedback.json`. (Same JSON shape either way.)
2. **Build a punch list**: every stage whose `status === "changes_required"` (use `statusNote`),
   and every comment whose `resolved === false` (grouped by `stageId` / `stepId`).
3. **Confirm scope** with the user before editing — some comments are questions for a PM, not
   code changes. Separate "will fix" from "needs a human decision".
4. **Make the edits** in `public/userjourney.html` (or whichever source a comment points at).
   The visible chapter numbers map to stage IDs: chapter "1" → `chapter-1`; the pass/fail branch →
   `chapter-fork`. Step IDs match the visible `1.2`, `7.3` numbering.
5. **Mark each fixed comment resolved** so reviewers see the loop close:
   ```
   POST /api/feedback/comments/<id>/resolve   body: { "resolutionNote": "<what you changed + file>" }
   ```
   Server runs at `http://localhost:4001`. If the dev server isn't running, instead set the
   comment's `resolved`/`resolvedAt`/`resolutionNote` fields directly in `data/feedback.json`
   (the file is the source of truth) and note that you edited it directly.
6. Leave `changes_required` stage statuses **as-is** — approval is a human signal. Don't flip a
   stage to `approved` yourself.

## Data model

Store shape: `{ version, updatedAt, stages: { [stageId]: {...} }, comments: [ {...} ] }`.
Types in `lib/feedback-types.ts`, request validation (Zod) in `lib/feedback-store.ts`. Comment
`author` is a stable per-browser id (e.g. `rv_abc123`), not an email — `authorName` is the display
name. In Redis the data lives in two hashes (`feedback:comments`, `feedback:stages`) plus an
append-only audit list (`feedback:audit`).

## Run

```
npm install      # @upstash/redis, proper-lockfile, ulid, zod
npm run dev      # http://localhost:4001/userjourney.html  (uses data/feedback.json, no Redis needed)
```

## Production storage (Vercel)

The deployed filesystem is read-only, so production must use Redis. Provision **Upstash Redis** via
the Vercel Marketplace (Storage tab) and attach it to the project — it injects the env vars above.
No code change is needed to switch; `lib/feedback-driver.ts` picks Redis automatically when the vars
are present. Redeploy after attaching.
