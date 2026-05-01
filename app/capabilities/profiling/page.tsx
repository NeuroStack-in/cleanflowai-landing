"use client"

/**
 * Data Profiling — bespoke page.
 * Deliberately breaks the shared capability template:
 *  - Editorial magazine layout, not a 3-pillar / 6-feature grid
 *  - Asymmetric hero with a numbered "INDEX" sidebar
 *  - Wide live-profile centerpiece
 *  - Stats ribbon, alternating-row pillars, list-style features
 *  - No reused section headings
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
    n: "01",
    label: "Know what you have",
    body: "Walk into any dataset with eyes open. CleanFlowAI surfaces the shape, the gaps, and the surprises in seconds — so the team is informed before the first decision is made.",
    foot: "Outcome: confidence at first glance",
  },
  {
    n: "02",
    label: "Spot the risks early",
    body: "The problems that derail integrations are visible before they ship. Hidden gaps, silent inconsistencies, formatting drift — surfaced where stewards can act, not buried in a downstream failure.",
    foot: "Outcome: zero late-stage surprises",
  },
  {
    n: "03",
    label: "Stewards stay in control",
    body: "CleanFlowAI proposes — your team decides. Every suggestion is reviewable, traceable, and approved before anything moves. Speed without losing oversight.",
    foot: "Outcome: trusted output, every time",
  },
]

const FEATURE_INDEX = [
  { id: "01", icon: "type",     h: "Instant clarity on every column",   b: "See what each column actually holds — no more guesswork, no more surprises mid-project." },
  { id: "02", icon: "bars",     h: "A complete health check, fast",     b: "Every column profiled and ranked for risk in seconds. Your team sees what matters first." },
  { id: "03", icon: "grid",     h: "Format consistency, end-to-end",    b: "Catch formatting issues before they reach customers, partners, or the warehouse." },
  { id: "04", icon: "spark",    h: "AI-suggested guardrails",           b: "CleanFlowAI proposes the rules that protect your data — your team approves what fits." },
  { id: "05", icon: "key",      h: "Relationships made visible",        b: "The structure your data already has, surfaced clearly — so integrations land right the first time." },
  { id: "06", icon: "diff",     h: "Drift caught before it costs you",  b: "When the next batch quietly changes shape, you know — before your dashboards do." },
]

export default function DataProfilingPage() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} dp-root`}>
      <SiteNav />

      <main className="dp-main">
        {/* ───── ASYMMETRIC HERO ───── */}
        <section className="dp-hero">
          <div className="dp-hero-bg" aria-hidden>
            <div className="dp-hero-grid" />
            <div className="dp-hero-glow" />
          </div>
          <div className="dp-container">
            <div className="dp-hero-grid-content">
              <motion.div className="dp-hero-live" {...rise(0.15)}>
                <LiveProfilerAnimation />
              </motion.div>

              <div className="dp-hero-text">
                <motion.span className="dp-eyebrow" {...rise(0.05)}>DATA PROFILING</motion.span>

                <motion.h1 className="dp-h1" {...rise(0.1)}>
                  Examine first.<br />
                  <span className="dp-h1-em">Then trust</span>.
                </motion.h1>

                <motion.div className="dp-hero-stats" {...rise(0.3)}>
                  <div className="dp-hero-stat"><b>Built for scale</b><span>any dataset, any source</span></div>
                  <div className="dp-hero-stat-divider" />
                  <div className="dp-hero-stat"><b>See it all</b><span>nothing slips through</span></div>
                  <div className="dp-hero-stat-divider" />
                  <div className="dp-hero-stat"><b>Stay in control</b><span>your team approves every move</span></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── PILLARS — blue cards with alternating slide-in ───── */}
        <section className="dp-pillars">
          <div className="dp-container">
            <motion.div
              className="dp-pillars-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as number[] }}
            >
              <span className="dp-eyebrow">WHAT YOUR TEAM GETS</span>
              <h2 className="dp-h2">
                Confidence in your data,<br />
                <span className="dp-h2-em">before you act on it</span>.
              </h2>
            </motion.div>
            <div className="dp-pillars-rows">
              {PILLARS.map((p, i) => (
                <motion.article
                  key={p.n}
                  className={`dp-pillar-row ${i % 2 === 1 ? "dp-pillar-row-flip" : ""}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.85, delay: 0.05 + i * 0.12, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dp-pillar-num-wrap">
                    <span className="dp-pillar-num">{p.n}</span>
                  </div>
                  <div className="dp-pillar-text">
                    <h3 className="dp-pillar-h">{p.label}</h3>
                    <p className="dp-pillar-b">{p.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── PROFILING INDEX — layered expandable stack ───── */}
        <section className="dp-features">
          <div className="dp-container">
            <motion.div
              className="dp-features-head"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as number[] }}
            >
              <span className="dp-eyebrow">VALUE YOU UNLOCK</span>
              <h2 className="dp-h2">Six wins your team feels right away.</h2>
            </motion.div>
            <motion.div
              className="dp-features-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] as number[] }}
            >
              {FEATURE_INDEX.map((f, i) => (
                <motion.div
                  key={f.id}
                  className="dp-feature-layer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="dp-feature-layer-head">
                    <span className="dp-feature-icon" aria-hidden>
                      <SurfaceIcon name={f.icon} />
                    </span>
                    <h3 className="dp-feature-h">{f.h}</h3>
                    <span className="dp-feature-chevron" aria-hidden>
                      <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                        <path d="M 3 5 L 7 9 L 11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div className="dp-feature-layer-body">
                    <p className="dp-feature-b">{f.b}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───── RELATED — editorial numbered index ───── */}
        <section className="dp-related">
          <div className="dp-container">
            <motion.div className="dp-related-head" {...rise(0.05)}>
              <span className="dp-eyebrow">EXPLORE MORE</span>
              <h2 className="dp-h2">
                The rest of the platform,<br />
                <span className="dp-h1-em">working in your favor.</span>
              </h2>
            </motion.div>
            <ul className="dp-related-list">
              {SOLUTIONS.filter(s => s.slug !== "profiling").slice(0, 3).map((s, i) => (
                <motion.li
                  key={s.slug}
                  className="dp-related-row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="dp-related-link">
                    <div className="dp-related-copy">
                      <h3 className="dp-related-name">{s.name}</h3>
                      <p className="dp-related-blurb">{s.blurb}</p>
                    </div>
                    <span className="dp-related-arrow" aria-hidden>
                      <svg viewBox="0 0 24 12" width="26" height="13" fill="none">
                        <path d="M0 6 H 22 M 16 1 L 22 6 L 16 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
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

function SurfaceIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "type":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <circle cx="10" cy="10" r="6" />
          <path d="M15 15 L 21 21" strokeWidth="2" />
          <path d="M7.5 13 L 10 7 L 12.5 13 M 8.4 11 H 11.6" strokeWidth="1.4" />
        </svg>
      )
    case "bars":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <path d="M4 20 H 20" />
          <rect x="5"  y="13" width="3" height="7" rx="0.5" />
          <rect x="10" y="8"  width="3" height="12" rx="0.5" />
          <rect x="15" y="11" width="3" height="9" rx="0.5" />
          <path d="M4 4 L 10 6 L 14.5 4 L 20 2" opacity="0.5" />
        </svg>
      )
    case "grid":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <rect x="3" y="3" width="8" height="8" rx="1.2" />
          <rect x="13" y="3" width="8" height="8" rx="1.2" />
          <rect x="3" y="13" width="8" height="8" rx="1.2" />
          <rect x="13" y="13" width="8" height="8" rx="1.2" />
          <path d="M6 7 L 8 5 M 15 17 L 18 14" strokeWidth="1.4" opacity="0.7" />
        </svg>
      )
    case "spark":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <path d="M9 3 L 10.5 7.5 L 15 9 L 10.5 10.5 L 9 15 L 7.5 10.5 L 3 9 L 7.5 7.5 Z" />
          <path d="M17 13 L 17.9 15.6 L 20.5 16.5 L 17.9 17.4 L 17 20 L 16.1 17.4 L 13.5 16.5 L 16.1 15.6 Z" opacity="0.65" />
        </svg>
      )
    case "key":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <circle cx="8" cy="12" r="4.5" />
          <circle cx="8" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <path d="M12.5 12 H 21 M 18 12 V 15.5 M 15 12 V 14.5" />
        </svg>
      )
    case "diff":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <rect x="3" y="4" width="8" height="16" rx="1.5" opacity="0.8" />
          <rect x="13" y="4" width="8" height="16" rx="1.5" strokeDasharray="3 2" />
          <path d="M14.5 9 H 19.5 M 14.5 12 H 18 M 14.5 15 H 19" opacity="0.8" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...P} aria-hidden>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

function LiveProfilerAnimation() {
  const rows = [
    { name: "customer_id",  type: "INT",     nullPct: 0,   uniqPct: 100, conf: 99 },
    { name: "email",         type: "EMAIL",   nullPct: 2,   uniqPct: 97,  conf: 98 },
    { name: "signup_date",   type: "DATE",    nullPct: 0,   uniqPct: 42,  conf: 96 },
    { name: "region",        type: "TEXT",    nullPct: 1,   uniqPct: 8,   conf: 94 },
    { name: "plan",          type: "ENUM",    nullPct: 0,   uniqPct: 3,   conf: 97 },
    { name: "lifetime_value",type: "NUMERIC", nullPct: 12,  uniqPct: 84,  conf: 89 },
    { name: "last_login",    type: "DATE",    nullPct: 18,  uniqPct: 73,  conf: 92 },
  ]
  return (
    <div className="dp-live-anim">
      <div className="dp-live-anim-chrome">
        <span className="dp-live-anim-dot" />
        <span className="dp-live-anim-dot" />
        <span className="dp-live-anim-dot" />
        <span className="dp-live-anim-tab">customers.csv</span>
      </div>
      <div className="dp-live-anim-body">
        <div className="dp-live-anim-head">
          <span>COLUMN</span>
          <span>TYPE</span>
          <span>NULLS</span>
          <span>UNIQUE</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.name} className="dp-live-anim-row" style={{ animationDelay: `${0.3 + i * 0.14}s` }}>
            <span className="dp-live-anim-name">{r.name}</span>
            <span className={`dp-live-anim-type dp-live-anim-type-${r.type.toLowerCase()}`}>{r.type}</span>
            <span className="dp-live-anim-bar-wrap">
              <span className="dp-live-anim-bar dp-live-anim-bar-null">
                <span className="dp-live-anim-bar-fill" style={{ width: `${r.nullPct}%`, animationDelay: `${0.5 + i * 0.14}s` }} />
              </span>
            </span>
            <span className="dp-live-anim-bar-wrap">
              <span className="dp-live-anim-bar dp-live-anim-bar-uniq">
                <span className="dp-live-anim-bar-fill" style={{ width: `${r.uniqPct}%`, animationDelay: `${0.55 + i * 0.14}s` }} />
              </span>
            </span>
          </div>
        ))}
        <div className="dp-live-anim-scanner" aria-hidden />
      </div>
    </div>
  )
}

function StyleBlock() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }

      .dp-root {
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
      .dp-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .dp-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }
      .dp-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .dp-container { padding: 0 22px; } }

      /* NAV */
      .dp-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .dp-nav-solid {
        background: rgba(250, 250, 245, 0.94);
        border-bottom-color: var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06);
      }
      .dp-nav-inner {
        max-width: 1280px; margin: 0 auto; padding: 16px 36px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .dp-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); }
      .dp-logo-wrap { display: inline-flex; width: 38px; height: 38px; }
      .dp-logo-wrap img { width: 38px; height: 38px; }
      .dp-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dp-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
      .dp-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; margin-top: 2px; }
      .dp-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .dp-nav-links > a { color: var(--ink-2); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .dp-nav-links > a:hover { color: var(--brand); }
      .dp-nav-cta {
        padding: 10px 18px; background: var(--ink); color: #FFFFFF !important;
        border-radius: 999px; font-weight: 500; font-size: 13.5px;
        transition: transform 0.25s, background 0.25s;
      }
      .dp-nav-cta:hover { background: var(--brand); transform: translateY(-1px); }

      .dp-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .dp-nav-dd-trigger {
        display: inline-flex; align-items: center; gap: 6px;
        background: transparent; border: none; padding: 0;
        font: inherit; font-size: 14px; font-weight: 450;
        cursor: pointer; color: var(--ink-2); transition: color 0.25s;
      }
      .dp-nav-dd-trigger:hover { color: var(--brand); }
      .dp-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .dp-nav-dd-caret-open { transform: rotate(180deg); }
      .dp-nav-dd-menu {
        position: absolute; top: calc(100% - 2px); left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0; visibility: hidden;
        transition: opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1), transform 0.28s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s 0.28s;
        z-index: 60;
      }
      .dp-nav-dd-menu-open {
        opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0);
        transition: opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1), transform 0.35s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s;
      }
      .dp-nav-dd-inner-menu {
        margin-top: 14px; background: #FFFFFF;
        border: 1px solid var(--line); border-radius: 18px; padding: 24px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 30px 80px -20px rgba(15, 23, 41, 0.22), 0 8px 20px -8px rgba(15, 23, 41, 0.12);
      }
      .dp-nav-dd-head {
        display: flex; justify-content: space-between; align-items: baseline;
        padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px;
      }
      .dp-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .dp-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .dp-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .dp-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .dp-nav-dd-item {
        display: flex; flex-direction: column; gap: 4px;
        padding: 12px 14px; border-radius: 10px;
        text-decoration: none; color: var(--ink);
        transition: background 0.25s, transform 0.25s;
      }
      .dp-nav-dd-item:hover { background: var(--bg-2); transform: translateX(2px); }
      .dp-nav-dd-item-active { background: var(--bg-2); }
      .dp-nav-dd-item-active .dp-nav-dd-item-name { color: var(--brand); }
      .dp-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; letter-spacing: -0.01em; color: var(--ink); transition: color 0.25s; }
      .dp-nav-dd-item-blurb { font-family: var(--font-sans), sans-serif; font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .dp-nav-dd-feature {
        display: flex; flex-direction: column; gap: 8px;
        padding: 18px 18px 16px; border-radius: 12px; text-decoration: none; color: #FFFFFF;
        background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
                    linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 12px 30px -14px rgba(15, 23, 41, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .dp-nav-dd-feature:hover { transform: translateY(-2px); }
      .dp-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .dp-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .dp-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .dp-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .dp-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.015em; color: #FFFFFF; margin: 4px 0 0; line-height: 1.15; }
      .dp-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .dp-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* ─────────  HERO — blue-tinted atmospheric (matches landing)  ───────── */
      .dp-hero {
        position: relative;
        padding: 160px 0 100px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 1200px 700px at 50% 0%, rgba(42, 68, 119, 0.22) 0%, rgba(90, 127, 181, 0.1) 40%, transparent 70%),
          radial-gradient(ellipse 620px 520px at 14% 45%, rgba(90, 127, 181, 0.28), transparent 62%),
          radial-gradient(ellipse 560px 460px at 90% 55%, rgba(42, 68, 119, 0.2), transparent 62%),
          linear-gradient(180deg, #EEF2FA 0%, #F4F3EC 45%, var(--bg) 100%);
      }
      .dp-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .dp-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(42, 68, 119, 0.09) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(42, 68, 119, 0.09) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 30%, transparent 85%);
      }
      .dp-hero-glow {
        display: none;
      }
      .dp-hero > .dp-container { position: relative; z-index: 1; }
      .dp-hero > .dp-container { position: relative; z-index: 1; }
      .dp-hero-rail {
        display: flex;
        gap: 22px;
        margin-bottom: 48px;
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.22em;
        color: var(--ink-4);
        align-items: center;
      }
      .dp-hero-rail::before {
        content: ""; flex: 0 0 28px; height: 1px;
        background: var(--line-2);
      }
      .dp-hero-meta-em { color: var(--brand); font-weight: 700; }

      .dp-hero-grid-content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .dp-hero-grid-content { grid-template-columns: 1fr; gap: 36px; }
        .dp-hero-live { order: 2; }
        .dp-hero-text { order: 1; }
      }
      .dp-hero-text { display: flex; flex-direction: column; gap: 20px; }

      /* ── HERO LIVE PROFILER ANIMATION (left side) ── */
      .dp-hero-live {
        position: relative;
      }
      .dp-live-anim {
        position: relative;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 14px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 30px 70px -28px rgba(42, 68, 119, 0.32),
          0 10px 24px -10px rgba(15, 23, 41, 0.14);
      }
      .dp-live-anim-chrome {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 12px 16px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .dp-live-anim-dot {
        width: 9px; height: 9px; border-radius: 50%;
        background: var(--line-2);
      }
      .dp-live-anim-dot:nth-child(1) { background: #E8816D; }
      .dp-live-anim-dot:nth-child(2) { background: #E8C66D; }
      .dp-live-anim-dot:nth-child(3) { background: #88C08A; }
      .dp-live-anim-tab {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
        letter-spacing: 0.04em;
        margin-left: 10px;
      }
      .dp-live-anim-meta {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.18em;
        color: #2E7D5A;
        font-weight: 700;
      }
      .dp-live-anim-pulse {
        width: 6px; height: 6px; border-radius: 50%;
        background: #2E7D5A;
        box-shadow: 0 0 0 3px rgba(46, 125, 90, 0.22);
        animation: dp-pulse 1.6s ease-in-out infinite;
      }
      @keyframes dp-pulse {
        0%, 100% { opacity: 0.5; transform: scale(0.9); }
        50%      { opacity: 1;   transform: scale(1.1); }
      }
      .dp-live-anim-body {
        position: relative;
        padding: 18px 20px 20px;
        background: #FFFFFF;
      }
      .dp-live-anim-head, .dp-live-anim-row {
        display: grid;
        grid-template-columns: 1.4fr 0.7fr 1fr 1fr;
        gap: 14px;
        align-items: center;
      }
      .dp-live-anim-head {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-4);
        padding: 4px 0 10px;
        border-bottom: 1px solid var(--line);
      }
      .dp-live-anim-row {
        padding: 9px 0;
        border-bottom: 1px dotted var(--line);
        font-size: 12.5px;
        opacity: 0;
        animation: dp-fade-in 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dp-fade-in { to { opacity: 1; } }
      .dp-live-anim-name {
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        color: var(--ink);
      }
      .dp-live-anim-type {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.1em;
        padding: 3px 7px;
        border-radius: 3px;
        justify-self: start;
      }
      .dp-live-anim-type-int,
      .dp-live-anim-type-numeric { background: rgba(42, 68, 119, 0.1); color: var(--brand); }
      .dp-live-anim-type-email,
      .dp-live-anim-type-text { background: rgba(58, 90, 148, 0.1); color: #3A5A94; }
      .dp-live-anim-type-date { background: rgba(90, 127, 181, 0.14); color: #3A5A94; }
      .dp-live-anim-type-enum { background: rgba(15, 23, 41, 0.06); color: var(--ink-2); }
      .dp-live-anim-bar-wrap { display: flex; align-items: center; }
      .dp-live-anim-bar {
        position: relative;
        width: 100%; height: 5px;
        background: rgba(15, 23, 41, 0.05);
        border-radius: 3px;
        overflow: hidden;
      }
      .dp-live-anim-bar-fill {
        position: absolute; top: 0; left: 0; bottom: 0;
        width: 0;
        animation: dp-grow-x 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dp-grow-x { from { width: 0 !important; } }
      .dp-live-anim-bar-null .dp-live-anim-bar-fill { background: linear-gradient(90deg, #E8816D, #B5762E); }
      .dp-live-anim-bar-uniq .dp-live-anim-bar-fill { background: linear-gradient(90deg, var(--navy-mid), var(--brand)); }
      .dp-live-anim-scanner {
        position: absolute;
        left: 0; right: 0; top: 40px;
        height: 3px;
        background: linear-gradient(90deg, transparent 0%, rgba(58, 90, 148, 0.35) 50%, transparent 100%);
        pointer-events: none;
        animation: dp-scan 2.6s ease-in-out infinite;
      }
      @keyframes dp-scan {
        0%   { transform: translateY(0); opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { transform: translateY(250px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dp-live-anim-row, .dp-live-anim-bar-fill, .dp-live-anim-scanner, .dp-live-anim-pulse { animation: none !important; opacity: 1; }
      }
      .dp-hero-text { display: flex; flex-direction: column; gap: 24px; }
      .dp-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(40px, 5.2vw, 74px);
        line-height: 1.04;
        letter-spacing: -0.032em;
        color: var(--ink);
        margin: 0;
        white-space: nowrap;
      }
      .dp-h1 br { display: inline; }
      @media (max-width: 980px) {
        .dp-h1 { font-size: clamp(38px, 7vw, 66px); }
      }
      .dp-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        letter-spacing: -0.01em;
        font-size: 1.05em;
      }
      .dp-lede {
        font-family: var(--font-sans), sans-serif;
        font-size: 17px;
        line-height: 1.65;
        color: var(--ink-3);
        max-width: 56ch;
        margin: 4px 0 0;
      }

      .dp-hero-stats {
        display: flex;
        align-items: center;
        gap: 22px;
        padding: 18px 24px;
        background: linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 70%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        border-radius: 14px;
        align-self: flex-start;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.08) inset,
          0 18px 36px -14px rgba(42, 68, 119, 0.45);
      }
      .dp-hero-stat { display: flex; flex-direction: column; gap: 2px; }
      .dp-hero-stat b {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: #FFFFFF;
        letter-spacing: -0.02em;
        line-height: 1;
      }
      .dp-hero-stat span {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: #a0c4f0;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .dp-hero-stat-divider {
        width: 1px; height: 28px; background: rgba(160, 196, 240, 0.22);
      }
      @media (max-width: 720px) {
        .dp-hero-stats { flex-direction: column; align-items: stretch; gap: 14px; width: 100%; padding: 20px 22px; }
        .dp-hero-stat { align-items: flex-start; }
        .dp-hero-stat-divider { display: none; }
      }

      .dp-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; margin-top: 8px; }
      .dp-cta-primary {
        display: inline-flex; align-items: center; gap: 12px;
        padding: 14px 24px; background: var(--brand); color: #FFFFFF;
        border-radius: 999px; font-size: 14.5px; font-weight: 500;
        text-decoration: none;
        box-shadow: 0 14px 30px -14px rgba(42, 68, 119, 0.55);
        transition: background 0.25s, transform 0.25s;
      }
      .dp-cta-primary:hover { background: var(--navy-cta); transform: translateY(-1px); }
      .dp-cta-primary svg { transition: transform 0.25s; }
      .dp-cta-primary:hover svg { transform: translateX(3px); }
      .dp-cta-ghost {
        font-family: var(--font-mono), monospace;
        font-size: 12px; letter-spacing: 0.14em;
        color: var(--ink-3); text-decoration: none;
        padding: 14px 18px; border: 1px dashed var(--line-2);
        border-radius: 999px;
        transition: color 0.25s, border-color 0.25s;
      }
      .dp-cta-ghost:hover { color: var(--brand); border-color: var(--brand); }

      /* HERO INDEX (right side) */
      .dp-hero-index {
        position: relative;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 24px 24px 18px;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 30px 70px -28px rgba(15, 23, 41, 0.2);
      }
      .dp-hero-index::before {
        content: ""; position: absolute; top: 0; left: 22px; right: 22px; height: 2px;
        background: linear-gradient(90deg, var(--brand), var(--navy-mid));
      }
      .dp-hero-index-label {
        display: block;
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 700;
        margin-bottom: 14px;
      }
      .dp-hero-index ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; }
      .dp-hero-index li {
        display: grid;
        grid-template-columns: 38px 1fr;
        gap: 14px;
        align-items: start;
        padding: 12px 0;
        border-top: 1px dotted var(--line);
      }
      .dp-hero-index li:first-child { border-top-color: transparent; padding-top: 4px; }
      .dp-hero-index-n {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.16em;
        color: var(--brand);
        font-weight: 700;
        padding-top: 2px;
      }
      .dp-hero-index-t {
        display: block;
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 14.5px;
        color: var(--ink);
        letter-spacing: -0.01em;
      }
      .dp-hero-index-d {
        display: block;
        font-size: 12.5px;
        color: var(--ink-4);
        margin-top: 2px;
        line-height: 1.45;
      }

      /* ─────────  TICKER strip ───────── */
      .dp-ticker {
        background: var(--brand);
        color: #FFFFFF;
        overflow: hidden;
        padding: 14px 0;
        border-top: 1px solid rgba(160, 196, 240, 0.2);
        border-bottom: 1px solid rgba(160, 196, 240, 0.12);
      }
      .dp-ticker-track {
        display: flex; gap: 36px;
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        letter-spacing: 0.22em;
        color: rgba(220, 232, 250, 0.85);
        white-space: nowrap;
        animation: dp-ticker 36s linear infinite;
      }
      .dp-ticker-track span { flex: 0 0 auto; }
      @keyframes dp-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @media (prefers-reduced-motion: reduce) { .dp-ticker-track { animation: none; } }

      /* ─────────  LIVE PROFILE — navy band + product screenshot ───────── */
      .dp-live {
        position: relative;
        padding: 130px 0 140px;
        background:
          radial-gradient(ellipse 900px 560px at 50% 10%, rgba(58, 90, 148, 0.38), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        overflow: hidden;
        color: #FFFFFF;
      }
      .dp-live-bg { position: absolute; inset: 0; pointer-events: none; }
      .dp-live-glow-a {
        position: absolute; top: -12%; left: -10%; width: 620px; height: 540px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.36), transparent 62%);
        filter: blur(100px);
      }
      .dp-live-glow-b {
        position: absolute; bottom: -15%; right: -10%; width: 560px; height: 480px;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.48), transparent 60%);
        filter: blur(90px);
      }
      .dp-live > .dp-container { position: relative; z-index: 1; }
      .dp-live-head { display: flex; flex-direction: column; gap: 12px; max-width: 760px; margin: 0 auto 48px; text-align: center; align-items: center; }
      .dp-h2-sub.dp-h2-sub-light { color: rgba(220, 232, 250, 0.85); opacity: 1; font-weight: 400; }
      .dp-live-foot {
        max-width: 820px;
        margin: 48px auto 0;
        font-family: var(--font-sans), sans-serif;
        font-size: 16px;
        line-height: 1.7;
        color: rgba(220, 232, 250, 0.85);
        text-align: center;
        text-wrap: pretty;
      }
      .dp-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
      }
      .dp-eyebrow-light { color: #a0c4f0; }
      .dp-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(34px, 4.6vw, 56px);
        line-height: 1.05;
        letter-spacing: -0.03em;
        color: var(--ink); margin: 0;
        text-wrap: balance;
      }
      .dp-h2-light { color: #FFFFFF; }
      .dp-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.05em;
      }
      .dp-h2-em-light { color: #a0c4f0; font-style: italic; font-weight: 400; font-family: var(--font-display), sans-serif; font-size: 1.05em; }
      .dp-h2-sub {
        font-family: var(--font-sans), sans-serif;
        font-size: 16px; line-height: 1.6; color: var(--ink-3);
        max-width: 56ch; margin: 6px 0 0;
      }
      .dp-live-frame {
        background: #FFFFFF;
        border: 1px solid rgba(160, 196, 240, 0.18);
        border-radius: 18px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.95) inset,
          0 60px 120px -32px rgba(0, 0, 0, 0.55),
          0 20px 40px -16px rgba(0, 0, 0, 0.35);
        max-width: 1100px;
        margin: 0 auto;
      }
      .dp-live-trigger {
        display: block; width: 100%;
        padding: 0; margin: 0; border: none;
        background: transparent;
        cursor: zoom-in;
        position: relative;
        color: inherit;
        text-align: left;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dp-live-frame:hover { transform: translateY(-3px); transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
      .dp-live-expand {
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
      .dp-live-trigger:hover .dp-live-expand {
        background: rgba(15, 23, 41, 0.95);
        transform: translateY(-2px);
        box-shadow: 0 10px 28px -8px rgba(15, 23, 41, 0.5);
      }
      .dp-lightbox {
        position: fixed; inset: 0; z-index: 200;
        background: rgba(15, 23, 41, 0.9);
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
        display: flex; align-items: center; justify-content: center;
        padding: 40px 30px;
        animation: dp-fade-in 0.3s ease-out;
        cursor: zoom-out;
      }
      @keyframes dp-fade-in { from { opacity: 0; } to { opacity: 1; } }
      .dp-lightbox-img {
        max-width: 92vw;
        max-height: 88vh;
        width: auto; height: auto;
        border-radius: 10px;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
        cursor: default;
        animation: dp-zoom-in 0.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
      @keyframes dp-zoom-in {
        from { transform: scale(0.92); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
      .dp-lightbox-close {
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
      .dp-lightbox-close:hover { background: rgba(255, 255, 255, 0.22); transform: rotate(90deg); }
      .dp-live-chrome {
        display: flex; align-items: center; gap: 8px;
        padding: 14px 18px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .dp-live-dot { width: 11px; height: 11px; border-radius: 50%; }
      .dp-live-dot-r { background: #E8816D; }
      .dp-live-dot-y { background: #E8C66D; }
      .dp-live-dot-g { background: #88C08A; }
      .dp-live-tab {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px; letter-spacing: 0.05em;
        color: var(--ink-3);
        margin-left: 14px;
      }
      .dp-live-meta {
        margin-left: auto;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.18em;
        color: #2E7D5A; font-weight: 600;
        padding: 3px 9px; border-radius: 999px;
        background: rgba(46, 125, 90, 0.1);
        border: 1px solid rgba(46, 125, 90, 0.22);
      }
      .dp-live-body { padding: 24px 28px 28px; }
      .dp-live-img {
        display: block;
        width: 100%;
        height: auto;
        background: var(--bg);
      }
      .dp-prof-head, .dp-prof-row {
        display: grid;
        grid-template-columns: 1.6fr 0.7fr 1.2fr 1.2fr 0.9fr;
        gap: 14px; align-items: center;
        font-size: 13.5px;
      }
      .dp-prof-head {
        font-family: var(--font-mono), monospace;
        font-size: 10px; letter-spacing: 0.18em;
        text-transform: uppercase; color: var(--ink-4);
        padding: 8px 4px; border-bottom: 1px solid var(--line);
      }
      .dp-prof-row {
        padding: 12px 4px;
        border-bottom: 1px dotted var(--line);
        opacity: 0;
        animation: dp-rise 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dp-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .dp-prof-name {
        font-family: var(--font-mono), monospace;
        font-size: 13.5px; color: var(--ink);
        display: inline-flex; align-items: center; gap: 8px;
      }
      .dp-prof-key { color: var(--brand); font-size: 11px; }
      .dp-prof-type {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.12em;
        padding: 3px 9px; border-radius: 4px; justify-self: start;
      }
      .dp-prof-type-int, .dp-prof-type-numeric { background: rgba(42, 68, 119, 0.1); color: var(--brand); }
      .dp-prof-type-email, .dp-prof-type-text { background: rgba(58, 90, 148, 0.1); color: #3A5A94; }
      .dp-prof-type-date { background: rgba(90, 127, 181, 0.14); color: #3A5A94; }
      .dp-prof-type-enum { background: rgba(15, 23, 41, 0.06); color: var(--ink-2); }
      .dp-prof-type-phone { background: rgba(20, 30, 48, 0.08); color: var(--navy-mid); }
      .dp-prof-bar { display: flex; align-items: center; gap: 10px; }
      .dp-prof-bar-track {
        position: relative; flex: 1; height: 6px;
        background: rgba(15, 23, 41, 0.05); border-radius: 3px; overflow: hidden;
      }
      .dp-prof-bar-fill {
        position: absolute; top: 0; left: 0; bottom: 0; width: 0;
        animation: dp-grow-x 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes dp-grow-x { from { width: 0 !important; } }
      .dp-prof-bar-null { background: linear-gradient(90deg, #E8816D, #B5762E); }
      .dp-prof-bar-uniq { background: linear-gradient(90deg, var(--navy-mid), var(--brand)); }
      .dp-prof-bar-num {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px; color: var(--ink-3);
        min-width: 36px; text-align: right;
      }
      .dp-prof-conf {
        font-family: var(--font-mono), monospace;
        font-size: 12px; color: var(--ink);
        display: inline-flex; align-items: center; gap: 6px;
      }
      .dp-prof-conf-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #88C08A;
        box-shadow: 0 0 0 3px rgba(136, 192, 138, 0.25);
      }
      @media (max-width: 720px) {
        .dp-prof-head { display: none; }
        .dp-prof-row {
          grid-template-columns: 1fr auto;
          grid-template-areas: "name type" "null null" "uniq uniq" "conf conf";
          gap: 6px 10px; padding: 14px 10px;
          background: var(--bg); border: 1px solid var(--line); border-radius: 8px;
          margin-bottom: 8px;
        }
        .dp-prof-name { grid-area: name; }
        .dp-prof-type { grid-area: type; justify-self: end; }
        .dp-prof-bar:nth-of-type(3) { grid-area: null; }
        .dp-prof-bar:nth-of-type(4) { grid-area: uniq; }
        .dp-prof-conf { grid-area: conf; }
        .dp-live-body { padding: 16px 14px 18px; }
        .dp-live-tab { display: none; }
      }

      /* ─────────  STAT QUARTET ───────── */
      .dp-stats { padding: 80px 0; }
      .dp-stats-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
        background: var(--line);
        border: 1px solid var(--line);
        border-radius: 16px; overflow: hidden;
      }
      @media (max-width: 900px) { .dp-stats-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 540px) { .dp-stats-grid { grid-template-columns: 1fr; } }
      .dp-stat {
        background: #FFFFFF;
        padding: 32px 28px 30px;
        display: flex; flex-direction: column; gap: 6px;
      }
      .dp-stat-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(38px, 4.4vw, 56px);
        color: var(--brand);
        letter-spacing: -0.035em;
        line-height: 0.95;
      }
      .dp-stat-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 15px;
        color: var(--ink);
        letter-spacing: -0.005em;
        margin-top: 6px;
      }
      .dp-stat-desc {
        font-size: 13px;
        line-height: 1.5;
        color: var(--ink-4);
      }

      /* ─────────  PILLARS — alternating editorial rows, blue accents + slide-in ───────── */
      .dp-pillars { padding: 110px 0 100px; background: var(--paper); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .dp-pillars-head {
        max-width: 720px;
        margin: 0 auto 60px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center;
        align-items: center;
      }
      .dp-pillars-rows { display: flex; flex-direction: column; gap: 36px; }
      .dp-pillar-row {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 48px;
        padding: 32px 0;
        border-top: 1px solid var(--line);
        align-items: start;
      }
      .dp-pillar-row-flip {
        grid-template-columns: 1fr 200px;
        text-align: right;
      }
      .dp-pillar-row-flip .dp-pillar-num-wrap { order: 2; align-items: flex-end; }
      .dp-pillar-row-flip .dp-pillar-text { order: 1; align-items: flex-end; }
      @media (max-width: 720px) {
        .dp-pillar-row, .dp-pillar-row-flip {
          grid-template-columns: 1fr; gap: 16px; padding: 24px 0; text-align: left;
        }
        .dp-pillar-row-flip .dp-pillar-num-wrap, .dp-pillar-row-flip .dp-pillar-text {
          order: initial; align-items: flex-start;
        }
      }
      .dp-pillar-num-wrap {
        display: flex; flex-direction: column; gap: 16px; align-items: flex-start;
      }
      .dp-pillar-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(64px, 7.4vw, 108px);
        color: var(--brand);
        letter-spacing: -0.04em;
        line-height: 0.85;
      }
      .dp-pillar-text { display: flex; flex-direction: column; gap: 10px; }
      .dp-pillar-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(22px, 2.6vw, 30px);
        letter-spacing: -0.02em;
        color: var(--ink);
        line-height: 1.18;
        margin: 0;
        text-wrap: balance;
      }
      .dp-pillar-b {
        font-family: var(--font-sans), sans-serif;
        font-size: 15.5px;
        line-height: 1.65;
        color: var(--ink-3);
        margin: 0;
        max-width: 60ch;
        text-align: left;
        text-wrap: pretty;
      }
      .dp-pillar-row-flip .dp-pillar-b { margin-left: auto; text-align: left; }
      .dp-pillars-rows { display: flex; flex-direction: column; gap: 36px; }
      .dp-pillar-row {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 48px;
        padding: 32px 0;
        border-top: 1px solid var(--line);
        align-items: start;
      }
      .dp-pillar-row-flip {
        grid-template-columns: 1fr 200px;
        text-align: right;
      }
      .dp-pillar-row-flip .dp-pillar-num-wrap { order: 2; align-items: flex-end; }
      .dp-pillar-row-flip .dp-pillar-text { order: 1; align-items: flex-end; }
      .dp-pillar-row-flip .dp-pillar-rule { transform: scaleX(-1); }
      @media (max-width: 720px) {
        .dp-pillar-row,
        .dp-pillar-row-flip { grid-template-columns: 1fr; gap: 16px; padding: 24px 0; text-align: left; }
        .dp-pillar-row-flip .dp-pillar-num-wrap, .dp-pillar-row-flip .dp-pillar-text { order: initial; align-items: flex-start; }
      }
      .dp-pillar-num-wrap {
        display: flex; flex-direction: column; gap: 16px; align-items: flex-start;
      }
      .dp-pillar-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(58px, 6.4vw, 92px);
        color: var(--brand);
        letter-spacing: -0.04em;
        line-height: 0.85;
      }
      .dp-pillar-rule {
        display: block;
        width: 64px; height: 2px;
        background: linear-gradient(90deg, var(--brand), transparent);
      }
      .dp-pillar-text { display: flex; flex-direction: column; gap: 10px; }
      .dp-pillar-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(22px, 2.6vw, 30px);
        letter-spacing: -0.02em;
        color: var(--ink); margin: 0;
        line-height: 1.18;
        text-wrap: balance;
      }
      .dp-pillar-b {
        font-size: 15.5px; line-height: 1.65;
        color: var(--ink-3); margin: 0;
        max-width: 60ch;
      }
      .dp-pillar-row-flip .dp-pillar-b { margin-left: auto; }
      .dp-pillar-foot {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.16em;
        color: var(--brand); font-weight: 600;
        padding-top: 4px; border-top: 1px dashed var(--line);
        align-self: stretch;
      }

      /* ─────────  PRODUCT — split with bullet list ───────── */
      .dp-product {
        position: relative;
        padding: 110px 0;
        background:
          radial-gradient(ellipse 800px 540px at 50% 50%, rgba(58, 90, 148, 0.32), transparent 65%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dp-product-bg { position: absolute; inset: 0; pointer-events: none; }
      .dp-product-glow {
        position: absolute; top: -10%; left: -10%; width: 600px; height: 540px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.32), transparent 65%);
        filter: blur(90px);
      }
      .dp-product > .dp-container { position: relative; z-index: 1; }
      .dp-product-grid {
        display: grid;
        grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .dp-product-grid { grid-template-columns: 1fr; gap: 36px; }
      }
      .dp-product-text { display: flex; flex-direction: column; gap: 16px; }
      .dp-product-body {
        font-size: 15.5px; line-height: 1.65;
        color: rgba(200, 215, 240, 0.78);
        margin: 8px 0 0;
      }
      .dp-product-points {
        list-style: none; padding: 0; margin: 18px 0 0;
        display: flex; flex-direction: column; gap: 10px;
      }
      .dp-product-points li {
        display: flex; align-items: flex-start; gap: 10px;
        font-size: 14px; color: rgba(200, 215, 240, 0.85);
      }
      .dp-product-points li span {
        color: #a0c4f0; font-weight: 700;
        margin-top: 2px;
      }
      .dp-product-frame {
        margin: 0;
        border-radius: 14px;
        background: #FFFFFF;
        border: 1px solid rgba(160, 196, 240, 0.18);
        overflow: hidden;
        box-shadow:
          0 60px 120px -36px rgba(0, 0, 0, 0.55),
          0 18px 38px -14px rgba(0, 0, 0, 0.32);
      }
      .dp-product-chrome {
        display: flex; align-items: center; gap: 7px;
        padding: 11px 16px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .dp-product-dot { width: 10px; height: 10px; border-radius: 50%; }
      .dp-product-dot-r { background: #E8816D; }
      .dp-product-dot-y { background: #E8C66D; }
      .dp-product-dot-g { background: #88C08A; }
      .dp-product-img { display: block; width: 100%; height: auto; }

      /* ─────────  FEATURES — interactive blue layered architecture ───────── */
      .dp-features {
        position: relative;
        padding: 110px 0 90px;
        background:
          radial-gradient(ellipse 900px 520px at 20% 30%, rgba(58, 90, 148, 0.32), transparent 60%),
          radial-gradient(ellipse 720px 460px at 85% 70%, rgba(42, 68, 119, 0.38), transparent 60%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .dp-features-head {
        max-width: 720px;
        margin: 0 auto 56px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .dp-features .dp-eyebrow { color: #a0c4f0; }
      .dp-features .dp-h2 { color: #FFFFFF; }
      .dp-features .dp-h2-em {
        color: #a0c4f0;
        font-style: italic;
        font-family: var(--font-display), sans-serif;
        font-weight: 400;
      }
      .dp-features .dp-h2-sub { color: rgba(220, 232, 250, 0.85); }
      /* Single unified card container with 6 internal layers */
      .dp-features-card {
        position: relative;
        margin: 0 auto;
        max-width: 980px;
        border-radius: 22px;
        overflow: hidden;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(120, 160, 220, 0.2) 0%, transparent 55%),
          radial-gradient(ellipse at 100% 100%, rgba(90, 127, 181, 0.18) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.78) 0%, rgba(30, 46, 82, 0.92) 70%, rgba(15, 23, 41, 0.95) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.1) inset,
          0 0 0 1px rgba(120, 160, 220, 0.1) inset,
          0 40px 90px -32px rgba(0, 0, 0, 0.55),
          0 18px 40px -16px rgba(42, 68, 119, 0.38);
        backdrop-filter: blur(14px) saturate(1.2);
        -webkit-backdrop-filter: blur(14px) saturate(1.2);
      }
      .dp-features-card::before {
        /* decorative top rule */
        content: "";
        position: absolute;
        top: 0; left: 28px; right: 28px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(160, 196, 240, 0.32), transparent);
        pointer-events: none;
      }

      /* Individual layer (row inside the unified card) */
      .dp-feature-layer {
        position: relative;
        color: #FFFFFF;
        cursor: pointer;
        border-top: 1px solid rgba(160, 196, 240, 0.1);
        transition: background 0.45s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dp-feature-layer:first-child { border-top: none; }
      .dp-feature-layer::before {
        /* sky-blue left bar animated in on hover */
        content: "";
        position: absolute;
        left: 0; top: 8px; bottom: 8px;
        width: 3px;
        background: linear-gradient(180deg, #a0c4f0, rgba(160, 196, 240, 0.2));
        transform: scaleY(0);
        transform-origin: center;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dp-feature-layer:hover,
      .dp-feature-layer:focus-within {
        background: linear-gradient(90deg, rgba(160, 196, 240, 0.08) 0%, rgba(42, 68, 119, 0.16) 100%);
      }
      .dp-feature-layer:hover::before,
      .dp-feature-layer:focus-within::before {
        transform: scaleY(1);
      }
      .dp-feature-layer-head {
        display: grid;
        grid-template-columns: 58px 1fr 28px;
        gap: 20px;
        align-items: center;
        padding: 22px 28px;
      }
      @media (max-width: 720px) {
        .dp-features-card .dp-feature-layer-head,
        .dp-feature-layer-head { grid-template-columns: 40px minmax(0, 1fr) 24px !important; gap: 10px !important; padding: 16px 14px !important; }
        .dp-features-card .dp-feature-h,
        .dp-feature-h { font-size: 15px !important; line-height: 1.3 !important; letter-spacing: -0.01em; word-break: normal; overflow-wrap: anywhere; hyphens: none; min-width: 0; }
        .dp-features-card .dp-feature-icon,
        .dp-feature-icon { width: 40px !important; height: 40px !important; border-radius: 50% !important; aspect-ratio: 1 / 1; flex-shrink: 0; }
        .dp-features-card .dp-feature-icon svg,
        .dp-feature-icon svg { width: 20px !important; height: 20px !important; }
        .dp-features-card .dp-feature-chevron,
        .dp-feature-chevron { width: 24px !important; height: 24px !important; aspect-ratio: 1 / 1; flex-shrink: 0; }
        .dp-features-card .dp-feature-chevron svg,
        .dp-feature-chevron svg { width: 12px; height: 12px; }
      }
      .dp-feature-id {
        font-family: var(--font-mono), monospace;
        font-weight: 700;
        font-size: 20px;
        color: #a0c4f0;
        letter-spacing: -0.005em;
        line-height: 1;
      }
      .dp-feature-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 46px; height: 46px;
        border-radius: 12px;
        background: linear-gradient(155deg, rgba(160, 196, 240, 0.2) 0%, rgba(90, 127, 181, 0.3) 100%);
        border: 1px solid rgba(160, 196, 240, 0.28);
        color: #a0c4f0;
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), background 0.45s, color 0.45s, border-color 0.45s;
      }
      .dp-feature-layer:hover .dp-feature-icon,
      .dp-feature-layer:focus-within .dp-feature-icon {
        transform: scale(1.08) rotate(-4deg);
        background: linear-gradient(155deg, #a0c4f0 0%, #5A7FB5 100%);
        color: var(--navy-deep);
        border-color: #a0c4f0;
      }
      .dp-feature-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: -0.015em;
        color: #FFFFFF;
        line-height: 1.25;
        margin: 0;
        text-align: left;
      }
      .dp-feature-chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px; height: 28px;
        border-radius: 50%;
        background: rgba(160, 196, 240, 0.12);
        color: #a0c4f0;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), background 0.5s, color 0.5s;
      }
      .dp-feature-layer:hover .dp-feature-chevron,
      .dp-feature-layer:focus-within .dp-feature-chevron {
        background: #a0c4f0;
        color: var(--navy-deep);
        transform: rotate(180deg);
      }
      .dp-feature-layer-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .dp-feature-layer:hover .dp-feature-layer-body,
      .dp-feature-layer:focus-within .dp-feature-layer-body {
        max-height: 240px;
      }
      .dp-feature-b {
        font-family: var(--font-sans), sans-serif;
        font-size: 15px;
        line-height: 1.7;
        color: rgba(220, 232, 250, 0.88);
        margin: 0;
        padding: 0 28px 26px 148px;
        text-align: left;
        text-wrap: pretty;
      }
      @media (max-width: 720px) {
        .dp-features { padding: 80px 0 96px; }
        .dp-feature-layer-head { grid-template-columns: 40px 42px 1fr 24px; gap: 12px; padding: 18px 20px; }
        .dp-feature-icon { width: 40px; height: 40px; }
        .dp-feature-icon svg { width: 20px; height: 20px; }
        .dp-feature-b { padding: 0 20px 22px 94px; font-size: 14px; }
        .dp-feature-id { font-size: 17px; }
        .dp-feature-h { font-size: 16.5px; }
      }

      /* ─────────  OUTCOME — pull quote band ───────── */
      .dp-outcome {
        padding: 100px 0;
        border-top: 1px solid var(--line);
        background: var(--bg-2);
      }
      .dp-quote {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        font-size: clamp(26px, 3.4vw, 42px);
        line-height: 1.35;
        color: var(--ink);
        max-width: 880px;
        margin: 0 auto;
        text-align: center;
        position: relative;
      }
      .dp-quote-mark {
        font-family: var(--font-serif), serif;
        font-size: 1.6em;
        color: var(--brand);
        line-height: 0;
        margin-right: 8px;
        vertical-align: -0.2em;
      }
      .dp-quote-foot {
        margin-top: 24px;
        display: flex; flex-direction: column; gap: 2px;
        align-items: center;
      }
      .dp-quote-author {
        font-family: var(--font-display), sans-serif;
        font-style: normal; font-weight: 600;
        font-size: 14px; color: var(--ink);
        letter-spacing: -0.01em;
      }
      .dp-quote-org {
        font-family: var(--font-mono), monospace;
        font-style: normal;
        font-size: 11px; letter-spacing: 0.16em;
        color: var(--ink-4); text-transform: uppercase;
      }

      /* ─────────  NEXT — three-link continuation ───────── */
      .dp-next { padding: 110px 0; }
      .dp-next-head { max-width: 720px; margin: 0 0 56px; display: flex; flex-direction: column; gap: 14px; }
      .dp-next-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
      }
      @media (max-width: 900px) { .dp-next-grid { grid-template-columns: 1fr; } }
      .dp-next-card {
        display: flex; flex-direction: column; gap: 10px;
        padding: 26px 26px 30px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 14px;
        text-decoration: none; color: var(--ink);
        transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s;
      }
      .dp-next-card:hover {
        transform: translateY(-4px);
        border-color: var(--brand);
        box-shadow: 0 24px 50px -24px rgba(42, 68, 119, 0.22);
      }
      .dp-next-card-cleanai {
        background: linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 65%, var(--navy) 100%);
        color: #FFFFFF;
        border-color: rgba(160, 196, 240, 0.22);
      }
      .dp-next-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.22em;
        color: var(--brand); font-weight: 700;
      }
      .dp-next-card-cleanai .dp-next-tag { color: #a0c4f0; }
      .dp-next-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 19px;
        letter-spacing: -0.018em; color: var(--ink);
        line-height: 1.2; margin: 4px 0 0;
      }
      .dp-next-card-cleanai .dp-next-h { color: #FFFFFF; }
      .dp-next-b {
        font-size: 13.5px; line-height: 1.55;
        color: var(--ink-3);
      }
      .dp-next-card-cleanai .dp-next-b { color: rgba(200, 215, 240, 0.8); }

      /* ─────────  FINAL CTA (matches landing) ───────── */
      .dp-cta-final { padding: 80px 0 100px; background: var(--bg); }
      .dp-cta-card {
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
      .dp-cta-rings {
        position: absolute; top: 50%; right: -5%;
        transform: translateY(-50%);
        width: 340px; height: 340px;
        z-index: 1; pointer-events: none;
      }
      .dp-cta-ring {
        position: absolute; top: 50%; left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      .dp-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: dp-ripple 3s ease-in-out infinite; }
      .dp-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: dp-ripple 3s ease-in-out infinite 0.4s; }
      .dp-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: dp-ripple 3s ease-in-out infinite 0.8s; }
      .dp-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: dp-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes dp-ripple {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; }
      }
      @keyframes dp-ripple-core {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
      }
      @media (prefers-reduced-motion: reduce) {
        .dp-cta-ring { animation: none !important; }
      }
      .dp-cta-content {
        position: relative; z-index: 2;
        display: flex; flex-direction: column;
        gap: 6px; max-width: 480px;
      }
      .dp-cta-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: clamp(26px, 3vw, 36px);
        line-height: 1.12; letter-spacing: -0.02em;
        margin: 0; color: #FFFFFF;
      }
      .dp-cta-em {
        font-style: italic;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
      }
      .dp-cta-sub {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        margin: 6px 0 18px;
        line-height: 1.5;
        max-width: 40ch;
      }
      .dp-cta-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 13px 22px; border-radius: 999px;
        background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600;
        text-decoration: none; align-self: flex-start; white-space: nowrap;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .dp-cta-pill:hover {
        background: #FAFAF5;
        transform: translateY(-2px);
        box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4);
      }
      .dp-cta-pill-arrow {
        display: inline-flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border-radius: 50%;
        background: var(--brand); color: #FFFFFF; font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .dp-cta-pill:hover .dp-cta-pill-arrow {
        background: var(--navy-cta);
        transform: translateX(2px);
      }

      /* ─────────  FOOTER (navy + stencil watermark) ───────── */
      .dp-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden;
      }
      .dp-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%); width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .dp-footer > .dp-container { position: relative; z-index: 1; }
      .dp-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .dp-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .dp-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      /* ─── RELATED (style 1 · editorial numbered index) ─── */
      .dp-related { padding: 120px 0 60px; background: var(--bg); }
      .dp-related-head { max-width: 720px; margin: 0 0 48px; display: flex; flex-direction: column; gap: 14px; }
      .dp-related-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; border-top: 1px solid var(--line); }
      .dp-related-row { position: relative; border-bottom: 1px solid var(--line); }
      .dp-related-link {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 48px;
        gap: 28px;
        align-items: center;
        padding: 28px 8px;
        text-decoration: none;
        color: var(--ink);
        transition: padding 0.45s cubic-bezier(0.19, 1, 0.22, 1), background 0.45s;
      }
      .dp-related-link:hover { padding-left: 24px; background: linear-gradient(90deg, rgba(42, 68, 119, 0.06), transparent 65%); }
      .dp-related-link:hover .dp-related-name { color: var(--brand); }
      .dp-related-link:hover .dp-related-arrow { color: var(--brand); transform: translateX(6px); }
      .dp-related-n {
        font-family: var(--font-display), sans-serif;
        font-style: italic; font-weight: 400;
        font-size: 58px; letter-spacing: -0.03em;
        color: var(--brand);
        line-height: 0.9;
      }
      .dp-related-copy { display: flex; flex-direction: column; gap: 6px; }
      .dp-related-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 26px;
        letter-spacing: -0.02em; line-height: 1.15;
        color: var(--ink);
        margin: 0;
        transition: color 0.4s;
      }
      .dp-related-blurb {
        font-size: 14.5px; line-height: 1.6;
        color: var(--ink-3); margin: 0;
        max-width: 64ch;
      }
      .dp-related-arrow {
        display: inline-flex; align-items: center; justify-content: flex-end;
        color: var(--ink-4);
        transition: color 0.4s, transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
      }
      @media (max-width: 720px) {
        .dp-related-link { grid-template-columns: minmax(0, 1fr); gap: 10px; padding: 22px 4px; }
        .dp-related-name { font-size: 20px; }
        .dp-related-arrow { display: none; }
      }

      .dp-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .dp-footer-brand-logo { display: inline-flex; width: 40px; height: 40px; }
      .dp-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .dp-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .dp-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .dp-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .dp-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .dp-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .dp-foot-h {
        font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700; margin-bottom: 18px;
        text-transform: uppercase;
      }
      .dp-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .dp-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .dp-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .dp-footer-watermark {
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
      .dp-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .dp-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .dp-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .dp-footer { padding: 72px 0 0; margin-top: 60px; }
        .dp-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
        .dp-footer-watermark { margin: 28px 0 0; }
      }

      /* ─────── MOBILE OVERRIDES ─────── */
      @media (max-width: 900px) {
        .dp-nav-inner { padding: 14px 22px; }
        .dp-nav-links { gap: 18px; font-size: 13.5px; }
        .dp-logo-tag { display: none; }
        .dp-hero { padding: 130px 0 60px; }
        .dp-hero-grid-content { gap: 36px; }
        .dp-live { padding: 70px 0 50px; }
        .dp-stats { padding: 56px 0; }
        .dp-pillars { padding: 70px 0 60px; }
        .dp-product { padding: 70px 0; }
        .dp-features { padding: 70px 0 50px; }
        .dp-outcome { padding: 64px 0; }
        .dp-next { padding: 64px 0; }
      }
      @media (max-width: 640px) {
        .dp-hero { padding: 110px 0 48px; }
        .dp-h1 { font-size: clamp(46px, 11vw, 70px); }
        .dp-hero-rail { margin-bottom: 32px; gap: 14px; font-size: 10px; }
        .dp-hero-stats { padding: 14px 16px; gap: 12px; }
        .dp-hero-stat b { font-size: 19px; }
        .dp-hero-actions { gap: 10px; }
        .dp-cta-primary { padding: 12px 18px; font-size: 13.5px; }
        .dp-cta-ghost { padding: 12px 14px; font-size: 11px; }
        .dp-pillar-num { font-size: 60px; }
        .dp-quote { font-size: 22px; }
        .dp-feature-row { padding: 22px 0; }
        .dp-footer-inner { flex-direction: column; align-items: flex-start; }
      }
    `}</style>
  )
}
