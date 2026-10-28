import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { DesignGallery, DesignCaseStudies } from "@/components/DesignWork";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { ContactForm } from "@/components/Contact";
import { ChatBot } from "@/components/ChatBot";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-3 focus:py-2 focus:text-[var(--bg)]">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Section id="design" index="04" label="Design Work" title="The visual side" intro="Graphics I've designed for social media, campaigns and brands.">
          <DesignGallery />
          <DesignCaseStudies />
        </Section>
        <Skills />
        <Achievements />
        <Section id="contact" index="07" label="Contact" title="Open a channel">
          <ContactForm />
        </Section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:px-6">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="flex items-center gap-2">
            <span className="led" aria-hidden /> All systems nominal · built with Next.js
          </span>
        </div>
      </footer>
      <ChatBot />
    </>
  );
}
