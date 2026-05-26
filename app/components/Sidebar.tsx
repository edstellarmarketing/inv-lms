import Image from "next/image";
import Link from "next/link";

type Nav = {
  icon: string;
  label: string;
  href: string;
  badge?: { text: string; tone: "silver" | "gold" | "red" };
};

const navItems: Nav[] = [
  { icon: "fa-solid fa-house", label: "Dashboard", href: "/dashboard" },
  { icon: "fa-solid fa-book-open-reader", label: "My Learning", href: "/lms/pmp" },
  { icon: "fa-regular fa-calendar", label: "Training Schedule", href: "/lms/pmp" },
  { icon: "fa-solid fa-file-lines", label: "Assignments", href: "/lms/pmp" },
  { icon: "fa-solid fa-clipboard-question", label: "Practice & Quizzes", href: "/lms/pmp/question-bank" },
  { icon: "fa-solid fa-file-pen", label: "Mock Exams", href: "/lms/pmp/mock-exam/1" },
  { icon: "fa-solid fa-paper-plane", label: "AI Study Assistant", href: "/lms/pmp", badge: { text: "Silver", tone: "silver" } },
  { icon: "fa-solid fa-paper-plane", label: "AI Mentor", href: "/lms/pmp", badge: { text: "Gold", tone: "gold" } },
  { icon: "fa-regular fa-circle-question", label: "Certificates", href: "/lms/pmp" },
  { icon: "fa-regular fa-envelope", label: "Messages", href: "/lms/pmp", badge: { text: "2", tone: "red" } },
  { icon: "fa-regular fa-folder", label: "Resources", href: "/lms/pmp/glossary" },
  { icon: "fa-regular fa-comments", label: "Discussions", href: "/lms/pmp" },
  { icon: "fa-solid fa-gear", label: "Settings", href: "/lms/pmp" },
];

type CourseTag = {
  code: string;
  package: "Gold" | "Silver";
  slug?: string;
};

type CourseContext = CourseTag & {
  otherCourses?: CourseTag[];
};

type Props = {
  active?: string;
  bottomVariant?: "gold" | "appstores";
  courseContext?: CourseContext;
};

export default function Sidebar({
  active = "Dashboard",
  bottomVariant = "gold",
  courseContext,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-wrap">
          <Link href="/">
            <Image
              src="/invensis-learning-logo.svg"
              alt="Invensis Learn"
              width={140}
              height={34}
              className="logo"
              priority
            />
          </Link>
        </div>

        {courseContext && (
          <div className="sb-course-ctx">
            <small className="sb-course-eyebrow">Currently viewing</small>
            <div className={`sb-course-active ${courseContext.package.toLowerCase()}`}>
              <span className="sb-course-icon">
                <i className="fa-solid fa-award"></i>
              </span>
              <strong>{courseContext.code}</strong>
              <span className={`pill pill-${courseContext.package.toLowerCase()}`}>
                <i
                  className={`fa-solid ${
                    courseContext.package === "Gold" ? "fa-crown" : "fa-medal"
                  }`}
                ></i>
                {courseContext.package}
              </span>
            </div>
            {courseContext.otherCourses && courseContext.otherCourses.length > 0 && (
              <div className="sb-course-switch">
                <small>Switch to</small>
                <div className="sb-course-other-list">
                  {courseContext.otherCourses.map((o) => (
                    <Link
                      key={o.code}
                      href={o.slug ? `/lms/${o.slug}` : "#"}
                      className={`sb-course-other ${o.package.toLowerCase()}`}
                    >
                      <strong>{o.code}</strong>
                      <span className={`pill pill-${o.package.toLowerCase()}`}>
                        {o.package}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-item${item.label === active ? " active" : ""}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`pill pill-${item.badge.tone}`}>{item.badge.text}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {bottomVariant === "gold" ? (
          <div className="gold-card">
            <div className="gold-head">
              <i className="fa-solid fa-crown"></i>
              <span>You&apos;re on</span>
              <span className="pill pill-gold">Gold</span>
            </div>
            <p>Unlock all premium benefits and AI-powered tools.</p>
            <Link href="/welcome" className="gold-cta">
              View Gold Benefits <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        ) : (
          <div className="app-card">
            <div className="app-head">
              <i className="fa-solid fa-mobile-screen"></i>
              <strong>Learn on the Go!</strong>
            </div>
            <p>Take your prep anywhere with our mobile app.</p>
            <div className="app-stores">
              <button className="store">
                <i className="fa-brands fa-apple"></i>
                <span>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </button>
              <button className="store">
                <i className="fa-brands fa-google-play"></i>
                <span>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
