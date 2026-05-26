import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Tool = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tone: "blue" | "purple" | "green" | "orange" | "pink" | "teal" | "indigo";
  href: string;
  group: "prep" | "active";
  tier?: "silver" | "gold";
  badge?: string;
  freshness?: string;
  lastUsed?: string;
};

const tools: Tool[] = [
  // Exam Prep AI
  { id:"plan",     group:"prep", title:"AI Study Plan",         subtitle:"Personalised calendar to your exam date", icon:"fa-solid fa-calendar-days",       tone:"blue",   href:"/lms/pmp/ai/study-plan",     freshness:"Updated today", lastUsed:"2h ago" },
  { id:"gap",      group:"prep", title:"AI Gap Report",         subtitle:"Weekly weakness diagnosis · 5 actions",   icon:"fa-solid fa-magnifying-glass-chart", tone:"orange", href:"/lms/pmp/ai/gap-report",     freshness:"New report Sun", lastUsed:"Yesterday", badge:"Needs ack" },
  { id:"flash",    group:"prep", title:"Adaptive Flashcards",   subtitle:"SM-2 spaced repetition · 18 due today",    icon:"fa-solid fa-clone",                  tone:"teal",   href:"/lms/pmp/ai/flashcards",     freshness:"18 cards due",  lastUsed:"This morning" },
  // Active Learning AI
  { id:"concept",  group:"active", title:"Concept Coach",        subtitle:"Chat with citations into reference cards", icon:"fa-regular fa-comments",          tone:"purple", href:"/lms/pmp/ai/concept-coach",  lastUsed:"3h ago" },
  { id:"scenario", group:"active", title:"Scenario Coach",       subtitle:"Branching dialogue · Practitioner only",   icon:"fa-solid fa-route",                tone:"pink",   href:"/lms/pmp/ai/scenario-coach", tier:"gold" },
  { id:"interview",group:"active", title:"Interview Coach",      subtitle:"STAR rubric · post-exam prep",             icon:"fa-solid fa-microphone",          tone:"indigo", href:"/lms/pmp/ai/interview-coach" },
  { id:"daily",    group:"active", title:"Daily Challenge",      subtitle:"One scenario a day · cohort comments",     icon:"fa-solid fa-fire",                tone:"green",  href:"/lms/pmp/ai/daily-challenge", badge:"New today" },
];

const prep = tools.filter(t => t.group === "prep");
const active = tools.filter(t => t.group === "active");

function ToolCard({ t }: { t: Tool }) {
  return (
    <Link href={t.href} className={`ai-tool ${t.tone}`}>
      <header>
        <span className={`ai-tool-icon ${t.tone}`}><i className={t.icon}></i></span>
        <div className="ai-tool-badges">
          {t.tier === "gold" && <span className="pill pill-gold"><i className="fa-solid fa-crown"></i> Gold</span>}
          {t.badge && <span className="ai-badge">{t.badge}</span>}
        </div>
      </header>
      <strong>{t.title}</strong>
      <small>{t.subtitle}</small>
      <footer>
        {t.freshness && <span className="ai-freshness"><i className="fa-solid fa-sparkles"></i> {t.freshness}</span>}
        {t.lastUsed && <span className="ai-lastused">Last used {t.lastUsed}</span>}
      </footer>
    </Link>
  );
}

export default function AiSectionPage() {
  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools" },
      ]}
      title="🤖 AI tools"
      subtitle="Seven tools that adapt to your performance signals — your study plan, gap report, and coaches all read from the same data."
      right={
        <Link href="/lms/pmp/ai/states/cap-reached" className="ai-cap-pill">
          <i className="fa-regular fa-circle-check"></i>
          <span>
            <small>Daily AI usage</small>
            <strong>42 / 200 prompts</strong>
          </span>
        </Link>
      }
    >
      <section className="ai-section">
        <header className="ai-section-head">
          <h3>📝 Exam Prep AI</h3>
          <small>Output-driven · plan your week, find your gaps, drill your weak spots</small>
        </header>
        <div className="ai-grid">
          {prep.map(t => <ToolCard key={t.id} t={t} />)}
        </div>
      </section>

      <section className="ai-section">
        <header className="ai-section-head">
          <h3>💬 Active Learning AI</h3>
          <small>Conversational · ask, debate, and rehearse</small>
        </header>
        <div className="ai-grid">
          {active.map(t => <ToolCard key={t.id} t={t} />)}
        </div>
      </section>

      <section className="ai-foot">
        <article>
          <i className="fa-solid fa-shield-halved"></i>
          <div>
            <strong>How the AI knows you</strong>
            <p>
              All seven tools share a single context layer — your baseline mock,
              latest gap report, Q-bank coverage, and last 10 mock attempts.
              Out-of-syllabus queries get a polite refusal; daily token cap
              prevents runaway costs.
            </p>
          </div>
        </article>
      </section>
    </LmsFrame>
  );
}
