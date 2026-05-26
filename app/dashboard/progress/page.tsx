import Link from "next/link";
import Sidebar from "../../components/Sidebar";

type Tone = "blue" | "purple" | "green" | "orange" | "pink" | "teal";

const overallPct = 36;
const readinessPct = 62;

type PickCard = {
  title: string;
  value: string;
  caption: string;
  tone: Tone;
  icon: string;
  pct: number;
  accuracy: string;
  avg: string;
  cta: { label: string; href: string };
};

const pickup: PickCard[] = [
  {
    title: "PMP® Reference Cards",
    value: "1,248",
    caption: "Questions Practiced",
    tone: "green",
    icon: "fa-solid fa-bookmark",
    pct: 38,
    accuracy: "82%",
    avg: "78%",
    cta: { label: "Continue learning", href: "/lms/pmp/reference/integration-management" },
  },
  {
    title: "Question Bank",
    value: "1,248",
    caption: "Questions Practiced",
    tone: "purple",
    icon: "fa-solid fa-clipboard-question",
    pct: 28,
    accuracy: "72%",
    avg: "68%",
    cta: { label: "Continue practice", href: "/lms/pmp/question-bank" },
  },
  {
    title: "Mock Exams",
    value: "1 of 6",
    caption: "Completed",
    tone: "orange",
    icon: "fa-solid fa-file-pen",
    pct: 17,
    accuracy: "80%",
    avg: "75%",
    cta: { label: "Continue exam", href: "/lms/pmp/mock-exam/2" },
  },
  {
    title: "Assignments",
    value: "Pending",
    caption: "3 of 8 submitted",
    tone: "teal",
    icon: "fa-solid fa-file-lines",
    pct: 38,
    accuracy: "88%",
    avg: "84%",
    cta: { label: "in progress", href: "/lms/pmp" },
  },
];

type PlanRow = {
  title: string;
  meta: string;
  tone: Tone;
  icon: string;
  status: "in-progress" | "completed" | "scheduled";
  href: string;
};

const plan: PlanRow[] = [
  {
    title: "Reference Cards — Study",
    meta: "Studied 8 of 12 sections · ~20 min remaining",
    tone: "blue",
    icon: "fa-solid fa-bookmark",
    status: "in-progress",
    href: "/lms/pmp/reference/integration-management",
  },
  {
    title: "Practice Questions — People Domain",
    meta: "Last attempt 72% · resume the 25-question drill",
    tone: "purple",
    icon: "fa-solid fa-circle-question",
    status: "in-progress",
    href: "/lms/pmp/question-bank/session/people",
  },
  {
    title: "Mock Exam — Paper 1",
    meta: "Submitted on 18 May · scored 80% (PASS)",
    tone: "orange",
    icon: "fa-solid fa-file-pen",
    status: "completed",
    href: "/lms/pmp/mock-exam/1/result",
  },
];

type RecCard = {
  title: string;
  desc: string;
  tone: Tone;
  icon: string;
  cta: { label: string; href: string };
};

const recommendations: RecCard[] = [
  {
    title: "Focus on Process Domain",
    desc: "Your weakest area in the last mock. Target a 25-question drill.",
    tone: "blue",
    icon: "fa-solid fa-diagram-project",
    cta: { label: "Start drill", href: "/lms/pmp/question-bank/session/process" },
  },
  {
    title: "Take a 25 Question Practice",
    desc: "Spaced-retrieval set across People, Process, Business Environment.",
    tone: "purple",
    icon: "fa-solid fa-clipboard-question",
    cta: { label: "Start practice", href: "/lms/pmp/question-bank" },
  },
  {
    title: "Review Incorrect Questions",
    desc: "48 questions from your last mock exam are waiting to be reviewed.",
    tone: "green",
    icon: "fa-solid fa-rotate-right",
    cta: { label: "Open review", href: "/lms/pmp/mock-exam/1/result" },
  },
];

const milestones = [
  { date: "Thu 22 May", title: "Live Session — Risk & Communications", tone: "blue" as Tone },
  { date: "Sat 24 May", title: "Mock Paper 3 — recommended slot", tone: "orange" as Tone },
  { date: "Mon 26 May", title: "Mid-prep readiness check", tone: "purple" as Tone },
  { date: "Sun 1 Jun", title: "Project Quality Management quiz", tone: "green" as Tone },
];

