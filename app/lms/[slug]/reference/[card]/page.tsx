import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type CardItem = {
  slug: string;
  num: number;
  title: string;
  status: "read" | "progress" | "not-started" | "locked";
  active?: boolean;
};

const cardList: CardItem[] = [
  { num: 1, slug: "integration-management", title: "Project Integration Management", status: "progress", active: true },
  { num: 2, slug: "scope-management", title: "Project Scope Management", status: "read" },
  { num: 3, slug: "schedule-management", title: "Project Schedule Management", status: "not-started" },
  { num: 4, slug: "cost-management", title: "Project Cost Management", status: "read" },
  { num: 5, slug: "quality-management", title: "Project Quality Management", status: "not-started" },
  { num: 6, slug: "resource-management", title: "Project Resource Management", status: "not-started" },
  { num: 7, slug: "communications-management", title: "Project Communications Management", status: "locked" },
  { num: 8, slug: "risk-management", title: "Project Risk Management", status: "locked" },
  { num: 9, slug: "procurement-management", title: "Project Procurement Management", status: "locked" },
];

const statusBadge: Record<CardItem["status"], { label: string; tone: string; icon: string }> = {
  read: { label: "Read", tone: "green", icon: "fa-solid fa-check-double" },
  progress: { label: "In Progress", tone: "orange", icon: "fa-solid fa-hourglass-half" },
  "not-started": { label: "Not Started", tone: "slate", icon: "fa-regular fa-bookmark" },
  locked: { label: "Locked (Gold)", tone: "gold", icon: "fa-solid fa-crown" },
};

const processGroups = [
  {
    name: "Initiating",
    tone: "blue",
    icon: "fa-solid fa-rocket",
    desc: "Define the project, identify stakeholders, and obtain authorization to begin.",
  },
  {
    name: "Planning",
    tone: "purple",
    icon: "fa-solid fa-pencil-ruler",
    desc: "Establish the scope, refine objectives, and define the course of action.",
  },
  {
    name: "Executing",
    tone: "red",
    icon: "fa-solid fa-play",
    desc: "Complete the work defined in the plan to satisfy project specifications.",
  },
  {
    name: "Monitoring & Controlling",
    tone: "yellow",
    icon: "fa-solid fa-chart-line",
    desc: "Track progress, manage changes, and corrective actions where needed.",
  },
  {
    name: "Closing",
    tone: "orange",
    icon: "fa-solid fa-flag-checkered",
    desc: "Finalize all activities, formally close the project or phase.",
  },
];

const keyProcesses = [
  "Develop Project Charter",
  "Develop Project Management Plan",
  "Direct & Manage Project Work",
  "Manage Project Knowledge",
  "Monitor & Control Project Work",
  "Perform Integrated Change Control",
  "Close Project or Phase",
];

const ito = [
  {
    head: "Inputs",
    tone: "blue",
    items: [
      "Business documents",
      "Agreements",
      "Enterprise environmental factors",
      "Organizational process assets",
      "Project charter",
      "Outputs from other processes",
    ],
  },
  {
    head: "Tools & Techniques",
    tone: "purple",
    items: [
      "Expert judgment",
      "Data gathering & analysis",
      "Decision-making",
      "Meetings",
      "Project management information system",
      "Interpersonal & team skills",
    ],
  },
  {
    head: "Outputs",
    tone: "green",
    items: [
      "Project charter",
      "Project management plan",
      "Deliverables",
      "Approved change requests",
      "Project documents updates",
      "Final product, service or result",
    ],
  },
];

export default function ReferenceCardPage() {
  return (
    <LmsFrame
      active="My Learning"
      title="Reference Cards"
      subtitle="Quick concept reference for fast revision"
      right={
        <Link href="/lms/pmp" className="ep-back">
          <i className="fa-solid fa-arrow-left"></i> Back to Exam Preparation
        </Link>
      }
    >
      <div className="rcard-grid">
        {/* Left rail */}
        <aside className="rcard-side">
          <div className="rcard-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search by name, topic, or domain..." />
          </div>

          <ul className="rcard-list">
            {cardList.map((c) => {
              const s = statusBadge[c.status];
              return (
                <li key={c.slug} className={c.active ? "active" : ""}>
                  <Link href={`/lms/pmp/reference/${c.slug}`}>
                    <span className="rcard-num">{c.num}</span>
                    <span className="rcard-title">{c.title}</span>
                    <span className={`rcard-status ${s.tone}`}>
                      <i className={s.icon}></i>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="rcard-download">
            <i className="fa-solid fa-download"></i> Download All Cards (PDF)
          </button>
        </aside>

        {/* Main content */}
        <article className="rcard-main">
          <div className="rcard-mhead">
            <div>
              <span className="rcard-eyebrow">CARD 1 OF 9</span>
              <h2>Project Integration Management</h2>
            </div>
            <div className="rcard-mhead-actions">
              <label className="rcard-toggle">
                <input type="checkbox" defaultChecked />
                <span className="rcard-toggle-track">
                  <span className="rcard-toggle-thumb"></span>
                </span>
                Mark as read
              </label>
              <button className="rcard-iconbtn" aria-label="Download">
                <i className="fa-solid fa-download"></i>
              </button>
            </div>
          </div>

          <p className="rcard-intro">
            Includes the processes and activities needed to identify, define, combine,
            unify, and coordinate the various processes and project management
            activities within the Project Management Process Groups.
          </p>

          {/* Key Overview */}
          <section className="rcard-block">
            <div className="rcard-block-head">
              <span className="rcard-block-ic blue"><i className="fa-solid fa-lightbulb"></i></span>
              <h3>Key Overview</h3>
            </div>
            <div className="pgroups">
              {processGroups.map((p) => (
                <div key={p.name} className={`pgroup ${p.tone}`}>
                  <span className="pgroup-icon">
                    <i className={p.icon}></i>
                  </span>
                  <strong>{p.name}</strong>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Processes + ITO */}
          <div className="rcard-two">
            <section className="rcard-block">
              <div className="rcard-block-head">
                <span className="rcard-block-ic purple"><i className="fa-solid fa-list-check"></i></span>
                <h3>Key Processes</h3>
              </div>
              <ul className="rcard-bullets">
                {keyProcesses.map((p) => (
                  <li key={p}>
                    <i className="fa-solid fa-circle-check"></i> {p}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rcard-block">
              <div className="rcard-block-head">
                <span className="rcard-block-ic green"><i className="fa-solid fa-diagram-project"></i></span>
                <h3>Inputs, Tools &amp; Outputs</h3>
              </div>
              <div className="ito-grid">
                {ito.map((col) => (
                  <div key={col.head} className={`ito-col ${col.tone}`}>
                    <strong>{col.head}</strong>
                    <ul>
                      {col.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer nav */}
          <div className="rcard-foot">
            <button className="lms-btn ghost">
              <i className="fa-solid fa-arrow-left"></i> Previous Card
            </button>
            <span className="rcard-foot-mid">1 of 9</span>
            <Link href="/lms/pmp/reference/scope-management" className="lms-btn primary">
              Next Card <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </article>
      </div>
    </LmsFrame>
  );
}
