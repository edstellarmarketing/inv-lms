import Link from "next/link";

type MultiToggle = "to-multi" | "to-single";

type Props = {
  multiToggle?: MultiToggle;
};

export default function Topbar({ multiToggle = "to-multi" }: Props) {
  const goingMulti = multiToggle === "to-multi";
  return (
    <header className="topbar">
      <div>
        <h1>
          Welcome, Alex! <span className="wave">👋</span>
        </h1>
        <p>You&apos;re all set to begin your PMP® journey. Let&apos;s build your success story.</p>
      </div>
      <div className="topbar-right">
        <Link
          href={goingMulti ? "/dashboard-multi" : "/dashboard"}
          className="welcome-mc-toggle compact"
        >
          <span
            className={`welcome-mc-toggle-dot ${goingMulti ? "single" : "multi"}`}
            aria-hidden="true"
          >
            {goingMulti ? "1" : <i className="fa-solid fa-layer-group"></i>}
          </span>
          <span className="welcome-mc-toggle-text">
            <small>{goingMulti ? "Have multiple courses?" : "Multi-course view"}</small>
            <strong>
              {goingMulti ? "Switch to multi-course view" : "Switch to single course"}
            </strong>
          </span>
        </Link>
        <div className="search">
          <input type="text" placeholder="Search for courses, topics, or resources" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <button className="icon-btn" aria-label="Notifications">
          <i className="fa-regular fa-bell"></i>
          <span className="bell-badge">3</span>
        </button>
        <Link href="/welcome" className="user-chip" aria-label="Open welcome screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/40?img=12" alt="Alex" />
          <div>
            <strong>Alex Johnson</strong>
            <small>PMP® Gold</small>
          </div>
          <i className="fa-solid fa-chevron-down"></i>
        </Link>
      </div>
    </header>
  );
}
