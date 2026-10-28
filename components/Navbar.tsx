"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { navLinks, profile } from "@/data/profile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--signal)] text-signal">AK</span>
          <span className="hidden sm:inline">
            anjan<span className="text-signal">.lab</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-md px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                    isActive ? "text-signal" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition-colors hover:border-[var(--signal)] hover:text-signal"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={profile.cv}
            download
            className="hidden items-center gap-2 rounded-md bg-signal px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--bg)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> CV
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-md border border-line md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-[var(--bg)] md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-wider text-muted hover:text-signal"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} download className="mt-2 inline-flex items-center gap-2 py-3 font-mono text-sm uppercase text-signal">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* scroll progress = signal trace */}
      <div className="h-[2px] w-full bg-transparent" aria-hidden>
        <div className="h-full bg-signal shadow-[0_0_8px_var(--signal)]" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
