import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Tier = "Bronze" | "Silver" | "Gold";
type Trend = "up" | "flat" | "down";

const enrollment = {
  tier: "Gold" as Tier,
  examOn: "12 June 2026",
  daysToExam: 17,
};

const readiness = {
  composite: 62,
  delta7d: 4,
  delta30d: 14,
  trend: "up" as Trend,
  lastRefreshed: "Today · 18:42 IST",
  passingThreshold: 75,
  projectedReadyOn: "8 June 2026",
  projectedReadyConfidence: "moderate" as "high" | "moderate" | "low",
};

const weights = {
  Bronze: { mocks: 60, qbank: 40, gap: 0 },
  Silver: { mocks: 45, qbank: 35, gap: 20 },
  Gold: { mocks: 40, qbank: 30, gap: 30 },
};

type InputCard = {
  id: "mocks" | "qbank" | "gap";
  title: string;
  description: string;
  raw: number;
  weighted: number;
  delta7d: number;
  trend: Trend;
  detail: string;
  href: string;
  tone: "blue" | "purple" | "teal";
  icon: string;
  weight: number;
};

const tierWeights = weights[enrollment.tier];

const inputs: InputCard[] = [
  {
    id: "mocks",
    title: "Mock papers",
    description: "Per-paper score vs pass mark (60%), normalised across attempts.",
    raw: 68,
    weighted: Math.round((68 * tierWeights.mocks) / 100),
    delta7d: 5,
    trend: "up",
    detail: "3 of 6 attempted · 1 above pass mark · last score 72%",
    href: "/lms/pmp/readiness/mocks",
    tone: "blue",
    icon: "fa-solid fa-clipboard-check",
    weight: tierWeights.mocks,
  },
  {
    id: "qbank",
    title: "Q-bank coverage",
    description: "Topic-cluster coverage with anti-cherry-picking 50% floor per cluster.",
    raw: 58,
    weighted: Math.round((58 * tierWeights.qbank) / 100),
    delta7d: 6,
    trend: "up",
    detail: "All 6 clusters above floor · lowest 58% (Process)",
    href: "/lms/pmp/readiness/qbank",
    tone: "purple",
    icon: "fa-solid fa-circle-question",
    weight: tierWeights.qbank,
  },
  {
    id: "gap",
    title: "Gap-report acks",
    description: "Latest AI gap report acknowledged and acted on.",
    raw: 50,
    weighted: Math.round((50 * tierWeights.gap) / 100),
    delta7d: 0,
    trend: "flat",
    detail: "Last report 18 May · acknowledged 22 May · 2 of 5 actions completed",
    href: "/lms/pmp/readiness/gap-reports",
    tone: "teal",
    icon: "fa-solid fa-magnifying-glass-chart",
    weight: tierWeights.gap,
  },
];

type Action = {
  title: string;
  detail: string;
  impact: number;
  hours: string;
  category: "mocks" | "qbank" | "gap";
  href: string;
};

const actions: Action[] = [
  {
    title: "Take Mini Mock 3 — focus on Process domain",
    detail: "Your lowest cluster. A 70%+ score pushes composite by ~6.",
    impact: 6,
    hours: "1h",
    category: "mocks",
    href: "/lms/pmp/mock-exam/3",
  },
  {
    title: "Drill Process domain Q-bank (50 wrong-only)",
    detail: "Brings your lowest cluster to ≥65%. Adds ~3 to composite.",
    impact: 3,
    hours: "45m",
    category: "qbank",
    href: "/lms/pmp/question-bank",
  },
  {
    title: "Acknowledge gap report from 18 May",
    detail: "Read, ack, and start 3 of 5 listed actions. Adds ~5 (Gold weighting).",
    impact: 5,
    hours: "30m",
    category: "gap",
    href: "/lms/pmp/ai/gap-report",
  },
];

type TrendPoint = { date: string; score: number; isMilestone?: boolean };

