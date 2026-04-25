# CleanFlowAI Landing Page — A Walkthrough

A plain-English guide to what's on the CleanFlowAI landing page, what every section does, where every button goes, and how all the little animations work. Written for someone who doesn't need (or want) the code.

**Where to see it:** open **http://localhost:3000/landing** in any browser while the site is running.

---

## What this page is for

It's the front door of CleanFlowAI. Someone who has never heard of the product lands here, and in about 60 seconds they should understand:

1. **What CleanFlowAI does** — it cleans messy business data before it reaches your warehouse or ERP system.
2. **Why they should trust it** — stats, customer logos, a testimonial, and a live-looking preview of the actual app.
3. **What to do next** — start a free trial, watch a demo, talk to an engineer, or sign in.

Everything on the page is in service of those three answers.

---

## A guided tour, top to bottom

Imagine scrolling down the page slowly. Here's what you pass, in order.

### 1. The top bar (always visible)

Along the very top you see the **CleanFlowAI logo and name** on the left, and on the right a row of navigation links: `Platform`, `Features`, `Pipeline`, `Pricing`, `Sign in`, and a dark pill-shaped button that says **Request access**.

- Clicking any of the first four links smoothly scrolls the page to that section — you don't jump, you glide.
- **Sign in** takes you to the real login page at `/auth/login`.
- **Request access** takes you to the real signup page at `/auth/signup`.

The top bar stays pinned to the top of the screen as you scroll, so you can always jump around without scrolling back up.

### 2. The hero (the first thing you see)

A big headline that reads:

> **Enterprise-grade data quality, delivered in minutes.**

The word *"data quality"* is written in a graceful italic serif and colored teal to stand out, and the word *"minutes"* has a soft teal underline sweep behind it. Below the headline there's a short explanation paragraph and two buttons:

- **Start free trial** — a dark button that takes you to signup.
- **Watch 2-min demo** — a lighter outlined button with a small play-circle icon; it scrolls you down to the live dashboard preview further down the page.

Under those buttons is a **trust bar** — a rounded white panel listing four credentials side by side:

| What it says | What it means |
|---|---|
| **AI-Powered** / SMART PROFILING | The product uses AI to figure out what's wrong with your data |
| **99.9%** / UPTIME SLA | It's virtually always online |
| **SOC 2** / COMPLIANT | It meets an enterprise security standard |
| **40+** / CONNECTORS | It hooks up to forty-plus outside systems |

**The background.** Behind all of this is a very faint grid pattern with two soft colored clouds — one teal on the left, one navy on the right — that fade out toward the edges. It gives the top of the page atmosphere without being flashy.

### 3. The "trusted by" strip

A thin bar that says **TRUSTED BY** on the left, with a list of customer names sliding slowly from right to left forever: `NORDIC FREIGHT`, `MERIDIAN LABS`, `HELIOS ENERGY`, and so on. This is called a "marquee" — it's there to show social proof without taking up much space.

### 4. The Console preview (the live dashboard mock)

This is the **biggest visual on the page**. It's styled to look exactly like the real CleanFlowAI dashboard that a logged-in user would see. You see a pretend browser window — complete with three colored traffic-light dots, the fake URL `app.cleanflowai.com/dashboard`, and a green `LIVE` badge on the right.

Inside the browser frame are two parts:

