import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type SlotOption = {
  id: string;
  date: string;
  time: string;
  instructor: string;
  capacity: string;
  recommended?: boolean;
};

const liveSession = {
  topic: "EVM in 60 minutes — formulas, CPI, SPI",
  date: "Today · Mon 25 May 2026",
  time: "20:30 – 21:30 IST",
  instructor: "Rohan Mehta",
  hoursAway: 4.5,
  cutoffHours: 24,
};

const rescheduleSlots: SlotOption[] = [
  { id: "r1", date: "Wed 27 May", time: "19:00 IST", instructor: "Rohan Mehta", capacity: "33/50 seats", recommended: true },
  { id: "r2", date: "Fri 29 May", time: "18:00 IST", instructor: "Priya Iyer", capacity: "9/40 seats" },
  { id: "r3", date: "Sat 30 May", time: "11:00 IST", instructor: "Priya Iyer", capacity: "12/40 seats" },
];

const coachingBooking = {
  coach: "Kavya Nair",
  topic: "Business Environment domain",
  date: "Tomorrow · Tue 26 May 2026",
  time: "19:30 – 20:30 IST",
  hoursAway: 27,
  cutoffHours: 12,
  creditsCost: 1,
};

const tierLockedFeature = {
  name: "Phone support",
  requires: "Gold",
  current: "Silver",
  href: "/lms/pmp/support",
};

