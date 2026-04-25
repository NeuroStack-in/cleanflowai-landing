# CleanFlowAI — Brand Colors & Typography

Official branding reference, extracted from the login page image at [public/image.png](../public/image.png) and cross-referenced with the in-app design system (`app/globals.css`, `app/landing/page.tsx`).

---

## 1. Color Palette

### 1.1 Navy (primary brand)

The dark marketing panel uses a **deep navy** — slightly darker and cooler than the in-app `--primary: #2a4477`.

| Token | Hex | RGB | Role |
|---|---|---|---|
| **Navy Deep** | `#0F1A29` | `15, 26, 41` | Edges, deepest shade, shadows |
| **Navy Base** | `#141E30` | `20, 30, 48` | Dark panel background |
| **Navy CTA** | `#1E2E52` | `30, 46, 82` | Buttons, links, active elements |
| **Navy (existing app)** | `#2A4477` | `42, 68, 119` | Current `--primary` — keep for app dashboards |
| **Navy Mid** | `#3A5A94` | `58, 90, 148` | Secondary accents, chart data |
| **Navy Light** | `#5A7FB5` | `90, 127, 181` | Borders on dark, soft highlights |

### 1.2 Neutrals

Warm cream on the form side, near-black ink for body.

| Token | Hex | RGB | Role |
|---|---|---|---|
| **Cream Surface** | `#FAFAF5` | `250, 250, 245` | Light panel background |
| **Cream Input** | `#F5F3EC` | `245, 243, 236` | Input field fill |
| **Line** | `#E7E5DD` | `231, 229, 221` | Borders, dividers on light |
| **Ink** | `#0F1729` | `15, 23, 41` | Primary dark text |
| **Ink 2** | `#1E293B` | `30, 41, 59` | Secondary text |
| **Ink Muted** | `#6B6F78` | `107, 111, 120` | Labels, captions, helper text |

### 1.3 Text on dark

Overlays for copy that sits on the navy panel.

| Token | Value | Role |
|---|---|---|
| **Text White** | `#FFFFFF` | Headlines on dark |
| **Text White 72%** | `rgba(255, 255, 255, 0.72)` | Body copy on dark |
| **Text White 45%** | `rgba(255, 255, 255, 0.45)` | Small labels, disabled |
| **Divider 10%** | `rgba(255, 255, 255, 0.10)` | Hairline dividers on dark |

### 1.4 Accents

| Token | Hex | Role |
|---|---|---|
| **Error Red** | `#DC2626` | Form validation errors, destructive actions |
| **Success Green** | `#4ADE80` | Status pulses, live dots |
| **Warn Amber** | `#B45309` | Warning states |

### 1.5 CSS variable block (drop-in)

```css
:root {
  /* Navy */
  --navy-deep:   #0F1A29;
  --navy:        #141E30;
  --navy-cta:    #1E2E52;
  --primary:     #2A4477;   /* existing app token */
  --navy-mid:    #3A5A94;
  --navy-light:  #5A7FB5;

  /* Neutrals */
  --surface:     #FAFAF5;
  --surface-2:   #F5F3EC;
  --line:        #E7E5DD;
  --ink:         #0F1729;
  --ink-2:       #1E293B;
  --ink-muted:   #6B6F78;

  /* On dark */
  --on-dark:         #FFFFFF;
  --on-dark-body:    rgba(255, 255, 255, 0.72);
  --on-dark-muted:   rgba(255, 255, 255, 0.45);
  --on-dark-line:    rgba(255, 255, 255, 0.10);

  /* Accents */
  --destructive: #DC2626;
  --success:     #4ADE80;
  --warn:        #B45309;
}
```

### 1.6 Gradients

Reusable gradients built from the palette.

```css
/* Dark panel — hero, CTA card, marketing backgrounds */
--gradient-navy: linear-gradient(180deg, #0F1A29 0%, #141E30 50%, #0F1A29 100%);

/* CTA button — subtle dimension */
--gradient-cta: linear-gradient(135deg, #1E2E52 0%, #2A4477 60%, #3A5A94 100%);

/* Soft form surface */
--gradient-cream: linear-gradient(180deg, #FAFAF5 0%, #F5F3EC 100%);

/* Atmospheric ambient (on dark) */
--gradient-ambient: radial-gradient(ellipse 900px 500px at 50% 20%,
  rgba(58, 90, 148, 0.22) 0%, transparent 55%);
```

