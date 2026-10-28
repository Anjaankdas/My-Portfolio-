import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { RnDPipeline } from "./RnDPipeline";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 pb-16 pt-28 sm:px-6">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-line bg-panel px-3 py-1.5 font-mono text-xs text-muted">
            <span className="led" aria-hidden />
            {profile.status}
          </div>

          <p className="mono-label mb-3">// hello, world — I&apos;m</p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-2xl font-medium text-signal sm:text-3xl">{profile.role}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-linestrong px-5 py-3 font-medium transition-colors hover:border-[var(--signal)] hover:text-signal"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-muted">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
            <span className="h-4 w-px bg-[var(--line-strong)]" aria-hidden />
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-signal">
              <GithubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-signal">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <RnDPipeline />
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-signal md:flex"
      >
        scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
