import Link from "next/link";

export default function MultiWelcomeTopbar() {
  return (
    <header className="mw-topbar">
      <div className="mw-greet">
        <h1>
          Welcome back, Alex! <span className="wave">👋</span>
        </h1>
        <p>Here&apos;s your learning overview.</p>
      </div>

      <div className="mw-topbar-right">
        <Link href="/welcome" className="welcome-mc-toggle compact">
          <span className="welcome-mc-toggle-dot multi" aria-hidden="true">
            <i className="fa-solid fa-layer-group"></i>
          </span>
          <span className="welcome-mc-toggle-text">
            <small>Multi-course view</small>
            <strong>Switch to single course</strong>
          </span>
        </Link>
        <div className="search">
          <input type="text" placeholder="Search courses, lessons, or resources" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <button className="icon-btn" aria-label="Notifications">
          <i className="fa-regular fa-bell"></i>
          <span className="bell-badge">3</span>
        </button>
        <Link href="/welcome-multi" className="user-chip" aria-label="Profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/40?img=12" alt="Alex" />
          <div>
            <strong>Alex Johnson</strong>
            <small>2 active courses</small>
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </Link>
      </div>
    </header>
  );
}
