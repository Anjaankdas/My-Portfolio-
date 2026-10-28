import type { ReactNode } from "react";
import { Reveal } from "./ui";

export function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby={`${id}-title`}>
      <Reveal>
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <span className="mono-label whitespace-nowrap">
              // {index} — {label}
            </span>
            <span className="trace flex-1" aria-hidden />
            <span className="h-2 w-2 rotate-45 border border-[var(--signal)]" aria-hidden />
          </div>
          <h2 id={`${id}-title`} className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
