import { Lock } from "lucide-react";
import { experience } from "@/data/experience";
import { Section } from "./Section";
import { Reveal } from "./ui";

export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Signal timeline" intro="Where I've worked and what I've done there.">
      <ol className="relative ml-2 border-l border-linestrong pl-8 sm:ml-4 sm:pl-10">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.role}`} className="relative pb-10 last:pb-0">
            {/* pulse node on the trace */}
            <span
              className={`absolute -left-[41px] top-6 grid h-4 w-4 place-items-center rounded-full border-2 sm:-left-[49px] ${
                job.current ? "border-[var(--signal)] bg-[var(--bg)]" : "border-linestrong bg-[var(--bg)]"
              }`}
              aria-hidden
            >
              {job.current && <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] shadow-[0_0_8px_var(--signal)]" />}
            </span>

            <Reveal delay={i * 60}>
              <article className="panel p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                    <p className="mt-0.5 text-muted">
                      {job.company} · <span className="text-sm">{job.type}</span>
                    </p>
                  </div>
                  <span
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
                      job.current ? "border-[var(--signal)] bg-signalsoft text-signal" : "border-line text-muted"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-[var(--signal)]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {job.tags.map((t) => (
                    <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                  {job.confidential && (
                    <span className="inline-flex items-center gap-1.5 rounded border border-[var(--amber)] bg-ambersoft px-2 py-0.5 font-mono text-[11px] text-amber">
                      <Lock className="h-3 w-3" /> Project details confidential until release
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
