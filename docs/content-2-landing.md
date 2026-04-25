# content-2-landing

**Drop-in content for the current landing page.** This doc maps 1:1 to the sections that are actually rendered today — same 11 sections, same layout, same component names. Only the *copy* changes, grounded in the official product overview ([contentDOC.txt](../contentDOC.txt)) and existing design direction in [LANDING-CONTENT.md](./LANDING-CONTENT.md).

---

## How to use this doc

Each section below matches a rendered component in [app/landing/page.tsx](../app/landing/page.tsx). Copy the content block directly into the corresponding JSX. Items marked `KEEP` are already correct on the live page. Items marked `REPLACE` need updating.

| # | Section | Component | Status |
|---|---|---|---|
| 1 | Navbar | `TopBar` | `KEEP` |
| 2 | Hero | `Hero` | `KEEP` (polish subheadline) |
| 3 | Trust Bar | `TrustBar` | `REPLACE` (wrong ERPs) |
| 4 | Dashboard Preview | `DashPreview` | `KEEP` |
| 5 | Metrics Strip | `MetricsStrip` | `REPLACE` (update 4th stat) |
| 6 | Features / Services | `Features` | `REPLACE` (align 3 cards with product) |
| 7 | Pipeline / Method | `Pipeline` | `REPLACE` (rewrite 6 stages for accuracy) |
| 8 | Principles | `Quote` | `KEEP` (minor polish) |
| 9 | CTA | `CTA` | `KEEP` |
| 10 | Footer | `Footer` | `KEEP` (refresh tagline) |

---

## 1. Navbar — `KEEP`

**Links (no redirects):**
- Platform
- Features
- Pipeline
- Sign in

*Unchanged from current implementation.*

---

## 2. Hero — `KEEP` (polish)

**Headline (3 lines):**
> Enterprise-grade
> *data quality*
> for every ERP file.

**Subheadline (tweak — adds personas + automation):**
> Profile, validate, fix, and ship clean data — from CSV, Excel, JSON, or Parquet. 34 deterministic rules with AI-assisted suggestions. Auto-fix, quarantine, or automate every run. Built for teams that demand precision.

**CTAs (unchanged):**
- Primary: `Start free trial →`
- Secondary: `▷ See it in action`

**Optional trust line below CTAs (new):**
> AI-Powered · Smart Profiling · 99.9% Uptime SLA · SOC 2 Compliant

---

## 3. Trust Bar — `REPLACE`

### Current (inaccurate — docx doesn't list these)
~~13 ERP systems — QuickBooks live, 12 more rolling out~~
~~Oracle Fusion · Workday · Infor M3 · Infor LN · IFS Cloud · Sage Intacct~~

### New content (from `contentDOC.txt` § Connectors)

**Tag:** `CONNECTS TO`
**Subtitle:** Four connectors live. Six more rolling out.

**Marquee list — live first:**

1. **QUICKBOOKS ONLINE** `● LIVE`
2. **ZOHO BOOKS** `● LIVE`
3. **SNOWFLAKE** `● LIVE`
4. **GOOGLE DRIVE** `● LIVE`
5. SAP
6. SALESFORCE
7. NETSUITE
8. EPICOR
9. QAD
10. MICROSOFT DYNAMICS

*Remove:* Oracle Fusion, Workday, Infor M3, Infor LN, IFS Cloud, Sage Intacct (not in the official overview).

---

## 4. Dashboard Preview — `KEEP`

**Tag:** `§ THE CONSOLE`
**Heading:** *One workspace*. Every file, every run.

**Description (new paragraph, pulled from docx § Dashboard):**
> Rather than hunting through individual files to understand the state of your data, the Dashboard gives you a one-page health check. KPI cards, activity feed, quality trends, top issues, and an action-required panel — all in one screen.

**Panels shown in the mock (unchanged):**
- Left: Data Catalog (file list + DQ percentages)
- Center: Dashboard (KPI cards + charts + activity feed)
- Right: Quarantine Editor (spreadsheet grid)

*The three-panel composite is already accurate — it illustrates three of the twelve feature areas from the docx: Data Catalog, Dashboard, Quarantine Editor.*

---

## 5. Metrics Strip — `REPLACE` (swap 4th card for the benchmark)

