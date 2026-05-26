import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Hit = {
  type: "reference" | "study-guide" | "glossary" | "qbank";
  title: string;
  snippet: React.ReactNode;
  href: string;
};

const query = "EVM";

const hits: Hit[] = [
  { type: "reference",   title: "Project Cost Management · Earned Value section",  snippet: <>The four cardinal <mark>EVM</mark> measures — PV, EV, AC, BAC — drive every variance and index calculation in the PMBOK framework…</>, href: "/lms/pmp/reference/cost-management" },
  { type: "study-guide", title: "PMBOK Guide 7th Ed. · Performance Domain · Measurement", snippet: <>This domain treats <mark>EVM</mark> as one of several measurement frameworks; the principle is consistent: compare planned vs actual vs earned…</>, href: "/lms/pmp/study-guide/pmbok-7" },
  { type: "glossary",    title: "Earned Value Management (EVM)",                    snippet: <>A management methodology for integrating scope, schedule, and resources, and measuring project performance and progress…</>, href: "/lms/pmp/glossary#evm" },
  { type: "qbank",       title: "Q-bank · 47 questions matching '<mark>EVM</mark>'", snippet: <>Filter by difficulty, by wrong-only, or by Process / domain Process scenarios to scope the drill.</>, href: "/lms/pmp/question-bank?q=evm" },
  { type: "reference",   title: "Project Schedule Management · SPI explainer",      snippet: <>Schedule Performance Index (SPI) is one half of the <mark>EVM</mark> efficiency pair; CPI is the other…</>, href: "/lms/pmp/reference/schedule-management" },
];

const typeMeta = {
  reference:   { label: "Reference",   tone: "blue",   icon: "fa-solid fa-bookmark" },
  "study-guide": { label: "Study guide", tone: "purple", icon: "fa-solid fa-book-open-reader" },
  glossary:    { label: "Glossary",    tone: "green",  icon: "fa-solid fa-language" },
  qbank:       { label: "Q-bank",      tone: "orange", icon: "fa-solid fa-circle-question" },
};

export default function SearchPage() {
  return (
    <LmsFrame
      active="My Learning"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Search" },
      ]}
      title="🔍 Cross-content search"
      subtitle="Search reference cards, study guides, glossary, and Q-bank in one place."
    >
      <section className="srch-box">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" defaultValue={query} placeholder="Search across all course content…" aria-label="Search" />
        <button type="button" className="srch-clear" aria-label="Clear">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </section>

      <section className="srch-filter">
        <button className="srch-chip active" type="button">All ({hits.length})</button>
        {Object.entries(typeMeta).map(([k, m]) => {
          const count = hits.filter(h => h.type === k).length;
          return <button key={k} className="srch-chip" type="button">{m.label} ({count})</button>;
        })}
      </section>

      <ul className="srch-results">
        {hits.map((h, i) => {
          const m = typeMeta[h.type];
          return (
            <li key={i}>
              <Link href={h.href} className="srch-hit">
                <span className={`srch-icon ${m.tone}`}><i className={m.icon}></i></span>
                <div className="srch-body">
                  <span className={`srch-tag ${m.tone}`}>{m.label}</span>
                  <strong>{h.title}</strong>
                  <p>{h.snippet}</p>
                </div>
                <i className="fa-solid fa-arrow-right srch-go"></i>
              </Link>
            </li>
          );
        })}
      </ul>
    </LmsFrame>
  );
}
