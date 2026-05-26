import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type GateItem = {
  label: string;
  required: string;
  current: string;
  pct: number;
  status: "met" | "in-progress" | "at-risk" | "blocked";
};

type VoucherState = "locked" | "almost" | "unlocked" | "redeemed";

type Variant = {
  state: VoucherState;
  composite: number;
  threshold: number;
  pointsToUnlock: number;
  awardingBody: string;
  certLevel: string;
  validity: string;
  voucherCode?: string;
  gates: GateItem[];
};

const variants: Variant[] = [
  {
    state: "locked",
    composite: 62,
    threshold: 75,
    pointsToUnlock: 13,
    awardingBody: "PMI",
    certLevel: "PMP®",
    validity: "30 Aug 2026",
    gates: [
      { label: "Composite ≥75", required: "75", current: "62", pct: 83, status: "in-progress" },
      { label: "Each cluster ≥50% coverage", required: "all 6", current: "3 below", pct: 50, status: "at-risk" },
      { label: "≥4 mocks attempted", required: "4", current: "3", pct: 75, status: "in-progress" },
      { label: "Latest gap report acknowledged", required: "ack'd", current: "unacked", pct: 0, status: "blocked" },
    ],
  },
  {
    state: "almost",
    composite: 73,
    threshold: 75,
    pointsToUnlock: 2,
    awardingBody: "PMI",
    certLevel: "PMP®",
    validity: "30 Aug 2026",
    gates: [
      { label: "Composite ≥75", required: "75", current: "73", pct: 97, status: "in-progress" },
      { label: "Each cluster ≥50% coverage", required: "all 6", current: "all clear", pct: 100, status: "met" },
      { label: "≥4 mocks attempted", required: "4", current: "5", pct: 100, status: "met" },
      { label: "Latest gap report acknowledged", required: "ack'd", current: "ack'd", pct: 100, status: "met" },
    ],
  },
  {
    state: "unlocked",
    composite: 78,
    threshold: 75,
    pointsToUnlock: 0,
    awardingBody: "PMI",
    certLevel: "PMP®",
    validity: "30 Aug 2026",
    gates: [
      { label: "Composite ≥75", required: "75", current: "78", pct: 100, status: "met" },
      { label: "Each cluster ≥50% coverage", required: "all 6", current: "all clear", pct: 100, status: "met" },
      { label: "≥4 mocks attempted", required: "4", current: "5", pct: 100, status: "met" },
      { label: "Latest gap report acknowledged", required: "ack'd", current: "ack'd", pct: 100, status: "met" },
    ],
  },
  {
    state: "redeemed",
    composite: 78,
    threshold: 75,
    pointsToUnlock: 0,
    awardingBody: "PMI",
    certLevel: "PMP®",
    validity: "30 Aug 2026",
    voucherCode: "PMI-2026-K7Z9-9X4F-A2L8",
    gates: [
      { label: "Composite ≥75", required: "75", current: "78", pct: 100, status: "met" },
      { label: "Each cluster ≥50% coverage", required: "all 6", current: "all clear", pct: 100, status: "met" },
      { label: "≥4 mocks attempted", required: "4", current: "5", pct: 100, status: "met" },
      { label: "Latest gap report acknowledged", required: "ack'd", current: "ack'd", pct: 100, status: "met" },
    ],
  },
];

const statusMap = {
  met: { icon: "fa-solid fa-circle-check", tone: "green" },
  "in-progress": { icon: "fa-solid fa-spinner", tone: "blue" },
  "at-risk": { icon: "fa-solid fa-circle-exclamation", tone: "amber" },
  blocked: { icon: "fa-solid fa-circle-xmark", tone: "red" },
};