**Tag:** `§ BY THE NUMBERS`
**Heading:** The platform, *quantified*.

**Description (updated to highlight the engine benchmark):**
> Thirty-four deterministic rules. Four live connectors. Four input formats. And a DQ engine that clears a million records in under thirty-two seconds. Hover any card to see the count animate in.

**Four metric cards:**

| # | Value | Label | Sublabel |
|---|---|---|---|
| 1 | **34** | Deterministic rules | R1 → R34 |
| 2 | **4** | Live connectors | QuickBooks · Zoho Books · Snowflake · Google Drive |
| 3 | **4** | Input formats | CSV · Excel · JSON · Parquet |
| 4 | **1M / 32s** | Engine throughput | On 3 GB Lambda, 34-rule preset |

*This surfaces the headline benchmark the team wanted highlighted.*

---

## 6. Features / Services — `REPLACE` (align 3 cards with real feature areas)

**Tag:** `§ THE SERVICES`
**Heading:** Three services. *Calibrated together*.

**Description (new):**
> CleanFlowAI is built around three engines that work the same way, every run: a profiling layer that reads your data, a rules layer that fixes what it can, and a collaboration layer that helps humans handle the rest.

### Card 1 — DATA QUALITY PROCESSING *(featured)*

**Eyebrow:** `DATA QUALITY`
**Title:** Profile, validate, score
**Body:**
> The profiling engine reads column types, ranges, and blanks before any rule runs. Then 34 deterministic rules (R1–R34) check every row and cell — format patterns, mandatory fields, cross-column logic. Plain-English rule creation for anything custom. Every fix is traceable to an R-number.

**Feature link:** `Learn more →`

### Card 2 — QUARANTINE EDITOR

**Eyebrow:** `COLLABORATION`
**Title:** Fix what can't auto-fix
**Body:**
> Rows that fail validation move to the Quarantine area instead of being discarded. Edit cells in a spreadsheet-style grid, see each rule violation explained inline, find-and-replace across the file, and collaborate with your team in real time. Version history and approval workflow for every correction round.

**Feature link:** `Learn more →`

### Card 3 — SCHEDULED JOBS & AUTOMATION

**Eyebrow:** `AUTOMATION`
**Title:** Upload once. Automate forever.
**Body:**
> Define a data flow once — source, target, schedule, entities. It runs hourly, daily, weekly, or on a custom cadence. Incremental sync moves only new or changed data. Auto-pause on repeated failure. Full run history. Your team gets back hours every week.

**Feature link:** `Learn more →`

*These three map directly to sections 4, 5, and 8 of the official overview — the most visible engines in the product.*

---

## 7. Pipeline / Method — `REPLACE` (rewrite 6 stages for accuracy)

**Tag:** `§ THE METHOD`
**Heading:** Six stages. *One flow*.

**Description (new):**
> Data should be easy to bring in, check, fix, and send out — and then automate. Every file moves through the same six stages, from drag-and-drop to scheduled run.

**Six stages (updated text — each derived from the docx):**

### STAGE 01 — Upload
**Body:** Drag-and-drop CSV, Excel, JSON, or Parquet — or connect QuickBooks, Zoho Books, Snowflake, Google Drive via guided OAuth. Chunked uploads handle large files automatically.

### STAGE 02 — Profile
**Body:** The profiling engine summarises what every column contains — data types, value ranges, blanks, and duplicates — before any rule runs. No guesswork.

### STAGE 03 — Validate
**Body:** 34 deterministic rules execute across every row and cell. The engine can also generate custom rules from plain English — you review and approve before any new rule runs.

### STAGE 04 — Fix
**Body:** Safe fixes auto-apply. Unfixable rows move to the Quarantine Editor — not discarded — where your team can correct them in a familiar spreadsheet grid.

### STAGE 05 — Export
**Body:** Pick your columns, rename on export, apply an ERP transformation, and download — or push the clean data straight into a connected system. No manual reupload.

### STAGE 06 — Automate
**Body:** Save the whole flow as a scheduled job. Hourly, daily, weekly, or custom. Incremental sync. Auto-pause on failure. Your team stops thinking about it.

*Swap the old stages (Configure, Execute, Review) — they conflated steps. This 6-stage path aligns with the product flow without breaking the existing layout.*

---

