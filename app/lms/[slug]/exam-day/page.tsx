import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const exam = {
  date: "12 June 2026",
  weekday: "Friday",
  time: "10:00 AM IST",
  format: "Online proctored",
  daysAway: 17,
  hoursAway: 17 * 24,
  awardingBody: "PMI",
  certLevel: "PMP®",
  bookingRef: "PMI-CONF-44781",
  examLink: "https://exam.pmi.org/join/abc",
};

type CheckItem = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
  category: "id" | "tech" | "room" | "policy";
};

const checklist: CheckItem[] = [
  { id: "id-1", category: "id", title: "Photo ID matches your PMI name", done: true, detail: "Passport or Aadhaar with your name exactly as registered with PMI" },
  { id: "id-2", category: "id", title: "Second ID as backup", done: true, detail: "Driving licence or PAN — required if primary ID is questioned" },
  { id: "tech-1", category: "tech", title: "Webcam + mic tested on PMI's system check", done: false, detail: "Run the official check 24–72h before. Opens 14 days prior" },
  { id: "tech-2", category: "tech", title: "Stable internet (≥10 Mbps both ways)", done: true, detail: "Wired connection recommended. Tether mobile data as backup" },
  { id: "tech-3", category: "tech", title: "Browser updated, all extensions disabled", done: false, detail: "Chrome or Edge latest. No ad-blockers, password managers, or screen recorders" },
  { id: "tech-4", category: "tech", title: "Phone silenced and out of arm's reach", done: true, detail: "Even a vibration can trigger a proctor warning" },
  { id: "room-1", category: "room", title: "Quiet, well-lit, fully enclosed room", done: true, detail: "Proctor will scan 360° — no other people, posters, sticky notes, or papers" },
  { id: "room-2", category: "room", title: "Desk cleared of everything except your laptop", done: false, detail: "Even closed water bottles need approval from the proctor" },
  { id: "room-3", category: "room", title: "Bathroom break taken right before joining", done: false, detail: "PMP exam doesn't allow mid-exam breaks for closed-book paper" },
  { id: "policy-1", category: "policy", title: "PMP candidate handbook read once", done: true, detail: "Covers what's allowed, break policy, and outcome timing" },
];

type CategoryMeta = { label: string; icon: string; tone: string };
const categoryMeta: Record<CheckItem["category"], CategoryMeta> = {
  id: { label: "Identity", icon: "fa-solid fa-id-card", tone: "blue" },
  tech: { label: "Tech setup", icon: "fa-solid fa-laptop", tone: "purple" },
  room: { label: "Environment", icon: "fa-solid fa-house", tone: "teal" },
  policy: { label: "Policies", icon: "fa-solid fa-book", tone: "amber" },
};

type Policy = { title: string; body: string };

const policies: Policy[] = [
  { title: "No breaks for closed-book papers", body: "The PMP exam is one continuous 230-minute session. You cannot leave the room — even briefly — without aborting the attempt." },
  { title: "Whiteboard / scratch paper", body: "Online proctor lets you use the built-in digital scratch pad only. Physical paper, whiteboard, or apps are not allowed." },
  { title: "Late arrival = no exam", body: "If you join more than 15 minutes after your slot starts, PMI cancels the booking and the voucher is consumed." },
  { title: "Mid-exam disconnection", body: "If you lose internet, the proctor pauses. Reconnect within 30 minutes to resume; otherwise the attempt is voided (but voucher is preserved)." },
  { title: "Outcome timing", body: "PMP returns provisional pass/fail on submit. Official record appears in PMI's portal within 5–7 days." },
];

const dontList = [
  "Don't speak out loud, mutter, or read questions audibly",
  "Don't look away from the screen for more than a few seconds",
  "Don't have your phone, watch, or any wearable on you",
  "Don't have anyone else enter the room — even briefly",
];

