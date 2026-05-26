import Link from "next/link";
import LmsFrame from "../components/LmsFrame";

type Tone = "blue" | "purple" | "green" | "orange" | "pink" | "teal";

const overallPct = 36;
const readinessPct = 62;

type IsoKey = "reference" | "question" | "mock" | "assignment" | "assistant" | "mentor";

type PrepCard = {
  title: string;
  value: string;
  caption: string;
  tone: Tone;
  iso: IsoKey;
  badge?: { label: string; tone: "silver" | "gold" };
  cta: { label: string; href: string };
};

/* ─── Isometric SVG illustrations ────────────────────────────────── */

function TrophyIso() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* base */}
      <ellipse cx="60" cy="106" rx="38" ry="6" fill="#000" opacity=".18" />
      <path d="M40 92 L80 92 L86 108 L34 108 Z" fill="#a16207" />
      <path d="M40 92 L80 92 L80 96 L40 96 Z" fill="#facc15" />
      {/* stem */}
      <rect x="54" y="78" width="12" height="16" fill="#ca8a04" />
      <rect x="54" y="78" width="6" height="16" fill="#facc15" />
      {/* cup body */}
      <path d="M32 22 Q32 70 60 78 Q88 70 88 22 Z" fill="#fde047" />
      <path d="M32 22 Q32 70 60 78 L60 22 Z" fill="#facc15" />
      <path d="M32 22 L88 22 L88 30 L32 30 Z" fill="#fbbf24" />
      {/* handles */}
      <path d="M32 30 Q14 30 14 50 Q14 64 28 64" fill="none" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
      <path d="M88 30 Q106 30 106 50 Q106 64 92 64" fill="none" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />
      {/* star */}
      <path d="M60 38 L63 46 L72 46 L65 51 L67 60 L60 55 L53 60 L55 51 L48 46 L57 46 Z" fill="#fff" opacity=".95" />
      {/* sparkles */}
      <circle cx="22" cy="18" r="3" fill="#fde047" />
      <circle cx="98" cy="20" r="2.5" fill="#fbbf24" />
      <circle cx="106" cy="40" r="2" fill="#fde047" />
    </svg>
  );
}

function ReferenceIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="84" rx="30" ry="4" fill="#000" opacity=".12" />
      {/* back card */}
      <rect x="22" y="14" width="48" height="62" rx="6" fill="#bfdbfe" transform="rotate(-8 46 45)" />
      {/* mid card */}
      <rect x="26" y="18" width="48" height="62" rx="6" fill="#60a5fa" />
      <rect x="34" y="28" width="32" height="4" rx="2" fill="#fff" opacity=".7" />
      <rect x="34" y="38" width="24" height="3" rx="2" fill="#fff" opacity=".5" />
      <rect x="34" y="46" width="28" height="3" rx="2" fill="#fff" opacity=".5" />
      <rect x="34" y="54" width="18" height="3" rx="2" fill="#fff" opacity=".5" />
      {/* bookmark */}
      <path d="M58 18 L66 18 L66 38 L62 34 L58 38 Z" fill="#1d4ed8" />
    </svg>
  );
}

function QuestionIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="84" rx="28" ry="4" fill="#000" opacity=".12" />
      {/* clipboard back */}
      <rect x="20" y="16" width="56" height="64" rx="8" fill="#7c3aed" />
      <rect x="26" y="22" width="44" height="52" rx="4" fill="#f1e9ff" />
      {/* clip */}
      <rect x="38" y="10" width="20" height="10" rx="3" fill="#5b21b6" />
      {/* big question mark */}
      <text x="48" y="58" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="36" fill="#7c3aed">?</text>
      <circle cx="48" cy="64" r="2.5" fill="#7c3aed" />
      {/* sparkle */}
      <circle cx="78" cy="22" r="3" fill="#c4b5fd" />
    </svg>
  );
}

function MockIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="84" rx="28" ry="4" fill="#000" opacity=".12" />
      {/* watch crown */}
      <rect x="44" y="14" width="8" height="6" rx="2" fill="#92400e" />
      <rect x="42" y="18" width="12" height="4" rx="1.5" fill="#d97706" />
      {/* stopwatch body */}
      <circle cx="48" cy="50" r="28" fill="#fed7aa" />
      <circle cx="48" cy="50" r="28" fill="none" stroke="#d97706" strokeWidth="4" />
      <circle cx="48" cy="50" r="22" fill="#fff" />
      {/* tick marks */}
      <line x1="48" y1="30" x2="48" y2="34" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="50" x2="64" y2="50" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="70" x2="48" y2="66" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="50" x2="32" y2="50" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
      {/* hands */}
      <line x1="48" y1="50" x2="48" y2="36" stroke="#0f1133" strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="50" x2="60" y2="56" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="50" r="3" fill="#0f1133" />
      {/* side button */}
      <rect x="72" y="32" width="6" height="6" rx="1.5" fill="#d97706" transform="rotate(45 75 35)" />
    </svg>
  );
}

function AssignmentIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="84" rx="28" ry="4" fill="#000" opacity=".12" />
      {/* paper */}
      <rect x="22" y="14" width="48" height="64" rx="6" fill="#fff" stroke="#bbf7d0" strokeWidth="2" />
      <rect x="22" y="14" width="48" height="14" rx="6" fill="#16a34a" />
      <rect x="22" y="22" width="48" height="6" fill="#16a34a" />
      {/* checklist rows */}
      <rect x="30" y="36" width="6" height="6" rx="1.5" fill="#16a34a" />
      <path d="M31 39 L33 41 L35 37" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="40" y="36" width="22" height="4" rx="1" fill="#bbf7d0" />

      <rect x="30" y="48" width="6" height="6" rx="1.5" fill="#16a34a" />
      <path d="M31 51 L33 53 L35 49" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="40" y="48" width="26" height="4" rx="1" fill="#bbf7d0" />

      <rect x="30" y="60" width="6" height="6" rx="1.5" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
      <rect x="40" y="60" width="20" height="4" rx="1" fill="#e5e7eb" />
      {/* pencil */}
      <rect x="64" y="60" width="18" height="6" rx="1" fill="#facc15" transform="rotate(-25 73 63)" />
      <path d="M82 56 L86 60 L82 62 Z" fill="#0f1133" transform="rotate(-25 84 59)" />
    </svg>
  );
}

function AssistantIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      {/* paper plane */}
      <path d="M16 50 L80 22 L66 78 L48 60 Z" fill="#0d9488" />
      <path d="M16 50 L80 22 L48 60 Z" fill="#14b8a6" />
      <path d="M48 60 L80 22 L52 56 Z" fill="#5eead4" />
      {/* chat bubble */}
      <circle cx="72" cy="68" r="14" fill="#fff" stroke="#0d9488" strokeWidth="2" />
      <circle cx="66" cy="68" r="1.6" fill="#0d9488" />
      <circle cx="72" cy="68" r="1.6" fill="#0d9488" />
      <circle cx="78" cy="68" r="1.6" fill="#0d9488" />
      {/* sparkle */}
      <path d="M28 22 L30 26 L34 28 L30 30 L28 34 L26 30 L22 28 L26 26 Z" fill="#5eead4" />
    </svg>
  );
}

function MentorIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="26" ry="4" fill="#000" opacity=".12" />
      {/* antenna */}
      <line x1="48" y1="14" x2="48" y2="22" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="48" cy="12" r="3" fill="#db2777" />
      {/* head */}
      <rect x="26" y="22" width="44" height="36" rx="10" fill="#fbcfe8" />
      <rect x="26" y="22" width="44" height="36" rx="10" fill="none" stroke="#db2777" strokeWidth="2" />
      {/* eyes */}
      <circle cx="38" cy="38" r="4" fill="#fff" />
      <circle cx="38" cy="38" r="2" fill="#0f1133" />
      <circle cx="58" cy="38" r="4" fill="#fff" />
      <circle cx="58" cy="38" r="2" fill="#0f1133" />
      {/* mouth */}
      <path d="M40 48 Q48 52 56 48" stroke="#db2777" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* ear panels */}
      <rect x="20" y="32" width="6" height="16" rx="3" fill="#f472b6" />
      <rect x="70" y="32" width="6" height="16" rx="3" fill="#f472b6" />
      {/* body */}
      <rect x="32" y="60" width="32" height="22" rx="6" fill="#f472b6" />
      <circle cx="42" cy="71" r="2" fill="#fff" />
      <circle cx="48" cy="71" r="2" fill="#fff" />
      <circle cx="54" cy="71" r="2" fill="#fff" />
    </svg>
  );
}

