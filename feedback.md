# Feedback feature — plan for `public/userjourney.html`

**Goal.** Turn `userjourney.html` from a read-only walkthrough into a working review surface that the LMS evaluation teams (product, content, training ops, engineering) can sit in front of, comment on, approve, and ship corrections from — without anyone leaving the page.

**The two artefacts the user gets:**

1. A live in-page review UI: **per-step comments** (add / edit / delete) and **per-stage Approve / Changes required** buttons.
2. A canonical, Claude-readable file (`data/feedback.json`) that captures every decision and comment so Claude can sit down later, read it, and execute the fixes deterministically.

---

## 1. Scope

| Surface | What gets feedback controls |
|---|---|
| `public/userjourney.html` | Each of the 13 chapters (stages) + each `.step` article inside them (≈ 35 steps). The branch fork (pass / fail block) is treated as a single stage. |
| The two banner blocks (Story 2 banner, Hero) | Stage-level only — no per-step granularity. |
| `flowchart.html` / `flowd.html` | **Out of scope for v1.** Same pattern can be applied later by including the same script + adding stable IDs. |

We are **not** rewriting `userjourney.html` as a React component. The page stays static; we sprinkle behaviour on top. That keeps the diff small and the file still openable in isolation.

---

## 2. Architecture at a glance

```
┌────────────────────────────────────────────────────────────────────┐
│  public/userjourney.html  (the existing page, lightly modified)    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  + <script src="/feedback-widget.js">                        │  │
│  │  + data-stage-id / data-step-id attributes on each section   │  │
│  │  + a floating "Review mode" toggle in the header             │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬──────────────────────────────────────┘
                              │  fetch
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  Next.js API routes                                                │
│    GET    /api/feedback                  → full state              │
│    POST   /api/feedback/comments         → add comment             │
│    PATCH  /api/feedback/comments/:id     → edit                    │
│    DELETE /api/feedback/comments/:id     → delete                  │
│    PUT    /api/feedback/stages/:stageId  → set approval status     │
│    POST   /api/feedback/comments/:id/resolve → mark resolved       │
└─────────────────────────────┬──────────────────────────────────────┘
                              │  read/write
                              ▼
┌────────────────────────────────────────────────────────────────────┐
│  data/feedback.json   (canonical store — committed to repo)        │
│  Claude reads this file directly when asked to act on feedback.    │
└────────────────────────────────────────────────────────────────────┘
```

**Why a JSON file in the repo instead of a database?**
- The review is a finite team activity — a few dozen reviewers, low write rate. SQLite or Postgres is overkill.
- It needs to be readable by Claude with the Read tool. A flat JSON file makes that trivial.
- Committing it to the repo gives free history, diff review, and PR-based audit trail.
- File-locking risk (concurrent writes) is mitigated with a tiny mutex (`proper-lockfile` or an in-memory `Promise` queue inside the API route) — see §9.

---

## 3. Data model — `data/feedback.json`

```jsonc
{
  "version": 1,
  "updatedAt": "2026-05-26T11:42:08.000Z",
  "stages": {
    "chapter-1": {
      "title": "Vijay buys PMP® Gold",
      "status": "changes_required",        // approved | changes_required | pending
      "statusBy": "vijay@edstellar.com",
      "statusAt": "2026-05-26T11:40:00.000Z",
      "statusNote": "Pricing copy needs legal sign-off"
    },
    "chapter-2": { "status": "approved", "statusBy": "…", "statusAt": "…" }
    // …
  },
  "comments": [
    {
      "id": "cmt_01HXYZ…",
      "scope": "step",                    // step | stage
      "stageId": "chapter-1",
      "stepId": "1.2",                    // null when scope = stage
      "text": "The email subject line should match marketing's latest template.",
      "author": "vijay@edstellar.com",
      "authorName": "Vijay Kumar",
      "createdAt": "2026-05-26T11:30:11.000Z",
      "updatedAt": "2026-05-26T11:31:02.000Z",
      "resolved": false,
      "resolvedBy": null,
      "resolvedAt": null,
      "resolutionNote": null
    }
  ]
}
```

