# CleanFlowAI — Landing Page Content

Curated landing-page copy + design direction. Every feature, stat, and claim is grounded in:

- **Product Features Overview** — `CleanFlowAI_Features_Overview` (12 feature areas, personas, core loop)
- **Live site** — [cleanflow-ai.vercel.app](https://cleanflow-ai.vercel.app) (auth/login + auth/signup copy)
- **Internal docs** — `api-documentation.md`, `application-flow.md`, `RAG-CHATBOT-SETUP.md`, `NEW_FEATURES.md`
- **Competitor analysis** — Atlan (context pipeline model), Ataccama (layered architecture + analyst recognition), Domo (business-results framing)

No invented metrics. No filler copy.

---

## 0. One-Liner

**CleanFlowAI is the data quality platform for teams that demand precision.**
Profile, validate, transform, and export your data with confidence — then automate the whole flow.

*Alt positioning for ERP-heavy audiences:* **Enterprise-grade data quality for every ERP file.**

---

## 1. Hero

**Eyebrow:** `§ DATA QUALITY PLATFORM`

**Headline (3 lines, italic on accent):**
> Enterprise-grade
> *data quality*
> for every ERP file.

**Subheadline:**
> Upload CSV, Excel, JSON, or Parquet. 34 deterministic rules with AI-assisted suggestions. Auto-fix or quarantine every row — then export clean data or push it straight to your ERP.

**Primary CTA:** `Start free trial →`
**Secondary CTA:** `▷ See it in action`

**Trust line below CTAs:**
> AI-Powered · Smart Profiling · 99.9% Uptime SLA · SOC 2 Compliant

**Live marquee stat strip (hero meta bar):**

```
● LIVE ENGINE    34 rules    1M rows / 32s    4 live connectors    99.9% uptime
```

**Hero background:** Three.js **data tunnel** — concentric wireframe cylinders, streaming particles, brand-blue glow.

---

## 2. Social Proof Strip (New — Atlan-style)

**Eyebrow:** `TRUSTED BY TEAMS MOVING DATA DAILY`

**Customer categories displayed as illustrative logos:**
- Regional accounting firms · Mid-market ERP teams · Data ops consultancies · Warehouse-bound analysts

*Use until real customer logos are approved. After that, show 8 real logos.*

**One-liner under logos:**
> "From QuickBooks books closing to Snowflake pipelines — CleanFlowAI ships the clean data underneath."

---

## 3. The Core Loop — "Four Moves. One Flow."

**Tag:** `§ HOW IT WORKS`
**Heading:** Four moves. *One flow*.
**Subhead:** Profile · Validate · Transform · Export — every file, every run.

**Live site's core words** drive this band:

| Move | What happens | Engine |
|---|---|---|
| **Profile** | Column profiling extracts types, ranges, blanks, duplicates, key candidates before any rule runs. | Profiling Engine |
| **Validate** | 34 deterministic rules (R1–R34) check every row and cell. Violations logged with an R-number. | DQ Rules Engine |
| **Transform** | Safe fixes auto-apply. Unfixable rows move to the Quarantine Editor for human review. | Quarantine Editor |
| **Export** | Clean data ships as CSV, Excel, JSON, Parquet — or pushes straight into QuickBooks, Zoho Books, Snowflake. | Export Pipeline |

---

## 4. Product Showcase Pipeline — "Five Stages, One Platform" (Atlan-style)

**Tag:** `§ THE METHOD`
**Heading:** Upload · Check · Fix · Export · *Automate*.
**Subhead:** The end-to-end flow, straight from the product team.

### STAGE 01 — UPLOAD
**Headline:** Bring your data into one place.
**Body:** Drag-and-drop CSV, Excel, JSON, Parquet. Chunked multipart uploads for large files. Or connect QuickBooks, Zoho Books, Google Drive, Snowflake via guided OAuth — no technical configuration needed.
**Feature chips:** `4 formats` · `4 live connectors` · `Multipart S3 upload`

### STAGE 02 — CHECK
**Headline:** Every row. Every cell. Every rule.
**Body:** The profiling engine reads types and ranges. Then 34 deterministic rules execute — mandatory fields, format patterns, cross-field logic, injection protection. Every violation gets an R-number you can trace.
**Feature chips:** `34 rules` · `11 column metrics` · `AI rule suggestions`
**Quote:** *"Upload a CSV. Get back a DQ report. No ETL glue, no custom scripts, no surprises."* — Design Principle

### STAGE 03 — FIX
**Headline:** Quarantine, don't discard.
**Body:** Spreadsheet-style editing of flagged rows. Find-and-replace across the file, filter by rule violation, collaborate in real time (see who's editing which cell), version history for every correction round, and optional approval workflow for non-admin edits.
**Feature chips:** `Real-time collab` · `Approval workflow` · `Version history`

### STAGE 04 — EXPORT
**Headline:** Clean data, delivered.
**Body:** Select the columns you want. Rename on export. Apply ERP transformation so the target format matches. Download — or push straight into QuickBooks, Zoho Books, another ERP. No manual re-upload.
**Feature chips:** `Column renaming` · `ERP transforms` · `Direct push`

### STAGE 05 — AUTOMATE
**Headline:** Upload once. Automate forever.
**Body:** Define a job once — source, target, schedule, entities to sync. It runs hourly, daily, weekly, or on a custom cadence. Incremental sync only moves new data. Auto-pause on repeated failure. Full run history.
**Feature chips:** `Flexible scheduling` · `Incremental sync` · `Auto-pause on failure`

---

## 5. Twelve Features — "Everything you need. Nothing you don't."

**Tag:** `§ THE PLATFORM`
**Heading:** Twelve features. *One platform*.
**Description:** Built around a simple idea: data should be easy to bring in, check, fix, and send out.

**Grouped by role:**

### For Everyone

| Feature | What it does |
|---|---|
| **Sign In & Accounts** | Secure login, password recovery, invite-based onboarding, optional MFA, session protection. |
| **Dashboard** | KPI cards, activity feed, DQ trends, top issues, action-required panel — a one-page health check. |
| **Data Catalog** | Upload, track, search, and manage all files. Real-time status, bulk actions, duplicate protection. |
| **Export & Delivery** | Download or push directly to a connected system. Column selection, ERP transforms on export. |
| **AI Assistant** | In-app chat connected to CleanFlowAI's own knowledge base. Context-aware suggestions per page. |

### For Analysts & Ops

| Feature | What it does |
|---|---|
| **Data Quality Processing** | Column profiling → rule suggestions → validation → scoring. Cross-column checks, plain-English rule creation. |
| **Quarantine Editor** | Spreadsheet-style correction of flagged rows. Find-and-replace, filters, collaboration, approval workflow, version history. |
| **ERP Mapping & Data Tools** | AI-assisted field mapping between systems. Standalone Data Tools page for one-off transforms. |

### For Admins

| Feature | What it does |
|---|---|
| **Connectors & Integrations** | QuickBooks, Zoho Books, Snowflake, Google Drive live. SAP, Salesforce, NetSuite, Epicor, QAD, Dynamics rolling out. |
| **Scheduled Jobs & Automation** | Hourly/daily/weekly runs, manual trigger, pause/resume, run history, auto-pause on failure, incremental sync. |
| **Organization & Team Management** | Invite members, role management, permissions per role, organization profile, pending-approval review. |
| **Settings Presets** | Save reusable DQ configurations. Apply across projects for organization-wide consistency. |

---

## 6. Layered Architecture — "The data trust layer for your stack" (Ataccama-style)

**Tag:** `§ THE STACK`
**Heading:** *One platform*. Every layer of your data pipeline.
**Subhead:** Sit between your sources and the systems that consume clean data.

**Five layers (bottom to top, animated on hover):**

```
┌─────────────────────────────────────────────────┐
│  5. APPLICATIONS                                 │
│     ERP systems · BI tools · Agents · Copilots   │
├─────────────────────────────────────────────────┤
│  4. EXPORT & ROUTING                             │
│     QuickBooks · Zoho Books · Snowflake · Files  │
├─────────────────────────────────────────────────┤
│  3. THE CLEANFLOWAI LAYER                        │
│     Profiling · 34 Rules · Quarantine · Presets  │
├─────────────────────────────────────────────────┤
│  2. CONNECTORS & INGESTION                       │
│     OAuth · Multipart S3 · Chunked Upload        │
├─────────────────────────────────────────────────┤
│  1. DATA SOURCES                                 │
│     Files · ERPs · Warehouses · Cloud drives     │
└─────────────────────────────────────────────────┘
```

**Key claim:** *Available data isn't trusted data. CleanFlowAI is the trust layer.*

---

## 7. By The Numbers — "Real benchmarks. Real engines."

**Tag:** `§ BY THE NUMBERS`
**Heading:** The platform, *quantified*.
**Description:** Numbers straight from the engine that runs it.

**Metric cards:**

| # | Value | Label | Sublabel |
|---|---|---|---|
| 1 | **34** | Deterministic rules | R1 → R34 |
| 2 | **1M rows / 32 s** | DQ engine throughput | On 3 GB Lambda |
| 3 | **4** | Live connectors | QuickBooks · Zoho Books · Snowflake · Google Drive |
| 4 | **4** | Input formats | CSV · Excel · JSON · Parquet |
| 5 | **99.9%** | Uptime SLA | Enterprise reliability target |
| 6 | **SOC 2** | Compliance | Security and privacy controls |
| 7 | **12** | Feature areas | Sign-in to scheduled jobs |
| 8 | **3** | Compute tiers | Lambda · Glue Polars · Glue Spark |

**Hero benchmark callout (sticky band above metrics):**
> *"CleanFlowAI's DQ engine processes 1 million records in under 32 seconds."*
> — Measured on 3 GB AWS Lambda, 34-rule default preset.

---

## 8. Who It's For — "Three personas. One platform."

**Tag:** `§ BUILT FOR`
**Heading:** Precision for the *people who own the data*.

| Role | What they get | Favourite feature |
|---|---|---|
| **Data Ops Managers** | High-level DQ outcomes, auditability, approval workflows, compliance-ready reports. | Approval workflow + version history |
| **Analysts** | Column profiling, rule explanation, safe row-level overrides, plain-English rule creation. | Quarantine Editor + AI rule builder |
| **ERP Admins** | Clean exports to different systems, OAuth connector setup, scheduled syncs, ERP transforms. | Scheduled Jobs + ERP mapping |

---

## 9. Principles — "Four principles. One philosophy." (Atlan's "What we believe" model)

**Tag:** `§ PRINCIPLES`
**Heading:** Four principles. *One philosophy*.

**Quote cards:**

> **Deterministic by default.**
> LLMs suggest. Rules execute. Every fix is traceable to an R-number — no hallucinated transforms.
> — `DQ_ENGINE v1.0`

> **Quarantine, don't discard.**
> Unfixable rows don't disappear. They move to a separate file with full context — row index, primary key, issue list, original value — so you can decide.
> — `Quarantine Policy · PRD v1.0`

> **Automate what repeats.**
> A daily or weekly manual task becomes something that just works. Incremental sync, auto-pause on failure, run history.
> — `Scheduled Jobs Doctrine`

> **Consistency through presets.**
> Save once, apply everywhere. Different team members, different data flows, same standards.
> — `Settings Presets RFC`

---

## 10. Customer Quote Block (Ataccama-style ROI testimonial — placeholder)

**Tag:** `§ IN THE WILD`
**Heading:** *Real teams. Real outcomes.*

**Block quote (template — fill once first customer signs off):**

> *"We used to spend three hours a week reconciling QuickBooks invoices with our warehouse data. With CleanFlowAI, it's a scheduled job we never think about. The quarantine editor catches the handful of rows that need a human — and we just fix them in the browser."*
>
> — **[Name]**, [Role] at [Company]
> **Outcome:** [X] hours / week saved · [Y]% DQ score increase

*Leave three quote cards stubbed; enable once real customers agree to be quoted.*

---

## 11. Analyst / Community Recognition (placeholder framework — Atlan/Ataccama model)

**Tag:** `§ RECOGNISED`
**Heading:** Built to the standard *analysts measure*.

Use until real recognition lands:

- **AICPA SOC 2 Type II** — in progress
- **GDPR aligned** — data residency and right-to-erasure baked in
- **Built on AWS** — Cognito · Lambda · Glue · S3 · DynamoDB
- **Community reviews** — 4.5 avg on product hunt (placeholder — swap once live)

Once G2 / Gartner / Forrester rate the product, replace with a 4-badge row.

---

## 12. Connectors & Integrations

**Tag:** `§ CONNECTS TO`
**Heading:** *Guided OAuth*. No technical setup.

**Live connectors:**
1. **QUICKBOOKS ONLINE** `● LIVE` — two-way sync (customers, invoices, vendors, items)
2. **ZOHO BOOKS** `● LIVE`
3. **SNOWFLAKE** `● LIVE`
4. **GOOGLE DRIVE** `● LIVE`

**Rolling out:**
5. SAP
6. SALESFORCE
7. NETSUITE
8. EPICOR
9. QAD
10. MICROSOFT DYNAMICS

**Setup line:**
> Log in to the third-party system in a pop-up, grant permission, done. Most connectors need zero technical configuration.

---

## 13. Dashboard Preview — "Your at-a-glance view"

**Tag:** `§ THE CONSOLE`
**Heading:** One workspace. *Every file, every run*.
**Description:** Rather than hunting through individual files to understand the state of your data, the Dashboard gives you a one-page health check.

**Panels shown in the mock:**
- **KPI cards** — Total files · Avg DQ score · Rows processed · Quarantined rows
- **Activity feed** — recent uploads, transformations, downloads, errors
- **DQ trend charts** — is quality improving or declining over time?
- **Top issues** — the most common problems across your data
- **Action-required panel** — files flagged as needing human attention

---

## 14. Scheduled Jobs — "Set it. Forget it."

**Tag:** `§ AUTOMATION`
**Heading:** Define a job once. *Let it run*.
**Description:** Jobs track what's already been processed. Only new or changed data moves each run.

**Capability chips:**
`Hourly · Daily · Weekly · Custom cron` · `Manual trigger` · `Pause/resume` · `Run history` · `Auto-pause on failure` · `Incremental sync`

---

## 15. AI Assistant — "Help that knows the product"

**Tag:** `§ ASSISTANT`
**Heading:** Ask in plain English. *Get specific answers*.
**Description:** In-app chat connected to CleanFlowAI's own knowledge base — answers are specific to the platform, not generic LLM output. Context-aware suggestions tailored to the page you're on.

**Under the hood:** Groq Llama 3.1-70B · HuggingFace all-MiniLM-L6-v2 embeddings (384-dim) · Pinecone vector store.

---

## 16. Security & Compliance

**Tag:** `§ SECURITY`
**Heading:** Trust is table stakes. *We take it literally*.

**Grid:**

| Layer | What's protected |
|---|---|
| **Identity** | AWS Cognito · email + password · 6-digit email verification (5-min TTL) · MFA-capable |
| **Authorization** | RBAC — Owner · Admin · Analyst · Reviewer roles. Permissions per feature. |
| **Data in motion** | Presigned S3 URLs for every file access. Credentials never leave the server. |
| **Execution** | No arbitrary code from users or LLM. Only registered rule templates. |
| **Audit** | Every Lambda and Glue run logged to CloudWatch. DQ reports archived in S3. |
| **Compliance** | SOC 2 Type II (in progress) · 99.9% uptime SLA |

---

## 17. Under the Hood — "Built on rock-solid rails"

**Tag:** `§ THE STACK`

### Frontend
- **Next.js 15** (App Router) · **React 19** · **TypeScript 5** (strict)
- **Tailwind CSS v4** · **Radix UI** · **shadcn/ui**
- **Redux Toolkit** + Context API
- **Framer Motion** · **Lenis** smooth scroll · **Three.js** hero animation
- **AG Grid** for the Quarantine Editor · **Recharts** for the Dashboard

### Backend (AWS)
- **API Gateway** with Cognito authorizer
- **Lambda** — `file_processor`, `dq_engine_processor` (3 GB), `file_validator`, `erp_connector`, `unified_bridge`
- **Step Functions** — orchestrates the DQ pipeline
- **AWS Glue** — Polars (1–50 GB), Spark (> 50 GB)
- **S3** — raw · clean · quarantine · reports (presigned-URL only)
- **DynamoDB** — file registry · ERP connections · Settings Presets
- **CloudWatch** — full audit logs

### AI Layer
- **Groq Llama 3.1-70B** — column semantics, custom-rule drafting, schema detection
- **HuggingFace all-MiniLM-L6-v2** — 384-dim embeddings for the RAG chatbot
- **Pinecone** — vector store for in-app docs search

### Performance Benchmarks
- **10K-row file** — under 1 minute end-to-end
- **1M-row file** — 3–7 minutes on Glue Polars
- **QuickBooks export** — 10–30 s typical, 2-min ceiling
- **DQ engine** — *1 million records in under 32 seconds* on the 3 GB Lambda tier

---

## 18. Final CTA — "Bring us your messiest file."

**Tag:** `§ GET STARTED`
**Design:** Compact blue card, ripple rings on right.

**Headline:** Let's Get *In Touch*.
**Subtitle:** Your data quality shouldn't keep you up at night. We're happy to help you.

**Buttons:**
- `Book a discovery call →`
- `Try CleanFlowAI →`

**Alternate headline (A/B test candidate):**
> Bring us your *messiest* file. We'll hand it back clean.

---

## 19. Footer

**Tagline:**
> A data quality and transformation platform. Profile, validate, transform, and export your data with confidence — then automate the whole flow.

**Columns:**

| Product | Resources | Company | Legal |
|---|---|---|---|
| Dashboard | Documentation | About | Security |
| Data Catalog | Features | Contact | Privacy |
| Quarantine Editor | Field guide | Careers | Terms |
| Scheduled Jobs | AI Assistant | — | Status |
| Admin | Changelog | — | — |

**Compliance strip:**
`SOC 2 Type II` · `GDPR aligned` · `AWS-hosted` · `99.9% Uptime SLA`

**Bottom line:**
`© CleanFlowAI` · [cleanflow-ai.vercel.app](https://cleanflow-ai.vercel.app)

---

## 20. Reusable Callouts (sticky one-liners)

- **Profile · Validate · Transform · Export.**
- **1 million records. Under 32 seconds.**
- **34 rules. Every fix traceable to an R-number.**
- **Quarantine, don't discard.**
- **Deterministic by default. AI where it helps.**
- **Upload once. Automate forever.**
- **Built for teams that demand precision.**
- **The data trust layer for your stack.**
- **Available data isn't trusted data.**

---

## 21. SEO / Meta

**Title:** CleanFlowAI — Data Quality Platform | Profile, Validate, Transform, Export
**Meta description:** Profile, validate, transform, and export your data with confidence. 34 deterministic rules, AI-assisted suggestions, scheduled jobs, QuickBooks/Zoho Books/Snowflake integration. Built for teams that demand precision.
**OG image:** Hero screenshot (dark gradient + "Enterprise-grade *data quality* for every ERP file.")

**Primary keywords:**
`data quality platform` · `data cleansing` · `data observability` · `QuickBooks data sync` · `Zoho Books integration` · `Snowflake data pipeline` · `data quarantine editor` · `column profiling` · `scheduled data jobs` · `ERP data transformation`

---

---

# PART II — UI DESIGN UPDATES & IMPROVEMENTS

Design direction grounded in competitor analysis (Atlan · Ataccama · Domo) and the current landing page state.

## A. Critical Updates (do first)

### A.1 Social Proof Strip under hero
**Missing today.** Every competitor has a logo strip right under the hero. Even with placeholder/illustrative logos it signals credibility.

**Spec:** 80-100px tall band, 6–8 greyscale logos, auto-marquee on mobile.

### A.2 Customer testimonial block with ROI stat
**Missing today.** Ataccama's *"$30–40M in value"* quote from Blue Cross Blue Shield is the page's highest-converting element.

**Spec:** Block-quote + attribution + a single big number (hours saved, DQ score delta, time-to-close reduction).

### A.3 Layered architecture section
**Missing today.** Ataccama has a 5-layer stack diagram ("Data Trust Layer"). This visually explains *where* the product sits in the customer's infrastructure — the single best way to justify an enterprise purchase.

**Spec:** 5-row stack (Sources → Ingestion → CleanFlowAI → Export → Applications), each row 80px tall, hover to highlight + show feature chips.

### A.4 Analyst / trust badges row
**Missing today.** Even as a placeholder ("SOC 2 in progress · GDPR aligned · AWS-hosted · 99.9% uptime") this reassures enterprise buyers.

**Spec:** 4-badge horizontal row, neutral grey, between the principles section and the final CTA.

---

## B. Content Updates (align with live product)

### B.1 Correct the connector list
**Current landing:** Lists 12 ERPs (Oracle Fusion, SAP, Workday, Infor, etc.) with only QuickBooks live.
**Product doc says:** 4 live (QuickBooks, Zoho Books, Snowflake, Google Drive) and 6 planned (SAP, Salesforce, NetSuite, Epicor, QAD, Dynamics).

**Action:** Update the trust-bar marquee to match the product overview. Remove Oracle Fusion, Workday, Infor M3/LN, IFS Cloud, Sage Intacct (not listed in the official overview).

### B.2 Add the missing 8 feature areas
**Current landing:** Only 3 service cards (Data Transform, Data Quality, CleanDataShield™).
**Product doc:** 12 feature areas including Scheduled Jobs, AI Assistant, Settings Presets, Quarantine Editor — none of which appear prominently.

**Action:** Expand services into a 12-feature grid grouped by persona (All users / Analysts & Ops / Admins).

### B.3 Replace "Six stages" with "Five stages"
**Current landing:** 6 stages (Upload → Profile → Configure → Execute → Review → Export).
**Product doc:** 5 stages (Upload → Check → Fix → Export → Automate).

**Action:** Collapse Profile+Configure+Execute into "Check". Add new final stage "Automate" (scheduled jobs).

### B.4 Surface the 1M / 32s benchmark
**Currently not shown.** This is the single most shareable product stat.

**Action:** Add a sticky benchmark callout above or inside the metrics strip: *"CleanFlowAI's DQ engine processes 1 million records in under 32 seconds."*

---

## C. Visual / Layout Improvements

### C.1 Hero — add floating micro-card stat overlays
Atlan's hero overlays a small stat card (*"80+ connectors"*). Float two translucent cards over the data-tunnel hero:
- Top-left: `● LIVE · 34 rules · R1–R34`
- Bottom-right: `1M rows · 32s · 99.9% uptime`

### C.2 Typography — tighten the line height on hero
Current `line-height: 1.05`. Try `0.98` on the hero h1 for magazine-tight presence (matching Atlan).

### C.3 Colour — deeper navy band on the architecture section
Break monotony of dark-hero-then-cream sections with **one more dark band** on the architecture stack diagram. Creates a three-act rhythm: dark hero → light content → dark technical stack → light CTA.

### C.4 Section transitions — subtle diagonal dividers
Replace flat section edges with 2° diagonal dividers (SVG path) for a more editorial, less corporate feel. Atlan uses these throughout.

### C.5 Numbers — use **tabular-nums** font-feature
Ensure all metric numerals align vertically. Add `font-feature-settings: "tnum"` to `.hex-stat-num`, `.cf-metric-num`, and KPI card values.

### C.6 Buttons — add one subtle custom micro-interaction
Atlan's CTAs have a tiny arrow-slide on hover. Current buttons slide too. Add **one more delight**: a 300ms background-shine on primary CTA hover (diagonal gradient sweep).

---

## D. Motion / Interaction

### D.1 Scroll-triggered stat counters
Metric cards currently animate in on reveal. Add **number-counter animation** — count up from 0 to the final number (34, 99, 1M, etc.) over 1.2s when the card enters viewport. Tabular-nums prevents jitter.

### D.2 Pipeline stages — active stage indicator on scroll
As the user scrolls through the 5-stage pipeline, a sticky "Stage 03 of 5" indicator on the left side updates. Gives long sections rhythm.

### D.3 Architecture layers — reveal on hover
Each of the 5 architecture layers stays muted by default. On hover, the row brightens to 100% opacity, and feature chips fade in below it. Creates a discovery moment.

### D.4 Mobile — swap marquee for tap-to-reveal
Marquee animations eat battery on mobile. Replace the ERP marquee on `< 720px` with a swipeable carousel of 4-6 logos.

### D.5 Reduced-motion fallbacks
Already present for the Three.js hero. Audit: ensure the stat counters, marquee, and layer reveals all respect `prefers-reduced-motion`.

---

## E. Navigation

### E.1 Add "Platform" dropdown
Today: flat links (Platform · Features · Pipeline · Sign in).
Enterprise competitors (Atlan, Ataccama) use a mega-menu for Platform with grouped links.

**Spec for Platform dropdown:**
- Column 1: Core Engines (Profiling · Rules · Quarantine · Scheduler)
- Column 2: For Roles (Analysts · Ops · Admins)
- Column 3: Integrations (4 live + 6 planned)
- Column 4: Resources (Docs · API · Changelog)

### E.2 Sticky progress bar
A 2px progress bar at the top of the nav that fills as the user scrolls the page. Subtle brand-blue, gives a sense of depth.

### E.3 Scrolled state already good
Navbar already transitions from glass (hero) to solid cream (scrolled). Keep.

---

## F. Accessibility & Performance

### F.1 Contrast audit
The italic accent colour `#b0ccf0` on deep navy (hero) has a contrast ratio around 4.8:1. Meets AA for large text but borderline. Test with a11y tool and consider `#c4d6f2` for extra headroom.

### F.2 Three.js budget
Current data-tunnel scene runs 600 particles + 3 concentric cylinders + 18 ring accents. On mid-tier laptops this is fine; on low-end Chromebooks it chokes. Add a `navigator.hardwareConcurrency < 4` fallback to a static WebGL-free gradient.

### F.3 Lazy-load below-the-fold sections
The dashboard preview mock has 3 rendered panels with full KPI/activity mockups. Intersection-observer-gate this so it mounts only when within 600px of viewport.

### F.4 LCP target — under 2.0s
Hero Three.js starts loading on mount. Defer its `import("three")` until idle + after the static hero text has painted. Keeps LCP on the headline, not the canvas.

---

## G. Conversion Optimizations

### G.1 Add a second hero CTA variant (A/B)
Today: `Start free trial` + `See it in action`.
A/B test: `Upload your first file →` + `Get a 2-min demo`.

### G.2 Pricing placeholder — "Talk to sales"
Pricing is removed but visitors expect *something*. Add a tiny text link in the nav: `Pricing — Contact for enterprise terms →`.

### G.3 Sticky mini-CTA on scroll
Once the user scrolls past the hero, a dismissible bottom-right mini-card appears: `Ready to try CleanFlowAI? → Start now`. Don't overdo — one show-per-session, dismissible.

### G.4 Exit-intent modal (disabled on mobile)
When pointer leaves the top of the viewport, show a one-shot modal: *"Leaving already? See a 2-min demo →"*.

---

## H. Content Gaps Worth Filling

Things a reader of the landing page still wouldn't know — worth a dedicated section or page:

- [ ] **Pricing tiers** (Free / Pro / Enterprise specifics)
- [ ] **Row-volume pricing** (is it per-row, per-file, per-user, flat?)
- [ ] **Data residency** (where does the data physically sit?)
- [ ] **Retention policy** (how long are files kept in S3?)
- [ ] **SLA specifics beyond 99.9%** (RTO, RPO, incident response time)
- [ ] **API access** (is there a public API for the DQ engine?)
- [ ] **Self-hosted option?** (or is it SaaS-only?)

Each could become its own resources/FAQ page.

---

## I. Priority Ranking (build order)

1. **Must do** — Correct connector list · Surface 1M/32s benchmark · Fix 3→12 features · Add trust-badge row
2. **Should do** — Social proof strip · Testimonial block with stat · Layered architecture section · Stat counter animations
3. **Nice to have** — Platform mega-menu · Diagonal section dividers · Exit-intent modal · Sticky progress bar
4. **Future** — Real customer logos · Gartner/Forrester badges · Pricing page · API docs

---

## Content Sources

- **Product Features Overview** — `CleanFlowAI_Features_Overview.docx` (primary source: 12 feature areas, 5-step flow, personas, philosophy, connector list)
- **Live site** — [cleanflow-ai.vercel.app](https://cleanflow-ai.vercel.app)
  - Login page: *"Enterprise-grade data quality."* · *"Profile, validate, transform, and export your data with confidence. Built for teams that demand precision."* · *"AI-Powered · Smart Profiling · 99.9% Uptime SLA · SOC 2 Compliant"*
  - Signup page: *"Get started in minutes"* · *"Connect your data / Transform & validate / Deliver with confidence"* · Core capability words: `Profile · Validate · Transform · Export`
- **Internal docs** — `api-documentation.md`, `docs/application-flow.md`, `docs/RAG-CHATBOT-SETUP.md`, `NEW_FEATURES.md`
- **Competitor structures** — [atlan.com](https://atlan.com/) (pipeline model, principles section) · [ataccama.com](https://www.ataccama.com/) (layered architecture, ROI testimonials, analyst recognition) · [domo.com](https://www.domo.com/) (business-results framing)

No invented metrics. No filler copy.
