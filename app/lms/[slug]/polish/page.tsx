import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Instructor = {
  initials: string;
  name: string;
  role: string;
  tone: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
  rating: number;
  reviews: number;
  passRate: number;
  yearsTeaching: number;
  yearsIndustry: number;
  certifications: string[];
  expertise: string[];
  bio: string;
  funFact: string;
  recentReviews: { stars: number; text: string; by: string; when: string }[];
  upcomingSessions: { title: string; date: string; type: string }[];
  badges: string[];
  languages: string[];
};

const instructor: Instructor = {
  initials: "PI",
  name: "Priya Iyer",
  role: "Lead Instructor · Cohort May 2026",
  tone: "purple",
  rating: 4.9,
  reviews: 1284,
  passRate: 92,
  yearsTeaching: 9,
  yearsIndustry: 14,
  certifications: ["PMP®", "PMI-ACP®", "Scrum Alliance CSM"],
  expertise: ["Process domain", "EVM", "Risk mgmt", "Agile/hybrid", "Wrong-answers diagnosis"],
  bio:
    "Ex-PMO lead at a Fortune-500 IT services firm. Runs the daily PMP Q&A and weekly EVM workshops. Specialises in helping engineering managers translate field experience into PMI exam language.",
  funFact: "Has scored 100% on every PMP retake she's ever attempted (3 of them, all for verification).",
  recentReviews: [
    { stars: 5, text: "Best EVM explainer I've ever seen — she draws it on the whiteboard in 4 boxes and suddenly everything clicks.", by: "Arjun K. · Cohort Apr 2026", when: "2 weeks ago" },
    { stars: 5, text: "Patient with stupid questions, generous with examples. I asked the same thing three different ways and she explained it three different ways.", by: "Meera S. · Cohort Mar 2026", when: "1 month ago" },
    { stars: 4, text: "Brilliant teacher. Only knock — sometimes she covers ground faster than I can take notes, but recordings make up for it.", by: "Saurabh P.", when: "1 month ago" },
  ],
  upcomingSessions: [
    { title: "Open Q&A — anything on the syllabus", date: "Today · 18:00 IST", type: "Q&A" },
    { title: "EVM clinic — formulas, CPI, SPI", date: "Wed 27 · 19:00 IST", type: "Workshop" },
    { title: "Open Q&A — process domain focus", date: "Fri 29 · 18:00 IST", type: "Q&A" },
  ],
  badges: ["PMI Authorised Trainer", "Top Mentor 2025", "Top Mentor 2024"],
  languages: ["English", "Hindi", "Tamil"],
};

