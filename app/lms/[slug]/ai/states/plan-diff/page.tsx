import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

type Change = {
  kind: "add" | "remove" | "shift";
  day: string;
  was?: string;
  now?: string;
  reason: string;
};

const changes: Change[] = [
  { kind: "add",    day: "Wed 28 May", now: "Live · EVM clinic (Rohan)", reason: "Gap report flagged EVM as your weakest topic — Rohan's clinic happens this week." },
  { kind: "shift",  day: "Sat 31 May", was: "Q-bank · easy Process",     now: "Full Length Exam 2 (4h)", reason: "Your composite stalled at 62. A full-length mock is the fastest lever to push it past 70." },
  { kind: "remove", day: "Sun 01 Jun", was: "Light review · 30 min",     reason: "Replaced by wrong-answers review after Saturday's mock." },
  { kind: "add",    day: "Mon 02 Jun", now: "Wrong-answers · Process",   reason: "Comes after the mock to convert misses into recall." },
];

const kindMeta = {
  add:    { label: "ADD",    tone: "green",  icon: "fa-solid fa-plus" },
  remove: { label: "REMOVE", tone: "red",    icon: "fa-solid fa-minus" },
  shift:  { label: "SHIFT",  tone: "amber",  icon: "fa-solid fa-arrows-rotate" },
};

export default function PlanDiffPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Study Plan", href: "/lms/pmp/ai/study-plan" },
        { label: "Re-generate · diff" },
      ]}
      title="🔄 Plan re-generation · review changes"
      subtitle="The AI proposes 4 changes to your current plan. Confirm to overwrite, or keep the current one."
    >
      <section className="pd-stage">
        <article className="pd-modal">
          <header>
            <h3>Proposed plan changes</h3>
            <small>Based on the last 7 days of performance signals</small>
          </header>

          <ul className="pd-changes">
            {changes.map((c, i) => {
              const m = kindMeta[c.kind];
              return (
                <li key={i} className={c.kind}>
                  <span className={`pd-tag ${m.tone}`}><i className={m.icon}></i> {m.label}</span>
                  <div className="pd-change">
                    <strong>{c.day}</strong>
                    {c.was && <p className="pd-was">Was: <em>{c.was}</em></p>}
                    {c.now && <p className="pd-now">Now: <strong>{c.now}</strong></p>}
                    <small>{c.reason}</small>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="pd-summary">
            <article><small>Net study hours</small><strong>+0.5 h</strong></article>
            <article><small>Expected composite lift</small><strong>+5</strong></article>
            <article><small>Risk if rejected</small><strong>Plateau at 62</strong></article>
          </div>

          <footer>
            <button type="button" className="pd-secondary">Keep current plan</button>
            <button type="button" className="pd-primary"><i className="fa-solid fa-circle-check"></i> Apply 4 changes</button>
          </footer>
        </article>
      </section>
    </LmsFrame>
  );
}
