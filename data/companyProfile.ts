/**
 * Content source for /company-profile.
 *
 * Facts here are taken from Discovery Pathway's official Company Profile document
 * and from existing site data (lib/utils siteConfig, data/team.ts, data/destinations.ts).
 * Layout lives in components/company-profile/CompanyProfileFlipbook.tsx.
 */

export interface ProfileStat {
  value: string;
  sup?: string;
  label: string;
}

export interface ProfileChip {
  eyebrow: string;
  label: string;
}

export interface ProfileItem {
  title: string;
  body: string;
}

export interface ProfileNumberedItem extends ProfileItem {
  n: string;
}

export interface ProfileStage extends ProfileItem {
  n: string;
  duration: string;
}

export interface ProfileDestination {
  code: string;
  name: string;
  route: string;
  featured?: boolean;
}

export interface ProfilePartnerGroup {
  region: string;
  names: string[];
}

export interface ProfileSeal {
  eyebrow: string;
  label: string;
}

export const profileMeta = {
  documentTitle: "Company Profile",
  edition: "2026 Edition",
  legalName: "Discovery Pathway Pvt. Ltd.",
  established: "2023",
  registrar: "Ministry of Education, Science & Technology",
  originCode: "BNP",
  originName: "Banepa, Nepal",
};

export const profileStats: ProfileStat[] = [
  { value: "747", sup: "+", label: "Visas approved" },
  { value: "97.9", sup: "%", label: "Success rate" },
  { value: "50", sup: "+", label: "Institutional partners" },
  { value: "8", label: "Study destinations" },
];

export const profileChips: ProfileChip[] = [
  { eyebrow: "Established", label: "2023, Banepa" },
  { eyebrow: "Registration", label: "Ministry of Education, Science & Technology" },
  { eyebrow: "Association", label: "ECAN & KECAN member" },
  { eyebrow: "In-house classes", label: "IELTS, PTE & Japanese" },
  { eyebrow: "Model", label: "One counsellor, start to finish" },
  { eyebrow: "Coverage", label: "Counselling to pre-departure" },
];

export const profileValues: ProfileNumberedItem[] = [
  {
    n: "01",
    title: "Full disclosure",
    body: "Earlier refusals — a student's or a sponsor's — are declared and explained, never buried. Hidden history is what breaks a file under scrutiny.",
  },
  {
    n: "02",
    title: "Student-centred, not assembly line",
    body: "Every applicant is evaluated individually on academic record, financial position, strengths and long-term plans. No two files are treated the same way.",
  },
  {
    n: "03",
    title: "One counsellor",
    body: "The person who assesses eligibility in week one stays reachable through visa filing and departure. No handoffs, no repeating your story.",
  },
  {
    n: "04",
    title: "Costs on the table",
    body: "Tuition, living costs, service fees and third-party charges are broken down in full before a student commits to anything.",
  },
  {
    n: "05",
    title: "Compliance",
    body: "We work within the Ministry of Education framework, ECAN's code of conduct, and each destination country's rules for education agents.",
  },
  {
    n: "06",
    title: "Long-term outcomes",
    body: "We measure ourselves by completions and careers, not enrolments. A student who drops out in year one is not a success.",
  },
];

export const profileDestinations: ProfileDestination[] = [
  { code: "KOR", name: "South Korea", route: "D-2 (Degree) · D-4 (Language)", featured: true },
  { code: "JPN", name: "Japan", route: "Student Visa (Ryugaku)" },
  { code: "AUS", name: "Australia", route: "Subclass 500 (Student)" },
  { code: "GBR", name: "United Kingdom", route: "Student Route" },
  { code: "CAN", name: "Canada", route: "Study Permit" },
  { code: "USA", name: "United States", route: "F-1 Student Visa" },
  { code: "DEU", name: "Germany", route: "National (D) Visa — Study" },
  { code: "FIN", name: "Finland", route: "Residence Permit — Studies" },
];

export const profileServices: ProfileItem[] = [
  {
    title: "Country, university & course selection",
    body: "We weigh academic strengths, financial capacity, subjects of interest and long-term plans to identify the right course at the right institution — and rule out the options that do not fit.",
  },
  {
    title: "Test preparation & registration",
    body: "IELTS, PTE and Japanese language classes run in-house with dedicated instructors. We also handle scheduling and registration for TOEFL, GRE, GMAT and SAT, and advise where scores can be reported.",
  },
  {
    title: "Application preparation",
    body: "Transcripts, letters of recommendation and the Statement of Purpose are prepared to a strategy built around each applicant's profile, not a template.",
  },
  {
    title: "Follow-up & securing admission",
    body: "We chase institutions directly and track every decision, so offers are secured in the shortest realistic time and no query goes unanswered.",
  },
  {
    title: "Visa guidance",
    body: "Documentation that establishes academic genuineness and financial stability, disclosure strategy for any refusal history, and mock interviews run until the answers hold up.",
  },
  {
    title: "Loans, forex & travel",
    body: "Support with educational loan applications and foreign exchange formalities, plus travel planning, airport pick-up and temporary accommodation where a student needs it.",
  },
  {
    title: "Pre-departure orientation",
    body: "Most of our students have never travelled overseas. We brief them on accommodation, banking, transport, part-time work rules and the cultural transition before they board, not after.",
  },
  {
    title: "Soft skills & personality development",
    body: "Resume preparation and interview coaching for the part-time and graduate roles students will apply for once they arrive.",
  },
];

