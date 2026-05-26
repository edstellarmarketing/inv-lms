import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const retake = {
  attemptsRemaining: 2,
  windowEnds: "10 December 2026",
  daysInWindow: 180,
  daysRemaining: 168,
  voucherStatus: "Re-issued" as "Re-issued" | "Pending" | "Used",
  recommendedStartIn: "6 weeks",
};

type Cohort = {
  startDate: string;
  weekday: string;
  format: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  weeks: number;
  recommended?: boolean;
};

const cohorts: Cohort[] = [
  { startDate: "Mon 13 Jul 2026", weekday: "Mon/Wed/Fri evenings", format: "Live online · 6 weeks", instructor: "Rohan Mehta", capacity: 40, enrolled: 28, weeks: 6, recommended: true },
  { startDate: "Sat 25 Jul 2026", weekday: "Sat + Sun mornings",   format: "Live online · 5 weeks",  instructor: "Priya Iyer",  capacity: 40, enrolled: 19, weeks: 5 },
  { startDate: "Mon 10 Aug 2026", weekday: "Mon/Wed/Fri mornings", format: "Live online · 6 weeks", instructor: "Kavya Nair",  capacity: 40, enrolled: 8,  weeks: 6 },
];

const credits = {
  retakeTraining: { earned: 0, total: 1, label: "Retake training cohort" },
  qbankBoost: { earned: 0, total: 200, label: "Bonus Q-bank questions" },
  mocksBoost: { earned: 0, total: 2, label: "Additional mock papers" },
  coaching: { earned: 1, total: 1, label: "1:1 coaching credit (Gold)" },
};

export default function RetakeBookingPage() {
  const windowPct = Math.round(((retake.daysInWindow - retake.daysRemaining) / retake.daysInWindow) * 100);

  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Exam outcome", href: "/lms/pmp/exam-result" },
        { label: "Retake training" },
      ]}
      title="🔁 Retake training booking"
      subtitle={`${retake.attemptsRemaining} attempts left in your 180-day window. Pick a cohort below — targeted prep, not a re-run of the whole course.`}
      right={
        <div className="rt-head-meta">
          <small>Window ends</small>
          <strong>{retake.windowEnds}</strong>
          <em>{retake.daysRemaining} days left</em>
        </div>
      }
    >
      {/* Window status */}
      <section className="rt-window">
        <article>
          <small>Re-attempt window</small>
          <div className="rt-window-progress">
            <div className="rt-window-bar">
              <div className="rt-window-fill" style={{ width: `${windowPct}%` }} />
            </div>
            <strong>{retake.daysRemaining} days remaining</strong>
          </div>
          <small>
            Start retake training within <strong>{retake.recommendedStartIn}</strong> of your
            failed attempt — that's the sweet spot for most learners.
          </small>
        </article>

        <article className="rt-voucher">
          <small>Voucher</small>
          <strong>{retake.voucherStatus}</strong>
          <p>
            PMI re-issued your voucher within 24h of recording the failed
            outcome. Same code, same validity rules.
          </p>
          <Link href="/lms/pmp/voucher" className="rt-inline">
            View voucher tile <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>

      {/* Cohort picker */}
      <section className="rt-cohorts-card">
        <header className="rt-section-head">
          <div>
            <h3>Upcoming cohorts</h3>
            <small>All taught from your existing live training schedule — your retake seat is reserved across them</small>
          </div>
          <Link href="/lms/pmp/live-training" className="rt-inline">
            See full schedule <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </header>

        <ul className="rt-cohort-list">
          {cohorts.map((c) => {
            const seatsLeft = c.capacity - c.enrolled;
            const pct = Math.round((c.enrolled / c.capacity) * 100);
            return (
              <li key={c.startDate} className={c.recommended ? "recommended" : ""}>
                <div className="rt-cohort-date">
                  <strong>{c.startDate}</strong>
                  <small>{c.weekday}</small>
                </div>
                <div className="rt-cohort-meta">
                  <strong>{c.format}</strong>
                  <small>with {c.instructor}</small>
                  {c.recommended && (
                    <span className="rt-cohort-rec">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Recommended
                    </span>
                  )}
                </div>
                <div className="rt-cohort-cap">
                  <div className="rt-cap-bar">
                    <div className={`rt-cap-fill ${pct >= 90 ? "hot" : pct >= 70 ? "warm" : "ok"}`} style={{ width: `${pct}%` }} />
                  </div>
                  <small>{seatsLeft} of {c.capacity} seats left</small>
                </div>
                <div className="rt-cohort-cta">
                  <button type="button" className={`rt-primary${c.recommended ? "" : " ghost"}`}>
                    Book seat <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Credit ledger */}
      <section className="rt-twocol">
        <article className="rt-credits-card">
          <header className="rt-section-head">
            <div>
              <h3>Retake credit ledger</h3>
              <small>Resources included with your retake — already credited to your account</small>
            </div>
          </header>
          <ul className="rt-credit-list">
            {Object.values(credits).map((c, i) => (
              <li key={i}>
                <div className="rt-credit-bar">
                  <div className="rt-credit-fill" style={{ width: `${(c.earned / c.total) * 100}%` }} />
                </div>
                <div>
                  <strong>{c.label}</strong>
                  <small>{c.earned} of {c.total} used</small>
                </div>
                <span>+{c.total - c.earned}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="rt-plan-card">
          <header className="rt-section-head">
            <div>
              <h3>Suggested 6-week plan</h3>
              <small>Targets your weakest cluster from the failed attempt</small>
            </div>
          </header>
          <ol className="rt-plan">
            <li><span>W1</span><p>Light reset — re-read Process domain reference cards</p></li>
            <li><span>W2</span><p>Process drill — 150 wrong-only Q-bank questions</p></li>
            <li><span>W3</span><p>Mini Mock 3 + Process scenario coach session</p></li>
            <li><span>W4</span><p>Full Length Exam 1 (closed-book pacing)</p></li>
            <li><span>W5</span><p>Wrong-answer review · 1:1 coaching with Kavya</p></li>
            <li><span>W6</span><p>Final mock + light taper · exam day</p></li>
          </ol>
        </aside>
      </section>

      {/* Alt path */}
      <section className="rt-banner">
        <article>
          <i className="fa-solid fa-shield-halved"></i>
          <div>
            <strong>Not feeling the retake?</strong>
            <p>
              Your Gold money-back guarantee is still on the table for the next 30 days.
              Switching to claim mode forfeits the retake voucher — but the cash lands in 3–10 days.
            </p>
          </div>
          <Link href="/lms/pmp/money-back/claim" className="rt-secondary primary">
            See claim instead <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
