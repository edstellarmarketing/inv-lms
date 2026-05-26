import Link from "next/link";
import AuthFrame from "../../components/AuthFrame";

export default function ForgotSentPage() {
  return (
    <AuthFrame
      title="Check your inbox"
      subtitle="We sent a reset link to alex.johnson@example.com."
      footerHint={
        <span>
          Didn&apos;t get it? <Link href="/auth/forgot-password">Resend</Link>
        </span>
      }
    >
      <div className="auth-illus-block">
        <div className="auth-illus-icon"><i className="fa-regular fa-envelope-open"></i></div>
        <p>
          The link is valid for 30 minutes. Open it on this device to reset your
          password.
        </p>
      </div>
      <Link href="/auth/reset-password/abc123" className="auth-cta">
        Open the demo reset link <i className="fa-solid fa-arrow-right"></i>
      </Link>
      <Link href="/auth/login" className="auth-secondary">
        Back to sign in
      </Link>
    </AuthFrame>
  );
}
