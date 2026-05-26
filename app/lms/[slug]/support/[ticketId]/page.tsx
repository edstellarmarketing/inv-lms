import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Channel = "email" | "chat" | "phone";
type MsgKind = "learner" | "agent" | "system";
type AttachKind = "image" | "pdf" | "doc" | "log";

type Attachment = {
  name: string;
  size: string;
  kind: AttachKind;
};

type Message =
  | {
      kind: "learner";
      id: string;
      at: string;
      ago: string;
      body: string;
      attachments?: Attachment[];
      via?: Channel;
    }
  | {
      kind: "agent";
      id: string;
      at: string;
      ago: string;
      authorName: string;
      authorInitials: string;
      authorTone: "blue" | "purple" | "green" | "orange" | "pink" | "teal";
      authorRole: string;
      body: string;
      attachments?: Attachment[];
      via?: Channel;
    }
  | {
      kind: "system";
      id: string;
      at: string;
      ago: string;
      icon: string;
      tone: string;
      text: string;
    };

const ticket = {
  id: "TCK-4821",
  subject: "Voucher code shows expired even though I haven't redeemed it",
  category: { label: "Exam booking", icon: "fa-solid fa-calendar-check", tone: "purple" },
  channel: "chat" as Channel,
  status: { label: "In progress", tone: "purple", icon: "fa-solid fa-spinner" },
  priority: "High" as const,
  openedAt: "Today · 14:08 IST",
  openedAgo: "3h 5m ago",
  lastReplyAt: "Today · 16:42 IST",
  awardingBody: "PeopleCert",
};

const learnerTier = "Gold";
const isPhoneOnline = true;

const channelMeta: Record<Channel, { label: string; icon: string; tone: string }> = {
  email: { label: "Email", icon: "fa-regular fa-envelope", tone: "blue" },
  chat: { label: "Live Chat", icon: "fa-regular fa-comment", tone: "purple" },
  phone: { label: "Phone", icon: "fa-solid fa-phone", tone: "pink" },
};

const agent = {
  name: "Tanvi Murthy",
  initials: "TM",
  tone: "purple" as const,
  role: "Support Specialist · Exam booking",
  responseAvg: "12 min",
};

const messages: Message[] = [
  {
    kind: "learner",
    id: "m1",
    at: "Today · 14:08",
    ago: "3h 5m ago",
    via: "email",
    body: "Hi team — my voucher code KZ-PMP-2026-X9F2A shows as 'expired' when I click Redeem on the dashboard. I haven't redeemed it yet and the validity window says it's good until 30 Aug 2026. Screenshot attached. Can you check what's going on? My exam is in 3 weeks and I need to book the slot.",
    attachments: [
      { name: "voucher-error-screenshot.png", size: "412 KB", kind: "image" },
      { name: "dashboard-state.png", size: "286 KB", kind: "image" },
    ],
  },
  {
    kind: "system",
    id: "s1",
    at: "Today · 14:12",
    ago: "3h ago",
    icon: "fa-solid fa-user-tag",
    tone: "blue",
    text: "Ticket assigned to Tanvi Murthy (Exam booking specialist)",
  },
  {
    kind: "agent",
    id: "m2",
    at: "Today · 14:24",
    ago: "2h 49m ago",
    authorName: agent.name,
    authorInitials: agent.initials,
    authorTone: agent.tone,
    authorRole: agent.role,
    via: "chat",
    body: "Hi! Tanvi here — I can see the voucher on my end and the validity is fine through 30 Aug. The 'expired' state you're seeing looks like a stale cache from the PeopleCert side. Let me pull the raw record from their portal and confirm. Two quick things from you:\n\n1. Can you confirm the email you registered with on PeopleCert (same as the LMS or different)?\n2. The exact time you saw the error — to help me grep their logs.",
  },
  {
    kind: "learner",
    id: "m3",
    at: "Today · 14:31",
    ago: "2h 42m ago",
    via: "chat",
    body: "Same email — vijay@edstellar.com. I clicked Redeem at 14:06 IST and the error appeared immediately. Tried again at 14:09 with the same result. Have not tried since.",
  },
  {
    kind: "system",
    id: "s2",
    at: "Today · 14:38",
    ago: "2h 35m ago",
    icon: "fa-solid fa-arrow-up-right-from-square",
    tone: "amber",
    text: "Escalated to PeopleCert — case ID PC-2026-44781 opened",
  },
  {
    kind: "agent",
    id: "m4",
    at: "Today · 15:20",
    ago: "1h 53m ago",
    authorName: agent.name,
    authorInitials: agent.initials,
    authorTone: agent.tone,
    authorRole: agent.role,
    via: "chat",
    body: "PeopleCert confirmed — your voucher record has a flag set incorrectly from a batch update they ran at 13:45 IST. They're reissuing the code. New code arrives in your registered email within 18-24h. I'll watch for it on this end and confirm the moment it lands.\n\nNothing you need to do right now. Your exam window isn't impacted — you can still book within validity even after the reissue.",
    attachments: [
      { name: "peoplecert-case-confirmation.pdf", size: "94 KB", kind: "pdf" },
    ],
  },
  {
    kind: "agent",
    id: "m5",
    at: "Today · 16:42",
    ago: "23 min ago",
    authorName: agent.name,
    authorInitials: agent.initials,
    authorTone: agent.tone,
    authorRole: agent.role,
    via: "chat",
    body: "Thanks for the screenshots — escalated to PeopleCert. I'll have a confirmed reissue by tomorrow 10am IST. Stay on this thread; I'll ping the moment it's done. Also — since this is blocking your booking, I've moved this to High priority so it gets first-touch tomorrow morning regardless of who's on duty.",
  },
];

