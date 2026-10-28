import { buildSystemPrompt } from "@/lib/knowledge";
import { checkRateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

const MAX_QUESTION = 300; // প্রশ্নের সর্বোচ্চ অক্ষর
const MAX_HISTORY = 6; // শুধু শেষ কয়েকটা message পাঠানো হয়

const text = (body: string, status = 200) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  // ---- input যাচাই ----
  let messages: Msg[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return text("Bad request", 400);
  }
  messages = messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_QUESTION : 1500) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") return text("Bad request", 400);

  // ---- rate limit ----
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "anon";
  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    return text(
      rl.reason === "day"
        ? "You've reached today's question limit. Please email Anjan directly — see the Contact section."
        : "Too many questions at once — please wait a minute and try again.",
      429
    );
  }

  const system = buildSystemPrompt();

  // ---- Gemini আগে, ব্যর্থ হলে Groq ----
  const providers = [streamGemini, streamGroq];
  for (const provider of providers) {
    try {
      const stream = await provider(system, messages);
      if (stream) return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
    } catch (err) {
      console.error(`[chat] ${provider.name} failed:`, err);
    }
  }

  return text(
    "The assistant is offline right now. You can reach Anjan through the Contact section below.",
    503
  );
}

// ---------- SSE helper: provider-এর stream থেকে শুধু text বের করে ----------
function sseToText(body: ReadableStream<Uint8Array>, pick: (json: any) => string | undefined): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const l = line.trim();
            if (!l.startsWith("data:")) continue;
            const data = l.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const piece = pick(JSON.parse(data));
              if (piece) controller.enqueue(encoder.encode(piece));
            } catch {}
          }
        }
      } catch (e) {
        console.error("[chat] stream error", e);
      } finally {
        controller.close();
      }
    },
  });
}

// ---------- Google Gemini (free tier) ----------
async function streamGemini(system: string, messages: Msg[]) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Gemini ${res.status}: ${await res.text().catch(() => "")}`);
  return sseToText(res.body, (j) => j?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || "").join(""));
}

// ---------- Groq (free tier, backup) ----------
async function streamGroq(system: string, messages: Msg[]) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.4,
      max_tokens: 700,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });
  if (!res.ok || !res.body) throw new Error(`Groq ${res.status}: ${await res.text().catch(() => "")}`);
  return sseToText(res.body, (j) => j?.choices?.[0]?.delta?.content);
}
