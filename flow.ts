/**
 * OpenFlowKit export — Invensis LMS user-journey graph.
 *
 * Covers everything shipped through Stage 6 (Tasks 1-70).
 *
 * `nodes`  — every page or modal-state surface in the prototype.
 * `edges`  — every user-initiated transition between them (CTA clicks,
 *            banner deep-links, form submits, gate transitions).
 *
 * Designed so OpenFlowKit can:
 *  - group nodes into swim-lanes via `stage`
 *  - colour nodes by `state` (gated / locked / modal)
 *  - filter visibility by `tier` (Bronze / Silver / Gold)
 *  - label arrows with `trigger` and `condition`
 */

export type Stage =
  | "auth"
  | "onboarding"
  | "dashboard"
  | "content"
  | "ai"
  | "support"
  | "readiness"
  | "voucher"
  | "exam"; // Stage 7 placeholder — not built yet, but reserved for upcoming nodes

export type Tier = "any" | "bronze" | "silver" | "gold";

export type State =
  | "default"
  | "gated"   // unlocks only when readiness/onboarding gate is met
  | "locked"  // tier-locked surface
  | "modal"   // overlay rather than a full page
  | "showcase"; // demo/showcase page that bundles multiple variants

export type Node = {
  id: string;
  route: string;
  label: string;
  stage: Stage;
  tier?: Tier;
  state?: State;
  task?: number;        // back-ref to the task in ui-bulk-task-template.xlsx
  note?: string;
};

export type Edge = {
  from: string;
  to: string;
  trigger: string;
  condition?: string;
};

/* ─── Nodes ──────────────────────────────────────────────────── */

