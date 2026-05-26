type Row = { icon: string; label: string; value: string };
type Card = {
  tone: "blue" | "purple" | "green" | "orange";
  number: string;
  title: string;
  sub: string;
  rows: Row[];
};

const cards: Card[] = [
  {
    tone: "blue",
    number: "1",
    title: "Core Training",
    sub: "Build a strong foundation with structured learning.",
    rows: [
      { icon: "fa-solid fa-book", label: "Lessons", value: "80 Lessons" },
      { icon: "fa-solid fa-video", label: "Live Sessions", value: "20 Upcoming" },
      { icon: "fa-regular fa-calendar", label: "Training Schedule", value: "View Calendar" },
      { icon: "fa-solid fa-book-open", label: "eBooks & PDFs", value: "24 Resources" },
    ],
  },
  {
    tone: "purple",
    number: "2",
    title: "Exam Preparation",
    sub: "Practice. Assess. Improve. Ace the PMP® exam.",
    rows: [
      { icon: "fa-solid fa-clipboard-question", label: "Practice & Quizzes", value: "320+ Questions" },
      { icon: "fa-solid fa-file-pen", label: "Mock Exams", value: "6 Full Length" },
      { icon: "fa-solid fa-chart-line", label: "Baseline & Analysis", value: "View Report" },
      { icon: "fa-solid fa-layer-group", label: "Flashcards", value: "500+ Cards" },
    ],
  },
  {
    tone: "green",
    number: "3",
    title: "Active Learning",
    sub: "Apply concepts, retain better, and build confidence.",
    rows: [
      { icon: "fa-solid fa-file-lines", label: "Assignments", value: "8 Pending" },
      { icon: "fa-solid fa-folder-open", label: "Case Studies", value: "15 Scenarios" },
      { icon: "fa-regular fa-comments", label: "Discussions", value: "Active Forums" },
      { icon: "fa-solid fa-diagram-project", label: "Mind Maps", value: "20+ Maps" },
    ],
  },
  {
    tone: "orange",
    number: "4",
    title: "Support & Mentoring",
    sub: "Get expert guidance at every step.",
    rows: [
      { icon: "fa-regular fa-circle-question", label: "Ask Instructor", value: "Get Help" },
      { icon: "fa-solid fa-paper-plane", label: "AI Mentor (Gold)", value: "24/7 Guidance" },
      { icon: "fa-solid fa-people-group", label: "Study Groups", value: "Join Now" },
      { icon: "fa-solid fa-trophy", label: "Success Stories", value: "Read Alumni" },
    ],
  },
];

export default function Journey() {
  return (
    <section className="journey">
      <div className="journey-head">
        <div>
          <h3 className="section-title">Start Your Learning Journey</h3>
          <p className="muted">All your learning starts here. Choose a section to begin.</p>
        </div>
        <a href="#" className="head-link">View learning roadmap <i className="fa-solid fa-arrow-right"></i></a>
      </div>

      <div className="journey-grid">
        {cards.map((c) => (
          <div key={c.title} className={`journey-card ${c.tone}`}>
            <div className="jc-head">
              <span className={`jc-num ${c.tone}`}>{c.number}</span>
              <div>
                <h4>{c.title}</h4>
                <p>{c.sub}</p>
              </div>
            </div>

            <ul className="jc-list">
              {c.rows.map((r) => (
                <li key={r.label}>
                  <i className={r.icon}></i>
                  <span className="jc-row-label">{r.label}</span>
                  <span className="jc-row-value">{r.value}</span>
                </li>
              ))}
            </ul>

            <button className={`jc-btn ${c.tone}`}>Start Learning <i className="fa-solid fa-arrow-right"></i></button>
          </div>
        ))}
      </div>
    </section>
  );
}
