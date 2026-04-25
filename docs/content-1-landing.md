# content-1-landing

Snapshot of the **current** landing page content at [app/landing/page.tsx](../app/landing/page.tsx). Every line below is what a visitor actually sees on the page right now, in the order they scroll through it.

---

## 0. Page Structure (render order)

| # | Section | Status |
|---|---|---|
| 1 | Navbar | ✅ Rendered |
| 2 | Hero | ✅ Rendered |
| 3 | Trust Bar | ✅ Rendered |
| 4 | Dashboard Preview | ✅ Rendered |
| 5 | Metrics Strip | ✅ Rendered |
| 6 | Features / Services | ✅ Rendered |
| 7 | Pipeline / Method | ✅ Rendered |
| 8 | Quote / Principles | ✅ Rendered |
| 9 | ~~Pricing~~ | ❌ Removed (line 279: `{/* Pricing section removed */}`) |
| 10 | CTA | ✅ Rendered |
| 11 | Footer | ✅ Rendered |

---

## 1. Navbar

**Nav links:**
- Platform
- Features
- Pipeline
- Sign in

*Note: "Request access" CTA and `/auth/login` redirects were removed — "Sign in" is a `#` placeholder.*

---

## 2. Hero

**Background:** Three.js data tunnel — concentric wireframe cylinders with streaming particles flying toward the camera.

**Headline (3 lines):**
> Enterprise-grade
> *data quality*
> for every ERP file.

*Accents: "data quality" is italic light-blue (`#b0ccf0`); "ERP file" is accent blue (`#9cbce5`).*

**Subheadline:**
> Upload CSV, Excel, JSON, or Parquet. 34 deterministic rules with AI-assisted suggestions. Auto-fix or quarantine every row — then export clean data or push it straight to your ERP.

**CTAs:**
- `Start free trial →` (primary, glass style)
- `▷ See it in action` (ghost)

*Both use `href="#"` — no auth redirects.*

**Animation:** Each text block fades up in sequence (0.2s → 0.35s → 0.5s → 0.7s → 0.9s).

---

## 3. Trust Bar

**Tag:** `CONNECTS TO`
**Subtitle:** 13 ERP systems — QuickBooks live, 12 more rolling out

**Marquee order (live → planned):**

1. QUICKBOOKS ONLINE `● LIVE`
2. ORACLE FUSION
3. SAP ERP
4. MICROSOFT DYNAMICS
5. NETSUITE
6. WORKDAY
7. INFOR M3
8. INFOR LN
9. EPICOR KINETIC
10. QAD ERP
11. IFS CLOUD
12. SAGE INTACCT

---

## 4. Dashboard Preview

**Tag:** `§ THE CONSOLE`
**Heading:** *One workspace*. Every file, every run.

**Three-panel mock:**

### Left panel — Data Catalog
- Chips: `5 files` · `4 processed`
- Column headers: `FILE` · `QUALITY` · `ROWS` · `STATUS`
- Sample files with DQ percentages and status labels

### Center panel — Main Dashboard
- Browser URL bar: `app.cleanflowai.com/dashboard`
- Badge: `LIVE`
- Welcome: *"Welcome back, User"* (User in italic)
- Date: `TUESDAY · 14 APRIL 2026`
- Buttons: `Refresh` · `Download Report`

**KPI cards:**
| Card | Value | Subtitle |
|---|---|---|
| TOTAL FILES | 3 | 100% completion |
| AVG DQ SCORE | 28% | Needs attention |
| PROCESSED | 7 | all sources |
| QUARANTINED ROWS | 391 | Requires remediation |

**Alert banner:** `3 files need attention — 3 with quarantined rows` → `View All`

**Panel titles:** `ROW DISTRIBUTION` · `SCORE DISTRIBUTION` · `RECENT ACTIVITY` · `DATA PROCESSING TRENDS` · `TOP DQ ISSUES (4,722 TOTAL)`

