"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Key না থাকলে visitor-এর email app খুলে দেবে
    if (!KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setState("sending");
    data.append("access_key", KEY);
    data.append("subject", `New portfolio message from ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setState("ok");
        form.reset();
      } else setState("error");
    } catch {
      setState("error");
    }
  }

  const input =
    "w-full rounded-lg border border-line bg-bg2 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-[var(--signal)]";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="panel flex flex-col justify-between gap-8 p-6">
        <div>
          <p className="font-display text-2xl font-semibold leading-snug">Have a project, role or idea in mind?</p>
          <p className="mt-3 text-muted">I usually reply within a day or two.</p>
        </div>
        <ul className="space-y-4 text-[15px]">
          <li>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-signal">
              <Mail className="h-5 w-5 text-signal" /> {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-signal" /> {profile.location}
          </li>
          <li className="flex gap-3 pt-2">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-[var(--signal)] hover:text-signal">
              <GithubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-line hover:border-[var(--signal)] hover:text-signal">
              <LinkedinIcon />
            </a>
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit} className="panel space-y-4 p-6">
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">Name</span>
            <input name="name" required maxLength={80} className={input} placeholder="Your name" />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">Email</span>
            <input name="email" type="email" required maxLength={120} className={input} placeholder="you@example.com" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">Message</span>
          <textarea name="message" required rows={5} maxLength={2000} className={`${input} resize-y`} placeholder="Tell me a little about it…" />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={state === "sending"}
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {state === "sending" ? "Sending…" : "Send message"}
          </button>
          {state === "ok" && (
            <span className="inline-flex items-center gap-2 text-sm text-ok" role="status">
              <CheckCircle2 className="h-4 w-4" /> Message sent. Thank you!
            </span>
          )}
          {state === "error" && (
            <span className="inline-flex items-center gap-2 text-sm text-amber" role="alert">
              <AlertCircle className="h-4 w-4" /> Something went wrong. Please email me directly.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