const streak = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: true },
  { day: "F", done: true },
  { day: "S", done: true },
  { day: "S", done: true, today: true },
];

const statusMeta: Record<PlanRow["status"], { label: string; cls: string; icon: string }> = {
  "in-progress": { label: "In progress", cls: "warn", icon: "fa-solid fa-hourglass-half" },
  completed: { label: "Completed", cls: "ok", icon: "fa-solid fa-check-double" },
  scheduled: { label: "Scheduled", cls: "info", icon: "fa-regular fa-calendar" },
};

export default function DashboardProgressPage() {
  return (
    <div className="app">
      <Sidebar />

      <div className="page dashp">
        {/* Topbar — return state */}
        <header className="topbar">
          <div>
            <small className="dashp-back">Welcome back, Alex</small>
            <h1>Your PMP® Exam Dashboard</h1>
            <p>Keep going! You&apos;re making great progress.</p>
          </div>
          <div className="topbar-right">
            <div className="search">
              <input type="text" placeholder="Search for courses, topics, or resources" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <button className="icon-btn" aria-label="Notifications">
              <i className="fa-regular fa-bell"></i>
              <span className="bell-badge">3</span>
            </button>
            <Link href="/welcome" className="user-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://i.pravatar.cc/40?img=12" alt="Alex" />
              <div>
                <strong>Alex Johnson</strong>
                <small>PMP® Gold</small>
              </div>
              <i className="fa-solid fa-chevron-down"></i>
            </Link>
          </div>
        </header>

        {/* Overall progress hero — prominent KPI strip */}
        <section className="dashp-hero">
          <div className="dashp-hero-main">
            <div className="dashp-hero-left">
              <span className="dashp-hero-ic">
                <i className="fa-solid fa-trophy"></i>
              </span>
              <div className="dashp-hero-label">
                <small>Overall Progress</small>
                <strong>{overallPct}%</strong>
              </div>
            </div>
            <div className="dashp-hero-bar">
              <div className="dashp-progress">
                <span style={{ width: `${overallPct}%` }} />
              </div>
              <small>You&apos;ve completed {overallPct}% of your PMP® prep journey</small>
            </div>
          </div>

          <ul className="dashp-mini">
            <li className="blue">
              <span className="dashp-mini-ic"><i className="fa-solid fa-fire"></i></span>
              <div>
                <small>Study Streak</small>
                <strong>7 Days</strong>
              </div>
            </li>
            <li className="purple">
              <span className="dashp-mini-ic"><i className="fa-solid fa-check-double"></i></span>
              <div>
                <small>Sessions Done</small>
                <strong>23</strong>
              </div>
            </li>
            <li className="orange">
              <span className="dashp-mini-ic"><i className="fa-solid fa-file-pen"></i></span>
              <div>
                <small>Mock Exams</small>
                <strong>1 of 6</strong>
              </div>
            </li>
            <li className="green">
              <span className="dashp-mini-ic"><i className="fa-regular fa-clock"></i></span>
              <div>
                <small>Study Time</small>
                <strong>24 Hrs</strong>
              </div>
            </li>
          </ul>
        </section>

        {/* Pick up where you left off + Readiness side */}
        <section className="dashp-section">
          <h3 className="dashp-h3">Pick up where you left off</h3>

          <div className="dashp-main">
            <div className="dashp-pickup">
              {pickup.map((p) => (
                <article key={p.title} className={`dashp-pick ${p.tone}`}>
                  <span className={`dashp-pick-ic ${p.tone}`}>
                    <i className={p.icon}></i>
                  </span>
                  <strong>{p.value}</strong>
                  <small className="dashp-pick-title">{p.title}</small>
                  <small className="dashp-pick-cap">{p.caption}</small>

                  <ul className="dashp-pick-stats">
                    <li>
                      <span>Accuracy</span>
                      <b>{p.accuracy}</b>
                    </li>
                    <li>
                      <span>Avg score</span>
                      <b>{p.avg}</b>
                    </li>
                  </ul>

                  <div className={`dashp-pick-bar ${p.tone}`}>
                    <span style={{ width: `${p.pct}%` }} />
                  </div>
                  <small className="dashp-pick-pct">{p.pct}% complete</small>

                  <Link href={p.cta.href} className={`dashp-pick-cta ${p.tone}`}>
                    {p.cta.label} <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </article>
              ))}
            </div>

            <aside className="dashp-readiness">
              <header>
                <h3>Your Readiness Score</h3>
                <span className="dashp-delta">+12 this week</span>
              </header>
              <div
                className="dashp-ring"
                style={{
                  background: `conic-gradient(#16a34a 0% ${readinessPct}%, #eef0f8 ${readinessPct}% 100%)`,
                }}
              >
                <div className="dashp-ring-hole">
                  <strong>{readinessPct}</strong>
                  <small>/ 100</small>
                </div>
              </div>
              <span className="dashp-pass-pill">
                <i className="fa-solid fa-arrow-trend-up"></i> Good progress
              </span>
              <p>
                PMP Mentor has insights for you — focus on Process Domain to
                cross 75 next week.
              </p>
              <div className="dashp-ready-actions">
                <Link href="/lms/pmp/mock-exam/1/result" className="dashp-ready-btn primary">
                  Set Goal
                </Link>
                <Link href="/lms/pmp" className="dashp-ready-btn ghost">
                  View score breakdown
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Study plan + Upcoming Milestones split */}
        <section className="dashp-split">
          <article className="dashp-plan">
            <header className="dashp-plan-head">
              <h3>Your Study Plan</h3>
              <Link href="/lms/pmp" className="dashp-link">View all</Link>
            </header>
            <ul className="dashp-plan-list">
              {plan.map((row) => {
                const s = statusMeta[row.status];
                return (
                  <li key={row.title}>
                    <span className={`dashp-plan-ic ${row.tone}`}>
                      <i className={row.icon}></i>
                    </span>
                    <div>
                      <strong>{row.title}</strong>
                      <small>{row.meta}</small>
                    </div>
                    <span className={`dashp-plan-status ${s.cls}`}>
                      <i className={s.icon}></i> {s.label}
                    </span>
                    <Link href={row.href} className="dashp-plan-go">
                      {row.status === "completed" ? "Review" : row.status === "scheduled" ? "Join" : "Continue"}
                      {" "}<i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </article>

          <article className="dashp-rail-card">
            <header>
              <h3>Upcoming Milestones</h3>
            </header>
            <ul className="dashp-milestones">
              {milestones.map((m) => (
                <li key={m.title}>
                  <span className={`dashp-mile-ic ${m.tone}`}>
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                  <div>
                    <small>{m.date}</small>
                    <strong>{m.title}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* Recommended + Study Streak split */}
        <section className="dashp-split">
          <article className="dashp-plan">
            <h3 className="dashp-h3">Recommended for You</h3>
            <div className="dashp-rec">
              {recommendations.map((r) => (
                <article key={r.title} className={`dashp-rec-card ${r.tone}`}>
                  <span className={`dashp-rec-ic ${r.tone}`}>
                    <i className={r.icon}></i>
                  </span>
                  <strong>{r.title}</strong>
                  <p>{r.desc}</p>
                  <Link href={r.cta.href} className="dashp-rec-cta">
                    {r.cta.label} <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </article>
              ))}
            </div>
          </article>

          <article className="dashp-streak">
            <header>
              <h3>Study Streak</h3>
              <strong className="dashp-streak-count">
                <i className="fa-solid fa-fire"></i> 7 days
              </strong>
            </header>
            <ul className="dashp-streak-days">
              {streak.map((d, i) => (
                <li
                  key={i}
                  className={`${d.done ? "done" : ""}${d.today ? " today" : ""}`}
                >
                  <span>{d.day}</span>
                  <i className={d.done ? "fa-solid fa-check" : "fa-regular fa-circle"}></i>
                </li>
              ))}
            </ul>
            <p>Keep showing up daily to make it a 30-day streak.</p>
          </article>
        </section>
      </div>
    </div>
  );
}