const IsoMap: Record<IsoKey, () => JSX.Element> = {
  reference: ReferenceIso,
  question: QuestionIso,
  mock: MockIso,
  assignment: AssignmentIso,
  assistant: AssistantIso,
  mentor: MentorIso,
};

/* ─── Support & Mentoring isometric illustrations ────────────────── */

function LiveTrainingIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <rect x="14" y="20" width="68" height="44" rx="6" fill="#1e3a8a" />
      <rect x="18" y="24" width="60" height="36" rx="3" fill="#dbeafe" />
      <circle cx="36" cy="40" r="6" fill="#2563eb" />
      <rect x="30" y="48" width="12" height="6" rx="1.5" fill="#2563eb" />
      <circle cx="60" cy="40" r="6" fill="#60a5fa" />
      <rect x="54" y="48" width="12" height="6" rx="1.5" fill="#60a5fa" />
      <rect x="40" y="64" width="16" height="4" fill="#1e3a8a" />
      <rect x="32" y="68" width="32" height="3" rx="1.5" fill="#1e3a8a" />
      <circle cx="76" cy="22" r="3" fill="#ef4444" />
      <text x="76" y="25" textAnchor="middle" fontFamily="system-ui" fontSize="4" fontWeight="800" fill="#fff">●</text>
    </svg>
  );
}

function QaIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <path d="M16 28 Q16 18 26 18 L60 18 Q70 18 70 28 L70 46 Q70 56 60 56 L42 56 L30 66 L32 56 L26 56 Q16 56 16 46 Z" fill="#a855f7" />
      <text x="43" y="42" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="20" fill="#fff">Q</text>
      <path d="M40 42 Q40 36 46 36 L70 36 Q76 36 76 42 L76 56 Q76 62 70 62 L66 62 L60 70 L62 62 L46 62 Q40 62 40 56 Z" fill="#c084fc" opacity=".95" />
      <text x="58" y="56" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="14" fill="#fff">A</text>
    </svg>
  );
}

function CoachingIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <circle cx="32" cy="36" r="10" fill="#fbbf24" />
      <path d="M16 70 Q16 54 32 54 Q48 54 48 70 Z" fill="#f59e0b" />
      <circle cx="62" cy="36" r="10" fill="#fde68a" />
      <path d="M46 70 Q46 54 62 54 Q78 54 78 70 Z" fill="#fcd34d" />
      <path d="M40 36 L56 36" stroke="#0f1133" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="36" r="3" fill="#0f1133" />
      <path d="M44 38 L48 42 L52 38" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SupportIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <circle cx="48" cy="46" r="26" fill="#0d9488" />
      <circle cx="48" cy="46" r="20" fill="#ccfbf1" />
      <rect x="22" y="44" width="12" height="16" rx="4" fill="#0f766e" />
      <rect x="62" y="44" width="12" height="16" rx="4" fill="#0f766e" />
      <path d="M48 60 Q48 70 60 70 L66 70" stroke="#0f766e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="68" cy="70" r="3" fill="#0f766e" />
      <path d="M40 44 L44 48 L56 36" stroke="#0d9488" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CommunityIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <circle cx="30" cy="38" r="9" fill="#f472b6" />
      <path d="M16 64 Q16 50 30 50 Q44 50 44 64 Z" fill="#ec4899" />
      <circle cx="66" cy="38" r="9" fill="#fbcfe8" />
      <path d="M52 64 Q52 50 66 50 Q80 50 80 64 Z" fill="#f9a8d4" />
      <circle cx="48" cy="28" r="8" fill="#db2777" />
      <path d="M36 50 Q36 38 48 38 Q60 38 60 50 Z" fill="#be185d" />
      <circle cx="20" cy="22" r="2" fill="#fbcfe8" />
      <circle cx="78" cy="22" r="2" fill="#fbcfe8" />
    </svg>
  );
}

function CashbackIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <circle cx="48" cy="46" r="26" fill="#bbf7d0" />
      <circle cx="48" cy="46" r="26" fill="none" stroke="#16a34a" strokeWidth="3" />
      <text x="48" y="55" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="24" fill="#15803d">$</text>
      <path d="M30 28 Q44 18 60 28" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M58 24 L62 28 L58 32" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M66 64 Q52 74 36 64" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38 68 L34 64 L38 60" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MoneyBackIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <path d="M48 14 L74 24 L74 50 Q74 66 48 78 Q22 66 22 50 L22 24 Z" fill="#facc15" />
      <path d="M48 14 L74 24 L74 50 Q74 66 48 78 Z" fill="#eab308" />
      <path d="M34 46 L44 56 L62 38" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="48" y="32" textAnchor="middle" fontFamily="system-ui" fontWeight="800" fontSize="9" fill="#fff">100%</text>
    </svg>
  );
}

