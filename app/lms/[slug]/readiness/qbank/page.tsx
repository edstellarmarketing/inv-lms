import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Difficulty = "easy" | "medium" | "hard";

type ClusterCell = {
  attempted: number;
  total: number;
  accuracy: number | null;
};

type Cluster = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tone: "purple" | "orange" | "green" | "pink" | "blue" | "indigo";
  total: number;
  attempted: number;
  accuracy: number;
  wrongPool: number;
  cells: Record<Difficulty, ClusterCell>;
};

const floorPct = 50;

const clusters: Cluster[] = [
  {
    id: "people",
    name: "People",
    desc: "Team leadership, conflict, collaboration",
    icon: "fa-solid fa-users",
    tone: "purple",
    total: 510,
    attempted: 412,
    accuracy: 78,
    wrongPool: 23,
    cells: {
      easy: { attempted: 180, total: 180, accuracy: 88 },
      medium: { attempted: 158, total: 200, accuracy: 76 },
      hard: { attempted: 74, total: 130, accuracy: 62 },
    },
  },
  {
    id: "process",
    name: "Process",
    desc: "Planning, execution, schedule and cost",
    icon: "fa-solid fa-diagram-project",
    tone: "orange",
    total: 870,
    attempted: 412,
    accuracy: 58,
    wrongPool: 124,
    cells: {
      easy: { attempted: 280, total: 320, accuracy: 78 },
      medium: { attempted: 92, total: 380, accuracy: 54 },
      hard: { attempted: 40, total: 170, accuracy: 38 },
    },
  },
  {
    id: "business",
    name: "Business Environment",
    desc: "Compliance, value delivery, change",
    icon: "fa-solid fa-briefcase",
    tone: "green",
    total: 240,
    attempted: 152,
    accuracy: 71,
    wrongPool: 32,
    cells: {
      easy: { attempted: 78, total: 90, accuracy: 82 },
      medium: { attempted: 58, total: 100, accuracy: 70 },
      hard: { attempted: 16, total: 50, accuracy: 56 },
    },
  },
  {
    id: "agile",
    name: "Agile / Hybrid",
    desc: "Frameworks, tailoring decisions",
    icon: "fa-solid fa-arrows-rotate",
    tone: "blue",
    total: 340,
    attempted: 198,
    accuracy: 66,
    wrongPool: 41,
    cells: {
      easy: { attempted: 110, total: 120, accuracy: 78 },
      medium: { attempted: 68, total: 140, accuracy: 64 },
      hard: { attempted: 20, total: 80, accuracy: 48 },
    },
  },
  {
    id: "domain-process",
    name: "Domain — Process scenarios",
    desc: "Process Groups scenario practice",
    icon: "fa-solid fa-list-check",
    tone: "indigo",
    total: 230,
    attempted: 102,
    accuracy: 60,
    wrongPool: 28,
    cells: {
      easy: { attempted: 70, total: 80, accuracy: 75 },
      medium: { attempted: 28, total: 100, accuracy: 56 },
      hard: { attempted: 4, total: 50, accuracy: 30 },
    },
  },
  {
    id: "domain-people",
    name: "Domain — People scenarios",
    desc: "Servant leadership case studies",
    icon: "fa-solid fa-user-group",
    tone: "pink",
    total: 200,
    attempted: 78,
    accuracy: 64,
    wrongPool: 19,
    cells: {
      easy: { attempted: 50, total: 70, accuracy: 76 },
      medium: { attempted: 22, total: 80, accuracy: 60 },
      hard: { attempted: 6, total: 50, accuracy: 40 },
    },
  },
];

const summary = {
  totalQuestions: clusters.reduce((s, c) => s + c.total, 0),
  totalAttempted: clusters.reduce((s, c) => s + c.attempted, 0),
  avgAccuracy: Math.round(
    clusters.reduce((s, c) => s + c.accuracy * c.attempted, 0) /
      clusters.reduce((s, c) => s + c.attempted, 0)
  ),
  wrongPool: clusters.reduce((s, c) => s + c.wrongPool, 0),
  contribution: 17,
  weight: 30,
  belowFloor: 0,
};

