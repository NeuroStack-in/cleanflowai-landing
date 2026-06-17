"use client"

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
  { slug: "profiling",      name: "Data Profiling",       blurb: "Column profiling, statistical fingerprinting, AI-drafted rule suggestions." },
  { slug: "quality",        name: "Data Quality",         blurb: "CleanDataShield rules, Quarantine Editor, approval-based remediation." },
  { slug: "transformation", name: "Data Transformation",  blurb: "AutoMap field resolution, version-controlled blueprints, deterministic execution." },
  { slug: "migration",      name: "Data Migration",       blurb: "OAuth-onboarded connectors, real-time Jobs, stateful incremental sync." },
  { slug: "modernization",  name: "Data Modernization",   blurb: "Encoding normalization, schema-drift reconciliation, warehouse-native output." },
  { slug: "security",       name: "Data Security",        blurb: "Identity-scoped access, approval-based change control, immutable audit lineage." },
]

const PILLARS = [
  {
    label: "AutoMap",
    body: "Type inference and field-resolution intelligence. CleanAI inspects column headers, sample values, and downstream taxonomies to propose deterministic mappings — confidence-scored, steward-reviewed, never auto-deployed.",
    glyph: "◇",
  },
  {
    label: "Business Rules Suggestion",
    body: "Plain-English rule definitions compiled into deterministic CleanDataShield templates. CleanAI drafts; your stewards review and approve; CleanDataShield enforces. No arbitrary code reaches production.",
    glyph: "✦",
  },
  {
    label: "Reasoning for Quarantine",
    body: "Every quarantined record arrives in the editor with CleanAI's rationale: which rule fired, what was malformed, what remediation it recommends. Reviewers approve, override, or escalate — nothing executes without human sign-off.",
    glyph: "◈",
  },
  {
    label: "AI-Assisted Support",
    body: "CleanAI surfaces remediation playbooks, blueprint templates, and rule-pack suggestions in-context — grounded in your registered taxonomies, never inventing operations the platform doesn't support.",
    glyph: "◉",
  },
]

const FLOW = [
  { n: "01", t: "Suggest",   d: "CleanAI proposes — type inferences, rule drafts, mapping candidates, remediation recommendations. Every output ships with confidence scoring and evidence." },
  { n: "02", t: "Approve",   d: "Your stewards review every proposal in context. Approve, override, refine, or reject. Nothing enters production without explicit sign-off." },
  { n: "03", t: "Register",  d: "Approved artefacts become first-class platform objects — versioned templates, named blueprints, registered Jobs. Never one-off scripts." },
  { n: "04", t: "Execute",   d: "CleanDataShield enforces only registered templates. Every run is rule-attributed, version-pointed, and immutably logged." },
]

const PRINCIPLES = [
  { tag: "01", h: "AI suggests. Humans approve.", b: "CleanAI is an intelligence layer, not an execution layer. Every proposal — type inference, rule draft, mapping suggestion, remediation recommendation — requires explicit steward approval before it touches data." },
  { tag: "02", h: "Deterministic execution only.", b: "No model output runs against production data. CleanAI's drafts compile into registered, version-controlled CleanDataShield templates that execute deterministically and identically every run." },
  { tag: "03", h: "Evidence with every output.", b: "Every CleanAI output carries its provenance: input snapshot, confidence score, rule lineage, and steward attribution. Reviewers see the reasoning, not just the verdict." },
  { tag: "04", h: "Bounded by your taxonomy.", b: "CleanAI operates against your registered taxonomies, schemas, and rule library. It cannot invent operations the platform doesn't support, and it cannot escape your governance perimeter." },
]

const PHILOSOPHY_QUOTES = [
  { text: "One pipeline. Thirty-four rules. Every record accounted for — validated, remediated, or quarantined.", em: "validated, remediated, or quarantined" },
  { text: "Ingest a CSV. Retrieve a DQ report. No ETL glue, no custom scripts, no surprises.",                     em: "no surprises" },
  { text: "AI suggests. Human approves. Pipeline executes deterministically — always.",                            em: "always" },
  { text: "If we can't remediate it, we quarantine it. If we quarantine it, we surface the rationale.",            em: "surface the rationale" },
]

