// ============================================================
//  EXPERIENCE — নতুন চাকরি যোগ করতে একদম উপরে একটা নতুন { ... } block কপি করে বসাও।
//  সবচেয়ে নতুনটা সবার উপরে থাকবে।
// ============================================================

export type Experience = {
  role: string;
  company: string;
  period: string;
  type: string;
  current?: boolean;
  confidential?: boolean; // true দিলে "Details confidential" lock badge দেখাবে
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "R&D Engineer",
    company: "Company X", // TODO: অনুমতি পেলে আসল নাম
    period: "2026 — Present", // TODO: আসল শুরুর মাস/বছর
    type: "Full-time",
    current: true,
    confidential: true,
    points: [
      "Developing AI-powered document processing systems for enterprise clients.",
      "Working on secure backend architecture, authentication and audit logging.",
      "Conducting product research and competitive analysis to shape new features.",
    ],
    tags: ["AI / LLM", "Backend", "Security", "Research"],
  },
  {
    role: "Graphics Designer",
    company: "Company Y", // TODO: আসল নাম (যেমন Review Dibo)
    period: "20XX — 20XX", // TODO: আসল সময়
    type: "Part-time",
    points: [
      "Designed social media posts, banners and campaign visuals.",
      "Maintained a consistent brand look across digital channels.",
      "Worked with the marketing team to turn briefs into finished creatives.",
    ],
    tags: ["Social Media", "Branding", "Photoshop", "Illustrator"],
  },
  {
    role: "Data Entry Associate",
    company: "Chorcha",
    period: "2025",
    type: "Remote",
    points: [
      "Entered and maintained data with a high level of accuracy.",
      "Organized and updated digital records and databases.",
    ],
    tags: ["Data", "Accuracy"],
  },
  {
    role: "Marketing Associate",
    company: "Maloncho",
    period: "Jan 2024 — Jul 2024",
    type: "Internship",
    points: [
      "Managed Facebook marketing campaigns and promotional content.",
      "Increased audience engagement through social media strategies.",
    ],
    tags: ["Facebook Ads", "Content"],
  },
];
