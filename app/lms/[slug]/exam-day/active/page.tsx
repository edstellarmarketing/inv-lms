import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const exam = {
  certLevel: "PMP®",
  awardingBody: "PMI",
  date: "12 June 2026",
  time: "10:00 AM IST",
  examLink: "https://exam.pmi.org/join/abc",
  minutesToStart: 22,
  windowOpen: true,
};

export default function ExamDayStandbyPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Exam day · standby" },
      ]}
      title=""
    >
      <section className="es-standby-wrap">
        <div className="es-standby-card">
          {exam.windowOpen ? (
            <>
              <div className="es-standby-status live">
                <span className="es-status-dot" />
                Exam window is open
              </div>
              <h1 className="es-standby-title">
                Good luck, you've prepared for this.
              </h1>
              <p className="es-standby-sub">
                Your {exam.certLevel} exam window opened a few minutes ago.
                The join link is ready when you are.
              </p>

              <a href={exam.examLink} target="_blank" rel="noreferrer" className="es-standby-join">
                <i className="fa-solid fa-video"></i> Join exam now
                <small>Opens PMI's proctored portal in a new tab</small>
              </a>

              <div className="es-standby-countdown">
                <strong>{exam.minutesToStart} min</strong>
                <small>since your slot opened — you can still join within the first 15 min</small>
              </div>
            </>
          ) : (
            <>
              <div className="es-standby-status soon">
                <span className="es-status-dot" />
                Standby — exam window opens in {exam.minutesToStart} min
              </div>
              <h1 className="es-standby-title">Take a breath.</h1>
              <p className="es-standby-sub">
                You've done the work. The exam opens at <strong>{exam.time}</strong>.
                Stay in this tab — the join button appears as soon as the window is live.
              </p>
              <div className="es-standby-countdown big">
                <strong>{exam.minutesToStart}</strong>
                <small>minutes</small>
              </div>
            </>
          )}

          <div className="es-standby-tips">
            <strong>Final reminders</strong>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Your ID is on the desk · second ID nearby</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Phone silenced and out of reach · bathroom done</span>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <span>Browser updated · extensions disabled · room clear</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-info"></i>
                <span>Lost connection? PMI's proctor pauses — reconnect within 30 min</span>
              </li>
            </ul>
          </div>

          <div className="es-standby-disabled">
            <i className="fa-solid fa-lock"></i>
            <div>
              <strong>Study tools are paused during your exam window</strong>
              <small>
                Reference cards, study guides, Q-bank, mocks, and AI tools are
                unavailable while you're on this page. They'll come back as soon
                as the exam completes and your outcome is recorded.
              </small>
            </div>
          </div>

          <div className="es-standby-foot">
            <Link href="/lms/pmp/support" className="es-secondary">
              <i className="fa-regular fa-life-ring"></i> Technical issue? Contact support
            </Link>
            <Link href="/lms/pmp/exam-result/record" className="es-secondary">
              <i className="fa-solid fa-clipboard-check"></i> After exam — record outcome
            </Link>
          </div>
        </div>
      </section>
    </LmsFrame>
  );
}
