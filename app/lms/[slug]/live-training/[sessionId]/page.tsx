import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Objective = { text: string; tag?: string };
type AgendaItem = { time: string; duration: string; title: string; detail?: string };
type PreReadItem = {
  type: "reference" | "study-guide" | "qbank" | "video";
  title: string;
  meta: string;
  href: string;
  required?: boolean;
};
type AttendeePeer = { name: string; initials: string; tone: "blue" | "purple" | "green" | "orange" | "pink" | "teal" };

const session = {
  id: "s-25-1",
  kind: { label: "Q&A Drop-in", icon: "fa-solid fa-comments", tone: "purple" },
  topic: "Open Q&A — anything on the syllabus",
  blurb:
    "Drop in with your stuck points from any topic cluster. No agenda — the instructor on duty will work through your questions in priority order.",
  dateLabel: "Today · Mon 25 May 2026",
  start: "18:00",
  end: "19:00",
  durationMin: 60,
  timezone: "Asia/Kolkata · IST · UTC+05:30",
  joinUrl: "https://meet.invensislearning.com/pmp/qa-25may",
  capacity: 40,
  enrolled: 27,
  rsvp: "joined" as const,
  isLive: true,
  liveStartsIn: "27 min",
  recordingPolicy: "Will be recorded · available within 24h · captions in EN/HI",
};

const instructor = {
  name: "Priya Iyer",
  title: "PMP®, PMI-ACP",
  role: "Lead Instructor",
  initials: "PI",
  tone: "purple" as const,
  yearsTeaching: 9,
  yearsIndustry: 14,
  rating: 4.8,
  reviews: 1284,
  passRate: 92,
  badges: ["PMI Authorised Trainer", "Top Mentor 2025"],
  bio:
    "Priya runs the daily PMP® Q&A and weekly EVM workshops. Ex-PMO lead at a Fortune 500 IT services company, she specialises in helping engineering managers translate field experience into PMI exam language.",
  expertise: ["Process domain", "EVM", "Risk mgmt", "Agile/hybrid"],
};

const objectives: Objective[] = [
  { text: "Get unblocked on any concept you're stuck on across People, Process and Business Environment domains.", tag: "Goal" },
  { text: "See how your wrong-answers connect to real exam phrasing patterns.", tag: "Pattern" },
  { text: "Pick up 2-3 targeted study moves for the next 48 hours.", tag: "Action" },
];

const agenda: AgendaItem[] = [
  { time: "18:00", duration: "5 min", title: "Roll-call & question intake", detail: "Drop your top 1 question in chat — instructor prioritises." },
  { time: "18:05", duration: "40 min", title: "Live Q&A walkthrough", detail: "Whiteboard answers with cross-links to reference cards & study guides." },
  { time: "18:45", duration: "10 min", title: "Wrong-answers clinic", detail: "Bring a question you got wrong recently — we'll dissect the trap together." },
  { time: "18:55", duration: "5 min", title: "Recommended next moves", detail: "2-3 personalised study actions for the next 48 hours." },
];

const preReading: PreReadItem[] = [
  {
    type: "reference",
    title: "Project Integration Management",
    meta: "Reference card · 12 sections · 35 min",
    href: "/lms/pmp/reference/integration-management",
    required: true,
  },
  {
    type: "study-guide",
    title: "PMBOK Guide 7th Ed. — Performance Domains",
    meta: "Study guide · Chapter 3 · 22 min",
    href: "/lms/pmp/study-guide/pmbok-7",
  },
  {
    type: "qbank",
    title: "Process Domain — Mixed (last 5 wrong)",
    meta: "Question Bank · personalised drill · 10–15 min",
    href: "/lms/pmp/question-bank",
  },
  {
    type: "video",
    title: "Tailoring decisions in hybrid teams (12 min)",
    meta: "Recorded session · 23 May",
    href: "#",
  },
];

const peers: AttendeePeer[] = [
  { name: "Arjun K.", initials: "AK", tone: "blue" },
  { name: "Meera S.", initials: "MS", tone: "pink" },
  { name: "Vikram B.", initials: "VB", tone: "orange" },
  { name: "Aisha R.", initials: "AR", tone: "green" },
  { name: "Saurabh P.", initials: "SP", tone: "teal" },
];

type RelatedSession = {
  id: string;
  topic: string;
  when: string;
  kindLabel: string;
  kindTone: string;
  durationMin: number;
};

