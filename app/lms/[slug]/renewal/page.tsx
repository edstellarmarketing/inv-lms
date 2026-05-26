import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const renewal = {
  certLevel: "PMP®",
  earnedOn: "12 June 2026",
  validThrough: "12 June 2029",
  cycleLengthYears: 3,
  monthsElapsed: 4,
  monthsTotal: 36,
  pdusRequired: 60,
  pdusEarned: 12,
  pdusBreakdown: {
    education: { earned: 8, target: 35, label: "Education" },
    givingBack: { earned: 4, target: 25, label: "Giving back" },
  },
};

type PduEvent = {
  date: string;
  source: string;
  category: "education" | "giving-back";
  pdus: number;
  href?: string;
};

const recentPdus: PduEvent[] = [
  { date: "20 Sep 2026", source: "PgMP® training (Invensis)", category: "education", pdus: 5, href: "#" },
  { date: "8 Aug 2026", source: "PMI India chapter webinar", category: "education", pdus: 1, href: "#" },
  { date: "15 Jul 2026", source: "Mentored 2 PMP candidates in #process-domain", category: "giving-back", pdus: 4, href: "/lms/pmp/community" },
  { date: "2 Jul 2026", source: "Project Management Institute book club", category: "education", pdus: 2, href: "#" },
];

const opportunities = [
  { title: "PgMP® training", category: "education", pdus: 35, href: "/lms/pmp/pathways", tone: "purple" },
  { title: "Mentor in Invensis community", category: "giving-back", pdus: "Up to 8 per quarter", href: "/lms/pmp/community", tone: "pink" },
  { title: "Write a case study for invensislearning.com", category: "giving-back", pdus: 5, href: "#", tone: "green" },
  { title: "PMI chapter webinars", category: "education", pdus: "1–2 each", href: "#", tone: "blue" },
];

export default function RenewalTrackerPage() {
  const totalPct = Math.round((renewal.pdusEarned / renewal.pdusRequired) * 100);
  const cyclePct = Math.round((renewal.monthsElapsed / renewal.monthsTotal) * 100);
  const onTrack = totalPct >= cyclePct - 5;
  const monthsRemaining = renewal.monthsTotal - renewal.monthsElapsed;

  return (
    <LmsFrame
      active="Certificates"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Certificate", href: "/lms/pmp/certificate" },
        { label: "Renewal tracker" },
      ]}
      title="🔄 PMP® renewal tracker"
      subtitle={`Earn ${renewal.pdusRequired} PDUs by ${renewal.validThrough} to maintain your certification. ${renewal.pdusEarned} earned · ${renewal.pdusRequired - renewal.pdusEarned} to go.`}
      right={
        <span className={`rn-status-pill ${onTrack ? "on-track" : "behind"}`}>
          <i className={`fa-solid fa-${onTrack ? "circle-check" : "circle-exclamation"}`}></i>
          {onTrack ? "On track" : "Behind cycle"}
        </span>
      }
    >
      <section className="rn-hero">
        <article className="rn-progress-card">
          <small>PDUs earned</small>
          <div className="rn-progress-numbers">
            <strong>{renewal.pdusEarned}</strong>
            <span>of {renewal.pdusRequired}</span>
          </div>
          <div className="rn-progress-bar big">
            <div className="rn-progress-fill" style={{ width: `${totalPct}%` }} />
            <span className="rn-progress-marker" style={{ left: `${cyclePct}%` }} title={`Cycle progress ${cyclePct}%`}>
              <small>Cycle: {cyclePct}%</small>
            </span>
          </div>
          <div className="rn-cycle-meta">
            <span><strong>{renewal.monthsElapsed}</strong> months in</span>
            <span><strong>{monthsRemaining}</strong> months remaining</span>
            <span><strong>{renewal.validThrough}</strong> validity ends</span>
          </div>
        </article>

        <div className="rn-categories">
          <article className="rn-cat education">
            <header>
              <strong>{renewal.pdusBreakdown.education.label}</strong>
              <span>{renewal.pdusBreakdown.education.earned} / {renewal.pdusBreakdown.education.target} target</span>
            </header>
            <div className="rn-cat-bar">
              <div className="rn-cat-fill education" style={{ width: `${(renewal.pdusBreakdown.education.earned / renewal.pdusBreakdown.education.target) * 100}%` }} />
            </div>
            <small>Formal training, courses, books, webinars</small>
          </article>
          <article className="rn-cat giving-back">
            <header>
              <strong>{renewal.pdusBreakdown.givingBack.label}</strong>
              <span>{renewal.pdusBreakdown.givingBack.earned} / {renewal.pdusBreakdown.givingBack.target} target</span>
            </header>
            <div className="rn-cat-bar">
              <div className="rn-cat-fill giving-back" style={{ width: `${(renewal.pdusBreakdown.givingBack.earned / renewal.pdusBreakdown.givingBack.target) * 100}%` }} />
            </div>
            <small>Mentoring, content creation, volunteering</small>
          </article>
        </div>
      </section>

      <section className="rn-twocol">
        <article className="rn-recent-card">
          <header className="rn-section-head">
            <div>
              <h3>Recent PDU activity</h3>
              <small>Auto-synced from PMI's CCR portal · 4 entries this cycle</small>
            </div>
            <button type="button" className="rn-secondary">
              <i className="fa-solid fa-plus"></i> Log a PDU manually
            </button>
          </header>
          <ul className="rn-pdu-list">
            {recentPdus.map((p, i) => (
              <li key={i} className={p.category}>
                <span className={`rn-pdu-ic ${p.category}`}>
                  <i className={`fa-solid fa-${p.category === "education" ? "graduation-cap" : "people-arrows"}`}></i>
                </span>
                <div>
                  <strong>{p.source}</strong>
                  <small>{p.date} · {p.category === "education" ? "Education" : "Giving back"}</small>
                </div>
                <span className="rn-pdu-count">+{p.pdus}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="rn-opp-card">
          <header className="rn-section-head">
            <div>
              <h3>Ways to earn PDUs</h3>
              <small>Curated for your remaining gap</small>
            </div>
          </header>
          <ul className="rn-opps">
            {opportunities.map((o, i) => (
              <li key={i} className={o.tone}>
                <Link href={o.href}>
                  <strong>{o.title}</strong>
                  <small>{o.category === "education" ? "Education" : "Giving back"} · {o.pdus} PDU{typeof o.pdus === "number" && o.pdus !== 1 ? "s" : ""}</small>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rn-foot">
        <article>
          <i className="fa-solid fa-shield-halved"></i>
          <div>
            <strong>What happens if you don't renew</strong>
            <p>
              Your {renewal.certLevel} enters a 1-year suspension after the cycle ends.
              During suspension you can complete the remaining PDUs and request
              reactivation. After year 2 of inactivity, you'd need to re-take the exam.
            </p>
          </div>
          <a href="https://www.pmi.org/certifications/maintain" target="_blank" rel="noreferrer" className="rn-secondary primary">
            PMI CCR Handbook <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </article>
      </section>
    </LmsFrame>
  );
}
