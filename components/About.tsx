import Image from "next/image";
import { GraduationCap, Languages } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./ui";

export function About() {
  const e = profile.education;
  return (
    <Section id="about" index="01" label="About" title="Engineer by training, builder by habit.">
      <div className="grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
        <Reveal>
          {/* ID-badge style photo card */}
          <div className="panel mx-auto max-w-[280px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>R&amp;D · Lab Access</span>
              <span className="h-2 w-2 rounded-full bg-[var(--ok)]" />
            </div>
            <div className="relative aspect-[301/324] w-full bg-bg2">
              <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill sizes="280px" className="object-cover" priority={false} />
            </div>
            <div className="space-y-1 px-4 py-3">
              <p className="font-display font-semibold">{profile.name}</p>
              <p className="font-mono text-xs text-signal">{profile.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            {profile.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : ""}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="panel p-5">
              <div className="mb-3 flex items-center gap-2 mono-label">
                <GraduationCap className="h-4 w-4" /> Education
              </div>
              <p className="font-medium">{e.degree}</p>
              <p className="text-sm text-muted">{e.institution}</p>
              <p className="mt-2 font-mono text-xs text-muted">
                {e.year} · <span className="text-ink">{e.result}</span>
              </p>
            </div>
            <div className="panel p-5">
              <div className="mb-3 flex items-center gap-2 mono-label">
                <Languages className="h-4 w-4" /> Languages
              </div>
              <ul className="space-y-1">
                {profile.languages.map((l) => (
                  <li key={l} className="text-sm">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
