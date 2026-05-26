import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Params = { params: { slug: string; paperId: string } };

const TOTAL_PAPERS = 6;

export default function MockIntroPage({ params }: Params) {
  const paper = Number.parseInt(params.paperId, 10) || 1;

  return (
    <LmsFrame
      active="Mock Exams"
      crumbs={[{ label: "Back to Exam Preparation", href: "/lms/pmp" }]}
      title="Mock Exams"
      subtitle="Simulate the real exam environment and build confidence"
    >
      {/* Hero card */}
      <section className="mxi-hero">
        <span className="mxi-hero-ic">
          <i className="fa-solid fa-file-pen"></i>
        </span>
        <small className="mxi-hero-eyebrow">You&apos;re about to start</small>
        <h2>Paper {paper} of {TOTAL_PAPERS}</h2>
        <span className="mxi-hero-badge">
          <i className="fa-solid fa-bolt"></i> Mock Exam
        </span>
        <p>Full-length mock exam aligned to the PMP® exam.</p>
      </section>

      {/* Stat tiles */}
      <section className="mxi-stats">
        <div className="mxi-stat">
          <span className="mxi-stat-ic blue">
            <i className="fa-solid fa-clipboard-question"></i>
          </span>
          <small>Total Questions</small>
          <strong>180</strong>
          <span className="mxi-stat-note">Multiple choice</span>
        </div>
        <div className="mxi-stat">
          <span className="mxi-stat-ic orange">
            <i className="fa-regular fa-clock"></i>
          </span>
          <small>Time Limit</small>
          <strong>230 minutes</strong>
          <span className="mxi-stat-note">No pauses allowed</span>
        </div>
        <div className="mxi-stat">
          <span className="mxi-stat-ic green">
            <i className="fa-solid fa-book"></i>
          </span>
          <small>Exam Format</small>
          <strong>Closed-book</strong>
          <span className="mxi-stat-note">No resources allowed</span>
        </div>
        <div className="mxi-stat">
          <span className="mxi-stat-ic purple">
            <i className="fa-solid fa-file-lines"></i>
          </span>
          <small>Paper</small>
          <strong>{paper} of {TOTAL_PAPERS}</strong>
          <span className="mxi-stat-note">PMP® Gold Access</span>
        </div>
      </section>

      {/* Warning banner */}
      <section className="mxi-warn">
        <span className="mxi-warn-ic">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </span>
        <div>
          <strong>Once you begin, the timer cannot be paused or stopped.</strong>
          <p>
            Make sure you have enough time and won&apos;t be interrupted before
            you start.
          </p>
        </div>
      </section>

      {/* Before you begin */}
      <section className="mxi-check">
        <h3>Before you begin</h3>
        <ul>
          <li>
            <span className="mxi-check-ic">
              <i className="fa-solid fa-volume-xmark"></i>
            </span>
            <div>
              <strong>Find a quiet place</strong>
              <small>Minimise distractions for the next 230 minutes.</small>
            </div>
            <i className="fa-solid fa-circle-check mxi-tick"></i>
          </li>
          <li>
            <span className="mxi-check-ic">
              <i className="fa-solid fa-plug"></i>
            </span>
            <div>
              <strong>Ensure your device is charged</strong>
              <small>Stable power and internet keep your session safe.</small>
            </div>
            <i className="fa-solid fa-circle-check mxi-tick"></i>
          </li>
          <li>
            <span className="mxi-check-ic">
              <i className="fa-solid fa-ban"></i>
            </span>
            <div>
              <strong>Do not refresh or close the tab</strong>
              <small>Use the in-app navigation only while the exam is live.</small>
            </div>
            <i className="fa-solid fa-circle-check mxi-tick"></i>
          </li>
        </ul>
      </section>

      {/* Footer CTA row */}
      <section className="mxi-foot">
        <Link href="/lms/pmp" className="lms-btn ghost">
          <i className="fa-solid fa-arrow-left"></i> Back to Mock Exams
        </Link>
        <small className="mxi-foot-note">
          <i className="fa-solid fa-cloud-arrow-up"></i> Your progress will be saved automatically
        </small>
        <Link
          href={`/lms/pmp/mock-exam/${paper}/run`}
          className="lms-btn primary lg"
        >
          <i className="fa-solid fa-play"></i> Start Exam <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </section>
    </LmsFrame>
  );
}
