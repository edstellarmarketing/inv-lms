import Link from "next/link";
import LmsFrame from "../../components/LmsFrame";

type ChannelTone = "blue" | "purple" | "green" | "orange" | "pink" | "teal";

type Channel = {
  name: string;
  desc: string;
  members: number;
  unread: number;
  tone: ChannelTone;
  icon: string;
};

const stats = {
  members: 12480,
  weeklyPosts: 312,
  channels: 14,
  countriesRepresented: 38,
};

const channels: Channel[] = [
  {
    name: "#general",
    desc: "Cohort-wide chat. Introductions, milestones, daily wins.",
    members: 12480,
    unread: 24,
    tone: "blue",
    icon: "fa-solid fa-hashtag",
  },
  {
    name: "#exam-stories",
    desc: "First-hand exam day debriefs — pass and fail, both welcome.",
    members: 6420,
    unread: 12,
    tone: "purple",
    icon: "fa-solid fa-comments",
  },
  {
    name: "#process-domain",
    desc: "Discuss tricky Process scenarios, EVM traps, schedule mgmt.",
    members: 4180,
    unread: 7,
    tone: "orange",
    icon: "fa-solid fa-diagram-project",
  },
  {
    name: "#people-domain",
    desc: "Conflict, leadership, virtual teams, stakeholder engagement.",
    members: 3950,
    unread: 5,
    tone: "pink",
    icon: "fa-solid fa-users",
  },
  {
    name: "#agile-hybrid",
    desc: "Agile, hybrid tailoring, framework selection deep-dives.",
    members: 3210,
    unread: 9,
    tone: "green",
    icon: "fa-solid fa-arrows-rotate",
  },
  {
    name: "#study-groups",
    desc: "Find or start a study group by timezone and exam date.",
    members: 2180,
    unread: 0,
    tone: "teal",
    icon: "fa-solid fa-user-group",
  },
];

type Rule = {
  num: number;
  title: string;
  body: string;
  bad?: string;
  good?: string;
};

const codeOfConduct: Rule[] = [
  {
    num: 1,
    title: "Be kind and constructive",
    body: "Treat every member like a colleague at work. Disagreement is fine; personal attacks are not.",
    bad: "“This is a dumb question, read the book.”",
    good: "“Try chapter 3 of the PMBOK study guide — it covers exactly this in 5 pages.”",
  },
  {
    num: 2,
    title: "No sharing exam content",
    body: "Do not post live exam questions, leaked answers, or screenshots from the awarding-body portal. Doing so risks your certification and the community itself.",
    bad: "“I saw this exact question in my exam today, here's the wording…”",
    good: "“This concept came up several times in different framings — focus on EVM application, not memorising.”",
  },
  {
    num: 3,
    title: "Mark recordings and recommendations clearly",
    body: "When sharing notes, recordings, or external resources, label whether you've verified them and which PMBOK edition they map to.",
  },
  {
    num: 4,
    title: "Keep promotions out",
    body: "No self-promotion, recruitment, or affiliate links in main channels. We have a dedicated #marketplace for that — moderated.",
  },
  {
    num: 5,
    title: "Use spoiler tags for mock answers",
    body: "If you're discussing a specific mock question someone might not have attempted yet, wrap the answer in spoiler tags so they can choose to reveal.",
  },
  {
    num: 6,
    title: "Report instead of escalating",
    body: "If a thread breaks the rules, use the report flow. Moderators read every report within 4 hours during business hours.",
  },
];

type Discussion = {
  title: string;
  channel: string;
  channelTone: ChannelTone;
  authorName: string;
  authorInitials: string;
  authorTone: ChannelTone;
  replies: number;
  reactions: number;
  ago: string;
  isPinned?: boolean;
};

