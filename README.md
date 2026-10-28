# Anjan Kumar Das — Portfolio ("The Engineer's Lab")

Next.js + Tailwind CSS দিয়ে বানানো portfolio, সাথে একটা free AI chatbot।
**কোনো database নেই।** সব তথ্য `data/` folder-এর file-এ থাকে। File বদলে GitHub-এ push করলে site নিজে থেকে update হয়।

---

## ১. প্রথমবার নিজের computer-এ চালানো

1. [Node.js](https://nodejs.org) (LTS version) install করো।
2. এই folder-এ terminal খুলে চালাও:
   ```bash
   npm install
   npm run dev
   ```
3. Browser-এ `http://localhost:3000` খোলো।

> Chatbot আর contact form local-এ চালাতে চাইলে `.env.example` কপি করে নাম দাও `.env.local`, তারপর key বসাও (নিচে ৫ নম্বর অংশ দেখো)।

---

## ২. কোন তথ্য কোথায় বদলাবে

| কী বদলাতে চাও | কোন file |
|---|---|
| নাম, tagline, email, LinkedIn, GitHub, Behance, About-এর লেখা, Education | `data/profile.ts` |
| চাকরি (Company X / Company Y-এর আসল নাম, তারিখ) | `data/experience.ts` |
| Project | `data/projects.ts` |
| Design-এর কাজ, case study | `data/design.ts` |
| Skills | `data/skills.ts` |
| Achievements, Certificates | `data/achievements.ts` |
| Chatbot-এর বাড়তি তথ্য, suggestion প্রশ্ন | `data/chatbot.ts` |

যেসব জায়গায় dummy তথ্য আছে, সেখানে `// TODO` লেখা আছে। VS Code-এ `Ctrl+Shift+F` চেপে `TODO` খুঁজলে সবগুলো একসাথে পাবে।

**উদাহরণ: Company X-এর আসল নাম বসানো** (`data/experience.ts`)
```ts
company: "Company X",   →   company: "তোমার Company-র নাম",
period: "2026 — Present",   →   period: "Mar 2026 — Present",
```
Hero-র status লাইনটাও বদলাতে ভুলো না: `data/profile.ts` → `status`।

**উদাহরণ: নতুন project যোগ করা** (`data/projects.ts`)
একটা পুরো `{ ... },` block কপি করে list-এ বসাও, তারপর লেখাগুলো বদলাও। Link না থাকলে `github: ""` রাখো, তাহলে button লুকিয়ে যাবে।

---

## ৩. ছবি, CV আর ফাইল বদলানো

সব ছবি আর ফাইল থাকে `public/` folder-এ। নতুন ফাইল রাখার পর `data/` file-এ শুধু path লিখে দাও। Path শুরু হবে `/` দিয়ে, `public` শব্দটা লিখতে হবে না।

| জিনিস | কোথায় রাখবে | কোথায় path লিখবে |
|---|---|---|
| Profile photo | `public/images/profile.jpg` (একই নাম দিলে কিছু বদলাতে হবে না) | `data/profile.ts` → `photo` |
| CV | `public/cv.pdf` (নতুন CV একই নামে রাখো) | `data/profile.ts` → `cv` |
| Project-এর ছবি | `public/projects/tree-vibration.jpg` | `data/projects.ts` → `image: "/projects/tree-vibration.jpg"` |
| Design-এর ছবি | `public/design/campaign-01.webp` | `data/design.ts` → `src: "/design/campaign-01.webp"` |

**ছবির টিপস**
- Design-এর ছবি **WebP** বা JPG রাখো, চওড়ায় ~১৫০০px, আর প্রতিটা ৩০০KB-এর নিচে। [squoosh.app](https://squoosh.app)-এ free-তে compress করা যায়।
- Project-এর ছবি 16:9 অনুপাতে হলে সবচেয়ে সুন্দর দেখায়।
- কাজ শেষে পুরনো `placeholder-*.svg` file-গুলো মুছে দিও।
- অনেক ছবি হলে Cloudinary-তে (free) upload করে তার link-ও `src`-এ বসাতে পারো।

---

## ৪. Free hosting: Vercel-এ deploy

1. [github.com](https://github.com)-এ নতুন repository বানাও (যেমন `portfolio`), তারপর এই folder-টা push করো:
   ```bash
   git init
   git add .
   git commit -m "Portfolio v1"
   git branch -M main
   git remote add origin https://github.com/Anjaankdas/portfolio.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com)-এ **GitHub দিয়ে sign up** করো (Hobby plan, free)।
3. **Add New → Project** → repository বেছে **Import** করো → **Deploy** চাপো।
4. ১–২ মিনিট পর একটা link পাবে, যেমন `anjan-das.vercel.app`। এই link-টা CV-তে বসাও।
5. এরপর থেকে **যেকোনো পরিবর্তন `git push` করলেই site নিজে থেকে update হবে।**

**GitHub website থেকে সরাসরি update (terminal ছাড়া):**
GitHub-এ repo খুলে file-এ ক্লিক করো → ✏️ (Edit) চাপো → বদলাও → **Commit changes**। ছবি upload করতে চাইলে `public/design` folder খুলে **Add file → Upload files** ব্যবহার করো। এক মিনিটের মধ্যে site update হয়ে যাবে।

---

## ৫. Environment Variables (key বসানো)

Vercel-এ: **Project → Settings → Environment Variables**। প্রতিটা key বসানোর পর **Deployments → Redeploy** চাপতে হবে।

| নাম | কোথা থেকে পাবে | কী কাজ |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | তোমার Vercel link | SEO আর share preview |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com) (email দিলেই key পাবে) | Contact form-এর message তোমার Gmail-এ আসবে |
| `GEMINI_API_KEY` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Chatbot (মূল) |
| `GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) | Chatbot (backup) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | [console.upstash.com](https://console.upstash.com) → Create Database → REST API অংশ | Chatbot spam ঠেকানো |

- Web3Forms key না দিলে Contact form visitor-এর email app খুলে দেবে।
- Chatbot-এর জন্য Gemini বা Groq, অন্তত একটা key লাগবে। দুটো দিলে Gemini ব্যর্থ হলে Groq চলবে।
- Model-এর নাম বদলাতে চাইলে `GEMINI_MODEL` / `GROQ_MODEL` বসাও (Google/Groq নতুন model আনলে)।
- ⚠️ API key কখনো code-এ বা GitHub-এ লিখবে না। শুধু Vercel-এর Environment Variables-এ রাখবে।

---

## ৬. Chatbot কীভাবে জানে

Chatbot নিজে থেকে `data/` folder-এর সব file পড়ে উত্তর দেয়। তাই project বা experience বদলালে chatbot-ও নিজে থেকে বদলে যায়। বাড়তি কিছু জানাতে চাইলে `data/chatbot.ts`-এর `extraInfo`-তে লেখো।

নিয়মগুলো (শুধু তোমার সম্পর্কে বলবে, বানিয়ে বলবে না, R&D project গোপন রাখবে) আছে `lib/knowledge.ts`-এ।

**⚠️ Company-র কোনো গোপন তথ্য কোনো data file-এ কখনো লিখবে না।** Site আর chatbot দুটোই public।

---

## ৭. Custom domain (ইচ্ছা হলে)

Domain কিনলে বা GitHub Student Pack থেকে free পেলে: Vercel → Project → **Settings → Domains** → domain লেখো → যে DNS record দেখাবে সেটা domain provider-এ বসাও। তারপর `NEXT_PUBLIC_SITE_URL` বদলে দাও।

---

## ৮. Google-এ আনা

Deploy-এর পর [Google Search Console](https://search.google.com/search-console)-এ site যোগ করো, তারপর `https://তোমার-link/sitemap.xml` submit করো।

---

## Folder structure

```
app/            page, layout, chatbot API (app/api/chat), SEO (sitemap, robots, share image)
components/     প্রতিটা section-এর design
data/           ← তোমার সব তথ্য এখানে
lib/            chatbot-এর জ্ঞান আর rate limit
public/         ছবি, CV
```
