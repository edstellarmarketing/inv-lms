import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const result = {
  certLevel: "PMP®",
  awardingBody: "PMI",
  attemptedOn: "12 June 2026",
  passMark: 60,
  score: 54,
  closestCluster: { name: "Process domain", score: 49, target: 60 },
  tier: "gold" as "bronze" | "silver" | "gold",
  voucherValidThrough: "30 Aug 2026",
};

type Path = {
  id: string;
  title: string;
  desc: string;
  cta: { label: string; href: string };
  badge?: string;
  tone: "blue" | "green" | "amber" | "red";
  available: boolean;
  meta: string[];
};

const tierPaths: Record<string, Path[]> = {
  bronze: [
    {
      id: "repurchase",
      title: "Re-enrol at alumni rate",
      desc: "Bronze tier doesn't include a free retake. You can re-enrol with a 30% alumni discount.",
      cta: { label: "See Bronze re-enrolment", href: "https://www.invensislearning.com/training/pmp" },
      tone: "blue",
      available: true,
      meta: ["30% alumni discount", "No retake window restriction", "Voucher not included"],
    },
  ],
  silver: [
    {
      id: "retake-silver",
      title: "1 free retake within 90 days",
      desc: "Your Silver tier includes one no-cost retake. Book your second attempt window — we'll line up a structured 6-week prep plan.",
      cta: { label: "Book retake training", href: "/lms/pmp/retake" },
      tone: "green",
      available: true,
      badge: "Recommended",
      meta: ["Within 90 days of failed attempt", "Free PMI voucher re-issued", "Targeted retake training included"],
    },
  ],
  gold: [
    {
      id: "retake-gold",
      title: "Retake within 180 days",
      desc: "Gold includes up to 2 retakes within 180 days. Take a 6–8 week breather, run targeted drills, and re-attempt.",
      cta: { label: "Book retake training", href: "/lms/pmp/retake" },
      tone: "green",
      available: true,
      badge: "Recommended",
      meta: ["Up to 2 retakes", "Within 180 days", "Voucher + targeted training"],
    },
    {
      id: "claim-gold",
      title: "Claim the money-back guarantee",
      desc: "If you'd rather walk away, file the claim form. Refund processes through the same rail used at checkout (3–10 days).",
      cta: { label: "Open claim form", href: "/lms/pmp/money-back/claim" },
      tone: "amber",
      available: true,
      badge: "Gate-honoured",
      meta: ["File within 30 days", "Gate snapshot at redemption checked", "Original-card refund"],
    },
  ],
};

const reflection = [
  { topic: "Process domain", score: 49, band: "low" },
  { topic: "People domain", score: 68, band: "med" },
  { topic: "Business Environment", score: 56, band: "low" },
];

export default function FailOutcomePage() {
  const paths = tierPaths[result.tier];

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Exam outcome" },
      ]}
      title="💪 Tough day. Here's the path forward."
      subtitle={`You missed the ${result.passMark}% pass mark by ${result.passMark - result.score} points. Your Gold tier includes a structured recovery path — pick the one that fits.`}
      right={
        <span className="fo-pill failed">
          <i className="fa-solid fa-circle-xmark"></i> Did not pass
        </span>
      }
    >
      <section className="fo-stats">
        <article className="fo-score">
          <small>Your score</small>
          <div className="fo-score-num">
            <strong>{result.score}%</strong>
            <span>missed by {result.passMark - result.score}</span>
          </div>
          <div className="fo-score-bar">
            <div className="fo-score-fill fail" style={{ width: `${result.score}%` }} />
            <span className="fo-score-marker" style={{ left: `${result.passMark}%` }} title={`Pass ${result.passMark}%`}>
              <small>Pass {result.passMark}%</small>
            </span>
          </div>
          <p className="fo-score-note">
            Closest cluster: <strong>{result.closestCluster.name}</strong> at {result.closestCluster.score}%
            (target {result.closestCluster.target}). That's where to focus on retake prep.
          </p>
        </article>

        <article className="fo-tier-card">
          <header>
            <small>Your tier</small>
            <span className={`pill pill-${result.tier}`}>
              <i className={`fa-solid fa-${result.tier === "gold" ? "crown" : result.tier === "silver" ? "medal" : "award"}`}></i>
              {result.tier.toUpperCase()}
            </span>
          </header>
          <p>
            Your recovery paths are tier-specific. Bronze re-enrols, Silver gets
            1 retake, <strong>Gold gets up to 2 retakes plus a money-back
            guarantee option</strong>.
          </p>
          <small>Voucher valid through <strong>{result.voucherValidThrough}</strong> · use it for the retake</small>
        </article>
      </section>

      {/* Paths picker */}
      <section className="fo-paths">
        <header className="fo-section-head">
          <h3>Pick your path</h3>
          <small>Both choices remain available for the next 30 days — after that, retake is the only option.</small>
        </header>
        <div className="fo-path-grid">
          {paths.map((p) => (
            <article key={p.id} className={`fo-path ${p.tone}`}>
              <header>
                {p.badge && <span className={`fo-path-badge ${p.tone}`}>{p.badge}</span>}
              </header>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <ul>
                {p.meta.map((m, i) => <li key={i}><i className="fa-solid fa-check"></i>{m}</li>)}
              </ul>
              <footer>
                <Link href={p.cta.href} className={`fo-path-cta ${p.tone}`}>
                  {p.cta.label} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Where to focus */}
      <section className="fo-twocol">
        <article className="fo-reflect">
          <header className="fo-section-head">
            <div>
              <h3>Where you fell short</h3>
              <small>Per-cluster score breakdown · the gap analysis is ready</small>
            </div>
            <Link href="/lms/pmp/ai/gap-report" className="fo-inline">
              Open full gap report <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </header>
          <ul className="fo-cluster-list">
            {reflection.map((r, i) => (
              <li key={i} className={r.band}>
                <strong>{r.topic}</strong>
                <div className="fo-cluster-bar">
                  <div className={`fo-cluster-fill ${r.band}`} style={{ width: `${r.score}%` }} />
                  <span className="fo-cluster-pass" style={{ left: "60%" }} />
                </div>
                <span>{r.score}%</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="fo-tone-card">
          <header>
            <h4>This is a setback, not a verdict</h4>
          </header>
          <p>
            <strong>40% of learners</strong> who clear PMP on their second attempt
            actually score in the top quartile. The first attempt teaches you
            the exam's framing — which is harder to learn cold.
          </p>
          <p>
            Your composite was <strong>73</strong> heading into exam day — the
            data was there. Retake prep targets <em>just</em> the cluster that
            tripped you.
          </p>
          <Link href="/lms/pmp/support" className="fo-secondary">
            <i className="fa-regular fa-life-ring"></i> Talk to a coach
          </Link>
        </aside>
      </section>
    </LmsFrame>
  );
}
