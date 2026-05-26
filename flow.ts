/**
 * OpenFlowKit export — Invensis LMS page-flow graph.
 *
 * Covers every navigable page shipped through Stage 6 (Tasks 1-70).
 * Modal overlays and dev-only showcase surfaces are NOT included here —
 * those live in the codebase but aren't first-class destinations in the
 * user journey.
 *
 * Layout strategy:
 *   - One vertical column per stage (8 columns).
 *   - Columns spaced 360px apart (LANE_X) so OpenFlowKit's auto-router
 *     has room to draw curved edges without overlap.
 *   - Nodes stack vertically within their column, 140px apart (NODE_Y).
 *   - Wide-fan stages (content, support) span more vertical real estate
 *     than narrow ones (readiness, voucher), but every node has a
 *     pre-computed (x, y) so import is deterministic.
 */

/* ─── Layout constants ──────────────────────────────────────── */

export const layout = {
  LANE_X: 360,        // horizontal distance between stage columns
  NODE_Y: 140,        // vertical distance between nodes within a column
  NODE_W: 220,
  NODE_H: 84,
  ORIGIN_X: 120,
  ORIGIN_Y: 80,
};

export const viewport = {
  width: 3200,
  height: 1700,
  fit: "padded" as const,
};

/* ─── Types ─────────────────────────────────────────────────── */

export type Stage =
  | "auth"
  | "onboarding"
  | "dashboard"
  | "content"
  | "ai"
  | "support"
  | "readiness"
  | "voucher";

export type Tier = "any" | "bronze" | "silver" | "gold";

export type Position = { x: number; y: number };

export type Node = {
  id: string;
  route: string;
  label: string;
  stage: Stage;
  tier?: Tier;
  task?: number;
  position: Position;
};

export type Edge = {
  from: string;
  to: string;
  trigger: string;
  condition?: string;
};

/* ─── Stage columns (X position per stage) ──────────────────── */

const STAGE_X: Record<Stage, number> = {
  auth:       layout.ORIGIN_X + 0 * layout.LANE_X, //  120
  onboarding: layout.ORIGIN_X + 1 * layout.LANE_X, //  480
  dashboard:  layout.ORIGIN_X + 2 * layout.LANE_X, //  840
  content:    layout.ORIGIN_X + 3 * layout.LANE_X, // 1200
  ai:         layout.ORIGIN_X + 4 * layout.LANE_X, // 1560
  support:    layout.ORIGIN_X + 5 * layout.LANE_X, // 1920
  readiness:  layout.ORIGIN_X + 6 * layout.LANE_X, // 2280
  voucher:    layout.ORIGIN_X + 7 * layout.LANE_X, // 2640
};

// Vertical slot within a stage column → y coordinate
const slot = (i: number) => layout.ORIGIN_Y + i * layout.NODE_Y;

/* ─── Nodes ──────────────────────────────────────────────────── */