export const profileStages: ProfileStage[] = [
  {
    n: "STAGE 01",
    title: "Guidance & destination fit",
    duration: "1–3 days · free",
    body: "A no-obligation consultation mapping academic background, budget and long-term goals against realistic country and university options.",
  },
  {
    n: "STAGE 02",
    title: "Test preparation",
    duration: "4–12 weeks",
    body: "IELTS, PTE or Japanese language fundamentals with in-house instructors who also see the visa file, so coaching and paperwork stay aligned.",
  },
  {
    n: "STAGE 03",
    title: "Documentation",
    duration: "2–4 weeks",
    body: "Every document the institution and embassy require is collected, verified, translated and notarised — including financial evidence.",
  },
  {
    n: "STAGE 04",
    title: "Application & offer",
    duration: "2–6 weeks",
    body: "Applications go to matched institutions and scholarship consideration is pursued wherever the profile genuinely supports it.",
  },
  {
    n: "STAGE 05",
    title: "Visa filing & interview",
    duration: "3–8 weeks",
    body: "The highest-stakes stage: financial documentation, Statement of Purpose, disclosure strategy for any refusal history, then mock interviews.",
  },
  {
    n: "STAGE 06",
    title: "Pre-departure",
    duration: "1–2 weeks before flight",
    body: "Accommodation, banking, transport, part-time work rules and cultural preparation — briefed before departure, not discovered on arrival.",
  },
];

export const profilePartners: ProfilePartnerGroup[] = [
  {
    region: "South Korea",
    names: [
      "Gimhae University",
      "Far East University",
      "Tongmyong University",
      "Dong-Eui University",
      "Silla University",
      "Busan University of Foreign Studies",
      "Kyungdong University",
    ],
  },
  {
    region: "Australia",
    names: [
      "Sydney Metropolitan University",
      "Victoria University",
      "Federation University",
      "University of the Sunshine Coast",
      "AIBI Higher Education",
    ],
  },
  {
    region: "United Kingdom",
    names: ["University of East London", "BPP University", "Ulster University"],
  },
  {
    region: "Japan & others",
    names: [
      "Mie University",
      "Fraser Valley Partner Colleges",
      "The Institute of International Studies",
      "National Academy of Professional Studies",
    ],
  },
];

export const profileSeals: ProfileSeal[] = [
  { eyebrow: "Government of Nepal", label: "Registered with the Ministry of Education, Science & Technology" },
  { eyebrow: "Association", label: "ECAN Member" },
  { eyebrow: "Kavre Chapter", label: "KECAN Member" },
  { eyebrow: "Test partners", label: "British Council IELTS registration centre · IDP IELTS partner" },
];

export const profileOutcomes: ProfileItem[] = [
  {
    title: "Degree pathways",
    body: "Bachelor's and master's study in business, IT, engineering, hospitality and health, with credit for prior Nepali qualifications where recognised.",
  },
  {
    title: "Scholarship-supported study",
    body: "Merit and language-linked awards at partner institutions that cut the real cost of a degree substantially for eligible applicants.",
  },
  {
    title: "Post-study work routes",
    body: "The UK Graduate Route, Australian post-study work rights and Korean job-seeking pathways — explained before departure, not after graduation.",
  },
  {
    title: "Language-to-degree progression",
    body: "Language-track enrolment in Korea and Japan converting into degree study once proficiency requirements are met.",
  },
];

export const profileOutcomeChecks: string[] = [
  "Being told honestly when a destination is a poor fit",
  "Costs broken down before signing, with no surprises later",
  "One named counsellor who knows the whole file",
  "Deadlines tracked by the office, not by the student",
  "Mock interviews harder than the real interview",
  "Refusal history handled openly and strategically",
  "Counsellors who have visited the campuses they recommend",
  "Contact that continues after the flight",
];

export const profileRegulatory: string[] = [
  "Registered to operate as an education consultancy under the Ministry of Education, Science & Technology, Government of Nepal.",
  "Member of the Education Consultancy Association of Nepal (ECAN) and its Kavrepalanchok chapter (KECAN).",
  "Student files processed in line with No Objection Certificate requirements and destination-country student visa rules.",
  "Recruitment conducted in accordance with each partner institution's agent agreement and the standards of its regulator.",
];

export const profileCommitments: string[] = [
  "We never guarantee a visa outcome, and we say so in writing.",
  "Service fees and third-party costs are disclosed in full before engagement.",
  "Prior refusals and study gaps are declared to institutions and embassies, never concealed.",
  "Students are counselled toward genuine study intent, not toward migration by another name.",
  "Partner institutions receive verified documents and accurate profiles — no inflated files.",
];

export const profileCtaChecks: string[] = [
  "Free first consultation",
  "Realistic destination shortlist",
  "Full cost breakdown up front",
  "In-house IELTS, PTE & Japanese classes",
  "One counsellor from start to finish",
  "Visa filing & interview coaching",
  "Loan, forex & travel support",
  "Pre-departure briefing",
];

/** Page 13 — signed message. Attribution matches data/team.ts. */
export const profileMessage = {
  author: "Amit Neupane",
  role: "Chief Executive Officer · Discovery Pathway Pvt. Ltd.",
  paragraphs: [
    "Empowering students through quality education, on a wider horizon, is the mission we set out with when Discovery Pathway opened in Banepa in 2023. Understanding how competitive the environment has become, we work to put genuinely good options in front of students — options matched to their record and their budget, not to whatever is easiest to sell.",
    "A globally recognised degree changes what a career can look like. Our service is built to support that decision from the first conversation through to arrival: course and country selection, test preparation, documentation, admission, the visa file, and the practical business of settling in somewhere new.",
    "Every file that crosses this office belongs to a family that has usually spent years, and often savings they cannot easily replace, to reach the point of applying. That is the weight we work under, and it is why we would rather lose a client than submit an application we know is weak. Your consultation costs nothing, and you will leave it knowing where you actually stand.",
  ],
};