export default function CleanAIPage() {
  const reduced = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 24 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} cai-root`}>
      <SiteNav />

      <main className="cai-main">
        {/* HERO — brain on left, text on right */}
        <section className="cai-hero">
          <div className="cai-hero-bg" aria-hidden>
            <div className="cai-hero-grid" />
            <div className="cai-hero-glow" />
            <div className="cai-hero-glow cai-hero-glow-2" />
            <div className="cai-hero-orb" />
          </div>
          <div className="cai-container cai-hero-split">
            <motion.div
              className="cai-hero-brain"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.19, 1, 0.22, 1] as number[] }}
              aria-hidden
            >
              <span className="cai-hero-brain-halo" />
              <span className="cai-hero-brain-ring cai-hero-brain-ring-1" />
              <span className="cai-hero-brain-ring cai-hero-brain-ring-2" />
              <span className="cai-hero-brain-ring cai-hero-brain-ring-3" />
              <span className="cai-hero-brain-node cai-hero-brain-node-1" />
              <span className="cai-hero-brain-node cai-hero-brain-node-2" />
              <span className="cai-hero-brain-node cai-hero-brain-node-3" />
              <span className="cai-hero-brain-node cai-hero-brain-node-4" />
              <img
                src="/brain-removebg-preview.png"
                alt="CleanAI reasoning engine — neural schematic"
                className="cai-hero-brain-img"
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <div className="cai-hero-text">
              <motion.span className="cai-eyebrow" {...rise(0.05)}>
                CLEANAI · INTELLIGENCE LAYER
              </motion.span>
              <motion.h1 className="cai-h1" {...rise(0.15)}>
                The intelligence that <br />
                <span className="cai-h1-em">never executes alone.</span>
              </motion.h1>
            </div>
          </div>
        </section>

        {/* HERO LEDE — intro paragraph, centered, light surface after the navy hero */}
        <section className="cai-hero-lede-section">
          <div className="cai-container cai-hero-lede-wrap">
            <motion.span className="cai-hero-lede-eyebrow" {...rise(0.03)}>THE INTELLIGENCE LAYER</motion.span>
            <motion.p className="cai-lede" {...rise(0.08)}>
              CleanAI is the reasoning engine inside CleanFlowAI. It drafts rules, infers
              types, reconciles schemas, and surfaces rationale for every quarantined record — but it never
              writes to your data. Every output is a proposal, every proposal carries
              evidence, every approved artefact becomes a registered CleanDataShield template.
            </motion.p>
          </div>
        </section>

        {/* 4 PILLARS */}
        <section className="cai-pillars">
          <div className="cai-container">
            <motion.div className="cai-section-head" {...rise(0.05)}>
              <span className="cai-tag">THE REASONING SURFACES</span>
              <h2 className="cai-h2">
                Four reasoning surfaces, <span className="cai-h2-em">one engine</span>.
              </h2>
              <p className="cai-h2-sub">
                CleanAI is composed of four intelligence surfaces — each tuned for a
                discrete data-trust task, each governed by the same approve-before-execute
                contract.
              </p>
            </motion.div>

            <div className="cai-pillars-grid">
              {PILLARS.map((p, i) => (
                <motion.article key={p.label} className="cai-pillar" {...rise(0.1 + i * 0.07)}>
                  <span className="cai-pillar-glyph" aria-hidden>{p.glyph}</span>
                  <span className="cai-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="cai-pillar-label">{p.label}</h3>
                  <p className="cai-pillar-body">{p.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* FLOW (4 stages dark band) */}
        <section className="cai-flow">
          <div className="cai-container">
            <motion.div className="cai-section-head cai-section-head-dark" {...rise(0.05)}>
              <span className="cai-tag cai-tag-light">THE APPROVE-BEFORE-EXECUTE LOOP</span>
              <h2 className="cai-h2 cai-h2-light">
                Stages between a draft <span className="cai-h2-em-light">and a deployed rule</span>.
              </h2>
            </motion.div>

            <ol className="cai-flow-list">
              {FLOW.map((s, i) => (
                <motion.li
                  key={s.n}
                  className={`cai-flow-node ${i === FLOW.length - 1 ? "cai-flow-node-last" : ""}`}
                  {...rise(0.1 + i * 0.08)}
                >
                  <div className="cai-flow-marker" aria-hidden>
                    <span className="cai-flow-marker-dot" />
                    <span className="cai-flow-marker-line" />
                  </div>
                  <div className="cai-flow-panel">
                    <div className="cai-flow-panel-head">
                      <span className="cai-flow-n">STAGE · {s.n}</span>
                      <h3 className="cai-flow-title">{s.t}</h3>
                    </div>
                    <p className="cai-flow-body">{s.d}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="cai-principles">
          <div className="cai-container">
            <motion.div className="cai-section-head" {...rise(0.05)}>
              <h2 className="cai-h2">
                What makes CleanAI <span className="cai-h2-em">audit-ready</span>.
              </h2>
            </motion.div>

            <div className="cai-prin-grid">
              {PRINCIPLES.map((p, i) => (
                <motion.article key={p.tag} className="cai-prin" {...rise(0.1 + i * 0.06)}>
                  <span className="cai-prin-tag">{p.tag}</span>
                  <h3 className="cai-prin-h">{p.h}</h3>
                  <p className="cai-prin-b">{p.b}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY — auto-scrolling marquee of navy principle cards */}
        <section className="cai-philosophy" id="philosophy">
          <div className="cai-container">
            <motion.div className="cai-philosophy-head" {...rise(0.05)}>
              <h2 className="cai-h2">
                Four principles.<br />
                <span className="cai-h2-em">One philosophy.</span>
              </h2>
            </motion.div>
          </div>
          <div className="cai-quotes-marquee">
            <div className="cai-quotes-track">
              {[...PHILOSOPHY_QUOTES, ...PHILOSOPHY_QUOTES].map((q, i) => {
                const parts = q.em ? q.text.split(q.em) : [q.text]
                return (
                  <figure className="cai-quote-card" key={i} aria-hidden={i >= PHILOSOPHY_QUOTES.length}>
                    <div className="cai-quote-mark-sm" aria-hidden>&ldquo;</div>
                    <blockquote className="cai-quote-text-sm">
                      {parts.length === 2 ? (
                        <>
                          {parts[0]}
                          <span className="cai-quote-em">{q.em}</span>
                          {parts[1]}
                        </>
                      ) : q.text}
                    </blockquote>
                  </figure>
                )
              })}
            </div>
          </div>
        </section>

        {/* OUTCOME band */}
        <section className="cai-outcome">
          <div className="cai-container">
            <motion.div className="cai-outcome-card" {...rise(0.05)}>
              <div className="cai-outcome-stat">
                <span className="cai-outcome-num">0</span>
                <span className="cai-outcome-label">arbitrary code paths in production</span>
              </div>
              <blockquote className="cai-outcome-quote">
                <span className="cai-outcome-q">“</span>
                Our security team cleared CleanFlowAI in one session. CleanAI drafts,
                CleanDataShield enforces, and every line is reviewed by a steward.
                There was no attack surface to debate.
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* WHERE CleanAI POWERS THE PLATFORM */}
        <section className="cai-powers">
          <div className="cai-container">
            <motion.div className="cai-section-head" {...rise(0.05)}>
              <span className="cai-tag">CLEANAI ACROSS THE PLATFORM</span>
              <h2 className="cai-h2">
                One engine, <span className="cai-h2-em">six solutions</span>.
              </h2>
            </motion.div>

            <div className="cai-powers-grid">
              {SOLUTIONS.map((s, i) => (
                <motion.div key={s.slug} {...rise(0.08 + i * 0.05)}>
                  <Link href={`/capabilities/${s.slug}`} className="cai-power-card">
                    <span className="cai-power-tag">{s.name.toUpperCase()}</span>
                    <p className="cai-power-blurb">{s.blurb}</p>
                    <span className="cai-power-arrow" aria-hidden>→</span>
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

function StyleBlock() {
  return (
    <style>{`
      .cai-root {
        --bg:        #FAFAF5;
        --bg-2:      #F5F3EC;
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
      }
      .cai-root * { box-sizing: border-box; }

      /* PERF: skip render + animation work for off-screen sections */
      .cai-root .cai-pillars,
      .cai-root .cai-flow,
      .cai-root .cai-statement,
      .cai-root .cai-principles,
      .cai-root .cai-outcome,
      .cai-root .cai-powers,
      .cai-root .cai-cta-final,
      .cai-root .cai-footer {
        content-visibility: auto;
        contain-intrinsic-size: 1px 800px;
      }

      .cai-container { max-width: 1180px; margin: 0 auto; padding: 0 36px; position: relative; }
      @media (max-width: 720px) { .cai-container { padding: 0 22px; } }

      /* NAV (mostly mirrors capability nav) */
      .cai-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .cai-nav-solid {
        background: rgba(250, 250, 245, 0.94);
        border-bottom-color: var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06);
      }
      .cai-nav-inner {
        max-width: 1280px; margin: 0 auto; padding: 16px 36px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .cai-wordmark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); }
      .cai-logo-wrap { display: inline-flex; width: 38px; height: 38px; }
      .cai-logo-wrap img { width: 38px; height: 38px; }
      .cai-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .cai-logo-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
      .cai-logo-tag { font-family: var(--font-mono), monospace; font-size: 9px; letter-spacing: 0.18em; color: var(--ink-3); text-transform: uppercase; margin-top: 2px; }

      .cai-nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; }
      .cai-nav-links > a { color: var(--ink-2); text-decoration: none; transition: color 0.25s; font-weight: 450; }
      .cai-nav-links > a:hover { color: var(--brand); }
      .cai-nav-active { color: var(--brand) !important; font-weight: 600 !important; }
      .cai-nav-cta {
        padding: 10px 18px; background: var(--ink); color: #FFFFFF !important;
        border-radius: 999px; font-weight: 500; font-size: 13.5px;
        transition: transform 0.25s, background 0.25s;
      }
      .cai-nav-cta:hover { background: var(--brand); transform: translateY(-1px); }

      .cai-nav-dd { position: relative; padding: 16px 0; margin: -16px 0; }
      .cai-nav-dd-trigger {
        display: inline-flex; align-items: center; gap: 6px;
        background: transparent; border: none; padding: 0;
        font: inherit; font-size: 14px; font-weight: 450;
        cursor: pointer; color: var(--ink-2); transition: color 0.25s;
      }
      .cai-nav-dd-trigger:hover { color: var(--brand); }
      .cai-nav-dd-caret { opacity: 0.7; transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
      .cai-nav-dd-caret-open { transform: rotate(180deg); }
      .cai-nav-dd-menu {
        position: absolute; top: calc(100% - 2px); left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0; visibility: hidden;
        transition: opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1), transform 0.28s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s 0.28s;
        z-index: 60;
      }
      .cai-nav-dd-menu-open {
        opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0);
        transition: opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1), transform 0.35s cubic-bezier(0.19, 1, 0.22, 1), visibility 0s;
      }
      .cai-nav-dd-inner-menu {
        margin-top: 14px; background: #FFFFFF;
        border: 1px solid var(--line); border-radius: 18px; padding: 24px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 30px 80px -20px rgba(15, 23, 41, 0.22), 0 8px 20px -8px rgba(15, 23, 41, 0.12);
      }
      .cai-nav-dd-head {
        display: flex; justify-content: space-between; align-items: baseline;
        padding: 0 4px 14px; border-bottom: 1px solid var(--line); margin-bottom: 12px;
      }
      .cai-nav-dd-eyebrow { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .cai-nav-dd-hint { font-family: var(--font-display), sans-serif; font-style: italic; font-size: 12.5px; color: var(--ink-4); }
      .cai-nav-dd-split { display: grid; grid-template-columns: 1fr 280px; gap: 18px; }
      .cai-nav-dd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
      .cai-nav-dd-feature {
        display: flex; flex-direction: column; gap: 8px;
        padding: 18px 18px 16px; border-radius: 12px;
        text-decoration: none; color: #FFFFFF;
        background: radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
                    linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 12px 30px -14px rgba(15, 23, 41, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .cai-nav-dd-feature-active {
        outline: 2px solid #a0c4f0;
        outline-offset: -2px;
      }
      .cai-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .cai-nav-dd-feature-icon {
        display: inline-flex; align-items: center; justify-content: center;
        width: 30px; height: 30px; border-radius: 8px;
        background: rgba(160, 196, 240, 0.12);
        border: 1px solid rgba(160, 196, 240, 0.28);
      }
      .cai-nav-dd-feature-icon img {
        width: 22px; height: 22px;
        object-fit: contain;
        filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5));
      }
      .cai-nav-dd-feature-tag { font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .cai-nav-dd-feature-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 17px; letter-spacing: -0.015em; color: #FFFFFF; margin: 4px 0 0; line-height: 1.15; }
      .cai-nav-dd-feature-b { font-size: 12.5px; line-height: 1.5; color: rgba(200, 215, 240, 0.78); margin: 0; }
      .cai-nav-dd-feature-cta { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.12em; color: #FFFFFF; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(160, 196, 240, 0.18); }
      @media (max-width: 720px) {
        .cai-nav-dd-split { grid-template-columns: 1fr; gap: 12px; }
        .cai-nav-dd-feature { padding: 14px 14px 12px; }
      }
      .cai-nav-dd-item {
        display: flex; flex-direction: column; gap: 4px;
        padding: 12px 14px; border-radius: 10px; text-decoration: none; color: var(--ink);
        transition: background 0.25s, transform 0.25s;
      }
      .cai-nav-dd-item:hover { background: var(--bg-2); transform: translateX(2px); }
      .cai-nav-dd-item-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 14.5px; letter-spacing: -0.01em; color: var(--ink); transition: color 0.25s; }
      .cai-nav-dd-item-blurb { font-family: var(--font-sans), sans-serif; font-size: 12.5px; line-height: 1.45; color: var(--ink-4); }
      .cai-nav-dd-item:hover .cai-nav-dd-item-name { color: var(--brand); }

      /* HERO — navy/blue field */
      .cai-hero {
        position: relative; padding: 180px 0 120px; overflow: hidden;
        color: #FFFFFF;
        background:
          radial-gradient(ellipse 900px 600px at 15% 28%, rgba(42, 68, 119, 0.28), transparent 62%),
          radial-gradient(ellipse 700px 500px at 88% 72%, rgba(90, 127, 181, 0.18), transparent 64%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--navy-deep) 100%);
      }
      @media (max-width: 768px) { .cai-hero { padding: 110px 0 80px; } }
      @media (max-width: 480px) { .cai-hero { padding: 96px 0 64px; } }
      .cai-hero-bg { position: absolute; inset: 0; pointer-events: none; }
      .cai-hero-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.08) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 35%, transparent 85%);
      }
      .cai-hero-glow {
        position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
        width: 1200px; height: 640px;
        background: radial-gradient(ellipse, rgba(42, 68, 119, 0.22) 0%, rgba(90, 127, 181, 0.1) 40%, transparent 70%);
        filter: blur(80px);
      }
      .cai-hero-glow-2 {
        top: 35%; left: -10%; transform: none;
        width: 580px; height: 480px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.26), transparent 62%);
        filter: blur(90px);
      }
      .cai-hero-orb {
        position: absolute;
        top: 30%; right: 10%;
        width: 320px; height: 320px;
        border-radius: 50%;
        background: conic-gradient(from 0deg, var(--brand), var(--navy-mid), var(--navy-light), var(--brand));
        filter: blur(60px) saturate(1.4);
        opacity: 0.55;
        animation: cai-orb-spin 30s linear infinite;
      }
      @keyframes cai-orb-spin { to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .cai-hero-orb { animation: none; } }
      .cai-hero-body { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; max-width: 800px; }
      .cai-hero-split {
        position: relative; z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
        gap: 72px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .cai-hero-split { grid-template-columns: 1fr; gap: 36px; }
      }
      .cai-hero-text { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; max-width: 640px; }

      /* HERO BRAIN */
      .cai-hero-brain {
        position: relative;
        display: flex; align-items: center; justify-content: center;
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 420px;
        margin: 0 auto;
      }
      .cai-hero-brain-img {
        position: relative;
        width: 82%;
        height: auto;
        filter: drop-shadow(0 30px 60px rgba(42, 68, 119, 0.45)) drop-shadow(0 0 30px rgba(160, 196, 240, 0.28));
        z-index: 3;
        animation: cai-brain-float 7s ease-in-out infinite;
      }
      @keyframes cai-brain-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .cai-hero-brain-halo {
        position: absolute; inset: 10%;
        border-radius: 50%;
        background:
          radial-gradient(circle, rgba(160, 196, 240, 0.4) 0%, rgba(90, 127, 181, 0.22) 40%, transparent 70%);
        filter: blur(38px);
        z-index: 1;
        animation: cai-brain-pulse 6s ease-in-out infinite;
      }
      @keyframes cai-brain-pulse {
        0%, 100% { opacity: 0.9; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.06); }
      }
      .cai-hero-brain-ring {
        position: absolute;
        border-radius: 50%;
        border: 1px dashed rgba(42, 68, 119, 0.3);
        z-index: 2;
        pointer-events: none;
      }
      .cai-hero-brain-ring-1 { inset: 4%; border-color: rgba(160, 196, 240, 0.68); border-width: 1.2px; animation: cai-brain-ring-rot 40s linear infinite; }
      .cai-hero-brain-ring-2 { inset: -4%; border-style: solid; border-color: rgba(160, 196, 240, 0.55); border-width: 1.2px; box-shadow: 0 0 24px rgba(160, 196, 240, 0.18); }
      .cai-hero-brain-ring-3 { inset: -12%; border-style: dotted; border-color: rgba(160, 196, 240, 0.45); border-width: 1.6px; animation: cai-brain-ring-rot 80s linear infinite reverse; }
      @keyframes cai-brain-ring-rot { to { transform: rotate(360deg); } }
      .cai-hero-brain-node {
        position: absolute;
        width: 10px; height: 10px; border-radius: 50%;
        background: #a0c4f0;
        box-shadow: 0 0 0 4px rgba(160, 196, 240, 0.22), 0 0 18px rgba(160, 196, 240, 0.55);
        z-index: 4;
        animation: cai-brain-node-pulse 2.4s ease-in-out infinite;
      }
      .cai-hero-brain-node-1 { top: 12%; left: 52%; animation-delay: 0s; }
      .cai-hero-brain-node-2 { top: 44%; right: 6%; animation-delay: 0.6s; }
      .cai-hero-brain-node-3 { bottom: 14%; left: 24%; animation-delay: 1.2s; }
      .cai-hero-brain-node-4 { top: 58%; left: 4%; animation-delay: 1.8s; }
      @keyframes cai-brain-node-pulse {
        0%, 100% { opacity: 0.65; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @media (prefers-reduced-motion: reduce) {
        .cai-hero-brain-img, .cai-hero-brain-halo, .cai-hero-brain-ring-1,
        .cai-hero-brain-ring-3, .cai-hero-brain-node { animation: none !important; }
      }

      /* HERO META — Suggest → Approve → Execute chips */
      .cai-hero-meta {
        display: inline-flex; flex-wrap: wrap; align-items: center; gap: 8px;
        padding: 8px 12px;
        background: linear-gradient(155deg, rgba(42, 68, 119, 0.42), rgba(20, 30, 48, 0.55));
        backdrop-filter: blur(10px) saturate(1.2);
        -webkit-backdrop-filter: blur(10px) saturate(1.2);
        border: 1px solid rgba(160, 196, 240, 0.2);
        border-radius: 999px;
        box-shadow: 0 8px 24px -12px rgba(10, 18, 36, 0.4);
        margin-top: 6px;
      }
      .cai-hero-meta-chip {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.22em;
        color: rgba(220, 232, 250, 0.82);
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(10, 18, 36, 0.35);
        border: 1px solid rgba(160, 196, 240, 0.2);
        text-transform: uppercase;
        font-weight: 600;
      }
      .cai-hero-meta-chip-active {
        background: #FFFFFF;
        color: var(--brand);
        border-color: #FFFFFF;
      }
      .cai-hero-meta-arrow {
        font-family: var(--font-mono), monospace;
        font-size: 14px;
        color: rgba(200, 215, 240, 0.6);
      }
      .cai-eyebrow { font-family: var(--font-mono), monospace; font-size: 12px; letter-spacing: 0.22em; color: #a0c4f0; font-weight: 700; }
      .cai-h1 {
        font-family: var(--font-display), sans-serif; font-weight: 700;
        font-size: clamp(40px, 4.8vw, 62px); line-height: 1.04; letter-spacing: -0.03em;
        color: #FFFFFF; margin: 0; text-wrap: balance;
      }
      .cai-h1-em { font-style: italic; font-weight: 400; color: #a0c4f0; }
      .cai-lede { font-size: 16.5px; line-height: 1.65; color: rgba(220, 232, 250, 0.82); max-width: 58ch; margin: 4px 0 0; }
      .cai-hero-lede-section {
        padding: 96px 0 80px;
        background: var(--bg);
      }
      .cai-hero-lede-wrap {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; align-items: center;
        gap: 18px;
        text-align: center;
      }
      .cai-hero-lede-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 11px; letter-spacing: 0.28em;
        color: var(--brand);
        font-weight: 700;
        text-transform: uppercase;
      }
      .cai-hero-lede-wrap .cai-lede {
        max-width: 68ch;
        font-size: 18.5px;
        line-height: 1.7;
        color: var(--ink-2);
        margin: 0;
        text-wrap: pretty;
      }
      @media (max-width: 780px) {
        .cai-hero-lede-section { padding: 56px 0 40px; }
        .cai-hero-lede-wrap .cai-lede { font-size: 16.5px; }
      }

      /* STATEMENT */
      .cai-statement {
        padding: 70px 0; text-align: center;
        border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        background: var(--bg-2);
      }
      .cai-statement p {
        font-family: var(--font-display), sans-serif; font-style: italic;
        font-size: clamp(22px, 3.2vw, 36px); line-height: 1.3;
        font-weight: 400; color: var(--ink); letter-spacing: -0.018em;
        margin: 0 auto; max-width: 38ch;
      }
      .cai-statement-q { font-family: var(--font-serif), serif; color: var(--brand); font-size: 1.4em; line-height: 0; margin-right: 6px; vertical-align: -0.2em; }

      /* SECTION HEADS */
      .cai-section-head { max-width: 700px; margin: 0 0 56px; display: flex; flex-direction: column; gap: 14px; }
      .cai-section-head-dark { color: #FFFFFF; }
      .cai-tag { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.22em; color: var(--brand); font-weight: 600; }
      .cai-tag-light { color: #a0c4f0; }
      .cai-h2 {
        font-family: var(--font-display), sans-serif; font-weight: 700;
        font-size: clamp(32px, 4.4vw, 52px); line-height: 1.05; letter-spacing: -0.028em;
        color: var(--ink); margin: 0; text-wrap: balance;
      }
      .cai-h2-light { color: #FFFFFF; }
      .cai-h2-em { font-style: italic; font-weight: 600; color: var(--brand); }
      .cai-h2-em-light { color: #a0c4f0; font-style: italic; font-weight: 600; }
      .cai-h2-sub { font-size: 16px; line-height: 1.6; color: var(--ink-3); max-width: 58ch; margin: 8px 0 0; }

      /* PILLARS — 2x2 grid */
      .cai-pillars { padding: 130px 0; }
      .cai-pillars-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
      }
      @media (max-width: 800px) { .cai-pillars-grid { grid-template-columns: 1fr; gap: 20px; } }
      .cai-pillar {
        position: relative; padding: 36px 32px 36px 80px;
        border: 1px solid rgba(42, 68, 119, 0.14); border-radius: 16px;
        background:
          radial-gradient(circle at 0% 0%, rgba(42, 68, 119, 0.06), transparent 55%),
          #FFFFFF;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s, box-shadow 0.4s;
        overflow: hidden;
      }
      .cai-pillar:hover {
        transform: translateY(-4px);
        border-color: rgba(42, 68, 119, 0.32);
        box-shadow: 0 24px 50px -22px rgba(42, 68, 119, 0.22);
      }
      .cai-pillar-glyph {
        position: absolute; top: 30px; left: 28px;
        font-family: var(--font-display), sans-serif;
        font-size: 32px; color: var(--brand); line-height: 1;
      }
      .cai-pillar-num {
        font-family: var(--font-mono), monospace; font-size: 10.5px;
        letter-spacing: 0.24em; color: var(--brand); font-weight: 700;
      }
      .cai-pillar-label {
        font-family: var(--font-display), sans-serif; font-weight: 700;
        font-size: 22px; letter-spacing: -0.018em; color: var(--ink);
        margin: 6px 0 10px;
      }
      .cai-pillar-body { font-size: 14.5px; line-height: 1.6; color: var(--ink-3); margin: 0; }

      /* FLOW (dark) */
      .cai-flow {
        padding: 130px 0; color: #FFFFFF; position: relative; overflow: hidden;
        background:
          radial-gradient(ellipse 900px 500px at 50% 20%, rgba(58, 90, 148, 0.28), transparent 60%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
      }
      .cai-flow::before {
        content: ""; position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(120, 160, 220, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(120, 160, 220, 0.04) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 85%);
        pointer-events: none;
      }
      .cai-flow > .cai-container { position: relative; z-index: 1; }

      .cai-flow-list {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        max-width: 860px;
        display: flex; flex-direction: column;
        position: relative;
      }
      .cai-flow-node {
        position: relative;
        display: grid;
        grid-template-columns: 48px minmax(0, 1fr);
        gap: 28px;
        align-items: flex-start;
        padding-bottom: 40px;
      }
      .cai-flow-node-last { padding-bottom: 0; }
      @media (max-width: 780px) {
        .cai-flow-node { grid-template-columns: 28px minmax(0, 1fr); gap: 18px; padding-bottom: 30px; }
      }
      .cai-flow-marker {
        position: relative;
        width: 48px;
        display: flex; justify-content: center;
      }
      .cai-flow-marker-dot {
        position: relative;
        width: 18px; height: 18px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #e6efff 0%, #a0c4f0 45%, #3A5A94 100%);
        box-shadow:
          0 0 0 5px rgba(160, 196, 240, 0.16),
          0 0 22px rgba(160, 196, 240, 0.65);
        margin-top: 24px;
        z-index: 2;
        animation: cai-flow-dot 2.6s ease-in-out infinite;
      }
      .cai-flow-marker-line {
        position: absolute;
        top: 46px;
        bottom: -6px;
        left: 50%;
        width: 2px;
        transform: translateX(-50%);
        background: linear-gradient(180deg, rgba(160, 196, 240, 0.55) 0%, rgba(160, 196, 240, 0.08) 100%);
      }
      .cai-flow-node-last .cai-flow-marker-line { display: none; }
      @keyframes cai-flow-dot {
        0%, 100% { box-shadow: 0 0 0 5px rgba(160, 196, 240, 0.16), 0 0 22px rgba(160, 196, 240, 0.65); }
        50%      { box-shadow: 0 0 0 8px rgba(160, 196, 240, 0.26), 0 0 36px rgba(160, 196, 240, 0.9); }
      }
      @media (prefers-reduced-motion: reduce) { .cai-flow-marker-dot { animation: none; } }

      .cai-flow-panel {
        position: relative;
        padding: 26px 30px 26px;
        border-radius: 16px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(160, 196, 240, 0.14) 0%, transparent 55%),
          linear-gradient(155deg, rgba(42, 68, 119, 0.42) 0%, rgba(18, 28, 46, 0.64) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        backdrop-filter: blur(10px) saturate(1.15);
        -webkit-backdrop-filter: blur(10px) saturate(1.15);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 22px 50px -24px rgba(0, 0, 0, 0.6);
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s, box-shadow 0.4s;
      }
      .cai-flow-panel:hover {
        transform: translateX(4px);
        border-color: rgba(160, 196, 240, 0.42);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.12) inset, 0 30px 60px -22px rgba(42, 68, 119, 0.6);
      }
      .cai-flow-panel::before {
        content: "";
        position: absolute;
        left: -28px; top: 32px;
        width: 28px; height: 2px;
        background: linear-gradient(90deg, rgba(160, 196, 240, 0.55), transparent);
      }
      @media (max-width: 780px) { .cai-flow-panel::before { display: none; } }
      .cai-flow-panel-head {
        display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap;
        margin-bottom: 10px;
      }
      .cai-flow-n {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(160, 196, 240, 0.08);
        border: 1px solid rgba(160, 196, 240, 0.22);
      }
      .cai-flow-title {
        font-family: var(--font-display), sans-serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        margin: 0;
        line-height: 1.2;
      }
      .cai-flow-body {
        font-size: 15px;
        line-height: 1.66;
        color: rgba(200, 215, 240, 0.8);
        margin: 0;
        text-wrap: pretty;
      }

      /* PRINCIPLES */
      .cai-principles { padding: 130px 0; background: var(--bg-2); }
      .cai-prin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
      @media (max-width: 720px) { .cai-prin-grid { grid-template-columns: 1fr; } }
      .cai-prin {
        padding: 36px 32px 38px; background: #FFFFFF;
        display: flex; flex-direction: column; gap: 12px;
        transition: background 0.3s;
      }
      .cai-prin:hover { background: var(--bg); }
      .cai-prin-tag {
        font-family: var(--font-mono), monospace; font-size: 11px;
        letter-spacing: 0.22em; color: var(--brand); font-weight: 700;
      }
      .cai-prin-h {
        font-family: var(--font-display), sans-serif; font-weight: 700;
        font-size: 22px; line-height: 1.2; letter-spacing: -0.018em;
        color: var(--ink); margin: 0; max-width: 22ch;
      }
      .cai-prin-b { font-size: 14.5px; line-height: 1.6; color: var(--ink-3); margin: 0; }

      /* PHILOSOPHY — marquee of navy quote cards */
      .cai-philosophy { padding: 120px 0 100px; overflow: hidden; background: var(--bg); }
      .cai-philosophy-head {
        max-width: 720px;
        margin: 0 auto 48px;
        display: flex; flex-direction: column; gap: 14px;
        text-align: center;
        align-items: center;
      }
      .cai-quotes-marquee {
        position: relative;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
        padding: 30px 0;
      }
      .cai-quotes-track {
        display: flex; gap: 28px;
        width: max-content;
        animation: cai-quotes-scroll 52s linear infinite;
        padding: 0 16px;
      }
      .cai-quotes-marquee:hover .cai-quotes-track { animation-play-state: paused; }
      @keyframes cai-quotes-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) { .cai-quotes-track { animation: none; } }
      .cai-quote-card {
        flex-shrink: 0;
        width: 520px;
        min-height: 260px;
        padding: 40px 38px 34px;
        border: 1px solid rgba(90, 127, 181, 0.28);
        border-radius: 18px;
        background:
          radial-gradient(ellipse at 20% 0%, rgba(90, 127, 181, 0.32) 0%, transparent 55%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        display: flex;
        flex-direction: column;
        gap: 18px;
        margin: 0;
        color: #FFFFFF;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.08) inset,
          0 16px 40px -20px rgba(15, 23, 41, 0.35);
        transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
      }
      .cai-quote-card:hover {
        border-color: rgba(120, 160, 220, 0.5);
        transform: translateY(-4px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.12) inset,
          0 0 0 1px rgba(120, 160, 220, 0.35) inset,
          0 28px 60px -24px rgba(42, 68, 119, 0.55);
      }
      .cai-quote-mark-sm {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 700;
        font-size: 96px;
        line-height: 0.5;
        color: rgba(160, 196, 240, 0.6);
        margin-bottom: -18px;
        user-select: none;
      }
      .cai-quote-text-sm {
        font-family: var(--font-sans), sans-serif;
        font-size: 20px;
        line-height: 1.45;
        font-weight: 400;
        color: #FFFFFF;
        letter-spacing: -0.008em;
        margin: 0;
        text-wrap: pretty;
      }
      .cai-quote-em {
        color: #c0d4f0;
        font-style: italic;
        font-weight: 500;
      }
      @media (max-width: 780px) {
        .cai-philosophy { padding: 80px 0 68px; }
        .cai-quote-card { width: 320px; min-height: auto; padding: 30px 26px 26px; }
        .cai-quote-mark-sm { font-size: 72px; margin-bottom: -14px; }
        .cai-quote-text-sm { font-size: 17px; }
        .cai-quotes-track { gap: 18px; animation-duration: 36s; }
      }

      /* OUTCOME */
      .cai-outcome { padding: 100px 0; background: var(--bg); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .cai-outcome-card { display: grid; grid-template-columns: 280px 1fr; gap: 60px; align-items: center; }
      @media (max-width: 800px) { .cai-outcome-card { grid-template-columns: 1fr; gap: 28px; } }
      .cai-outcome-stat { display: flex; flex-direction: column; gap: 6px; }
      .cai-outcome-num {
        font-family: var(--font-display), sans-serif; font-weight: 700;
        font-size: clamp(58px, 7vw, 96px); color: var(--brand);
        letter-spacing: -0.03em; line-height: 0.9;
      }
      .cai-outcome-label { font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: 0.2em; color: var(--ink-4); text-transform: uppercase; }
      .cai-outcome-quote {
        font-family: var(--font-display), sans-serif; font-weight: 400;
        font-style: italic; font-size: clamp(22px, 2.6vw, 30px);
        line-height: 1.4; color: var(--ink); letter-spacing: -0.015em;
        margin: 0; max-width: 50ch;
      }
      .cai-outcome-q { font-family: var(--font-serif), serif; color: var(--brand); font-size: 1.4em; line-height: 0; margin-right: 6px; vertical-align: -0.2em; }

      /* POWERS — six solution cards */
      .cai-powers { padding: 130px 0; }
      .cai-powers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      @media (max-width: 900px) { .cai-powers-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 540px) { .cai-powers-grid { grid-template-columns: 1fr; } }
      .cai-power-card {
        position: relative; padding: 24px 24px 56px;
        background: #FFFFFF; border: 1px solid var(--line); border-radius: 14px;
        text-decoration: none; color: var(--ink);
        display: flex; flex-direction: column; gap: 10px;
        transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s;
        min-height: 170px;
      }
      .cai-power-card:hover { transform: translateY(-4px); border-color: var(--brand); box-shadow: 0 24px 50px -24px rgba(42, 68, 119, 0.22); }
      .cai-power-tag {
        font-family: var(--font-mono), monospace; font-size: 10px;
        letter-spacing: 0.22em; color: var(--brand); font-weight: 600;
      }
      .cai-power-blurb { font-size: 13.5px; line-height: 1.55; color: var(--ink-3); margin: 0; }
      .cai-power-arrow {
        position: absolute; bottom: 22px; right: 22px;
        display: inline-flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 50%;
        background: rgba(42, 68, 119, 0.08); color: var(--brand); font-size: 15px;
        transition: transform 0.3s, background 0.3s;
      }
      .cai-power-card:hover .cai-power-arrow { transform: translateX(4px); background: var(--brand); color: #FFFFFF; }

      /* CTA (mirrors capability cta) */
      .cai-cta-final { padding: 60px 0 100px; }
      .cai-cta-card { position: relative; padding: 44px 48px; border-radius: 22px; background: var(--brand); overflow: hidden; }
      .cai-cta-rings { position: absolute; top: 50%; right: -5%; transform: translateY(-50%); width: 340px; height: 340px; z-index: 1; pointer-events: none; }
      .cai-cta-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
      .cai-cta-ring-1 { width: 100%; height: 100%; border: 2px solid rgba(255, 255, 255, 0.22); animation: cai-ripple 3s ease-in-out infinite; }
      .cai-cta-ring-2 { width: 72%; height: 72%; border: 2.5px solid rgba(255, 255, 255, 0.28); animation: cai-ripple 3s ease-in-out infinite 0.4s; }
      .cai-cta-ring-3 { width: 46%; height: 46%; border: 3px solid rgba(255, 255, 255, 0.35); animation: cai-ripple 3s ease-in-out infinite 0.8s; }
      .cai-cta-ring-4 { width: 22%; height: 22%; background: rgba(255, 255, 255, 0.25); animation: cai-ripple-core 3s ease-in-out infinite 1.2s; }
      @keyframes cai-ripple { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; } }
      @keyframes cai-ripple-core { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; } }
      @media (prefers-reduced-motion: reduce) { .cai-cta-ring { animation: none !important; } }
      .cai-cta-content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 6px; max-width: 540px; }
      .cai-cta-h { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: clamp(26px, 3vw, 36px); line-height: 1.12; letter-spacing: -0.02em; margin: 0; color: #FFFFFF; }
      .cai-cta-em { font-style: italic; font-weight: 600; color: rgba(255, 255, 255, 0.85); }
      .cai-cta-sub { font-size: 14px; color: rgba(255, 255, 255, 0.7); margin: 6px 0 18px; line-height: 1.5; max-width: 44ch; }
      .cai-cta-pill {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 13px 22px; border-radius: 999px;
        background: #FFFFFF; color: var(--brand); font-size: 14px; font-weight: 600;
        text-decoration: none; align-self: flex-start; white-space: nowrap;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .cai-cta-pill:hover {
        background: #FAFAF5;
        transform: translateY(-2px);
        box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4);
      }
      .cai-cta-pill-arrow {
        display: inline-flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border-radius: 50%;
        background: var(--brand); color: #FFFFFF; font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .cai-cta-pill:hover .cai-cta-pill-arrow {
        background: var(--navy-cta);
        transform: translateX(2px);
      }

      /* FOOTER */
      .cai-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF; padding: 96px 0 0; margin-top: 80px; overflow: hidden;
      }
      .cai-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%); width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .cai-footer > .cai-container { position: relative; z-index: 1; }
      .cai-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .cai-footer-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr); gap: 72px; }
      .cai-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .cai-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .cai-footer-brand-logo { display: inline-flex; width: 40px; height: 40px; }
      .cai-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .cai-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .cai-footer-brand-name { font-family: var(--font-display), sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #FFFFFF; }
      .cai-footer-brand-tag { font-family: var(--font-mono), monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(160, 196, 240, 0.65); text-transform: uppercase; margin-top: 3px; }
      .cai-footer-blurb { max-width: 32ch; font-size: 14.5px; color: rgba(200, 215, 240, 0.72); line-height: 1.6; margin: 8px 0 0; }
      .cai-footer-cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px; }
      .cai-foot-h {
        font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700; margin-bottom: 18px;
        text-transform: uppercase;
      }
      .cai-footer-cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
      .cai-footer-cols a { color: rgba(220, 232, 250, 0.72); text-decoration: none; transition: color 0.2s, transform 0.2s; display: inline-block; }
      .cai-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .cai-footer-watermark {
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
      .cai-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .cai-footer-bottom > span { font-family: var(--font-mono), monospace; font-size: 11.5px; letter-spacing: 0.1em; color: rgba(200, 215, 240, 0.55); text-align: center; }
      @media (max-width: 900px) { .cai-footer-top { grid-template-columns: 1fr; gap: 40px; } }
      @media (max-width: 600px) {
        .cai-footer { padding: 72px 0 0; margin-top: 60px; }
        .cai-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
        .cai-footer-watermark { margin: 28px 0 0; }
      }

      /* MOBILE OVERRIDES */
      @media (max-width: 900px) {
        .cai-nav-inner { padding: 14px 22px; }
        .cai-nav-links { gap: 18px; font-size: 13.5px; }
        .cai-logo-tag { display: none; }
        .cai-hero { padding: 120px 0 60px; }
        .cai-hero-split { gap: 44px; }
        .cai-hero-brain { max-width: 320px; }
        .cai-hero-lede-section { padding: 48px 0 32px; }
        .cai-pillars, .cai-flow, .cai-principles, .cai-powers { padding: 90px 0; }
        .cai-outcome { padding: 72px 0; }
        .cai-cta-final { padding: 40px 0 80px; }
      }
      @media (max-width: 640px) {
        .cai-nav-inner { padding: 12px 18px; }
        .cai-nav-links { gap: 12px; font-size: 13px; }
        .cai-nav-cta { padding: 8px 14px; font-size: 12.5px; }
        .cai-hero { padding: 100px 0 44px; }
        .cai-hero-split { gap: 36px; }
        .cai-hero-brain { max-width: 240px; }
        .cai-hero-brain-node { width: 8px; height: 8px; }
        .cai-hero-brain-ring-3 { inset: -8%; }
        .cai-h1 { font-size: clamp(32px, 8vw, 42px) !important; line-height: 1.08; }
        .cai-hero-lede-section { padding: 36px 0 24px; }
        .cai-hero-lede-wrap .cai-lede { font-size: 15.5px !important; }
        .cai-statement { padding: 48px 0; }
        .cai-pillars, .cai-flow, .cai-principles, .cai-powers { padding: 64px 0; }
        .cai-outcome { padding: 52px 0; }
        .cai-cta-final { padding: 28px 0 60px; }
        .cai-pillar { padding: 28px 22px 28px 70px; }
        .cai-pillar-glyph { font-size: 26px; top: 26px; left: 22px; }
        .cai-cta-card { padding: 32px 26px 34px; border-radius: 18px; }
        .cai-cta-rings { display: none; }
        .cai-footer-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
      }
    `}</style>
  )
}
