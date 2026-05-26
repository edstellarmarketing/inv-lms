export default function TrainingSchedule() {
  return (
    <section className="ts-card">
      <div className="ts-icon">
        <i className="fa-regular fa-calendar"></i>
      </div>

      <div className="ts-col date">
        <small>Your Training Schedule</small>
        <h2>15 May 2024, Wednesday</h2>
        <p className="ts-meta">
          10:00 AM &ndash; 12:00 PM (IST) <span className="dot-sep">&bull;</span> Live Session
        </p>
      </div>

      <div className="ts-col course">
        <span className="ts-gold-mark" aria-label="Gold package">
          <i className="fa-solid fa-crown"></i>
          <span>Gold</span>
        </span>
        <small>Course Name</small>
        <div className="ts-course">
          <i className="fa-solid fa-graduation-cap"></i>
          <strong>PMP</strong>
        </div>
      </div>

      <div className="ts-col instructor">
        <small>Instructor</small>
        <div className="ts-instructor">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/40?img=58" alt="Rohit Sharma" />
          <strong>Rohit Sharma</strong>
        </div>
      </div>

      <button className="ts-btn">
        View full schedule <i className="fa-solid fa-arrow-right"></i>
      </button>
    </section>
  );
}
