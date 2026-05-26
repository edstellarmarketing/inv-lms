# User Journey — End-to-End

This plan documents the buyer/learner's full journey across seven stages, from purchase on invensislearning.com to certification (or refund) and the next step beyond.

- **Stage 1** — Purchase on invensislearning.com.
- **Stage 2** — From the LMS welcome email to landing in the dashboard.
- **Stage 3** — Exam preparation: the study loop (reading, practice, mock exams).
- **Stage 4** — AI tools: the Silver and Gold augmentation layer.
- **Stage 5** — Live services and support: the human scaffold.
- **Stage 6** — Readiness gate and voucher redemption: the commercial linchpin.
- **Stage 7** — Exam day to certification (or refund): the closing stage.

---

# Stage 1 — Purchase on invensislearning.com

Stage 1 covers what the buyer sees on the invensislearning.com marketing website, from landing on a course page to receiving the order confirmation. The LMS is not involved in this stage; it begins in Stage 2.

## Screens

### 1. Course detail page

- **Route:** `/courses/[slug]` (e.g. `/courses/pmp`)
- **What the visitor sees:** course title, eyebrow, subtitle, description, pass-rate signal, exam specs, three package columns side by side (Bronze · Silver · Gold), the feature list under each package, pricing, savings line, and a per-tier CTA.
- **Primary action:** pick a tier → click "Buy now".

### 2. Tier review

- **Route:** `/checkout/[slug]/[tier]`
- **What the visitor sees:** the chosen course + tier badge, a what's-included summary, price breakdown (original price, discount, savings, total), and a contact form (name, email, phone).
- **Primary action:** confirm details → "Continue to payment".

### 3. Payment

- **Route:** `/checkout/[slug]/[tier]/pay`
- **What the visitor sees:** order summary on one side, payment method picker on the other (card, wallet, net banking, EMI / pay-in-parts), and the form for the chosen method.
- **Primary action:** "Pay now".

### 4. Payment processing

- A brief processing screen while the payment is verified.
- Two outcomes: success → screen 5, or failure → back to screen 3 with an error message.

### 5. Order confirmation

- **Route:** `/order/[orderRef]/confirmation`
- **What the visitor sees:** "Payment successful" message, order summary (course + tier + amount paid), order reference number, a "What happens next" panel ("Check your email — your LMS access credentials will arrive shortly"), a download link for the receipt, and a support contact line.
- **Primary action:** none required; the page is a passive confirmation.

### 6. Order receipt email

- A transactional email delivered to the buyer's address.
- **Contains:** order reference, paid amount, course + tier, payment receipt for finance records, and a one-line note that the LMS welcome email with login credentials is arriving in a separate message.

## Flow

```
       ┌────────────────────────┐
       │ 1. Course detail page  │
       │   /courses/[slug]      │
       └───────────┬────────────┘
                   │  visitor picks a tier · clicks "Buy now"
                   ▼
       ┌────────────────────────┐
       │ 2. Tier review         │
       │   /checkout/.../[tier] │
       └───────────┬────────────┘
                   │  contact details confirmed
                   ▼
       ┌────────────────────────┐
       │ 3. Payment             │
       │   /checkout/.../pay    │
       └───────────┬────────────┘
                   │  visitor submits payment
                   ▼
       ┌────────────────────────┐
       │ 4. Payment processing  │
       └─────┬──────────────┬───┘
             │              │
        fail │              │ success
             ▼              ▼
        back to [3]   ┌────────────────────────┐
        with error    │ 5. Order confirmation  │
                      │   /order/.../confirm   │
                      └───────────┬────────────┘
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │ 6. Order receipt email │
                      │   (buyer's inbox)      │
                      └───────────┬────────────┘
                                  │
                                  ▼
                         [ Stage 2 begins ]
```

## End of Stage 1

The buyer's invensislearning.com journey ends at the order confirmation screen plus the receipt email. The LMS welcome email — with the activation link and credentials — is the start of Stage 2.

---

# Stage 2 — From the welcome email to the LMS dashboard

Stage 2 picks up where Stage 1 ended. The buyer has paid on invensislearning.com and now receives the LMS welcome email. This stage covers their first-time entry into the LMS — activation, password setup, onboarding, and landing in the dashboard.

## Screens

### 1. LMS welcome email

- **Where:** the buyer's inbox.
- **What they see:** subject names the course and tier ("Your PMP Gold programme is ready"), body shows the course thumbnail, tier badge, a short what's-included summary that mirrors what they bought, and a prominent "Activate your account" button. Support contact + a link back to the original order on invensislearning.com in the footer.
- **Primary action:** click "Activate your account" → opens the LMS activation landing page in a browser.

### 2. Activation landing

- **Route:** `/activate/[token]`
- **What the user sees:** "You purchased **PMP Gold** on invensislearning.com" headline, the course card with thumbnail and tier badge, a brief "Here's what you get" summary that mirrors the welcome email, and a single CTA.
- **Primary action:** click "Activate your account" → next screen.

### 3. Set password

- **Route:** `/auth/activate`
- **What the user sees:** email prefilled and read-only, set password field, confirm password field, password-strength hints, terms-and-conditions acceptance checkbox.
- **Primary action:** click "Activate and continue" → account is activated, learner is signed in automatically, redirected to onboarding.

### 4. Onboarding welcome

- **Route:** `/onboarding/[id]/welcome`
- **What the user sees:** "Welcome — let's set up your learning plan" headline, course + tier badge, a small four-step indicator (Profile → Exam date → Baseline → Done), and a "Get started" CTA.
- **Primary action:** click "Get started" → next screen.

### 5. Profile capture

- **Route:** `/onboarding/[id]/profile`
- **What the user sees:** current role, years of experience, domain background, study hours per week, English proficiency. Progress bar at step 1.
- **Primary action:** click "Save and continue".

### 6. Exam target date

- **Route:** `/onboarding/[id]/exam-date`
- **What the user sees:** date picker, live countdown showing weeks/days until the chosen exam date, and a recommended study cadence derived from the date and the learner's stated study hours.
- **Primary action:** click "Save and continue".

### 7. Baseline mock

- **Route:** `/onboarding/[id]/baseline`
- **What the user sees:** a "Take a quick 20-question baseline" intro screen, then the timed mini-mock, then a results screen with the learner's starting score broken down by topic cluster.
- **Tier behaviour:** all three tiers take the baseline. The result is shown on the dashboard as a starting score for everyone. Silver and Gold additionally pipe it into the AI gap report and AI-personalised study plan; Bronze uses it as a self-assessment anchor only.
- **Primary action:** click "Continue".

### 8. Onboarding complete

- **Route:** `/onboarding/[id]/complete`
- **What the user sees:** "You're ready" confirmation, a faded preview of the LMS dashboard behind the message, and an "Enter your LMS" CTA.
- **Primary action:** click "Enter your LMS" → dashboard.

### 9. LMS dashboard

- **Route:** `/lms/[slug]`
- **What the user sees:** tier-scoped tiles for every feature in their package, an at-a-glance status banner (exam target, progress, readiness score, voucher status), and section groups (Core training, Exam preparation, Active learning, Support and mentoring).
- **Primary action:** pick a tile and start learning. Stage 2 ends here.

## Side flows

These screens are part of Stage 2 but sit off the happy path.

### Return login (already-activated learner)
- **Route:** `/auth/login`
- Email + password → redirects to `/lms` if the learner has multiple enrollments, or straight to `/lms/[slug]` if they have one.

### Forgot password
- **Route:** `/auth/forgot-password`
- Email field, "Send reset link" CTA → confirmation screen telling the learner to check their inbox.

### Reset password
- **Route:** `/auth/reset-password/[token]`
- New password + confirm → success screen → redirect to login.

### Expired activation token
- **Route:** `/activate/[token]` (when the token is invalid or expired)
- "This activation link has expired" message, "Send me a new link" CTA → confirmation screen.

## Flow

```
Stage 2 starts here →
       ┌──────────────────────────┐
       │ 1. LMS welcome email     │
       │   (buyer's inbox)        │
       └────────────┬─────────────┘
                    │  click "Activate your account"
                    ▼
       ┌──────────────────────────┐
       │ 2. Activation landing    │
       │   /activate/[token]      │
       └────────────┬─────────────┘
                    │  click "Activate"
                    ▼
       ┌──────────────────────────┐
       │ 3. Set password          │
       │   /auth/activate         │
       └────────────┬─────────────┘
                    │  account activated · signed in automatically
                    ▼
       ┌──────────────────────────┐
       │ 4. Onboarding welcome    │
       │  /onboarding/[id]/welcome│
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │ 5. Profile capture       │
       │  /onboarding/[id]/profile│
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │ 6. Exam target date      │
       │ /onboarding/[id]/exam-date│
       └────────────┬─────────────┘
                    │
                    ▼
       ┌──────────────────────────┐
       │ 7. Baseline mock         │
       │ /onboarding/[id]/baseline│
       └────────────┬─────────────┘
                    │  Bronze: score shown on dashboard
                    │  Silver / Gold: also feeds AI gap report
                    ▼
       ┌──────────────────────────┐
       │ 8. Onboarding complete   │
       │ /onboarding/[id]/complete│
       └────────────┬─────────────┘
                    │  click "Enter your LMS"
                    ▼
       ┌──────────────────────────┐
       │ 9. LMS dashboard         │
       │   /lms/[slug]            │
       └──────────────────────────┘
       ← Stage 2 ends · learner is now consuming
```

## End of Stage 2

The learner is now inside the LMS dashboard with all tier-appropriate tiles visible and a personalised setup behind them — profile captured, exam date set, baseline score recorded for every tier (Silver and Gold additionally feed it into their AI tools; Bronze uses it as a self-assessment anchor). Stage 3 picks up here, with the learner choosing their first study activity.

---

# Stage 3 — Exam preparation: the study loop

Stage 3 covers the most common day-to-day learner activity: opening the Exam Preparation section, reading reference content, practising with the question bank, and taking simulation mock papers. This is the loop a learner will repeat dozens of times between activation and the readiness gate.

## Screens

### 1. Exam Preparation section view

- **Route:** `/lms/[slug]` (scrolled to the Exam Preparation section)
- **What the learner sees:** the Exam Preparation section of the dashboard expanded — all its tiles visible, grouped by content type (Reference cards · Study guides · Glossary · Question bank · Simulation papers). Each tile shows its current state (read / unread / in progress / locked at this tier).
- **Primary action:** click a tile to open it.

### 2. Reference card viewer

- **Route:** `/lms/[slug]/reference/[card]`
- **What the learner sees:** the card title, the card body (rendered text with diagrams and tables), a short list of all reference cards in this course on the left for quick navigation, prev/next buttons at the bottom, and a "Mark as read" toggle.
- **Primary action:** read · navigate prev/next · mark as read.

### 3. Study guide viewer

- **Route:** `/lms/[slug]/study-guide/[guide]`
- **What the learner sees:** longer-form study guide with section anchors, a sticky table-of-contents sidebar, in-line diagrams, and a progress indicator showing how much of the guide has been scrolled through.
- **Primary action:** read · jump between sections · close to return to the section view.

### 4. Glossary

- **Route:** `/lms/[slug]/glossary`
- **What the learner sees:** searchable alphabetical list of terms, with each term expanding into its definition and cross-references to related cards and guides.
- **Primary action:** search a term or scroll through the list.

### 5. Question bank — topic picker

- **Route:** `/lms/[slug]/question-bank`
- **What the learner sees:** list of all topic clusters in the exam, each showing total questions, attempted count, and accuracy. A "Mixed practice (all topics)" option at the top. Filters for difficulty and "questions I got wrong".
- **Primary action:** pick a topic and session length (10 / 25 / 50 Qs) → "Start practice".

### 6. Question bank — runner

- **Route:** `/lms/[slug]/question-bank/session/[id]`
- **What the learner sees:** one question at a time with multiple-choice options, a progress bar (5 of 25), a "Flag for review" button, and a "Submit" button. After each answer is submitted, the correct answer plus a short explanation are shown before moving on.
- **Primary action:** select an answer · submit · advance.

### 7. Question bank — session results

- **Route:** `/lms/[slug]/question-bank/session/[id]/result`
- **What the learner sees:** score (e.g. 18/25), per-topic breakdown, list of questions flagged or got wrong with the option to review each, and CTAs to "Practise again" or "Back to question bank".
- **Primary action:** review wrong answers · start another session · return.

### 8. Mock exam — intro

