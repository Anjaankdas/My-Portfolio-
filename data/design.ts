// ============================================================
//  DESIGN WORK — তোমার graphics design-এর কাজ।
//  ছবি public/design/ folder-এ রাখো (WebP/JPG, ১৫০০px-এর মতো চওড়া হলেই যথেষ্ট)।
//  তারপর নিচের list-এ src: "/design/ফাইলের-নাম.webp" লেখো।
//  category: "Social" | "Banner" | "Branding" — নতুন category লাগলে designCategories-এও যোগ করো।
// ============================================================

export const designCategories = ["All", "Social", "Banner", "Branding"] as const;

export type DesignItem = {
  title: string;
  category: Exclude<(typeof designCategories)[number], "All">;
  src: string;
  client?: string;
};

export const designWork: DesignItem[] = [
  { title: "Campaign Post 01", category: "Social", src: "/design/placeholder-1.svg", client: "Company Y" },
  { title: "Campaign Post 02", category: "Social", src: "/design/placeholder-2.svg", client: "Company Y" },
  { title: "Offer Banner", category: "Banner", src: "/design/placeholder-3.svg", client: "Company Y" },
  { title: "Brand Kit", category: "Branding", src: "/design/placeholder-4.svg" },
  { title: "Campaign Post 03", category: "Social", src: "/design/placeholder-5.svg", client: "Company Y" },
  { title: "Web Hero Banner", category: "Banner", src: "/design/placeholder-6.svg" },
  { title: "Logo Concept", category: "Branding", src: "/design/placeholder-7.svg" },
  { title: "Event Poster", category: "Social", src: "/design/placeholder-8.svg" },
];

// সেরা ২–৩টা কাজের ছোট গল্প (না চাইলে list খালি রাখো: [])
export const designCaseStudies = [
  {
    title: "Social Campaign Refresh", // TODO
    image: "/design/placeholder-1.svg",
    brief: "Write what the client asked for in one or two lines.",
    approach: "Explain your idea: colours, layout, typography choices.",
    result: "Share the outcome, e.g. engagement increased by X%.",
  },
  {
    title: "Brand Identity Kit", // TODO
    image: "/design/placeholder-4.svg",
    brief: "Write what the client asked for in one or two lines.",
    approach: "Explain your idea: colours, layout, typography choices.",
    result: "Share the outcome, e.g. used across all channels.",
  },
];
