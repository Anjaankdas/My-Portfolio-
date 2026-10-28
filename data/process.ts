// ============================================================
//  R&D PIPELINE — Hero-র animation-এর ধাপগুলো।
//  লেখা বা chip বদলাতে চাইলে এখানে বদলাও (ধাপ ৪টাই রাখা ভালো)।
// ============================================================

export const processStages = [
  {
    key: "research",
    title: "Research",
    text: "Study the problem, read the literature and compare existing solutions before writing a line of code.",
    chips: ["Problem framing", "Literature review", "Competitive analysis"],
  },
  {
    key: "prototype",
    title: "Prototype",
    text: "Turn the idea into a working proof of concept quickly, in software or on hardware.",
    chips: ["Python", "React", "ESP32"],
  },
  {
    key: "test",
    title: "Test",
    text: "Measure, break and harden it with automated tests, edge cases and security checks.",
    chips: ["Automated tests", "Benchmarks", "Security review"],
  },
  {
    key: "ship",
    title: "Ship",
    text: "Deliver a reliable, documented system that people can actually use, then learn and iterate.",
    chips: ["Deployment", "Documentation", "Feedback"],
  },
] as const;
