import Link from "next/link";
import AuthFrame from "../components/AuthFrame";

export default function LoginPage() {
  return (
    <AuthFrame
      title="Welcome back"
      subtitle="Sign in to continue your PMP® journey."
      footerHint={
        <span>
          New here?{" "}
          <Link href="/activate/abc123">Activate your account</Link>
        </span>
      }
    >
      <form className="auth-form" action="/dashboard">
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

        <label className="auth-field">
          <div className="row-between">
            <span>Password</span>
            <Link href="/auth/forgot-password" className="muted-link">
              Forgot password?
            </Link>
          </div>
          <div className="auth-input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="••••••••" defaultValue="••••••••••" />
            <i className="fa-regular fa-eye"></i>
          </div>
        </label>

        <label className="auth-check">
          <input type="checkbox" /> Keep me signed in
        </label>

        <button type="submit" className="auth-cta">
          Sign in <i className="fa-solid fa-arrow-right"></i>
        </button>

        <div className="auth-divider"><span>or</span></div>

        <button type="button" className="auth-sso">
          <i className="fa-brands fa-google"></i> Continue with Google
        </button>
      </form>
    </AuthFrame>
  );
}
