import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import WelcomeTopbar from "../../welcome/components/WelcomeTopbar";

const chips = [
  { icon: "fa-solid fa-user", label: "Profile", value: "Captured", tone: "blue" },
  { icon: "fa-regular fa-calendar", label: "Exam Date", value: "15 May 2024", tone: "purple" },
  { icon: "fa-solid fa-file-pen", label: "Baseline", value: "56% Score", tone: "green" },
  { icon: "fa-solid fa-circle-check", label: "Onboarding", value: "Complete", tone: "orange" },
];

export default function CompletePage() {
  return (
    <div className="app onboarding-app complete-app">
      <Sidebar active="Dashboard" bottomVariant="appstores" />

      <div className="complete-page">
        <div className="complete-bg" aria-hidden>
          <header className="cb-head">
            <h1>Good morning, Alex! ☀️</h1>
            <p>Let&apos;s keep the momentum.</p>
          </header>
          <div className="cb-stats">
            <div className="cb-stat blue"><i className="fa-solid fa-circle-check"></i><div><small>Profile Setup</small><strong>Done</strong></div></div>
            <div className="cb-stat green"><i className="fa-solid fa-circle-check"></i><div><small>Completed Training</small><strong>Step 1 of 1</strong></div></div>
            <div className="cb-stat purple"><i className="fa-regular fa-clock"></i><div><small>Total Learning Time</small><strong>24h 30m</strong></div></div>
            <div className="cb-stat orange"><i className="fa-solid fa-trophy"></i><div><small>Certifications</small><strong>0</strong></div></div>
          </div>
          <div className="cb-blocks">
            <div className="cb-block tall" />
            <div className="cb-block tall" />
          </div>
          <div className="cb-blocks">
            <div className="cb-block small" />
            <div className="cb-block small" />
            <div className="cb-block small" />
            <div className="cb-block small" />
          </div>
        </div>

        <div className="complete-top">
          <WelcomeTopbar />
        </div>

        <div className="complete-modal">
          <div className="complete-check">
            <i className="fa-solid fa-check"></i>
            <span className="ring r1"></span>
            <span className="ring r2"></span>
          </div>

          <h2>You&apos;re ready, Alex! 🎉</h2>
          <p>
            Your learning plan is all set and personalised for you. Begin your journey
            towards <strong>PMP®</strong> success!
          </p>

          <div className="complete-chips">
            {chips.map((c) => (
              <div key={c.label} className={`comp-chip ${c.tone}`}>
                <span className="comp-chip-icon">
                  <i className={c.icon}></i>
                </span>
                <small>{c.label}</small>
                <strong>{c.value}</strong>
              </div>
            ))}
          </div>

          <div className="complete-score">
            <i className="fa-solid fa-chart-line"></i>
            <div>
              Your baseline score is <strong>56%</strong>. Personalised Pace Plan to help
              you improve and achieve your goal.
            </div>
          </div>

          <Link href="/dashboard" className="complete-cta">
            Enter your LMS <i className="fa-solid fa-arrow-right"></i>
          </Link>

          <small className="complete-foot">
            <i className="fa-solid fa-shield-halved"></i> Your progress is saved and ready
          </small>
        </div>
      </div>
    </div>
  );
}
