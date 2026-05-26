const items = [
  {
    icon: "fa-solid fa-sliders",
    tone: "blue",
    title: "Personalized Study Plan",
    desc: "A plan tuned to both certifications so nothing slips.",
  },
  {
    icon: "fa-regular fa-calendar",
    tone: "purple",
    title: "Milestones & Deadlines",
    desc: "Stay on track for each exam target date.",
  },
  {
    icon: "fa-solid fa-chart-line",
    tone: "green",
    title: "Progress Tracking",
    desc: "See readiness for each course at a glance.",
  },
];

export default function TwoCoursesPanel() {
  return (
    <section className="mw-tc-panel">
      <div className="mw-tc-head">
        <div className="mw-tc-icon">
          <i className="fa-solid fa-bullseye"></i>
        </div>
        <div>
          <h3>Two great courses. One goal: Your success!</h3>
          <p>
            We&apos;ll keep both certifications aligned so you build on what you learn.
          </p>
        </div>
      </div>

      <div className="mw-tc-grid">
        {items.map((it) => (
          <div key={it.title} className={`mw-tc-card ${it.tone}`}>
            <span className={`mw-tc-cardicon ${it.tone}`}>
              <i className={it.icon}></i>
            </span>
            <strong>{it.title}</strong>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
