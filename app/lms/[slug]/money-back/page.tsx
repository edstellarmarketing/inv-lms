import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type GateStatus = "met" | "in-progress" | "at-risk" | "blocked";

type GateItem = {
  id: string;
  title: string;
  detail: string;
  required: string;
  current: string;
  progressPct: number;
  status: GateStatus;
  href?: string;
};

type ClaimState = "exam-pending" | "exam-passed" | "exam-failed" | "ineligible";

const enrollmentState = {
  tier: "Gold" as const,
  coverageAmount: 24500,
  currency: "INR",
  claimWindowDays: 30,
  examScheduledFor: "12 June 2026",
  examDaysAway: 17,
  claimState: "exam-pending" as ClaimState,
};

const gateItems: GateItem[] = [
  {
    id: "attendance",
    title: "Live training attendance",
    detail: "Attend at least 80% of scheduled live sessions in your enrollment.",
    required: "Attend 80%+",
    current: "92% (23 of 25 attended)",
    progressPct: 92,
    status: "met",
    href: "/lms/pmp/live-training",
  },
  {
    id: "qbank-coverage",
    title: "Question bank coverage",
    detail: "Attempt at least 50% of questions in each topic cluster — anti-cherry-picking floor.",
    required: "≥50% per cluster",
    current: "All 6 clusters above floor · lowest 58%",
    progressPct: 100,
    status: "met",
    href: "/lms/pmp/question-bank",
  },
  {
    id: "mocks-attempted",
    title: "Mock papers attempted",
    detail: "Attempt at least 4 of the 6 mock papers under timed conditions.",
    required: "4 of 6 mocks",
    current: "3 of 6 mocks (Mini Mock 1, 2, Full Length 1)",
    progressPct: 75,
    status: "in-progress",
    href: "/lms/pmp/mock-exam/1",
  },
  {
    id: "readiness",
    title: "Readiness score threshold",
    detail: "Composite readiness must cross 70 within 14 days before the booked exam.",
    required: "≥70 readiness",
    current: "62 readiness · 17 days to exam",
    progressPct: 88,
    status: "in-progress",
    href: "/lms/pmp",
  },
  {
    id: "gap-report",
    title: "Gap report acknowledged",
    detail: "Read and acknowledge the latest AI-generated gap report before exam day.",
    required: "Latest report ack'd",
    current: "Last report 18 May — not acknowledged",
    progressPct: 0,
    status: "at-risk",
    href: "/lms/pmp",
  },
  {
    id: "exam-booked-window",
    title: "Exam booked in validity window",
    detail: "Exam must be booked and taken within the original voucher validity window.",
    required: "Within 30 Aug 2026",
    current: "Booked for 12 Jun 2026 — within window",
    progressPct: 100,
    status: "met",
  },
];

type Term = { num: number; title: string; body: string };

const terms: Term[] = [
  {
    num: 1,
    title: "Eligibility",
    body:
      "The guarantee applies to Gold-tier enrollments only. Bronze and Silver are not covered. Eligibility is set at the moment of purchase — tier downgrades after enrollment are not eligible.",
  },
  {
    num: 2,
    title: "Gate honoured at redemption",
    body:
      "All six gate items must be in a 'met' state on the day you redeem your voucher. The system snapshots gate state at voucher redemption — that snapshot is what's checked against if you later claim.",
  },
  {
    num: 3,
    title: "Override forfeits the guarantee",
    body:
      "If you use a support-routed override to redeem your voucher early (before the gate passes), the guarantee is automatically forfeited. The forfeiture is recorded in the audit log and cannot be reversed.",
  },
  {
    num: 4,
    title: "Single attempt covered",
    body:
      "The guarantee covers a single exam attempt taken within the voucher's original validity window. A retake taken under the Gold-tier retake allowance is not covered separately.",
  },
  {
    num: 5,
    title: "Claim window",
    body:
      "Claims must be filed within 30 days of the exam attempt date. After that window, the guarantee lapses regardless of gate state.",
  },
  {
    num: 6,
    title: "Refund amount",
    body:
      "Refund is the original course fee paid by you, net of taxes and any non-refundable third-party charges (e.g. awarding-body voucher cost passed through). Cashback already paid out is deducted from the refund.",
  },
  {
    num: 7,
    title: "Payout method",
    body:
      "Refund is processed through the same payment rail used at checkout, for charge-back fidelity. Cards refund within 7–10 days; UPI within 3–5; bank transfer within 5–7.",
  },
  {
    num: 8,
    title: "Disputes",
    body:
      "If your claim is rejected and you believe the gate state was met, the dispute escalates to the Trust & Safety team. The audit log is the source of truth.",
  },
];

