import Link from "next/link";

type EmailKind = "welcome" | "activation" | "receipt" | "nudge-onboarding" | "nudge-mock" | "nudge-cert" | "password-reset" | "voucher-issued";

type EmailTemplate = {
  id: EmailKind;
  category: "transactional" | "nudge" | "lifecycle";
  subject: string;
  preview: string;
  from: string;
  triggeredBy: string;
  body: () => React.ReactNode;
};

function EmailFrame({
  children,
  brand = "Invensis Learning",
}: {
  children: React.ReactNode;
  brand?: string;
}) {
  return (
    <div className="em-frame">
      <header className="em-frame-head">
        <span className="em-brand-logo">
          <i className="fa-solid fa-graduation-cap"></i>
        </span>
        <strong>{brand}</strong>
      </header>
      <div className="em-frame-body">{children}</div>
      <footer className="em-frame-foot">
        <p>
          Invensis Learning · #156, 17th Cross, JP Nagar 6th Phase, Bengaluru 560078
        </p>
        <p>
          <a href="#">Unsubscribe</a> · <a href="#">Privacy policy</a> · <a href="#">Help centre</a>
        </p>
      </footer>
    </div>
  );
}

const templates: EmailTemplate[] = [
  {
    id: "activation",
    category: "lifecycle",
    subject: "Welcome to your PMP® journey — set your password",
    preview: "Click the button below to activate your account and start learning.",
    from: "Invensis Learning <hello@invensislearning.com>",
    triggeredBy: "Payment received · enrolment created",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Welcome aboard, Vijay 👋</h1>
        <p className="em-p">
          You're enrolled in <strong>PMP® Certification Prep · Gold</strong>.
          One click and you're in.
        </p>
        <a href="#" className="em-cta">Set my password &amp; get started</a>
        <p className="em-fine">
          This link expires in <strong>48 hours</strong>. If you didn't sign up, ignore this email.
        </p>
        <hr className="em-hr" />
        <p className="em-p">
          <strong>What you get with Gold:</strong>
        </p>
        <ul className="em-list">
          <li>Full course content + question bank (1,248 questions)</li>
          <li>6 mock exams + AI gap reports</li>
          <li>6 hours of 1:1 coaching</li>
          <li>Money-back guarantee on your first attempt</li>
        </ul>
      </EmailFrame>
    ),
  },
  {
    id: "welcome",
    category: "lifecycle",
    subject: "You're all set, Vijay — here's where to start",
    preview: "First steps inside your PMP prep · 5-min onboarding · 20-question baseline.",
    from: "Priya Iyer <priya@invensislearning.com>",
    triggeredBy: "Onboarding completed",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">You've started strong</h1>
        <p className="em-p">
          Loved the focus during your baseline mock. Your composite readiness score is
          live at <strong>34/100</strong> — totally normal for week 1.
        </p>
        <div className="em-callout">
          <strong>Your next 3 steps (this week):</strong>
          <ol className="em-list">
            <li>Read the <a href="#">Process domain reference card</a> (35 min)</li>
            <li>Attend <a href="#">Wednesday's EVM workshop</a> at 18:00 IST</li>
            <li>Drill 50 Q-bank questions in your weakest cluster</li>
          </ol>
        </div>
        <a href="#" className="em-cta">Open my dashboard</a>
        <hr className="em-hr" />
        <p className="em-fine">
          I'm Priya — lead instructor for your cohort. Reply to this email
          directly with any questions; I read every one.
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "receipt",
    category: "transactional",
    subject: "Receipt for your PMP® Gold enrolment · ₹24,500",
    preview: "Payment received · invoice INV-2026-04821 attached.",
    from: "Invensis Billing <billing@invensislearning.com>",
    triggeredBy: "Successful payment at checkout",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Receipt · ₹24,500</h1>
        <p className="em-p">
          Hi Vijay, here's the receipt for your <strong>PMP® Certification Prep · Gold</strong> enrolment.
        </p>
        <table className="em-table">
          <tbody>
            <tr><th>Order ID</th><td>ORD-2026-04821</td></tr>
            <tr><th>Invoice</th><td>INV-2026-04821 (attached)</td></tr>
            <tr><th>Payment method</th><td>HDFC Credit Card ****4421</td></tr>
            <tr><th>Course</th><td>PMP® Prep · Gold tier · 12 months access</td></tr>
            <tr><th>Subtotal</th><td>₹20,762.71</td></tr>
            <tr><th>GST (18%)</th><td>₹3,737.29</td></tr>
            <tr className="em-total"><th>Total</th><td><strong>₹24,500.00</strong></td></tr>
          </tbody>
        </table>
        <a href="#" className="em-cta secondary">Download invoice (PDF)</a>
        <p className="em-fine">
          GSTIN can be added to this invoice within 7 days. Reply to this email with your GSTIN to update.
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "voucher-issued",
    category: "lifecycle",
    subject: "🎟️ Your PMI® voucher is ready",
    preview: "Gate cleared — code valid through 30 Aug 2026. Book your exam slot anytime.",
    from: "Invensis Learning <hello@invensislearning.com>",
    triggeredBy: "Composite ≥75 + all 4 gates met + Redeem clicked",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">🎉 You've earned it.</h1>
        <p className="em-p">
          Your readiness composite crossed <strong>75</strong> with every gate item met.
          We've minted your PMI exam voucher — book whenever you're ready.
        </p>
        <div className="em-voucher">
          <small>Your single-use voucher code</small>
          <code>PMI-2026-K7Z9-9X4F-A2L8</code>
          <small>Valid through 30 Aug 2026 (96 days)</small>
        </div>
        <a href="#" className="em-cta">Open PMI booking page</a>
        <hr className="em-hr" />
        <p className="em-fine">
          Treat this code like a payment instrument. Don't share it on
          community channels. Money-back guarantee remains active (gate honoured).
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "password-reset",
    category: "transactional",
    subject: "Reset your Invensis Learning password",
    preview: "Click below to set a new password · expires in 1 hour.",
    from: "Invensis Learning <noreply@invensislearning.com>",
    triggeredBy: "User submitted /auth/forgot-password",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Reset your password</h1>
        <p className="em-p">
          Someone asked us to send a reset link for the Invensis Learning
          account tied to this email. If it was you, click below within the next hour.
        </p>
        <a href="#" className="em-cta">Reset my password</a>
        <p className="em-fine">
          Link expires in <strong>1 hour</strong>. If you didn't request this, you can
          safely ignore this email — your password won't change.
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "nudge-onboarding",
    category: "nudge",
    subject: "Vijay, finish setup in 5 minutes ⏱️",
    preview: "You're 1 step away from unlocking your study plan.",
    from: "Priya Iyer <priya@invensislearning.com>",
    triggeredBy: "Activated but onboarding incomplete · 24h cool-down",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Almost there — 1 step to go</h1>
        <p className="em-p">
          You activated your account but haven't taken the 20-question baseline yet.
          Without it, your AI study plan stays generic instead of personal.
        </p>
        <div className="em-callout">
          <strong>Why it matters:</strong> 5 minutes here saves ~3 hours of misaligned
          prep in week 1. The mock identifies your weakest topic so we can focus there.
        </div>
        <a href="#" className="em-cta">Take the 20-Q baseline (5 min)</a>
        <p className="em-fine">
          You can do this anytime — but the sooner, the more useful your first study plan.
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "nudge-mock",
    category: "nudge",
    subject: "It's been 10 days since your last mock 📋",
    preview: "Mini Mock 3 is ready · 1 hour · the fastest readiness lift available right now.",
    from: "Invensis Learning <hello@invensislearning.com>",
    triggeredBy: "No mock taken in 10 days · composite stagnating",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Time for the next mock</h1>
        <p className="em-p">
          Your composite has been at <strong>62</strong> for 10 days. The single biggest
          lever to push it past 70 is your next mock paper.
        </p>
        <div className="em-callout">
          <strong>Recommended:</strong> Full Length Exam 2 · 180 questions · 230 min
          <br />
          <small>Even a 70% score lifts composite from 62 → ~68.</small>
        </div>
        <a href="#" className="em-cta">Start Full Length Exam 2</a>
        <p className="em-fine">
          You can save and resume mid-exam if something comes up.
        </p>
      </EmailFrame>
    ),
  },
  {
    id: "nudge-cert",
    category: "nudge",
    subject: "Don't let your PMP® certificate slide 🔄",
    preview: "Year 2 of your cycle starts soon · 48 PDUs to go.",
    from: "Invensis Learning <hello@invensislearning.com>",
    triggeredBy: "Certified > 1 year ago + PDUs trailing cycle",
    body: () => (
      <EmailFrame>
        <h1 className="em-h1">Year 1 down · 2 to go</h1>
        <p className="em-p">
          Hi Vijay — you earned your PMP® a year ago. You've logged <strong>12 PDUs</strong>{" "}
          out of the 60 needed by <strong>12 June 2029</strong>. Easy to catch up if we start now.
        </p>
        <div className="em-callout">
          <strong>Two quick wins this month:</strong>
          <ol className="em-list">
            <li>PMI India chapter webinar — 1 PDU, free for members</li>
            <li>Mentor in #process-domain — up to 4 PDUs/quarter</li>
          </ol>
        </div>
        <a href="#" className="em-cta">Open renewal tracker</a>
      </EmailFrame>
    ),
  },
];