const history: TrendPoint[] = [
  { date: "Apr 25", score: 32 },
  { date: "Apr 30", score: 38 },
  { date: "May 04", score: 42, isMilestone: true },
  { date: "May 09", score: 48 },
  { date: "May 14", score: 52 },
  { date: "May 18", score: 56 },
  { date: "May 22", score: 58 },
  { date: "Today", score: 62, isMilestone: true },
  { date: "Jun 02 (proj)", score: 72 },
  { date: "Jun 08 (proj)", score: 76 },
];

function deltaPill(d: number) {
  if (d > 0) return { cls: "up", icon: "fa-solid fa-arrow-trend-up", text: `+${d}` };
  if (d < 0) return { cls: "down", icon: "fa-solid fa-arrow-trend-down", text: `${d}` };
  return { cls: "flat", icon: "fa-solid fa-minus", text: "0" };
}

export default function ReadinessPanelPage() {
  const ringDeg = (readiness.composite / 100) * 360;
  const tierW = weights[enrollment.tier];
  const projConfClass =
    readiness.projectedReadyConfidence === "high"
      ? "green"
      : readiness.projectedReadyConfidence === "moderate"
        ? "amber"
        : "red";
  const projConfLabel =
    readiness.projectedReadyConfidence === "high"
      ? "High confidence"
      : readiness.projectedReadyConfidence === "moderate"
        ? "Moderate confidence"
        : "Low confidence";

  const maxScore = 100;
  const chartHeight = 140;

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Readiness panel" },
      ]}
      title="🎯 Readiness panel"
      subtitle="Your composite readiness score across mocks, Q-bank coverage, and gap-report acks — refreshed every time you take a mock or finish a session."
      right={
        <div className="rd-head-meta">
          <small>Last refreshed</small>
          <strong>{readiness.lastRefreshed}</strong>
          <button type="button" className="rd-refresh">
            <i className="fa-solid fa-arrows-rotate"></i> Refresh
          </button>
        </div>
      }
    >
      {/* Score hero */}
      <section className="rd-hero">
        <article className="rd-score">
          <div
            className="rd-ring"
            style={{
              background: `conic-gradient(#16a34a 0deg ${ringDeg}deg, #e5e7eb ${ringDeg}deg 360deg)`,
            }}
          >
            <div className="rd-ring-hole">
              <strong>{readiness.composite}</strong>
              <small>/ 100</small>
              <span className="rd-pass-thresh">
                Pass at ≥{readiness.passingThreshold}
              </span>
            </div>
          </div>
          <div className="rd-score-meta">
            <header>
              <small>Composite readiness</small>
              <span className={`rd-trend ${readiness.trend}`}>
                <i className="fa-solid fa-arrow-trend-up"></i>+{readiness.delta7d} this week
              </span>
            </header>
            <p>
              You're <strong>{readiness.passingThreshold - readiness.composite} points</strong>{" "}
              away from the {readiness.passingThreshold} threshold the model uses to flag
              "ready to redeem voucher."
            </p>
            <div className="rd-score-track">
              <div
                className="rd-track-fill"
                style={{ width: `${readiness.composite}%` }}
              />
              <div
                className="rd-track-marker"
                style={{ left: `${readiness.passingThreshold}%` }}
              >
                <small>{readiness.passingThreshold}</small>
              </div>
            </div>
          </div>
        </article>

        <article className="rd-projection">
          <header>
            <small>Projected ready-by</small>
            <span className={`rd-conf-pill ${projConfClass}`}>
              <i className="fa-solid fa-circle"></i> {projConfLabel}
            </span>
          </header>
          <div className="rd-proj-date">
            <strong>{readiness.projectedReadyOn}</strong>
            <span>at current pace</span>
          </div>
          <div className="rd-proj-vs-exam">
            <div>
              <small>Exam scheduled</small>
              <strong>{enrollment.examOn}</strong>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
            <div>
              <small>Days to exam</small>
              <strong>{enrollment.daysToExam} days</strong>
            </div>
          </div>
          <small className="rd-proj-note">
            <i className="fa-solid fa-circle-info"></i> Projection uses the slope of
            the last 14 days. Pace slightly drops at weekends — the model adjusts for that.
          </small>
        </article>
      </section>

      {/* Three input cards */}
      <section className="rd-inputs">
        <header className="rd-section-head">
          <div>
            <h3>What's driving your score</h3>
            <small>
              Three inputs — weighted by your{" "}
              <span className="pill pill-gold">
                <i className="fa-solid fa-crown"></i> Gold
              </span>{" "}
              tier as {tierW.mocks}/{tierW.qbank}/{tierW.gap}.
              <Link href="#" className="rd-inline">
                Read how the score is computed <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </small>
          </div>
        </header>

        <div className="rd-input-grid">
          {inputs.map((c) => {
            const d = deltaPill(c.delta7d);
            return (
              <article key={c.id} className={`rd-input ${c.tone}`}>
                <header>
                  <span className={`rd-input-ic ${c.tone}`}>
                    <i className={c.icon}></i>
                  </span>
                  <div className="rd-input-title">
                    <strong>{c.title}</strong>
                    <small>{c.description}</small>
                  </div>
                  <span className="rd-weight">
                    {c.weight}%
                    <em>weight</em>
                  </span>
                </header>

                <div className="rd-input-body">
                  <div className="rd-input-score">
                    <span>
                      <small>Raw score</small>
                      <strong>{c.raw}</strong>
                    </span>
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>
                      <small>Contributing</small>
                      <strong className="contrib">+{c.weighted}</strong>
                    </span>
                    <span className={`rd-delta ${d.cls}`}>
                      <i className={d.icon}></i> {d.text}
                    </span>
                  </div>
                  <div className="rd-input-bar">
                    <div
                      className={`rd-input-fill ${c.tone}`}
                      style={{ width: `${c.raw}%` }}
                    />
                  </div>
                  <p>{c.detail}</p>
                </div>

                <footer>
                  <Link href={c.href} className={`rd-input-cta ${c.tone}`}>
                    Open drill-down <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      {/* Two-col: trend chart + recommended actions */}
      <section className="rd-twocol">
        <article className="rd-chart-card">
          <header className="rd-section-head">
            <div>
              <h3>Trend · last 30 days &amp; projection</h3>
              <small>
                <strong>+{readiness.delta30d}</strong> in the last 30 days · solid line is actual, dashed is projection
              </small>
            </div>
            <div className="rd-chart-tabs">
              <button className="rd-chip" type="button">7d</button>
              <button className="rd-chip active" type="button">30d</button>
              <button className="rd-chip" type="button">All</button>
            </div>
          </header>

          <div className="rd-chart">
            <div className="rd-chart-grid">
              {[0, 25, 50, 75, 100].map((y) => (
                <div
                  key={y}
                  className={`rd-grid-line ${y === readiness.passingThreshold ? "thresh" : ""}`}
                  style={{ bottom: `${y}%` }}
                >
                  <span>{y}</span>
                </div>
              ))}
              <div
                className="rd-thresh-line"
                style={{ bottom: `${readiness.passingThreshold}%` }}
              >
                <span>Pass {readiness.passingThreshold}</span>
              </div>
            </div>

            <svg
              className="rd-chart-svg"
              viewBox={`0 0 ${(history.length - 1) * 60} ${chartHeight}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* solid line for actual + dashed for projection */}
              {(() => {
                const actualCount = history.findIndex((p) => p.date.includes("proj"));
                const actualPoints = history.slice(0, actualCount).map((p, i) => ({
                  x: i * 60,
                  y: chartHeight - (p.score / maxScore) * chartHeight,
                }));
                const projPoints = history.slice(actualCount - 1).map((p, i) => ({
                  x: (actualCount - 1 + i) * 60,
                  y: chartHeight - (p.score / maxScore) * chartHeight,
                }));
                const actualPath = actualPoints
                  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                  .join(" ");
                const projPath = projPoints
                  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                  .join(" ");
                const fillPath = `${actualPath} L ${actualPoints[actualPoints.length - 1].x} ${chartHeight} L 0 ${chartHeight} Z`;
                return (
                  <>
                    <path d={fillPath} fill="rgba(22,163,74,.10)" />
                    <path d={actualPath} stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={projPath} stroke="#16a34a" strokeWidth="2.5" fill="none" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
                    {actualPoints.map((p, i) => (
                      <circle
                        key={`a-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r={history[i].isMilestone ? 5 : 3}
                        fill={history[i].isMilestone ? "#16a34a" : "#fff"}
                        stroke="#16a34a"
                        strokeWidth="2"
                      />
                    ))}
                  </>
                );
              })()}
            </svg>

            <div className="rd-chart-x">
              {history.map((p) => (
                <span key={p.date} className={p.date.includes("proj") ? "proj" : ""}>
                  {p.date}
                </span>
              ))}
            </div>
          </div>
        </article>

        <aside className="rd-actions">
          <header className="rd-section-head">
            <div>
              <h3>Push your score up — fastest wins</h3>
              <small>Ranked by impact / time. Doing all 3 gets you to ~76.</small>
            </div>
          </header>
          <ol className="rd-action-list">
            {actions.map((a) => {
              const cat = inputs.find((i) => i.id === a.category)!;
              return (
                <li key={a.title} className={cat.tone}>
                  <span className={`rd-action-ic ${cat.tone}`}>
                    <i className={cat.icon}></i>
                  </span>
                  <div>
                    <div className="rd-action-top">
                      <strong>{a.title}</strong>
                      <span className="rd-action-impact">+{a.impact}</span>
                    </div>
                    <small>{a.detail}</small>
                    <small className="rd-action-meta">
                      <i className="fa-regular fa-clock"></i> {a.hours} ·{" "}
                      <Link href={a.href} className="rd-inline">
                        Start now <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </small>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>
      </section>

      {/* Tier weighting explainer */}
      <section className="rd-tiers">
        <header className="rd-section-head">
          <div>
            <h3>How your tier shapes the score</h3>
            <small>
              Bronze prioritises mocks + Q-bank only. Silver and Gold add the gap-report
              ack signal — Gold weights it equal to Q-bank.
            </small>
          </div>
        </header>
        <div className="rd-tier-row">
          {(["Bronze", "Silver", "Gold"] as Tier[]).map((t) => {
            const w = weights[t];
            const active = t === enrollment.tier;
            return (
              <article key={t} className={`rd-tier ${active ? "active" : ""}`}>
                <header>
                  <span className={`pill pill-${t.toLowerCase()}`}>
                    <i
                      className={
                        t === "Gold"
                          ? "fa-solid fa-crown"
                          : t === "Silver"
                            ? "fa-solid fa-medal"
                            : "fa-solid fa-award"
                      }
                    ></i>
                    {t}
                  </span>
                  {active && <span className="rd-tier-yours">Your tier</span>}
                </header>
                <div className="rd-tier-bars">
                  <div>
                    <small>Mocks</small>
                    <div className="rd-tier-bar"><div style={{ width: `${w.mocks}%`, background: "#2563eb" }} /></div>
                    <strong>{w.mocks}%</strong>
                  </div>
                  <div>
                    <small>Q-bank</small>
                    <div className="rd-tier-bar"><div style={{ width: `${w.qbank}%`, background: "#7c3aed" }} /></div>
                    <strong>{w.qbank}%</strong>
                  </div>
                  <div>
                    <small>Gap acks</small>
                    <div className="rd-tier-bar"><div style={{ width: `${w.gap}%`, background: "#0d9488" }} /></div>
                    <strong>{w.gap}%</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </LmsFrame>
  );
}