const statusMap: Record<GateStatus, { label: string; tone: string; icon: string }> = {
  met: { label: "Met", tone: "green", icon: "fa-solid fa-circle-check" },
  "in-progress": { label: "In progress", tone: "blue", icon: "fa-solid fa-spinner" },
  "at-risk": { label: "At risk", tone: "amber", icon: "fa-solid fa-circle-exclamation" },
  blocked: { label: "Blocked", tone: "red", icon: "fa-solid fa-circle-xmark" },
};

const claimMap: Record<ClaimState, { label: string; tone: string; description: string; canClaim: boolean }> = {
  "exam-pending": {
    label: "Awaiting exam outcome",
    tone: "blue",
    description: "You haven't taken your exam yet. The claim form unlocks if your outcome is recorded as 'failed' within the validity window.",
    canClaim: false,
  },
  "exam-passed": {
    label: "Guarantee closed — you passed",
    tone: "green",
    description: "Congratulations — you passed. The guarantee is closed as fulfilled. Nothing to do.",
    canClaim: false,
  },
  "exam-failed": {
    label: "Eligible to claim",
    tone: "amber",
    description: "Your exam outcome was recorded as failed. Submit the claim form below within the 30-day window.",
    canClaim: true,
  },
  ineligible: {
    label: "Not eligible",
    tone: "red",
    description: "The guarantee was forfeited (early redeem override) or the gate state at redemption did not satisfy all conditions.",
    canClaim: false,
  },
};

