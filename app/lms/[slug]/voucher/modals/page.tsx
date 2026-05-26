import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const voucher = {
  awardingBody: "PMI",
  awardingBodyFull: "Project Management Institute",
  certLevel: "PMP®",
  code: "PMI-2026-K7Z9-9X4F-A2L8",
  validity: "30 Aug 2026",
  daysValid: 96,
  bookingUrl: "https://www.pmi.org/certifications/exam",
};

export default function VoucherModalsPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Voucher modals · showcase" },
      ]}
      title="🪟 Voucher modals"
      subtitle="The voucher-reveal modal opens after the learner clicks 'Redeem voucher'. The early-redeem override is a support-routed flow that forfeits the Gold guarantee."
    >
      <section className="vm-intro">
        <i className="fa-solid fa-circle-info"></i>
        <span>
          Showcase view. In production these are modal overlays on the
          dashboard / voucher tile. Backdrops are kept lighter so the page
          chrome stays visible.
        </span>
      </section>

      {/* Modal 1 — Reveal */}
      <section className="vm-showcase">
        <header className="vm-showcase-head">
          <div>
            <span className="vm-trigger">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Triggered from
            </span>
            <Link href="/lms/pmp/voucher" className="vm-source">
              /voucher · "Redeem voucher" CTA on the unlocked tile
            </Link>
          </div>
          <span className="vm-tag green">Reveal · success</span>
        </header>

        <div className="vm-stage">
          <div className="vm-modal reveal">
            <button className="vm-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="vm-confetti" aria-hidden="true">
              <span>✦</span><span>✧</span><span>✦</span>
              <span>✶</span><span>✸</span><span>✦</span>
            </div>

            <div className="vm-body-logo">
              <span className="vm-body-mark">
                <i className="fa-solid fa-award"></i>
              </span>
              <div>
                <small>Awarded by</small>
                <strong>{voucher.awardingBodyFull}</strong>
              </div>
            </div>

            <h2 className="vm-cert">{voucher.certLevel} exam voucher</h2>
            <p className="vm-sub">
              Single-use code · valid until <strong>{voucher.validity}</strong>{" "}
              ({voucher.daysValid} days)
            </p>

            <div className="vm-code-box">
              <code>{voucher.code}</code>
              <button type="button" className="vm-copy" aria-label="Copy code">
                <i className="fa-regular fa-copy"></i> Copy
              </button>
            </div>

            <ul className="vm-checks">
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>Locked to your name &amp; email on file</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>Single use — once redeemed on {voucher.awardingBody}, can't be re-issued</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>Money-back guarantee remains active (gate honoured)</span>
              </li>
            </ul>

            <div className="vm-warn">
              <i className="fa-solid fa-shield-halved"></i>
              <span>
                Treat this code like a payment instrument. Don't share it on
                community channels or screenshot it publicly.
              </span>
            </div>

            <footer>
              <button type="button" className="vm-secondary">
                I'll book later
              </button>
              <Link href="/lms/pmp/voucher/booking" className="vm-primary green">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Open booking page
              </Link>
            </footer>
          </div>
        </div>
      </section>

      {/* Modal 2 — Early redeem override */}
      <section className="vm-showcase">
        <header className="vm-showcase-head">
          <div>
            <span className="vm-trigger">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Triggered from
            </span>
            <Link href="/lms/pmp/support" className="vm-source">
              /support · early-redeem override flow (Gold only)
            </Link>
          </div>
          <span className="vm-tag red">Override · forfeits guarantee</span>
        </header>

        <div className="vm-stage">
          <div className="vm-modal override">
            <button className="vm-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <header>
              <span className="vm-icon red">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </span>
              <div>
                <h3>Redeem voucher before gate is cleared?</h3>
                <small>
                  This is an override. It mints the voucher even though your
                  composite readiness is below 75.
                </small>
              </div>
            </header>

            <div className="vm-state-strip">
              <div>
                <small>Current composite</small>
                <strong>62</strong>
                <em>required: 75</em>
              </div>
              <i className="fa-solid fa-arrow-right vm-arrow"></i>
              <div className="forfeit">
                <small>Override forfeits</small>
                <strong>₹24,500</strong>
                <em>money-back guarantee</em>
              </div>
            </div>

            <div className="vm-forfeit-note">
              <i className="fa-solid fa-shield-halved"></i>
              <div>
                <strong>What you're giving up</strong>
                <ul>
                  <li>
                    <span>The Gold money-back guarantee on this attempt</span>
                  </li>
                  <li>
                    <span>The right to claim a refund if you fail</span>
                  </li>
                  <li>
                    <span>The retake voucher tied to your first attempt</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="vm-keep-note">
              <i className="fa-solid fa-circle-check"></i>
              <div>
                <strong>What stays the same</strong>
                <ul>
                  <li>Cashback already earned</li>
                  <li>Access to all course content + AI tools</li>
                  <li>Support &amp; community access</li>
                </ul>
              </div>
            </div>

            <div className="vm-audit-note">
              <i className="fa-solid fa-clipboard-list"></i>
              <small>
                The override is logged with a timestamp and your acknowledgement.
                The audit log is the source of truth if you later try to claim.
              </small>
            </div>

            <label className="vm-confirm">
              <input type="checkbox" />
              <span>
                I understand that <strong>redeeming early forfeits the money-back
                guarantee</strong> and the override cannot be reversed.
              </span>
            </label>

            <label className="vm-confirm">
              <input type="checkbox" />
              <span>
                I have read the override clause in section 3 of the{" "}
                <Link href="/lms/pmp/money-back" className="vm-inline">
                  guarantee terms
                </Link>
                .
              </span>
            </label>

            <footer>
              <button type="button" className="vm-secondary">
                Keep gate · don't override
              </button>
              <button type="button" className="vm-primary red" disabled>
                <i className="fa-solid fa-triangle-exclamation"></i> Redeem early &amp; forfeit guarantee
              </button>
            </footer>
          </div>
        </div>
      </section>

      <section className="vm-footer">
        <article>
          <strong>Where these modals fire</strong>
          <ul>
            <li>
              <strong>Voucher reveal modal</strong> — fires immediately when
              the learner clicks "Redeem voucher" on the unlocked tile. One
              code per enrollment; if they close the modal, the code is still
              available from the redeemed-tile.
            </li>
            <li>
              <strong>Early-redeem override modal</strong> — only reachable
              via a support agent's escalation. Not surfaced anywhere in the
              standard UI. The audit trail is what the money-back claim
              workflow checks against.
            </li>
          </ul>
        </article>
      </section>
    </LmsFrame>
  );
}
