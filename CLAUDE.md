# CLAUDE.md

Invensis LMS prototype (Next.js 14, App Router, port 4001). The static walkthrough lives at `public/userjourney.html`.

## Acting on user-journey review feedback

The evaluation teams review `public/userjourney.html` in the browser using the feedback widget
(`public/feedback-widget.js` + `.css`). Their comments and stage decisions are stored in
**`data/feedback.json`** (committed to git) with an append-only audit trail in
`data/feedback-audit.log`.

**Trigger phrases** — when the user says any of these, run the workflow below:
- "apply feedback", "fix feedback", "resolve open comments", "action the review"
- "what's in feedback.json", "summarise the review", "show me the feedback"
- "fix changes-required stages"

**Workflow:**
1. **Read** `data/feedback.json` with the Read tool.
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

`data/feedback.json`: `{ version, updatedAt, stages: { [stageId]: {...} }, comments: [ {...} ] }`.
Full schema and validation in `lib/feedback-store.ts`. Comment `author` is a stable per-browser
id (e.g. `rv_abc123`), not an email — `authorName` is the display name.

## Run

```
npm install      # adds proper-lockfile, ulid, zod (first run after this feature)
npm run dev      # http://localhost:4001/userjourney.html
```
