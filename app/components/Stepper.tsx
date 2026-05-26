type Props = { current: number };

const steps = ["Profile", "Exam Date", "Baseline", "Done"];

export default function Stepper({ current }: Props) {
  return (
    <div className="stepper">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "active" : "upcoming";
        return (
          <div key={label} className={`step ${state}`}>
            <div className="step-dot">
              {state === "done" ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                <span className="num">{n}</span>
              )}
            </div>
            <span className="step-label">{label}</span>
            {i < steps.length - 1 && (
              <span className={`step-line ${n < current ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
