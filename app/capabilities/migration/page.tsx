"use client"

/**
 * Data Migration — bespoke page.
 *   - Hero: connector-grid live animation LEFT, hero text RIGHT
 *   - No quote banner, no pipeline/how-it-works section
 *   - Three-image product journey (connect → job → success)
 *   - Four feature cards (no Entity-scoped / Universal fallback)
 *   - Generalized outcome testimonial
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

const FEATURES = [
  {
    key: "connectors",
    h: "Connects to the systems you already use",
    b: "The platforms your team relies on — accounting, warehouses, CRMs, cloud drives — wired up without an integration project.",
  },
  {
    key: "incremental",
    h: "Only what changed, only when it changed",
    b: "Every run picks up the new and updated records — no duplicate loads, no manual diffs, no surprises in your warehouse.",
  },
  {
    key: "healing",
    h: "Quietly catches its own problems",
    b: "When something goes wrong, the platform pauses and tells someone — instead of silently writing bad data downstream.",
  },
  {
    key: "automap",
    h: "Mapping done once, inherited forever",
    b: "Field mappings are proposed on first connect, approved by your team, then carried into every run that follows.",
  },
]

export default function DataMigrationPage() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} dm-root`}>
      {/* Nav */}
      <SiteNav />

      <main className="dm-main">
        {/* ───── HERO — animation LEFT, text RIGHT ───── */}
        <section className="dm-hero">
          <div className="dm-hero-bg" aria-hidden>
            <div className="dm-hero-glow" />
            <div className="dm-hero-grid" />
          </div>
          <div className="dm-container">
            <div className="dm-hero-grid-content">
              <motion.div
                className="dm-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <ConnectorGridAnimation />
              </motion.div>
              <div className="dm-hero-text">
                <motion.span className="dm-eyebrow" {...rise(0.05)}>DATA MIGRATION</motion.span>
                <motion.h1 className="dm-h1" {...rise(0.12)}>
                  <span className="dm-h1-line">Move data between</span>
                  <span className="dm-h1-em">the systems you already use.</span>
                </motion.h1>
                <motion.p className="dm-lede" {...rise(0.28)}>
                  Connect the platforms your team already runs — in a click, not a project.
                  Every run is incremental, traceable, and self-monitoring, so the data
                  keeps flowing without an engineering ticket. No surprises in your
                  warehouse. No silent failures downstream.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── FEATURES — 4 cards (redesigned) ───── */}
        <section className="dm-features">
          <div className="dm-features-bg" aria-hidden>
            <div className="dm-features-glow" />
          </div>
          <div className="dm-container">
            <motion.div className="dm-section-head dm-section-head-light" {...rise(0.05)}>
              <span className="dm-eyebrow dm-eyebrow-light">WHAT YOUR TEAM GETS</span>
              <h2 className="dm-h2 dm-h2-light">
                Connect once,<br />
                <span className="dm-h2-em-light">move data with confidence</span>.
              </h2>
            </motion.div>
            <div className="dm-features-grid">
              {FEATURES.map((f, i) => (
                <motion.article
                  key={f.key}
                  className="dm-feature-card"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.06 + i * 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dm-feature-icon" aria-hidden>
                    <FeatureIcon name={f.key} />
                  </div>
                  <h3 className="dm-feature-h">{f.h}</h3>
                  <p className="dm-feature-b">{f.b}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── OUTCOME — stat + generalized testimonial ───── */}
        <section className="dm-outcome">
          <div className="dm-container">
            <motion.div className="dm-outcome-card" {...rise(0.05)}>
              <div className="dm-outcome-stat">
                <span className="dm-outcome-num">Click</span>
                <span className="dm-outcome-label">connect, not configure</span>
              </div>
              <blockquote className="dm-outcome-quote">
                <span className="dm-outcome-q">&ldquo;</span>
                Wiring up a new source feels like a click, not a project. Every run
                stays incremental, self-monitoring, and fully traceable — so the data
                keeps flowing while your team focuses on the work that matters.
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* ───── RELATED — vertical stack with diagonal accent ───── */}
        <section className="dm-related">
          <div className="dm-container">
            <motion.div className="dm-related-head" {...rise(0.05)}>
              <span className="dm-eyebrow">EXPLORE MORE</span>
              <h2 className="dm-h2">
                The rest of the platform,<br />
                <span className="dm-h2-em">working in your favor.</span>
              </h2>
            </motion.div>
            <div className="dm-related-stack">
              {SOLUTIONS.filter(s => s.slug !== "migration").slice(0, 3).map((s, i) => (
                <motion.div
                  key={s.slug}
                  className="dm-related-slot"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="dm-related-card">
                    <div className="dm-related-card-head">
                      <h3 className="dm-related-h">{s.name}</h3>
                      <span className="dm-related-ico" aria-hidden>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M 7 17 L 17 7 M 17 7 H 9 M 17 7 V 15" />
                        </svg>
                      </span>
                    </div>
                    <p className="dm-related-b">{s.blurb}</p>
                    <span className="dm-related-accent" aria-hidden />
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
   HERO — Connector Grid Animation
   ═══════════════════════════════════════════════════════════════ */

function ConnectorGridAnimation() {
  const nodes = [
    { name: "Accounting · Books",      status: "synced",  delta: "+1,248 records", time: "2m ago"  },
    { name: "Warehouse · Analytics",   status: "running", delta: "streaming…",    time: "now"     },
    { name: "CRM · Customers",         status: "synced",  delta: "+318 records",  time: "1h ago"  },
    { name: "Cloud Drive · Reports",   status: "synced",  delta: "+42 datasets",  time: "14m ago" },
  ]
  return (
    <div className="dm-anim">
      <div className="dm-anim-chrome">
        <span className="dm-anim-dot" />
        <span className="dm-anim-dot" />
        <span className="dm-anim-dot" />
        <span className="dm-anim-title">connector grid</span>
      </div>
      <div className="dm-anim-body">
        <div className="dm-anim-grid">
          {nodes.map((n, i) => (
            <div key={n.name} className={`dm-anim-node dm-anim-${n.status}`} style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
              <div className="dm-anim-node-head">
                <span className={`dm-anim-status dm-anim-status-${n.status}`}>
                  <span className="dm-anim-status-ring" />
                </span>
                <span className="dm-anim-name">{n.name}</span>
              </div>
              <div className="dm-anim-node-body">
                <span className="dm-anim-delta">{n.delta}</span>
                <span className="dm-anim-time">{n.time}</span>
              </div>
              <div className="dm-anim-bar" aria-hidden>
                <span className="dm-anim-bar-fill" />
              </div>
            </div>
          ))}
        </div>
        <div className="dm-anim-log">
          <span className="dm-anim-log-dot" />
          <span className="dm-anim-log-text">
            <b>Incremental sync</b> · 1,608 records merged · next cycle in 14:22
          </span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FEATURE ICONS (one per card)
   ═══════════════════════════════════════════════════════════════ */

function FeatureIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "connectors":
      return (
        <svg viewBox="0 0 32 32" width="26" height="26" {...P} aria-hidden>
          <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
          <circle cx="6"  cy="6"  r="2.5" />
          <circle cx="26" cy="6"  r="2.5" />
          <circle cx="6"  cy="26" r="2.5" />
          <circle cx="26" cy="26" r="2.5" />
          <path d="M 7.8 7.8 L 13.5 13.5 M 24.2 7.8 L 18.5 13.5 M 7.8 24.2 L 13.5 18.5 M 24.2 24.2 L 18.5 18.5" />
        </svg>
      )
    case "incremental":
      return (
        <svg viewBox="0 0 32 32" width="26" height="26" {...P} aria-hidden>
          <path d="M 27 14 A 11 11 0 0 0 9 9 M 5 5 V 11 H 11" />
          <path d="M 5 18 A 11 11 0 0 0 23 23 M 27 27 V 21 H 21" />
          <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case "healing":
      return (
        <svg viewBox="0 0 32 32" width="26" height="26" {...P} aria-hidden>
          <path d="M 16 4 L 27 8 V 17 C 27 23, 22 27, 16 29 C 10 27, 5 23, 5 17 V 8 Z" />
          <path d="M 11 17 L 14.5 20.5 L 21 13" strokeWidth="2" />
        </svg>
      )
    case "automap":
      return (
        <svg viewBox="0 0 32 32" width="26" height="26" {...P} aria-hidden>
          <rect x="4"  y="6" width="9" height="5" rx="1" />
          <rect x="4"  y="14" width="9" height="5" rx="1" />
          <rect x="4"  y="22" width="9" height="5" rx="1" />
          <rect x="19" y="10" width="9" height="5" rx="1" fill="currentColor" opacity="0.15" />
          <rect x="19" y="18" width="9" height="5" rx="1" fill="currentColor" opacity="0.15" />
          <path d="M 13 9  C 16 9, 16 12.5, 19 12.5" strokeDasharray="2 2" />
          <path d="M 13 17 C 16 17, 16 20.5, 19 20.5" strokeDasharray="2 2" />
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

      .dm-root {
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
      .dm-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .dm-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

      .dm-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .dm-container { padding: 0 22px; } }

      /* NAV */
      .dm-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 40; transition: background 0.4s, border-color 0.4s, box-shadow 0.4s; background: rgba(250, 250, 245, 0.72); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid transparent; }
      .dm-nav-solid { background: rgba(250, 250, 245, 0.94); border-bottom-color: var(--line); box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06); }
      .dm-nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 36px; display: flex; align-items: center; justify-content: space-between; }
      .dm-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); }
      .dm-logo-wrap img { width: 38px; height: 38px; }
      .dm-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dm-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
      .dm-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; margin-top: 2px; }
      .dm-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .dm-nav-links > a { color: var(--ink-2); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .dm-nav-links > a:hover { color: var(--brand); }
      .dm-nav-cta { padding: 10px 18px; background: var(--ink); color: #FFFFFF !important; border-radius: 999px; font-weight: 500; font-size: 13.5px; transition: transform 0.25s, background 0.25s; }
      .dm-nav-cta:hover { background: var(--brand); transform: translateY(-1px); }
      .dm-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .dm-nav-dd-trigger { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; padding: 0; font: inherit; font-size: 14px; font-weight: 450; cursor: pointer; color: var(--ink-2); transition: color 0.25s; }
      .dm-nav-dd-trigger:hover { color: var(--brand); }
      .dm-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .dm-nav-dd-caret-open { transform: rotate(180deg); }
      .dm-nav-dd-menu { position: absolute; top: calc(100% - 2px); left: 50%; transform: translateX(-50%) translateY(-6px); width: min(900px, calc(100vw - 32px)); opacity: 0; visibility: hidden; transition: opacity 0.28s, transform 0.28s, visibility 0s 0.28s; z-index: 60; }
      .dm-nav-dd-menu-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); transition: opacity 0.35s, transform 0.35s, visibility 0s; }
      .dm-nav-dd-inner-menu { margin-top: 14px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px -20px rgba(15, 23, 41, 0.22); }
      .dm-nav-dd-head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
      .dm-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .dm-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .dm-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .dm-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .dm-nav-dd-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink); transition: background 0.25s; }
      .dm-nav-dd-item:hover { background: var(--bg-2); }
      .dm-nav-dd-item-active { background: var(--bg-2); }
      .dm-nav-dd-item-active .dm-nav-dd-item-name { color: var(--brand); }
      .dm-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; color: var(--ink); }
      .dm-nav-dd-item-blurb { font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .dm-nav-dd-feature { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; text-decoration: none; color: #FFFFFF; background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%), linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%); border: 1px solid rgba(160, 196, 240, 0.22); }
      .dm-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .dm-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .dm-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .dm-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .dm-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; color: #FFFFFF; margin: 4px 0 0; }
      .dm-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .dm-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* HERO */
      .dm-hero {
        position: relative;
        padding: 160px 0 110px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 560px at 15% 25%, rgba(90, 127, 181, 0.22), transparent 60%),
          radial-gradient(ellipse 800px 500px at 85% 70%, rgba(42, 68, 119, 0.16), transparent 62%),
          linear-gradient(180deg, #EEF2FA 0%, #F4F3EC 60%, var(--bg) 100%);
      }
      .dm-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .dm-hero-glow {
        position: absolute; top: 30%; left: -10%;
        width: 600px; height: 500px;
        background: radial-gradient(circle, rgba(58, 90, 148, 0.22), transparent 62%);
        filter: blur(70px);
      }
      .dm-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(42, 68, 119, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(42, 68, 119, 0.08) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 85%);
      }
      .dm-hero > .dm-container { position: relative; z-index: 1; }
      .dm-hero-grid-content {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: 64px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .dm-hero-grid-content { grid-template-columns: 1fr; gap: 40px; }
        .dm-hero-visual { order: 2; }
        .dm-hero-text { order: 1; }
      }
      .dm-hero-visual { display: flex; align-items: center; justify-content: center; }
      .dm-hero-text { display: flex; flex-direction: column; gap: 22px; max-width: 560px; }
      .dm-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
      }
      .dm-eyebrow-light { color: #a0c4f0; }
      .dm-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(38px, 4.4vw, 60px);
        line-height: 1.06;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        display: flex; flex-direction: column; gap: 4px;
      }
      .dm-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1em;
        letter-spacing: -0.012em;
      }
      .dm-lede {
        font-size: 16.5px; line-height: 1.68;
        color: var(--ink-3); margin: 0;
        max-width: 56ch;
      }

      /* HERO ANIMATION (connector grid) */
      .dm-anim {
        width: 100%;
        max-width: 540px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.95) inset, 0 40px 90px -30px rgba(42, 68, 119, 0.32), 0 12px 28px -10px rgba(15, 23, 41, 0.14);
      }
      .dm-anim-chrome { display: flex; align-items: center; gap: 7px; padding: 12px 16px; background: var(--bg-2); border-bottom: 1px solid var(--line); }
      .dm-anim-dot { width: 9px; height: 9px; border-radius: 50%; }
      .dm-anim-dot:nth-child(1) { background: #E8816D; }
      .dm-anim-dot:nth-child(2) { background: #E8C66D; }
      .dm-anim-dot:nth-child(3) { background: #88C08A; }
      .dm-anim-title { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.04em; color: var(--ink-3); margin-left: 10px; }
      .dm-anim-live { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: #2E7D5A; font-weight: 700; }
      .dm-anim-pulse { width: 6px; height: 6px; border-radius: 50%; background: #2E7D5A; box-shadow: 0 0 0 3px rgba(46, 125, 90, 0.22); animation: dm-pulse 1.6s ease-in-out infinite; }
      @keyframes dm-pulse { 0%, 100% { opacity: 0.5; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
      .dm-anim-body { padding: 18px 20px 18px; }
      .dm-anim-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .dm-anim-node {
        position: relative;
        padding: 12px 14px 10px;
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 10px;
        display: flex; flex-direction: column; gap: 6px;
        overflow: hidden;
        opacity: 0;
        animation: dm-fade-up 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dm-fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .dm-anim-running { background: #FFFFFF; border-color: rgba(42, 68, 119, 0.3); box-shadow: 0 0 0 2px rgba(42, 68, 119, 0.08); }
      .dm-anim-node-head { display: flex; align-items: center; gap: 10px; }
      .dm-anim-status { position: relative; width: 9px; height: 9px; border-radius: 50%; }
      .dm-anim-status-synced { background: #88C08A; }
      .dm-anim-status-running { background: var(--brand); }
      .dm-anim-status-ring { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid currentColor; opacity: 0; }
      .dm-anim-status-running .dm-anim-status-ring { border-color: var(--brand); opacity: 1; animation: dm-ring 1.8s ease-out infinite; }
      @keyframes dm-ring { 0% { transform: scale(0.5); opacity: 0.9; } 100% { transform: scale(2); opacity: 0; } }
      .dm-anim-name { font-family: var(--font-display), sans-serif; font-weight: 600; font-size: 12.5px; color: var(--ink); letter-spacing: -0.005em; }
      .dm-anim-node-body { display: flex; justify-content: space-between; align-items: baseline; }
      .dm-anim-delta { font-family: var(--font-mono), monospace; font-size: 11px; color: var(--brand); }
      .dm-anim-time { font-family: var(--font-mono), monospace; font-size: 10px; color: var(--ink-4); }
      .dm-anim-bar { height: 2px; background: rgba(15, 23, 41, 0.06); border-radius: 1px; overflow: hidden; margin-top: 2px; }
      .dm-anim-bar-fill {
        display: block; height: 100%; width: 100%;
        background: linear-gradient(90deg, transparent, var(--brand), transparent);
        transform: translateX(-100%);
        animation: dm-bar-sweep 2.6s linear infinite;
      }
      @keyframes dm-bar-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      .dm-anim-log {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px; margin-top: 12px;
        background: var(--bg-2); border: 1px solid var(--line);
        border-radius: 8px;
      }
      .dm-anim-log-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--brand); box-shadow: 0 0 0 3px rgba(42, 68, 119, 0.14); animation: dm-pulse 1.8s ease-in-out infinite; }
      .dm-anim-log-text { font-family: var(--font-mono), monospace; font-size: 10.5px; color: var(--ink-3); }
      .dm-anim-log-text b { color: var(--ink); font-weight: 700; margin-right: 4px; }
      @media (prefers-reduced-motion: reduce) {
        .dm-anim-node, .dm-anim-bar-fill, .dm-anim-status-running .dm-anim-status-ring, .dm-anim-pulse { animation: none !important; opacity: 1; }
      }

      /* Shared H2 / eyebrow */
      .dm-section-head {
        max-width: 760px;
        margin: 0 auto 64px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dm-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(32px, 4.4vw, 54px);
        line-height: 1.05;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .dm-h2-light { color: #FFFFFF; }
      .dm-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.05em;
      }
      .dm-h2-em-light { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 400; color: #a0c4f0; font-size: 1.05em; }

      /* JOURNEY — alternating rows, expandable */
      .dm-journey { position: relative; padding: 130px 0 120px; background: var(--bg); }
      .dm-journey-rows {
        display: flex; flex-direction: column;
        gap: 80px;
      }
      .dm-journey-row {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        column-gap: 64px;
        row-gap: 14px;
        align-items: center;
        grid-template-areas:
          "frame header"
          "frame heading"
          "frame body";
      }
      .dm-journey-row .dm-journey-header  { grid-area: header; }
      .dm-journey-row .dm-journey-h       { grid-area: heading; margin: 0; }
      .dm-journey-row .dm-journey-frame   { grid-area: frame; align-self: center; }
      .dm-journey-row .dm-journey-b       { grid-area: body; margin: 0; }
      .dm-journey-row-flip {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        grid-template-areas:
          "header  frame"
          "heading frame"
          "body    frame";
      }
      @media (max-width: 900px) {
        .dm-journey-rows { gap: 52px; }
        .dm-journey-row,
        .dm-journey-row-flip {
          grid-template-columns: 1fr;
          row-gap: 14px;
          grid-template-areas:
            "header"
            "heading"
            "frame"
            "body";
        }
      }

      .dm-journey-frame {
        margin: 0;
        position: relative;
      }
      .dm-journey-trigger {
        display: block; width: 100%;
        padding: 0; margin: 0; border: 0;
        background: #FFFFFF;
        border-radius: 18px;
        overflow: hidden;
        cursor: zoom-in;
        border: 1px solid var(--line);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 30px 70px -28px rgba(42, 68, 119, 0.28),
          0 12px 28px -10px rgba(15, 23, 41, 0.14);
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.45s;
        position: relative;
      }
      .dm-journey-trigger:hover {
        transform: translateY(-4px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 44px 90px -30px rgba(42, 68, 119, 0.4),
          0 20px 40px -14px rgba(15, 23, 41, 0.2);
      }
      .dm-journey-img {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        object-position: center top;
        background: var(--bg-2);
      }
      .dm-journey-expand {
        position: absolute; top: 14px; right: 14px;
        display: inline-flex; align-items: center; justify-content: center;
        width: 40px; height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.92);
        color: var(--brand);
        border: 1px solid rgba(42, 68, 119, 0.18);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.2);
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), background 0.3s;
      }
      .dm-journey-trigger:hover .dm-journey-expand {
        transform: scale(1.1) rotate(4deg);
        background: #FFFFFF;
      }

      .dm-journey-row .dm-journey-b { max-width: 52ch; }
      .dm-journey-header {
        display: flex; align-items: center; gap: 14px;
        margin-bottom: 2px;
      }
      .dm-journey-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 44px;
        color: var(--brand);
        letter-spacing: -0.028em;
        line-height: 1;
      }
      .dm-journey-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.24em;
        color: var(--ink-4);
        padding: 5px 12px;
        border-radius: 999px;
        background: rgba(42, 68, 119, 0.07);
        font-weight: 600;
      }
      .dm-journey-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(22px, 2.8vw, 32px);
        letter-spacing: -0.02em;
        color: var(--ink);
        line-height: 1.18;
        margin: 0;
      }
      .dm-journey-b {
        font-size: 16px;
        line-height: 1.7;
        color: var(--ink-3);
        margin: 0;
        text-wrap: pretty;
      }

      /* LIGHTBOX */
      .dm-lightbox {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(15, 23, 41, 0.9);
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
        display: flex; align-items: center; justify-content: center;
        padding: 40px 30px;
        animation: dm-fade-in 0.3s ease-out;
        cursor: zoom-out;
      }
      @keyframes dm-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .dm-lightbox-img {
        max-width: 92vw;
        max-height: 88vh;
        width: auto; height: auto;
        border-radius: 10px;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
        cursor: default;
        animation: dm-zoom-in 0.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
      @keyframes dm-zoom-in {
        from { transform: scale(0.92); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
      .dm-lightbox-close {
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
      .dm-lightbox-close:hover { background: rgba(255, 255, 255, 0.22); transform: rotate(90deg); }

      /* FEATURES (4 cards on navy) */
      .dm-features {
        position: relative;
        padding: 130px 0 140px;
        background:
          radial-gradient(ellipse 900px 540px at 50% 10%, rgba(58, 90, 148, 0.3), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dm-features-bg { position: absolute; inset: 0; pointer-events: none; }
      .dm-features-glow {
        position: absolute; top: 40%; left: 50%; transform: translateX(-50%);
        width: 800px; height: 500px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.25), transparent 62%);
        filter: blur(90px);
      }
      .dm-features > .dm-container { position: relative; z-index: 1; }
      .dm-features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px;
      }
      @media (max-width: 780px) {
        .dm-features-grid { grid-template-columns: 1fr; }
      }
      .dm-feature-card {
        position: relative;
        padding: 36px 34px 32px;
        border-radius: 18px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.16) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.4) 0%, rgba(20, 30, 48, 0.6) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        color: #FFFFFF;
        backdrop-filter: blur(10px) saturate(1.15);
        -webkit-backdrop-filter: blur(10px) saturate(1.15);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 20px 46px -20px rgba(0, 0, 0, 0.5);
        display: flex; flex-direction: column; gap: 12px;
        overflow: hidden;
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.45s, box-shadow 0.45s;
      }
      .dm-feature-card::before {
        content: "";
        position: absolute; top: 0; left: 24px; right: 24px; height: 2px;
        background: linear-gradient(90deg, transparent, #a0c4f0, transparent);
        opacity: 0;
        transition: opacity 0.5s;
      }
      .dm-feature-card:hover {
        transform: translateY(-5px);
        border-color: rgba(160, 196, 240, 0.4);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 0 0 1px rgba(120, 160, 220, 0.28) inset, 0 34px 70px -24px rgba(42, 68, 119, 0.6);
      }
      .dm-feature-card:hover::before { opacity: 1; }
      .dm-feature-icon {
        display: inline-flex; align-items: center; justify-content: center;
        width: 56px; height: 56px;
        border-radius: 14px;
        background: linear-gradient(155deg, rgba(160, 196, 240, 0.22) 0%, rgba(90, 127, 181, 0.3) 100%);
        border: 1px solid rgba(160, 196, 240, 0.28);
        color: #a0c4f0;
        margin-bottom: 6px;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), background 0.4s, color 0.4s;
      }
      .dm-feature-card:hover .dm-feature-icon {
        transform: scale(1.06) rotate(-4deg);
        background: linear-gradient(155deg, #a0c4f0 0%, #5A7FB5 100%);
        color: var(--navy-deep);
      }
      .dm-feature-n {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700;
      }
      .dm-feature-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: -0.018em;
        color: #FFFFFF;
        line-height: 1.2;
        margin: 0;
      }
      .dm-feature-b {
        font-size: 15px;
        line-height: 1.65;
        color: rgba(220, 232, 250, 0.82);
        margin: 0;
        text-wrap: pretty;
      }

      /* OUTCOME */
      .dm-outcome { padding: 100px 0; background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .dm-outcome-card {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 820px) {
        .dm-outcome-card { grid-template-columns: 1fr; gap: 24px; }
      }
      .dm-outcome-stat { display: flex; flex-direction: column; gap: 6px; }
      .dm-outcome-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(54px, 7vw, 96px);
        color: var(--brand);
        letter-spacing: -0.03em;
        line-height: 0.9;
      }
      .dm-outcome-label {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.2em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .dm-outcome-quote {
        font-family: var(--font-display), sans-serif;
        font-weight: 400;
        font-style: italic;
        font-size: clamp(22px, 2.6vw, 30px);
        line-height: 1.4;
        color: var(--ink);
        letter-spacing: -0.015em;
        margin: 0;
        max-width: 50ch;
      }
      .dm-outcome-q {
        font-family: var(--font-serif), serif;
        color: var(--brand);
        font-size: 1.4em;
        line-height: 0;
        margin-right: 6px;
        vertical-align: -0.2em;
      }

      /* FINAL CTA */
      .dm-cta-final { padding: 100px 0 110px; background: var(--bg); }
      .dm-cta-card {
        position: relative;
        padding: 44px 48px;
        border-radius: 22px;
        background: var(--brand);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 30px 70px -26px rgba(42, 68, 119, 0.5);
        overflow: hidden;
      }
      .dm-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .dm-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
      .dm-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: dm-ripple 3s ease-in-out infinite; }
      .dm-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: dm-ripple 3s ease-in-out infinite 0.4s; }
      .dm-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: dm-ripple 3s ease-in-out infinite 0.8s; }
      .dm-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: dm-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes dm-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes dm-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .dm-cta-ring { animation: none !important; } }
      .dm-cta-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 6px; max-width: 480px; }
      .dm-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 36px); line-height: 1.12; letter-spacing: -0.02em; margin: 0; color: #FFFFFF; }
      .dm-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.85); }
      .dm-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 6px 0 18px; line-height: 1.5; max-width: 40ch; }
      .dm-cta-pill { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; border-radius: 999px; background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600; text-decoration: none; align-self: flex-start; white-space: nowrap; transition: background 0.25s, transform 0.25s, box-shadow 0.25s; box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3); }
      .dm-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .dm-cta-pill-arrow { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--brand); color: #FFFFFF; font-size: 13px; transition: background 0.25s, transform 0.25s; }
      .dm-cta-pill:hover .dm-cta-pill-arrow { background: var(--navy-cta); transform: translateX(2px); }

      /* FOOTER */
      /* ─── RELATED (style 4 · vertical stack with diagonal accent) ─── */
      .dm-related { padding: 130px 0 80px; background: var(--bg); }
      .dm-related-head { max-width: 760px; margin: 0 auto 56px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; }
      .dm-related-stack { display: flex; flex-direction: column; gap: 22px; max-width: 860px; margin: 0 auto; }
      .dm-related-slot { position: relative; display: block; }
      .dm-related-card {
        position: relative;
        display: flex; flex-direction: column; gap: 10px;
        padding: 26px 28px 26px;
        text-decoration: none;
        color: var(--ink);
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 14px;
        overflow: hidden;
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.45s, border-color 0.45s;
      }
      .dm-related-card:hover {
        transform: translateX(6px);
        border-color: rgba(42, 68, 119, 0.32);
        box-shadow: 0 24px 50px -26px rgba(42, 68, 119, 0.28);
      }
      .dm-related-card:hover .dm-related-ico { transform: translate(4px, -4px); color: var(--brand); }
      .dm-related-card-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
      .dm-related-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 22px;
        letter-spacing: -0.018em; color: var(--ink);
        line-height: 1.22; margin: 0;
      }
      .dm-related-ico { color: var(--ink-4); transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), color 0.45s; }
      .dm-related-b {
        font-size: 14.5px; line-height: 1.6;
        color: var(--ink-3); margin: 0;
        text-wrap: pretty;
      }
      .dm-related-accent {
        position: absolute; top: -40px; right: -40px;
        width: 120px; height: 120px;
        background: linear-gradient(135deg, rgba(42, 68, 119, 0.1) 0%, transparent 60%);
        transform: rotate(45deg);
        pointer-events: none;
      }

      .dm-footer { position: relative; background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%); color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden; }
      .dm-footer::after { content: ""; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 320px; background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%); pointer-events: none; }
      .dm-footer > .dm-container { position: relative; z-index: 1; }
      .dm-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .dm-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .dm-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .dm-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dm-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .dm-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dm-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dm-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .dm-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .dm-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .dm-foot-h { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; margin-bottom: 18px; text-transform: uppercase; }
      .dm-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .dm-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .dm-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .dm-footer-watermark {
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
      .dm-footer-bottom { position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; padding: 22px 0 28px; margin-top: -10px; }
      .dm-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .dm-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .dm-footer { padding: 72px 0 0; margin-top: 60px; }
        .dm-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
      }
    `}</style>
  )
}
