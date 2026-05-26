import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type AckStatus = "unacked" | "acked" | "acted" | "stale";

type GapAction = {
  id: string;
  text: string;
  done: boolean;
  deepLink?: { label: string; href: string };
};

type GapReport = {
  id: string;
  date: string;
  ageLabel: string;
  status: AckStatus;
  composite: number;
  summary: string;
  topClusters: { name: string; pct: number; band: "high" | "med" | "low" }[];
  actions: GapAction[];
  ackedOn?: string;
  actedPct: number;
};

const reports: GapReport[] = [
  {
    id: "gap-2026-05-22",
    date: "22 May 2026",
    ageLabel: "Latest · 4 days ago",
    status: "unacked",
    composite: 62,
    summary:
      "Process domain and EVM concepts are pulling your composite down. Three drills below will move you from 62 to ~70 within two weeks.",
    topClusters: [
      { name: "Process · EVM", pct: 38, band: "low" },
      { name: "Process · Schedule mgmt", pct: 54, band: "low" },
      { name: "Domain — Process scenarios", pct: 60, band: "med" },
    ],
    actions: [
      { id: "a1", text: "Re-take Mini Mock 1 with a focus on Process questions only", done: false, deepLink: { label: "Mini Mock 1", href: "/lms/pmp/mock-exam/1" } },
      { id: "a2", text: "Drill 50 wrong-only questions from Process Medium+Hard", done: false, deepLink: { label: "Q-bank · Process", href: "/lms/pmp/question-bank?cluster=process" } },
      { id: "a3", text: "Read the EVM reference card and complete the in-card check", done: false, deepLink: { label: "EVM card", href: "/lms/pmp/reference/cost-management" } },
      { id: "a4", text: "Attend Wednesday's EVM clinic with Rohan", done: false, deepLink: { label: "Live training", href: "/lms/pmp/live-training" } },
      { id: "a5", text: "Run a 25-question Domain-Process scenario drill", done: false, deepLink: { label: "Scenario drill", href: "/lms/pmp/question-bank?cluster=domain-process" } },
    ],
    actedPct: 0,
  },
  {
    id: "gap-2026-05-18",
    date: "18 May 2026",
    ageLabel: "8 days ago",
    status: "acked",
    composite: 58,
    summary:
      "Concept Coach output shows you're confident on People but shaky on contract types — and time-on-question is too high in early-paper questions.",
    topClusters: [
      { name: "Process · Procurement", pct: 48, band: "low" },
      { name: "Mock pacing — early Qs", pct: 62, band: "med" },
      { name: "Agile — hybrid tailoring", pct: 70, band: "high" },
    ],
    actions: [
      { id: "b1", text: "Re-read the Procurement reference card", done: true, deepLink: { label: "Reference", href: "/lms/pmp/reference/integration-management" } },
      { id: "b2", text: "Drill 30 contract-types questions", done: true, deepLink: { label: "Q-bank drill", href: "/lms/pmp/question-bank" } },
      { id: "b3", text: "Run a 25-question mock with 1-min cap per Q (pacing drill)", done: false, deepLink: { label: "Pacing drill", href: "/lms/pmp/question-bank" } },
      { id: "b4", text: "Read the tailoring-decisions guide chapter", done: false, deepLink: { label: "Tailoring guide", href: "/lms/pmp/study-guide/agile-practice" } },
    ],
    ackedOn: "22 May 2026 · 14:08",
    actedPct: 50,
  },
  {
    id: "gap-2026-05-11",
    date: "11 May 2026",
    ageLabel: "15 days ago",
    status: "acted",
    composite: 48,
    summary:
      "Stakeholder engagement and the salience model were major drag factors. You've closed both — Stage 4 concept coach confirms.",
    topClusters: [
      { name: "People · Stakeholder engagement", pct: 56, band: "med" },
      { name: "People · Salience model", pct: 44, band: "low" },
    ],
    actions: [
      { id: "c1", text: "Watch the salience model explainer (12 min)", done: true },
      { id: "c2", text: "Drill 25 People-domain scenarios", done: true, deepLink: { label: "Scenario drill", href: "/lms/pmp/question-bank?cluster=domain-people" } },
      { id: "c3", text: "Ask Concept Coach 3 questions on power/interest grid edge cases", done: true, deepLink: { label: "Concept coach", href: "/lms/pmp/ai/concept-coach" } },
    ],
    ackedOn: "13 May 2026 · 19:42",
    actedPct: 100,
  },
  {
    id: "gap-2026-05-04",
    date: "4 May 2026",
    ageLabel: "22 days ago",
    status: "stale",
    composite: 42,
    summary:
      "Early-stage gaps in Process Groups foundations. Superseded by the more recent reports — kept here for the timeline.",
    topClusters: [
      { name: "Process Groups overview", pct: 38, band: "low" },
      { name: "Project lifecycle types", pct: 52, band: "med" },
    ],
    actions: [
      { id: "d1", text: "Re-read Process Groups study guide", done: true },
      { id: "d2", text: "Attempt Mini Mock 1", done: true },
    ],
    ackedOn: "8 May 2026 · 10:15",
    actedPct: 100,
  },
];

