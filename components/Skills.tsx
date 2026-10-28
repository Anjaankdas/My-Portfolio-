import { skills } from "@/data/skills";
import { Section } from "./Section";
import { Reveal } from "./ui";

export function Skills() {
  return (
    <Section id="skills" index="05" label="Skills" title="Component inventory" intro="The parts I build with.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.id} delay={(i % 3) * 60}>
            <div className="panel h-full p-5">
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <span className="font-mono text-[11px] text-muted">{g.id}</span>
              </div>
              <ul className="flex flex-wrap gap-x-3 gap-y-4">
                {g.items.map((s) => (
                  <li key={s.name} className="chip px-3 py-1.5 font-mono text-xs transition-colors">
                    {s.name}
                    {s.learning && <span className="ml-1.5 text-[10px] uppercase text-amber">· learning</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
