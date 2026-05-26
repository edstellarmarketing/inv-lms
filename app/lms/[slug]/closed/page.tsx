import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type TerminalState = "passed" | "refunded";

const enrollment = {
  state: "passed" as TerminalState,
  closedOn: "20 June 2026",
  certLevel: "PMP®",
  finalScore: "AT / AT / T",
  bookingRef: "PMI-CONF-44781",
  refundAmount: 23000,
  alumniRate: "30% off",
};

const summary = {
  monthsActive: 4,
  liveSessionsAttended: 23,
  qbankCompleted: 1820,
  mocksTaken: 5,
  coachingCalls: 4,
  communityPosts: 31,
};

const crossSell = [
  { title: "PgMP® — Program Management",   href: "https://www.invensislearning.com/training/pgmp",    body: "Step up to program-level. Top match from your post-cert pathways." },
  { title: "PMI-ACP® — Agile Practitioner", href: "https://www.invensislearning.com/training/pmi-acp", body: "Strengthen your hybrid/Agile delivery credentials." },
  { title: "Lean Six Sigma Black Belt",     href: "https://www.invensislearning.com/training/lean-six-sigma-black-belt", body: "Quality + process improvement at scale." },
];

export default function ClosedEnrollmentPage() {
  const isPassed = enrollment.state === "passed";

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to all courses", href: "/dashboard" },
        { label: `${enrollment.certLevel} — Closed` },
      ]}
      title={isPassed ? `🏆 ${enrollment.certLevel} — passed and closed` : `🔁 ${enrollment.certLevel} — closed (refunded)`}
      subtitle={
        isPassed
          ? `Your journey closed on ${enrollment.closedOn}. Cert is live, renewal cycle is ticking. Pick the next thing whenever you're ready.`
          : `Your enrolment closed on ${enrollment.closedOn} with a refund of ₹${enrollment.refundAmount.toLocaleString()}. Re-enrol any time at the alumni rate.`
      }
      right={
        <span className={`cl-pill ${isPassed ? "passed" : "refunded"}`}>
          <i className={`fa-solid fa-${isPassed ? "trophy" : "rotate-right"}`}></i>
          {isPassed ? "Passed · Closed" : "Refunded · Closed"}
        </span>
      }
    >
      {/* Hero strip */}
      <section className={`cl-hero ${enrollment.state}`}>
        {isPassed ? (
          <>
            <div className="cl-hero-left">
              <span className="cl-hero-eyebrow">Final outcome</span>
              <h2>{enrollment.certLevel}-certified</h2>
              <p>
                Score <strong>{enrollment.finalScore}</strong> · booking{" "}
                <span className="mono">{enrollment.bookingRef}</span>
              </p>
              <div className="cl-hero-actions">
                <Link href="/lms/pmp/certificate" className="cl-primary">
                  <i className="fa-solid fa-file-pdf"></i> Download certificate
                </Link>
                <Link href="/lms/pmp/share" className="cl-secondary">
                  <i className="fa-brands fa-linkedin"></i> Share on LinkedIn
                </Link>
                <Link href="/lms/pmp/renewal" className="cl-secondary">
                  <i className="fa-solid fa-arrows-rotate"></i> Renewal tracker
                </Link>
              </div>
            </div>
            <div className="cl-hero-right">
              <div className="cl-trophy">
                <i className="fa-solid fa-trophy"></i>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cl-hero-left">
              <span className="cl-hero-eyebrow">Final outcome</span>
              <h2>₹{enrollment.refundAmount.toLocaleString()} refunded</h2>
              <p>
                Money-back guarantee honoured · refunded to original payment method on{" "}
                <strong>{enrollment.closedOn}</strong>
              </p>
              <div className="cl-hero-actions">
                <Link href="/lms/pmp/money-back/status/CLM-2026-7841" className="cl-primary">
                  <i className="fa-solid fa-list-check"></i> View refund timeline
                </Link>
                <a href="https://www.invensislearning.com/training/pmp" target="_blank" rel="noreferrer" className="cl-secondary">
                  Re-enrol at alumni rate <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
            <div className="cl-hero-right">
              <div className="cl-refund-card">
                <small>Refund</small>
                <strong>₹{enrollment.refundAmount.toLocaleString()}</strong>
                <small className="cl-refund-meta">to HDFC ****4421 · {enrollment.closedOn}</small>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Compact summary */}
      <section className="cl-summary-card">
        <header className="cl-section-head">
          <div>
            <h3>Your journey in numbers</h3>
            <small>{summary.monthsActive} months · everything you did here</small>
          </div>
        </header>
        <div className="cl-stat-grid">
          <div><strong>{summary.liveSessionsAttended}</strong><small>Live sessions attended</small></div>
          <div><strong>{summary.qbankCompleted.toLocaleString()}</strong><small>Q-bank questions completed</small></div>
          <div><strong>{summary.mocksTaken}</strong><small>Mock papers</small></div>
          <div><strong>{summary.coachingCalls}</strong><small>1:1 coaching calls</small></div>
          <div><strong>{summary.communityPosts}</strong><small>Community posts</small></div>
          <div><strong>{summary.monthsActive}mo</strong><small>From activation to {isPassed ? "pass" : "refund"}</small></div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="cl-cross">
        <header className="cl-section-head">
          <div>
            <h3>{isPassed ? "Where to next" : "Try again at the alumni rate"}</h3>
            <small>{isPassed ? "Top picks from your post-cert pathways" : "Same curriculum, 30% off, your progress is preserved"}</small>
          </div>
        </header>
        <div className="cl-cross-grid">
          {crossSell.map((c) => (
            <article key={c.title}>
              <strong>{c.title}</strong>
              <p>{c.body}</p>
              <a href={c.href} target="_blank" rel="noreferrer" className="cl-cross-cta">
                Open on invensislearning.com <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* What you keep */}
      <section className="cl-twocol">
        <article className="cl-card cl-keep">
          <h4>What you keep</h4>
          <ul>
            <li><i className="fa-solid fa-circle-check"></i><span><strong>Community access</strong> for life</span></li>
            <li><i className="fa-solid fa-circle-check"></i><span>This <strong>summary page</strong> stays available</span></li>
            <li><i className="fa-solid fa-circle-check"></i><span><strong>Cashback ledger</strong> with any unredeemed balance</span></li>
            {isPassed && <li><i className="fa-solid fa-circle-check"></i><span><strong>Certificate + renewal tracker</strong></span></li>}
            {isPassed && <li><i className="fa-solid fa-circle-check"></i><span><strong>Post-cert pathways</strong> recommendations</span></li>}
          </ul>
        </article>

        <aside className="cl-card cl-archive">
          <h4>What's archived</h4>
          <ul>
            <li><i className="fa-solid fa-box-archive"></i><span>Reference cards, study guides, glossary</span></li>
            <li><i className="fa-solid fa-box-archive"></i><span>Q-bank + mock papers</span></li>
            <li><i className="fa-solid fa-box-archive"></i><span>AI tools (study plan, coaches)</span></li>
            <li><i className="fa-solid fa-box-archive"></i><span>Live training schedule</span></li>
          </ul>
          <small>Re-enrol to unlock everything again.</small>
        </aside>
      </section>

      {/* Goodbye / next step */}
      <section className="cl-banner-note">
        <article>
          <i className="fa-solid fa-heart"></i>
          <div>
            <strong>{isPassed ? "We're glad you came through with us." : "We're sorry it didn't work out this round."}</strong>
            <p>
              {isPassed
                ? "Stay in touch via community + mentor others when you're ready. The alumni rate applies to everything on invensislearning.com."
                : "The money-back guarantee was built so you can take a swing without the risk. If you ever want to try again, we'll honour the alumni rate and your progress data."
              }
            </p>
          </div>
          <Link href="/lms/pmp/community" className="cl-secondary primary">
            <i className="fa-solid fa-users"></i> Join the alumni community
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