**Sidebar sections:**
- MAIN: Dashboard · Data Catalog · Jobs
- SETTINGS: Admin
- User: `User` · `user@cleanflowai.com`

### Right panel — Quarantine Editor
- URL: `app.cleanflowai.com/quarantine`
- Badge: `EDITOR`
- Tabs: `⟳ Reprocess` · `Super Admin` · `Find & Replace` · `Columns`
- Status: `✓ Saved`
- Table headers: `CUSTOMER_ID` · `NAME` · `EMAIL` · `PHONE`

---

## 5. Metrics Strip

**Tag:** `§ BY THE NUMBERS`
**Heading:** The platform, *quantified*.

**Description:**
> Thirty-four deterministic rules. Thirteen ERP integrations. Four input formats and three export targets. Every number that CleanFlowAI runs on — hover any card to see the count animate in.

**Metric cards:**

| # | Value | Label | Sublabel |
|---|---|---|---|
| 1 | **34** | Deterministic rules | R1 → R34 |
| 2 | **13** | ERP integrations | QuickBooks live · 12 upcoming |
| 3 | **4** | Input formats | CSV · Excel · JSON · Parquet |
| 4 | **3** | Export formats | CSV · Excel · JSON |

---

## 6. Features / Services

**Tag:** `§ THE SERVICES`
**Heading:** Three services. *Calibrated together*.

### 6.1 DATA TRANSFORM
**Title:** Between any ERP format
**Body:**
> Normalize column schemas between QuickBooks, Oracle Fusion, SAP, NetSuite, Dynamics and nine more. Select columns, rename on export, and reshape structure for your target system — no custom scripts.

**Link:** `Learn more →`

### 6.2 DATA QUALITY (featured)
**Title:** Profile, validate, fix
**Body:**
> 34 deterministic rules (R1–R34) cover type, null-rate, uniqueness, required fields and more. LLM-assisted rule suggestions you review and approve. Auto-fix what's safe, quarantine what isn't — every change auditable.

**Link:** `Learn more →`

### 6.3 CLEANDATASHIELD™
**Title:** Premium protection layer
**Body:**
> Enterprise privacy and security on top of the DQ pipeline. Protects sensitive fields before data moves between systems. Available on the Enterprise tier.

**Link:** `Learn more →`

---

## 7. Pipeline / Method

**Tag:** `§ THE METHOD`
**Heading:** Six stages. *One flow*.

**Pipeline stages:**

| # | Stage | Description |
|---|---|---|
| 01 | **Upload** | Drop CSV, Excel, JSON, Parquet — or import from QuickBooks. |
| 02 | **Profile** | Type guess, null rate, unique ratio, confidence — sampled. |
| 03 | **Configure** | Pick rules R1–R34, accept LLM suggestions, set required fields. |
| 04 | **Execute** | `DQ_RUNNING → NORMALIZING`. Deterministic, auditable pipeline. |
| 05 | **Review** | Clean, fixed, quarantined — plus a full DQ report in JSON. |
| 06 | **Export** | Download CSV, Excel or JSON — or push direct to ERP. |

---

## 8. Quote / Principles

**Tag:** `§ PRINCIPLES`
**Heading:** Four principles. *One philosophy*.

**Quote cards (verbatim):**

> "One pipeline. Thirty-four rules. Every row accounted for — **clean, fixed, or quarantined**."
> — Product Principle · `CLEANFLOWAI · PRD v1.0`

> "Upload a CSV. Get back a DQ report. No ETL glue, no custom scripts, **no surprises**."
> — Design Principle · `ENGINEERING DOCS`

> "LLM suggests. Human approves. Pipeline executes deterministically — **always**."
> — Rule Engine Doctrine · `DQ_ENGINE v1.0`

> "If we can't fix it, we quarantine it. If we quarantine it, **we explain why**."
> — Quarantine Policy · `CLEANFLOWAI · PRD v1.0`

---

## 9. ~~Pricing~~ (REMOVED)