export const nodes: Node[] = [
  /* Stage 2 — Auth (6) */
  { id: "activate",              route: "/activate/[token]",                 label: "Activation landing",      stage: "auth",       task: 1,  position: { x: STAGE_X.auth, y: slot(0) } },
  { id: "set-password",          route: "/auth/activate",                    label: "Set password + T&C",      stage: "auth",       task: 2,  position: { x: STAGE_X.auth, y: slot(1) } },
  { id: "login",                 route: "/auth/login",                       label: "Login",                   stage: "auth",       task: 3,  position: { x: STAGE_X.auth, y: slot(2) } },
  { id: "forgot-password",       route: "/auth/forgot-password",             label: "Forgot password",         stage: "auth",       task: 4,  position: { x: STAGE_X.auth, y: slot(3) } },
  { id: "forgot-password-sent",  route: "/auth/forgot-password/sent",        label: "Reset link sent",         stage: "auth",       task: 5,  position: { x: STAGE_X.auth, y: slot(4) } },
  { id: "reset-password",        route: "/auth/reset-password/[token]",      label: "Reset password",          stage: "auth",       task: 6,  position: { x: STAGE_X.auth, y: slot(5) } },

  /* Stage 2 — Onboarding (6) */
  { id: "welcome",               route: "/welcome",                          label: "Welcome (single)",        stage: "onboarding", task: 7,  position: { x: STAGE_X.onboarding, y: slot(0) } },
  { id: "welcome-multi",         route: "/welcome-multi",                    label: "Welcome (multi)",         stage: "onboarding", task: 8,  position: { x: STAGE_X.onboarding, y: slot(1) } },
  { id: "onb-profile",           route: "/onboarding/profile",               label: "Step 1 — Profile",        stage: "onboarding", task: 9,  position: { x: STAGE_X.onboarding, y: slot(2) } },
  { id: "onb-exam-date",         route: "/onboarding/exam-date",             label: "Step 2 — Exam date",      stage: "onboarding", task: 10, position: { x: STAGE_X.onboarding, y: slot(3) } },
  { id: "onb-baseline",          route: "/onboarding/baseline",              label: "Step 3 — Baseline mock",  stage: "onboarding", task: 11, position: { x: STAGE_X.onboarding, y: slot(4) } },
  { id: "onb-complete",          route: "/onboarding/complete",              label: "Step 4 — Ready",          stage: "onboarding", task: 12, position: { x: STAGE_X.onboarding, y: slot(5) } },

  /* Dashboards (5) */
  { id: "dashboard-top",         route: "/dashboard",                        label: "Top-level dashboard",     stage: "dashboard", task: 14, position: { x: STAGE_X.dashboard, y: slot(0) } },
  { id: "dashboard-progress",    route: "/dashboard/progress",               label: "Progress view",           stage: "dashboard", task: 16, position: { x: STAGE_X.dashboard, y: slot(1) } },
  { id: "dashboard-multi",       route: "/dashboard-multi",                  label: "Combo dashboard",         stage: "dashboard", task: 17, position: { x: STAGE_X.dashboard, y: slot(2) } },
  { id: "lms-dashboard",         route: "/lms/[slug]",                       label: "LMS course dashboard",    stage: "dashboard", task: 13, position: { x: STAGE_X.dashboard, y: slot(3) } },
  { id: "bronze-view",           route: "/lms/[slug]/bronze-view",           label: "Bronze locks view",       stage: "dashboard", tier: "bronze", task: 34, position: { x: STAGE_X.dashboard, y: slot(4) } },

  /* Stage 3 — Content (10) */
  { id: "reference-card",        route: "/lms/[slug]/reference/[card]",      label: "Reference card",          stage: "content",   task: 18, position: { x: STAGE_X.content, y: slot(0) } },
  { id: "study-guide",           route: "/lms/[slug]/study-guide/[guide]",   label: "Study guide",             stage: "content",   task: 19, position: { x: STAGE_X.content, y: slot(1) } },
  { id: "glossary",              route: "/lms/[slug]/glossary",              label: "Glossary",                stage: "content",   task: 20, position: { x: STAGE_X.content, y: slot(2) } },
  { id: "qbank-picker",          route: "/lms/[slug]/question-bank",         label: "Q-bank topic picker",     stage: "content",   task: 21, position: { x: STAGE_X.content, y: slot(3) } },
  { id: "qbank-session",         route: "/lms/[slug]/question-bank/session/[id]",        label: "Q-bank runner",  stage: "content",   task: 22, position: { x: STAGE_X.content, y: slot(4) } },
  { id: "qbank-result",          route: "/lms/[slug]/question-bank/session/[id]/result", label: "Q-bank results", stage: "content",   task: 23, position: { x: STAGE_X.content, y: slot(5) } },
  { id: "mock-intro",            route: "/lms/[slug]/mock-exam/[paperId]",   label: "Mock paper intro",        stage: "content",   task: 24, position: { x: STAGE_X.content, y: slot(6) } },
  { id: "mock-run",              route: "/lms/[slug]/mock-exam/[paperId]/run",          label: "Mock runner",     stage: "content",   task: 25, position: { x: STAGE_X.content, y: slot(7) } },
  { id: "mock-run-openbook",     route: "/lms/[slug]/mock-exam/[paperId]/run-openbook", label: "Open-book runner", stage: "content", task: 33, position: { x: STAGE_X.content, y: slot(8) } },
  { id: "mock-result",           route: "/lms/[slug]/mock-exam/[paperId]/result",       label: "Mock results",    stage: "content",   task: 26, position: { x: STAGE_X.content, y: slot(9) } },

  /* Stage 4 — AI tools (8) */
  { id: "ai-section",            route: "/lms/[slug]/ai",                    label: "AI section view",         stage: "ai", tier: "silver", task: 38, position: { x: STAGE_X.ai, y: slot(0) } },
  { id: "ai-study-plan",         route: "/lms/[slug]/ai/study-plan",         label: "AI study plan",           stage: "ai", tier: "silver", task: 39, position: { x: STAGE_X.ai, y: slot(1) } },
  { id: "ai-gap-report",         route: "/lms/[slug]/ai/gap-report",         label: "AI gap report",           stage: "ai", tier: "silver", task: 40, position: { x: STAGE_X.ai, y: slot(2) } },
  { id: "ai-flashcards",         route: "/lms/[slug]/ai/flashcards",         label: "Adaptive flashcards",     stage: "ai", tier: "silver", task: 41, position: { x: STAGE_X.ai, y: slot(3) } },
  { id: "ai-concept-coach",      route: "/lms/[slug]/ai/concept-coach",      label: "Concept coach",           stage: "ai", tier: "silver", task: 42, position: { x: STAGE_X.ai, y: slot(4) } },
  { id: "ai-scenario-coach",     route: "/lms/[slug]/ai/scenario-coach",     label: "Scenario coach",          stage: "ai", tier: "gold",   task: 43, position: { x: STAGE_X.ai, y: slot(5) } },
  { id: "ai-interview-coach",    route: "/lms/[slug]/ai/interview-coach",    label: "Interview coach",         stage: "ai", tier: "silver", task: 44, position: { x: STAGE_X.ai, y: slot(6) } },
  { id: "ai-daily-challenge",    route: "/lms/[slug]/ai/daily-challenge",    label: "Daily AI challenge",      stage: "ai", tier: "silver", task: 45, position: { x: STAGE_X.ai, y: slot(7) } },

  /* Stage 5 — Support (10) */
  { id: "live-training",         route: "/lms/[slug]/live-training",         label: "Live training schedule",  stage: "support", task: 50, position: { x: STAGE_X.support, y: slot(0) } },
  { id: "live-session-detail",   route: "/lms/[slug]/live-training/[sessionId]", label: "Live session detail", stage: "support", task: 51, position: { x: STAGE_X.support, y: slot(1) } },
  { id: "qa-session",            route: "/lms/[slug]/qa-session",            label: "Q&A drop-in slots",       stage: "support", task: 52, position: { x: STAGE_X.support, y: slot(2) } },
  { id: "coaching",              route: "/lms/[slug]/coaching",              label: "1:1 coaching",            stage: "support", tier: "gold", task: 53, position: { x: STAGE_X.support, y: slot(3) } },
  { id: "support-inbox",         route: "/lms/[slug]/support",               label: "Support inbox",           stage: "support", task: 54, position: { x: STAGE_X.support, y: slot(4) } },
  { id: "ticket-thread",         route: "/lms/[slug]/support/[ticketId]",    label: "Ticket thread",           stage: "support", task: 55, position: { x: STAGE_X.support, y: slot(5) } },
  { id: "community",             route: "/lms/[slug]/community",             label: "Community",               stage: "support", task: 56, position: { x: STAGE_X.support, y: slot(6) } },
  { id: "cashback",              route: "/lms/[slug]/cashback",              label: "Cashback ledger",         stage: "support", task: 57, position: { x: STAGE_X.support, y: slot(7) } },
  { id: "money-back",            route: "/lms/[slug]/money-back",            label: "Money-back guarantee",    stage: "support", tier: "gold", task: 58, position: { x: STAGE_X.support, y: slot(8) } },
  { id: "attendance-cert",       route: "/lms/[slug]/certificates/attendance", label: "Attendance certificate", stage: "support", task: 59, position: { x: STAGE_X.support, y: slot(9) } },

  /* Stage 6 — Readiness (4) */
  { id: "readiness",             route: "/lms/[slug]/readiness",             label: "Readiness panel",         stage: "readiness", task: 61, position: { x: STAGE_X.readiness, y: slot(0) } },
  { id: "readiness-mocks",       route: "/lms/[slug]/readiness/mocks",       label: "Mocks drill-down",        stage: "readiness", task: 62, position: { x: STAGE_X.readiness, y: slot(1) } },
  { id: "readiness-qbank",       route: "/lms/[slug]/readiness/qbank",       label: "Q-bank coverage",         stage: "readiness", task: 63, position: { x: STAGE_X.readiness, y: slot(2) } },
  { id: "readiness-gap-reports", route: "/lms/[slug]/readiness/gap-reports", label: "Gap-report acks",         stage: "readiness", task: 64, position: { x: STAGE_X.readiness, y: slot(3) } },

  /* Stage 6 — Voucher (4) */
  { id: "voucher-tile",          route: "/lms/[slug]/voucher",               label: "Voucher tile",            stage: "voucher", task: 65, position: { x: STAGE_X.voucher, y: slot(0) } },
  { id: "voucher-booking",       route: "/lms/[slug]/voucher/booking",       label: "PMI booking handoff",     stage: "voucher", task: 67, position: { x: STAGE_X.voucher, y: slot(1) } },
  { id: "voucher-scheduled",     route: "/lms/[slug]/voucher/scheduled",     label: "Exam scheduled",          stage: "voucher", task: 68, position: { x: STAGE_X.voucher, y: slot(2) } },
  { id: "voucher-combo",         route: "/lms/[slug]/voucher/combo",         label: "Combo voucher (F+P)",     stage: "voucher", task: 69, position: { x: STAGE_X.voucher, y: slot(3) } },
];

