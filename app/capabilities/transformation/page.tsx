"use client"

/**
 * Data Transformation — bespoke page.
 *   - Hero: text left + live schema-transform animation right
 *   - Quote banner retained
 *   - Pillars: large animated icons LEFT, text RIGHT (3 rows)
 *   - Features: distinctive tabbed "operator deck" (5 items, no Universal format conversion)
 *   - No product-image section
 */

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
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

const GUARANTEES = [
  {
    icon: "automap",
    h: "AutoMap field resolution",
    b: "Column names, sample values, and target-side taxonomy weighed together. AutoMap proposes source-to-target mappings with confidence scores — your stewards approve, override, or refine before anything is deployed.",
  },
  {
    icon: "recipe",
    h: "Version-controlled blueprints",
    b: "Every mapping, rename, coercion, and reshape is captured in a named blueprint. Blueprints are versioned, re-runnable, rolled back in one click, and replayable across every dataset from a given source.",
  },
  {
    icon: "lock",
    h: "Deterministic execution",
    b: "Every transform is a registered operation. No arbitrary code, no hidden logic, no shadow scripts in production — only named, audited, reversible operations that your compliance team can read end-to-end.",
  },
]

const OPERATORS = [
  {
    key: "map",
    label: "Mapping",
    tag: "01 · SOURCE → TARGET",
    h: "AutoMap inference engine",
    b: "Column names, sample values, and target-side taxonomy weighed together — proposed mappings ship with confidence scores for steward approval.",
  },
  {
    key: "approval",
    label: "Approvals",
    tag: "02 · GATED DEPLOYMENT",
    h: "Approval-based deployment",
    b: "No mapping enters production without sign-off. Every change is captured, attributable, and reversible from the blueprint's version history.",
  },
  {
    key: "coerce",
    label: "Coercion",
    tag: "03 · TYPE CONVERSION",
    h: "Type coercion with audit",
    b: "Text → number → date conversions execute as registered, logged operations — never silent parser drift. Every coercion carries its before-state and operator identity.",
  },
  {
    key: "reshape",
    label: "Reshape",
    tag: "04 · STRUCTURAL",
    h: "Structural reshape operators",
    b: "Flatten nested structures, split or merge columns, pivot, unpivot — each operation a named, versioned blueprint step with a reviewable diff.",
  },
  {
    key: "recipe",
    label: "Blueprints",
    tag: "05 · VERSIONED ARTIFACTS",
    h: "Versioned transform blueprints",
    b: "Saved blueprints are first-class artifacts: named, version-controlled, and re-runnable across every dataset from a given source. Rollback is one click away.",
  },
]

