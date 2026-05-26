import Link from "next/link";
import Sidebar from "../../components/Sidebar";

type Crumb = { label: string; href?: string };

type CourseTag = {
  code: string;
  package: "Gold" | "Silver";
  slug?: string;
};

type Props = {
  active?: string;
  crumbs?: Crumb[];
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  courseContext?: CourseTag & { otherCourses?: CourseTag[] };
};

const defaultCourseContext = {
  code: "PMP®",
  package: "Gold" as const,
  otherCourses: [{ code: "CAPM®", package: "Silver" as const, slug: "capm" }],
};

export default function LmsFrame({
  active = "Dashboard",
  crumbs,
  title,
  subtitle,
  right,
  children,
  courseContext = defaultCourseContext,
}: Props) {
  return (
    <div className="app lms-app">
      <Sidebar active={active} bottomVariant="gold" courseContext={courseContext} />
      <div className="lms-page">
        {crumbs && crumbs.length > 0 && (
          <nav className="lms-crumb">
            {crumbs.map((c, i) => (
              <span key={c.label} className="lms-crumb-item">
                {c.href ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <i className="fa-solid fa-chevron-right"></i>
                )}
              </span>
            ))}
          </nav>
        )}

        {(title || right) && (
          <header className="lms-head">
            <div>
              {title && <h1>{title}</h1>}
              {subtitle && <p>{subtitle}</p>}
            </div>
            {right && <div className="lms-head-right">{right}</div>}
          </header>
        )}

        <div className="lms-body">{children}</div>
      </div>
    </div>
  );
}