Notes:
- `id` uses ULID (sortable, no collisions) — generated server-side.
- `stageId` and `stepId` are stable strings derived from existing markup (chapter number and step number). We add `data-stage-id="chapter-1"` to each `<section class="chapter">` and `data-step-id="1.1"` to each `<article class="step">`. The IDs are content-agnostic — chapters can be reworded without breaking links.
- `resolved` is what Claude flips after applying a fix. Reviewers see a strikethrough on resolved comments and can re-open them.
- `version` lets us migrate the schema later without panicking.

---

## 4. UI changes to `userjourney.html`

### 4.1 Header — Review-mode toggle + reviewer identity

```
┌────────────────────────────────────────────────────────────────────────┐
│ ● Invensis LMS — User journey      [First purchase] [Adding a course]  │
│                                    [Flowchart] [Flow diagram]          │
│                              ─────────────────────────                 │
│                              Reviewer: Vijay Kumar ▾   [● Review mode] │
└────────────────────────────────────────────────────────────────────────┘
```

- Identity is picked up from the existing session (the LMS already authenticates users); if no session, a one-time name+email prompt stores the reviewer in `localStorage`.
- `Review mode` is a sticky toggle. When OFF, the page reads exactly as today. When ON, comment / approval affordances appear inline.

### 4.2 Stage header — Approve / Changes required

Below the existing `.chapter-header` we render a thin review strip (only visible in Review mode):

```
┌─ Chapter 1 ──────────────────────────────────────────────────────────┐
│  [1]  Vijay buys PMP® Gold                                            │
│       Off-platform · 0 minutes in                                     │
│       From invensislearning.com — picks the Gold tier...              │
├───────────────────────────────────────────────────────────────────────┤
│  💬 3 comments · Last updated by Priya · 2h ago                       │
│  ⏳ Status: Pending                                                   │
│                                                                       │
│       ┌────────────────────┐    ┌──────────────────────────────┐     │
│       │  ✓ Approve stage   │    │  ⚠ Request changes           │     │
│       └────────────────────┘    └──────────────────────────────┘     │
└───────────────────────────────────────────────────────────────────────┘
```

After clicking **Request changes**, a modal asks for a one-line reason (optional but encouraged) and the strip flips to:

```
│  ⚠ Status: Changes required  ·  by vijay@edstellar.com · just now    │
│  "Pricing copy needs legal sign-off"   [edit reason] [clear status]  │
```

After clicking **Approve**, the strip flips green:

```
│  ✓ Status: Approved  ·  by vijay@edstellar.com · just now            │
│  [clear status]                                                       │
```

Status is overwritable — the most recent decision wins, and the previous one is recorded in an audit trail (see §8).

### 4.3 Step card — inline comment thread

Each `.step` article gains a collapsible footer (only rendered in Review mode):

```
┌─ 1.2  Activation email lands in his inbox ────────────────────────────┐
│       [Email] [System · 2 minutes later]                              │
│       Subject: "Welcome to your PMP® journey — set your password"...  │
│       [▸ See the email design]                                        │
│  ─────────────────────────────────────────────────────────────────    │
│  💬 2 comments                                            [+ Add]     │
│                                                                       │
│  ┌─ Priya Sharma · 14 May 11:30 ─────────────────────────────────┐    │
│  │ Subject should reference Gold tier explicitly.                │    │
│  │                                            [Edit] [Delete] [✓]│    │
│  └───────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌─ Rohan Mehta · 15 May 09:14 ──────────────────────────────────┐    │
│  │ Confirmed — also add HDFC card brand mention.                 │    │
│  │                                            [Edit] [Delete] [✓]│    │
│  └───────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────────┘
```

- **[+ Add]** opens an inline textarea with Save / Cancel. No popups.
- **[Edit]** turns the comment into the same textarea pre-filled. Edits update `updatedAt` and append `(edited)` next to the timestamp.
- **[Delete]** asks "Delete this comment?" inline (no full modal). Deletion is hard — the comment row is removed from the array. (We considered soft-delete but for a review tool the simpler model wins.)
- **[✓]** marks the comment resolved (greys + strikethrough). Resolved comments are filtered out of "open" counts but stay visible with a `Show resolved` toggle.
- Only the **comment's author** sees Edit / Delete on their own comments. Anyone can resolve. This is enforced server-side too — see §9.