const relatedTickets = [
  { id: "TCK-4612", subject: "Recording for Wed 7 May Q&A wasn't uploaded", status: "Resolved" },
  { id: "TCK-4688", subject: "Receipt for 18,499 charge on 12 May — invoice mismatch", status: "Resolved" },
];

const attachIcon: Record<AttachKind, { icon: string; tone: string }> = {
  image: { icon: "fa-regular fa-image", tone: "blue" },
  pdf: { icon: "fa-solid fa-file-pdf", tone: "pink" },
  doc: { icon: "fa-regular fa-file-lines", tone: "purple" },
  log: { icon: "fa-solid fa-code", tone: "teal" },
};

function ChannelTag({ ch }: { ch: Channel }) {
  const m = channelMeta[ch];
  return (
    <span className={`tk-ch-mini ${m.tone}`}>
      <i className={m.icon}></i> via {m.label}
    </span>
  );
}

function AttachmentList({ list }: { list: Attachment[] }) {
  return (
    <ul className="tk-attach">
      {list.map((a) => {
        const m = attachIcon[a.kind];
        return (
          <li key={a.name}>
            <span className={`tk-attach-ic ${m.tone}`}>
              <i className={m.icon}></i>
            </span>
            <div>
              <strong>{a.name}</strong>
              <small>{a.size}</small>
            </div>
            <button type="button" className="tk-attach-dl" aria-label={`Download ${a.name}`}>
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function TicketThreadPage() {
  const canCallNow = learnerTier === "Gold" && isPhoneOnline;

  return (
    <LmsFrame
      active="Messages"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Support inbox", href: "/lms/pmp/support" },
        { label: ticket.id },
      ]}
      title={ticket.subject}
      subtitle={
        `${ticket.id} · Opened ${ticket.openedAt} (${ticket.openedAgo}) · Assigned to ${agent.name}`
      }
      right={
        <div className="tk-head-actions">
          {canCallNow && (
            <button type="button" className="tk-call-now">
              <i className="fa-solid fa-phone"></i>
              <span>
                <strong>Call us now</strong>
                <small>Avg pickup &lt; 30 sec · Gold</small>
              </span>
            </button>
          )}
          <button type="button" className="tk-icon-btn" aria-label="More actions">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      }
    >
      {/* Status strip */}
      <section className="tk-status-strip">
        <div className="tk-status-meta">
          <span className={`tk-status ${ticket.status.tone}`}>
            <i className={ticket.status.icon}></i> {ticket.status.label}
          </span>
          <span className={`tk-cat ${ticket.category.tone}`}>
            <i className={ticket.category.icon}></i> {ticket.category.label}
          </span>
          <span className={`tk-channel ${channelMeta[ticket.channel].tone}`}>
            <i className={channelMeta[ticket.channel].icon}></i>{" "}
            {channelMeta[ticket.channel].label}
          </span>
          <span className="tk-prio">
            <i className="fa-solid fa-bolt"></i> {ticket.priority}
          </span>
        </div>
        <div className="tk-status-actions">
          <button type="button" className="tk-secondary">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Switch channel
          </button>
          <button type="button" className="tk-secondary">
            <i className="fa-regular fa-circle-check"></i> Mark resolved
          </button>
          <button type="button" className="tk-secondary danger">
            <i className="fa-solid fa-circle-xmark"></i> Close ticket
          </button>
        </div>
      </section>

      {/* Two-col: thread + side panel */}
      <section className="tk-twocol">
        <article className="tk-thread">
          {/* Subject preamble */}
          <header className="tk-thread-head">
            <h3>
              <i className="fa-solid fa-thread"></i> Conversation
            </h3>
            <small>
              {messages.filter((m) => m.kind !== "system").length} messages ·
              last reply <strong>{ticket.lastReplyAt}</strong>
            </small>
          </header>

          {/* Messages */}
          <ol className="tk-msgs">
            {messages.map((m) => {
              if (m.kind === "system") {
                return (
                  <li key={m.id} className="tk-sys">
                    <span className={`tk-sys-ic ${m.tone}`}>
                      <i className={m.icon}></i>
                    </span>
                    <p>
                      {m.text}
                      <small>· {m.ago}</small>
                    </p>
                  </li>
                );
              }
              const isLearner = m.kind === "learner";
              return (
                <li key={m.id} className={`tk-msg ${isLearner ? "from-you" : "from-agent"}`}>
                  <div className="tk-msg-avatar">
                    {isLearner ? (
                      <span className="tk-avatar you">You</span>
                    ) : (
                      <span className={`tk-avatar ${m.authorTone}`}>{m.authorInitials}</span>
                    )}
                  </div>
                  <div className="tk-msg-body">
                    <header>
                      <strong>{isLearner ? "You" : m.authorName}</strong>
                      {!isLearner && <small>{(m as { authorRole: string }).authorRole}</small>}
                      {m.via && <ChannelTag ch={m.via} />}
                      <span className="tk-msg-time">{m.at} · {m.ago}</span>
                    </header>
                    <div className="tk-msg-text">
                      {m.body.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    {m.attachments && m.attachments.length > 0 && (
                      <AttachmentList list={m.attachments} />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Reply composer */}
          <div className="tk-reply">
            <div className="tk-reply-tabs">
              <button className="tk-reply-tab active" type="button">
                <i className="fa-regular fa-comment"></i> Reply
              </button>
              <button className="tk-reply-tab" type="button">
                <i className="fa-solid fa-lock"></i> Internal note
              </button>
            </div>
            <textarea
              className="tk-reply-input"
              rows={4}
              placeholder="Type your reply… Tanvi typically responds within 12 min."
            />
            <div className="tk-reply-foot">
              <div className="tk-reply-tools">
                <button type="button" aria-label="Attach file">
                  <i className="fa-solid fa-paperclip"></i>
                </button>
                <button type="button" aria-label="Emoji">
                  <i className="fa-regular fa-face-smile"></i>
                </button>
                <button type="button" aria-label="Quick reply templates">
                  <i className="fa-solid fa-bolt"></i> Templates
                </button>
              </div>
              <div className="tk-reply-send">
                <label className="tk-reply-resolve">
                  <input type="checkbox" />
                  Mark resolved on send
                </label>
                <button type="button" className="tk-send">
                  <i className="fa-solid fa-paper-plane"></i> Send reply
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Side panel */}
        <aside className="tk-side">
          {/* Assigned agent */}
          <article className="tk-side-card">
            <h4>Your support agent</h4>
            <div className="tk-agent">
              <span className={`tk-avatar ${agent.tone}`} style={{ width: 48, height: 48, fontSize: 15 }}>
                {agent.initials}
              </span>
              <div>
                <strong>{agent.name}</strong>
                <small>{agent.role}</small>
                <small className="tk-agent-meta">
                  <i className="fa-regular fa-clock"></i> Avg response {agent.responseAvg}
                </small>
              </div>
            </div>
          </article>

          {/* Ticket details */}
          <article className="tk-side-card">
            <h4>Ticket details</h4>
            <dl className="tk-meta">
              <div>
                <dt>Ticket ID</dt>
                <dd className="mono">{ticket.id}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{ticket.category.label}</dd>
              </div>
              <div>
                <dt>Channel</dt>
                <dd>{channelMeta[ticket.channel].label}</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>
                  <span className="tk-prio mini">
                    <i className="fa-solid fa-bolt"></i> High
                  </span>
                </dd>
              </div>
              <div>
                <dt>Opened</dt>
                <dd>{ticket.openedAt}</dd>
              </div>
              <div>
                <dt>Last reply</dt>
                <dd>{ticket.lastReplyAt}</dd>
              </div>
              <div>
                <dt>External case</dt>
                <dd>{ticket.awardingBody} · PC-2026-44781</dd>
              </div>
            </dl>
          </article>

          {/* Phone availability — Gold */}
          <article className={`tk-side-card tk-phone ${canCallNow ? "online" : ""}`}>
            <header>
              <h4>Phone support</h4>
              <span className="pill pill-gold">
                <i className="fa-solid fa-crown"></i> Gold
              </span>
            </header>
            {canCallNow ? (
              <>
                <p className="tk-phone-state online">
                  <span className="tk-phone-dot" /> Online now · avg pickup &lt; 30 sec
                </p>
                <button type="button" className="tk-phone-cta">
                  <i className="fa-solid fa-phone"></i> Call us now
                </button>
                <small>
                  Calling will keep this ticket open — your conversation gets attached as a transcript when the call ends.
                </small>
              </>
            ) : (
              <>
                <p className="tk-phone-state offline">
                  <span className="tk-phone-dot offline" /> Offline · opens at 09:00 IST
                </p>
                <button type="button" className="tk-phone-cta disabled" disabled>
                  <i className="fa-solid fa-phone-slash"></i> Call us now
                </button>
              </>
            )}
          </article>

          {/* Related */}
          <article className="tk-side-card">
            <h4>Related tickets</h4>
            <ul className="tk-related">
              {relatedTickets.map((r) => (
                <li key={r.id}>
                  <Link href={`/lms/pmp/support/${r.id}`}>
                    <small className="mono">{r.id}</small>
                    <strong>{r.subject}</strong>
                    <small className="tk-related-status">{r.status}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
