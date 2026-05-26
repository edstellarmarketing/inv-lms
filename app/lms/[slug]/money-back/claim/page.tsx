import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const claim = {
  courseFee: 24500,
  cashbackDeducted: 1500,
  taxesNonRefundable: 0,
  netRefund: 23000,
  voucherCost: 0,
  claimWindowEndsOn: "12 July 2026",
  daysRemaining: 26,
};

type GateMirror = { label: string; required: string; snapshot: string; ok: boolean };
const gateMirror: GateMirror[] = [
  { label: "Live training attendance ≥80%", required: "≥80%", snapshot: "92%", ok: true },
  { label: "Q-bank coverage — each cluster ≥50%", required: "all 6", snapshot: "all clear", ok: true },
  { label: "Mock papers attempted (≥4)", required: "≥4", snapshot: "5 attempted", ok: true },
  { label: "Readiness ≥70 within 14d before exam", required: "≥70", snapshot: "73", ok: true },
  { label: "Latest gap report acknowledged", required: "ack'd", snapshot: "ack'd 22 May", ok: true },
  { label: "Exam booked within voucher validity", required: "Yes", snapshot: "12 Jun (in window)", ok: true },
];

export default function MoneyBackClaimPage() {
  const gatePass = gateMirror.every(g => g.ok);

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Money-back", href: "/lms/pmp/money-back" },
        { label: "Submit claim" },
      ]}
      title="🛡️ Money-back claim"
      subtitle={`File within ${claim.daysRemaining} days. Your gate snapshot at voucher redemption is below — all six items must be 'met' for an auto-approve.`}
      right={
        <span className={`mc-pill ${gatePass ? "ok" : "fail"}`}>
          <i className={`fa-solid fa-${gatePass ? "circle-check" : "circle-xmark"}`}></i>
          {gatePass ? "Gate honoured" : "Gate failed"}
        </span>
      }
    >
      <section className="mc-hero">
        <article className="mc-amount">
          <small>Refund amount</small>
          <strong>₹{claim.netRefund.toLocaleString()}</strong>
          <ul>
            <li><span>Course fee</span><span>₹{claim.courseFee.toLocaleString()}</span></li>
            <li><span>Cashback already paid out</span><span className="neg">− ₹{claim.cashbackDeducted.toLocaleString()}</span></li>
            <li><span>Non-refundable taxes</span><span>₹{claim.taxesNonRefundable.toLocaleString()}</span></li>
            <li className="net"><span>Net refund</span><strong>₹{claim.netRefund.toLocaleString()}</strong></li>
          </ul>
        </article>

        <article className="mc-window">
          <small>Claim window</small>
          <strong>{claim.daysRemaining} days left</strong>
          <small>Closes {claim.claimWindowEndsOn}</small>
          <small className="warn">
            <i className="fa-solid fa-circle-info"></i> Submitting the claim forfeits your retake voucher.
            Choose carefully.
          </small>
        </article>
      </section>

      {/* Gate mirror */}
      <section className="mc-card">
        <header className="mc-section-head">
          <div>
            <h3>Gate-honoured checklist (snapshot at voucher redemption)</h3>
            <small>
              These were recorded the moment you clicked <em>Redeem voucher</em>.
              The server-side audit check verifies this snapshot, not your current state.
            </small>
          </div>
          <Link href="/lms/pmp/money-back" className="mc-inline">
            Read full terms <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </header>
        <ul className="mc-gate-list">
          {gateMirror.map((g, i) => (
            <li key={i} className={g.ok ? "ok" : "fail"}>
              <span className={`mc-gate-ic ${g.ok ? "ok" : "fail"}`}>
                <i className={`fa-solid fa-${g.ok ? "circle-check" : "circle-xmark"}`}></i>
              </span>
              <strong>{g.label}</strong>
              <small>Required: {g.required}</small>
              <small className="mc-snap">Yours: <strong>{g.snapshot}</strong></small>
            </li>
          ))}
        </ul>
        <footer className="mc-gate-foot">
          {gatePass ? (
            <small className="ok">
              <i className="fa-solid fa-circle-check"></i> All gates met — claim qualifies for auto-approval.
            </small>
          ) : (
            <small className="fail">
              <i className="fa-solid fa-triangle-exclamation"></i> Gate snapshot incomplete — claim will be rejected.
            </small>
          )}
        </footer>
      </section>

      {/* Form */}
      <section className="mc-twocol">
        <article className="mc-form-card">
          <header className="mc-section-head">
            <div>
              <h3>Refund payout details</h3>
              <small>Refund flows through the same payment rail used at checkout (HDFC card ending 4421)</small>
            </div>
          </header>

          <div className="mc-method-pick">
            <label>
              <input type="radio" name="method" defaultChecked />
              <div>
                <strong>Original card · HDFC ****4421</strong>
                <small>7–10 days · automatic, no extra forms</small>
              </div>
            </label>
            <label>
              <input type="radio" name="method" />
              <div>
                <strong>UPI</strong>
                <small>3–5 days · need to verify a new UPI ID</small>
              </div>
            </label>
            <label>
              <input type="radio" name="method" />
              <div>
                <strong>Bank transfer</strong>
                <small>5–7 days · need to verify a new bank account</small>
              </div>
            </label>
          </div>

          <div className="mc-form">
            <label>
              <span>Reason for claim</span>
              <select defaultValue="failed">
                <option value="failed">Failed first exam attempt — gate met</option>
                <option value="other">Other (please describe)</option>
              </select>
            </label>
            <label>
              <span>Failed exam date</span>
              <input type="date" defaultValue="2026-06-12" />
            </label>
            <label className="mc-form-full">
              <span>Anything you want the Trust & Safety team to know? (optional)</span>
              <textarea rows={3} placeholder="Optional context · helps if you've had technical issues or any unusual exam-day circumstances" />
            </label>
            <label className="mc-form-full">
              <span>Proof of failed exam</span>
              <div className="mc-upload">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>
                  PMI confirmation email or screenshot · <Link href="#" className="mc-inline">browse</Link>
                </span>
                <small>Required · automatically pulled from your outcome recording if available</small>
              </div>
            </label>
          </div>

          <div className="mc-confirms">
            <label>
              <input type="checkbox" />
              <span>I understand the refund forfeits my retake voucher and any unused Gold benefits.</span>
            </label>
            <label>
              <input type="checkbox" />
              <span>I confirm the gate snapshot above is accurate and I haven't used an override.</span>
            </label>
          </div>
        </article>

        <aside className="mc-side">
          <article className="mc-card mc-side-card">
            <h4>What happens after submit</h4>
            <ol className="mc-flow">
              <li><span>1</span><div><strong>Submit</strong><small>Status flips to 'submitted' instantly</small></div></li>
              <li><span>2</span><div><strong>Auto verification</strong><small>System checks the gate snapshot · &lt; 1h</small></div></li>
              <li><span>3</span><div><strong>Approval</strong><small>Trust & Safety review only if flagged · usually skipped</small></div></li>
              <li><span>4</span><div><strong>Refund processed</strong><small>3–10 days depending on method</small></div></li>
            </ol>
            <Link href="/lms/pmp/money-back/status/draft" className="mc-inline">
              See sample timeline <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>

          <article className="mc-card mc-side-card mc-call">
            <h4>Talk to someone first?</h4>
            <p>
              The decision is irreversible. If you're on the fence, take 10
              minutes with a coach — they've seen this exact decision tree
              hundreds of times.
            </p>
            <Link href="/lms/pmp/coaching" className="mc-secondary">
              <i className="fa-solid fa-phone"></i> Book a coaching call
            </Link>
          </article>
        </aside>
      </section>

      <section className="mc-footer">
        <Link href="/lms/pmp/exam-result" className="mc-back-link">
          ← Back to outcome view
        </Link>
        <button type="button" className="mc-secondary">
          Save draft
        </button>
        <button type="button" className="mc-primary danger" disabled={!gatePass}>
          <i className="fa-solid fa-paper-plane"></i> Submit refund claim
        </button>
      </section>
    </LmsFrame>
  );
}
