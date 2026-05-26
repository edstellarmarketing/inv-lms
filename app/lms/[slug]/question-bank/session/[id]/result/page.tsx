import Link from "next/link";
import LmsFrame from "../../../../../components/LmsFrame";

type ClusterRow = {
  name: string;
  tone: "purple" | "orange" | "green" | "pink" | "blue" | "indigo";
  icon: string;
  total: number;
  answered: number;
  correct: number;
};

const clusters: ClusterRow[] = [
  { name: "People", tone: "purple", icon: "fa-solid fa-users", total: 7, answered: 7, correct: 6 },
  { name: "Process", tone: "orange", icon: "fa-solid fa-diagram-project", total: 8, answered: 8, correct: 5 },
  { name: "Business Environment", tone: "green", icon: "fa-solid fa-briefcase", total: 4, answered: 4, correct: 3 },
  { name: "Domain — People", tone: "pink", icon: "fa-solid fa-user-group", total: 3, answered: 3, correct: 2 },
  { name: "Domain — Business Env.", tone: "indigo", icon: "fa-solid fa-globe", total: 3, answered: 3, correct: 2 },
];

type ReviewRow = {
  n: number;
  cluster: string;
  snippet: string;
  your: "A" | "B" | "C" | "D";
  correct: "A" | "B" | "C" | "D";
  time: string;
};

const reviews: ReviewRow[] = [
  { n: 2, cluster: "Process", snippet: "During execution, a stakeholder asks for an out-of-scope feature…", your: "B", correct: "C", time: "1:42" },
  { n: 6, cluster: "Process", snippet: "Earned Value: CPI is 0.92 and SPI is 1.05. What does the variance mean?", your: "C", correct: "A", time: "2:08" },
  { n: 8, cluster: "Business Env.", snippet: "A regulatory change introduces new reporting requirements mid-project…", your: "A", correct: "C", time: "1:55" },
  { n: 11, cluster: "Domain — People", snippet: "A high-performer disagrees with a sprint priority…", your: "D", correct: "B", time: "1:21" },
  { n: 14, cluster: "Process", snippet: "Risk response: a known high-impact threat materialises…", your: "B", correct: "D", time: "0:58" },
  { n: 18, cluster: "People", snippet: "A virtual team is missing daily stand-ups due to time-zones…", your: "C", correct: "A", time: "2:15" },
  { n: 22, cluster: "Domain — Business Env.", snippet: "A benefits realisation review shows underperformance…", your: "D", correct: "B", time: "1:08" },
];

const improvements = [
  { name: "Business Environment", tone: "green", icon: "fa-solid fa-briefcase", note: "Focus on compliance and value-delivery scenarios" },
  { name: "Process", tone: "orange", icon: "fa-solid fa-diagram-project", note: "Drill Earned Value and risk response analysis" },
  { name: "People", tone: "purple", icon: "fa-solid fa-users", note: "Review conflict resolution priority order" },
];

const totals = clusters.reduce(
  (acc, c) => ({
    total: acc.total + c.total,
    answered: acc.answered + c.answered,
    correct: acc.correct + c.correct,
  }),
  { total: 0, answered: 0, correct: 0 },
);
const pct = Math.round((totals.correct / totals.total) * 100);
const incorrect = totals.answered - totals.correct;
const correctDeg = (totals.correct / totals.answered) * 360;
const incorrectDeg = correctDeg + (incorrect / totals.answered) * 360;

