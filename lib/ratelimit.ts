import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Spam ঠেকানো: প্রতি IP থেকে মিনিটে ৫টা আর দিনে ৩০টা প্রশ্ন।
 * Upstash env থাকলে সেটা ব্যবহার করে (সব server instance-এ কাজ করে),
 * না থাকলে memory-তে সাধারণ limit (শুধু local test-এর জন্য ভালো)।
 */
const PER_MINUTE = 5;
const PER_DAY = 30;

const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstash ? Redis.fromEnv() : null;
const minuteLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(PER_MINUTE, "1 m"), prefix: "chat:min" })
  : null;
const dayLimiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(PER_DAY, "1 d"), prefix: "chat:day" }) : null;

const memory = new Map<string, number[]>();

export async function checkRateLimit(ip: string): Promise<{ ok: boolean; reason?: string }> {
  if (minuteLimiter && dayLimiter) {
    const [m, d] = await Promise.all([minuteLimiter.limit(ip), dayLimiter.limit(ip)]);
    if (!d.success) return { ok: false, reason: "day" };
    if (!m.success) return { ok: false, reason: "minute" };
    return { ok: true };
  }

  const now = Date.now();
  const hits = (memory.get(ip) || []).filter((t) => now - t < 86_400_000);
  if (hits.length >= PER_DAY) return { ok: false, reason: "day" };
  if (hits.filter((t) => now - t < 60_000).length >= PER_MINUTE) return { ok: false, reason: "minute" };
  hits.push(now);
  memory.set(ip, hits);
  if (memory.size > 5000) memory.clear();
  return { ok: true };
}
