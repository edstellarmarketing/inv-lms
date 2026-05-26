import Link from "next/link";

export default function GetStartedCTA() {
  return (
    <div className="get-started">
      <Link href="/onboarding/profile" className="gs-btn">
        Get Started <i className="fa-solid fa-arrow-right"></i>
      </Link>
      <small>
        <i className="fa-regular fa-clock"></i> Takes less than 3 minutes. You can always
        update it later.
      </small>
    </div>
  );
}
