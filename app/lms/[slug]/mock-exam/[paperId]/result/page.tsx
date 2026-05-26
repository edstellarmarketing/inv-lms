import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

type Params = { params: { slug: string; paperId: string } };

type TopicRow = {
  name: string;
  tone: "purple" | "orange" | "green" | "pink" | "blue" | "indigo";
  icon: string;
  total: number;
  correct: number;
};

type ReviewRow = {
  n: number;
  cluster: string;
  snippet: string;
  explanation: string;
  result: "correct" | "incorrect" | "flagged" | "unanswered";
};

const TOTAL_PAPERS = 6;

const topics: TopicRow[] = [
  { name: "People", tone: "purple", icon: "fa-solid fa-users", total: 76, correct: 65 },
  { name: "Process", tone: "orange", icon: "fa-solid fa-diagram-project", total: 90, correct: 70 },
  { name: "Business Environment", tone: "green", icon: "fa-solid fa-briefcase", total: 14, correct: 11 },
  { name: "Domain — People", tone: "pink", icon: "fa-solid fa-user-group", total: 22, correct: 18 },
  { name: "Domain — Process", tone: "blue", icon: "fa-solid fa-list-check", total: 28, correct: 21 },
  { name: "Professional Responsibility", tone: "indigo", icon: "fa-solid fa-scale-balanced", total: 12, correct: 9 },
];

const reviews: ReviewRow[] = [
  {
    n: 1,
    cluster: "People → Manage Team",
    snippet: "The project manager believes a remote team member is disengaged…",
    explanation: "Hold a 1-on-1 first to understand the human factor — PMBOK People Domain §2.3 prioritises empathy before escalation.",
    result: "correct",
  },
  {
    n: 2,
    cluster: "Process → Risk",
    snippet: "During execution, a stakeholder requests an out-of-scope feature…",
    explanation: "Invoke Integrated Change Control before any plan or cost update — never accept scope changes informally.",
    result: "incorrect",
  },
  {
    n: 3,
    cluster: "Business Env. → Compliance",
    snippet: "A regulatory change introduces new reporting requirements mid-project…",
    explanation: "Re-baseline compliance scope, update the risk register, and notify the sponsor — compliance is non-negotiable.",
    result: "incorrect",
  },
  {
    n: 4,
    cluster: "Domain — People",
    snippet: "A high-performer disagrees with a sprint priority…",
    explanation: "Use collaborative problem-solving (confront/win-win), not avoidance or forcing — preserves performance and trust.",
    result: "flagged",
  },
  {
    n: 5,
    cluster: "Process → Schedule",
    snippet: "CPI is 0.92 and SPI is 1.05 — what does the variance combination indicate?",
    explanation: "Ahead of schedule but over budget — usually means extra resources were added to recover time.",
    result: "correct",
  },
  {
    n: 6,
    cluster: "People → Conflict",
    snippet: "Two senior engineers disagree on the technical approach…",
    explanation: "Facilitate a fact-based comparison; conflict over technical merit is healthy when surfaced and resolved openly.",
    result: "correct",
  },
  {
    n: 7,
    cluster: "Process → Quality",
    snippet: "Quality metrics are trending down following a build pipeline upgrade…",
    explanation: "Perform a root-cause analysis and trigger quality control before quality assurance — find the source first.",
    result: "unanswered",
  },
];

const totals = topics.reduce(
  (acc, t) => ({ total: acc.total + t.total, correct: acc.correct + t.correct }),
  { total: 0, correct: 0 },
);
const incorrect = totals.total - totals.correct;
const score = Math.round((totals.correct / totals.total) * 100);

function resultPill(r: ReviewRow["result"]) {
  if (r === "correct") return { label: "Correct", cls: "ok", icon: "fa-solid fa-check" };
  if (r === "incorrect") return { label: "Incorrect", cls: "bad", icon: "fa-solid fa-xmark" };
  if (r === "flagged") return { label: "Flagged", cls: "warn", icon: "fa-regular fa-flag" };
  return { label: "Unanswered", cls: "blank", icon: "fa-regular fa-circle" };
}

