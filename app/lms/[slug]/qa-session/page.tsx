import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type RsvpState = "open" | "joined" | "full" | "waitlist" | "live";
type SlotFocus = "open" | "process" | "people" | "agile" | "mock-review" | "evm";

type Instructor = {
  name: string;
  initials: string;
  tone: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
  title: string;
};

const instructors: Record<string, Instructor> = {
  priya: { name: "Priya Iyer", initials: "PI", tone: "purple", title: "Lead Instructor" },
  rohan: { name: "Rohan Mehta", initials: "RM", tone: "blue", title: "Workshop Lead" },
  anita: { name: "Anita Desai", initials: "AD", tone: "orange", title: "Risk Specialist" },
  kavya: { name: "Kavya Nair", initials: "KN", tone: "pink", title: "Programme Director" },
  sahil: { name: "Sahil Verma", initials: "SV", tone: "green", title: "Agile Coach" },
};

const focusMeta: Record<SlotFocus, { label: string; tone: string; icon: string }> = {
  open: { label: "Open Q&A", tone: "blue", icon: "fa-solid fa-comments" },
  process: { label: "Process domain", tone: "orange", icon: "fa-solid fa-diagram-project" },
  people: { label: "People domain", tone: "pink", icon: "fa-solid fa-users" },
  agile: { label: "Agile / Hybrid", tone: "green", icon: "fa-solid fa-arrows-rotate" },
  "mock-review": { label: "Mock review", tone: "teal", icon: "fa-solid fa-clipboard-check" },
  evm: { label: "EVM clinic", tone: "purple", icon: "fa-solid fa-square-root-variable" },
};

type RecurringTemplate = {
  id: SlotFocus;
  weekdays: string;
  time: string;
  duration: string;
  instructorKey: keyof typeof instructors;
  description: string;
};

const recurring: RecurringTemplate[] = [
  {
    id: "open",
    weekdays: "Mon · Wed · Fri",
    time: "18:00 IST",
    duration: "60 min",
    instructorKey: "priya",
    description: "Any topic across People, Process, Business Environment. No agenda — bring questions.",
  },
  {
    id: "process",
    weekdays: "Tue",
    time: "18:30 IST",
    duration: "60 min",
    instructorKey: "rohan",
    description: "Process domain only — schedule, cost, EVM, procurement, quality.",
  },
  {
    id: "people",
    weekdays: "Thu",
    time: "19:00 IST",
    duration: "60 min",
    instructorKey: "kavya",
    description: "People domain — conflict, leadership, virtual teams, stakeholder engagement.",
  },
  {
    id: "agile",
    weekdays: "Sat",
    time: "11:00 IST",
    duration: "90 min",
    instructorKey: "sahil",
    description: "Agile, Hybrid, Lean — frameworks, tailoring, hybrid life-cycles.",
  },
  {
    id: "mock-review",
    weekdays: "Sun",
    time: "17:00 IST",
    duration: "90 min",
    instructorKey: "anita",
    description: "Walkthrough of last week's mock paper — bring your wrong answers.",
  },
];

type UpcomingSlot = {
  id: string;
  iso: string;
  dayLabel: string;
  dateNum: string;
  weekday: string;
  isToday?: boolean;
  isTomorrow?: boolean;
  focus: SlotFocus;
  start: string;
  end: string;
  durationMin: number;
  instructorKey: keyof typeof instructors;
  capacity: number;
  enrolled: number;
  rsvp: RsvpState;
  isLive?: boolean;
};