- **Route:** `/lms/[slug]/mock-exam/[paperId]`
- **What the learner sees:** paper number (e.g. "Paper 2 of 6" for a Gold learner), exam format reminder (closed-book or open-book per the course's exam specs), total questions, time limit, and a clear "Once you begin, the timer cannot be paused" warning. Final CTA "Start exam".
- **Primary action:** confirm and start, or back to section.

### 9. Mock exam — runner

- **Route:** `/lms/[slug]/mock-exam/[paperId]/run`
- **What the learner sees:** question and options, a sticky timer at the top, a question navigator on the right (so the learner can jump between questions and flag ones to revisit), and a "Submit exam" button visible at all times. Answers are auto-saved as the learner moves.
- **Primary action:** answer all questions · submit when ready or when timer expires.

### 10. Mock exam — submit confirmation

- A modal overlaid on the runner: "You have X questions unanswered and Y flagged for review. Submit anyway?"
- **Primary action:** "Go back" or "Submit and see results".

### 11. Mock exam — results

- **Route:** `/lms/[slug]/mock-exam/[paperId]/result`
- **What the learner sees:** overall score with pass/fail indicator (against the published pass mark in the course's exam specs), per-topic breakdown chart, a list of every question with the learner's answer, the correct answer, and the explanation, and a CTA "Update my readiness score" that refreshes the readiness panel on the dashboard.
- **Tier behaviour:** Silver and Gold see an additional CTA "View AI gap report" linking to the AI tools stage. Bronze sees only the deterministic breakdown.
- **Primary action:** review explanations · return to dashboard.

### 12. Dashboard — return with progress updated

- **Route:** `/lms/[slug]`
- **What the learner sees:** the same dashboard from Stage 2 but tiles now reflect updated state — reference cards marked as read, question bank tile showing the new attempts count, mock exam tile showing "1 of 6 done", readiness panel updated, and the at-a-glance status banner showing the new overall progress percentage.
- **Primary action:** pick the next thing.

## Side flows

### Pause and exit a mock exam
- A mock exam in progress can be exited via the browser back button; the timer keeps running in the background.
- On return, the learner sees a "Resume exam — X minutes remaining" panel before being dropped back into the runner.

### Bookmark a reference card or study guide
- A small bookmark icon on each viewer adds the item to a "Saved" tile on the dashboard for quick return.

### Search content
- A search bar in the section header searches across reference cards, study guides, and glossary entries and surfaces results inline.

### Locked tiles within a section
- Any tile from a higher tier (e.g. a Gold-only deep-dive guide for a Silver learner) shows as locked with an Upgrade CTA — same as Stage 2 dashboard behaviour.

## Flow

```
Stage 3 starts here →
       ┌──────────────────────────┐
       │ 1. Section view           │
       │   /lms/[slug] (exam prep) │
       └────────────┬─────────────┘
                    │  pick a content type
                    ▼
        ┌───────────┼───────────┬─────────────┐
        │           │           │             │
        ▼           ▼           ▼             ▼
   ┌────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐
   │ 2. Ref │ │ 3. Guide│ │4.Gloss. │ │5. Qbank pick │
   │  card  │ │         │ │         │ └──────┬───────┘
   └───┬────┘ └────┬────┘ └────┬────┘        ▼
       │           │           │        ┌──────────────┐
       │           │           │        │6. Qbank run  │
       │           │           │        └──────┬───────┘
       │           │           │               ▼
       │           │           │        ┌──────────────┐
       │           │           │        │7. Qbank result│
       │           │           │        └──────┬───────┘
       └───────────┴───────────┴───────────────┘
                            │
                            ▼  (later in the loop)
       ┌──────────────────────────┐
       │ 1. Section view           │
       │   (pick a mock paper)     │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │ 8. Mock exam intro       │
       │  /lms/.../mock-exam/[id] │
       └────────────┬─────────────┘
                    │  Start exam
                    ▼
       ┌──────────────────────────┐
       │ 9. Mock exam runner      │
       │   (timed · auto-save)    │
       └────────────┬─────────────┘
                    │  submit
                    ▼
       ┌──────────────────────────┐
       │ 10. Submit confirmation  │
       │  (modal · unanswered Qs) │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │ 11. Mock exam results    │
       │  /lms/.../result          │
       └────────────┬─────────────┘
                    │  return to dashboard
                    ▼
       ┌──────────────────────────┐
       │ 12. Dashboard updated    │
       │   /lms/[slug]             │
       └──────────────────────────┘
       ← Stage 3 ends · ready to loop again
```

## How Stage 3 varies by course and package

Stage 3 is the heart of the LMS because it is where the catalogue meets the learner. Every other stage is plumbing; Stage 3 is the product. The 12 screens above are universal — but what the learner sees inside them is entirely a function of the course they bought and the package tier they bought it at.

### The principle: same engine, different inventory

- **The catalogue authors what's sold.** Every course in the catalogue has three packages (Bronze · Silver · Gold), each with sections of features tagged as included or not at that tier.
- **The LMS renders what was sold.** Same 12 Stage 3 screens for every learner; the data inside the screens is filtered by the learner's `(course, tier)`.
- **A new course is an authoring task, not an engineering task.** The engines (reference card viewer, study guide viewer, Q-bank runner, mock exam runner) don't change. The inventory of cards, guides, questions, and papers does.

### What's universal vs what varies

| Universal (engine) | Variable (per course × tier) |
|---|---|
| Section view layout | Which tiles appear (what's included at this tier) |
| Reference card viewer chrome | Card titles, bodies, count |
| Study guide viewer chrome | Guide titles, bodies, ToC depth |
| Glossary search engine | Term list and definitions |
| Question-bank engine | Topic clusters, question count, scenario depth, available filters |
| Mock exam runner chrome | Paper count, time limit, format, pass mark |
| Mock exam results breakdown | Topic clusters mapped to this course's syllabus |
| Dashboard return states | Progress derived from this learner's own attempts |

### Five axes of variation

#### Axis 1 — Tier (Bronze · Silver · Gold)

The tier is the most direct lever. Same course, same syllabus, but different volumes and tools across the same 12 screens.

| Screen | Bronze | Silver | Gold |
|---|---|---|---|
| Section view | Fewer tiles; AI tools locked with Upgrade CTA | AI study planner + gap report unlocked; some Gold tiles locked | All tiles unlocked; Active Learning section appears |
| Reference cards | Core cards for major topic clusters | + Topic-specific study guides | + Deep-dive case-study guides |
| Study guides | None or minimal | One per major exam area | All exam areas + post-cert pathways |
| Glossary | Same across tiers | Same | Same |
| Question bank | 150–200 Qs · basic topic filter | 300+ Qs · "Qs I got wrong" filter | 500+ Qs · adaptive drill mode |
| Mock exam picker | 2 papers | 4 papers | 6 papers |
| Mock exam results | Deterministic breakdown only | + "View AI gap report" CTA | + Personalised study plan refresh CTA |
| Dashboard return | No AI tiles; no Active Learning | AI tiles live | Active Learning tiles live; coaching and concept-coach surfaced |

#### Axis 2 — Course family level (Foundation vs Practitioner)

When a course moves up a level within the same family, the framing of every screen changes. Same screens, different titles, different question shapes.

| Element | Foundation framing | Practitioner framing |
|---|---|---|
| Reference card titles | "7 Principles quick-reference card" | "7 Principles application reference card" |
| Study guide titles | "7 Practices study guide" | "7 Practices scenario study guide" |
| Question stems | "What is the purpose of X?" | "In this scenario, which X applies, and why?" |
| Reading per question | Short | Long (scenario block + question + options) |
| Mock exam time limit | Shorter (e.g. 60 min) | Longer (e.g. 150 min) |
| Topic clusters | Roles · Events · Artifacts · Theory | Roles · Events · Artifacts · Theory · Tailoring (level-unique) |
| AI scenario coach (Gold) | Concept Q&A only (Practitioner-level roleplay is not appropriate at Foundation) | Scenario roleplay enabled |

#### Axis 3 — Course shape (standalone vs combo)

A combo course (e.g. "PRINCE2® Foundation & Practitioner") bundles two standalones into one enrollment. Stage 3 splits accordingly.

| Element | Standalone | Combo (F+P) |
|---|---|---|
| Section view | Single "Exam Preparation" section | Two stacked sub-sections: "Exam Preparation — Foundation" + "Exam Preparation — Practitioner" |
| Voucher tiles | One | Two (Foundation voucher + Practitioner voucher), each level-labelled |
| Reference cards | One list | Both lists kept distinct — knowledge-framed cards and application-framed cards never merged |
| Study guides | One list | Same pattern; each level's guides under its own sub-section |
| Question bank picker | One topic list | Top-level toggle Foundation / Practitioner; topic list per level |
| Mock exam picker | One list of papers | Two tabs — Foundation papers and Practitioner papers |
| Mock exam intro | Format implicit from course specs | Level called out explicitly in the paper title |
| Mock exam runner | Closed-book or open-book per exam | Format flips per paper (closed-book for F papers, open-book for P papers) |
| Readiness panel | One pass-mark target | Two independent targets (F and P) — voucher per level redeems independently |

#### Axis 4 — Exam format (driven by `examSpecs`)

The mock exam runner adapts its UI to the format declared by the course.

| Element | Closed-book MCQ (typical Foundation) | Open-book objective testing (typical Practitioner / advanced) |
|---|---|---|
| Question display | Question + 4 options + radio | Scenario block + question + options (some multi-select) |
| Reference sidebar | None | Collapsible "Open the manual" panel with the official reference text |
| Time per question | Strict, short | Strict, longer per question |
| Pass mark | Per course specs (e.g. 60%) | Per course specs (e.g. 55%) |
| Results indicator | Pass/fail vs the mark | Same, plus a usage signal (how often the manual sidebar was opened) |

#### Axis 5 — Syllabus content (per course)

This is the bulk of the per-course authoring work. The engines never change; what changes is the data tagged to this course's syllabus:

- **Reference card titles and bodies** — authored once per course per tier.
- **Study guide ToCs and bodies** — authored once per course per tier.
- **Glossary terms** — authored once per course.
- **Question bank questions** — tagged by topic cluster, difficulty, and syllabus reference; volumes per tier (200 / 300 / 500).
- **Mock exam papers** — composed from the question bank to match the real exam format; paper counts per tier (2 / 4 / 6).
- **Pass mark + time limit + format** — pulled from the course's exam specs.

All of this lives as data. The engines never change.

### Worked examples — how Stage 3 actually looks

#### Example 1 · PMP Gold (standalone · single exam · situational MCQ)

- Section view: Exam Preparation with reference cards, deep-dive study guides, glossary, 500-Q bank, 6 mock papers.
- Reference cards: framed around PMI's three performance domains — People, Process, Business Environment.
- Question bank: 500 Qs, scenario-style, filterable by domain.
- Mock exam picker: 6 papers.
- Mock exam runner: closed-book, 180 questions, 230 minutes, per the real PMP spec.
- Mock exam results: full topic breakdown + AI gap report CTA + personalised study plan refresh CTA.

#### Example 2 · PRINCE2® Foundation Bronze (standalone · foundation · closed-book MCQ)

- Section view: Exam Preparation has core reference cards only; AI tiles locked with "Upgrade to Silver" CTAs; no Active Learning section.
- Reference cards: knowledge framing — "7 Principles quick-reference card", "Roles & responsibilities reference card".
- Question bank: 200 Qs, basic topic filter; "Qs I got wrong" filter is Silver+ and shows as locked.
- Mock exam picker: 2 papers.
- Mock exam runner: closed-book, 60 Qs, 60 minutes.
- Mock exam results: deterministic per-topic breakdown only; no AI CTA visible.

#### Example 3 · PRINCE2® Practitioner Gold (standalone · practitioner · open-book objective testing)

- Section view: Exam Preparation has scenario-framed cards, scenario study guides including a dedicated **Tailoring** card and guide (the level-unique topic per Family Rule F6), case studies, 500-Q scenario bank, 6 scenario mock papers.
- Reference cards: application framing — "7 Principles application reference card", "Tailoring quick-reference card".
- Question bank: 500 scenario-based questions; each stem is a project context block followed by the question; filter by topic and difficulty.
- Mock exam picker: 6 papers.
- Mock exam runner: open-book, 70 Qs, 150 minutes, with a collapsible "Open the manual" sidebar.
- Mock exam results: scenario breakdown + AI scenario coach CTA (Practitioner-level roleplay per Trap #7).

#### Example 4 · PRINCE2® F+P Gold (combo · dual-level)

- Section view: two stacked sub-sections — "Exam Preparation — Foundation" (knowledge framing) and "Exam Preparation — Practitioner" (application framing). Voucher row carries both Foundation and Practitioner voucher tiles.
- Reference cards: both knowledge-framed and application-framed cards listed under their respective sub-sections; never merged.
- Question bank picker: top-level toggle Foundation / Practitioner; each side carries 500 Qs at Gold.
- Mock exam picker: two tabs — 6 Foundation papers (closed-book) and 6 Practitioner papers (open-book).
- Mock exam runner: format flips per paper. Foundation paper opens the closed-book MCQ runner; Practitioner paper opens the open-book runner with manual sidebar.
- Mock exam results: each result is tagged with its level; readiness panel tracks both exams independently — Foundation voucher redeems when F readiness gate passes, Practitioner voucher when P does.

#### Example 5 · Custom course (user-authored)

- Section view renders only what the author defined — could be sparse (one section, three tiles) or rich (all sections fully populated).
- No tier ladder unless the author defined Bronze / Silver / Gold packages; otherwise renders as a single-package course.
- Question bank, mock exam, and AI tiles appear only if the corresponding features were authored.
- The engines are unchanged; the inventory is whatever the author typed in.

### The takeaway

**Stage 3 = stable shell + flexible content.** Adding a new course, or a new package within an existing course, means authoring rows (cards, questions, guides, exam specs) — not building screens. The 12 screens above carry every course in the catalogue today and every course added tomorrow.

## Screen wireframes (baseline — PRINCE2 Foundation Gold)

ASCII wireframes for the 12 Stage 3 screens. Baseline shown for a Gold learner on a closed-book Foundation course; variations follow in the next section.

### Screen 1 · Exam Preparation section view

```
┌────────────────────────────────────────────────────────────────────────┐
│ ★ PRINCE2® · Foundation                         [ GOLD TIER ]  [⚙ Demo]│
│ PRINCE2® Foundation Certification Training                              │
├────────────────────────────────────────────────────────────────────────┤
│ Exam target: Mar 15  │ Progress: 42%  │ Readiness: 71/100 │ Voucher: 🔒 │
├────────────────────────────────────────────────────────────────────────┤
│ ▌ EXAM PREPARATION                                  ✓ 8 active · 8 total│
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ 7 Principles│ │ 7 Practices│ │ Roles &    │ │ Glossary   │            │
│ │ ref. card  │ │ study guide│ │ resp. card │ │ 240 terms  │            │
│ │ ✓ Read     │ │ ▶ In prog. │ │ ○ Unread   │ │ ◯ Available│            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ Question   │ │ Mock paper │ │ Mock paper │ │ Mock paper │            │
│ │ bank · 500 │ │ 1 of 6     │ │ 2 of 6     │ │ 3–6 of 6   │            │
│ │ ▶ 32% done │ │ ✓ 78%      │ │ ▶ Started  │ │ ◯ Available│            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 2 · Reference card viewer

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Back to Exam Preparation                              [ 🔖 Bookmark ] │
├──────────────────┬─────────────────────────────────────────────────────┤
│ CARDS            │  REFERENCE CARD                                      │
│ ▶ 7 Principles  │  7 PRINCIPLES                                         │
│   7 Practices    │  PRINCE2's seven principles are universal,           │
│   Processes      │  self-validating, and empowering.                    │
│   Roles & resp.  │                                                      │
│   Tailoring (🔒)│  1. Continued business justification                  │
│   Mgmt products  │  2. Learn from experience                            │
│                  │  3. Defined roles, responsibilities & relationships  │
│ Reading: 8 min   │  [ diagram: principles wheel ]                       │
│                  │ [← 7 Practices]  [Mark as read]  [Roles & resp →]   │
└──────────────────┴─────────────────────────────────────────────────────┘
```

### Screen 3 · Study guide viewer

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Exam Preparation                          7 Practices study guide     │
├──────────────────┬─────────────────────────────────────────────────────┤
│ ON THIS PAGE     │  7 PRACTICES STUDY GUIDE                             │
│ ▶ Introduction   │  INTRODUCTION                                        │
│   Business case  │  PRINCE2 defines seven practices that bring the      │
│   Organizing     │  principles to life through structured guidance.     │
│   Plans          │                                                      │
│   Quality        │  BUSINESS CASE                                       │
│   Risk           │  The Business Case captures and validates the        │
│   Issues         │  reasoning for the project. It is owned by the       │
│   Progress       │  Executive and reviewed at every stage boundary…    │
│                  │  [ diagram: business case lifecycle ]                │
│ Read: ███░░ 72% │                                                       │
└──────────────────┴─────────────────────────────────────────────────────┘
```

### Screen 4 · Glossary

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Exam Preparation                                  GLOSSARY · 240 terms│
├────────────────────────────────────────────────────────────────────────┤
│ [ 🔍  Search terms... e.g. "tolerance" ]                               │
│ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z                   │
│                                                                         │
│ A                                                                       │
│  Acceptance criteria   The criteria that the project's product must    │
│                        meet to be accepted by stakeholders.            │
│  Activity              An action carried out during a project, defined │
│                        in a stage plan.                                │
│ B                                                                       │
│  Baseline              A snapshot of a plan or product at a point in   │
│                        time, used to measure progress against.         │
│  Business case         The justification for the project — costs,      │
│                        benefits, risks. Lives across all stages.       │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 5 · Question bank — topic picker

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Exam Preparation                            QUESTION BANK · 500 Qs    │
│ Overall accuracy: 68%       Answered: 160 / 500 (32%)                  │
│                                                                         │
│ ▌ PICK A TOPIC                                                          │
│  ◯ Mixed practice (all topics)                  All 500        ▶ Start │
│  ● Principles                  35 / 60   58% acc.              ▶ Start │
│  ◯ Practices                   42 / 90   70% acc.              ▶ Start │
│  ◯ Processes                   28 / 120  64% acc.              ▶ Start │
│  ◯ Roles & responsibilities    20 / 60   72% acc.              ▶ Start │
│  ◯ Tailoring                    0 / 60   —              🔒 Practitioner│
│                                                                         │
│ ▌ FILTERS    Difficulty: ● All  ○ Easy  ○ Medium  ○ Hard               │
│              □ Show only questions I got wrong                         │
│                                                                         │
│ ▌ SESSION   ○ 10 Qs   ● 25 Qs   ○ 50 Qs       [ ▶ START PRACTICE ]    │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 6 · Question bank — runner

```
┌────────────────────────────────────────────────────────────────────────┐
│ Mixed practice · 25 Qs                              Question 5 of 25    │
│ ████░░░░░░░░░░░░░░░░░░░  20%                                            │
├────────────────────────────────────────────────────────────────────────┤
│  Which of the following is a purpose of the Initiating a Project       │
│  process?                                                               │
│                                                                         │
│  ○  A. To establish solid foundations for the project                  │
│  ●  B. To define the project's scope and approach                      │
│  ○  C. To assess the project's viability for the next stage            │
│  ○  D. To deliver the project's specialist products                    │
│                                                                         │
│  [ 🚩 Flag for review ]                          [ Submit answer → ]   │
├────────────────────────────────────────────────────────────────────────┤
│ ▼ EXPLANATION (shown after submit)                                      │
│  ✗ Your B   ✓ Correct A                                                 │
│  Initiating a Project establishes solid foundations…                   │
│  Reference: PRINCE2® manual §14.1                       [ Next Q → ]   │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 7 · Question bank — session results

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Question bank                               SESSION RESULTS · 25 Qs   │
│                          ┌──────────────┐                              │
│                          │   18 / 25    │   72% — above target          │
│                          │   ████████░  │                               │
│                          └──────────────┘                              │
│ ▌ PER-TOPIC BREAKDOWN                                                   │
│   Principles            6 of 7   ███████░ 86%                          │
│   Practices             5 of 8   █████░░░ 63%                          │
│   Processes             4 of 6   █████░░░ 67%                          │
│   Roles & responsib.    3 of 4   ███████░ 75%                          │
│ ▌ REVIEW                                                                │
│  🚩 Flagged (2)  · Q4, Q17                                              │
│  ❌ Wrong (5)    · Q2, Q9, Q11, Q19, Q22         [ Review each → ]     │
│         [ Practise again ]              [ Back to question bank ]      │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 8 · Mock exam — intro

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Exam Preparation                              MOCK EXAM · Paper 1     │
│                                                                         │
│                      PRINCE2® Foundation Mock Exam                      │
│                            Paper 1 of 6                                 │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ Format     Closed-book multiple choice                         │    │
│   │ Questions  60                                                  │    │
│   │ Duration   60 minutes                                          │    │
│   │ Pass mark  60% (36 / 60)                                       │    │
│   └───────────────────────────────────────────────────────────────┘    │
│   ⚠  Once you begin, the timer cannot be paused.                       │
│   ⚠  Closed book — no reference material allowed.                      │
│        [ ← Back to section ]                  [ ▶ START EXAM ]         │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 9 · Mock exam — runner

```
┌────────────────────────────────────────────────────────────────────────┐
│ Paper 1 · Question 23 of 60                       ⏱  37:42 remaining    │
├────────────────────────────────────────────────────────────────────────┤
│  Which role is responsible for the day-to-day management of the        │
│  project on behalf of the Project Board?                       NAV     │
│                                                              ┌─────┐   │
│  ○  A. Executive                                             │  1 ✓│   │
│  ●  B. Project Manager                                       │  2 ✓│   │
│  ○  C. Senior User                                           │ ... │   │
│  ○  D. Team Manager                                          │ 22 🚩│  │
│                                                              │ 23 ● │  │
│  [ 🚩 Flag for review ]                                      │ ... │   │
│                                                              │ 60 ○│   │
│                                                              └─────┘   │
│  [ ← Previous ]            [ Next → ]            [ ▶ Submit exam ]     │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 10 · Mock exam — submit confirmation (modal)

```
                ┌────────────────────────────────────────┐
                │  SUBMIT EXAM?                          │
                │  ─────────────────────────────────     │
                │  You have:                             │
                │    • 4 unanswered questions            │
                │    • 7 flagged for review              │
                │    • 22:17 still remaining             │
                │                                        │
                │  [ ← Go back ]   [ ▶ Submit & see ]    │
                └────────────────────────────────────────┘
```

### Screen 11 · Mock exam — results

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Exam Preparation                         MOCK EXAM RESULTS · Paper 1  │
│        ┌──────────────────┐                                            │
│        │    47 / 60       │   78%                                       │
│        │    ████████████░ │   ✓ PASS — above 60% pass mark              │
│        └──────────────────┘                                            │
│ ▌ PER-TOPIC BREAKDOWN                                                   │
│   Principles            5 of 7    ██████░░ 71%                         │
│   Practices             7 of 10   ███████░ 70%                         │
│   Processes             10 of 15  ███████░ 67%                         │
│   Roles & resp.         8 of 10   ████████ 80%                         │
│   Management products   9 of 12   ███████░ 75%                         │
│ ▌ NEXT STEPS                                                            │
│   [ ✨ View AI gap report ]  (Silver / Gold)                           │
│   [ 📖 Review every question ]    [ ↻ Update readiness score ]         │
│   ▶ Readiness: 71/100 → 78/100  (+7)                                   │
│                [ ← Back to dashboard ]                                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Screen 12 · Dashboard — returned with progress updated

```
┌────────────────────────────────────────────────────────────────────────┐
│ ★ PRINCE2® · Foundation                          [ GOLD TIER ]          │
│ Exam target: Mar 15│ Progress: 48% ↑│ Readiness: 78/100 ↑│ Voucher: 🔒 │
│                     (+6 since last)  (+7)                  (close)      │
├────────────────────────────────────────────────────────────────────────┤
│ ▌ EXAM PREPARATION                                  ✓ 8 active · 8 total│
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ 7 Principles│ │ 7 Practices│ │ Roles &    │ │ Glossary   │            │
│ │ ✓ Read     │ │ ✓ Read 100%│ │ ✓ Read NEW │ │ ◯ Available│            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ Question   │ │ Mock paper │ │ Mock paper │ │ Mock paper │            │
│ │ ▶ 37% done │ │ ✓ 78%      │ │ ✓ 82% NEW  │ │ ◯ Available│            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ▶ What changed: read 1 card · 1 mock done (82%) · 25 Qs answered       │
└────────────────────────────────────────────────────────────────────────┘
```

## Variation wireframes — how the same screens shift across courses

Three illustrative variations that show how the Stage 3 wireframes differ when the course or tier changes.

### Variation A · PRINCE2 Practitioner Gold — open-book mock runner

The open-book exam format (objective testing) adds a collapsible manual sidebar to the runner. Question stems also carry a scenario block.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Paper 1 (P) · Question 18 of 70                  ⏱  2:14:08 remaining   │
├────────────────────────────────────────────────────────────────────────┤
│ SCENARIO                                                  📖 MANUAL     │
│ ─────────                                                ┌────────────┐│
│ A construction project is in its second delivery stage.  │ 14.1 IP    ││
│ The Project Manager has identified that the Stage Plan   │ 14.2 ...   ││
│ now requires more resources than the Project Plan…       │ Tailoring  ││
│                                                          │ Roles      ││
│ QUESTION                                                 │ Mgmt prod. ││
│ Which Practice should be used FIRST to address this      │ Glossary   ││
│ deviation?                                               │            ││
│                                                          │ Open this  ││
│  ○  A. Plans                                             │ section ↗  ││
│  ●  B. Progress                                          └────────────┘│
│  ○  C. Issues                                                          │
│  ○  D. Quality                                                         │
│  [ 🚩 Flag for review ]                                                │
│  [ ← Previous ]      [ Next → ]      [ ▶ Submit exam ]                 │
└────────────────────────────────────────────────────────────────────────┘
```

Key differences from Screen 9 baseline:
- Scenario block above the question.
- Collapsible "MANUAL" sidebar on the right (closed by default; click to expand inline reference text).
- Time limit is 150 min not 60 min (per Practitioner exam specs).
- Question count is 70 not 60.
- Pass mark is 55% (per Practitioner exam specs) — surfaces on results.

### Variation B · PRINCE2 F+P combo Gold — dual sub-section view

The combo course splits Exam Preparation into two named sub-sections so each level can be audited independently.

```
┌────────────────────────────────────────────────────────────────────────┐
│ ★ PRINCE2® · F+P Combo                            [ GOLD TIER ]         │
│ Exam target: Mar 15 (F) · May 20 (P)│ Readiness: F 78 · P 41 │ 🔒 🔒    │
├────────────────────────────────────────────────────────────────────────┤
│ ▌ EXAM PREPARATION — FOUNDATION                     (knowledge framing) │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ 7 Principles│ │ 7 Practices│ │ Voucher    │ │ Q-bank (F) │            │
│ │ ref. card  │ │ study guide│ │ Foundation │ │ 500 Qs     │            │
│ │ ✓ Read     │ │ ✓ Done     │ │ ◯ Locked   │ │ ▶ 37%      │            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ┌────────────┐ ┌────────────┐                                          │
│ │ Mock F 1/6 │ │ Mock F 2/6 │                                          │
│ │ ✓ 78%      │ │ ✓ 82%      │                                          │
│ └────────────┘ └────────────┘                                          │
│                                                                         │
│ ▌ EXAM PREPARATION — PRACTITIONER                  (application framing)│
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ 7 Principles│ │ Tailoring  │ │ Voucher    │ │ Q-bank (P) │            │
│ │ application│ │ scenario   │ │Practitioner│ │ 500 scenar.│            │
│ │ ref. card  │ │ guide NEW  │ │ ◯ Locked   │ │ ▶ 12%      │            │
│ │ ○ Unread   │ │ ○ Unread   │ │            │ │            │            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ┌────────────┐ ┌────────────┐                                          │
│ │ Mock P 1/6 │ │ Mock P 2-6 │                                          │
│ │ ◯ Available│ │ ◯ Available│                                          │
│ └────────────┘ └────────────┘                                          │
└────────────────────────────────────────────────────────────────────────┘
```

Key differences from Screen 1 baseline:
- Two stacked sub-sections, never merged.
- Two voucher tiles, both labelled.
- Tailoring appears only under Practitioner (level-unique topic).
- Reference card titles differ ("quick-reference" vs "application reference").
- Two readiness targets in the status bar.

### Variation C · PMP Bronze — locked AI tiles and reduced volumes

Bronze keeps the layout but greys out everything that belongs to a higher tier and reduces the volumes inside the unlocked tiles.

```
┌────────────────────────────────────────────────────────────────────────┐
│ ★ PMP                                              [ BRONZE TIER ]      │
│ Exam target: Mar 15  │ Progress: 18%  │ Readiness: 31/100 │ Voucher: 🔒 │
├────────────────────────────────────────────────────────────────────────┤
│ ▌ EXAM PREPARATION                                  ✓ 5 active · 8 total│
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ │ Performance│ │ Process    │ │ Glossary   │ │ Q-bank     │            │
│ │ domains    │ │ groups     │ │ 180 terms  │ │ 200 Qs     │            │
│ │ ref. card  │ │ ref. card  │ │            │ │ ▶ 24%      │            │
│ │ ✓ Read     │ │ ○ Unread   │ │ ◯ Available│ │            │            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
│ ┌────────────┐ ┌────────────┐ ┌─ 🔒 ───────┐ ┌─ 🔒 ───────┐            │
│ │ Mock paper │ │ Mock paper │ │ AI gap     │ │ AI study   │            │
│ │ 1 of 2     │ │ 2 of 2     │ │ report     │ │ planner    │            │
│ │ ✓ 62%      │ │ ◯ Available│ │ Upgrade →  │ │ Upgrade →  │            │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘            │
└────────────────────────────────────────────────────────────────────────┘
```

Key differences from Screen 1 baseline:
- AI tiles render as **locked** with "Upgrade →" CTAs (not hidden).
- Mock papers count drops from 6 to 2.
- Q-bank size drops from 500 to 200.
- No study guides; reference cards only.
- No Active Learning section at all (Gold-only).
- Results screen has no AI gap report CTA — only deterministic breakdown.

## End of Stage 3

Each loop through Stage 3 increases the learner's readiness score in two visible ways: question-bank coverage rises (working toward the ≥ 70% requirement to unlock the voucher) and mock papers completed counts up (working toward the 1 / 2 / 3 papers at the ≥ 80–85% pass mark required at Bronze / Silver / Gold respectively). Stage 4 layers AI tools on top of this loop for Silver and Gold learners; subsequent stages cover the live services and support stack, the readiness gate, voucher redemption, and certification.

---

# Stage 4 — AI tools: the Silver and Gold augmentation layer

Stage 4 covers the engineered AI features that differentiate Silver and Gold from Bronze. Every AI tool consumes a real input from Stage 3 (a mock attempt, the learner's profile, a syllabus question) and produces a personalised output the learner couldn't get from static content alone. Bronze sees all of these as locked tiles with "Upgrade" CTAs.

## The augmentation model (not standalone)

AI tools sit **on top** of Stage 3, not next to it. None of them works without something fed in from the main study loop.

| AI tool | Tier | Consumes | Produces |
|---|---|---|---|
| AI study plan | Silver (templated) · Gold (personalised) | Profile · exam date · baseline · latest mock | Day-by-day plan to exam date |
| AI gap report | Silver & Gold | Last mock attempt | Strengths / weaknesses / top 5 actions |
| Adaptive flashcards | Silver & Gold | Recall history per card | Next-due card schedule |
| AI concept coach | Gold | Learner question + syllabus index | Grounded answer with citations |
| AI scenario coach | Gold (Practitioner-level only) | Learner choice in a scenario | Branching feedback turn |
| AI interview coach | Gold (support, not exam prep) | Role + answer | Feedback per answer |
| Daily AI challenge | Gold | Today's date + syllabus rotation | One scenario per day for the cohort |

## Screens

### 1. AI tools section view

- **Route:** `/lms/[slug]` (scrolled to the AI tools section)
- **What the learner sees:** grid of AI tiles grouped under "Exam Preparation — AI" (study plan, gap report, flashcards, concept coach) and "Active Learning — AI" (scenario coach, interview coach, daily challenge). Each tile shows last-used timestamp, output freshness ("Updated 2h ago"), and tier lock state where applicable.
- **Primary action:** pick a tile.

### 2. AI study plan

- **Route:** `/lms/[slug]/ai/study-plan`
- **What the learner sees:** a vertical calendar from today through the exam date, each day showing a recommended activity (read a specific reference card, attempt N questions on a specific topic, take a specific mock paper). The plan adapts to the learner's stated study hours, baseline weak areas, and most recent mock performance. Header shows "Last generated · 2h ago · based on Mock paper 1 (78%)".
- **Tier behaviour:** Silver gets one of three templated cadences (light / steady / intensive). Gold gets a fully personalised plan that re-generates from the latest mock attempt and adapts daily.
- **Primary action:** click today's activity to jump into Stage 3 · click "Re-generate plan" if the learner has slipped or after a new mock.

### 3. AI gap report

- **Route:** `/lms/[slug]/ai/gap-report`
- **What the learner sees:** derived from the last mock attempt. Top: topic-cluster strength chart (which areas the learner crushed, which need work). Middle: 3–5 prioritised actions ("Re-read the 7 Practices guide section on Risk", "Attempt 10 more Roles & Responsibilities questions"). Each action deep-links into Stage 3 content. Bottom: a short narrative explanation in plain language.
- **Tier behaviour:** Silver and Gold both available; Gold additionally surfaces a "Refresh my study plan from this report" CTA that wires into screen 2.
- **Primary action:** click an action to jump back into Stage 3 content.

### 4. Adaptive flashcards

- **Route:** `/lms/[slug]/ai/flashcards`
- **What the learner sees:** today's due cards. Each card shows the front (term or question) → flip to back (definition or answer) → self-rate (Again / Hard / Good / Easy). The scheduler (SM-2 / FSRS) reschedules the card based on the rating. Stats panel shows today's due count, total cards in the deck, current retention rate.
- **Tier behaviour:** Silver gets standard scheduling. Gold adds a Drill Mode that prioritises cards in weak-area topics surfaced by the latest gap report.
- **Primary action:** review the next due card.

### 5. AI concept coach (Gold)

- **Route:** `/lms/[slug]/ai/concept-coach`
- **What the learner sees:** a chat window. Learner types a syllabus question ("What's the difference between the Risk Register and the Risk Management Approach?"). Coach replies with a grounded explanation plus citations to the relevant reference card or study guide section. Out-of-scope questions trigger the refusal side flow (#9).
- **Tier behaviour:** Gold only. Concept Q&A framing at Foundation, scenario Q&A framing at Practitioner.
- **Primary action:** type another question, or click a citation to jump into Stage 3.

### 6. AI scenario coach (Gold + Practitioner-level only)

- **Route:** `/lms/[slug]/ai/scenario-coach`
- **What the learner sees:** scenario picker → branching dialogue. The coach presents a project scenario ("You're the Project Manager on a software delivery project; the Senior User has just escalated a scope change…"). Learner picks how to respond from 3–4 options. The coach gives feedback on the choice, then continues the scenario. After 4–6 turns, a summary panel scores the learner against a rubric.
- **Tier behaviour:** Gold only. **Not rendered at all on Foundation-level courses** per Trap #7 — Foundation MCQs do not test facilitation skill, so Practitioner-level roleplay would be misaligned.
- **Primary action:** pick a response.

### 7. AI interview coach (Gold support)

- **Route:** `/lms/[slug]/ai/interview-coach`
- **What the learner sees:** pick a target role (Project Manager, Programme Manager, Agile Coach). Chat with a mock interviewer who asks 5–10 typical questions. Learner types an answer; coach gives feedback (clarity, structure, STAR-method adherence) and asks the next question. Final summary at the end.
- **Tier behaviour:** Gold only. Lives in Support & Mentoring, not in Exam Preparation — it is a career value-add, not an exam-prep tool.
- **Primary action:** type an answer.

### 8. Daily AI challenge (Gold)

- **Route:** `/lms/[slug]/ai/daily-challenge`
- **What the learner sees:** today's scenario (one per calendar date, same for the whole cohort that day). A short situational prompt plus a question. After thinking, click "Reveal model answer" to see how an expert would handle it. Optional cohort comments below.
- **Tier behaviour:** Gold only.
- **Primary action:** think · reveal · optionally comment.

### 9. Dashboard returns with AI usage reflected

- **Route:** `/lms/[slug]`
- **What the learner sees:** AI tiles now carry usage metrics — "Today's due flashcards: 15", "Concept coach: 3 questions answered today", "Daily challenge: complete". The readiness panel reflects that gap-report acknowledgement (one of its three inputs) has been satisfied.
- **Primary action:** continue with the next study activity.

## Side flows

### Refusal — out-of-syllabus question (concept coach)
When the learner asks something outside the course's syllabus index. Format: "That topic isn't on the PRINCE2 Foundation syllabus. Try asking about [3 suggestions surfaced from the syllabus index]." No "I don't know" — always redirect to in-scope alternatives.

### Plan re-generation
When the learner clicks "Re-generate" on the study plan because they've fallen behind or completed a new mock. Shows a diff: which days changed and why. Confirms before overwriting.

### Daily challenge archive
Browse past days' challenges. Each entry is locked at the time of original release (so learners can't binge-skip ahead); previous days carry their model answers and cohort comments.

### Cost cap reached (Gold concept and scenario coaches)
If a learner exceeds a fair-use daily message cap, the chat surface shows "Daily limit reached — resumes in HH:MM" with no retry option. Quiet rate-limiting, no upsell.

### AI tile freshness
Tiles surface "Re-run from latest mock" when the underlying input has changed but the AI output is stale (e.g. the learner took a new mock since the last gap report was generated).

## Flow

```
Stage 4 starts here (Silver / Gold only — Bronze tiles show as locked) →

       ┌──────────────────────────┐
       │ 1. AI tools section view │
       │   /lms/[slug] (AI block) │
       └────────────┬─────────────┘
                    │  pick a tool
       ┌────────────┼─────────────┬──────────┬──────────┬──────────┐
       ▼            ▼             ▼          ▼          ▼          ▼
   ┌────────┐ ┌─────────┐ ┌───────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐
   │2. Plan │ │3. Gap   │ │4. Adaptive│ │5. Concept│ │6. Scen. │ │8.Daily│
   │        │ │   report│ │ flashcards│ │   coach  │ │  coach  │ │ chall.│
   └────┬───┘ └────┬────┘ └─────┬─────┘ └─────┬───┘ └────┬────┘ └───┬──┘
        │          │             │             │           │          │
        │     (action links      │       (chat —          ▼          │
        │      back to Stage 3)  │        refusal      ┌──────────┐  │
        │                        │        if out-of-   │ Branching│  │
        │                        │        syllabus)    │ dialogue │  │
        │                        │             │       │ 4–6 turns│  │
        │                        │             │       └────┬─────┘  │
        │                        │             │            ▼        │
        │                        │             │       Final summary │
        │                        │             │                     │
        │                        │             │                     │
       (Re-generate              │             │                     │
        triggers diff modal      │             │                     │
        — side flow)             │             │                     │
        │                        │             │                     │
        └────────────┬───────────┴─────────────┴─────────────────────┘
                     │
                     ▼
       ┌──────────────────────────┐
       │ 9. Dashboard updated     │
       │   AI usage on tiles      │
       │   Readiness reflects     │
       │   gap-report acknowledged│
       └──────────────────────────┘
       ← Stage 4 ends · readiness score has moved
```

## How Stage 4 varies by course and package

The same axes as Stage 3 — tier, course family level, course shape, syllabus content — but the **tier axis dominates** because AI is fundamentally a paid feature.

### Axis 1 — Tier (the dominant axis)

| AI tool | Bronze | Silver | Gold |
|---|---|---|---|
| AI study plan | 🔒 | ✓ Templated (one of three preset cadences) | ✓ Personalised — re-generates from latest mock |
| AI gap report | 🔒 | ✓ Available after any mock | ✓ + "Refresh my plan from this" CTA |
| Adaptive flashcards | 🔒 | ✓ Standard SM-2 scheduling | ✓ + Drill Mode for weak areas |
| AI concept coach | 🔒 | 🔒 | ✓ Unlimited (with fair-use cap) |
| AI scenario coach | 🔒 | 🔒 | ✓ (Practitioner-level only — Trap #7) |
| AI interview coach | 🔒 | 🔒 | ✓ (in Support, not Exam Prep) |
| Daily AI challenge | 🔒 | 🔒 | ✓ |

### Axis 2 — Course family level (Foundation vs Practitioner)

| Element | Foundation | Practitioner |
|---|---|---|
| AI concept coach | Concept Q&A — "What is X?" framing | Scenario Q&A — "In this scenario, why does X apply?" |
| AI scenario coach | **Not rendered at all** (Trap #7) | Available at Gold; full Practitioner roleplay |
| AI study plan | Built around knowledge milestones (read → attempt → mock) | Built around scenario-application milestones |
| AI gap report | Topic-cluster gaps (which areas to revisit) | Application gaps (which scenario types to practise) |

### Axis 3 — Course shape (standalone vs combo)

| Element | Standalone | Combo (F+P) |
|---|---|---|
| AI study plan | One plan to one exam date | One plan that sequences Foundation prep → Practitioner prep, with the level-transition handled explicitly |
| Flashcards | One deck | Two decks (level-tagged) under a unified scheduler |
| Concept coach | Single syllabus index | Coach knows both syllabi; tags answers by level |
| Scenario coach | Only on Practitioner standalones | Available — Practitioner-level roleplay |
| Gap report | One mock → one report | Each mock tagged by level → two parallel report tracks |

### Axis 4 — Syllabus content

The AI tools' refusal layer is **course-specific**. The same learner question ("What's Tailoring?") gets a real answer from a PRINCE2 Practitioner concept coach and a polite refusal from a Lean Six Sigma Yellow Belt concept coach. The syllabus index per course defines the boundary, and the refusal copy is the most visible UX signal that the AI is staying in lane.

### Worked examples

#### Example 1 · PRINCE2 Foundation Gold — concept coach yes, scenario coach no
- AI tiles rendered: study plan, gap report, flashcards, concept coach, daily challenge, interview coach. **6 tools.**
- Scenario coach tile is not even rendered (Trap #7).
- Concept coach refuses Practitioner-only topics like Tailoring.

#### Example 2 · PRINCE2 Practitioner Gold — full AI suite
- AI tiles rendered: study plan, gap report, flashcards, concept coach, scenario coach, daily challenge, interview coach. **7 tools.**
- Concept coach answers in scenario framing.
- Scenario coach branches across Practitioner-level project situations.

#### Example 3 · PMP Silver — limited AI suite
- AI tiles rendered: study plan (templated), gap report, flashcards. **3 tools active.**
- Concept coach, scenario coach, interview coach, daily challenge all show as locked with "Upgrade to Gold" CTAs.

#### Example 4 · PMP Bronze — no AI
- Entire AI section header reads "AI tools (unlock at Silver+)". All tiles locked.
- The dashboard still shows the section so the upgrade path is visible — never hidden.

## End of Stage 4

A Silver or Gold learner now has personalised feedback loops layered on top of their static study. The AI gap report after every mock keeps them aware of what to revisit; the personalised study plan keeps them on track to the exam date; the concept coach answers the questions reference cards leave ambiguous. The readiness gate that opens Stage 6 will draw on all of this — **gap-report acknowledgement is one of its three inputs**, and the personalised study plan is what tells the learner when the gate is realistically reachable. Stage 5 picks up the human-delivered side: live training, coaching, and support.

---

# Stage 5 — Live services and support: the human scaffold

Stage 5 covers the human-delivered side of the LMS: instructor-led live training, recurring Q&A sessions, 1:1 coaching (Gold), the support inbox, community access, the cashback ledger, and the money-back guarantee. Unlike Stages 3 and 4, **none of these inputs feed the readiness gate directly** — they are the scaffold around the study loop, not the loop itself. The LMS's job is to make every entitlement legible and actionable from one dashboard.

## The `info` model — entitlements and scheduled services

Every Stage 5 feature lives in the `info` category from the catalogue's three-way taxonomy. They share three traits:

- **Calendar-bound** (live sessions, coaching) or **always-on** (support, community).
- **Tier-quantified** — Bronze gets Q&A and email support; Silver adds chat support and a retake; Gold adds 1:1 coaching, phone support, retake doubles, and the money-back guarantee.
- **Off-engine** — the LMS shows the surface; actual delivery (Zoom, helpdesk, Discord) lives elsewhere. The LMS is the *legible front desk*, not the back room.

## Screens

### 1. Support section view

- **Route:** `/lms/[slug]` (scrolled to "Support & Mentoring")
- **What the learner sees:** section header with tier badge. Tile group: Live training · Q&A sessions · 1:1 coaching (Gold) · Support · Community · Cashback ledger · Attendance certificate · Money-back guarantee (Gold).
- **Primary action:** pick a tile.

### 2. Live training schedule

- **Route:** `/lms/[slug]/live-training`
- **What the learner sees:** calendar of upcoming session blocks (a 16–32 hour course typically broken into 4–8 sessions across 2–4 weekends). Each block shows date, time in the learner's timezone, instructor, capacity, and RSVP state. Header surfaces total hours pulled from the catalogue.
- **Primary action:** RSVP / un-RSVP per block. After attendance, the block reveals a "Watch recording" link.

### 3. Live session detail

- **Route:** `/lms/[slug]/live-training/[sessionId]`
- **What the learner sees:** topic, learning objectives, instructor bio, pre-reading recommendation (deep-linked into Stage 3), "Join session" button (active 15 min before start), and a "Download calendar invite" button.
- **Primary action:** join · cancel · download invite.

### 4. Q&A session booking

- **Route:** `/lms/[slug]/qa-session`
- **What the learner sees:** list of recurring Q&A slots (typically weekly or twice-weekly), the instructor on duty per slot, learner attendance count. Calendar view toggle.
- **Primary action:** RSVP / un-RSVP.

### 5. 1:1 coaching booking (Gold)

- **Route:** `/lms/[slug]/coaching`
- **What the learner sees:** coaching credits remaining (e.g. "2 of 3 used"). Available coach slots in the next 4 weeks. Optional pre-call prep questionnaire ("What do you want to focus on?"). Standalone Gold = 3 flexible sessions; Combo Gold = sequenced F → P → flex per the Combo Packaging Rule.
- **Primary action:** book a slot · join when active · review the recording afterwards.

### 6. Support inbox

- **Route:** `/lms/[slug]/support`
- **What the learner sees:** list of open and resolved tickets. Composer to create a new ticket. Tier badge showing which channels are included (Bronze: email; Silver: email + chat; Gold: email + chat + phone).
- **Primary action:** new ticket · reply to existing thread.

### 7. Ticket thread / reply

- **Route:** `/lms/[slug]/support/[ticketId]`
- **What the learner sees:** ticket thread (learner messages + support replies), attachment uploader, status (open / waiting on us / resolved). For Gold, a "Call us now" button when phone support is included and an agent is available.
- **Primary action:** send reply · attach file · close ticket.

### 8. Community access

- **Route:** `/lms/[slug]/community`
- **What the learner sees:** landing page describing the community (Discord / Circle / dedicated forum), code of conduct, and a single "Join the community" CTA. Once joined, this tile becomes a direct link out to the community.
- **Primary action:** join · open community.

### 9. Cashback ledger

- **Route:** `/lms/[slug]/cashback`
- **What the learner sees:** ledger lines — enrolment cashback (e.g. 5 / 8 / 12% of purchase price for Bronze / Silver / Gold), accrual events ("Attended Session 1: $20", "Completed Mock 1: $30"), payout history. Total pending and total paid.
- **Primary action:** request payout once pending exceeds the threshold.

### 10. Money-back guarantee panel (Gold)

- **Route:** `/lms/[slug]/money-back`
- **What the learner sees:** plain-language explanation of the guarantee ("100% refund if you don't pass the exam, conditional on completing the readiness gate"), an eligibility checklist showing readiness-gate progress, the claim form (greyed out until a failed exam outcome is recorded). For combo learners, the guarantee covers "either exam".
- **Primary action:** review terms · prepare claim if eligible. (The actual claim flow is in Stage 7.)

### 11. Attendance certificate

- **Route:** `/lms/[slug]/certificates/attendance`
- **What the learner sees:** an attendance certificate (downloadable PDF) auto-generated once the learner attends ≥ 80% of live sessions. **Not** the final certification — that's Stage 7's job. Useful for PDU / CPD claims and as a participation record.
- **Primary action:** download PDF · share to LinkedIn.

### 12. Dashboard returns with services reflected

- **Route:** `/lms/[slug]`
- **What the learner sees:** support tiles now carry usage state — "Next live session: Tue 10:00", "1 of 3 coaching used", "2 open tickets", "Attendance: 4 of 6 sessions". Cashback tile shows pending balance.
- **Primary action:** continue with the next study activity.

## Side flows

### Reschedule a live session
Within a defined cutoff (e.g. 24h before start), the learner can swap to another session block. Outside the window, support must be contacted.

### Cancel a 1:1 coaching slot
Within 12h of the slot, cancellation forfeits the credit. Outside that window, the credit is returned. Cancel modal states this explicitly.

### Support tier mismatch
If a Bronze learner tries to "Call us now" (phone support is Gold-only), the button is locked with an "Upgrade to Gold" CTA — same pattern as everywhere else in the LMS.

### Cashback payout request
Once accrued cashback exceeds the minimum threshold, the learner can request payout. Bank / UPI details are pre-filled from the invensislearning.com account.

### Instructor profile
Clicking an instructor's name anywhere → bio modal with qualifications and learner ratings. No deep instructor pages in v1.

### Live session recording playback
If the learner couldn't attend live, the recording becomes available within 24h, scoped to the learner's enrollment.

## Flow

```
Stage 5 starts here (runs in parallel with Stages 3 and 4) →

      ┌─────────────────────────────┐
      │ 1. Support section view     │
      │   /lms/[slug] (Support tile)│
      └──────────────┬──────────────┘
                     │  pick a tile
       ┌─────────────┼─────────────┬───────────┬───────────┬──────────┐
       ▼             ▼             ▼           ▼           ▼          ▼
  [Live training] [Q&A]       [Coaching]  [Support]  [Community] [Cashback]
       2.             4.           5.          6.          8.          9.
        │             │            │           │           │           │
        ▼             ▼            ▼           ▼           ▼           ▼
   ┌────────┐   ┌────────┐   ┌─────────┐ ┌────────┐  ┌────────┐ ┌─────────┐
   │3. Sess.│   │ RSVP   │   │ Book a  │ │7.Thread│  │ Join → │ │ Request │
   │ detail │   │ Q&A    │   │  slot   │ │ /reply │  │external│ │ payout  │
   └───┬────┘   └────────┘   └────┬────┘ └────────┘  └────────┘ └─────────┘
       │                          │
       ▼                          ▼
   Attend session         Join coaching call
       │                          │
       ▼                          ▼
   Recording                Recording
       │                          │
       └────────────┬─────────────┘
                    │
                    ▼
       ┌─────────────────────────────┐
       │ 11. Attendance certificate  │
       │   (auto at ≥80% attendance) │
       └──────────────┬──────────────┘
                      ▼
       ┌─────────────────────────────┐
       │ 10. Money-back panel (Gold) │
       │   visible always, claim     │
       │   surfaces only on failure  │
       └──────────────┬──────────────┘
                      ▼
       ┌─────────────────────────────┐
       │ 12. Dashboard updated       │
       │   Services reflect usage    │
       └─────────────────────────────┘
       ← Stage 5 ends · does not feed the readiness gate
```

## How Stage 5 varies by course and package

The tier axis dominates again — what services are included differs sharply.

### Axis 1 — Tier (the dominant axis)

| Service | Bronze | Silver | Gold |
|---|---|---|---|
| Live training | ✓ Full hours per course | ✓ Same | ✓ Same |
| Instructor Q&A sessions | ✓ Group sessions | ✓ Same | ✓ Same |
| 1:1 coaching | 🔒 | 🔒 | ✓ 3 × 60 min |
| Support — email | ✓ 24×5 | ✓ 24×5 | ✓ 24×5 |
| Support — chat | 🔒 | ✓ 24×5 | ✓ 24×5 |
| Support — phone | 🔒 | 🔒 | ✓ 24×5 |
| Community access | ✓ | ✓ | ✓ |
| Retake training | 🔒 | ✓ 1 × 90 days | ✓ 2 × 180 days |
| EMI / pay-in-parts | 🔒 | ✓ | ✓ |
| Cashback | ✓ 5% | ✓ 8% | ✓ 12% |
| Money-back guarantee | 🔒 | 🔒 | ✓ 100% if learner doesn't pass |
| Post-cert pathways guide | 🔒 | 🔒 | ✓ (in Support, not Exam Prep) |
| Attendance certificate | ✓ at ≥80% attendance | ✓ | ✓ |

### Axis 2 — Course family level (Foundation vs Practitioner)

- Live training and Q&A have the **same shape** at both levels — same channels, same cadence — but different content depth.
- 1:1 coaching content differs: **Foundation coaching = concept clarification**, **Practitioner coaching = scenario application** (matching the level's exam type).
- Post-cert pathways guide (Gold) points to different next-steps per level — Foundation → Practitioner; Practitioner → PRINCE2 Agile, P3O — per Family Rule F8.

### Axis 3 — Course shape (standalone vs combo)

| Element | Standalone | Combo (F+P) |
|---|---|---|
| Live training hours | Per course (e.g. 16 hr Foundation, 16 hr Practitioner) | Sum: 32 hr (16 F + 16 P) with breakdown visible inline per Combo Rule 3 |
| 1:1 coaching count (Gold) | 3 × 60 min, flexible | **3 × 60 min total, sequenced F → P → flex** — not doubled to 6 (per Combo Packaging Rule 11) |
| Retake training | 1 (Silver) / 2 (Gold) — one exam | 1 (Silver) / 2 (Gold) — **"either exam" qualifier required** |
| Money-back guarantee | "if you don't pass" — singular exam | **"if you don't pass either exam"** — qualifier non-negotiable per Combo Rule 13 |
| Post-cert pathways | Next cert in family | Beyond the combo (e.g. PRINCE2 F+P → PRINCE2 Agile, P3O) |

### Axis 4 — Course-specific live training hours

This is purely a catalogue authoring decision. PMP runs ~35 hours; PRINCE2 Foundation 16; ITIL 4 Foundation ~20; Lean Six Sigma Black Belt 40+. The schedule UI is unchanged — only the number of session blocks and the total-hours indicator reflect the course's choice.

### Worked examples

#### Example 1 · PRINCE2 Foundation Bronze
- 16 hr live training across 4 weekend blocks · Instructor Q&A every Thursday.
- Email support (24×5) · no chat / no phone.
- No coaching · no retake · 5% cashback · no money-back.
- Attendance certificate auto-issued at ≥80% session attendance.

#### Example 2 · PRINCE2 Foundation Gold
- Same 16 hr live training + Q&A as Bronze.
- Email + chat + phone support (24×5).
- 3 × 1:1 coaching credits (flexible).
- 2 retake training sessions (180 days).
- 12% cashback · EMI available.
- Money-back guarantee (100% if learner doesn't pass).
- Post-cert pathways guide pointing to Practitioner / Agile.

#### Example 3 · PRINCE2 F+P Gold combo
- 32 hr live training (16 F + 16 P, breakdown visible).
- 3 × 1:1 coaching sequenced **F → P → flex** (not 6).
- 2 retake credits tagged **"either exam"**.
- Money-back qualifier: **"if you don't pass either exam"**.
- Post-cert pathways guide pointing to PRINCE2 Agile / P3O (never back to Practitioner — combo learners are past that).

#### Example 4 · PMP Silver
- ~35 hr live training.
- Email + chat support, 1 retake training (90 days).
- 8% cashback · EMI available.
- No coaching · no money-back · phone support locked with Upgrade CTA.

## End of Stage 5

The learner now has the full human scaffold around the study loop: scheduled live training, drop-in Q&A, optional 1:1 coaching, support when stuck, a community to belong to, financial visibility through the cashback ledger, and — at Gold — the money-back guarantee underwriting the purchase. **None of these add directly to the readiness score**; they support the learner so they can get to the readiness gate themselves. Stage 6 picks up that gate: the moment the LMS decides the learner is ready to redeem the exam voucher.

---

# Stage 6 — Readiness gate and voucher redemption: the commercial linchpin

Stage 6 is the **most commercially load-bearing stage in the LMS**. It is the moment the platform decides the learner is genuinely ready to sit the exam and unlocks the voucher. For Gold, the money-back guarantee depends entirely on this gate being honoured: a learner who skipped the gate has no claim if they fail. The gate is not marketing copy — it is a real state transition computed from real inputs from Stages 3 and 4.

## The three readiness inputs

```
readiness_score = f( mock_attempts , qbank_coverage , gap_report_ack )
```

| Input | Source | Threshold per tier |
|---|---|---|
| Mock exam attempts at the course's pass mark | Stage 3 — mock paper attempts and their scores | Bronze: ≥ 1 mock at ≥ 80%. Silver: ≥ 2 at ≥ 85%. Gold: ≥ 3 at ≥ 85%. |
| Question-bank coverage | Stage 3 — Q-bank attempts spread across topic clusters | All tiers: ≥ 70% of bank attempted, with **no single topic cluster below 50%** (anti-cherry-picking). |
| AI gap-report acknowledgement | Stage 4 — viewing and acknowledging the gap report after each qualifying mock | Bronze: N/A (no AI). Silver: ack ≥ 1. Gold: ack ≥ 2. |

The gate passes when **all applicable inputs cross threshold simultaneously**. The composite score (out of 100) is for legibility on the dashboard; the gate itself is binary — passed or not.

## State machine (the audit trail)

```
active  →  ready  →  voucher_redeemed  →  exam_scheduled  →  exam_taken  →  ( passed | failed )  →  ( closed | refunded )
   ↑          │
   └──────────┘
   (re-evaluated whenever a new mock / Q-bank attempt / gap-report ack lands)
```

`active → ready` is **automatic** the moment the inputs cross threshold. `ready → voucher_redeemed` requires explicit learner action (so the voucher is never auto-revealed). `failed → refunded` requires the money-back claim flow in Stage 7, which checks that the gate was honoured.

## Screens

### 1. Readiness panel — overview

- **Route:** `/lms/[slug]/readiness`
- **What the learner sees:** big composite score (0–100) at the top. Three large input cards below — Mock attempts · Q-bank coverage · Gap-report ack — each showing current state vs threshold and a "✓ met" or "→ short by X" badge. A projected readiness date based on current pace ("At your current pace you'll be ready by Apr 8 — 6 days before exam"). A prominent "Refresh score" button.
- **Tier behaviour:** Bronze hides the gap-report card entirely; composite weighting becomes 60% mocks / 40% Q-bank.
- **Primary action:** click an input card to drill into what's missing.

### 2. Drill-down — Mock attempts

- **Route:** `/lms/[slug]/readiness/mocks`
- **What the learner sees:** every mock paper attempted, with score, pass-mark check, and whether it counts toward the gate (above tier threshold or not). Remaining attempts toward threshold ("1 more mock at ≥ 85% to satisfy Gold"). Direct CTA to the next available mock in Stage 3.
- **Primary action:** start the next mock.

### 3. Drill-down — Q-bank coverage

- **Route:** `/lms/[slug]/readiness/qbank`
- **What the learner sees:** topic-cluster heatmap. Each cluster shows attempted % and accuracy. Highlights any cluster below 50% (the anti-cherry-picking floor). Deep-links into Stage 3 question bank with topic pre-filtered.
- **Primary action:** practise the weak topic.

### 4. Drill-down — Gap-report acknowledgement (Silver / Gold)

- **Route:** `/lms/[slug]/readiness/gap-reports`
- **What the learner sees:** list of gap reports generated from past mocks, each with an ack status (acked / unacked / not yet generated). Unacked reports link back into Stage 4.
- **Primary action:** open the unacked report.

### 5. Voucher tile — locked state

- **Route:** `/lms/[slug]` (voucher tile in the Support section)
- **What the learner sees:** voucher tile with a prominent lock badge. Status text: "Readiness 71 / 100 — 14 points to unlock". CTA: "Open readiness panel".
- **Primary action:** click through to the readiness panel.

### 6. Voucher tile — unlocked state

- **What the learner sees:** the same tile transformed — glowing accent border, "Ready to redeem" status, and a bold "Redeem voucher" CTA.
- **Primary action:** redeem.

### 7. Voucher reveal modal

- A modal overlaid on the dashboard. Shows: awarding-body logo, certification level, voucher code, validity window (e.g. "valid for 12 months from today"), "Copy code" button, and a single primary CTA: "Open booking page →" linking to the awarding body.
- **Primary action:** copy the code, then continue to the booking handoff.

### 8. Awarding-body booking handoff

- **Route:** `/lms/[slug]/voucher/booking`
- **What the learner sees:** a brief explainer page that hands the learner off to the awarding body. "Now book your exam directly with [PeopleCert / PMI / APMG / Scrum.org]." Steps to take, the booking portal URL, and a support contact if something goes wrong on the awarding-body side.
- **Primary action:** open the booking portal (external link).

### 9. Exam scheduled state

- **Route:** `/lms/[slug]/voucher/scheduled`
- **What the learner sees:** a confirmation surface where the learner enters the date they've booked with the awarding body. Once entered, the dashboard's at-a-glance banner replaces "Voucher 🔒" with "Exam: Mar 15 · 14 days away".
- **Primary action:** enter the booked exam date, or update if rescheduled.

### 10. Combo voucher view (two tiles, two gates)

- For combo courses (F+P), **two voucher tiles render side by side** in the Support section. Each has its own readiness gate and unlocks independently.
- Typical learner pattern: Foundation gate passes first → redeem F voucher → sit F exam → continue prep → Practitioner gate passes → redeem P voucher.
- The money-back guarantee at combo Gold covers **either exam**.

### 11. Dashboard returns with voucher status updated

- **Route:** `/lms/[slug]`
- **What the learner sees:** voucher tile now shows "Code revealed · book by [validity date]" or "Exam scheduled · 14 days". The status banner has shifted from a locked padlock to a green tick. The readiness panel link is still available so the learner can see where they stand on weak areas before exam day.

## Side flows

### Almost-there celebration
When the composite score crosses 90, a celebratory banner surfaces on the dashboard: "You're almost there — one more mock and you're ready." Positive reinforcement at a moment when most learners stall.

### Override request (breaks the guarantee)
A learner can request voucher access before the gate passes via support (Stage 5). The override flow shows a hard confirmation modal: **"Redeeming early forfeits the money-back guarantee. Proceed?"** Logged in the audit trail. Used rarely but legitimate (e.g. scheduling around an awarding-body exam window).

### Voucher expiry reminder
Awarding-body vouchers typically have a 12-month validity window. The voucher tile surfaces an "Expires in N days" banner once the remaining window drops below 30 days. Also triggers a support nudge.

### Combo — per-level redemption
Combo learners redeem one voucher at a time. The Practitioner voucher stays locked until its own gate passes — Foundation readiness does not unlock Practitioner.

### Refresh readiness
A "↻ Refresh my readiness score" button on the panel re-evaluates from the latest data — used when the learner just finished a mock and wants to see the updated composite immediately.

### Reschedule exam
If the learner reschedules with the awarding body, they can update the exam date on screen 9. The countdown banner updates accordingly. No money-back impact — rescheduling is allowed.

## Flow

```
Stage 6 runs continuously from Stage 3 onward; the gate flips when
inputs cross threshold, the learner explicitly redeems, then books.

       ┌──────────────────────────────┐
       │ 1. Readiness panel — overview│
       │   /lms/[slug]/readiness      │
       └──────────────┬───────────────┘
                      │  Score: 71 / 100 (not yet ready)
                      ▼
       ┌──────────────────────────────┐
       │ Drill into the gap           │
       │  2. Mocks · 3. Q-bank ·      │
       │  4. Gap-report ack           │
       └──────────────┬───────────────┘
                      │  return to Stages 3 / 4 to fill gaps
                      ▼
                 (repeat the loop)
                      │
                      │  All applicable inputs cross threshold
                      ▼
       ┌──────────────────────────────┐
       │ enrollment.status = ready    │
       │ 6. Voucher tile glows        │
       └──────────────┬───────────────┘
                      │  learner clicks "Redeem voucher"
                      ▼
       ┌──────────────────────────────┐
       │ 7. Voucher reveal modal      │
       │   code · awarding body · TTL │
       └──────────────┬───────────────┘
                      ▼
       ┌──────────────────────────────┐
       │ 8. Awarding-body booking     │
       │   handoff (external link)    │
       └──────────────┬───────────────┘
                      │  learner books with awarding body
                      ▼
       ┌──────────────────────────────┐
       │ 9. Exam scheduled            │
       │   enrollment.status =        │
       │   exam_scheduled · countdown │
       └──────────────┬───────────────┘
                      ▼
                [ Stage 7 begins on exam day ]
```

## How Stage 6 varies by course and package

### Axis 1 — Tier (gate thresholds and consequences)

| Element | Bronze | Silver | Gold |
|---|---|---|---|
| Mock attempts threshold | ≥ 1 at ≥ 80% | ≥ 2 at ≥ 85% | ≥ 3 at ≥ 85% |
| Q-bank coverage threshold | ≥ 70% spread | ≥ 70% spread | ≥ 70% spread |
| Gap-report ack threshold | N/A | ≥ 1 | ≥ 2 |
| Composite score weighting | 60% mocks / 40% Q-bank | 45% mocks / 35% Q-bank / 20% gap | 40% mocks / 30% Q-bank / 30% gap |
| Money-back guarantee | None | None | 100% if gate honoured (Stage 7) |
| Override available | ✓ (no guarantee to break) | ✓ (no guarantee to break) | ✓ — but forfeits guarantee |

### Axis 2 — Awarding body (drives screens 7, 8)

The voucher reveal and handoff differ per awarding body. Same screens, different branding, instructions, and URLs:

| Family of courses | Awarding body | Booking portal |
|---|---|---|
| PRINCE2, ITIL, PRINCE2 Agile | PeopleCert | peoplecert.org booking flow |
| PMP, CAPM, PMI-ACP, PgMP, PMI-RMP, PfMP | PMI | pmi.org / Prometric |
| Change Management, Agile PM, COBIT | APMG | apmg-international.com |
| Lean Six Sigma (yellow / green / black) | Various LSS bodies | per body |
| Scrum (CSM / PSM) | Scrum Alliance / Scrum.org | per body |
| DevOps Foundation / Master, SIAM, VeriSM | DevOps Institute / SIAMI / VeriSM | per body |

### Axis 3 — Course shape (combo vs standalone)

| Element | Standalone | Combo (F+P) |
|---|---|---|
| Voucher tiles | One | **Two** — Foundation and Practitioner — each independently gated |
| Readiness gates | One composite | **Two parallel composites**, F and P tracked separately |
| Redemption order | One event | Foundation typically redeemed first; Practitioner later. Independent flows. |
| Money-back guarantee (Gold) | "if you don't pass" — singular | **"if you don't pass either exam"** per Combo Rule 13 |
| State machine | Single chain | Two parallel chains, one per exam |

### Axis 4 — Course-specific pass marks

The threshold check is against the **course's own pass mark** from its exam specs, not a fixed number. PRINCE2 Foundation is 60%, Practitioner is 55%, PMP requires above-target across performance domains, Lean Six Sigma Black Belt has its own pass mark. The "≥ 80%" / "≥ 85%" thresholds in the table above are relative to that pass mark — they read as "comfortably above the published pass mark", not literal exam scores.

### Worked examples

#### Example 1 · PRINCE2 Foundation Gold
- Gate inputs: ≥ 3 Foundation mocks at ≥ 85% (against a 60% pass mark) · ≥ 70% Q-bank with no cluster < 50% · ≥ 2 gap reports acked.
- Voucher: PeopleCert Foundation. Reveal modal carries PeopleCert logo and booking link.
- Money-back: 100% if doesn't pass · conditional on the gate not being overridden.

#### Example 2 · PMP Silver
- Gate inputs: ≥ 2 PMP mocks at ≥ 85% · ≥ 70% Q-bank · ≥ 1 gap report acked.
- Voucher: PMI. Reveal modal carries PMI logo and links to Prometric scheduling.
- No money-back.

#### Example 3 · PRINCE2 F+P Gold combo
- **Two gates running in parallel.** Foundation typically passes first.
- Foundation gate: ≥ 3 F mocks at ≥ 85% (closed book, 60% pass mark) · F Q-bank coverage · ≥ 2 F gap reports.
- Practitioner gate: ≥ 3 P mocks at ≥ 85% (open book, 55% pass mark) · P Q-bank coverage · ≥ 2 P gap reports.
- Vouchers: PeopleCert F + PeopleCert P, independently redeemed.
- Money-back guarantee covers **either exam** — gate must be honoured for the exam in question.

#### Example 4 · ITIL 4 Foundation Bronze
- Gate inputs: ≥ 1 mock at ≥ 80% · ≥ 70% Q-bank. No gap-report input (Bronze has no AI).
- Voucher: PeopleCert ITIL 4. No money-back guarantee.
- The composite score uses the 60% / 40% Bronze weighting.

## End of Stage 6

The voucher is the most commercially loaded artefact in the LMS. By gating it on the readiness score, the platform protects the learner from a wasted exam attempt and protects the company from underwriting a Gold money-back claim from a learner who never seriously prepared. The state machine ensures every transition is auditable — invaluable when a claim lands or when ops needs to explain why a particular learner couldn't redeem yet. Stage 7 picks up on the day the learner sits the exam and brings the journey to its conclusion: pass and certify, or fail and (at Gold) refund.

---

# Stage 7 — Exam day to certification (or refund): the closing stage

Stage 7 is the closing stage. The learner sits the exam (off-platform, with the awarding body), the LMS records the outcome, and the journey branches sharply along two lines: **pass** unlocks the certificate, post-cert pathways, and the renewal cycle; **fail** unlocks tier-dependent recovery — retake training at Silver/Gold, the money-back claim at Gold only, or re-purchase at Bronze.

## The two-branch state machine

```
exam_taken
   │
   ├── passed  ─►  certificate_issued  ─►  pathways_explored  ─►  renewal_cycle_tracked  ─►  closed
   │
   └── failed
         │
         ├── Bronze ─►  re-purchase voucher  OR  closed
         ├── Silver ─►  retake_training (1 × 90 days)  ─►  re-attempt window  OR  closed
         └── Gold   ─►  retake_training (2 × 180 days)
                    AND/OR
                    money-back claim ─► refund_processed ─► refunded
```

The branch is automatic the moment the outcome is recorded. The money-back path at Gold is conditional on the **readiness gate having been honoured** in Stage 6 — overrides forfeit it.

## Screens

### 1. Exam day prep

- **Route:** `/lms/[slug]/exam-day`
- **What the learner sees:** countdown to the booked exam time (days · hours · minutes), exam-day checklist (ID document, system requirements if online-proctored, quiet room, water bottle, no books for closed-book exams), exam policies summary, and a "Log in to the awarding body portal 30 minutes before" reminder.
- **Primary action:** confirm prep · review policies.

### 2. Exam day standby

- **Route:** `/lms/[slug]/exam-day/active` (auto-routes here during the booked exam window)
- **What the learner sees:** a deliberately calm "Good luck — you're sitting [exam] right now" page. Study tools and mock-exam runners are **disabled** for the exam window to prevent last-minute panic and any appearance of unauthorised reference material.
- **Primary action:** wait. Close the tab.

### 3. Outcome recording

- **Route:** `/lms/[slug]/exam-result/record`
- **What the learner sees:** form to record the result — passed / failed, score (if known), date verified, optional proof upload (awarding-body confirmation PDF or screenshot). Some awarding bodies push the result via API and this form is pre-filled; others require manual entry with ops verification.
- **Tier behaviour:** ops verifies for Silver and Gold before status flips (because of money-back and retake implications). Bronze can self-record pending light verification.
- **Primary action:** submit result.

### 4. Pass — certificate page

- **Route:** `/lms/[slug]/certificate`
- **What the learner sees:** the official certification certificate, mirrored in the LMS for one-click access. Awarding-body branding (PMI / PeopleCert / APMG / etc.), learner name, certification level, date earned, validity window if applicable, certificate ID. Big download-PDF button.
- **Primary action:** download · share · copy link.

### 5. Pass — social share

- **Route:** `/lms/[slug]/share`
- **What the learner sees:** preview cards for LinkedIn / X / WhatsApp pre-filled with the cert title, learner name, awarding body, and a back-link to the original course on invensislearning.com (for referral attribution). One-click post for LinkedIn.
- **Primary action:** share to a platform.

### 6. Pass — post-cert pathways

- **Route:** `/lms/[slug]/pathways`
- **What the learner sees:** curated next-step recommendations based on the cert just earned and the current course family. For PRINCE2 Foundation: → Practitioner, → PRINCE2 Agile. For PRINCE2 Practitioner: → PRINCE2 Agile, → P3O. For PMP: → PgMP, → PMI-ACP. Each pathway shown with a "Learn more" CTA that jumps back to invensislearning.com (the start of a new Stage 1).
- **Tier behaviour:** Gold gets the curated pathway with renewal-cycle awareness and a graduate discount code; Silver and Bronze get the standard list.
- **Primary action:** click a pathway · explore on invensislearning.com.

### 7. Pass — renewal cycle tracker

- **Route:** `/lms/[slug]/renewal`
- **What the learner sees:** certificate validity window (e.g. "Indefinite renewal" for PRINCE2 Foundation, "Re-register every 3 years" for PRINCE2 Practitioner, "60 PDUs every 3 years" for PMP, "3-year renewal" for ITIL 4). For PDU-based certs, a PDU tracker with logged activities, total accrued, and a CTA to log a new activity. For re-registration certs, a countdown and a CTA to start re-cert prep.
- **Primary action:** log a PDU activity · explore re-cert · set reminder.

### 8. Fail — outcome view

- **Route:** `/lms/[slug]/exam-result` (after a fail is recorded)
- **What the learner sees:** gentle messaging — "It's a setback, not a stop." The screen then surfaces the tier-appropriate recovery paths:
  - **Bronze:** "Re-purchase a voucher on invensislearning.com" + a discounted-retry referral code · or "Close enrollment".
  - **Silver:** "Book retake training (1 × 90 days remaining)" + "Re-attempt window: 90 days from your failed exam" · or close.
  - **Gold:** "Book retake training (2 × 180 days)" AND/OR "Claim 100% money-back guarantee" · or close.
- **Primary action:** pick the recovery path forward.

### 9. Fail — retake training booking (Silver / Gold)

- **Route:** `/lms/[slug]/retake`
- **What the learner sees:** similar to the live training schedule in Stage 5, but tagged as "Retake". Re-attendance of the live training sessions counts as a retake credit. Silver has 1 within 90 days; Gold has 2 within 180. After the retake, the readiness gate (Stage 6) re-opens for a new voucher.
- **Primary action:** book a retake session.

### 10. Fail — money-back claim form (Gold only)

- **Route:** `/lms/[slug]/money-back/claim`
- **What the learner sees:** claim form pre-populated with: enrollment details, the failed exam outcome, and **a gate-honoured checklist** mirroring Stage 6's three inputs (mock attempts at threshold, Q-bank coverage, gap-report ack). All three must show ✓ at the time of voucher redemption for the claim to be valid. Bank / UPI / payment details (pre-filled from invensislearning.com account).
- **Tier behaviour:** Gold only. Renders as locked with explanation for Silver and Bronze.
- **Primary action:** submit claim · or, if the checklist fails, request override review via support.

### 11. Fail — refund processing status

- **Route:** `/lms/[slug]/money-back/status/[claimId]`
- **What the learner sees:** claim status — submitted · verified · approved · rejected · refunded. Timeline with each step and date. If rejected (typically because the gate was overridden), the rejection reason is shown alongside a support contact.
- **Primary action:** wait for status update · contact support if stuck or rejected.

### 12. Closed enrollment — next steps

- **Route:** `/lms/[slug]` (terminal state)
- **What the learner sees:** enrollment status badge: closed (passed) or closed (refunded). Dashboard simplifies to a compact summary: final certificate (if passed), share button, post-cert pathways, original course archived but readable, and a prominent "Browse new courses on invensislearning.com" CTA with referral attribution preserved.
- **Primary action:** explore the next course.

## Side flows

### Awarding-body result delay
Some awarding bodies take days to confirm results. The LMS shows "Awaiting awarding-body confirmation" on screen 3 until verified, with a daily nudge.

### Pass with distinction
Some certs award distinction or honours grades (varies per body — not PRINCE2, not PMP, but some). Surface the distinction badge on the certificate page when applicable.

### Multiple retake attempts within window
Silver / Gold learners can use their retake credits across multiple attempts within the window. Once credits are exhausted or the window expires, re-purchase becomes the only path.

### Claim rejection — gate not honoured
If the audit trail shows the gate was overridden in Stage 6, the money-back claim is auto-rejected with a referenced explanation. Support escalation possible but discretionary — overrides are explicit acknowledgements that the guarantee was waived.

### Renewal cycle reminder
PMP and PRINCE2 Practitioner (and several others) have renewal cycles. The LMS surfaces a reminder banner on the dashboard 6 months before the validity ends; the renewal tracker (screen 7) becomes the next active workspace.

### Move to next cert (cross-sell)
After a pass, the post-cert pathways CTA jumps the learner back to invensislearning.com (effectively Stage 1 again) with a graduate referral code embedded — usually a graduate-discount offer.

### Combo per-exam outcomes
For combo learners, each exam outcome is recorded independently. A learner who passes Foundation but fails Practitioner can claim money-back on the Practitioner attempt only (Gold combo), keep the Foundation cert, and choose whether to retake or re-purchase the Practitioner attempt.

## Flow

```
Stage 7 starts on exam day →

       ┌─────────────────────────────┐
       │ 1. Exam day prep            │
       │  countdown · checklist      │
       └──────────────┬──────────────┘
                      ▼
       ┌─────────────────────────────┐
       │ 2. Exam day standby         │
       │  LMS tools disabled         │
       └──────────────┬──────────────┘
                      │  exam happens at awarding body (off-platform)
                      ▼
       ┌─────────────────────────────┐
       │ 3. Outcome recording        │
       │  passed / failed            │
       └──────┬──────────┬───────────┘
              │          │
        passed│          │failed
              ▼          ▼
   ┌──────────────┐  ┌──────────────────────────────────────┐
   │ 4. Certificate│ │ 8. Fail outcome view                 │
   └──────┬───────┘  │   tier-dependent paths               │
          ▼          └────┬────────────────┬────────────────┘
   ┌──────────────┐       │                │
   │ 5. Share     │  Bronze│       Silver / Gold
   └──────┬───────┘       │                │
          ▼               ▼                ▼
   ┌──────────────┐  ┌──────────┐  ┌──────────────┐
   │ 6. Pathways  │  │ Re-buy   │  │ 9. Retake    │
   │  → /[next]   │  │ on inven.│  │   training   │
   └──────┬───────┘  └──────────┘  └──────┬───────┘
          ▼                                │
   ┌──────────────┐                    Gold only
   │ 7. Renewal   │                        │
   │   tracker    │                        ▼
   └──────┬───────┘              ┌──────────────────┐
          │                       │ 10. Money-back   │
          │                       │   claim form     │
          │                       │   (gate-honoured │
          │                       │    checklist)    │
          │                       └────────┬─────────┘
          │                                ▼
          │                       ┌──────────────────┐
          │                       │ 11. Refund status │
          │                       └────────┬─────────┘
          │                                │
          └────────────────┬───────────────┘
                           ▼
              ┌────────────────────────────┐
              │ 12. Closed enrollment      │
              │   final certificate · OR · │
              │   refunded — next steps    │
              └────────────────────────────┘
```

## How Stage 7 varies by course and package

The branching at the fail outcome is the most dramatic axis of variation in the whole LMS — Bronze, Silver, and Gold see fundamentally different screens. Pass-side variation is gentler.

### Axis 1 — Tier (the dominant fail-side axis)

| Element | Bronze | Silver | Gold |
|---|---|---|---|
| Retake training credits | None | 1 × 90 days | 2 × 180 days |
| Money-back guarantee | None | None | 100% if gate honoured |
| Fail outcome view CTAs | "Re-purchase" / close | "Book retake" / close | "Book retake" / "Claim refund" / close |
| Post-cert pathways | Standard list | Standard list | Curated pathway + grad discount |
| Cross-sell discount | Generic referral code | Generic + tracked | Personalised graduate discount |
| Renewal tracker | Surfaces if applicable | Surfaces if applicable | Surfaces if applicable (all tiers same here) |

### Axis 2 — Outcome (pass vs fail)

The state machine branches sharply:
- **Pass:** screens 4–7 (certificate → share → pathways → renewal).
- **Fail:** screens 8–11 (outcome view → retake/claim → refund or close).

Both eventually converge on screen 12 (closed enrollment).

### Axis 3 — Awarding body (certificate format and renewal rules)

The certificate UI on screen 4 reflects the awarding body's official format. Same screen, different chrome and certificate body:

| Family | Awarding body | Cert format | Renewal cycle |
|---|---|---|---|
| PRINCE2 Foundation | PeopleCert | Digital PDF + verifiable URL | Indefinite (no renewal) |
| PRINCE2 Practitioner | PeopleCert | Digital PDF + verifiable URL | **3-year re-registration** |
| ITIL 4 Foundation / Practitioner | PeopleCert | Digital PDF | 3-year renewal |
| PMP | PMI | Digital PDF + PMI registry | **3-year cycle requiring 60 PDUs** |
| Change Management F/P | APMG | Digital PDF + APMG registry | No renewal (level-bound) |
| Scrum (CSM / PSM) | Scrum Alliance / Scrum.org | Digital PDF | Scrum Alliance: biennial fee; Scrum.org: lifetime |
| Lean Six Sigma (per body) | Various | Per body | Per body |

The renewal tracker (screen 7) adapts: PDU logging UI for PMP, simple validity countdown for re-registration certs, no renewal section for lifetime certs.

### Axis 4 — Course shape (combo)

| Element | Standalone | Combo (F+P) |
|---|---|---|
| Outcome recording | One result | **Two independent results**, one per exam |
| Certificate | One | **Two certificates** (F + P) — combo grants both on full pass |
| Money-back claim | Per exam | **Per exam** — combo Gold can claim on Practitioner-only fail while keeping the F cert |
| Retake credits | Cover one exam | Cover **either exam** — explicit qualifier on screen 9 |
| Pathways | Next cert in family | Beyond the combo (e.g. PRINCE2 Agile, P3O) |

### Axis 5 — Renewal cycle (per cert, drives screen 7's shape)

- **PRINCE2 Foundation:** indefinite — screen 7 shows "no renewal required" and surfaces the post-cert pathway instead.
- **PRINCE2 Practitioner:** 3-year re-registration — screen 7 shows countdown and re-cert prep CTA.
- **PMP:** 3-year PDU cycle (60 PDUs required) — screen 7 surfaces a full PDU tracker with logged activities, categories (technical / leadership / strategic), and accrual chart.
- **ITIL 4:** 3-year renewal — countdown + renewal info.
- **APMG Change Management:** no renewal at Practitioner level once earned — screen 7 hides itself.

### Worked examples

#### Example 1 · PRINCE2 Foundation Gold — pass
- Recorded as passed (PeopleCert webhook).
- Certificate page: PeopleCert PDF, verifiable URL.
- Share: pre-filled LinkedIn card.
- Pathways: → Practitioner (with graduate discount), → PRINCE2 Agile.
- Renewal tracker: shows "Indefinite renewal — no action required".
- Enrollment closes as closed (passed).

#### Example 2 · PRINCE2 Foundation Bronze — fail
- Recorded as failed.
- No retake training credits, no money-back claim available.
- Fail outcome view shows: "Re-purchase a voucher" + close CTA.
- Enrollment closes as closed (failed).

#### Example 3 · PRINCE2 F+P Gold combo — pass Foundation, fail Practitioner
- Two outcomes recorded.
- Foundation certificate issued.
- Practitioner fail-outcome view offers: "Book retake (2 × 180 days remaining for P)" OR "Claim 100% money-back on Practitioner attempt".
- If claim is filed: refund processed for the Practitioner portion of the combo price. Foundation cert kept.
- Pathways guide adapts to "you have F, work toward P or other certs".

#### Example 4 · PMP Gold — pass
- Recorded as passed (PMI registry verification).
- Certificate: PMI digital cert + entry in PMI registry.
- Share: LinkedIn pre-filled card.
- Pathways: → PgMP, → PMI-ACP, → PMI-RMP (with grad discount).
- Renewal tracker: **3-year PDU cycle activated** — full PDU tracker becomes the new active workspace, with categorised logging (Talent Triangle: Ways of Working / Power Skills / Business Acumen).
- Enrollment status remains active for renewal tracking until cert lapses or renews.

## End of Stage 7

The learner's journey is now end-to-end: from a tier purchase on invensislearning.com (Stage 1), through activation and onboarding (Stage 2), the study loop (Stage 3), AI augmentation (Stage 4), human support (Stage 5), the readiness gate and voucher (Stage 6), to certification or recovery (Stage 7). Every stage is gated and audited, every tier behaves differently in deliberate ways drawn from the catalogue, and every transition leaves a clean trail that ops and finance can act on. The post-cert pathway points the learner back to invensislearning.com — the start of a new Stage 1, with the relationship intact and the learner's history pre-loaded for the next purchase.