### 4.4 Floating review summary (right-side panel, Review mode only)

```
┌───────────────────────┐
│  Review summary       │
│  ───────────────────  │
│  Stages               │
│   ✓ Approved      4   │
│   ⚠ Changes req.  2   │
│   ⏳ Pending      7   │
│  ───────────────────  │
│  Comments             │
│   Open           18   │
│   Resolved        6   │
│  ───────────────────  │
│  Jump to next open ▾  │
│   • 1.2 (2)           │
│   • 3.1 (4)           │
│   • 7.2 (1)           │
│   • …                 │
│  ───────────────────  │
│  [Export feedback.md] │
│  [Copy for Claude]    │
└───────────────────────┘
```

- Lets reviewers scan progress without scrolling 200+ rows.
- **Copy for Claude** copies a compact Markdown summary to the clipboard — the same text Claude would read from `feedback.json`, formatted as a punch list.
- **Export** writes a `feedback-2026-05-26.md` snapshot to download — useful for circulating to non-engineering stakeholders.

### 4.5 Empty state, error state

- If `data/feedback.json` doesn't exist yet → API initialises it on first GET. UI shows "No comments yet — be the first."
- If the network request fails → comments stay editable locally and a yellow banner says "Offline — your changes will sync when connection is back." (We queue in `localStorage` and flush on reconnect. Optional for v1 if we want to ship faster; can be deferred.)

---

## 5. Comment lifecycle — sequence

```
Reviewer types comment ──► POST /api/feedback/comments
                                │
                                ▼
                         lockfile acquire
                                │
                                ▼
                         read feedback.json
                                │
                                ▼
                         append comment (ulid, timestamps)
                                │
                                ▼
                         write feedback.json (atomic temp+rename)
                                │
                                ▼
                         lockfile release
                                │
                                ▼
                         return new comment → UI inserts it
```

Edit / delete / resolve / status-change all follow the same lock → read → mutate → atomic-write → release shape.

---

## 6. API contract

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/api/feedback` | — | full `feedback.json` |
| POST | `/api/feedback/comments` | `{ scope, stageId, stepId?, text }` | created comment |
| PATCH | `/api/feedback/comments/:id` | `{ text }` | updated comment |
| DELETE | `/api/feedback/comments/:id` | — | `{ ok: true }` |
| POST | `/api/feedback/comments/:id/resolve` | `{ resolutionNote? }` | updated comment |
| POST | `/api/feedback/comments/:id/reopen` | — | updated comment |
| PUT | `/api/feedback/stages/:stageId` | `{ status, statusNote? }` | updated stage entry |

Author identity is read from the session cookie (existing auth). For the demo / local dev where there's no auth, we fall back to a `x-reviewer-email` header set by the widget from `localStorage`.

---

## 7. Closing the loop — how Claude acts on feedback

This is the part that makes the feature more than a comment box.

**Step 1 — invocation.** A user (any reviewer, but typically a lead) types in Claude:

> "Apply the feedback from `data/feedback.json` to the user journey."

**Step 2 — Claude reads the file** via the `Read` tool and produces a **punch list**:

```
Stages requiring changes:
  • Chapter 1  "Vijay buys PMP® Gold"     — Pricing copy needs legal sign-off
  • Chapter 7  "Watching the composite…"  — Readiness math doesn't match spec

Open step-level comments (12):
  • 1.2  Subject should reference Gold tier explicitly. (Priya)
  • 1.2  Add HDFC card brand mention. (Rohan)
  • 3.1  Readiness 34/100 looks low for day 1 — confirm with PM. (Kavya)
  • 7.2  Heatmap copy "cherry-picking floor" is too colloquial. (Vijay)
  • …
