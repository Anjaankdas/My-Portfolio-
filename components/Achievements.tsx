import { Award, ExternalLink, Trophy } from "lucide-react";
import { achievements, certifications } from "@/data/achievements";
import { Section } from "./Section";
import { Reveal } from "./ui";

export function Achievements() {
  return (
    <Section id="achievements" index="06" label="Achievements" title="Milestones & certifications">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="panel p-5 sm:p-6">
            <div className="mono-label mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4" /> Achievements
            </div>
            <ul className="divide-y divide-[var(--line)]">
              {achievements.map((a) => (
                <li key={a.title} className="flex items-start gap-4 py-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--amber)] shadow-[0_0_8px_var(--amber)]" aria-hidden />
                  <span className="flex-1 text-[15px]">{a.title}</span>
                  {a.year && <span className="font-mono text-xs text-muted">{a.year}</span>}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-4">
            <div className="mono-label flex items-center gap-2">
              <Award className="h-4 w-4" /> Certifications
            </div>
            {certifications.map((c) => (
              <div key={c.title} className="panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium leading-snug">{c.title}</h3>
                  <span
                    className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase ${
                      c.status === "Ongoing" ? "bg-ambersoft text-amber" : "bg-signalsoft text-signal"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-signal hover:underline">
                    View certificate <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
