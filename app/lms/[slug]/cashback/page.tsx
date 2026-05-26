import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type AccrualKind =
  | "referral"
  | "milestone"
  | "attendance"
  | "mock-streak"
  | "community"
  | "review"
  | "exam-pass"
  | "early-completion";

type LedgerEntry =
  | {
      kind: "accrual";
      id: string;
      type: AccrualKind;
      title: string;
      detail: string;
      amount: number;
      date: string;
      dateLabel: string;
      status: "credited" | "pending" | "rejected";
      rejectionReason?: string;
    }
  | {
      kind: "payout";
      id: string;
      title: string;
      detail: string;
      amount: number;
      date: string;
      dateLabel: string;
      method: "upi" | "bank";
      maskedAccount: string;
      status: "processing" | "completed" | "failed";
      txnId?: string;
      failedReason?: string;
    };

const balance = {
  available: 1850,
  pending: 600,
  lifetime: 4250,
  paidOut: 1800,
  expiresOn: "30 Nov 2026",
};

const minPayout = 500;
const accrualMeta: Record<AccrualKind, { label: string; icon: string; tone: string }> = {
  referral: { label: "Referral", tone: "pink", icon: "fa-solid fa-user-plus" },
  milestone: { label: "Milestone", tone: "blue", icon: "fa-solid fa-flag-checkered" },
  attendance: { label: "Attendance", tone: "purple", icon: "fa-regular fa-calendar-check" },
  "mock-streak": { label: "Mock streak", tone: "orange", icon: "fa-solid fa-fire" },
  community: { label: "Community", tone: "teal", icon: "fa-regular fa-comments" },
  review: { label: "Review", tone: "green", icon: "fa-regular fa-star" },
  "exam-pass": { label: "Exam pass", tone: "blue", icon: "fa-solid fa-medal" },
  "early-completion": { label: "Early completion", tone: "orange", icon: "fa-solid fa-bolt" },
};

const ledger: LedgerEntry[] = [
  {
    kind: "accrual",
    id: "AC-2026-0218",
    type: "referral",
    title: "Referral bonus — Saurabh P. enrolled in PMP® Gold",
    detail: "Friend signed up via your code IL-VK-9X4 and completed first session.",
    amount: 600,
    date: "2026-05-24",
    dateLabel: "Yesterday · 14:12",
    status: "pending",
  },
  {
    kind: "accrual",
    id: "AC-2026-0211",
    type: "mock-streak",
    title: "5-mock streak completed",
    detail: "5 consecutive mocks with score above 70% in the last 14 days.",
    amount: 250,
    date: "2026-05-22",
    dateLabel: "22 May · 21:08",
    status: "credited",
  },
  {
    kind: "accrual",
    id: "AC-2026-0205",
    type: "attendance",
    title: "Live training attendance — week 3",
    detail: "Attended 4 of 4 live training sessions in the rolling 7-day window.",
    amount: 200,
    date: "2026-05-20",
    dateLabel: "20 May · 10:00",
    status: "credited",
  },
  {
    kind: "payout",
    id: "PO-2026-0042",
    title: "Payout requested — UPI",
    detail: "Withdrawal of available balance to your verified UPI ID.",
    amount: 1200,
    date: "2026-05-18",
    dateLabel: "18 May · 11:42",
    method: "upi",
    maskedAccount: "vij***@okhdfcbank",
    status: "completed",
    txnId: "TXN-83920441",
  },
  {
    kind: "accrual",
    id: "AC-2026-0198",
    type: "milestone",
    title: "50% course completion milestone",
    detail: "Crossed 50% across reference cards, study guides, and Q-bank attempts.",
    amount: 500,
    date: "2026-05-15",
    dateLabel: "15 May · 19:35",
    status: "credited",
  },
  {
    kind: "accrual",
    id: "AC-2026-0184",
    type: "community",
    title: "Top-helper award · April",
    detail: "Your replies in #process-domain were marked helpful 40+ times.",
    amount: 300,
    date: "2026-05-02",
    dateLabel: "2 May · 09:00",
    status: "credited",
  },
  {
    kind: "accrual",
    id: "AC-2026-0181",
    type: "review",
    title: "Verified Trustpilot review",
    detail: "5-star verified review posted on Trustpilot for your course experience.",
    amount: 150,
    date: "2026-04-28",
    dateLabel: "28 Apr · 22:10",
    status: "credited",
  },
  {
    kind: "payout",
    id: "PO-2026-0031",
    title: "Payout requested — Bank transfer",
    detail: "Net banking transfer to your registered account.",
    amount: 600,
    date: "2026-04-12",
    dateLabel: "12 Apr · 15:20",
    method: "bank",
    maskedAccount: "HDFC ****4421",
    status: "completed",
    txnId: "TXN-78211003",
  },
  {
    kind: "accrual",
    id: "AC-2026-0162",
    type: "referral",
    title: "Referral bonus — Meera S. enrolled in PMP® Silver",
    detail: "Friend used IL-VK-9X4. Bonus rejected — refund window expired before earning.",
    amount: 300,
    date: "2026-04-08",
    dateLabel: "8 Apr · 16:00",
    status: "rejected",
    rejectionReason: "Refund window expired before bonus matured. See policy section 4.2.",
  },
];

