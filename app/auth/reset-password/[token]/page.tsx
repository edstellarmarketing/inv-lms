import Link from "next/link";
import AuthFrame from "../../components/AuthFrame";

export default function ResetPasswordPage() {
  return (
    <AuthFrame
      title="Choose a new password"
      subtitle="Pick something strong — at least 8 characters, mixing letters, numbers, and symbols."
      footerHint={
        <span>
          Remembered it? <Link href="/auth/login">Back to sign in</Link>
        </span>
      }
    >
      <form className="auth-form" action="/auth/login">
        <label className="auth-field">
          <span>New password</span>
          <div className="auth-input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="New password" defaultValue="••••••••••" />
            <i className="fa-regular fa-eye"></i>
          </div>
        </label>
        <label className="auth-field">
          <span>Confirm password</span>
          <div className="auth-input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Confirm password" defaultValue="••••••••••" />
            <i className="fa-regular fa-eye"></i>
          </div>
        </label>
        <button type="submit" className="auth-cta">
          Reset password <i className="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </AuthFrame>
  );
}
