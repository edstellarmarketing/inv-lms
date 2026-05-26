import Sidebar from "../components/Sidebar";
import MultiWelcomeTopbar from "./components/MultiWelcomeTopbar";
import CourseCards from "./components/CourseCards";
import LearningGlance from "./components/LearningGlance";
import TwoCoursesPanel from "./components/TwoCoursesPanel";
import MilestonesActivity from "./components/MilestonesActivity";

export default function WelcomeMultiPage() {
  return (
    <div className="app welcome-app">
      <Sidebar active="Dashboard" bottomVariant="appstores" />

      <div className="welcome-page mw-page">
        <MultiWelcomeTopbar />
        <CourseCards />
        <LearningGlance />
        <TwoCoursesPanel />
        <MilestonesActivity />
      </div>
    </div>
  );
}
