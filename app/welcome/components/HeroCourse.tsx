import HeroIllustration from "./HeroIllustration";

export default function HeroCourse() {
  return (
    <section className="hero-course">
      <div className="hero-left">
        <div className="cert-card">
          <div className="cert-top">
            <i className="fa-solid fa-award"></i>
            <strong>PMP®</strong>
          </div>
          <span className="cert-divider" />
          <small>Project Management Professional</small>
          <div className="cert-seal">
            <i className="fa-solid fa-certificate"></i>
          </div>
        </div>

        <div className="cert-meta">
          <h2>PMP® Certification</h2>
          <p className="muted">Project Management Professional</p>
          <span className="pill pill-gold-lg">
            <i className="fa-solid fa-crown"></i> Gold
          </span>
          <p className="cert-tag">
            Comprehensive coverage. Expert guidance. Maximum results.
          </p>
        </div>
      </div>

      <div className="hero-illus-wrap">
        <HeroIllustration />
      </div>
    </section>
  );
}
