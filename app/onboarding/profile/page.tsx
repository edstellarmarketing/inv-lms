import OnboardingFrame from "../components/OnboardingFrame";

type Field = { label: string; icon: string; value: string };

const row1: Field[] = [
  { label: "What is your current role?", icon: "fa-solid fa-briefcase", value: "Project Manager" },
  { label: "How many years of experience do you have?", icon: "fa-solid fa-chart-simple", value: "5 - 10 years" },
  { label: "What is your primary domain / industry?", icon: "fa-solid fa-desktop", value: "IT / Software" },
];

const row2: Field[] = [
  { label: "How many hours can you study per week?", icon: "fa-regular fa-clock", value: "6 - 10 hours" },
  { label: "How would you rate your English proficiency?", icon: "fa-solid fa-globe", value: "Advanced" },
];

function Select({ f }: { f: Field }) {
  return (
    <label className="ob-field">
      <span className="ob-field-label">{f.label}</span>
      <div className="ob-select">
        <i className={f.icon}></i>
        <span>{f.value}</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </label>
  );
}

export default function ProfilePage() {
  return (
    <OnboardingFrame step={1} backHref="/welcome" nextHref="/onboarding/exam-date">
      <div className="profile-grid">
        <div className="profile-card">
          <div className="ob-step-label">Step 1 of 4</div>
          <h2>Let&apos;s start with your profile</h2>
          <p className="muted">
            This helps us recommend the right path, pace and resources for you.
          </p>

          <div className="ob-form-row three">
            {row1.map((f) => (
              <Select key={f.label} f={f} />
            ))}
          </div>

          <div className="ob-form-row two">
            {row2.map((f) => (
              <Select key={f.label} f={f} />
            ))}
          </div>

          <div className="ob-info">
            <span className="ob-info-icon">
              <i className="fa-solid fa-lock"></i>
            </span>
            <div>
              <strong>
                Don&apos;t worry, you can update these anytime from your profile settings.
              </strong>
              <p>
                This information is used only to personalize your learning experience.
              </p>
            </div>
          </div>
        </div>

        <aside className="why-card">
          <div className="why-illus">
            <i className="fa-solid fa-clipboard-list"></i>
          </div>
          <strong>Why we ask this?</strong>
          <p>
            Your answers help us personalize your learning plan and keep you on the
            right track.
          </p>
        </aside>
      </div>
    </OnboardingFrame>
  );
}
