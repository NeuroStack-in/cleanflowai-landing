"use client"

/**
 * Data Quality — bespoke page.
 *   - Blue centered hero, no animation
 *   - No quote banner
 *   - Three "Layers of quality" with large animated icons on the right
 *   - Animated vertical pipeline with icons (not numbers)
 *   - Product image (left, click-to-expand) + content (right)
 *   - Bento 3x2 quality-suite grid
 *   - Blue outcome card
 */

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteNav, SiteCta, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

const SOLUTIONS = [
  { slug: "profiling",      name: "Data Profiling",       blurb: "AutoMap type inference, statistical fingerprinting, AI-drafted rule suggestions." },
  { slug: "quality",        name: "Data Quality",         blurb: "CleanDataShield rules, Quarantine Editor, approval-based remediation." },
  { slug: "transformation", name: "Data Transformation",  blurb: "AutoMap field resolution, version-controlled blueprints, deterministic execution." },
  { slug: "migration",      name: "Data Migration",       blurb: "OAuth connectors, real-time Jobs, stateful incremental sync." },
  { slug: "modernization",  name: "Data Modernization",   blurb: "Encoding normalization, schema-drift reconciliation, warehouse-native output." },
  { slug: "security",       name: "Data Security",        blurb: "Identity-scoped access, approval-based change control, immutable audit lineage." },
]

const LAYERS = [
  {
    icon: "rulebook",
    h: "CleanDataShield rule library",
    b: "R1–R34 enforce format, mandatory fields, cross-column logic, and injection safety — registered, versioned, and deterministically applied. Every rule is inherited rather than rebuilt, with full attribution on every fire.",
  },
  {
    icon: "spark",
    h: "Business Rules Suggestion",
    b: "Describe an edge case in plain English. CleanAI compiles a deterministic check that your stewards review and approve before it touches production — suggestions never auto-deploy.",
  },
  {
    icon: "filter",
    h: "Quarantine Editor + approvals",
    b: "Safe corrections auto-apply. Anything unsafe routes to the Quarantine Editor for approval-based, version-controlled remediation with inline rule explanations and full reviewer sign-off.",
  },
]

const STAGES = [
  { icon: "scan",     t: "Profile",           b: "Columns are measured and typed before the first rule fires." },
  { icon: "check",    t: "Validate",          b: "34 deterministic rules plus your custom ones execute across every record." },
  { icon: "gauge",    t: "Score",             b: "Overall DQ score plus per-column breakdown with rule-level attribution." },
  { icon: "shield",   t: "Remediate or quarantine", b: "Safe remediations auto-apply; the rest route to the Quarantine Editor for steward review." },
]

const SUITE = [
  { h: "CleanDataShield rule library",       b: "R1–R34 inherited deterministically, versioned, and rule-attributed at the record level." },
  { h: "Business Rules Suggestion",           b: "Plain-English requirements compiled into reviewable deterministic checks." },
  { h: "Cross-column logic",                  b: "Start < end, totals match line items, status aligns with timestamps — declared once, enforced everywhere." },
  { h: "Version-controlled edit history",     b: "Every fix carries actor, rule, before/after state, and a permanent version pointer." },
  { h: "Quarantine Editor",                   b: "Spreadsheet-style review grid with inline rule explanations and reviewer sign-off before re-entry." },
  { h: "Zero arbitrary code in production",   b: "CleanAI drafts. Humans approve. CleanDataShield executes registered templates only. Nothing else." },
]

