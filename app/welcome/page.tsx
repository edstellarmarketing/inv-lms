import Sidebar from "../components/Sidebar";
import WelcomeTopbar from "./components/WelcomeTopbar";
import Stepper from "../components/Stepper";
import HeroCourse from "./components/HeroCourse";
import FeatureGrid from "./components/FeatureGrid";
import GetStartedCTA from "./components/GetStartedCTA";
import TipBanner from "./components/TipBanner";

export default function WelcomePage() {
  return (
    <div className="app welcome-app">
      <Sidebar bottomVariant="appstores" />

      <div className="welcome-page">
        <WelcomeTopbar />
        <Stepper current={0} />

        <section className="welcome-hero-wrap">
          <header className="welcome-head">
            <h1>
              Welcome, Alex! <span className="wave">👋</span>
            </h1>
            <p>
              Let&apos;s set up your personalized learning plan in just a few simple steps.
            </p>
            <small>Tell us about your journey and we&apos;ll keep you on track to success.</small>
          </header>

          <HeroCourse />
        </section>

        <FeatureGrid />
        <GetStartedCTA />
        <TipBanner />
      </div>
    </div>
  );
}