clusters.forEach((c) => {
  if ((c.attempted / c.total) * 100 < floorPct) summary.belowFloor += 1;
});

function cellColorClass(accuracy: number | null, attempted: number, total: number) {
  if (attempted === 0) return "empty";
  const cov = (attempted / total) * 100;
  if (cov < floorPct) return "below-floor";
  if (accuracy === null) return "empty";
  if (accuracy >= 75) return "high";
  if (accuracy >= 60) return "med";
  return "low";
}

function clusterCoveragePct(c: Cluster) {
  return Math.round((c.attempted / c.total) * 100);
}

export default function ReadinessQbankPage() {
  const overallCoverage = Math.round((summary.totalAttempted / summary.totalQuestions) * 100);
  const weakest = [...clusters].sort((a, b) => a.accuracy - b.accuracy)[0];
  const lowestCoverage = [...clusters].sort(
    (a, b) => clusterCoveragePct(a) - clusterCoveragePct(b)
  )[0];

  return (
    <LmsFrame
      active="Practice & Quizzes"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Readiness panel", href: "/lms/pmp/readiness" },
        { label: "Q-bank coverage" },
      ]}
      title="🎯 Q-bank coverage · contribution to readiness"
      subtitle="Topic-cluster heatmap with anti-cherry-picking 50% coverage floor. Clusters below the floor block the readiness gate even if accuracy is high."
      right={
        <Link href="/lms/pmp/question-bank" className="qbd-jump">
          <i className="fa-solid fa-circle-question"></i>
          <span>
            <small>Picker</small>
            <strong>Open Q-bank</strong>
          </span>
        </Link>
      }
    >
      {/* Stats */}
      <section className="qbd-stats">
        <article className="qbd-stat purple">
          <small>Overall coverage</small>
          <strong>{overallCoverage}%</strong>
          <em>
            {summary.totalAttempted.toLocaleString()} of {summary.totalQuestions.toLocaleString()} attempted
          </em>
          <div className="qbd-stat-bar">
            <div className="qbd-stat-fill purple" style={{ width: `${overallCoverage}%` }} />
          </div>
        </article>
        <article className="qbd-stat blue">
          <small>Average accuracy</small>
          <strong>{summary.avgAccuracy}%</strong>
          <em>weighted across all attempted Qs</em>
        </article>
        <article className={`qbd-stat ${summary.belowFloor > 0 ? "red" : "green"}`}>
          <small>Below {floorPct}% floor</small>
          <strong>{summary.belowFloor}</strong>
          <em>
            {summary.belowFloor === 0
              ? "All clusters clear the floor"
              : `cluster${summary.belowFloor > 1 ? "s" : ""} need coverage to unblock gate`}
          </em>
        </article>
        <article className="qbd-stat amber">
          <small>Wrong-answers pool</small>
          <strong>{summary.wrongPool}</strong>
          <em>questions waiting for review</em>
        </article>
      </section>

      {/* Contribution + floor explainer */}
      <section className="qbd-explain">
        <article className="qbd-contribution">
          <div>
            <small>Q-bank weight</small>
            <strong>{summary.weight}%</strong>
            <em>of your composite readiness</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="contrib">
            <small>Currently contributing</small>
            <strong>+{summary.contribution}</strong>
            <em>raw Q-bank score: 58 / 100</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="next">
            <small>Possible at 75%+ avg accuracy</small>
            <strong>+22</strong>
            <em>headroom: +5 to composite</em>
          </div>
        </article>

        <article className="qbd-floor">
          <i className="fa-solid fa-floppy-disk"></i>
          <div>
            <strong>The anti-cherry-picking floor</strong>
            <p>
              Every topic cluster needs <strong>≥{floorPct}% coverage</strong> before
              the readiness gate clears — even if your overall accuracy is great.
              This stops a learner from drilling one strong area to mask weak ones.
            </p>
            <p className="qbd-floor-state">
              {summary.belowFloor === 0 ? (
                <>
                  <i className="fa-solid fa-circle-check"></i>
                  All <strong>{clusters.length} clusters</strong> currently
                  clear the {floorPct}% floor — your lowest is{" "}
                  <strong>{lowestCoverage.name}</strong> at{" "}
                  {clusterCoveragePct(lowestCoverage)}%.
                </>
              ) : (
                <>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {summary.belowFloor} cluster{summary.belowFloor > 1 ? "s" : ""}{" "}
                  below floor — gate blocked until cleared.
                </>
              )}
            </p>
          </div>
        </article>
      </section>

      {/* Heatmap */}
      <section className="qbd-heatmap-card">
        <header className="qbd-section-head">
          <div>
            <h3>Topic-cluster heatmap</h3>
            <small>
              Coverage on the left bar; cells show accuracy by difficulty.
              Cells in red are below the {floorPct}% coverage floor.
            </small>
          </div>
          <div className="qbd-legend">
            <span><span className="qbd-leg-cell empty" /> Not attempted</span>
            <span><span className="qbd-leg-cell below-floor" /> Below floor</span>
            <span><span className="qbd-leg-cell low" /> &lt;60% accuracy</span>
            <span><span className="qbd-leg-cell med" /> 60–75%</span>
            <span><span className="qbd-leg-cell high" /> ≥75%</span>
          </div>
        </header>

        <div className="qbd-heatmap">
          <header>
            <span />
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
            <span>Coverage</span>
            <span>Accuracy</span>
            <span>Wrong pool</span>
            <span>Drill</span>
          </header>

          {clusters.map((c) => {
            const cov = clusterCoveragePct(c);
            const belowFloor = cov < floorPct;
            return (
              <div key={c.id} className={`qbd-row ${belowFloor ? "below-floor" : ""}`}>
                <div className="qbd-row-label">
                  <span className={`qbd-row-ic ${c.tone}`}>
                    <i className={c.icon}></i>
                  </span>
                  <div>
                    <strong>{c.name}</strong>
                    <small>{c.desc}</small>
                  </div>
                </div>

                {(["easy", "medium", "hard"] as Difficulty[]).map((d) => {
                  const cell = c.cells[d];
                  const cls = cellColorClass(cell.accuracy, cell.attempted, cell.total);
                  const cellCov = Math.round((cell.attempted / cell.total) * 100);
                  return (
                    <div key={d} className={`qbd-cell ${cls}`}>
                      <strong>{cell.accuracy ?? "—"}{cell.accuracy !== null ? "%" : ""}</strong>
                      <small>
                        {cell.attempted}/{cell.total}
                      </small>
                      <em>{cellCov}% cov</em>
                    </div>
                  );
                })}

                <div className="qbd-row-cov">
                  <strong className={belowFloor ? "below-floor" : ""}>{cov}%</strong>
                  <div className="qbd-cov-track">
                    <div
                      className={`qbd-cov-fill ${belowFloor ? "below-floor" : c.tone}`}
                      style={{ width: `${cov}%` }}
                    />
                    <span
                      className="qbd-cov-floor"
                      style={{ left: `${floorPct}%` }}
                      title={`Floor ${floorPct}%`}
                    />
                  </div>
                </div>

                <div className="qbd-row-acc">
                  <strong>{c.accuracy}%</strong>
                  <span
                    className={`qbd-acc-pill ${
                      c.accuracy >= 75 ? "high" : c.accuracy >= 60 ? "med" : "low"
                    }`}
                  >
                    {c.accuracy >= 75 ? "Strong" : c.accuracy >= 60 ? "OK" : "Weak"}
                  </span>
                </div>

                <div className="qbd-row-wrong">
                  <strong>{c.wrongPool}</strong>
                  <small>queued</small>
                </div>

                <div className="qbd-row-drill">
                  <Link
                    href={`/lms/pmp/question-bank?cluster=${c.id}`}
                    className={`qbd-drill-cta ${belowFloor ? "primary" : ""}`}
                  >
                    {belowFloor ? "Cover gap" : "Drill"}{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wrong-answers + recommendations */}
      <section className="qbd-twocol">
        <article className="qbd-wrong">
          <header className="qbd-section-head">
            <div>
              <h3>Wrong-answers pool</h3>
              <small>
                {summary.wrongPool} questions queued from your sessions and mocks —
                replay them to convert errors to recall.
              </small>
            </div>
            <Link href="/lms/pmp/question-bank?wrong=1" className="qbd-inline">
              Open wrong-only mode <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </header>

          <div className="qbd-wrong-grid">
            {clusters.map((c) => {
              const pct = (c.wrongPool / summary.wrongPool) * 100;
              return (
                <div key={c.id} className="qbd-wrong-row">
                  <small>{c.name}</small>
                  <div className="qbd-wrong-bar">
                    <div
                      className={`qbd-wrong-fill ${c.tone}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <strong>{c.wrongPool}</strong>
                </div>
              );
            })}
          </div>

          <div className="qbd-wrong-tip">
            <i className="fa-solid fa-lightbulb"></i>
            <span>
              Most of your wrong answers cluster in <strong>{weakest.name}</strong>.
              A 30-min wrong-only session here typically lifts accuracy by 4–6 points.
            </span>
          </div>
        </article>

        <aside className="qbd-actions">
          <header className="qbd-section-head">
            <div>
              <h3>Suggested drills</h3>
              <small>Picked to unblock the gate fastest</small>
            </div>
          </header>

          <ol className="qbd-action-list">
            <li className="orange">
              <span className="qbd-action-ic orange">
                <i className="fa-solid fa-diagram-project"></i>
              </span>
              <div>
                <div className="qbd-action-top">
                  <strong>Process — Medium &amp; Hard drill (60 Qs)</strong>
                  <span className="qbd-action-impact">+4 acc</span>
                </div>
                <small>
                  Weakest cluster overall. Targeting M+H questions lifts both accuracy
                  and your weakest difficulty rows.
                </small>
                <small className="qbd-action-meta">
                  <i className="fa-regular fa-clock"></i> 45m ·{" "}
                  <Link href="/lms/pmp/question-bank?cluster=process&difficulty=mh" className="qbd-inline">
                    Start drill <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </small>
              </div>
            </li>
            <li className="pink">
              <span className="qbd-action-ic pink">
                <i className="fa-solid fa-user-group"></i>
              </span>
              <div>
                <div className="qbd-action-top">
                  <strong>Domain — People scenarios (25 Qs)</strong>
                  <span className="qbd-action-impact">+5 cov</span>
                </div>
                <small>
                  Lowest coverage of any cluster. Lifting coverage here is the quickest
                  way to widen your sample size.
                </small>
                <small className="qbd-action-meta">
                  <i className="fa-regular fa-clock"></i> 30m ·{" "}
                  <Link href="/lms/pmp/question-bank?cluster=domain-people" className="qbd-inline">
                    Start drill <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </small>
              </div>
            </li>
            <li className="indigo">
              <span className="qbd-action-ic indigo">
                <i className="fa-solid fa-list-check"></i>
              </span>
              <div>
                <div className="qbd-action-top">
                  <strong>Process scenarios — wrong-only (28 Qs)</strong>
                  <span className="qbd-action-impact">+3 acc</span>
                </div>
                <small>
                  Replay the scenarios you've gotten wrong — fastest accuracy lift in
                  Process domain.
                </small>
                <small className="qbd-action-meta">
                  <i className="fa-regular fa-clock"></i> 25m ·{" "}
                  <Link href="/lms/pmp/question-bank?cluster=domain-process&wrong=1" className="qbd-inline">
                    Start drill <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </small>
              </div>
            </li>
          </ol>
        </aside>
      </section>

      {/* Footer */}
      <section className="qbd-footer">
        <article>
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>How coverage is calculated</strong>
            <p>
              Coverage = unique questions attempted ÷ total in cluster. Retakes of the
              same question don't count twice — keep moving through new questions
              to widen coverage. Accuracy is the average of your latest attempt per question.
            </p>
          </div>
          <Link href="#" className="qbd-secondary">
            Read full methodology <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