export default function PolishShowcasePage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Polish · showcase" },
      ]}
      title="✨ Polish & side flows"
      subtitle="The four polish tasks (T83–T86) at a glance: email templates, instructor profile modal, almost-there banner, accessibility pass."
    >
      <section className="po-intro">
        <i className="fa-solid fa-circle-info"></i>
        <span>
          Showcase view bundling Task 84 (instructor modal) and Task 85
          (celebration banner). Task 83 (email gallery) lives at{" "}
          <Link href="/emails" className="po-inline">/emails</Link>,
          and Task 86 (a11y pass) is documented in <code>/A11Y.md</code>.
        </span>
      </section>

      {/* ── T85 — Almost-there celebration banner ─────────────── */}
      <section className="po-showcase">
        <header className="po-showcase-head">
          <div>
            <span className="po-trigger">T85 · Banner variant</span>
            <strong>Almost-there celebration banner</strong>
            <small>Renders on the dashboard when <code>composite ≥ 90</code> · replaces the standard at-a-glance banner</small>
          </div>
          <span className="po-tag green">Composite ≥ 90</span>
        </header>

        <div className="po-banner-demo">
          <div className="po-banner">
            <div className="po-banner-burst" aria-hidden="true">
              <span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span>
            </div>

            <div className="po-banner-icon">
              <i className="fa-solid fa-fire"></i>
            </div>

            <div className="po-banner-body">
              <div className="po-banner-top">
                <strong>🎯 One more mock and you're ready!</strong>
                <span className="po-banner-pill">Composite 92 / 100</span>
              </div>
              <p>
                You've crossed the readiness threshold for the third time this
                week. Your gate is honoured, your mocks are in the green zone,
                and Process is back above 75%. Lock in the voucher whenever you're ready.
              </p>
              <div className="po-banner-stats">
                <div><strong>92</strong><small>composite</small></div>
                <div><strong>+8</strong><small>this week</small></div>
                <div><strong>5/6</strong><small>mocks ≥ pass</small></div>
                <div><strong>17d</strong><small>to booked exam</small></div>
              </div>
            </div>

            <div className="po-banner-actions">
              <Link href="/lms/pmp/voucher" className="po-banner-cta primary">
                <i className="fa-solid fa-ticket"></i> Redeem voucher
              </Link>
              <Link href="/lms/pmp/readiness" className="po-banner-cta ghost">
                Open readiness panel
              </Link>
            </div>
          </div>
        </div>

        <div className="po-banner-states">
          <article>
            <span className="po-state-pill grey">Composite &lt; 70</span>
            <strong>Standard status banner</strong>
            <small>Default — progress, days to exam, readiness, voucher state.</small>
          </article>
          <article>
            <span className="po-state-pill amber">Composite 70–89</span>
            <strong>Push-to-ready banner</strong>
            <small>Lists the next 1–2 actions that would lift composite past 90.</small>
          </article>
          <article className="active">
            <span className="po-state-pill green">Composite ≥ 90</span>
            <strong>Almost-there celebration</strong>
            <small>Shown above. Animated burst + voucher CTA + key stats.</small>
          </article>
        </div>
      </section>

      {/* ── T84 — Instructor profile modal ────────────────────── */}
      <section className="po-showcase">
        <header className="po-showcase-head">
          <div>
            <span className="po-trigger">T84 · Modal overlay</span>
            <strong>Instructor profile modal</strong>
            <small>Triggered from any instructor name across the Live training schedule (Task 50), Session detail (Task 51), Q&A slots (Task 52), Coaching (Task 53)</small>
          </div>
          <span className="po-tag purple">Side flow</span>
        </header>

        <div className="po-stage">
          <div className="po-modal">
            <button className="po-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <header className="po-modal-head">
              <span className={`po-avatar ${instructor.tone}`}>{instructor.initials}</span>
              <div>
                <strong>{instructor.name}</strong>
                <small>{instructor.role}</small>
                <div className="po-rating-row">
                  <span className="po-rating">
                    <i className="fa-solid fa-star"></i>
                    <strong>{instructor.rating}</strong>
                    <small>({instructor.reviews.toLocaleString()} reviews)</small>
                  </span>
                  <span className="po-pass-rate">
                    <strong>{instructor.passRate}%</strong>
                    <small>learner pass rate</small>
                  </span>
                </div>
              </div>
            </header>

            <div className="po-modal-body">
              <div className="po-bio-block">
                <p>{instructor.bio}</p>
              </div>

              <div className="po-modal-stats">
                <div>
                  <strong>{instructor.yearsTeaching}+</strong>
                  <small>yrs teaching</small>
                </div>
                <div>
                  <strong>{instructor.yearsIndustry}+</strong>
                  <small>yrs industry</small>
                </div>
                <div>
                  <strong>{instructor.languages.length}</strong>
                  <small>languages</small>
                </div>
              </div>

              <div className="po-modal-section">
                <h4>Certifications</h4>
                <div className="po-tag-row">
                  {instructor.certifications.map(c => <span key={c} className="po-tag-pill cert">{c}</span>)}
                </div>
              </div>

              <div className="po-modal-section">
                <h4>Expertise</h4>
                <div className="po-tag-row">
                  {instructor.expertise.map(e => <span key={e} className="po-tag-pill">{e}</span>)}
                </div>
              </div>

              <div className="po-modal-section">
                <h4>Recognition</h4>
                <div className="po-tag-row">
                  {instructor.badges.map(b => (
                    <span key={b} className="po-tag-pill badge">
                      <i className="fa-solid fa-award"></i> {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="po-modal-section">
                <h4>Recent learner reviews</h4>
                <ul className="po-review-list">
                  {instructor.recentReviews.map((r, i) => (
                    <li key={i}>
                      <div className="po-review-stars">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <i key={idx} className={`fa-solid fa-star ${idx < r.stars ? "filled" : ""}`}></i>
                        ))}
                      </div>
                      <p>{r.text}</p>
                      <small>— {r.by} · {r.when}</small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="po-modal-section">
                <h4>Upcoming with {instructor.name.split(" ")[0]}</h4>
                <ul className="po-session-list">
                  {instructor.upcomingSessions.map((s, i) => (
                    <li key={i}>
                      <span className="po-session-type">{s.type}</span>
                      <div>
                        <strong>{s.title}</strong>
                        <small>{s.date}</small>
                      </div>
                      <Link href="/lms/pmp/live-training" className="po-inline">RSVP →</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="po-fun">
                <i className="fa-solid fa-lightbulb"></i>
                <span><strong>Fun fact:</strong> {instructor.funFact}</span>
              </div>
            </div>

            <footer className="po-modal-foot">
              <button type="button" className="po-secondary">
                <i className="fa-regular fa-envelope"></i> Email Priya
              </button>
              <Link href="/lms/pmp/coaching" className="po-primary">
                <i className="fa-solid fa-calendar-check"></i> Book 1:1 coaching
              </Link>
            </footer>
          </div>
        </div>

        <div className="po-modal-note">
          <i className="fa-solid fa-circle-info"></i>
          <span>
            In production, this modal opens as an overlay on top of the
            triggering page (live training, session detail, Q&A, coaching).
            Closes via X, Esc, or backdrop click — focus returns to the
            triggering element. Reads accessibly as a <code>role=&quot;dialog&quot;</code>{" "}
            with <code>aria-labelledby</code> bound to the instructor name.
          </span>
        </div>
      </section>

      {/* ── T86 footer note ────────────────────────────────────── */}
      <section className="po-a11y-note">
        <article>
          <i className="fa-solid fa-universal-access"></i>
          <div>
            <strong>T86 — Accessibility &amp; responsive pass</strong>
            <p>
              Done as a sweep across every page (53 routes + 12 modal/showcase
              surfaces). Specifics documented in <code>/A11Y.md</code> at the
              repo root: WCAG 2.2 AA contrast checks, focus rings on all
              interactive elements, skip-to-content link, ARIA labels on
              icon-only buttons, semantic landmarks, and mobile breakpoints
              at 1100px and 760px across every globals.css block.
            </p>
          </div>
          <Link href="/A11Y.md" className="po-secondary">
            Open A11Y.md <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
