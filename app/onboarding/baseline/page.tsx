import Link from "next/link";
import OnboardingFrame from "../components/OnboardingFrame";

const facts = [
  { icon: "fa-solid fa-clipboard-question", title: "20 questions", desc: "Carefully selected across all knowledge areas." },
  { icon: "fa-regular fa-clock", title: "30 minutes", desc: "Take your time — no rush, no penalty." },
  { icon: "fa-solid fa-wand-magic-sparkles", title: "Helps personalise your plan", desc: "We use this to tune your study cadence." },
  { icon: "fa-solid fa-lock-open", title: "Free preview", desc: "No score is shared anywhere. It&apos;s just for you." },
];

export default function BaselinePage() {
  return (
    <OnboardingFrame
      step={3}
      backHref="/onboarding/exam-date"
      nextHref="/onboarding/complete"
      nextLabel="Start baseline test"
    >
      <div className="profile-card">
        <div className="ob-step-label">Step 3 of 4</div>
        <h2>Take a quick 20-question baseline</h2>
        <p className="muted">
          A short check-in to see where you stand today. This helps us shape your
          personalised study plan and recommend the right pace.
        </p>

        <div className="bl-grid">
          <div className="bl-left">
            <ul className="bl-list">
              {facts.map((f) => (
                <li key={f.title}>
                  <span className="bl-ic"><i className={f.icon}></i></span>
                  <div>
                    <strong>{f.title}</strong>
                    <p dangerouslySetInnerHTML={{ __html: f.desc }} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="bl-note">
              <i className="fa-solid fa-lightbulb"></i>
              <p>
                Don&apos;t worry about the score. The baseline is a starting point —
                you&apos;ll improve quickly with your personalised plan.
              </p>
            </div>
          </div>

          <div className="bl-right">
            <div className="bl-illus">
              <div className="bl-badge">20</div>
              <i className="fa-solid fa-file-pen"></i>
              <span className="bl-spark spark-1"></span>
              <span className="bl-spark spark-2"></span>
              <span className="bl-spark spark-3"></span>
            </div>
            <Link href="/onboarding/complete" className="bl-cta">
              <i className="fa-solid fa-play"></i> Start Baseline Test
            </Link>
            <Link href="/onboarding/complete" className="bl-skip">
              Skip baseline for now
            </Link>
          </div>
        </div>
      </div>
    </OnboardingFrame>
  );
}
