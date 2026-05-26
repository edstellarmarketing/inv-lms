import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type RsvpState = "open" | "joined" | "full" | "waitlist" | "recorded";

type SessionKind = "workshop" | "qa" | "deep-dive" | "masterclass" | "recorded";

type Session = {
  id: string;
  kind: SessionKind;
  topic: string;
  blurb: string;
  start: string;
  end: string;
  durationMin: number;
  instructorName: string;
  instructorTitle: string;
  instructorInitials: string;
  instructorTone: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
  capacity: number;
  enrolled: number;
  rsvp: RsvpState;
  isLive?: boolean;
  recordedOn?: string;
};

type Day = {
  iso: string;
  label: string;
  dateNum: string;
  weekday: string;
  isToday?: boolean;
  isTomorrow?: boolean;
  sessions: Session[];
};

const learnerTimezone = "Asia/Kolkata (IST · UTC+05:30)";

const kindLabel: Record<SessionKind, { label: string; icon: string; tone: string }> = {
  workshop: { label: "Workshop", icon: "fa-solid fa-screwdriver-wrench", tone: "blue" },
  qa: { label: "Q&A Drop-in", icon: "fa-solid fa-comments", tone: "purple" },
  "deep-dive": { label: "Deep Dive", icon: "fa-solid fa-microscope", tone: "orange" },
  masterclass: { label: "Masterclass", icon: "fa-solid fa-graduation-cap", tone: "pink" },
  recorded: { label: "Recording", icon: "fa-solid fa-circle-play", tone: "teal" },
};

const rsvpButton: Record<RsvpState, { label: string; tone: string; icon: string; disabled?: boolean }> = {
  open: { label: "RSVP", tone: "primary", icon: "fa-solid fa-calendar-check" },
  joined: { label: "You're in", tone: "success", icon: "fa-solid fa-circle-check" },
  full: { label: "Session full", tone: "muted", icon: "fa-solid fa-circle-xmark", disabled: true },
  waitlist: { label: "Join waitlist", tone: "warn", icon: "fa-solid fa-hourglass-half" },
  recorded: { label: "Watch recording", tone: "ghost", icon: "fa-solid fa-circle-play" },
};

