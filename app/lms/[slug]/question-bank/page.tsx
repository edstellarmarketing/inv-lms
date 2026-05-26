import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Topic = {
  slug: string;
  name: string;
  desc: string;
  icon: string;
  tone: "purple" | "orange" | "green" | "pink" | "blue" | "indigo";
  total: number;
  attempted: number;
  accuracy: number | null;
  band: "high" | "medium" | "low";
};

const topics: Topic[] = [
  {
    slug: "people",
    name: "People",
    desc: "Team leadership, conflict, collaboration",
    icon: "fa-solid fa-users",
    tone: "purple",
    total: 510,
    attempted: 0,
    accuracy: null,
    band: "high",
  },
  {
    slug: "process",
    name: "Process",
    desc: "Planning, execution, schedule and cost",
    icon: "fa-solid fa-diagram-project",
    tone: "orange",
    total: 870,
    attempted: 0,
    accuracy: null,
    band: "high",
  },
  {
    slug: "business-environment",
    name: "Business Environment",
    desc: "Compliance, value delivery, change",
    icon: "fa-solid fa-briefcase",
    tone: "green",
    total: 240,
    attempted: 0,
    accuracy: null,
    band: "high",
  },
  {
    slug: "domain-people",
    name: "Domain — People",
    desc: "Servant leadership case studies",
    icon: "fa-solid fa-user-group",
    tone: "pink",
    total: 200,
    attempted: 0,
    accuracy: null,
    band: "medium",
  },
  {
    slug: "domain-process",
    name: "Domain — Process",
    desc: "Process Groups scenario practice",
    icon: "fa-solid fa-list-check",
    tone: "blue",
    total: 340,
    attempted: 0,
    accuracy: null,
    band: "high",
  },
  {
    slug: "domain-business",
    name: "Domain — Business Environment",
    desc: "Strategic alignment and benefits realisation",
    icon: "fa-solid fa-globe",
    tone: "indigo",
    total: 230,
    attempted: 0,
    accuracy: null,
    band: "high",
  },
];

const totalQs = topics.reduce((s, t) => s + t.total, 0);
const totalAttempted = topics.reduce((s, t) => s + t.attempted, 0);

function bandLabel(b: Topic["band"]) {
  if (b === "high") return "High (200+)";
  if (b === "medium") return "Medium (100–200)";
  return "Low (<100)";
}

export default function QuestionBankPickerPage() {
  return (
    <LmsFrame
      active="Practice & Quizzes"
      crumbs={[
        { label: "Back to Exam Preparation", href: "/lms/pmp" },
      ]}
      title="Question Bank"
      subtitle="Practice questions by topic to strengthen your understanding"
    >
      {/* Mixed Practice hero / configurator */}
      <section className="qb-mix">
        <div className="qb-mix-head">
          <div className="qb-mix-title">
            <span className="qb-mix-ic">
              <i className="fa-solid fa-shuffle"></i>
            </span>
            <div>
              <strong>Mixed Practice (All Topics)</strong>
              <small>Test yourself with a balanced mix from every cluster</small>
            </div>
          </div>
          <div className="qb-mix-stats">
            <div className="qb-mix-stat">
              <small>Total Questions</small>
              <strong>{totalQs.toLocaleString()}</strong>
            </div>
            <div className="qb-mix-stat">
              <small>Attempted</small>
              <strong>{totalAttempted}</strong>
            </div>
            <div className="qb-mix-stat">
              <small>Avg Accuracy</small>
              <strong className="muted-strong">—</strong>
            </div>
            <Link href="/lms/pmp/question-bank/session/s1" className="lms-btn primary">
              <i className="fa-solid fa-play"></i> Start Practice
            </Link>
          </div>
        </div>

        <div className="qb-mix-controls">
          <div className="qb-mix-row">
            <span className="qb-mix-label">Difficulty</span>
            <div className="qb-pills">
              <button className="qb-pill active">All</button>
              <button className="qb-pill">Easy</button>
              <button className="qb-pill">Medium</button>
              <button className="qb-pill">Hard</button>
            </div>
            <label className="qb-only-wrong">
              <input type="checkbox" />
              <span>Only Questions I Got Wrong</span>
            </label>
          </div>
        </div>
      </section>

      {/* Cluster section header */}
      <section className="qb-cluster-head">
        <div>
          <h3>All Topic Clusters</h3>
          <small>Drill into a specific knowledge area</small>
        </div>
        <div className="qb-legend">
          <span className="qb-dot high" /> High (200+)
          <span className="qb-dot medium" /> Medium (100–200)
          <span className="qb-dot low" /> Low (&lt;100)
        </div>
        <div className="qb-cluster-sums">
          <div>
            <small>Total Available</small>
            <strong>{totalQs.toLocaleString()}</strong>
          </div>
          <div>
            <small>Overall Accuracy</small>
            <strong className="muted-strong">—</strong>
          </div>
        </div>
      </section>

      {/* Cluster table */}
      <section className="qb-table">
        <header className="qb-tr qb-th">
          <span>Topic Cluster</span>
          <span>Total Q&apos;s</span>
          <span>Attempted</span>
          <span>Accuracy</span>
          <span></span>
        </header>
        {topics.map((t) => (
          <article key={t.slug} className="qb-tr qb-row">
            <div className="qb-topic">
              <span className={`qb-topic-ic ${t.tone}`}>
                <i className={t.icon}></i>
              </span>
              <div>
                <strong>{t.name}</strong>
                <small>{t.desc}</small>
              </div>
            </div>
            <div className="qb-val">
              <strong>{t.total.toLocaleString()}</strong>
              <span className={`qb-band ${t.band}`}>{bandLabel(t.band)}</span>
            </div>
            <div className="qb-val">
              <strong>{t.attempted}</strong>
              <small>{t.total} remaining</small>
            </div>
            <div className="qb-val">
              <strong className="muted-strong">
                {t.accuracy === null ? "—" : `${t.accuracy}%`}
              </strong>
              <small>Per cluster</small>
            </div>
            <div className="qb-actions">
              <div className="qb-len">
                <span className="qb-len-label">Length</span>
                <div className="qb-len-pills">
                  <button className="qb-len-pill">10</button>
                  <button className="qb-len-pill active">25</button>
                  <button className="qb-len-pill">50</button>
                  <button className="qb-len-pill">100</button>
                </div>
              </div>
              <Link
                href={`/lms/pmp/question-bank/session/${t.slug}`}
                className="lms-btn primary sm"
              >
                <i className="fa-solid fa-play"></i> Start Practice
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Footer cards */}
      <section className="qb-foot">
        <div className="qb-tip">
          <span className="qb-tip-ic">
            <i className="fa-solid fa-lightbulb"></i>
          </span>
          <div>
            <strong>Smart Practice Tip</strong>
            <p>
              Mix short focused sessions (10–25 questions) with a weekly 50-question
              review block. Spaced retrieval beats marathon cramming for long-term
              recall on the exam.
            </p>
          </div>
        </div>
        <div className="qb-track">
          <span className="qb-track-ic">
            <i className="fa-solid fa-chart-line"></i>
          </span>
          <div>
            <strong>Track your progress</strong>
            <p>
              Every attempt feeds your readiness score and personalised drill set
              under <em>My Learning</em>.
            </p>
            <Link href="/dashboard" className="qb-track-link">
              Open dashboard <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </LmsFrame>
  );
}