const relatedSessions: RelatedSession[] = [
  { id: "s-25-2", topic: "EVM in 60 minutes — formulas, CPI, SPI", when: "Today · 20:30 IST", kindLabel: "Workshop", kindTone: "blue", durationMin: 60 },
  { id: "s-26-1", topic: "Risk Management — qualitative vs quantitative", when: "Tomorrow · 17:30 IST", kindLabel: "Deep dive", kindTone: "orange", durationMin: 90 },
  { id: "s-29-1", topic: "Mock-exam tactics — pacing & elimination", when: "Fri · 20:00 IST", kindLabel: "Masterclass", kindTone: "pink", durationMin: 90 },
];

const preReadIcon: Record<PreReadItem["type"], { icon: string; tone: string; label: string }> = {
  reference: { icon: "fa-solid fa-bookmark", tone: "blue", label: "Reference" },
  "study-guide": { icon: "fa-solid fa-book-open-reader", tone: "purple", label: "Study Guide" },
  qbank: { icon: "fa-solid fa-circle-question", tone: "orange", label: "Q-Bank Drill" },
  video: { icon: "fa-solid fa-circle-play", tone: "teal", label: "Recording" },
};

export default function LiveSessionDetailPage() {
  const seatsLeft = session.capacity - session.enrolled;
  const capacityPct = Math.round((session.enrolled / session.capacity) * 100);

  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Live Training", href: "/lms/pmp/live-training" },
        { label: "Session details" },
      ]}
      title={session.topic}
      subtitle={session.blurb}
      right={
        session.isLive ? (
          <div className="ls-live-strip">
            <span className="ls-live-dot">LIVE</span>
            <strong>Starts in {session.liveStartsIn}</strong>
          </div>
        ) : undefined
      }
    >
      {/* Top hero — when/where/who/RSVP */}
      <section className="ls-hero">
        <div className="ls-hero-meta">
          <span className={`ls-chip ${session.kind.tone}`}>
            <i className={session.kind.icon}></i> {session.kind.label}
          </span>
          <div className="ls-when">
            <div>
              <small>Date</small>
              <strong>{session.dateLabel}</strong>
            </div>
            <div>
              <small>Time</small>
              <strong>
                {session.start} – {session.end}{" "}
                <span className="ls-tz">({session.timezone})</span>
              </strong>
            </div>
            <div>
              <small>Duration</small>
              <strong>{session.durationMin} minutes</strong>
            </div>
            <div>
              <small>Recording</small>
              <strong>{session.recordingPolicy}</strong>
            </div>
          </div>
        </div>

        <aside className="ls-cta-card">
          <header>
            <span className="ls-rsvp-state">
              <i className="fa-solid fa-circle-check"></i> You're in
            </span>
            <small>Confirmed · added to calendar</small>
          </header>
          <a href={session.joinUrl} className="ls-join" target="_blank" rel="noreferrer">
            <i className="fa-solid fa-video"></i> Join session
          </a>
          <div className="ls-cta-row">
            <button type="button" className="ls-secondary">
              <i className="fa-regular fa-calendar"></i> Add to calendar
            </button>
            <button type="button" className="ls-secondary danger">
              <i className="fa-solid fa-xmark"></i> Cancel RSVP
            </button>
          </div>
          <div className="ls-cap">
            <div className="ls-cap-bar">
              <div
                className={`ls-cap-fill ${capacityPct >= 95 ? "hot" : capacityPct >= 75 ? "warn" : "ok"}`}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
            <small>
              <strong>{session.enrolled}</strong> of {session.capacity} seats · {seatsLeft} left
            </small>
          </div>
          <small className="ls-cancel-note">
            <i className="fa-solid fa-circle-info"></i> Cancellation cutoff:
            24 hours before session start.
          </small>
        </aside>
      </section>

      {/* What you'll get out of this */}
      <section className="ls-section">
        <header className="ls-section-head">
          <h3>What you'll get out of this session</h3>
          <small>Three concrete outcomes to walk away with</small>
        </header>
        <ul className="ls-objectives">
          {objectives.map((o, i) => (
            <li key={i}>
              <span className="ls-obj-num">{i + 1}</span>
              <div>
                {o.tag && <span className="ls-obj-tag">{o.tag}</span>}
                <p>{o.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Agenda */}
      <section className="ls-section">
        <header className="ls-section-head">
          <h3>Agenda · 60 minutes</h3>
          <small>Flow we'll follow — adjusted live based on incoming questions</small>
        </header>
        <ol className="ls-agenda">
          {agenda.map((a, i) => (
            <li key={i}>
              <span className="ls-ag-time">
                <strong>{a.time}</strong>
                <small>{a.duration}</small>
              </span>
              <div className="ls-ag-body">
                <strong>{a.title}</strong>
                {a.detail && <p>{a.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Two-column: Instructor + Pre-reading */}
      <section className="ls-twocol">
        {/* Instructor */}
        <article className="ls-instr-card">
          <header className="ls-section-head">
            <h3>Your instructor</h3>
            <small>Open profile for full credentials &amp; ratings</small>
          </header>
          <div className="ls-instr-top">
            <span className={`ls-instr-avatar ${instructor.tone}`}>{instructor.initials}</span>
            <div className="ls-instr-meta">
              <strong>{instructor.name}</strong>
              <span>
                {instructor.title} · {instructor.role}
              </span>
              <div className="ls-instr-rating">
                <i className="fa-solid fa-star"></i>
                <strong>{instructor.rating}</strong>
                <small>({instructor.reviews.toLocaleString()} reviews)</small>
              </div>
            </div>
          </div>
          <p className="ls-instr-bio">{instructor.bio}</p>
          <div className="ls-instr-stats">
            <div>
              <strong>{instructor.yearsTeaching}+</strong>
              <small>yrs teaching</small>
            </div>
            <div>
              <strong>{instructor.yearsIndustry}+</strong>
              <small>yrs industry</small>
            </div>
            <div>
              <strong>{instructor.passRate}%</strong>
              <small>learner pass rate</small>
            </div>
          </div>
          <div className="ls-instr-tags">
            {instructor.expertise.map((e) => (
              <span key={e} className="ls-instr-tag">
                {e}
              </span>
            ))}
          </div>
          <div className="ls-instr-badges">
            {instructor.badges.map((b) => (
              <span key={b} className="ls-instr-badge">
                <i className="fa-solid fa-award"></i> {b}
              </span>
            ))}
          </div>
          <button type="button" className="ls-instr-link">
            View full instructor profile <i className="fa-solid fa-arrow-right"></i>
          </button>
        </article>

        {/* Pre-reading */}
        <article className="ls-pre-card">
          <header className="ls-section-head">
            <h3>Pre-reading &amp; warm-up</h3>
            <small>
              Recommended before joining · <strong>~50 min total</strong>
            </small>
          </header>
          <ul className="ls-pre-list">
            {preReading.map((p) => {
              const meta = preReadIcon[p.type];
              return (
                <li key={p.href} className={p.required ? "is-required" : ""}>
                  <Link href={p.href} className="ls-pre-row">
                    <span className={`ls-pre-icon ${meta.tone}`}>
                      <i className={meta.icon}></i>
                    </span>
                    <div className="ls-pre-meta">
                      <div className="ls-pre-titlerow">
                        <strong>{p.title}</strong>
                        {p.required && <span className="ls-pre-req">Required</span>}
                      </div>
                      <small>{p.meta}</small>
                    </div>
                    <span className="ls-pre-go">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/lms/pmp" className="ls-pre-bulk">
            Mark all as read &amp; jump to next prep step{" "}
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>

      {/* Attendees */}
      <section className="ls-section">
        <header className="ls-section-head">
          <h3>Cohort joining this session</h3>
          <small>
            {session.enrolled} learners RSVP&apos;d ·{" "}
            <Link href="#" className="ls-inline">
              see full attendee list
            </Link>
          </small>
        </header>
        <div className="ls-peers">
          {peers.map((p) => (
            <span key={p.name} className={`ls-peer ${p.tone}`} title={p.name}>
              {p.initials}
            </span>
          ))}
          <span className="ls-peer more">+{session.enrolled - peers.length}</span>
        </div>
      </section>

      {/* Related sessions */}
      <section className="ls-section">
        <header className="ls-section-head">
          <h3>Other sessions you might want</h3>
          <small>Picked based on your weak topics &amp; tier</small>
        </header>
        <div className="ls-related">
          {relatedSessions.map((r) => (
            <Link key={r.id} href={`/lms/pmp/live-training/${r.id}`} className="ls-related-card">
              <span className={`ls-chip ${r.kindTone}`}>{r.kindLabel}</span>
              <strong>{r.topic}</strong>
              <small>
                <i className="fa-regular fa-clock"></i> {r.when} · {r.durationMin} min
              </small>
              <span className="ls-related-go">
                Open session <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* System check footer */}
      <section className="ls-footer">
        <div className="ls-footer-block">
          <strong>System check</strong>
          <small>
            Sessions run in your browser — no install required. Test camera, mic, and bandwidth before joining.
          </small>
        </div>
        <div className="ls-footer-actions">
          <button type="button" className="ls-secondary">
            <i className="fa-solid fa-microphone"></i> Test mic &amp; camera
          </button>
          <button type="button" className="ls-secondary">
            <i className="fa-solid fa-wifi"></i> Test bandwidth
          </button>
          <Link href="/lms/pmp/support" className="ls-secondary">
            <i className="fa-regular fa-life-ring"></i> Contact support
          </Link>
        </div>
      </section>
    </LmsFrame>
  );
}
