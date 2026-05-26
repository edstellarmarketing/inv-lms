type Milestone = {
  course: "PMP" | "CAPM";
  title: string;
  date: string;
  status: "upcoming" | "due" | "completed";
};

const milestones: Milestone[] = [
  {
    course: "PMP",
    title: "PMP® Mock Exam 1",
    date: "22 May 2026, Friday",
    status: "upcoming",
  },
  {
    course: "CAPM",
    title: "CAPM® Practice Set",
    date: "26 May 2026, Tuesday",
    status: "upcoming",
  },
  {
    course: "PMP",
    title: "Submit Case Study #4",
    date: "30 May 2026, Saturday",
    status: "due",
  },
];

type Activity = {
  course: "PMP" | "CAPM";
  title: string;
  meta: string;
};

const activities: Activity[] = [
  {
    course: "PMP",
    title: "Completed lesson: Project Cost Management Intro",
    meta: "Yesterday, 6:40 PM",
  },
  {
    course: "CAPM",
    title: "Started module: Schedule Management",
    meta: "Yesterday, 5:10 PM",
  },
];

export default function MilestonesActivity() {
  return (
    <section className="mw-grid-2">
      <div className="mw-list-card">
        <div className="card-head">
          <h3>Upcoming Milestones</h3>
          <a href="#">
            View all milestones <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <ul className="mw-mile-list">
          {milestones.map((m) => (
            <li key={m.title}>
              <span
                className={`mw-course-tag ${m.course === "PMP" ? "gold" : "silver"}`}
              >
                {m.course}
              </span>
              <div className="mw-mile-body">
                <strong>{m.title}</strong>
                <small>{m.date}</small>
              </div>
              <span className={`mw-mile-status ${m.status}`}>
                {m.status === "due" ? "Due soon" : "Upcoming"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mw-list-card">
        <div className="card-head">
          <h3>Recent Activity</h3>
          <a href="#">
            View all activity <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <ul className="mw-mile-list">
          {activities.map((a) => (
            <li key={a.title}>
              <span
                className={`mw-course-tag ${a.course === "PMP" ? "gold" : "silver"}`}
              >
                {a.course}
              </span>
              <div className="mw-mile-body">
                <strong>{a.title}</strong>
                <small>{a.meta}</small>
              </div>
              <span className="mw-check-ok">
                <i className="fa-solid fa-circle-check"></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
