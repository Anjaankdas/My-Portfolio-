"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Microscope, Cpu, FlaskConical, Rocket, RotateCcw } from "lucide-react";
import { processStages } from "@/data/process";

/**
 * Hero animation: R&D Pipeline
 * Research → Prototype → Test → Ship → (iterate)
 * একটা data packet node থেকে node-এ যায়; যে ধাপে থামে সেটা জ্বলে ওঠে আর নিচে তার বিবরণ দেখায়।
 */

const ICONS = [Microscope, Cpu, FlaskConical, Rocket];

// SVG geometry (viewBox 600 x 210)
const VB_W = 600;
const VB_H = 250;
const NODE_Y = 62;
const NODE_X = [90, 230, 370, 510];
const STRAIGHT = NODE_X[3] - NODE_X[0];
const LOOP_Y = 222;
// Ship থেকে ডান দিক ঘুরে নিচ দিয়ে Research-এ ফেরার পথ (label-এর সাথে ধাক্কা লাগে না)
const RETURN_SEG = `C 600 ${NODE_Y}, 600 ${LOOP_Y}, ${NODE_X[3]} ${LOOP_Y} L ${NODE_X[0]} ${LOOP_Y} C 0 ${LOOP_Y}, 0 ${NODE_Y}, ${NODE_X[0]} ${NODE_Y}`;
const LOOP_PATH = `M ${NODE_X[0]} ${NODE_Y} L ${NODE_X[3]} ${NODE_Y} ${RETURN_SEG}`;
const RETURN_PATH = `M ${NODE_X[3]} ${NODE_Y} ${RETURN_SEG}`;

// timing (ms)
const DWELL = 2200;
const MOVE = 750;
const RETURN = 1400;

