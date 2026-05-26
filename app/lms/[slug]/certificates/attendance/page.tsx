import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const learner = {
  fullName: "Vijay Kumar",
  email: "vijay@edstellar.com",
};

const certificate = {
  number: "INV-PMP-2026-04821",
  course: "PMP® Certification Prep",
  courseSub: "Project Management Professional (PMI)",
  cohort: "May 2026 cohort",
  attendedSessions: 23,
  totalSessions: 25,
  attendancePct: 92,
  hours: 38,
  dateRange: "1 March 2026 – 26 May 2026",
  issuedOn: "26 May 2026",
  validatedBy: "Invensis Learning",
  trainerName: "Priya Iyer",
  trainerTitle: "PMP®, PMI-ACP · Lead Instructor",
  signatoryName: "Dr. Anand Rao",
  signatoryTitle: "Programme Director · Invensis Learning",
  verifyUrl: "verify.invensislearning.com/INV-PMP-2026-04821",
};

const milestoneThreshold = 80;
const isEarned = certificate.attendancePct >= milestoneThreshold;

type SessionLog = {
  date: string;
  title: string;
  duration: string;
  status: "attended" | "missed";
};

const recentLog: SessionLog[] = [
  { date: "Mon 25 May", title: "Open Q&A — anything on the syllabus", duration: "60 min", status: "attended" },
  { date: "Sat 23 May", title: "Agile fundamentals — Scrum events recap", duration: "90 min", status: "attended" },
  { date: "Thu 21 May", title: "People domain — virtual teams", duration: "60 min", status: "attended" },
  { date: "Wed 20 May", title: "EVM clinic — formulas, CPI, SPI", duration: "60 min", status: "missed" },
  { date: "Tue 19 May", title: "Mock-exam tactics — pacing & elimination", duration: "90 min", status: "attended" },
  { date: "Sun 17 May", title: "Mock review — Mini Mock 2", duration: "90 min", status: "attended" },
];