function AttendanceCertIso() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".12" />
      <rect x="16" y="18" width="64" height="48" rx="4" fill="#fff" stroke="#d97706" strokeWidth="2" />
      <rect x="20" y="22" width="56" height="40" rx="2" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="32" y="30" width="32" height="3" rx="1" fill="#0f1133" opacity=".6" />
      <rect x="38" y="38" width="20" height="2" rx="1" fill="#0f1133" opacity=".4" />
      <rect x="34" y="44" width="28" height="2" rx="1" fill="#0f1133" opacity=".4" />
      <circle cx="32" cy="58" r="6" fill="#d97706" />
      <path d="M30 58 L31.5 60 L34 56" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M64 60 L70 78 L66 74 L62 76 L64 60 Z" fill="#dc2626" />
      <path d="M68 60 L74 78 L70 74 L66 76 L68 60 Z" fill="#ef4444" />
    </svg>
  );
}

type SupportIsoKey =
  | "live-training"
  | "qa"
  | "coaching"
  | "support"
  | "community"
  | "cashback"
  | "money-back"
  | "attendance-cert";

const SupportIsoMap: Record<SupportIsoKey, () => JSX.Element> = {
  "live-training": LiveTrainingIso,
  qa: QaIso,
  coaching: CoachingIso,
  support: SupportIso,
  community: CommunityIso,
  cashback: CashbackIso,
  "money-back": MoneyBackIso,
  "attendance-cert": AttendanceCertIso,
};

type SupportTile = {
  title: string;
  value: string;
  caption: string;
  tone: Tone;
  iso: SupportIsoKey;
  badge?: { label: string; tone: "silver" | "gold" };
  cta: { label: string; href: string };
};

const supportTiles: SupportTile[] = [
  {
    title: "Live Training",
    value: "Next: Wed 4 Jun",
    caption: "Instructor-led sessions across timezones · RSVP open",
    tone: "blue",
    iso: "live-training",
    cta: { label: "View schedule", href: "/lms/pmp/live-training" },
  },
  {
    title: "Q&A Session",
    value: "Tomorrow · 6pm IST",
    caption: "Recurring drop-in slots with the instructor on duty",
    tone: "purple",
    iso: "qa",
    cta: { label: "Book a slot", href: "/lms/pmp/qa-session" },
  },
  {
    title: "1:1 Coaching",
    value: "3 credits left",
    caption: "Personal coaching call with pre-call prep questionnaire",
    tone: "orange",
    iso: "coaching",
    badge: { label: "Gold", tone: "gold" },
    cta: { label: "Book coaching", href: "/lms/pmp/coaching" },
  },
  {
    title: "Support Inbox",
    value: "2 open",
    caption: "Tier-aware channels: email · chat · phone (Gold)",
    tone: "teal",
    iso: "support",
    cta: { label: "Open inbox", href: "/lms/pmp/support" },
  },
  {
    title: "Community",
    value: "1.2k members",
    caption: "Connect with cohort learners and alumni mentors",
    tone: "pink",
    iso: "community",
    cta: { label: "Join community", href: "/lms/pmp/community" },
  },
  {
    title: "Cashback",
    value: "₹1,500 earned",
    caption: "Ledger of accrued cashback · payout available",
    tone: "green",
    iso: "cashback",
    cta: { label: "View ledger", href: "/lms/pmp/cashback" },
  },
  {
    title: "Money-back Guarantee",
    value: "Active",
    caption: "Honoured if readiness gate is passed and exam fails",
    tone: "orange",
    iso: "money-back",
    badge: { label: "Gold", tone: "gold" },
    cta: { label: "View terms", href: "/lms/pmp/money-back" },
  },
  {
    title: "Attendance Certificate",
    value: "Auto-generated",
    caption: "Download once you complete the training milestone",
    tone: "blue",
    iso: "attendance-cert",
    cta: { label: "View certificate", href: "/lms/pmp/certificates/attendance" },
  },
];