type Phase = { kind: "dwell" | "move" | "return"; stage: number; dur: number };
const PHASES: Phase[] = [
  { kind: "dwell", stage: 0, dur: DWELL },
  { kind: "move", stage: 0, dur: MOVE },
  { kind: "dwell", stage: 1, dur: DWELL },
  { kind: "move", stage: 1, dur: MOVE },
  { kind: "dwell", stage: 2, dur: DWELL },
  { kind: "move", stage: 2, dur: MOVE },
  { kind: "dwell", stage: 3, dur: DWELL },
  { kind: "return", stage: 3, dur: RETURN },
];
const CYCLE = PHASES.reduce((a, p) => a + p.dur, 0);
const phaseStart = (i: number) => PHASES.slice(0, i).reduce((a, p) => a + p.dur, 0);

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function RnDPipeline() {
  const [active, setActive] = useState(0);
  const [returning, setReturning] = useState(false);

  const loopRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const clock = useRef({ t: 0, last: 0, paused: false, visible: true, reduce: false });
  const activeRef = useRef(0);
  const returningRef = useRef(false);

  // packet-কে path-এর নির্দিষ্ট দূরত্বে বসায়
  const place = useCallback((dist: number, total: number) => {
    const loop = loopRef.current;
    if (!loop || !packetRef.current) return;
    const p = loop.getPointAtLength(Math.max(0, Math.min(dist, total)));
    packetRef.current.setAttribute("transform", `translate(${p.x} ${p.y})`);
    if (progressRef.current) {
      const lit = Math.min(dist, STRAIGHT);
      progressRef.current.style.strokeDashoffset = String(STRAIGHT - lit);
    }
  }, []);

  useEffect(() => {
    const c = clock.current;
    c.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = loopRef.current;
    if (!loop) return;
    const total = loop.getTotalLength();

    if (c.reduce) {
      place(0, total);
      return;
    }

    let raf = 0;
    const tick = (now: number) => {
      if (!c.last) c.last = now;
      const dt = Math.min(now - c.last, 100);
      c.last = now;
      if (!c.paused && c.visible) c.t = (c.t + dt) % CYCLE;

      // কোন phase চলছে
      let acc = 0;
      let idx = 0;
      for (; idx < PHASES.length; idx++) {
        if (c.t < acc + PHASES[idx].dur) break;
        acc += PHASES[idx].dur;
      }
      const ph = PHASES[Math.min(idx, PHASES.length - 1)];
      const k = (c.t - acc) / ph.dur;

      let dist: number;
      if (ph.kind === "dwell") dist = NODE_X[ph.stage] - NODE_X[0];
      else if (ph.kind === "move") {
        const a = NODE_X[ph.stage] - NODE_X[0];
        const b = NODE_X[ph.stage + 1] - NODE_X[0];
        dist = a + (b - a) * ease(k);
      } else dist = STRAIGHT + (total - STRAIGHT) * ease(k);
      place(dist, total);

      if (ph.stage !== activeRef.current) {
        activeRef.current = ph.stage;
        setActive(ph.stage);
      }
      const isRet = ph.kind === "return";
      if (isRet !== returningRef.current) {
        returningRef.current = isRet;
        setReturning(isRet);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // screen-এর বাইরে গেলে থামে (battery/CPU বাঁচাতে)
    const io = new IntersectionObserver(([e]) => (c.visible = e.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [place]);

  // কোনো ধাপে click করলে সেখানে চলে যায়
  const jump = (i: number) => {
    const c = clock.current;
    activeRef.current = i;
    setActive(i);
    setReturning(false);
    returningRef.current = false;
    if (c.reduce) {
      const loop = loopRef.current;
      if (loop) place(NODE_X[i] - NODE_X[0], loop.getTotalLength());
      return;
    }
    c.t = phaseStart(i * 2);
  };

  const stage = processStages[active];

  return (
    <div
      ref={wrapRef}
      className="panel relative overflow-hidden p-5 sm:p-6"
      onMouseEnter={() => (clock.current.paused = true)}
      onMouseLeave={() => (clock.current.paused = false)}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="mono-label">// How I work</span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" aria-hidden />
          R&amp;D cycle
        </span>
      </div>

      {/* diagram */}
      <div className="relative mt-4 w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <radialGradient id="pkt-glow">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* invisible full loop used for packet positioning */}
          <path ref={loopRef} d={LOOP_PATH} fill="none" stroke="none" />

          {/* base track */}
          <line x1={NODE_X[0]} y1={NODE_Y} x2={NODE_X[3]} y2={NODE_Y} stroke="var(--line-strong)" strokeWidth="2" />
          {/* lit progress */}
          <path
            ref={progressRef}
            d={`M ${NODE_X[0]} ${NODE_Y} L ${NODE_X[3]} ${NODE_Y}`}
            stroke="var(--signal)"
            strokeWidth="2"
            fill="none"
            style={{
              strokeDasharray: STRAIGHT,
              strokeDashoffset: STRAIGHT,
              opacity: returning ? 0 : 1,
              transition: "opacity .5s ease",
            }}
          />
          {/* iterate (return) path */}
          <path
            d={RETURN_PATH}
            fill="none"
            stroke={returning ? "var(--signal)" : "var(--line-strong)"}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            style={{ transition: "stroke .4s ease" }}
          />

          {/* packet */}
          <g ref={packetRef} transform={`translate(${NODE_X[0]} ${NODE_Y})`}>
            <circle r="16" fill="url(#pkt-glow)" />
            <circle r="4.5" fill="var(--signal)" />
          </g>
        </svg>

        {/* iterate label */}
        <span
          className={`pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border bg-panel px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
            returning ? "border-[var(--signal)] text-signal" : "border-line text-muted"
          }`}
          style={{ top: `${(LOOP_Y / VB_H) * 100}%`, transform: "translate(-50%, -50%)" }}
        >
          <RotateCcw className="h-3 w-3" /> iterate
        </span>

        {/* nodes */}
        {processStages.map((s, i) => {
          const Icon = ICONS[i];
          const isActive = i === active && !returning;
          const done = i < active || (returning && i <= 3);
          return (
            <button
              key={s.key}
              onClick={() => jump(i)}
              aria-label={`Stage ${i + 1}: ${s.title}`}
              aria-current={i === active ? "step" : undefined}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${(NODE_X[i] / VB_W) * 100}%`, top: `${(NODE_Y / VB_H) * 100}%` }}
            >
              <span
                className={`relative grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-500 sm:h-14 sm:w-14 ${
                  isActive
                    ? "border-[var(--signal)] bg-[var(--signal)] text-[var(--bg)] shadow-[0_0_0_6px_var(--signal-soft),0_0_24px_-2px_var(--signal)]"
                    : done
                      ? "border-[var(--signal)] bg-panel text-signal"
                      : "border-linestrong bg-panel text-muted group-hover:border-[var(--signal)] group-hover:text-signal"
                }`}
              >
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.8} />
                {isActive && <span className="absolute inset-0 animate-ping rounded-full border border-[var(--signal)] opacity-40 motion-reduce:hidden" />}
              </span>
              <span className="absolute top-full mt-2 flex flex-col items-center whitespace-nowrap">
                <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
                <span className={`font-display text-[13px] font-medium transition-colors sm:text-sm ${i === active ? "text-ink" : "text-muted"}`}>
                  {s.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* active stage detail */}
      <div className="mt-6 rounded-xl border border-line bg-bg2 p-4 sm:p-5" aria-live="polite">
        <div key={stage.key} className="animate-[fadeUp_.45s_ease]">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{stage.title}</h3>
            <span className="font-mono text-[11px] text-muted">
              <span className="text-signal">0{active + 1}</span> / 04
            </span>
          </div>
          <p className="mt-1.5 min-h-[3.2em] text-sm leading-relaxed text-muted">{stage.text}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.chips.map((c) => (
              <li key={c} className="rounded border border-line bg-panel px-2 py-0.5 font-mono text-[11px] text-muted">
                {c}
              </li>
            ))}
          </ul>
        </div>
        {/* step bar */}
        <div className="mt-4 grid grid-cols-4 gap-1.5" aria-hidden>
          {processStages.map((s, i) => (
            <span
              key={s.key}
              className={`h-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-[var(--signal)]" : "bg-[var(--line-strong)]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
