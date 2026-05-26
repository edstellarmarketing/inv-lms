import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KpiRow from "../components/KpiRow";
import TrainingSchedule from "../components/TrainingSchedule";
import GoldPackage from "../components/GoldPackage";
import Journey from "../components/Journey";
import Banner from "../components/Banner";
import RightRail from "../components/RightRail";
import CourseSwitcher from "./components/CourseSwitcher";

export default function DashboardMultiPage() {
  return (
    <div className="app">
      <Sidebar
        active="Dashboard"
        courseContext={{
          code: "PMP®",
          package: "Gold",
          otherCourses: [{ code: "CAPM®", package: "Silver", slug: "capm" }],
        }}
      />

      <div className="page">
        <Topbar multiToggle="to-single" />
        <CourseSwitcher />
        <KpiRow />

        <div className="grid-2col">
          <main className="main-col">
            <TrainingSchedule />
            <GoldPackage />
            <Journey />
          </main>
          <RightRail />
        </div>

        <Banner />
      </div>
    </div>
  );
}
