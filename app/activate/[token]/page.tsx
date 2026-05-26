import Link from "next/link";
import AuthFrame from "../../auth/components/AuthFrame";

export default function ActivateLandingPage() {
  return (
    <AuthFrame
      title="Your PMP® Gold programme is ready"
      subtitle="You purchased PMP® Gold on invensislearning.com. Activate your account to begin."
      wide
      footerHint={
        <span>
          Already activated? <Link href="/auth/login">Sign in</Link>
        </span>
      }
    >
      <div className="activate-card">
        <div className="activate-cert">
          <div className="cert-top">
            <i className="fa-solid fa-award"></i>
            <strong>PMP®</strong>
          </div>
          <span className="cert-divider" />
          <small>Project Management Professional</small>
        </div>
        <div className="activate-meta">
          <span className="pill pill-gold-lg">
            <i className="fa-solid fa-crown"></i> Gold
          </span>
          <h3>PMP® Certification</h3>
          <p>Comprehensive coverage. Expert guidance. Maximum results.</p>
          <ul className="activate-list">
            <li><i className="fa-solid fa-circle-check"></i> Full 35-hour live training</li>
            <li><i className="fa-solid fa-circle-check"></i> 500+ practice questions and 6 mock exams</li>
            <li><i className="fa-solid fa-circle-check"></i> AI study plan, gap report, and concept coach</li>
            <li><i className="fa-solid fa-circle-check"></i> 3 × 1:1 coaching credits and money-back guarantee</li>
          </ul>
        </div>
      </div>

      <Link href="/auth/activate" className="auth-cta">
        Activate your account <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </AuthFrame>
  );
}