const upcoming: UpcomingSlot[] = [
  {
    id: "qa-25-1",
    iso: "2026-05-25",
    dayLabel: "Today",
    dateNum: "25",
    weekday: "Mon",
    isToday: true,
    focus: "open",
    start: "18:00",
    end: "19:00",
    durationMin: 60,
    instructorKey: "priya",
    capacity: 40,
    enrolled: 27,
    rsvp: "joined",
    isLive: true,
  },
  {
    id: "qa-26-1",
    iso: "2026-05-26",
    dayLabel: "Tomorrow",
    dateNum: "26",
    weekday: "Tue",
    isTomorrow: true,
    focus: "process",
    start: "18:30",
    end: "19:30",
    durationMin: 60,
    instructorKey: "rohan",
    capacity: 30,
    enrolled: 22,
    rsvp: "open",
  },
  {
    id: "qa-27-1",
    iso: "2026-05-27",
    dayLabel: "Wed",
    dateNum: "27",
    weekday: "Wed",
    focus: "open",
    start: "18:00",
    end: "19:00",
    durationMin: 60,
    instructorKey: "priya",
    capacity: 40,
    enrolled: 18,
    rsvp: "open",
  },
  {
    id: "qa-28-1",
    iso: "2026-05-28",
    dayLabel: "Thu",
    dateNum: "28",
    weekday: "Thu",
    focus: "people",
    start: "19:00",
    end: "20:00",
    durationMin: 60,
    instructorKey: "kavya",
    capacity: 30,
    enrolled: 30,
    rsvp: "full",
  },
  {
    id: "qa-29-1",
    iso: "2026-05-29",
    dayLabel: "Fri",
    dateNum: "29",
    weekday: "Fri",
    focus: "open",
    start: "18:00",
    end: "19:00",
    durationMin: 60,
    instructorKey: "priya",
    capacity: 40,
    enrolled: 9,
    rsvp: "open",
  },
  {
    id: "qa-30-1",
    iso: "2026-05-30",
    dayLabel: "Sat",
    dateNum: "30",
    weekday: "Sat",
    focus: "agile",
    start: "11:00",
    end: "12:30",
    durationMin: 90,
    instructorKey: "sahil",
    capacity: 40,
    enrolled: 26,
    rsvp: "waitlist",
  },
  {
    id: "qa-31-1",
    iso: "2026-05-31",
    dayLabel: "Sun",
    dateNum: "31",
    weekday: "Sun",
    focus: "mock-review",
    start: "17:00",
    end: "18:30",
    durationMin: 90,
    instructorKey: "anita",
    capacity: 35,
    enrolled: 19,
    rsvp: "open",
  },
];

type PastSlot = {
  date: string;
  focus: SlotFocus;
  instructorKey: keyof typeof instructors;
  recordingHref: string;
  duration: string;
  questions: number;
};

const pastSlots: PastSlot[] = [
  { date: "Sun 24 May", focus: "mock-review", instructorKey: "anita", recordingHref: "#", duration: "1h 32m", questions: 18 },
  { date: "Sat 23 May", focus: "agile", instructorKey: "sahil", recordingHref: "#", duration: "1h 27m", questions: 24 },
  { date: "Thu 21 May", focus: "people", instructorKey: "kavya", recordingHref: "#", duration: "58m", questions: 14 },
  { date: "Wed 20 May", focus: "open", instructorKey: "priya", recordingHref: "#", duration: "1h 04m", questions: 31 },
];

const rsvpButton: Record<RsvpState, { label: string; tone: string; icon: string; disabled?: boolean }> = {
  open: { label: "Reserve seat", tone: "primary", icon: "fa-solid fa-calendar-check" },
  joined: { label: "You're in", tone: "success", icon: "fa-solid fa-circle-check" },
  full: { label: "Session full", tone: "muted", icon: "fa-solid fa-circle-xmark", disabled: true },
  waitlist: { label: "Join waitlist", tone: "warn", icon: "fa-solid fa-hourglass-half" },
  live: { label: "Join now", tone: "live", icon: "fa-solid fa-video" },
};

const stats = {
  weekSlots: 7,
  joined: 1,
  waitlist: 1,
  recordings: 12,
};

