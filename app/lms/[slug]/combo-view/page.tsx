import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type LegState = {
  level: "Foundation" | "Practitioner";
  tagline: string;
  composite: number;
  threshold: number;
  daysToExam: number | null;
  voucherStatus: "Locked" | "Unlocked" | "Redeemed";
  tone: "blue" | "purple";
};

const legs: LegState[] = [
  { level: "Foundation",  tagline: "Knowledge of the PRINCE2® framework",       composite: 82, threshold: 70, daysToExam: 12, voucherStatus: "Redeemed",  tone: "blue"   },
  { level: "Practitioner", tagline: "Applying the framework to scenarios",     composite: 58, threshold: 75, daysToExam: null, voucherStatus: "Locked",     tone: "purple" },
];

export default function ComboViewPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "PRINCE2® F+P combo view" },
      ]}
      title="📚 PRINCE2® Foundation + Practitioner"
      subtitle="Combo course view — one enrolment, two independent exams. Each leg has its own readiness, voucher, and validity window."
    >
      <section className="cb-info">
        <i className="fa-solid fa-layer-group"></i>
        <div>
          <strong>How the combo works</strong>
          <p>
            Foundation must be passed before Practitioner can be attempted. Practitioner has a higher gate
            (composite ≥75) because the exam is scenario-heavy and open-book.
          </p>
        </div>
      </section>

      <section className="cb-legs">
        {legs.map((leg) => (
          <article key={leg.level} className={`cb-leg ${leg.tone}`}>
            <header>
              <div>
                <small>Either-exam path · independent gate</small>
                <h3>{leg.level}</h3>
                <p>{leg.tagline}</p>
              </div>
              <span className={`cb-status ${leg.voucherStatus.toLowerCase()}`}>{leg.voucherStatus}</span>
            </header>

            <div className="cb-readiness">
              <div className="cb-readiness-num">
                <strong>{leg.composite}</strong>
                <small>/ {leg.threshold} target</small>
              </div>
              <div className="cb-readiness-bar">
                <div className={`cb-readiness-fill ${leg.tone}`} style={{ width: `${(leg.composite / leg.threshold) * 100}%` }} />
              </div>
              {leg.daysToExam !== null
                ? <small className="cb-exam-meta"><i className="fa-regular fa-calendar"></i> Exam booked · {leg.daysToExam} days away</small>
                : <small className="cb-exam-meta muted"><i className="fa-solid fa-lock"></i> {leg.threshold - leg.composite} points to unlock voucher</small>
              }
            </div>

            <div className="cb-quick">
              <Link href="/lms/pmp/question-bank"><i className="fa-solid fa-circle-question"></i> Q-bank</Link>
              <Link href="/lms/pmp/mock-exam/1"><i className="fa-solid fa-stopwatch"></i> Mocks</Link>
              <Link href="/lms/pmp/readiness"><i className="fa-solid fa-bullseye"></i> Readiness</Link>
              {leg.voucherStatus === "Redeemed" && (
                <Link href="/lms/pmp/voucher/scheduled"><i className="fa-solid fa-calendar-check"></i> Exam day</Link>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="cb-shared">
        <header><h3>Shared across both legs</h3><small>Used for both Foundation and Practitioner prep</small></header>
        <div className="cb-shared-grid">
          <Link href="/lms/pmp/ai"><i className="fa-solid fa-wand-magic-sparkles"></i><span>AI tools</span></Link>
          <Link href="/lms/pmp/live-training"><i className="fa-solid fa-video"></i><span>Live training</span></Link>
          <Link href="/lms/pmp/coaching"><i className="fa-solid fa-user-graduate"></i><span>1:1 coaching</span></Link>
          <Link href="/lms/pmp/community"><i className="fa-solid fa-users"></i><span>Community</span></Link>
          <Link href="/lms/pmp/cashback"><i className="fa-solid fa-coins"></i><span>Cashback</span></Link>
          <Link href="/lms/pmp/money-back"><i className="fa-solid fa-shield-halved"></i><span>Money-back</span></Link>
        </div>
      </section>

      <section className="cb-foot">
        <Link href="/lms/pmp/voucher/combo" className="cb-foot-cta">
          See combo voucher view <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>
    </LmsFrame>
  );
}
