import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Path = {
  title: string;
  body: string;
  awardingBody: string;
  duration: string;
  difficulty: "advanced" | "lateral" | "specialise";
  tone: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
  whyMatch: string;
  href: string;
  badge?: string;
};

const paths: Path[] = [
  {
    title: "PgMP® — Program Management Professional",
    body: "Step up from project- to program-level. Best fit if you're already managing multiple parallel projects or aiming for a portfolio role.",
    awardingBody: "PMI",
    duration: "4–6 months · 35 contact hours",
    difficulty: "advanced",
    tone: "purple",
    whyMatch: "You scored 80%+ on Business Environment — PgMP leans heavily on strategic alignment.",
    href: "https://www.invensislearning.com/training/pgmp",
    badge: "Top match",
  },
  {
    title: "PMI-ACP® — Agile Certified Practitioner",
    body: "Deepen your Agile/hybrid practice. Pairs well with PMP for hybrid-delivery teams.",
    awardingBody: "PMI",
    duration: "2–3 months · 21 contact hours",
    difficulty: "lateral",
    tone: "teal",
    whyMatch: "Your scenario coach sessions showed real interest in hybrid tailoring decisions.",
    href: "https://www.invensislearning.com/training/pmi-acp",
  },
  {
    title: "PMI-RMP® — Risk Management Professional",
    body: "Specialise in qualitative + quantitative risk. Strong fit for senior PMs in regulated industries (banking, pharma, infra).",
    awardingBody: "PMI",
    duration: "2–3 months · 30 contact hours",
    difficulty: "specialise",
    tone: "orange",
    whyMatch: "You closed every gap-report action on risk topics — momentum to build on.",
    href: "https://www.invensislearning.com/training/pmi-rmp",
  },
  {
    title: "PRINCE2® Practitioner",
    body: "UK / Commonwealth alternative to PMP. Useful if you're targeting GovTech, public sector, or European delivery roles.",
    awardingBody: "PeopleCert",
    duration: "1–2 months · 30 hours",
    difficulty: "lateral",
    tone: "blue",
    whyMatch: "PRINCE2's process-driven approach complements PMP's principles-driven view.",
    href: "https://www.invensislearning.com/training/prince2",
  },
  {
    title: "ITIL® 4 Strategist (DPI)",
    body: "Service management lens for delivery leaders. Useful if you're working with IT/Ops teams or running internal change programmes.",
    awardingBody: "PeopleCert",
    duration: "2 months · 21 hours",
    difficulty: "lateral",
    tone: "green",
    whyMatch: "Your domain background is in IT services — natural fit.",
    href: "https://www.invensislearning.com/training/itil-4-strategist",
  },
  {
    title: "Lean Six Sigma Black Belt",
    body: "Quality + process improvement at scale. The PMP+LSSBB combo is highly demanded in manufacturing and operations roles.",
    awardingBody: "IASSC",
    duration: "3 months · 60 hours",
    difficulty: "specialise",
    tone: "pink",
    whyMatch: "Your Process domain accuracy is strong — Six Sigma rewards that rigour.",
    href: "https://www.invensislearning.com/training/lean-six-sigma-black-belt",
  },
];

const difficultyMeta = {
  advanced: { label: "Advanced", tone: "purple" },
  lateral: { label: "Lateral", tone: "teal" },
  specialise: { label: "Specialise", tone: "orange" },
};

export default function PathwaysPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Certificate", href: "/lms/pmp/certificate" },
        { label: "Next pathways" },
      ]}
      title="🛤️ Where to next?"
      subtitle="Six curated paths picked from your performance signals and domain background. All link back to invensislearning.com for enrolment."
    >
      <section className="pw-hero">
        <article>
          <span className="pw-eyebrow"><i className="fa-solid fa-circle-info"></i> Picked from your profile</span>
          <p>
            We looked at your <strong>per-cluster scores</strong>, <strong>concept coach
            usage</strong>, and <strong>profile domain</strong> to rank these. The top match
            below is the one most learners with your shape pick next.
          </p>
        </article>
      </section>

      <section className="pw-grid">
        {paths.map((p) => {
          const d = difficultyMeta[p.difficulty];
          return (
            <article key={p.title} className={`pw-card ${p.tone}`}>
              <header>
                <div>
                  <span className={`pw-cat ${d.tone}`}>{d.label}</span>
                  {p.badge && <span className="pw-top-match">{p.badge}</span>}
                </div>
                <span className={`pw-body-pill ${p.tone}`}>{p.awardingBody}</span>
              </header>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="pw-why">
                <i className="fa-solid fa-circle-check"></i>
                <span>{p.whyMatch}</span>
              </div>
              <footer>
                <small><i className="fa-regular fa-clock"></i> {p.duration}</small>
                <a href={p.href} target="_blank" rel="noreferrer" className={`pw-cta ${p.tone}`}>
                  Explore on invensislearning.com <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </footer>
            </article>
          );
        })}
      </section>

      <section className="pw-foot">
        <article>
          <i className="fa-solid fa-bullhorn"></i>
          <div>
            <strong>Alumni discount applies on every path above</strong>
            <p>
              You'll see a <strong>15% alumni rate</strong> automatically applied at
              checkout on invensislearning.com when logged into the same account.
            </p>
          </div>
          <Link href="/lms/pmp/renewal" className="pw-secondary">
            Track PMP renewal <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
