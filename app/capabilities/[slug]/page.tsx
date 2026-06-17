"use client"

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { SiteNav, SiteCta, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap", weight: ["400", "500", "600", "700"] })
const instrument = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", display: "swap", weight: "400", style: ["normal", "italic"] })
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500", "600"] })

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY DATA — one entry per page
   ═══════════════════════════════════════════════════════════════ */

type Capability = {
  slug: string
  eyebrow: string
  title: string
  titleEm: string
  subhead: string
  statement: string
  pillars: { icon: string; label: string; body: string }[]
  hasPipeline: boolean
  howItWorks?: { n: string; title: string; body: string }[]
  features: { title: string; body: string }[]
  outcome: { stat: string; statLabel: string; quote: string }
  visual: { eyebrow: string; title: string; sub: string }
  product: { eyebrow: string; title: string; caption: string; src: string; alt: string }
  accent: { hue: string; glow: string; signature: string }
  layout: {
    order: SectionId[]
    pillars:  { eyebrow: string; title: string; titleEm: string }
    features: { eyebrow: string; title: string; titleEm: string }
    related:  { eyebrow: string; title: string; titleEm: string }
    cta:      { headline: string; em: string; sub: string; pill: string }
  }
}

type SectionId = "statement" | "pillars" | "product" | "pipeline" | "features" | "outcome" | "related" | "cta"

const CAPABILITIES: Record<string, Capability> = {
  profiling: {
    slug: "profiling",
    eyebrow: "DATA PROFILING",
    title: "Know your data",
    titleEm: "before you trust it",
    subhead:
      "CleanAI executes a single deterministic profiling pass across every column — type inference via AutoMap, statistical fingerprinting, key-candidate detection, and AI-drafted rule suggestions surfaced for steward review. No custom code, no opaque heuristics, no after-the-fact inference.",
    statement: "Every column, measured. Every anomaly, surfaced.",
    pillars: [
      { icon: "type-abc",  label: "AutoMap type inference", body: "Numeric, text, date, email, phone, currency, UOM, fiscal periods — detected with confidence scoring and validated against your registered taxonomies." },
      { icon: "bars-stats",label: "Statistical fingerprinting", body: "Eleven-plus metrics per column — null rate, cardinality, distribution skew, parse rate, pattern coverage — captured in a single profiling pass." },
      { icon: "key",       label: "Key & relationship discovery", body: "Primary keys, unique candidates, and inferred foreign-key relationships — surfaced for data-steward review, never auto-applied." },
    ],
    hasPipeline: false,
    visual: {
      eyebrow: "COLUMN PROFILE",
      title: "Read every column before you trust one record.",
      sub: "CleanAI scans types, null rates, uniqueness, and format parse-rates in a single pass — then surfaces what your team needs to decide on.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Column-level profiling with AI-drafted rule suggestions.",
      caption: "Column Profiling view · per-column null rates, uniqueness, and AI rule chips surfaced inline.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.18.51.jpeg",
      alt: "CleanFlowAI column profiling screen showing per-column metrics and AI rule suggestions",
    },
    accent: { hue: "#5A7FB5", glow: "rgba(90, 127, 181, 0.34)", signature: "≡" },
    layout: {
      order: ["statement", "pillars", "features", "product", "outcome", "related", "cta"],
      pillars:  { eyebrow: "THREE WAYS WE READ A DATASET", title: "Profiling that earns trust", titleEm: "before any rule fires" },
      features: { eyebrow: "THE PROFILER, IN DEPTH",        title: "What CleanAI surfaces,", titleEm: "what stewards approve" },
      related:  { eyebrow: "WHAT PROFILING UNLOCKS",        title: "The disciplines that", titleEm: "depend on it" },
      cta:      { headline: "Profile your", em: "messiest dataset", sub: "Send a sample. We'll return a profile, candidate keys, and an AI-drafted rule pack — all reviewed live with your stewards.", pill: "Book a profiling session" },
    },
    features: [
      { title: "AutoMap type detection", body: "Every column tagged with its inferred type plus a 0–100% confidence score, cross-validated against your taxonomy registry." },
      { title: "Per-column statistical profile", body: "Null rate, cardinality, distinctness, distribution skew, and length statistics — computed deterministically in one pass." },
      { title: "Format parse-rate matrix", body: "Email, phone, date, currency, UOM, fiscal period — each checked against the deterministic parser, each given a per-column pass rate." },
      { title: "Business Rules Suggestion", body: "CleanAI drafts deterministic validation rules from the profile — ready for steward review, never auto-deployed to production." },
      { title: "Key & relationship candidates", body: "Primary keys, unique candidates, and inferred foreign-key links — surfaced with evidence, requiring explicit approval." },
      { title: "Cross-batch drift detection", body: "Run the same profile on the next batch; receive a column-by-column drift report so schema changes never reach the warehouse silently." },
    ],
    outcome: {
      stat: "11+",
      statLabel: "metrics per column",
      quote: "Profiling turns a five-minute spreadsheet open into a steward-grade report the entire data org can act on.",
    },
  },

  quality: {
    slug: "quality",
    eyebrow: "DATA QUALITY",
    title: "Confidence in every record.",
    titleEm: "Auditable by default",
    subhead:
      "CleanDataShield enforces 34 deterministic validation rules across format, mandatory fields, cross-column logic, and injection safety. Business Rules Suggestion compiles plain-English requirements into reviewable deterministic checks. Every fix routes through the Quarantine Editor with approval-based, version-controlled remediation.",
    statement: "Validate what's real. Correct what's broken. Quarantine the rest.",
    pillars: [
      { icon: "list-check", label: "CleanDataShield rule library", body: "R1–R34 enforce format, mandatory fields, cross-column logic, and injection safety — registered, versioned, and deterministically applied." },
      { icon: "spark",      label: "Business Rules Suggestion", body: "Describe an edge case in plain English. CleanAI compiles a deterministic check that your stewards review and approve before it touches production." },
      { icon: "wrench",     label: "Quarantine Editor + approvals", body: "Safe corrections auto-apply. Anything unsafe routes to the Quarantine Editor for approval-based, version-controlled remediation." },
    ],
    hasPipeline: true,
    howItWorks: [
      { n: "01", title: "Profile", body: "Columns are measured and typed before the first rule fires." },
      { n: "02", title: "Validate", body: "34 deterministic rules plus your custom ones execute across every record." },
      { n: "03", title: "Score", body: "Overall DQ score plus per-column breakdown with rule-level attribution." },
      { n: "04", title: "Fix or quarantine", body: "Safe fixes auto-apply; the rest go to the Quarantine Editor for team review." },
    ],
    visual: {
      eyebrow: "RULE MATRIX",
      title: "One DQ score. Every record traced to a rule.",
      sub: "CleanAI runs the deterministic rule library across every batch, rolls results into a score, and attributes each fix to the rule that triggered it.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Preset rule packs — with room for your own.",
      caption: "Settings Configuration · default quality presets, policy controls, lookups, and hygiene thresholds.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.18.51%20(1).jpeg",
      alt: "CleanFlowAI settings configuration with default data quality rules, policies, lookups, and hygiene thresholds",
    },
    accent: { hue: "#3A5A94", glow: "rgba(58, 90, 148, 0.36)", signature: "✓" },
    layout: {
      order: ["statement", "pillars", "pipeline", "product", "features", "outcome", "related", "cta"],
      pillars:  { eyebrow: "THE THREE LAYERS OF QUALITY",  title: "Rules, reviewers,", titleEm: "and a paper trail" },
      features: { eyebrow: "THE QUALITY SUITE",            title: "Every safeguard your", titleEm: "data team will verify" },
      related:  { eyebrow: "QUALITY ACROSS THE STACK",     title: "Where rule attribution", titleEm: "lives next" },
      cta:      { headline: "Score the data your", em: "compliance team is asking about", sub: "We'll run CleanDataShield against an anonymised sample, surface every rule fire, and walk through the Quarantine Editor with your team.", pill: "Run a DQ score on your data" },
    },
    features: [
      { title: "CleanDataShield rule library", body: "R1–R34 cover the format and integrity checks every data team rewrites. Inherited deterministically, versioned, and rule-attributed at the record level." },
      { title: "Business Rules Suggestion", body: "Plain-English rule definitions compiled by CleanAI into deterministic checks — your stewards review, approve, and version each one before deployment." },
      { title: "Cross-column logic", body: "Relational rules: start_date < end_date, totals match line items, status codes align with timestamps — declared once, enforced everywhere." },
      { title: "Version-controlled edit history", body: "Every Quarantine Editor edit and every auto-fix carries the rule identifier, the actor, the before/after state, and a permanent version pointer." },
      { title: "Quarantine Editor + approval flow", body: "Unsafe records route to a spreadsheet-style review grid. Approval-based editing with inline rule explanations and reviewer sign-off before re-entry." },
      { title: "Zero arbitrary code", body: "CleanAI drafts. Humans approve. CleanDataShield executes registered templates only — no surprise transforms, no shadow logic in production." },
    ],
    outcome: {
      stat: "100%",
      statLabel: "rule-attributed fixes",
      quote: "Every correction in our pipeline carries its rule ID. Compliance review collapsed from days to minutes.",
    },
  },

  transformation: {
    slug: "transformation",
    eyebrow: "DATA TRANSFORMATION",
    title: "Any schema,",
    titleEm: "into any target",
    subhead:
      "AutoMap suggests source-to-target field mappings with confidence scoring; your stewards approve before deployment. Saved transform blueprints are version-controlled, named, and re-runnable. Type coercion, structural reshape, and format conversion execute deterministically — never as ad-hoc scripts.",
    statement: "One source, many destinations. Mapped, not migrated manually.",
    pillars: [
      { icon: "map-link",   label: "AutoMap field resolution", body: "AutoMap inspects column names, sample values, and downstream taxonomies to propose target fields with confidence scores — your stewards approve, override, or refine." },
      { icon: "layers",     label: "Version-controlled blueprints", body: "Every mapping, rename, coercion, and reshape is captured in a named blueprint — versioned, re-runnable, and rolled back with one click." },
      { icon: "lock-square",label: "Deterministic execution", body: "Every transform is a registered operation. No arbitrary code, no hidden logic, no shadow scripts in production." },
    ],
    hasPipeline: false,
    visual: {
      eyebrow: "SCHEMA MAP",
      title: "Source to target, resolved in one view.",
      sub: "CleanAI suggests field-level mappings with confidence scores. You approve the ones that matter, override the ones that don't, and save the rest as a reusable blueprint.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Cleaned data, ready for the next system.",
      caption: "Dataset preview · post-transform records, with rule-flagged cells highlighted for reviewer attention.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.21.18%20(1).jpeg",
      alt: "CleanFlowAI dataset preview showing cleaned customer data with rule-flagged cells highlighted",
    },
    accent: { hue: "#2A4477", glow: "rgba(42, 68, 119, 0.38)", signature: "⇄" },
    layout: {
      order: ["statement", "product", "pillars", "features", "outcome", "related", "cta"],
      pillars:  { eyebrow: "WHAT MAKES IT DETERMINISTIC", title: "Transformation without", titleEm: "the script graveyard" },
      features: { eyebrow: "UNDER THE HOOD",              title: "The reshape primitives", titleEm: "your stewards approve" },
      related:  { eyebrow: "TRANSFORMATION'S NEIGHBOURS", title: "Where mapped data", titleEm: "ends up next" },
      cta:      { headline: "Map the schema that", em: "broke last quarter", sub: "Bring your messiest source-to-target gap. We'll run AutoMap live, walk through the proposed mappings, and save the result as a versioned blueprint.", pill: "Map my hardest schema" },
    },
    features: [
      { title: "AutoMap inference engine", body: "Column names, sample values, and target-side taxonomy weighed together — proposed mappings ship with confidence scores for steward approval." },
      { title: "Approval-based deployment", body: "No mapping enters production without sign-off. Every change is captured, attributable, and reversible." },
      { title: "Type coercion with audit", body: "Text → number → date conversions execute as registered, logged operations — never silent parser drift." },
      { title: "Structural reshape operators", body: "Flatten nested structures, split or merge columns, pivot — each operation a named, versioned blueprint step." },
      { title: "Universal format conversion", body: "CSV, Excel, JSON, Parquet — any registered input shape into any target shape the destination accepts." },
      { title: "Versioned transform blueprints", body: "Saved blueprints are first-class artifacts: named, version-controlled, and re-runnable across every dataset from a given source." },
    ],
    outcome: {
      stat: "0",
      statLabel: "custom scripts to maintain",
      quote: "We replaced a 1,200-line mapping script with a versioned transform blueprint. Onboarding a new team takes an afternoon, not a quarter.",
    },
  },

  migration: {
    slug: "migration",
    eyebrow: "DATA MIGRATION",
    title: "Move data between",
    titleEm: "the systems you already use",
    subhead:
      "Guided OAuth onboarding for accounting platforms, warehouses, cloud drives, and third-party APIs. Real-time Jobs with stateful incremental sync, AutoMap field resolution at the boundary, self-healing orchestration, and full audit lineage on every run.",
    statement: "Zero-config OAuth. Incremental by default. Auditable forever.",
    pillars: [
      { icon: "plug",       label: "Guided OAuth onboarding", body: "Authenticate the third-party system in a single browser flow. Most connectors require zero technical configuration and zero stored API keys." },
      { icon: "refresh",    label: "Real-time Jobs orchestration", body: "Jobs maintain per-entity high-water marks, sync only deltas, retry deterministically, and auto-pause on repeated failure with operator alerting." },
      { icon: "arrows-bidi",label: "Bidirectional flows", body: "Import, validate, and push back to the source — or route into a separate warehouse — with per-entity routing rules." },
    ],
    hasPipeline: true,
    howItWorks: [
      { n: "01", title: "Connect", body: "Authorize the source system via OAuth in your browser — no API keys, no manual config." },
      { n: "02", title: "Map", body: "Choose which entities to sync and how often — customers, invoices, products, transactions." },
      { n: "03", title: "Validate", body: "Every batch passes through profiling and validation before it lands at the target." },
      { n: "04", title: "Automate", body: "Schedule the job to run on any cadence. Auto-pause on failure, alert on recovery." },
    ],
    visual: {
      eyebrow: "CONNECTOR GRID",
      title: "Every system linked. Only the deltas move.",
      sub: "CleanAI tracks what shipped last, syncs only what changed, and auto-pauses on repeated failure — so your pipeline stays steady without constant babysitting.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Guided OAuth. Source and entity in a single dialog.",
      caption: "Unified Bridge · connect to a source system, pick the entity, set a window — import runs in the background.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.18.50.jpeg",
      alt: "CleanFlowAI unified bridge dialog connecting to a source system with entity selection",
    },
    accent: { hue: "#1E3A6E", glow: "rgba(42, 68, 119, 0.42)", signature: "⟶" },
    layout: {
      order: ["statement", "pipeline", "pillars", "product", "features", "outcome", "related", "cta"],
      pillars:  { eyebrow: "WHAT THE CONNECTORS DELIVER", title: "Less plumbing.", titleEm: "More signal" },
      features: { eyebrow: "THE CONNECTOR LIBRARY",       title: "What ships when", titleEm: "you press connect" },
      related:  { eyebrow: "MIGRATION'S NEIGHBOURS",      title: "The disciplines a sync", titleEm: "feeds into" },
      cta:      { headline: "Connect the system your", em: "team avoids touching", sub: "Authorize a source in your browser, watch CleanFlowAI propose mappings, and run the first incremental sync against your warehouse — all in one session.", pill: "Connect a live source" },
    },
    features: [
      { title: "Live connector library", body: "Production-tested OAuth connectors — accounting platforms, warehouses, CRMs, cloud drives — with the catalog expanding on a release cadence." },
      { title: "Stateful incremental Jobs", body: "Per-entity high-water marks; only new or changed records move each run. Full Job history retained, no duplicate loads, no manual diffs." },
      { title: "Entity-scoped control", body: "Sync customers without invoices, or products without line items. Job scope defined per entity, per cadence." },
      { title: "Self-healing orchestration", body: "Repeated failures auto-pause the Job and alert the operator — instead of silently continuing to write bad data downstream." },
      { title: "AutoMap at the boundary", body: "AutoMap proposes source-to-warehouse field mappings on first connect; reviewers approve once, then every run inherits the mapping." },
      { title: "Universal ingest fallback", body: "No native connector yet? Drop a dataset, mount a cloud drive, or call any registered third-party API — same Jobs framework, same lineage." },
    ],
    outcome: {
      stat: "< 60s",
      statLabel: "to authenticate a new source",
      quote: "We onboarded our accounting system and our warehouse in under ten minutes — no engineering ticket, no API keys, no hand-coded sync.",
    },
  },

  modernization: {
    slug: "modernization",
    eyebrow: "DATA MODERNIZATION",
    title: "Modernization without",
    titleEm: "the migration project",
    subhead:
      "Drop a legacy spreadsheet. CleanAI normalizes character encoding, resolves schema drift against your registered baseline, and emits a columnar payload ready for warehouse ingest. Every batch is version-controlled, every transform is rule-attributed, every modernization is reproducible.",
    statement: "Encodings normalized. Schemas stabilized. Outputs warehouse-ready.",
    pillars: [
      { icon: "language", label: "Encoding & dialect normalization", body: "UTF-8, Latin-1, Windows-1252, BOM markers, regional delimiters — detected and converted deterministically before validation runs." },
      { icon: "diff",     label: "Schema drift reconciliation", body: "Columns added, dropped, or renamed between batches are flagged against your baseline schema and resolved through the approval flow." },
      { icon: "cube",     label: "Warehouse-native output", body: "Parquet, JSON, or columnar payload optimized for ingest — 70%+ smaller than source xlsx, fully steward-approved." },
    ],
    hasPipeline: false,
    visual: {
      eyebrow: "LEGACY → MODERN",
      title: "Thirty years of legacy datasets, in one pipeline.",
      sub: "CleanAI normalizes encoding, resolves schema drift, and emits a clean columnar payload — shaped for the warehouses your team already runs on.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Swap legacy imports for a modern API connection.",
      caption: "Live connector · ingest structured entities directly, skipping the spreadsheet round-trip.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.18.51%20(2).jpeg",
      alt: "CleanFlowAI live connector ingesting structured entities from a modern source system",
    },
    accent: { hue: "#5A7FB5", glow: "rgba(120, 160, 220, 0.32)", signature: "◆" },
    layout: {
      order: ["statement", "pillars", "product", "features", "outcome", "related", "cta"],
      pillars:  { eyebrow: "WHAT GETS UNTANGLED",     title: "Legacy in.", titleEm: "Columnar out" },
      features: { eyebrow: "THE MODERNIZATION TOOLKIT", title: "Legacy formats,", titleEm: "normalized invisibly" },
      related:  { eyebrow: "WHAT MODERNIZATION CLEARS", title: "The disciplines this", titleEm: "unblocks downstream" },
      cta:      { headline: "Send the spreadsheet that", em: "should have been a table years ago", sub: "Drop us a sample legacy dataset. We'll run encoding detection, schema reconciliation, and emit a warehouse-ready Parquet payload during the call.", pill: "Modernize a legacy dataset" },
    },
    features: [
      { title: "Encoding + dialect detection", body: "UTF-8, Latin-1, Windows-1252, BOM markers, regional separators — detected by CleanAI and normalized before validation runs." },
      { title: "Schema drift reconciliation", body: "Added, dropped, or renamed columns are diffed against your registered baseline and routed through the approval flow before merge." },
      { title: "Columnar warehouse export", body: "Parquet output optimized for warehouse ingest — typically 70%+ smaller than the source xlsx, with embedded schema metadata." },
      { title: "Stream-ready payloads", body: "Warehouse-native formats that ingest cleanly into any columnar destination your team already operates." },
      { title: "Legacy delimiter handling", body: "Tab-separated, pipe-delimited, fixed-width, semicolon-delimited — all routed through the same registered ingest flow." },
      { title: "Version-controlled transform history", body: "Every legacy→modern transform is captured with before/after samples, version pointers, and reproducible replay metadata." },
    ],
    outcome: {
      stat: "74%",
      statLabel: "smaller output vs source",
      quote: "We stopped running a legacy-to-cloud migration project. CleanFlowAI makes every batch cloud-ready in place.",
    },
  },

  security: {
    slug: "security",
    eyebrow: "DATA SECURITY",
    title: "Trust is table stakes.",
    titleEm: "We take it literally",
    subhead:
      "CleanDataShield is the deterministic execution layer — only registered, version-controlled rule templates run in production. Identity-scoped authentication with optional MFA, approval-based change controls, time-limited signed URLs, and immutable audit trails on every Job, edit, and approval. SOC 2 Type II in progress. 99.9% uptime SLA.",
    statement: "Every action authorized. Every artefact encrypted. Every remediation logged.",
    pillars: [
      { icon: "id-badge",    label: "Identity-scoped access", body: "Every API call carries the requester's identity. MFA available on demand and enforced for privileged tiers, audited end-to-end." },
      { icon: "users-shield",label: "Approval-based workflows", body: "Privileged actions — rule deployment, schema changes, quarantine resolution — route through reviewer sign-off enforced at the API gateway, never client-side, never bypassable." },
      { icon: "lock-check",  label: "CleanDataShield enforcement", body: "Only registered rule templates execute. No arbitrary code from users or AI ever reaches production data paths." },
    ],
    hasPipeline: false,
    visual: {
      eyebrow: "ACCESS MATRIX",
      title: "Who can do what, visible at a glance.",
      sub: "CleanAI enforces four role tiers at the API layer and writes every decision — approved, denied, escalated — into an immutable audit log your reviewers can read.",
    },
    product: {
      eyebrow: "IN THE PLATFORM",
      title: "Every artefact, a fully-traced audit record.",
      caption: "Artefact provenance · ingest ID, engine version, timeline, quality score — immutable, per-artefact.",
      src: "/cleanflowimgs/WhatsApp%20Image%202026-04-19%20at%2023.21.18.jpeg",
      alt: "CleanFlowAI artefact provenance panel showing ingest ID, engine version, timeline, and quality score",
    },
    accent: { hue: "#0F1F3F", glow: "rgba(20, 30, 48, 0.6)", signature: "◉" },
    layout: {
      order: ["statement", "pillars", "features", "product", "outcome", "related", "cta"],
      pillars:  { eyebrow: "THE SECURITY POSTURE",         title: "Trust earned by enforcement,", titleEm: "not by promise" },
      features: { eyebrow: "WHAT YOUR REVIEWER VERIFIES",  title: "The security primitives,", titleEm: "line by line" },
      related:  { eyebrow: "WHERE THE PERIMETER EXTENDS",  title: "Disciplines that inherit", titleEm: "the trust layer" },
      cta:      { headline: "Brief our security team", em: "before procurement does", sub: "Send your CISO. We'll walk through CleanDataShield enforcement, Quarantine Editor approval flow, and the immutable audit trail with the architecture diagrams in front of you.", pill: "Brief our security team" },
    },
    features: [
      { title: "Identity & MFA", body: "Email + password authentication, email verification on enrollment, and TOTP-based MFA available across all tiers — enforced where your governance requires it." },
      { title: "Approval-based change control", body: "Rule deployments, schema reconciliations, and quarantine remediations all route through reviewer sign-off — captured, attributed, and replayable from the audit log." },
      { title: "Time-limited signed URLs", body: "Every artefact access uses a short-lived signed URL scoped to the requesting identity. Storage credentials never leave the server boundary." },
      { title: "CleanDataShield enforcement", body: "AI drafts rule definitions; stewards approve; CleanDataShield executes registered templates only. No arbitrary code, ever." },
      { title: "Immutable Jobs + edit log", body: "Every Job, every Quarantine Editor edit, every approval — timestamped, actor-attributed, and stored with full before/after state plus rule lineage." },
      { title: "Compliance posture", body: "SOC 2 Type II in progress. GDPR-aligned. 99.9% uptime SLA on encrypted at-rest storage with redundant failover." },
    ],
    outcome: {
      stat: "0",
      statLabel: "arbitrary code paths in production",
      quote: "Our security review cleared CleanFlowAI in one session. Deterministic execution meant there was no attack surface to debate.",
    },
  },
}

/* Sibling nav order — used for the "related capabilities" strip */
const ORDER = ["profiling", "quality", "transformation", "migration", "modernization", "security"]

/* Short blurbs for the dropdown (kept in sync across all pages) */
const SHORT_BLURBS: Record<string, string> = {
  profiling:      "AutoMap type inference, statistical fingerprinting, AI-drafted rule suggestions.",
  quality:        "CleanDataShield rules, Quarantine Editor, approval-based remediation.",
  transformation: "AutoMap field resolution, version-controlled blueprints, deterministic execution.",
  migration:      "OAuth connectors, real-time Jobs, stateful incremental sync.",
  modernization:  "Encoding normalization, schema-drift reconciliation, warehouse-native output.",
  security:       "Identity-scoped access, approval-based change control, immutable audit lineage.",
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function CapabilityPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const reduced = useReducedMotion()

  const data = slug ? CAPABILITIES[slug] : undefined
  if (!data) {
    if (typeof window !== "undefined") notFound()
    return null
  }

  const related = ORDER.filter((s) => s !== data.slug).slice(0, 3).map((s) => CAPABILITIES[s])

  const rise = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 24 },
    whileInView: reduced ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <div
      className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} cp-root`}
      style={{
        ["--cp-accent" as string]: data.accent.hue,
        ["--cp-accent-glow" as string]: data.accent.glow,
      } as React.CSSProperties}
      data-slug={data.slug}
    >
      <SiteNav />

      <main className="cp-main">
        {/* ───── HERO ───── */}
        <section className="cp-hero">
          <div className="cp-hero-bg" aria-hidden>
            <div className="cp-hero-grid" />
            <div className="cp-hero-glow" />
            <div className="cp-hero-glow cp-hero-glow-2" />
            <div className="cp-hero-glow cp-hero-glow-3" />
            <div className="cp-hero-sweep" />
          </div>

          <span className="cp-hero-signature" aria-hidden>{data.accent.signature}</span>
          <div className="cp-container cp-hero-grid">
            <div className="cp-hero-body">
              <motion.span className="cp-eyebrow" {...rise(0.1)}>
                {data.eyebrow}
              </motion.span>

              <motion.h1 className="cp-h1" {...rise(0.2)}>
                {data.title} <br />
                <span className="cp-h1-em">{data.titleEm}</span>.
              </motion.h1>

              <motion.p className="cp-lede" {...rise(0.35)}>
                {data.subhead}
              </motion.p>
            </div>

            <motion.div className="cp-hero-stage" {...rise(0.45)}>
              <div className="cp-hero-stage-glow" aria-hidden />
              <div className="cp-hero-stage-frame">
                <div className="cp-hero-stage-chrome">
                  <span className="cp-hero-stage-dot cp-hero-stage-dot-r" />
                  <span className="cp-hero-stage-dot cp-hero-stage-dot-y" />
                  <span className="cp-hero-stage-dot cp-hero-stage-dot-g" />
                  <span className="cp-hero-stage-tab">{data.visual.eyebrow}</span>
                </div>
                <div className="cp-hero-stage-body">
                  <CapabilityVisual slug={data.slug} />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── PER-SLUG ORDERED SECTIONS ───── */}
        {data.layout.order.map((sectionId) => {
          if (sectionId === "statement") {
            return (
              <section key="statement" className="cp-statement">
                <div className="cp-container">
                  <motion.p {...rise(0.05)}>
                    <span className="cp-statement-quote">“</span>
                    {data.statement}
                  </motion.p>
                </div>
              </section>
            )
          }

          if (sectionId === "pillars") {
            const head = data.layout.pillars
            return (
              <section key="pillars" className="cp-pillars">
                <div className="cp-container">
                  <motion.div className="cp-section-head" {...rise(0.05)}>
                    <span className="cp-tag">{head.eyebrow}</span>
                    <h2 className="cp-h2">
                      {head.title} <span className="cp-h2-em">{head.titleEm}</span>.
                    </h2>
                  </motion.div>
                  <div className="cp-pillars-grid">
                    {data.pillars.map((p, i) => (
                      <motion.div key={p.label} className="cp-pillar" {...rise(0.1 + i * 0.08)}>
                        <div className="cp-pillar-icon" aria-hidden>
                          <PillarIcon name={p.icon} />
                        </div>
                        <span className="cp-pillar-num">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="cp-pillar-label">{p.label}</h3>
                        <p className="cp-pillar-body">{p.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          if (sectionId === "product") {
            return (
              <section key="product" className="cp-product">
                <div className="cp-product-bg" aria-hidden>
                  <div className="cp-product-grid" />
                  <div className="cp-product-glow-a" />
                  <div className="cp-product-glow-b" />
                </div>
                <div className="cp-container">
                  <motion.div className="cp-section-head cp-product-head" {...rise(0.05)}>
                    <span className="cp-tag cp-tag-light">{data.product.eyebrow}</span>
                    <h2 className="cp-h2 cp-h2-light">{data.product.title}</h2>
                    <p className="cp-product-sub">{data.visual.sub}</p>
                  </motion.div>
                  <motion.figure className="cp-product-frame" {...rise(0.12)}>
                    <div className="cp-product-chrome">
                      <span className="cp-product-dot cp-product-dot-r" />
                      <span className="cp-product-dot cp-product-dot-y" />
                      <span className="cp-product-dot cp-product-dot-g" />
                      <span className="cp-product-url">app.cleanflowai.com</span>
                    </div>
                    <img
                      src={data.product.src}
                      alt={data.product.alt}
                      loading="lazy"
                      decoding="async"
                      className="cp-product-img"
                    />
                    <figcaption className="cp-product-cap">{data.product.caption}</figcaption>
                  </motion.figure>
                </div>
              </section>
            )
          }

          if (sectionId === "pipeline" && data.hasPipeline && data.howItWorks) {
            const pipelineHeads: Record<string, { eyebrow: string; title: string; em: string }> = {
              quality: { eyebrow: "THE FOUR-STAGE LOOP", title: "From ingest to ship-ready,", em: "every step traced" },
              migration: { eyebrow: "THE CONNECT-AND-SYNC FLOW", title: "From OAuth to incremental delta,", em: "in four moves" },
            }
            const pHead = pipelineHeads[data.slug] ?? { eyebrow: "HOW IT WORKS", title: "A pipeline you can", em: "read end to end" }
            return (
              <section key="pipeline" className="cp-how">
                <div className="cp-container">
                  <motion.div className="cp-section-head cp-section-head-dark" {...rise(0.05)}>
                    <span className="cp-tag cp-tag-light">{pHead.eyebrow}</span>
                    <h2 className="cp-h2 cp-h2-light">
                      {pHead.title} <span className="cp-h2-em-light">{pHead.em}</span>.
                    </h2>
                  </motion.div>
                  <div className="cp-how-steps">
                    {data.howItWorks.map((s, i) => (
                      <motion.div key={s.n} className="cp-how-step" {...rise(0.1 + i * 0.08)}>
                        <span className="cp-how-n">{s.n}</span>
                        <h3 className="cp-how-title">{s.title}</h3>
                        <p className="cp-how-body">{s.body}</p>
                        {i < data.howItWorks!.length - 1 && (
                          <span className="cp-how-connector" aria-hidden>
                            <svg viewBox="0 0 72 14" width="72" height="14" fill="none">
                              <line x1="4" y1="7" x2="60" y2="7" stroke="rgba(160, 196, 240, 0.45)" strokeWidth="1.5" strokeDasharray="3 3" />
                              <path d="M 58 2 L 66 7 L 58 12" stroke="#a0c4f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          if (sectionId === "features") {
            const head = data.layout.features
            return (
              <section key="features" className="cp-features">
                <div className="cp-container">
                  <motion.div className="cp-section-head" {...rise(0.05)}>
                    <span className="cp-tag">{head.eyebrow}</span>
                    <h2 className="cp-h2">
                      {head.title} <span className="cp-h2-em">{head.titleEm}</span>.
                    </h2>
                  </motion.div>
                  <div className="cp-features-grid">
                    {data.features.map((f, i) => (
                      <motion.article key={f.title} className="cp-feature" {...rise(0.08 + i * 0.05)}>
                        <span className="cp-feature-dot" aria-hidden />
                        <h3 className="cp-feature-title">{f.title}</h3>
                        <p className="cp-feature-body">{f.body}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          if (sectionId === "outcome") {
            return (
              <section key="outcome" className="cp-outcome">
                <div className="cp-container">
                  <motion.div className="cp-outcome-card" {...rise(0.05)}>
                    <div className="cp-outcome-stat">
                      <span className="cp-outcome-num">{data.outcome.stat}</span>
                      <span className="cp-outcome-label">{data.outcome.statLabel}</span>
                    </div>
                    <blockquote className="cp-outcome-quote">
                      <span className="cp-outcome-q">“</span>
                      {data.outcome.quote}
                    </blockquote>
                  </motion.div>
                </div>
              </section>
            )
          }

          if (sectionId === "related") {
            const head = data.layout.related
            return (
              <section key="related" className="cp-related">
                <div className="cp-container">
                  <motion.div className="cp-section-head" {...rise(0.05)}>
                    <span className="cp-tag">{head.eyebrow}</span>
                    <h2 className="cp-h2">
                      {head.title} <span className="cp-h2-em">{head.titleEm}</span>.
                    </h2>
                  </motion.div>
                  <div className="cp-related-grid">
                    {related.map((r, i) => (
                      <motion.div key={r.slug} {...rise(0.1 + i * 0.06)} className="cp-related-wrap">
                        <Link href={`/capabilities/${r.slug}`} className="cp-related-card">
                          <div className="cp-related-icon" aria-hidden>
                            <CapabilityIcon slug={r.slug} />
                          </div>
                          <span className="cp-related-tag">{r.eyebrow}</span>
                          <h3 className="cp-related-title">
                            {r.title}{" "}
                            <span className="cp-related-title-em">{r.titleEm}</span>.
                          </h3>
                          <span className="cp-related-arrow" aria-hidden>→</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          if (sectionId === "cta") {
            return <SiteCta key="cta" />
          }

          return null
        })}

      </main>

      <SiteFooter />
      <SiteChromeStyles />
      <StyleBlock />
    </div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 12" width="22" height="11" aria-hidden>
      <path d="M0 6 H 22 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PER-CAPABILITY ANIMATED VISUALS
   ═══════════════════════════════════════════════════════════════ */

function CapabilityVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "profiling":     return <ProfilingMock />
    case "quality":       return <QualityMock />
    case "transformation":return <TransformMock />
    case "migration":     return <MigrationMock />
    case "modernization": return <ModernizationMock />
    case "security":      return <SecurityMock />
    default:              return null
  }
}

/* ═══════════════════════════════════════════════════════════════
   PILLAR ICONS (3 per capability, Ataccama-style)
   ═══════════════════════════════════════════════════════════════ */

function PillarIcon({ name }: { name: string }) {
  const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (name) {
    case "type-abc":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M17.5 17.5 L 23.5 23.5" strokeWidth="2" />
          <path d="M9 15 L 11.8 8.5 L 14.6 15 M 10 13 H 13.6" strokeWidth="1.5" />
        </svg>
      )
    case "bars-stats":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M5 23 H 23" />
          <rect x="6"  y="15" width="3.4" height="7" rx="0.6" />
          <rect x="11.8" y="9" width="3.4" height="13" rx="0.6" />
          <rect x="17.6" y="12" width="3.4" height="10" rx="0.6" />
          <path d="M5.5 5.5 L 12 9 L 18 7 L 22.5 5" opacity="0.55" />
        </svg>
      )
    case "key":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <circle cx="9" cy="14" r="5" />
          <path d="M14 14 H 24 M 21 14 V 18 M 17.5 14 V 17" />
          <circle cx="9" cy="14" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case "list-check":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <rect x="4.5" y="4.5" width="19" height="19" rx="3" />
          <path d="M8.5 10.5 L 10.5 12.5 L 14.5 8.5" strokeWidth="1.9" />
          <path d="M16 11 H 20" />
          <path d="M8.5 17 L 10.5 19 L 14.5 15" strokeWidth="1.9" />
          <path d="M16 18 H 20" />
        </svg>
      )
    case "spark":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M10 4 L 11.5 8.5 L 16 10 L 11.5 11.5 L 10 16 L 8.5 11.5 L 4 10 L 8.5 8.5 Z" />
          <path d="M20 15 L 20.9 17.6 L 23.5 18.5 L 20.9 19.4 L 20 22 L 19.1 19.4 L 16.5 18.5 L 19.1 17.6 Z" opacity="0.7" />
        </svg>
      )
    case "wrench":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M18.5 4 A 5 5 0 0 0 12.8 10.5 L 4 19.3 V 24 H 8.7 L 17.5 15.2 A 5 5 0 0 0 24 9.5 L 20.5 13 L 16 11.5 L 14.5 7 Z" />
        </svg>
      )
    case "map-link":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <circle cx="7" cy="8" r="2" />
          <circle cx="7" cy="20" r="2" />
          <circle cx="21" cy="8" r="2" />
          <circle cx="21" cy="20" r="2" />
          <path d="M9 8 H 19" />
          <path d="M9 20 H 19" />
          <path d="M9 9 C 14 9, 14 19, 19 19" opacity="0.45" strokeDasharray="2 2" />
        </svg>
      )
    case "layers":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M14 4.5 L 24 9 L 14 13.5 L 4 9 Z" />
          <path d="M4 14 L 14 18.5 L 24 14" opacity="0.7" />
          <path d="M4 19 L 14 23.5 L 24 19" opacity="0.45" />
        </svg>
      )
    case "lock-square":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <rect x="6.5" y="12" width="15" height="11" rx="2" />
          <path d="M 9.5 12 V 9 A 4.5 4.5 0 0 1 18.5 9 V 12" />
          <circle cx="14" cy="17" r="1.3" fill="currentColor" stroke="none" />
          <path d="M14 17 V 19.5" strokeWidth="1.8" />
        </svg>
      )
    case "plug":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M11 9 H 6.5 A 5 5 0 0 0 6.5 19 H 11" strokeWidth="1.8" />
          <path d="M17 9 H 21.5 A 5 5 0 0 1 21.5 19 H 17" strokeWidth="1.8" />
          <path d="M10 14 H 18" strokeWidth="1.8" />
        </svg>
      )
    case "refresh":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M23 12 A 9 9 0 0 0 7.5 8 M 5 6 V 10 H 9" />
          <path d="M5 16 A 9 9 0 0 0 20.5 20 M 23 22 V 18 H 19" />
        </svg>
      )
    case "arrows-bidi":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M4 10 H 22 M 18 6 L 22 10 L 18 14" />
          <path d="M24 18 H 6 M 10 14 L 6 18 L 10 22" />
        </svg>
      )
    case "language":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <circle cx="14" cy="14" r="10" />
          <path d="M4 14 H 24" />
          <path d="M14 4 C 19 9, 19 19, 14 24 C 9 19, 9 9, 14 4" />
        </svg>
      )
    case "diff":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M9 4 V 14 M 4 9 H 14" strokeWidth="1.9" />
          <path d="M17 23 H 25" strokeWidth="1.9" />
          <rect x="3.5" y="17" width="11" height="8" rx="1.5" opacity="0.45" strokeDasharray="2 2" />
          <rect x="14.5" y="3" width="11" height="8" rx="1.5" opacity="0.45" strokeDasharray="2 2" />
        </svg>
      )
    case "cube":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M14 3.5 L 23.5 8.5 V 19.5 L 14 24.5 L 4.5 19.5 V 8.5 Z" />
          <path d="M4.5 8.5 L 14 13.5 L 23.5 8.5" />
          <path d="M14 13.5 V 24.5" />
        </svg>
      )
    case "id-badge":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <rect x="5" y="6" width="18" height="17" rx="2" />
          <path d="M11 3 H 17 V 6 H 11 Z" />
          <circle cx="14" cy="13" r="2.5" />
          <path d="M9.5 20 C 9.5 17.5, 11.5 16.5, 14 16.5 C 16.5 16.5, 18.5 17.5, 18.5 20" />
        </svg>
      )
    case "users-shield":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <path d="M14 3 L 23 6 V 14 C 23 19, 19 22, 14 24 C 9 22, 5 19, 5 14 V 6 Z" />
          <circle cx="14" cy="11.5" r="2.4" />
          <path d="M10 18 C 10 15.5, 11.8 14.5, 14 14.5 C 16.2 14.5, 18 15.5, 18 18" />
        </svg>
      )
    case "lock-check":
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <rect x="6.5" y="12" width="15" height="11" rx="2" />
          <path d="M 9.5 12 V 9 A 4.5 4.5 0 0 1 18.5 9 V 12" />
          <path d="M10.5 17.5 L 13 20 L 17.5 15.5" strokeWidth="1.9" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 28 28" width="26" height="26" {...P} aria-hidden>
          <circle cx="14" cy="14" r="10" />
        </svg>
      )
  }
}

/* ═══════════════════════════════════════════════════════════════
   LIVE ICONS (for related-capability cards)
   ═══════════════════════════════════════════════════════════════ */

function CapabilityIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "profiling":      return <IconProfiling />
    case "quality":        return <IconQuality />
    case "transformation": return <IconTransform />
    case "migration":      return <IconMigration />
    case "modernization":  return <IconModern />
    case "security":       return <IconSecurity />
    default:               return null
  }
}

function IconProfiling() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-prof" aria-hidden>
      <rect x="6"  y="24" width="5" height="14" rx="1.2" className="cp-ico-bar" style={{ animationDelay: "0s"   }} />
      <rect x="14" y="14" width="5" height="24" rx="1.2" className="cp-ico-bar" style={{ animationDelay: "0.1s" }} />
      <rect x="22" y="20" width="5" height="18" rx="1.2" className="cp-ico-bar" style={{ animationDelay: "0.2s" }} />
      <rect x="30" y="8"  width="5" height="30" rx="1.2" className="cp-ico-bar" style={{ animationDelay: "0.3s" }} />
      <circle cx="32.5" cy="8" r="2.2" className="cp-ico-pulse" />
    </svg>
  )
}

function IconQuality() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-qual" aria-hidden>
      <path d="M22 4 L 38 10 V 22 C 38 31, 31 37, 22 40 C 13 37, 6 31, 6 22 V 10 L 22 4 Z" fill="none" strokeWidth="1.8" className="cp-ico-shield" />
      <path d="M14 22 L 20 28 L 32 16" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="cp-ico-check" />
    </svg>
  )
}

function IconTransform() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-xform" aria-hidden>
      <circle cx="9"  cy="11" r="3" className="cp-ico-node" />
      <circle cx="9"  cy="22" r="3" className="cp-ico-node" style={{ animationDelay: "0.1s" }} />
      <circle cx="9"  cy="33" r="3" className="cp-ico-node" style={{ animationDelay: "0.2s" }} />
      <circle cx="35" cy="11" r="3" className="cp-ico-node" style={{ animationDelay: "0.3s" }} />
      <circle cx="35" cy="22" r="3" className="cp-ico-node" style={{ animationDelay: "0.4s" }} />
      <circle cx="35" cy="33" r="3" className="cp-ico-node" style={{ animationDelay: "0.5s" }} />
      <path d="M 12 11 C 22 11, 22 33, 32 33" fill="none" strokeWidth="1.3" className="cp-ico-wire" />
      <path d="M 12 22 L 32 22" fill="none" strokeWidth="1.3" className="cp-ico-wire" style={{ animationDelay: "0.2s" }} />
      <path d="M 12 33 C 22 33, 22 11, 32 11" fill="none" strokeWidth="1.3" className="cp-ico-wire" style={{ animationDelay: "0.4s" }} />
    </svg>
  )
}

function IconMigration() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-mig" aria-hidden>
      <circle cx="22" cy="22" r="5" className="cp-ico-hub" />
      <circle cx="22" cy="22" r="10" fill="none" strokeWidth="1.2" className="cp-ico-orbit" />
      <circle cx="22" cy="22" r="16" fill="none" strokeWidth="1" className="cp-ico-orbit-2" />
      <circle cx="22" cy="6"  r="2.4" className="cp-ico-sat" style={{ animationDelay: "0s"   }} />
      <circle cx="38" cy="22" r="2.4" className="cp-ico-sat" style={{ animationDelay: "0.3s" }} />
      <circle cx="22" cy="38" r="2.4" className="cp-ico-sat" style={{ animationDelay: "0.6s" }} />
      <circle cx="6"  cy="22" r="2.4" className="cp-ico-sat" style={{ animationDelay: "0.9s" }} />
    </svg>
  )
}

function IconModern() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-mod" aria-hidden>
      <rect x="4"  y="8"  width="14" height="18" rx="1.5" className="cp-ico-file-old" />
      <path d="M18 8 L 14 8 L 18 12 Z" className="cp-ico-corner" />
      <path d="M 20 22 L 26 22 M 26 22 L 22 18 M 26 22 L 22 26" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="cp-ico-arrow" />
      <rect x="28" y="10" width="12" height="24" rx="1.5" className="cp-ico-file-new" />
      <line x1="30" y1="14" x2="38" y2="14" strokeWidth="1" className="cp-ico-line" />
      <line x1="30" y1="18" x2="38" y2="18" strokeWidth="1" className="cp-ico-line" />
      <line x1="30" y1="22" x2="38" y2="22" strokeWidth="1" className="cp-ico-line" />
      <line x1="30" y1="26" x2="38" y2="26" strokeWidth="1" className="cp-ico-line" />
      <line x1="30" y1="30" x2="38" y2="30" strokeWidth="1" className="cp-ico-line" />
    </svg>
  )
}

function IconSecurity() {
  return (
    <svg viewBox="0 0 44 44" width="44" height="44" className="cp-ico cp-ico-sec" aria-hidden>
      <path d="M22 4 L 36 9 V 21 C 36 30, 30 36, 22 39 C 14 36, 8 30, 8 21 V 9 L 22 4 Z" fill="none" strokeWidth="1.8" className="cp-ico-shield" />
      <rect x="17" y="20" width="10" height="9" rx="1.4" className="cp-ico-lock-body" />
      <path d="M 18.5 20 V 17 A 3.5 3.5 0 0 1 25.5 17 V 20" fill="none" strokeWidth="1.8" strokeLinecap="round" className="cp-ico-lock-shackle" />
      <circle cx="22" cy="24" r="1.2" className="cp-ico-lock-dot" />
    </svg>
  )
}

/* ── shared chrome ── */
function ConsoleFrame({ title, chips, children }: { title: string; chips?: { label: string; tone?: "ok" | "warn" | "info" }[]; children: React.ReactNode }) {
  return (
    <div className="cp-mock">
      <div className="cp-mock-chrome">
        <span className="cp-mock-dot cp-mock-dot-r" />
        <span className="cp-mock-dot cp-mock-dot-y" />
        <span className="cp-mock-dot cp-mock-dot-g" />
        <span className="cp-mock-title">{title}</span>
      </div>
      <div className="cp-mock-body">
        <div className="cp-mock-head">
          <span className="cp-mock-h-label">{title}</span>
          {chips && (
            <div className="cp-mock-chips">
              {chips.map((c, i) => (
                <span key={i} className={`cp-mock-chip cp-mock-chip-${c.tone ?? "info"}`}>{c.label}</span>
              ))}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

/* ── 1. PROFILING — column profile panel ── */
function ProfilingMock() {
  const rows = [
    { name: "customer_id",   type: "INT",     nullPct: 0,   uniqPct: 100, conf: 99, key: true  },
    { name: "email",          type: "EMAIL",   nullPct: 2,   uniqPct: 97,  conf: 98, key: false },
    { name: "signup_date",    type: "DATE",    nullPct: 0,   uniqPct: 42,  conf: 96, key: false },
    { name: "region",         type: "TEXT",    nullPct: 1,   uniqPct: 8,   conf: 94, key: false },
    { name: "plan",           type: "ENUM",    nullPct: 0,   uniqPct: 3,   conf: 97, key: false },
    { name: "lifetime_value", type: "NUMERIC", nullPct: 12,  uniqPct: 84,  conf: 89, key: false },
    { name: "last_login",     type: "DATE",    nullPct: 18,  uniqPct: 73,  conf: 92, key: false },
  ]
  return (
    <ConsoleFrame
      title="Column Profile · customers.csv"
      chips={[{ label: "842,100 records", tone: "info" }, { label: "11 columns", tone: "info" }, { label: "2 keys detected", tone: "ok" }]}
    >
      <div className="cp-prof">
        <div className="cp-prof-head">
          <span>Column</span>
          <span>Type</span>
          <span>Nulls</span>
          <span>Unique</span>
          <span>Confidence</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.name} className="cp-prof-row" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
            <span className="cp-prof-name">
              {r.key && <span className="cp-prof-key" title="Key candidate">◆</span>}
              {r.name}
            </span>
            <span className={`cp-prof-type cp-prof-type-${r.type.toLowerCase()}`}>{r.type}</span>
            <span className="cp-prof-bar">
              <span className="cp-prof-bar-track">
                <span className="cp-prof-bar-fill cp-prof-bar-null" style={{ width: `${r.nullPct}%`, animationDelay: `${0.3 + i * 0.08}s` }} />
              </span>
              <span className="cp-prof-bar-num">{r.nullPct}%</span>
            </span>
            <span className="cp-prof-bar">
              <span className="cp-prof-bar-track">
                <span className="cp-prof-bar-fill cp-prof-bar-uniq" style={{ width: `${r.uniqPct}%`, animationDelay: `${0.35 + i * 0.08}s` }} />
              </span>
              <span className="cp-prof-bar-num">{r.uniqPct}%</span>
            </span>
            <span className="cp-prof-conf">
              <span className="cp-prof-conf-dot" />
              {r.conf}%
            </span>
          </div>
        ))}
        <div className="cp-prof-foot">
          <span>11 metrics per column · scan complete in 2.4s</span>
          <span className="cp-prof-pulse" />
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ── 2. QUALITY — rule matrix + DQ ring ── */
function QualityMock() {
  const rules = [
    { id: "R01", label: "Email format",       pass: 99.7, status: "ok" },
    { id: "R04", label: "Phone E.164",         pass: 98.1, status: "ok" },
    { id: "R07", label: "Mandatory: country",  pass: 100,  status: "ok" },
    { id: "R12", label: "Currency code",       pass: 97.3, status: "warn" },
    { id: "R16", label: "Start < End date",    pass: 99.8, status: "ok" },
    { id: "R23", label: "SQL injection safe",  pass: 100,  status: "ok" },
    { id: "R29", label: "Duplicate invoices",  pass: 96.0, status: "warn" },
    { id: "R34", label: "UOM consistent",      pass: 92.4, status: "warn" },
  ]
  return (
    <ConsoleFrame
      title="Quality Run · invoices.parquet"
      chips={[{ label: "34 rules", tone: "info" }, { label: "842K records scanned", tone: "info" }, { label: "98.4% pass", tone: "ok" }]}
    >
      <div className="cp-qual">
        <div className="cp-qual-score">
          <svg viewBox="0 0 120 120" width="130" height="130" aria-hidden>
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(15,23,41,0.06)" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="52"
              fill="none" stroke="var(--brand)"
              strokeWidth="10" strokeLinecap="round"
              strokeDasharray="326.7"
              strokeDashoffset="5.2"
              transform="rotate(-90 60 60)"
              className="cp-qual-arc"
            />
            <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="cp-qual-score-num">98.4</text>
          </svg>
          <div className="cp-qual-score-labels">
            <span className="cp-qual-score-head">DQ Score</span>
            <span className="cp-qual-score-sub">Auditable · rule-attributed</span>
            <span className="cp-qual-score-stat"><b>829,450</b> passed</span>
            <span className="cp-qual-score-stat cp-qual-score-stat-warn"><b>13,492</b> quarantined</span>
            <span className="cp-qual-score-stat"><b>0</b> arbitrary fixes</span>
          </div>
        </div>
        <div className="cp-qual-rules">
          {rules.map((r, i) => (
            <div key={r.id} className={`cp-qual-rule cp-qual-rule-${r.status}`} style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
              <span className="cp-qual-rule-id">{r.id}</span>
              <span className="cp-qual-rule-label">{r.label}</span>
              <span className="cp-qual-rule-bar">
                <span className="cp-qual-rule-fill" style={{ width: `${r.pass}%`, animationDelay: `${0.3 + i * 0.07}s` }} />
              </span>
              <span className="cp-qual-rule-pct">{r.pass.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ── 3. TRANSFORMATION — schema mapper with per-row connectors ── */
function TransformMock() {
  const maps = [
    { from: "Vendor Name",     to: "supplier",            conf: 97 },
    { from: "Inv #",            to: "invoice_number",      conf: 99 },
    { from: "Bill Date",        to: "issued_at",           conf: 94 },
    { from: "Amount (USD)",     to: "amount",              conf: 91 },
    { from: "Tax %",            to: "tax_rate",            conf: 88 },
    { from: "Notes / Memo",     to: "memo",                conf: 82 },
  ]
  return (
    <ConsoleFrame
      title="Schema Mapper · vendor_export → finance_mart"
      chips={[{ label: "42 fields", tone: "info" }, { label: "6 auto-mapped", tone: "ok" }, { label: "0 scripts", tone: "ok" }]}
    >
      <div className="cp-xform">
        <div className="cp-xform-heads">
          <span className="cp-xform-col-h">SOURCE · vendor_export.csv</span>
          <span />
          <span className="cp-xform-col-h cp-xform-col-h-tgt">TARGET · finance_mart</span>
        </div>
        <div className="cp-xform-rows">
          {maps.map((m, i) => (
            <div key={m.from} className="cp-xform-row" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className="cp-xform-node cp-xform-node-src">
                <span className="cp-xform-node-dot" />
                {m.from}
              </div>
              <span className="cp-xform-wire" aria-hidden>
                <svg viewBox="0 0 80 12" width="100%" height="12" preserveAspectRatio="none">
                  <line x1="2" y1="6" x2="68" y2="6" stroke="rgba(42, 68, 119, 0.28)" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M 65 2 L 72 6 L 65 10" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="cp-xform-node cp-xform-node-tgt">
                <span className="cp-xform-node-name">{m.to}</span>
                <span className={`cp-xform-conf ${m.conf >= 95 ? "cp-xform-conf-hi" : m.conf >= 88 ? "cp-xform-conf-mid" : "cp-xform-conf-lo"}`}>{m.conf}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ── 4. MIGRATION — connector grid with sync badges ── */
function MigrationMock() {
  const conns = [
    { name: "Accounting · Books",   status: "synced",  delta: "+1,248 records", time: "2m ago" },
    { name: "Warehouse · Analytics",status: "running", delta: "streaming…",     time: "now"    },
    { name: "Cloud Drive · Reports",status: "synced",  delta: "+42 datasets",   time: "14m ago"},
    { name: "CRM · Customers",      status: "synced",  delta: "+318 records",   time: "1h ago" },
    { name: "Billing · Invoices",   status: "paused",  delta: "auto-paused",  time: "2h ago" },
    { name: "File inbox · SFTP",    status: "synced",  delta: "+1 batch",     time: "4h ago" },
  ]
  return (
    <ConsoleFrame
      title="Connector Grid · production"
      chips={[{ label: "6 connectors", tone: "info" }, { label: "5 live", tone: "ok" }, { label: "1 paused", tone: "warn" }]}
    >
      <div className="cp-mig">
        <div className="cp-mig-grid">
          {conns.map((c, i) => (
            <div key={c.name} className={`cp-mig-card cp-mig-${c.status}`} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className="cp-mig-card-head">
                <span className={`cp-mig-status cp-mig-status-${c.status}`}>
                  <span className="cp-mig-status-ring" />
                </span>
                <span className="cp-mig-name">{c.name}</span>
              </div>
              <div className="cp-mig-card-body">
                <span className="cp-mig-delta">{c.delta}</span>
                <span className="cp-mig-time">{c.time}</span>
              </div>
              <div className="cp-mig-bar">
                <span className="cp-mig-bar-fill" style={{ animationDelay: `${0.3 + i * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="cp-mig-log">
          <span className="cp-mig-log-dot" />
          <span className="cp-mig-log-text">
            <b>Incremental sync</b> · 1,608 new rows merged across 4 connectors · next cycle in 14:22
          </span>
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ── 5. MODERNIZATION — legacy → modern morph ── */
function ModernizationMock() {
  return (
    <ConsoleFrame
      title="Modernization · legacy_shipments.xlsx → shipments.parquet"
      chips={[{ label: "74% smaller", tone: "ok" }, { label: "encoding auto-normalized", tone: "ok" }, { label: "schema drift resolved", tone: "info" }]}
    >
      <div className="cp-mod">
        <div className="cp-mod-panel cp-mod-legacy">
          <span className="cp-mod-panel-h">LEGACY · xlsx</span>
          <div className="cp-mod-file cp-mod-file-old">
            <div className="cp-mod-file-crumple" />
            <span className="cp-mod-ext">.XLSX</span>
            <div className="cp-mod-cols">
              <span style={{ width: "72%" }} /><span style={{ width: "44%" }} />
              <span style={{ width: "88%" }} /><span style={{ width: "36%" }} />
              <span style={{ width: "64%" }} /><span style={{ width: "52%" }} />
            </div>
          </div>
          <div className="cp-mod-stats">
            <span>encoding: Windows-1252</span>
            <span>delimiter: ; (semicolon)</span>
            <span>schema: drifted × 3</span>
          </div>
        </div>

        <div className="cp-mod-bridge">
          <div className="cp-mod-rings" aria-hidden>
            <span /><span /><span />
          </div>
          <span className="cp-mod-bridge-label">CleanAI<br/>normalize</span>
          <div className="cp-mod-flow">
            <span /><span /><span /><span /><span />
          </div>
        </div>

        <div className="cp-mod-panel cp-mod-modern">
          <span className="cp-mod-panel-h">MODERN · parquet</span>
          <div className="cp-mod-file cp-mod-file-new">
            <span className="cp-mod-ext">.PARQUET</span>
            <div className="cp-mod-cols cp-mod-cols-neat">
              <span style={{ width: "80%" }} /><span style={{ width: "80%" }} />
              <span style={{ width: "80%" }} /><span style={{ width: "80%" }} />
              <span style={{ width: "80%" }} /><span style={{ width: "80%" }} />
            </div>
          </div>
          <div className="cp-mod-stats">
            <span>encoding: UTF-8</span>
            <span>format: columnar</span>
            <span>warehouse: ready ✓</span>
          </div>
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ── 6. SECURITY — role × permission matrix + audit log ── */
function SecurityMock() {
  const roles = ["Owner", "Admin", "Analyst", "Reviewer"]
  const perms = ["Billing", "Invite", "Run job", "Edit rule", "Approve", "Export"]
  const matrix: ("ok" | "ro" | "no")[][] = [
    ["ok","ok","ok","ok","ok","ok"],
    ["no","ok","ok","ok","ok","ok"],
    ["no","no","ok","ro","no","ok"],
    ["no","no","ro","no","ok","ro"],
  ]
  const log = [
    { who: "priya@acme",   act: "APPROVED",  tgt: "quarantine:r_2934", t: "14:02:18" },
    { who: "daniel@acme",  act: "RAN JOB",   tgt: "invoices_nightly",   t: "14:01:40" },
    { who: "ayesha@acme",  act: "DENIED",    tgt: "role:admin → edit",  t: "13:58:02" },
    { who: "system",        act: "SIGNED URL",tgt: "customers.csv",      t: "13:57:55" },
  ]
  return (
    <ConsoleFrame
      title="Access Matrix · production"
      chips={[{ label: "4 role tiers", tone: "info" }, { label: "0 arbitrary code paths", tone: "ok" }, { label: "audit: immutable", tone: "ok" }]}
    >
      <div className="cp-sec">
        <div className="cp-sec-matrix">
          <div className="cp-sec-head">
            <span />
            {perms.map((p) => <span key={p} className="cp-sec-col-h">{p}</span>)}
          </div>
          {roles.map((role, i) => (
            <div key={role} className="cp-sec-row" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <span className="cp-sec-row-h">{role}</span>
              {matrix[i].map((cell, j) => (
                <span key={j} className={`cp-sec-cell cp-sec-cell-${cell}`} style={{ animationDelay: `${0.25 + i * 0.06 + j * 0.03}s` }}>
                  {cell === "ok" && "✓"}
                  {cell === "ro" && "·"}
                  {cell === "no" && ""}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="cp-sec-log">
          <div className="cp-sec-log-head">
            <span className="cp-sec-log-pulse" />
            <span>AUDIT LOG · live</span>
          </div>
          {log.map((l, i) => (
            <div key={i} className="cp-sec-log-row" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <span className="cp-sec-log-t">{l.t}</span>
              <span className="cp-sec-log-who">{l.who}</span>
              <span className={`cp-sec-log-act cp-sec-log-act-${l.act.toLowerCase().replace(/\s+/g,"-")}`}>{l.act}</span>
              <span className="cp-sec-log-tgt">{l.tgt}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsoleFrame>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════ */

function StyleBlock() {
  return (
    <style>{`
      .cp-root {
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
      .cp-root * { box-sizing: border-box; }

      .cp-container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 36px;
        position: relative;
      }
      @media (max-width: 720px) {
        .cp-container { padding: 0 22px; }
      }

      /* ══ NAV ══ */
      .cp-nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 40;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
        background: rgba(250, 250, 245, 0.72);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid transparent;
      }
      .cp-nav-solid {
        background: rgba(250, 250, 245, 0.94);
        border-bottom-color: var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 41, 0.06);
      }
      .cp-nav-inner {
        max-width: 1280px;
        margin: 0 auto;
        padding: 16px 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .cp-wordmark {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: var(--ink);
      }
      .cp-logo-wrap { display: inline-flex; width: 38px; height: 38px; }
      .cp-logo-wrap img { width: 38px; height: 38px; }
      .cp-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
      .cp-logo-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.01em;
      }
      .cp-logo-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        color: var(--ink-3);
        text-transform: uppercase;
        margin-top: 2px;
      }
      .cp-nav-links {
        display: flex;
        align-items: center;
        gap: 30px;
        font-size: 14px;
      }
      .cp-nav-links > a {
        color: var(--ink-2);
        text-decoration: none;
        transition: color 0.25s;
      }
      .cp-nav-links > a:hover { color: var(--brand); }
      .cp-nav-cta {
        padding: 10px 18px;
        background: var(--ink);
        color: #FFFFFF !important;
        border-radius: 999px;
        font-weight: 500;
        font-size: 13.5px;
        transition: transform 0.25s, background 0.25s;
      }
      .cp-nav-cta:hover {
        background: var(--brand);
        transform: translateY(-1px);
      }

      /* ══ Platform dropdown (shared across pages) ══ */
      .cp-nav-dd {
        position: relative;
        padding: 16px 0;
        margin: -16px 0;
      }
      .cp-nav-dd-trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: none;
        padding: 0;
        font: inherit;
        font-size: 14px;
        font-weight: 450;
        cursor: pointer;
        color: var(--ink-2);
        transition: color 0.25s;
      }
      .cp-nav-dd-trigger:hover { color: var(--brand); }
      .cp-nav-dd-caret {
        opacity: 0.7;
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cp-nav-dd-caret-open { transform: rotate(180deg); }
      .cp-nav-dd-menu {
        position: absolute;
        top: calc(100% - 2px);
        left: 50%;
        transform: translateX(-50%) translateY(-6px);
        width: min(900px, calc(100vw - 32px));
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.28s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s 0.28s;
        z-index: 60;
      }
      .cp-nav-dd-menu-open {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
        transition:
          opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s;
      }
      .cp-nav-dd-inner {
        margin-top: 14px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 24px;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 30px 80px -20px rgba(15, 23, 41, 0.22),
          0 8px 20px -8px rgba(15, 23, 41, 0.12);
      }
      .cp-nav-dd-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0 4px 14px;
        border-bottom: 1px solid var(--line);
        margin-bottom: 12px;
      }
      .cp-nav-dd-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cp-nav-dd-hint {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-size: 12.5px;
        color: var(--ink-4);
        font-weight: 400;
      }
      .cp-nav-dd-split {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 18px;
      }
      .cp-nav-dd-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }
      .cp-nav-dd-feature {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 18px 18px 16px;
        border-radius: 12px;
        text-decoration: none;
        color: #FFFFFF;
        background:
          radial-gradient(circle at 100% 0%, rgba(120, 160, 220, 0.45), transparent 60%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        border: 1px solid rgba(160, 196, 240, 0.22);
        box-shadow: 0 12px 30px -14px rgba(15, 23, 41, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
      }
      .cp-nav-dd-feature:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 40px -16px rgba(42, 68, 119, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      }
      .cp-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .cp-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .cp-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .cp-nav-dd-feature-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 700;
      }
      .cp-nav-dd-feature-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.015em;
        color: #FFFFFF;
        margin: 4px 0 0;
        line-height: 1.15;
      }
      .cp-nav-dd-feature-b {
        font-size: 12.5px;
        line-height: 1.5;
        color: rgba(200, 215, 240, 0.75);
        margin: 0;
      }
      .cp-nav-dd-feature-cta {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #FFFFFF;
        margin-top: auto;
        padding-top: 10px;
        border-top: 1px solid rgba(160, 196, 240, 0.18);
      }
      @media (max-width: 720px) {
        .cp-nav-dd-split { grid-template-columns: 1fr; gap: 12px; }
        .cp-nav-dd-feature { padding: 14px 14px 12px; }
      }
      .cp-nav-dd-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px 14px;
        border-radius: 10px;
        text-decoration: none;
        color: var(--ink);
        transition: background 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s;
      }
      .cp-nav-dd-item:hover {
        background: var(--bg-2);
        transform: translateX(2px);
      }
      .cp-nav-dd-item-active {
        background: var(--bg-2);
      }
      .cp-nav-dd-item-active .cp-nav-dd-item-name { color: var(--brand); }
      .cp-nav-dd-item-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 14.5px;
        letter-spacing: -0.01em;
        color: var(--ink);
        transition: color 0.25s;
      }
      .cp-nav-dd-item-blurb {
        font-family: var(--font-sans), sans-serif;
        font-size: 12.5px;
        line-height: 1.45;
        color: var(--ink-4);
      }
      .cp-nav-dd-item:hover .cp-nav-dd-item-name { color: var(--brand); }
      @media (max-width: 720px) {
        .cp-nav-dd-menu { width: min(440px, calc(100vw - 24px)); }
        .cp-nav-dd-grid { grid-template-columns: 1fr; }
        .cp-nav-dd-inner { padding: 18px; }
      }

      /* ══ HERO ══ */
      .cp-hero {
        position: relative;
        padding: 180px 0 120px;
        overflow: hidden;
        background:
          radial-gradient(ellipse 900px 600px at 15% 18%, rgba(90, 127, 181, 0.22) 0%, transparent 58%),
          radial-gradient(ellipse 800px 520px at 85% 12%, rgba(42, 68, 119, 0.2) 0%, transparent 60%),
          radial-gradient(ellipse 700px 500px at 50% 88%, rgba(20, 30, 48, 0.14) 0%, transparent 55%),
          linear-gradient(180deg, #EEF2FA 0%, #F4F3EC 45%, var(--bg) 100%);
      }
      @media (max-width: 768px) { .cp-hero { padding: 110px 0 80px; } }
      @media (max-width: 480px) { .cp-hero { padding: 96px 0 64px; } }
      .cp-hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .cp-hero-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(42, 68, 119, 0.09) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(42, 68, 119, 0.09) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 45%, black 30%, transparent 85%);
      }
      .cp-hero-glow {
        position: absolute;
        top: -10%;
        left: 50%;
        transform: translateX(-50%);
        width: 1200px;
        height: 640px;
        background: radial-gradient(ellipse, var(--cp-accent-glow, rgba(42, 68, 119, 0.22)) 0%, rgba(90, 127, 181, 0.1) 40%, transparent 70%);
        filter: blur(80px);
      }
      .cp-hero-signature {
        position: absolute;
        top: 130px;
        right: 8%;
        font-family: var(--font-display), sans-serif;
        font-size: clamp(160px, 22vw, 320px);
        line-height: 0.8;
        font-weight: 700;
        color: var(--cp-accent, var(--brand));
        opacity: 0.06;
        pointer-events: none;
        user-select: none;
        transform: rotate(-6deg);
        z-index: 0;
      }
      @media (max-width: 720px) {
        .cp-hero-signature { font-size: clamp(120px, 28vw, 200px); right: 4%; top: 100px; }
      }
      .cp-outcome-num { color: var(--cp-accent, var(--brand)); }
      .cp-h2-em { color: var(--cp-accent, var(--brand)); }
      .cp-h1-em { color: var(--cp-accent, var(--brand)); }
      .cp-hero-glow-2 {
        top: 30%;
        left: -14%;
        transform: none;
        width: 620px;
        height: 520px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.28), transparent 62%);
        filter: blur(100px);
      }
      .cp-hero-glow-3 {
        top: 45%;
        left: auto;
        right: -10%;
        transform: none;
        width: 560px;
        height: 460px;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.22), transparent 62%);
        filter: blur(90px);
      }
      .cp-hero-sweep {
        position: absolute;
        inset: 0;
        background: linear-gradient(115deg,
          transparent 0%,
          rgba(90, 127, 181, 0.06) 40%,
          rgba(42, 68, 119, 0.08) 55%,
          transparent 70%);
        mix-blend-mode: multiply;
        opacity: 0.7;
      }
      @media (prefers-reduced-motion: reduce) {
        .cp-hero-sweep { opacity: 0.5; }
      }
      .cp-hero-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
        gap: 64px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .cp-hero-grid { grid-template-columns: 1fr; gap: 48px; }
      }
      .cp-hero-body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
      }
      .cp-hero-stage {
        position: relative;
      }
      .cp-hero-stage-glow {
        position: absolute;
        inset: -40px;
        background:
          radial-gradient(ellipse at 30% 20%, var(--cp-accent-glow, rgba(42, 68, 119, 0.32)), transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(90, 127, 181, 0.22), transparent 65%);
        filter: blur(40px);
        z-index: -1;
      }
      .cp-hero-stage-frame {
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 40px 80px -28px rgba(15, 23, 41, 0.32),
          0 12px 28px -10px rgba(15, 23, 41, 0.18);
      }
      .cp-hero-stage-chrome {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 11px 16px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .cp-hero-stage-dot {
        width: 9px; height: 9px; border-radius: 50%;
      }
      .cp-hero-stage-dot-r { background: #E8816D; }
      .cp-hero-stage-dot-y { background: #E8C66D; }
      .cp-hero-stage-dot-g { background: #88C08A; }
      .cp-hero-stage-tab {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        color: var(--cp-accent, var(--brand));
        margin-left: 14px;
        font-weight: 600;
      }
      .cp-hero-stage-body {
        padding: 18px 20px;
        background: #FFFFFF;
      }
      @media (max-width: 720px) {
        .cp-hero-stage-body { padding: 14px 14px; }
      }

      /* Embed the per-slug mock inside the hero stage — strip its own chrome/border */
      .cp-hero-stage-body .cp-mock {
        border: none;
        box-shadow: none;
        background: transparent;
        border-radius: 0;
      }
      .cp-hero-stage-body .cp-mock-chrome { display: none; }
      .cp-hero-stage-body .cp-mock-body { padding: 0; }
      .cp-hero-stage-body .cp-mock-head {
        padding-bottom: 12px;
        margin-bottom: 14px;
      }
      .cp-hero-stage-body .cp-mock-h-label { font-size: 13px; }
      .cp-hero-stage-body .cp-mock-chips { gap: 4px; }
      .cp-hero-stage-body .cp-mock-chip { font-size: 9px; padding: 3px 7px; }

      /* Per-slug live-mock tightening for hero size (smaller than the standalone) */
      .cp-hero-stage-body .cp-prof-row { padding: 7px 4px; font-size: 12px; }
      .cp-hero-stage-body .cp-prof-name { font-size: 12px; }
      .cp-hero-stage-body .cp-prof-bar-num { font-size: 10px; min-width: 28px; }
      .cp-hero-stage-body .cp-prof-conf { font-size: 11px; }

      .cp-hero-stage-body .cp-qual { gap: 16px; }
      .cp-hero-stage-body .cp-qual-score { grid-template-columns: 100px 1fr; gap: 12px; }
      .cp-hero-stage-body .cp-qual-score svg { width: 100px; height: 100px; }
      .cp-hero-stage-body .cp-qual-rule { padding: 6px 4px; font-size: 11.5px; grid-template-columns: 38px 1fr 90px 38px; gap: 8px; }
      .cp-hero-stage-body .cp-qual-rule-id { font-size: 10px; }

      .cp-hero-stage-body .cp-xform-row { padding: 0; }
      .cp-hero-stage-body .cp-xform-node { padding: 8px 10px; font-size: 11.5px; }

      .cp-hero-stage-body .cp-mig-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
      .cp-hero-stage-body .cp-mig-card { padding: 10px 12px; }
      .cp-hero-stage-body .cp-mig-name { font-size: 12px; }
      .cp-hero-stage-body .cp-mig-delta { font-size: 10.5px; }

      .cp-hero-stage-body .cp-mod { grid-template-columns: 1fr 80px 1fr; gap: 12px; }
      .cp-hero-stage-body .cp-mod-panel { padding: 12px 12px 10px; }
      .cp-hero-stage-body .cp-mod-rings { width: 64px; height: 64px; }
      .cp-hero-stage-body .cp-mod-bridge-label { font-size: 9.5px; }

      .cp-hero-stage-body .cp-sec { grid-template-columns: 1fr; gap: 14px; }
      .cp-hero-stage-body .cp-sec-cell { height: 22px; font-size: 11px; }
      .cp-hero-stage-body .cp-sec-row, .cp-hero-stage-body .cp-sec-head { grid-template-columns: 70px repeat(6, 1fr); }
      .cp-hero-stage-body .cp-sec-log { padding: 12px; }
      .cp-hero-stage-body .cp-sec-log-row { font-size: 10.5px; padding: 4px 0; }

      @media (max-width: 980px) {
        .cp-hero-stage { max-width: 600px; margin-left: auto; margin-right: auto; width: 100%; }
      }
      @media (max-width: 540px) {
        .cp-hero-stage-body .cp-mig-grid { grid-template-columns: 1fr; }
        .cp-hero-stage-body .cp-mod { grid-template-columns: 1fr; }
      }
      .cp-hero-crumb {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-4);
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .cp-hero-crumb a {
        color: var(--ink-4);
        text-decoration: none;
        transition: color 0.25s;
      }
      .cp-hero-crumb a:hover { color: var(--brand); }
      .cp-crumb-sep { opacity: 0.5; }
      .cp-crumb-current { color: var(--brand); font-weight: 600; }

      .cp-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cp-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(40px, 4.8vw, 68px);
        line-height: 1;
        letter-spacing: -0.032em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      @media (max-width: 980px) {
        .cp-h1 { font-size: clamp(40px, 6vw, 64px); }
      }
      .cp-h1-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        color: var(--brand);
        letter-spacing: -0.028em;
      }
      .cp-lede {
        font-size: 17px;
        line-height: 1.6;
        color: var(--ink-3);
        max-width: 58ch;
        margin: 4px 0 0;
      }
      .cp-hero-ctas {
        display: flex;
        gap: 12px;
        margin-top: 14px;
        flex-wrap: wrap;
      }
      .cp-cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 14px 24px;
        background: var(--ink);
        color: #FFFFFF;
        border-radius: 999px;
        font-size: 14.5px;
        font-weight: 500;
        text-decoration: none;
        transition: background 0.25s, transform 0.25s;
      }
      .cp-cta-primary:hover {
        background: var(--brand);
        transform: translateY(-1px);
      }
      .cp-cta-primary svg { transition: transform 0.25s; }
      .cp-cta-primary:hover svg { transform: translateX(3px); }
      .cp-cta-ghost {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 22px;
        background: transparent;
        color: var(--ink-2);
        border: 1px solid var(--line-2);
        border-radius: 999px;
        font-size: 14.5px;
        font-weight: 500;
        text-decoration: none;
        transition: border-color 0.25s, color 0.25s;
      }
      .cp-cta-ghost:hover {
        border-color: var(--brand);
        color: var(--brand);
      }

      /* ══ STATEMENT BANNER ══ */
      .cp-statement {
        padding: 70px 0;
        text-align: center;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        background: var(--bg-2);
      }
      .cp-statement p {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-size: clamp(24px, 3.4vw, 40px);
        line-height: 1.25;
        font-weight: 400;
        color: var(--ink);
        letter-spacing: -0.02em;
        margin: 0;
        max-width: 32ch;
        margin-left: auto;
        margin-right: auto;
      }
      .cp-statement-quote {
        font-family: var(--font-serif), serif;
        color: var(--brand);
        font-size: 1.4em;
        line-height: 0;
        margin-right: 6px;
        vertical-align: -0.2em;
      }

      /* ══ SECTION HEAD ══ */
      .cp-section-head {
        max-width: 700px;
        margin: 0 0 56px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .cp-section-head-dark { color: #FFFFFF; }
      .cp-tag {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cp-tag-light { color: #a0c4f0; }
      .cp-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(32px, 4.4vw, 52px);
        line-height: 1.05;
        letter-spacing: -0.028em;
        color: var(--ink);
        margin: 0;
        text-wrap: balance;
      }
      .cp-h2-light { color: #FFFFFF; }
      .cp-h2-em {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        color: var(--brand);
      }
      .cp-h2-em-light { color: #a0c4f0; font-style: italic; font-weight: 600; }

      /* ══ PILLARS (light) ══ */
      .cp-pillars { padding: 120px 0; }
      .cp-pillars-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 36px;
      }
      @media (max-width: 900px) {
        .cp-pillars-grid { grid-template-columns: 1fr; gap: 24px; }
      }
      .cp-pillar {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 30px 28px 32px;
        border: 1px solid rgba(42, 68, 119, 0.14);
        border-radius: 16px;
        background:
          radial-gradient(circle at 0% 0%, rgba(42, 68, 119, 0.06), transparent 55%),
          #FFFFFF;
        overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s, box-shadow 0.4s, background 0.4s;
      }
      .cp-pillar::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--brand), var(--navy-mid));
        opacity: 0;
        transform: translateY(-100%);
        transition: opacity 0.35s, transform 0.35s;
      }
      .cp-pillar:hover {
        transform: translateY(-6px);
        border-color: rgba(42, 68, 119, 0.38);
        box-shadow: 0 28px 60px -24px rgba(42, 68, 119, 0.28);
        background:
          radial-gradient(circle at 0% 0%, rgba(42, 68, 119, 0.1), transparent 55%),
          #FFFFFF;
      }
      .cp-pillar:hover::before {
        opacity: 1;
        transform: translateY(0);
      }
      .cp-pillar-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 13px;
        color: var(--brand);
        background: linear-gradient(155deg, rgba(42, 68, 119, 0.08) 0%, rgba(90, 127, 181, 0.18) 100%);
        border: 1px solid rgba(42, 68, 119, 0.15);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        margin-bottom: 8px;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), background 0.4s, color 0.4s;
      }
      .cp-pillar:hover .cp-pillar-icon {
        transform: scale(1.06) rotate(-3deg);
        background: linear-gradient(155deg, var(--brand) 0%, var(--navy-mid) 100%);
        color: #FFFFFF;
        border-color: var(--brand);
        box-shadow:
          0 14px 28px -10px rgba(42, 68, 119, 0.45),
          inset 0 1px 0 rgba(255, 255, 255, 0.18);
      }
      .cp-pillar-num {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.24em;
        color: var(--brand);
        font-weight: 700;
      }
      .cp-pillar-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 21px;
        letter-spacing: -0.018em;
        color: var(--ink);
        margin: 2px 0 0;
        line-height: 1.2;
      }
      .cp-pillar-body {
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--ink-3);
        margin: 2px 0 0;
      }

      /* ══ HOW IT WORKS (dark band) ══ */
      .cp-how {
        padding: 130px 0;
        background:
          radial-gradient(ellipse 900px 500px at 50% 20%, rgba(58, 90, 148, 0.28) 0%, transparent 60%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
      }
      .cp-how::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(120, 160, 220, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(120, 160, 220, 0.04) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 85%);
        pointer-events: none;
      }
      .cp-how > .cp-container { position: relative; z-index: 1; }
      .cp-how-steps {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
        position: relative;
      }
      @media (max-width: 900px) {
        .cp-how-steps { grid-template-columns: 1fr 1fr; gap: 28px; }
      }
      @media (max-width: 540px) {
        .cp-how-steps { grid-template-columns: 1fr; }
      }
      .cp-how-step {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .cp-how-n {
        font-family: var(--font-mono), monospace;
        font-size: 38px;
        font-weight: 700;
        color: #a0c4f0;
        letter-spacing: -0.02em;
        line-height: 1;
      }
      .cp-how-title {
        font-family: var(--font-display), sans-serif;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #FFFFFF;
        margin: 0;
      }
      .cp-how-body {
        font-size: 14.5px;
        line-height: 1.55;
        color: rgba(200, 215, 240, 0.72);
        margin: 0;
      }
      .cp-how-connector {
        position: absolute;
        top: 17px;
        right: -52px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 72px;
        height: 14px;
        pointer-events: none;
      }
      @media (max-width: 900px) {
        .cp-how-connector { display: none; }
      }

      /* ══ FEATURES GRID ══ */
      .cp-features { padding: 130px 0; background: var(--bg); }
      .cp-features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: var(--line);
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
      }
      @media (max-width: 900px) {
        .cp-features-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 540px) {
        .cp-features-grid { grid-template-columns: 1fr; }
      }
      .cp-feature {
        padding: 32px 28px 34px;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;
        transition: background 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cp-feature:hover { background: var(--bg-2); }
      .cp-feature-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--brand);
        box-shadow: 0 0 0 4px rgba(42, 68, 119, 0.12);
        margin-bottom: 4px;
      }
      .cp-feature-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: -0.015em;
        color: var(--ink);
        margin: 0;
      }
      .cp-feature-body {
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--ink-3);
        margin: 0;
      }

      /* ══ OUTCOME BAND ══ */
      .cp-outcome {
        padding: 100px 0;
        background: var(--bg-2);
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
      }
      .cp-outcome-card {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 60px;
        align-items: center;
      }
      @media (max-width: 800px) {
        .cp-outcome-card { grid-template-columns: 1fr; gap: 28px; }
      }
      .cp-outcome-stat {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .cp-outcome-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(58px, 7vw, 96px);
        color: var(--brand);
        letter-spacing: -0.03em;
        line-height: 0.9;
      }
      .cp-outcome-label {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.2em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .cp-outcome-quote {
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
      .cp-outcome-q {
        font-family: var(--font-serif), serif;
        color: var(--brand);
        font-size: 1.4em;
        line-height: 0;
        margin-right: 6px;
        vertical-align: -0.2em;
      }

      /* ══ RELATED CAPABILITIES ══ */
      .cp-related { padding: 130px 0; }
      .cp-related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        align-items: stretch;
      }
      @media (max-width: 900px) {
        .cp-related-grid { grid-template-columns: 1fr; }
      }
      .cp-related-wrap { display: flex; }
      .cp-related-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
        padding: 26px 26px 72px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 14px;
        text-decoration: none;
        color: var(--ink);
        position: relative;
        width: 100%;
        min-height: 230px;
        transition: transform 0.35s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.35s, box-shadow 0.35s;
      }
      .cp-related-card:hover {
        transform: translateY(-4px);
        border-color: var(--brand);
        box-shadow: 0 24px 50px -24px rgba(42, 68, 119, 0.22);
      }
      .cp-related-icon {
        width: 58px;
        height: 58px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: linear-gradient(155deg, rgba(42, 68, 119, 0.06), rgba(90, 127, 181, 0.12));
        border: 1px solid rgba(42, 68, 119, 0.12);
        transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), background 0.35s;
        margin-bottom: 2px;
      }
      .cp-related-card:hover .cp-related-icon {
        transform: translateY(-2px) rotate(-2deg);
        background: linear-gradient(155deg, rgba(42, 68, 119, 0.1), rgba(90, 127, 181, 0.2));
      }
      .cp-related-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cp-related-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 1.22;
        letter-spacing: -0.018em;
        color: var(--ink);
        margin: 0;
        max-width: 20ch;
      }
      .cp-related-title-em {
        font-style: italic;
        font-weight: 500;
        color: var(--brand);
      }
      .cp-related-arrow {
        position: absolute;
        bottom: 24px;
        right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(42, 68, 119, 0.08);
        color: var(--brand);
        font-size: 15px;
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), background 0.3s;
      }
      .cp-related-card:hover .cp-related-arrow {
        transform: translateX(4px);
        background: var(--brand);
        color: #FFFFFF;
      }

      /* ── Live icons (related cards) ── */
      .cp-ico { color: var(--brand); }
      .cp-ico-bar {
        fill: currentColor;
        transform-origin: bottom center;
        transform-box: fill-box;
        animation: cp-ico-grow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes cp-ico-grow {
        0%, 100% { transform: scaleY(0.55); opacity: 0.55; }
        50%      { transform: scaleY(1);    opacity: 1; }
      }
      .cp-ico-pulse {
        fill: #88C08A;
        animation: cp-pulse 1.8s ease-in-out infinite;
      }

      .cp-ico-shield {
        stroke: currentColor;
        fill: rgba(42, 68, 119, 0.04);
        stroke-dasharray: 120;
        stroke-dashoffset: 120;
        animation: cp-ico-draw 1.6s cubic-bezier(0.19, 1, 0.22, 1) forwards infinite;
      }
      @keyframes cp-ico-draw {
        0%   { stroke-dashoffset: 120; }
        60%, 100% { stroke-dashoffset: 0; }
      }
      .cp-ico-check {
        stroke: currentColor;
        stroke-dasharray: 32;
        stroke-dashoffset: 32;
        animation: cp-ico-check-draw 1.6s cubic-bezier(0.19, 1, 0.22, 1) 0.8s forwards infinite;
      }
      @keyframes cp-ico-check-draw {
        0%   { stroke-dashoffset: 32; }
        50%, 100% { stroke-dashoffset: 0; }
      }

      .cp-ico-node {
        fill: currentColor;
        animation: cp-pulse 2s ease-in-out infinite;
      }
      .cp-ico-wire {
        stroke: currentColor;
        opacity: 0.4;
        stroke-dasharray: 44;
        stroke-dashoffset: 44;
        animation: cp-ico-flow 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      }
      @keyframes cp-ico-flow {
        0%   { stroke-dashoffset: 44; opacity: 0.1; }
        50%  { stroke-dashoffset: 0;  opacity: 0.6; }
        100% { stroke-dashoffset: -44; opacity: 0.1; }
      }

      .cp-ico-hub {
        fill: currentColor;
      }
      .cp-ico-orbit, .cp-ico-orbit-2 {
        stroke: currentColor;
        opacity: 0.3;
        fill: none;
        transform-origin: 22px 22px;
        animation: cp-ico-spin 8s linear infinite;
      }
      .cp-ico-orbit-2 { animation-duration: 14s; animation-direction: reverse; }
      @keyframes cp-ico-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .cp-ico-sat {
        fill: var(--brand);
        transform-origin: 22px 22px;
        animation: cp-ico-orbit-fade 2s ease-in-out infinite;
      }
      @keyframes cp-ico-orbit-fade {
        0%, 100% { opacity: 0.35; transform: scale(0.85); transform-origin: center; transform-box: fill-box; }
        50%      { opacity: 1;    transform: scale(1.2);  }
      }

      .cp-ico-file-old {
        fill: rgba(181, 118, 46, 0.15);
        stroke: rgba(181, 118, 46, 0.55);
        stroke-width: 1;
      }
      .cp-ico-corner {
        fill: rgba(181, 118, 46, 0.35);
      }
      .cp-ico-file-new {
        fill: rgba(46, 125, 90, 0.14);
        stroke: rgba(46, 125, 90, 0.55);
        stroke-width: 1;
      }
      .cp-ico-line {
        stroke: rgba(46, 125, 90, 0.55);
        stroke-dasharray: 8;
        stroke-dashoffset: 8;
        animation: cp-ico-line-in 1.8s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      .cp-ico-line:nth-of-type(1) { animation-delay: 0s; }
      @keyframes cp-ico-line-in {
        0%   { stroke-dashoffset: 8; opacity: 0; }
        40%  { stroke-dashoffset: 0; opacity: 1; }
        80%  { opacity: 1; }
        100% { opacity: 0; }
      }
      .cp-ico-arrow {
        stroke: var(--brand);
        animation: cp-ico-arrow-shift 1.6s ease-in-out infinite;
      }
      @keyframes cp-ico-arrow-shift {
        0%, 100% { transform: translateX(-1px); opacity: 0.5; }
        50%      { transform: translateX(1px);  opacity: 1; }
      }

      .cp-ico-lock-body {
        fill: rgba(42, 68, 119, 0.18);
        stroke: currentColor;
        stroke-width: 1.4;
      }
      .cp-ico-lock-shackle {
        stroke: currentColor;
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: cp-ico-check-draw 1.8s cubic-bezier(0.19, 1, 0.22, 1) 0.6s forwards infinite;
      }
      .cp-ico-lock-dot {
        fill: currentColor;
        animation: cp-pulse 1.6s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .cp-ico-bar, .cp-ico-pulse, .cp-ico-shield, .cp-ico-check,
        .cp-ico-node, .cp-ico-wire, .cp-ico-orbit, .cp-ico-orbit-2,
        .cp-ico-sat, .cp-ico-line, .cp-ico-arrow, .cp-ico-lock-shackle,
        .cp-ico-lock-dot {
          animation: none !important;
          opacity: 1 !important;
          stroke-dashoffset: 0 !important;
        }
      }

      /* ══ FINAL CTA ══ */
      .cp-cta-final { padding: 60px 0 100px; }
      .cp-cta-card {
        position: relative;
        padding: 44px 48px;
        border-radius: 22px;
        background: var(--brand);
        overflow: hidden;
      }
      .cp-cta-rings {
        position: absolute;
        top: 50%;
        right: -5%;
        transform: translateY(-50%);
        width: 340px;
        height: 340px;
        z-index: 1;
        pointer-events: none;
      }
      .cp-cta-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      .cp-cta-ring-1 {
        width: 100%; height: 100%;
        border: 2px solid rgba(255, 255, 255, 0.22);
        animation: cp-ripple 3s ease-in-out infinite;
      }
      .cp-cta-ring-2 {
        width: 72%; height: 72%;
        border: 2.5px solid rgba(255, 255, 255, 0.28);
        animation: cp-ripple 3s ease-in-out infinite 0.4s;
      }
      .cp-cta-ring-3 {
        width: 46%; height: 46%;
        border: 3px solid rgba(255, 255, 255, 0.35);
        animation: cp-ripple 3s ease-in-out infinite 0.8s;
      }
      .cp-cta-ring-4 {
        width: 22%; height: 22%;
        background: rgba(255, 255, 255, 0.25);
        animation: cp-ripple-core 3s ease-in-out infinite 1.2s;
      }
      @keyframes cp-ripple {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; }
      }
      @keyframes cp-ripple-core {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50%      { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cp-cta-ring { animation: none !important; }
      }
      .cp-cta-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 480px;
      }
      .cp-cta-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(26px, 3vw, 36px);
        line-height: 1.12;
        letter-spacing: -0.02em;
        margin: 0;
        color: #FFFFFF;
      }
      .cp-cta-em {
        font-style: italic;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
      }
      .cp-cta-sub {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        margin: 6px 0 18px;
        line-height: 1.5;
        max-width: 40ch;
      }
      .cp-cta-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 999px;
        background: #FFFFFF;
        color: var(--brand);
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        white-space: nowrap;
        align-self: flex-start;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .cp-cta-pill:hover {
        background: #FAFAF5;
        transform: translateY(-2px);
        box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4);
      }
      .cp-cta-pill-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--brand);
        color: #FFFFFF;
        font-size: 13px;
        transition: background 0.25s, transform 0.25s;
      }
      .cp-cta-pill:hover .cp-cta-pill-arrow {
        background: var(--navy-cta);
        transform: translateX(2px);
      }

      /* ══ PRODUCT IMAGE SECTION (real screenshot, blue backdrop) ══ */
      .cp-product {
        position: relative;
        padding: 130px 0 140px;
        background:
          radial-gradient(ellipse 900px 560px at 50% 10%, rgba(58, 90, 148, 0.35), transparent 62%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        overflow: hidden;
        color: #FFFFFF;
      }
      .cp-product-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .cp-product-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(160, 196, 240, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(160, 196, 240, 0.06) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 85%);
      }
      .cp-product-glow-a {
        position: absolute;
        top: -20%;
        left: -10%;
        width: 620px;
        height: 540px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.32), transparent 62%);
        filter: blur(100px);
      }
      .cp-product-glow-b {
        position: absolute;
        bottom: -15%;
        right: -10%;
        width: 560px;
        height: 480px;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.5), transparent 60%);
        filter: blur(90px);
      }
      .cp-product > .cp-container { position: relative; z-index: 1; }
      .cp-product-head { margin-bottom: 48px; }
      .cp-product-sub {
        font-size: 16px;
        line-height: 1.6;
        color: rgba(200, 215, 240, 0.78);
        max-width: 58ch;
        margin: 6px 0 0;
      }
      .cp-product-frame {
        position: relative;
        margin: 0 auto;
        border-radius: 18px;
        background: #FFFFFF;
        border: 1px solid rgba(160, 196, 240, 0.14);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 60px 120px -32px rgba(0, 0, 0, 0.55),
          0 20px 40px -16px rgba(0, 0, 0, 0.35),
          0 0 0 1px rgba(160, 196, 240, 0.08);
        overflow: hidden;
        max-width: 1080px;
      }
      .cp-product-chrome {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 18px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .cp-product-dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        display: inline-block;
      }
      .cp-product-dot-r { background: #E8816D; }
      .cp-product-dot-y { background: #E8C66D; }
      .cp-product-dot-g { background: #88C08A; }
      .cp-product-url {
        flex: 1;
        text-align: center;
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        color: var(--ink-3);
        letter-spacing: 0.04em;
        padding: 5px 12px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid var(--line);
        max-width: 320px;
        margin: 0 auto;
      }
      .cp-product-img {
        display: block;
        width: 100%;
        height: auto;
        background: var(--bg);
      }
      .cp-product-cap {
        padding: 16px 24px 20px;
        border-top: 1px solid var(--line);
        background: var(--bg-2);
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        color: var(--ink-4);
        letter-spacing: 0.02em;
        line-height: 1.55;
      }

      /* ══ PER-CAPABILITY VISUAL SECTION (legacy, unused) ══ */
      .cp-visual {
        padding: 120px 0 20px;
        background: var(--bg);
      }
      .cp-visual-sub {
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink-3);
        max-width: 60ch;
        margin: 6px 0 0;
      }
      .cp-visual-stage {
        margin-top: 48px;
      }

      /* ── shared mock chrome ── */
      .cp-mock {
        background: #FFFFFF;
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.9) inset,
          0 40px 90px -32px rgba(15, 23, 41, 0.22),
          0 10px 24px -10px rgba(15, 23, 41, 0.12);
      }
      .cp-mock-chrome {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: var(--bg-2);
        border-bottom: 1px solid var(--line);
      }
      .cp-mock-dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        display: inline-block;
      }
      .cp-mock-dot-r { background: #E8816D; }
      .cp-mock-dot-y { background: #E8C66D; }
      .cp-mock-dot-g { background: #88C08A; }
      .cp-mock-title {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        letter-spacing: 0.05em;
        color: var(--ink-3);
        margin-left: 14px;
      }
      .cp-mock-body { padding: 22px 24px 24px; }
      .cp-mock-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 14px;
        padding-bottom: 16px;
        border-bottom: 1px dashed var(--line);
        margin-bottom: 18px;
      }
      .cp-mock-h-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 15px;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .cp-mock-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .cp-mock-chip {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 4px 9px;
        border-radius: 999px;
        border: 1px solid var(--line-2);
        color: var(--ink-3);
      }
      .cp-mock-chip-ok {
        color: #2E7D5A;
        border-color: rgba(46, 125, 90, 0.28);
        background: rgba(46, 125, 90, 0.08);
      }
      .cp-mock-chip-warn {
        color: #B5762E;
        border-color: rgba(181, 118, 46, 0.28);
        background: rgba(181, 118, 46, 0.08);
      }
      .cp-mock-chip-info {
        color: var(--brand);
        border-color: rgba(42, 68, 119, 0.22);
        background: rgba(42, 68, 119, 0.06);
      }

      @keyframes cp-rise {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes cp-grow-x {
        from { width: 0 !important; }
      }
      @keyframes cp-pulse {
        0%, 100% { opacity: 0.6; transform: scale(0.9); }
        50%      { opacity: 1;   transform: scale(1.1); }
      }

      /* ══ 1. PROFILING mock ══ */
      .cp-prof {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .cp-prof-head, .cp-prof-row {
        display: grid;
        grid-template-columns: 1.6fr 0.7fr 1.2fr 1.2fr 0.9fr;
        gap: 14px;
        align-items: center;
        font-size: 13px;
      }
      .cp-prof-head {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--ink-4);
        padding: 6px 4px;
        border-bottom: 1px solid var(--line);
      }
      .cp-prof-row {
        padding: 10px 4px;
        border-bottom: 1px dotted var(--line);
        opacity: 0;
        animation: cp-rise 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-prof-name {
        font-family: var(--font-mono), monospace;
        font-size: 13px;
        color: var(--ink);
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .cp-prof-key {
        color: var(--brand);
        font-size: 11px;
      }
      .cp-prof-type {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        padding: 3px 8px;
        border-radius: 4px;
        justify-self: start;
      }
      .cp-prof-type-int, .cp-prof-type-numeric { background: rgba(42, 68, 119, 0.1); color: var(--brand); }
      .cp-prof-type-email, .cp-prof-type-text { background: rgba(58, 90, 148, 0.1); color: #3A5A94; }
      .cp-prof-type-date { background: rgba(90, 127, 181, 0.14); color: #3A5A94; }
      .cp-prof-type-enum { background: rgba(15, 23, 41, 0.06); color: var(--ink-2); }
      .cp-prof-bar {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cp-prof-bar-track {
        position: relative;
        flex: 1;
        height: 6px;
        background: rgba(15, 23, 41, 0.05);
        border-radius: 3px;
        overflow: hidden;
      }
      .cp-prof-bar-fill {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        width: 0;
        animation: cp-grow-x 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-prof-bar-null { background: linear-gradient(90deg, #E8816D, #B5762E); }
      .cp-prof-bar-uniq { background: linear-gradient(90deg, var(--navy-mid), var(--brand)); }
      .cp-prof-bar-num {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
        min-width: 34px;
        text-align: right;
      }
      .cp-prof-conf {
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        color: var(--ink);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .cp-prof-conf-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #88C08A;
        box-shadow: 0 0 0 3px rgba(136, 192, 138, 0.25);
      }
      .cp-prof-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px dashed var(--line);
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-4);
      }
      .cp-prof-pulse {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--brand);
        animation: cp-pulse 1.8s ease-in-out infinite;
      }

      /* ══ 2. QUALITY mock ══ */
      .cp-qual {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 32px;
        align-items: start;
      }
      @media (max-width: 720px) {
        .cp-qual { grid-template-columns: 1fr; }
      }
      .cp-qual-score {
        display: grid;
        grid-template-columns: 130px 1fr;
        gap: 16px;
        align-items: center;
      }
      .cp-qual-score-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 24px;
        fill: var(--ink);
        letter-spacing: -0.02em;
      }
      .cp-qual-arc {
        animation: cp-arc 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes cp-arc {
        from { stroke-dashoffset: 326.7; }
      }
      .cp-qual-score-labels {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .cp-qual-score-head {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .cp-qual-score-sub {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-4);
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      .cp-qual-score-stat {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
      }
      .cp-qual-score-stat b {
        color: var(--ink);
        font-weight: 600;
      }
      .cp-qual-score-stat-warn b { color: #B5762E; }
      .cp-qual-rules {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .cp-qual-rule {
        display: grid;
        grid-template-columns: 50px 1fr 140px 48px;
        gap: 12px;
        align-items: center;
        padding: 9px 4px;
        border-bottom: 1px dotted var(--line);
        font-size: 13px;
        opacity: 0;
        animation: cp-rise 0.55s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-qual-rule-id {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.1em;
        color: var(--brand);
        font-weight: 600;
      }
      .cp-qual-rule-label {
        color: var(--ink-2);
      }
      .cp-qual-rule-bar {
        position: relative;
        height: 4px;
        background: rgba(15, 23, 41, 0.06);
        border-radius: 2px;
        overflow: hidden;
      }
      .cp-qual-rule-fill {
        position: absolute;
        top: 0; left: 0; bottom: 0;
        background: var(--brand);
        width: 0;
        animation: cp-grow-x 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-qual-rule-warn .cp-qual-rule-fill { background: #B5762E; }
      .cp-qual-rule-pct {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
        text-align: right;
      }

      /* ══ 3. TRANSFORMATION mock ══ */
      .cp-xform {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .cp-xform-heads, .cp-xform-row {
        display: grid;
        grid-template-columns: 1fr 72px 1fr;
        gap: 12px;
        align-items: center;
      }
      .cp-xform-heads {
        margin-bottom: 2px;
      }
      .cp-xform-col-h {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .cp-xform-col-h-tgt { text-align: left; }
      .cp-xform-rows {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .cp-xform-row {
        opacity: 0;
        animation: cp-rise 0.55s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-xform-node {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 8px;
        font-family: var(--font-mono), monospace;
        font-size: 12.5px;
        color: var(--ink-2);
      }
      .cp-xform-node-dot {
        flex-shrink: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--navy-mid);
      }
      .cp-xform-node-src { justify-content: flex-start; }
      .cp-xform-node-tgt {
        justify-content: space-between;
        background: #FFFFFF;
        border-color: rgba(42, 68, 119, 0.22);
      }
      .cp-xform-node-name {
        color: var(--brand);
        font-weight: 600;
      }
      .cp-xform-conf {
        font-size: 10.5px;
        padding: 2px 7px;
        border-radius: 4px;
      }
      .cp-xform-conf-hi {
        background: rgba(46, 125, 90, 0.12);
        color: #2E7D5A;
      }
      .cp-xform-conf-mid {
        background: rgba(42, 68, 119, 0.1);
        color: var(--brand);
      }
      .cp-xform-conf-lo {
        background: rgba(181, 118, 46, 0.12);
        color: #B5762E;
      }
      .cp-xform-wire {
        display: flex;
        align-items: center;
        justify-content: stretch;
        width: 100%;
      }
      .cp-xform-wire svg {
        display: block;
        width: 100%;
      }
      @media (max-width: 640px) {
        .cp-xform-heads, .cp-xform-row { grid-template-columns: 1fr 44px 1fr; gap: 8px; }
      }

      /* ══ 4. MIGRATION mock ══ */
      .cp-mig {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .cp-mig-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      @media (max-width: 720px) {
        .cp-mig-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 500px) {
        .cp-mig-grid { grid-template-columns: 1fr; }
      }
      .cp-mig-card {
        position: relative;
        padding: 14px 14px 12px;
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        overflow: hidden;
        opacity: 0;
        animation: cp-rise 0.55s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-mig-running {
        background: #FFFFFF;
        border-color: rgba(42, 68, 119, 0.3);
        box-shadow: 0 0 0 3px rgba(42, 68, 119, 0.08);
      }
      .cp-mig-paused {
        background: rgba(181, 118, 46, 0.04);
        border-color: rgba(181, 118, 46, 0.22);
      }
      .cp-mig-card-head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .cp-mig-status {
        position: relative;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .cp-mig-status-synced { background: #88C08A; }
      .cp-mig-status-running { background: var(--brand); }
      .cp-mig-status-paused { background: #E8C66D; }
      .cp-mig-status-ring {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid currentColor;
        opacity: 0;
      }
      .cp-mig-status-running .cp-mig-status-ring {
        border-color: var(--brand);
        opacity: 1;
        animation: cp-ring 1.8s ease-out infinite;
      }
      @keyframes cp-ring {
        0%   { transform: scale(0.5); opacity: 0.9; }
        100% { transform: scale(2); opacity: 0; }
      }
      .cp-mig-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 13.5px;
        letter-spacing: -0.005em;
        color: var(--ink);
      }
      .cp-mig-card-body {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      .cp-mig-delta {
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        color: var(--brand);
      }
      .cp-mig-paused .cp-mig-delta { color: #B5762E; }
      .cp-mig-time {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        color: var(--ink-4);
      }
      .cp-mig-bar {
        height: 2px;
        background: rgba(15, 23, 41, 0.06);
        border-radius: 1px;
        overflow: hidden;
        margin-top: 4px;
      }
      .cp-mig-bar-fill {
        display: block;
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, transparent, var(--brand), transparent);
        transform: translateX(-100%);
        animation: cp-bar-sweep 2.6s linear infinite;
      }
      .cp-mig-paused .cp-mig-bar-fill { animation: none; background: #E8C66D; transform: translateX(0); width: 30%; }
      @keyframes cp-bar-sweep {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .cp-mig-log {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--bg-2);
        border: 1px solid var(--line);
        border-radius: 10px;
      }
      .cp-mig-log-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--brand);
        box-shadow: 0 0 0 4px rgba(42, 68, 119, 0.14);
        animation: cp-pulse 1.8s ease-in-out infinite;
      }
      .cp-mig-log-text {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        color: var(--ink-3);
      }
      .cp-mig-log-text b {
        color: var(--ink);
        font-weight: 600;
        margin-right: 4px;
      }

      /* ══ 5. MODERNIZATION mock ══ */
      .cp-mod {
        display: grid;
        grid-template-columns: 1fr 120px 1fr;
        gap: 18px;
        align-items: center;
      }
      @media (max-width: 720px) {
        .cp-mod { grid-template-columns: 1fr; }
      }
      .cp-mod-panel {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 18px 18px 16px;
        border-radius: 12px;
        border: 1px solid var(--line);
      }
      .cp-mod-legacy {
        background: rgba(181, 118, 46, 0.04);
        border-color: rgba(181, 118, 46, 0.2);
      }
      .cp-mod-modern {
        background: rgba(46, 125, 90, 0.04);
        border-color: rgba(46, 125, 90, 0.2);
      }
      .cp-mod-panel-h {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-4);
      }
      .cp-mod-file {
        position: relative;
        padding: 18px 18px 16px;
        border-radius: 8px;
        background: #FFFFFF;
        border: 1px solid var(--line);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .cp-mod-file-old {
        transform: rotate(-1.5deg);
        box-shadow: 0 8px 18px -10px rgba(181, 118, 46, 0.3);
      }
      .cp-mod-file-new {
        box-shadow: 0 10px 22px -10px rgba(46, 125, 90, 0.25);
      }
      .cp-mod-file-crumple {
        position: absolute;
        top: 0; right: 0;
        width: 22px;
        height: 22px;
        background: linear-gradient(135deg, transparent 48%, rgba(181, 118, 46, 0.25) 49%, var(--bg-2) 50%);
        border-bottom-left-radius: 6px;
      }
      .cp-mod-ext {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--brand);
        font-weight: 700;
      }
      .cp-mod-legacy .cp-mod-ext { color: #B5762E; }
      .cp-mod-modern .cp-mod-ext { color: #2E7D5A; }
      .cp-mod-cols {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .cp-mod-cols span {
        height: 6px;
        background: rgba(181, 118, 46, 0.25);
        border-radius: 3px;
        animation: cp-grow-x 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-mod-cols-neat span {
        background: rgba(46, 125, 90, 0.32);
        animation-delay: 0.8s;
      }
      .cp-mod-stats {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        color: var(--ink-3);
      }
      .cp-mod-bridge {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        position: relative;
      }
      .cp-mod-rings {
        position: relative;
        width: 90px;
        height: 90px;
      }
      .cp-mod-rings span {
        position: absolute;
        inset: 0;
        border: 1.5px solid rgba(42, 68, 119, 0.3);
        border-radius: 50%;
        animation: cp-ring-soft 2.6s ease-in-out infinite;
      }
      .cp-mod-rings span:nth-child(2) { animation-delay: 0.6s; }
      .cp-mod-rings span:nth-child(3) { animation-delay: 1.2s; }
      @keyframes cp-ring-soft {
        0%   { transform: scale(0.4); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
      }
      .cp-mod-bridge-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: var(--font-display), sans-serif;
        font-size: 11px;
        text-align: center;
        font-weight: 700;
        color: var(--brand);
        letter-spacing: -0.01em;
        line-height: 1.1;
      }
      .cp-mod-flow {
        display: flex;
        gap: 4px;
      }
      .cp-mod-flow span {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--brand);
        opacity: 0.3;
        animation: cp-flow-dot 1.4s ease-in-out infinite;
      }
      .cp-mod-flow span:nth-child(2) { animation-delay: 0.12s; }
      .cp-mod-flow span:nth-child(3) { animation-delay: 0.24s; }
      .cp-mod-flow span:nth-child(4) { animation-delay: 0.36s; }
      .cp-mod-flow span:nth-child(5) { animation-delay: 0.48s; }
      @keyframes cp-flow-dot {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50%      { opacity: 1;   transform: scale(1.4); }
      }

      /* ══ 6. SECURITY mock ══ */
      .cp-sec {
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        gap: 24px;
        align-items: start;
      }
      @media (max-width: 800px) {
        .cp-sec { grid-template-columns: 1fr; }
      }
      .cp-sec-matrix {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .cp-sec-head, .cp-sec-row {
        display: grid;
        grid-template-columns: 90px repeat(6, 1fr);
        gap: 4px;
        align-items: center;
      }
      .cp-sec-head {
        padding: 4px 4px 8px;
        border-bottom: 1px solid var(--line);
      }
      .cp-sec-col-h {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.1em;
        color: var(--ink-4);
        text-transform: uppercase;
        text-align: center;
        writing-mode: horizontal-tb;
      }
      .cp-sec-row {
        padding: 6px 4px;
        border-bottom: 1px dotted var(--line);
        opacity: 0;
        animation: cp-rise 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-sec-row-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 13px;
        color: var(--ink);
      }
      .cp-sec-cell {
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-mono), monospace;
        font-size: 13px;
        border-radius: 4px;
        opacity: 0;
        animation: cp-fade-in 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes cp-fade-in {
        to { opacity: 1; }
      }
      .cp-sec-cell-ok {
        background: rgba(46, 125, 90, 0.14);
        color: #2E7D5A;
      }
      .cp-sec-cell-ro {
        background: rgba(15, 23, 41, 0.05);
        color: var(--ink-4);
      }
      .cp-sec-cell-no {
        background: transparent;
        color: var(--ink-4);
      }
      .cp-sec-log {
        background: var(--navy-deep);
        color: #E8EEF9;
        border-radius: 12px;
        padding: 16px 18px 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .cp-sec-log-head {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        margin-bottom: 6px;
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: rgba(232, 238, 249, 0.6);
      }
      .cp-sec-log-pulse {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #88C08A;
        box-shadow: 0 0 0 3px rgba(136, 192, 138, 0.25);
        animation: cp-pulse 1.8s ease-in-out infinite;
      }
      .cp-sec-log-row {
        display: grid;
        grid-template-columns: 58px 1fr 76px 1fr;
        gap: 8px;
        padding: 5px 0;
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        opacity: 0;
        animation: cp-rise 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cp-sec-log-t { color: rgba(232, 238, 249, 0.4); }
      .cp-sec-log-who { color: #a0c4f0; }
      .cp-sec-log-act {
        font-weight: 600;
        letter-spacing: 0.05em;
      }
      .cp-sec-log-act-approved { color: #88C08A; }
      .cp-sec-log-act-ran-job { color: #a0c4f0; }
      .cp-sec-log-act-denied { color: #E8816D; }
      .cp-sec-log-act-signed-url { color: #E8C66D; }
      .cp-sec-log-tgt { color: rgba(232, 238, 249, 0.65); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      /* ══ FOOTER (navy band + stencil watermark) ══ */
      .cp-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF;
        padding: 96px 0 0;
        margin-top: 80px;
        overflow: hidden;
      }
      .cp-footer::after {
        content: ""; position: absolute; top: 0; left: 50%;
        transform: translateX(-50%);
        width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .cp-footer > .cp-container { position: relative; z-index: 1; }
      .cp-footer-inner { display: flex; flex-direction: column; gap: 48px; }
      .cp-footer-top {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
        gap: 72px;
      }
      .cp-footer-brand-col { display: flex; flex-direction: column; gap: 18px; }
      .cp-footer-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF; }
      .cp-footer-brand-logo { display: inline-flex; width: 40px; height: 40px; }
      .cp-footer-brand-logo img { width: 40px; height: 40px; filter: brightness(1.1); }
      .cp-footer-brand-text { display: flex; flex-direction: column; line-height: 1.1; }
      .cp-footer-brand-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700; font-size: 18px; letter-spacing: -0.01em;
        color: #FFFFFF;
      }
      .cp-footer-brand-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px; letter-spacing: 0.18em;
        color: rgba(160, 196, 240, 0.65); text-transform: uppercase;
        margin-top: 3px;
      }
      .cp-footer-blurb {
        max-width: 32ch;
        font-size: 14.5px;
        color: rgba(200, 215, 240, 0.72);
        line-height: 1.6;
        margin: 8px 0 0;
      }
      .cp-footer-cols {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 36px;
      }
      .cp-foot-h {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px; letter-spacing: 0.22em;
        color: #a0c4f0; font-weight: 700;
        margin-bottom: 18px;
        text-transform: uppercase;
      }
      .cp-footer-cols ul {
        list-style: none; padding: 0; margin: 0;
        display: flex; flex-direction: column; gap: 10px;
        font-size: 14px;
      }
      .cp-footer-cols a {
        color: rgba(220, 232, 250, 0.72);
        text-decoration: none;
        transition: color 0.2s, transform 0.2s;
        display: inline-block;
      }
      .cp-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }
      .cp-footer-watermark {
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
      .cp-footer-bottom {
        position: relative; z-index: 1;
        display: flex; justify-content: center; align-items: center;
        padding: 22px 0 28px; margin-top: -10px;
      }
      .cp-footer-bottom > span {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px; letter-spacing: 0.1em;
        color: rgba(200, 215, 240, 0.55); text-align: center;
      }
      @media (max-width: 900px) {
        .cp-footer-top { grid-template-columns: 1fr; gap: 40px; }
      }
      @media (max-width: 600px) {
        .cp-footer { padding: 72px 0 0; margin-top: 60px; }
        .cp-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
        .cp-footer-watermark { margin: 28px 0 0; }
      }

      /* ═══════════════════════════════════════════════════════
         MOBILE OVERRIDES — consolidated
         ═══════════════════════════════════════════════════════ */

      /* ── tablet / mid (≤ 900px) ── */
      @media (max-width: 900px) {
        .cp-nav-inner { padding: 14px 22px; }
        .cp-nav-links { gap: 20px; font-size: 13.5px; }
        .cp-logo-tag { display: none; }

        .cp-hero { padding: 140px 0 90px; }
        .cp-hero-glow { width: 760px; height: 480px; }
        .cp-hero-glow-2, .cp-hero-glow-3 { width: 420px; height: 340px; }

        .cp-pillars { padding: 80px 0; }
        .cp-how     { padding: 90px 0; }
        .cp-features{ padding: 90px 0; }
        .cp-outcome { padding: 72px 0; }
        .cp-related { padding: 90px 0; }
        .cp-product { padding: 90px 0 100px; }
        .cp-cta-final { padding: 40px 0 80px; }
      }

      /* ── phone (≤ 640px) ── */
      @media (max-width: 640px) {
        .cp-nav-inner { padding: 12px 18px; }
        .cp-nav-links { gap: 14px; font-size: 13px; }
        .cp-logo-name { font-size: 15.5px; }
        .cp-nav-cta { padding: 8px 14px; font-size: 12.5px; }

        .cp-hero { padding: 110px 0 64px; }
        .cp-hero-body { gap: 16px; }
        .cp-hero-grid { background-size: 40px 40px; }
        .cp-hero-glow { top: -6%; width: 560px; height: 380px; filter: blur(60px); }
        .cp-hero-glow-2 { width: 320px; height: 260px; filter: blur(70px); }
        .cp-hero-glow-3 { width: 280px; height: 240px; filter: blur(70px); }
        .cp-lede { font-size: 15.5px; line-height: 1.55; }

        .cp-statement { padding: 48px 0; }
        .cp-statement p { font-size: clamp(22px, 6.6vw, 30px); }

        .cp-section-head { margin-bottom: 32px; gap: 10px; }
        .cp-pillars { padding: 56px 0; }
        .cp-how     { padding: 64px 0; }
        .cp-features{ padding: 64px 0; }
        .cp-outcome { padding: 52px 0; }
        .cp-related { padding: 64px 0; }
        .cp-product { padding: 64px 0 72px; }
        .cp-product-head { margin-bottom: 28px; }
        .cp-product-frame { border-radius: 12px; }
        .cp-product-chrome { padding: 10px 14px; gap: 6px; }
        .cp-product-dot { width: 9px; height: 9px; }
        .cp-product-url { font-size: 10.5px; max-width: 200px; padding: 4px 10px; }
        .cp-product-cap { padding: 12px 14px 14px; font-size: 11px; letter-spacing: 0; }
        .cp-product-sub { font-size: 14.5px; }
        .cp-product-grid { background-size: 44px 44px; }
        .cp-cta-final { padding: 28px 0 60px; }

        .cp-pillar { padding: 22px 18px 24px; gap: 10px; }
        .cp-pillar-icon { width: 46px; height: 46px; }
        .cp-pillar-label { font-size: 19px; }

        .cp-feature { padding: 24px 20px 26px; }
        .cp-feature-title { font-size: 17px; }

        /* Outcome stat + quote */
        .cp-outcome-card { gap: 20px; }
        .cp-outcome-num { font-size: clamp(54px, 16vw, 72px); }
        .cp-outcome-quote { font-size: clamp(19px, 5vw, 24px); }

        /* Related card */
        .cp-related-card { padding: 22px 22px 60px; min-height: 200px; gap: 12px; }
        .cp-related-icon { width: 50px; height: 50px; }
        .cp-related-title { font-size: 18.5px; }
        .cp-related-arrow { bottom: 20px; right: 20px; width: 28px; height: 28px; font-size: 13px; }

        /* Final CTA */
        .cp-cta-card { padding: 32px 26px 34px; border-radius: 18px; }
        .cp-cta-rings { display: none; }
        .cp-cta-h { font-size: clamp(22px, 6vw, 28px); }

        /* Footer */
        .cp-footer { padding: 28px 0; }
        .cp-footer-inner { flex-direction: column; align-items: flex-start; gap: 10px; }

        /* ── MOCK CHROMES — tighten & allow horizontal scroll where dense ── */
        .cp-mock-body { padding: 16px 14px 18px; }
        .cp-mock-head { gap: 10px; padding-bottom: 12px; margin-bottom: 14px; }
        .cp-mock-h-label { font-size: 13.5px; }
        .cp-mock-chips { gap: 4px; }
        .cp-mock-chip { font-size: 9px; padding: 3px 7px; }

        /* Profiling — collapse 5-col grid into a stacked card per row */
        .cp-prof-head { display: none; }
        .cp-prof-row {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-areas:
            "name  type"
            "null  null"
            "uniq  uniq"
            "conf  conf";
          gap: 6px 10px;
          padding: 12px 10px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .cp-prof-name { grid-area: name; font-size: 13px; }
        .cp-prof-type { grid-area: type; justify-self: end; }
        .cp-prof-bar:nth-of-type(3) { grid-area: null; }
        .cp-prof-bar:nth-of-type(4) { grid-area: uniq; }
        .cp-prof-conf { grid-area: conf; justify-self: start; }
        .cp-prof-bar::before {
          font-family: var(--font-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.14em;
          color: var(--ink-4);
          text-transform: uppercase;
          min-width: 46px;
        }
        .cp-prof-bar:nth-of-type(3)::before { content: "NULLS"; }
        .cp-prof-bar:nth-of-type(4)::before { content: "UNIQUE"; }
        .cp-prof-foot { flex-direction: column; align-items: flex-start; gap: 8px; }

        /* Quality — tighten rule rows */
        .cp-qual { gap: 20px; }
        .cp-qual-score { grid-template-columns: 100px 1fr; gap: 12px; }
        .cp-qual-score svg { width: 100px; height: 100px; }
        .cp-qual-rule {
          grid-template-columns: 44px 1fr 48px;
          gap: 8px;
          font-size: 12px;
        }
        .cp-qual-rule-bar { display: none; }

        /* Transformation — remove the middle wire slot */
        .cp-xform-heads { display: none; }
        .cp-xform-row {
          grid-template-columns: 1fr;
          gap: 4px;
          padding: 10px;
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 8px;
        }
        .cp-xform-wire { display: none; }
        .cp-xform-node { font-size: 12px; padding: 8px 10px; }
        .cp-xform-node-tgt::before {
          content: "→";
          font-family: var(--font-mono), monospace;
          color: var(--brand);
          margin-right: 6px;
          font-weight: 700;
        }

        /* Migration cards */
        .cp-mig-card { padding: 12px; }
        .cp-mig-name { font-size: 12.5px; }
        .cp-mig-delta { font-size: 11px; }
        .cp-mig-time { font-size: 10px; }
        .cp-mig-log-text { font-size: 11px; }

        /* Modernization — single column, center bridge horizontally */
        .cp-mod { gap: 14px; }
        .cp-mod-panel { padding: 14px 14px 12px; }
        .cp-mod-bridge { flex-direction: row; gap: 12px; justify-content: center; }
        .cp-mod-rings { width: 60px; height: 60px; }
        .cp-mod-bridge-label { font-size: 10px; }
        .cp-mod-flow { display: none; }

        /* Security — compact matrix, smaller cells */
        .cp-sec { gap: 18px; }
        .cp-sec-head, .cp-sec-row {
          grid-template-columns: 62px repeat(6, 1fr);
          gap: 2px;
        }
        .cp-sec-col-h { font-size: 8.5px; letter-spacing: 0.06em; }
        .cp-sec-row-h { font-size: 11.5px; }
        .cp-sec-cell { height: 22px; font-size: 11px; border-radius: 3px; }
        .cp-sec-log { padding: 12px 12px 10px; }
        .cp-sec-log-row {
          grid-template-columns: 48px 1fr;
          gap: 4px 10px;
        }
        .cp-sec-log-row > :nth-child(3) { grid-column: 1 / 3; }
        .cp-sec-log-row > :nth-child(4) { grid-column: 1 / 3; opacity: 0.7; }
      }

      /* ── very small (≤ 420px) ── */
      @media (max-width: 420px) {
        .cp-container { padding: 0 18px; }
        .cp-nav-cta { padding: 7px 12px; }
        .cp-hero { padding: 100px 0 54px; }
        .cp-mock-body { padding: 14px 10px 14px; }
        .cp-mock-head { flex-direction: column; align-items: flex-start; gap: 8px; }
        .cp-mock-chips { flex-wrap: wrap; }

        /* Pipeline steps — tighten the vertical stack */
        .cp-how-step { gap: 8px; }
        .cp-how-n { font-size: 30px; }
        .cp-how-title { font-size: 18px; }
        .cp-how-body { font-size: 13.5px; }
      }
    `}</style>
  )
}
