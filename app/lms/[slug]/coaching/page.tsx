import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type CoachTone = "blue" | "purple" | "green" | "orange" | "pink" | "teal";

type Coach = {
  id: string;
  name: string;
  initials: string;
  tone: CoachTone;
  title: string;
  yearsCoaching: number;
  rating: number;
  reviews: number;
  bio: string;
  specialties: string[];
  nextAvailable: string;
  totalSessions: number;
};

const coaches: Coach[] = [
  {
    id: "priya",
    name: "Priya Iyer",
    initials: "PI",
    tone: "purple",
    title: "PMP®, PMI-ACP · Lead Coach",
    yearsCoaching: 9,
    rating: 4.9,
    reviews: 412,
    bio:
      "Ex-PMO lead at a Fortune-500 IT services firm. Specialises in translating field experience into PMI exam language. Strong on Process domain and EVM.",
    specialties: ["Process domain", "EVM", "Wrong-answers diagnosis"],
    nextAvailable: "Tomorrow · 11:00 IST",
    totalSessions: 1280,
  },
  {
    id: "rohan",
    name: "Rohan Mehta",
    initials: "RM",
    tone: "blue",
    title: "PMP®, PRINCE2® · Senior Coach",
    yearsCoaching: 7,
    rating: 4.8,
    reviews: 318,
    bio:
      "12 years in delivery management across BFSI and telecom. Helps learners with hybrid life-cycles, tailoring decisions, and stakeholder strategy.",
    specialties: ["Hybrid tailoring", "Stakeholder strategy", "Mock pacing"],
    nextAvailable: "Wed 27 · 16:30 IST",
    totalSessions: 940,
  },
  {
    id: "kavya",
    name: "Kavya Nair",
    initials: "KN",
    tone: "pink",
    title: "PgMP®, PfMP® · Executive Coach",
    yearsCoaching: 11,
    rating: 4.9,
    reviews: 587,
    bio:
      "Programme Director with multi-country delivery experience. Coaches senior PMs on Business Environment, benefits realisation, and exam strategy.",
    specialties: ["Business Environment", "Senior PM positioning", "Exam strategy"],
    nextAvailable: "Today · 21:00 IST",
    totalSessions: 1620,
  },
  {
    id: "anita",
    name: "Anita Desai",
    initials: "AD",
    tone: "orange",
    title: "PMP®, RMP® · Risk Coach",
    yearsCoaching: 6,
    rating: 4.7,
    reviews: 256,
    bio:
      "Risk specialist with deep coverage of qualitative + quantitative tools. Best fit if you're stuck on risk register, EMV, or decision trees.",
    specialties: ["Risk management", "Decision trees", "Quality clinic"],
    nextAvailable: "Thu 28 · 18:00 IST",
    totalSessions: 720,
  },
];

const credits = {
  total: 6,
  used: 3,
  remaining: 3,
  expiresOn: "30 Aug 2026",
  perSession: "60 min",
};

type SlotState = "open" | "selected" | "booked" | "blocked";

type Slot = {
  time: string;
  coachId: string;
  state: SlotState;
};

type DaySlots = {
  iso: string;
  dateNum: string;
  weekday: string;
  isToday?: boolean;
  isTomorrow?: boolean;
  slots: Slot[];
};

const week: DaySlots[] = [
  {
    iso: "2026-05-25",
    dateNum: "25",
    weekday: "Mon",
    isToday: true,
    slots: [
      { time: "21:00", coachId: "kavya", state: "open" },
    ],
  },
  {
    iso: "2026-05-26",
    dateNum: "26",
    weekday: "Tue",
    isTomorrow: true,
    slots: [
      { time: "11:00", coachId: "priya", state: "open" },
      { time: "15:00", coachId: "priya", state: "blocked" },
      { time: "19:30", coachId: "kavya", state: "selected" },
    ],
  },
  {
    iso: "2026-05-27",
    dateNum: "27",
    weekday: "Wed",
    slots: [
      { time: "10:30", coachId: "rohan", state: "open" },
      { time: "16:30", coachId: "rohan", state: "open" },
      { time: "20:00", coachId: "anita", state: "open" },
    ],
  },
  {
    iso: "2026-05-28",
    dateNum: "28",
    weekday: "Thu",
    slots: [
      { time: "18:00", coachId: "anita", state: "open" },
      { time: "21:00", coachId: "priya", state: "booked" },
    ],
  },
  {
    iso: "2026-05-29",
    dateNum: "29",
    weekday: "Fri",
    slots: [
      { time: "10:00", coachId: "kavya", state: "open" },
      { time: "17:30", coachId: "rohan", state: "open" },
    ],
  },
  {
    iso: "2026-05-30",
    dateNum: "30",
    weekday: "Sat",
    slots: [
      { time: "11:00", coachId: "priya", state: "open" },
      { time: "14:00", coachId: "anita", state: "open" },
    ],
  },
  {
    iso: "2026-05-31",
    dateNum: "31",
    weekday: "Sun",
    slots: [],
  },
];

