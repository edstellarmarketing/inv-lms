import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

const toc = [
  { num: "1", label: "Introduction to Agile", active: true },
  { num: "1.1", label: "Agile Mindset & Principles" },
  { num: "1.2", label: "Scrum Fundamentals (Sprint Approach)" },
  { num: "1.3", label: "Scrum Roles" },
  { num: "1.4", label: "Scrum Events" },
  { num: "1.5", label: "Kanban Framework" },
  { num: "1.6", label: "Lean Principles" },
  { num: "1.7", label: "Agile Planning & Estimation" },
  { num: "1.8", label: "Monitoring & Metrics" },
  { num: "1.9", label: "Risk Management in Agile" },
  { num: "1.10", label: "Agile Leadership" },
  { num: "1.11", label: "Stakeholder Engagement" },
  { num: "1.12", label: "Scaling Agile (SAFe, LeSS)" },
  { num: "1.13", label: "Hybrid Agile" },
  { num: "1.14", label: "Real-World Case Studies" },
  { num: "1.15", label: "Further Reading" },
];

const benefits = [
  { icon: "fa-solid fa-rocket", title: "Faster Delivery", desc: "Smaller iterations get value to customers sooner.", tone: "blue" },
  { icon: "fa-solid fa-arrows-spin", title: "Flexibility", desc: "Re-prioritise as the situation and learning evolves.", tone: "purple" },
  { icon: "fa-solid fa-medal", title: "Better Quality", desc: "Continuous testing and refinement reduces defects.", tone: "green" },
  { icon: "fa-solid fa-face-smile", title: "Customer Satisfaction", desc: "Frequent demos keep customers in the loop.", tone: "orange" },
  { icon: "fa-solid fa-arrow-trend-up", title: "Open Improvement", desc: "Retrospectives create a culture of continuous learning.", tone: "red" },
];

export default function StudyGuidePage() {
  return (
    <LmsFrame
      active="My Learning"
      title="Agile Practice Guide Study Guide"
      subtitle="20 chapters · 4 hr 20 min · Topic: PMP®"
      right={
        <Link href="/lms/pmp" className="ep-back">
          <i className="fa-solid fa-arrow-left"></i> Back to Exam Preparation
        </Link>
      }
    >
      <div className="sguide-grid">
        {/* TOC sidebar */}
        <aside className="sguide-side">
          <strong className="sguide-side-title">On this page</strong>
          <div className="rcard-search small">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search content..." />
          </div>

          <ul className="sguide-toc">
            {toc.map((s) => (
              <li key={s.num} className={s.active ? "active" : ""}>
                <a href="#">
                  <span className="toc-num">{s.num}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button className="rcard-download">
            <i className="fa-solid fa-download"></i> Download Guide (PDF)
          </button>
        </aside>

        {/* Main content */}
        <article className="sguide-main">
          <div className="sguide-mhead">
            <div className="sguide-mhead-meta">
              <span className="sguide-topic-chip">
                <i className="fa-solid fa-tag"></i> Topic: Agile
              </span>
              <small>
                <i className="fa-regular fa-clock"></i> 00:30 read
              </small>
            </div>
            <div className="sguide-mhead-actions">
              <button className="rcard-iconbtn" aria-label="Bookmark">
                <i className="fa-regular fa-bookmark"></i>
              </button>
              <button className="lms-btn ghost sm">
                <i className="fa-regular fa-eye"></i> View Guide
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <div className="sguide-progress">
            <div className="sguide-progress-info">
              <span className="sgp-label">
                <i className="fa-solid fa-book-open-reader"></i> Reading progress
              </span>
              <span className="sgp-meta">
                <strong>32%</strong> complete &middot; 5 of 16 sections read
              </span>
            </div>
            <div className="sguide-progress-bar">
              <span style={{ width: "32%" }} />
            </div>
          </div>

          {/* Section 1 */}
          <section className="sguide-section">
            <h2>1. Introduction to Agile</h2>
            <p>
              Agile is a mindset and a set of principles focused on delivering value
              iteratively and incrementally. It embraces collaboration, customer
              feedback, adaptability, and continuous improvement.
            </p>
            <p>
              The Agile approach enables teams to respond to change with shorter
              cycles, frequent reviews, and tight feedback loops.
            </p>

            <div className="sguide-callout">
              <i className="fa-solid fa-lightbulb"></i>
              <div>
                <strong>Agile is best understood as a mindset</strong>
                <p>— it&apos;s a way of thinking and working.</p>
              </div>
            </div>

            <h3>1.1 What is Agile?</h3>
            <p>
              Agile is an iterative approach to project management and product
              development that helps teams deliver value to customers faster and with
              fewer headaches. Instead of betting everything on a single &quot;big bang&quot;
              launch, work is broken into small increments delivered in short cycles.
            </p>

            <div className="sguide-compare">
              <div className="cmp">
                <h4>Traditional</h4>
                <ul>
                  <li>Long planning phase</li>
                  <li>Sequential, gated stages</li>
                  <li>Change is expensive</li>
                  <li>Customer sees end product</li>
                </ul>
              </div>
              <div className="cmp">
                <h4>Agile</h4>
                <ul>
                  <li>Continuous planning</li>
                  <li>Iterative cycles</li>
                  <li>Welcomes change</li>
                  <li>Frequent customer demos</li>
                </ul>
              </div>
            </div>

            <h3>1.2 The Agile Manifesto</h3>
            <p>
              In 2001, seventeen practitioners distilled their experience into four
              values and twelve principles that have shaped modern delivery teams ever
              since.
            </p>

            <div className="manifesto-grid">
              <div className="manifesto-col">
                <h4>Agile Values</h4>
                <ul>
                  <li>Individuals and interactions over processes and tools</li>
                  <li>Working software over comprehensive documentation</li>
                  <li>Customer collaboration over contract negotiation</li>
                  <li>Responding to change over following a plan</li>
                </ul>
              </div>
              <div className="manifesto-col">
                <h4>Twelve Principles (highlights)</h4>
                <ul>
                  <li>Early and continuous delivery of value</li>
                  <li>Welcome change, even late in development</li>
                  <li>Deliver working software frequently</li>
                  <li>Maintain a sustainable pace</li>
                </ul>
              </div>
            </div>

            <h3>1.3 Benefits of Agile</h3>
            <div className="benefits-grid">
              {benefits.map((b) => (
                <div key={b.title} className={`benefit ${b.tone}`}>
                  <span className="benefit-icon">
                    <i className={b.icon}></i>
                  </span>
                  <strong>{b.title}</strong>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer nav */}
          <div className="rcard-foot">
            <button className="lms-btn ghost">
              <i className="fa-solid fa-arrow-left"></i> Previous Section
            </button>
            <span className="rcard-foot-mid">1 of 16</span>
            <Link href="#" className="lms-btn primary">
              <i className="fa-solid fa-check"></i> Mark Section Complete
            </Link>
          </div>
        </article>
      </div>
    </LmsFrame>
  );
}
