// ============================================================
//  SKILLS — "Component Inventory"। শুধু সেই skill রাখো যেগুলো তুমি নিজে ব্যবহার করেছো।
//  learning: true দিলে "Learning" ছোট badge দেখাবে।
// ============================================================

export type SkillGroup = { id: string; title: string; items: { name: string; learning?: boolean }[] };

export const skills: SkillGroup[] = [
  {
    id: "U1",
    title: "Languages",
    items: [{ name: "C" }, { name: "C++" }, { name: "Java" }, { name: "JavaScript" }, { name: "Python" }],
  },
  {
    id: "U2",
    title: "AI & Backend",
    items: [
      { name: "LLM / VLM Integration" },
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Automated Testing" },
    ],
  },
  {
    id: "U3",
    title: "Frontend",
    items: [{ name: "React" }, { name: "HTML" }, { name: "CSS" }, { name: "Tailwind CSS" }],
  },
  {
    id: "U4",
    title: "Blockchain",
    items: [
      { name: "Solidity", learning: true },
      { name: "Ethereum", learning: true },
      { name: "Remix IDE" },
      { name: "IPFS" },
    ],
  },
  {
    id: "U5",
    title: "IoT & Embedded",
    items: [{ name: "ESP32" }, { name: "Arduino" }, { name: "Embedded C" }, { name: "Sensors (ADXL345)" }],
  },
  {
    id: "U6",
    title: "Design",
    // TODO: যে tool গুলো ব্যবহার করো সেগুলো রাখো
    items: [{ name: "Photoshop" }, { name: "Illustrator" }, { name: "Figma" }, { name: "Canva" }],
  },
  {
    id: "U7",
    title: "Tools",
    items: [{ name: "Git" }, { name: "GitHub" }, { name: "VS Code" }, { name: "Linux" }],
  },
];