const featuredDiscussions: Discussion[] = [
  {
    title: "What I wish I knew before my first mock — 5 lessons",
    channel: "#exam-stories",
    channelTone: "purple",
    authorName: "Meera Sharma",
    authorInitials: "MS",
    authorTone: "pink",
    replies: 84,
    reactions: 312,
    ago: "2h ago",
    isPinned: true,
  },
  {
    title: "Cleared PMP today, AT/AT/T — happy to answer any questions",
    channel: "#exam-stories",
    channelTone: "purple",
    authorName: "Arjun Krishnan",
    authorInitials: "AK",
    authorTone: "blue",
    replies: 142,
    reactions: 540,
    ago: "5h ago",
  },
  {
    title: "EVM formula for negative CV — the trap I kept falling into",
    channel: "#process-domain",
    channelTone: "orange",
    authorName: "Saurabh Pillai",
    authorInitials: "SP",
    authorTone: "orange",
    replies: 28,
    reactions: 96,
    ago: "Yesterday",
  },
  {
    title: "Study group forming — IST evenings, exam date June 18",
    channel: "#study-groups",
    channelTone: "teal",
    authorName: "Aisha Reddy",
    authorInitials: "AR",
    authorTone: "green",
    replies: 11,
    reactions: 34,
    ago: "Yesterday",
  },
];

type Contributor = {
  name: string;
  initials: string;
  tone: ChannelTone;
  title: string;
  posts: number;
  helpful: number;
  isMod?: boolean;
};

const contributors: Contributor[] = [
  { name: "Priya Iyer", initials: "PI", tone: "purple", title: "Lead Instructor · Moderator", posts: 1240, helpful: 4180, isMod: true },
  { name: "Rohan Mehta", initials: "RM", tone: "blue", title: "Senior Coach · Moderator", posts: 980, helpful: 3120, isMod: true },
  { name: "Meera Sharma", initials: "MS", tone: "pink", title: "PMP®-certified · Class of '25", posts: 612, helpful: 1840 },
  { name: "Arjun Krishnan", initials: "AK", tone: "blue", title: "PMP®-certified · Class of '26", posts: 478, helpful: 1520 },
  { name: "Saurabh Pillai", initials: "SP", tone: "orange", title: "Active learner · 87% mock", posts: 264, helpful: 810 },
];

const isMember = false;