**Left side — the sidebar.** Small CleanFlowAI logo at the top with the words "Data Quality Platform" underneath. Below that, a list: **Dashboard** (highlighted in teal because it's the "active" page), **Data Catalog** (with a small red `3` badge to suggest three files need attention), **Jobs**, and under a SETTINGS heading, **Admin**. At the bottom: a circular `U` avatar labeled **User** with the email `user@cleanflowai.com`.

**Right side — the main workspace.** Here's what you see, top to bottom:

- A greeting: **"Welcome back, User"** with the word "User" in teal italics, and underneath it the date `TUESDAY · 14 APRIL 2026`.
- Two buttons in the top-right: **Refresh** and **Download Report**.
- **Four summary cards** in a row:
  - **TOTAL FILES** — showing `3`, with "100% completion" underneath.
  - **AVG DQ SCORE** — showing `28.0%` in **red**, with "Needs attention" underneath. The red tint signals that this number is bad on purpose — it shows the product catching a problem.
  - **PROCESSED** — `7`, all sources.
  - **QUARANTINED ROWS** — `391`, "Requires remediation".
- A **yellow warning banner** that says: *"3 files need attention — 3 with quarantined rows"* with a **View All** button on the right.
- A grid of **five panels**:
  1. **Row Distribution** — a donut chart split into two slices: teal "Validated 55%" and red "Quarantined 45%". When you scroll it into view, the slices draw themselves in from empty to full.
  2. **Score Distribution** — three horizontal bars labeled Excellent, Good, and Bad, each one growing from zero to its full width when it appears, one after another.
  3. **Recent Activity** — a short list of recently processed files with colored status dots next to each.
  4. **Data Processing Trends** — a teal line chart showing scores over the last twelve runs, with a soft teal fill underneath.
  5. **Top DQ Issues** — the word `TOTAL` at the top with a number (`4,722`) that counts up from zero when it scrolls into view. Underneath are five issue types ("Null Like Value", "Bad Text Long", etc.), each with a small progress bar that grows in from the left.

The whole dashboard sits on a soft white card with a thin border and a gentle shadow, and there's a faint teal glow radiating behind it on the page background so it feels like it's lit from within.

### 5. The metrics strip (with the counting numbers)

Just below the dashboard, on a slightly darker cream band, you see four huge numbers side by side:

| Number | What it measures |
|---|---|
| **12.4M** | rows processed daily |
| **47s** | median assessment time |
| **$3.1M** | average cost recovered per year |
| **99.4%** | median DQ score at export |

**The animation.** When these numbers first come into view, they don't just appear — they **count up** from zero to their final value over about two seconds, with an ease-out curve (they move fast at first, then slow down as they reach the final number). Each one counts independently. The `$` prefix and `M`, `s`, `%` suffixes stay in place; only the number counts. This makes the numbers feel alive, like a stock ticker or a fundraiser thermometer.

It only animates once per page load — if you scroll away and come back, it stays at the final number. That's intentional: repeated counting would feel gimmicky.

### 6. The three instruments (feature cards)

A headline: **"Three instruments, calibrated together. *Indispensable* in sequence."**

Below that, three cards in a row:

| Card | What it does |
|---|---|
| **Profile** — *Smart data profiling* | Figures out what your data looks like and what's wrong with it |
| **Validate** — *Rule-based repair* | Fixes what's fixable automatically; sets aside what needs a human |
| **Export** — *Warehouse-ready output* | Ships cleaned data to Snowflake, SAP, NetSuite, and 40+ other places |

The middle card ("Validate") has a thin teal line across the top and a soft teal tint — that's how the page marks it as the featured/most important instrument.

Each card has a **Learn more** link at the bottom that smoothly scrolls you to another section on the page: Profile links down to the dashboard preview, Validate to the pipeline, Export to pricing.

**The live animations.** Every card has an icon in a rounded tile at the top, and every icon is *continuously animated* — they're never still:

- **Profile icon** — four vertical bars that pulse up and down in sequence, like an audio equalizer. There's also a small teal dot in the corner that "pings" (pulses bigger and back) on its own rhythm.
- **Validate icon** — a checkmark inside a highlighted cell that *draws itself* from nothing to complete, then resets and draws again. Every cycle, the teal cell also does a tiny scale pulse.
- **Export icon** — a small teal dot starts at the central "hub" and *travels* to one of three destination nodes, then vanishes and restarts at the hub to travel to the next node, and so on. The destination node it's heading to blinks teal as the dot arrives. It's a visual metaphor for data flowing out to multiple destinations.

On **hover**, each icon tile also lifts slightly, gets bigger by a touch, and a soft teal halo appears behind it — a subtle reward for the mouse landing on it.

### 7. The six-stage pipeline

Headline: **"Six stages, *one continuous flow*."**

Below it, a long horizontal panel divided into six equal cells, each cell holding one stage of the data-cleaning process:

1. **Ingest** — bring the data in
2. **Assess** — look at what's there
3. **Rule** — decide what's wrong
4. **Repair** — fix what can be fixed
5. **Quarantine** — set aside what can't
6. **Export** — send the clean data out

Each cell has a stage number (`01`, `02`, ...), an arrow (`→`), the stage name in a large serif, and a one-line description.

**The animations** — there are three layers:

- When you scroll the pipeline into view, the six cells fade in and rise up one after another, left to right — a staggered reveal.
- After that, a **glowing teal pulse** silently travels along a thin line at the bottom of the whole panel, moving from left to right every six seconds, forever. Think of it as data flowing through the pipeline in real time.
- As the pulse reaches each stage, that stage **lights up briefly** (a soft teal wash fades in from the top and fades out), and its arrow `→` nudges slightly to the right and turns teal. Then it relaxes back. This happens for each of the six stages in sequence, perfectly timed to the traveling pulse.

The cumulative effect is that the pipeline feels like it's *running* — not a static diagram, but a live process. You can stand and watch it cycle indefinitely.

### 8. The testimonial

A simple quote, centered, in a large italic serif:

> *"For the first time, our ledger matches the warehouse which matches the report the CFO sees. The arguing stopped."*
>
> — **M. Delacroix**, Head of Data Platform, Nordic Freight Co.

The quote starts with an oversized teal italic opening mark (`"`) that hangs above the text. The phrase *"The arguing stopped"* is italicized in teal for emphasis — it's the line we want people to remember.

### 9. The pricing table

Headline: **"Three tiers, *one promise*. You never pay for dirty data."**

Three columns:

| Tier | Price | For |
|---|---|---|
| **Analyst** | $0 / forever | Individuals cleaning their own files |
| **Studio** *(featured in teal — "MOST CHOSEN")* | $490 / month | Small data teams |
| **Enterprise** | Custom / contact us | Regulated & high-volume customers |

Each column has a list of what's included (with teal checkmark icons) and a button at the bottom. All three buttons go to the signup page. The middle tier is visually lifted with a thin teal top border and a "MOST CHOSEN" teal pill floating above it — the standard "recommended plan" pattern.

On hover, each plan card lifts up slightly and casts a softer shadow.

### 10. The final call-to-action

A big white card with rounded corners, a soft teal glow behind it, and a faint grid pattern inside. Inside:

- The heading: **"Bring us your *messiest file*. We'll return it clean in *under four minutes*."** — both italic phrases in teal.
- A subheading: *"No credit card. No scheduling. No sales call unless you ask for one."*
- Two buttons:
  - **Upload a file** (dark, primary) — goes to signup.
  - **Talk to an engineer** (outlined) — opens an email to `hello@cleanflowai.com`.

This is the page's last chance to convert a visitor, so the offer is deliberately low-friction.

### 11. The footer

At the very bottom, on a cream-gray band:

- The **CleanFlowAI logo and tagline** on the left.
- Three columns of links on the right:
  - **Product** — Dashboard, Data Catalog, Jobs, Admin, Pipeline. The first four link into the real app routes (`/dashboard`, `/files`, `/jobs`, `/admin`). The last one scrolls to the pipeline section.
  - **Resources** — Documentation, Features, Field guide, Pricing. All link to sections further up the page.
  - **Company** — About (scrolls up to features), Careers/Press/Contact (open an email).
- A thin separator line.
- On the bottom row: a copyright line on the left, and a row of small gray "chips" on the right listing connectors CleanFlowAI can ship data to (Snowflake, SAP, NetSuite, BigQuery, Postgres, Salesforce).

Every link in the footer is a **real** link — nothing is a dead placeholder. Hover any of them and they turn teal.

---

## Where every button and link goes — a cheat sheet

If you're auditing the page for a client meeting, here's the full link map:

**Top nav**

| Link | Destination |
|---|---|
| Platform | Scrolls to the Console preview |
| Features | Scrolls to the three instruments |
| Pipeline | Scrolls to the six stages |
| Pricing | Scrolls to the pricing table |
| Sign in | Real login page (`/auth/login`) |
| Request access | Real signup page (`/auth/signup`) |

**Hero**

| Button | Destination |
|---|---|
| Start free trial | Signup page |
| Watch 2-min demo | Scrolls to the Console preview |

**Three instrument cards — "Learn more"**

| Card | Scrolls to |
|---|---|
| Profile | Console preview |
| Validate | Pipeline |
| Export | Pricing |

**Pricing tier buttons**

| Plan | Destination |
|---|---|
| Analyst → "Start free" | Signup page |
| Studio → "Start trial" | Signup page |
| Enterprise → "Book a call" | Signup page |

**Final CTA**

| Button | Destination |
|---|---|
| Upload a file | Signup page |
| Talk to an engineer | Opens email to `hello@cleanflowai.com` |

**Footer — Product**

| Link | Destination |
|---|---|
| Dashboard | `/dashboard` (real app) |
| Data Catalog | `/files` (real app) |
| Jobs | `/jobs` (real app) |
| Admin | `/admin` (real app) |
| Pipeline | Scrolls to pipeline section |

**Footer — Resources** — all scroll to sections on the landing page (Console, Features, Pipeline, Pricing).

**Footer — Company** — About scrolls to Features; Careers/Press/Contact open pre-addressed emails.

---

## How every animation works (in plain English)

If a client asks "how did you make it do that?", here's the non-technical answer to each one.

### The counting numbers

When you scroll the metrics strip into view, the page notices and starts a short timer. Over two seconds, it repeatedly calls an invisible function that says "what number should I show at this fraction of the way through?" — and each time it updates the number on screen. It uses an *ease-out* curve (fast at first, slow toward the end) because that feels more natural than a linear climb. Once it hits the target, it stops. It only runs once per page visit.

### The dashboard donut chart

The donut is actually drawn as two arcs — a long teal one and a short red one. When the page loads, both arcs start invisible (length zero) and then grow to their full length over 1.6 seconds. The same trick works for the horizontal score bars — they start at width zero and grow to their real width, with each bar waiting its turn (the second bar starts 0.15 seconds after the first, the third 0.15 seconds after the second).

### The Top DQ Issues list

Each row fades in and slides up a few pixels, one after the other. The small progress bar in each row simultaneously stretches from the left edge to its final width. The total number at the top of the panel counts up from zero, same as the metrics strip.

### The feature-card icons

All three icons are pure **SVG** (scalable vector graphics) and their animations are pure **CSS keyframes** — which means there's no JavaScript running them, the browser handles it natively. That matters because:

1. They never stutter, even on a slow computer.
2. When you switch to another browser tab, the animations automatically pause to save battery.
3. They cost essentially nothing to run.

The "Profile" icon's bars each get an animation that scales them vertically from 100% down to 55% and back, with each bar offset by 0.2 seconds. The "Validate" icon uses a well-known SVG trick: the checkmark path has a "dash pattern" set longer than the path itself, then the dash offset is animated from "fully hidden" to "fully visible" — which looks like the checkmark is drawing itself. The "Export" icon animates the position of a small dot in several stages — hub → node 1 → hub → node 2 → hub → node 3 → hub — and the target node blinks teal at the right moment.

### The pipeline flowing pulse

Underneath the pipeline row of six stages is a hidden horizontal track. A soft teal glow is positioned on that track and animated to move its left position from `-10%` (just off the left edge) to `100%` (off the right edge) over 6 seconds, then it jumps back to the start and repeats forever. Each stage also has its own "wash" animation timed to the pulse's arrival — it becomes visible for a fraction of a second and then fades. The delay on each stage's wash is computed from its position in the row (stage 0 waits 0 seconds, stage 1 waits 1 second, and so on), which is how they stay in sync.

### The hero's background glows

Two large circles — one teal, one navy — are positioned off-screen at the top and given a heavy blur filter. They don't move; they just bleed color into the scene from above. A very faint grid overlay sits on top of them, and a soft white vignette at the edges fades everything out so the content in the middle stays readable.

### The marquee of customer names

The customer names are listed twice in a row, and then the whole row is animated to slide from left position `0` to left position `-50%` over 38 seconds. Because the list is doubled, by the time the first copy has scrolled fully off the left, the second copy is in its original position — so the loop is invisible. The page masks the left and right edges so the names fade in and out rather than popping.

---

## How to preview it yourself

The landing page lives inside the main CleanFlowAI project. To see it locally:

1. Open a terminal in the project folder.
2. Run `npm run dev`.
3. Wait for the line that says `✓ Ready in ...` (first time can take a minute or two).
4. In any browser, visit **http://localhost:3000/landing**.

To share it with a teammate, send them the same URL once the dev server is running, or deploy the project to Vercel (the project is already set up for it) and send the production URL.

**Note:** This page is currently at `/landing` — not at the homepage `/`. The homepage still redirects to sign-in or the dashboard depending on whether you're logged in. When you're ready to make this the real public homepage, a small edit to the project's homepage file will do it — details are in the technical README in the same folder.

---

## What to change if the content needs updating

You don't need to be a developer for small edits. Everything visible on the page lives in **one file** — `app/landing/page.tsx` — and the content is grouped into named blocks you can find with your editor's search.

| If you want to change... | Search for... |
|---|---|
| The headline | `cf-h1` |
| The hero subtitle paragraph | `cf-lede` |
| The customer names in the sliding strip | `const names` |
| The four numbers in the metrics strip | `CountUp to={` |
| The three feature card titles and descriptions | `const items = [` inside the Features section |
| The six pipeline stage names | `const stages = [` |
| The testimonial quote | `cf-quote-text` |
| The three pricing tiers (price, features) | `const plans = [` |
| The final CTA headline | `cf-cta-h` |
| Any brand color (teal, navy, cream) | `--teal`, `--brand`, `--bg-1` in `.cf-root` |

For bigger changes — adding a new section, swapping a font, or restyling the dashboard preview — a developer should handle it.

---

## Questions a client might ask

**Q: Does the page work on a phone?**
A: Yes. At smaller widths the three-column grids collapse to one column, the dashboard sidebar becomes a horizontal bar, and the feature cards stack. The animations all still run.

**Q: Is it accessible?**
A: The decorative elements (glows, grids, traveling pulse, icon animations, marquee, stamp) are all marked `aria-hidden` so screen readers ignore them. All real content — headlines, buttons, links, testimonials, pricing — is readable by assistive technology. The buttons and links have proper roles.

**Q: How fast does it load?**
A: Fast. The only images used are a tiny favicon PNG. Everything else is SVG, CSS, or text. No video, no large hero background image, no tracking scripts.

**Q: Can I change the colors?**
A: Yes — every color on the page is defined once in a block at the top of the styles, using named tokens like `--teal`, `--brand`, and `--ink`. Change one value and the whole page updates.

**Q: Why is the dashboard on the page fake?**
A: It's a high-fidelity preview — it shows exactly what the real product looks like, using the same layout, same colors, same icons, and numbers borrowed from a real dashboard state. We use a mock instead of a screenshot because the page stays crisp at any zoom level and on any device, and because we can animate it (the donut, score bars, and count-up) in ways a static image can't.

**Q: Can I see analytics on who's visiting?**
A: Not yet — the page has no tracking attached. Adding Vercel Analytics, Plausible, or Google Analytics is a small add-on when the page is ready to go live.