export const nodes: Node[] = [
  /* Stage 2 — Auth & Onboarding (Tasks 1-12) */
  { id: "activate",              route: "/activate/[token]",                 label: "Activation landing",          stage: "auth",        task: 1 },
  { id: "set-password",          route: "/auth/activate",                    label: "Set password + T&C",          stage: "auth",        task: 2 },
  { id: "login",                 route: "/auth/login",                       label: "Return login",                stage: "auth",        task: 3 },
  { id: "forgot-password",       route: "/auth/forgot-password",             label: "Forgot password",             stage: "auth",        task: 4 },
  { id: "forgot-password-sent",  route: "/auth/forgot-password/sent",        label: "Reset link sent",             stage: "auth",        task: 5 },
  { id: "reset-password",        route: "/auth/reset-password/[token]",      label: "Reset password",              stage: "auth",        task: 6 },
  { id: "welcome",               route: "/welcome",                          label: "Welcome (single enrol)",      stage: "onboarding",  task: 7 },
  { id: "welcome-multi",         route: "/welcome-multi",                    label: "Welcome (multi enrol)",       stage: "onboarding",  task: 8 },
  { id: "onb-profile",           route: "/onboarding/profile",               label: "Step 1 — Profile",            stage: "onboarding",  task: 9 },
  { id: "onb-exam-date",         route: "/onboarding/exam-date",             label: "Step 2 — Exam date",          stage: "onboarding",  task: 10 },
  { id: "onb-baseline",          route: "/onboarding/baseline",              label: "Step 3 — Baseline mock",      stage: "onboarding",  task: 11 },
  { id: "onb-complete",          route: "/onboarding/complete",              label: "Step 4 — Ready",              stage: "onboarding",  task: 12 },

  /* Dashboards (Tasks 13-17) */
  { id: "dashboard-top",         route: "/dashboard",                        label: "Top-level dashboard",         stage: "dashboard",   task: 14 },
  { id: "dashboard-course",      route: "/dashboard/[course]",               label: "Per-course dashboard",        stage: "dashboard",   task: 15 },
  { id: "dashboard-progress",    route: "/dashboard/progress",               label: "Progress view",               stage: "dashboard",   task: 16 },
  { id: "dashboard-multi",       route: "/dashboard-multi",                  label: "Combo F+P dashboard",         stage: "dashboard",   task: 17 },
  { id: "lms-dashboard",         route: "/lms/[slug]",                       label: "LMS course dashboard",        stage: "dashboard",   task: 13 },

  /* Stage 3 — Course content (Tasks 18-26) */
  { id: "reference-card",        route: "/lms/[slug]/reference/[card]",      label: "Reference card",              stage: "content",     task: 18 },
  { id: "study-guide",           route: "/lms/[slug]/study-guide/[guide]",   label: "Study guide",                 stage: "content",     task: 19 },
  { id: "glossary",              route: "/lms/[slug]/glossary",              label: "Glossary",                    stage: "content",     task: 20 },
  { id: "qbank-picker",          route: "/lms/[slug]/question-bank",         label: "Q-bank topic picker",         stage: "content",     task: 21 },
  { id: "qbank-session",         route: "/lms/[slug]/question-bank/session/[id]", label: "Q-bank session runner",  stage: "content",     task: 22 },
  { id: "qbank-result",          route: "/lms/[slug]/question-bank/session/[id]/result", label: "Q-bank results",  stage: "content",     task: 23 },
  { id: "mock-intro",            route: "/lms/[slug]/mock-exam/[paperId]",   label: "Mock paper intro",            stage: "content",     task: 24 },
  { id: "mock-run",              route: "/lms/[slug]/mock-exam/[paperId]/run", label: "Mock runner (closed-book)",  stage: "content",     task: 25 },
  { id: "mock-result",           route: "/lms/[slug]/mock-exam/[paperId]/result", label: "Mock results",            stage: "content",     task: 26 },

  /* Stage 3 variants (Tasks 32-37) */
  { id: "mock-submit-modal",     route: "/lms/[slug]/mock-exam/[paperId]/run#submit", label: "Mock submit modal",   stage: "content",     state: "modal", task: 32 },
  { id: "mock-run-openbook",     route: "/lms/[slug]/mock-exam/[paperId]/run-openbook", label: "Open-book runner",  stage: "content",     task: 33 },
  { id: "bronze-view",           route: "/lms/[slug]/bronze-view",           label: "Bronze locks view",           stage: "dashboard",   tier: "bronze",  state: "locked",  task: 34 },
  { id: "combo-view",            route: "/lms/[slug]/combo-view",            label: "Combo F+P stacked",           stage: "dashboard",   task: 35 },
  { id: "saved",                 route: "/lms/[slug]/saved",                 label: "Saved / bookmarks",           stage: "content",     task: 36 },
  { id: "search",                route: "/lms/[slug]/search",                label: "Cross-content search",        stage: "content",     task: 37 },

  /* Stage 4 — AI Tools (Tasks 38-48) */
  { id: "ai-section",            route: "/lms/[slug]/ai",                    label: "AI section view",             stage: "ai",          tier: "silver",  task: 38 },
  { id: "ai-study-plan",         route: "/lms/[slug]/ai/study-plan",         label: "AI study plan",               stage: "ai",          tier: "silver",  task: 39 },
  { id: "ai-gap-report",         route: "/lms/[slug]/ai/gap-report",         label: "AI gap report",               stage: "ai",          tier: "silver",  task: 40 },
  { id: "ai-flashcards",         route: "/lms/[slug]/ai/flashcards",         label: "Adaptive flashcards",         stage: "ai",          tier: "silver",  task: 41 },
  { id: "ai-concept-coach",      route: "/lms/[slug]/ai/concept-coach",      label: "Concept coach (chat)",        stage: "ai",          tier: "silver",  task: 42 },
  { id: "ai-scenario-coach",     route: "/lms/[slug]/ai/scenario-coach",     label: "Scenario coach (P only)",     stage: "ai",          tier: "gold",    task: 43 },
  { id: "ai-interview-coach",    route: "/lms/[slug]/ai/interview-coach",    label: "Interview coach",             stage: "ai",          tier: "silver",  task: 44 },
  { id: "ai-daily-challenge",    route: "/lms/[slug]/ai/daily-challenge",    label: "Daily AI challenge",          stage: "ai",          tier: "silver",  task: 45 },
  { id: "ai-refusal",            route: "/lms/[slug]/ai/states/refusal",     label: "Out-of-scope refusal",        stage: "ai",          state: "modal", task: 46 },
  { id: "ai-plan-diff",          route: "/lms/[slug]/ai/states/plan-diff",   label: "Plan re-generation diff",     stage: "ai",          state: "modal", task: 47 },
  { id: "ai-cap-reached",        route: "/lms/[slug]/ai/states/cap-reached", label: "Daily cost-cap reached",      stage: "ai",          state: "modal", task: 48 },

  /* Stage 5 — Support & Mentoring (Tasks 49-60) */
  { id: "live-training",         route: "/lms/[slug]/live-training",         label: "Live training schedule",      stage: "support",     task: 50 },
  { id: "live-session-detail",   route: "/lms/[slug]/live-training/[sessionId]", label: "Live session detail",     stage: "support",     task: 51 },
  { id: "qa-session",            route: "/lms/[slug]/qa-session",            label: "Q&A drop-in slots",           stage: "support",     task: 52 },
  { id: "coaching",              route: "/lms/[slug]/coaching",              label: "1:1 coaching booking",        stage: "support",     tier: "gold",    task: 53 },
  { id: "support-inbox",         route: "/lms/[slug]/support",               label: "Support inbox",               stage: "support",     task: 54 },
  { id: "ticket-thread",         route: "/lms/[slug]/support/[ticketId]",    label: "Ticket thread",               stage: "support",     task: 55 },
  { id: "community",             route: "/lms/[slug]/community",             label: "Community access",            stage: "support",     task: 56 },
  { id: "cashback",              route: "/lms/[slug]/cashback",              label: "Cashback ledger",             stage: "support",     task: 57 },
  { id: "money-back",            route: "/lms/[slug]/money-back",            label: "Money-back guarantee",        stage: "support",     tier: "gold",    task: 58 },
  { id: "attendance-cert",       route: "/lms/[slug]/certificates/attendance", label: "Attendance certificate",    stage: "support",     task: 59 },
  { id: "modals-reschedule",     route: "/lms/[slug]/states/modals#reschedule", label: "Reschedule modal",         stage: "support",     state: "modal", task: 60 },
  { id: "modals-cancel-forfeit", route: "/lms/[slug]/states/modals#cancel",  label: "Coaching cancel · forfeit",   stage: "support",     state: "modal", task: 60 },
  { id: "modals-tier-lock",      route: "/lms/[slug]/states/modals#tier",    label: "Tier-mismatch lock modal",    stage: "support",     state: "modal", task: 60 },

  /* Stage 6 — Readiness & Voucher (Tasks 61-70) */
  { id: "readiness",             route: "/lms/[slug]/readiness",             label: "Readiness panel",             stage: "readiness",   state: "gated",    task: 61 },
  { id: "readiness-mocks",       route: "/lms/[slug]/readiness/mocks",       label: "Mocks drill-down",            stage: "readiness",   task: 62 },
  { id: "readiness-qbank",       route: "/lms/[slug]/readiness/qbank",       label: "Q-bank coverage drill-down",  stage: "readiness",   task: 63 },
  { id: "readiness-gap-reports", route: "/lms/[slug]/readiness/gap-reports", label: "Gap-report acks drill-down",  stage: "readiness",   task: 64 },
  { id: "voucher-tile",          route: "/lms/[slug]/voucher",               label: "Voucher tile (4 states)",     stage: "voucher",     state: "showcase", task: 65 },
  { id: "voucher-reveal",        route: "/lms/[slug]/voucher/modals#reveal", label: "Voucher reveal modal",        stage: "voucher",     state: "modal",   task: 66 },
  { id: "voucher-booking",       route: "/lms/[slug]/voucher/booking",       label: "Awarding-body handoff",       stage: "voucher",     task: 67 },
  { id: "voucher-scheduled",     route: "/lms/[slug]/voucher/scheduled",     label: "Exam scheduled state",        stage: "voucher",     task: 68 },
  { id: "voucher-combo",         route: "/lms/[slug]/voucher/combo",         label: "Combo voucher (F+P)",         stage: "voucher",     task: 69 },
  { id: "voucher-override",      route: "/lms/[slug]/voucher/modals#override", label: "Early-redeem override",    stage: "voucher",     state: "modal",   task: 70, note: "Support-routed only — forfeits Gold guarantee" },
];

