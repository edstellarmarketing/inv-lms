import Link from "next/link";

type Course = {
  slug: string;
  code: string;
  name: string;
  package: "Gold" | "Silver";
  progress: number;
};

const courses: Course[] = [
  {
    slug: "pmp",
    code: "PMP®",
    name: "Project Management Professional",
    package: "Gold",
    progress: 36,
  },
  {
    slug: "capm",
    code: "CAPM®",
    name: "Certified Associate in Project Management",
    package: "Silver",
    progress: 18,
  },
];

type Props = {
  activeSlug?: string;
};

export default function CourseSwitcher({ activeSlug = "pmp" }: Props) {
  return (
    <section className="cs-card">
      <div className="cs-head">
        <div>
          <h3>Switch Course</h3>
          <small>Tap a course to view its dashboard. You can switch any time.</small>
        </div>
        <Link href="/welcome-multi" className="cs-overview">
          See all courses <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="cs-grid">
        {courses.map((c) => {
          const active = c.slug === activeSlug;
          const tone = c.package === "Gold" ? "gold" : "silver";
          return (
            <Link
              key={c.slug}
              href={`/dashboard/${c.slug}`}
              className={`cs-tab ${tone}${active ? " active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <div className="cs-tab-top">
                <span className={`cs-tab-icon ${tone}`}>
                  <i className="fa-solid fa-award"></i>
                </span>
                <div className="cs-tab-id">
                  <strong>{c.code}</strong>
                  <small>{c.name}</small>
                </div>
                <span className={`pill pill-${tone} cs-tab-pill`}>
                  <i
                    className={`fa-solid ${
                      c.package === "Gold" ? "fa-crown" : "fa-medal"
                    }`}
                  ></i>
                  {c.package}
                </span>
              </div>

              <div className="cs-tab-progress">
                <div className={`cs-bar ${tone}`}>
                  <span style={{ width: `${c.progress}%` }} />
                </div>
                <div className="cs-tab-meta">
                  <span>{c.progress}% complete</span>
                  {active ? (
                    <span className="cs-active-flag">
                      <i className="fa-solid fa-circle-check"></i> Currently viewing
                    </span>
                  ) : (
                    <span className="cs-switch-flag">
                      Switch to course <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
