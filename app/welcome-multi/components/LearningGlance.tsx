type Stat = {
  icon: string;
  tone: "blue" | "green" | "orange" | "slate" | "gold";
  value: number;
  label: string;
};

const stats: Stat[] = [
  { icon: "fa-solid fa-layer-group", tone: "blue", value: 152, label: "Total Resources" },
  { icon: "fa-solid fa-circle-check", tone: "green", value: 27, label: "Completed" },
  { icon: "fa-solid fa-spinner", tone: "orange", value: 36, label: "In Progress" },
  { icon: "fa-regular fa-circle", tone: "slate", value: 89, label: "Not Started" },
  { icon: "fa-solid fa-lock", tone: "gold", value: 12, label: "Locked" },
];

export default function LearningGlance() {
  return (
    <section className="mw-glance">
      <div className="mw-section-head">
        <h3>Learning at a Glance</h3>
        <small>Combined across PMP® and CAPM®.</small>
      </div>
      <div className="mw-glance-grid">
        {stats.map((s) => (
          <div key={s.label} className={`mw-glance-card ${s.tone}`}>
            <span className={`mw-glance-icon ${s.tone}`}>
              <i className={s.icon}></i>
            </span>
            <strong>{s.value}</strong>
            <small>{s.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