Not rendered. The `Pricing()` function still exists in the file as dead code but is not mounted.

Line 279 of [page.tsx](../app/landing/page.tsx):
```tsx
{/* Pricing section removed */}
```

Navbar "Pricing" link and footer "Pricing" link also removed.

---

## 10. CTA

**Design:** Compact blue card with 4 concentric ripple rings on the right side.

**Headline:** Let's Get *In Touch*.

**Subtitle:**
> Your data quality shouldn't keep you up at night. We're happy to help you.

**Buttons (dark pills with circular arrow badges):**
- `Book a discovery call →`
- `Try CleanFlowAI →`

*Both use `href="#"` and `href="mailto:hello@cleanflowai.com"` — no auth redirects.*

---

## 11. Footer

**Tagline:**
> A data quality and transformation platform for ERP data. Profile columns, apply 34 deterministic rules, auto-fix or quarantine every row, and push clean output to your ERP.

**Columns:**

| Product | Resources | Company |
|---|---|---|
| Dashboard | Documentation | About |
| Data Catalog | Features | Careers |
| Files | Field guide | Press |
| Jobs | — | Contact |
| Admin | — | — |
| Pipeline | — | — |

**Copyright:**
> © 2026 CleanFlowAI — All figures checked twice.

---

## 12. Scroll-Triggered Animations

Every section title and description has `.cf-fade-up` — an IntersectionObserver adds `.cf-visible` on entry, triggering an 0.8s `opacity + translateY(28px)` transition with `cubic-bezier(0.16, 1, 0.3, 1)` easing.

**Stagger via `data-delay`:**
- `data-delay="1"` → 0.1s
- `data-delay="2"` → 0.2s
- `data-delay="3"` → 0.3s

**Elements with fade-up:**
- All 7 section `§` tags (THE CONSOLE, BY THE NUMBERS, THE SERVICES, THE METHOD, PRINCIPLES, plus the trust bar CONNECTS TO)
- All 7 `<h2>` section headings
- Metrics-desc · cta-sub · trust-sub description paragraphs

---

## 13. Design System Used

**Fonts (all via `next/font/google`):**
- `--font-display` → **Manrope** (headings, 400–700)
- `--font-sans` → **Inter** (body, UI, 400–700)
- `--font-serif` → **Instrument Serif** (decorative quote marks only, 400 normal + italic)
- `--font-mono` → **IBM Plex Mono** (labels, badges, data, 400/500/600)

**Brand colors:**
- Primary navy: `#2a4477`
- Steel: `#3a5a94`
- Light blue: `#5a7fb5`
- Ink: `#0A0F1C`
- Background cream: `#FBFBF8`

**Hero-specific colors:**
- Hero background: `#080c1c` (deep navy-black)
- Hero text: `#FFFFFF` headline, `#b0ccf0` italic accent, `#9cbce5` ERP accent
- Subtitle: `rgba(200, 212, 240, 0.75)`

**Navbar states:**
- **Over hero** (glass): `rgba(0, 0, 0, 0.12)` + backdrop blur
- **Scrolled** (solid): `rgba(251, 251, 248, 0.9)` cream + border-bottom

---

## 14. File Reference

| Element | Line(s) in [page.tsx](../app/landing/page.tsx) |
|---|---|
| Font imports | 23–48 |
| `FadeUpObserver` | ~90–105 |
| `TopBar` | ~320–345 |
| `DataTunnelScene` (Three.js) | ~336–540 |
| `Hero` | ~541–640 |
| `TrustBar` | ~728 |
| `DashPreview` | ~800+ |
| `MetricsStrip` | ~1665+ |
| `Features` | ~1850+ |
| `Pipeline` | ~2320+ |
| `Quote` | ~2600+ |
| `CTA` | ~2795+ |
| `Footer` | ~2850+ |

---

*This doc captures only what's currently rendered. For aspirational / reference copy grounded in the product overview doc, see [LANDING-CONTENT.md](./LANDING-CONTENT.md).*
