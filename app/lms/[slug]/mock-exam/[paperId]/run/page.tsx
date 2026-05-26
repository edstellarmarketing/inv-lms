import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

type Cell = "current" | "answered" | "flagged" | "blank" | "review";

type Params = { params: { slug: string; paperId: string } };

const TOTAL_PAPERS = 6;
const VISIBLE_CELLS = 30;
const CURRENT_Q = 5;

function buildCells(): Cell[] {
  const out: Cell[] = [];
  for (let i = 1; i <= VISIBLE_CELLS; i += 1) {
    if (i === CURRENT_Q) out.push("current");
    else if (i <= 4) out.push("answered");
    else if (i === 8) out.push("flagged");
    else if (i === 12 || i === 18) out.push("review");
    else if (i <= 10) out.push("answered");
    else out.push("blank");
  }
  return out;
}

const cells = buildCells();

export default function MockRunnerPage({ params }: Params) {
  const paper = Number.parseInt(params.paperId, 10) || 1;

  return (
    <LmsFrame
      active="Mock Exams"
      crumbs={[{ label: "Back to Mock Exams", href: `/lms/pmp/mock-exam/${paper}` }]}
      title={`Mock Exam — Paper ${paper} of ${TOTAL_PAPERS}`}
      right={
        <div className="mxr-head-right">
          <span className="mxr-status">
            <i className="fa-solid fa-circle"></i> In progress
          </span>
          <span className="mxr-saved">
            <i className="fa-solid fa-cloud-arrow-up"></i> Saved automatically
          </span>
          <div className="mxr-timer">
            <small>Time Remaining</small>
            <strong>02:53:18</strong>
          </div>
        </div>
      }
    >
      {/* Cluster chips */}
      <section className="mxr-chips">
        <div className="mxr-trail">
          <span className="qrun-chip strong">People</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="qrun-chip">Domain — People</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="qrun-chip">Manage Team</span>
        </div>
      </section>

      {/* Main + right rail */}
      <section className="mxr-grid">
        <div className="mxr-main">
          <article className="mxr-q">
            <header className="mxr-q-head">
              <span className="mxr-q-num">Question {CURRENT_Q} of 180</span>
              <span className="mxr-q-domain">Domain · People</span>
            </header>

            <p className="mxr-stem">
              A project manager is leading a virtual team with members in different
              time zones. What should the project manager do <strong>FIRST</strong>
              {" "}to ensure effective collaboration?
            </p>

            <ul className="qrun-opts">
              <li>
                <label>
                  <input type="radio" name="mxr-opt" />
                  <span className="qrun-letter">A</span>
                  <span>Establish communication channels and set expectations for response times.</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="mxr-opt" />
                  <span className="qrun-letter">B</span>
                  <span>Schedule daily stand-up meetings with all team members.</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="mxr-opt" />
                  <span className="qrun-letter">C</span>
                  <span>Create a detailed project schedule with all time-zone considerations.</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="mxr-opt" />
                  <span className="qrun-letter">D</span>
                  <span>Assign a team member in each location as the point of contact.</span>
                </label>
              </li>
            </ul>

            <details className="mxr-hint">
              <summary>
                <span><i className="fa-solid fa-lightbulb"></i> Why this matters</span>
                <i className="fa-solid fa-chevron-down"></i>
              </summary>
              <p>
                Establishing communication channels and setting clear expectations
                is the foundation for effective collaboration — especially in
                distributed teams. The PMBOK People Performance Domain prioritises
                this step before scheduling or structural decisions.
              </p>
              <div className="mxr-hint-meta">
                <span><i className="fa-solid fa-book-open-reader"></i> PMBOK Guide · People Performance Domain</span>
                <span><i className="fa-solid fa-tag"></i> Difficulty · MPCL</span>
              </div>
            </details>
          </article>

          <div className="mxr-foot">
            <button className="lms-btn ghost">
              <i className="fa-solid fa-arrow-left"></i> Previous
            </button>
            <small className="mxr-foot-progress">Question {CURRENT_Q} of 180</small>
            <button className="lms-btn primary">
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Right rail */}
        <aside className="mxr-side">
          <div className="mxr-side-card">
            <div className="mxr-tabs">
              <button className="mxr-tab active">Questions</button>
              <button className="mxr-tab">Legend</button>
            </div>

            <ul className="mxr-stats">
              <li>
                <span className="mxr-stat-dot answered"></span>
                <small>Answered</small>
                <b>4</b>
              </li>
              <li>
                <span className="mxr-stat-dot flagged"></span>
                <small>Flagged</small>
                <b>1</b>
              </li>
              <li>
                <span className="mxr-stat-dot blank"></span>
                <small>Not answered</small>
                <b>173</b>
              </li>
              <li>
                <span className="mxr-stat-dot review"></span>
                <small>Marked for review</small>
                <b>2</b>
              </li>
            </ul>

            <div className="mxr-nav-head">
              <strong>Question Navigator</strong>
              <small>1 – 30 of 180</small>
            </div>

            <div className="mxr-cells">
              {cells.map((c, i) => (
                <button key={i} className={`mxr-cell ${c}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <Link href="#" className="mxr-review">
            <span className="mxr-review-ic">
              <i className="fa-regular fa-flag"></i>
            </span>
            <div>
              <strong>Review Center</strong>
              <small>View all flagged &amp; marked</small>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>

          <div className="mxr-progress">
            <div className="mxr-progress-head">
              <strong>Exam Progress</strong>
              <span>4 / 180</span>
            </div>
            <div className="mxr-bar">
              <span style={{ width: "2.2%" }} />
            </div>
            <small className="mxr-progress-note">
              2% completed · keep going
            </small>
          </div>

          <a href="#submit" className="lms-btn danger block">
            <i className="fa-solid fa-flag-checkered"></i> Submit Exam
          </a>
        </aside>
      </section>

      {/* Submit confirmation overlay */}
      <div id="submit" className="mxs-wrap" role="dialog" aria-modal="true">
        <a href="#" className="mxs-bg" aria-label="Close"></a>
        <div className="mxs-card">
          <button type="button" className="mxs-close" aria-label="Close">
            <a href="#"><i className="fa-solid fa-xmark"></i></a>
          </button>

          <span className="mxs-ic">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>

          <h3>Submit your mock exam?</h3>
          <p>Once submitted you cannot change your answers.</p>

          <ul className="mxs-list">
            <li>
              <span className="mxs-dot red"></span>
              <div>
                <strong>You have 173 questions unanswered</strong>
                <small>They will be marked as incorrect on submission.</small>
              </div>
            </li>
            <li>
              <span className="mxs-dot amber"></span>
              <div>
                <strong>1 question is flagged for review</strong>
                <small>You can revisit flagged items before submitting.</small>
              </div>
            </li>
          </ul>

          <p className="mxs-confirm">Submit anyway?</p>

          <div className="mxs-actions">
            <a href="#" className="lms-btn ghost">
              <i className="fa-solid fa-arrow-left"></i> Go back
            </a>
            <Link href={`/lms/pmp/mock-exam/${paper}/result`} className="lms-btn danger">
              Submit and see results <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </LmsFrame>
  );
}