export default function ExamDayPrepPage() {
  const doneCount = checklist.filter(c => c.done).length;
  const pct = Math.round((doneCount / checklist.length) * 100);

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Exam day prep" },
      ]}
      title="🎯 Exam day prep"
      subtitle={`${exam.daysAway} days to go. Run through the checklist below — the closer you get to exam day, the more it matters.`}
      right={
        <div className="ed-head-countdown">
          <strong>{exam.daysAway}</strong>
          <span>
            <small>days to</small>
            <em>{exam.date}</em>
          </span>
        </div>
      }
    >
      {/* Exam meta strip */}
      <section className="ed-meta">
        <article>
          <small>Exam</small>
          <strong>{exam.certLevel}</strong>
          <em>{exam.awardingBody}</em>
        </article>
        <article>
          <small>When</small>
          <strong>{exam.weekday} · {exam.date}</strong>
          <em>{exam.time}</em>
        </article>
        <article>
          <small>Format</small>
          <strong>{exam.format}</strong>
          <em>230 min · 180 questions</em>
        </article>
        <article>
          <small>Booking</small>
          <strong>{exam.bookingRef}</strong>
          <em>PMI confirmation</em>
        </article>
      </section>

      {/* Countdown + Join CTA */}
      <section className="ed-countdown-card">
        <div className="ed-countdown-left">
          <small>Time remaining</small>
          <div className="ed-countdown-numbers">
            <span><strong>{exam.daysAway}</strong><em>days</em></span>
            <span><strong>{exam.hoursAway}</strong><em>hours</em></span>
          </div>
          <p>
            We'll surface the <strong>Join exam</strong> button on this page
            starting <strong>30 minutes before</strong> your slot.
          </p>
        </div>
        <div className="ed-countdown-right">
          <span className="ed-progress-pct">{pct}%</span>
          <small>Checklist ready · {doneCount} of {checklist.length}</small>
          <div className="ed-progress-bar">
            <div className="ed-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="ed-checklist-card">
        <header className="ed-section-head">
          <div>
            <h3>Day-of checklist</h3>
            <small>Run through all 10 before your slot opens · grouped by area</small>
          </div>
          <div className="ed-filter-row">
            <button className="ed-chip active" type="button">All ({checklist.length})</button>
            <button className="ed-chip" type="button">Pending ({checklist.length - doneCount})</button>
            <button className="ed-chip" type="button">Done ({doneCount})</button>
          </div>
        </header>

        {(Object.keys(categoryMeta) as CheckItem["category"][]).map((cat) => {
          const items = checklist.filter(c => c.category === cat);
          const m = categoryMeta[cat];
          return (
            <div key={cat} className="ed-cat-group">
              <header>
                <span className={`ed-cat-pill ${m.tone}`}>
                  <i className={m.icon}></i> {m.label}
                </span>
                <small>{items.filter(c => c.done).length} of {items.length}</small>
              </header>
              <ul>
                {items.map((c) => (
                  <li key={c.id} className={c.done ? "done" : ""}>
                    <span className={`ed-check ${c.done ? "done" : ""}`}>
                      {c.done && <i className="fa-solid fa-check"></i>}
                    </span>
                    <div>
                      <strong>{c.title}</strong>
                      <small>{c.detail}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Policies summary */}
      <section className="ed-twocol">
        <article className="ed-policies-card">
          <header className="ed-section-head">
            <div>
              <h3>{exam.awardingBody} exam policies</h3>
              <small>Read once. These are the rules that get learners flagged.</small>
            </div>
          </header>
          <ul className="ed-policies">
            {policies.map((p, idx) => (
              <li key={idx}>
                <span>{idx + 1}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <aside className="ed-dont-card">
          <header>
            <h4>⚠️ Watch-outs</h4>
            <small>Common reasons attempts get flagged</small>
          </header>
          <ul>
            {dontList.map((d, i) => (
              <li key={i}>
                <i className="fa-solid fa-circle-xmark"></i>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <Link href="/lms/pmp/support" className="ed-secondary">
            <i className="fa-regular fa-life-ring"></i> Talk to support
          </Link>
        </aside>
      </section>

      {/* Standby reminder */}
      <section className="ed-banner-note">
        <article>
          <i className="fa-solid fa-bullhorn"></i>
          <div>
            <strong>When your exam window opens</strong>
            <p>
              30 minutes before your slot, this page will auto-route to a calm
              standby surface — study tools will be disabled, and you'll see
              only the <em>Join exam</em> button and a wish-you-well note.
            </p>
          </div>
          <Link href="/lms/pmp/exam-day/active" className="ed-secondary primary">
            See standby surface <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