export default function DataTransformationPage() {
  const reduced = useReducedMotion()
  const [activeOp, setActiveOp] = useState("map")

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  const activeOperator = OPERATORS.find((o) => o.key === activeOp) ?? OPERATORS[0]

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} dt-root`}>
      {/* Nav */}
      <SiteNav />

      <main className="dt-main">
        {/* ───── HERO — text left, live transform animation right ───── */}
        <section className="dt-hero">
          <div className="dt-hero-bg" aria-hidden>
            <div className="dt-hero-grid" />
            <div className="dt-hero-glow" />
          </div>
          <div className="dt-container">
            <div className="dt-hero-grid-content">
              <div className="dt-hero-text">
                <motion.span className="dt-eyebrow" {...rise(0.05)}>DATA TRANSFORMATION</motion.span>
                <motion.h1 className="dt-h1" {...rise(0.12)}>
                  <span className="dt-h1-line">Any schema,</span>
                  <span className="dt-h1-em">into any target.</span>
                </motion.h1>
                <motion.p className="dt-lede" {...rise(0.28)}>
                  AutoMap suggests source-to-target field mappings with confidence scoring;
                  your stewards approve before deployment. Saved transform blueprints are
                  version-controlled, named, and re-runnable. Type coercion, structural
                  reshape, and format conversion execute deterministically — never as
                  ad-hoc scripts.
                </motion.p>
              </div>
              <motion.div
                className="dt-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <TransformAnimation />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── QUOTE BANNER ───── */}
        <section className="dt-quote">
          <div className="dt-container">
            <motion.p {...rise(0.05)}>
              <span className="dt-quote-mark">&ldquo;</span>
              One source, many destinations. Mapped, not migrated manually.
            </motion.p>
          </div>
        </section>

        {/* ───── THE GUARANTEES — large animated icons LEFT, content RIGHT ───── */}
        <section className="dt-guarantees">
          <div className="dt-container">
            <motion.div className="dt-section-head" {...rise(0.05)}>
              <span className="dt-eyebrow">THE DETERMINISTIC CORE</span>
              <h2 className="dt-h2">
                Three constants<br />
                <span className="dt-h2-em">behind every transform</span>.
              </h2>
            </motion.div>
            <div className="dt-guar-list">
              {GUARANTEES.map((g, i) => (
                <motion.article
                  key={g.h}
                  className="dt-guar-row"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: 0.05 + i * 0.12, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dt-guar-icon" aria-hidden>
                    <GuaranteeIcon name={g.icon} />
                  </div>
                  <div className="dt-guar-text">
                    <span className="dt-guar-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="dt-guar-h">{g.h}</h3>
                    <p className="dt-guar-b">{g.b}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE OPERATORS — tabbed deck ───── */}
        <section className="dt-ops">
          <div className="dt-ops-bg" aria-hidden>
            <div className="dt-ops-glow" />
          </div>
          <div className="dt-container">
            <motion.div className="dt-section-head dt-section-head-light" {...rise(0.05)}>
              <span className="dt-eyebrow dt-eyebrow-light">THE OPERATOR DECK</span>
              <h2 className="dt-h2 dt-h2-light">
                Five primitives,<br />
                <span className="dt-h2-em-light">every transform composed</span>.
              </h2>
            </motion.div>
            <div className="dt-ops-layout">
              <nav className="dt-ops-nav" aria-label="Transformation operators">
                {OPERATORS.map((op, i) => (
                  <motion.button
                    key={op.key}
                    type="button"
                    className={`dt-ops-tab ${activeOp === op.key ? "dt-ops-tab-active" : ""}`}
                    onMouseEnter={() => setActiveOp(op.key)}
                    onFocus={() => setActiveOp(op.key)}
                    onClick={() => setActiveOp(op.key)}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                  >
                    <span className="dt-ops-tab-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="dt-ops-tab-label">{op.label}</span>
                    <span className="dt-ops-tab-bar" aria-hidden />
                  </motion.button>
                ))}
              </nav>
              <motion.div
                key={activeOperator.key}
                className="dt-ops-panel"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <span className="dt-ops-tag">{activeOperator.tag}</span>
                <h3 className="dt-ops-h">{activeOperator.h}</h3>
                <p className="dt-ops-b">{activeOperator.b}</p>
                <OperatorVisual op={activeOperator.key} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RELATED — display-italic split cards ───── */}
        <section className="dt-related">
          <div className="dt-container">
            <motion.div className="dt-related-head" {...rise(0.05)}>
              <span className="dt-eyebrow">AFTER THE RESHAPE</span>
              <h2 className="dt-h2">
                Where mapped data<br />
                <span className="dt-h2-em">flows into the next system.</span>
              </h2>
            </motion.div>
            <div className="dt-related-split">
              {SOLUTIONS.filter(s => s.slug !== "transformation").slice(0, 3).map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.05 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="dt-related-card">
                    <div className="dt-related-left">
                      <span className="dt-related-serif">{s.name.replace(/^Data\s/, "")}</span>
                    </div>
                    <div className="dt-related-right">
                      <p className="dt-related-b">{s.blurb}</p>
                      <span className="dt-related-cta" aria-hidden>
                        <svg viewBox="0 0 20 10" width="24" height="14" fill="none">
                          <path d="M0 5 H 18 M 14 1 L 18 5 L 14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
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
   HERO — Live Schema Transform Animation
   ═══════════════════════════════════════════════════════════════ */

function TransformAnimation() {
  const maps = [
    { src: "Vendor Name",     tgt: "supplier",         delay: 0 },
    { src: "Inv #",            tgt: "invoice_number",   delay: 0.25 },
    { src: "Bill Date",        tgt: "issued_at",        delay: 0.5 },
    { src: "Amount (USD)",     tgt: "amount",           delay: 0.75 },
  ]
  return (
    <div className="dt-anim">
      <div className="dt-anim-chrome">
        <span className="dt-anim-dot" />
        <span className="dt-anim-dot" />
        <span className="dt-anim-dot" />
        <span className="dt-anim-title">vendor_export → finance_mart</span>
        <span className="dt-anim-live"><span className="dt-anim-pulse" />AUTOMAP</span>
      </div>
      <div className="dt-anim-body">
        <div className="dt-anim-labels">
          <span className="dt-anim-col-h">SOURCE</span>
          <span className="dt-anim-col-mid">→</span>
          <span className="dt-anim-col-h dt-anim-col-h-tgt">TARGET</span>
        </div>
        <div className="dt-anim-rows">
          {maps.map((m, i) => (
            <div key={m.src} className="dt-anim-row" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
              <div className="dt-anim-chip dt-anim-chip-src">
                <span className="dt-anim-dot-blue" />
                {m.src}
              </div>
              <div className="dt-anim-wire" aria-hidden>
                <svg viewBox="0 0 100 12" preserveAspectRatio="none" width="100%" height="12">
                  <line x1="0" y1="6" x2="88" y2="6" stroke="rgba(42, 68, 119, 0.28)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M 84 1.5 L 92 6 L 84 10.5" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="dt-anim-flow" style={{ animationDelay: `${0.8 + i * 0.12}s` }} />
              </div>
              <div className="dt-anim-chip dt-anim-chip-tgt">
                <span className="dt-anim-tgt-name">{m.tgt}</span>
                <span className="dt-anim-confidence">✓</span>
              </div>
            </div>
          ))}
        </div>
        <div className="dt-anim-foot">
          <span><b>4</b> mapped</span>
          <span className="dt-anim-sep" />
          <span><b>0</b> scripts</span>
          <span className="dt-anim-sep" />
          <span>approved ✓</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GUARANTEE ICONS — large (180px), animated
   ═══════════════════════════════════════════════════════════════ */

function GuaranteeIcon({ name }: { name: string }) {
  switch (name) {
    case "automap":
      return (
        <svg viewBox="0 0 200 200" width="180" height="180" className="dt-gi dt-gi-automap" aria-hidden>
          <defs>
            <linearGradient id="dt-gi-map" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5A7FB5" />
              <stop offset="100%" stopColor="#2A4477" />
            </linearGradient>
          </defs>
          {/* source column */}
          <g>
            <rect x="10" y="30" width="60" height="20" rx="6" fill="rgba(42, 68, 119, 0.12)" stroke="#2A4477" strokeWidth="1.2" />
            <rect x="10" y="60" width="60" height="20" rx="6" fill="rgba(42, 68, 119, 0.12)" stroke="#2A4477" strokeWidth="1.2" />
            <rect x="10" y="90" width="60" height="20" rx="6" fill="rgba(42, 68, 119, 0.12)" stroke="#2A4477" strokeWidth="1.2" />
          </g>
          {/* target column */}
          <g>
            <rect x="130" y="50" width="60" height="20" rx="6" fill="url(#dt-gi-map)" />
            <rect x="130" y="80" width="60" height="20" rx="6" fill="url(#dt-gi-map)" />
            <rect x="130" y="110" width="60" height="20" rx="6" fill="url(#dt-gi-map)" />
          </g>
          {/* animated wires */}
          <g className="dt-gi-wires" fill="none" strokeWidth="1.6" strokeLinecap="round">
            <path d="M 70 40 C 100 40 100 60 130 60" stroke="#2A4477" className="dt-gi-wire dt-gi-wire-1" />
            <path d="M 70 70 C 100 70 100 90 130 90" stroke="#2A4477" className="dt-gi-wire dt-gi-wire-2" />
            <path d="M 70 100 C 100 100 100 120 130 120" stroke="#2A4477" className="dt-gi-wire dt-gi-wire-3" />
          </g>
          {/* flow dots */}
          <circle r="3" fill="#a0c4f0" className="dt-gi-dot dt-gi-dot-1">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 70 40 C 100 40 100 60 130 60" />
          </circle>
          <circle r="3" fill="#a0c4f0" className="dt-gi-dot dt-gi-dot-2">
            <animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" path="M 70 70 C 100 70 100 90 130 90" />
          </circle>
          <circle r="3" fill="#a0c4f0" className="dt-gi-dot dt-gi-dot-3">
            <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 70 100 C 100 100 100 120 130 120" />
          </circle>
          {/* confidence badges */}
          <circle cx="180" cy="60" r="5" fill="#88C08A" className="dt-gi-conf" />
          <circle cx="180" cy="90" r="5" fill="#88C08A" className="dt-gi-conf" style={{ animationDelay: "0.3s" }} />
          <circle cx="180" cy="120" r="5" fill="#88C08A" className="dt-gi-conf" style={{ animationDelay: "0.6s" }} />
        </svg>
      )
    case "recipe":
      return (
        <svg viewBox="0 0 200 200" width="180" height="180" className="dt-gi dt-gi-recipe" aria-hidden>
          <defs>
            <linearGradient id="dt-gi-rec" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5A7FB5" />
              <stop offset="100%" stopColor="#2A4477" />
            </linearGradient>
          </defs>
          {/* stacked cards fanned out */}
          <g className="dt-gi-rec-stack">
            <rect x="40" y="60" width="110" height="95" rx="10" fill="rgba(42, 68, 119, 0.1)" stroke="#2A4477" strokeWidth="1.2" transform="rotate(-8 95 107)" />
            <rect x="45" y="55" width="110" height="95" rx="10" fill="rgba(42, 68, 119, 0.18)" stroke="#2A4477" strokeWidth="1.2" transform="rotate(-3 100 102)" />
            <rect x="50" y="50" width="110" height="95" rx="10" fill="url(#dt-gi-rec)" stroke="#a0c4f0" strokeWidth="1.5" />
            {/* header */}
            <rect x="60" y="60" width="50" height="6" rx="3" fill="#a0c4f0" />
            <rect x="120" y="58" width="28" height="10" rx="5" fill="rgba(255,255,255,0.2)" />
            {/* rows */}
            <rect x="60" y="78" width="80" height="4" rx="2" fill="rgba(255,255,255,0.45)" />
            <rect x="60" y="90" width="60" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
            <rect x="60" y="102" width="72" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
            <rect x="60" y="114" width="44" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            {/* version chip */}
            <g className="dt-gi-rec-ver">
              <rect x="60" y="128" width="30" height="12" rx="6" fill="#a0c4f0" />
              <text x="75" y="137" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0F1A29" fontFamily="monospace">v2.1</text>
            </g>
          </g>
          {/* rotating arrow (rewind/rerun) */}
          <g className="dt-gi-rec-rewind" transform="translate(165, 50)">
            <circle r="15" fill="rgba(160, 196, 240, 0.2)" stroke="#2A4477" strokeWidth="1.4" />
            <path d="M -6 -2 L -10 -6 L -6 -10 M -10 -6 L 3 -6 A 6 6 0 0 1 3 6" fill="none" stroke="#2A4477" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )
    case "lock":
      return (
        <svg viewBox="0 0 200 200" width="180" height="180" className="dt-gi dt-gi-lock" aria-hidden>
          <defs>
            <linearGradient id="dt-gi-lock-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5A7FB5" />
              <stop offset="100%" stopColor="#2A4477" />
            </linearGradient>
          </defs>
          {/* big lock body */}
          <g transform="translate(100, 100)">
            <rect x="-40" y="-5" width="80" height="58" rx="10" fill="url(#dt-gi-lock-grad)" stroke="#a0c4f0" strokeWidth="1.5" />
            <path d="M -26 -5 V -22 A 26 26 0 0 1 26 -22 V -5" fill="none" stroke="#2A4477" strokeWidth="4" strokeLinecap="round"
                  className="dt-gi-lock-shackle" />
            <circle cx="0" cy="20" r="4" fill="#a0c4f0" className="dt-gi-lock-core" />
            <path d="M 0 20 V 34" stroke="#a0c4f0" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* orbiting "registered" chips */}
          <g className="dt-gi-lock-orbit">
            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(42, 68, 119, 0.2)" strokeWidth="1" strokeDasharray="2 5" />
          </g>
          <g className="dt-gi-lock-chip dt-gi-lock-chip-1">
            <rect x="22" y="46" width="38" height="18" rx="9" fill="#FFFFFF" stroke="#2A4477" strokeWidth="1" />
            <text x="41" y="58" textAnchor="middle" fontSize="8" fontWeight="700" fill="#2A4477" fontFamily="monospace">REG</text>
          </g>
          <g className="dt-gi-lock-chip dt-gi-lock-chip-2">
            <rect x="140" y="150" width="40" height="18" rx="9" fill="#FFFFFF" stroke="#2A4477" strokeWidth="1" />
            <text x="160" y="162" textAnchor="middle" fontSize="8" fontWeight="700" fill="#2A4477" fontFamily="monospace">SIGNED</text>
          </g>
        </svg>
      )
    default:
      return null
  }
}

/* ═══════════════════════════════════════════════════════════════
   OPERATOR DECK — visual for each active operator
   ═══════════════════════════════════════════════════════════════ */

function OperatorVisual({ op }: { op: string }) {
  return (
    <div className={`dt-ops-viz dt-ops-viz-${op}`} aria-hidden>
      {op === "map" && (
        <svg viewBox="0 0 400 120" width="100%" height="120">
          <rect x="10"  y="20" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.14)" stroke="#a0c4f0" strokeWidth="1" />
          <rect x="10"  y="50" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.14)" stroke="#a0c4f0" strokeWidth="1" />
          <rect x="10"  y="80" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.14)" stroke="#a0c4f0" strokeWidth="1" />
          <rect x="310" y="20" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.28)" stroke="#a0c4f0" strokeWidth="1.2" />
          <rect x="310" y="50" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.28)" stroke="#a0c4f0" strokeWidth="1.2" />
          <rect x="310" y="80" width="80" height="22" rx="4" fill="rgba(160, 196, 240, 0.28)" stroke="#a0c4f0" strokeWidth="1.2" />
          <path d="M 90 31 C 180 31, 220 31, 310 31" fill="none" stroke="#a0c4f0" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M 90 61 C 180 61, 220 61, 310 61" fill="none" stroke="#a0c4f0" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M 90 91 C 180 91, 220 91, 310 91" fill="none" stroke="#a0c4f0" strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      )}
      {op === "approval" && (
        <svg viewBox="0 0 400 120" width="100%" height="120">
          <rect x="30" y="25" width="140" height="70" rx="10" fill="rgba(160, 196, 240, 0.16)" stroke="#a0c4f0" strokeWidth="1.2" />
          <rect x="42" y="38" width="100" height="4" rx="2" fill="rgba(160, 196, 240, 0.5)" />
          <rect x="42" y="50" width="80"  height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <rect x="42" y="62" width="90"  height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <text x="42" y="84" fontSize="10" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">v2.1 PENDING</text>
          <path d="M 178 60 L 218 60 M 210 54 L 218 60 L 210 66" fill="none" stroke="#a0c4f0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="230" y="25" width="140" height="70" rx="10" fill="rgba(46, 125, 90, 0.2)" stroke="#88C08A" strokeWidth="1.4" />
          <circle cx="260" cy="60" r="14" fill="#88C08A" />
          <path d="M 253 60 L 258 65 L 268 54" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="285" y="58" fontSize="9" fontWeight="700" fill="#88C08A" fontFamily="monospace">APPROVED</text>
          <text x="285" y="72" fontSize="8" fill="rgba(220, 232, 250, 0.8)" fontFamily="monospace">by steward · 14:02</text>
        </svg>
      )}
      {op === "coerce" && (
        <svg viewBox="0 0 400 120" width="100%" height="120">
          <rect x="20"  y="44" width="90" height="32" rx="6" fill="rgba(160, 196, 240, 0.14)" stroke="#a0c4f0" strokeWidth="1.2" />
          <text x="65" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">"2026-04-21"</text>
          <text x="65" y="70" textAnchor="middle" fontSize="8" fill="rgba(160, 196, 240, 0.6)" fontFamily="monospace">TEXT</text>
          <path d="M 120 60 L 160 60 M 152 54 L 160 60 L 152 66" fill="none" stroke="#a0c4f0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="170" y="44" width="70" height="32" rx="6" fill="rgba(160, 196, 240, 0.18)" stroke="#a0c4f0" strokeWidth="1.2" />
          <text x="205" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">parse</text>
          <text x="205" y="70" textAnchor="middle" fontSize="8" fill="rgba(160, 196, 240, 0.6)" fontFamily="monospace">REGISTERED</text>
          <path d="M 250 60 L 290 60 M 282 54 L 290 60 L 282 66" fill="none" stroke="#a0c4f0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="300" y="44" width="80" height="32" rx="6" fill="rgba(46, 125, 90, 0.22)" stroke="#88C08A" strokeWidth="1.4" />
          <text x="340" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#88C08A" fontFamily="monospace">2026-04-21</text>
          <text x="340" y="70" textAnchor="middle" fontSize="8" fill="rgba(136, 192, 138, 0.75)" fontFamily="monospace">DATE</text>
        </svg>
      )}
      {op === "reshape" && (
        <svg viewBox="0 0 400 120" width="100%" height="120">
          <rect x="20"  y="20" width="90" height="80" rx="6" fill="rgba(160, 196, 240, 0.14)" stroke="#a0c4f0" strokeWidth="1.2" />
          <rect x="30" y="30" width="70" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="36" y="40" width="56" height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <rect x="36" y="50" width="60" height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <rect x="30" y="62" width="70" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="36" y="72" width="40" height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <rect x="36" y="82" width="54" height="4" rx="2" fill="rgba(160, 196, 240, 0.35)" />
          <text x="150" y="50" fontSize="10" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">flatten</text>
          <text x="150" y="65" fontSize="10" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">split</text>
          <text x="150" y="80" fontSize="10" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">pivot</text>
          <path d="M 215 60 L 255 60 M 247 54 L 255 60 L 247 66" fill="none" stroke="#a0c4f0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="265" y="20" width="115" height="80" rx="6" fill="rgba(160, 196, 240, 0.22)" stroke="#a0c4f0" strokeWidth="1.2" />
          <rect x="275" y="30" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.65)" />
          <rect x="275" y="40" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="275" y="50" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="275" y="60" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="275" y="70" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
          <rect x="275" y="80" width="95" height="4" rx="2" fill="rgba(160, 196, 240, 0.55)" />
        </svg>
      )}
      {op === "recipe" && (
        <svg viewBox="0 0 400 120" width="100%" height="120">
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={30 + i * 88} y={36 - i * 4} width="72" height="60" rx="6"
                    fill={i === 3 ? "rgba(160, 196, 240, 0.3)" : "rgba(42, 68, 119, 0.18)"}
                    stroke="#a0c4f0" strokeWidth={i === 3 ? 1.4 : 1} />
              <text x={66 + i * 88} y={60 - i * 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="#a0c4f0" fontFamily="monospace">v{2 - (3 - i) * 0.1}</text>
              <rect x={42 + i * 88} y={68 - i * 4} width="48" height="3" rx="1.5" fill="rgba(160, 196, 240, 0.4)" />
              <rect x={42 + i * 88} y={76 - i * 4} width="36" height="3" rx="1.5" fill="rgba(160, 196, 240, 0.3)" />
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */

function StyleBlock() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }

      .dt-root {
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

        background: var(--bg);
        color: var(--ink);
        font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        scroll-behavior: smooth;
      }
      .dt-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .dt-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

      .dt-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .dt-container { padding: 0 22px; } }

      /* NAV */
      .dt-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .dt-nav-solid { background: rgba(250, 250, 245, 0.94); border-bottom-color: var(--line); box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06); }
      .dt-nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 36px; display: flex; align-items: center; justify-content: space-between; }
      .dt-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); }
      .dt-logo-wrap img { width: 38px; height: 38px; }
      .dt-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dt-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
      .dt-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; margin-top: 2px; }
      .dt-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .dt-nav-links > a { color: var(--ink-2); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .dt-nav-links > a:hover { color: var(--brand); }
      .dt-nav-cta { padding: 10px 18px; background: var(--ink); color: #FFFFFF !important; border-radius: 999px; font-weight: 500; font-size: 13.5px; transition: transform 0.25s, background 0.25s; }
      .dt-nav-cta:hover { background: var(--brand); transform: translateY(-1px); }
      .dt-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .dt-nav-dd-trigger { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; padding: 0; font: inherit; font-size: 14px; font-weight: 450; cursor: pointer; color: var(--ink-2); transition: color 0.25s; }
      .dt-nav-dd-trigger:hover { color: var(--brand); }
      .dt-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .dt-nav-dd-caret-open { transform: rotate(180deg); }
      .dt-nav-dd-menu { position: absolute; top: calc(100% - 2px); left: 50%; transform: translateX(-50%) translateY(-6px); width: min(900px, calc(100vw - 32px)); opacity: 0; visibility: hidden;
        transition: opacity 0.28s, transform 0.28s, visibility 0s 0.28s; z-index: 60; }
      .dt-nav-dd-menu-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); transition: opacity 0.35s, transform 0.35s, visibility 0s; }
      .dt-nav-dd-inner-menu { margin-top: 14px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px -20px rgba(15, 23, 41, 0.22); }
      .dt-nav-dd-head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
      .dt-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .dt-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .dt-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .dt-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .dt-nav-dd-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink); transition: background 0.25s; }
      .dt-nav-dd-item:hover { background: var(--bg-2); }
      .dt-nav-dd-item-active { background: var(--bg-2); }
      .dt-nav-dd-item-active .dt-nav-dd-item-name { color: var(--brand); }
      .dt-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; color: var(--ink); }
      .dt-nav-dd-item-blurb { font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .dt-nav-dd-feature { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; text-decoration: none; color: #FFFFFF;
        background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
                    linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22); }
      .dt-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .dt-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .dt-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .dt-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .dt-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; color: #FFFFFF; margin: 4px 0 0; }
      .dt-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .dt-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* HERO */
      .dt-hero {
        position: relative;
        padding: 160px 0 100px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 560px at 20% 25%, rgba(90, 127, 181, 0.22), transparent 60%),
          radial-gradient(ellipse 800px 500px at 85% 70%, rgba(42, 68, 119, 0.16), transparent 62%),
          linear-gradient(180deg, #EEF2FA 0%, #F4F3EC 60%, var(--bg) 100%);
      }
      .dt-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .dt-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(42, 68, 119, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(42, 68, 119, 0.08) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 85%);
      }
      .dt-hero-glow {
        position: absolute; top: 30%; right: -10%;
        width: 560px; height: 500px;
        background: radial-gradient(circle, rgba(58, 90, 148, 0.22), transparent 62%);
        filter: blur(70px);
      }
      .dt-hero > .dt-container { position: relative; z-index: 1; }
      .dt-hero-grid-content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
        gap: 64px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .dt-hero-grid-content { grid-template-columns: 1fr; gap: 40px; }
      }
      .dt-hero-text { display: flex; flex-direction: column; gap: 22px; }
      .dt-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
      }
      .dt-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(44px, 5.6vw, 80px);
        line-height: 1.02;
        letter-spacing: -0.035em;
        color: var(--ink);
        margin: 0;
        display: flex; flex-direction: column; gap: 4px;
      }
      .dt-h1-line { display: block; }
      .dt-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.06em;
        letter-spacing: -0.01em;
      }
      .dt-lede {
        font-size: 16.5px;
        line-height: 1.68;
        color: var(--ink-3);
        margin: 0;
        max-width: 56ch;
      }
      .dt-hero-visual {
        display: flex; align-items: center; justify-content: center;
        position: relative;
      }

      /* HERO ANIMATION */
      .dt-anim {
        width: 100%;
        max-width: 540px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 40px 90px -30px rgba(42, 68, 119, 0.32),
          0 12px 28px -10px rgba(15, 23, 41, 0.14);
      }
      .dt-anim-chrome {
        display: flex; align-items: center; gap: 7px;
        padding: 12px 16px; background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .dt-anim-dot {
        width: 9px; height: 9px; border-radius: 50%;
      }
      .dt-anim-dot:nth-child(1) { background: #E8816D; }
      .dt-anim-dot:nth-child(2) { background: #E8C66D; }
      .dt-anim-dot:nth-child(3) { background: #88C08A; }
      .dt-anim-title {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.04em;
        color: var(--ink-3); margin-left: 10px;
      }
      .dt-anim-live {
        margin-left: auto;
        display: inline-flex; align-items: center; gap: 6px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px; letter-spacing: 0.18em;
        color: var(--brand); font-weight: 700;
      }
      .dt-anim-pulse {
        width: 6px; height: 6px; border-radius: 50%;
        background: var(--brand);
        box-shadow: 0 0 0 3px rgba(42, 68, 119, 0.2);
        animation: dt-pulse 1.6s ease-in-out infinite;
      }
      @keyframes dt-pulse {
        0%, 100% { opacity: 0.5; transform: scale(0.9); }
        50%      { opacity: 1;   transform: scale(1.1); }
      }
      .dt-anim-body { padding: 20px 22px 22px; }
      .dt-anim-labels {
        display: grid;
        grid-template-columns: 1fr 68px 1fr;
        gap: 16px;
        padding-bottom: 14px;
        border-bottom: 1px solid var(--line);
      }
      .dt-anim-col-h {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px; letter-spacing: 0.18em;
        text-transform: uppercase; color: var(--ink-4);
      }
      .dt-anim-col-h-tgt { text-align: left; color: var(--brand); }
      .dt-anim-col-mid { text-align: center; color: var(--ink-4); font-family: var(--font-mono), monospace; font-size: 12px; }
      .dt-anim-rows {
        display: flex; flex-direction: column;
        gap: 10px; padding-top: 12px;
      }
      .dt-anim-row {
        display: grid;
        grid-template-columns: 1fr 68px 1fr;
        gap: 16px; align-items: center;
        opacity: 0;
        animation: dt-fade-up 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dt-fade-up {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .dt-anim-chip {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 9px 12px; border-radius: 8px;
        font-family: var(--font-mono), monospace;
        font-size: 12px;
      }
      .dt-anim-chip-src {
        background: var(--bg-2);
        border: 1px solid var(--line);
        color: var(--ink-2);
      }
      .dt-anim-chip-tgt {
        background: #FFFFFF;
        border: 1px solid rgba(42, 68, 119, 0.22);
        color: var(--brand);
        font-weight: 600;
        justify-content: space-between;
      }
      .dt-anim-dot-blue {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--navy-mid);
      }
      .dt-anim-tgt-name { color: var(--brand); font-weight: 600; }
      .dt-anim-confidence {
        color: #2E7D5A; font-weight: 700;
      }
      .dt-anim-wire {
        position: relative;
        height: 12px;
        display: flex; align-items: center;
      }
      .dt-anim-flow {
        position: absolute;
        left: 0; top: 50%; transform: translateY(-50%);
        width: 6px; height: 6px; border-radius: 50%;
        background: var(--brand);
        animation: dt-flow 2.4s cubic-bezier(0.4, 0, 0.3, 1) infinite;
      }
      @keyframes dt-flow {
        0%   { left: 0; opacity: 0; }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { left: 58px; opacity: 0; }
      }
      .dt-anim-foot {
        display: flex; align-items: center; gap: 14px;
        margin-top: 16px; padding-top: 14px;
        border-top: 1px dashed var(--line);
        font-family: var(--font-mono), monospace;
        font-size: 11px; color: var(--ink-4);
      }
      .dt-anim-foot b { color: var(--ink); font-weight: 700; margin-right: 4px; }
      .dt-anim-sep { width: 1px; height: 12px; background: var(--line-2); }

      @media (prefers-reduced-motion: reduce) {
        .dt-anim-row, .dt-anim-flow, .dt-anim-pulse { animation: none !important; opacity: 1; }
      }

      /* QUOTE BANNER */
      .dt-quote {
        padding: 80px 0;
        text-align: center;
        background: var(--bg-2);
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
      }
      .dt-quote p {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        font-size: clamp(24px, 3.2vw, 38px);
        line-height: 1.28;
        letter-spacing: -0.02em;
        color: var(--ink);
        margin: 0 auto;
        max-width: 32ch;
      }
      .dt-quote-mark {
        font-family: var(--font-serif), serif;
        color: var(--brand);
        font-size: 1.4em;
        line-height: 0;
        margin-right: 6px;
        vertical-align: -0.2em;
      }

      /* SECTION HEAD */
      .dt-section-head {
        max-width: 760px;
        margin: 0 auto 72px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dt-eyebrow-light { color: #a0c4f0; }
      .dt-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(34px, 4.6vw, 56px);
        line-height: 1.04;
        letter-spacing: -0.03em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .dt-h2-light { color: #FFFFFF; }
      .dt-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.05em;
      }
      .dt-h2-em-light { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 400; color: #a0c4f0; font-size: 1.05em; }

      /* THE GUARANTEES */
      .dt-guarantees { padding: 130px 0 120px; background: var(--bg); }
      .dt-guar-list { display: flex; flex-direction: column; gap: 48px; }
      .dt-guar-row {
        display: grid;
        grid-template-columns: 220px minmax(0, 1fr);
        gap: 64px;
        align-items: center;
        padding: 40px 0;
        border-top: 1px solid var(--line);
      }
      @media (max-width: 860px) {
        .dt-guar-row { grid-template-columns: 1fr; gap: 24px; padding: 28px 0; }
      }
      .dt-guar-icon {
        position: relative;
        display: flex; align-items: center; justify-content: center;
        min-height: 200px;
      }
      .dt-guar-icon::before {
        content: ""; position: absolute; inset: -8%;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.16), transparent 62%);
        filter: blur(30px);
      }
      .dt-gi { position: relative; z-index: 1; }
      .dt-guar-text { display: flex; flex-direction: column; gap: 10px; }
      .dt-guar-n {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.24em;
        color: var(--brand); font-weight: 700;
      }
      .dt-guar-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(22px, 2.8vw, 32px);
        letter-spacing: -0.02em;
        color: var(--ink);
        margin: 0;
        line-height: 1.18;
      }
      .dt-guar-b {
        font-size: 16px;
        line-height: 1.7;
        color: var(--ink-3);
        margin: 0;
        max-width: 58ch;
        text-wrap: pretty;
      }

      /* Guarantee icon animations */
      .dt-gi-wire { stroke-dasharray: 60; stroke-dashoffset: 60; animation: dt-gi-draw 2.4s ease-out infinite; }
      .dt-gi-wire-1 { animation-delay: 0s; }
      .dt-gi-wire-2 { animation-delay: 0.4s; }
      .dt-gi-wire-3 { animation-delay: 0.8s; }
      @keyframes dt-gi-draw {
        0%   { stroke-dashoffset: 60; opacity: 0.2; }
        30%  { stroke-dashoffset: 0;  opacity: 1; }
        80%  { stroke-dashoffset: 0;  opacity: 1; }
        100% { stroke-dashoffset: 60; opacity: 0.2; }
      }
      .dt-gi-conf {
        transform-origin: center;
        animation: dt-gi-conf 2.4s ease-out infinite;
      }
      @keyframes dt-gi-conf {
        0%, 50%   { transform: scale(0); opacity: 0; }
        60%, 80%  { transform: scale(1.15); opacity: 1; }
        100%      { transform: scale(1); opacity: 0.85; }
      }
      .dt-gi-rec-rewind {
        transform-origin: 165px 50px;
        animation: dt-gi-rec-spin 3s linear infinite;
      }
      @keyframes dt-gi-rec-spin {
        from { transform: translate(165px, 50px) rotate(0deg); }
        to   { transform: translate(165px, 50px) rotate(-360deg); }
      }
      .dt-gi-rec-ver {
        animation: dt-gi-rec-ver 2.6s ease-in-out infinite;
      }
      @keyframes dt-gi-rec-ver {
        0%, 100% { opacity: 0.7; }
        50%      { opacity: 1; }
      }
      .dt-gi-lock-shackle {
        stroke-dasharray: 80;
        stroke-dashoffset: 80;
        animation: dt-gi-lock-close 3s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      @keyframes dt-gi-lock-close {
        0%, 30%  { stroke-dashoffset: 80; }
        50%, 90% { stroke-dashoffset: 0; }
        100%     { stroke-dashoffset: 80; }
      }
      .dt-gi-lock-core {
        transform-origin: 0 20px;
        animation: dt-pulse 1.8s ease-in-out infinite;
      }
      .dt-gi-lock-chip-1 { animation: dt-gi-chip 3s ease-in-out infinite; }
      .dt-gi-lock-chip-2 { animation: dt-gi-chip 3s ease-in-out infinite 1.5s; }
      @keyframes dt-gi-chip {
        0%, 100% { transform: translate(0, 0); opacity: 0.65; }
        50%      { transform: translate(-4px, -4px); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dt-gi-wire, .dt-gi-conf, .dt-gi-rec-rewind, .dt-gi-rec-ver,
        .dt-gi-lock-shackle, .dt-gi-lock-core, .dt-gi-lock-chip-1, .dt-gi-lock-chip-2 {
          animation: none !important;
        }
      }

      /* THE OPERATORS (tabbed deck on navy) */
      .dt-ops {
        position: relative;
        padding: 130px 0 150px;
        background:
          radial-gradient(ellipse 900px 600px at 50% 10%, rgba(58, 90, 148, 0.3), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dt-ops-bg { position: absolute; inset: 0; pointer-events: none; }
      .dt-ops-glow {
        position: absolute; top: 40%; left: 50%; transform: translateX(-50%);
        width: 800px; height: 500px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.22), transparent 62%);
        filter: blur(90px);
      }
      .dt-ops > .dt-container { position: relative; z-index: 1; }

      .dt-ops-layout {
        display: grid;
        grid-template-columns: 300px minmax(0, 1fr);
        gap: 28px;
        align-items: stretch;
      }
      @media (max-width: 900px) {
        .dt-ops-layout { grid-template-columns: 1fr; gap: 24px; }
      }
      .dt-ops-nav {
        display: flex; flex-direction: column;
        gap: 10px;
        height: 100%;
      }
      @media (max-width: 900px) {
        .dt-ops-nav { flex-direction: row; overflow-x: auto; padding-bottom: 4px; height: auto; }
      }
      .dt-ops-tab {
        position: relative;
        display: grid;
        grid-template-columns: 50px 1fr;
        gap: 14px; align-items: center;
        padding: 18px 20px;
        background: rgba(160, 196, 240, 0.06);
        border: 1px solid rgba(160, 196, 240, 0.14);
        border-radius: 12px;
        color: rgba(220, 232, 250, 0.7);
        cursor: pointer;
        text-align: left;
        font: inherit;
        flex: 1 1 0;
        min-height: 0;
        transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.3s;
      }
      @media (max-width: 900px) {
        .dt-ops-tab { flex: 0 0 auto; min-width: 180px; }
      }
      .dt-ops-tab-bar {
        position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px;
        background: #a0c4f0;
        border-radius: 0 3px 3px 0;
        transform: scaleY(0);
        transform-origin: center;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dt-ops-tab:hover {
        background: rgba(160, 196, 240, 0.1);
        color: #FFFFFF;
      }
      .dt-ops-tab-active {
        background: linear-gradient(90deg, rgba(160, 196, 240, 0.14), rgba(42, 68, 119, 0.24));
        border-color: rgba(160, 196, 240, 0.35);
        color: #FFFFFF;
      }
      .dt-ops-tab-active .dt-ops-tab-bar { transform: scaleY(1); }
      .dt-ops-tab-n {
        font-family: var(--font-mono), monospace;
        font-weight: 700;
        font-size: 15px;
        color: #a0c4f0;
        letter-spacing: -0.005em;
      }
      .dt-ops-tab-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: -0.01em;
      }
      .dt-ops-panel {
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.14) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.4) 0%, rgba(20, 30, 48, 0.6) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        border-radius: 18px;
        padding: 30px 32px 26px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.08) inset,
          0 30px 60px -24px rgba(0, 0, 0, 0.4);
        display: flex; flex-direction: column; gap: 14px;
        height: 100%;
        justify-content: space-between;
      }
      .dt-ops-tag {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700;
      }
      .dt-ops-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(26px, 3.2vw, 36px);
        letter-spacing: -0.025em;
        color: #FFFFFF;
        margin: 0;
        line-height: 1.15;
      }
      .dt-ops-b {
        font-size: 16px;
        line-height: 1.7;
        color: rgba(220, 232, 250, 0.85);
        margin: 0 0 10px;
        max-width: 62ch;
      }
      .dt-ops-viz {
        background: rgba(15, 23, 41, 0.35);
        border: 1px solid rgba(160, 196, 240, 0.14);
        border-radius: 12px;
        padding: 12px 16px;
      }
      .dt-ops-viz svg { display: block; height: 100px; }

      /* FINAL CTA */
      .dt-cta-final { padding: 120px 0 100px; background: var(--bg); }
      .dt-cta-card {
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
      .dt-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .dt-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
      .dt-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: dt-ripple 3s ease-in-out infinite; }
      .dt-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: dt-ripple 3s ease-in-out infinite 0.4s; }
      .dt-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: dt-ripple 3s ease-in-out infinite 0.8s; }
      .dt-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: dt-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes dt-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes dt-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .dt-cta-ring { animation: none !important; } }
      .dt-cta-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 6px; max-width: 480px; }
      .dt-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 36px); line-height: 1.12; letter-spacing: -0.02em; margin: 0; color: #FFFFFF; }
      .dt-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.85); }
      .dt-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 6px 0 18px; line-height: 1.5; max-width: 40ch; }
      .dt-cta-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 13px 22px; border-radius: 999px;
        background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600;
        text-decoration: none; align-self: flex-start; white-space: nowrap;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .dt-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .dt-cta-pill-arrow {
        display: inline-flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border-radius: 50%;
        background: var(--brand); color: #FFFFFF; font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .dt-cta-pill:hover .dt-cta-pill-arrow { background: var(--navy-cta); transform: translateX(2px); }

      /* ─── RELATED (style 3 · display-italic split cards) ─── */
      .dt-related { padding: 130px 0 40px; background: var(--bg); }
      .dt-related-head { max-width: 760px; margin: 0 auto 56px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; }
      .dt-related-split { display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--line); }
      .dt-related-card {
        position: relative;
        display: grid;
        grid-template-columns: minmax(260px, 1fr) minmax(0, 1.6fr);
        gap: 48px;
        padding: 40px 12px;
        align-items: center;
        border-bottom: 1px solid var(--line);
        text-decoration: none;
        color: var(--ink);
        transition: background 0.5s;
      }
      .dt-related-card:hover { background: linear-gradient(90deg, rgba(42, 68, 119, 0.05), transparent 80%); }
      .dt-related-card:hover .dt-related-cta { color: var(--brand); }
      .dt-related-card:hover .dt-related-cta svg { transform: translateX(6px); }
      @media (max-width: 820px) {
        .dt-related-card { grid-template-columns: 1fr; gap: 18px; padding: 30px 8px; }
      }
      .dt-related-left { display: flex; flex-direction: column; gap: 10px; }
      .dt-related-mark {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.24em;
        color: var(--brand); font-weight: 700;
      }
      .dt-related-serif {
        font-family: var(--font-display), sans-serif;
        font-style: italic; font-weight: 400;
        font-size: clamp(38px, 5vw, 58px);
        letter-spacing: -0.028em;
        line-height: 0.95;
        color: var(--brand);
      }
      .dt-related-right { display: flex; flex-direction: column; gap: 18px; }
      .dt-related-b {
        font-size: 16px; line-height: 1.65;
        color: var(--ink-3); margin: 0;
        max-width: 58ch;
      }
      .dt-related-cta {
        display: inline-flex; align-items: center; gap: 10px;
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ink-3);
        transition: color 0.4s;
      }
      .dt-related-cta svg { transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1); }

      /* FOOTER */
      .dt-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden;
      }
      .dt-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%); width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .dt-footer > .dt-container { position: relative; z-index: 1; }
      .dt-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .dt-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .dt-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .dt-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dt-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .dt-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dt-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dt-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .dt-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .dt-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .dt-foot-h { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; margin-bottom: 18px; text-transform: uppercase; }
      .dt-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .dt-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .dt-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .dt-footer-watermark {
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
      .dt-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .dt-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .dt-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .dt-footer { padding: 72px 0 0; margin-top: 60px; }
        .dt-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
      }
    `}</style>
  )
}
