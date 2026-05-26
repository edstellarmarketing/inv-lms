import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type AttemptOutcome = "pass" | "fail" | "above-target" | "below-target";

type MockAttempt = {
  attemptNo: number;
  date: string;
  score: number;
  durationMin: number;
  outcome: AttemptOutcome;
  reviewHref: string;
};

type MockPaper = {
  id: string;
  no: number;
  name: string;
  type: "mini" | "full" | "final";
  questions: number;
  timeMin: number;
  attemptsAllowed: number;
  attempts: MockAttempt[];
  attemptsLeft: number;
  bestScore: number | null;
  status: "completed" | "in-progress" | "not-started" | "locked";
  isRecommended?: boolean;
};

const passMark = 60;
const targetScore = 70;
const contributionToReadiness = 27;
const inputWeight = 40;

const summary = {
  attempted: 3,
  total: 6,
  abovePassMark: 1,
  aboveTarget: 1,
  avgScore: 71,
  bestScore: 80,
  totalTimeHrs: 4.5,
};

const papers: MockPaper[] = [
  {
    id: "mock-1",
    no: 1,
    name: "Mini Mock 1",
    type: "mini",
    questions: 60,
    timeMin: 60,
    attemptsAllowed: 3,
    attempts: [
      { attemptNo: 1, date: "10 May 2026", score: 62, durationMin: 58, outcome: "pass", reviewHref: "/lms/pmp/mock-exam/1/result" },
    ],
    attemptsLeft: 2,
    bestScore: 62,
    status: "completed",
  },
  {
    id: "mock-2",
    no: 2,
    name: "Mini Mock 2",
    type: "mini",
    questions: 60,
    timeMin: 60,
    attemptsAllowed: 3,
    attempts: [
      { attemptNo: 1, date: "16 May 2026", score: 72, durationMin: 56, outcome: "above-target", reviewHref: "/lms/pmp/mock-exam/2/result" },
      { attemptNo: 2, date: "22 May 2026", score: 80, durationMin: 54, outcome: "above-target", reviewHref: "/lms/pmp/mock-exam/2/result" },
    ],
    attemptsLeft: 1,
    bestScore: 80,
    status: "completed",
  },
  {
    id: "mock-3",
    no: 3,
    name: "Full Length Exam 1",
    type: "full",
    questions: 180,
    timeMin: 230,
    attemptsAllowed: 2,
    attempts: [
      { attemptNo: 1, date: "24 May 2026", score: 58, durationMin: 224, outcome: "below-target", reviewHref: "/lms/pmp/mock-exam/3/result" },
    ],
    attemptsLeft: 1,
    bestScore: 58,
    status: "completed",
    isRecommended: false,
  },
  {
    id: "mock-4",
    no: 4,
    name: "Full Length Exam 2",
    type: "full",
    questions: 180,
    timeMin: 230,
    attemptsAllowed: 2,
    attempts: [],
    attemptsLeft: 2,
    bestScore: null,
    status: "not-started",
    isRecommended: true,
  },
  {
    id: "mock-5",
    no: 5,
    name: "Full Length Exam 3",
    type: "full",
    questions: 180,
    timeMin: 230,
    attemptsAllowed: 2,
    attempts: [],
    attemptsLeft: 2,
    bestScore: null,
    status: "not-started",
  },
  {
    id: "mock-6",
    no: 6,
    name: "Final Readiness Paper",
    type: "final",
    questions: 180,
    timeMin: 230,
    attemptsAllowed: 1,
    attempts: [],
    attemptsLeft: 1,
    bestScore: null,
    status: "locked",
  },
];

type TopicScore = {
  topic: string;
  scoreAcrossMocks: number;
  band: "high" | "medium" | "low";
};