export default function AttendanceCertificatePage() {
  return (
    <LmsFrame
      active="Certificates"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Attendance Certificate" },
      ]}
      title="🎓 Attendance Certificate"
      subtitle="Auto-generated when your live-training attendance crosses 80% — download as PDF or share on LinkedIn."
      right={
        isEarned ? (
          <span className="ac-pill earned">
            <i className="fa-solid fa-circle-check"></i> Earned
          </span>
        ) : (
          <span className="ac-pill pending">
            <i className="fa-solid fa-hourglass-half"></i> Not yet earned
          </span>
        )
      }
    >
      {/* Status strip */}
      <section className="ac-status">
        <div className="ac-status-left">
          <strong>
            {isEarned
              ? "Congratulations — your certificate is ready"
              : `${milestoneThreshold - certificate.attendancePct}% more attendance to unlock`}
          </strong>
          <small>
            Issued {certificate.issuedOn} · Verifiable at{" "}
            <Link href="#" className="ac-inline">
              {certificate.verifyUrl}
            </Link>
          </small>
        </div>
        <div className="ac-status-stats">
          <div>
            <strong>{certificate.attendedSessions}</strong>
            <small>of {certificate.totalSessions} sessions</small>
          </div>
          <div>
            <strong>{certificate.attendancePct}%</strong>
            <small>attendance · threshold {milestoneThreshold}%</small>
          </div>
          <div>
            <strong>{certificate.hours} hrs</strong>
            <small>of live training</small>
          </div>
        </div>
      </section>

      {/* Two-col: cert preview + actions */}
      <section className="ac-twocol">
        <div className="ac-preview-wrap">
          <div className="ac-preview-toolbar">
            <strong>
              <i className="fa-solid fa-eye"></i> PDF preview
            </strong>
            <div className="ac-zoom">
              <button type="button" aria-label="Zoom out">
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>100%</span>
              <button type="button" aria-label="Zoom in">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          {/* The certificate */}
          <div className="ac-cert">
            <div className="ac-cert-frame">
              <div className="ac-cert-corner tl" />
              <div className="ac-cert-corner tr" />
              <div className="ac-cert-corner bl" />
              <div className="ac-cert-corner br" />

              <header className="ac-cert-head">
                <div className="ac-cert-brand">
                  <span className="ac-cert-logo">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </span>
                  <div>
                    <strong>Invensis Learning</strong>
                    <small>Authorised training partner</small>
                  </div>
                </div>
                <div className="ac-cert-id">
                  <small>Certificate No.</small>
                  <strong>{certificate.number}</strong>
                </div>
              </header>

              <div className="ac-cert-body">
                <p className="ac-cert-kicker">Certificate of Attendance</p>
                <p className="ac-cert-intro">This is to certify that</p>
                <h2 className="ac-cert-name">{learner.fullName}</h2>
                <div className="ac-cert-underline" />
                <p className="ac-cert-text">
                  has successfully attended{" "}
                  <strong>
                    {certificate.attendedSessions} of {certificate.totalSessions}
                  </strong>{" "}
                  scheduled live-training sessions ({certificate.hours} hours total) in the
                </p>
                <h3 className="ac-cert-course">{certificate.course}</h3>
                <p className="ac-cert-subcourse">{certificate.courseSub}</p>
                <p className="ac-cert-period">
                  conducted between <strong>{certificate.dateRange}</strong>
                  <br />
                  as part of the {certificate.cohort}.
                </p>

                <div className="ac-cert-pct">
                  <span>Attendance</span>
                  <strong>{certificate.attendancePct}%</strong>
                </div>
              </div>

              <footer className="ac-cert-foot">
                <div className="ac-cert-sig">
                  <div className="ac-sig-line">
                    <span className="ac-sig-script">{certificate.trainerName}</span>
                  </div>
                  <strong>{certificate.trainerName}</strong>
                  <small>{certificate.trainerTitle}</small>
                </div>

                <div className="ac-cert-seal" aria-hidden="true">
                  <div className="ac-seal-outer">
                    <div className="ac-seal-inner">
                      <i className="fa-solid fa-award"></i>
                      <small>Verified</small>
                    </div>
                  </div>
                </div>

                <div className="ac-cert-sig">
                  <div className="ac-sig-line">
                    <span className="ac-sig-script">{certificate.signatoryName}</span>
                  </div>
                  <strong>{certificate.signatoryName}</strong>
                  <small>{certificate.signatoryTitle}</small>
                </div>
              </footer>

              <div className="ac-cert-verify">
                Issued on <strong>{certificate.issuedOn}</strong> · Verify at{" "}
                <span className="mono">{certificate.verifyUrl}</span>
              </div>
            </div>
          </div>

          <small className="ac-preview-note">
            <i className="fa-solid fa-circle-info"></i> The downloaded PDF is an exact
            A4 landscape version of this preview with embedded fonts and a verify QR code.
          </small>
        </div>

        <aside className="ac-aside">
          {/* Actions */}
          <article className="ac-actions-card">
            <button type="button" className="ac-primary">
              <i className="fa-solid fa-file-pdf"></i> Download PDF
            </button>
            <button type="button" className="ac-linkedin">
              <i className="fa-brands fa-linkedin"></i> Share on LinkedIn
            </button>
            <div className="ac-share-row">
              <button type="button" className="ac-share" aria-label="Share on X">
                <i className="fa-brands fa-x-twitter"></i>
              </button>
              <button type="button" className="ac-share" aria-label="Share on WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button type="button" className="ac-share" aria-label="Share via email">
                <i className="fa-regular fa-envelope"></i>
              </button>
              <button type="button" className="ac-share" aria-label="Copy link">
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
            <small className="ac-action-note">
              LinkedIn share posts to your feed and adds this certificate to your profile under{" "}
              <strong>Licenses &amp; certifications</strong>.
            </small>
          </article>

          {/* Certificate facts */}
          <article className="ac-card">
            <h4>Certificate details</h4>
            <dl className="ac-meta">
              <div>
                <dt>Issued to</dt>
                <dd>{learner.fullName}</dd>
              </div>
              <div>
                <dt>Course</dt>
                <dd>{certificate.course}</dd>
              </div>
              <div>
                <dt>Cohort</dt>
                <dd>{certificate.cohort}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{certificate.dateRange}</dd>
              </div>
              <div>
                <dt>Hours of training</dt>
                <dd>{certificate.hours} hours</dd>
              </div>
              <div>
                <dt>Certificate No.</dt>
                <dd className="mono">{certificate.number}</dd>
              </div>
              <div>
                <dt>Issued on</dt>
                <dd>{certificate.issuedOn}</dd>
              </div>
            </dl>
          </article>

          {/* What this is / isn't */}
          <article className="ac-card ac-disclaimer">
            <h4>What this certificate is</h4>
            <ul>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>
                  Proof of <strong>attendance</strong> for the live-training portion of your course
                </span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>Verifiable via QR / certificate number on our website</span>
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i>
                <span>Acceptable as <strong>PDU evidence</strong> when paired with the syllabus PDF</span>
              </li>
            </ul>
            <h4 style={{ marginTop: 6 }}>What it's not</h4>
            <ul>
              <li>
                <i className="fa-solid fa-circle-xmark"></i>
                <span>
                  Not the <strong>PMP® certification</strong> — that's issued by PMI on passing the exam
                </span>
              </li>
              <li>
                <i className="fa-solid fa-circle-xmark"></i>
                <span>Not a substitute for the awarding-body voucher or exam booking</span>
              </li>
            </ul>
          </article>

          {/* Recent attendance log */}
          <article className="ac-card">
            <header className="ac-section-head">
              <h4>Recent attendance log</h4>
              <Link href="/lms/pmp/live-training" className="ac-inline">
                Full schedule <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </header>
            <ul className="ac-log">
              {recentLog.map((s, idx) => (
                <li key={idx} className={s.status}>
                  <span className={`ac-log-ic ${s.status}`}>
                    <i
                      className={
                        s.status === "attended"
                          ? "fa-solid fa-check"
                          : "fa-solid fa-xmark"
                      }
                    ></i>
                  </span>
                  <div>
                    <strong>{s.title}</strong>
                    <small>
                      {s.date} · {s.duration} · {s.status === "attended" ? "Attended" : "Missed"}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