const prepCards: PrepCard[] = [
  {
    title: "Reference Cards",
    value: "12",
    caption: "Cards available · 2 read, 1 in progress",
    tone: "blue",
    iso: "reference",
    cta: { label: "Continue reading", href: "/lms/pmp/reference/integration-management" },
  },
  {
    title: "Question Bank",
    value: "1,248",
    caption: "Questions across 6 topic clusters",
    tone: "purple",
    iso: "question",
    cta: { label: "Continue practising", href: "/lms/pmp/question-bank" },
  },
  {
    title: "Mock Exams",
    value: "1 of 6",
    caption: "Completed · last score 80% (PASS)",
    tone: "orange",
    iso: "mock",
    cta: { label: "Continue exam", href: "/lms/pmp/mock-exam/2" },
  },
  {
    title: "Assignments",
    value: "2",
    caption: "Pending · apply your knowledge to scenarios",
    tone: "green",
    iso: "assignment",
    cta: { label: "Continue working", href: "/lms/pmp" },
  },
  {
    title: "AI Study Assistant",
    value: "Ask anything",
    caption: "Get answers instantly on any PMP® concept",
    tone: "teal",
    iso: "assistant",
    badge: { label: "Silver", tone: "silver" },
    cta: { label: "Open assistant", href: "/lms/pmp" },
  },
  {
    title: "AI Mentor",
    value: "Personalised guidance",
    caption: "Get tailored mentoring on your weak areas",
    tone: "pink",
    iso: "mentor",
    badge: { label: "Gold", tone: "gold" },
    cta: { label: "Open mentor", href: "/lms/pmp" },
  },
];

/* ─── Detail sections (Reference, Study Guides, Glossary, etc.) ─── */
type Status = "read" | "progress" | "not-started" | "locked";

type ResourceCardData = {
  title: string;
  meta: string;
  status: Status;
  href?: string;
};

const statusMap: Record<Status, { label: string; tone: string; icon: string }> = {
  read: { label: "Read", tone: "green", icon: "fa-solid fa-check-double" },
  progress: { label: "In Progress", tone: "orange", icon: "fa-solid fa-hourglass-half" },
  "not-started": { label: "Not Started", tone: "slate", icon: "fa-regular fa-bookmark" },
  locked: { label: "Locked (Gold)", tone: "gold", icon: "fa-solid fa-crown" },
};

const referenceCards: ResourceCardData[] = [
  { title: "Project Integration Management", meta: "12 sections · 35 min", status: "progress", href: "/lms/pmp/reference/integration-management" },
  { title: "Project Scope Management", meta: "10 sections · 28 min", status: "read", href: "/lms/pmp/reference/scope-management" },
  { title: "Project Schedule Management", meta: "11 sections · 32 min", status: "not-started", href: "/lms/pmp/reference/schedule-management" },
  { title: "Project Cost Management", meta: "9 sections · 24 min", status: "read", href: "/lms/pmp/reference/cost-management" },
  { title: "Project Quality Management", meta: "10 sections · 30 min", status: "locked", href: "/lms/pmp/reference/quality-management" },
  { title: "Project Risk Management", meta: "12 sections · 36 min", status: "locked", href: "/lms/pmp/reference/risk-management" },
];

const studyGuides: ResourceCardData[] = [
  { title: "PMBOK Guide 7th Ed. Study Guide", meta: "14 chapters · 4 hr 20 min", status: "progress", href: "/lms/pmp/study-guide/pmbok-7" },
  { title: "Agile Practice Guide Study Guide", meta: "8 chapters · 2 hr 40 min", status: "read", href: "/lms/pmp/study-guide/agile-practice" },
  { title: "Process Groups Study Guide", meta: "5 chapters · 1 hr 50 min", status: "not-started", href: "/lms/pmp/study-guide/process-groups" },
  { title: "Knowledge Areas Study Guide", meta: "10 chapters · 3 hr 10 min", status: "not-started", href: "/lms/pmp/study-guide/knowledge-areas" },
  { title: "Stakeholder Engagement Study Guide", meta: "6 chapters · 1 hr 30 min", status: "locked", href: "/lms/pmp/study-guide/stakeholder-engagement" },
  { title: "Earned Value Management Study Guide", meta: "7 chapters · 2 hr 5 min", status: "locked", href: "/lms/pmp/study-guide/earned-value" },
];