const schedule: Day[] = [
  {
    iso: "2026-05-25",
    label: "Today",
    dateNum: "25",
    weekday: "Mon · May",
    isToday: true,
    sessions: [
      {
        id: "s-25-1",
        kind: "qa",
        topic: "Open Q&A — anything on the syllabus",
        blurb: "Drop in with your stuck points from any topic cluster. No agenda — instructor on duty.",
        start: "18:00",
        end: "19:00",
        durationMin: 60,
        instructorName: "Priya Iyer",
        instructorTitle: "PMP®, PMI-ACP · Lead Instructor",
        instructorInitials: "PI",
        instructorTone: "purple",
        capacity: 40,
        enrolled: 27,
        rsvp: "joined",
        isLive: true,
      },
      {
        id: "s-25-2",
        kind: "workshop",
        topic: "EVM in 60 minutes — formulas, CPI, SPI",
        blurb: "Whiteboard walkthrough of CV, SV, CPI, SPI with two worked exam-style scenarios.",
        start: "20:30",
        end: "21:30",
        durationMin: 60,
        instructorName: "Rohan Mehta",
        instructorTitle: "PMP®, PRINCE2® · 12y industry",
        instructorInitials: "RM",
        instructorTone: "blue",
        capacity: 60,
        enrolled: 41,
        rsvp: "open",
      },
    ],
  },
  {
    iso: "2026-05-26",
    label: "Tomorrow",
    dateNum: "26",
    weekday: "Tue · May",
    isTomorrow: true,
    sessions: [
      {
        id: "s-26-1",
        kind: "deep-dive",
        topic: "Risk Management — qualitative vs quantitative",
        blurb: "Probability/impact matrix, EMV, decision trees. With 10 practice questions reviewed live.",
        start: "17:30",
        end: "19:00",
        durationMin: 90,
        instructorName: "Anita Desai",
        instructorTitle: "PMP®, RMP® · Risk specialist",
        instructorInitials: "AD",
        instructorTone: "orange",
        capacity: 50,
        enrolled: 50,
        rsvp: "full",
      },
      {
        id: "s-26-2",
        kind: "masterclass",
        topic: "Stakeholder engagement masterclass",
        blurb: "Power/interest grid, salience model, engagement assessment matrix — when to use each.",
        start: "21:00",
        end: "22:30",
        durationMin: 90,
        instructorName: "Kavya Nair",
        instructorTitle: "PgMP®, PfMP® · Programme Director",
        instructorInitials: "KN",
        instructorTone: "pink",
        capacity: 30,
        enrolled: 22,
        rsvp: "open",
      },
    ],
  },
  {
    iso: "2026-05-27",
    label: "Wed",
    dateNum: "27",
    weekday: "Wed · May",
    sessions: [
      {
        id: "s-27-1",
        kind: "workshop",
        topic: "Procurement & contract types — FFP, T&M, CR",
        blurb: "Hands-on session contrasting contract types with seller-vs-buyer risk profiles.",
        start: "19:00",
        end: "20:00",
        durationMin: 60,
        instructorName: "Rohan Mehta",
        instructorTitle: "PMP®, PRINCE2® · 12y industry",
        instructorInitials: "RM",
        instructorTone: "blue",
        capacity: 50,
        enrolled: 33,
        rsvp: "open",
      },
    ],
  },
  {
    iso: "2026-05-28",
    label: "Thu",
    dateNum: "28",
    weekday: "Thu · May",
    sessions: [
      {
        id: "s-28-1",
        kind: "qa",
        topic: "Q&A Drop-in — Process domain only",
        blurb: "Topic-focused Q&A. Bring your wrong-answers from Process drills.",
        start: "18:30",
        end: "19:30",
        durationMin: 60,
        instructorName: "Priya Iyer",
        instructorTitle: "PMP®, PMI-ACP · Lead Instructor",
        instructorInitials: "PI",
        instructorTone: "purple",
        capacity: 40,
        enrolled: 38,
        rsvp: "waitlist",
      },
    ],
  },
  {
    iso: "2026-05-29",
    label: "Fri",
    dateNum: "29",
    weekday: "Fri · May",
    sessions: [
      {
        id: "s-29-1",
        kind: "masterclass",
        topic: "Mock-exam tactics — pacing & elimination",
        blurb: "How to budget time across 180Q in 230min, when to flag-and-move, and 4-step elimination drill.",
        start: "20:00",
        end: "21:30",
        durationMin: 90,
        instructorName: "Kavya Nair",
        instructorTitle: "PgMP®, PfMP® · Programme Director",
        instructorInitials: "KN",
        instructorTone: "pink",
        capacity: 35,
        enrolled: 14,
        rsvp: "open",
      },
    ],
  },
  {
    iso: "2026-05-23",
    label: "Sat (Recording)",
    dateNum: "23",
    weekday: "Sat · May",
    sessions: [
      {
        id: "s-23-1",
        kind: "recorded",
        topic: "Agile fundamentals — Scrum events recap",
        blurb: "Recorded session covering ceremonies, artifacts, roles. 90 min · captions available.",
        start: "—",
        end: "—",
        durationMin: 90,
        instructorName: "Anita Desai",
        instructorTitle: "PMP®, RMP® · Risk specialist",
        instructorInitials: "AD",
        instructorTone: "orange",
        capacity: 0,
        enrolled: 0,
        rsvp: "recorded",
        recordedOn: "23 May · 4:30 PM IST",
      },
    ],
  },
];

const summary = {
  weekSessions: 7,
  joined: 1,
  waitlist: 1,
  recordings: 1,
};

function CapacityBar({ enrolled, capacity }: { enrolled: number; capacity: number }) {
  if (capacity === 0) return null;
  const pct = Math.min(100, Math.round((enrolled / capacity) * 100));
  const tone = pct >= 95 ? "lt-bar-hot" : pct >= 75 ? "lt-bar-warn" : "lt-bar-ok";
  return (
    <div className="lt-cap">
      <div className="lt-cap-bar">
        <div className={`lt-cap-fill ${tone}`} style={{ width: `${pct}%` }} />
      </div>
      <small className="lt-cap-text">
        <strong>{enrolled}</strong> / {capacity} seats · {capacity - enrolled} left
      </small>
    </div>
  );
}

function InstructorChip({ s }: { s: Session }) {
  return (
    <div className="lt-instr">
      <span className={`lt-instr-avatar ${s.instructorTone}`}>{s.instructorInitials}</span>
      <span className="lt-instr-meta">
        <strong>{s.instructorName}</strong>
        <small>{s.instructorTitle}</small>
      </span>
    </div>
  );
}

