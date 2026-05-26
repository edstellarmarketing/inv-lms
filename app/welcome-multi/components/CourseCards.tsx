import Link from "next/link";

type Course = {
  slug: string;
  code: string;
  name: string;
  package: "Gold" | "Silver";
  progress: number;
  status: string;
  accent: "gold" | "silver";
};

const courses: Course[] = [
  {
    slug: "pmp",
    code: "PMP®",
    name: "Project Management Professional",
    package: "Gold",
    progress: 36,
    status: "You're making good progress",
    accent: "gold",
  },
  {
    slug: "capm",
    code: "CAPM®",
    name: "Certified Associate in Project Management",
    package: "Silver",
    progress: 18,
    status: "Keep going, you're on track",
    accent: "silver",
  },
];

export default function CourseCards() {
  return (
    <section className="mw-courses">
      <div className="mw-section-head">
        <h3>Your Courses</h3>
        <small>Pick where you left off or jump between courses anytime.</small>
      </div>

      <div className="mw-courses-grid">
        {courses.map((c) => (
          <article key={c.slug} className={`mw-course-card ${c.accent}`}>
            <div className="mwc-top">
              <div className="mwc-id">
                <span className="mwc-code-icon">
                  <i className="fa-solid fa-award"></i>
                </span>
                <div>
                  <strong className="mwc-code">{c.code}</strong>
                  <p>{c.name}</p>
                </div>
              </div>
              <span className={`pill pill-${c.package.toLowerCase()} mwc-pill`}>
                <i
                  className={`fa-solid ${
                    c.package === "Gold" ? "fa-crown" : "fa-medal"
                  }`}
                ></i>
                {c.package}
              </span>
            </div>

            <div className="mwc-status">{c.status}</div>

            <div className="mwc-progress">
              <div className="mwc-progress-row">
                <strong>{c.progress}%</strong>
                <small>Course Progress</small>
              </div>
              <div className={`mwc-bar ${c.accent}`}>
                <span style={{ width: `${c.progress}%` }} />
              </div>
            </div>

            <Link href={`/lms/${c.slug}`} className={`mwc-cta ${c.accent}`}>
              Continue Learning <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>
        ))}

        <article className="mw-add-card">
          <div className="mw-add-icon">
            <i className="fa-solid fa-plus"></i>
          </div>
          <strong>Add Another Course</strong>
          <p>Expand your skills with more certifications and bundles.</p>
          <Link href="#" className="mw-add-cta">
            Explore Courses <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </div>
    </section>
  );
}
