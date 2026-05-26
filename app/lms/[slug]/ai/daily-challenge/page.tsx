import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const today = {
  date: "26 May 2026",
  topic: "Stakeholder engagement assessment",
  scenario: "Your sponsor is positive but uninformed. Your end-users are negative and unaware they will be affected. Your steering committee is neutral. Plot them on the engagement assessment matrix — and pick one action for each.",
  revealed: false,
};

const archive = [
  { date: "25 May", topic: "EVM under fixed-price contracts",      reactions: 142 },
  { date: "24 May", topic: "When to use crashing vs fast-tracking", reactions: 98 },
  { date: "23 May", topic: "Closing a deliverable with open risks",  reactions: 167 },
  { date: "22 May", topic: "Earned value when scope changes mid-project", reactions: 211 },
];

const comments = [
  { who: "Arjun K.", initials: "AK", tone: "blue",   text: "I'd start with the end-users — get ahead of the resistance before they hear it from elsewhere." },
  { who: "Meera S.", initials: "MS", tone: "pink",   text: "Sponsor first IMO. Get them informed → ally → that buys you cover with the users." },
  { who: "Saurabh P.", initials: "SP", tone: "orange", text: "Both are right. The matrix says start with whoever's farthest from where they need to be." },
];

export default function DailyChallengePage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Daily Challenge" },
      ]}
      title="🔥 Daily Challenge"
      subtitle={`${today.date} · one scenario a day · pinned to your dashboard until you complete it.`}
    >
      <section className="dc-hero">
        <article>
          <span className="dc-pill">🔥 New today</span>
          <h2>{today.topic}</h2>
          <p>{today.scenario}</p>
          <div className="dc-input">
            <textarea rows={4} placeholder="Your answer · 2–3 sentences works…"></textarea>
            <button type="button" className="dc-submit">Submit &amp; reveal model answer</button>
          </div>
        </article>
      </section>

      <section className="dc-comments-card">
        <header><h3>Cohort discussion · 47 replies</h3><small>Read others after you submit · be honest</small></header>
        <ul className="dc-comments">
          {comments.map((c, i) => (
            <li key={i}>
              <span className={`dc-avatar ${c.tone}`}>{c.initials}</span>
              <div>
                <strong>{c.who}</strong>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="dc-archive">
        <header><h3>Past challenges</h3><small>4 most recent · scroll for full archive</small></header>
        <ul>
          {archive.map((a, i) => (
            <li key={i}>
              <small>{a.date}</small>
              <strong>{a.topic}</strong>
              <span><i className="fa-regular fa-comment"></i> {a.reactions}</span>
            </li>
          ))}
        </ul>
      </section>
    </LmsFrame>
  );
}
