// ============================================================
//  PROFILE — তোমার মূল তথ্য। এখানে বদলালে পুরো site আর chatbot-এ বদলে যাবে।
// ============================================================

export const profile = {
  name: "Anjan Kumar Das",
  shortName: "Anjan",
  role: "R&D Engineer",
  tagline: "I research, build and test software that people can rely on.",

  // Hero-র LED status লাইন
  status: "Currently: R&D Engineer @ Company X",

  location: "Rajshahi, Bangladesh",
  email: "antudas954@gmail.com",

  // TODO: তোমার আসল LinkedIn URL বসাও
  linkedin: "https://www.linkedin.com/in/your-linkedin-id",
  github: "https://github.com/Anjaankdas",
  // TODO: Behance/Dribbble থাকলে বসাও, না থাকলে "" রাখো
  behance: "https://www.behance.net/your-behance-id",

  photo: "/images/profile.jpg", // public/images/profile.jpg বদলে দিলেই হবে
  cv: "/cv.pdf", // public/cv.pdf বদলে দিলেই হবে

  about: [
    "I'm an R&D Engineer who enjoys taking an idea from research to a working system — reading, prototyping, testing and shipping.",
    "My background spans blockchain, IoT and robotics, from Solidity smart contracts to ESP32 sensor systems and competition robots.",
    "I've also worked as a graphics designer, so I care about how things look as much as how they work.",
  ],

  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Varendra University",
    year: "2026",
    result: "CGPA 3.60 / 4.00",
  },

  languages: ["Bangla (Native)", "English (Fluent)"],
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#design", label: "Design" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