const categoryMeta = {
  transactional: { label: "Transactional", tone: "blue" },
  lifecycle: { label: "Lifecycle", tone: "purple" },
  nudge: { label: "Nudge", tone: "amber" },
};

const stats = {
  total: templates.length,
  transactional: templates.filter(t => t.category === "transactional").length,
  lifecycle: templates.filter(t => t.category === "lifecycle").length,
  nudge: templates.filter(t => t.category === "nudge").length,
};

export default function EmailTemplatesPage() {
  return (
    <main className="em-page">
      <header className="em-page-head">
        <div>
          <small><Link href="/lms/pmp">← Back to dashboard</Link></small>
          <h1>📧 Email template designs</h1>
          <p>
            Static visual mockups for the 8 transactional + lifecycle + nudge
            emails referenced across Stages 2, 5, and 7. Visual only —
            not wired to a sender.
          </p>
        </div>
        <div className="em-stats">
          <article><strong>{stats.total}</strong><small>templates</small></article>
          <article><strong>{stats.transactional}</strong><small>transactional</small></article>
          <article><strong>{stats.lifecycle}</strong><small>lifecycle</small></article>
          <article><strong>{stats.nudge}</strong><small>nudge</small></article>
        </div>
      </header>

      <section className="em-grid">
        {templates.map((t) => {
          const cat = categoryMeta[t.category];
          return (
            <article key={t.id} className="em-card" id={`tpl-${t.id}`}>
              <header className="em-card-head">
                <div>
                  <div className="em-meta-row">
                    <span className={`em-cat ${cat.tone}`}>{cat.label}</span>
                    <code className="em-id">{t.id}</code>
                  </div>
                  <strong className="em-subject">{t.subject}</strong>
                  <small className="em-preview">{t.preview}</small>
                </div>
                <div className="em-meta-side">
                  <small><strong>From:</strong> {t.from}</small>
                  <small><strong>Trigger:</strong> {t.triggeredBy}</small>
                </div>
              </header>
              <div className="em-render">
                {t.body()}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="em-page-foot">
        <p>
          <strong>Note:</strong> These previews are HTML-rendered approximations.
          Production emails will use the same content compiled to MJML and
          delivered through the ESP layer in Task 122 (transactional email pipeline).
        </p>
      </footer>
    </main>
  );
}
