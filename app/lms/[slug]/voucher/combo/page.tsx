import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type GateState = "met" | "in-progress" | "at-risk" | "blocked";

type ComboTile = {
  level: "Foundation" | "Practitioner";
  awardingBody: string;
  validity: string;
  composite: number;
  threshold: number;
  state: "locked" | "unlocked" | "redeemed";
  voucherCode?: string;
  bookingDate?: string;
  gates: { label: string; current: string; status: GateState }[];
};

const tiles: ComboTile[] = [
  {
    level: "Foundation",
    awardingBody: "PeopleCert",
    validity: "30 Aug 2026",
    composite: 82,
    threshold: 70,
    state: "redeemed",
    voucherCode: "PC-F-2026-7Y4X-K9A2",
    bookingDate: "12 Jun 2026 · 10:00 IST",
    gates: [
      { label: "Composite ≥70", current: "82", status: "met" },
      { label: "All clusters ≥50%", current: "all clear", status: "met" },
      { label: "≥3 Foundation mocks", current: "5 attempted", status: "met" },
      { label: "Gap report ack'd", current: "ack'd", status: "met" },
    ],
  },
  {
    level: "Practitioner",
    awardingBody: "PeopleCert",
    validity: "30 Nov 2026",
    composite: 58,
    threshold: 75,
    state: "locked",
    gates: [
      { label: "Composite ≥75", current: "58", status: "in-progress" },
      { label: "All clusters ≥50%", current: "2 below", status: "at-risk" },
      { label: "≥3 Practitioner mocks", current: "1 attempted", status: "in-progress" },
      { label: "Open-book pacing drill done", current: "not done", status: "blocked" },
    ],
  },
];

const comboCourse = "PRINCE2® Foundation + Practitioner";

const statusMap = {
  met: { icon: "fa-solid fa-circle-check", tone: "green" },
  "in-progress": { icon: "fa-solid fa-spinner", tone: "blue" },
  "at-risk": { icon: "fa-solid fa-circle-exclamation", tone: "amber" },
  blocked: { icon: "fa-solid fa-circle-xmark", tone: "red" },
};

function ComboVoucherTile({ t }: { t: ComboTile }) {
  return (
    <article className={`cv-tile cv-${t.state}`}>
      <header>
        <div className="cv-level">
          <strong>{t.level}</strong>
          <small>via {t.awardingBody}</small>
        </div>
        {t.state === "locked" && (
          <span className="cv-state-pill locked">
            <i className="fa-solid fa-lock"></i> Locked
          </span>
        )}
        {t.state === "unlocked" && (
          <span className="cv-state-pill unlocked">
            <i className="fa-solid fa-sparkles"></i> Ready
          </span>
        )}
        {t.state === "redeemed" && (
          <span className="cv-state-pill redeemed">
            <i className="fa-solid fa-circle-check"></i> Booked · {t.bookingDate}
          </span>
        )}
      </header>

      {t.state === "locked" && (
        <div className="cv-progress">
          <div className="cv-progress-row">
            <small>Readiness</small>
            <strong>{t.composite}/{t.threshold}</strong>
          </div>
          <div className="cv-progress-bar">
            <div
              className="cv-progress-fill locked"
              style={{ width: `${(t.composite / t.threshold) * 100}%` }}
            />
          </div>
          <small className="cv-points">
            <i className="fa-regular fa-circle-dot"></i>{" "}
            <strong>{t.threshold - t.composite} points</strong> to unlock
          </small>
        </div>
      )}

      {t.state === "redeemed" && t.voucherCode && (
        <div className="cv-code">
          <small>Voucher</small>
          <code>{t.voucherCode}</code>
        </div>
      )}

      <ul className="cv-gates">
        {t.gates.map((g, i) => {
          const s = statusMap[g.status];
          return (
            <li key={i} className={s.tone}>
              <i className={s.icon}></i>
              <span>{g.label}</span>
              <strong>{g.current}</strong>
            </li>
          );
        })}
      </ul>

      <footer>
        <small>Valid through {t.validity}</small>
        {t.state === "locked" && (
          <Link href="/lms/pmp/readiness" className="cv-cta secondary">
            See what's left <i className="fa-solid fa-arrow-right"></i>
          </Link>
        )}
        {t.state === "unlocked" && (
          <Link href="#" className="cv-cta primary">
            <i className="fa-solid fa-ticket"></i> Redeem voucher
          </Link>
        )}
        {t.state === "redeemed" && (
          <Link href="/lms/pmp/voucher/booking" className="cv-cta booking">
            Booking page <i className="fa-solid fa-arrow-right"></i>
          </Link>
        )}
      </footer>
    </article>
  );
}

export default function ComboVoucherPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Combo voucher" },
      ]}
      title="🎟️ Foundation + Practitioner vouchers"
      subtitle={
        `Your combo enrollment unlocks two independent vouchers — each with its own gate, validity window, and booking flow.`
      }
      right={
        <span className="cv-course-pill">
          <i className="fa-solid fa-layer-group"></i> {comboCourse}
        </span>
      }
    >
      <section className="cv-intro">
        <i className="fa-solid fa-circle-info"></i>
        <span>
          You can redeem and book Foundation independently while still
          working toward Practitioner. Each voucher is single-use within its
          own validity window.
        </span>
      </section>

      <section className="cv-grid">
        {tiles.map((t) => (
          <ComboVoucherTile key={t.level} t={t} />
        ))}
      </section>

      {/* Combo-specific guidance */}
      <section className="cv-twocol">
        <article className="cv-tip-card">
          <h4>The combo path</h4>
          <ol>
            <li>
              <span>1</span>
              <div>
                <strong>Pass Foundation first</strong>
                <p>
                  Practitioner builds on the Foundation framework. You can't
                  attempt Practitioner without a current Foundation pass.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Practitioner gate is higher</strong>
                <p>
                  Composite threshold for Practitioner is 75 vs Foundation 70 —
                  the exam is scenario-heavy and open-book.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Validity windows are independent</strong>
                <p>
                  Foundation expires 30 Aug; Practitioner 30 Nov. Practitioner
                  buys you time to clear the higher gate.
                </p>
              </div>
            </li>
          </ol>
        </article>

        <aside className="cv-money-back">
          <header>
            <h4>Money-back across the combo</h4>
            <span className="pill pill-gold">
              <i className="fa-solid fa-crown"></i> Gold
            </span>
          </header>
          <p>
            The guarantee applies <strong>per exam attempt</strong>, not per
            combo. If you pass Foundation but fail Practitioner, you can claim
            the Practitioner portion of the fee back — as long as the gate
            was honoured at voucher redemption.
          </p>
          <Link href="/lms/pmp/money-back" className="cv-inline">
            Read the full guarantee terms <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </aside>
      </section>
    </LmsFrame>
  );
}
