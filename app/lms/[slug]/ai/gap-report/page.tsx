import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const clusters = [
  { name: "People · Conflict & teams",     pct: 78, band: "high" },
  { name: "Process · Schedule mgmt",        pct: 62, band: "med"  },
  { name: "Process · EVM application",      pct: 38, band: "low"  },
  { name: "Process · Procurement",          pct: 54, band: "low"  },
  { name: "Business Env · Compliance",      pct: 71, band: "med"  },
  { name: "Domain · Process scenarios",     pct: 49, band: "low"  },
];

const actions = [
  { num: 1, text: "Re-take Mini Mock 1 with a focus on Process questions only.",                       href: "/lms/pmp/mock-exam/1",                              impact: "+6", time: "60m" },
  { num: 2, text: "Drill 50 wrong-only questions from Process Medium+Hard difficulty.",                 href: "/lms/pmp/question-bank?cluster=process&wrong=1",     impact: "+3", time: "45m" },
  { num: 3, text: "Read the EVM reference card and complete the in-card check.",                        href: "/lms/pmp/reference/cost-management",                 impact: "+2", time: "30m" },
  { num: 4, text: "Attend Wednesday's EVM clinic with Rohan.",                                          href: "/lms/pmp/live-training",                            impact: "+2", time: "60m" },
  { num: 5, text: "Run a 25-question Domain-Process scenario drill.",                                   href: "/lms/pmp/question-bank?cluster=domain-process",      impact: "+2", time: "30m" },
];

export default function GapReportPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Gap Report" },
      ]}
      title="📊 AI Gap Report"
      subtitle="Weekly weakness diagnosis. Acknowledge below to credit your readiness signal — and start the 5 actions to push composite past 70."
      right={
        <span className="gr-report-pill">
          <i className="fa-regular fa-calendar"></i> Issued Sun 22 May · valid till Sun 29
        </span>
      }
    >
      <section className="gr-summary">
        <article>
          <p className="gr-summary-lead">
            You understand the framework but stumble on <strong>EVM application</strong>.
            Three Process clusters are pulling your composite down — clearing the
            weakest (EVM) typically lifts composite by <strong>5–7 points</strong> in 10 days.
          </p>
        </article>
      </section>

      <section className="gr-chart-card">
        <header><h3>Topic-cluster strength</h3><small>Latest mock + Q-bank · ranked weakest first if you click sort</small></header>
        <ul className="gr-cluster-list">
          {clusters.map((c, i) => (
            <li key={i} className={c.band}>
              <strong>{c.name}</strong>
              <div className="gr-cluster-bar"><div className={`gr-cluster-fill ${c.band}`} style={{ width: `${c.pct}%` }} /></div>
              <span>{c.pct}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="gr-actions-card">
        <header><h3>5 prioritised actions</h3><small>Ordered by impact-per-hour</small></header>
        <ol className="gr-action-list">
          {actions.map((a) => (
            <li key={a.num}>
              <span className="gr-action-num">{a.num}</span>
              <div>
                <strong>{a.text}</strong>
                <small>
                  <i className="fa-regular fa-clock"></i> {a.time} ·{" "}
                  <Link href={a.href}>Start now <i className="fa-solid fa-arrow-right"></i></Link>
                </small>
              </div>
              <span className="gr-action-impact">{a.impact} composite</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="gr-ack-bar">
        <article>
          <div>
            <strong>Acknowledge this report</strong>
            <p>Credits +15 toward your readiness composite (Gold weighting). Start at least 3 of the 5 actions for full +24.</p>
          </div>
          <button type="button" className="gr-ack-cta">
            <i className="fa-solid fa-circle-check"></i> Acknowledge &amp; start actions
          </button>
        </article>
      </section>
    </LmsFrame>
  );
}