---

## 2. Typography

Three fonts from Google Fonts, all loaded via `next/font/google`. One decorative serif reserved for italic accents.

### 2.1 Font families

| CSS Variable | Font | Google Fonts | Weights | Role |
|---|---|---|---|---|
| `--font-display` | **Manrope** | [fonts.google.com/specimen/Manrope](https://fonts.google.com/specimen/Manrope) | 400, 500, 600, 700 | Headlines, CTAs, titles |
| `--font-sans` | **Inter** | [fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter) | 400, 500, 600, 700 | Body, UI, inputs, links |
| `--font-mono` | **IBM Plex Mono** | [fonts.google.com/specimen/IBM+Plex+Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | 400, 500, 600 | Labels, stats, code, small-caps |
| `--font-serif` | **Instrument Serif** | [fonts.google.com/specimen/Instrument+Serif](https://fonts.google.com/specimen/Instrument+Serif) | 400 (normal + italic) | Decorative italic accents only |

### 2.2 Role hierarchy

The design uses each font for a distinct **voice**:

1. **Manrope** → **presence / authority** — headlines and CTAs that need to command attention
2. **Inter** → **information / legibility** — anything the user reads carefully (body, forms, instructions)
3. **IBM Plex Mono** → **system / data feel** — labels, stats, technical markers that should feel engineered
4. **Instrument Serif** → **editorial accent** — used sparingly for italic emphasis in headlines

### 2.3 Size + weight scale

| Class | Font | Weight | Size | Letter-spacing | Line-height | Use |
|---|---|---|---|---|---|---|
| **Hero H1** | Manrope | 700 | `clamp(42px, 7vw, 100px)` | `-0.03em` | `0.95` | Landing hero headline |
| **Section H2** | Manrope | 700 | `clamp(32px, 5vw, 56px)` | `-0.028em` | `1.05` | Section titles |
| **Card title** | Manrope | 700 | `28–30px` | `-0.025em` | `1.08` | Pipeline stages, feature cards |
| **Sign-in heading** | Manrope | 700 | `28–32px` | `-0.02em` | `1.1` | Auth forms |
| **Body** | Inter | 400 | `14–17px` | `0` | `1.55–1.6` | Paragraphs, descriptions |
| **Body small** | Inter | 400 | `13–14px` | `0` | `1.5` | Helper text, captions |
| **Link** | Inter | 500 | `13–14px` | `0` | — | "Forgot password?", "Create account" |
| **Button** | Inter | 500–600 | `14–15px` | `0` | — | CTAs, form buttons |
| **Mono label** | IBM Plex Mono | 500 | `10–11px` | `0.16–0.22em` | — | `§ TAG` style labels |
| **Mono stat** | IBM Plex Mono | 600 | `9–10px` | `0.12em` | — | Card sub-labels, form field labels |
| **Serif italic** | Instrument Serif | 400 italic | Same as context | `-0.01em` | Inherit | Decorative emphasis word |

### 2.4 Installing (Next.js `app/` directory)

```tsx
import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
})

/* Apply to root */
<html className={`${manrope.variable} ${inter.variable} ${mono.variable} ${serif.variable}`}>
```

### 2.5 Utility classes

```css
/* Manrope — presence */
.brand-headline {
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  font-feature-settings: "ss01", "cv11";
}
.brand-title {
  font-family: var(--font-display), sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.08;
}

/* Inter — information */
.brand-body {
  font-family: var(--font-sans), sans-serif;
  font-weight: 400;
  line-height: 1.55;
}
.brand-link {
  font-family: var(--font-sans), sans-serif;
  font-weight: 500;
}

/* IBM Plex Mono — system */
.brand-label {
  font-family: var(--font-mono), monospace;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.brand-stat-sub {
  font-family: var(--font-mono), monospace;
  font-weight: 600;
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Instrument Serif — accent */
.brand-italic-accent {
  font-family: var(--font-serif), serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
}
```

---

## 3. Element pairings (from the login page)

Exact combinations observed in [public/image.png](../public/image.png):

| Element | Font | Weight | Size | Color | Tracking |
|---|---|---|---|---|---|
| "Enterprise-grade / data quality." | Manrope | 700 | 48–54px | `#FFFFFF` | `-0.03em` |
| Subheadline paragraph | Inter | 400 | 14–15px | `rgba(255,255,255,0.72)` | `0` |
| "99.9%" stat value | Manrope | 700 | 18px | `#FFFFFF` | `0` |
| "UPTIME SLA" label | IBM Plex Mono | 500 | 10px | `rgba(255,255,255,0.45)` | `0.16em` |
| "Sign in" heading | Manrope | 700 | 28px | `#0F1729` | `-0.02em` |
| "Enter your credentials…" | Inter | 400 | 14px | `#6B6F78` | `0` |
| "EMAIL" field label | IBM Plex Mono | 600 | 10px | `#6B6F78` | `0.12em` |
| Input text | Inter | 400 | 14.5px | `#0F1729` | `0` |
| "Forgot password?" link | Inter | 500 | 13px | `#1E2E52` | `0` |
| Primary Sign in button | Inter | 500 | 14.5px | `#FFFFFF` on `#1E2E52` | `0` |
| Bottom capability strip | IBM Plex Mono | 500 | 10px | `rgba(255,255,255,0.55)` | `0.18em` |

---

## 4. Quick-glance design tokens

Compact JSON for export to design tools (Figma / Tokens Studio / Style Dictionary):

```json
{
  "color": {
    "navy": {
      "deep":  "#0F1A29",
      "base":  "#141E30",
      "cta":   "#1E2E52",
      "brand": "#2A4477",
      "mid":   "#3A5A94",
      "light": "#5A7FB5"
    },
    "surface": {
      "cream":   "#FAFAF5",
      "input":   "#F5F3EC",
      "line":    "#E7E5DD"
    },
    "ink": {
      "primary": "#0F1729",
      "secondary": "#1E293B",
      "muted":   "#6B6F78"
    },
    "accent": {
      "error":    "#DC2626",
      "success":  "#4ADE80",
      "warn":     "#B45309"
    }
  },
  "font": {
    "display": "Manrope",
    "sans":    "Inter",
    "mono":    "IBM Plex Mono",
    "serif":   "Instrument Serif"
  },
  "weight": {
    "regular": 400,
    "medium":  500,
    "semibold": 600,
    "bold":    700
  },
  "tracking": {
    "tight":  "-0.03em",
    "tight-2":"-0.025em",
    "normal": "0",
    "mono":   "0.16em",
    "mono-wide": "0.22em"
  }
}
```

---

## 5. Notes

- **Tabular figures** (`font-feature-settings: "tnum"`) should be applied to any element displaying numbers that align vertically in columns — stats, KPI cards, pricing.
- **Text-rendering** (`text-rendering: geometricPrecision`) improves Manrope's bold weights at large sizes. Already applied to `.cf-root h1, h2, h3` in the landing page.
- **Stylistic sets** — Manrope supports `ss01` (alternate `g`) and `cv11` (alternate `a`); both are enabled in `.cf-root h1/h2/h3` via `font-feature-settings: "ss01", "cv11"`.
- **Fallback stacks** — always chain system fallbacks after the CSS variable:
  ```
  font-family: var(--font-display), -apple-system, BlinkMacSystemFont, sans-serif;
  ```

---

## 6. Source files

- **Brand image reference** — [public/image.png](../public/image.png)
- **App design system** — [app/globals.css](../app/globals.css)
- **Landing page tokens** — [app/landing/page.tsx](../app/landing/page.tsx) (line ~2915, `.cf-root` CSS variables)
- **shadcn UI config** — [components.json](../components.json)

---

*Every color and font in this document is already loaded somewhere in the codebase — no new dependencies needed to adopt these tokens.*
