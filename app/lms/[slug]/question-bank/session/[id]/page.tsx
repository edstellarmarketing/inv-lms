import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

type Cell = "current" | "answered" | "flagged" | "blank";
const cells: Cell[] = [
  "answered","answered","flagged","answered","current",
  "blank","blank","flagged","blank","blank",
  "blank","blank","blank","blank","blank",
  "blank","blank","blank","blank","blank",
  "blank","blank","blank","blank","blank",
];

export default function QbankRunnerPage() {
  return (
    <LmsFrame
      active="Practice & Quizzes"
      crumbs={[
        { label: "Back to Question Bank", href: "/lms/pmp/question-bank" },
      ]}
      title="Practice Session"
      subtitle="Stay focused — your stats update as you answer"
      right={
        <div className="qrun-head-cta">
          <button className="lms-btn ghost sm">
            <i className="fa-solid fa-arrow-left"></i> Previous
          </button>
          <Link href="/lms/pmp/question-bank/session/s1/result" className="lms-btn primary sm">
            Next Question <i className="fa-solid fa-arrow-right"></i>
          </Link>
          <button className="lms-btn ghost sm">
            <i className="fa-solid fa-pause"></i> Pause
          </button>
          <Link href="/lms/pmp/question-bank/session/s1/result" className="lms-btn danger sm">
            <i className="fa-solid fa-stop"></i> End Session
          </Link>
        </div>
      }
    >
      {/* KPI row */}
      <section className="qrun-kpis">
        <div className="qrun-kpi">
          <span className="qrun-kpi-ic blue"><i className="fa-solid fa-circle-question"></i></span>
          <div>
            <small>Question</small>
            <strong>5 of 25</strong>
          </div>
        </div>
        <div className="qrun-kpi">
          <span className="qrun-kpi-ic orange"><i className="fa-solid fa-gauge-high"></i></span>
          <div>
            <small>Difficulty</small>
            <strong>Medium</strong>
          </div>
        </div>
        <div className="qrun-kpi">
          <span className="qrun-kpi-ic green"><i className="fa-solid fa-bullseye"></i></span>
          <div>
            <small>Accuracy</small>
            <strong>60%</strong>
          </div>
        </div>
        <div className="qrun-kpi timer">
          <span className="qrun-kpi-ic"><i className="fa-regular fa-clock"></i></span>
          <div>
            <small>Time Remaining</small>
            <strong>17:18</strong>
          </div>
        </div>
      </section>

      {/* Cluster breadcrumb chips */}
      <section className="qrun-chips">
        <div className="qrun-trail">
          <span className="qrun-chip strong">People</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="qrun-chip">Domain — People</span>
          <i className="fa-solid fa-chevron-right"></i>
          <span className="qrun-chip">Manage Team</span>
        </div>
      </section>

      {/* Main + right rail */}
      <section className="qrun-grid">
        <div className="qrun-main">
          <article className="qrun-card">
            <p className="qrun-stem">
              A project manager notices that a key team member has become
              disengaged and is missing deadlines. What should the project
              manager do <strong>FIRST</strong>?
            </p>

            <ul className="qrun-opts">
              <li>
                <label>
                  <input type="radio" name="opt" />
                  <span className="qrun-letter">A</span>
                  <span>Escalate the issue to the functional manager.</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="opt" />
                  <span className="qrun-letter">B</span>
                  <span>Reassign the individual&apos;s tasks to other team members.</span>
                </label>
              </li>
              <li className="chosen correct">
                <label>
                  <input type="radio" name="opt" defaultChecked />
                  <span className="qrun-letter">C</span>
                  <span>Schedule a one-on-one conversation to understand the issue.</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="radio" name="opt" />
                  <span className="qrun-letter">D</span>
                  <span>Issue a formal warning and escalate to the sponsor.</span>
                </label>
              </li>
            </ul>
          </article>

          {/* Explanation block */}
          <article className="qrun-explain">
            <span className="qrun-badge"><i className="fa-solid fa-check"></i> Correct Answer · C</span>

            <div className="qrun-explain-body">
              <div className="qrun-explain-text">
                <p>
                  The first step should be to discuss the issue
                  {" "}<strong>privately with the team member</strong> to understand
                  the root cause. A one-to-one conversation surfaces the underlying
                  blocker (personal, technical or process) and preserves the team
                  relationship before any escalation or workload re-balancing.
                </p>

                <dl className="qrun-meta">
                  <div>
                    <dt>Related Study Guide:</dt>
                    <dd>
                      <Link href="/lms/pmp/study-guide/pmbok-7">
                        PMBOK Guide 7th Ed. — Chapter 2.3, People Performance Domain
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt>Topic Performance:</dt>
                    <dd>
                      <span className="qrun-perf">67% accuracy</span> across 18 attempts on this sub-topic
                    </dd>
                  </div>
                </dl>
              </div>

              <aside className="qrun-explain-illus">
                <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="0" y="0" width="160" height="120" rx="10" fill="#eaf1ff" />
                  <rect x="14" y="18" width="60" height="38" rx="4" fill="#dbeafe" />
                  <rect x="22" y="26" width="44" height="6" rx="2" fill="#bfdbfe" />
                  <rect x="22" y="36" width="32" height="6" rx="2" fill="#bfdbfe" />
                  <rect x="22" y="46" width="24" height="4" rx="2" fill="#bfdbfe" />
                  <circle cx="56" cy="80" r="10" fill="#7c3aed" />
                  <rect x="46" y="90" width="20" height="22" rx="6" fill="#7c3aed" />
                  <circle cx="96" cy="80" r="10" fill="#2563eb" />
                  <rect x="86" y="90" width="20" height="22" rx="6" fill="#2563eb" />
                  <path d="M66 96 Q80 90 88 96" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="135" cy="32" r="6" fill="#fde047" />
                  <circle cx="138" cy="50" r="3" fill="#16a34a" />
                </svg>
              </aside>
            </div>

            <footer>
              <Link href="#" className="lms-btn ghost sm">
                <i className="fa-solid fa-robot"></i> Open in PMP Mentor <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </footer>
          </article>

        </div>

        {/* Right rail */}
        <aside className="qrun-side">
          <div className="qrun-card-side">
            <strong>Questions</strong>
            <div className="qrun-cells">
              {cells.map((c, i) => (
                <span key={i} className={`qrun-cell ${c}`}>{i + 1}</span>
              ))}
            </div>
            <div className="qrun-legend">
              <span><i className="qrun-dot answered" /> Answered</span>
              <span><i className="qrun-dot flagged" /> Flagged</span>
              <span><i className="qrun-dot blank" /> Blank</span>
            </div>
          </div>

          <div className="qrun-card-side">
            <strong>Session Overview</strong>
            <ul className="qrun-overview">
              <li><span>Answered</span><b>5 / 25</b></li>
              <li><span>Correct</span><b className="ok">3</b></li>
              <li><span>Time per Q</span><b>1m 32s</b></li>
              <li><span>Flagged</span><b className="warn">1</b></li>
            </ul>
          </div>

        </aside>
      </section>
    </LmsFrame>
  );
}
