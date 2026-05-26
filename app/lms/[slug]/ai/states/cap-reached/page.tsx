import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

const cap = {
  used: 200,
  limit: 200,
  resumesAt: "Tomorrow · 09:00 IST",
  hoursToReset: 14,
};

export default function CapReachedPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Daily limit reached" },
      ]}
      title="⏸️ Daily AI limit reached"
      subtitle="You've used today's allowance. Resets at 09:00 IST tomorrow."
    >
      <section className="cr-stage">
        <article className="cr-card">
          <div className="cr-icon">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>
          <h2>You're at the daily limit</h2>
          <p>
            You've used <strong>{cap.used} of {cap.limit}</strong> AI prompts today.
            Resumes in <strong>{cap.hoursToReset} hours</strong> ({cap.resumesAt}).
          </p>

          <div className="cr-bar">
            <div className="cr-bar-fill" style={{ width: "100%" }}></div>
          </div>

          <p className="cr-no-upsell">
            <i className="fa-solid fa-shield-halved"></i>
            We deliberately don't sell you "more prompts". The cap is set high
            enough that most learners never hit it — bumping it past 200 means
            you're using the AI as a search engine, not a coach.
          </p>

          <div className="cr-alt">
            <strong>What to do meanwhile</strong>
            <div className="cr-alt-grid">
              <Link href="/lms/pmp/ai/flashcards"><i className="fa-solid fa-clone"></i><span>Flashcards · no cap</span></Link>
              <Link href="/lms/pmp/ai/study-plan"><i className="fa-solid fa-calendar-days"></i><span>Study plan · view-only</span></Link>
              <Link href="/lms/pmp/question-bank"><i className="fa-solid fa-circle-question"></i><span>Q-bank · unlimited</span></Link>
              <Link href="/lms/pmp/study-guide/pmbok-7"><i className="fa-solid fa-book-open-reader"></i><span>Study guides</span></Link>
            </div>
          </div>
        </article>
      </section>
    </LmsFrame>
  );
}
