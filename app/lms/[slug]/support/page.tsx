import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type Channel = "email" | "chat" | "phone";
type TicketStatus = "open" | "waiting-you" | "in-progress" | "resolved";
type Category = "billing" | "content" | "tech" | "exam" | "account" | "feedback";

type Ticket = {
  id: string;
  subject: string;
  category: Category;
  channel: Channel;
  status: TicketStatus;
  lastReplyAuthor: string;
  lastReplySnippet: string;
  lastReplyAt: string;
  lastReplyAgo: string;
  agentName?: string;
  agentInitials?: string;
  agentTone?: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
  unread?: boolean;
  priority?: "normal" | "high";
};

const learnerTier = "Gold";
const channels: Record<Channel, { label: string; icon: string; tone: string; available: boolean; sla: string }> = {
  email: { label: "Email", icon: "fa-regular fa-envelope", tone: "blue", available: true, sla: "Reply within 24h" },
  chat: { label: "Live Chat", icon: "fa-regular fa-comment", tone: "purple", available: true, sla: "Reply within 5 min · 09:00–22:00 IST" },
  phone: { label: "Phone (priority)", icon: "fa-solid fa-phone", tone: "pink", available: learnerTier === "Gold", sla: "Call back within 30 min · 09:00–22:00 IST" },
};

const categoryMeta: Record<Category, { label: string; icon: string; tone: string }> = {
  billing: { label: "Billing", icon: "fa-solid fa-receipt", tone: "orange" },
  content: { label: "Content", icon: "fa-solid fa-book-open-reader", tone: "blue" },
  tech: { label: "Tech / Access", icon: "fa-solid fa-gears", tone: "teal" },
  exam: { label: "Exam booking", icon: "fa-solid fa-calendar-check", tone: "purple" },
  account: { label: "Account", icon: "fa-solid fa-user-shield", tone: "pink" },
  feedback: { label: "Feedback", icon: "fa-solid fa-lightbulb", tone: "green" },
};

const statusMeta: Record<TicketStatus, { label: string; tone: string; icon: string }> = {
  open: { label: "Open", tone: "blue", icon: "fa-regular fa-circle-dot" },
  "waiting-you": { label: "Waiting on you", tone: "amber", icon: "fa-solid fa-circle-exclamation" },
  "in-progress": { label: "In progress", tone: "purple", icon: "fa-solid fa-spinner" },
  resolved: { label: "Resolved", tone: "green", icon: "fa-solid fa-circle-check" },
};

const stats = {
  open: 2,
  waitingYou: 1,
  resolvedThisMonth: 6,
  avgFirstReply: "1h 12m",
};

const tickets: Ticket[] = [
  {
    id: "TCK-4821",
    subject: "Voucher code shows expired even though I haven't redeemed it",
    category: "exam",
    channel: "chat",
    status: "in-progress",
    lastReplyAuthor: "Tanvi M.",
    lastReplySnippet:
      "Thanks for the screenshot — escalated to PeopleCert. I'll have a confirmed reissue by tomorrow 10am IST.",
    lastReplyAt: "Today · 16:42",
    lastReplyAgo: "23 min ago",
    agentName: "Tanvi Murthy",
    agentInitials: "TM",
    agentTone: "purple",
    unread: true,
    priority: "high",
  },
  {
    id: "TCK-4798",
    subject: "Mock exam 3 — Q47 explanation seems wrong (option B is correct, not C)",
    category: "content",
    channel: "email",
    status: "waiting-you",
    lastReplyAuthor: "Sahil Verma",
    lastReplySnippet:
      "Good catch — we've flagged this for content review. Could you share which version of PMBOK you're referencing?",
    lastReplyAt: "Today · 11:18",
    lastReplyAgo: "5h ago",
    agentName: "Sahil Verma",
    agentInitials: "SV",
    agentTone: "green",
    priority: "normal",
  },
  {
    id: "TCK-4775",
    subject: "Can I pause my course for 3 weeks (planned medical leave)",
    category: "account",
    channel: "email",
    status: "open",
    lastReplyAuthor: "You",
    lastReplySnippet:
      "Hi team — I have surgery scheduled on June 10. I'd like to pause access between June 8–28 and extend my exam window accordingly.",
    lastReplyAt: "Yesterday · 21:04",
    lastReplyAgo: "1d ago",
  },
  {
    id: "TCK-4701",
    subject: "Login loops back to /auth/login after entering password",
    category: "tech",
    channel: "chat",
    status: "resolved",
    lastReplyAuthor: "Aman Khanna",
    lastReplySnippet:
      "Cleared on your account — was a stale session token. Closing this; please reopen if it happens again.",
    lastReplyAt: "21 May · 14:20",
    lastReplyAgo: "4d ago",
    agentName: "Aman Khanna",
    agentInitials: "AK",
    agentTone: "blue",
  },
  {
    id: "TCK-4688",
    subject: "Receipt for 18,499 charge on 12 May — invoice mismatch",
    category: "billing",
    channel: "email",
    status: "resolved",
    lastReplyAuthor: "Neha Pillai",
    lastReplySnippet:
      "Updated invoice with GSTIN sent to your registered email. Refund of ₹450 (over-charge) processed — appears in 5–7 days.",
    lastReplyAt: "18 May · 09:50",
    lastReplyAgo: "7d ago",
    agentName: "Neha Pillai",
    agentInitials: "NP",
    agentTone: "orange",
  },
  {
    id: "TCK-4612",
    subject: "Recording for Wed 7 May Q&A wasn't uploaded",
    category: "content",
    channel: "email",
    status: "resolved",
    lastReplyAuthor: "Priya Iyer",
    lastReplySnippet:
      "Recording is now uploaded — apologies for the delay. Link: /lms/pmp/live-training/qa-07-5",
    lastReplyAt: "9 May · 18:00",
    lastReplyAgo: "16d ago",
    agentName: "Priya Iyer",
    agentInitials: "PI",
    agentTone: "purple",
  },
];

