import CircularProgress from "./CircularProgress";

export default function KpiRow() {
  return (
    <section className="kpi-row">
      {/* 1 - Exam Target Date */}
      <div className="kpi-card">
        <div className="kpi-body">
          <span className="kpi-icon blue"><i className="fa-regular fa-calendar"></i></span>
          <div className="kpi-text">
            <small>Exam Target Date</small>
            <h2>15 May 2024</h2>
            <p className="muted">8 weeks to go</p>
          </div>
        </div>
        <a href="#" className="kpi-cta blue">View exam plan <i className="fa-solid fa-arrow-right"></i></a>
      </div>

      {/* 2 - Readiness Score */}
      <div className="kpi-card">
        <div className="kpi-body">
          <CircularProgress value={56} color="#7c3aed" />
          <div className="kpi-text">
            <small>Readiness Score (Baseline)</small>
            <h2 className="sm">Good start!</h2>
            <p className="muted">Focus on the weak areas to improve faster.</p>
          </div>
        </div>
        <a href="#" className="kpi-cta purple">View full analysis <i className="fa-solid fa-arrow-right"></i></a>
      </div>

      {/* 3 - Overall Progress */}
      <div className="kpi-card">
        <div className="kpi-body">
          <CircularProgress value={0} color="#94a3b8" label="0%" />
          <div className="kpi-text">
            <small>Overall Progress</small>
            <p className="muted">You haven&apos;t started yet. Pick a topic and take your first step today.</p>
          </div>
        </div>
        <a href="#" className="kpi-cta blue">View roadmap <i className="fa-solid fa-arrow-right"></i></a>
      </div>

      {/* 4 - Voucher Status */}
      <div className="kpi-card">
        <div className="kpi-body">
          <span className="kpi-icon green"><i className="fa-solid fa-ticket"></i></span>
          <div className="kpi-text">
            <small>Voucher Status</small>
            <h2>₹2,000</h2>
            <p className="muted green">Available</p>
          </div>
        </div>
        <a href="#" className="kpi-cta blue">Apply voucher <i className="fa-solid fa-arrow-right"></i></a>
      </div>
    </section>
  );
}
