"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero-র "oscilloscope" — live sensor waveform।
 * Tree Vibration project (ESP32 + ADXL345) থেকে অনুপ্রাণিত।
 */
export function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [freq, setFreq] = useState("12.4");
  const [amp, setAmp] = useState("0.82");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let frame = 0;

    const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width: w, height: h } = canvas.getBoundingClientRect();
      const signal = css("--signal") || "#22d3ee";
      const amber = css("--amber") || "#f59e0b";
      const line = css("--line-strong") || "rgba(148,163,184,.28)";

      ctx.clearRect(0, 0, w, h);

      // scope grid
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 1; i < 8; i++) {
        const x = (w / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      const mid = h / 2;
      // CH1: vibration signal (damped bursts + noise)
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const p = x / w;
        const burst = Math.exp(-(((p * 3 + t * 0.25) % 1) * 4));
        const y =
          mid +
          Math.sin(p * 38 + t * 3) * h * 0.22 * burst +
          Math.sin(p * 9 - t * 1.4) * h * 0.06 +
          Math.sin(p * 120 + t * 7) * h * 0.012;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = signal;
      ctx.lineWidth = 2;
      ctx.shadowColor = signal;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // CH2: slow reference wave
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const p = x / w;
        const y = mid + h * 0.3 + Math.sin(p * 6 + t) * h * 0.04;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = amber;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      t += 0.016;
      frame++;
      if (frame % 40 === 0) {
        setFreq((12 + Math.random() * 1.2).toFixed(1));
        setAmp((0.74 + Math.random() * 0.16).toFixed(2));
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="panel relative overflow-hidden p-4" role="img" aria-label="Animated sensor waveform on an oscilloscope screen">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--signal)]" /> CH1 · ADXL345
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--amber)]" /> CH2 · REF
        </span>
      </div>
      <div className="relative rounded-lg border border-line bg-[var(--bg-2)]">
        <canvas ref={canvasRef} className="block h-52 w-full sm:h-64" />
        <span className="pointer-events-none absolute left-2 top-2 font-mono text-[10px] text-muted">2V/div</span>
        <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-[10px] text-muted">5ms/div</span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
        {[
          ["FREQ", `${freq} Hz`],
          ["AMPL", `${amp} g`],
          ["MCU", "ESP32"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-line px-2 py-1.5">
            <dt className="text-muted">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