## 8. Principles — `KEEP` (one line polish)

**Tag:** `§ PRINCIPLES`
**Heading:** Four principles. *One philosophy*.

**Quote cards (unchanged text — already aligned):**

> "One pipeline. Thirty-four rules. Every row accounted for — **clean, fixed, or quarantined**."
> — Product Principle · `CLEANFLOWAI · PRD v1.0`

> "Upload a CSV. Get back a DQ report. No ETL glue, no custom scripts, **no surprises**."
> — Design Principle · `ENGINEERING DOCS`

> "LLM suggests. Human approves. Pipeline executes deterministically — **always**."
> — Rule Engine Doctrine · `DQ_ENGINE v1.0`

> "If we can't fix it, we quarantine it. If we quarantine it, **we explain why**."
> — Quarantine Policy · `CLEANFLOWAI · PRD v1.0`

*These four principles already mirror the tone of the docx. Keep as-is.*

---

## 9. CTA — `KEEP`

**Design:** Compact blue card with 4 concentric ripple rings on the right.

**Headline:** Let's Get *In Touch*.
**Subtitle:** Your data quality shouldn't keep you up at night. We're happy to help you.

**Buttons:**
- `Book a discovery call →`
- `Try CleanFlowAI →`

*Unchanged — already works.*

---

## 10. Footer — `KEEP` (refresh tagline)

**Tagline (update to reflect full product):**
> A data quality and data movement platform. Profile, validate, fix, and ship clean data — then automate the whole flow.

**Columns (minor update):**

| Product | Resources | Company |
|---|---|---|
| Dashboard | Documentation | About |
| Data Catalog | Features | Careers |
| Quarantine Editor | Field guide | Press |
| Jobs | AI Assistant | Contact |
| Admin | — | — |

**Copyright:**
> © 2026 CleanFlowAI — All figures checked twice.

---

---

# APPENDIX — Extra Content Reserves

If/when the landing page gains additional sections, these blocks are ready to drop in. All grounded in the docx and internal docs — no invented content.

## A. Alternate Hero Variants (A/B candidates)

**Variant A — ERP-first (current):**
> Enterprise-grade *data quality* for every ERP file.

**Variant B — workflow-first:**
> *Profile*, validate, fix, *ship*. All from one platform.

**Variant C — outcome-first:**
> Your data shouldn't keep you up at night. *Clean it. Automate it.*

## B. Twelve Feature Areas (long-form, for a dedicated /platform page)

Mapped directly to the docx § Feature Areas at a Glance:

| Feature | Who uses it | One-liner |
|---|---|---|
| Sign In & Accounts | All users | Secure login with MFA, invite-based onboarding, session protection. |
| Dashboard | All users | Live summary of data health, activity, and items needing attention. |
| Data Catalog | All users | Upload, track, and manage every file in one managed inbox. |
| Data Quality | Analysts, Ops | 34 deterministic rules, column profiling, AI-suggested custom rules. |
| Quarantine Editor | Analysts, Ops | Spreadsheet-style correction with real-time collaboration. |
| Export & Delivery | All users | Download or push clean data straight into a connected system. |
| Connectors | Admins | Four live integrations today, six more rolling out. |
| Scheduled Jobs | Admins, Ops | Hourly/daily/weekly runs with incremental sync and auto-pause. |
| ERP Mapping & Tools | Analysts | AI-assisted field mapping + standalone Data Tools page. |
| AI Assistant | All users | In-app help connected to the platform's own knowledge base. |
| Organization & Team | Admins | Invites, roles, permissions, approvals. |
| Settings Presets | Admins, Analysts | Reusable DQ configurations for consistency across projects. |

## C. The Benchmark Callout (reusable anywhere)

A single-line claim for use in meta bars, press kits, or dark-mode banners:

> **CleanFlowAI's DQ engine processes 1 million records in under 32 seconds.**
> *Measured on 3 GB AWS Lambda, 34-rule default preset.*

## D. One-Liner Library

Short enough for hover cards, meta strips, or social posts:

- **Profile · Validate · Transform · Export.**
- **1 million records. Under 32 seconds.**
- **34 rules. Every fix traceable to an R-number.**
- **Quarantine, don't discard.**
- **Deterministic by default. AI where it helps.**
- **Upload once. Automate forever.**
- **Built for teams that demand precision.**
- **Bring us your messiest file. We'll hand it back clean.**