export default function QbankResultPage() {
  return (
    <LmsFrame
      active="Practice & Quizzes"
      crumbs={[
        { label: "Back to Question Bank", href: "/lms/pmp/question-bank" },
      ]}
      title="Practice Session Results"
      subtitle="Great effort — here is your performance and where to focus next"
      right={
        <Link href="/lms/pmp/question-bank/session/s1" className="lms-btn primary">
          <i className="fa-solid fa-play"></i> Start New Session
        </Link>
      }
    >
      {/* KPI strip */}
      <section className="qres-kpis">
        <div className="qres-kpi accent">
          <span className="qres-kpi-ic"><i className="fa-solid fa-trophy"></i></span>
          <div>
            <small>Score</small>
            <strong>{pct}%</strong>
          </div>
        </div>
        <div className="qres-kpi">
          <span className="qres-kpi-ic green"><i className="fa-solid fa-check"></i></span>
          <div>
            <small>Questions Correct</small>
            <strong>{totals.correct} / {totals.total}</strong>
          </div>
        </div>
        <div className="qres-kpi">
          <span className="qres-kpi-ic blue"><i className="fa-solid fa-bullseye"></i></span>
          <div>
            <small>Accuracy</small>
            <strong>{pct}%</strong>
          </div>
        </div>
        <div className="qres-kpi">
          <span className="qres-kpi-ic purple"><i className="fa-regular fa-clock"></i></span>
          <div>
            <small>Time Taken</small>
            <strong>18:42</strong>
          </div>
        </div>
        <div className="qres-kpi">
          <span className="qres-kpi-ic orange"><i className="fa-solid fa-gauge-high"></i></span>
          <div>
            <small>Difficulty</small>
            <strong>Medium</strong>
          </div>
        </div>
        <div className="qres-kpi">
          <span className="qres-kpi-ic pink"><i className="fa-regular fa-calendar"></i></span>
          <div>
            <small>Completed On</small>
            <strong>May 18, 2025</strong>
          </div>
        </div>
      </section>

      {/* Per-cluster table + Overall summary */}
      <section className="qres-grid">
        <article className="qres-card">
          <header className="qres-card-head">
            <div>
              <h3>Performance by Topic Cluster</h3>
              <small>How you scored across the PMP® domains</small>
            </div>
            <Link href="#" className="qres-link">
              View full topic performance <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </header>

          <div className="qres-table">
            <div className="qres-th">
              <span>Topic Cluster</span>
              <span>Total</span>
              <span>Answered</span>
              <span>Correct</span>
              <span>Accuracy</span>
            </div>
            {clusters.map((c) => {
              const acc = Math.round((c.correct / c.total) * 100);
              return (
                <div key={c.name} className="qres-tr">
                  <div className="qres-topic">
                    <span className={`qres-topic-ic ${c.tone}`}>
                      <i className={c.icon}></i>
                    </span>
                    <strong>{c.name}</strong>
                  </div>
                  <span className="qres-num">{c.total}</span>
                  <span className="qres-num">{c.answered}</span>
                  <span className="qres-num">{c.correct}</span>
                  <div className="qres-acc">
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

        <article className="qres-summary">
          <header>
            <h3>Overall Summary</h3>
            <small>Based on {totals.answered} answered questions</small>
          </header>
          <div
            className="qres-donut"
            style={{
              background: `conic-gradient(
                #16a34a 0deg ${correctDeg}deg,
                #ef4444 ${correctDeg}deg ${incorrectDeg}deg,
                #f59e0b ${incorrectDeg}deg 360deg
              )`,
            }}
          >
            <div className="qres-donut-hole">
              <strong>{totals.answered}</strong>
              <small>questions</small>
            </div>
          </div>
          <ul className="qres-legend">
            <li><i className="qres-dot ok" /><span>Correct</span><b>{totals.correct}</b></li>
            <li><i className="qres-dot bad" /><span>Incorrect</span><b>{incorrect}</b></li>
            <li><i className="qres-dot flag" /><span>Flagged for review</span><b>2</b></li>
          </ul>
          <div className="qres-msg">
            <i className="fa-solid fa-circle-info"></i>
            <p>
              You are on the right track. Keep this cadence — focus your next session
              on the clusters below to lift your readiness score above 80%.
            </p>
          </div>
        </article>
      </section>

      {/* Questions to review + Top areas */}
      <section className="qres-grid-2">
        <article className="qres-card">
          <header className="qres-card-head">
            <div>
              <h3>Questions to Review · Session #1</h3>
              <small>{reviews.length} flagged or incorrect answers</small>
            </div>
            <button className="qres-link">
              Show all <i className="fa-solid fa-arrow-right"></i>
            </button>
          </header>

          <div className="qres-rtable">
            <div className="qres-rth">
              <span>#</span>
              <span>Cluster</span>
              <span>Question snippet</span>
              <span>Your answer</span>
              <span>Correct</span>
              <span>Time</span>
              <span>Action</span>
            </div>
            {reviews.map((r) => (
              <div key={r.n} className="qres-rtr">
                <span className="qres-rn">{r.n.toString().padStart(2, "0")}</span>
                <span className="qres-rcluster">{r.cluster}</span>
                <span className="qres-rsnippet">{r.snippet}</span>
                <span className="qres-letter bad">{r.your}</span>
                <span className="qres-letter ok">{r.correct}</span>
                <span className="qres-rtime">{r.time}</span>
                <Link href="#" className="qres-rlink">
                  Review <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </article>

        <article className="qres-side">
          <h3>Top Areas to Improve</h3>
          <ul className="qres-imp">
            {improvements.map((i) => (
              <li key={i.name}>
                <span className={`qres-topic-ic ${i.tone}`}>
                  <i className={i.icon}></i>
                </span>
                <div>
                  <strong>{i.name}</strong>
                  <small>{i.note}</small>
                </div>
                <Link href="/lms/pmp/question-bank" className="qres-imp-go">
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </li>
            ))}
          </ul>

          <div className="qres-tip">
            <span className="qres-tip-ic">
              <i className="fa-solid fa-lightbulb"></i>
            </span>
            <div>
              <strong>Smart Tip</strong>
              <p>
                Schedule a 25-question drill on Business Environment within the next
                48 hours — early reinforcement boosts retention by ~30%.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Bottom CTA row */}
      <section className="qres-cta-row">
        <Link href="/dashboard/progress" className="lms-btn ghost">
          <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
        </Link>
        <Link href="/lms/pmp/question-bank" className="lms-btn ghost">
          <i className="fa-solid fa-folder-open"></i> Back to Question Bank
        </Link>
        <Link href="/lms/pmp/question-bank/session/s1" className="lms-btn ghost">
          <i className="fa-solid fa-arrow-rotate-right"></i> Practise Again
        </Link>
        <Link href="/lms/pmp/mock-exam/1" className="lms-btn ghost">
          <i className="fa-solid fa-file-pen"></i> Try a Mock Exam
        </Link>
        <Link href="/lms/pmp/question-bank/session/s1" className="lms-btn primary">
          <i className="fa-solid fa-play"></i> Start New Session
        </Link>
      </section>
    </LmsFrame>
  );
}