function SessionCard({ s }: { s: Session }) {
  const k = kindLabel[s.kind];
  const r = rsvpButton[s.rsvp];
  const isRecording = s.rsvp === "recorded";

  return (
    <article className={`lt-card ${s.isLive ? "is-live" : ""} ${isRecording ? "is-recording" : ""}`}>
      <div className="lt-time">
        {isRecording ? (
          <>
            <span className="lt-time-rec">
              <i className="fa-solid fa-circle-play"></i>
            </span>
            <strong>Recording</strong>
            <small>{s.recordedOn}</small>
          </>
        ) : (
          <>
            {s.isLive && <span className="lt-live-dot">LIVE NOW</span>}
            <strong>{s.start}</strong>
            <small>to {s.end}</small>
            <span className="lt-dur">
              <i className="fa-regular fa-clock"></i> {s.durationMin} min
            </span>
          </>
        )}
      </div>

      <div className="lt-body">
        <span className={`lt-kind ${k.tone}`}>
          <i className={k.icon}></i> {k.label}
        </span>
        <h4>{s.topic}</h4>
        <p>{s.blurb}</p>
        <InstructorChip s={s} />
      </div>

      <div className="lt-side">
        <CapacityBar enrolled={s.enrolled} capacity={s.capacity} />
        <Link
          href={`/lms/pmp/live-training/${s.id}`}
          className={`lt-rsvp ${r.tone}${r.disabled ? " disabled" : ""}`}
          aria-disabled={r.disabled ? "true" : undefined}
        >
          <i className={r.icon}></i> {r.label}
        </Link>
        <Link href={`/lms/pmp/live-training/${s.id}`} className="lt-details">
          Session details <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
}

export default function LiveTrainingPage() {
  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Live Training" },
      ]}
      title="📅 Live Training Schedule"
      subtitle="Instructor-led sessions — RSVP to reserve your seat. Recordings stay available for 30 days."
      right={
        <div className="lt-tz">
          <span className="lt-tz-label">
            <i className="fa-regular fa-clock"></i> Times shown in
          </span>
          <strong>{learnerTimezone}</strong>
          <button className="lt-tz-change" type="button">
            Change
          </button>
        </div>
      }
    >
      {/* Summary strip */}
      <section className="lt-summary">
        <article className="lt-sum-card blue">
          <small>This week</small>
          <strong>{summary.weekSessions}</strong>
          <span>sessions scheduled</span>
        </article>
        <article className="lt-sum-card green">
          <small>You're in</small>
          <strong>{summary.joined}</strong>
          <span>session joined</span>
        </article>
        <article className="lt-sum-card orange">
          <small>Waitlist</small>
          <strong>{summary.waitlist}</strong>
          <span>seat held</span>
        </article>
        <article className="lt-sum-card teal">
          <small>Available</small>
          <strong>{summary.recordings}</strong>
          <span>recording this week</span>
        </article>
      </section>

      {/* Filter chips */}
      <section className="lt-filters">
        <div className="lt-filter-row">
          <button className="lt-chip active" type="button">
            <i className="fa-solid fa-calendar-week"></i> This week
          </button>
          <button className="lt-chip" type="button">
            Next week
          </button>
          <button className="lt-chip" type="button">
            All upcoming
          </button>
          <button className="lt-chip" type="button">
            Recordings
          </button>
        </div>
        <div className="lt-filter-row">
          <button className="lt-pill" type="button">
            <i className="fa-solid fa-screwdriver-wrench"></i> Workshops
          </button>
          <button className="lt-pill" type="button">
            <i className="fa-solid fa-comments"></i> Q&amp;A
          </button>
          <button className="lt-pill" type="button">
            <i className="fa-solid fa-microscope"></i> Deep dives
          </button>
          <button className="lt-pill" type="button">
            <i className="fa-solid fa-graduation-cap"></i> Masterclasses
          </button>
        </div>
      </section>

      {/* Day-grouped sessions */}
      <section className="lt-schedule">
        {schedule.map((day) => (
          <div key={day.iso} className={`lt-day ${day.isToday ? "is-today" : ""}`}>
            <header className="lt-day-head">
              <div className={`lt-day-pill ${day.isToday ? "today" : day.isTomorrow ? "tomorrow" : ""}`}>
                <strong>{day.dateNum}</strong>
                <small>{day.weekday}</small>
              </div>
              <div className="lt-day-meta">
                <h3>{day.label}</h3>
                <span>
                  {day.sessions.length} session{day.sessions.length !== 1 ? "s" : ""}
                </span>
              </div>
            </header>
            <div className="lt-day-list">
              {day.sessions.map((s) => (
                <SessionCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom legend */}
      <section className="lt-legend">
        <div>
          <i className="fa-solid fa-circle-info"></i>
          <span>
            Sessions are limited to your tier — Gold sees Masterclasses; Silver/Bronze see Workshops and Q&amp;A.
            Cancellation cutoff is <strong>24 hours</strong> before the session.
          </span>
        </div>
        <Link href="/lms/pmp/support" className="lt-help">
          Need help? Contact support <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>
    </LmsFrame>
  );
}
