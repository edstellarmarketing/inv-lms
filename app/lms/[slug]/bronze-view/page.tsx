import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Tile = {
  title: string;
  subtitle: string;
  icon: string;
  tone: "blue" | "purple" | "orange" | "green" | "teal" | "pink";
  href?: string;
  locked?: "silver" | "gold";
  lockedReason?: string;
};

const unlocked: Tile[] = [
  { title: "Reference Cards",  subtitle: "12 quick concept reminders", icon: "fa-solid fa-bookmark",            tone: "blue",   href: "/lms/pmp/reference/integration-management" },
  { title: "Study Guides",     subtitle: "14 long-form chapters",       icon: "fa-solid fa-book-open-reader",    tone: "purple", href: "/lms/pmp/study-guide/pmbok-7" },
  { title: "Glossary",         subtitle: "240 terms · A–Z",             icon: "fa-solid fa-language",            tone: "green",  href: "/lms/pmp/glossary" },
  { title: "Q-bank",           subtitle: "750 questions · Easy + Med",  icon: "fa-solid fa-circle-question",     tone: "orange", href: "/lms/pmp/question-bank" },
  { title: "Mini Mocks",       subtitle: "3 timed papers",              icon: "fa-solid fa-stopwatch",           tone: "pink",   href: "/lms/pmp/mock-exam/1" },
  { title: "Community",        subtitle: "Read-only access",            icon: "fa-solid fa-users",               tone: "teal",   href: "/lms/pmp/community" },
];

const locked: Tile[] = [
  { title: "AI Study Plan",         subtitle: "Personalised calendar to exam", icon: "fa-solid fa-wand-magic-sparkles", tone: "orange", locked: "silver", lockedReason: "Upgrade to Silver to unlock all AI tools" },
  { title: "AI Gap Report",         subtitle: "Weekly weakest-topic analysis",  icon: "fa-solid fa-magnifying-glass-chart", tone: "orange", locked: "silver" },
  { title: "Adaptive Flashcards",   subtitle: "SM-2 spaced repetition",         icon: "fa-solid fa-clone",               tone: "orange", locked: "silver" },
  { title: "Concept Coach (chat)",  subtitle: "AI Q&A with citations",          icon: "fa-regular fa-comments",          tone: "orange", locked: "silver" },
  { title: "1:1 Coaching",          subtitle: "6 sessions per cycle",           icon: "fa-solid fa-user-graduate",       tone: "pink",   locked: "gold",   lockedReason: "Upgrade to Gold for 1:1 coaching" },
  { title: "Scenario Coach",        subtitle: "Branching dialogues (Practitioner)", icon: "fa-solid fa-route",          tone: "pink",   locked: "gold" },
  { title: "Phone Support",         subtitle: "Priority callback",              icon: "fa-solid fa-phone",               tone: "pink",   locked: "gold" },
  { title: "Money-back Guarantee",  subtitle: "Honoured if gate is met",        icon: "fa-solid fa-shield-halved",       tone: "pink",   locked: "gold" },
];

const tierMeta = {
  silver: { label: "Silver", color: "#475569" },
  gold:   { label: "Gold",   color: "#d97706" },
};

export default function BronzeViewPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Bronze tier · locks" },
      ]}
      title="🥉 Your Bronze view"
      subtitle="A reduced version of the dashboard — AI tools and Coaching show as locked with Upgrade CTAs. Core content is fully available."
      right={
        <span className="bv-tier-pill">
          <i className="fa-solid fa-award"></i> BRONZE
        </span>
      }
    >
      <section className="bv-info">
        <i className="fa-solid fa-circle-info"></i>
        <div>
          <strong>What you get on Bronze</strong>
          <p>
            Full reference cards, study guides, glossary, easy/medium Q-bank, and
            3 mini mock papers. AI tools, coaching, phone support, and the
            money-back guarantee require an upgrade.
          </p>
        </div>
      </section>

      <section className="bv-section">
        <header><h3>✓ Available on Bronze</h3><small>{unlocked.length} tiles</small></header>
        <div className="bv-grid">
          {unlocked.map((t) => (
            <Link key={t.title} href={t.href ?? "#"} className={`bv-tile ${t.tone}`}>
              <span className={`bv-tile-icon ${t.tone}`}><i className={t.icon}></i></span>
              <strong>{t.title}</strong>
              <small>{t.subtitle}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="bv-section">
        <header><h3>🔒 Locked tiles</h3><small>{locked.length} tiles · upgrade to unlock</small></header>
        <div className="bv-grid">
          {locked.map((t) => (
            <article key={t.title} className={`bv-tile locked ${t.tone}`}>
              <span className="bv-lock"><i className="fa-solid fa-lock"></i></span>
              <span className={`bv-tile-icon ${t.tone} muted`}><i className={t.icon}></i></span>
              <strong>{t.title}</strong>
              <small>{t.subtitle}</small>
              <button type="button" className={`bv-upgrade ${t.locked}`}>
                Upgrade to {tierMeta[t.locked!].label} →
              </button>
            </article>
          ))}
        </div>
      </section>
    </LmsFrame>
  );
}