function VoucherTile({ v }: { v: Variant }) {
  return (
    <article className={`vch-tile vch-${v.state}`}>
      <header>
        <span className="vch-eyebrow">
          <i className="fa-solid fa-ticket"></i> Exam voucher · {v.awardingBody}
        </span>
        {v.state === "locked" && (
          <span className="vch-state-pill locked">
            <i className="fa-solid fa-lock"></i> Locked
          </span>
        )}
        {v.state === "almost" && (
          <span className="vch-state-pill almost">
            <i className="fa-solid fa-bolt"></i> So close
          </span>
        )}
        {v.state === "unlocked" && (
          <span className="vch-state-pill unlocked">
            <i className="fa-solid fa-sparkles"></i> Ready
          </span>
        )}
        {v.state === "redeemed" && (
          <span className="vch-state-pill redeemed">
            <i className="fa-solid fa-circle-check"></i> Redeemed
          </span>
        )}
      </header>

      <div className="vch-cert">
        <strong>{v.certLevel}</strong>
        <small>{v.awardingBody} certification voucher · valid through {v.validity}</small>
      </div>

      {(v.state === "locked" || v.state === "almost") && (
        <div className="vch-progress">
          <div className="vch-progress-row">
            <small>Readiness</small>
            <strong>
              {v.composite}/{v.threshold}
            </strong>
          </div>
          <div className="vch-progress-bar">
            <div
              className={`vch-progress-fill ${v.state}`}
              style={{ width: `${(v.composite / v.threshold) * 100}%` }}
            />
          </div>
          <div className="vch-points-line">
            {v.state === "almost" ? (
              <>
                <i className="fa-solid fa-fire"></i>
                <strong>{v.pointsToUnlock} points to unlock</strong>
              </>
            ) : (
              <>
                <i className="fa-regular fa-circle-dot"></i>
                <span>
                  <strong>{v.pointsToUnlock} points</strong> to unlock voucher
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {v.state === "unlocked" && (
        <div className="vch-ready">
          <div className="vch-ready-glow">
            <i className="fa-solid fa-sparkles"></i>
          </div>
          <strong>Ready to redeem!</strong>
          <p>
            You've cleared the readiness gate. Click below to reveal your
            voucher code and start the booking flow.
          </p>
        </div>
      )}

      {v.state === "redeemed" && (
        <div className="vch-redeemed">
          <small>Voucher code</small>
          <div className="vch-code-row">
            <code>{v.voucherCode}</code>
            <button type="button" aria-label="Copy code">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <small>
            <i className="fa-solid fa-circle-check"></i> Booked? Use the link to
            jump to {v.awardingBody}'s booking portal.
          </small>
        </div>
      )}

      <ul className="vch-gates">
        {v.gates.map((g, i) => {
          const s = statusMap[g.status];
          return (
            <li key={i} className={s.tone}>
              <i className={s.icon}></i>
              <span className="vch-gate-label">{g.label}</span>
              <span className="vch-gate-val">{g.current}</span>
            </li>
          );
        })}
      </ul>

      <footer>
        {v.state === "locked" && (
          <Link href="/lms/pmp/readiness" className="vch-cta secondary">
            Show me how to unlock <i className="fa-solid fa-arrow-right"></i>
          </Link>
        )}
        {v.state === "almost" && (
          <Link href="/lms/pmp/readiness" className="vch-cta amber">
            <i className="fa-solid fa-bolt"></i> Push to 75 — see what's left
          </Link>
        )}
        {v.state === "unlocked" && (
          <Link href="#" className="vch-cta unlocked">
            <i className="fa-solid fa-ticket"></i> Redeem voucher
          </Link>
        )}
        {v.state === "redeemed" && (
          <Link href="/lms/pmp/voucher/booking" className="vch-cta booking">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Open booking page
          </Link>
        )}
      </footer>
    </article>
  );
}

export default function VoucherShowcasePage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Voucher tile · showcase" },
      ]}
      title="🎟️ Voucher tile — all states"
      subtitle="The voucher tile lives on the dashboard. It transitions through four states as the learner crosses gate thresholds and redeems."
    >
      <section className="vch-intro">
        <i className="fa-solid fa-circle-info"></i>
        <span>
          Showcase view. In production only one tile renders at a time —
          driven by the learner's current gate state. The status banner above
          the tile mirrors the same state.
        </span>
      </section>

      <section className="vch-grid">
        {variants.map((v) => (
          <div key={v.state} className="vch-stage">
            <header className="vch-stage-head">
              <span className="vch-stage-num">{variants.indexOf(v) + 1}</span>
              <div>
                <strong>
                  {v.state === "locked" && "Locked — gate not cleared"}
                  {v.state === "almost" && "Almost — within 5 points of threshold"}
                  {v.state === "unlocked" && "Unlocked — ready to redeem"}
                  {v.state === "redeemed" && "Redeemed — code revealed"}
                </strong>
                <small>
                  Triggered when{" "}
                  {v.state === "locked" && "composite < 70 OR any gate is at-risk/blocked"}
                  {v.state === "almost" && "composite ≥ 70 and all gates met or in-progress"}
                  {v.state === "unlocked" && "composite ≥ 75 AND all four gate items are met"}
                  {v.state === "redeemed" && "the learner has clicked Redeem and the code has been minted"}
                </small>
              </div>
            </header>
            <VoucherTile v={v} />
          </div>
        ))}
      </section>
    </LmsFrame>
  );
}
