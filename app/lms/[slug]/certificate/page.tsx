import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

const cert = {
  learnerName: "Vijay Kumar",
  certLevel: "PMP®",
  fullName: "Project Management Professional",
  awardingBody: "PMI · Project Management Institute",
  certNumber: "PMI-2026-PMP-4821",
  dateEarned: "12 June 2026",
  validThrough: "12 June 2029",
  score: "AT / AT / T",
  pdusNeeded: 60,
};

export default function PassCertificatePage() {
  return (
    <LmsFrame
      active="Certificates"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Your PMP® Certificate" },
      ]}
      title={`🏆 Congratulations, ${cert.learnerName.split(" ")[0]}!`}
      subtitle={`You're officially ${cert.certLevel}-certified. Awarded ${cert.dateEarned} · valid through ${cert.validThrough}.`}
      right={
        <span className="pc-pill earned">
          <i className="fa-solid fa-trophy"></i> Passed
        </span>
      }
    >
      <section className="pc-twocol">
        <div className="pc-preview-wrap">
          <div className="pc-preview-toolbar">
            <strong><i className="fa-solid fa-eye"></i> Official certificate preview</strong>
            <small>A4 landscape · awarding-body mirror</small>
          </div>

          <div className="pc-cert">
            <div className="pc-cert-frame">
              <div className="pc-cert-corner tl" />
              <div className="pc-cert-corner tr" />
              <div className="pc-cert-corner bl" />
              <div className="pc-cert-corner br" />

              <header>
                <div className="pc-cert-brand">
                  <span className="pc-cert-logo">
                    <i className="fa-solid fa-award"></i>
                  </span>
                  <div>
                    <strong>Project Management Institute</strong>
                    <small>Official certification</small>
                  </div>
                </div>
                <div className="pc-cert-id">
                  <small>Certification No.</small>
                  <strong>{cert.certNumber}</strong>
                </div>
              </header>

              <div className="pc-cert-body">
                <p className="pc-cert-kicker">Certificate of Achievement</p>
                <p className="pc-cert-intro">This is to certify that</p>
                <h2 className="pc-cert-name">{cert.learnerName}</h2>
                <div className="pc-cert-underline" />
                <p className="pc-cert-text">
                  has successfully passed the
                </p>
                <h3 className="pc-cert-course">
                  {cert.certLevel} — {cert.fullName}
                </h3>
                <p className="pc-cert-period">
                  examination on <strong>{cert.dateEarned}</strong> with score <strong>{cert.score}</strong>
                </p>
                <p className="pc-cert-period small">
                  Valid through <strong>{cert.validThrough}</strong> · {cert.pdusNeeded} PDUs required for renewal
                </p>
              </div>

              <footer>
                <div className="pc-cert-sig">
                  <div className="pc-sig-line">
                    <span className="pc-sig-script">Pierre Le Manh</span>
                  </div>
                  <strong>Pierre Le Manh</strong>
                  <small>President &amp; CEO · PMI</small>
                </div>
                <div className="pc-cert-seal" aria-hidden="true">
                  <div className="pc-seal-outer">
                    <div className="pc-seal-inner">
                      <i className="fa-solid fa-medal"></i>
                      <small>PMI</small>
                    </div>
                  </div>
                </div>
                <div className="pc-cert-sig">
                  <div className="pc-sig-line">
                    <span className="pc-sig-script">Sunil Prashara</span>
                  </div>
                  <strong>Sunil Prashara</strong>
                  <small>Chair of the Board</small>
                </div>
              </footer>

              <div className="pc-cert-verify">
                Verify at <span className="mono">verify.pmi.org/{cert.certNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="pc-aside">
          <article className="pc-actions-card">
            <button type="button" className="pc-primary">
              <i className="fa-solid fa-file-pdf"></i> Download PDF certificate
            </button>
            <Link href="/lms/pmp/share" className="pc-linkedin">
              <i className="fa-brands fa-linkedin"></i> Share on LinkedIn
            </Link>
            <div className="pc-share-row">
              <button type="button" className="pc-share" aria-label="X">
                <i className="fa-brands fa-x-twitter"></i>
              </button>
              <button type="button" className="pc-share" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button type="button" className="pc-share" aria-label="Email">
                <i className="fa-regular fa-envelope"></i>
              </button>
              <button type="button" className="pc-share" aria-label="Copy link">
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
            <small className="pc-action-note">
              Sharing adds the certificate to your LinkedIn <strong>Licenses &amp; certifications</strong> automatically.
            </small>
          </article>

          <article className="pc-card">
            <h4>Certificate details</h4>
            <dl className="pc-meta">
              <div><dt>Awarded to</dt><dd>{cert.learnerName}</dd></div>
              <div><dt>Certification</dt><dd>{cert.certLevel}</dd></div>
              <div><dt>Awarding body</dt><dd>PMI</dd></div>
              <div><dt>Date earned</dt><dd>{cert.dateEarned}</dd></div>
              <div><dt>Score</dt><dd>{cert.score}</dd></div>
              <div><dt>Valid through</dt><dd>{cert.validThrough}</dd></div>
              <div><dt>Cert No.</dt><dd className="mono">{cert.certNumber}</dd></div>
            </dl>
          </article>

          <article className="pc-card pc-next">
            <h4>What's next</h4>
            <ul>
              <li>
                <Link href="/lms/pmp/share">
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>
                    <strong>Share with your network</strong>
                    <small>LinkedIn post + profile badge</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/lms/pmp/pathways">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>
                    <strong>Next certifications</strong>
                    <small>Pathways that build on {cert.certLevel}</small>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/lms/pmp/renewal">
                  <i className="fa-solid fa-arrows-rotate"></i>
                  <span>
                    <strong>Renewal tracker</strong>
                    <small>{cert.pdusNeeded} PDUs · 3-year cycle</small>
                  </span>
                </Link>
              </li>
            </ul>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