const statusMeta: Record<AckStatus, { label: string; tone: string; icon: string; desc: string }> = {
  unacked: { label: "Needs ack", tone: "amber", icon: "fa-solid fa-circle-exclamation", desc: "Read & acknowledge to unlock 30% of your readiness signal" },
  acked: { label: "Acknowledged", tone: "blue", icon: "fa-solid fa-circle-check", desc: "Acknowledged — finish the listed actions to credit your score" },
  acted: { label: "Closed", tone: "green", icon: "fa-solid fa-check-double", desc: "All recommended actions completed — full credit applied" },
  stale: { label: "Superseded", tone: "grey", icon: "fa-solid fa-clock-rotate-left", desc: "Superseded by a newer report — kept for history" },
};

const summary = {
  totalReports: reports.length,
  unacked: reports.filter((r) => r.status === "unacked").length,
  closed: reports.filter((r) => r.status === "acted").length,
  inProgress: reports.filter((r) => r.status === "acked").length,
};

export default function GapReportsDrillPage() {
  const latestUnacked = reports.find((r) => r.status === "unacked");

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Readiness panel", href: "/lms/pmp/readiness" },
        { label: "Gap reports" },
      ]}
      title="📋 Gap-report acknowledgements"
      subtitle="Past AI-generated gap reports and what you did about them. Each ack contributes to your readiness signal — only the latest unacked is gating right now."
      right={
        latestUnacked ? (
          <Link href="/lms/pmp/ai/gap-report" className="gr-jump">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>
              <small>Latest report</small>
              <strong>Read &amp; ack now</strong>
            </span>
          </Link>
        ) : null
      }
    >
      {/* Stat strip */}
      <section className="gr-stats">
        <article className="gr-stat teal">
          <small>Reports issued</small>
          <strong>{summary.totalReports}</strong>
          <em>weekly cadence</em>
        </article>
        <article className="gr-stat amber">
          <small>Needs ack</small>
          <strong>{summary.unacked}</strong>
          <em>blocks readiness gate</em>
        </article>
        <article className="gr-stat blue">
          <small>In progress</small>
          <strong>{summary.inProgress}</strong>
          <em>acked, actions remaining</em>
        </article>
        <article className="gr-stat green">
          <small>Closed</small>
          <strong>{summary.closed}</strong>
          <em>all actions completed</em>
        </article>
      </section>

      {/* Contribution context */}
      <section className="gr-context">
        <article className="gr-contribution">
          <div>
            <small>Gap-report weight</small>
            <strong>30%</strong>
            <em>(Gold tier)</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="contrib">
            <small>Currently contributing</small>
            <strong>+15</strong>
            <em>raw score: 50 / 100</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="next">
            <small>Ack latest + start 3 actions</small>
            <strong>+24</strong>
            <em>headroom: +9 to composite</em>
          </div>
        </article>
        <article className="gr-context-tip">
          <i className="fa-solid fa-lightbulb"></i>
          <div>
            <strong>How acks credit your score</strong>
            <ul>
              <li>
                <span className="gr-mini-dot amber" /> <strong>Read &amp; acknowledge</strong>{" "}
                — half-credit (15 of 30 possible).
              </li>
              <li>
                <span className="gr-mini-dot blue" /> Complete <strong>3 of 5</strong> listed actions — three-quarters credit.
              </li>
              <li>
                <span className="gr-mini-dot green" /> Complete <strong>all listed actions</strong> — full credit.
              </li>
            </ul>
          </div>
        </article>
      </section>

      {/* Timeline of reports */}
      <section className="gr-timeline">
        <header className="gr-section-head">
          <div>
            <h3>Report timeline</h3>
            <small>Newest first — latest unacked is highlighted in amber.</small>
          </div>
        </header>

        <ul className="gr-list">
          {reports.map((r, idx) => {
            const s = statusMeta[r.status];
            const isLatest = idx === 0;
            return (
              <li key={r.id} className={`gr-report ${r.status} ${isLatest ? "is-latest" : ""}`}>
                <div className="gr-report-marker">
                  <span className={`gr-marker-dot ${s.tone}`}>
                    <i className={s.icon}></i>
                  </span>
                  {idx < reports.length - 1 && <span className="gr-marker-line" />}
                </div>

                <article className="gr-report-card">
                  <header>
                    <div className="gr-report-titlerow">
                      <strong>{r.date}</strong>
                      <span className="gr-report-age">{r.ageLabel}</span>
                      <span className={`gr-status ${s.tone}`}>
                        <i className={s.icon}></i> {s.label}
                      </span>
                      {r.status === "unacked" && (
                        <span className="gr-gate-flag">
                          <i className="fa-solid fa-lock"></i> Gating
                        </span>
                      )}
                    </div>
                    <small>
                      Composite at time of report: <strong>{r.composite}</strong>{" "}
                      · {s.desc}
                    </small>
                  </header>

                  <p className="gr-report-summary">{r.summary}</p>

                  <div className="gr-clusters">
                    <small>Top contributing clusters</small>
                    <div className="gr-cluster-grid">
                      {r.topClusters.map((c) => (
                        <div key={c.name} className={`gr-cluster ${c.band}`}>
                          <span>{c.name}</span>
                          <div className="gr-cluster-bar">
                            <div
                              className={`gr-cluster-fill ${c.band}`}
                              style={{ width: `${c.pct}%` }}
                            />
                          </div>
                          <strong>{c.pct}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="gr-actions">
                    <header className="gr-actions-head">
                      <small>Recommended actions</small>
                      <span className="gr-actions-progress">
                        <strong>
                          {r.actions.filter((a) => a.done).length}
                        </strong>{" "}
                        of {r.actions.length} done · {r.actedPct}%
                      </span>
                    </header>
                    <ol>
                      {r.actions.map((a) => (
                        <li key={a.id} className={a.done ? "done" : ""}>
                          <span
                            className={`gr-check ${a.done ? "done" : ""}`}
                            aria-hidden="true"
                          >
                            {a.done && <i className="fa-solid fa-check"></i>}
                          </span>
                          <span className="gr-action-text">{a.text}</span>
                          {a.deepLink && !a.done && (
                            <Link href={a.deepLink.href} className="gr-action-link">
                              {a.deepLink.label}{" "}
                              <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <footer className="gr-report-foot">
                    {r.ackedOn ? (
                      <small>
                        <i className="fa-solid fa-circle-check"></i> Acknowledged{" "}
                        {r.ackedOn}
                      </small>
                    ) : (
                      <small className="gr-unacked-note">
                        <i className="fa-solid fa-triangle-exclamation"></i> Not yet
                        acknowledged — blocks the readiness gate
                      </small>
                    )}
                    <div className="gr-report-actions">
                      <Link href="/lms/pmp/ai/gap-report" className="gr-secondary">
                        <i className="fa-solid fa-eye"></i> Open full report
                      </Link>
                      {r.status === "unacked" && (
                        <button type="button" className="gr-primary">
                          <i className="fa-solid fa-circle-check"></i> Acknowledge
                        </button>
                      )}
                    </div>
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="gr-footer-info">
        <article>
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>Reports are issued weekly</strong>
            <p>
              The AI re-runs your gap analysis every Sunday at 09:00 IST using
              the latest mock + Q-bank data. Older reports are kept for history
              but only the latest counts toward the readiness signal.
            </p>
          </div>
          <Link href="/lms/pmp/ai/gap-report" className="gr-secondary">
            Open latest gap report <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
