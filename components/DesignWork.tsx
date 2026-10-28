"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { designCategories, designWork, designCaseStudies } from "@/data/design";
import { profile } from "@/data/profile";
import { BehanceIcon } from "./icons";

type Cat = (typeof designCategories)[number];

export function DesignGallery() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = cat === "All" ? designWork : designWork.filter((d) => d.category === cat);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Design categories">
          {designCategories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                cat === c ? "border-[var(--signal)] bg-signalsoft text-signal" : "border-line text-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {profile.behance && (
          <a href={profile.behance} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-signal">
            <BehanceIcon className="h-4 w-4" /> More on Behance
          </a>
        )}
      </div>

      {/* masonry columns: artwork-ই মূল আকর্ষণ */}
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {items.map((d, i) => (
          <button
            key={d.src + d.title}
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-line bg-panel text-left [break-inside:avoid]"
            aria-label={`Open ${d.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.src} alt={d.title} loading="lazy" className="block w-full transition-transform duration-500 group-hover:scale-[1.04]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {d.title}
              <span className="block font-mono text-[10px] uppercase tracking-wider text-white/70">{d.category}</span>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
        >
          <button onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.title} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white">
              {current.title}
              {current.client && <span className="text-white/60"> · {current.client}</span>}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}

export function DesignCaseStudies() {
  if (designCaseStudies.length === 0) return null;
  return (
    <div className="mt-14">
      <p className="mono-label mb-5">// Selected case studies</p>
      <div className="grid gap-6 md:grid-cols-2">
        {designCaseStudies.map((c) => (
          <article key={c.title} className="panel overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <dl className="mt-3 space-y-3 text-sm">
                {[
                  ["Brief", c.brief],
                  ["Approach", c.approach],
                  ["Result", c.result],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-signal">{k}</dt>
                    <dd className="mt-0.5 text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
