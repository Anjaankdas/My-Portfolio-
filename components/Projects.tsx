import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "./Section";
import { Reveal } from "./ui";
import { GithubIcon } from "./icons";

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Projects"
      title="From the lab bench"
      intro="Blockchain, IoT and robotics projects, each with a datasheet of what's inside."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 80}>
            <article className="panel group flex h-full flex-col overflow-hidden transition-colors hover:border-[var(--signal)]">
              <div className="relative aspect-video overflow-hidden border-b border-line bg-bg2">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded bg-bg/85 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-signal backdrop-blur">
                  {p.category}
                </span>
                <span className="absolute right-3 top-3 rounded bg-bg/85 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">
                  {p.status}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>

                {/* datasheet */}
                <div className="mt-5 overflow-hidden rounded-lg border border-line">
                  <div className="border-b border-line bg-bg2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                    Datasheet
                  </div>
                  <dl className="divide-y divide-[var(--line)] font-mono text-xs">
                    {p.specs.map((s) => (
                      <div key={s.label} className="grid grid-cols-[96px_1fr] gap-3 px-3 py-2">
                        <dt className="text-muted">{s.label}</dt>
                        <dd className="text-ink">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>

                {(p.github || p.demo) && (
                  <div className="mt-auto flex gap-4 pt-5">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline">
                        <GithubIcon className="h-4 w-4" /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline">
                        <ExternalLink className="h-4 w-4" /> Live demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