/* ─── Edges ──────────────────────────────────────────────────── */

export const edges: Edge[] = [
  /* Auth → onboarding */
  { from: "activate",             to: "set-password",         trigger: "Set my password" },
  { from: "set-password",         to: "welcome",              trigger: "Submit (single enrol)" },
  { from: "set-password",         to: "welcome-multi",        trigger: "Submit (multi enrol)" },
  { from: "login",                to: "lms-dashboard",        trigger: "Submit (single enrol)" },
  { from: "login",                to: "dashboard-top",        trigger: "Submit (multi enrol)" },
  { from: "login",                to: "forgot-password",      trigger: "Forgot password" },
  { from: "forgot-password",      to: "forgot-password-sent", trigger: "Submit email" },
  { from: "forgot-password-sent", to: "reset-password",       trigger: "Email reset link" },
  { from: "reset-password",       to: "login",                trigger: "Submit new password" },

  /* Onboarding chain */
  { from: "welcome",       to: "onb-profile",   trigger: "Get started" },
  { from: "welcome-multi", to: "onb-profile",   trigger: "Pick course + start" },
  { from: "onb-profile",   to: "onb-exam-date", trigger: "Next" },
  { from: "onb-exam-date", to: "onb-baseline",  trigger: "Next" },
  { from: "onb-baseline",  to: "onb-complete",  trigger: "Submit mock" },
  { from: "onb-complete",  to: "lms-dashboard", trigger: "Open my course" },

  /* Dashboard navigation */
  { from: "dashboard-top",      to: "lms-dashboard",      trigger: "Open course" },
  { from: "dashboard-top",      to: "dashboard-progress", trigger: "Progress" },
  { from: "dashboard-top",      to: "dashboard-multi",    trigger: "Combo enrolment", condition: "type=combo" },
  { from: "dashboard-multi",    to: "lms-dashboard",      trigger: "Open F / P section" },
  { from: "lms-dashboard",      to: "bronze-view",        trigger: "Auto-route",      condition: "tier=bronze" },

  /* Stage 3 — Content */
  { from: "lms-dashboard",  to: "reference-card", trigger: "Open card" },
  { from: "lms-dashboard",  to: "study-guide",    trigger: "Open guide" },
  { from: "lms-dashboard",  to: "glossary",       trigger: "Open glossary" },
  { from: "lms-dashboard",  to: "qbank-picker",   trigger: "Open Q-bank" },
  { from: "lms-dashboard",  to: "mock-intro",     trigger: "Open mock" },

  { from: "qbank-picker",   to: "qbank-session",  trigger: "Start session" },
  { from: "qbank-session",  to: "qbank-result",   trigger: "Submit" },
  { from: "qbank-result",   to: "qbank-picker",   trigger: "Back to topics" },

  { from: "mock-intro",     to: "mock-run",          trigger: "Start (closed-book)" },
  { from: "mock-intro",     to: "mock-run-openbook", trigger: "Start (open-book)" },
  { from: "mock-run",       to: "mock-result",       trigger: "Submit" },
  { from: "mock-run-openbook", to: "mock-result",    trigger: "Submit" },

  /* Stage 4 — AI tools */
  { from: "lms-dashboard",  to: "ai-section",         trigger: "Open AI section",   condition: "tier≥silver" },
  { from: "ai-section",     to: "ai-study-plan",      trigger: "Open" },
  { from: "ai-section",     to: "ai-gap-report",      trigger: "Open" },
  { from: "ai-section",     to: "ai-flashcards",      trigger: "Open" },
  { from: "ai-section",     to: "ai-concept-coach",   trigger: "Open" },
  { from: "ai-section",     to: "ai-scenario-coach",  trigger: "Open", condition: "tier=gold & practitioner" },
  { from: "ai-section",     to: "ai-interview-coach", trigger: "Open" },
  { from: "ai-section",     to: "ai-daily-challenge", trigger: "Open" },

  /* Stage 5 — Support & Mentoring */
  { from: "lms-dashboard",  to: "live-training",   trigger: "Live training tile" },
  { from: "lms-dashboard",  to: "qa-session",      trigger: "Q&A tile" },
  { from: "lms-dashboard",  to: "coaching",        trigger: "Coaching tile", condition: "tier=gold" },
  { from: "lms-dashboard",  to: "support-inbox",   trigger: "Support tile" },
  { from: "lms-dashboard",  to: "community",       trigger: "Community tile" },
  { from: "lms-dashboard",  to: "cashback",        trigger: "Cashback tile" },
  { from: "lms-dashboard",  to: "money-back",      trigger: "Money-back tile", condition: "tier=gold" },
  { from: "lms-dashboard",  to: "attendance-cert", trigger: "Attendance tile" },

  { from: "live-training",  to: "live-session-detail", trigger: "Session details" },
  { from: "qa-session",     to: "live-session-detail", trigger: "Open Q&A slot" },
  { from: "support-inbox",  to: "ticket-thread",       trigger: "Open ticket" },

  /* Stage 6 — Readiness drill-downs */
  { from: "lms-dashboard",         to: "readiness",              trigger: "Banner / readiness card" },
  { from: "readiness",             to: "readiness-mocks",        trigger: "Open mocks" },
  { from: "readiness",             to: "readiness-qbank",        trigger: "Open Q-bank" },
  { from: "readiness",             to: "readiness-gap-reports",  trigger: "Open gap reports" },

  /* Readiness → fix-it deep links back into content/AI */
  { from: "readiness-mocks",       to: "mock-intro",     trigger: "Start next mock" },
  { from: "readiness-qbank",       to: "qbank-picker",   trigger: "Drill weakest cluster" },
  { from: "readiness-gap-reports", to: "ai-gap-report",  trigger: "Ack latest report" },

  /* Stage 6 — Voucher path */
  { from: "readiness",       to: "voucher-tile",     trigger: "Gate cleared", condition: "composite≥75 & gates met" },
  { from: "lms-dashboard",   to: "voucher-tile",     trigger: "Voucher tile" },
  { from: "voucher-tile",    to: "voucher-booking",  trigger: "Redeem → open booking" },
  { from: "voucher-tile",    to: "voucher-combo",    trigger: "Open combo", condition: "type=combo" },
  { from: "voucher-booking", to: "voucher-scheduled", trigger: "Record exam date" },
  { from: "voucher-scheduled", to: "lms-dashboard",  trigger: "Back to dashboard (banner updated)" },
  { from: "voucher-combo",   to: "voucher-booking",  trigger: "Redeem F or P leg" },
];

/* ─── Selectors ──────────────────────────────────────────────── */

export const nodesByStage = (s: Stage) => nodes.filter((n) => n.stage === s);
export const edgesFrom    = (id: string) => edges.filter((e) => e.from === id);
export const edgesTo      = (id: string) => edges.filter((e) => e.to === id);

export const counts = {
  nodes: nodes.length,
  edges: edges.length,
  byStage: Object.fromEntries(
    Array.from(new Set(nodes.map((n) => n.stage))).map((s) => [
      s,
      nodes.filter((n) => n.stage === s).length,
    ])
  ),
};
