const features = [
  {
    tone: "blue",
    icon: "fa-solid fa-sliders",
    title: "Personalised for You",
    desc: "We’ll customise your plan based on your goals and exam date.",
  },
  {
    tone: "green",
    icon: "fa-regular fa-clock",
    title: "Stay on Track",
    desc: "Smart reminders and milestones to help you stay consistent.",
  },
  {
    tone: "purple",
    icon: "fa-solid fa-chart-line",
    title: "Measure Progress",
    desc: "Track your readiness and improve with each step.",
  },
  {
    tone: "yellow",
    icon: "fa-solid fa-trophy",
    title: "Achieve Success",
    desc: "Everything you need to pass your PMP® certification.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="feature-grid">
      {features.map((f) => (
        <div key={f.title} className={`feature-card ${f.tone}`}>
          <span className={`feature-icon ${f.tone}`}>
            <i className={f.icon}></i>
          </span>
          <strong>{f.title}</strong>
          <p>{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
