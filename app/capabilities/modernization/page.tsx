"use client"

/**
 * Data Modernization — bespoke page.
 *   - Hero: blue bg, RIGHT-aligned title, static data-cube diagram LEFT
 *   - No quote banner, no "in the platform" section
 *   - Pillars: oversized icon badges on the left, content on the right
 *   - Toolkit: redesigned as a numbered bento with format chips
 *   - Outcome: 4 glass-morphic metric cards on a blue field
 */

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { SiteNav, SiteCta, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const SOLUTIONS = [
  { slug: "profiling",      name: "Data Profiling",       blurb: "Know your data before you trust it — every column, every batch, every time." },
  { slug: "quality",        name: "Data Quality",         blurb: "Bad records caught before they reach production. Stewards stay in control." },
  { slug: "transformation", name: "Data Transformation",  blurb: "The same input always produces the same output. No surprises in your pipeline." },
  { slug: "migration",      name: "Data Migration",       blurb: "Move workloads at enterprise scale — without rewriting your stack." },
  { slug: "modernization",  name: "Data Modernization",   blurb: "Legacy data, warehouse-ready. The mess goes in, clean output comes out." },
  { slug: "security",       name: "Data Security",        blurb: "Every change is approved, audited, and reversible. Compliance built in." },
]

const PILLARS = [
  {
    key: "language",
    h: "Legacy quirks, quietly handled",
    b: "Decades-old encoding mismatches and odd delimiters used to be a Friday-night problem. Now they're handled before your team even sees the file — no garbled text, no lost rows, no surprises downstream.",
  },
  {
    key: "diff",
    h: "Schema changes nobody flagged",
    b: "When the upstream team renames a column or drops a field, you find out before the dashboard breaks. Differences are surfaced clearly, attributed, and resolved with sign-off — not buried in a logfile.",
  },
  {
    key: "cube",
    h: "Warehouse-ready, dramatically lighter",
    b: "What used to be a clunky spreadsheet leaves the platform as a lean, warehouse-native payload — far smaller and ready to land in the systems your team already runs.",
  },
]

const TOOLKIT = [
  { key: "encoding", title: "Cleans up the messy stuff",          body: "The character-set chaos and odd delimiters legacy systems leave behind — quietly handled before anyone notices." },
  { key: "schema",   title: "Catches silent schema changes",      body: "When fields are renamed, added, or dropped upstream, your team sees it — and approves how it's resolved." },
  { key: "columnar", title: "Warehouse-ready output",             body: "Lean, columnar payloads that drop into your warehouse without an extra hop or hand-off." },
  { key: "stream",   title: "Plays nice with your stack",         body: "Outputs that fit the destinations your team already operates — no bespoke connector, no friction." },
  { key: "delim",    title: "Handles every legacy format",        body: "From obscure spreadsheets to fixed-width exports, every dialect comes through the same predictable flow." },
  { key: "history",  title: "Reproducible, every time",           body: "Every modernization is captured with before/after samples — replay any batch, any time, with confidence." },
]

const METRICS = [
  { stat: "Lean",       label: "warehouse output",   sub: "dramatically smaller than legacy payloads" },
  { stat: "Instant",    label: "format detection",   sub: "no manual config, no guessing" },
  { stat: "Every",      label: "legacy format",      sub: "your team is likely to encounter" },
  { stat: "100%",       label: "reproducible",       sub: "any batch can be replayed on demand" },
]

export default function DataModernizationPage() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} dx-root`}>
      {/* Nav */}
      <SiteNav />

      <main className="dx-main">
        {/* ───── HERO — data cube LEFT, text RIGHT-ALIGNED ───── */}
        <section className="dx-hero">
          <div className="dx-hero-bg" aria-hidden>
            <div className="dx-hero-grid" />
            <div className="dx-hero-glow-a" />
            <div className="dx-hero-glow-b" />
          </div>
          <div className="dx-container">
            <div className="dx-hero-grid-content">
              <motion.div
                className="dx-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <DataCube />
              </motion.div>
              <div className="dx-hero-text">
                <motion.span className="dx-eyebrow" {...rise(0.05)}>DATA MODERNIZATION</motion.span>
                <motion.h1 className="dx-h1" {...rise(0.12)}>
                  <span className="dx-h1-line">Legacy payloads,</span>
                  <span className="dx-h1-em">warehouse-ready in place.</span>
                </motion.h1>
                <motion.p className="dx-lede" {...rise(0.28)}>
                  Drop in a legacy file. Get back a clean, warehouse-ready payload —
                  with the messy bits handled, the changes flagged, and your team
                  fully in control of what lands. Every batch is reviewable.
                  Every modernization is replayable. No surprises down the pipeline.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── PILLARS — big icon badges LEFT, content RIGHT ───── */}
        <section className="dx-pillars">
          <div className="dx-container">
            <motion.div className="dx-section-head" {...rise(0.05)}>
              <span className="dx-eyebrow">WHAT YOUR TEAM GETS</span>
              <h2 className="dx-h2">
                The headaches of legacy data,<br />
                <span className="dx-h2-em">quietly taken off your plate.</span>
              </h2>
            </motion.div>
            <div className="dx-pillars-stack">
              {PILLARS.map((p, i) => (
                <motion.article
                  key={p.key}
                  className="dx-pillar"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.06 + i * 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dx-pillar-badge" aria-hidden>
                    <PillarIcon name={p.key} />
                    <span className="dx-pillar-badge-ring" />
                  </div>
                  <div className="dx-pillar-body">
                    <h3 className="dx-pillar-h">{p.h}</h3>
                    <p className="dx-pillar-b">{p.b}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── TOOLKIT — redesigned bento with numbered format cells ───── */}
        <section className="dx-toolkit">
          <div className="dx-toolkit-bg" aria-hidden>
            <div className="dx-toolkit-glow" />
            <div className="dx-toolkit-grid" />
          </div>
          <div className="dx-container">
            <motion.div className="dx-section-head dx-section-head-light" {...rise(0.05)}>
              <span className="dx-eyebrow dx-eyebrow-light">VALUE YOU UNLOCK</span>
              <h2 className="dx-h2 dx-h2-light">
                Six wins your team feels<br />
                <span className="dx-h2-em-light">from the very first batch.</span>
              </h2>
            </motion.div>
            <div className="dx-toolkit-grid-wrap">
              {TOOLKIT.map((t, i) => (
                <motion.article
                  key={t.key}
                  className="dx-toolkit-cell"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.07, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <span className="dx-toolkit-mark" aria-hidden />
                  <h3 className="dx-toolkit-h">{t.title}</h3>
                  <p className="dx-toolkit-b">{t.body}</p>
                  <span className="dx-toolkit-corner" aria-hidden />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── METRICS — glass-morphic cards on blue ───── */}
        <section className="dx-metrics">
          <div className="dx-metrics-bg" aria-hidden>
            <div className="dx-metrics-glow-a" />
            <div className="dx-metrics-glow-b" />
            <div className="dx-metrics-grid" />
          </div>
          <div className="dx-container">
            <motion.div className="dx-metrics-head" {...rise(0.05)}>
              <span className="dx-eyebrow dx-eyebrow-light">WHY TEAMS PICK CLEANFLOWAI</span>
              <h2 className="dx-h2 dx-h2-light">
                <span className="dx-h2-em-light">Outcomes you can count on.</span>
              </h2>
            </motion.div>
            <div className="dx-metrics-grid-wrap">
              {METRICS.map((m, i) => (
                <motion.article
                  key={m.label}
                  className="dx-metric-card"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <span className="dx-metric-stat">{m.stat}</span>
                  <span className="dx-metric-label">{m.label}</span>
                  <span className="dx-metric-sub">{m.sub}</span>
                  <span className="dx-metric-gloss" aria-hidden />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── RELATED — geometric outlined chips ───── */}
        <section className="dx-related">
          <div className="dx-container">
            <motion.div className="dx-related-head" {...rise(0.05)}>
              <span className="dx-eyebrow">EXPLORE MORE</span>
              <h2 className="dx-h2">
                The rest of the platform,<br />
                <span className="dx-h2-em">working in your favor.</span>
              </h2>
            </motion.div>
            <div className="dx-related-grid-wrap">
              {SOLUTIONS.filter(s => s.slug !== "modernization").slice(0, 3).map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="dx-related-card">
                    <span className="dx-related-corner dx-related-corner-tl" aria-hidden />
                    <span className="dx-related-corner dx-related-corner-tr" aria-hidden />
                    <span className="dx-related-corner dx-related-corner-bl" aria-hidden />
                    <span className="dx-related-corner dx-related-corner-br" aria-hidden />
                    <h3 className="dx-related-h">{s.name}</h3>
                    <p className="dx-related-b">{s.blurb}</p>
                    <span className="dx-related-cta" aria-hidden>
                      <svg viewBox="0 0 14 10" width="18" height="13" fill="none"><path d="M0 5 H 12 M 8 1 L 12 5 L 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteCta />
      <SiteFooter />
      <SiteChromeStyles />
      <StyleBlock />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO — Static OLAP Data Cube (3×3×3 with axis labels & callout)
   ═══════════════════════════════════════════════════════════════ */

function DataCube() {
  /* Isometric 3×3×3 cube. All three visible faces meet at a single front-top apex.
     Apex = (Cx, Cy). Back-left vector = (-U, -H). Back-right = (+U, -H). Down = (0, +V). */
  const Cx = 220
  const Cy = 220
  const U = 70   // horizontal half-step along each depth axis
  const H = 35   // vertical half-step along each depth axis
  const V = 70   // vertical drop for one "down" step on a side face
  return (
    <figure className="dx-cube" aria-label="Dimensional data cube">
      <svg viewBox="0 0 440 440" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="dx-face-top" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#F6F8FC" />
            <stop offset="100%" stopColor="#CCD5E6" />
          </linearGradient>
          <linearGradient id="dx-face-left" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#E3E8F1" />
            <stop offset="100%" stopColor="#A6B2C6" />
          </linearGradient>
          <linearGradient id="dx-face-right" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#BCC6D8" />
            <stop offset="100%" stopColor="#7F8BA3" />
          </linearGradient>
          <filter id="dx-cube-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="14" result="off" />
            <feFlood floodColor="#0A1328" floodOpacity="0.55" />
            <feComposite in2="off" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g filter="url(#dx-cube-shadow)">
          {/* TOP face — indexed by (l, r) where l = back-left depth, r = back-right depth.
               Front vertex of cell (l, r) at apex + (r-l)·Lvec-ish. */}
          {Array.from({ length: 3 }).map((_, l) =>
            Array.from({ length: 3 }).map((_, r) => {
              const p1x = Cx + (r - l) * U,       p1y = Cy - (l + r) * H
              const p2x = Cx + (r - l - 1) * U,   p2y = Cy - (l + r + 1) * H
              const p3x = Cx + (r - l) * U,       p3y = Cy - (l + r + 2) * H
              const p4x = Cx + (r - l + 1) * U,   p4y = Cy - (l + r + 1) * H
              return (
                <polygon
                  key={`t-${l}-${r}`}
                  points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
                  fill="url(#dx-face-top)"
                  stroke="#6D7690"
                  strokeWidth="1.3"
                  className={`dx-cube-cell dx-cube-cell-t dx-cube-cell-t-${l}-${r}`}
                />
              )
            })
          )}

          {/* LEFT face — indexed by (d, l) where d = down, l = back-left depth. */}
          {Array.from({ length: 3 }).map((_, d) =>
            Array.from({ length: 3 }).map((_, l) => {
              const p1x = Cx - l * U,       p1y = Cy - l * H + d * V
              const p2x = Cx - (l + 1) * U, p2y = Cy - (l + 1) * H + d * V
              const p3x = Cx - (l + 1) * U, p3y = Cy - (l + 1) * H + (d + 1) * V
              const p4x = Cx - l * U,       p4y = Cy - l * H + (d + 1) * V
              return (
                <polygon
                  key={`l-${d}-${l}`}
                  points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
                  fill="url(#dx-face-left)"
                  stroke="#5A6377"
                  strokeWidth="1.3"
                  className={`dx-cube-cell dx-cube-cell-l dx-cube-cell-l-${d}-${l}`}
                />
              )
            })
          )}

          {/* RIGHT face — indexed by (d, r) where d = down, r = back-right depth. */}
          {Array.from({ length: 3 }).map((_, d) =>
            Array.from({ length: 3 }).map((_, r) => {
              const p1x = Cx + r * U,       p1y = Cy - r * H + d * V
              const p2x = Cx + (r + 1) * U, p2y = Cy - (r + 1) * H + d * V
              const p3x = Cx + (r + 1) * U, p3y = Cy - (r + 1) * H + (d + 1) * V
              const p4x = Cx + r * U,       p4y = Cy - r * H + (d + 1) * V
              return (
                <polygon
                  key={`r-${d}-${r}`}
                  points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
                  fill="url(#dx-face-right)"
                  stroke="#4E576B"
                  strokeWidth="1.3"
                  className={`dx-cube-cell dx-cube-cell-r dx-cube-cell-r-${d}-${r}`}
                />
              )
            })
          )}
        </g>
      </svg>
    </figure>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ICON SET (large badges)
   ═══════════════════════════════════════════════════════════════ */

function PillarIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "language":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" {...P} aria-hidden>
          <circle cx="24" cy="24" r="18" />
          <path d="M 6 24 H 42" />
          <path d="M 24 6 C 32 12, 32 36, 24 42 M 24 6 C 16 12, 16 36, 24 42" />
          <path d="M 8 15 C 14 18, 34 18, 40 15 M 8 33 C 14 30, 34 30, 40 33" />
        </svg>
      )
    case "diff":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" {...P} aria-hidden>
          <rect x="6"  y="10" width="16" height="10" rx="1.5" />
          <rect x="6"  y="26" width="16" height="12" rx="1.5" />
          <rect x="26" y="8"  width="16" height="10" rx="1.5" fill="currentColor" fillOpacity="0.12" />
          <rect x="26" y="22" width="16" height="18" rx="1.5" fill="currentColor" fillOpacity="0.12" />
          <path d="M 22 15 L 26 13" strokeDasharray="2 2" />
          <path d="M 22 32 L 26 31" strokeDasharray="2 2" />
          <path d="M 30 27 L 38 27 M 34 23 L 34 31" strokeWidth="1.8" />
        </svg>
      )
    case "cube":
      return (
        <svg viewBox="0 0 48 48" width="48" height="48" {...P} aria-hidden>
          <path d="M 24 6 L 42 16 V 34 L 24 44 L 6 34 V 16 Z" />
          <path d="M 24 6 V 24 M 24 24 L 42 16 M 24 24 L 6 16 M 24 24 V 44" />
          <path d="M 15 11 L 33 21 M 33 11 L 15 21" strokeOpacity="0.45" strokeDasharray="1.5 2.5" />
        </svg>
      )
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */

function StyleBlock() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }

      .dx-root {
        --bg:         #FAFAF5;
        --bg-2:       #F5F3EC;
        --paper:      #F8F6EE;
        --line:       rgba(15, 23, 41, 0.08);
        --line-2:     rgba(15, 23, 41, 0.14);
        --ink:        #0F1729;
        --ink-2:      #1E293B;
        --ink-3:      #475569;
        --ink-4:      #6B6F78;
        --brand:      #2A4477;
        --brand-2:    #1E3056;
        --navy-deep:  #0F1A29;
        --navy:       #141E30;
        --navy-cta:   #1E2E52;
        --navy-mid:   #3A5A94;
        --sky:        #a0c4f0;

        background: var(--bg);
        color: var(--ink);
        font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        scroll-behavior: smooth;
      }
      .dx-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .dx-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

      .dx-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .dx-container { padding: 0 22px; } }

      /* ═══ NAV ═══ */
      .dx-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 40; transition: background 0.4s, border-color 0.4s, box-shadow 0.4s; background: rgba(14, 26, 48, 0.55); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid transparent; }
      .dx-nav-solid { background: rgba(10, 18, 36, 0.92); border-bottom-color: rgba(160, 196, 240, 0.14); box-shadow: 0 1px 10px -2px rgba(0, 0, 0, 0.3); }
      .dx-nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 36px; display: flex; align-items: center; justify-content: space-between; }
      .dx-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dx-logo-wrap img { width: 38px; height: 38px; }
      .dx-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dx-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dx-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(200, 215, 240, 0.7); text-transform: uppercase; margin-top: 2px; }
      .dx-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .dx-nav-links > a { color: rgba(220, 232, 250, 0.82); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .dx-nav-links > a:hover { color: #FFFFFF; }
      .dx-nav-cta { padding: 10px 18px; background: #FFFFFF; color: var(--brand) !important; border-radius: 999px; font-weight: 600; font-size: 13.5px; transition: transform 0.25s, background 0.25s; }
      .dx-nav-cta:hover { background: var(--sky); transform: translateY(-1px); }
      .dx-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .dx-nav-dd-trigger { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; padding: 0; font: inherit; font-size: 14px; font-weight: 450; cursor: pointer; color: rgba(220, 232, 250, 0.82); transition: color 0.25s; }
      .dx-nav-dd-trigger:hover { color: #FFFFFF; }
      .dx-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .dx-nav-dd-caret-open { transform: rotate(180deg); }
      .dx-nav-dd-menu { position: absolute; top: calc(100% - 2px); left: 50%; transform: translateX(-50%) translateY(-6px); width: min(900px, calc(100vw - 32px)); opacity: 0; visibility: hidden; transition: opacity 0.28s, transform 0.28s, visibility 0s 0.28s; z-index: 60; }
      .dx-nav-dd-menu-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); transition: opacity 0.35s, transform 0.35s, visibility 0s; }
      .dx-nav-dd-inner-menu { margin-top: 14px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px -20px rgba(15, 23, 41, 0.4); }
      .dx-nav-dd-head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
      .dx-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .dx-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .dx-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .dx-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .dx-nav-dd-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink); transition: background 0.25s; }
      .dx-nav-dd-item:hover { background: var(--bg-2); }
      .dx-nav-dd-item-active { background: var(--bg-2); }
      .dx-nav-dd-item-active .dx-nav-dd-item-name { color: var(--brand); }
      .dx-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; color: var(--ink); }
      .dx-nav-dd-item-blurb { font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .dx-nav-dd-feature { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; text-decoration: none; color: #FFFFFF; background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%), linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%); border: 1px solid rgba(160, 196, 240, 0.22); }
      .dx-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .dx-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .dx-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .dx-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--sky); font-weight: 700; }
      .dx-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; color: #FFFFFF; margin: 4px 0 0; }
      .dx-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .dx-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* ═══ HERO — BLUE FIELD ═══ */
      .dx-hero {
        position: relative;
        padding: 180px 0 130px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 600px at 12% 28%, rgba(90, 127, 181, 0.38), transparent 60%),
          radial-gradient(ellipse 700px 500px at 88% 72%, rgba(160, 196, 240, 0.2), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--brand-2) 45%, var(--brand) 100%);
        color: #FFFFFF;
      }
      .dx-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .dx-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.08) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 85%);
      }
      .dx-hero-glow-a {
        position: absolute; top: 10%; left: -8%;
        width: 560px; height: 560px;
        background: radial-gradient(circle, rgba(160, 196, 240, 0.28), transparent 62%);
        filter: blur(80px);
      }
      .dx-hero-glow-b {
        position: absolute; bottom: -10%; right: -6%;
        width: 520px; height: 520px;
        background: radial-gradient(circle, rgba(58, 90, 148, 0.42), transparent 62%);
        filter: blur(90px);
      }
      .dx-hero > .dx-container { position: relative; z-index: 1; }
      .dx-hero-grid-content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 72px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .dx-hero-grid-content { grid-template-columns: 1fr; gap: 36px; }
        .dx-hero-visual { order: 1; }
        .dx-hero-text { order: 2; }
      }
      .dx-hero-visual { display: flex; align-items: center; justify-content: flex-start; }
      @media (max-width: 980px) { .dx-hero-visual { justify-content: center; } }
      .dx-hero-text {
        display: flex; flex-direction: column; gap: 24px;
        text-align: right;
        align-items: flex-end;
      }
      @media (max-width: 980px) {
        .dx-hero-text { text-align: left; align-items: flex-start; }
      }
      .dx-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.24em;
        color: var(--brand); font-weight: 700;
      }
      .dx-eyebrow-light { color: var(--sky); }
      .dx-hero .dx-eyebrow { color: var(--sky); }
      .dx-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(44px, 5.8vw, 78px);
        line-height: 1.04;
        letter-spacing: -0.033em;
        color: #FFFFFF;
        margin: 0;
        display: flex; flex-direction: column; gap: 6px;
        align-items: flex-end;
      }
      @media (max-width: 980px) { .dx-h1 { align-items: flex-start; } }
      .dx-h1-line { display: block; }
      .dx-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--sky);
        font-size: 1.05em;
        letter-spacing: -0.012em;
      }
      .dx-lede {
        font-size: 16.5px; line-height: 1.72;
        color: rgba(220, 232, 250, 0.82); margin: 0;
        max-width: 54ch;
      }
      /* ═══ DATA CUBE (clean geometry, staggered reveal) ═══ */
      .dx-cube {
        margin: 0;
        position: relative;
        width: 100%;
        max-width: 520px;
        display: flex; align-items: center; justify-content: flex-start;
      }
      .dx-cube svg {
        width: 100%; height: auto;
        overflow: visible;
      }
      .dx-cube-cell {
        transform-origin: center;
        opacity: 0;
        animation: dx-cube-fade 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .dx-cube-cell-l-0-0 { animation-delay: 0.35s; } .dx-cube-cell-l-0-1 { animation-delay: 0.42s; } .dx-cube-cell-l-0-2 { animation-delay: 0.49s; }
      .dx-cube-cell-l-1-0 { animation-delay: 0.42s; } .dx-cube-cell-l-1-1 { animation-delay: 0.49s; } .dx-cube-cell-l-1-2 { animation-delay: 0.56s; }
      .dx-cube-cell-l-2-0 { animation-delay: 0.49s; } .dx-cube-cell-l-2-1 { animation-delay: 0.56s; } .dx-cube-cell-l-2-2 { animation-delay: 0.63s; }
      .dx-cube-cell-r-0-0 { animation-delay: 0.56s; } .dx-cube-cell-r-0-1 { animation-delay: 0.63s; } .dx-cube-cell-r-0-2 { animation-delay: 0.7s; }
      .dx-cube-cell-r-1-0 { animation-delay: 0.63s; } .dx-cube-cell-r-1-1 { animation-delay: 0.7s;  } .dx-cube-cell-r-1-2 { animation-delay: 0.77s; }
      .dx-cube-cell-r-2-0 { animation-delay: 0.7s;  } .dx-cube-cell-r-2-1 { animation-delay: 0.77s; } .dx-cube-cell-r-2-2 { animation-delay: 0.84s; }
      .dx-cube-cell-t-0-0 { animation-delay: 0.24s; } .dx-cube-cell-t-0-1 { animation-delay: 0.31s; } .dx-cube-cell-t-0-2 { animation-delay: 0.38s; }
      .dx-cube-cell-t-1-0 { animation-delay: 0.31s; } .dx-cube-cell-t-1-1 { animation-delay: 0.38s; } .dx-cube-cell-t-1-2 { animation-delay: 0.45s; }
      .dx-cube-cell-t-2-0 { animation-delay: 0.38s; } .dx-cube-cell-t-2-1 { animation-delay: 0.45s; } .dx-cube-cell-t-2-2 { animation-delay: 0.52s; }
      @keyframes dx-cube-fade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      @media (prefers-reduced-motion: reduce) {
        .dx-cube-cell { animation: none !important; opacity: 1; }
      }

      /* ═══ SHARED SECTION HEADS ═══ */
      .dx-section-head {
        max-width: 780px;
        margin: 0 auto 72px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dx-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(32px, 4.4vw, 54px);
        line-height: 1.06;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .dx-h2-light { color: #FFFFFF; }
      .dx-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.04em;
      }
      .dx-h2-em-light { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 400; color: var(--sky); font-size: 1.04em; }

      /* ═══ PILLARS — big badges LEFT, content RIGHT ═══ */
      .dx-pillars { padding: 130px 0 140px; background: var(--bg); position: relative; }
      .dx-pillars-stack {
        display: flex; flex-direction: column;
        gap: 28px;
        max-width: 1100px;
        margin: 0 auto;
      }
      .dx-pillar {
        display: grid;
        grid-template-columns: 200px minmax(0, 1fr);
        gap: 56px;
        align-items: flex-start;
        padding: 44px 48px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 22px;
        position: relative;
        overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s, border-color 0.5s;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 24px 48px -28px rgba(42, 68, 119, 0.18);
      }
      .dx-pillar:hover {
        transform: translateY(-4px);
        border-color: rgba(42, 68, 119, 0.22);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.95) inset, 0 38px 80px -28px rgba(42, 68, 119, 0.32);
      }
      .dx-pillar::before {
        content: "";
        position: absolute; top: 0; left: 0; right: 0; height: 3px;
        background: linear-gradient(90deg, var(--brand) 0%, var(--navy-mid) 50%, transparent 100%);
        transform: scaleX(0); transform-origin: left;
        transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dx-pillar:hover::before { transform: scaleX(1); }
      @media (max-width: 860px) {
        .dx-pillar { grid-template-columns: 1fr; gap: 24px; padding: 32px 28px; }
      }
      .dx-pillar-badge {
        position: relative;
        width: 160px; height: 160px;
        border-radius: 28px;
        display: inline-flex; align-items: center; justify-content: center;
        background:
          radial-gradient(circle at 30% 30%, rgba(160, 196, 240, 0.36) 0%, transparent 60%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 55%, var(--navy) 100%);
        color: var(--sky);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.14) inset,
          0 0 0 1px rgba(160, 196, 240, 0.22) inset,
          0 24px 56px -20px rgba(42, 68, 119, 0.45);
      }
      .dx-pillar-badge svg { width: 68px; height: 68px; }
      .dx-pillar-badge-ring {
        position: absolute; inset: -10px;
        border-radius: 36px;
        border: 1px dashed rgba(42, 68, 119, 0.35);
        pointer-events: none;
        animation: dx-ring-rot 32s linear infinite;
      }
      @keyframes dx-ring-rot { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .dx-pillar-badge-ring { animation: none; } }
      @media (max-width: 860px) { .dx-pillar-badge { width: 120px; height: 120px; } .dx-pillar-badge svg { width: 52px; height: 52px; } }

      .dx-pillar-body { display: flex; flex-direction: column; gap: 14px; }
      .dx-pillar-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(24px, 2.8vw, 34px);
        letter-spacing: -0.022em;
        color: var(--ink);
        line-height: 1.16;
        margin: 0;
      }
      .dx-pillar-b {
        font-size: 16.5px;
        line-height: 1.72;
        color: var(--ink-3);
        margin: 0;
        text-wrap: pretty;
      }

      /* ═══ TOOLKIT — bento on navy ═══ */
      .dx-toolkit {
        position: relative;
        padding: 140px 0 150px;
        background:
          radial-gradient(ellipse 900px 560px at 50% 0%, rgba(58, 90, 148, 0.32), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dx-toolkit-bg { position: absolute; inset: 0; pointer-events: none; }
      .dx-toolkit-glow {
        position: absolute; top: 30%; left: 50%; transform: translateX(-50%);
        width: 820px; height: 520px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.26), transparent 62%);
        filter: blur(100px);
      }
      .dx-toolkit-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.06) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%);
      }
      .dx-toolkit > .dx-container { position: relative; z-index: 1; }
      .dx-toolkit-grid-wrap {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      @media (max-width: 900px) { .dx-toolkit-grid-wrap { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 600px) { .dx-toolkit-grid-wrap { grid-template-columns: 1fr; } }

      .dx-toolkit-cell {
        position: relative;
        padding: 32px 30px 30px;
        border-radius: 18px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.14) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.38) 0%, rgba(20, 30, 48, 0.58) 100%);
        border: 1px solid rgba(160, 196, 240, 0.2);
        backdrop-filter: blur(10px) saturate(1.15);
        -webkit-backdrop-filter: blur(10px) saturate(1.15);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 20px 46px -22px rgba(0, 0, 0, 0.6);
        display: flex; flex-direction: column; gap: 14px;
        overflow: hidden;
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s, box-shadow 0.4s;
      }
      .dx-toolkit-cell:hover {
        transform: translateY(-5px);
        border-color: rgba(160, 196, 240, 0.42);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 32px 70px -24px rgba(42, 68, 119, 0.6);
      }
      .dx-toolkit-mark {
        display: block;
        width: 28px; height: 2px;
        background: linear-gradient(90deg, var(--sky) 0%, transparent 100%);
        border-radius: 1px;
        margin-bottom: 4px;
      }
      .dx-toolkit-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: -0.018em;
        color: #FFFFFF;
        line-height: 1.22;
        margin: 0;
      }
      .dx-toolkit-b {
        font-size: 14.5px;
        line-height: 1.6;
        color: rgba(220, 232, 250, 0.78);
        margin: 0;
        text-wrap: pretty;
      }
      .dx-toolkit-corner {
        position: absolute; bottom: -30px; right: -30px;
        width: 130px; height: 130px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(160, 196, 240, 0.22), transparent 70%);
        pointer-events: none;
      }

      /* ═══ METRICS — glass-morphic cards on BLUE ═══ */
      .dx-metrics {
        position: relative;
        padding: 130px 0 140px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 520px at 20% 30%, rgba(160, 196, 240, 0.28), transparent 62%),
          radial-gradient(ellipse 700px 500px at 82% 75%, rgba(58, 90, 148, 0.35), transparent 62%),
          linear-gradient(180deg, var(--brand-2) 0%, var(--brand) 50%, var(--navy-cta) 100%);
        color: #FFFFFF;
      }
      .dx-metrics-bg { position: absolute; inset: 0; pointer-events: none; }
      .dx-metrics-glow-a { position: absolute; top: -10%; left: -8%; width: 620px; height: 620px; background: radial-gradient(circle, rgba(160, 196, 240, 0.3), transparent 60%); filter: blur(100px); }
      .dx-metrics-glow-b { position: absolute; bottom: -12%; right: -6%; width: 580px; height: 580px; background: radial-gradient(circle, rgba(40, 60, 100, 0.6), transparent 60%); filter: blur(100px); }
      .dx-metrics-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
        background-size: 80px 80px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%);
      }
      .dx-metrics > .dx-container { position: relative; z-index: 1; }
      .dx-metrics-head {
        max-width: 780px;
        margin: 0 auto 72px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dx-metrics-grid-wrap {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 22px;
      }
      @media (max-width: 980px) { .dx-metrics-grid-wrap { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 560px) { .dx-metrics-grid-wrap { grid-template-columns: 1fr; } }

      .dx-metric-card {
        position: relative;
        padding: 36px 30px 34px;
        border-radius: 20px;
        background: linear-gradient(160deg, rgba(255, 255, 255, 0.16) 0%, rgba(160, 196, 240, 0.08) 55%, rgba(255, 255, 255, 0.04) 100%);
        border: 1px solid rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(18px) saturate(1.3);
        -webkit-backdrop-filter: blur(18px) saturate(1.3);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.28) inset,
          0 0 0 1px rgba(255, 255, 255, 0.06) inset,
          0 30px 60px -24px rgba(10, 18, 36, 0.55);
        display: flex; flex-direction: column; gap: 10px;
        overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.5s, box-shadow 0.5s;
      }
      .dx-metric-card:hover {
        transform: translateY(-6px);
        border-color: rgba(255, 255, 255, 0.38);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.4) inset,
          0 0 0 1px rgba(255, 255, 255, 0.12) inset,
          0 40px 80px -24px rgba(10, 18, 36, 0.7);
      }
      .dx-metric-stat {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(46px, 5.5vw, 68px);
        line-height: 1;
        letter-spacing: -0.036em;
        color: #FFFFFF;
        text-shadow: 0 2px 12px rgba(10, 18, 36, 0.4);
      }
      .dx-metric-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 15px;
        color: #FFFFFF;
        letter-spacing: -0.01em;
        margin-top: 4px;
      }
      .dx-metric-sub {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.14em;
        color: rgba(220, 232, 250, 0.78);
        text-transform: uppercase;
      }
      .dx-metric-gloss {
        position: absolute; top: -40%; left: -20%;
        width: 140%; height: 60%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), transparent 70%);
        transform: rotate(-12deg);
        pointer-events: none;
        opacity: 0.55;
      }

      /* ═══ FINAL CTA ═══ */
      .dx-cta-final { padding: 110px 0 120px; background: var(--bg); }
      .dx-cta-card {
        position: relative;
        padding: 46px 52px;
        border-radius: 22px;
        background: var(--brand);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 30px 70px -26px rgba(42, 68, 119, 0.5);
        overflow: hidden;
      }
      .dx-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .dx-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
      .dx-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: dx-ripple 3s ease-in-out infinite; }
      .dx-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: dx-ripple 3s ease-in-out infinite 0.4s; }
      .dx-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: dx-ripple 3s ease-in-out infinite 0.8s; }
      .dx-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: dx-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes dx-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes dx-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .dx-cta-ring { animation: none !important; } }
      .dx-cta-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 6px; max-width: 520px; }
      .dx-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 38px); line-height: 1.1; letter-spacing: -0.022em; margin: 0; color: #FFFFFF; }
      .dx-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.86); }
      .dx-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.72); margin: 10px 0 20px; line-height: 1.55; max-width: 44ch; }
      .dx-cta-pill { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; border-radius: 999px; background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600; text-decoration: none; align-self: flex-start; white-space: nowrap; transition: background 0.25s, transform 0.25s, box-shadow 0.25s; box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3); }
      .dx-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .dx-cta-pill-arrow { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--brand); color: #FFFFFF; font-size: 13px; transition: background 0.25s, transform 0.25s; }
      .dx-cta-pill:hover .dx-cta-pill-arrow { background: var(--navy-cta); transform: translateX(2px); }

      /* ═══ FOOTER ═══ */
      /* ─── RELATED (style 5 · geometric outlined chips) ─── */
      .dx-related { padding: 130px 0 80px; background: var(--bg); }
      .dx-related-head { max-width: 760px; margin: 0 auto 56px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; }
      .dx-related-grid-wrap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      @media (max-width: 900px) { .dx-related-grid-wrap { grid-template-columns: 1fr; } }
      .dx-related-card {
        position: relative;
        display: flex; flex-direction: column; gap: 12px;
        padding: 36px 30px 28px;
        text-decoration: none;
        color: var(--ink);
        background: transparent;
        border: 1px dashed rgba(42, 68, 119, 0.32);
        border-radius: 6px;
        transition: background 0.5s, border-color 0.5s, transform 0.5s;
      }
      .dx-related-card:hover { background: #FFFFFF; border-color: var(--brand); border-style: solid; transform: translateY(-4px); }
      .dx-related-card:hover .dx-related-corner { background: var(--brand); }
      .dx-related-card:hover .dx-related-cta { color: var(--brand); }
      .dx-related-card:hover .dx-related-cta svg { transform: translateX(5px); }
      .dx-related-corner {
        position: absolute; width: 6px; height: 6px; background: rgba(42, 68, 119, 0.38);
        transition: background 0.4s;
      }
      .dx-related-corner-tl { top: -3px; left: -3px; } .dx-related-corner-tr { top: -3px; right: -3px; }
      .dx-related-corner-bl { bottom: -3px; left: -3px; } .dx-related-corner-br { bottom: -3px; right: -3px; }
      .dx-related-badge {
        align-self: flex-start;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
        padding: 4px 10px;
        border: 1px solid rgba(42, 68, 119, 0.3);
        border-radius: 2px;
      }
      .dx-related-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 22px;
        letter-spacing: -0.02em; color: var(--ink);
        line-height: 1.22; margin: 4px 0 4px;
      }
      .dx-related-b {
        font-size: 14.5px; line-height: 1.62;
        color: var(--ink-3); margin: 0;
        text-wrap: pretty;
      }
      .dx-related-cta {
        display: inline-flex; align-items: center; gap: 8px;
        margin-top: 12px;
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: var(--ink-4);
        transition: color 0.4s;
      }
      .dx-related-cta svg { transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1); }

      .dx-footer { position: relative; background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%); color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden; }
      .dx-footer::after { content: ""; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 320px; background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%); pointer-events: none; }
      .dx-footer > .dx-container { position: relative; z-index: 1; }
      .dx-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .dx-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .dx-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .dx-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dx-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .dx-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dx-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dx-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .dx-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .dx-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .dx-foot-h { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em; color: var(--sky); font-weight: 700; margin-bottom: 18px; text-transform: uppercase; }
      .dx-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .dx-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .dx-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .dx-footer-watermark {
        display: block;
        font-family: var(--font-display), sans-serif;
        font-weight: 800;
        font-size: clamp(64px, 14.5vw, 180px);
        letter-spacing: -0.028em;
        line-height: 1;
        text-align: center;
        margin: 56px 0 0;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(160, 196, 240, 0.34);
        user-select: none; pointer-events: none;
        white-space: nowrap; overflow: hidden;
      }
      .dx-footer-bottom { position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; padding: 22px 0 28px; margin-top: -10px; }
      .dx-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .dx-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .dx-footer { padding: 72px 0 0; margin-top: 60px; }
        .dx-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
      }
    `}</style>
  )
}
