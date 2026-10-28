"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Bot, Send, X, Terminal } from "lucide-react";
import { greeting, suggestions } from "@/data/chatbot";

type Msg = { role: "user" | "assistant"; content: string };

const MAX = 300;

/** ছোট markdown renderer: **bold**, [link](url), list, line break */
function renderInline(s: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<strong key={k++}>{tok.slice(2, -2)}</strong>);
    else {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const safe = /^(#|\/|https?:\/\/|mailto:)/.test(href) ? href : "#";
      const external = safe.startsWith("http");
      out.push(
        <a key={k++} href={safe} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="text-signal underline underline-offset-2">
          {label}
        </a>
      );
    }
    last = m.index + tok.length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const li = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)/);
        if (li)
          return (
            <div key={i} className="flex gap-2">
              <span className="text-signal">›</span>
              <span>{renderInline(li[1])}</span>
            </div>
          );
        if (!line.trim()) return <div key={i} className="h-2" />;
        return <Fragment key={i}>{<p>{renderInline(line)}</p>}</Fragment>;
      })}
    </>
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim().slice(0, MAX);
    if (!q || busy) return;
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMsgs([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) {
        setMsgs([...history, { role: "assistant", content: "Sorry, I couldn't answer that. Try asking another way, or use the [Contact](#contact) form." }]);
      }
    } catch {
      setMsgs([...history, { role: "assistant", content: "Connection problem. Please try again, or use the [Contact](#contact) form." }]);
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--signal)] bg-panel px-4 py-3 font-mono text-sm text-signal shadow-[0_0_24px_-4px_var(--signal)] transition-transform hover:-translate-y-0.5"
          aria-label="Open chat: ask about Anjan"
        >
          <Terminal className="h-4 w-4" />
          <span>Ask about me</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(640px,calc(100svh-24px))] flex-col overflow-hidden rounded-2xl border border-linestrong bg-panel shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
          role="dialog"
          aria-label="Chat with Anjan's assistant"
        >
          {/* terminal title bar */}
          <div className="flex items-center justify-between border-b border-line bg-bg2 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-2 font-mono text-xs text-muted">anjan@lab:~ ask</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-[14px] leading-relaxed" aria-live="polite">
            <div className="flex gap-2.5">
              <Bot className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
              <p className="text-muted">{greeting}</p>
            </div>

            {msgs.length === 0 && (
              <div className="flex flex-wrap gap-2 pl-7">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-md border border-line px-2.5 py-1.5 text-left text-xs text-muted transition-colors hover:border-[var(--signal)] hover:text-signal"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="font-mono text-[13px]">
                  <span className="text-signal">$ </span>
                  <span>{m.content}</span>
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <Bot className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                  <div className="min-w-0 flex-1 space-y-1 break-words">
                    {m.content ? (
                      <Markdown text={m.content} />
                    ) : (
                      <span className="inline-block h-4 w-2 animate-pulse bg-[var(--signal)]" aria-label="Thinking" />
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line p-3">
            <div className="flex items-center gap-2 rounded-lg border border-line bg-bg2 px-3 focus-within:border-[var(--signal)]">
              <span className="font-mono text-signal">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX))}
                placeholder="Ask about Anjan…"
                className="h-11 flex-1 bg-transparent text-[14px] outline-none focus-visible:outline-none placeholder:text-muted/70"
                aria-label="Your question"
                disabled={busy}
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="text-signal disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-right font-mono text-[10px] text-muted">
              {input.length}/{MAX} · AI can make mistakes
            </p>
          </form>
        </div>
      )}
    </>
  );
}
