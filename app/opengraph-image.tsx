import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// LinkedIn/Facebook-এ link share করলে এই ছবিটা preview হিসেবে দেখাবে (নিজে থেকেই তৈরি হয়)
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const wave = Array.from({ length: 60 }, (_, i) => {
    const x = (i / 59) * 1040;
    const y = 80 + Math.sin(i * 0.55) * 50 * Math.exp(-((i % 20) / 8));
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b1120",
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#22d3ee", fontSize: 26, letterSpacing: 3 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#34d399" }} />
          // ANJAN.LAB
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ fontSize: 44, color: "#22d3ee", marginTop: 8 }}>{profile.role}</div>
          <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 20 }}>{profile.tagline}</div>
        </div>
        <svg width="1040" height="160" viewBox="0 0 1040 160">
          <path d={wave} stroke="#22d3ee" strokeWidth="4" fill="none" />
        </svg>
      </div>
    ),
    size
  );
}