type Source = {
  type: AccrualKind;
  description: string;
  amount: string;
  conditions: string;
};

const sources: Source[] = [
  {
    type: "referral",
    description: "Refer a friend to any Invensis course",
    amount: "₹600 per Gold · ₹300 per Silver",
    conditions: "Paid 30 days after their first session, refund-window cleared",
  },
  {
    type: "milestone",
    description: "Course completion milestones",
    amount: "₹500 at 50% · ₹500 at 100%",
    conditions: "Across reference cards + Q-bank + mocks (weighted)",
  },
  {
    type: "mock-streak",
    description: "Consistent mock practice",
    amount: "₹250 per 5-mock streak (≥70%)",
    conditions: "All five mocks taken within a 14-day rolling window",
  },
  {
    type: "attendance",
    description: "Live training attendance",
    amount: "₹200 per full-attendance week",
    conditions: "Attend all live sessions scheduled in your enrollment that week",
  },
  {
    type: "community",
    description: "Help others in the community",
    amount: "₹300 monthly top-helper award",
    conditions: "Top 5 helpful-marked replies in any active channel",
  },
  {
    type: "exam-pass",
    description: "Exam pass bonus",
    amount: "₹1,000 one-time on passing",
    conditions: "Outcome recorded with verified pass within validity window",
  },
];

function StatusPill({ status, kind }: { status: string; kind: "accrual" | "payout" }) {
  const map: Record<string, { label: string; tone: string; icon: string }> = {
    credited: { label: "Credited", tone: "green", icon: "fa-solid fa-circle-check" },
    pending: { label: "Pending", tone: "amber", icon: "fa-solid fa-hourglass-half" },
    rejected: { label: "Rejected", tone: "red", icon: "fa-solid fa-circle-xmark" },
    processing: { label: "Processing", tone: "amber", icon: "fa-solid fa-spinner" },
    completed: { label: "Paid out", tone: "blue", icon: "fa-solid fa-check-double" },
    failed: { label: "Failed", tone: "red", icon: "fa-solid fa-triangle-exclamation" },
  };
  const m = map[status];
  return (
    <span className={`cb-status ${m.tone}`}>
      <i className={m.icon}></i> {m.label}
    </span>
  );
}