export default function DataQualityPage() {
  const reduced = useReducedMotion()
  const [imageOpen, setImageOpen] = useState(false)

  useEffect(() => {
    if (imageOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [imageOpen])

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} dq-root`}>
      <SiteNav />

      <main className="dq-main">
        {/* ───── HERO — blue, centered, no animation ───── */}
        <section className="dq-hero">
          <div className="dq-hero-bg" aria-hidden>
            <div className="dq-hero-glow-a" />
            <div className="dq-hero-glow-b" />
            <div className="dq-hero-grid" />
          </div>
          <div className="dq-container dq-hero-body">
            <motion.span className="dq-eyebrow dq-eyebrow-light" {...rise(0.05)}>DATA QUALITY</motion.span>
            <motion.h1 className="dq-h1" {...rise(0.12)}>
              <span className="dq-h1-line">Confidence in every record.</span>
              <span className="dq-h1-em">Auditable by default.</span>
            </motion.h1>
            <motion.p className="dq-lede" {...rise(0.28)}>
              CleanDataShield enforces 34 deterministic validation rules across format,
              mandatory fields, cross-column logic, and injection safety. Business Rules
              Suggestion compiles plain-English requirements into reviewable deterministic checks.
              Every fix routes through the Quarantine Editor with approval-based, version-controlled remediation.
            </motion.p>
          </div>
        </section>

        {/* ───── LAYERS OF QUALITY — text left, large animated icon right ───── */}
        <section className="dq-layers">
          <div className="dq-container">
            <motion.div className="dq-section-head" {...rise(0.05)}>
              <span className="dq-eyebrow">LAYERS OF QUALITY</span>
              <h2 className="dq-h2">
                Rules enforced, reviewers signed,<br />
                <span className="dq-h2-em">fixes attributed</span>.
              </h2>
            </motion.div>
            <div className="dq-layers-list">
              {LAYERS.map((l, i) => (
                <motion.article
                  key={l.h}
                  className="dq-layer-row"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: 0.05 + i * 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dq-layer-text">
                    <span className="dq-layer-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="dq-layer-h">{l.h}</h3>
                    <p className="dq-layer-b">{l.b}</p>
                  </div>
                  <div className="dq-layer-visual" aria-hidden>
                    <LayerIcon name={l.icon} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── VERTICAL PIPELINE with ICONS ───── */}
        <section className="dq-pipeline">
          <div className="dq-pipeline-bg" aria-hidden>
            <div className="dq-pipeline-glow" />
          </div>
          <div className="dq-container">
            <motion.div className="dq-section-head dq-section-head-light" {...rise(0.05)}>
              <span className="dq-eyebrow dq-eyebrow-light">EVERY STAGE, TRACED</span>
              <h2 className="dq-h2 dq-h2-light">
                From ingest to ship-ready,<br />
                <span className="dq-h2-em-light">every step traced</span>.
              </h2>
            </motion.div>

            <div className="dq-pipe-wrap">
              <div className="dq-pipe-rail" aria-hidden>
                <div className="dq-pipe-rail-fill" />
              </div>
              <ol className="dq-pipe-steps">
                {STAGES.map((s, i) => (
                  <motion.li
                    key={s.t}
                    className="dq-pipe-step"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.18, ease: [0.19, 1, 0.22, 1] as number[] }}
                  >
                    <div className="dq-pipe-badge">
                      <StageIcon name={s.icon} />
                      <span className="dq-pipe-ping" aria-hidden />
                    </div>
                    <div className="dq-pipe-text">
                      <h3 className="dq-pipe-h">{s.t}</h3>
                      <p className="dq-pipe-b">{s.b}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───── PRODUCT SHOWCASE — image left (click to expand), content right ───── */}
        <section className="dq-product">
          <div className="dq-container">
            <div className="dq-product-grid">
              <motion.figure
                className="dq-product-frame"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <button type="button" className="dq-product-trigger" onClick={() => setImageOpen(true)} aria-label="Expand screenshot">
                  <div className="dq-product-chrome">
                    <span className="dq-product-dot dq-product-dot-r" />
                    <span className="dq-product-dot dq-product-dot-y" />
                    <span className="dq-product-dot dq-product-dot-g" />
                    <span className="dq-product-tab">app.cleanflowai.com · rule presets</span>
                  </div>
                  <img
                    src="/cleanflowimgs/DQimg.jpeg"
                    alt="CleanFlowAI rule-pack preset configuration"
                    loading="lazy"
                    decoding="async"
                    className="dq-product-img"
                  />
                  <span className="dq-product-expand" aria-hidden>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3 H 21 V 9 M 9 21 H 3 V 15 M 21 3 L 14 10 M 3 21 L 10 14" />
                    </svg>
                    Click to expand
                  </span>
                </button>
              </motion.figure>

              <motion.div
                className="dq-product-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <span className="dq-eyebrow">QUALITY CONFIGURATION</span>
                <h2 className="dq-h2">
                  Presets that ship.<br />
                  <span className="dq-h2-em">Customization that sticks</span>.
                </h2>
                <p className="dq-product-body">
                  Twenty-eight default rule packs for the scenarios every data team rewrites
                  — format integrity, mandatory fields, cross-column logic, reference lookups,
                  hygiene thresholds — plus a custom surface for the edge cases unique to you.
                </p>
                <ul className="dq-product-points">
                  <li><span>◆</span> Default Data Quality Rules preset, active by default</li>
                  <li><span>◆</span> Policy, lookups, and hygiene thresholds edited per batch</li>
                  <li><span>◆</span> Steward approval gate on every new rule before deployment</li>
                  <li><span>◆</span> Version-controlled presets — roll back any change in one click</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fullscreen image viewer */}
        {imageOpen && (
          <div className="dq-lightbox" onClick={() => setImageOpen(false)} role="dialog" aria-modal="true" aria-label="Full size screenshot">
            <button type="button" className="dq-lightbox-close" onClick={() => setImageOpen(false)} aria-label="Close">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 6 6 L 18 18 M 18 6 L 6 18" />
              </svg>
            </button>
            <img
              src="/cleanflowimgs/DQimg.jpeg"
              alt="CleanFlowAI rule-pack preset configuration — full size"
              className="dq-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* ───── THE QUALITY SUITE — bento 3x2 ───── */}
        <section className="dq-suite">
          <div className="dq-container">
            <motion.div className="dq-section-head" {...rise(0.05)}>
              <span className="dq-eyebrow">THE QUALITY SUITE</span>
              <h2 className="dq-h2">
                Every safeguard your<br />
                <span className="dq-h2-em">data team will verify</span>.
              </h2>
            </motion.div>
            <div className="dq-suite-grid">
              {SUITE.map((f, i) => {
                const row = Math.floor(i / 2)
                const leftCol = i % 2 === 0
                return (
                  <motion.article
                    key={f.h}
                    className="dq-suite-cell"
                    initial={{ opacity: 0, x: leftCol ? -56 : 56 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.85, delay: 0.08 + row * 0.14, ease: [0.19, 1, 0.22, 1] as number[] }}
                  >
                    <span className="dq-suite-dot" aria-hidden />
                    <h3 className="dq-suite-h">{f.h}</h3>
                    <p className="dq-suite-b">{f.b}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───── RELATED — navy hover-underline cards ───── */}
        <section className="dq-related">
          <div className="dq-related-bg" aria-hidden>
            <div className="dq-related-glow" />
            <div className="dq-related-grid" />
          </div>
          <div className="dq-container">
            <motion.div className="dq-related-head" {...rise(0.05)}>
              <h2 className="dq-h2 dq-h2-light">
                Quality doesn&rsquo;t stop at the rule.<br />
                <span className="dq-h2-em-light">The trust layer continues downstream.</span>
              </h2>
            </motion.div>
            <div className="dq-related-grid-wrap">
              {SOLUTIONS.filter(s => s.slug !== "quality").slice(0, 3).map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="dq-related-card">
                    <h3 className="dq-related-h">{s.name}</h3>
                    <p className="dq-related-b">{s.blurb}</p>
                    <span className="dq-related-cta" aria-hidden>
                      <svg viewBox="0 0 14 10" width="18" height="13" fill="none">
                        <path d="M0 5 H 12 M 8 1 L 12 5 L 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="dq-related-underline" aria-hidden />
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
   LARGE ANIMATED ICONS for the three "Layers of quality"
   ═══════════════════════════════════════════════════════════════ */

function LayerIcon({ name }: { name: string }) {
  switch (name) {
    case "rulebook":
      return (
        <svg viewBox="0 0 180 180" width="180" height="180" className="dq-li" aria-hidden>
          <defs>
            <linearGradient id="dq-li-rule-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a0c4f0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2A4477" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M40 30 L 140 30 L 150 50 L 150 150 L 30 150 L 30 50 Z"
                fill="rgba(160, 196, 240, 0.08)" stroke="#a0c4f0" strokeWidth="2" strokeLinejoin="round" />
          <path d="M40 30 L 140 30 L 150 50 L 30 50 Z"
                fill="rgba(160, 196, 240, 0.18)" stroke="#a0c4f0" strokeWidth="2" strokeLinejoin="round" />
          {/* rule rows */}
          <g className="dq-li-rule-rows">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(0, ${65 + i * 18})`}>
                <rect x="48" y="0" width="12" height="10" rx="2" fill="#a0c4f0" opacity="0.55" />
                <rect x="66" y="3" width="60" height="4" rx="2" fill="#a0c4f0" opacity="0.35" />
              </g>
            ))}
          </g>
          {/* animated check scanning down */}
          <circle className="dq-li-rule-scan" cx="132" cy="70" r="6" fill="url(#dq-li-rule-grad)" />
          <path d="M125 70 L 130 74 L 140 64" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="dq-li-rule-check" />
        </svg>
      )
    case "spark":
      return (
        <svg viewBox="0 0 180 180" width="180" height="180" className="dq-li dq-li-brs" aria-hidden>
          <defs>
            <linearGradient id="dq-brs-chip" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="rgba(160, 196, 240, 0.18)" />
              <stop offset="100%" stopColor="rgba(42, 68, 119, 0.3)" />
            </linearGradient>
            <linearGradient id="dq-brs-out" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"  stopColor="#a0c4f0" />
              <stop offset="100%" stopColor="#2A4477" />
            </linearGradient>
          </defs>

          {/* PROMPT BUBBLE (top) — plain English */}
          <g className="dq-li-brs-prompt">
            <rect x="18" y="20" width="144" height="42" rx="10"
                  fill="url(#dq-brs-chip)" stroke="#a0c4f0" strokeWidth="1.2" />
            <path d="M34 58 L 30 66 L 42 58 Z" fill="rgba(160, 196, 240, 0.18)" stroke="#a0c4f0" strokeWidth="1.2" strokeLinejoin="round" />
            {/* animated text lines being typed */}
            <rect x="28" y="30" width="0"  height="4" rx="2" fill="#a0c4f0" className="dq-li-brs-line dq-li-brs-l1" />
            <rect x="28" y="40" width="0"  height="4" rx="2" fill="#a0c4f0" className="dq-li-brs-line dq-li-brs-l2" />
            <rect x="28" y="50" width="0"  height="4" rx="2" fill="#a0c4f0" className="dq-li-brs-line dq-li-brs-l3" />
            {/* blinking caret */}
            <rect x="28" y="30" width="1.5" height="4" fill="#a0c4f0" className="dq-li-brs-caret" />
          </g>

          {/* COMPILE ARROW (middle) */}
          <g className="dq-li-brs-arrow">
            <line x1="90" y1="72"  x2="90" y2="96"  stroke="#a0c4f0" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M84 94 L 90 102 L 96 94" fill="none" stroke="#a0c4f0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* CLEANAI chip (center glyph) */}
          <g className="dq-li-brs-chip" transform="translate(90, 88)">
            <circle r="12" fill="#a0c4f0" />
            <path d="M -6 -3 L -6 3 M 6 -3 L 6 3 M -2 2 Q 0 4 2 2" fill="none" stroke="#0F1A29" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* RULE OUTPUT (bottom) — deterministic check chip */}
          <g className="dq-li-brs-output">
            <rect x="22" y="112" width="136" height="46" rx="10"
                  fill="url(#dq-brs-out)" stroke="#a0c4f0" strokeWidth="1.4" />
            {/* mono rule text bars */}
            <rect x="34" y="122" width="42" height="3.5" rx="1.5" fill="#0F1A29" opacity="0.75" />
            <rect x="80" y="122" width="18" height="3.5" rx="1.5" fill="#0F1A29" opacity="0.4" />
            <rect x="34" y="132" width="62" height="3.5" rx="1.5" fill="#0F1A29" opacity="0.55" />
            <rect x="34" y="142" width="34" height="3.5" rx="1.5" fill="#0F1A29" opacity="0.4" />
            {/* approval check badge */}
            <circle cx="140" cy="137" r="11" fill="#88C08A" className="dq-li-brs-check-bg" />
            <path d="M 135 137 L 139 141 L 146 133" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="dq-li-brs-check" />
          </g>
        </svg>
      )
    case "filter":
      return (
        <svg viewBox="0 0 180 180" width="180" height="180" className="dq-li dq-li-filter" aria-hidden>
          {/* funnel */}
          <path d="M30 40 L 150 40 L 108 92 L 108 150 L 72 136 L 72 92 Z"
                fill="rgba(160, 196, 240, 0.12)" stroke="#a0c4f0" strokeWidth="2" strokeLinejoin="round" />
          {/* particles dropping down */}
          <g className="dq-li-filter-parts">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={55 + i * 28} cy="30" r="5" fill="#a0c4f0"
                      className={`dq-li-filter-p dq-li-filter-p-${i}`} />
            ))}
          </g>
          {/* quarantine check */}
          <circle cx="90" cy="120" r="10" fill="#2E7D5A" className="dq-li-filter-pulse" />
          <path d="M85 120 L 89 124 L 96 117" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════════════
   STAGE ICONS for the vertical pipeline
   ═══════════════════════════════════════════════════════════════ */

function StageIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "scan":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" {...P} aria-hidden>
          <circle cx="13" cy="13" r="8" />
          <path d="M 19 19 L 26 26" strokeWidth="2.2" />
          <path d="M 9 13 H 17 M 13 9 V 17" strokeWidth="1.5" />
        </svg>
      )
    case "check":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" {...P} aria-hidden>
          <rect x="6" y="6" width="20" height="20" rx="3" />
          <path d="M 11 16 L 14.5 19.5 L 21 12" strokeWidth="2.2" />
        </svg>
      )
    case "gauge":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" {...P} aria-hidden>
          <path d="M 4 22 A 12 12 0 0 1 28 22" />
          <path d="M 16 22 L 23 12" strokeWidth="2.4" />
          <circle cx="16" cy="22" r="1.8" fill="currentColor" stroke="none" />
          <path d="M 6 26 H 26" opacity="0.4" />
        </svg>
      )
    case "shield":
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" {...P} aria-hidden>
          <path d="M 16 4 L 27 7.5 V 17 C 27 23.5, 22 27, 16 29 C 10 27, 5 23.5, 5 17 V 7.5 Z" />
          <path d="M 11 16 L 14.5 19.5 L 21 12" strokeWidth="2.2" />
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

      .dq-root {
        --bg:        #FAFAF5;
        --bg-2:      #F5F3EC;
        --paper:     #F8F6EE;
        --line:      rgba(15, 23, 41, 0.08);
        --line-2:    rgba(15, 23, 41, 0.14);
        --ink:       #0F1729;
        --ink-2:     #1E293B;
        --ink-3:     #475569;
        --ink-4:     #6B6F78;
        --brand:     #2A4477;
        --navy-deep: #0F1A29;
        --navy:      #141E30;
        --navy-cta:  #1E2E52;
        --navy-mid:  #3A5A94;
        --navy-light:#5A7FB5;

        background: var(--bg);
        color: var(--ink);
        font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        scroll-behavior: smooth;
      }
      .dq-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .dq-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

      .dq-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .dq-container { padding: 0 22px; } }

      /* NAV */
      .dq-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .dq-nav-solid {
        background: rgba(250, 250, 245, 0.94);
        border-bottom-color: var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06);
      }
      .dq-nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 36px; display: flex; align-items: center; justify-content: space-between; }
      .dq-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); }
      .dq-logo-wrap img { width: 38px; height: 38px; }
      .dq-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dq-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
      .dq-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; margin-top: 2px; }
      .dq-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .dq-nav-links > a { color: var(--ink-2); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .dq-nav-links > a:hover { color: var(--brand); }
      .dq-nav-cta { padding: 10px 18px; background: var(--ink); color: #FFFFFF !important; border-radius: 999px; font-weight: 500; font-size: 13.5px; transition: transform 0.25s, background 0.25s; }
      .dq-nav-cta:hover { background: var(--brand); transform: translateY(-1px); }

      .dq-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .dq-nav-dd-trigger { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; padding: 0; font: inherit; font-size: 14px; font-weight: 450; cursor: pointer; color: var(--ink-2); transition: color 0.25s; }
      .dq-nav-dd-trigger:hover { color: var(--brand); }
      .dq-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .dq-nav-dd-caret-open { transform: rotate(180deg); }
      .dq-nav-dd-menu {
        position: absolute; top: calc(100% - 2px); left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0; visibility: hidden;
        transition: opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1), transform 0.28s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s 0.28s;
        z-index: 60;
      }
      .dq-nav-dd-menu-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); transition: opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1), transform 0.35s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s; }
      .dq-nav-dd-inner-menu { margin-top: 14px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px -20px rgba(15, 23, 41, 0.22); }
      .dq-nav-dd-head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
      .dq-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .dq-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .dq-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .dq-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .dq-nav-dd-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink); transition: background 0.25s; }
      .dq-nav-dd-item:hover { background: var(--bg-2); }
      .dq-nav-dd-item-active { background: var(--bg-2); }
      .dq-nav-dd-item-active .dq-nav-dd-item-name { color: var(--brand); }
      .dq-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; color: var(--ink); }
      .dq-nav-dd-item-blurb { font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .dq-nav-dd-feature { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; text-decoration: none; color: #FFFFFF;
        background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
                    linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22); }
      .dq-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .dq-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .dq-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .dq-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .dq-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; color: #FFFFFF; margin: 4px 0 0; }
      .dq-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .dq-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* ═══ HERO — blue, centered ═══ */
      .dq-hero {
        position: relative;
        padding: 170px 0 120px;
        overflow: hidden;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--navy-deep) 100%);
        color: #FFFFFF;
        text-align: center;
      }
      .dq-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .dq-hero-glow-a {
        position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
        width: 1200px; height: 720px;
        background: radial-gradient(ellipse, rgba(58, 90, 148, 0.55), transparent 62%);
        filter: blur(80px);
      }
      .dq-hero-glow-b {
        position: absolute; bottom: -30%; left: 50%; transform: translateX(-50%);
        width: 900px; height: 600px;
        background: radial-gradient(ellipse, rgba(90, 127, 181, 0.32), transparent 62%);
        filter: blur(80px);
      }
      .dq-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.06) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 85%);
      }
      .dq-hero-body {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; align-items: center; gap: 22px;
        max-width: 900px;
        margin: 0 auto;
      }
      .dq-hero-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 12px; letter-spacing: 0.28em;
        color: #a0c4f0; font-weight: 700;
        padding: 8px 18px; border-radius: 999px;
        background: rgba(160, 196, 240, 0.08);
        border: 1px solid rgba(160, 196, 240, 0.2);
      }
      .dq-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(40px, 5.4vw, 78px);
        line-height: 1.05;
        letter-spacing: -0.032em;
        color: #FFFFFF;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
      }
      .dq-h1-line {
        display: block;
        white-space: nowrap;
      }
      .dq-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: #a0c4f0;
        font-size: 1.04em;
        letter-spacing: -0.01em;
      }
      @media (max-width: 640px) {
        .dq-h1 { font-size: clamp(34px, 9vw, 52px); }
        .dq-h1-line { white-space: normal; }
      }
      .dq-lede {
        font-size: 17px;
        line-height: 1.7;
        color: rgba(220, 232, 250, 0.85);
        max-width: 62ch;
        margin: 4px auto 0;
        text-wrap: pretty;
      }
      .dq-hero-stats {
        display: inline-flex; align-items: center; gap: 28px;
        margin-top: 18px;
        padding: 18px 28px;
        border-radius: 14px;
        background: linear-gradient(155deg, rgba(42, 68, 119, 0.4), rgba(20, 30, 48, 0.55));
        border: 1px solid rgba(160, 196, 240, 0.18);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      .dq-hero-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .dq-hero-stat b {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 24px;
        color: #FFFFFF; letter-spacing: -0.02em; line-height: 1;
      }
      .dq-hero-stat span {
        font-family: var(--font-mono), monospace;
        font-size: 10px; letter-spacing: 0.18em;
        color: #a0c4f0; text-transform: uppercase;
      }
      .dq-hero-stat-divider { width: 1px; height: 32px; background: rgba(160, 196, 240, 0.22); }
      @media (max-width: 640px) {
        .dq-hero { padding: 130px 0 80px; }
      }

      /* ═══ SHARED section head ═══ */
      .dq-section-head {
        max-width: 760px;
        margin: 0 auto 72px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dq-section-head-light { }
      .dq-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
      }
      .dq-eyebrow-light { color: #a0c4f0; }
      .dq-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(32px, 4.4vw, 54px);
        line-height: 1.05;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .dq-h2-light { color: #FFFFFF; }
      .dq-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.05em;
      }
      .dq-h2-em-light { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 400; color: #a0c4f0; font-size: 1.05em; }

      /* ═══ LAYERS OF QUALITY ═══ */
      .dq-layers { padding: 120px 0 110px; background: var(--bg); }
      .dq-layers-list { display: flex; flex-direction: column; gap: 48px; }
      .dq-layer-row {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
        gap: 56px;
        align-items: center;
        padding: 44px 0;
        border-top: 1px solid var(--line);
      }
      @media (max-width: 860px) {
        .dq-layer-row {
          grid-template-columns: 1fr; gap: 24px; padding: 32px 0;
        }
      }
      .dq-layer-text { display: flex; flex-direction: column; gap: 12px; }
      .dq-layer-n {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.24em;
        color: var(--brand); font-weight: 700;
      }
      .dq-layer-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(24px, 2.8vw, 32px);
        letter-spacing: -0.02em;
        color: var(--ink);
        margin: 0;
        line-height: 1.18;
      }
      .dq-layer-b {
        font-size: 16px;
        line-height: 1.7;
        color: var(--ink-3);
        margin: 0;
        max-width: 56ch;
        text-wrap: pretty;
      }
      .dq-layer-visual {
        display: flex; align-items: center; justify-content: center;
        min-height: 220px;
        position: relative;
      }
      .dq-layer-visual::before {
        content: "";
        position: absolute; inset: -10%;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.15), transparent 62%);
        filter: blur(40px);
      }

      /* Layer icon animations */
      .dq-li { position: relative; z-index: 1; }
      .dq-li-rule-rows g { animation: dq-li-rule-fade 3s ease-in-out infinite; }
      .dq-li-rule-rows g:nth-child(1) { animation-delay: 0s; }
      .dq-li-rule-rows g:nth-child(2) { animation-delay: 0.2s; }
      .dq-li-rule-rows g:nth-child(3) { animation-delay: 0.4s; }
      .dq-li-rule-rows g:nth-child(4) { animation-delay: 0.6s; }
      .dq-li-rule-rows g:nth-child(5) { animation-delay: 0.8s; }
      @keyframes dq-li-rule-fade {
        0%, 100% { opacity: 0.4; }
        50%      { opacity: 1; }
      }
      .dq-li-rule-scan {
        animation: dq-li-rule-scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes dq-li-rule-scan {
        0%   { transform: translateY(0); opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; transform: translateY(80px); }
        100% { opacity: 0; transform: translateY(80px); }
      }
      .dq-li-rule-check {
        animation: dq-li-rule-check 3s ease-out infinite;
      }
      @keyframes dq-li-rule-check {
        0%, 15% { stroke-dasharray: 28; stroke-dashoffset: 28; }
        30%, 90% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 0; }
      }
      /* Business Rules Suggestion — prompt typing → compile → rule output */
      .dq-li-brs-line {
        animation: dq-li-brs-type 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .dq-li-brs-l1 { animation-delay: 0.2s; --w: 96px; }
      .dq-li-brs-l2 { animation-delay: 0.9s; --w: 72px; }
      .dq-li-brs-l3 { animation-delay: 1.6s; --w: 52px; }
      @keyframes dq-li-brs-type {
        0%        { width: 0; }
        8%, 55%   { width: var(--w); }
        70%, 100% { width: 0; }
      }
      .dq-li-brs-caret {
        animation: dq-li-brs-caret 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes dq-li-brs-caret {
        0%   { transform: translate(0px, 0); opacity: 1; }
        10%  { transform: translate(96px, 0); opacity: 1; }
        12%  { transform: translate(0, 10px); opacity: 1; }
        25%  { transform: translate(72px, 10px); opacity: 1; }
        27%  { transform: translate(0, 20px); opacity: 1; }
        40%  { transform: translate(52px, 20px); opacity: 1; }
        55%  { opacity: 0; }
        100% { opacity: 0; }
      }
      .dq-li-brs-arrow {
        opacity: 0;
        animation: dq-li-brs-arrow 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes dq-li-brs-arrow {
        0%, 55%   { opacity: 0; }
        60%, 80%  { opacity: 1; }
        90%, 100% { opacity: 0; }
      }
      .dq-li-brs-chip {
        opacity: 0;
        transform-origin: center;
        animation: dq-li-brs-chip 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes dq-li-brs-chip {
        0%, 55%   { opacity: 0; transform: scale(0.6); }
        65%, 82%  { opacity: 1; transform: scale(1); }
        92%, 100% { opacity: 0; transform: scale(0.6); }
      }
      .dq-li-brs-output {
        opacity: 0;
        transform: translateY(12px);
        animation: dq-li-brs-output 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes dq-li-brs-output {
        0%, 65%   { opacity: 0; transform: translateY(12px); }
        75%, 92%  { opacity: 1; transform: translateY(0); }
        100%      { opacity: 0; transform: translateY(12px); }
      }
      .dq-li-brs-check {
        stroke-dasharray: 22;
        stroke-dashoffset: 22;
        animation: dq-li-brs-check 5s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      @keyframes dq-li-brs-check {
        0%, 78%   { stroke-dashoffset: 22; }
        88%, 100% { stroke-dashoffset: 0; }
      }
      .dq-li-brs-check-bg {
        transform-origin: 140px 137px;
        animation: dq-li-brs-bg 5s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      @keyframes dq-li-brs-bg {
        0%, 78%   { transform: scale(0.6); opacity: 0; }
        88%, 95%  { transform: scale(1.15); opacity: 1; }
        100%      { transform: scale(1); opacity: 0.85; }
      }
      .dq-li-filter-p {
        animation: dq-li-drop 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      .dq-li-filter-p-0 { animation-delay: 0s; }
      .dq-li-filter-p-1 { animation-delay: 0.3s; }
      .dq-li-filter-p-2 { animation-delay: 0.6s; }
      .dq-li-filter-p-3 { animation-delay: 0.9s; }
      @keyframes dq-li-drop {
        0%   { transform: translateY(0); opacity: 0; }
        20%  { opacity: 1; }
        70%  { transform: translateY(85px); opacity: 1; }
        100% { transform: translateY(85px); opacity: 0; }
      }
      .dq-li-filter-pulse {
        transform-origin: 90px 120px;
        animation: dq-li-pulse 1.8s ease-in-out infinite;
      }
      @keyframes dq-li-pulse {
        0%, 100% { transform: scale(1);    opacity: 0.95; }
        50%      { transform: scale(1.12); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dq-li *, .dq-li-rule-rows g, .dq-li-rule-scan, .dq-li-rule-check,
        .dq-li-filter-p, .dq-li-filter-pulse,
        .dq-li-brs-line, .dq-li-brs-caret, .dq-li-brs-arrow,
        .dq-li-brs-chip, .dq-li-brs-output, .dq-li-brs-check, .dq-li-brs-check-bg {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
        .dq-li-brs-line { width: var(--w) !important; }
      }

      /* ═══ PIPELINE — navy band + vertical stages with icons ═══ */
      .dq-pipeline {
        position: relative;
        padding: 130px 0 140px;
        background:
          radial-gradient(ellipse 900px 540px at 50% 10%, rgba(58, 90, 148, 0.3), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dq-pipeline-bg { position: absolute; inset: 0; pointer-events: none; }
      .dq-pipeline-glow {
        position: absolute; top: 30%; left: 50%; transform: translateX(-50%);
        width: 700px; height: 500px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.25), transparent 62%);
        filter: blur(80px);
      }
      .dq-pipeline > .dq-container { position: relative; z-index: 1; }

      .dq-pipe-wrap {
        position: relative;
        max-width: 780px;
        margin: 0 auto;
        padding: 20px 0;
      }
      .dq-pipe-rail { display: none; }
      .dq-pipe-rail-fill { display: none; }
      .dq-pipe-step::after {
        content: "";
        position: absolute;
        left: 44px;
        top: 45px;
        width: 2px;
        bottom: -48px;
        background: linear-gradient(180deg, #a0c4f0 0%, var(--brand) 70%, rgba(160, 196, 240, 0.22) 100%);
        z-index: 0;
        pointer-events: none;
        transform-origin: top;
        animation: dq-pipe-grow 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      .dq-pipe-step:last-child::after { display: none; }
      @keyframes dq-pipe-grow {
        from { transform: scaleY(0); }
        to   { transform: scaleY(1); }
      }
      .dq-pipe-steps {
        list-style: none; padding: 0; margin: 0;
        display: flex; flex-direction: column;
        gap: 48px;
      }
      .dq-pipe-step {
        display: grid;
        grid-template-columns: 90px 1fr;
        gap: 28px;
        align-items: flex-start;
        position: relative;
      }
      .dq-pipe-badge {
        position: relative;
        width: 90px; height: 90px;
        border-radius: 50%;
        display: inline-flex; align-items: center; justify-content: center;
        background:
          radial-gradient(circle at 30% 30%, rgba(160, 196, 240, 0.4), transparent 70%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 70%, var(--navy) 100%);
        color: #a0c4f0;
        border: 1px solid rgba(160, 196, 240, 0.28);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.12) inset,
          0 16px 36px -14px rgba(42, 68, 119, 0.6);
        z-index: 1;
      }
      .dq-pipe-ping {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px solid rgba(160, 196, 240, 0.35);
        animation: dq-pipe-ping 2.6s ease-out infinite;
      }
      @keyframes dq-pipe-ping {
        0%   { transform: scale(0.85); opacity: 0.9; }
        80%  { transform: scale(1.35); opacity: 0; }
        100% { transform: scale(1.35); opacity: 0; }
      }
      .dq-pipe-text { padding-top: 16px; }
      .dq-pipe-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        margin: 0 0 8px;
      }
      .dq-pipe-b {
        font-size: 14.5px;
        line-height: 1.65;
        color: rgba(220, 232, 250, 0.8);
        margin: 0;
        max-width: 52ch;
      }
      @media (prefers-reduced-motion: reduce) {
        .dq-pipe-step::after { animation: none; transform: scaleY(1); }
        .dq-pipe-ping { animation: none; opacity: 0.3; }
      }
      @media (max-width: 640px) {
        .dq-pipe-wrap { padding: 12px 0; }
        .dq-pipe-step { grid-template-columns: 68px 1fr; gap: 18px; }
        .dq-pipe-badge { width: 68px; height: 68px; }
        .dq-pipe-badge svg { width: 22px; height: 22px; }
        .dq-pipe-step::after { left: 33px; top: 34px; bottom: -48px; }
      }

      /* ═══ PRODUCT — image left (click to expand), content right ═══ */
      .dq-product { padding: 130px 0 120px; background: var(--bg); }
      .dq-product-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: 64px;
        align-items: center;
      }
      @media (max-width: 900px) {
        .dq-product-grid { grid-template-columns: 1fr; gap: 40px; }
      }
      .dq-product-frame { margin: 0; }
      .dq-product-trigger {
        display: block; width: 100%;
        padding: 0; margin: 0; border: none;
        background: transparent;
        cursor: zoom-in;
        border-radius: 18px;
        overflow: hidden;
        position: relative;
        background: #FFFFFF;
        border: 1px solid var(--line);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 40px 90px -32px rgba(42, 68, 119, 0.28),
          0 14px 30px -12px rgba(15, 23, 41, 0.14);
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s;
      }
      .dq-product-trigger:hover {
        transform: translateY(-4px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 54px 110px -32px rgba(42, 68, 119, 0.4),
          0 20px 40px -14px rgba(15, 23, 41, 0.18);
      }
      .dq-product-trigger:hover .dq-product-expand {
        background: rgba(15, 23, 41, 0.95);
        transform: translateY(-2px);
        box-shadow: 0 10px 28px -8px rgba(15, 23, 41, 0.5);
      }
      .dq-product-chrome {
        display: flex; align-items: center; gap: 7px;
        padding: 12px 16px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .dq-product-dot { width: 10px; height: 10px; border-radius: 50%; }
      .dq-product-dot-r { background: #E8816D; }
      .dq-product-dot-y { background: #E8C66D; }
      .dq-product-dot-g { background: #88C08A; }
      .dq-product-tab {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.04em;
        color: var(--ink-3); margin-left: 10px;
      }
      .dq-product-img { display: block; width: 100%; height: auto; background: var(--bg); }
      .dq-product-expand {
        position: absolute; bottom: 18px; right: 18px;
        display: inline-flex; align-items: center; gap: 8px;
        padding: 9px 14px;
        background: rgba(15, 23, 41, 0.82);
        color: #FFFFFF;
        border-radius: 999px;
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.1em;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        pointer-events: none;
        transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
      }
      .dq-product-text { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
      .dq-product-text .dq-h2 { text-align: left; }
      .dq-product-text .dq-section-head,
      .dq-product-text .dq-eyebrow { text-align: left; }
      .dq-product-body {
        font-size: 16px;
        line-height: 1.7;
        color: var(--ink-3);
        margin: 4px 0 0;
        max-width: 52ch;
      }
      .dq-product-points {
        list-style: none; padding: 0; margin: 16px 0 0;
        display: flex; flex-direction: column; gap: 10px;
      }
      .dq-product-points li {
        display: flex; align-items: flex-start; gap: 10px;
        font-size: 14.5px; color: var(--ink-2);
        line-height: 1.55;
      }
      .dq-product-points span { color: var(--brand); font-weight: 700; margin-top: 2px; }

      /* ═══ LIGHTBOX ═══ */
      .dq-lightbox {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(15, 23, 41, 0.9);
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
        display: flex; align-items: center; justify-content: center;
        padding: 40px 30px;
        animation: dq-fade-in 0.3s ease-out;
        cursor: zoom-out;
      }
      @keyframes dq-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .dq-lightbox-img {
        max-width: 92vw;
        max-height: 88vh;
        width: auto; height: auto;
        border-radius: 10px;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
        cursor: default;
        animation: dq-zoom-in 0.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
      @keyframes dq-zoom-in {
        from { transform: scale(0.92); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
      .dq-lightbox-close {
        position: fixed; top: 24px; right: 28px; z-index: 202;
        display: inline-flex; align-items: center; justify-content: center;
        width: 44px; height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.22);
        color: #FFFFFF;
        cursor: pointer;
        transition: background 0.25s, transform 0.25s;
      }
      .dq-lightbox-close:hover { background: rgba(255, 255, 255, 0.22); transform: rotate(90deg); }

      /* ═══ QUALITY SUITE — 2 cards per row (2×3), individual slide-ins ═══ */
      .dq-suite { padding: 120px 0 130px; background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .dq-suite-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        max-width: 1100px;
        margin: 0 auto;
      }
      @media (max-width: 640px) {
        .dq-suite-grid { grid-template-columns: 1fr; }
      }
      .dq-suite-cell {
        position: relative;
        padding: 32px 28px 30px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        display: flex; flex-direction: column; gap: 12px;
        min-height: 230px;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s, box-shadow 0.4s;
      }
      .dq-suite-cell::before {
        content: "";
        position: absolute; top: 0; left: 22px; right: 22px; height: 2px;
        background: linear-gradient(90deg, transparent, var(--brand), transparent);
        opacity: 0; transition: opacity 0.4s;
      }
      .dq-suite-cell:hover {
        transform: translateY(-5px);
        border-color: rgba(42, 68, 119, 0.3);
        box-shadow: 0 26px 54px -22px rgba(42, 68, 119, 0.24);
      }
      .dq-suite-cell:hover::before { opacity: 1; }
      .dq-suite-dot {
        width: 10px; height: 10px; border-radius: 50%;
        background: var(--brand);
        box-shadow: 0 0 0 4px rgba(42, 68, 119, 0.12);
        margin-bottom: 4px;
      }
      .dq-suite-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: -0.018em;
        color: var(--ink);
        margin: 0;
        line-height: 1.22;
      }
      .dq-suite-b {
        font-size: 14.5px;
        line-height: 1.65;
        color: var(--ink-3);
        margin: 0;
      }

      /* ═══ OUTCOME — blue card ═══ */
      .dq-outcome { padding: 100px 0 110px; background: var(--bg); }
      .dq-outcome-card {
        position: relative;
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 56px;
        align-items: center;
        padding: 56px 48px;
        border-radius: 22px;
        background:
          radial-gradient(ellipse at 15% 0%, rgba(120, 160, 220, 0.32), transparent 62%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        color: #FFFFFF;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.1) inset,
          0 40px 90px -32px rgba(42, 68, 119, 0.45);
      }
      .dq-outcome-bg { position: absolute; inset: 0; pointer-events: none; }
      .dq-outcome-glow {
        position: absolute; top: 50%; right: -10%;
        transform: translateY(-50%);
        width: 400px; height: 400px;
        background: radial-gradient(circle, rgba(160, 196, 240, 0.22), transparent 62%);
        filter: blur(60px);
      }
      .dq-outcome-stat { display: flex; flex-direction: column; gap: 6px; position: relative; z-index: 1; }
      .dq-outcome-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(60px, 7.2vw, 100px);
        color: #FFFFFF;
        letter-spacing: -0.03em;
        line-height: 0.92;
      }
      .dq-outcome-label {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: #a0c4f0; text-transform: uppercase;
      }
      .dq-outcome-quote {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        font-size: clamp(20px, 2.4vw, 28px);
        line-height: 1.42;
        color: rgba(220, 232, 250, 0.95);
        margin: 0;
        position: relative; z-index: 1;
        max-width: 48ch;
        text-wrap: pretty;
      }
      .dq-outcome-q {
        font-family: var(--font-serif), serif;
        color: #a0c4f0;
        font-size: 1.5em;
        line-height: 0;
        margin-right: 6px;
        vertical-align: -0.2em;
      }
      @media (max-width: 820px) {
        .dq-outcome-card { grid-template-columns: 1fr; gap: 28px; padding: 40px 32px; }
      }

      /* ═══ FINAL CTA (matches landing) ═══ */
      .dq-cta-final { padding: 0 0 100px; background: var(--bg); }
      .dq-cta-card {
        position: relative;
        padding: 44px 48px;
        border-radius: 22px;
        background: var(--brand);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.1) inset,
          0 30px 70px -26px rgba(42, 68, 119, 0.5);
        overflow: hidden;
      }
      .dq-cta-rings {
        position: absolute; top: 50%; right: -5%;
        transform: translateY(-50%);
        width: 340px; height: 340px;
        z-index: 1; pointer-events: none;
      }
      .dq-cta-ring {
        position: absolute; top: 50%; left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      .dq-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: dq-ripple 3s ease-in-out infinite; }
      .dq-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: dq-ripple 3s ease-in-out infinite 0.4s; }
      .dq-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: dq-ripple 3s ease-in-out infinite 0.8s; }
      .dq-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: dq-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes dq-ripple {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; }
      }
      @keyframes dq-ripple-core {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dq-cta-ring { animation: none !important; }
      }
      .dq-cta-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        gap: 6px; max-width: 480px;
      }
      .dq-cta-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: clamp(26px, 3vw, 36px);
        line-height: 1.12; letter-spacing: -0.02em;
        margin: 0; color: #FFFFFF;
      }
      .dq-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.85); }
      .dq-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 6px 0 18px; line-height: 1.5; max-width: 40ch; }
      .dq-cta-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 13px 22px; border-radius: 999px;
        background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600;
        text-decoration: none; align-self: flex-start; white-space: nowrap;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .dq-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .dq-cta-pill-arrow {
        display: inline-flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border-radius: 50%;
        background: var(--brand); color: #FFFFFF; font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .dq-cta-pill:hover .dq-cta-pill-arrow { background: var(--navy-cta); transform: translateX(2px); }

      /* ─── RELATED (style 2 · navy hover-underline cards) ─── */
      .dq-related {
        position: relative;
        padding: 120px 0 80px;
        overflow: hidden;
        color: #FFFFFF;
        background:
          radial-gradient(ellipse 800px 500px at 50% 0%, rgba(58, 90, 148, 0.3), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--navy-deep) 100%);
      }
      .dq-related-bg { position: absolute; inset: 0; pointer-events: none; }
      .dq-related-glow { position: absolute; bottom: -8%; left: 50%; transform: translateX(-50%); width: 720px; height: 480px; background: radial-gradient(circle, rgba(90, 127, 181, 0.28), transparent 62%); filter: blur(90px); }
      .dq-related-grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(160, 196, 240, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(160, 196, 240, 0.05) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%); }
      .dq-related > .dq-container { position: relative; z-index: 1; }
      .dq-related-head { max-width: 760px; margin: 0 auto 56px; display: flex; flex-direction: column; gap: 14px; text-align: center; align-items: center; }
      .dq-related-grid-wrap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
      @media (max-width: 900px) {
        .dq-related-grid-wrap { grid-template-columns: 1fr; gap: 14px; }
        .dq-related { padding: 72px 0 48px; }
        .dq-related-head { margin: 0 auto 32px; }
      }
      @media (max-width: 600px) {
        .dq-related { padding: 48px 0 32px; }
        .dq-related-head { margin: 0 auto 24px; }
        .dq-related-card { padding: 22px 20px 20px; }
        /* Kill the bottom bleed — the CTA sits on a light surface, so end the navy cleanly */
        .dq-related-grid-wrap { gap: 12px; margin-bottom: 0; }
      }
      /* Tighten the section-to-CTA transition globally on mobile so no empty navy slab sits above the blue card */
      @media (max-width: 900px) {
        .dq-main > .sc-cta,
        .sc-cta { padding-top: 8px; }
      }
      .dq-related-card {
        position: relative;
        display: block;
        padding: 32px 30px 30px;
        text-decoration: none;
        color: #FFFFFF;
        border-radius: 16px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.12) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.36) 0%, rgba(18, 28, 46, 0.62) 100%);
        border: 1px solid rgba(160, 196, 240, 0.2);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 22px 50px -24px rgba(0, 0, 0, 0.6);
        overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.5s, box-shadow 0.5s;
      }
      .dq-related-card:hover {
        transform: translateY(-6px);
        border-color: rgba(160, 196, 240, 0.42);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 34px 70px -26px rgba(42, 68, 119, 0.65);
      }
      .dq-related-marker {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.22em;
        color: rgba(200, 215, 240, 0.65);
        font-weight: 700;
      }
      .dq-related-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 22px;
        letter-spacing: -0.02em; color: #FFFFFF;
        line-height: 1.2;
        margin: 14px 0 10px;
      }
      .dq-related-b {
        font-size: 14.5px; line-height: 1.65;
        color: rgba(220, 232, 250, 0.78);
        margin: 0 0 24px;
        text-wrap: pretty;
      }
      .dq-related-cta {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #a0c4f0;
      }
      .dq-related-card:hover .dq-related-cta svg { transform: translateX(4px); }
      .dq-related-cta svg { transition: transform 0.4s; }
      .dq-related-underline {
        position: absolute; left: 30px; right: 30px; bottom: 0; height: 2px;
        background: linear-gradient(90deg, #a0c4f0 0%, transparent 100%);
        transform: scaleX(0); transform-origin: left;
        transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dq-related-card:hover .dq-related-underline { transform: scaleX(1); }

      /* ═══ FOOTER ═══ */
      .dq-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden;
      }
      .dq-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%); width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .dq-footer > .dq-container { position: relative; z-index: 1; }
      .dq-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .dq-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .dq-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .dq-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dq-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .dq-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dq-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dq-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .dq-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .dq-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .dq-foot-h {
        font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700; margin-bottom: 18px;
        text-transform: uppercase;
      }
      .dq-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .dq-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .dq-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .dq-footer-watermark {
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
      .dq-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .dq-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .dq-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .dq-footer { padding: 72px 0 0; margin-top: 60px; }
        .dq-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
      }
    `}</style>
  )
}
