import Link from "next/link";
import AuthFrame from "../components/AuthFrame";

export default function SetPasswordPage() {
  return (
    <AuthFrame
      title="Set your password"
      subtitle="One last step before you start your PMP® journey."
      footerHint={
        <span>
          Already activated? <Link href="/auth/login">Sign in</Link>
        </span>
      }
    >
      <form className="auth-form" action="/welcome">
        <label className="auth-field">
          <span>Email</span>
          <input type="email" value="alex.johnson@example.com" readOnly />
        </label>

        <label className="auth-field">
          <span>Create password</span>
          <div className="auth-input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="At least 8 characters" defaultValue="••••••••••" />
            <i className="fa-regular fa-eye"></i>
          </div>
        </label>

        <label className="auth-field">
          <span>Confirm password</span>
          <div className="auth-input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Re-enter password" defaultValue="••••••••••" />
            <i className="fa-regular fa-eye"></i>
          </div>
        </label>

        <ul className="auth-pwhints">
          <li><i className="fa-solid fa-circle-check"></i> At least 8 characters</li>
          <li><i className="fa-solid fa-circle-check"></i> One uppercase letter</li>
          <li><i className="fa-solid fa-circle-check"></i> One number</li>
          <li className="muted"><i className="fa-regular fa-circle"></i> One special character</li>
        </ul>

        <label className="auth-check">
          <input type="checkbox" defaultChecked /> I agree to the{" "}
          <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
        </label>

        <button type="submit" className="auth-cta">
          Activate and continue <i className="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </AuthFrame>
  );
}