function ChannelBadge({ ch }: { ch: Channel }) {
  const m = channels[ch];
  return (
    <span className={`sp-ch ${m.tone}${!m.available ? " locked" : ""}`} title={m.sla}>
      <i className={m.icon}></i> {m.label}
    </span>
  );
}

function CategoryChip({ cat }: { cat: Category }) {
  const m = categoryMeta[cat];
  return (
    <span className={`sp-cat ${m.tone}`}>
      <i className={m.icon}></i> {m.label}
    </span>
  );
}

function StatusPill({ status }: { status: TicketStatus }) {
  const m = statusMeta[status];
  return (
    <span className={`sp-status ${m.tone}`}>
      <i className={m.icon}></i> {m.label}
    </span>
  );
}

export default function SupportInboxPage() {
  return (
    <LmsFrame
      active="Messages"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Support inbox" },
      ]}
      title="🛟 Support inbox"
      subtitle="Tickets, replies, and the support channels available on your tier."
      right={
        <div className="sp-channels-strip">
          <small>Your channels</small>
          <div className="sp-ch-row">
            <ChannelBadge ch="email" />
            <ChannelBadge ch="chat" />
            <ChannelBadge ch="phone" />
          </div>
        </div>
      }
    >
      {/* Stats strip */}
      <section className="sp-stats">
        <article className="sp-stat blue">
          <small>Open</small>
          <strong>{stats.open}</strong>
          <span>active tickets</span>
        </article>
        <article className="sp-stat amber">
          <small>Waiting on you</small>
          <strong>{stats.waitingYou}</strong>
          <span>needs a reply</span>
        </article>
        <article className="sp-stat green">
          <small>Resolved</small>
          <strong>{stats.resolvedThisMonth}</strong>
          <span>this month</span>
        </article>
        <article className="sp-stat teal">
          <small>Avg first reply</small>
          <strong>{stats.avgFirstReply}</strong>
          <span>across your tickets</span>
        </article>
      </section>

      {/* Two-col: ticket list + composer/SLA aside */}
      <section className="sp-twocol">
        <div className="sp-main">
          {/* Toolbar */}
          <div className="sp-toolbar">
            <div className="sp-tabs">
              <button className="sp-tab active" type="button">
                All
                <span className="sp-tab-count">{tickets.length}</span>
              </button>
              <button className="sp-tab" type="button">
                Open
                <span className="sp-tab-count">{stats.open}</span>
              </button>
              <button className="sp-tab" type="button">
                Waiting on you
                <span className="sp-tab-count amber">{stats.waitingYou}</span>
              </button>
              <button className="sp-tab" type="button">
                Resolved
                <span className="sp-tab-count">{stats.resolvedThisMonth}</span>
              </button>
            </div>
            <div className="sp-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="Search tickets — subject, ticket ID, content…"
                aria-label="Search tickets"
              />
            </div>
          </div>

          {/* Ticket rows */}
          <ul className="sp-list">
            {tickets.map((t) => {
              const cat = categoryMeta[t.category];
              return (
                <li key={t.id}>
                  <Link href={`/lms/pmp/support/${t.id}`} className={`sp-row ${t.unread ? "unread" : ""}`}>
                    <div className="sp-row-left">
                      {t.agentInitials ? (
                        <span className={`sp-avatar ${t.agentTone ?? "blue"}`}>
                          {t.agentInitials}
                        </span>
                      ) : (
                        <span className="sp-avatar you">You</span>
                      )}
                    </div>
                    <div className="sp-row-mid">
                      <div className="sp-row-meta">
                        <CategoryChip cat={t.category} />
                        <StatusPill status={t.status} />
                        <ChannelBadge ch={t.channel} />
                        {t.priority === "high" && (
                          <span className="sp-prio">
                            <i className="fa-solid fa-bolt"></i> High
                          </span>
                        )}
                      </div>
                      <strong className="sp-row-subject">
                        {t.unread && <span className="sp-dot" aria-label="unread" />}
                        {t.subject}
                      </strong>
                      <p className="sp-row-snippet">
                        <span className="sp-row-author">{t.lastReplyAuthor}:</span>{" "}
                        {t.lastReplySnippet}
                      </p>
                    </div>
                    <div className="sp-row-right">
                      <small className="sp-row-id">{t.id}</small>
                      <small className="sp-row-ago">{t.lastReplyAgo}</small>
                      <small className="sp-row-time">{t.lastReplyAt}</small>
                      <i className="fa-solid fa-arrow-right sp-row-go"></i>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Aside — composer + SLA */}
        <aside className="sp-aside">
          <article className="sp-composer">
            <header>
              <h3>Start a new ticket</h3>
              <small>Pick the right channel — we route to a specialist by category.</small>
            </header>
            <label className="sp-field">
              <span>Subject</span>
              <input type="text" placeholder="One-line summary of your issue" />
            </label>
            <label className="sp-field">
              <span>Category</span>
              <select defaultValue="billing">
                {(Object.keys(categoryMeta) as Category[]).map((k) => (
                  <option key={k} value={k}>
                    {categoryMeta[k].label}
                  </option>
                ))}
              </select>
            </label>
            <div className="sp-field">
              <span>Preferred channel</span>
              <div className="sp-ch-pick">
                {(Object.keys(channels) as Channel[]).map((c) => {
                  const m = channels[c];
                  return (
                    <button
                      key={c}
                      type="button"
                      className={`sp-ch-opt ${m.tone}${!m.available ? " locked" : ""}${c === "chat" ? " active" : ""}`}
                      aria-disabled={!m.available}
                      disabled={!m.available}
                    >
                      <span className="sp-ch-opt-top">
                        <i className={m.icon}></i> {m.label}
                        {!m.available && <i className="fa-solid fa-lock"></i>}
                      </span>
                      <small>{m.sla}</small>
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="sp-field">
              <span>Message</span>
              <textarea
                rows={5}
                placeholder="Share context, steps to reproduce, screenshot links…"
              />
            </label>
            <div className="sp-attach">
              <button type="button" className="sp-attach-btn">
                <i className="fa-solid fa-paperclip"></i> Attach file
              </button>
              <small>Up to 4 files · 10 MB each · PNG, JPG, PDF</small>
            </div>
            <button type="button" className="sp-send">
              <i className="fa-solid fa-paper-plane"></i> Send ticket
            </button>
          </article>

          <article className="sp-sla">
            <header>
              <h4>Your support channels</h4>
              <span className="pill pill-gold">
                <i className="fa-solid fa-crown"></i> Gold
              </span>
            </header>
            <ul>
              {(Object.keys(channels) as Channel[]).map((c) => {
                const m = channels[c];
                return (
                  <li key={c} className={!m.available ? "locked" : ""}>
                    <span className={`sp-sla-icon ${m.tone}`}>
                      <i className={m.icon}></i>
                    </span>
                    <div>
                      <strong>
                        {m.label}
                        {!m.available && (
                          <span className="sp-sla-lock">
                            <i className="fa-solid fa-lock"></i> Upgrade
                          </span>
                        )}
                      </strong>
                      <small>{m.sla}</small>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="sp-sla-foot">
              <i className="fa-solid fa-headset"></i>
              <span>
                Phone is available <strong>09:00–22:00 IST</strong> — outside that window, drop a chat or email.
              </span>
            </div>
          </article>

          <article className="sp-self">
            <header>
              <h4>Before you raise a ticket</h4>
              <small>Common quick wins:</small>
            </header>
            <ul>
              <li>
                <i className="fa-solid fa-circle-question"></i>
                <Link href="#">How to redeem your voucher</Link>
              </li>
              <li>
                <i className="fa-solid fa-circle-question"></i>
                <Link href="#">Reset your exam target date</Link>
              </li>
              <li>
                <i className="fa-solid fa-circle-question"></i>
                <Link href="#">Switch between enrollments</Link>
              </li>
              <li>
                <i className="fa-solid fa-circle-question"></i>
                <Link href="#">Download your invoice / GSTIN receipt</Link>
              </li>
            </ul>
            <Link href="#" className="sp-self-more">
              Browse all help articles <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