export default function CommunityPage() {
  return (
    <LmsFrame
      active="Discussions"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "Community" },
      ]}
      title="🌐 The Invensis PMP® Community"
      subtitle="A peer space for active learners and alumni — 12,480 members across 38 countries, all preparing for or supporting the same exam."
      right={
        isMember ? (
          <Link href="#" className="cm-status-pill member">
            <i className="fa-solid fa-circle-check"></i> You're a member
          </Link>
        ) : (
          <span className="cm-status-pill not-member">
            <i className="fa-solid fa-circle"></i> Not joined yet
          </span>
        )
      }
    >
      {/* Hero stats */}
      <section className="cm-hero">
        <article className="cm-hero-stat blue">
          <i className="fa-solid fa-users"></i>
          <div>
            <strong>{stats.members.toLocaleString()}</strong>
            <small>active members</small>
          </div>
        </article>
        <article className="cm-hero-stat purple">
          <i className="fa-solid fa-comments"></i>
          <div>
            <strong>{stats.weeklyPosts}</strong>
            <small>posts this week</small>
          </div>
        </article>
        <article className="cm-hero-stat green">
          <i className="fa-solid fa-hashtag"></i>
          <div>
            <strong>{stats.channels}</strong>
            <small>focused channels</small>
          </div>
        </article>
        <article className="cm-hero-stat orange">
          <i className="fa-solid fa-globe"></i>
          <div>
            <strong>{stats.countriesRepresented}</strong>
            <small>countries</small>
          </div>
        </article>
      </section>

      {/* Two-col: main content + join CTA */}
      <section className="cm-twocol">
        <div className="cm-main">
          {/* What you'll get */}
          <article className="cm-card">
            <header className="cm-section-head">
              <div>
                <h3>What you'll get when you join</h3>
                <small>The community is most useful in the 6 weeks leading up to your exam.</small>
              </div>
            </header>
            <div className="cm-perks">
              <div className="cm-perk">
                <span className="cm-perk-ic blue">
                  <i className="fa-solid fa-circle-question"></i>
                </span>
                <strong>Real-time Q&amp;A</strong>
                <small>Get a peer answer to your stuck point in minutes, not days.</small>
              </div>
              <div className="cm-perk">
                <span className="cm-perk-ic purple">
                  <i className="fa-solid fa-clipboard-check"></i>
                </span>
                <strong>Exam debriefs</strong>
                <small>Read first-hand pass and fail stories — what worked, what didn't.</small>
              </div>
              <div className="cm-perk">
                <span className="cm-perk-ic green">
                  <i className="fa-solid fa-user-group"></i>
                </span>
                <strong>Study buddies</strong>
                <small>Find a study group by timezone, exam date, and weak topic.</small>
              </div>
              <div className="cm-perk">
                <span className="cm-perk-ic orange">
                  <i className="fa-solid fa-medal"></i>
                </span>
                <strong>Alumni access</strong>
                <small>Post-exam, your access stays for life — pay it forward to the next cohort.</small>
              </div>
            </div>
          </article>

          {/* Channels you'll have access to */}
          <article className="cm-card">
            <header className="cm-section-head">
              <div>
                <h3>Channels you'll have access to</h3>
                <small>Pick the channels you want notifications for after you join.</small>
              </div>
              <Link href="#" className="cm-inline">
                See all {stats.channels} channels <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </header>
            <ul className="cm-channels">
              {channels.map((c) => (
                <li key={c.name}>
                  <span className={`cm-channel-ic ${c.tone}`}>
                    <i className={c.icon}></i>
                  </span>
                  <div className="cm-channel-meta">
                    <strong>{c.name}</strong>
                    <small>{c.desc}</small>
                  </div>
                  <div className="cm-channel-side">
                    <span className="cm-channel-count">{c.members.toLocaleString()} members</span>
                    {c.unread > 0 && (
                      <span className="cm-channel-unread">{c.unread} new today</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Code of conduct */}
          <article className="cm-card">
            <header className="cm-section-head">
              <div>
                <h3>Code of conduct</h3>
                <small>
                  Six rules. By joining you agree to follow them — moderators enforce them within 4 hours during business hours.
                </small>
              </div>
              <Link href="#" className="cm-inline">
                Full policy <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </header>
            <ol className="cm-rules">
              {codeOfConduct.map((r) => (
                <li key={r.num}>
                  <span className="cm-rule-num">{r.num}</span>
                  <div className="cm-rule-body">
                    <strong>{r.title}</strong>
                    <p>{r.body}</p>
                    {(r.bad || r.good) && (
                      <div className="cm-rule-examples">
                        {r.bad && (
                          <div className="cm-rule-ex bad">
                            <span>
                              <i className="fa-solid fa-circle-xmark"></i> Don't
                            </span>
                            <em>{r.bad}</em>
                          </div>
                        )}
                        {r.good && (
                          <div className="cm-rule-ex good">
                            <span>
                              <i className="fa-solid fa-circle-check"></i> Instead
                            </span>
                            <em>{r.good}</em>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </article>

          {/* Featured discussions peek */}
          <article className="cm-card">
            <header className="cm-section-head">
              <div>
                <h3>What people are talking about right now</h3>
                <small>A peek inside — you'll see the full feed once you join.</small>
              </div>
              <Link href="#" className="cm-inline">
                Trending threads <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </header>
            <ul className="cm-discussions">
              {featuredDiscussions.map((d) => (
                <li key={d.title}>
                  <span className={`cm-disc-avatar ${d.authorTone}`}>{d.authorInitials}</span>
                  <div className="cm-disc-meta">
                    <div className="cm-disc-topline">
                      <span className={`cm-chan-pill ${d.channelTone}`}>
                        <i className="fa-solid fa-hashtag"></i> {d.channel.replace("#", "")}
                      </span>
                      {d.isPinned && (
                        <span className="cm-disc-pinned">
                          <i className="fa-solid fa-thumbtack"></i> Pinned
                        </span>
                      )}
                    </div>
                    <strong>{d.title}</strong>
                    <small>
                      by {d.authorName} · {d.ago}
                    </small>
                  </div>
                  <div className="cm-disc-side">
                    <span>
                      <i className="fa-regular fa-comment"></i> {d.replies}
                    </span>
                    <span>
                      <i className="fa-solid fa-heart"></i> {d.reactions}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* Top contributors */}
          <article className="cm-card">
            <header className="cm-section-head">
              <div>
                <h3>People you'll learn from</h3>
                <small>Moderators &amp; active contributors this month.</small>
              </div>
            </header>
            <ul className="cm-contributors">
              {contributors.map((c) => (
                <li key={c.name}>
                  <span className={`cm-disc-avatar ${c.tone}`} style={{ width: 44, height: 44, fontSize: 13 }}>
                    {c.initials}
                  </span>
                  <div className="cm-contrib-meta">
                    <strong>
                      {c.name}
                      {c.isMod && (
                        <span className="cm-mod-pill">
                          <i className="fa-solid fa-shield-halved"></i> Mod
                        </span>
                      )}
                    </strong>
                    <small>{c.title}</small>
                    <small className="cm-contrib-stats">
                      <span>{c.posts} posts</span> ·{" "}
                      <span>{c.helpful} marked helpful</span>
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Aside — Join CTA */}
        <aside className="cm-aside">
          <article className="cm-join">
            <header>
              <span className="cm-join-eyebrow">
                <i className="fa-solid fa-rocket"></i> Free with your enrollment
              </span>
              <h3>Join the community</h3>
              <p>
                Single sign-on from your LMS account. Takes 10 seconds — no separate password.
              </p>
            </header>
            <div className="cm-join-meta">
              <div>
                <strong>{stats.members.toLocaleString()}</strong>
                <small>peers waiting to help</small>
              </div>
              <div>
                <strong>Lifetime</strong>
                <small>access after passing</small>
              </div>
            </div>
            <label className="cm-coc">
              <input type="checkbox" defaultChecked={false} />
              <span>
                I have read and agree to the{" "}
                <Link href="#" className="cm-inline">
                  code of conduct
                </Link>{" "}
                above.
              </span>
            </label>
            <button type="button" className="cm-join-cta">
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Join the community
            </button>
            <small className="cm-join-note">
              Joining creates your community profile from your LMS name and tier.
              You can change your display name anytime in community settings.
            </small>
          </article>

          <article className="cm-card cm-side-info">
            <h4>Privacy &amp; visibility</h4>
            <ul>
              <li>
                <i className="fa-solid fa-eye-slash"></i>
                <span>
                  Your <strong>real name</strong> and <strong>tier</strong> are hidden by default — only your display name is shown.
                </span>
              </li>
              <li>
                <i className="fa-solid fa-shield-halved"></i>
                <span>
                  Moderators can see your tier and enrollment for safety reasons.
                </span>
              </li>
              <li>
                <i className="fa-solid fa-circle-xmark"></i>
                <span>
                  You can leave the community anytime from your account settings.
                </span>
              </li>
            </ul>
          </article>

          <article className="cm-card cm-side-info">
            <h4>House rules — TL;DR</h4>
            <ol className="cm-tldr">
              <li>Be kind &amp; constructive</li>
              <li>No live exam content — ever</li>
              <li>Label your sources clearly</li>
              <li>No promotions in main channels</li>
              <li>Spoiler-tag mock answers</li>
              <li>Report &gt; escalate</li>
            </ol>
          </article>
        </aside>
      </section>
    </LmsFrame>
  );
}
