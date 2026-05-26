import Link from "next/link";
import LmsFrame from "../../../../components/LmsFrame";

type StageKey = "submitted" | "verified" | "approved" | "rejected" | "refunded";

type TimelineItem = {
  key: StageKey;
  label: string;
  detail: string;
  at?: string;
  by?: string;
  state: "done" | "current" | "pending" | "rejected";
};

const claim = {
  id: "CLM-2026-7841",
  amount: 23000,
  method: "HDFC Credit Card ****4421",
  submittedOn: "16 June 2026 · 09:32 IST",
  expectedBy: "26 June 2026",
};

const timeline: TimelineItem[] = [
  { key: "submitted", label: "Claim submitted", detail: "Your form was recorded. Gate snapshot frozen.", at: "16 June · 09:32", by: "You", state: "done" },
  { key: "verified", label: "Auto-verified", detail: "Gate-honoured audit check passed — all 6 items met at voucher redemption.", at: "16 June · 09:34", by: "Audit (auto)", state: "done" },
  { key: "approved", label: "Approved", detail: "No manual review needed. Routed to payment processor.", at: "16 June · 10:18", by: "Trust & Safety", state: "current" },
  { key: "refunded", label: "Refunded", detail: `₹${claim.amount.toLocaleString()} to ${claim.method}`, state: "pending" },
];

export default function RefundStatusPage() {
  const currentIdx = timeline.findIndex(t => t.state === "current");
  const isRejected = timeline.some(t => t.state === "rejected");

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Money-back", href: "/lms/pmp/money-back" },
        { label: `Claim ${claim.id}` },
      ]}
      title="📋 Refund status"
      subtitle={`Claim ${claim.id} · Submitted ${claim.submittedOn}`}
      right={
        <span className={`rs-pill ${isRejected ? "rejected" : currentIdx === timeline.length - 1 ? "complete" : "in-progress"}`}>
          <i className={`fa-solid fa-${isRejected ? "circle-xmark" : currentIdx === timeline.length - 1 ? "circle-check" : "spinner"}`}></i>
          {isRejected ? "Rejected" : currentIdx === timeline.length - 1 ? "Refunded" : "In progress"}
        </span>
      }
    >
      {/* Hero strip */}
      <section className="rs-hero">
        <article className="rs-claim-card">
          <small>Refund amount</small>
          <strong>₹{claim.amount.toLocaleString()}</strong>
          <p>{claim.method}</p>
          <div className="rs-claim-meta">
            <div>
              <small>Submitted</small>
              <strong>{claim.submittedOn}</strong>
            </div>
            <div>
              <small>Expected by</small>
              <strong>{claim.expectedBy}</strong>
            </div>
          </div>
        </article>

        <article className="rs-eta">
          <small>Currently</small>
          <strong>{timeline[currentIdx]?.label ?? "—"}</strong>
          <p>{timeline[currentIdx]?.detail ?? ""}</p>
          <small className="rs-eta-note">
            <i className="fa-solid fa-circle-info"></i> Card refunds typically show up in
            <strong> 7–10 business days</strong> after we hand off to your bank.
          </small>
        </article>
      </section>

      {/* Timeline */}
      <section className="rs-timeline-card">
        <header className="rs-section-head">
          <div>
            <h3>Status timeline</h3>
            <small>Each step is timestamped. Audit log is the source of truth if there's ever a question.</small>
          </div>
        </header>
        <ol className="rs-timeline">
          {timeline.map((t, i) => (
            <li key={t.key} className={`rs-step ${t.state}`}>
              <span className="rs-step-dot">
                {t.state === "done" && <i className="fa-solid fa-check"></i>}
                {t.state === "current" && <i className="fa-solid fa-spinner"></i>}
                {t.state === "rejected" && <i className="fa-solid fa-xmark"></i>}
              </span>
              {i < timeline.length - 1 && <span className="rs-step-line" />}
              <div className="rs-step-body">
                <header>
                  <strong>{t.label}</strong>
                  {t.at && <span className="rs-step-meta">{t.at} · {t.by}</span>}
                  {!t.at && t.state === "pending" && <span className="rs-step-meta pending">Pending</span>}
                </header>
                <p>{t.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Dispute card — only renders if rejected */}
      {isRejected && (
        <section className="rs-dispute">
          <article>
            <i className="fa-solid fa-circle-exclamation"></i>
            <div>
              <strong>Disagree with the rejection?</strong>
              <p>
                Open a dispute with the Trust & Safety team. We'll re-check
                the audit log and respond within 5 working days.
              </p>
            </div>
            <Link href="/lms/pmp/support" className="rs-secondary primary">
              Open dispute <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>
        </section>
      )}

      {/* Receipt / what you can do */}
      <section className="rs-twocol">
        <article className="rs-card">
          <h4>Audit receipt</h4>
          <dl>
            <div><dt>Claim ID</dt><dd className="mono">{claim.id}</dd></div>
            <div><dt>Voucher</dt><dd className="mono">PMI-2026-K7Z9-9X4F-A2L8</dd></div>
            <div><dt>Gate honoured at</dt><dd>Voucher redemption · 30 May 2026</dd></div>
            <div><dt>Exam attempt</dt><dd>12 June 2026 · failed (54%)</dd></div>
            <div><dt>Refund net of</dt><dd>Cashback already paid (₹1,500)</dd></div>
          </dl>
          <Link href="#" className="rs-inline">
            Download audit receipt (PDF) <i className="fa-solid fa-arrow-down"></i>
          </Link>
        </article>

        <aside className="rs-card rs-next">
          <h4>What happens after refund</h4>
          <ul>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <span>Your enrolment switches to <strong>closed (refunded)</strong></span>
            </li>
            <li>
              <i className="fa-solid fa-circle-check"></i>
              <span>You keep access to community + cert pathways</span>
            </li>
            <li>
              <i className="fa-solid fa-circle-xmark"></i>
              <span>Course content + AI tools lock back to preview-only</span>
            </li>
            <li>
              <i className="fa-solid fa-circle-info"></i>
              <span>Re-enrol any time at the alumni rate (30% off)</span>
            </li>
          </ul>
          <Link href="/lms/pmp" className="rs-secondary">
            See closed-state dashboard <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </aside>
      </section>
    </LmsFrame>
  );
}