export default function MoneyBackPage() {
  const claim = claimMap[enrollmentState.claimState];
  const totalGates = gateItems.length;
  const metGates = gateItems.filter((g) => g.status === "met").length;
  const compositePct = Math.round((metGates / totalGates) * 100);

  return (
    <LmsFrame
      active="Certificates"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Money-back Guarantee" },
      ]}
      title="🛡️ Money-back Guarantee"
      subtitle="If you don't pass on your first attempt, you get your course fee back — subject to the conditions below."
      right={
        <div className="mb-tier">
          <span className="pill pill-gold">
            <i className="fa-solid fa-crown"></i> Gold benefit
          </span>
          <small>Included with your Gold tier</small>
        </div>
      }
    >
      {/* Hero — coverage amount + claim state */}
      <section className="mb-hero">
        <article className="mb-coverage">
          <small>You're covered for up to</small>
          <strong>₹{enrollmentState.coverageAmount.toLocaleString()}</strong>
          <span>course fee refund · single first attempt</span>
          <div className="mb-coverage-meta">
            <div>
              <small>Exam scheduled</small>
              <strong>{enrollmentState.examScheduledFor}</strong>
              <em>{enrollmentState.examDaysAway} days away</em>
            </div>
            <div>
              <small>Claim window</small>
              <strong>{enrollmentState.claimWindowDays} days</strong>
              <em>from exam attempt date</em>
            </div>
          </div>
        </article>

        <article className={`mb-claim-state ${claim.tone}`}>
          <header>
            <small>Current status</small>
            <span className={`mb-state-pill ${claim.tone}`}>
              <i className="fa-solid fa-circle"></i> {claim.label}
            </span>
          </header>
          <p>{claim.description}</p>
          <button
            type="button"
            className={`mb-claim-cta ${claim.canClaim ? "" : "disabled"}`}
            disabled={!claim.canClaim}
            aria-disabled={!claim.canClaim}
          >
            {claim.canClaim ? (
              <>
                <i className="fa-solid fa-file-pen"></i> Submit refund claim
              </>
            ) : (
              <>
                <i className="fa-solid fa-lock"></i> Claim form locked until exam result is recorded
              </>
            )}
          </button>
          {!claim.canClaim && (
            <small className="mb-claim-hint">
              The form unlocks automatically when your awarding body returns a failed outcome — typically within 24h of your exam.
            </small>
          )}
        </article>
      </section>

      {/* Gate-progress checklist mirror */}
      <section className="mb-card">
        <header className="mb-section-head">
          <div>
            <h3>Gate-progress checklist · mirror of dashboard banner</h3>
            <small>
              All six items must be in a <strong>Met</strong> state at the moment you redeem your voucher.
              The system snapshots this state at redemption — that's what your claim is checked against.
            </small>
          </div>
          <div className="mb-gate-summary">
            <strong>
              {metGates} <span>of {totalGates} met</span>
            </strong>
            <div className="mb-gate-bar">
              <div className="mb-gate-fill" style={{ width: `${compositePct}%` }} />
            </div>
          </div>
        </header>

        <ul className="mb-gates">
          {gateItems.map((g) => {
            const s = statusMap[g.status];
            return (
              <li key={g.id} className={`mb-gate ${g.status}`}>
                <span className={`mb-gate-ic ${s.tone}`}>
                  <i className={s.icon}></i>
                </span>
                <div className="mb-gate-meta">
                  <div className="mb-gate-top">
                    <strong>{g.title}</strong>
                    <span className={`mb-gate-status ${s.tone}`}>
                      <i className={s.icon}></i> {s.label}
                    </span>
                  </div>
                  <p>{g.detail}</p>
                  <div className="mb-gate-numbers">
                    <span>
                      <small>Required</small>
                      <strong>{g.required}</strong>
                    </span>
                    <span>
                      <small>Your status</small>
                      <strong>{g.current}</strong>
                    </span>
                  </div>
                  <div className="mb-gate-progress">
                    <div className="mb-gate-progress-bar">
                      <div
                        className={`mb-gate-progress-fill ${s.tone}`}
                        style={{ width: `${g.progressPct}%` }}
                      />
                    </div>
                    <small>{g.progressPct}%</small>
                  </div>
                </div>
                <div className="mb-gate-action">
                  {g.href && g.status !== "met" && (
                    <Link href={g.href} className="mb-secondary primary">
                      Take action <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  )}
                  {g.href && g.status === "met" && (
                    <Link href={g.href} className="mb-secondary">
                      View detail
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="mb-card-foot">
          <div className="mb-foot-note">
            <i className="fa-solid fa-circle-info"></i>
            <span>
              At-risk items don't block the guarantee right now — they will if they're still unresolved when you redeem the voucher.
              Fix them before you click "Redeem voucher" on the dashboard.
            </span>
          </div>
        </footer>
      </section>

      {/* Two-col — Terms + side info */}
      <section className="mb-twocol">
        <article className="mb-card">
          <header className="mb-section-head">
            <div>
              <h3>Terms · the eight conditions</h3>
              <small>Plain language. The full legal version is in your enrollment contract.</small>
            </div>
            <Link href="#" className="mb-inline">
              Read full contract <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </header>
          <ol className="mb-terms">
            {terms.map((t) => (
              <li key={t.num}>
                <span className="mb-term-num">{t.num}</span>
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <aside className="mb-side">
          <article className="mb-card mb-side-card">
            <h4>How a claim flows</h4>
            <ol className="mb-flow">
              <li>
                <span>1</span>
                <div>
                  <strong>Exam outcome recorded</strong>
                  <small>Automatically when your awarding body returns the result, or via manual upload.</small>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Claim form unlocks</strong>
                  <small>Pre-filled with your gate snapshot at redemption + exam outcome proof.</small>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Audit check (server-side)</strong>
                  <small>System verifies the gate-honoured snapshot. No human review unless flagged.</small>
                </div>
              </li>
              <li>
                <span>4</span>
                <div>
                  <strong>Refund processed</strong>
                  <small>Same rail as checkout. 3–10 days depending on method.</small>
                </div>
              </li>
            </ol>
          </article>

          <article className="mb-card mb-side-card">
            <h4>Refund will be sent to</h4>
            <div className="mb-pay">
              <i className="fa-solid fa-credit-card"></i>
              <div>
                <strong>HDFC Credit Card ****4421</strong>
                <small>Same card used at checkout · 7–10 days</small>
              </div>
            </div>
            <Link href="#" className="mb-inline">
              Use a different method <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>

          <article className="mb-card mb-side-card mb-help">
            <header>
              <h4>Questions before claiming?</h4>
              <small>Talk to the Trust & Safety team.</small>
            </header>
            <Link href="/lms/pmp/support" className="mb-secondary primary">
              <i className="fa-regular fa-life-ring"></i> Contact support
            </Link>
          </article>
        </aside>
      </section>

      {/* FAQ footer */}
      <section className="mb-faq">
        <article>
          <strong>Does the guarantee cover retake exams?</strong>
          <p>
            No — only the first attempt within the original voucher validity window is covered.
            Your Gold-tier retake allowance is a separate benefit and runs independently.
          </p>
        </article>
        <article>
          <strong>What if I miss my booked exam?</strong>
          <p>
            A no-show counts as a used attempt. If you no-show your first booking, the guarantee
            still applies if you take a rescheduled exam within the original validity window.
          </p>
        </article>
        <article>
          <strong>Can I claim and retake?</strong>
          <p>
            Yes — claiming the refund and using a retake voucher are independent.
            Both are available to Gold if your gate was honoured at redemption.
          </p>
        </article>
      </section>
    </LmsFrame>
  );
}
