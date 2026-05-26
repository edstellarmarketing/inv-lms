import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const handoff = {
  awardingBody: "PMI",
  awardingBodyFull: "Project Management Institute",
  certLevel: "PMP®",
  voucherCode: "PMI-2026-K7Z9-9X4F-A2L8",
  voucherValidThrough: "30 Aug 2026",
  bookingUrl: "https://www.pmi.org/certifications/exam",
  supportEmail: "certifications@pmi.org",
  daysAway: 4,
};

type Step = { num: number; title: string; body: string; tip?: string };

const steps: Step[] = [
  {
    num: 1,
    title: "Click 'Open booking page' below",
    body: "Opens PMI's official exam booking portal in a new tab. Stay logged into your PMI account — sign up if you don't have one (free).",
    tip: "Use the same email you registered with on Invensis so your record links cleanly.",
  },
  {
    num: 2,
    title: "Paste your voucher code at checkout",
    body: "On PMI's payment page, choose 'I have a promo / voucher code' and paste the code shown on the right. The price drops to ₹0 — confirm before booking.",
    tip: "The code is case-sensitive. Don't add spaces.",
  },
  {
    num: 3,
    title: "Pick your exam date & test centre (or online proctor)",
    body: "PMI shows available slots within 24 weeks. Book within your voucher validity window — see the date on the right.",
    tip: "We recommend booking 7–14 days out so you have a clear runway to peak.",
  },
  {
    num: 4,
    title: "Confirm booking — we'll see the receipt",
    body: "Once you complete the booking, PMI emails you the confirmation. Your Invensis dashboard updates within 24h with your exam date.",
    tip: "Forward the confirmation email to support@invensislearning.com if it doesn't update automatically.",
  },
];

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "What if I don't have a PMI account yet?",
    a: "PMI accounts are free. Sign up on the booking portal with the same email you used on Invensis. You don't need PMI membership to use this voucher.",
  },
  {
    q: "Can I book online proctored instead of a test centre?",
    a: "Yes — PMI offers both. Online proctoring needs a quiet room, a working webcam, and stable internet (10+ Mbps). Test centres are available in 50+ Indian cities.",
  },
  {
    q: "My voucher code didn't work — what now?",
    a: "Hit chat support from your Invensis dashboard. We can re-issue or extend the voucher window if there's a system issue on the awarding body's side.",
  },
  {
    q: "Can I change my exam date after booking?",
    a: "PMI allows one free reschedule up to 48h before your slot. After that there's a fee. See PMI's reschedule policy on their portal.",
  },
];

export default function BookingHandoffPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Voucher booking" },
      ]}
      title="🎟️ Book your PMP® exam with PMI"
      subtitle="You're heading to PMI's official booking portal. Here's everything you need to make it go smoothly."
      right={
        <span className="bk-status">
          <i className="fa-solid fa-circle-check"></i>
          <span>
            <small>Voucher</small>
            <strong>Active</strong>
          </span>
        </span>
      }
    >
      <section className="bk-hero">
        <div className="bk-hero-left">
          <div className="bk-body-mark">
            <span className="bk-body-logo">
              <i className="fa-solid fa-award"></i>
            </span>
            <div>
              <small>You're handing off to</small>
              <strong>{handoff.awardingBodyFull} ({handoff.awardingBody})</strong>
            </div>
          </div>
          <h2>Booking your {handoff.certLevel} exam</h2>
          <p>
            Invensis doesn't run the exam — PMI does. Your voucher unlocks
            free booking on their portal. The flow takes about 10 minutes if
            you have your PMI account ready.
          </p>
          <div className="bk-stats">
            <div>
              <small>Voucher valid through</small>
              <strong>{handoff.voucherValidThrough}</strong>
            </div>
            <div>
              <small>Available formats</small>
              <strong>Online proctor · Test centre</strong>
            </div>
            <div>
              <small>Typical lead time</small>
              <strong>7–14 days to book</strong>
            </div>
          </div>
          <div className="bk-cta-row">
            <a
              href={handoff.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="bk-primary"
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Open PMI booking page
            </a>
            <button type="button" className="bk-secondary">
              <i className="fa-regular fa-copy"></i> Copy voucher code
            </button>
          </div>
          <small className="bk-fine">
            <i className="fa-solid fa-circle-info"></i> Booking opens in a new
            tab. We'll keep this page open in case you need to come back to it.
          </small>
        </div>

        <aside className="bk-voucher-card">
          <header>
            <small>Your voucher</small>
            <span className="bk-state-pill">Active</span>
          </header>
          <div className="bk-code-box">
            <code>{handoff.voucherCode}</code>
            <button type="button" aria-label="Copy">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <dl>
            <div>
              <dt>Certification</dt>
              <dd>{handoff.certLevel}</dd>
            </div>
            <div>
              <dt>Awarding body</dt>
              <dd>{handoff.awardingBody}</dd>
            </div>
            <div>
              <dt>Valid through</dt>
              <dd>{handoff.voucherValidThrough}</dd>
            </div>
            <div>
              <dt>Days remaining</dt>
              <dd>96 days</dd>
            </div>
          </dl>
          <small className="bk-card-note">
            <i className="fa-solid fa-shield-halved"></i> Single-use code.
            Don't share it — once redeemed on PMI, it can't be re-issued.
          </small>
        </aside>
      </section>

      <section className="bk-steps-card">
        <header className="bk-section-head">
          <div>
            <h3>How to book — 4 steps</h3>
            <small>Follow these in order. We've watched this trip people up.</small>
          </div>
        </header>
        <ol className="bk-steps">
          {steps.map((s) => (
            <li key={s.num}>
              <span className="bk-step-num">{s.num}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
                {s.tip && (
                  <div className="bk-tip">
                    <i className="fa-solid fa-lightbulb"></i>
                    <span>{s.tip}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bk-twocol">
        <article className="bk-faq">
          <header className="bk-section-head">
            <div>
              <h3>Common questions</h3>
              <small>Answers to the ones that come up most often</small>
            </div>
          </header>
          <ul className="bk-faq-list">
            {faqs.map((f, i) => (
              <li key={i}>
                <strong>{f.q}</strong>
                <p>{f.a}</p>
              </li>
            ))}
          </ul>
        </article>

        <aside className="bk-support-card">
          <header>
            <h4>Stuck on booking?</h4>
            <small>Our team handles awarding-body handoffs daily.</small>
          </header>
          <div className="bk-support-row">
            <i className="fa-regular fa-envelope"></i>
            <div>
              <strong>Email Invensis support</strong>
              <small>Reply in &lt; 24h</small>
            </div>
            <Link href="/lms/pmp/support" className="bk-link">
              Open <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="bk-support-row">
            <i className="fa-solid fa-phone"></i>
            <div>
              <strong>Call us (Gold)</strong>
              <small>09:00–22:00 IST · avg pickup 30s</small>
            </div>
            <button type="button" className="bk-link">
              Call <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="bk-support-row">
            <i className="fa-solid fa-life-ring"></i>
            <div>
              <strong>PMI's own support</strong>
              <small>{handoff.supportEmail}</small>
            </div>
            <a
              href={`mailto:${handoff.supportEmail}`}
              className="bk-link"
            >
              Email <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </aside>
      </section>

      <section className="bk-next">
        <article>
          <i className="fa-solid fa-arrow-right"></i>
          <div>
            <strong>Already booked?</strong>
            <p>Drop us your exam date — we'll set up your exam-day countdown and prep checklist.</p>
          </div>
          <Link href="/lms/pmp/voucher/scheduled" className="bk-primary">
            <i className="fa-regular fa-calendar"></i> Record exam date
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