const topicScores: TopicScore[] = [
  { topic: "People", scoreAcrossMocks: 78, band: "high" },
  { topic: "Process", scoreAcrossMocks: 54, band: "low" },
  { topic: "Business Environment", scoreAcrossMocks: 71, band: "medium" },
  { topic: "Agile / Hybrid", scoreAcrossMocks: 66, band: "medium" },
];

const nextMock = papers.find((p) => p.isRecommended)!;

function paperTypeMeta(t: MockPaper["type"]): { label: string; tone: string; icon: string } {
  if (t === "mini") return { label: "Mini Mock", tone: "blue", icon: "fa-solid fa-stopwatch" };
  if (t === "full") return { label: "Full Length", tone: "purple", icon: "fa-solid fa-clipboard-list" };
  return { label: "Final Readiness", tone: "pink", icon: "fa-solid fa-medal" };
}

function statusMeta(s: MockPaper["status"]): { label: string; tone: string; icon: string } {
  if (s === "completed") return { label: "Completed", tone: "green", icon: "fa-solid fa-circle-check" };
  if (s === "in-progress") return { label: "In progress", tone: "blue", icon: "fa-solid fa-spinner" };
  if (s === "not-started") return { label: "Not started", tone: "grey", icon: "fa-regular fa-circle" };
  return { label: "Locked", tone: "amber", icon: "fa-solid fa-lock" };
}

function outcomeMeta(o: AttemptOutcome): { label: string; tone: string; icon: string } {
  if (o === "above-target") return { label: `≥${targetScore}%`, tone: "green", icon: "fa-solid fa-arrow-trend-up" };
  if (o === "pass") return { label: "Pass", tone: "blue", icon: "fa-solid fa-circle-check" };
  if (o === "below-target") return { label: `<${targetScore}%`, tone: "amber", icon: "fa-solid fa-circle-exclamation" };
  return { label: "Below pass", tone: "red", icon: "fa-solid fa-circle-xmark" };
}

function scoreClass(score: number) {
  if (score >= targetScore) return "above-target";
  if (score >= passMark) return "pass";
  return "fail";
}

