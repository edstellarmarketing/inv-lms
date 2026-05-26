import Link from "next/link";
import AuthFrame from "../components/AuthFrame";

export default function ForgotPasswordPage() {
  return (
    <AuthFrame
      title="Forgot your password?"
      subtitle="Enter the email you used to enrol — we'll send a reset link."
      footerHint={
        <span>
          Remembered it? <Link href="/auth/login">Back to sign in</Link>
        </span>
      }
    >
      <form className="auth-form" action="/auth/forgot-password/sent">
        <label className="auth-field">
          <span>Email</span>
          <div className="auth-input">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              placeholder="you@example.com"
              defaultValue="alex.johnson@example.com"
            />
          </div>
        </label>

        <button type="submit" className="auth-cta">
          Send reset link <i className="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </AuthFrame>
  );
}