type Questionnaire = {
  question: string;
  hint: string;
  answer: string;
  status: "answered" | "pending";
};

const prepForm: Questionnaire[] = [
  {
    question: "Top 1 area you want to crack in this session",
    hint: "Be specific — e.g. 'EVM under fixed-price contracts'",
    answer: "EVM under hybrid life-cycles — I keep miscalculating CPI when CV is negative.",
    status: "answered",
  },
  {
    question: "Last mock score & weakest topic",
    hint: "Pulled from your latest attempt — confirm or override.",
    answer: "Mini Mock 2 · 72% · weakest: Process domain (61%)",
    status: "answered",
  },
  {
    question: "Two wrong answers you want to review live",
    hint: "Paste question IDs from /question-bank/wrong",
    answer: "",
    status: "pending",
  },
  {
    question: "How you prefer feedback (direct / nudge / scenario)",
    hint: "Coach uses this to set tone.",
    answer: "Direct",
    status: "answered",
  },
];

type PastSession = {
  date: string;
  coachId: string;
  topic: string;
  notesHref: string;
  recordingHref: string;
};

const pastSessions: PastSession[] = [
  {
    date: "Mon 18 May · 21:00 IST",
    coachId: "kavya",
    topic: "Business Environment — benefits realisation & strategic alignment",
    notesHref: "#",
    recordingHref: "#",
  },
  {
    date: "Thu 14 May · 19:30 IST",
    coachId: "priya",
    topic: "Wrong-answers clinic — EVM trap patterns",
    notesHref: "#",
    recordingHref: "#",
  },
  {
    date: "Tue 06 May · 18:00 IST",
    coachId: "rohan",
    topic: "Hybrid tailoring on a 9-month delivery",
    notesHref: "#",
    recordingHref: "#",
  },
];

function CoachAvatar({ c, size = 44 }: { c: Coach; size?: number }) {
  return (
    <span
      className={`co-avatar ${c.tone}`}
      style={{ width: size, height: size, fontSize: Math.max(11, size * 0.34) }}
    >
      {c.initials}
    </span>
  );
}

