import NextSessions from "./NextSessions";

const actions = [
  { icon: "fa-solid fa-download", label: "Download Study Plan" },
  { icon: "fa-regular fa-circle-question", label: "View My Certificates" },
  { icon: "fa-solid fa-headset", label: "Contact Support" },
  { icon: "fa-regular fa-comment-dots", label: "Give Feedback" },
];

export default function RightRail() {
  return (
    <aside className="rightrail">
      <NextSessions />

      <div className="qa-card">
        <h3 className="section-title">Quick Actions</h3>
        <ul className="qa-list">
          {actions.map((a) => (
            <li key={a.label}>
              <span className="qa-left">
                <i className={a.icon}></i>
                {a.label}
              </span>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
          ))}
        </ul>
      </div>

      <div className="ai-card">
        <div className="ai-text">
          <div className="ai-head">
            <h4>Ask AI Study Assistant</h4>
            <span className="pill pill-silver">Silver</span>
          </div>
          <p>Get instant answers and personalized study recommendations.</p>
          <button>
            <i className="fa-solid fa-paper-plane"></i> Ask Now
          </button>
        </div>
        <div className="ai-illus">
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </aside>
  );
}