function Avatar({ k, size = 30 }: { k: keyof typeof instructors; size?: number }) {
  const i = instructors[k];
  return (
    <span
      className={`qa-avatar ${i.tone}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.36) }}
      title={i.name}
    >
      {i.initials}
    </span>
  );
}

function FocusChip({ focus }: { focus: SlotFocus }) {
  const f = focusMeta[focus];
  return (
    <span className={`qa-focus ${f.tone}`}>
      <i className={f.icon}></i> {f.label}
    </span>
  );
}

export default function QaSessionPage() {
  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Q&A Sessions" },
      ]}
      title="💬 Q&A Sessions"
      subtitle="Drop-in slots with the instructor on duty — no agenda, just your stuck points. Recurring every week."
      right={
        <div className="qa-tz">
          <i className="fa-regular fa-clock"></i> Times in
          <strong>IST · UTC+05:30</strong>
        </div>
      }
    >
      {/* Stats strip */}
      <section className="qa-stats">
        <article className="qa-stat blue">
          <small>This week</small>
          <strong>{stats.weekSlots}</strong>
          <span>Q&amp;A slots open</span>
        </article>
        <article className="qa-stat green">
          <small>You're in</small>
          <strong>{stats.joined}</strong>
          <span>slot reserved this week</span>
        </article>
        <article className="qa-stat orange">
          <small>Waitlist</small>
          <strong>{stats.waitlist}</strong>
          <span>seat being held</span>
        </article>
        <article className="qa-stat teal">
          <small>Library</small>
          <strong>{stats.recordings}</strong>
          <span>past Q&amp;A recordings</span>
        </article>
      </section>

      {/* Recurring schedule overview */}
      <section className="qa-section">
        <header className="qa-section-head">
          <div>
            <h3>Recurring weekly schedule</h3>
            <small>What's on every week — your next live slot is highlighted</small>
          </div>
          <div className="qa-legend">
            <span className="qa-legend-dot live"></span> Live now
            <span className="qa-legend-dot joined"></span> You're in
            <span className="qa-legend-dot open"></span> Open
          </div>
        </header>

        <div className="qa-recurring">
          {recurring.map((r) => {
            const f = focusMeta[r.id];
            const i = instructors[r.instructorKey];
            return (
              <article key={r.id} className="qa-rec-card">
                <header>
                  <span className={`qa-focus ${f.tone}`}>
                    <i className={f.icon}></i> {f.label}
                  </span>
                  <span className="qa-rec-days">{r.weekdays}</span>
                </header>
                <div className="qa-rec-time">
                  <strong>{r.time}</strong>
                  <small>{r.duration}</small>
                </div>
                <p>{r.description}</p>
                <footer>
                  <div className="qa-rec-host">
                    <Avatar k={r.instructorKey} size={28} />
                    <div>
                      <strong>{i.name}</strong>
                      <small>{i.title}</small>
                    </div>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      {/* Upcoming slots list */}
      <section className="qa-section">
        <header className="qa-section-head">
          <div>
            <h3>Upcoming slots this week</h3>
            <small>Reserve your seat — capacity is limited per slot</small>
          </div>
          <div className="qa-filters">
            <button className="qa-chip active" type="button">This week</button>
            <button className="qa-chip" type="button">Next week</button>
            <button className="qa-chip" type="button">All upcoming</button>
          </div>
        </header>

        <div className="qa-list">
          {upcoming.map((s) => {
            const i = instructors[s.instructorKey];
            const rState = s.isLive ? "live" : s.rsvp;
            const r = rsvpButton[rState];
            const seatsLeft = s.capacity - s.enrolled;
            const pct = Math.round((s.enrolled / s.capacity) * 100);
            return (
              <article key={s.id} className={`qa-row ${s.isLive ? "is-live" : ""} ${s.isToday ? "is-today" : ""}`}>
                <div className={`qa-row-day ${s.isToday ? "today" : s.isTomorrow ? "tomorrow" : ""}`}>
                  <strong>{s.dateNum}</strong>
                  <small>{s.weekday}</small>
                  {(s.isToday || s.isTomorrow) && (
                    <span className="qa-row-tag">{s.dayLabel}</span>
                  )}
                </div>

                <div className="qa-row-time">
                  {s.isLive && <span className="qa-live-dot">LIVE</span>}
                  <strong>{s.start}</strong>
                  <small>to {s.end}</small>
                  <span className="qa-dur">
                    <i className="fa-regular fa-clock"></i> {s.durationMin} min
                  </span>
                </div>

                <div className="qa-row-body">
                  <FocusChip focus={s.focus} />
                  <div className="qa-row-host">
                    <Avatar k={s.instructorKey} size={36} />
                    <div>
                      <strong>{i.name}</strong>
                      <small>
                        {i.title} ·{" "}
                        <Link href="#" className="qa-inline">
                          view profile
                        </Link>
                      </small>
                    </div>
                  </div>
                </div>

                <div className="qa-row-side">
                  <div className="qa-row-cap">
                    <div className="qa-cap-bar">
                      <div
                        className={`qa-cap-fill ${pct >= 95 ? "hot" : pct >= 75 ? "warn" : "ok"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <small>
                      <strong>{s.enrolled}</strong>/{s.capacity} · {seatsLeft} left
                    </small>
                  </div>
                  <Link
                    href={`/lms/pmp/live-training/${s.id}`}
                    className={`qa-rsvp ${r.tone}${r.disabled ? " disabled" : ""}`}
                    aria-disabled={r.disabled ? "true" : undefined}
                  >
                    <i className={r.icon}></i> {r.label}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Two-column: How it works + Past recordings */}
      <section className="qa-twocol">
        <article className="qa-howto">
          <header className="qa-section-head">
            <h3>How Q&amp;A drop-ins work</h3>
            <small>Three things to know before you join</small>
          </header>
          <ol className="qa-steps">
            <li>
              <span>1</span>
              <div>
                <strong>Reserve a seat</strong>
                <p>RSVP at least 30 minutes ahead. Cancellation cutoff is 1 hour before the slot.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Drop your question</strong>
                <p>Add it in chat when you arrive — instructor prioritises by upvotes &amp; recency.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Get the recording</strong>
                <p>Within 24h of the slot ending. Tagged by topic for quick lookup later.</p>
              </div>
            </li>
          </ol>
          <div className="qa-tip">
            <i className="fa-solid fa-lightbulb"></i>
            <span>
              Tip: For Process or EVM-specific stuck points, pick the topic-focused slots
              over Open Q&amp;A — you'll get deeper coverage.
            </span>
          </div>
        </article>

        <article className="qa-past">
          <header className="qa-section-head">
            <h3>Past Q&amp;A recordings</h3>
            <small>
              {pastSlots.length} from this week ·{" "}
              <Link href="#" className="qa-inline">
                browse full library ({stats.recordings})
              </Link>
            </small>
          </header>
          <ul className="qa-past-list">
            {pastSlots.map((p, idx) => {
              const f = focusMeta[p.focus];
              const i = instructors[p.instructorKey];
              return (
                <li key={idx}>
                  <Link href={p.recordingHref} className="qa-past-row">
                    <span className="qa-past-play">
                      <i className="fa-solid fa-play"></i>
                    </span>
                    <div className="qa-past-meta">
                      <span className={`qa-focus ${f.tone}`}>
                        <i className={f.icon}></i> {f.label}
                      </span>
                      <strong>{p.date}</strong>
                      <small>
                        with {i.name} · {p.duration} · {p.questions} questions answered
                      </small>
                    </div>
                    <span className="qa-past-go">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </section>

      {/* Footer CTA */}
      <section className="qa-footer">
        <div>
          <strong>Can't find a slot that works for your timezone?</strong>
          <small>Request a new recurring slot — we open new ones when demand is high in a region.</small>
        </div>
        <div className="qa-footer-actions">
          <button className="qa-secondary" type="button">
            <i className="fa-regular fa-bell"></i> Notify me of new slots
          </button>
          <Link href="/lms/pmp/support" className="qa-secondary primary">
            Request a new slot <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </LmsFrame>
  );
}
