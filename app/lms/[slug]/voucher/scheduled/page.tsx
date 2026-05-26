import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const examScheduled = true;
const exam = {
  date: "12 June 2026",
  dayOfWeek: "Friday",
  time: "10:00 AM IST",
  format: "Online proctored",
  daysAway: 17,
  voucherCode: "PMI-2026-K7Z9-9X4F-A2L8",
  bookingRef: "PMI-CONF-44781",
};

type ChecklistItem = {
  text: string;
  done: boolean;
  detail?: string;
};

const checklist: ChecklistItem[] = [
  { text: "Photo ID ready (passport / Aadhaar)", done: true, detail: "PMI requires government-issued ID matching your name on file" },
  { text: "Quiet, well-lit room with no other people", done: true, detail: "Online proctor will scan the room — clear everything off your desk" },
  { text: "Webcam + mic tested on PMI's system check", done: false, detail: "Run the check 24h before — opens 14 days before exam date" },
  { text: "Stable internet (≥10 Mbps up & down)", done: false, detail: "Wired connection recommended. Tether mobile data as backup" },
  { text: "PMP exam handbook read once", done: true, detail: "Covers what's allowed in the room, breaks policy, and outcome timing" },
];

const examPrep = [
  { day: "T-14 days", task: "System check on PMI portal · review exam handbook", done: false },
  { day: "T-7 days", task: "Light review only — finish wrong-answers pool · 1 mini mock", done: false },
  { day: "T-2 days", task: "Soft taper — re-read your top wrong-answers, hydrate, sleep", done: false },
  { day: "T-1 day", task: "Lay out ID + clean desk · arrange backup network · early sleep", done: false },
  { day: "Exam day", task: "Light breakfast · log in 30 min early · breathe", done: false },
];

export default function ExamScheduledPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Exam scheduled" },
      ]}
      title={examScheduled ? "🗓️ Your exam is on the calendar" : "📅 Record your exam date"}
      subtitle={
        examScheduled
          ? `Locked in for ${exam.date} · ${exam.daysAway} days away. We've updated your dashboard banner and exam-day countdown.`
          : "Drop the date below — we'll set up your exam-day countdown, banner, and prep checklist."
      }
      right={
        examScheduled ? (
          <div className="es-head-countdown">
            <strong>{exam.daysAway}</strong>
            <span>
              <small>days to</small>
              <em>{exam.date}</em>
            </span>
          </div>
        ) : null
      }
    >
      {!examScheduled ? (
        <section className="es-form-card">
          <header className="es-section-head">
            <div>
              <h3>Exam booking details</h3>
              <small>
                We use this to power your countdown, exam-day standby, and
                outcome capture flows. None of it is shared externally.
              </small>
            </div>
          </header>
          <div className="es-form">
            <label>
              <span>Exam date</span>
              <input type="date" />
            </label>
            <label>
              <span>Exam time (IST)</span>
              <input type="time" />
            </label>
            <label>
              <span>Format</span>
              <select>
                <option value="online">Online proctored</option>
                <option value="centre">Test centre</option>
              </select>
            </label>
            <label>
              <span>PMI booking reference</span>
              <input type="text" placeholder="PMI-CONF-…" />
            </label>
            <label className="es-form-full">
              <span>Proof of booking (optional)</span>
              <div className="es-upload">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>
                  Drop the PMI confirmation email or PDF here, or{" "}
                  <Link href="#" className="es-inline">
                    browse
                  </Link>
                </span>
              </div>
            </label>
          </div>
          <footer>
            <button type="button" className="es-secondary">
              Save draft
            </button>
            <button type="button" className="es-primary">
              <i className="fa-solid fa-circle-check"></i> Confirm exam date
            </button>
          </footer>
        </section>
      ) : (
        <>
          {/* Confirmation hero */}
          <section className="es-confirmed">
            <article className="es-confirmed-left">
              <div className="es-tag">
                <i className="fa-solid fa-circle-check"></i> Confirmed
              </div>
              <h2>
                {exam.dayOfWeek} · {exam.date}
              </h2>
              <p className="es-time">
                <i className="fa-regular fa-clock"></i> {exam.time} ·{" "}
                <strong>{exam.format}</strong>
              </p>
              <div className="es-meta-grid">
                <div>
                  <small>Days to exam</small>
                  <strong>{exam.daysAway}</strong>
                </div>
                <div>
                  <small>Booking reference</small>
                  <strong>{exam.bookingRef}</strong>
                </div>
                <div>
                  <small>Voucher</small>
                  <strong>Active · redeemed</strong>
                </div>
              </div>
              <div className="es-cta-row">
                <Link href="/lms/pmp/exam-day" className="es-primary">
                  <i className="fa-solid fa-list-check"></i> Open exam-day prep
                </Link>
                <button type="button" className="es-secondary">
                  <i className="fa-regular fa-calendar"></i> Add to calendar
                </button>
              </div>
            </article>
            <aside className="es-confirmed-right">
              <div className="es-countdown-ring">
                <strong>{exam.daysAway}</strong>
                <small>days</small>
                <em>to exam</em>
              </div>
              <small>
                <i className="fa-solid fa-circle-info"></i> Need to
                reschedule? PMI allows one free move up to 48h before.
              </small>
              <Link href="#" className="es-inline">
                PMI reschedule policy <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </aside>
          </section>

          {/* Checklist + countdown plan */}
          <section className="es-twocol">
            <article className="es-checklist-card">
              <header className="es-section-head">
                <div>
                  <h3>Exam day checklist</h3>
                  <small>
                    {checklist.filter((c) => c.done).length} of{" "}
                    {checklist.length} cleared · final 24h check is critical
                  </small>
                </div>
              </header>
              <ul className="es-checklist">
                {checklist.map((c, i) => (
                  <li key={i} className={c.done ? "done" : ""}>
                    <span className={`es-check ${c.done ? "done" : ""}`}>
                      {c.done && <i className="fa-solid fa-check"></i>}
                    </span>
                    <div>
                      <strong>{c.text}</strong>
                      {c.detail && <small>{c.detail}</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <aside className="es-plan-card">
              <header className="es-section-head">
                <div>
                  <h3>Suggested countdown</h3>
                  <small>Light taper into exam day · don't cram</small>
                </div>
              </header>
              <ul className="es-plan">
                {examPrep.map((p, i) => (
                  <li key={i}>
                    <span className="es-plan-day">{p.day}</span>
                    <p>{p.task}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </>
      )}

      {/* Banner mirror note */}
      <section className="es-banner-note">
        <article>
          <i className="fa-solid fa-bullhorn"></i>
          <div>
            <strong>Banner is now live</strong>
            <p>
              Your dashboard banner has switched from "Redeem voucher" to{" "}
              <em>"Exam: {exam.date} · {exam.daysAway} days away"</em>. Every
              page deep-links from the banner into your exam-day prep.
            </p>
          </div>
          <Link href="/lms/pmp" className="es-secondary">
            See banner on dashboard <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
