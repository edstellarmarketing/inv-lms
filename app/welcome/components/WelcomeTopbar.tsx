import Link from "next/link";

export default function WelcomeTopbar() {
  return (
    <header className="welcome-topbar">
      <nav className="welcome-auth-links">
        <Link href="/activate/abc123" className="muted-link">
          <i className="fa-solid fa-envelope-open-text"></i> Activate account
        </Link>
        <Link href="/welcome-multi" className="welcome-mc-toggle">
          <span className="welcome-mc-toggle-dot single" aria-hidden="true">1</span>
          <span className="welcome-mc-toggle-text">
            <small>Have multiple courses?</small>
            <strong>Switch to multi-course view</strong>
          </span>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
        <Link href="/auth/login" className="welcome-signin">
          <i className="fa-solid fa-right-to-bracket"></i> Sign in
        </Link>
      </nav>
      <Link href="/welcome" className="user-chip" aria-label="Open welcome screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://i.pravatar.cc/40?img=12" alt="Alex" />
        <div>
          <strong>Alex Johnson</strong>
          <small>PMP® Gold</small>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </Link>
    </header>
  );
}