/* ─── Edges ──────────────────────────────────────────────────── */

export const edges: Edge[] = [
  /* Auth flow */
  { from: "activate",             to: "set-password",         trigger: "Click 'Set my password'" },
  { from: "set-password",         to: "welcome",              trigger: "Submit · single enrolment", condition: "enrolments.length === 1" },
  { from: "set-password",         to: "welcome-multi",        trigger: "Submit · multi enrolment",  condition: "enrolments.length > 1" },
  { from: "login",                to: "lms-dashboard",        trigger: "Submit · single enrolment", condition: "enrolments.length === 1" },
  { from: "login",                to: "dashboard-top",        trigger: "Submit · multi enrolment",  condition: "enrolments.length > 1" },
  { from: "login",                to: "forgot-password",      trigger: "Click 'Forgot password'" },
  { from: "forgot-password",      to: "forgot-password-sent", trigger: "Submit email" },
  { from: "forgot-password-sent", to: "reset-password",       trigger: "Click reset link in email" },
  { from: "reset-password",       to: "login",                trigger: "Submit new password" },

  /* Onboarding flow */
  { from: "welcome",        to: "onb-profile",   trigger: "Click 'Get started'" },
  { from: "welcome-multi",  to: "onb-profile",   trigger: "Pick a course + 'Get started'" },
  { from: "onb-profile",    to: "onb-exam-date", trigger: "Submit Step 1" },
  { from: "onb-exam-date",  to: "onb-baseline",  trigger: "Submit Step 2" },
  { from: "onb-baseline",   to: "onb-complete",  trigger: "Submit baseline mock" },
  { from: "onb-complete",   to: "lms-dashboard", trigger: "Click 'Open my course'" },

  /* Dashboard navigation */
  { from: "dashboard-top",       to: "lms-dashboard",     trigger: "Click course tile" },
  { from: "dashboard-top",       to: "dashboard-progress", trigger: "Click 'Progress'" },
  { from: "dashboard-top",       to: "dashboard-multi",   trigger: "Click combo enrolment", condition: "enrolment.type === 'combo'" },
  { from: "dashboard-progress",  to: "lms-dashboard",     trigger: "Back to course" },
  { from: "dashboard-course",    to: "lms-dashboard",     trigger: "Open course" },
  { from: "dashboard-multi",     to: "lms-dashboard",     trigger: "Click F or P sub-section" },
  { from: "lms-dashboard",       to: "bronze-view",       trigger: "Auto-route on tier",    condition: "enrolment.tier === 'bronze'" },
  { from: "lms-dashboard",       to: "combo-view",        trigger: "Auto-route on combo",   condition: "enrolment.type === 'combo'" },

  /* Stage 3 content navigation */
  { from: "lms-dashboard",  to: "reference-card", trigger: "Open reference card" },
  { from: "lms-dashboard",  to: "study-guide",    trigger: "Open study guide" },
  { from: "lms-dashboard",  to: "glossary",       trigger: "Open glossary" },
  { from: "lms-dashboard",  to: "qbank-picker",   trigger: "Open Q-bank" },
  { from: "lms-dashboard",  to: "mock-intro",     trigger: "Open mock paper" },
  { from: "lms-dashboard",  to: "saved",          trigger: "Open Saved tile" },
  { from: "lms-dashboard",  to: "search",         trigger: "Type in search bar" },

  { from: "qbank-picker",   to: "qbank-session",  trigger: "Start session" },
  { from: "qbank-session",  to: "qbank-result",   trigger: "Submit final answer" },
  { from: "qbank-result",   to: "qbank-picker",   trigger: "Back to topics" },

  { from: "mock-intro",         to: "mock-run",          trigger: "Start mock (closed-book)" },
  { from: "mock-intro",         to: "mock-run-openbook", trigger: "Start mock (open-book)", condition: "paper.format === 'open-book'" },
  { from: "mock-run",           to: "mock-submit-modal", trigger: "Click 'Submit'" },
  { from: "mock-run-openbook",  to: "mock-submit-modal", trigger: "Click 'Submit'" },
  { from: "mock-submit-modal",  to: "mock-result",       trigger: "Confirm submit" },
  { from: "mock-submit-modal",  to: "mock-run",          trigger: "Cancel · keep working" },

  /* Stage 4 — AI tools */
  { from: "lms-dashboard",     to: "ai-section",         trigger: "Click AI section card", condition: "tier !== 'bronze'" },
  { from: "lms-dashboard",     to: "modals-tier-lock",   trigger: "Click locked AI tile",  condition: "tier === 'bronze'" },
  { from: "ai-section",        to: "ai-study-plan",      trigger: "Open AI study plan" },
  { from: "ai-section",        to: "ai-gap-report",      trigger: "Open gap report" },
  { from: "ai-section",        to: "ai-flashcards",      trigger: "Open flashcards" },
  { from: "ai-section",        to: "ai-concept-coach",   trigger: "Open concept coach" },
  { from: "ai-section",        to: "ai-scenario-coach",  trigger: "Open scenario coach",   condition: "tier === 'gold' && level === 'practitioner'" },
  { from: "ai-section",        to: "ai-interview-coach", trigger: "Open interview coach" },
  { from: "ai-section",        to: "ai-daily-challenge", trigger: "Open daily challenge" },

  { from: "ai-concept-coach",  to: "ai-refusal",      trigger: "Ask out-of-scope question" },
  { from: "ai-concept-coach",  to: "ai-cap-reached",  trigger: "Daily token cap hit" },
  { from: "ai-study-plan",     to: "ai-plan-diff",    trigger: "Click 'Re-generate plan'" },
  { from: "ai-plan-diff",      to: "ai-study-plan",   trigger: "Confirm overwrite" },

  /* Stage 5 — Support & Mentoring */
  { from: "lms-dashboard",  to: "live-training",   trigger: "Click Live Training tile" },
  { from: "lms-dashboard",  to: "qa-session",      trigger: "Click Q&A tile" },
  { from: "lms-dashboard",  to: "coaching",        trigger: "Click Coaching tile",     condition: "tier === 'gold'" },
  { from: "lms-dashboard",  to: "modals-tier-lock", trigger: "Click locked Coaching",   condition: "tier !== 'gold'" },
  { from: "lms-dashboard",  to: "support-inbox",   trigger: "Click Support Inbox tile" },
  { from: "lms-dashboard",  to: "community",       trigger: "Click Community tile" },
  { from: "lms-dashboard",  to: "cashback",        trigger: "Click Cashback tile" },
  { from: "lms-dashboard",  to: "money-back",      trigger: "Click Money-back tile",   condition: "tier === 'gold'" },
  { from: "lms-dashboard",  to: "attendance-cert", trigger: "Click Attendance Cert tile" },

  { from: "live-training",        to: "live-session-detail", trigger: "Click 'Session details'" },
  { from: "live-training",        to: "modals-reschedule",   trigger: "Click 'Reschedule'",    condition: "hoursToSession < 24" },
  { from: "live-session-detail",  to: "modals-reschedule",   trigger: "Click 'Reschedule'",    condition: "hoursToSession < 24" },
  { from: "modals-reschedule",    to: "live-training",       trigger: "Confirm new slot" },

  { from: "qa-session",     to: "live-session-detail",  trigger: "Open a Q&A slot" },

  { from: "coaching",          to: "modals-cancel-forfeit", trigger: "Cancel inside 12h cutoff", condition: "hoursToSession < 12" },
  { from: "modals-cancel-forfeit", to: "coaching",          trigger: "Confirm cancel & forfeit credit" },

  { from: "support-inbox",   to: "ticket-thread",  trigger: "Click ticket row" },
  { from: "ticket-thread",   to: "support-inbox",  trigger: "Click 'Close ticket'" },

  { from: "money-back",      to: "support-inbox",  trigger: "Click 'Contact support'" },
  { from: "cashback",        to: "support-inbox",  trigger: "Payout dispute" },

  /* Stage 6 — Readiness panel & drill-downs */
  { from: "lms-dashboard",      to: "readiness",       trigger: "Click status banner / readiness card" },
  { from: "readiness",          to: "readiness-mocks", trigger: "Open Mocks input card" },
  { from: "readiness",          to: "readiness-qbank", trigger: "Open Q-bank input card" },
  { from: "readiness",          to: "readiness-gap-reports", trigger: "Open Gap-acks input card" },

  { from: "readiness-mocks",       to: "mock-intro",        trigger: "Start recommended mock" },
  { from: "readiness-qbank",       to: "qbank-picker",      trigger: "Drill weakest cluster" },
  { from: "readiness-gap-reports", to: "ai-gap-report",     trigger: "Read & acknowledge latest report" },

  /* Stage 6 — Voucher flow */
  { from: "readiness",       to: "voucher-tile",  trigger: "Composite ≥75 & all gates met", condition: "gate.allMet === true" },
  { from: "lms-dashboard",   to: "voucher-tile",  trigger: "Click voucher tile on dashboard" },
  { from: "voucher-tile",    to: "voucher-reveal",  trigger: "Click 'Redeem voucher'", condition: "voucher.state === 'unlocked'" },
  { from: "voucher-tile",    to: "voucher-combo",   trigger: "Open combo voucher",     condition: "enrolment.type === 'combo'" },

  { from: "voucher-reveal",   to: "voucher-booking",   trigger: "Click 'Open booking page'" },
  { from: "voucher-booking",  to: "voucher-scheduled", trigger: "Record exam date · booked externally" },
  { from: "voucher-scheduled", to: "lms-dashboard",    trigger: "Banner mirror update · returns to dashboard" },

  /* Stage 6 — Override path (support-routed, forfeits guarantee) */
  { from: "support-inbox",     to: "voucher-override", trigger: "Support agent escalates override", condition: "tier === 'gold'" },
  { from: "voucher-override",  to: "voucher-reveal",   trigger: "Confirm forfeit & redeem early" },
  { from: "voucher-override",  to: "support-inbox",    trigger: "Keep gate · cancel override" },

  /* Combo dashboard → combo voucher */
  { from: "combo-view",     to: "voucher-combo", trigger: "Click voucher section", condition: "enrolment.type === 'combo'" },
  { from: "dashboard-multi", to: "voucher-combo", trigger: "Click voucher section", condition: "enrolment.type === 'combo'" },

  /* Search & saved are reachable from most content pages — modelled as global */
  { from: "lms-dashboard",   to: "search", trigger: "Type in cross-content search" },
  { from: "reference-card",  to: "saved",  trigger: "Click bookmark icon" },
  { from: "study-guide",     to: "saved",  trigger: "Click bookmark icon" },
];

/* ─── Convenience selectors ─────────────────────────────────── */

export const nodesByStage = (s: Stage) => nodes.filter((n) => n.stage === s);

export const edgesFrom = (id: string) => edges.filter((e) => e.from === id);

export const edgesTo = (id: string) => edges.filter((e) => e.to === id);

export const counts = {
  nodes: nodes.length,
  edges: edges.length,
  stages: Array.from(new Set(nodes.map((n) => n.stage))).length,
  byStage: Object.fromEntries(
    Array.from(new Set(nodes.map((n) => n.stage))).map((s) => [
      s,
      nodes.filter((n) => n.stage === s).length,
    ])
  ),
};
