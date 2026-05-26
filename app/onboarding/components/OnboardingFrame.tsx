import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import Stepper from "../../components/Stepper";
import WelcomeTopbar from "../../welcome/components/WelcomeTopbar";

type Props = {
  step: number;
  totalSteps?: number;
  backHref?: string;
  nextHref: string;
  nextLabel?: string;
  children: React.ReactNode;
};

export default function OnboardingFrame({
  step,
  totalSteps = 4,
  backHref,
  nextHref,
  nextLabel = "Save and continue",
  children,
}: Props) {
  const pct = Math.round((step / totalSteps) * 100);
  return (
    <div className="app onboarding-app">
      <Sidebar active="" bottomVariant="appstores" />
      <div className="onboarding-page">
        <header className="ob-head">
          <div>
            <h1>Set up your learning plan</h1>
            <p>Tell us about yourself so we can personalize your journey.</p>
          </div>
          <WelcomeTopbar />
        </header>

        <Stepper current={step} />

        <div className="ob-body">{children}</div>

        <footer className="ob-footer">
          {backHref ? (
            <Link href={backHref} className="ob-back">
              <i className="fa-solid fa-arrow-left"></i> Back
            </Link>
          ) : (
            <span />
          )}
          <div className="ob-progress">
            <span>
              Step {step} of {totalSteps}
            </span>
            <div className="ob-bar">
              <span style={{ width: `${pct}%` }}></span>
            </div>
            <span className="ob-pct">{pct}%</span>
          </div>
          <Link href={nextHref} className="ob-next">
            {nextLabel} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </footer>
      </div>
    </div>
  );
}
