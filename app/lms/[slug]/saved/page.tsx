import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Bookmark = {
  type: "reference" | "study-guide" | "glossary" | "qbank" | "mock";
  title: string;
  subtitle: string;
  href: string;
  savedOn: string;
};

const bookmarks: Bookmark[] = [
  { type: "reference",   title: "Project Integration Management — EVM section", subtitle: "Reference card · 12 sections · 35 min",      href: "/lms/pmp/reference/integration-management", savedOn: "Today · 14:12" },
  { type: "study-guide", title: "PMBOK Guide 7th Ed. · Performance Domains",     subtitle: "Study guide · Chapter 3 · 22 min",            href: "/lms/pmp/study-guide/pmbok-7",              savedOn: "Yesterday · 21:08" },
  { type: "reference",   title: "Project Cost Management",                       subtitle: "Reference card · 9 sections · 24 min",        href: "/lms/pmp/reference/cost-management",        savedOn: "22 May" },
  { type: "qbank",       title: "Process domain — wrong answers pool",           subtitle: "47 questions to review",                      href: "/lms/pmp/question-bank?cluster=process&wrong=1", savedOn: "20 May" },
  { type: "glossary",    title: "EVM — Earned Value Management",                  subtitle: "Glossary term · cross-linked from 4 cards",   href: "/lms/pmp/glossary#evm",                     savedOn: "18 May" },
  { type: "mock",        title: "Mini Mock 2 · review wrong answers",            subtitle: "13 of 60 to revisit",                         href: "/lms/pmp/mock-exam/2/result",               savedOn: "16 May" },
];

const typeMeta = {
  reference:   { label: "Reference",   tone: "blue",   icon: "fa-solid fa-bookmark" },
  "study-guide": { label: "Study guide", tone: "purple", icon: "fa-solid fa-book-open-reader" },
  glossary:    { label: "Glossary",    tone: "green",  icon: "fa-solid fa-language" },
  qbank:       { label: "Q-bank",      tone: "orange", icon: "fa-solid fa-circle-question" },
  mock:        { label: "Mock",        tone: "pink",   icon: "fa-solid fa-stopwatch" },
};

export default function SavedPage() {
  return (
    <LmsFrame
      active="Resources"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Saved items" },
      ]}
      title="🔖 Saved items"
      subtitle={`${bookmarks.length} bookmarks across reference cards, study guides, Q-bank, and the glossary.`}
    >
      <section className="sv-filter">
        <button className="sv-chip active" type="button">All ({bookmarks.length})</button>
        {Object.entries(typeMeta).map(([k, m]) => {
          const count = bookmarks.filter(b => b.type === k).length;
          if (count === 0) return null;
          return <button key={k} className="sv-chip" type="button">{m.label} ({count})</button>;
        })}
      </section>

      <ul className="sv-list">
        {bookmarks.map((b, i) => {
          const m = typeMeta[b.type];
          return (
            <li key={i}>
              <Link href={b.href} className="sv-row">
                <span className={`sv-icon ${m.tone}`}><i className={m.icon}></i></span>
                <div className="sv-meta">
                  <span className={`sv-tag ${m.tone}`}>{m.label}</span>
                  <strong>{b.title}</strong>
                  <small>{b.subtitle}</small>
                </div>
                <div className="sv-side">
                  <small>Saved {b.savedOn}</small>
                  <button type="button" className="sv-remove" aria-label="Remove bookmark">
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </LmsFrame>
  );
}
