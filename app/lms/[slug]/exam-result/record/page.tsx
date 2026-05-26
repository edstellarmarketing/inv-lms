"use client";

import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const exam = {
  certLevel: "PMP®",
  awardingBody: "PMI",
  bookingRef: "PMI-CONF-44781",
  bookingDate: "12 June 2026",
  passMark: 60,
};

export default function OutcomeRecordingPage() {
  return (
    <LmsFrame
      active="Dashboard"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Record exam outcome" },
      ]}
      title="🏁 Record your exam outcome"
      subtitle="Once PMI confirms your result, drop it here so we can switch your dashboard to the right post-exam path."
    >
      <section className="er-twocol">
        <article className="er-form-card">
          <header className="er-section-head">
            <div>
              <h3>Exam outcome</h3>
              <small>
                We pre-fetch from PMI's portal when their API is live. Until
                then, manual entry keeps your dashboard accurate.
              </small>
            </div>
            <span className="er-auto-pill">
              <i className="fa-solid fa-arrows-rotate"></i> Auto-pull pending
            </span>
          </header>

          <div className="er-outcome-pick">
            <label className="er-outcome-tile pass">
              <input type="radio" name="outcome" />
              <span className="er-outcome-icon">
                <i className="fa-solid fa-trophy"></i>
              </span>
              <strong>I passed</strong>
              <small>Open the certificate flow + share + renewal tracker</small>
            </label>
            <label className="er-outcome-tile fail">
              <input type="radio" name="outcome" defaultChecked />
              <span className="er-outcome-icon">
                <i className="fa-solid fa-circle-xmark"></i>
              </span>
              <strong>I didn't pass</strong>
              <small>Open the retake + claim flow based on your tier</small>
            </label>
          </div>

          <div className="er-form">
            <label>
              <span>Exam date</span>
              <input type="date" defaultValue="2026-06-12" />
            </label>
            <label>
              <span>Score (if shown)</span>
              <input type="text" placeholder="e.g. 76% · or AT/AT/T for PMP" />
            </label>
            <label>
              <span>Booking reference</span>
              <input type="text" defaultValue={exam.bookingRef} />
            </label>
            <label>
              <span>How did PMI deliver the result?</span>
              <select defaultValue="provisional">
                <option value="provisional">Provisional pass/fail on-screen</option>
                <option value="email">Email from PMI</option>
                <option value="portal">PMI portal (official)</option>
              </select>
            </label>
            <label className="er-form-full">
              <span>Notes (optional)</span>
              <textarea rows={3} placeholder="Anything we should know — connectivity issues, proctor flags, retake reasons…" />
            </label>
            <label className="er-form-full">
              <span>Proof upload</span>
              <div className="er-upload">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>
                  Drop the PMI confirmation email, certificate PDF, or screenshot here ·
                  <Link href="#" className="er-inline">browse</Link>
                </span>
                <small>
                  Required if claiming the money-back guarantee · optional otherwise
                </small>
              </div>
            </label>
          </div>

          <footer className="er-form-foot">
            <Link href="/lms/pmp/exam-day" className="er-secondary">
              Cancel
            </Link>
            <button type="button" className="er-primary">
              <i className="fa-solid fa-circle-check"></i> Save outcome &amp; route me
            </button>
          </footer>
        </article>

        <aside className="er-aside">
          <article className="er-card">
            <h4>What happens next</h4>
            <ul className="er-flow">
              <li className="pass">
                <span><i className="fa-solid fa-trophy"></i></span>
                <div>
                  <strong>If pass</strong>
                  <small>
                    Certificate page · social share · renewal tracker · post-cert pathways
                  </small>
                </div>
              </li>
              <li className="fail">
                <span><i className="fa-solid fa-circle-xmark"></i></span>
                <div>
                  <strong>If fail · Bronze</strong>
                  <small>Re-purchase prompt at member rates</small>
                </div>
              </li>
              <li className="fail">
                <span><i className="fa-solid fa-circle-xmark"></i></span>
                <div>
                  <strong>If fail · Silver</strong>
                  <small>1× retake within 90 days (free) · retake training booking</small>
                </div>
              </li>
              <li className="fail">
                <span><i className="fa-solid fa-circle-xmark"></i></span>
                <div>
                  <strong>If fail · Gold</strong>
                  <small>2× retake within 180 days <em>or</em> money-back claim (gate-honoured)</small>
                </div>
              </li>
            </ul>
          </article>

          <article className="er-card">
            <h4>Why we ask for proof</h4>
            <p>
              Without proof, the money-back claim queue can't auto-approve and
              your retake voucher can't be issued. For pass outcomes, proof
              speeds up adding the cert to your LinkedIn profile.
            </p>
            <Link href="/lms/pmp/support" className="er-inline">
              Questions about what counts → contact support
            </Link>
          </article>

          <article className="er-card er-warning">
            <h4>One-time entry</h4>
            <p>
              You can only record an outcome once per voucher. Mistakes can be
              corrected by support within 7 days — after that the audit log
              freezes.
            </p>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