export default function ModalsShowcasePage() {
  return (
    <LmsFrame
      active="Training Schedule"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "States & modals" },
        { label: "Reschedule / cancel modals" },
      ]}
      title="🪟 Reschedule & cancel modals"
      subtitle="Modal copy for live-session reschedule (24h cutoff), coaching cancel (12h forfeit), and support tier-mismatch lock. These overlays trigger from session and coaching surfaces."
    >
      <section className="md-intro">
        <i className="fa-solid fa-circle-info"></i>
        <span>
          This page is a showcase — in production each modal opens over the
          corresponding page (live session detail, coaching booking, support
          inbox). Backdrops are kept lighter than usual so the page chrome
          stays visible.
        </span>
      </section>

      {/* Modal 1 — Live session reschedule */}
      <section className="md-showcase">
        <header className="md-showcase-head">
          <div>
            <span className="md-trigger">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Triggered from
            </span>
            <Link href="/lms/pmp/live-training/s-25-2" className="md-source">
              /live-training/[sessionId] · "Reschedule" CTA
            </Link>
          </div>
          <span className="md-tag blue">Reschedule</span>
        </header>

        <div className="md-stage">
          <div className="md-modal">
            <button className="md-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <header>
              <span className="md-icon blue">
                <i className="fa-regular fa-calendar"></i>
              </span>
              <div>
                <h3>Reschedule this live session?</h3>
                <small>You're within the 24-hour cutoff — choose a new slot below.</small>
              </div>
            </header>

            <div className="md-current">
              <small>Current booking</small>
              <strong>{liveSession.topic}</strong>
              <p>
                {liveSession.date} · {liveSession.time} · with {liveSession.instructor}
              </p>
            </div>

            <div className="md-warn blue">
              <i className="fa-solid fa-clock"></i>
              <div>
                <strong>
                  This session starts in {liveSession.hoursAway} hours
                </strong>
                <small>
                  Inside the {liveSession.cutoffHours}-hour cutoff, you can
                  still move once for free — instructor capacity permitting.
                </small>
              </div>
            </div>

            <div className="md-slots">
              <small className="md-slots-head">Available alternative slots</small>
              <ul>
                {rescheduleSlots.map((s, idx) => (
                  <li key={s.id}>
                    <label>
                      <input type="radio" name="reschedule-slot" defaultChecked={idx === 0} />
                      <div className="md-slot-info">
                        <div className="md-slot-top">
                          <strong>{s.date} · {s.time}</strong>
                          {s.recommended && (
                            <span className="md-recommended">
                              <i className="fa-solid fa-wand-magic-sparkles"></i> Best match
                            </span>
                          )}
                        </div>
                        <small>
                          with {s.instructor} · {s.capacity}
                        </small>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <small className="md-fine">
              <i className="fa-solid fa-circle-info"></i>
              First reschedule is free. Subsequent reschedules of the same
              session require a session credit.
            </small>

            <footer>
              <button type="button" className="md-secondary">
                Keep current slot
              </button>
              <button type="button" className="md-primary blue">
                Confirm reschedule <i className="fa-solid fa-arrow-right"></i>
              </button>
            </footer>
          </div>
        </div>
      </section>

      {/* Modal 2 — Coaching cancel with forfeit warning */}
      <section className="md-showcase">
        <header className="md-showcase-head">
          <div>
            <span className="md-trigger">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Triggered from
            </span>
            <Link href="/lms/pmp/coaching" className="md-source">
              /coaching · "Cancel booking" on a coaching slot
            </Link>
          </div>
          <span className="md-tag red">Cancel · forfeit</span>
        </header>

        <div className="md-stage">
          <div className="md-modal danger">
            <button className="md-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <header>
              <span className="md-icon red">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </span>
              <div>
                <h3>Cancel this coaching session?</h3>
                <small>You're inside the 12-hour cutoff — cancelling now forfeits the credit.</small>
              </div>
            </header>

            <div className="md-current">
              <small>You're about to cancel</small>
              <strong>1:1 coaching — {coachingBooking.topic}</strong>
              <p>
                {coachingBooking.date} · {coachingBooking.time} · with{" "}
                {coachingBooking.coach}
              </p>
            </div>

            <div className="md-warn red">
              <i className="fa-solid fa-bolt"></i>
              <div>
                <strong>This will burn {coachingBooking.creditsCost} coaching credit</strong>
                <small>
                  Your session is {Math.round(coachingBooking.hoursAway)}h away — outside the
                  {" "}{coachingBooking.cutoffHours}h free-cancel window (cutoff was
                  {" "}{coachingBooking.hoursAway - coachingBooking.cutoffHours}h ago).
                  The credit cannot be restored.
                </small>
              </div>
            </div>

            <div className="md-impact">
              <div>
                <small>Credits before</small>
                <strong>3</strong>
              </div>
              <i className="fa-solid fa-arrow-right md-arrow"></i>
              <div className="loss">
                <small>Credits after</small>
                <strong>2</strong>
              </div>
            </div>

            <div className="md-alt">
              <strong>
                <i className="fa-solid fa-lightbulb"></i> Wait — try this instead
              </strong>
              <p>
                Reschedule to a later slot with the same coach. The credit
                stays on your account and you keep {coachingBooking.coach}'s
                continuity on the topic.
              </p>
              <button type="button" className="md-secondary outline-blue">
                <i className="fa-regular fa-calendar"></i> Reschedule instead
              </button>
            </div>

            <label className="md-confirm">
              <input type="checkbox" />
              <span>
                I understand cancelling now forfeits 1 coaching credit and it
                cannot be restored.
              </span>
            </label>

            <footer>
              <button type="button" className="md-secondary">
                Keep booking
              </button>
              <button type="button" className="md-primary red" disabled>
                <i className="fa-solid fa-circle-xmark"></i> Cancel &amp; forfeit credit
              </button>
            </footer>
          </div>
        </div>
      </section>

      {/* Modal 3 — Tier-mismatch lock */}
      <section className="md-showcase">
        <header className="md-showcase-head">
          <div>
            <span className="md-trigger">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Triggered from
            </span>
            <Link href="/lms/pmp/support" className="md-source">
              /support · attempt to use a Gold-only feature on Silver
            </Link>
          </div>
          <span className="md-tag amber">Tier locked</span>
        </header>

        <div className="md-stage">
          <div className="md-modal locked">
            <button className="md-close" type="button" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <header>
              <span className="md-icon gold">
                <i className="fa-solid fa-crown"></i>
              </span>
              <div>
                <h3>{tierLockedFeature.name} is a Gold benefit</h3>
                <small>You're on Silver — upgrade to unlock priority phone support.</small>
              </div>
            </header>

            <div className="md-tier-row">
              <div className="md-tier-card current">
                <small>You're on</small>
                <span className="pill pill-silver">
                  <i className="fa-solid fa-medal"></i> {tierLockedFeature.current}
                </span>
              </div>
              <i className="fa-solid fa-arrow-right md-arrow"></i>
              <div className="md-tier-card target">
                <small>Required</small>
                <span className="pill pill-gold">
                  <i className="fa-solid fa-crown"></i> {tierLockedFeature.requires}
                </span>
              </div>
            </div>

            <div className="md-perks">
              <strong>You'd also unlock</strong>
              <ul>
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <span>Priority phone support · 30-second avg pickup</span>
                </li>
                <li>
                  <i className="fa-solid fa-user-group"></i>
                  <span>6 coaching credits with senior coaches</span>
                </li>
                <li>
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Money-back guarantee on first attempt</span>
                </li>
                <li>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>AI scenario coach + adaptive flashcards (Gold-only)</span>
                </li>
              </ul>
            </div>

            <div className="md-upgrade-cost">
              <div>
                <small>Upgrade cost</small>
                <strong>₹8,000</strong>
                <em>one-time top-up</em>
              </div>
              <div className="md-upgrade-pro">
                <i className="fa-solid fa-circle-check"></i>
                Pro-rated — credit for the unused portion of Silver
              </div>
            </div>

            <small className="md-fine">
              <i className="fa-solid fa-circle-info"></i>
              You can keep using Silver — the rest of your course is unchanged.
              Want to ask a question first? Use email or live chat (both
              available on Silver).
            </small>

            <footer>
              <button type="button" className="md-secondary">
                <i className="fa-regular fa-envelope"></i> Use email instead
              </button>
              <button type="button" className="md-primary gold">
                <i className="fa-solid fa-crown"></i> Upgrade to Gold
              </button>
            </footer>
          </div>
        </div>
      </section>

      <section className="md-footer">
        <article>
          <strong>Where these modals fire</strong>
          <ul>
            <li>
              <strong>Reschedule modal</strong> — Cancel/Reschedule CTA on any
              live session inside the 24h cutoff, on both the schedule list and
              session-detail page.
            </li>
            <li>
              <strong>Coaching cancel-forfeit modal</strong> — Cancel CTA on a
              coaching booking inside the 12h cutoff. Outside the cutoff, the
              cancel goes through silently with no credit burn.
            </li>
            <li>
              <strong>Tier-mismatch lock modal</strong> — Click on any locked
              tile or Gold-only action when the learner is on Silver/Bronze.
              Reuses the locked-tile component's Upgrade CTA.
            </li>
          </ul>
        </article>
      </section>
    </LmsFrame>
  );
}
