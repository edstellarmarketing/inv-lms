import OnboardingFrame from "../components/OnboardingFrame";

// Render a static May 2024 grid; Wed May 1 starts at index 3 (Sun=0)
const daysIn = 31;
const startIndex = 3;

export default function ExamDatePage() {
  return (
    <OnboardingFrame step={2} backHref="/onboarding/profile" nextHref="/onboarding/baseline">
      <div className="profile-card">
        <div className="ob-step-label">Step 2 of 4</div>
        <h2>Choose your exam target date</h2>
        <p className="muted">
          Select your target exam date. We&apos;ll create a study plan and schedule to
          help you reach it with confidence.
        </p>

        <div className="exam-grid">
          {/* Calendar */}
          <div className="cal-card">
            <strong className="cal-title">Select your target exam date</strong>

            <div className="cal-head">
              <button className="cal-nav"><i className="fa-solid fa-chevron-left"></i></button>
              <span>May 2024</span>
              <button className="cal-nav"><i className="fa-solid fa-chevron-right"></i></button>
            </div>

            <div className="cal-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="cal-dow">{d}</span>
              ))}
              {Array.from({ length: startIndex }).map((_, i) => (
                <span key={`p${i}`} className="cal-cell empty" />
              ))}
              {Array.from({ length: daysIn }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 15;
                const isPast = day < 10;
                return (
                  <button
                    key={day}
                    className={`cal-cell${isSelected ? " selected" : ""}${isPast ? " past" : ""}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="cal-selected">
              <div>
                <small>Selected Date</small>
                <strong>15 May 2024 Wednesday</strong>
              </div>
            </div>

            <div className="cal-tip">
              <i className="fa-solid fa-lightbulb"></i>
              <p>
                Pro tip: Pick a realistic date that gives you enough time to study at a
                steady pace and still ace the exam.
              </p>
            </div>
          </div>

          {/* Right: countdown + cadence */}
          <div className="exam-right">
            <div className="countdown-card">
              <div className="cd-head">
                <small>Time until your exam</small>
                <span className="pill pill-gold">
                  <i className="fa-solid fa-crown"></i> Gold tier
                </span>
              </div>

              <div className="cd-grid">
                {[
                  { v: "08", l: "Weeks" },
                  { v: "02", l: "Days" },
                  { v: "14", l: "Hours" },
                  { v: "35", l: "Mins" },
                ].map((x) => (
                  <div key={x.l} className="cd-cell">
                    <strong>{x.v}</strong>
                    <small>{x.l}</small>
                  </div>
                ))}
              </div>

              <div className="cd-foot">
                <i className="fa-regular fa-calendar"></i>
                <span>Exam Date</span>
                <strong>15 May 2024</strong>
              </div>
            </div>

            <div className="cadence-card">
              <strong className="cadence-title">Your recommended study cadence</strong>

              <ul className="cadence-list">
                <li>
                  <span className="cad-ic blue"><i className="fa-regular fa-clock"></i></span>
                  <div>
                    <strong>Weekly Hours</strong>
                    <small>Recommended to keep a steady pace</small>
                  </div>
                  <span className="cad-val">8 – 10 hrs</span>
                </li>
                <li>
                  <span className="cad-ic purple"><i className="fa-regular fa-calendar"></i></span>
                  <div>
                    <strong>Weekly Study Days</strong>
                    <small>Mix of weekday and weekend slots</small>
                  </div>
                  <span className="cad-val">4 – 5 days</span>
                </li>
                <li>
                  <span className="cad-ic green"><i className="fa-solid fa-hourglass-half"></i></span>
                  <div>
                    <strong>Daily Study Time</strong>
                    <small>Short, focused sessions work best</small>
                  </div>
                  <span className="cad-val">1.5 – 2 / day</span>
                </li>
              </ul>

              <div className="cad-success">
                <i className="fa-solid fa-circle-check"></i>
                <p>
                  You&apos;re on track! With this cadence, you&apos;ll complete the syllabus,
                  practice well, and be exam-ready on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingFrame>
  );
}