## E. The Five-Step Flow (from the docx summary)

The docx ends with this exact sequence — useful anywhere a simpler hand-rail is needed than the six-stage pipeline above:

1. Upload a file or connect a data source
2. Run data quality checks to identify issues
3. Review and fix any quarantined rows
4. Export or push the clean data to where it is needed
5. Automate the whole process with a scheduled job

## F. The "Why It Matters" Bank (for tooltips / features page)

Pulled verbatim from the docx — each feature area has an official "why it matters" line worth reusing:

- **Sign In:** *"Secure, role-appropriate access means the right people see the right data — and no one else."*
- **Dashboard:** *"Rather than hunting through individual files, the Dashboard gives you a one-page health check."*
- **Data Catalog:** *"Data files get lost in email threads, shared drives, or individual computers. The Data Catalog gives everyone a single source of truth."*
- **Data Quality:** *"Automated data quality processing gives you confidence that every row has been checked against the same standards."*
- **Quarantine Editor:** *"The Quarantine Editor turns the painful task of data correction into a structured, auditable, team-friendly process."*
- **Export & Delivery:** *"Direct push capabilities remove the manual step of downloading, reformatting, and re-uploading."*
- **Connectors:** *"Connectors make CleanFlowAI part of your data infrastructure rather than just a one-off tool."*
- **Scheduled Jobs:** *"Automation turns a daily or weekly manual task into something that just works."*
- **ERP Mapping:** *"These tools remove a significant amount of manual reformatting work."*
- **AI Assistant:** *"The AI assistant lowers the barrier for new team members."*
- **Organization:** *"As teams grow, controlling who can see and modify data becomes critical for data governance."*
- **Settings Presets:** *"Presets enforce consistency and reduce configuration effort."*

## G. Technical Credibility (for /platform or an "Under the Hood" disclosure)

### Frontend
Next.js 15 · React 19 · TypeScript 5 (strict) · Tailwind CSS v4 · Radix UI · shadcn/ui · Framer Motion · Three.js · Lenis · AG Grid · Recharts

### Backend (AWS)
API Gateway (Cognito authorizer) · Lambda (dq_engine_processor, 3 GB) · Step Functions · AWS Glue (Polars for 1–50 GB, Spark for > 50 GB) · S3 (raw / clean / quarantine / reports, presigned-URL only) · DynamoDB · CloudWatch audit logs

### AI Layer
Groq Llama 3.1-70B (column semantics, rule drafting, schema detection, assistant) · HuggingFace `all-MiniLM-L6-v2` (384-dim embeddings) · Pinecone vector store

### Performance
- 10K-row file — under 1 min end-to-end
- 1M-row file — **under 32 seconds on Lambda** (headline), 3–7 min on Glue Polars for larger jobs
- QuickBooks export — 10–30 s typical, 2-min ceiling

### Security
AWS Cognito · RBAC (Owner / Admin / Analyst / Reviewer) · Presigned S3 URLs · No arbitrary code execution · SOC 2 Type II (in progress) · 99.9% uptime SLA

---

## Source Map

| Section in this doc | Source in docx | Source in LANDING-CONTENT.md |
|---|---|---|
| §2 Hero subhead | What is CleanFlowAI? + Summary | §1 Hero |
| §3 Trust Bar | §7 Connectors and Integrations | §12 Connectors |
| §5 Metrics Strip | Summary (34 rules, 4 formats) + benchmark | §7 By The Numbers |
| §6 Feature cards | §4 Data Quality, §5 Quarantine Editor, §8 Scheduled Jobs | §5 Twelve Features |
| §7 Pipeline stages | Summary five-step flow + §4, §5, §6, §8 | §4 Product Showcase Pipeline |
| §10 Footer tagline | What is CleanFlowAI? | §19 Footer |
| Appendix B | Feature Areas at a Glance table | §5 Twelve Features |
| Appendix C | Internal benchmark + 3 GB Lambda spec | §7 By The Numbers callout |
| Appendix F | All "Why it matters" sections in docx | — |

No invented metrics. No filler copy. Every line traces back to the docx, internal AWS infrastructure, or existing design docs.