export default function ReadinessMocksPage() {
  const completedPct = Math.round((summary.attempted / summary.total) * 100);

  return (
    <LmsFrame
      active="Mock Exams"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Readiness panel", href: "/lms/pmp/readiness" },
        { label: "Mocks drill-down" },
      ]}
      title="📋 Mocks · contribution to readiness"
      subtitle="Per-paper scores against pass mark and target. This input adds ~27 of your current 62 composite — pushing avg above 70 unlocks the next 5 points."
      right={
        <Link href={`/lms/pmp/mock-exam/${nextMock.no}`} className="rdm-jump">
          <i className="fa-solid fa-forward"></i>
          <span>
            <small>Recommended next</small>
            <strong>{nextMock.name}</strong>
          </span>
        </Link>
      }
    >
      {/* Stat strip */}
      <section className="rdm-stats">
        <article className="rdm-stat blue">
          <small>Attempted</small>
          <strong>
            {summary.attempted}
            <span>of {summary.total}</span>
          </strong>
          <div className="rdm-stat-bar">
            <div className="rdm-stat-fill blue" style={{ width: `${completedPct}%` }} />
          </div>
        </article>
        <article className="rdm-stat green">
          <small>Above pass mark</small>
          <strong>
            {summary.abovePassMark}
            <span>of {summary.attempted}</span>
          </strong>
          <em>Pass mark ≥{passMark}%</em>
        </article>
        <article className="rdm-stat purple">
          <small>Above target</small>
          <strong>
            {summary.aboveTarget}
            <span>of {summary.attempted}</span>
          </strong>
          <em>Target ≥{targetScore}% to lift readiness</em>
        </article>
        <article className="rdm-stat amber">
          <small>Best · Average</small>
          <strong>
            {summary.bestScore}%<span>· avg {summary.avgScore}%</span>
          </strong>
          <em>{summary.totalTimeHrs}h total time on mocks</em>
        </article>
      </section>

      {/* Contribution explainer + threshold hints */}
      <section className="rdm-explain">
        <article className="rdm-contribution">
          <div>
            <small>Mocks input weight</small>
            <strong>{inputWeight}%</strong>
            <em>of your composite readiness</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="contrib">
            <small>Currently contributing</small>
            <strong>+{contributionToReadiness}</strong>
            <em>raw mocks score: 68 / 100</em>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className="next">
            <small>Possible at avg ≥{targetScore}%</small>
            <strong>+32</strong>
            <em>headroom: +5 points to composite</em>
          </div>
        </article>

        <article className="rdm-hint">
          <i className="fa-solid fa-lightbulb"></i>
          <div>
            <strong>Threshold check — what counts toward the score</strong>
            <ul>
              <li>
                <span className="rdm-dot pass" /> Each attempt scoring <strong>≥{passMark}%</strong>{" "}
                counts as a "pass" — clears the gate item but doesn't lift composite much.
              </li>
              <li>
                <span className="rdm-dot above-target" /> Attempts scoring <strong>≥{targetScore}%</strong>{" "}
                lift composite materially — best score across attempts is used per paper.
              </li>
              <li>
                <span className="rdm-dot fail" /> Attempts below pass mark are recorded but
                <strong> burn an attempt</strong> — no readiness gain.
              </li>
            </ul>
          </div>
        </article>
      </section>

      {/* Per-paper list */}
      <section className="rdm-papers">
        <header className="rdm-section-head">
          <div>
            <h3>Per-paper scores</h3>
            <small>Each paper's best score and remaining attempts</small>
          </div>
          <div className="rdm-filter">
            <button className="rdm-chip active" type="button">All</button>
            <button className="rdm-chip" type="button">Above target</button>
            <button className="rdm-chip" type="button">Below pass</button>
            <button className="rdm-chip" type="button">Not started</button>
          </div>
        </header>

        <ul className="rdm-paper-list">
          {papers.map((p) => {
            const t = paperTypeMeta(p.type);
            const st = statusMeta(p.status);
            const bestClass = p.bestScore !== null ? scoreClass(p.bestScore) : "";
            return (
              <li
                key={p.id}
                className={`rdm-paper ${p.status} ${p.isRecommended ? "recommended" : ""}`}
              >
                <div className="rdm-paper-left">
                  <span className={`rdm-paper-no ${t.tone}`}>{p.no}</span>
                  <div className="rdm-paper-title">
                    <div className="rdm-paper-titlerow">
                      <strong>{p.name}</strong>
                      <span className={`rdm-paper-type ${t.tone}`}>
                        <i className={t.icon}></i> {t.label}
                      </span>
                      {p.isRecommended && (
                        <span className="rdm-recommended">
                          <i className="fa-solid fa-wand-magic-sparkles"></i> Recommended next
                        </span>
                      )}
                    </div>
                    <small>
                      {p.questions} questions · {p.timeMin} min · {p.attemptsAllowed} attempt
                      {p.attemptsAllowed > 1 ? "s" : ""} allowed
                    </small>
                  </div>
                </div>

                <div className="rdm-paper-score">
                  {p.bestScore !== null ? (
                    <>
                      <span className={`rdm-best ${bestClass}`}>
                        <strong>{p.bestScore}%</strong>
                        <em>best</em>
                      </span>
                      <div className="rdm-mini-track">
                        <div
                          className={`rdm-mini-fill ${bestClass}`}
                          style={{ width: `${p.bestScore}%` }}
                        />
                        <span
                          className="rdm-mini-pass"
                          style={{ left: `${passMark}%` }}
                          title={`Pass mark ${passMark}%`}
                        />
                        <span
                          className="rdm-mini-target"
                          style={{ left: `${targetScore}%` }}
                          title={`Target ${targetScore}%`}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="rdm-no-attempt">
                      {p.status === "locked" ? (
                        <>
                          <i className="fa-solid fa-lock"></i>
                          <small>Unlocks after Full Length 2 attempt</small>
                        </>
                      ) : (
                        <small>No attempts yet</small>
                      )}
                    </div>
                  )}
                </div>

                <div className="rdm-paper-attempts">
                  {p.attempts.length > 0 ? (
                    <ul>
                      {p.attempts.map((a) => {
                        const o = outcomeMeta(a.outcome);
                        return (
                          <li key={a.attemptNo}>
                            <span className="rdm-attempt-no">#{a.attemptNo}</span>
                            <span className={`rdm-attempt-score ${scoreClass(a.score)}`}>
                              {a.score}%
                            </span>
                            <small>{a.date}</small>
                            <span className={`rdm-outcome ${o.tone}`}>
                              <i className={o.icon}></i> {o.label}
                            </span>
                            <Link href={a.reviewHref} className="rdm-attempt-link">
                              Review
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <small className="rdm-no-attempts">
                      No attempts on this paper yet
                    </small>
                  )}
                </div>

                <div className="rdm-paper-side">
                  <span className={`rdm-attempts-left ${p.attemptsLeft === 0 ? "zero" : ""}`}>
                    <strong>{p.attemptsLeft}</strong>
                    <small>
                      attempt{p.attemptsLeft !== 1 ? "s" : ""} left
                    </small>
                  </span>
                  <span className={`rdm-status ${st.tone}`}>
                    <i className={st.icon}></i> {st.label}
                  </span>
                  {p.status !== "locked" && (
                    <Link
                      href={`/lms/pmp/mock-exam/${p.no}`}
                      className={`rdm-paper-cta ${p.isRecommended ? "primary" : ""}`}
                    >
                      {p.attempts.length > 0 ? "Retake" : "Start"}{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Topic-cluster breakdown */}
      <section className="rdm-topics">
        <header className="rdm-section-head">
          <div>
            <h3>Topic-cluster breakdown across mocks</h3>
            <small>
              Average score per cluster across all your mock attempts — your weakest
              cluster is your fastest readiness win.
            </small>
          </div>
          <Link href="/lms/pmp/readiness/qbank" className="rdm-inline">
            See Q-bank coverage drill-down <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </header>

        <div className="rdm-topic-grid">
          {topicScores.map((t) => (
            <article key={t.topic} className={`rdm-topic ${t.band}`}>
              <header>
                <strong>{t.topic}</strong>
                <span className={`rdm-band ${t.band}`}>
                  {t.band === "high" ? "Strong" : t.band === "medium" ? "OK" : "Weak"}
                </span>
              </header>
              <div className="rdm-topic-score">
                <strong>{t.scoreAcrossMocks}%</strong>
                <small>avg across mocks</small>
              </div>
              <div className="rdm-topic-bar">
                <div
                  className={`rdm-topic-fill ${t.band}`}
                  style={{ width: `${t.scoreAcrossMocks}%` }}
                />
                <span className="rdm-topic-pass" style={{ left: `${passMark}%` }} />
                <span className="rdm-topic-target" style={{ left: `${targetScore}%` }} />
              </div>
              <Link
                href={`/lms/pmp/question-bank?cluster=${t.topic.toLowerCase()}`}
                className="rdm-inline"
              >
                Drill {t.topic} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Footer guidance */}
      <section className="rdm-footer">
        <article>
          <i className="fa-solid fa-bolt"></i>
          <div>
            <strong>Want the fastest readiness lift?</strong>
            <p>
              Take <strong>Full Length Exam 2</strong> next. Even a score of 70%
              would lift your composite from 62 to ~68 — biggest single jump available right now.
            </p>
          </div>
          <Link href={`/lms/pmp/mock-exam/${nextMock.no}`} className="rdm-primary">
            <i className="fa-solid fa-play"></i> Start Full Length Exam 2
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
