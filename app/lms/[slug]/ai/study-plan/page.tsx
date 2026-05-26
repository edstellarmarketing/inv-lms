import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type DayKind = "today" | "study" | "rest" | "live" | "mock" | "exam";
type Day = { date: string; weekday: string; kind: DayKind; activities: { label: string; hours: number; href?: string }[] };

const days: Day[] = [
  { date: "26 May", weekday: "Today",  kind: "today", activities: [{ label: "Reference: Project Integration Mgmt", hours: 0.5, href: "/lms/pmp/reference/integration-management" }, { label: "Q-bank · Process drill (25 Qs)", hours: 0.5, href: "/lms/pmp/question-bank" }, { label: "Flashcards · 18 due", hours: 0.25, href: "/lms/pmp/ai/flashcards" }] },
  { date: "27 May", weekday: "Wed",    kind: "live",  activities: [{ label: "Live · EVM clinic (Rohan)", hours: 1, href: "/lms/pmp/live-training" }, { label: "Flashcards", hours: 0.25, href: "/lms/pmp/ai/flashcards" }] },
  { date: "28 May", weekday: "Thu",    kind: "study", activities: [{ label: "Study guide · PMBOK 7 Ch 4", hours: 1, href: "/lms/pmp/study-guide/pmbok-7" }, { label: "Q-bank · People domain", hours: 0.5, href: "/lms/pmp/question-bank" }] },
  { date: "29 May", weekday: "Fri",    kind: "rest",  activities: [{ label: "Rest day · light review only", hours: 0.25 }] },
  { date: "30 May", weekday: "Sat",    kind: "mock",  activities: [{ label: "Full Length Exam 2 · 230 min", hours: 4, href: "/lms/pmp/mock-exam/2" }, { label: "Gap report · review", hours: 0.5, href: "/lms/pmp/ai/gap-report" }] },
  { date: "31 May", weekday: "Sun",    kind: "study", activities: [{ label: "Wrong-answers review", hours: 1, href: "/lms/pmp/question-bank?wrong=1" }, { label: "Flashcards", hours: 0.25, href: "/lms/pmp/ai/flashcards" }] },
  { date: "01 Jun", weekday: "Mon",    kind: "study", activities: [{ label: "Reference · Cost Mgmt + EVM", hours: 1, href: "/lms/pmp/reference/cost-management" }] },
  { date: "08 Jun", weekday: "Sun",    kind: "study", activities: [{ label: "Final pre-exam taper", hours: 1 }] },
  { date: "12 Jun", weekday: "Fri",    kind: "exam",  activities: [{ label: "PMP® Exam · 10:00 AM IST", hours: 4 }] },
];

const dayMeta = {
  today: { tone: "blue",   label: "Today" },
  study: { tone: "purple", label: "Study" },
  rest:  { tone: "green",  label: "Rest" },
  live:  { tone: "pink",   label: "Live" },
  mock:  { tone: "orange", label: "Mock" },
  exam:  { tone: "red",    label: "EXAM" },
};

export default function AiStudyPlanPage() {
  const totalHours = days.reduce((s, d) => s + d.activities.reduce((a, x) => a + x.hours, 0), 0);

  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "AI Study Plan" },
      ]}
      title="📅 AI Study Plan"
      subtitle="Vertical calendar to your exam date. Re-generates weekly or on-demand from your latest performance signals."
      right={
        <div className="sp-head">
          <small>Calibrated for</small>
          <strong>8 hrs/week · 17 days to exam</strong>
        </div>
      }
    >
      <section className="sp-meta">
        <article><small>Last regenerated</small><strong>Today · 09:00 IST</strong></article>
        <article><small>Total study hrs planned</small><strong>{totalHours.toFixed(1)} h</strong></article>
        <article><small>Mocks scheduled</small><strong>{days.filter(d => d.kind === "mock").length}</strong></article>
        <article><small>Live sessions</small><strong>{days.filter(d => d.kind === "live").length}</strong></article>
        <article>
          <Link href="/lms/pmp/ai/states/plan-diff" className="sp-regen">
            <i className="fa-solid fa-arrows-rotate"></i> Re-generate
          </Link>
        </article>
      </section>

      <section className="sp-cal">
        {days.map((d, idx) => {
          const m = dayMeta[d.kind];
          return (
            <article key={idx} className={`sp-day ${m.tone}`}>
              <div className="sp-day-when">
                <strong>{d.date}</strong>
                <small>{d.weekday}</small>
                <span className={`sp-day-tag ${m.tone}`}>{m.label}</span>
              </div>
              <ul className="sp-acts">
                {d.activities.map((a, i) => (
                  <li key={i}>
                    {a.href
                      ? <Link href={a.href}><strong>{a.label}</strong></Link>
                      : <strong>{a.label}</strong>}
                    <small>{a.hours.toFixed(2)} h</small>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="sp-foot">
        <article>
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>How re-generation works</strong>
            <p>Click 'Re-generate' to refresh based on the past 7 days of performance. You'll see a diff modal before the new plan overwrites the current one.</p>
          </div>
        </article>
      </section>
    </LmsFrame>
  );
}
