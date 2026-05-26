import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const allTerms = [
  { num: 1, name: "Acceptance Criteria" },
  { num: 2, name: "Agile", active: true },
  { num: 3, name: "Approved Change Request" },
  { num: 4, name: "Backlog" },
  { num: 5, name: "Baseline" },
  { num: 6, name: "Burndown Chart" },
  { num: 7, name: "Change Request" },
  { num: 8, name: "Critical Path" },
];

const relatedRefs = [
  { title: "Agile Foundation Overview", tone: "blue", icon: "fa-solid fa-bookmark", status: "Read", statusTone: "green" },
  { title: "Scrum Framework", tone: "purple", icon: "fa-solid fa-bookmark", status: "In Progress", statusTone: "orange" },
  { title: "Kanban Framework", tone: "green", icon: "fa-solid fa-bookmark", status: "Read", statusTone: "green" },
];

const relatedGuides = [
  { title: "Agile Practice Guide Study Guide", tone: "blue", icon: "fa-solid fa-book-open-reader", status: "In Progress", statusTone: "orange" },
  { title: "Scrum Framework Study Guide", tone: "purple", icon: "fa-solid fa-book-open-reader", status: "Not Started", statusTone: "slate" },
  { title: "Project Management Approaches", tone: "green", icon: "fa-solid fa-book-open-reader", status: "Read", statusTone: "green" },
];

export default function GlossaryPage() {
  return (
    <LmsFrame
      active="Resources"
      title="Glossary"
      subtitle="Key terms and definitions to strengthen your understanding"
      right={
        <Link href="/lms/pmp" className="ep-back">
          <i className="fa-solid fa-arrow-left"></i> Back to Exam Preparation
        </Link>
      }
    >
      <div className="gloss-grid">
        {/* Left rail */}
        <aside className="gloss-side">
          <div className="rcard-search small">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search glossary terms..." />
          </div>

          <div className="gloss-az">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
              <button key={l} className={"ABC".includes(l) ? "has" : ""}>
                {l}
              </button>
            ))}
          </div>

          <ul className="gloss-list">
            {allTerms.map((t) => (
              <li key={t.num} className={t.active ? "active" : ""}>
                <a href="#">
                  <span className="rcard-num sm">{t.num}</span>
                  <span>{t.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <button className="rcard-download">
            <i className="fa-solid fa-download"></i> Download glossary (PDF)
          </button>
        </aside>

        {/* Main content */}
        <article className="gloss-main">
          <div className="gloss-mhead">
            <div>
              <div className="gloss-title-row">
                <h2>Agile</h2>
                <span className="gloss-chip">
                  <i className="fa-solid fa-tag"></i> Agile Methodology
                </span>
              </div>
            </div>
            <button className="lms-btn primary sm">
              <i className="fa-solid fa-star"></i> Mark as learned
            </button>
          </div>

          <div className="gloss-content">
            <div className="gloss-left">
              <div className="gloss-keyidea">
                <div className="gloss-keyidea-head">
                  <span className="gloss-keyidea-ic"><i className="fa-solid fa-key"></i></span>
                  <strong>Key Idea</strong>
                </div>
                <p>
                  Agile is an iterative and incremental approach to project management
                  and product development that delivers value through short cycles,
                  enabling adaptability, customer collaboration, and continuous
                  feedback throughout the project lifecycle.
                </p>
              </div>

              <div className="gloss-examples">
                <strong>Examples</strong>
                <ul>
                  <li>
                    A software product team releasing a working increment every two
                    weeks rather than once a year.
                  </li>
                  <li>
                    A marketing squad running fortnightly experiments and reviewing
                    learnings in a sprint retrospective.
                  </li>
                  <li>
                    A construction project breaking the work into small phases, each
                    with its own demo and learning loop.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Agile cycle diagram */}
            <aside className="gloss-cycle">
              <h4>Agile Cycle</h4>
              <div className="agile-wheel" aria-hidden>
                <div className="aw-center">
                  Agile<br />Cycle
                </div>
                <span className="aw-node n-plan">
                  <i className="fa-solid fa-pencil"></i><small>Plan</small>
                </span>
                <span className="aw-node n-design">
                  <i className="fa-solid fa-compass-drafting"></i><small>Design</small>
                </span>
                <span className="aw-node n-develop">
                  <i className="fa-solid fa-code"></i><small>Develop</small>
                </span>
                <span className="aw-node n-test">
                  <i className="fa-solid fa-vial"></i><small>Test</small>
                </span>
                <span className="aw-node n-review">
                  <i className="fa-solid fa-magnifying-glass-chart"></i><small>Review</small>
                </span>
              </div>
            </aside>
          </div>

          {/* Related Reference Cards */}
          <section className="gloss-related">
            <div className="related-head">
              <h3>Related Reference Cards</h3>
              <Link href="/lms/pmp" className="ep-viewall">
                View all <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="related-grid">
              {relatedRefs.map((r) => (
                <Link key={r.title} href="#" className="related-card">
                  <span className={`related-icon ${r.tone}`}>
                    <i className={r.icon}></i>
                  </span>
                  <div>
                    <small>Reference Card</small>
                    <strong>{r.title}</strong>
                  </div>
                  <span className={`ep-status ${r.statusTone}`}>{r.status}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related Study Guides */}
          <section className="gloss-related">
            <div className="related-head">
              <h3>Related Study Guides</h3>
              <Link href="/lms/pmp" className="ep-viewall">
                View all <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="related-grid">
              {relatedGuides.map((r) => (
                <Link key={r.title} href="#" className="related-card">
                  <span className={`related-icon ${r.tone}`}>
                    <i className={r.icon}></i>
                  </span>
                  <div>
                    <small>Study Guide</small>
                    <strong>{r.title}</strong>
                  </div>
                  <span className={`ep-status ${r.statusTone}`}>{r.status}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Suggest a term */}
          <div className="gloss-suggest">
            <div>
              <strong>Didn&apos;t find the term you were looking for?</strong>
              <p>Let us know and we&apos;ll add it to the glossary.</p>
            </div>
            <button className="lms-btn primary">
              <i className="fa-solid fa-plus"></i> Suggest a Term
            </button>
          </div>
        </article>
      </div>
    </LmsFrame>
  );
}