export default function CoachingPage() {
  const usedPct = Math.round((credits.used / credits.total) * 100);
  const prepDone = prepForm.filter((p) => p.status === "answered").length;
  const prepPct = Math.round((prepDone / prepForm.length) * 100);
  const coachById = (id: string) => coaches.find((c) => c.id === id)!;

  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "1:1 Coaching" },
      ]}
      title="👤 1:1 Coaching"
      subtitle="Personal coaching with our senior PMP® coaches — bring your stuck points, leave with a plan."
      right={
        <div className="co-tier">
          <span className="pill pill-gold">
            <i className="fa-solid fa-crown"></i> Gold benefit
          </span>
          <small>Included with your Gold tier</small>
        </div>
      }
    >
      {/* Credits hero */}
      <section className="co-credits">
        <div className="co-cred-left">
          <small>Your coaching credits</small>
          <div className="co-cred-num">
            <strong>{credits.remaining}</strong>
            <span>of {credits.total} left</span>
          </div>
          <div className="co-cred-bar">
            <div className="co-cred-fill" style={{ width: `${usedPct}%` }} />
          </div>
          <div className="co-cred-meta">
            <span>
              <i className="fa-solid fa-circle-info"></i> Each session is{" "}
              <strong>{credits.perSession}</strong>
            </span>
            <span>
              <i className="fa-regular fa-clock"></i> Expires{" "}
              <strong>{credits.expiresOn}</strong>
            </span>
          </div>
        </div>

        <div className="co-cred-right">
          <article className="co-cred-tile">
            <i className="fa-solid fa-circle-check"></i>
            <div>
              <strong>{credits.used}</strong>
              <small>Sessions completed</small>
            </div>
          </article>
          <article className="co-cred-tile">
            <i className="fa-solid fa-calendar-check"></i>
            <div>
              <strong>1</strong>
              <small>Upcoming · Tue 26</small>
            </div>
          </article>
          <article className="co-cred-tile">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <div>
              <strong>{pastSessions.length}</strong>
              <small>Past notes available</small>
            </div>
          </article>
        </div>
      </section>

      {/* Coach picker */}
      <section className="co-section">
        <header className="co-section-head">
          <div>
            <h3>Pick a coach</h3>
            <small>Filter slots by coach — or browse all availability below</small>
          </div>
          <div className="co-filter-row">
            <button className="co-chip active" type="button">All coaches</button>
            {coaches.map((c) => (
              <button key={c.id} className="co-chip" type="button">
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </header>

        <div className="co-coaches">
          {coaches.map((c) => (
            <article key={c.id} className="co-coach">
              <header>
                <CoachAvatar c={c} size={52} />
                <div className="co-coach-meta">
                  <strong>{c.name}</strong>
                  <small>{c.title}</small>
                  <div className="co-coach-rate">
                    <i className="fa-solid fa-star"></i>
                    <strong>{c.rating}</strong>
                    <span>({c.reviews} reviews)</span>
                  </div>
                </div>
              </header>
              <p>{c.bio}</p>
              <div className="co-coach-tags">
                {c.specialties.map((s) => (
                  <span key={s} className="co-tag">
                    {s}
                  </span>
                ))}
              </div>
              <footer>
                <div>
                  <small>Next available</small>
                  <strong>{c.nextAvailable}</strong>
                </div>
                <button type="button" className="co-coach-cta">
                  See slots <i className="fa-solid fa-arrow-right"></i>
                </button>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Weekly slot grid */}
      <section className="co-section">
        <header className="co-section-head">
          <div>
            <h3>Available slots — this week</h3>
            <small>
              Tap a slot to hold it · cancellation cutoff is{" "}
              <strong>12 hours</strong> · cancelling later forfeits the credit
            </small>
          </div>
          <div className="co-legend">
            <span className="co-leg-dot open"></span> Open
            <span className="co-leg-dot selected"></span> Selected
            <span className="co-leg-dot booked"></span> Your booking
            <span className="co-leg-dot blocked"></span> Held by another
          </div>
        </header>

        <div className="co-week">
          {week.map((day) => (
            <div key={day.iso} className="co-day">
              <header className={day.isToday ? "today" : day.isTomorrow ? "tomorrow" : ""}>
                <strong>{day.dateNum}</strong>
                <small>{day.weekday}</small>
                {day.isToday && <span>Today</span>}
                {day.isTomorrow && <span>Tomorrow</span>}
              </header>
              <div className="co-day-slots">
                {day.slots.length === 0 ? (
                  <p className="co-day-empty">No slots</p>
                ) : (
                  day.slots.map((s, idx) => {
                    const c = coachById(s.coachId);
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`co-slot ${s.state}`}
                        disabled={s.state === "blocked" || s.state === "booked"}
                      >
                        <strong>{s.time}</strong>
                        <span className="co-slot-coach">
                          <CoachAvatar c={c} size={20} />
                          <small>{c.name.split(" ")[0]}</small>
                        </span>
                        {s.state === "selected" && (
                          <span className="co-slot-tag">Selected</span>
                        )}
                        {s.state === "booked" && (
                          <span className="co-slot-tag booked">Yours</span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-col: pre-call questionnaire + confirm */}
      <section className="co-twocol">
        {/* Prep questionnaire */}
        <article className="co-prep">
          <header className="co-section-head">
            <div>
              <h3>Pre-call prep questionnaire</h3>
              <small>
                Your coach reads this before the call — {prepDone} of{" "}
                {prepForm.length} answered ({prepPct}%)
              </small>
            </div>
            <div className="co-prep-bar">
              <div
                className="co-prep-fill"
                style={{ width: `${prepPct}%` }}
              />
            </div>
          </header>

          <ol className="co-questions">
            {prepForm.map((q, idx) => (
              <li
                key={idx}
                className={q.status === "answered" ? "answered" : "pending"}
              >
                <header>
                  <span className="co-q-num">{idx + 1}</span>
                  <div>
                    <strong>{q.question}</strong>
                    <small>{q.hint}</small>
                  </div>
                  <span
                    className={`co-q-status ${q.status === "answered" ? "ok" : "todo"}`}
                  >
                    <i
                      className={`fa-solid ${q.status === "answered" ? "fa-check" : "fa-circle-exclamation"}`}
                    ></i>
                    {q.status === "answered" ? "Saved" : "Needs answer"}
                  </span>
                </header>
                {q.status === "answered" ? (
                  <p className="co-q-answer">{q.answer}</p>
                ) : (
                  <textarea
                    className="co-q-input"
                    placeholder="Type your answer here…"
                    defaultValue=""
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="co-prep-actions">
            <button type="button" className="co-secondary">
              Save draft
            </button>
            <button type="button" className="co-primary">
              Save &amp; continue <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </article>

        {/* Booking confirmation card */}
        <aside className="co-confirm">
          <header>
            <h4>Booking summary</h4>
            <small>Confirm and we'll hold your seat for 10 minutes.</small>
          </header>
          <div className="co-conf-row">
            <span>Coach</span>
            <strong>
              <CoachAvatar c={coaches[2]} size={24} />
              Kavya Nair
            </strong>
          </div>
          <div className="co-conf-row">
            <span>Date</span>
            <strong>Tue 26 May · Tomorrow</strong>
          </div>
          <div className="co-conf-row">
            <span>Time</span>
            <strong>19:30 – 20:30 IST</strong>
          </div>
          <div className="co-conf-row">
            <span>Duration</span>
            <strong>60 min</strong>
          </div>
          <div className="co-conf-row">
            <span>Credit cost</span>
            <strong>1 of {credits.remaining} remaining</strong>
          </div>
          <div className="co-conf-row warn">
            <span>Prep status</span>
            <strong>
              {prepDone}/{prepForm.length} complete · finish before call
            </strong>
          </div>
          <button type="button" className="co-book">
            <i className="fa-solid fa-calendar-check"></i> Confirm booking
          </button>
          <small className="co-conf-note">
            <i className="fa-solid fa-circle-info"></i> Cancellation cutoff:
            12h before call. Cancel later and the credit is forfeited.
          </small>
        </aside>
      </section>

      {/* Past sessions */}
      <section className="co-section">
        <header className="co-section-head">
          <div>
            <h3>Your past coaching sessions</h3>
            <small>
              Notes &amp; recordings stay available for 90 days from session date
            </small>
          </div>
        </header>
        <ul className="co-past">
          {pastSessions.map((p, idx) => {
            const c = coachById(p.coachId);
            return (
              <li key={idx}>
                <div className="co-past-left">
                  <CoachAvatar c={c} size={40} />
                  <div>
                    <strong>{p.topic}</strong>
                    <small>
                      {p.date} · with {c.name}
                    </small>
                  </div>
                </div>
                <div className="co-past-right">
                  <Link href={p.notesHref} className="co-past-link">
                    <i className="fa-solid fa-file-lines"></i> View notes
                  </Link>
                  <Link href={p.recordingHref} className="co-past-link">
                    <i className="fa-solid fa-circle-play"></i> Recording
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Footer FAQ */}
      <section className="co-faq">
        <article>
          <strong>What if my coach is unavailable?</strong>
          <p>
            We'll move you to the next available slot with the same or a senior
            coach — your credit doesn't burn.
          </p>
        </article>
        <article>
          <strong>Can I extend the session?</strong>
          <p>
            Yes — if your coach has back-to-back open, you can extend in 15-min
            blocks. One extra credit per 30 min.
          </p>
        </article>
        <article>
          <strong>Do I need to bring anything?</strong>
          <p>
            Just your prep answers. Your coach sees your latest mock scores,
            wrong-answers pool, and gap report.
          </p>
        </article>
      </section>
    </LmsFrame>
  );
}