const glossary: ResourceCardData[] = [
  { title: "PMP® Exam Glossary", meta: "240 terms · searchable · A–Z", status: "not-started", href: "/lms/pmp/glossary" },
];

const questionBank: ResourceCardData[] = [
  { title: "Easy Questions", meta: "150 Qs · 25 min", status: "progress", href: "/lms/pmp/question-bank" },
  { title: "Moderate Questions", meta: "200 Qs · 40 min", status: "not-started", href: "/lms/pmp/question-bank" },
  { title: "Difficult Questions", meta: "120 Qs · 50 min", status: "not-started", href: "/lms/pmp/question-bank" },
  { title: "Mixed Practice Set", meta: "180 Qs · 45 min", status: "progress", href: "/lms/pmp/question-bank" },
  { title: "Wrong Answers Pool", meta: "Personalised drill", status: "locked", href: "/lms/pmp/question-bank" },
  { title: "Exam Essentials Set", meta: "100 Qs · 30 min", status: "locked", href: "/lms/pmp/question-bank" },
];

const simulationPapers: ResourceCardData[] = [
  { title: "Mini Mock 1", meta: "60 Qs · 60 min", status: "read", href: "/lms/pmp/mock-exam/1" },
  { title: "Mini Mock 2", meta: "60 Qs · 60 min", status: "progress", href: "/lms/pmp/mock-exam/2" },
  { title: "Full Length Exam 1", meta: "180 Qs · 230 min", status: "not-started", href: "/lms/pmp/mock-exam/3" },
  { title: "Full Length Exam 2", meta: "180 Qs · 230 min", status: "not-started", href: "/lms/pmp/mock-exam/4" },
  { title: "Full Length Exam 3", meta: "180 Qs · 230 min", status: "locked", href: "/lms/pmp/mock-exam/5" },
  { title: "Final Readiness Paper", meta: "180 Qs · 230 min", status: "locked", href: "/lms/pmp/mock-exam/6" },
];

function StatusPill({ status }: { status: Status }) {
  const s = statusMap[status];
  return (
    <span className={`ep-status ${s.tone}`}>
      <i className={s.icon}></i>
      {s.label}
    </span>
  );
}

function ResourceCard({
  card,
  variant,
  badgeIcon,
  badgeLabel,
}: {
  card: ResourceCardData;
  variant: "blue" | "purple" | "green" | "red" | "orange";
  badgeIcon: string;
  badgeLabel: string;
}) {
  const locked = card.status === "locked";
  return (
    <Link
      href={card.href ?? "#"}
      className={`ep-card ${variant}${locked ? " locked" : ""}`}
    >
      <div className="ep-card-top">
        <span className={`ep-card-icon ${variant}`}>
          <i className={badgeIcon}></i>
        </span>
        {locked && (
          <span className="ep-lock">
            <i className="fa-solid fa-lock"></i>
          </span>
        )}
      </div>
      <small className="ep-card-eyebrow">{badgeLabel}</small>
      <strong className="ep-card-title">{card.title}</strong>
      <span className="ep-card-meta">{card.meta}</span>
      <StatusPill status={card.status} />
    </Link>
  );
}

function DetailSection({
  title,
  count,
  viewAllHref,
  children,
}: {
  title: string;
  count: string;
  viewAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ep-section">
      <div className="ep-section-head">
        <div>
          <h3>{title}</h3>
          <small>{count}</small>
        </div>
        <Link href={viewAllHref} className="ep-viewall">
          View all <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="ep-grid">{children}</div>
    </section>
  );
}

type RecCard = {
  title: string;
  desc: string;
  tone: Tone;
  icon: string;
  cta: { label: string; href: string };
};

const recommendations: RecCard[] = [
  {
    title: "Focus on Process Domain",
    desc: "Your weakest area in the last mock. Target a 25-question drill.",
    tone: "blue",
    icon: "fa-solid fa-diagram-project",
    cta: { label: "Start drill", href: "/lms/pmp/question-bank/session/process" },
  },
  {
    title: "Take a 25 Question Practice",
    desc: "Spaced-retrieval set across People, Process, Business Environment.",
    tone: "purple",
    icon: "fa-solid fa-clipboard-question",
    cta: { label: "Start practice", href: "/lms/pmp/question-bank" },
  },
  {
    title: "Review Incorrect Questions",
    desc: "48 questions from your last mock are waiting to be reviewed.",
    tone: "green",
    icon: "fa-solid fa-rotate-right",
    cta: { label: "Open review", href: "/lms/pmp/mock-exam/1/result" },
  },
];

