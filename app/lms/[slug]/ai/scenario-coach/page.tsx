import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const scenario = {
  title: "Stakeholder conflict at sprint review",
  context: "You're the project manager for a 9-person team. At sprint review, the product owner publicly accuses a developer of missing a deadline. The developer pushes back: the deadline was never agreed in planning. Tempers rise.",
  turn: 3,
  totalTurns: 5,
};

const choices = [
  { letter: "A", text: "Call a 10-minute break to let tempers cool, then mediate.",                     rubric: "Pragmatic · short-term de-escalation" },
  { letter: "B", text: "Address it publicly — set ground rules for blame in retro.",                    rubric: "Norm-setting · longer-term cultural fix" },
  { letter: "C", text: "Speak to both individually after, document the planning gap, fix the process.", rubric: "Root-cause · process-level intervention" },
  { letter: "D", text: "Escalate to the program manager.",                                              rubric: "Avoids ownership · usually wrong" },
];

const history = [
  { turn: 1, scenario: "Mid-sprint, your client adds a P0 feature.",   choice: "C — Negotiate scope-time trade-off", rubric: "Good — preserves baseline, transparent." },
  { turn: 2, scenario: "Developer resigns 3 weeks before delivery.",   choice: "B — Re-plan around remaining team", rubric: "Pragmatic — though A (renegotiate scope) was also strong." },
];

export default function ScenarioCoachPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Scenario Coach" },
      ]}
      title="🎭 Scenario Coach"
      subtitle="Branching 4–6 turn dialogues. Practitioner-only. Each pick changes the next scenario."
      right={
        <span className="sc-tier">
          <span className="pill pill-gold"><i className="fa-solid fa-crown"></i> Gold</span>
          <small>Practitioner-level</small>
        </span>
      }
    >
      <section className="sc-progress">
        <div className="sc-progress-bar">
          {Array.from({ length: scenario.totalTurns }).map((_, i) => (
            <span key={i} className={`sc-tick ${i + 1 < scenario.turn ? "done" : i + 1 === scenario.turn ? "current" : ""}`}>{i + 1}</span>
          ))}
        </div>
        <small>Turn {scenario.turn} of {scenario.totalTurns}</small>
      </section>

      <section className="sc-stage">
        <article className="sc-scenario">
          <header>
            <span className="sc-tag">Scenario</span>
            <h3>{scenario.title}</h3>
          </header>
          <p>{scenario.context}</p>

          <div className="sc-choices">
            <small>What do you do?</small>
            {choices.map(c => (
              <button key={c.letter} type="button" className="sc-choice">
                <span className="sc-letter">{c.letter}</span>
                <div>
                  <strong>{c.text}</strong>
                  <small>{c.rubric}</small>
                </div>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="sc-history">
        <header><h3>Your conversation so far</h3></header>
        <ol>
          {history.map(h => (
            <li key={h.turn}>
              <strong>Turn {h.turn} · {h.scenario}</strong>
              <p>You chose: <em>{h.choice}</em></p>
              <small>{h.rubric}</small>
            </li>
          ))}
        </ol>
      </section>
    </LmsFrame>
  );
}
