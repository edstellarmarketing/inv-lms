import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const cert = {
  learnerName: "Vijay Kumar",
  certLevel: "PMP®",
  dateEarned: "12 June 2026",
  certNumber: "PMI-2026-PMP-4821",
  referralCode: "IL-VK-9X4",
  referralBonus: 600,
};

const presets = {
  linkedin: `Just earned my ${cert.certLevel} certification through Invensis Learning! 🎉

After months of structured prep — mock exams, AI-powered gap reports, and live training — I cleared it on my first attempt.

Huge thanks to the instructors who answered every question and the cohort that kept me honest.

#PMP #ProjectManagement #PMI #InvensisLearning`,
  twitter: `Cleared ${cert.certLevel} on first attempt! 🏆\n\nInvensis Learning's mock + AI coach combo is the real deal.\n\n#PMP #ProjectManagement`,
  whatsapp: `Hey! Just cleared my ${cert.certLevel} cert through Invensis Learning. They're running a referral — use ${cert.referralCode} for ₹500 off your enrolment if you're thinking about it.`,
};

export default function PassSocialSharePage() {
  return (
    <LmsFrame
      active="Certificates"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Certificate", href: "/lms/pmp/certificate" },
        { label: "Share with your network" },
      ]}
      title="📣 Share the win"
      subtitle="Pre-built share cards for LinkedIn, X, and WhatsApp. Every share carries your referral code — friends who enroll earn you cashback."
    >
      <section className="sh-grid">
        {/* LinkedIn */}
        <article className="sh-card linkedin">
          <header>
            <span className="sh-platform"><i className="fa-brands fa-linkedin"></i> LinkedIn</span>
            <small>Posts to feed + adds to your profile under Licenses &amp; certifications</small>
          </header>
          <div className="sh-preview linkedin-preview">
            <div className="sh-pp">
              <div className="sh-pp-head">
                <span className="sh-pp-avatar">VK</span>
                <div>
                  <strong>{cert.learnerName}</strong>
                  <small>{cert.certLevel}-certified Project Manager</small>
                  <small>now · 🌍</small>
                </div>
              </div>
              <p className="sh-pp-body">{presets.linkedin}</p>
              <div className="sh-pp-cert">
                <span className="sh-pp-cert-icon"><i className="fa-solid fa-medal"></i></span>
                <div>
                  <strong>{cert.certLevel} — Project Management Professional</strong>
                  <small>Issued by PMI · {cert.dateEarned}</small>
                </div>
              </div>
              <div className="sh-pp-stats">
                <span>👍 245 reactions</span>
                <span>💬 38 comments</span>
                <span>↗ 12 reposts</span>
              </div>
            </div>
          </div>
          <footer>
            <button type="button" className="sh-edit"><i className="fa-solid fa-pen"></i> Edit text</button>
            <button type="button" className="sh-cta linkedin">
              <i className="fa-brands fa-linkedin"></i> Post to LinkedIn
            </button>
          </footer>
        </article>

        {/* X */}
        <article className="sh-card x">
          <header>
            <span className="sh-platform"><i className="fa-brands fa-x-twitter"></i> X (Twitter)</span>
            <small>Short and shareable · 280 chars max</small>
          </header>
          <div className="sh-preview x-preview">
            <div className="sh-pp">
              <div className="sh-pp-head">
                <span className="sh-pp-avatar">VK</span>
                <div>
                  <strong>{cert.learnerName}</strong>
                  <small>@vijaykumar · now</small>
                </div>
              </div>
              <p className="sh-pp-body small">{presets.twitter}</p>
              <div className="sh-pp-stats">
                <span>💬 24</span>
                <span>🔁 38</span>
                <span>❤ 412</span>
              </div>
            </div>
          </div>
          <footer>
            <button type="button" className="sh-edit"><i className="fa-solid fa-pen"></i> Edit</button>
            <button type="button" className="sh-cta x">
              <i className="fa-brands fa-x-twitter"></i> Post to X
            </button>
          </footer>
        </article>

        {/* WhatsApp */}
        <article className="sh-card whatsapp">
          <header>
            <span className="sh-platform"><i className="fa-brands fa-whatsapp"></i> WhatsApp</span>
            <small>Direct share with friends · includes your referral code</small>
          </header>
          <div className="sh-preview whatsapp-preview">
            <div className="sh-wa">
              <div className="sh-wa-msg">
                <p>{presets.whatsapp}</p>
                <small>10:42 ✓✓</small>
              </div>
            </div>
          </div>
          <footer>
            <button type="button" className="sh-edit"><i className="fa-solid fa-pen"></i> Edit</button>
            <button type="button" className="sh-cta whatsapp">
              <i className="fa-brands fa-whatsapp"></i> Share via WhatsApp
            </button>
          </footer>
        </article>
      </section>

      {/* Referral payoff */}
      <section className="sh-referral">
        <article>
          <span className="sh-ref-bonus">+₹{cert.referralBonus}</span>
          <div>
            <strong>Every friend who enrolls using your code</strong>
            <p>
              gives you <strong>₹{cert.referralBonus} cashback</strong> (₹300 for Silver enrolments).
              Your code <code className="sh-code">{cert.referralCode}</code> is auto-embedded
              in every share above.
            </p>
          </div>
          <div className="sh-code-actions">
            <button type="button" className="sh-secondary">
              <i className="fa-regular fa-copy"></i> Copy code
            </button>
            <Link href="/lms/pmp/cashback" className="sh-secondary primary">
              See cashback ledger <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </article>
      </section>

      {/* Continue */}
      <section className="sh-next">
        <article>
          <i className="fa-solid fa-arrow-right"></i>
          <div>
            <strong>What's next on your journey</strong>
            <p>Curated pathways and renewal tracker are ready for you.</p>
          </div>
          <Link href="/lms/pmp/pathways" className="sh-secondary primary">
            See next certifications
          </Link>
        </article>
      </section>
    </LmsFrame>
  );
}
