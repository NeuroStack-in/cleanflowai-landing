"use client"

/**
 * Data Security — bespoke page.
 *   - Hero: security-perimeter animation LEFT, hero text RIGHT
 *   - No quote banner, no "in the platform" product image, no outcome testimonial
 *   - Three pillars (identity / approvals / CleanDataShield)
 *   - Redesigned primitives grid with enforcement state chips
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
    key: "identity",
    h: "You always know who did what",
    b: "Every action is tied to a real person — never a shared key, never a guess. When auditors or your CISO ask the question, the answer is one click away.",
  },
  {
    key: "approval",
    h: "Sensitive changes wait for sign-off",
    b: "The moves that matter most don't happen on impulse. Your team approves them, with the context to decide quickly — and nothing slips through outside the process.",
  },
  {
    key: "shield",
    h: "No surprises in production",
    b: "Only the safeguards your team has approved ever run against live data. No ad-hoc scripts, no rogue logic, no quiet workarounds — predictability by design.",
  },
]

const PRIMITIVES = [
  {
    key: "mfa",
    state: "ENFORCED",
    h: "Sign-in your security team approves",
    b: "Strong identity from the start, with extra factors available where your governance calls for them. The right people in, the wrong people out.",
  },
  {
    key: "approval",
    state: "AUDITED",
    h: "Approvals on every meaningful change",
    b: "The moves that affect production wait for the right reviewer — captured, attributed, and easy to replay when someone asks why.",
  },
  {
    key: "url",
    state: "ENFORCED",
    h: "Access scoped to the moment",
    b: "Files and artefacts are reachable only by the right person, only when they need them — and never beyond the window your team intended.",
  },
  {
    key: "shield",
    state: "VERIFIED",
    h: "Predictable execution, always",
    b: "Only what your team has approved ever runs. No surprise scripts, no inline workarounds — just the behaviour you signed off on.",
  },
  {
    key: "log",
    state: "IMMUTABLE",
    h: "A clear record of everything",
    b: "Every change, edit, and approval is captured with the full picture — so investigations take minutes, not days.",
  },
  {
    key: "compliance",
    state: "IN PROGRESS",
    h: "Built for the standards you face",
    b: "Designed with the controls your auditors expect — so security posture is a strength, not a scramble.",
  },
]

export default function DataSecurityPage() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 20 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} ds-root`}>
      {/* Nav */}
      <SiteNav />

      <main className="ds-main">
        {/* ───── HERO — perimeter animation LEFT, text RIGHT ───── */}
        <section className="ds-hero">
          <div className="ds-hero-bg" aria-hidden>
            <div className="ds-hero-grid" />
            <div className="ds-hero-glow-a" />
            <div className="ds-hero-glow-b" />
          </div>
          <div className="ds-container">
            <div className="ds-hero-grid-content">
              <motion.div
                className="ds-hero-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
              >
                <PerimeterShield />
              </motion.div>
              <div className="ds-hero-text">
                <motion.span className="ds-eyebrow ds-eyebrow-light" {...rise(0.05)}>DATA SECURITY</motion.span>
                <motion.h1 className="ds-h1" {...rise(0.12)}>
                  <span className="ds-h1-line">Every action authorized.</span>
                  <span className="ds-h1-em">Every fix logged.</span>
                </motion.h1>
                <motion.p className="ds-lede" {...rise(0.28)}>
                  Every action is tied to a real person. Every meaningful change waits
                  for sign-off. Every move is recorded — clearly, completely, and ready
                  for the auditor's next question. Security and compliance stop being a
                  scramble and start being a strength.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── PILLARS — 3 posture statements ───── */}
        <section className="ds-pillars">
          <div className="ds-container">
            <motion.div className="ds-section-head" {...rise(0.05)}>
              <span className="ds-eyebrow">WHAT YOUR TEAM GETS</span>
              <h2 className="ds-h2">
                Trust your team can stand behind,<br />
                <span className="ds-h2-em">not just claim.</span>
              </h2>
            </motion.div>
            <div className="ds-pillars-row">
              {PILLARS.map((p, i) => (
                <motion.article
                  key={p.key}
                  className="ds-pillar"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="ds-pillar-icon" aria-hidden>
                    <PillarIcon name={p.key} />
                  </div>
                  <h3 className="ds-pillar-h">{p.h}</h3>
                  <p className="ds-pillar-b">{p.b}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── PRIMITIVES — redesigned enforcement board ───── */}
        <section className="ds-primitives">
          <div className="ds-primitives-bg" aria-hidden>
            <div className="ds-primitives-grid" />
            <div className="ds-primitives-glow" />
          </div>
          <div className="ds-container">
            <motion.div className="ds-section-head ds-section-head-light" {...rise(0.05)}>
              <span className="ds-eyebrow ds-eyebrow-light">VALUE YOU UNLOCK</span>
              <h2 className="ds-h2 ds-h2-light">
                Six wins your security team<br />
                <span className="ds-h2-em-light">will quickly come to rely on.</span>
              </h2>
            </motion.div>
            <div className="ds-primitives-grid-wrap">
              {PRIMITIVES.map((p, i) => (
                <motion.article
                  key={p.key}
                  className="ds-prim-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: 0.06 + i * 0.07, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <div className="ds-prim-head">
                    <div className="ds-prim-icon" aria-hidden>
                      <PrimitiveIcon name={p.key} />
                    </div>
                  </div>
                  <h3 className="ds-prim-h">{p.h}</h3>
                  <p className="ds-prim-b">{p.b}</p>
                  <span className="ds-prim-bracket ds-prim-bracket-tl" aria-hidden />
                  <span className="ds-prim-bracket ds-prim-bracket-tr" aria-hidden />
                  <span className="ds-prim-bracket ds-prim-bracket-bl" aria-hidden />
                  <span className="ds-prim-bracket ds-prim-bracket-br" aria-hidden />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ───── RELATED — dossier rows with classification marks ───── */}
        <section className="ds-related">
          <div className="ds-container">
            <motion.div className="ds-related-head" {...rise(0.05)}>
              <span className="ds-eyebrow">EXPLORE MORE</span>
              <h2 className="ds-h2">
                The rest of the platform,<br />
                <span className="ds-h2-em">working in your favor.</span>
              </h2>
            </motion.div>
            <ul className="ds-related-list">
              {["modernization", "migration", "transformation"]
                .map(slug => SOLUTIONS.find(s => s.slug === slug)!)
                .map((s, i) => (
                <motion.li
                  key={s.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.19, 1, 0.22, 1] as number[] }}
                >
                  <Link href={`/capabilities/${s.slug}`} className="ds-related-row">
                    <div className="ds-related-title-wrap">
                      <h3 className="ds-related-h">{s.name}</h3>
                    </div>
                    <p className="ds-related-b">{s.blurb}</p>
                    <span className="ds-related-open" aria-hidden>
                      <svg viewBox="0 0 24 12" width="28" height="14" fill="none">
                        <path d="M0 6 H 22 M 16 1 L 22 6 L 16 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

/* ═══════════════════════════════════════════════════════════════
   HERO ANIMATION — Shield centered, security primitives on orbit
   ═══════════════════════════════════════════════════════════════ */

function PerimeterShield() {
  return (
    <figure className="ds-anim" aria-label="CleanFlowAI security shield">
      <svg viewBox="0 0 440 440" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="ds-shield-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#3A5A94" />
            <stop offset="55%" stopColor="#1E3056" />
            <stop offset="100%" stopColor="#0F1A29" />
          </linearGradient>
          <linearGradient id="ds-lock-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#C5D9F2" />
            <stop offset="100%" stopColor="#7FA0C9" />
          </linearGradient>
          <radialGradient id="ds-halo-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"  stopColor="rgba(160, 196, 240, 0.28)" />
            <stop offset="75%" stopColor="rgba(160, 196, 240, 0.0)" />
          </radialGradient>
          <filter id="ds-shield-shadow" x="-30%" y="-20%" width="160%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
            <feOffset dy="16" result="off" />
            <feFlood floodColor="#0A1328" floodOpacity="0.55" />
            <feComposite in2="off" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background halo */}
        <rect x="60" y="60" width="320" height="320" rx="160" fill="url(#ds-halo-grad)" className="ds-anim-halo" />

        {/* Concentric perimeter rings (pulsing) */}
        <circle cx="220" cy="220" r="148" fill="none" stroke="rgba(160, 196, 240, 0.75)" strokeWidth="1.4" strokeDasharray="4 6" className="ds-anim-ring ds-anim-ring-1" />
        <circle cx="220" cy="220" r="118" fill="none" stroke="rgba(160, 196, 240, 0.72)" strokeWidth="1.6" strokeDasharray="2 4" className="ds-anim-ring ds-anim-ring-2" />
        <circle cx="220" cy="220" r="92"  fill="none" stroke="rgba(160, 196, 240, 0.6)"  strokeWidth="1.3" className="ds-anim-ring ds-anim-ring-3" />

        {/* Rotating scan arc */}
        <g className="ds-anim-scan-wrap">
          <g className="ds-anim-scan">
            <path d="M 220 72 A 148 148 0 0 1 356 182" fill="none" stroke="rgba(160, 196, 240, 0.9)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="356" cy="182" r="4" fill="#a0c4f0" />
          </g>
        </g>

        {/* Central shield */}
        <g filter="url(#ds-shield-shadow)" className="ds-anim-shield">
          <path
            d="M 220 108 L 298 136 V 208 C 298 256 266 286 220 300 C 174 286 142 256 142 208 V 136 Z"
            fill="url(#ds-shield-grad)"
            stroke="rgba(160, 196, 240, 0.38)"
            strokeWidth="1.4"
          />
          {/* Inner bevel */}
          <path
            d="M 220 124 L 284 148 V 208 C 284 246 258 272 220 284 C 182 272 156 246 156 208 V 148 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          {/* Padlock body */}
          <rect x="198" y="198" width="44" height="42" rx="5" fill="url(#ds-lock-grad)" />
          {/* Padlock shackle */}
          <path d="M 205 198 V 182 A 15 15 0 0 1 235 182 V 198" fill="none" stroke="url(#ds-lock-grad)" strokeWidth="5" strokeLinecap="round" />
          {/* Keyhole */}
          <circle cx="220" cy="214" r="3.6" fill="#0F1A29" />
          <rect x="218.4" y="215" width="3.2" height="10" rx="1" fill="#0F1A29" />
        </g>
      </svg>
    </figure>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ICON SETS
   ═══════════════════════════════════════════════════════════════ */

function PillarIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "identity":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...P} aria-hidden>
          <circle cx="24" cy="18" r="8" />
          <path d="M 8 40 C 10 30 18 28 24 28 C 30 28 38 30 40 40" />
          <circle cx="24" cy="24" r="22" strokeDasharray="2 3" strokeOpacity="0.4" />
        </svg>
      )
    case "approval":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...P} aria-hidden>
          <rect x="10" y="8"  width="28" height="32" rx="2" />
          <path d="M 15 18 H 33 M 15 24 H 33 M 15 30 H 27" />
          <path d="M 30 32 L 34 36 L 42 27" strokeWidth="2.2" />
        </svg>
      )
    case "shield":
      return (
        <svg viewBox="0 0 48 48" width="44" height="44" {...P} aria-hidden>
          <path d="M 24 5 L 40 11 V 22 C 40 32 33 40 24 43 C 15 40 8 32 8 22 V 11 Z" />
          <path d="M 17 23 L 22 28 L 31 18" strokeWidth="2.2" />
        </svg>
      )
    default:
      return null
  }
}

function PrimitiveIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "mfa":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <rect x="9" y="13" width="14" height="11" rx="1.5" />
          <path d="M 12 13 V 9 A 4 4 0 0 1 20 9 V 13" />
          <circle cx="16" cy="18" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      )
    case "approval":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <rect x="5" y="5" width="22" height="22" rx="2" />
          <path d="M 9 12 L 13 16 L 24 9" strokeWidth="1.8" />
          <path d="M 9 19 H 23 M 9 23 H 18" />
        </svg>
      )
    case "url":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <path d="M 13 19 L 19 13" />
          <path d="M 10 22 A 5 5 0 0 1 10 14 L 14 10" />
          <path d="M 22 10 A 5 5 0 0 1 22 18 L 18 22" />
          <circle cx="16" cy="16" r="11" strokeDasharray="2 3" strokeOpacity="0.4" />
        </svg>
      )
    case "shield":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <path d="M 16 4 L 26 8 V 16 C 26 22 22 27 16 29 C 10 27 6 22 6 16 V 8 Z" />
          <path d="M 11 17 L 15 21 L 22 13" strokeWidth="1.9" />
        </svg>
      )
    case "log":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <rect x="6" y="5" width="20" height="22" rx="2" />
          <path d="M 10 11 H 22 M 10 16 H 22 M 10 21 H 18" />
          <path d="M 22 21 L 26 25" strokeWidth="1.7" />
          <circle cx="26" cy="25" r="1.8" fill="currentColor" stroke="none" />
        </svg>
      )
    case "compliance":
      return (
        <svg viewBox="0 0 32 32" width="22" height="22" {...P} aria-hidden>
          <path d="M 16 4 L 28 8 V 17 C 28 23 22 28 16 29 C 10 28 4 23 4 17 V 8 Z" />
          <circle cx="16" cy="17" r="5" />
          <path d="M 16 14 V 20 M 13 17 H 19" strokeWidth="1.4" />
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

      .ds-root {
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
        --amber:      #E8B26D;
        --green:      #7EC28A;

        background: var(--bg);
        color: var(--ink);
        font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      .ds-root * { box-sizing: border-box; }
      /* PERF: skip paint + animations for off-screen sections (hero always renders) */
      .ds-main > section:nth-of-type(n+2) { content-visibility: auto; contain-intrinsic-size: 1px 800px; }

      .ds-container { max-width: 1240px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .ds-container { padding: 0 22px; } }

      /* ═══ NAV ═══ */
      .ds-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 40; transition: background 0.4s, border-color 0.4s, box-shadow 0.4s; background: rgba(14, 26, 48, 0.55); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); border-bottom: 1px solid transparent; }
      .ds-nav-solid { background: rgba(10, 18, 36, 0.92); border-bottom-color: rgba(160, 196, 240, 0.14); box-shadow: 0 1px 10px -2px rgba(0, 0, 0, 0.3); }
      .ds-nav-inner { max-width: 1280px; margin: 0 auto; padding: 16px 36px; display: flex; align-items: center; justify-content: space-between; }
      .ds-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .ds-logo-wrap img { width: 38px; height: 38px; }
      .ds-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .ds-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; color: #FFFFFF; }
      .ds-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: rgba(200, 215, 240, 0.7); text-transform: uppercase; margin-top: 2px; }
      .ds-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .ds-nav-links > a { color: rgba(220, 232, 250, 0.82); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .ds-nav-links > a:hover { color: #FFFFFF; }
      .ds-nav-cta { padding: 10px 18px; background: #FFFFFF; color: var(--brand) !important; border-radius: 999px; font-weight: 600; font-size: 13.5px; transition: transform 0.25s, background 0.25s; }
      .ds-nav-cta:hover { background: var(--sky); transform: translateY(-1px); }
      .ds-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .ds-nav-dd-trigger { display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none; padding: 0; font: inherit; font-size: 14px; font-weight: 450; cursor: pointer; color: rgba(220, 232, 250, 0.82); transition: color 0.25s; }
      .ds-nav-dd-trigger:hover { color: #FFFFFF; }
      .ds-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .ds-nav-dd-caret-open { transform: rotate(180deg); }
      .ds-nav-dd-menu { position: absolute; top: calc(100% - 2px); left: 50%; transform: translateX(-50%) translateY(-6px); width: min(900px, calc(100vw - 32px)); opacity: 0; visibility: hidden; transition: opacity 0.28s, transform 0.28s, visibility 0s 0.28s; z-index: 60; }
      .ds-nav-dd-menu-open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); transition: opacity 0.35s, transform 0.35s, visibility 0s; }
      .ds-nav-dd-inner-menu { margin-top: 14px; background: #FFFFFF; border: 1px solid var(--line); border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px -20px rgba(15, 23, 41, 0.4); }
      .ds-nav-dd-head { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px; }
      .ds-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .ds-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .ds-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .ds-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .ds-nav-dd-item { display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink); transition: background 0.25s; }
      .ds-nav-dd-item:hover { background: var(--bg-2); }
      .ds-nav-dd-item-active { background: var(--bg-2); }
      .ds-nav-dd-item-active .ds-nav-dd-item-name { color: var(--brand); }
      .ds-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; color: var(--ink); }
      .ds-nav-dd-item-blurb { font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .ds-nav-dd-feature { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 12px; text-decoration: none; color: #FFFFFF; background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%), linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%); border: 1px solid rgba(160, 196, 240, 0.22); }
      .ds-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .ds-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .ds-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .ds-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--sky); font-weight: 700; }
      .ds-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; color: #FFFFFF; margin: 4px 0 0; }
      .ds-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .ds-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }

      /* ═══ HERO ═══ */
      .ds-hero {
        position: relative;
        padding: 180px 0 130px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 600px at 15% 30%, rgba(90, 127, 181, 0.36), transparent 60%),
          radial-gradient(ellipse 700px 500px at 88% 72%, rgba(160, 196, 240, 0.18), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, #121D35 55%, var(--navy) 100%);
        color: #FFFFFF;
      }
      .ds-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .ds-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.06) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 85%);
      }
      .ds-hero-glow-a { position: absolute; top: 10%; left: -10%; width: 560px; height: 560px; background: radial-gradient(circle, rgba(160, 196, 240, 0.22), transparent 62%); filter: blur(80px); }
      .ds-hero-glow-b { position: absolute; bottom: -10%; right: -6%; width: 520px; height: 520px; background: radial-gradient(circle, rgba(58, 90, 148, 0.4), transparent 62%); filter: blur(90px); }
      .ds-hero > .ds-container { position: relative; z-index: 1; }
      .ds-hero-grid-content {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.95fr);
        gap: 56px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .ds-hero-grid-content { grid-template-columns: 1fr; gap: 48px; }
      }
      .ds-hero-visual { display: flex; align-items: center; justify-content: center; }
      .ds-hero-text { display: flex; flex-direction: column; gap: 22px; }
      .ds-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.24em;
        color: var(--brand); font-weight: 700;
      }
      .ds-eyebrow-light { color: var(--sky); }
      .ds-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(38px, 4.6vw, 58px);
        line-height: 1.08;
        letter-spacing: -0.028em;
        color: #FFFFFF;
        margin: 0;
        display: flex; flex-direction: column; gap: 4px;
      }
      .ds-h1-line { display: block; white-space: nowrap; }
      .ds-h1-em { white-space: nowrap; }
      @media (max-width: 520px) { .ds-h1-line, .ds-h1-em { white-space: normal; } }
      .ds-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--sky);
        font-size: 1.05em;
        letter-spacing: -0.012em;
      }
      .ds-lede {
        font-size: 16.5px; line-height: 1.72;
        color: rgba(220, 232, 250, 0.82); margin: 0;
        max-width: 58ch;
      }

      /* ═══ PERIMETER SHIELD ANIMATION ═══ */
      .ds-anim {
        margin: 0;
        position: relative;
        width: 100%;
        max-width: 640px;
      }
      .ds-anim svg { width: 100%; height: auto; overflow: visible; }
      .ds-anim-halo { animation: ds-halo-pulse 6s ease-in-out infinite; transform-origin: center; }
      @keyframes ds-halo-pulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }

      .ds-anim-ring { transform-origin: 220px 220px; opacity: 0; animation: ds-ring-in 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
      .ds-anim-ring-1 { animation-delay: 0.2s; }
      .ds-anim-ring-2 { animation-delay: 0.3s; animation-name: ds-ring-in, ds-ring-rot; animation-duration: 0.7s, 28s; animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1), linear; animation-fill-mode: forwards, none; animation-iteration-count: 1, infinite; }
      .ds-anim-ring-3 { animation-delay: 0.4s; }
      @keyframes ds-ring-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      @keyframes ds-ring-rot { to { transform: rotate(360deg); } }

      .ds-anim-scan-wrap { transform-origin: 220px 220px; animation: ds-scan-rot 7s linear infinite; }
      .ds-anim-scan path { filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.75)); }
      @keyframes ds-scan-rot { to { transform: rotate(360deg); } }

      .ds-anim-shield {
        opacity: 0;
        transform-origin: 220px 220px;
        animation: ds-shield-in 0.9s cubic-bezier(0.19, 1, 0.22, 1) 0.25s forwards;
      }
      @keyframes ds-shield-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

      @media (prefers-reduced-motion: reduce) {
        .ds-anim-halo, .ds-anim-ring, .ds-anim-scan-wrap, .ds-anim-shield {
          animation: none !important; opacity: 1; transform: none;
        }
      }

      /* ═══ SHARED SECTION HEADS ═══ */
      .ds-section-head {
        max-width: 780px;
        margin: 0 auto 72px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center; align-items: center;
      }
      .ds-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(32px, 4.4vw, 54px);
        line-height: 1.06;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .ds-h2-light { color: #FFFFFF; }
      .ds-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 400;
        color: var(--brand);
        font-size: 1.04em;
      }
      .ds-h2-em-light { font-family: var(--font-display), sans-serif; font-style: italic; font-weight: 400; color: var(--sky); font-size: 1.04em; }

      /* ═══ PILLARS — 3 horizontal cards ═══ */
      .ds-pillars { padding: 130px 0 140px; background: var(--bg); position: relative; }
      .ds-pillars::before {
        content: "";
        position: absolute; top: 0; left: 50%; transform: translateX(-50%);
        width: 80%; height: 1px;
        background: linear-gradient(90deg, transparent, var(--line-2), transparent);
      }
      .ds-pillars-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      @media (max-width: 900px) { .ds-pillars-row { grid-template-columns: 1fr; } }
      .ds-pillar {
        position: relative;
        padding: 40px 36px 36px;
        border-radius: 20px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 22px 46px -24px rgba(42, 68, 119, 0.2);
        display: flex; flex-direction: column; gap: 14px;
        overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s, border-color 0.5s;
      }
      .ds-pillar:hover {
        transform: translateY(-5px);
        border-color: rgba(42, 68, 119, 0.28);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.95) inset, 0 38px 80px -30px rgba(42, 68, 119, 0.32);
      }
      .ds-pillar-icon {
        width: 64px; height: 64px;
        border-radius: 16px;
        display: inline-flex; align-items: center; justify-content: center;
        background: linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        color: var(--sky);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.16) inset, 0 12px 26px -10px rgba(42, 68, 119, 0.5);
        margin-bottom: 6px;
      }
      .ds-pillar-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: -0.018em;
        color: var(--ink);
        line-height: 1.22;
        margin: 0;
      }
      .ds-pillar-b {
        font-size: 15.5px;
        line-height: 1.68;
        color: var(--ink-3);
        margin: 0;
        text-wrap: pretty;
      }

      /* ═══ PRIMITIVES — enforcement board ═══ */
      .ds-primitives {
        position: relative;
        padding: 140px 0 150px;
        background:
          radial-gradient(ellipse 960px 540px at 50% 0%, rgba(58, 90, 148, 0.3), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--navy-deep) 100%);
        color: #FFFFFF;
        overflow: hidden;
      }
      .ds-primitives-bg { position: absolute; inset: 0; pointer-events: none; }
      .ds-primitives-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.055) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.055) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 85%);
      }
      .ds-primitives-glow {
        position: absolute; top: 30%; left: 50%; transform: translateX(-50%);
        width: 820px; height: 520px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.28), transparent 62%);
        filter: blur(100px);
      }
      .ds-primitives > .ds-container { position: relative; z-index: 1; }
      .ds-primitives-grid-wrap {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      @media (max-width: 980px) { .ds-primitives-grid-wrap { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 600px) { .ds-primitives-grid-wrap { grid-template-columns: 1fr; } }

      .ds-prim-card {
        position: relative;
        padding: 30px 28px 26px;
        border-radius: 16px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.12) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.36) 0%, rgba(18, 28, 46, 0.62) 100%);
        border: 1px solid rgba(160, 196, 240, 0.18);
        backdrop-filter: blur(10px) saturate(1.15);
        -webkit-backdrop-filter: blur(10px) saturate(1.15);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 22px 50px -24px rgba(0, 0, 0, 0.6);
        display: flex; flex-direction: column; gap: 14px;
        overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.5s, box-shadow 0.5s;
      }
      .ds-prim-card:hover {
        transform: translateY(-5px);
        border-color: rgba(160, 196, 240, 0.42);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.14) inset, 0 34px 72px -26px rgba(42, 68, 119, 0.65);
      }

      /* Corner brackets — register-mark aesthetic */
      .ds-prim-bracket { position: absolute; width: 14px; height: 14px; pointer-events: none; opacity: 0.45; transition: opacity 0.4s; }
      .ds-prim-bracket::before, .ds-prim-bracket::after {
        content: ""; position: absolute; background: var(--sky);
      }
      .ds-prim-bracket::before { width: 100%; height: 1.2px; top: 0; left: 0; }
      .ds-prim-bracket::after  { width: 1.2px; height: 100%; top: 0; left: 0; }
      .ds-prim-bracket-tl { top: 10px; left: 10px; }
      .ds-prim-bracket-tr { top: 10px; right: 10px; transform: scaleX(-1); }
      .ds-prim-bracket-bl { bottom: 10px; left: 10px; transform: scaleY(-1); }
      .ds-prim-bracket-br { bottom: 10px; right: 10px; transform: scale(-1, -1); }
      .ds-prim-card:hover .ds-prim-bracket { opacity: 0.9; }

      .ds-prim-head {
        display: flex; align-items: center; justify-content: space-between;
        margin-top: 6px;
      }
      .ds-prim-icon {
        display: inline-flex; align-items: center; justify-content: center;
        width: 44px; height: 44px;
        border-radius: 11px;
        background: linear-gradient(155deg, rgba(160, 196, 240, 0.24) 0%, rgba(90, 127, 181, 0.32) 100%);
        border: 1px solid rgba(160, 196, 240, 0.26);
        color: var(--sky);
      }
      .ds-prim-state {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px; letter-spacing: 0.22em;
        font-weight: 700;
        padding: 6px 11px;
        border-radius: 999px;
        text-transform: uppercase;
      }
      .ds-prim-state-dot { width: 6px; height: 6px; border-radius: 50%; }
      .ds-prim-state-enforced {
        color: #BCE4C6;
        background: rgba(126, 194, 138, 0.14);
        border: 1px solid rgba(126, 194, 138, 0.38);
      }
      .ds-prim-state-enforced .ds-prim-state-dot {
        background: var(--green);
        box-shadow: 0 0 0 3px rgba(126, 194, 138, 0.22);
        animation: ds-state-pulse 2s ease-in-out infinite;
      }
      .ds-prim-state-audited {
        color: var(--sky);
        background: rgba(160, 196, 240, 0.12);
        border: 1px solid rgba(160, 196, 240, 0.35);
      }
      .ds-prim-state-audited .ds-prim-state-dot {
        background: var(--sky);
        box-shadow: 0 0 0 3px rgba(160, 196, 240, 0.22);
        animation: ds-state-pulse 2s ease-in-out infinite;
      }
      .ds-prim-state-verified {
        color: #F4DDB0;
        background: rgba(232, 178, 109, 0.12);
        border: 1px solid rgba(232, 178, 109, 0.36);
      }
      .ds-prim-state-verified .ds-prim-state-dot {
        background: var(--amber);
        box-shadow: 0 0 0 3px rgba(232, 178, 109, 0.22);
        animation: ds-state-pulse 2s ease-in-out infinite;
      }
      .ds-prim-state-immutable {
        color: #F4DDB0;
        background: rgba(232, 178, 109, 0.12);
        border: 1px solid rgba(232, 178, 109, 0.36);
      }
      .ds-prim-state-immutable .ds-prim-state-dot {
        background: var(--amber);
        box-shadow: 0 0 0 3px rgba(232, 178, 109, 0.22);
        animation: ds-state-pulse 2s ease-in-out infinite;
      }
      .ds-prim-state-in-progress {
        color: rgba(220, 232, 250, 0.92);
        background: rgba(200, 215, 240, 0.08);
        border: 1px solid rgba(200, 215, 240, 0.3);
      }
      .ds-prim-state-in-progress .ds-prim-state-dot {
        background: rgba(200, 215, 240, 0.7);
        box-shadow: 0 0 0 3px rgba(200, 215, 240, 0.15);
        animation: ds-state-pulse 2s ease-in-out infinite;
      }
      @keyframes ds-state-pulse { 0%, 100% { opacity: 0.75; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
      @media (prefers-reduced-motion: reduce) {
        .ds-prim-state-dot { animation: none !important; }
      }

      .ds-prim-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        line-height: 1.22;
        margin: 0;
      }
      .ds-prim-b {
        font-size: 14.5px;
        line-height: 1.65;
        color: rgba(220, 232, 250, 0.78);
        margin: 0;
        text-wrap: pretty;
      }

      /* ═══ FINAL CTA ═══ */
      .ds-cta-final { padding: 110px 0 120px; background: var(--bg); }
      .ds-cta-card {
        position: relative;
        padding: 46px 52px;
        border-radius: 22px;
        background: var(--brand);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 30px 70px -26px rgba(42, 68, 119, 0.5);
        overflow: hidden;
      }
      .ds-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .ds-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
      .ds-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: ds-ripple 3s ease-in-out infinite; }
      .ds-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: ds-ripple 3s ease-in-out infinite 0.4s; }
      .ds-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: ds-ripple 3s ease-in-out infinite 0.8s; }
      .ds-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: ds-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes ds-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes ds-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .ds-cta-ring { animation: none !important; } }
      .ds-cta-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 6px; max-width: 520px; }
      .ds-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 38px); line-height: 1.1; letter-spacing: -0.022em; margin: 0; color: #FFFFFF; }
      .ds-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.86); }
      .ds-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.72); margin: 10px 0 20px; line-height: 1.55; max-width: 46ch; }
      .ds-cta-pill { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; border-radius: 999px; background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600; text-decoration: none; align-self: flex-start; white-space: nowrap; transition: background 0.25s, transform 0.25s, box-shadow 0.25s; box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3); }
      .ds-cta-pill:hover { background: #FAFAF5; transform: translateY(-2px); box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4); }
      .ds-cta-pill-arrow { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--brand); color: #FFFFFF; font-size: 13px; transition: background 0.25s, transform 0.25s; }
      .ds-cta-pill:hover .ds-cta-pill-arrow { background: var(--navy-cta); transform: translateX(2px); }

      /* ═══ FOOTER ═══ */
      /* ─── RELATED (style 6 · dossier rows with classification marks) ─── */
      .ds-related { padding: 130px 0 80px; background: var(--bg); }
      .ds-related-head { max-width: 760px; margin: 0 auto 56px; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; }
      .ds-related-list { list-style: none; padding: 0; margin: 0 auto; max-width: 980px; display: flex; flex-direction: column; gap: 14px; }
      .ds-related-row {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 280px) minmax(0, 1fr) 60px;
        gap: 32px;
        align-items: center;
        padding: 26px 28px;
        text-decoration: none;
        color: var(--ink);
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-left: 4px solid var(--brand);
        border-radius: 4px;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-left-color 0.4s, box-shadow 0.4s, background 0.4s;
      }
      .ds-related-row:hover {
        transform: translateX(6px);
        border-left-color: var(--sky);
        background: linear-gradient(90deg, rgba(42, 68, 119, 0.05), #FFFFFF 40%);
        box-shadow: 0 22px 44px -26px rgba(42, 68, 119, 0.28);
      }
      .ds-related-row:hover .ds-related-open { color: var(--brand); transform: translateX(6px); }
      @media (max-width: 820px) {
        .ds-related-row { grid-template-columns: 1fr; gap: 12px; padding: 22px 20px; }
      }
      .ds-related-title-wrap { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .ds-related-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 22px;
        letter-spacing: -0.018em; color: var(--ink);
        line-height: 1.18; margin: 0;
      }
      .ds-related-meta {
        font-family: var(--font-mono), monospace;
        font-size: 10px; letter-spacing: 0.22em;
        color: var(--ink-4); margin-top: 4px;
      }
      .ds-related-b {
        font-size: 14px; line-height: 1.6;
        color: var(--ink-3); margin: 0;
        grid-column: 2 / 3;
        max-width: 64ch;
      }
      @media (max-width: 820px) { .ds-related-b { grid-column: auto; } }
      .ds-related-open {
        display: inline-flex; align-items: center; justify-content: flex-end;
        color: var(--ink-4);
        transition: color 0.4s, transform 0.45s cubic-bezier(0.19, 1, 0.22, 1);
      }

      .ds-footer { position: relative; background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%); color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden; }
      .ds-footer::after { content: ""; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 320px; background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%); pointer-events: none; }
      .ds-footer > .ds-container { position: relative; z-index: 1; }
      .ds-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .ds-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .ds-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .ds-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .ds-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .ds-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .ds-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .ds-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .ds-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .ds-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .ds-foot-h { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em; color: var(--sky); font-weight: 700; margin-bottom: 18px; text-transform: uppercase; }
      .ds-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .ds-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .ds-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .ds-footer-watermark {
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
      .ds-footer-bottom { position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; padding: 22px 0 28px; margin-top: -10px; }
      .ds-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .ds-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .ds-footer { padding: 72px 0 0; margin-top: 60px; }
        .ds-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
      }
    `}</style>
  )
}
