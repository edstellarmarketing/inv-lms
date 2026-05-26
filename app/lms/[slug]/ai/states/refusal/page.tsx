import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

const userQuery = "Explain SAFe framework principles to me.";

const suggestions = [
  { topic: "Agile / Hybrid life-cycles", href: "/lms/pmp/study-guide/pmbok-7" },
  { topic: "Tailoring decisions",          href: "/lms/pmp/ai/concept-coach" },
  { topic: "Hybrid pacing under Process domain pressure", href: "/lms/pmp/question-bank?cluster=process" },
];

export default function RefusalStatePage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Concept Coach", href: "/lms/pmp/ai/concept-coach" },
        { label: "Out-of-syllabus refusal" },
      ]}
      title="↩️ Out-of-syllabus state"
      subtitle="The Concept Coach refuses topics outside PMP® content with a redirect — never with an 'I don't know'."
    >
      <section className="rf-stage">
        <article className="rf-card">
          <header>
            <span className="rf-pill"><i className="fa-solid fa-circle-exclamation"></i> Outside syllabus</span>
          </header>

          <div className="rf-your">
            <small>You asked</small>
            <p>"{userQuery}"</p>
          </div>

          <div className="rf-ai">
            <p>
              <strong>SAFe</strong> is outside the PMP® syllabus — it's a Scaled Agile
              framework that PMI tests at the awareness level only (not application).
              Diving deep into SAFe principles won't lift your readiness composite.
            </p>
            <p>What I <em>can</em> help with from your current weak spots:</p>
            <ul className="rf-suggestions">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <Link href={s.href}>
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>{s.topic}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="rf-foot-text">
              If you genuinely need SAFe later, the PMI-ACP® course on{" "}
              <a href="https://www.invensislearning.com/training/pmi-acp" target="_blank" rel="noreferrer">invensislearning.com</a> covers it.
              For PMP® prep, stay focused.
            </p>
          </div>
        </article>
      </section>

      <section className="rf-rationale">
        <article>
          <i className="fa-solid fa-circle-info"></i>
          <div>
            <strong>Why this refusal exists</strong>
            <p>
              An "I don't know" dead-ends the learner. A redirect with 3 in-scope
              alternatives gives them a useful next move — even if it's not the one
              they asked for. Always 3 suggestions, never zero.
            </p>
          </div>
        </article>
      </section>
    </LmsFrame>
  );
}
