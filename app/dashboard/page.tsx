import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KpiRow from "../components/KpiRow";
import TrainingSchedule from "../components/TrainingSchedule";
import GoldPackage from "../components/GoldPackage";
import Journey from "../components/Journey";
import Banner from "../components/Banner";
import RightRail from "../components/RightRail";

export default function DashboardPage() {
  return (
    <div className="app">
      <Sidebar />

      <div className="page">
        <Topbar />
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
