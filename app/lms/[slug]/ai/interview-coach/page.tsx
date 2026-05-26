import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const role = { title: "Engineering Manager · IT services", desc: "5 PM interview questions calibrated for a senior PMP role." };

const question = {
  num: 3,
  total: 5,
  prompt: "Tell me about a time you led a project that was at risk of failure. What did you do?",
  hint: "Use STAR: Situation, Task, Action, Result.",
};

const previous = [
  { num: 1, q: "How do you handle stakeholder conflict?",      yourScore: 4, feedback: "Strong situation, clear actions, weak on quantified result." },
  { num: 2, q: "Walk me through a project you scoped poorly.", yourScore: 3, feedback: "Good honesty. Spend more time on lessons learned (Result)." },
];

export default function InterviewCoachPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Interview Coach" },
      ]}
      title="🎤 Interview Coach"
      subtitle="Mock interview questions calibrated to your role. STAR-rubric feedback after every answer."
    >
      <section className="ic-role">
        <article>
          <small>Calibrated for</small>
          <strong>{role.title}</strong>
          <p>{role.desc}</p>
          <button type="button" className="ic-change">Change role</button>
        </article>
      </section>

      <section className="ic-question">
        <header>
          <span className="ic-num">Question {question.num} of {question.total}</span>
          <span className="ic-star">⭐ STAR rubric</span>
        </header>
        <h2>{question.prompt}</h2>
        <small className="ic-hint">{question.hint}</small>
        <div className="ic-answer">
          <textarea rows={6} placeholder="Type your answer here · 2–3 minutes typical length…"></textarea>
          <div className="ic-toolbar">
            <button type="button" className="ic-mic"><i className="fa-solid fa-microphone"></i> Record voice</button>
            <button type="button" className="ic-submit"><i className="fa-solid fa-arrow-right"></i> Submit for feedback</button>
          </div>
        </div>
      </section>

      <section className="ic-history">
        <header><h3>Your previous answers</h3></header>
        <ul>
          {previous.map(p => (
            <li key={p.num}>
              <div className="ic-prev-q">
                <strong>Q{p.num}.</strong> {p.q}
              </div>
              <div className="ic-prev-score">
                <span>{"★".repeat(p.yourScore)}{"☆".repeat(5 - p.yourScore)}</span>
                <small>{p.feedback}</small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </LmsFrame>
  );
}
