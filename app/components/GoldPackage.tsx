type Item = {
  icon: string;
  label: string;
  tone: string;
  badge?: "Silver" | "Gold";
};

const items: Item[] = [
  { icon: "fa-solid fa-paper-plane", label: "AI Study Assistant", tone: "slate", badge: "Silver" },
  { icon: "fa-solid fa-paper-plane", label: "AI Mentor", tone: "yellow", badge: "Gold" },
  { icon: "fa-solid fa-user-group", label: "Live Training", tone: "blue" },
  { icon: "fa-solid fa-file-pen", label: "Mock Exams", tone: "purple" },
  { icon: "fa-solid fa-clipboard-check", label: "Practice & Quizzes", tone: "red" },
  { icon: "fa-regular fa-calendar", label: "Study Planner", tone: "green" },
  { icon: "fa-solid fa-download", label: "Downloadable Resources", tone: "blue" },
  { icon: "fa-solid fa-graduation-cap", label: "Certificate Program", tone: "pink" },
];

export default function GoldPackage() {
  return (
    <section className="package-card">
      <h3 className="section-title">Your Gold Package includes</h3>
      <div className="package-grid">
        {items.map((it) => (
          <div key={it.label} className={`pkg-item ${it.tone}`}>
            <div className="pkg-icon">
              <i className={it.icon}></i>
            </div>
            <span>{it.label}</span>
            {it.badge && (
              <span className={`pill pill-${it.badge.toLowerCase()}`}>{it.badge}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