```

**Step 3 — Claude confirms scope** with the requester ("I'll fix the 5 copy items and leave the spec-question ones for PM. OK?") and proceeds to edit `userjourney.html` (and any other files referenced).

**Step 4 — Claude marks comments resolved** by POSTing to `/api/feedback/comments/:id/resolve` with a one-line `resolutionNote` describing the fix and the file/line it touched. The widget re-renders so reviewers see what Claude did.

**Step 5 — audit trail.** Every status change and resolution is logged to `data/feedback-audit.log` (append-only JSONL). The team can review what Claude touched without scrolling git history.

**Trigger phrases Claude will recognise** (documented in CLAUDE.md, see §10):
- "apply feedback", "fix feedback", "resolve open comments"
- "what's in feedback.json", "summarise the review"
- "fix changes-required stages"

---

## 8. Audit & history

We deliberately don't try to be Google-Docs. But we do want:

- Each stage status decision is recorded in-line (`statusBy`, `statusAt`, `statusNote`).
- The most recent decision overwrites the previous one in `feedback.json`, **but** an append-only `data/feedback-audit.log` keeps every transition. Format:
  ```jsonl
  {"ts":"2026-05-26T11:40:00Z","kind":"stage_status","stageId":"chapter-1","from":"pending","to":"changes_required","actor":"vijay@edstellar.com","note":"Pricing copy needs legal sign-off"}
  {"ts":"2026-05-26T11:42:08Z","kind":"comment_create","commentId":"cmt_01HXYZ…","stageId":"chapter-1","stepId":"1.2","actor":"priya@…"}
  ```
- Git is the second line of defense — `feedback.json` is committed, so `git log` gives you a free human-readable diff per commit.

---

## 9. Concurrency, identity, and safety

- **File locking.** Use [`proper-lockfile`](https://www.npmjs.com/package/proper-lockfile) around every read-modify-write of `data/feedback.json`. Acquire timeout: 2s. Stale-detection: 5s. Without this, two reviewers commenting simultaneously can clobber each other on Windows.
- **Atomic writes.** Always write to `feedback.json.tmp` then rename. Avoids half-written JSON on crash.
- **Identity.** Comments and status decisions carry the actor's email and display name. Edit / delete is restricted to the comment's author server-side; resolve / re-open is open to everyone (it's the team's call).
- **Validation.** Every POST/PATCH validates the body shape with Zod (already a common pattern in Next.js apps; add as a dep). Reject any `text` longer than 2,000 chars to keep the file from bloating.
- **Rate limit.** Soft cap of 30 writes per reviewer per minute — sufficient for normal review, prevents accidental loops.
- **CSRF.** API routes accept only same-origin POSTs (Next.js default + `Origin` header check).

---

## 10. Migrations required

> The user explicitly asked whether migrations are needed. Yes — but they're all additive and reversible. No data loss path.

### 10.1 New files to create

| Path | What | Migration step |
|---|---|---|
| `data/feedback.json` | Canonical store | Seed with `{ "version": 1, "updatedAt": "<iso>", "stages": {}, "comments": [] }` on first server start if missing. |
| `data/feedback-audit.log` | Append-only JSONL audit trail | Created on first write. |
| `public/feedback-widget.js` | Client widget (~500 LOC) | New file. |
| `public/feedback-widget.css` | Widget styles, scoped under `.fb-*` | New file. |
| `app/api/feedback/route.ts` | GET full state, plus `POST /comments` | New. |
| `app/api/feedback/comments/[id]/route.ts` | PATCH, DELETE | New. |
| `app/api/feedback/comments/[id]/resolve/route.ts` | POST | New. |
| `app/api/feedback/comments/[id]/reopen/route.ts` | POST | New. |
| `app/api/feedback/stages/[stageId]/route.ts` | PUT | New. |
| `CLAUDE.md` (or a section in it) | Trigger phrases + workflow for Claude to act on feedback | New section. |

### 10.2 Edits to `public/userjourney.html`

Three small surgical edits — none breaking:

1. **Add stable IDs.** Every `<section class="chapter">` gets `data-stage-id="chapter-N"`; every `<article class="step">` gets `data-step-id="N.M"`. The numbering already exists in the page (the visible chapter/step numbers), so the IDs are mechanical.
2. **Add the widget script tag** before `</body>`:
   ```html
   <link rel="stylesheet" href="/feedback-widget.css">
   <script src="/feedback-widget.js" defer></script>
   ```
3. **Add a single root mount element** inside `<header class="top">`:
   ```html
   <div id="fb-toolbar"></div>
   ```

That's it — the widget injects all comment threads and stage strips programmatically from JS.

### 10.3 Dependency additions to `package.json`

```json
"dependencies": {
  "proper-lockfile": "^4.1.2",
  "ulid": "^2.3.0",
  "zod": "^3.23.8"
}
```

(All small, no native bindings, no Windows quirks.)

### 10.4 Git config

Add to `.gitignore` — **nothing.** We *want* `data/feedback.json` committed so the team can see review state across branches. The audit log can stay out of git if it gets noisy:

```gitignore
# only if log volume becomes a problem
# data/feedback-audit.log
```

### 10.5 Backwards compatibility

- If a reviewer opens `userjourney.html` **without Review mode on**, the page renders identically to today. No layout shift, no extra requests.
- If `data/feedback.json` is missing or corrupt, the API regenerates a fresh one and logs a warning. We never throw at the user.
- If `feedback.json.version` is bumped in a future release, the API runs an in-line migration function (`migrateV1ToV2`) before serving. No manual step.

---

## 11. Edge cases worth calling out before we build

- **Same comment, two browsers.** A reviewer edits a comment in tab A and deletes it in tab B. Server returns 404 on the edit → widget shows "This comment was deleted" and clears the editor.
- **Status flip-flopping.** If a stage goes approved → changes_required → approved 4 times, the audit log carries all 4 entries. UI shows only the latest.
- **Reviewer leaves mid-comment.** Drafts are kept in `localStorage` keyed by step ID; reopening the page restores the unsaved text with a "Restore draft?" prompt.
- **Resolving a comment doesn't auto-approve the stage.** Deliberate — a stage can have all comments resolved but still sit in "Changes required" until someone explicitly clicks Approve. Approval is a separate human signal.
- **Branch-fork stages.** The pass/fail branch is treated as **one** stage (`chapter-fork`) with no sub-steps. Comments attach to the stage. Steps inside the ordered lists are not commentable in v1.

---

## 12. Implementation phases

| Phase | Deliverable | Effort |
|---|---|---|
| **P0 — Foundation** | Add IDs to HTML, scaffold `data/feedback.json`, add API routes with file-locking, return the full state on GET. | ~1 day |
| **P1 — Comments** | Inline add/edit/delete/resolve under each step. Widget script + CSS. Author identity from `localStorage`. | ~1–2 days |
| **P2 — Stage status** | Approve / Changes required strip under each chapter header. Audit log. | ~½ day |
| **P3 — Summary panel** | Floating right panel with counts, jump-to-open, export-to-MD. | ~½ day |
| **P4 — Claude integration** | CLAUDE.md trigger phrases + `Copy for Claude` button on the panel that produces a punch list. Test end-to-end: comment → Claude reads → fixes HTML → marks resolved. | ~½ day |
| **P5 — Polish** | Drafts in `localStorage`, offline queue, rate limiting, Zod validation. | ~½ day |

**Total: ~4–5 working days.** Phase 1+2 (the must-haves) ship in 2 days.

---

## 13. Open questions for the team

These are the calls that need a human decision before we code:

1. **Should reviewer identity be tied to the LMS auth session, or a separate "Reviewer name" stored in the browser?** (Recommendation: LMS session, fall back to localStorage only for unauthenticated previews.)
2. **Do we want comments to be threadable (replies) or flat?** v1 plan is flat. Threading is doable but doubles UI complexity.
3. **Should `data/feedback.json` be committed to git or kept on the server only?** Plan recommends committed — free audit trail, easy PR review of decisions. Alternative is to host it on a shared volume.
4. **Should Claude auto-mark comments resolved when it fixes them, or queue them for human verification?** Plan defaults to **auto-resolve with a resolution note**, but a "Verify by reviewer before resolving" toggle in the panel would respect a stricter team.
5. **Do we want the same feature on `flowchart.html` / `flowd.html` in v1, or defer?** Plan defers — same script can be added later with one line each.

---

*Document path: `feedback.md` (this file).
Canonical store: `data/feedback.json` (to be created).
Audit trail: `data/feedback-audit.log` (to be created).*
