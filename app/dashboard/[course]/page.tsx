import { notFound } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import KpiRow from "../../components/KpiRow";
import TrainingSchedule from "../../components/TrainingSchedule";
import GoldPackage from "../../components/GoldPackage";
import Journey from "../../components/Journey";
import Banner from "../../components/Banner";
import RightRail from "../../components/RightRail";
import CourseSwitcher from "../../dashboard-multi/components/CourseSwitcher";

type CoursePkg = "Gold" | "Silver";

const courseCatalog: Record<
  string,
  { code: string; package: CoursePkg; otherSlug: string; otherCode: string; otherPackage: CoursePkg }
> = {
  pmp: {
    code: "PMP®",
    package: "Gold",
    otherSlug: "capm",
    otherCode: "CAPM®",
    otherPackage: "Silver",
  },
  capm: {
    code: "CAPM®",
    package: "Silver",
    otherSlug: "pmp",
    otherCode: "PMP®",
    otherPackage: "Gold",
  },
};

type Params = { params: { course: string } };

export default function DashboardCoursePage({ params }: Params) {
  const meta = courseCatalog[params.course];
  if (!meta) notFound();

  return (
    <div className="app">
      <Sidebar
        active="Dashboard"
        courseContext={{
          code: meta.code,
          package: meta.package,
          otherCourses: [
            { code: meta.otherCode, package: meta.otherPackage, slug: meta.otherSlug },
          ],
        }}
      />

      <div className="page">
        <Topbar multiToggle="to-single" />
        <CourseSwitcher activeSlug={params.course} />
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