export default function CashbackPage() {
  const canRequest = balance.available >= minPayout;

  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Cashback" },
      ]}
      title="💰 Cashback ledger"
      subtitle="Earn cashback as you progress — withdraw to UPI or bank once you cross ₹500."
      right={
        <div className="cb-tz">
          <small>Your referral code</small>
          <strong>IL-VK-9X4</strong>
          <button type="button" className="cb-copy" aria-label="Copy referral code">
            <i className="fa-regular fa-copy"></i>
          </button>
        </div>
      }
    >
      {/* Balance hero */}
      <section className="cb-hero">
        <article className="cb-balance">
          <small>Available to withdraw</small>
          <strong>
            ₹{balance.available.toLocaleString()}
          </strong>
          <div className="cb-balance-meta">
            <span>
              <i className="fa-solid fa-hourglass-half"></i> ₹{balance.pending.toLocaleString()} pending
            </span>
            <span>
              <i className="fa-regular fa-clock"></i> Expires {balance.expiresOn}
            </span>
          </div>
          <button
            type="button"
            className={`cb-payout ${canRequest ? "" : "disabled"}`}
            disabled={!canRequest}
          >
            <i className="fa-solid fa-arrow-down-to-bracket"></i> Request payout
          </button>
          <small className="cb-payout-note">
            <i className="fa-solid fa-circle-info"></i> Minimum payout ₹{minPayout}. UPI lands in 24h, bank in 3–5 days.
          </small>
        </article>

        <div className="cb-stats">
          <article className="cb-stat green">
            <i className="fa-solid fa-arrow-trend-up"></i>
            <div>
              <strong>₹{balance.lifetime.toLocaleString()}</strong>
              <small>Lifetime earned</small>
            </div>
          </article>
          <article className="cb-stat blue">
            <i className="fa-solid fa-arrow-down-to-bracket"></i>
            <div>
              <strong>₹{balance.paidOut.toLocaleString()}</strong>
              <small>Paid out so far</small>
            </div>
          </article>
          <article className="cb-stat amber">
            <i className="fa-solid fa-hourglass-half"></i>
            <div>
              <strong>₹{balance.pending.toLocaleString()}</strong>
              <small>Pending (1 referral)</small>
            </div>
          </article>
          <article className="cb-stat purple">
            <i className="fa-solid fa-flag-checkered"></i>
            <div>
              <strong>2 of 2</strong>
              <small>Milestones earned</small>
            </div>
          </article>
        </div>
      </section>

      {/* Two-col: ledger + side info */}
      <section className="cb-twocol">
        <div className="cb-main">
          <article className="cb-card">
            <header className="cb-section-head">
              <div>
                <h3>Ledger</h3>
                <small>Every accrual and payout, newest first.</small>
              </div>
              <div className="cb-filters">
                <button className="cb-chip active" type="button">All</button>
                <button className="cb-chip" type="button">Accruals</button>
                <button className="cb-chip" type="button">Payouts</button>
                <button className="cb-chip" type="button">Pending</button>
                <button className="cb-chip" type="button">Rejected</button>
              </div>
            </header>

            <ul className="cb-ledger">
              {ledger.map((e) => {
                if (e.kind === "accrual") {
                  const m = accrualMeta[e.type];
                  return (
                    <li key={e.id} className={`cb-row accrual ${e.status}`}>
                      <span className={`cb-row-ic ${m.tone}`}>
                        <i className={m.icon}></i>
                      </span>
                      <div className="cb-row-body">
                        <div className="cb-row-top">
                          <span className={`cb-cat ${m.tone}`}>{m.label}</span>
                          <StatusPill status={e.status} kind="accrual" />
                        </div>
                        <strong>{e.title}</strong>
                        <small>{e.detail}</small>
                        {e.rejectionReason && (
                          <div className="cb-row-reject">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>{e.rejectionReason}</span>
                          </div>
                        )}
                      </div>
                      <div className="cb-row-side">
                        <span
                          className={`cb-amount ${
                            e.status === "rejected"
                              ? "strike"
                              : e.status === "pending"
                                ? "pending"
                                : "credit"
                          }`}
                        >
                          {e.status === "rejected" ? "−" : "+"}₹{e.amount.toLocaleString()}
                        </span>
                        <small>{e.dateLabel}</small>
                        <small className="cb-id mono">{e.id}</small>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={e.id} className={`cb-row payout ${e.status}`}>
                    <span className="cb-row-ic teal">
                      <i className={e.method === "upi" ? "fa-solid fa-mobile-screen" : "fa-solid fa-building-columns"}></i>
                    </span>
                    <div className="cb-row-body">
                      <div className="cb-row-top">
                        <span className="cb-cat teal">
                          {e.method === "upi" ? "UPI" : "Bank"} payout
                        </span>
                        <StatusPill status={e.status} kind="payout" />
                      </div>
                      <strong>{e.title}</strong>
                      <small>
                        {e.detail} · {e.maskedAccount}
                      </small>
                      {e.txnId && (
                        <small className="cb-row-txn">
                          Transaction ID: <span className="mono">{e.txnId}</span>
                        </small>
                      )}
                    </div>
                    <div className="cb-row-side">
                      <span className="cb-amount debit">−₹{e.amount.toLocaleString()}</span>
                      <small>{e.dateLabel}</small>
                      <small className="cb-id mono">{e.id}</small>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="cb-ledger-foot">
              <small>Showing {ledger.length} most recent entries</small>
              <button type="button" className="cb-secondary">
                Load older entries <i className="fa-solid fa-arrow-down"></i>
              </button>
            </footer>
          </article>
        </div>

        <aside className="cb-aside">
          <article className="cb-card cb-payout-card">
            <h4>Request a payout</h4>
            <div className="cb-pay-row">
              <span>Available</span>
              <strong>₹{balance.available.toLocaleString()}</strong>
            </div>
            <label className="cb-field">
              <span>Amount to withdraw</span>
              <input type="text" defaultValue={`₹${balance.available.toLocaleString()}`} />
            </label>
            <label className="cb-field">
              <span>Method</span>
              <select defaultValue="upi">
                <option value="upi">UPI · vij***@okhdfcbank</option>
                <option value="bank">Bank · HDFC ****4421</option>
              </select>
            </label>
            <button type="button" className="cb-payout">
              <i className="fa-solid fa-paper-plane"></i> Confirm payout
            </button>
            <small className="cb-payout-note">
              <i className="fa-solid fa-circle-info"></i> Need to update your payout method?{" "}
              <Link href="#" className="cb-inline">
                Manage payout methods
              </Link>
            </small>
          </article>

          <article className="cb-card">
            <h4>How you earn cashback</h4>
            <ul className="cb-sources">
              {sources.map((s) => {
                const m = accrualMeta[s.type];
                return (
                  <li key={s.type}>
                    <span className={`cb-source-ic ${m.tone}`}>
                      <i className={m.icon}></i>
                    </span>
                    <div>
                      <strong>{s.description}</strong>
                      <span className="cb-source-amount">{s.amount}</span>
                      <small>{s.conditions}</small>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link href="#" className="cb-inline">
              See full cashback policy <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>

          <article className="cb-card cb-refer">
            <header>
              <h4>Refer a friend</h4>
              <span className="cb-refer-bonus">+₹600</span>
            </header>
            <p>
              Share your code. They get ₹500 off their first course, you earn cashback when they complete their first session.
            </p>
            <div className="cb-refer-code">
              <span className="mono">IL-VK-9X4</span>
              <button type="button" className="cb-secondary">
                <i className="fa-regular fa-copy"></i> Copy
              </button>
            </div>
            <div className="cb-refer-share">
              <button type="button" className="cb-share whatsapp">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </button>
              <button type="button" className="cb-share linkedin">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </button>
              <button type="button" className="cb-share mail">
                <i className="fa-regular fa-envelope"></i> Email
              </button>
            </div>
          </article>
        </aside>
      </section>

      {/* FAQ footer */}
      <section className="cb-faq">
        <article>
          <strong>When does pending cashback clear?</strong>
          <p>
            30 days after the trigger event — once the refund window for the underlying transaction expires.
          </p>
        </article>
        <article>
          <strong>Why was my referral rejected?</strong>
          <p>
            The most common reason is the friend's refund window not clearing, or the referral being applied retroactively. Tap any rejected line for the policy section.
          </p>
        </article>
        <article>
          <strong>Does cashback expire?</strong>
          <p>
            Yes — unused balance expires 12 months after the most recent accrual. Your current balance expires {balance.expiresOn}.
          </p>
        </article>
      </section>
    </LmsFrame>
  );
}
