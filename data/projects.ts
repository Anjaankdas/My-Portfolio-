// ============================================================
//  PROJECTS — প্রতিটা project একটা { ... } block।
//  ছবি: public/projects/ folder-এ রাখো, তারপর image: "/projects/নাম.jpg" লেখো।
//  link না থাকলে github/demo "" রাখো — button লুকিয়ে যাবে।
// ============================================================

export type Project = {
  title: string;
  category: "Blockchain" | "IoT" | "Robotics" | "AI" | "Software";
  summary: string;
  image: string;
  specs: { label: string; value: string }[]; // datasheet টেবিল
  highlights: string[];
  tags: string[];
  github?: string;
  demo?: string;
  status: string;
};

export const projects: Project[] = [
  {
    title: "Blockchain-Based Secure Medical Record Exchange",
    category: "Blockchain",
    summary:
      "A patient-owned medical data exchange where patients grant and revoke access on-chain, records stay encrypted, and an AI model assists diagnosis without sharing raw data.",
    image: "/projects/medical-blockchain.svg", // TODO: আসল screenshot/diagram
    specs: [
      { label: "Network", value: "Ethereum Sepolia" },
      { label: "Contract", value: "Solidity · consent + audit log" },
      { label: "Storage", value: "IPFS (CID + hash on-chain)" },
      { label: "Crypto", value: "AES-256-GCM (client-side)" },
      { label: "AI", value: "XGBoost · ROC-AUC 0.80" },
      { label: "Privacy", value: "Federated learning · 3 clients" },
    ],
    highlights: [
      "On-chain consent management with grant/revoke access",
      "Only encrypted records pinned to IPFS",
    ],
    tags: ["Solidity", "IPFS", "Python", "Federated Learning"],
    github: "https://github.com/Anjaankdas", // TODO: thesis repo link
    demo: "",
    status: "B.Sc. Thesis",
  },
  {
    title: "Tree Vibration Monitoring System",
    category: "IoT",
    summary:
      "An IoT system that detects subtle tree vibrations for tree-health monitoring, and converts the signal into audible sound for plant bio-acoustics research.",
    image: "/projects/tree-vibration.svg", // TODO: hardware-এর ছবি
    specs: [
      { label: "MCU", value: "ESP32" },
      { label: "Sensor", value: "ADXL345 accelerometer" },
      { label: "Firmware", value: "Embedded C · Arduino IDE" },
      { label: "Output", value: "Real-time data + audio" },
    ],
    highlights: [
      "Real-time vibration processing",
      "Use cases in smart agriculture and forestry research",
    ],
    tags: ["ESP32", "ADXL345", "Embedded C"],
    github: "",
    demo: "",
    status: "Academic Project",
  },
  {
    title: "IoT-Based Air Pollution Monitoring System",
    category: "IoT",
    summary:
      "A sensor-based system that measures air quality and reports it in real time. Built under the supervision of Mohammad Faisal Al-Naser, Lecturer, Varendra University.",
    image: "/projects/air-pollution.svg", // TODO: আসল ছবি
    specs: [
      { label: "MCU", value: "ESP32 / Arduino" }, // TODO: সঠিক board
      { label: "Sensors", value: "Gas / PM sensors" }, // TODO: সঠিক sensor নাম
      { label: "Output", value: "Live dashboard" }, // TODO
    ],
    highlights: ["Real-time air quality readings", "Supervised research project"],
    tags: ["IoT", "Sensors", "Embedded C"],
    github: "",
    demo: "",
    status: "Supervised Project",
  },
  {
    title: "Competition Robots — Robo Soccer, LFR & Drone",
    category: "Robotics",
    summary:
      "Robots built with the Varendra University Robotics Society, including a Line Following Robot that competed in Line Bot Pursuit at Tech-MAYHEM 2023, RUET.",
    image: "/projects/robotics.svg", // TODO: robot-এর ছবি
    specs: [
      { label: "Builds", value: "Robo Soccer · LFR · Drone" },
      { label: "Event", value: "Tech-MAYHEM 2023, RUET" },
      { label: "Team", value: "VU Robotics Society" },
    ],
    highlights: ["Hands-on hardware + control", "Competition experience"],
    tags: ["Arduino", "Motor Control", "Sensors"],
    github: "",
    demo: "",
    status: "Club Projects",
  },
];