export default function ExamPrepPage() {
  return (
    <LmsFrame
      active="My Learning"
      crumbs={[{ label: "Back to Dashboard", href: "/dashboard/progress" }]}
      title="📚 Exam Preparation"
      subtitle="Strengthen your concepts and practise with team-focused resources"
      right={
        <Link href="#" className="ep2-roadmap">
          View exam roadmap <i className="fa-solid fa-arrow-right"></i>
        </Link>
      }
    >
      {/* Hero — Overall Progress journey */}
      <section className="ep2-hero">
        <div className="ep2-hero-main">
          <span className="ep2-hero-iso">
            <TrophyIso />
          </span>
          <div className="ep2-hero-label">
            <small>Overall Progress</small>
            <div className="ep2-hero-pctline">
              <strong>{overallPct}%</strong>
              <span>Complete</span>
            </div>
          </div>
        </div>

        <div className="ep2-hero-journey">
          <div className="ep2-hero-bar">
            <div className="ep2-hero-fill" style={{ width: `${overallPct}%` }} />
            {[0, 25, 50, 75, 100].map((pos) => (
              <span
                key={pos}
                className={`ep2-hero-node${overallPct >= pos ? " done" : ""}${overallPct >= pos && overallPct < pos + 25 ? " active" : ""}`}
                style={{ left: `${pos}%` }}
              />
            ))}
          </div>
          <ul className="ep2-hero-stages">
            <li className={overallPct >= 0 ? "done" : ""}>
              <strong>Just Started</strong>
              <small>0 – 25%</small>
            </li>
            <li className={overallPct >= 25 && overallPct < 50 ? "active" : overallPct >= 25 ? "done" : ""}>
              <strong>On Track</strong>
              <small>25 – 50%</small>
            </li>
            <li className={overallPct >= 50 && overallPct < 75 ? "active" : overallPct >= 50 ? "done" : ""}>
              <strong>Halfway There</strong>
              <small>50 – 75%</small>
            </li>
            <li className={overallPct >= 75 && overallPct < 100 ? "active" : overallPct >= 100 ? "done" : ""}>
              <strong>Final Stretch</strong>
              <small>75 – 99%</small>
            </li>
            <li className={overallPct >= 100 ? "active" : ""}>
              <strong>Exam Ready</strong>
              <small>100%</small>
            </li>
          </ul>
        </div>
      </section>

      {/* Your Preparation at a Glance — 6-card grid */}
      <section className="ep2-section">
        <header className="ep2-section-head">
          <div>
            <h3>Your Preparation at a Glance</h3>
            <small>Jump back into any prep stream with one tap</small>
          </div>
          <Link href="#" className="ep2-link">View all resources <i className="fa-solid fa-arrow-right"></i></Link>
        </header>

        <div className="ep2-grid">
          {prepCards.map((c) => {
            const Iso = IsoMap[c.iso];
            return (
              <article key={c.title} className={`ep2-card ${c.tone}`}>
                <header>
                  <span className={`ep2-card-iso ${c.tone}`}>
                    <Iso />
                  </span>
                  {c.badge && (
                    <span className={`pill pill-${c.badge.tone}`}>{c.badge.label}</span>
                  )}
                </header>
                <strong>{c.value}</strong>
                <span className="ep2-card-title">{c.title}</span>
                <small>{c.caption}</small>
                <Link href={c.cta.href} className={`ep2-card-cta ${c.tone}`}>
                  {c.cta.label} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Detail sections — every feature catalog */}
      <DetailSection
        title="Reference Cards"
        count="Quick concept reminders for fast revision"
        viewAllHref="/lms/pmp/reference/integration-management"
      >
        {referenceCards.map((c) => (
          <ResourceCard
            key={c.title}
            card={c}
            variant="blue"
            badgeIcon="fa-solid fa-bookmark"
            badgeLabel="Reference Card"
          />
        ))}
      </DetailSection>

      <DetailSection
        title="Study Guides"
        count="Long-form chapters with examples and case studies"
        viewAllHref="/lms/pmp/study-guide/pmbok-7"
      >
        {studyGuides.map((c) => (
          <ResourceCard
            key={c.title}
            card={c}
            variant="purple"
            badgeIcon="fa-solid fa-book-open-reader"
            badgeLabel="Study Guide"
          />
        ))}
      </DetailSection>

      <DetailSection
        title="Glossary"
        count="240 PMP® terms · searchable · A–Z"
        viewAllHref="/lms/pmp/glossary"
      >
        {glossary.map((c) => (
          <ResourceCard
            key={c.title}
            card={c}
            variant="green"
            badgeIcon="fa-solid fa-language"
            badgeLabel="Glossary"
          />
        ))}
      </DetailSection>

      <DetailSection
        title="Question Bank"
        count="500+ practice questions across all difficulty bands"
        viewAllHref="/lms/pmp/question-bank"
      >
        {questionBank.map((c) => (
          <ResourceCard
            key={c.title}
            card={c}
            variant="red"
            badgeIcon="fa-solid fa-circle-question"
            badgeLabel="Question Set"
          />
        ))}
      </DetailSection>

      <DetailSection
        title="Simulation Papers"
        count="Full-length and mini timed mocks under real exam conditions"
        viewAllHref="/lms/pmp/mock-exam/1"
      >
        {simulationPapers.map((c) => (
          <ResourceCard
            key={c.title}
            card={c}
            variant="orange"
            badgeIcon="fa-solid fa-stopwatch"
            badgeLabel="Simulation Paper"
          />
        ))}
      </DetailSection>

      {/* Support & Mentoring — Stage 5 screen 1 */}
      <section className="ep2-section sup-section">
        <header className="ep2-section-head">
          <div>
            <h3>🤝 Support &amp; Mentoring</h3>
            <small>Live training, coaching, community and the guarantees that come with your tier</small>
          </div>
          <Link href="#" className="ep2-link">
            View all support <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </header>

        <div className="ep2-grid sup-grid">
          {supportTiles.map((t) => {
            const Iso = SupportIsoMap[t.iso];
            return (
              <article key={t.title} className={`ep2-card ${t.tone}`}>
                <header>
                  <span className={`ep2-card-iso ${t.tone}`}>
                    <Iso />
                  </span>
                  {t.badge && (
                    <span className={`pill pill-${t.badge.tone}`}>{t.badge.label}</span>
                  )}
                </header>
                <strong>{t.value}</strong>
                <span className="ep2-card-title">{t.title}</span>
                <small>{t.caption}</small>
                <Link href={t.cta.href} className={`ep2-card-cta ${t.tone}`}>
                  {t.cta.label} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Readiness Score + Recommended Next Steps */}
      <section className="ep2-bottom">
        <article className="ep2-readiness">
          <header>
            <div>
              <h3>Readiness Score</h3>
              <small>Your overall preparedness for the exam</small>
            </div>
            <span className="dashp-delta">+4 this week</span>
          </header>

          <div className="ep2-ready-body">
            <div
              className="dashp-ring"
              style={{
                background: `conic-gradient(#16a34a 0% ${readinessPct}%, #eef0f8 ${readinessPct}% 100%)`,
              }}
            >
              <div className="dashp-ring-hole">
                <strong>{readinessPct}</strong>
                <small>/ 100</small>
              </div>
            </div>
            <div>
              <span className="dashp-pass-pill">
                <i className="fa-solid fa-arrow-trend-up"></i> Good progress
              </span>
              <p>
                Your readiness score has improved <strong>4 points</strong> this week.
                Keep practising in your weak areas to cross 75 next week.
              </p>
              <Link href="/dashboard/progress" className="ep2-ready-link">
                View detailed analysis <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </article>

        <article className="ep2-rec">
          <header className="ep2-section-head">
            <div>
              <h3>Recommended Next Steps</h3>
              <small>Smart actions based on your performance</small>
            </div>
          </header>
          <ul className="ep2-rec-list">
            {recommendations.map((r) => (
              <li key={r.title}>
                <span className={`ep2-rec-ic ${r.tone}`}>
                  <i className={r.icon}></i>
                </span>
                <div>
                  <strong>{r.title}</strong>
                  <small>{r.desc}</small>
                </div>
                <Link href={r.cta.href} className="ep2-rec-go">
                  {r.cta.label} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </LmsFrame>
  );
}