export default function MockResultPage({ params }: Params) {
  const paper = Number.parseInt(params.paperId, 10) || 1;

  return (
    <LmsFrame
      active="Mock Exams"
      crumbs={[{ label: "Back to Mock Exams", href: `/lms/pmp/mock-exam/${paper}` }]}
      title={`Mock Exam Results — Paper ${paper} of ${TOTAL_PAPERS}`}
      subtitle="Full-length mock exam · 180 questions · Closed-book"
      right={
        <span className="mxres-passpill">
          <i className="fa-solid fa-circle-check"></i> Pass
        </span>
      }
    >
      {/* Top 3-column row: score / topic performance / exam summary */}
      <section className="mxres-top">
        {/* Score card */}
        <article className="mxres-score-card">
          <div
            className="mxres-ring"
            style={{
              background: `conic-gradient(#16a34a 0% ${score}%, #eef0f8 ${score}% 100%)`,
            }}
          >
            <div className="mxres-ring-hole">
              <strong>{score}%</strong>
              <small>Score</small>
            </div>
          </div>
          <span className="mxres-pass">
            <i className="fa-solid fa-circle-check"></i> PASS
          </span>
          <p>You&apos;ve cleared this mock exam — your readiness score is rising fast.</p>

          <ul className="mxres-mini">
            <li>
              <small>Final Score</small>
              <strong>{totals.correct} / {totals.total}</strong>
            </li>
            <li>
              <small>Time Spent</small>
              <strong>03:07:18</strong>
            </li>
            <li>
              <small>Pass Mark</small>
              <strong>70%</strong>
            </li>
            <li>
              <small>Difficulty</small>
              <strong>Medium</strong>
            </li>
          </ul>
        </article>

        {/* Performance by Topic */}
        <article className="mxres-perf">
          <header>
            <h3>Performance by Topic</h3>
            <Link href="#" className="mxres-link">
              View full topic performance <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </header>
          <div className="mxres-perf-table">
            <div className="mxres-perf-th">
              <span>Topic</span>
              <span>Q&apos;s</span>
              <span>Correct</span>
              <span>Accuracy</span>
            </div>
            {topics.map((t) => {
              const acc = Math.round((t.correct / t.total) * 100);
              return (
                <div key={t.name} className="mxres-perf-tr">
                  <div className="mxres-perf-topic">
                    <span className={`qres-topic-ic ${t.tone}`}>
                      <i className={t.icon}></i>
                    </span>
                    <strong>{t.name}</strong>
                  </div>
                  <span className="mxres-num">{t.total}</span>
                  <span className="mxres-num">{t.correct}</span>
                  <div className="mxres-perf-bar">
                    <div className="qres-bar">
                      <span style={{ width: `${acc}%` }} />
                    </div>
                    <span className="qres-val">{acc}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Exam Summary */}
        <article className="mxres-summary">
          <h3>Exam Summary</h3>
          <ul>
            <li><span>Answered</span><b>{totals.total - 7}</b></li>
            <li><span>Correct</span><b className="ok">{totals.correct}</b></li>
            <li><span>Incorrect</span><b className="bad">{incorrect - 7}</b></li>
            <li><span>Unanswered</span><b className="muted">7</b></li>
            <li><span>Flagged</span><b className="warn">4</b></li>
            <li><span>Time Spent</span><b>03:07:18</b></li>
            <li><span>Pass Rate</span><b>{score}%</b></li>
          </ul>
          <div className="mxres-note">
            <i className="fa-solid fa-circle-info"></i>
            <p>
              You&apos;ve cleared the pass mark. Try another mock to boost your
              readiness above 80%.
            </p>
          </div>
          <Link href="#" className="lms-btn primary block">
            <i className="fa-solid fa-arrow-rotate-right"></i> Update my Readiness Score
          </Link>
          <Link href="#" className="lms-btn ghost block">
            <i className="fa-solid fa-wand-magic-sparkles"></i> View AI Gap Report
          </Link>
        </article>
      </section>

      {/* Review section */}
      <section className="mxres-review">
        <div className="mxres-review-head">
          <div className="mxres-tabs">
            <button className="mxres-tab active">All Questions <span>180</span></button>
            <button className="mxres-tab">Incorrect <span className="bad">{incorrect}</span></button>
            <button className="mxres-tab">Unanswered <span>7</span></button>
            <button className="mxres-tab">Flagged <span className="warn">4</span></button>
          </div>
          <div className="mxres-review-tools">
            <div className="mxres-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search questions…" />
            </div>
            <button className="lms-btn ghost sm">
              <i className="fa-solid fa-filter"></i> Filter
            </button>
            <button className="lms-btn ghost sm">
              <i className="fa-solid fa-arrow-up-wide-short"></i> Sort
            </button>
          </div>
        </div>

        <div className="mxres-rtable">
          <div className="mxres-rth">
            <span>#</span>
            <span>Cluster</span>
            <span>Question snippet</span>
            <span>Explanation</span>
            <span>Result</span>
            <span>Action</span>
          </div>
          {reviews.map((r) => {
            const p = resultPill(r.result);
            return (
              <div key={r.n} className="mxres-rtr">
                <span className="mxres-rn">{r.n.toString().padStart(3, "0")}</span>
                <span className="mxres-rcluster">{r.cluster}</span>
                <span className="mxres-rsnippet">{r.snippet}</span>
                <span className="mxres-rexplain">
                  <i className="fa-solid fa-lightbulb"></i>
                  <span>{r.explanation}</span>
                </span>
                <span className={`mxres-pill ${p.cls}`}>
                  <i className={p.icon}></i> {p.label}
                </span>
                <Link href="#" className="mxres-rlink">
                  View <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mxres-rfoot">
          <button className="lms-btn ghost sm">
            <i className="fa-solid fa-chevron-down"></i> Show more questions
          </button>
        </div>
      </section>

      {/* Next steps + footer */}
      <section className="mxres-next">
        <article className="mxres-steps">
          <h3>Next Steps</h3>
          <ul>
            <li>
              <span className="qres-topic-ic blue">
                <i className="fa-solid fa-book-open-reader"></i>
              </span>
              <div>
                <strong>Review incorrect questions</strong>
                <small>Walk through each explanation in the Review Center.</small>
              </div>
              <Link href="#" className="lms-btn ghost sm">Open</Link>
            </li>
            <li>
              <span className="qres-topic-ic purple">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </span>
              <div>
                <strong>Run an AI gap drill</strong>
                <small>Personalised 25-question set on weakest topics.</small>
              </div>
              <Link href="#" className="lms-btn ghost sm">Start</Link>
            </li>
            <li>
              <span className="qres-topic-ic orange">
                <i className="fa-solid fa-file-pen"></i>
              </span>
              <div>
                <strong>Take the next mock</strong>
                <small>Paper {Math.min(paper + 1, TOTAL_PAPERS)} of {TOTAL_PAPERS} is ready.</small>
              </div>
              <Link
                href={`/lms/pmp/mock-exam/${Math.min(paper + 1, TOTAL_PAPERS)}`}
                className="lms-btn primary sm"
              >
                Start <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </article>

        <article className="mxres-tip">
          <span className="mxres-tip-ic">
            <i className="fa-solid fa-lightbulb"></i>
          </span>
          <div>
            <strong>Smart Tip</strong>
            <p>
              Your weakest area is Process. Schedule a 25-question drill within
              48 hours — early reinforcement boosts retention by ~30%.
            </p>
          </div>
        </article>
      </section>

      <section className="mxres-cta">
        <Link href="/dashboard/progress" className="lms-btn ghost">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </Link>
        <small className="mxres-saved">
          <i className="fa-solid fa-cloud-arrow-up"></i> Your results have been saved automatically
        </small>
        <Link
          href={`/lms/pmp/mock-exam/${Math.min(paper + 1, TOTAL_PAPERS)}`}
          className="lms-btn primary"
        >
          Start Paper {Math.min(paper + 1, TOTAL_PAPERS)} <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>
    </LmsFrame>
  );
}
