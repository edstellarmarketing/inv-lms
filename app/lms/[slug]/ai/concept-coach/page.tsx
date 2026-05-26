import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Msg = { from: "you" | "ai"; text: React.ReactNode; citations?: { title: string; href: string }[] };

const messages: Msg[] = [
  { from: "you", text: "Explain why CV is negative when CPI < 1. I always mix these up." },
  { from: "ai",  text: <>Great question. <strong>CV (Cost Variance)</strong> = EV − AC. <strong>CPI</strong> = EV / AC. They measure the same thing (cost performance) but as a difference vs a ratio.<br /><br />If CPI &lt; 1, then AC &gt; EV (you spent more than the work earned). That means EV − AC is negative, so <strong>CV is also negative</strong>. The signs always match.</>, citations: [{ title: "Cost Mgmt · EVM section", href: "/lms/pmp/reference/cost-management" }, { title: "PMBOK 7th Ed · Ch 4", href: "/lms/pmp/study-guide/pmbok-7" }] },
  { from: "you", text: "Got it. What about negative SPI?" },
  { from: "ai",  text: <>Same logic, schedule side. SPI = EV / PV. If SPI &lt; 1, PV &gt; EV (the work planned for this point hasn't all been earned yet), so SV = EV − PV is negative.<br /><br />Memory hook: <em>negative variance and ratio &lt; 1 always mean trouble</em>.</>, citations: [{ title: "Schedule Mgmt", href: "/lms/pmp/reference/schedule-management" }] },
];

const suggestions = [
  "What's the difference between EAC and ETC?",
  "Give me an exam question on procurement contract types",
  "When do I use EVM in an Agile project?",
];

export default function ConceptCoachPage() {
  return (
    <LmsFrame
      active="AI Study Assistant"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Concept Coach" },
      ]}
      title="💬 Concept Coach"
      subtitle="Ask anything in the PMP® syllabus. Answers come with citations into reference cards and study guides."
      right={
        <Link href="/lms/pmp/ai/states/cap-reached" className="cc-cap">
          <small>Today's usage</small>
          <strong>42 / 200</strong>
        </Link>
      }
    >
      <section className="cc-chat">
        <div className="cc-messages">
          {messages.map((m, i) => (
            <div key={i} className={`cc-msg ${m.from}`}>
              <span className={`cc-avatar ${m.from === "ai" ? "ai" : "you"}`}>
                {m.from === "ai" ? <i className="fa-solid fa-robot"></i> : "VK"}
              </span>
              <div className="cc-body">
                <div className="cc-text">{m.text}</div>
                {m.citations && (
                  <div className="cc-cites">
                    <small>Sources:</small>
                    {m.citations.map((c, ci) => (
                      <Link key={ci} href={c.href} className="cc-cite">
                        <i className="fa-solid fa-link"></i> {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="cc-input">
          <input type="text" placeholder="Ask the concept coach…" />
          <button type="button"><i className="fa-solid fa-paper-plane"></i></button>
        </div>

        <div className="cc-suggestions">
          <small>Try:</small>
          {suggestions.map((s, i) => (
            <button key={i} type="button">{s}</button>
          ))}
        </div>
      </section>

      <section className="cc-foot">
        <i className="fa-solid fa-circle-info"></i>
        <span>The coach refuses out-of-syllabus questions and won't answer hypotheticals about specific exam questions. Read the <Link href="/lms/pmp/ai/states/refusal">refusal copy</Link>.</span>
      </section>
    </LmsFrame>
  );
}
