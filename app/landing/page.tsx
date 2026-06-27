"use client"

import { Manrope, Inter, Instrument_Serif, IBM_Plex_Mono } from "next/font/google"
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
  animate,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine"
import { SiteNav, SiteCta, SiteFooter, SiteChromeStyles } from "@/components/SiteChrome"
import Lenis from "lenis"

/* Hero display stays Manrope; body is Inter and mono is IBM Plex Mono
   to match the official CleanFlowAI design system in app/globals.css */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
})

/* ------------------------------------------------------------------ */
/*  ANIMATION UTILITIES                                                */
/* ------------------------------------------------------------------ */

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
}

const riseDelay = (d: number) => ({
  ...rise,
  transition: { ...rise.transition, delay: d },
})

/* ------------------------------------------------------------------ */
/*  SMOOTH SCROLL (Lenis)                                              */
/* ------------------------------------------------------------------ */

/* Observe .cf-fade-up elements and add .cf-visible on scroll-into-view */
function FadeUpObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".cf-fade-up")
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cf-visible")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

function SmoothScroll() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    /* Buttery-smooth scroll tuning:
       - longer duration (1.5s) for gentle deceleration
       - quartic ease-out curve — fast start, soft landing
       - lerp-based interpolation for ultra-smooth wheel response
       - touch multiplier dialed down so trackpads don't over-scroll */
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      lerp: 0.09,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  return null
}

/* ------------------------------------------------------------------ */
/*  PARTICLE BACKGROUND (@tsparticles)                                 */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const prefersReducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [prefersReducedMotion])

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const particlesLoaded = useCallback(async (_c?: Container) => {
    // no-op — hook exists for the tsparticles API contract
  }, [])

  /* Spec calls for white + #a78bfa at 0.2 opacity, but our hero background
     is light cream (#FBFBF8) — white is invisible. Swap white for navy so
     both particle colors are legible on light bg; bump opacity + link opacity
     so the effect is actually perceptible. Keep count, size, speed, and
     repulse-distance per spec. */
  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 150, duration: 0.4 },
      },
    },
    particles: {
      number: { value: 60, density: { enable: false } },
      color: { value: ["#2a4477", "#a78bfa"] },
      opacity: { value: 0.55 },
      size: { value: 2 },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        outModes: { default: "bounce" },
        random: true,
      },
      links: {
        enable: true,
        distance: 130,
        color: "#3a5a94",
        opacity: 0.18,
        width: 1,
      },
    },
  }

  if (prefersReducedMotion || isMobile || !ready) return null

  return (
    <div className="cf-particle-field" aria-hidden>
      <Particles
        id="cf-hero-particles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
      <div className="cf-particle-mask" aria-hidden />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL WRAPPER                                              */
/* ------------------------------------------------------------------ */

type Direction = "up" | "down" | "left" | "right"

function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
}: {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const offset = 42
  const initial: Record<string, number> = { opacity: 0 }
  if (direction === "up") initial.y = offset
  if (direction === "down") initial.y = -offset
  if (direction === "left") initial.x = offset
  if (direction === "right") initial.x = -offset

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div
      className={`${manrope.variable} ${inter.variable} ${instrument.variable} ${mono.variable} cf-root`}
    >
      <StyleBlock />
      <SiteChromeStyles />
      <SmoothScroll />
      <FadeUpObserver />

      <SiteNav />

      <main>
        <Hero />
        <ScrollReveal direction="up"><TrustBar /></ScrollReveal>
        <ScrollReveal direction="up"><DashPreview /></ScrollReveal>
        <ScrollReveal direction="up"><MetricsStrip /></ScrollReveal>
        <ScrollReveal direction="up"><Features /></ScrollReveal>
        <ScrollReveal direction="up"><Pipeline /></ScrollReveal>
        <ScrollReveal direction="up"><Quote /></ScrollReveal>
        <ScrollReveal direction="up"><SiteCta /></ScrollReveal>
      </main>

      <ScrollReveal direction="up"><SiteFooter /></ScrollReveal>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  LOGO + WORDMARK                                                    */
/* ------------------------------------------------------------------ */

function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <a href="#" className={`cf-wordmark cf-wordmark-${size}`} aria-label="CleanFlowAI">
      <span className="cf-logo-wrap">
        <img
          src="/favicon_io/android-chrome-192x192.png"
          alt=""
          className="cf-logo-img"
          width={40}
          height={40}
        />
        <span className="cf-logo-glow" aria-hidden />
      </span>
      <span className="cf-logo-text">
        <span className="cf-logo-name">CleanFlowAI</span>
        <span className="cf-logo-tag">DATA QUALITY PLATFORM</span>
      </span>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  TOP BAR                                                            */
/* ------------------------------------------------------------------ */

function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const capabilities = [
    { slug: "profiling",      name: "Data Profiling",       blurb: "AutoMap type inference, statistical fingerprinting, AI-drafted rule suggestions." },
    { slug: "quality",        name: "Data Quality",         blurb: "CleanDataShield rules, Quarantine Editor, approval-based remediation." },
    { slug: "transformation", name: "Data Transformation",  blurb: "AutoMap field resolution, version-controlled blueprints, deterministic execution." },
    { slug: "migration",      name: "Data Migration",       blurb: "OAuth connectors, real-time Jobs, stateful incremental sync." },
    { slug: "modernization",  name: "Data Modernization",   blurb: "Encoding normalization, schema-drift reconciliation, warehouse-native output." },
    { slug: "security",       name: "Data Security",        blurb: "Identity-scoped access, approval-based change control, immutable audit lineage." },
  ]

  return (
    <header className={`cf-topbar ${scrolled ? "cf-topbar-solid" : "cf-topbar-glass"}`}>
      <div className="cf-container cf-topbar-inner">
        <Wordmark />
        <nav className="cf-nav">
          <div
            className="cf-nav-dd"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button
              type="button"
              className="cf-nav-dd-trigger"
              aria-expanded={platformOpen}
              aria-haspopup="true"
              onClick={() => setPlatformOpen((v) => !v)}
            >
              <span>Solutions</span>
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden className={`cf-nav-dd-caret ${platformOpen ? "cf-nav-dd-caret-open" : ""}`}>
                <path d="M1 1 L 5 5 L 9 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`cf-nav-dd-menu ${platformOpen ? "cf-nav-dd-menu-open" : ""}`} role="menu">
              <div className="cf-nav-dd-inner">
                <div className="cf-nav-dd-head">
                  <span className="cf-nav-dd-eyebrow">SOLUTIONS</span>
                  <span className="cf-nav-dd-hint">Every discipline, one trust layer</span>
                </div>
                <div className="cf-nav-dd-split">
                  <div className="cf-nav-dd-grid">
                    {capabilities.map((c) => (
                      <a key={c.slug} href={`/capabilities/${c.slug}`} className="cf-nav-dd-item" role="menuitem">
                        <span className="cf-nav-dd-item-name">{c.name}</span>
                        <span className="cf-nav-dd-item-blurb">{c.blurb}</span>
                      </a>
                    ))}
                  </div>
                  <a href="/cleanai" className="cf-nav-dd-feature" role="menuitem">
                    <div className="cf-nav-dd-feature-head">
                      <span className="cf-nav-dd-feature-icon" aria-hidden>
                        <img src="/brain-removebg-preview.png" alt="" />
                      </span>
                      <span className="cf-nav-dd-feature-tag">CLEANAI</span>
                    </div>
                    <h4 className="cf-nav-dd-feature-h">The intelligence engine</h4>
                    <p className="cf-nav-dd-feature-b">AutoMap, Business Rules Suggestion, and Quarantine reasoning — all governed by Suggest → Approve → Execute.</p>
                    <span className="cf-nav-dd-feature-cta">Explore CleanAI →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a href="#features">Modules</a>
          <a href="#pipeline">Workflow</a>
          <a href="/support" className="cf-nav-cta">
            <span>Request demo</span>
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 12" width="22" height="11" aria-hidden className="cf-arrow">
      <path d="M0 6 H 22 M 16 1 L 22 6 L 16 11" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  HERO — Data Tunnel 3D                                              */
/* ------------------------------------------------------------------ */

function DataTunnelScene() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return
    let dead = false
    let raf: number
    let renderer: any

    const boot = async () => {
      const T = await import("three")
      if (dead || !ref.current) return
      const el = ref.current
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      const scene = new T.Scene()
      const cam = new T.PerspectiveCamera(60, el.offsetWidth / el.offsetHeight, 0.1, 200)
      /* Camera inside the tunnel, looking down the Z axis */
      cam.position.set(0, 0, 2)
      cam.lookAt(0, 0, -50)

      renderer = new T.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(el.offsetWidth, el.offsetHeight)
      renderer.setPixelRatio(dpr)
      renderer.setClearColor(0x000000, 0)
      el.appendChild(renderer.domElement)

      /* ---- Tunnel: multiple concentric wireframe cylinders ---- */
      const tunnelGroup = new T.Group()
      scene.add(tunnelGroup)

      const TUNNEL_LEN = 80
      const TUNNEL_RAD = 4.5
      const disposables: any[] = []

      /* Primary tunnel wireframe */
      const tunnelGeo = new T.CylinderGeometry(TUNNEL_RAD, TUNNEL_RAD, TUNNEL_LEN, 40, 60, true)
      tunnelGeo.rotateX(Math.PI / 2) // orient along Z
      const tunnelMat = new T.MeshBasicMaterial({
        color: 0x2a4477,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
      const tunnel = new T.Mesh(tunnelGeo, tunnelMat)
      tunnel.position.z = -TUNNEL_LEN / 2 + 5
      tunnelGroup.add(tunnel)
      disposables.push(tunnelGeo, tunnelMat)

      /* Inner glow tunnel — slightly smaller, lighter */
      const innerGeo = new T.CylinderGeometry(TUNNEL_RAD * 0.7, TUNNEL_RAD * 0.7, TUNNEL_LEN, 32, 50, true)
      innerGeo.rotateX(Math.PI / 2)
      const innerMat = new T.MeshBasicMaterial({
        color: 0x3a5a94,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
      const innerTunnel = new T.Mesh(innerGeo, innerMat)
      innerTunnel.position.z = -TUNNEL_LEN / 2 + 5
      tunnelGroup.add(innerTunnel)
      disposables.push(innerGeo, innerMat)

      /* Deep inner core — tightest, brightest wireframe */
      const coreGeo = new T.CylinderGeometry(TUNNEL_RAD * 0.35, TUNNEL_RAD * 0.35, TUNNEL_LEN, 20, 40, true)
      coreGeo.rotateX(Math.PI / 2)
      const coreMat = new T.MeshBasicMaterial({
        color: 0x5a7fb5,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      })
      const coreTunnel = new T.Mesh(coreGeo, coreMat)
      coreTunnel.position.z = -TUNNEL_LEN / 2 + 5
      tunnelGroup.add(coreTunnel)
      disposables.push(coreGeo, coreMat)

      /* ---- Ring accents: glowing rings along the tunnel ---- */
      const ringCount = 18
      const rings: T.Mesh[] = []
      for (let i = 0; i < ringCount; i++) {
        const ringGeo = new T.TorusGeometry(TUNNEL_RAD * (0.6 + Math.random() * 0.4), 0.02, 8, 64)
        const ringMat = new T.MeshBasicMaterial({
          color: i % 3 === 0 ? 0x5a7fb5 : 0x2a4477,
          transparent: true,
          opacity: 0.12 + Math.random() * 0.15,
        })
        const ring = new T.Mesh(ringGeo, ringMat)
        ring.position.z = -3 - (i / ringCount) * (TUNNEL_LEN - 10)
        ring.rotation.x = Math.random() * 0.15
        ring.rotation.y = Math.random() * 0.15
        tunnelGroup.add(ring)
        rings.push(ring)
        disposables.push(ringGeo, ringMat)
      }

      /* ---- Particles streaming through the tunnel ---- */
      const PARTICLE_COUNT = 600
      const pGeo = new T.BufferGeometry()
      const pPos = new Float32Array(PARTICLE_COUNT * 3)
      const pSpeeds = new Float32Array(PARTICLE_COUNT)
      const pRadii = new Float32Array(PARTICLE_COUNT)
      const pAngles = new Float32Array(PARTICLE_COUNT)

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 0.3 + Math.random() * (TUNNEL_RAD * 0.85)
        const z = -Math.random() * TUNNEL_LEN
        pPos[i * 3] = Math.cos(angle) * radius
        pPos[i * 3 + 1] = Math.sin(angle) * radius
        pPos[i * 3 + 2] = z
        pSpeeds[i] = 4 + Math.random() * 12
        pRadii[i] = radius
        pAngles[i] = angle
      }
      pGeo.setAttribute("position", new T.BufferAttribute(pPos, 3))
      const pMat = new T.PointsMaterial({
        color: 0x5a7fb5,
        size: 0.04,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      })
      const particles = new T.Points(pGeo, pMat)
      scene.add(particles)
      disposables.push(pGeo, pMat)

      const clock = new T.Clock()

      const ro = new ResizeObserver(() => {
        if (dead || !renderer) return
        cam.aspect = el.offsetWidth / el.offsetHeight
        cam.updateProjectionMatrix()
        renderer.setSize(el.offsetWidth, el.offsetHeight)
      })
      ro.observe(el)

      /* Gate heavy WebGL render to visible viewport + tab-active state.
         Preserves full visual fidelity; just stops rendering when nobody can see it. */
      let inView = true
      const io = new IntersectionObserver(
        ([e]) => { inView = e.isIntersecting },
        { rootMargin: "120px" }
      )
      io.observe(el)
      disposables.push({ dispose: () => io.disconnect() })

      let prevVisible = typeof document !== "undefined" ? !document.hidden : true
      const onVis = () => { prevVisible = !document.hidden }
      document.addEventListener("visibilitychange", onVis)

      const loop = () => {
        if (dead) return
        raf = requestAnimationFrame(loop)
        if (!inView || !prevVisible) {
          /* advance clock so dt stays sane when visibility returns, but skip render */
          clock.getDelta()
          return
        }
        const t = clock.getElapsedTime()
        const dt = clock.getDelta()

        /* Gentle tunnel rotation */
        tunnelGroup.rotation.z = t * 0.04

        /* Animate rings — subtle pulse + drift */
        rings.forEach((ring, i) => {
          const scale = 1 + Math.sin(t * 0.8 + i * 0.7) * 0.06
          ring.scale.set(scale, scale, 1)
          ring.rotation.z = t * 0.1 + i * 0.3
        })

        /* Stream particles forward (toward camera) */
        const pos = pGeo.attributes.position as T.BufferAttribute
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let z = pos.getZ(i) + pSpeeds[i] * dt
          /* Respawn at tunnel end when past camera */
          if (z > 5) {
            z = -TUNNEL_LEN + Math.random() * 5
            const newAngle = Math.random() * Math.PI * 2
            const newR = 0.3 + Math.random() * (TUNNEL_RAD * 0.85)
            pos.setX(i, Math.cos(newAngle) * newR)
            pos.setY(i, Math.sin(newAngle) * newR)
            pRadii[i] = newR
            pAngles[i] = newAngle
          }
          /* Gentle spiral as particles fly through */
          pAngles[i] += 0.002
          pos.setX(i, Math.cos(pAngles[i]) * pRadii[i])
          pos.setY(i, Math.sin(pAngles[i]) * pRadii[i])
          pos.setZ(i, z)
        }
        pos.needsUpdate = true

        /* Subtle camera sway */
        cam.position.x = Math.sin(t * 0.15) * 0.25
        cam.position.y = Math.cos(t * 0.12) * 0.2
        cam.lookAt(0, 0, -50)

        renderer.render(scene, cam)
      }
      raf = requestAnimationFrame(loop)

      ;(el as any).__cleanup = () => {
        ro.disconnect()
        document.removeEventListener("visibilitychange", onVis)
        cancelAnimationFrame(raf)
        disposables.forEach(d => d.dispose())
        renderer.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    }

    boot()
    return () => {
      dead = true
      if (ref.current && (ref.current as any).__cleanup) (ref.current as any).__cleanup()
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null
  return <div ref={ref} className="cf-3d-scene" aria-hidden />
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const reduced = !!prefersReducedMotion

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const rawOp = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0])
  const sp = { stiffness: 100, damping: 28, mass: 0.3 }
  const contentY = useSpring(rawY, sp)
  const contentOp = useSpring(rawOp, sp)

  /* Shared fade-up for every text element */
  const fadeUp = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 40 },
    animate: reduced ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as number[] },
  })

  return (
    <section className="cf-hero" ref={heroRef}>
      <DataTunnelScene />

      <div className="cf-hero-atmosphere" aria-hidden>
        <div className="cf-hero-glow-center" />
      </div>

      <motion.div
        className="cf-container cf-hero-centered"
        style={reduced ? undefined : { y: contentY, opacity: contentOp }}
      >
        {/* Line 1 */}
        <motion.div className="cf-hero-line" {...fadeUp(0.2)}>
          <span className="cf-hero-heading">Enterprise-grade</span>
        </motion.div>

        {/* Line 2 */}
        <motion.div className="cf-hero-line" {...fadeUp(0.35)}>
          <span className="cf-hero-heading cf-hero-heading-em">data quality</span>
        </motion.div>

        {/* Line 3 */}
        <motion.div className="cf-hero-line" {...fadeUp(0.5)}>
          <span className="cf-hero-heading">for every </span>
          <span className="cf-hero-heading cf-hero-heading-accent">flow</span>
          <span className="cf-hero-heading">.</span>
        </motion.div>

        {/* Subtitle — outcome-led, highlighted promise */}
        <motion.p className="cf-hero-sub" {...fadeUp(0.7)}>
          <span className="cf-hero-sub-hi">Profile, validate, fix, and ship clean data.</span>
          <span className="cf-hero-sub-break">
            <span className="cf-hero-sub-brand">CleanAI</span> powers every step of your data journey — from any source to any destination.
            Automatically draft rules, detect schemas, and audit every fix with complete visibility.
            Built for teams that demand precision, reliability, and control.
          </span>
        </motion.p>

      </motion.div>

      <div className="cf-hero-bottom-fade" aria-hidden />
    </section>
  )
}

function HeroLiveCard() {
  const rows = [
    { id: "A-00142", action: "name → Title Case", status: "fixed" as const },
    { id: "A-00143", action: "country → ISO 3166", status: "fixed" as const },
    { id: "A-00144", action: "email → invalid format", status: "hold" as const },
    { id: "A-00145", action: "phone → E.164", status: "fixed" as const },
  ]

  return (
    <div className="cf-live-card">
      <div className="cf-live-head">
        <div className="cf-live-dots">
          <span /><span /><span />
        </div>
        <span className="cf-live-title">customers_q3.csv</span>
        <span className="cf-live-tag">DQ_RUNNING</span>
      </div>

      <div className="cf-live-score">
        <div className="cf-live-score-meta">
          <span className="cf-live-score-label">DQ SCORE</span>
          <span className="cf-live-score-delta">+3.1 vs last run</span>
        </div>
        <div className="cf-live-score-value">
          <CountUp to={94.2} decimals={1} />
        </div>
        <div className="cf-live-score-bar">
          <div className="cf-live-score-fill" />
        </div>
      </div>

      <div className="cf-live-rows-head">
        <span>RECENT ACTIONS</span>
        <span className="cf-live-rows-meta">R1–R34 · LIVE</span>
      </div>

      <div className="cf-live-rows">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="cf-live-row"
            style={{ animationDelay: `${0.7 + i * 0.18}s` } as React.CSSProperties}
          >
            <span className={`cf-live-row-status cf-live-row-status-${r.status}`} />
            <span className="cf-live-row-id">{r.id}</span>
            <span className="cf-live-row-action">{r.action}</span>
            <span className={`cf-live-row-tag cf-live-row-tag-${r.status}`}>
              {r.status === "fixed" ? "FIX" : "HOLD"}
            </span>
          </div>
        ))}
        <div className="cf-live-scan" aria-hidden />
      </div>

      <div className="cf-live-foot">
        <div className="cf-live-counts">
          <span className="cf-live-count">
            <b>247</b>
            <span>fixed</span>
          </span>
          <span className="cf-live-count">
            <b>13</b>
            <span>held</span>
          </span>
          <span className="cf-live-count">
            <b>4,208</b>
            <span>records</span>
          </span>
        </div>
        <div className="cf-live-pulse">
          <span className="cf-live-pulse-dot" />
          <span>PROCESSING</span>
        </div>
      </div>
    </div>
  )
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden>
      <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 5.5 L 13 9 L 7 12.5 Z" fill="currentColor" />
    </svg>
  )
}

/* Wraps a single word in a motion.span with overflow mask.
   Used inside the hero h1 word-stagger reveal. */
function WordSpan({
  children,
  variants,
}: {
  children: React.ReactNode
  variants: Variants
}) {
  return (
    <span className="cf-word-mask">
      <motion.span className="cf-word" variants={variants}>
        {children}
      </motion.span>
    </span>
  )
}


/* ------------------------------------------------------------------ */
/*  TRUST BAR                                                          */
/* ------------------------------------------------------------------ */

/* ---------- Connector Logo Marks (simplified, brand-tinted) ---------- */
/* Each logo uses the brand's distinctive silhouette/initial. Real trademarks
   belong to their respective owners — these are abstract representations. */

function LogoQuickBooks() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="currentColor" />
      <text x="16" y="21" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="14" fill="#FFFFFF">qb</text>
    </svg>
  )
}
function LogoZoho() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="6" fill="currentColor" />
      <text x="16" y="21" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF">Z</text>
    </svg>
  )
}
function LogoSnowflake() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M16 3 V 29 M 4.7 9.5 L 27.3 22.5 M 4.7 22.5 L 27.3 9.5" />
      <circle cx="16" cy="16" r="3" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LogoGoogleDrive() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <path d="M10 4 L 22 4 L 30 18 L 24 28 L 8 28 L 2 18 Z" fill="currentColor" opacity="0.18" />
      <path d="M10 4 L 22 4 L 16 14 Z" fill="#FBBC04" />
      <path d="M22 4 L 30 18 L 24 28 L 16 14 Z" fill="#1FA463" />
      <path d="M10 4 L 16 14 L 8 28 L 2 18 Z" fill="#4285F4" />
      <path d="M8 28 L 24 28 L 28 22 L 4 22 Z" fill="#EA4335" opacity="0" />
      <path d="M16 14 L 24 28 L 8 28 Z" fill="#34A853" opacity="0" />
    </svg>
  )
}
function LogoSAP() {
  return (
    <svg viewBox="0 0 44 24" width="34" height="19" aria-hidden>
      <rect width="44" height="24" rx="3" fill="currentColor" />
      <text x="22" y="16.5" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.5" fill="#FFFFFF">SAP</text>
    </svg>
  )
}
function LogoSalesforce() {
  return (
    <svg viewBox="0 0 40 28" width="30" height="21" fill="currentColor" aria-hidden>
      <path d="M13 7c1.5-2 4-3.5 7-3.5 3.5 0 6.5 2 8 5 1-.5 2-.8 3-.8 4 0 7 3 7 7 0 3.5-2.5 6.5-6 7-.5 2.5-3 4.5-6 4.5-1.5 0-3-.5-4-1.3-1 2-3 3.3-5.5 3.3-2 0-4-1-5-2.5-1 .5-2 .7-3 .7-3.5 0-6.5-2.8-6.5-6.5 0-2.5 1.5-4.8 3.8-6-.3-1-.5-2-.5-3 0-4 3-7 7-7 0 .5.3 1.3.7 2.1z" />
    </svg>
  )
}
function LogoNetSuite() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <rect x="3" y="3" width="26" height="26" rx="4" fill="currentColor" />
      <text x="16" y="20.5" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="12" letterSpacing="-0.5" fill="#FFFFFF">NS</text>
    </svg>
  )
}
function LogoEpicor() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden>
      <circle cx="16" cy="16" r="14" />
      <path d="M10.5 11 H 20.5 V 13.8 H 13.5 V 14.6 H 19 V 17.4 H 13.5 V 18.2 H 20.5 V 21 H 10.5 Z" fill="#FFFFFF" />
    </svg>
  )
}
function LogoQAD() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="currentColor" />
      <text x="16" y="20" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="10" letterSpacing="-0.2" fill="#FFFFFF">QAD</text>
    </svg>
  )
}
function LogoDynamics() {
  return (
    <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden>
      <path d="M4 4 V 24 L 16 30 L 28 24 V 4 Z" fill="currentColor" opacity="0.9" />
      <path d="M4 4 L 16 10 V 30 L 4 24 Z" fill="currentColor" opacity="0.55" />
      <path d="M16 10 L 28 4 V 24 L 16 30 Z" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

function TrustBar() {
  const erps = [
    { name: "QUICKBOOKS ONLINE", live: true },
    { name: "ZOHO BOOKS", live: true },
    { name: "SNOWFLAKE", live: true },
    { name: "GOOGLE DRIVE", live: true },
    { name: "SAP", live: false },
    { name: "SALESFORCE", live: false },
    { name: "NETSUITE", live: false },
    { name: "EPICOR", live: false },
    { name: "QAD", live: false },
    { name: "MICROSOFT DYNAMICS", live: false },
  ]
  return (
    <section className="cf-trust">
      <div className="cf-container cf-trust-heading">
        <span className="cf-tag cf-fade-up">CONNECTS TO</span>
        <span className="cf-trust-sub cf-fade-up" data-delay="1">
          Any data warehouse, cloud system, or third-party platform in your stack.
        </span>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD PREVIEW                                                  */
/* ------------------------------------------------------------------ */

function DashPreview() {
  const dashRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  /* Scroll-linked scale: as the dashboard enters from the bottom, scale
     up from 0.9 → 1 and lift y -60 → 0 across the approach window. */
  const { scrollYProgress } = useScroll({
    target: dashRef,
    offset: ["start end", "center center"],
  })
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const rawY = useTransform(scrollYProgress, [0, 1], [60, 0])
  const springCfg = { stiffness: 120, damping: 26, mass: 0.5 }
  const scale = useSpring(rawScale, springCfg)
  const y = useSpring(rawY, springCfg)

  return (
    <section id="platform" className="cf-dash">
      <div className="cf-container">
        <motion.div className="cf-section-head" {...rise}>
          <span className="cf-tag cf-tag-teal cf-fade-up">THE CONSOLE</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            <span className="cf-h2-italic">One workspace</span>.
            <br />
            Every workflow, every run.
          </h2>
        </motion.div>

        <div className="cf-dash-clip">
        <div className="cf-dash-trio">
          {/* LEFT — Data Catalog */}
          <div className="cf-dash-panel cf-dash-panel-left">
            <DataCatalogMock />
          </div>

          {/* CENTER — Dashboard (unchanged) */}
          <motion.div
            ref={dashRef}
            className="cf-dash-frame cf-dash-center"
            style={prefersReducedMotion ? undefined : { scale, y }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="cf-dash-chrome">
              <div className="cf-chrome-dots">
                <span /><span /><span />
              </div>
              <div className="cf-chrome-url">
                <LockIcon />
                <span>app.cleanflowai.com/dashboard</span>
              </div>
              <div className="cf-chrome-badge">LIVE</div>
            </div>

            <div className="cf-dash-body">
              <DashSidebar />
              <DashMain />
            </div>
          </motion.div>

          {/* RIGHT — Quarantine Editor */}
          <div className="cf-dash-panel cf-dash-panel-right">
            <QuarantineEditorMock />
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Side mock #1: Data Catalog ---------- */

function DataCatalogMock() {
  const files = [
    { name: "zohobooks_contacts_2026.csv", size: "7.06 kB", q: "—",   rows: 45,  st: "ready",    stLabel: "Ready" },
    { name: "mf_customers_error.csv",     size: "7.06 kB", q: "76%",  rows: 50,  st: "complete", stLabel: "Complete" },
    { name: "zohobooks_contacts_2026…",   size: "6.48 kB", q: "0%",   rows: 10,  st: "complete", stLabel: "Complete" },
    { name: "customers.csv",              size: "78.05 kB",q: "81%",  rows: 500, st: "complete", stLabel: "Complete" },
    { name: "AccountContactLoader_Ov…",   size: "209.04 kB",q: "0%",  rows: 300, st: "complete", stLabel: "Complete" },
  ]
  return (
    <div className="cf-dash-frame cf-dash-mock">
      <div className="cf-dash-chrome">
        <div className="cf-chrome-dots"><span /><span /><span /></div>
        <div className="cf-chrome-url"><LockIcon /><span>app.cleanflowai.com/files</span></div>
        <div className="cf-chrome-badge">CATALOG</div>
      </div>

      <div className="cf-cat-body">
        <div className="cf-cat-head">
          <div className="cf-cat-title">Data Catalog</div>
          <div className="cf-cat-chips">
            <span className="cf-cat-chip">5 datasets</span>
            <span className="cf-cat-chip cf-cat-chip-ok">4 processed</span>
          </div>
        </div>
        <div className="cf-cat-toolbar">
          <div className="cf-cat-search">
            <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden>
              <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <line x1="10.5" y1="10.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span>Search datasets…</span>
          </div>
          <div className="cf-cat-import">+ Import</div>
        </div>
        <table className="cf-cat-table">
          <thead>
            <tr>
              <th>DATASET</th>
              <th>QUALITY</th>
              <th>RECORDS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.name}>
                <td>
                  <div className="cf-cat-file">
                    <span className="cf-cat-file-name">{f.name}</span>
                    <span className="cf-cat-file-size">{f.size}</span>
                  </div>
                </td>
                <td>
                  {f.q === "—" ? (
                    <span className="cf-cat-q-empty">—</span>
                  ) : (
                    <span className={`cf-cat-q ${parseInt(f.q) > 70 ? "cf-cat-q-hi" : parseInt(f.q) > 30 ? "cf-cat-q-mid" : "cf-cat-q-lo"}`}>
                      {f.q}
                    </span>
                  )}
                </td>
                <td className="cf-cat-rows">{f.rows}</td>
                <td>
                  <span className={`cf-cat-st cf-cat-st-${f.st}`}>{f.stLabel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------- Side mock #2: Quarantine Editor ---------- */

function QuarantineEditorMock() {
  const rows = [
    { id: "200005", name: "John Smith",       email: "test@gmail.com",         phone: "9876543210", err: [] },
    { id: "200004", name: "David Lee",        email: "david.lee@email.com",    phone: "P#BFT#4#A##", err: ["phone"] },
    { id: "200005", name: "Linda White",      email: "linda.white@email.com",  phone: "9876543210", err: [] },
    { id: "200006", name: "Michael Green",    email: "michael.m@..a",          phone: "P#AFT1#4#A##", err: ["email", "phone"] },
    { id: "200007", name: "Barbara Scott",    email: "barbara.m@email.com",    phone: "9876543210", err: [] },
    { id: "200010", name: "Elizabeth Adams",  email: "elizabeth.adams@emai…",  phone: "NaN",        err: ["phone"] },
    { id: "200011", name: "Christopher Carter", email: "christopher.car…",     phone: "0987776665", err: [] },
    { id: "200013", name: "Daniel Mitchell",  email: "daniel.mitchell@emai…",  phone: "9876543210", err: [] },
    { id: "200014", name: "Paul Perez",       email: "DROP DATABASE STUDENT",  phone: "T7#ht#O55#",  err: ["email", "phone"] },
    { id: "200017", name: "Jeffrey Rogers",   email: "jeffrey.rogers@emai…",   phone: "9876543210", err: [] },
  ]
  return (
    <div className="cf-dash-frame cf-dash-mock">
      <div className="cf-dash-chrome">
        <div className="cf-chrome-dots"><span /><span /><span /></div>
        <div className="cf-chrome-url"><LockIcon /><span>app.cleanflowai.com/quarantine</span></div>
        <div className="cf-chrome-badge">EDITOR</div>
      </div>

      <div className="cf-qt-body">
        <div className="cf-qt-toolbar">
          <div className="cf-qt-left">
            <span className="cf-qt-tab-on">⟳ Reprocess</span>
            <span className="cf-qt-tab">Super Admin</span>
            <span className="cf-qt-tab">Find &amp; Replace</span>
            <span className="cf-qt-tab">Columns</span>
          </div>
          <span className="cf-qt-saved">✓ Saved</span>
        </div>

        <table className="cf-qt-table">
          <thead>
            <tr>
              <th>CUSTOMER_ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="cf-qt-mono">{r.id}</td>
                <td>{r.name}</td>
                <td className={r.err.includes("email") ? "cf-qt-err" : ""}>
                  {r.email}
                </td>
                <td className={`cf-qt-mono ${r.err.includes("phone") ? "cf-qt-err" : ""}`}>
                  {r.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden>
      <rect x="2.5" y="6" width="9" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.5 6 V 4.5 a 2.5 2.5 0 0 1 5 0 V 6" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

function DashSidebar() {
  return (
    <aside className="cf-dash-side">
      <div className="cf-side-brand">
        <img src="/favicon_io/android-chrome-192x192.png" alt="" width={24} height={24} />
        <div>
          <div className="cf-side-name">CleanFlowAI</div>
          <div className="cf-side-sub">Data Quality Platform</div>
        </div>
      </div>

      <div className="cf-side-label">MAIN</div>
      <ul className="cf-side-list">
        <li className="cf-side-on">
          <GlyphBars />
          <span>Dashboard</span>
        </li>
        <li className="cf-side-has-badge">
          <GlyphDoc />
          <span>Data Catalog</span>
          <span className="cf-side-badge">3</span>
        </li>
        <li>
          <GlyphClock />
          <span>Jobs</span>
        </li>
      </ul>

      <div className="cf-side-label">SETTINGS</div>
      <ul className="cf-side-list">
        <li>
          <GlyphGear />
          <span>Admin</span>
        </li>
      </ul>

      <div className="cf-side-user">
        <span className="cf-avatar">U</span>
        <div>
          <div className="cf-side-uname">User</div>
          <div className="cf-side-uemail">user@cleanflowai.com</div>
        </div>
      </div>
    </aside>
  )
}

function DashMain() {
  return (
    <div className="cf-dash-content">
      <div className="cf-dash-welcome">
        <div>
          <h3 className="cf-dash-hi">
            Welcome back, <span className="cf-dash-hi-italic">User</span>
          </h3>
          <div className="cf-dash-date">TUESDAY · 14 APRIL 2026</div>
        </div>
        <div className="cf-dash-actions">
          <button className="cf-dash-btn">
            <RefreshGlyph />
            Refresh
          </button>
          <button className="cf-dash-btn">
            <DownloadGlyph />
            Download Report
          </button>
        </div>
      </div>

      <motion.div
        className="cf-kpi-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
        }}
      >
        <KpiCard label="TOTAL FILES" value={<CountUp to={3} />} sub="100% completion" icon={<GlyphDoc />} />
        <KpiCard label="AVG DQ SCORE" value={<CountUp to={68} decimals={1} suffix="%" />} sub="Needs attention" tone="danger" icon={<ShieldGlyph />} />
        <KpiCard label="PROCESSED" value={<CountUp to={7} />} sub="all sources" tone="teal" icon={<CheckGlyph />} />
        <KpiCard label="QUARANTINED RECORDS" value={<CountUp to={391} />} sub="Requires remediation" tone="warn" icon={<WarnGlyph />} />
      </motion.div>

      <div className="cf-alert">
        <span className="cf-alert-ico"><WarnGlyph /></span>
        <span className="cf-alert-text">
          <b>3 datasets need attention</b> — 3 with quarantined records
        </span>
        <button className="cf-alert-cta">
          View All <Arrow />
        </button>
      </div>

      <div className="cf-dash-layout">
        <div className="cf-panel cf-panel-rowdist">
          <div className="cf-panel-title">ROW DISTRIBUTION</div>
          <RowDistDonut />
        </div>

        <div className="cf-panel cf-panel-scoredist">
          <div className="cf-panel-title">SCORE DISTRIBUTION</div>
          <ScoreDistBars />
        </div>

        <div className="cf-panel cf-panel-activity">
          <div className="cf-panel-title">RECENT ACTIVITY</div>
          <ul className="cf-activity-list">
            <li>
              <span className="cf-act-dot cf-act-ok" />
              <div>
                <div>johnbooks_contacts_3.csv</div>
                <div className="cf-act-time">Processed · 2 min ago</div>
              </div>
            </li>
            <li>
              <span className="cf-act-dot cf-act-ok" />
              <div>
                <div>customers.csv</div>
                <div className="cf-act-time">Processed · 14 min ago</div>
              </div>
            </li>
            <li>
              <span className="cf-act-dot cf-act-warn" />
              <div>
                <div>AccountContact.csv</div>
                <div className="cf-act-time">Review · 1 hr ago</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="cf-panel cf-panel-trends">
          <div className="cf-chart-head">
            <span className="cf-panel-title">DATA PROCESSING TRENDS</span>
            <div className="cf-chart-tabs">
              <span>Day</span>
              <span>Week</span>
              <span className="cf-chart-tab-on">Month</span>
            </div>
          </div>
          <Sparkline />
        </div>

        <div className="cf-panel cf-panel-issues">
          <div className="cf-panel-head">
            <div className="cf-panel-title">TOP DQ ISSUES</div>
            <div className="cf-issues-total">
              <CountUp to={4722} /> <span>TOTAL</span>
            </div>
          </div>
          <TopIssuesList />
        </div>
      </div>
    </div>
  )
}

function RowDistDonut() {
  const validated = 55
  const quarantined = 45
  const circumference = 2 * Math.PI * 34
  const validatedLen = (validated / 100) * circumference
  const quarantinedLen = circumference - validatedLen

  return (
    <div className="cf-donut">
      <motion.svg
        viewBox="0 0 120 120"
        width="140"
        height="140"
        className="cf-donut-svg"
        initial={{ scale: 0.88, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <defs>
          <filter id="cf-donut-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* track */}
        <circle cx="60" cy="60" r="34" fill="none" stroke="var(--bg-3)" strokeWidth="14" />

        {/* validated segment — draws in on scroll */}
        <motion.circle
          cx="60"
          cy="60"
          r="34"
          fill="none"
          stroke="var(--blue)"
          strokeWidth="14"
          strokeDashoffset="0"
          transform="rotate(-90 60 60)"
          strokeLinecap="butt"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${validatedLen} ${circumference}` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        />

        {/* quarantined segment — draws in after the first */}
        <motion.circle
          cx="60"
          cy="60"
          r="34"
          fill="none"
          stroke="#E45858"
          strokeWidth="14"
          strokeDashoffset={`-${validatedLen}`}
          transform="rotate(-90 60 60)"
          strokeLinecap="butt"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${quarantinedLen} ${circumference}` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.19, 1, 0.22, 1] }}
        />

        <text x="60" y="60" textAnchor="middle" dominantBaseline="central" className="cf-donut-num">
          <tspan fontSize="20" fontWeight="700" fill="var(--ink)" fontFamily="var(--font-display), sans-serif">100%</tspan>
        </text>
      </motion.svg>
      <div className="cf-donut-legend">
        <div>
          <span className="cf-lg-dot cf-lg-teal" /> Validated{" "}
          <b>
            <CountUp to={validated} suffix="%" />
          </b>
        </div>
        <div>
          <span className="cf-lg-dot cf-lg-red" /> Quarantined{" "}
          <b>
            <CountUp to={quarantined} suffix="%" />
          </b>
        </div>
      </div>
    </div>
  )
}

function ScoreDistBars() {
  const bars = [
    { label: "Excellent", value: 1, color: "var(--blue)", pct: 25 },
    { label: "Good", value: 1, color: "#E6C15C", pct: 25 },
    { label: "Bad", value: 2, color: "#E45858", pct: 50 },
  ]
  return (
    <div className="cf-scorebars">
      {bars.map((b, i) => (
        <motion.div
          key={b.label}
          className="cf-scorebar-row"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="cf-scorebar-label">
            <span>{b.label}</span>
            <span className="cf-scorebar-val">
              <CountUp to={b.value} duration={1.2 + i * 0.15} />
            </span>
          </div>
          <div className="cf-scorebar-track">
            <motion.div
              className="cf-scorebar-fill"
              style={{ background: b.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${b.pct}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 1.4,
                delay: 0.25 + i * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TopIssuesList() {
  const issues = [
    { name: "Null Like Value — Treat As Missing", count: 3454, pct: 73 },
    { name: "Bad Text Long", count: 466, pct: 12 },
    { name: "'S2' Null Value in Non-Nullable Column", count: 402, pct: 9 },
    { name: "Missing Required Value", count: 258, pct: 5 },
    { name: "Duplicate Primary Key", count: 142, pct: 3 },
  ]
  return (
    <ul className="cf-issues-list">
      {issues.map((iss, i) => (
        <li key={iss.name} style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}>
          <div className="cf-issue-top">
            <span className="cf-issue-name">{iss.name}</span>
            <span className="cf-issue-count">
              <CountUp to={iss.count} duration={1.6 + i * 0.15} />
            </span>
          </div>
          <div className="cf-issue-bar">
            <div className="cf-issue-fill" style={{ width: `${iss.pct}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function KpiCard({
  label,
  value,
  sub,
  tone,
  icon,
}: {
  label: string
  value: React.ReactNode
  sub: string
  tone?: "teal" | "warn" | "danger"
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className={`cf-kpi cf-kpi-${tone ?? "base"}`}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
        },
      }}
    >
      <div className="cf-kpi-top">
        <div className="cf-kpi-icon">{icon}</div>
        <span className="cf-kpi-label">{label}</span>
      </div>
      <div className="cf-kpi-value">{value}</div>
      <div className="cf-kpi-sub">{sub}</div>
    </motion.div>
  )
}

function Sparkline() {
  const pts = [62, 74, 58, 81, 69, 88, 94, 79, 92, 85, 96, 94]
  const w = 560
  const h = 140
  const max = 100
  const step = w / (pts.length - 1)
  const path = pts
    .map((v, i) => {
      const x = i * step
      const y = h - (v / max) * h
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`

  return (
    <div className="cf-spark">
      <svg viewBox={`0 0 ${w} ${h + 20}`} preserveAspectRatio="none" className="cf-spark-svg">
        <defs>
          <linearGradient id="cf-spark-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
          <filter id="cf-spark-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((r) => (
          <motion.line
            key={r}
            x1="0"
            x2={w}
            y1={r * h}
            y2={r * h}
            stroke="rgba(15,23,42,0.08)"
            strokeDasharray="2 4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 + r * 0.1 }}
          />
        ))}

        {/* area gradient fill */}
        <motion.path
          d={areaPath}
          fill="url(#cf-spark-grad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
        />

        {/* the line itself — scroll-triggered draw-in */}
        <motion.path
          d={path}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            pathLength: { duration: 2, ease: [0.19, 1, 0.22, 1] },
            opacity: { duration: 0.4 },
          }}
        />

        {/* data points — pop in one at a time as the line passes through */}
        {pts.map((v, i) => (
          <motion.circle
            key={i}
            cx={i * step}
            cy={h - (v / max) * h}
            r="3.2"
            fill="#FFFFFF"
            stroke="var(--blue)"
            strokeWidth="1.8"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: 0.3 + (i / pts.length) * 1.7,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformOrigin: `${i * step}px ${h - (v / max) * h}px` }}
          />
        ))}

        {/* traveling highlight dot — infinite loop along the path, starts after draw-in */}
        <circle
          r="5"
          fill="var(--blue-3)"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          className="cf-spark-traveler"
          filter="url(#cf-spark-dot-glow)"
          style={{
            offsetPath: `path('${path}')`,
          } as React.CSSProperties}
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  DASH GLYPHS                                                        */
/* ------------------------------------------------------------------ */

function GlyphBars() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
      <rect x="2" y="9" width="2.5" height="5" fill="currentColor" />
      <rect x="6.75" y="5" width="2.5" height="9" fill="currentColor" />
      <rect x="11.5" y="2" width="2.5" height="12" fill="currentColor" />
    </svg>
  )
}
function GlyphDoc() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <path d="M3 2 h 7 l 3 3 v 9 H 3 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 2 v 3 h 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function GlyphClock() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5 V 8 L 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function GlyphGear() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.2" />
    </svg>
  )
}
function ShieldGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <path d="M8 2 L 13 4 V 9 C 13 12 8 14 8 14 C 8 14 3 12 3 9 V 4 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8.2 L 7.2 10.4 L 11 6.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function WarnGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
      <path d="M8 2 L 14 13 H 2 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 6.5 V 9.5 M 8 11 V 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function RefreshGlyph() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden>
      <path d="M12 7 a 5 5 0 1 1 -1.8 -3.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M12 2 V 4.5 H 9.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}
function DownloadGlyph() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden>
      <path d="M7 2 V 9 M 4 6 L 7 9 L 10 6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 11.5 H 11.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  METRICS STRIP                                                      */
/* ------------------------------------------------------------------ */

function CountUp({
  to,
  decimals = 0,
  duration = 2.0,
  prefix = "",
  suffix = "",
}: {
  to: number
  decimals?: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(() =>
    decimals ? (0).toFixed(decimals) : "0"
  )
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    // Reduced motion: jump straight to the final value
    if (prefersReducedMotion) {
      setDisplay(
        decimals ? to.toFixed(decimals) : Math.round(to).toLocaleString("en-US")
      )
      return
    }

    const controls = animate(motionValue, to, {
      duration,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (latest) => {
        setDisplay(
          decimals
            ? latest.toFixed(decimals)
            : Math.round(latest).toLocaleString("en-US")
        )
      },
    })

    return () => controls.stop()
  }, [inView, to, duration, decimals, motionValue, prefersReducedMotion])

  return (
    <span ref={ref} className="cf-countup">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

function MetricsStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  /* Scroll parallax — background decorations drift at different rates */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const rawBlobAY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rawBlobBY = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const rawGridY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const spring = { stiffness: 100, damping: 30, mass: 0.5 }
  const blobAY = useSpring(rawBlobAY, spring)
  const blobBY = useSpring(rawBlobBY, spring)
  const gridY = useSpring(rawGridY, spring)

  const metrics = [
    {
      num: 1,
      decimals: 0,
      suffix: "M / 32s",
      label: "Production throughput",
      sub: "Records cleared per engine pass, default preset",
      Icon: MetricIconSpeed,
    },
    {
      num: 99.9,
      decimals: 1,
      suffix: "%",
      label: "Uptime SLA",
      sub: "Monitored end-to-end, measured in service hours",
      Icon: MetricIconUptime,
    },
    {
      num: 100,
      decimals: 0,
      suffix: "%",
      label: "Audit-traceable fixes",
      sub: "Every correction tied to a rule identifier",
      Icon: MetricIconAudit,
    },
    {
      num: 0,
      decimals: 0,
      label: "Arbitrary code in production",
      sub: "Deterministic execution · reviewer-gated workflow",
      Icon: MetricIconNoCode,
    },
  ]

  return (
    <section ref={sectionRef} className="cf-metrics">
      {/* Parallax background decorations */}
      <motion.div
        className="cf-metrics-blob cf-metrics-blob-a"
        aria-hidden
        style={prefersReducedMotion ? undefined : { y: blobAY }}
      />
      <motion.div
        className="cf-metrics-blob cf-metrics-blob-b"
        aria-hidden
        style={prefersReducedMotion ? undefined : { y: blobBY }}
      />
      <motion.div
        className="cf-metrics-grid-bg"
        aria-hidden
        style={prefersReducedMotion ? undefined : { y: gridY }}
      />

      <div className="cf-container">
        <motion.div
          className="cf-section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="cf-tag cf-tag-teal cf-fade-up">ENTERPRISE COMMITMENTS</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            Built to the standards
            <br />
            <span className="cf-h2-italic">enterprises demand</span>.
          </h2>
          <p className="cf-metrics-desc cf-fade-up" data-delay="2">
            Not feature counts — procurement ready commitments. Throughput
            benchmarks, governance guarantees, and compliance posture your
            security and data teams will verify before signing. All powered
            by <span className="cf-metrics-brand">CleanAI</span>, the intelligence
            engine behind every run.
          </p>
        </motion.div>

        <motion.div
          className="cf-metrics-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MetricCard({
  num,
  decimals,
  suffix,
  label,
  sub,
  Icon,
}: {
  num: number
  decimals: number
  suffix?: string
  label: string
  sub: string
  Icon: React.ComponentType
}) {
  return (
    <motion.div
      className="cf-metric-card"
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
        },
      }}
    >
      <div className="cf-metric-badge" aria-hidden>
        <Icon />
      </div>
      <div className="cf-metric-content">
        <div className="cf-metric-num">
          <CountUp to={num} decimals={decimals} duration={1.6} />
          {suffix ? <span className="cf-metric-suffix">{suffix}</span> : null}
        </div>
        <div className="cf-metric-label">{label}</div>
        <div className="cf-metric-sub">{sub}</div>
      </div>
    </motion.div>
  )
}

/* ---------- METRIC ICONS ---------- */

function MetricIconRules() {
  /* Checkmark inside a shield — rules = validation */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3 L 23 6.5 V 14 C 23 19, 19 23, 14 25 C 9 23, 5 19, 5 14 V 6.5 L 14 3 Z" />
      <path d="M9.5 14 L 13 17.5 L 19 11" strokeWidth="2.2" />
    </svg>
  )
}

function MetricIconConnect() {
  /* Hub-and-spoke network — connectors */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="3" fill="currentColor" stroke="none" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="23" cy="5" r="2" />
      <circle cx="5" cy="23" r="2" />
      <circle cx="23" cy="23" r="2" />
      <path d="M6.5 6.5 L 12 12 M 21.5 6.5 L 16 12 M 6.5 21.5 L 12 16 M 21.5 21.5 L 16 16" />
    </svg>
  )
}

function MetricIconFile() {
  /* Clean document icon — folded corner + content lines */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3.5 H 17 L 22 8.5 V 21 a 1.8 1.8 0 0 1 -1.8 1.8 H 8 a 1.8 1.8 0 0 1 -1.8 -1.8 V 5.3 a 1.8 1.8 0 0 1 1.8 -1.8 Z" />
      <path d="M17 3.5 V 8.5 H 22" />
      <path d="M9.5 14 H 18.5 M 9.5 17.5 H 18.5 M 9.5 21 H 15" strokeWidth="1.4" />
    </svg>
  )
}

function MetricIconSpeed() {
  /* Speed gauge / lightning — engine throughput */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 18 a 10 10 0 0 1 20 0" />
      <path d="M14 18 L 20 9" strokeWidth="2.2" />
      <circle cx="14" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <path d="M6 21 H 22" opacity="0.45" />
    </svg>
  )
}

function MetricIconExport() {
  /* Kept for backward-compat */
  return <MetricIconSpeed />
}

function MetricIconUptime() {
  /* Shield encasing an ECG / heartbeat line — reliability + continuous monitoring */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3 L 23.5 6 V 14 C 23.5 19.5, 19 23, 14 25 C 9 23, 4.5 19.5, 4.5 14 V 6 Z" />
      <path d="M6.5 14.5 H 10 L 11.5 11 L 13.5 18 L 15.5 13 L 17 14.5 H 21.5" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}

function MetricIconAudit() {
  /* Document with verification checkmark seal — audit-traceable */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3.5 H 17 L 22 8.5 V 18.5 H 5 Z" />
      <path d="M17 3.5 V 8.5 H 22" />
      <path d="M8.5 11.5 H 14.5 M 8.5 14.5 H 12" strokeWidth="1.4" opacity="0.85" />
      <circle cx="19.5" cy="21" r="4.5" />
      <path d="M17.5 21 L 19 22.5 L 21.8 19.8" strokeWidth="1.9" />
    </svg>
  )
}

function MetricIconNoCode() {
  /* Code brackets </> inside a prohibition circle — no arbitrary code */
  return (
    <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="14" cy="14" r="11" />
      <path d="M10.5 10 L 7 14 L 10.5 18" />
      <path d="M17.5 10 L 21 14 L 17.5 18" />
      <path d="M6 22 L 22 6" strokeWidth="2.2" stroke="#DC2626" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  FEATURES                                                           */
/* ------------------------------------------------------------------ */

function Features() {
  const items = [
    {
      tag: "DATA QUALITY",
      title: "Confidence in every record",
      body:
        "Column profiling reads types, ranges, and null distributions before any rule executes — so your team stops inferring what's in the payload. 34 deterministic validators cover format, mandatory fields, and cross-column logic. Describe any edge case in plain English and CleanAI compiles it into a deterministic constraint. Every remediation is traceable, every report is audit-ready.",
      icon: <FeatIconB />,
      featured: true,
      href: "#pipeline",
    },
    {
      tag: "QUARANTINE EDITOR",
      title: "Correction, not rejection",
      body:
        "Records that fail validation don't disappear — they route to a familiar spreadsheet grid where your team can remediate them together. Rule violations are surfaced inline, find-and-replace operates across the dataset, and version history captures every iteration. Optional approval workflow keeps governance tight.",
      icon: <FeatIconA />,
      href: "#platform",
    },
    {
      tag: "SCHEDULED JOBS",
      title: "Automation without surprises",
      body:
        "Define a flow once — source, target, schedule, entities — and let it run. Incremental sync moves only new data. Auto-pause on repeated failure. Full run history. Hours saved every week for your team — nothing runs silently when it shouldn't.",
      icon: <FeatIconC />,
      href: "#features",
    },
  ]

  return (
    <section id="features" className="cf-features">
      <div className="cf-container">
        <motion.div className="cf-section-head" {...rise}>
          <span className="cf-tag cf-tag-teal cf-fade-up">DETERMINISTIC TRUST PRIMITIVES</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            Validate. <span className="cf-h2-italic">Correct</span>. Automate.
          </h2>
          <p className="cf-lede cf-fade-up" data-delay="2">
            Across every dataset and every run, three continuous movements show how CleanFlowAI
            transforms malformed data into a trusted, audit-ready artifact.
          </p>
        </motion.div>

        <div className="cf-srv-rows">
          {items.map((f, i) => (
            <motion.article
              key={f.tag}
              id={i === 0 ? "confidence" : undefined}
              className={`cf-srv-row ${i % 2 === 1 ? "cf-srv-flip" : ""}`}
              {...riseDelay(0.08 * i)}
            >
              <div className="cf-srv-copy">
                <span className="cf-feat-tag">{f.tag}</span>
                <h3 className="cf-srv-title">{f.title}</h3>
                <p className="cf-srv-body">{f.body}</p>
              </div>
              <div className="cf-srv-viz">
                <div className="cf-srv-viz-inner">
                  {i === 0 && <TransformViz />}
                  {i === 1 && <QualityViz />}
                  {i === 2 && <ShieldViz />}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatIconA() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden className="cf-fa">
      <rect className="cf-fa-bar cf-fa-bar1" x="5" y="25" width="5" height="10" rx="1" fill="currentColor" opacity="0.6" />
      <rect className="cf-fa-bar cf-fa-bar2" x="13" y="18" width="5" height="17" rx="1" fill="currentColor" opacity="0.75" />
      <rect className="cf-fa-bar cf-fa-bar3" x="21" y="10" width="5" height="25" rx="1" fill="currentColor" />
      <rect className="cf-fa-bar cf-fa-bar4" x="29" y="20" width="5" height="15" rx="1" fill="currentColor" opacity="0.75" />
      <circle className="cf-fa-dot" cx="35" cy="7" r="3" fill="var(--teal)" />
    </svg>
  )
}
function FeatIconB() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden className="cf-fb">
      <path d="M8 8 H 32 V 32 H 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 16 H 32 M 8 24 H 32 M 16 8 V 32 M 24 8 V 32" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <rect className="cf-fb-cell" x="16" y="16" width="8" height="8" fill="var(--teal)" />
      <path
        className="cf-fb-check"
        d="M17.5 20 L 19.5 22 L 22.5 18.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function FeatIconC() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden className="cf-fc">
      <circle className="cf-fc-hub" cx="10" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="cf-fc-node cf-fc-n1" cx="30" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="cf-fc-node cf-fc-n2" cx="30" cy="20" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="cf-fc-node cf-fc-n3" cx="30" cy="30" r="3.5" fill="var(--teal)" />
      <path className="cf-fc-line cf-fc-l1" d="M15 20 L 26.5 10" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path className="cf-fc-line cf-fc-l2" d="M15 20 L 26.5 20" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path className="cf-fc-line cf-fc-l3" d="M15 20 L 26.5 30" stroke="var(--teal)" strokeWidth="1.8" fill="none" />
      <circle className="cf-fc-pulse" cx="15" cy="20" r="2" fill="var(--teal)" />
    </svg>
  )
}

/* ---------- Compact Discipline Icons (live CSS animations) ---------- */

function DiscIconProfiling() {
  /* Bar chart — bars scale in sequence */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden className="cf-disc-ico">
      <rect className="cf-di-pf cf-di-pf-1" x="7"  y="28" width="6" height="13" rx="1.2" />
      <rect className="cf-di-pf cf-di-pf-2" x="17" y="20" width="6" height="21" rx="1.2" />
      <rect className="cf-di-pf cf-di-pf-3" x="27" y="24" width="6" height="17" rx="1.2" />
      <rect className="cf-di-pf cf-di-pf-4" x="37" y="16" width="6" height="25" rx="1.2" />
      <circle cx="40" cy="10" r="2.5" fill="var(--teal)" className="cf-di-pf-dot" />
    </svg>
  )
}

function DiscIconQuality() {
  /* Shield with checkmark drawing in */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="cf-disc-ico">
      <path d="M24 5 L 40 10 V 24 C 40 32, 33 39, 24 42 C 15 39, 8 32, 8 24 V 10 L 24 5 Z" />
      <path className="cf-di-q-check" d="M15 24 L 21 30 L 33 17" strokeWidth="2.4" />
    </svg>
  )
}

function DiscIconTransform() {
  /* Two rectangles with pulsing arrow between */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden className="cf-disc-ico">
      <rect x="4"  y="18" width="13" height="12" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="31" y="18" width="13" height="12" rx="2" fill="currentColor" />
      <g className="cf-di-tr-arrow" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M19 24 H 29" />
        <path d="M27 21 L 30 24 L 27 27" />
      </g>
    </svg>
  )
}

function DiscIconMigration() {
  /* Two circles connected by dashed line with particles flowing */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className="cf-disc-ico">
      <circle cx="9"  cy="24" r="5" />
      <circle cx="39" cy="24" r="5" />
      <path d="M14 24 H 34" strokeDasharray="2 3" opacity="0.4" />
      <circle r="2" fill="currentColor" stroke="none" className="cf-di-mg-dot cf-di-mg-dot-1" cx="14" cy="24" />
      <circle r="2" fill="currentColor" stroke="none" className="cf-di-mg-dot cf-di-mg-dot-2" cx="14" cy="24" />
      <circle r="2" fill="currentColor" stroke="none" className="cf-di-mg-dot cf-di-mg-dot-3" cx="14" cy="24" />
    </svg>
  )
}

function DiscIconModern() {
  /* Document with upward refresh arrow */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="cf-disc-ico">
      <path d="M13 7 H 28 L 36 15 V 38 a 2.5 2.5 0 0 1 -2.5 2.5 H 13 a 2.5 2.5 0 0 1 -2.5 -2.5 V 9.5 a 2.5 2.5 0 0 1 2.5 -2.5 Z" />
      <path d="M28 7 V 15 H 36" />
      <g className="cf-di-md-up">
        <path d="M23 33 V 21" strokeWidth="2.2" />
        <path d="M18 26 L 23 21 L 28 26" strokeWidth="2.2" />
      </g>
    </svg>
  )
}

function DiscIconSecurity() {
  /* Shield with lock icon inside, subtle pulse */
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="cf-disc-ico">
      <path d="M24 5 L 40 10 V 24 C 40 32, 33 39, 24 42 C 15 39, 8 32, 8 24 V 10 L 24 5 Z" className="cf-di-sec-shield" />
      <rect x="18" y="22" width="12" height="11" rx="1.5" />
      <path d="M20 22 V 18 a 4 4 0 0 1 8 0 V 22" />
      <circle cx="24" cy="27" r="1.3" fill="currentColor" stroke="none" className="cf-di-sec-dot" />
    </svg>
  )
}

/* ---------- LARGE SERVICE VISUALIZATIONS ---------- */

function TransformViz() {
  /* Left schema → right schema mapping with flowing particles */
  const leftCols = [
    { label: "name_full",   h: 72,  y: 60 },
    { label: "addr_1",      h: 96,  y: 160 },
    { label: "country_iso", h: 56,  y: 280 },
    { label: "amt_usd",     h: 84,  y: 360 },
  ]
  const rightCols = [
    { label: "Customer.Name",    h: 72,  y: 60 },
    { label: "Customer.Address", h: 96,  y: 160 },
    { label: "Customer.Country", h: 56,  y: 280 },
    { label: "Invoice.Amount",   h: 84,  y: 360 },
  ]
  return (
    <svg viewBox="0 0 560 480" className="cf-viz-svg" aria-hidden>
      <defs>
        <linearGradient id="cf-tv-bar" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--blue-2)" />
          <stop offset="100%" stopColor="var(--blue-4)" />
        </linearGradient>
        <linearGradient id="cf-tv-bar-r" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--teal-3)" />
        </linearGradient>
      </defs>

      {/* schema labels */}
      <text x="40" y="34" className="cf-viz-label">SCHEMA A · SOURCE</text>
      <text x="520" y="34" textAnchor="end" className="cf-viz-label">SCHEMA B · TARGET</text>

      {/* left columns */}
      {leftCols.map((c, i) => (
        <g key={`l${i}`}>
          <rect
            x="40" y={c.y}
            width="180" height={c.h}
            rx="6"
            fill="url(#cf-tv-bar)"
            opacity="0.9"
            className="cf-tv-bar cf-tv-bar-l"
            style={{ animationDelay: `${i * 0.2}s` } as React.CSSProperties}
          />
          <text x="50" y={c.y + 22} className="cf-viz-cell-label">{c.label}</text>
        </g>
      ))}

      {/* right columns */}
      {rightCols.map((c, i) => (
        <g key={`r${i}`}>
          <rect
            x="340" y={c.y}
            width="180" height={c.h}
            rx="6"
            fill="url(#cf-tv-bar-r)"
            opacity="0.9"
            className="cf-tv-bar cf-tv-bar-r"
            style={{ animationDelay: `${0.6 + i * 0.2}s` } as React.CSSProperties}
          />
          <text x="510" y={c.y + 22} textAnchor="end" className="cf-viz-cell-label">
            {c.label}
          </text>
        </g>
      ))}

      {/* connector lines + traveling particles */}
      {leftCols.map((c, i) => {
        const x1 = 220
        const y1 = c.y + c.h / 2
        const x2 = 340
        const y2 = rightCols[i].y + rightCols[i].h / 2
        return (
          <g key={`c${i}`}>
            <path
              d={`M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="var(--line-2)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <circle
              r="4"
              fill="var(--blue-2)"
              className="cf-tv-particle"
              style={{
                offsetPath: `path('M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}')`,
                animationDelay: `${1 + i * 0.4}s`,
              } as React.CSSProperties}
            />
          </g>
        )
      })}

      {/* arrow badge */}
      <g transform="translate(260, 420)">
        <rect x="0" y="0" width="40" height="24" rx="12" fill="var(--blue)" />
        <path d="M10 12 H 30 M 24 7 L 30 12 L 24 17" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
      </g>
      <text x="280" y="460" textAnchor="middle" className="cf-viz-label">
        TARGET SCHEMA MAPPED
      </text>
    </svg>
  )
}

function QualityViz() {
  /* Grid of 8×5 cells being validated row by row */
  const cols = 8
  const rows = 5
  const cellSize = 48
  const gap = 6
  const startX = 40
  const startY = 60
  const failAt = new Set(["1-3", "2-5", "3-1", "0-6", "4-4"])

  return (
    <svg viewBox="0 0 560 480" className="cf-viz-svg" aria-hidden>

      {/* cells */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`
          const x = startX + c * (cellSize + gap)
          const y = startY + r * (cellSize + gap)
          const isFail = failAt.has(key)
          const delay = r * 0.25 + c * 0.06
          return (
            <g key={key}>
              <rect
                x={x} y={y}
                width={cellSize} height={cellSize}
                rx="6"
                fill="var(--bg-2)"
                stroke="var(--line)"
                strokeWidth="1"
                className={`cf-qv-cell ${isFail ? "cf-qv-cell-fail" : ""}`}
                style={{ animationDelay: `${delay}s` } as React.CSSProperties}
              />
              {!isFail && (
                <path
                  d={`M ${x + 14} ${y + cellSize / 2} L ${x + cellSize / 2 - 2} ${y + cellSize - 18} L ${x + cellSize - 12} ${y + 16}`}
                  className="cf-qv-check"
                  style={{ animationDelay: `${delay + 0.2}s` } as React.CSSProperties}
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {isFail && (
                <g
                  className="cf-qv-x"
                  style={{ animationDelay: `${delay + 0.2}s` } as React.CSSProperties}
                >
                  <path
                    d={`M ${x + 14} ${y + 14} L ${x + cellSize - 14} ${y + cellSize - 14}`}
                    stroke="#E45858"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${x + cellSize - 14} ${y + 14} L ${x + 14} ${y + cellSize - 14}`}
                    stroke="#E45858"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          )
        })
      )}

      {/* scanning beam overlay */}
      <rect
        x="40" y={startY}
        width={cols * (cellSize + gap) - gap}
        height={rows * (cellSize + gap) - gap}
        fill="url(#cf-qv-sweep)"
        className="cf-qv-sweep-rect"
      />
      <defs>
        <linearGradient id="cf-qv-sweep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(37,99,235,0)" />
          <stop offset="45%" stopColor="rgba(37,99,235,0)" />
          <stop offset="50%" stopColor="rgba(37,99,235,0.18)" />
          <stop offset="55%" stopColor="rgba(37,99,235,0)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0)" />
        </linearGradient>
      </defs>

    </svg>
  )
}

function ShieldViz() {
  /* PII redaction table. Rows on the left show "raw" sensitive fields.
     A scan-line sweeps top-to-bottom; as it passes each row, the right
     column fills in with masked/tokenized output. Compliance badges row. */
  const rows = [
    { label: "FULL NAME",  raw: "Sarah J. Chen",            out: "██████████" },
    { label: "EMAIL",      raw: "sarah.chen@acme.io",       out: "****@***.io" },
    { label: "SSN",        raw: "512-48-9071",              out: "***-**-****" },
    { label: "CARD",       raw: "4532 0912 6691 8234",      out: "**** **** **** 8234" },
    { label: "PHONE",      raw: "+1 415 555 0188",          out: "+1 *** *** ****" },
  ]
  const rowH = 46
  const startY = 82

  return (
    <svg viewBox="0 0 560 480" className="cf-viz-svg" aria-hidden>
      <defs>
        <linearGradient id="cf-sv-sheet" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(42, 68, 119, 0.04)" />
          <stop offset="100%" stopColor="rgba(42, 68, 119, 0.02)" />
        </linearGradient>
        <linearGradient id="cf-sv-scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(42, 68, 119, 0)" />
          <stop offset="45%" stopColor="rgba(42, 68, 119, 0.35)" />
          <stop offset="55%" stopColor="rgba(42, 68, 119, 0.35)" />
          <stop offset="100%" stopColor="rgba(42, 68, 119, 0)" />
        </linearGradient>
      </defs>

      {/* document sheet */}
      <rect
        x="36" y="56"
        width="488" height="300"
        rx="10"
        fill="url(#cf-sv-sheet)"
        stroke="var(--line-2)"
        strokeWidth="1"
      />

      {/* column dividers */}
      <line x1="168" y1="56" x2="168" y2="356" stroke="var(--line)" strokeWidth="1" />
      <line x1="324" y1="56" x2="324" y2="356" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4" />

      {/* column headers */}
      <text x="46" y="74" className="cf-viz-col-h">FIELD</text>
      <text x="178" y="74" className="cf-viz-col-h">RAW INPUT</text>
      <text x="334" y="74" className="cf-viz-col-h">REDACTED OUTPUT</text>

      {/* rows */}
      {rows.map((r, i) => {
        const y = startY + i * rowH + 18
        return (
          <g
            key={r.label}
            className="cf-sv-row"
            style={{ animationDelay: `${i * 0.5}s` } as React.CSSProperties}
          >
            {/* row background on pass */}
            <rect
              x="40" y={y - 18}
              width="480" height={rowH - 6}
              rx="4"
              className="cf-sv-row-bg"
              fill="rgba(42, 68, 119, 0.06)"
              style={{ animationDelay: `${i * 0.5}s` } as React.CSSProperties}
            />
            {/* field label */}
            <text x="46" y={y} className="cf-viz-row-label">{r.label}</text>
            {/* raw value */}
            <text x="178" y={y} className="cf-viz-row-raw">{r.raw}</text>
            {/* masked value (fades in) */}
            <text
              x="334" y={y}
              className="cf-viz-row-out"
              style={{ animationDelay: `${0.4 + i * 0.5}s` } as React.CSSProperties}
            >
              {r.out}
            </text>
            {/* lock icon on the right */}
            <g
              transform={`translate(500, ${y - 10})`}
              className="cf-sv-lock"
              style={{ animationDelay: `${0.4 + i * 0.5}s` } as React.CSSProperties}
            >
              <rect x="-5" y="-3" width="10" height="9" rx="1.5" fill="var(--teal)" />
              <path d="M -3 -3 V -6 a 3 3 0 0 1 6 0 V -3" fill="none" stroke="var(--teal)" strokeWidth="1.2" />
            </g>
          </g>
        )
      })}

      {/* scan sweep line */}
      <rect
        x="36" y="56"
        width="488" height="24"
        rx="6"
        fill="url(#cf-sv-scan)"
        className="cf-sv-scan"
      />

      {/* compliance badges footer */}
      <g transform="translate(40, 390)">
        {["SOC 2 TYPE II", "HIPAA", "GDPR", "PCI DSS"].map((label, i) => (
          <g
            key={label}
            transform={`translate(${i * 122}, 0)`}
            className="cf-sv-badge"
            style={{ animationDelay: `${i * 0.25}s` } as React.CSSProperties}
          >
            <rect
              x="0" y="0"
              width="112" height="42"
              rx="6"
              fill="var(--bg-0)"
              stroke="var(--line-2)"
              strokeWidth="1"
            />
            <circle cx="16" cy="21" r="5" fill="none" stroke="var(--teal)" strokeWidth="1.5" />
            <path
              d="M 13 21 L 15.5 23.5 L 19 19.5"
              fill="none"
              stroke="var(--teal)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="30" y="26" className="cf-viz-badge-label">{label}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  PIPELINE                                                           */
/* ------------------------------------------------------------------ */

function Pipeline() {
  const stages = [
    { n: "01", t: "Ingest",   d: "Drag-and-drop or connect with any desired source — flat data, warehouses, cloud drives, or third-party systems.",                    Icon: StageIconUpload },
    { n: "02", t: "Profile",  d: "The engine reads types, ranges, null distributions, and duplicates across every column before any rule executes.",                    Icon: StageIconProfile },
    { n: "03", t: "Validate", d: "Describe a rule in plain English — CleanAI compiles it into a deterministic constraint. Executes alongside 34 registered validators, reviewer-approved.", Icon: StageIconConfigure },
    { n: "04", t: "Fix",      d: "Safe corrections auto-apply. Unfixable records route to the Quarantine Editor for steward review, not the discard pile.",            Icon: StageIconExecute },
    { n: "05", t: "Export",   d: "Auto-map to the target destination — download, stream, or sync directly. No re-keying, no reformatting, no intermediate handoffs.",   Icon: StageIconReview },
    { n: "06", t: "Automate", d: "Register the flow as a scheduled Job. Hourly, daily, weekly. Stateful incremental sync. Auto-pause on failure.",                      Icon: StageIconExport },
  ]

  const pathRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Track mobile viewport so stages slide in top-to-bottom (y only) on phones,
  // not from the sides. SSR-safe: starts false, updates after mount.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  /* Path draws itself as user scrolls through the pipeline section.
     Offset: path starts drawing when the pipeline top hits 80% of viewport,
     finishes when its bottom hits 30% of viewport. */
  const { scrollYProgress: pipeProgress } = useScroll({
    target: pathRef,
    offset: ["start 0.85", "end 0.4"],
  })
  const pathLength = useSpring(pipeProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  })

  return (
    <section id="pipeline" className="cf-pipeline">
      <div className="cf-container">
        <motion.div className="cf-section-head" {...rise}>
          <span className="cf-tag cf-tag-teal cf-fade-up">WORKFLOW</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            A single, transparent pipeline.
            <br />
            <span className="cf-h2-italic">End to end</span>.
          </h2>
          <p className="cf-lede cf-fade-up" data-delay="2">
            The same staged execution runs across every dataset — manual or scheduled. No black boxes. No surprises. Every stage is observable, every remediation is auditable.
          </p>
        </motion.div>

        <div className="cf-pathflow" ref={pathRef}>
          <svg
            className="cf-pathflow-svg"
            viewBox="0 0 960 1400"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="cf-pathflow-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a0c4f0" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#c4d9f5" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#a0c4f0" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* dashed ghost path — always visible, subtle */}
            <path
              d="M 140 80 C 140 180, 820 230, 820 328 C 820 430, 140 480, 140 576 C 140 680, 820 730, 820 824 C 820 930, 140 980, 140 1072 C 140 1180, 820 1230, 820 1320"
              fill="none"
              stroke="rgba(160, 196, 240, 0.18)"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            {/* primary animated path — pathLength linked to scroll progress */}
            <motion.path
              d="M 140 80 C 140 180, 820 230, 820 328 C 820 430, 140 480, 140 576 C 140 680, 820 730, 820 824 C 820 930, 140 980, 140 1072 C 140 1180, 820 1230, 820 1320"
              fill="none"
              stroke="url(#cf-pathflow-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={prefersReducedMotion ? { pathLength: 1 } : { pathLength }}
            />

            {/* traveling pulse dot riding the path infinitely */}
            <circle
              r="6"
              fill="var(--blue)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="cf-pathflow-traveler"
              style={{
                offsetPath:
                  "path('M 140 80 C 140 180, 820 230, 820 328 C 820 430, 140 480, 140 576 C 140 680, 820 730, 820 824 C 820 930, 140 980, 140 1072 C 140 1180, 820 1230, 820 1320')",
              } as React.CSSProperties}
            />
          </svg>

          <div className="cf-pathflow-stages">
            {stages.map((s, i) => {
              const Icon = s.Icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={s.n}
                  className={`cf-pf-stage ${isLeft ? "cf-pf-left" : "cf-pf-right"}`}
                  initial={{ opacity: 0, x: isMobile ? 0 : (isLeft ? -30 : 30), y: isMobile ? 24 : 16 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: isMobile ? 0.7 : 0.9,
                    delay: 0.15 + i * 0.1,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  <div className="cf-pf-node">
                    <div className="cf-pf-node-ring" aria-hidden />
                    <div className="cf-pf-node-inner">
                      <Icon />
                    </div>
                  </div>
                  <div className="cf-pf-card">
                    <span className="cf-pf-tag">STAGE {s.n}</span>
                    <h3 className="cf-pf-title">{s.t}</h3>
                    <p className="cf-pf-desc">{s.d}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- PIPELINE STAGE ICONS (each has its own live animation) ---------- */

function StageIconUpload() {
  /* Cloud shape with an up-arrow inside. Classic, universally readable. */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-upload" aria-hidden>
      <path
        d="M 18 44
           C 12 44, 9 40, 9 35
           C 9 30, 13 26, 18 26
           C 18 19, 24 14, 31 14
           C 38 14, 44 19, 45 26
           C 51 26, 55 30, 55 35
           C 55 40, 51 44, 45 44 Z"
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g className="cf-stg-upload-arrow">
        <line x1="32" y1="50" x2="32" y2="30" stroke="var(--blue-3)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 25 36 L 32 29 L 39 36" fill="none" stroke="var(--blue-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function StageIconProfile() {
  /* Database cylinder with a magnifying glass — "profile the data". */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-profile" aria-hidden>
      <g className="cf-stg-prof-db">
        <ellipse cx="24" cy="16" rx="14" ry="4" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d="M 10 16 V 34" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d="M 38 16 V 34" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d="M 10 25 C 10 28, 16 30, 24 30 C 32 30, 38 28, 38 25" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d="M 10 34 C 10 37, 16 39, 24 39 C 32 39, 38 37, 38 34" fill="none" stroke="var(--blue)" strokeWidth="2" />
      </g>
      <g className="cf-stg-prof-mag">
        <circle cx="44" cy="40" r="9" fill="none" stroke="var(--blue-3)" strokeWidth="2.5" />
        <line x1="50" y1="46" x2="56" y2="52" stroke="var(--blue-3)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function StageIconConfigure() {
  /* Ruleset: 3 toggles + check boxes — "configure rules". */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-configure" aria-hidden>
      {[0, 1, 2].map((i) => {
        const y = 16 + i * 16
        return (
          <g key={i}>
            <line x1="10" y1={y} x2="54" y2={y} stroke="var(--line-2)" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1={y} x2="34" y2={y} stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" />
            <circle
              className={`cf-stg-cfg-knob cf-stg-cfg-k${i + 1}`}
              cx={i === 1 ? "22" : i === 0 ? "34" : "28"}
              cy={y}
              r="5"
              fill="var(--bg-0)"
              stroke="var(--blue)"
              strokeWidth="2"
            />
            <circle cx={i === 1 ? "22" : i === 0 ? "34" : "28"} cy={y} r="2" fill="var(--blue-3)" />
          </g>
        )
      })}
    </svg>
  )
}

function StageIconExecute() {
  /* Circular progress ring with a play triangle — "execute the pipeline". */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-execute" aria-hidden>
      <circle
        cx="32" cy="32" r="22"
        fill="none"
        stroke="var(--line-2)"
        strokeWidth="2.5"
      />
      <circle
        cx="32" cy="32" r="22"
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="cf-stg-exec-arc"
        pathLength="100"
        strokeDasharray="100"
        transform="rotate(-90 32 32)"
      />
      <path
        d="M 28 24 L 42 32 L 28 40 Z"
        fill="var(--blue-3)"
        className="cf-stg-exec-play"
      />
    </svg>
  )
}

function StageIconReview() {
  /* Clipboard with 3 rows + a big circled checkmark — "review approved". */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-review" aria-hidden>
      <rect x="14" y="12" width="36" height="44" rx="4" fill="none" stroke="var(--blue)" strokeWidth="2" />
      <rect x="24" y="8" width="16" height="8" rx="2" fill="var(--bg-0)" stroke="var(--blue)" strokeWidth="2" />
      <line x1="20" y1="26" x2="44" y2="26" stroke="var(--line-3)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="34" x2="44" y2="34" stroke="var(--line-3)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="42" x2="36" y2="42" stroke="var(--line-3)" strokeWidth="1.6" strokeLinecap="round" />
      <g className="cf-stg-rev-stamp">
        <circle cx="42" cy="44" r="9" fill="var(--bg-0)" stroke="var(--blue-3)" strokeWidth="2" />
        <path
          d="M 37 44 L 41 48 L 47 41"
          fill="none"
          stroke="var(--blue-3)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cf-stg-rev-check-main"
        />
      </g>
    </svg>
  )
}

function StageIconExport() {
  /* Document with an arrow exiting through the right edge. */
  return (
    <svg viewBox="0 0 64 64" className="cf-stg-ico cf-stg-export" aria-hidden>
      <path
        d="M 14 12 H 36 L 42 18 V 52 H 14 Z"
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 36 12 V 18 H 42" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" />
      <line x1="20" y1="28" x2="34" y2="28" stroke="var(--line-3)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="36" x2="34" y2="36" stroke="var(--line-3)" strokeWidth="1.6" strokeLinecap="round" />
      <g className="cf-stg-export-arrow">
        <line x1="36" y1="44" x2="54" y2="44" stroke="var(--blue-3)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 48 38 L 54 44 L 48 50" fill="none" stroke="var(--blue-3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  REVIEWS — enterprise testimonials                                  */
/*  NOTE: placeholder content — must be replaced with authentic,       */
/*  signed testimonials before production launch.                      */
/* ------------------------------------------------------------------ */

function Quote() {
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let inView = false
    const MIN_OPACITY = 0.32
    /* Cache card list once — marquee contents don't change across renders */
    const cards = Array.from(marquee.querySelectorAll<HTMLElement>(".cf-review-bcard"))

    const update = () => {
      const mr = marquee.getBoundingClientRect()
      const centerX = mr.left + mr.width / 2
      const half = mr.width / 2 || 1
      for (let i = 0; i < cards.length; i++) {
        const cr = cards[i].getBoundingClientRect()
        const cardCenter = cr.left + cr.width / 2
        const t = Math.min(1, Math.abs(cardCenter - centerX) / half)
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * t)
        const o = 1 - (1 - MIN_OPACITY) * eased
        cards[i].style.setProperty("--cf-fade", o.toFixed(3))
      }
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !inView) {
          inView = true
          raf = requestAnimationFrame(update)
        } else if (!e.isIntersecting && inView) {
          inView = false
          cancelAnimationFrame(raf)
        }
      },
      { rootMargin: "80px" }
    )
    io.observe(marquee)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const reviews = [
    {
      quote:
        "CleanFlowAI is the rare platform that rewrites how enterprises think about data quality. The combination of AI-assisted rule suggestion and deterministic execution is exactly the operating model regulated industries need, and it will play a defining role in how this market evolves.",
      highlight: "defining role in how this market evolves",
      role: "Vice President",
      org: "Leading Global Consulting Firm",
    },
    {
      quote:
        "Among the data-quality platforms we have evaluated, CleanFlowAI stands apart for pairing intelligence with provable determinism. It is the category we believe will set the standard at institutional scale over the next several years — a genuine market-defining capability.",
      highlight: "genuine market-defining capability",
      role: "Vice President",
      org: "Leading Global Banking Firm",
    },
    {
      quote:
        "What used to take weeks of schema and rule-writing now finishes in an afternoon. Business Rules Suggestion and AutoMap have earned a permanent seat in our analytics stack, and we expect this platform to play a leading role in where the market heads next.",
      highlight: "leading role in where the market heads next",
      role: "Chief Data Officer",
      org: "Major International Bank",
    },
    {
      quote:
        "CleanFlowAI represents the next generation of data-trust platforms. Suggest, approve, execute — paired with an immutable audit trail — is the operating model our clients are demanding. It is positioned to play a pivotal role in the market over the coming years.",
      highlight: "pivotal role in the market over the coming years",
      role: "Chief Product Officer",
      org: "Big Four Advisory Firm",
    },
  ]

  return (
    <section id="principles" className="cf-reviews">
      <div className="cf-container">
        <motion.div
          className="cf-section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="cf-tag cf-tag-teal cf-fade-up">WHAT ENTERPRISES SAY</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            Trusted by the teams
            <br />
            <span className="cf-h2-italic">that define the market</span>.
          </h2>
        </motion.div>

      </div>

      {/* Full-bleed marquee — card contents fade at the sides */}
      <div className="cf-reviews-marquee" aria-label="Enterprise testimonials" ref={marqueeRef}>
        <div className="cf-reviews-track">
          {[...reviews, ...reviews].map((r, i) => {
            const parts = r.highlight ? r.quote.split(r.highlight) : [r.quote]
            return (
              <article key={i} className="cf-review-bcard" aria-hidden={i >= reviews.length}>
                <div className="cf-review-bcard-glass">
                  <svg className="cf-review-bcard-mark" viewBox="0 0 48 36" aria-hidden>
                    <path d="M0 36 V 20 C 0 8, 6 0, 18 0 V 8 C 12 8, 8 12, 8 18 H 18 V 36 Z M 28 36 V 20 C 28 8, 34 0, 46 0 V 8 C 40 8, 36 12, 36 18 H 46 V 36 Z" fill="currentColor" />
                  </svg>
                  <blockquote className="cf-review-bcard-text">
                    {parts.length === 2 ? (
                      <>
                        {parts[0]}
                        <mark className="cf-review-bcard-em">{r.highlight}</mark>
                        {parts[1]}
                      </>
                    ) : r.quote}
                  </blockquote>
                  <footer className="cf-review-bcard-foot">
                    <span className="cf-review-bcard-role">{r.role}</span>
                    <span className="cf-review-bcard-sep" aria-hidden>·</span>
                    <span className="cf-review-bcard-org">{r.org}</span>
                  </footer>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PRICING                                                            */
/* ------------------------------------------------------------------ */

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      tag: "/ forever",
      for: "Evaluate CleanFlowAI with a single dataset at a time",
      features: [
        "CSV & Excel ingest",
        "R1–R34 deterministic rules",
        "DQ report (JSON)",
        "Viewer role only",
      ],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "Contact",
      tag: "for pricing",
      for: "Data teams running Data Transform + Data Quality",
      features: [
        "All 4 input formats (+ Parquet)",
        "LLM-assisted custom rules",
        "Live connectors · bidirectional sync",
        "Auto-map transforms on export",
        "Owner / Admin / Editor / Viewer roles",
      ],
      cta: "Request demo",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      tag: "contact sales",
      for: "Regulated customers needing CleanDataShield™",
      features: [
        "CleanDataShield™ privacy layer",
        "All connectors as they ship",
        "SSO · audit logs · API access",
        "Dedicated success engineer",
      ],
      cta: "Book a call",
    },
  ]

  return (
    <section id="pricing" className="cf-pricing">
      <div className="cf-container">
        <motion.div className="cf-section-head" {...rise}>
          <span className="cf-tag cf-tag-teal cf-fade-up">§ THE TERMS</span>
          <h2 className="cf-h2 cf-fade-up" data-delay="1">
            Three tiers.
            <br />
            <span className="cf-h2-italic">One promise</span>.
          </h2>
        </motion.div>

        <div className="cf-plans">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`cf-plan ${p.featured ? "cf-plan-on" : ""}`}
              {...riseDelay(0.08 * i)}
            >
              {p.featured && <div className="cf-plan-flag">MOST CHOSEN</div>}
              <div className="cf-plan-name">{p.name}</div>
              <div className="cf-plan-price">
                {p.price === "0" && <span className="cf-plan-ccy">$</span>}
                <span
                  className={`cf-plan-amount ${
                    p.price === "Custom" || p.price === "Contact" ? "cf-plan-amount-sm" : ""
                  }`}
                >
                  {p.price}
                </span>
                <span className="cf-plan-tag">{p.tag}</span>
              </div>
              <div className="cf-plan-for">{p.for}</div>
              <div className="cf-plan-rule" />
              <ul className="cf-plan-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckSmall />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`cf-btn ${p.featured ? "cf-btn-primary" : "cf-btn-outline"}`}
              >
                <span>{p.cta}</span>
                <Arrow />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckSmall() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden>
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M4 7 L 6.2 9.2 L 10 5.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

function CTA() {
  return (
    <section className="cf-cta">
      <div className="cf-container">
        <motion.div
          className="cf-cta-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Concentric rings decoration */}
          <div className="cf-cta-rings" aria-hidden>
            <div className="cf-cta-ring cf-cta-ring-1" />
            <div className="cf-cta-ring cf-cta-ring-2" />
            <div className="cf-cta-ring cf-cta-ring-3" />
            <div className="cf-cta-ring cf-cta-ring-4" />
          </div>

          <div className="cf-cta-content">
            <h2 className="cf-cta-h">
              Bring us your <span className="cf-h2-italic">messiest data</span>.
            </h2>
            <p className="cf-cta-sub">
              We&rsquo;ll show you exactly what CleanFlowAI can fix, quarantine, and automate.
            </p>
            <div className="cf-cta-buttons">
              <a href="/support" className="cf-cta-pill">
                <span>Book a discovery call</span>
                <span className="cf-cta-pill-arrow">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="cf-footer">
      <div className="cf-container">
        <div className="cf-footer-inner">
          <div className="cf-footer-top">
            <div>
              <Wordmark size="lg" />
              <p className="cf-footer-tag">
                The data-trust layer for teams that demand precision. Profile, validate,
                fix, ship — then automate the whole flow.
              </p>
            </div>
            <div className="cf-footer-cols">
              <div>
                <div className="cf-foot-h">Product</div>
                <ul>
                  <li><a href="#platform">Console</a></li>
                  <li><a href="#features">Modules</a></li>
                  <li><a href="#pipeline">Workflow</a></li>
                  <li><a href="#principles">Principles</a></li>
                  <li><a href="/cleanai">CleanAI Engine</a></li>
                </ul>
              </div>
              <div>
                <div className="cf-foot-h">Solutions</div>
                <ul>
                  <li><a href="/capabilities/profiling">Data Profiling</a></li>
                  <li><a href="/capabilities/quality">Data Quality</a></li>
                  <li><a href="/capabilities/transformation">Data Transformation</a></li>
                  <li><a href="/capabilities/migration">Data Migration</a></li>
                  <li><a href="/capabilities/modernization">Data Modernization</a></li>
                  <li><a href="/capabilities/security">Data Security</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Clean stencil watermark */}
        <div className="cf-footer-watermark" aria-hidden>CleanFlowAI</div>

        <div className="cf-footer-bottom">
          <span>© 2026 CleanFlowAI · All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

function StyleBlock() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }

      .cf-root {
        /* ═══ CleanFlowAI official branding — sourced from public/image.png ═══
           Cream surfaces · deep navy · warm near-black ink. See docs/brand-color-font.md */

        /* Surfaces (warm cream from the login form panel) */
        --bg-0: #FFFFFF;
        --bg-1: #FAFAF5;      /* cream surface — main page bg */
        --bg-2: #F5F3EC;      /* cream input — panels, marquee band */
        --bg-3: #EDEADF;
        --bg-4: #E0DCCC;

        /* Lines / hairlines */
        --line:   rgba(15, 23, 41, 0.08);
        --line-2: rgba(15, 23, 41, 0.14);
        --line-3: rgba(15, 23, 41, 0.22);

        /* Ink (text) — near-black navy, not pure grey */
        --ink:   #0F1729;    /* primary text */
        --ink-2: #1E293B;    /* secondary text */
        --ink-3: #475569;    /* tertiary text */
        --ink-4: #6B6F78;    /* muted helper text — from login */
        --ink-5: #94A3B8;    /* placeholder */

        /* ═══ Navy — 6-step scale anchored to the login image ═══ */
        --navy-deep:  #0F1A29;    /* edges, deepest shadow */
        --navy:       #141E30;    /* dark panel background */
        --navy-cta:   #1E2E52;    /* button / link / active element */
        --brand:      #2A4477;    /* app --primary — kept for continuity */
        --navy-mid:   #3A5A94;    /* secondary accent */
        --navy-light: #5A7FB5;    /* border on dark, soft highlight */

        /* Legacy blue aliases — point to the new scale */
        --brand-2: var(--navy-cta);
        --brand-3: var(--navy-mid);
        --blue:    var(--brand);
        --blue-2:  var(--navy-cta);
        --blue-3:  var(--navy-mid);
        --blue-4:  var(--navy-light);
        --blue-glow: rgba(30, 46, 82, 0.30);

        /* Teal/cyan aliases — keep monotone navy palette */
        --teal:    var(--navy-mid);
        --teal-2:  var(--brand);
        --teal-3:  var(--navy-light);
        --teal-glow: rgba(30, 46, 82, 0.26);
        --cyan:    var(--navy-mid);

        /* On-dark overlays */
        --on-dark:       #FFFFFF;
        --on-dark-body:  rgba(255, 255, 255, 0.72);
        --on-dark-muted: rgba(255, 255, 255, 0.45);
        --on-dark-line:  rgba(255, 255, 255, 0.10);

        /* Accents */
        --destructive: #DC2626;
        --success:     #4ADE80;
        --warn:        #B45309;

        background: var(--bg-1);
        color: var(--ink);
        font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        min-height: 100vh;
        position: relative;
        overflow-x: clip;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
      .cf-root h1,
      .cf-root h2,
      .cf-root h3 {
        text-rendering: geometricPrecision;
        font-feature-settings: "ss01", "cv11";
      }

      .cf-root section[id], .cf-root article[id] { scroll-margin-top: 90px; }

      .cf-root * { box-sizing: border-box; }

      /* ---------- PERF: skip rendering off-screen sections ----------
         content-visibility: auto lets the browser skip layout + paint for
         sections that are outside the viewport, while keeping them in DOM
         (so anchor links, Ctrl-F, and screen readers all still work).
         contain-intrinsic-size reserves a rough height so the scrollbar
         stays stable. No visual effects are altered. */
      .cf-root .cf-trust,
      .cf-root .cf-dash,
      .cf-root .cf-features,
      .cf-root .cf-metrics,
      .cf-root .cf-pipeline,
      .cf-root .cf-stages,
      .cf-root .cf-principles,
      .cf-root .cf-reviews,
      .cf-root .cf-terms,
      .cf-root .cf-cta-final,
      .cf-root .cf-footer {
        content-visibility: auto;
        contain-intrinsic-size: 1px 900px;
      }

      /* ---------- GLOBAL SCROLL SMOOTHNESS ---------- */
      html { scroll-behavior: smooth; }
      .cf-root { scroll-behavior: smooth; overflow-x: clip; }

      /* ---------- UNIVERSAL FADE-UP FOR TEXT BLOCKS ----------
         Applies a subtle fade+translate to common text containers on
         scroll into view using CSS @keyframes + animation-range.
         Falls back gracefully if the browser doesn't support scroll-
         linked animations. Non-destructive: elements that already have
         a framer-motion motion.* wrapper still animate via framer. */
      /* Universal fade-up: initial hidden state + revealed state.
         Works via IntersectionObserver adding .cf-visible class. */
      .cf-root .cf-fade-up {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .cf-root .cf-fade-up.cf-visible {
        opacity: 1;
        transform: translateY(0);
      }
      /* Stagger delays for children */
      .cf-root .cf-fade-up[data-delay="1"] { transition-delay: 0.1s; }
      .cf-root .cf-fade-up[data-delay="2"] { transition-delay: 0.2s; }
      .cf-root .cf-fade-up[data-delay="3"] { transition-delay: 0.3s; }

      @media (prefers-reduced-motion: reduce) {
        .cf-root .cf-fade-up {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }

      .cf-container {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 36px;
        position: relative;
      }

      /* ---------- TAGS ---------- */

      .cf-tag {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono), monospace;
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.2em;
        color: var(--ink-3);
        text-transform: uppercase;
      }
      .cf-tag-teal {
        color: var(--blue);
      }

      /* ---------- LOGO ---------- */

      .cf-wordmark {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: var(--ink);
      }
      .cf-logo-wrap {
        position: relative;
        display: inline-flex;
        width: 38px;
        height: 38px;
      }
      .cf-logo-img {
        width: 38px;
        height: 38px;
        display: block;
        position: relative;
        z-index: 2;
      }
      .cf-logo-glow {
        position: absolute;
        inset: -6px;
        background: radial-gradient(circle, var(--teal-glow), transparent 60%);
        filter: blur(10px);
        z-index: 1;
        opacity: 0.8;
      }
      .cf-logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }
      .cf-logo-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .cf-logo-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.18em;
        color: var(--ink-3);
        text-transform: uppercase;
        margin-top: 2px;
      }
      .cf-wordmark-lg .cf-logo-wrap { width: 48px; height: 48px; }
      .cf-wordmark-lg .cf-logo-img { width: 48px; height: 48px; }
      .cf-wordmark-lg .cf-logo-name { font-size: 22px; }
      .cf-wordmark-lg .cf-logo-tag { font-size: 10px; }

      /* ---------- TOP BAR ---------- */

      /* --- TOPBAR: scroll-aware glass → solid --- */
      .cf-topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 60;
        transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
      }
      /* Over hero: cream-glass band (matches scrolled state for consistency) */
      .cf-topbar-glass {
        background: rgba(250, 250, 245, 0.85);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 42, 0.06);
      }
      .cf-topbar-glass .cf-nav > a { color: var(--ink-2); }
      .cf-topbar-glass .cf-nav > a:hover { color: var(--brand); }
      .cf-topbar-glass .cf-nav-signin { color: var(--ink-2) !important; }
      .cf-topbar-glass .cf-logo-name { color: var(--ink); }
      .cf-topbar-glass .cf-logo-tag { color: var(--ink-3); }
      .cf-topbar-glass .cf-nav-cta {
        background: var(--ink);
        border: 1px solid transparent;
        color: #FFFFFF !important;
      }
      .cf-topbar-glass .cf-nav-cta:hover {
        background: var(--brand);
      }
      /* Scrolled: solid cream */
      .cf-topbar-solid {
        background: rgba(251, 251, 248, 0.9);
        backdrop-filter: saturate(1.4) blur(14px);
        -webkit-backdrop-filter: saturate(1.4) blur(14px);
        border-bottom: 1px solid var(--line);
        box-shadow: 0 1px 8px -2px rgba(15, 23, 42, 0.06);
      }
      .cf-topbar-solid .cf-nav > a { color: var(--ink-2); }
      .cf-topbar-solid .cf-nav > a:hover { color: var(--blue); }
      .cf-topbar-solid .cf-nav-signin { color: var(--ink-2) !important; }
      .cf-topbar-solid .cf-logo-name { color: var(--ink); }
      .cf-topbar-solid .cf-logo-tag { color: var(--ink-3); }
      .cf-topbar-solid .cf-nav-cta {
        background: var(--ink);
        border: none;
        box-shadow: 0 6px 20px -10px rgba(10, 15, 28, 0.5);
      }
      .cf-topbar-solid .cf-nav-cta:hover {
        background: var(--blue);
        box-shadow: 0 12px 30px -10px var(--blue-glow);
      }

      .cf-topbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 36px;
      }
      .cf-nav {
        display: flex;
        align-items: center;
        gap: 30px;
        font-size: 14px;
      }
      .cf-nav > a {
        text-decoration: none;
        transition: color 0.25s;
        font-weight: 450;
      }

      /* ══ Platform dropdown (mega-menu style) ══ */
      .cf-nav-dd {
        position: relative;
        padding: 16px 0; /* extends hover area so the menu doesn't close prematurely */
        margin: -16px 0;
      }
      .cf-nav-dd-trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: none;
        padding: 0;
        font: inherit;
        font-weight: 450;
        cursor: pointer;
        color: inherit;
        transition: color 0.25s;
      }
      .cf-topbar-glass .cf-nav-dd-trigger { color: var(--ink-2); }
      .cf-topbar-glass .cf-nav-dd-trigger:hover { color: var(--brand); }
      .cf-topbar-solid .cf-nav-dd-trigger { color: var(--ink-2); }
      .cf-topbar-solid .cf-nav-dd-trigger:hover { color: var(--brand); }
      .cf-nav-dd-caret {
        opacity: 0.7;
        transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cf-nav-dd-caret-open { transform: rotate(180deg); }

      .cf-nav-dd-menu {
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
      .cf-nav-dd-menu-open {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
        transition:
          opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          transform 0.35s cubic-bezier(0.19, 1, 0.22, 1),
          visibility 0s;
      }
      .cf-nav-dd-inner {
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
      .cf-nav-dd-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0 4px 14px;
        border-bottom: 1px solid var(--line);
        margin-bottom: 12px;
      }
      .cf-nav-dd-eyebrow {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: var(--brand);
        font-weight: 600;
      }
      .cf-nav-dd-hint {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-size: 12.5px;
        color: var(--ink-4);
        font-weight: 400;
      }
      .cf-nav-dd-split {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 18px;
      }
      .cf-nav-dd-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }
      .cf-nav-dd-feature {
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
      .cf-nav-dd-feature:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 40px -16px rgba(42, 68, 119, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      }
      .cf-nav-dd-feature-head { display: inline-flex; align-items: center; gap: 10px; }
      .cf-nav-dd-feature-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: rgba(160, 196, 240, 0.12); border: 1px solid rgba(160, 196, 240, 0.28); }
      .cf-nav-dd-feature-icon img { width: 22px; height: 22px; object-fit: contain; filter: drop-shadow(0 0 6px rgba(160, 196, 240, 0.5)); }
      .cf-nav-dd-feature-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 700;
      }
      .cf-nav-dd-feature-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.015em;
        color: #FFFFFF;
        margin: 4px 0 0;
        line-height: 1.15;
      }
      .cf-nav-dd-feature-b {
        font-size: 12.5px;
        line-height: 1.5;
        color: rgba(200, 215, 240, 0.78);
        margin: 0;
      }
      .cf-nav-dd-feature-cta {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: #FFFFFF;
        margin-top: auto;
        padding-top: 10px;
        border-top: 1px solid rgba(160, 196, 240, 0.18);
      }
      .cf-nav-dd-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px 14px;
        border-radius: 10px;
        text-decoration: none;
        color: var(--ink);
        transition: background 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s;
      }
      .cf-nav-dd-item:hover {
        background: var(--bg-2);
        transform: translateX(2px);
      }
      .cf-nav-dd-item-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 14.5px;
        letter-spacing: -0.01em;
        color: var(--ink);
      }
      .cf-nav-dd-item-blurb {
        font-family: var(--font-sans), sans-serif;
        font-size: 12.5px;
        line-height: 1.45;
        color: var(--ink-4);
      }
      .cf-nav-dd-item:hover .cf-nav-dd-item-name { color: var(--brand); }

      @media (max-width: 720px) {
        .cf-nav-dd-menu { width: min(440px, calc(100vw - 24px)); left: auto; right: 0; transform: translateX(0) translateY(-6px); }
        .cf-nav-dd-menu-open { transform: translateX(0); }
        .cf-nav-dd-inner { padding: 18px; max-height: calc(100vh - 96px); overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
        .cf-nav-dd-split { grid-template-columns: 1fr; gap: 12px; }
        .cf-nav-dd-grid {
          grid-template-columns: 1fr;
          gap: 2px;
          max-height: 260px;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-right: 4px;
          scrollbar-width: thin;
        }
        .cf-nav-dd-feature { padding: 14px 14px 12px; }
      }
      .cf-nav-cta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 18px;
        color: #FFFFFF !important;
        border-radius: 999px;
        font-weight: 500;
        font-size: 13.5px;
        text-decoration: none;
        transition: transform 0.25s, background 0.25s, box-shadow 0.25s, border-color 0.25s;
      }
      .cf-nav-cta:hover { transform: translateY(-1px); }
      .cf-arrow { transition: transform 0.25s; }
      .cf-btn:hover .cf-arrow,
      .cf-nav-cta:hover .cf-arrow,
      .cf-feat-link:hover .cf-arrow { transform: translateX(3px); }

      /* ---------- HERO ---------- */

      .cf-hero {
        position: relative;
        min-height: 100vh;
        min-height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--navy);
      }

      /* 3D scene container */
      .cf-3d-scene {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
      }
      .cf-3d-scene canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
      }
      @media (prefers-reduced-motion: reduce) {
        .cf-3d-scene { display: none; }
        .cf-hero { background: radial-gradient(ellipse at 50% 60%, var(--navy-cta) 0%, var(--navy) 60%); }
      }

      /* Atmospheric glows */
      .cf-hero-atmosphere {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      .cf-hero-glow-center {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background:
          /* Central vanishing point glow */
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(42, 68, 119, 0.2) 0%, transparent 60%),
          /* Wider ambient haze */
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20, 35, 70, 0.1) 0%, transparent 55%);
      }

      /* Bottom transition — stays dark, no white */
      .cf-hero-bottom-fade {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 100px;
        background: linear-gradient(to bottom, transparent, var(--navy));
        z-index: 5;
        pointer-events: none;
      }

      .cf-hero-centered {
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
        padding-top: 100px;
        padding-bottom: 70px;
      }

      .cf-blue { color: var(--blue); }

      /* --- Hero text (line-by-line layout) --- */
      .cf-hero-line {
        display: block;
        line-height: 1;
      }
      .cf-hero-heading {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(40px, 6.5vw, 92px);
        line-height: 1.05;
        letter-spacing: -0.035em;
        color: #FFFFFF;
        text-shadow: 0 0 60px rgba(0, 0, 0, 0.35), 0 2px 16px rgba(0, 0, 0, 0.25);
      }
      .cf-hero-heading-em {
        font-style: italic;
        color: #b0ccf0;
      }
      .cf-hero-heading-accent {
        color: #9cbce5;
      }

      /* Subtitle */
      .cf-hero-sub {
        font-family: var(--font-sans), sans-serif;
        font-size: 17px;
        line-height: 1.6;
        color: rgba(200, 212, 240, 0.7);
        max-width: 56ch;
        margin: 16px auto 0;
        text-align: center;
        text-wrap: balance;
        text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
      }
      .cf-hero-sub-hi {
        color: #FFFFFF;
        font-weight: 500;
        letter-spacing: -0.005em;
        display: block;
        margin-bottom: 8px;
      }
      .cf-hero-sub-break {
        display: block;
      }
      .cf-hero-sub-brand {
        color: #FFFFFF;
        font-weight: 600;
        letter-spacing: -0.005em;
        background: linear-gradient(135deg, #FFFFFF 0%, #a0c4f0 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      /* CTAs */
      .cf-hero-ctas {
        display: flex;
        gap: 14px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
      }
      .cf-hero-cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 15px 26px;
        font-family: var(--font-sans), sans-serif;
        font-size: 14.5px;
        font-weight: 500;
        border-radius: 999px;
        text-decoration: none;
        cursor: pointer;
        color: #FFFFFF;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 28px -8px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.06);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.3s, border-color 0.3s, box-shadow 0.3s;
      }
      .cf-hero-cta-primary:hover {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 14px 40px -10px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      .cf-hero-cta-primary .cf-arrow {
        color: rgba(255, 255, 255, 0.6);
        transition: transform 0.25s;
      }
      .cf-hero-cta-primary:hover .cf-arrow {
        transform: translateX(3px);
        color: #FFF;
      }

      .cf-hero-cta-ghost {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 15px 24px;
        font-family: var(--font-sans), sans-serif;
        font-size: 14.5px;
        font-weight: 500;
        border-radius: 999px;
        text-decoration: none;
        cursor: pointer;
        color: rgba(220, 228, 250, 0.8);
        background: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    color 0.3s, border-color 0.3s, background 0.3s;
      }
      .cf-hero-cta-ghost:hover {
        transform: translateY(-1px);
        color: #FFF;
        border-color: rgba(255, 255, 255, 0.22);
        background: rgba(255, 255, 255, 0.06);
      }

      /* (floating cards removed — tunnel hero uses full viewport) */

      /* Announcement pill */
      .cf-hero-pill {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 6px 16px 6px 6px;
        border: 1px solid var(--line-2);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.82);
        backdrop-filter: blur(12px);
        font-family: var(--font-sans), sans-serif;
        font-size: 13px;
        color: var(--ink-2);
        text-decoration: none;
        box-shadow: 0 4px 16px -8px rgba(15, 23, 42, 0.12),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
        transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      }
      .cf-hero-pill:hover {
        transform: translateY(-1px);
        border-color: var(--blue-3);
        box-shadow: 0 10px 28px -12px rgba(42, 68, 119, 0.28);
      }
      .cf-hero-pill-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        background: var(--blue);
        color: #FFFFFF;
        border-radius: 999px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 0.16em;
      }
      .cf-hero-pill-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #FFFFFF;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        animation: cf-pulse 2s ease-in-out infinite;
      }
      .cf-hero-pill-text {
        color: var(--ink-2);
      }
      .cf-hero-pill .cf-arrow {
        color: var(--ink-3);
        transition: transform 0.3s, color 0.3s;
      }
      .cf-hero-pill:hover .cf-arrow {
        transform: translateX(3px);
        color: var(--blue);
      }

      /* Centered headline + lede + CTA row */
      .cf-h1-center {
        text-align: center;
        max-width: 16ch;
        margin: 12px auto 0;
        font-size: clamp(44px, 6.8vw, 96px);
        line-height: 0.98;
        letter-spacing: -0.035em;
      }
      .cf-lede-center {
        text-align: center;
        max-width: 54ch;
        margin: 0 auto;
      }
      .cf-cta-row-center {
        justify-content: center;
      }

      /* Showcase card below the CTAs */
      .cf-hero-showcase {
        width: 100%;
        max-width: 640px;
        margin-top: 28px;
        display: flex;
        justify-content: center;
      }
      .cf-hero-showcase .cf-live-card {
        max-width: 640px;
        width: 100%;
        box-shadow:
          0 70px 140px -50px rgba(15, 23, 42, 0.4),
          0 30px 60px -30px rgba(42, 68, 119, 0.22),
          inset 0 1px 0 rgba(255, 255, 255, 0.85);
      }

      @media (max-width: 780px) {
        .cf-hero { min-height: 90vh; min-height: 90dvh; }
        .cf-hero-centered { gap: 8px; padding-top: 60px; padding-bottom: 40px; }
        .cf-hero-heading { font-size: clamp(32px, 10vw, 56px); }
        .cf-hero-sub { font-size: 15px; max-width: 40ch; margin-top: 12px; }
        .cf-hero-ctas { margin-top: 14px; gap: 10px; }
        .cf-hero-cta-primary,
        .cf-hero-cta-ghost { padding: 13px 20px; font-size: 13.5px; }
      }
      @media (max-width: 480px) {
        .cf-hero-heading { font-size: clamp(28px, 9vw, 42px); }
        .cf-hero-sub { font-size: 14px; }
        .cf-hero-ctas { flex-direction: column; width: 100%; }
        .cf-hero-cta-primary,
        .cf-hero-cta-ghost { width: 100%; justify-content: center; }
      }

      /* word-split animation masks (hero headline) */
      .cf-word-mask {
        display: inline-block;
        overflow: hidden;
        line-height: 1;
        padding-bottom: 0.18em;
        margin-bottom: -0.18em;
        vertical-align: top;
      }
      .cf-word {
        display: inline-block;
        line-height: inherit;
        will-change: transform, opacity;
      }

      /* tsparticles canvas — absolute, behind content */
      .cf-particle-field {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .cf-particle-field > div:first-child {
        position: absolute !important;
        inset: 0;
        width: 100% !important;
        height: 100% !important;
      }
      .cf-particle-mask {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at center,
          transparent 40%,
          rgba(251, 251, 248, 0.15) 75%,
          rgba(251, 251, 248, 0.7) 100%
        );
        pointer-events: none;
      }
      @media (max-width: 767px) {
        .cf-particle-field { display: none; }
      }
      .cf-hero .cf-container { position: relative; z-index: 2; }

      /* ---------- HERO GRID (asymmetric editorial) ---------- */

      .cf-hero-grid {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
        grid-template-areas:
          "meta  meta"
          "copy  side";
        gap: 56px 60px;
        align-items: start;
      }

      .cf-hero-meta-bar {
        grid-area: meta;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 12px 18px;
        border: 1px solid var(--line-2);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        backdrop-filter: blur(10px);
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.16em;
        color: var(--ink-3);
        text-transform: uppercase;
      }
      .cf-hero-meta-left,
      .cf-hero-meta-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .cf-hero-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--blue);
        font-weight: 600;
      }
      .cf-hero-status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--blue-3);
        box-shadow: 0 0 0 3px rgba(58, 90, 148, 0.22);
        animation: cf-pulse 2.4s ease-in-out infinite;
      }
      .cf-hero-meta-sep {
        width: 1px;
        height: 12px;
        background: var(--line-2);
      }
      .cf-hero-meta-dot {
        opacity: 0.4;
      }

      .cf-hero-copy {
        grid-area: copy;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-top: 14px;
      }
      .cf-h1-left {
        text-align: left;
        max-width: 14ch;
      }
      .cf-lede-left {
        text-align: left;
        max-width: 50ch;
      }
      .cf-cta-row-left {
        justify-content: flex-start;
      }

      .cf-hero-side {
        grid-area: side;
        display: flex;
        align-items: stretch;
        justify-content: center;
        padding-top: 8px;
      }

      /* ---------- LIVE DQ CARD ---------- */

      .cf-live-card {
        position: relative;
        width: 100%;
        max-width: 480px;
        background: var(--bg-0);
        border: 1px solid var(--line-2);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
          0 50px 100px -40px rgba(15, 23, 42, 0.35),
          0 20px 40px -20px rgba(42, 68, 119, 0.18),
          inset 0 1px 0 rgba(255, 255, 255, 0.8);
        font-family: var(--font-sans), sans-serif;
      }
      .cf-live-head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--line);
        background: var(--bg-2);
      }
      .cf-live-dots {
        display: flex;
        gap: 5px;
      }
      .cf-live-dots span {
        width: 9px;
        height: 9px;
        border-radius: 50%;
      }
      .cf-live-dots span:nth-child(1) { background: #EF4858; }
      .cf-live-dots span:nth-child(2) { background: #F0B33B; }
      .cf-live-dots span:nth-child(3) { background: var(--blue-3); }
      .cf-live-title {
        flex: 1;
        text-align: center;
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
        letter-spacing: 0.04em;
      }
      .cf-live-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        padding: 4px 9px;
        border-radius: 4px;
        background: rgba(58, 90, 148, 0.12);
        color: var(--blue);
        border: 1px solid rgba(58, 90, 148, 0.32);
      }

      .cf-live-score {
        padding: 22px 22px 18px;
        border-bottom: 1px solid var(--line);
      }
      .cf-live-score-meta {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      .cf-live-score-delta {
        color: var(--blue);
      }
      .cf-live-score-value {
        font-family: var(--font-display), sans-serif;
        font-size: 56px;
        font-weight: 700;
        line-height: 0.9;
        letter-spacing: -0.035em;
        color: var(--ink);
        margin: 4px 0 14px;
      }
      .cf-live-score-bar {
        height: 6px;
        background: var(--bg-3);
        border-radius: 3px;
        overflow: hidden;
        position: relative;
      }
      .cf-live-score-fill {
        height: 100%;
        width: 0;
        background: linear-gradient(90deg, var(--blue-3), var(--blue));
        border-radius: 3px;
        animation: cf-live-fill 2.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
      }
      @keyframes cf-live-fill {
        to { width: 94.2%; }
      }

      .cf-live-rows-head {
        display: flex;
        justify-content: space-between;
        padding: 14px 22px 6px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .cf-live-rows-meta {
        color: var(--blue);
      }
      .cf-live-rows {
        position: relative;
        padding: 6px 22px 10px;
        overflow: hidden;
      }
      .cf-live-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 0;
        border-bottom: 1px dashed var(--line);
        opacity: 0;
        transform: translateY(8px);
        animation: cf-live-row-in 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      .cf-live-row:last-child { border-bottom: none; }
      @keyframes cf-live-row-in {
        to { opacity: 1; transform: translateY(0); }
      }
      .cf-live-row-status {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .cf-live-row-status-fixed {
        background: var(--blue-3);
        box-shadow: 0 0 0 3px rgba(58, 90, 148, 0.18);
      }
      .cf-live-row-status-hold {
        background: #E6A14A;
        box-shadow: 0 0 0 3px rgba(230, 161, 74, 0.18);
      }
      .cf-live-row-id {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-4);
      }
      .cf-live-row-action {
        flex: 1;
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        color: var(--ink-2);
        letter-spacing: 0.005em;
      }
      .cf-live-row-tag {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.14em;
        padding: 3px 7px;
        border-radius: 3px;
      }
      .cf-live-row-tag-fixed {
        background: rgba(58, 90, 148, 0.12);
        color: var(--blue);
        border: 1px solid rgba(58, 90, 148, 0.3);
      }
      .cf-live-row-tag-hold {
        background: rgba(230, 161, 74, 0.14);
        color: #B17317;
        border: 1px solid rgba(230, 161, 74, 0.4);
      }
      /* scanning highlight that travels through the rows */
      .cf-live-scan {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 32px;
        background: linear-gradient(180deg,
          rgba(58, 90, 148, 0) 0%,
          rgba(58, 90, 148, 0.12) 50%,
          rgba(58, 90, 148, 0) 100%);
        animation: cf-live-scan-move 4s ease-in-out 2s infinite;
        pointer-events: none;
      }
      @keyframes cf-live-scan-move {
        0% { transform: translateY(0); opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translateY(180px); opacity: 0; }
      }

      .cf-live-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 22px;
        border-top: 1px solid var(--line);
        background: var(--bg-2);
      }
      .cf-live-counts {
        display: flex;
        gap: 16px;
      }
      .cf-live-count {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .cf-live-count b {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: var(--ink);
        letter-spacing: -0.01em;
      }
      .cf-live-count span {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.14em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .cf-live-pulse {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.16em;
        color: var(--blue);
      }
      .cf-live-pulse-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--blue-3);
        box-shadow: 0 0 0 3px rgba(58, 90, 148, 0.22);
        animation: cf-pulse 2s ease-in-out infinite;
      }

      /* ---------- HERO STATS BAR ---------- */

      .cf-hero-stats-bar {
        grid-area: stats;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
        padding: 24px 36px;
        margin-top: 12px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px -16px rgba(15, 23, 42, 0.08);
      }
      .cf-hs-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }
      .cf-hs-num {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 38px;
        line-height: 1;
        letter-spacing: -0.025em;
        color: var(--ink);
      }
      .cf-hs-lbl {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        text-transform: uppercase;
      }
      .cf-hs-rule {
        width: 1px;
        height: 44px;
        background: var(--line-2);
      }


      .cf-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.18em;
        color: var(--ink-2);
        border: 1px solid var(--line-2);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);
        border-radius: 999px;
        margin-bottom: 34px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
      }
      .cf-eyebrow-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--teal);
        box-shadow: 0 0 0 3px rgba(42,68,119,0.22);
        animation: cf-pulse 2.4s ease-in-out infinite;
      }
      @keyframes cf-pulse {
        0%, 100% { box-shadow: 0 0 0 3px rgba(42,68,119,0.22); }
        50% { box-shadow: 0 0 0 6px rgba(42,68,119,0.06); }
      }

      .cf-h1 {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: clamp(48px, 6.6vw, 104px);
        line-height: 0.95;
        letter-spacing: -0.035em;
        margin: 0 0 28px;
        max-width: 14ch;
        text-wrap: balance;
        color: var(--ink);
      }
      .cf-h1-italic {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: var(--blue);
      }
      .cf-h1-accent {
        position: relative;
        display: inline-block;
        color: var(--blue);
      }
      .cf-h1-underline {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 2px;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--blue-2), transparent);
        border-radius: 2px;
      }

      .cf-lede {
        font-size: 18px;
        line-height: 1.55;
        color: var(--ink-2);
        max-width: 620px;
        margin: 0 0 36px;
        text-align: justify;
      }
      .cf-section-head .cf-lede { text-align: center; }

      .cf-cta-row {
        display: flex;
        gap: 14px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 50px;
      }

      .cf-btn {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 15px 24px;
        font-size: 14.5px;
        font-weight: 500;
        border-radius: 999px;
        text-decoration: none;
        cursor: pointer;
        font-family: inherit;
        border: none;
        transition: transform 0.25s, background 0.25s, color 0.25s, box-shadow 0.25s, border-color 0.25s;
      }
      .cf-btn-primary {
        background: var(--ink);
        color: #FFFFFF;
        box-shadow: 0 12px 30px -14px rgba(10, 15, 28, 0.6),
                    inset 0 1px 0 rgba(255,255,255,0.08);
      }
      .cf-btn-primary:hover {
        background: var(--brand);
        transform: translateY(-1px);
        box-shadow: 0 16px 38px -14px rgba(30, 58, 138, 0.7),
                    inset 0 1px 0 rgba(255,255,255,0.14);
      }
      .cf-btn-ghost {
        color: var(--ink);
        border: 1px solid var(--line-2);
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(8px);
      }
      .cf-btn-ghost:hover {
        border-color: var(--teal);
        color: var(--teal);
        background: rgba(42, 68, 119, 0.06);
      }
      .cf-btn-outline {
        color: var(--ink);
        background: transparent;
        border: 1px solid var(--line-2);
      }
      .cf-btn-outline:hover {
        border-color: var(--teal);
        color: var(--teal);
      }

      .cf-hero-stats {
        display: flex;
        align-items: center;
        gap: 36px;
        padding: 22px 40px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(10px);
        flex-wrap: wrap;
        justify-content: center;
        box-shadow: 0 8px 32px -16px rgba(15, 23, 42, 0.08);
      }
      .cf-stat {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: flex-start;
      }
      .cf-stat-val {
        font-family: var(--font-display), sans-serif;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: var(--ink);
      }
      .cf-stat-lbl {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.18em;
        color: var(--ink-4);
      }
      .cf-teal { color: var(--teal); }
      .cf-stat-div {
        width: 1px;
        height: 34px;
        background: var(--line-2);
      }

      /* ---------- TRUST BAR ---------- */

      .cf-trust {
        padding: 88px 0 64px;
        background: var(--bg-1);
      }
      .cf-trust-heading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        text-align: center;
        padding: 0;
        max-width: 760px;
        margin: 0 auto;
      }
      .cf-trust-sub {
        font-family: var(--font-display), sans-serif;
        font-size: 24px;
        font-weight: 600;
        color: var(--ink);
        letter-spacing: -0.015em;
        line-height: 1.3;
        max-width: 48ch;
        text-wrap: balance;
      }
      .cf-trust-band {
        background: var(--bg-2);
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        padding: 30px 0;
        overflow: hidden;
      }
      .cf-marquee {
        width: 100%;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
      }
      .cf-marquee-track {
        display: flex;
        gap: 56px;
        white-space: nowrap;
        animation: cf-marquee 50s linear infinite;
        width: max-content;
      }
      @keyframes cf-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-33.333%); }
      }
      .cf-logo-name-mq {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        font-family: var(--font-display), sans-serif;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.06em;
        color: var(--ink-3);
      }
      .cf-mq-dot {
        color: var(--ink-5);
        font-size: 10px;
      }

      /* ---------- SECTION HEAD ---------- */

      .cf-section-head {
        max-width: 860px;
        margin: 0 auto 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 20px;
      }

      .cf-h2 {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(34px, 4.4vw, 58px);
        line-height: 1.05;
        letter-spacing: -0.025em;
        margin: 0 auto;
        color: var(--ink);
        max-width: 22ch;
        text-wrap: balance;
        text-align: center;
      }
      .cf-h2-italic {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        color: var(--blue);
        letter-spacing: -0.02em;
      }

      /* ---------- DASH PREVIEW (dark theme) ---------- */

      .cf-dash {
        padding: 120px 0;
        position: relative;
        background:
          radial-gradient(ellipse 900px 500px at 50% 20%, rgba(58, 90, 148, 0.28) 0%, transparent 60%),
          radial-gradient(ellipse 700px 400px at 10% 80%, rgba(30, 50, 100, 0.25) 0%, transparent 55%),
          radial-gradient(ellipse 700px 400px at 90% 80%, rgba(42, 68, 119, 0.2) 0%, transparent 55%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        overflow: hidden;
      }
      .cf-dash::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(120, 160, 220, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(120, 160, 220, 0.04) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%);
        z-index: 0;
        pointer-events: none;
      }
      .cf-dash > .cf-container { position: relative; z-index: 1; }
      /* Invert headline + description text on dark bg */
      .cf-dash .cf-h2 { color: #FFFFFF; }
      .cf-dash .cf-h2-italic { color: #a0c4f0; }
      .cf-dash .cf-tag,
      .cf-dash .cf-tag-teal { color: rgba(200, 215, 240, 0.75); }
      .cf-dash .cf-lede { color: rgba(200, 215, 240, 0.7); }

      /* ---------- DASHBOARD TRIO (left catalog + center dash + right quarantine) ---------- */

      .cf-dash-clip { overflow: hidden; width: 100%; }
      .cf-dash-trio {
        position: relative;
        padding: 70px 0 60px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: visible;
        perspective: 2400px;
        perspective-origin: center 30%;
        transform-style: preserve-3d;
      }

      /* Side panels — absolute positioned, tilted in true 3D space behind
         the center dashboard via translateZ(-60px). The center has z=0 so
         it paints in front because of 3D z-order, not z-index. */
      .cf-dash-panel {
        position: absolute;
        top: 80px;
        bottom: 30px;
        width: 320px;
        overflow: hidden;
        border-radius: 16px;
        pointer-events: none;
        transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
                    opacity 0.6s ease;
        display: flex;
        flex-direction: column;
        opacity: 0.96;
        backface-visibility: hidden;
      }
      .cf-dash-panel-left {
        left: max(8px, calc(50% - 560px));
        transform-origin: right center;
        transform: translateZ(-80px) rotateY(22deg);
      }
      .cf-dash-panel-right {
        right: max(8px, calc(50% - 560px));
        transform-origin: left center;
        transform: translateZ(-80px) rotateY(-22deg);
      }
      /* Make the side mock cards fill the panel wrapper */
      .cf-dash-panel .cf-dash-mock {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .cf-dash-panel .cf-dash-mock .cf-cat-body,
      .cf-dash-panel .cf-dash-mock .cf-qt-body {
        flex: 1 1 auto;
        overflow: hidden;
      }

      /* Center dashboard — z=0 in 3D space puts it in front of side panels. */
      .cf-dash-center {
        position: relative;
        width: 100%;
        max-width: 820px;
        margin: 0 auto;
        height: auto !important;
        min-height: auto !important;
        transform: translateZ(0);
      }

      /* ---------- COMPACT MODE ----------
         When the dashboard is inside the trio, every internal element
         shrinks (padding, font-size, gap) so all content — including the
         bottom trends + issues row — fits in ~620px natural height. */

      .cf-dash-trio .cf-dash-center .cf-dash-chrome {
        padding: 10px 14px;
      }
      .cf-dash-trio .cf-dash-center .cf-chrome-dots span {
        width: 8px; height: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-chrome-url {
        padding: 5px 10px;
        font-size: 10px;
      }
      .cf-dash-trio .cf-dash-center .cf-chrome-badge {
        font-size: 8.5px;
        padding: 3px 8px;
      }

      .cf-dash-trio .cf-dash-center .cf-dash-body {
        min-height: auto;
        grid-template-columns: 180px 1fr;
      }
      .cf-dash-trio .cf-dash-center .cf-dash-side {
        padding: 14px 12px 14px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-brand {
        gap: 8px;
        padding-bottom: 14px;
        margin-bottom: 14px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-brand img {
        width: 20px; height: 20px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-name { font-size: 11px; }
      .cf-dash-trio .cf-dash-center .cf-side-sub { font-size: 9px; }
      .cf-dash-trio .cf-dash-center .cf-side-label {
        font-size: 8px;
        margin-bottom: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-list {
        gap: 2px;
        margin-bottom: 16px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-list li {
        padding: 6px 8px;
        font-size: 11px;
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-badge {
        font-size: 8px;
        padding: 1px 5px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-user {
        padding-top: 12px;
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-avatar {
        width: 24px; height: 24px;
        font-size: 10px;
      }
      .cf-dash-trio .cf-dash-center .cf-side-uname { font-size: 10.5px; }
      .cf-dash-trio .cf-dash-center .cf-side-uemail { font-size: 8.5px; }

      .cf-dash-trio .cf-dash-center .cf-dash-content {
        padding: 18px 20px 20px;
        gap: 14px;
      }
      .cf-dash-trio .cf-dash-center .cf-dash-welcome { gap: 12px; }
      .cf-dash-trio .cf-dash-center .cf-dash-hi {
        font-size: 20px;
      }
      .cf-dash-trio .cf-dash-center .cf-dash-date { font-size: 8.5px; }
      .cf-dash-trio .cf-dash-center .cf-dash-actions { gap: 5px; }
      .cf-dash-trio .cf-dash-center .cf-dash-btn {
        padding: 5px 10px;
        font-size: 10px;
        gap: 5px;
      }

      .cf-dash-trio .cf-dash-center .cf-kpi-grid {
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-kpi {
        padding: 12px 12px 14px;
        gap: 3px;
      }
      .cf-dash-trio .cf-dash-center .cf-kpi-top { gap: 6px; }
      .cf-dash-trio .cf-dash-center .cf-kpi-icon {
        width: 20px; height: 20px;
      }
      .cf-dash-trio .cf-dash-center .cf-kpi-label {
        font-size: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-kpi-value {
        font-size: 22px;
      }
      .cf-dash-trio .cf-dash-center .cf-kpi-sub { font-size: 9px; }

      .cf-dash-trio .cf-dash-center .cf-alert {
        padding: 10px 14px;
        gap: 10px;
      }
      .cf-dash-trio .cf-dash-center .cf-alert-ico {
        width: 22px; height: 22px;
      }
      .cf-dash-trio .cf-dash-center .cf-alert-text { font-size: 11px; }
      .cf-dash-trio .cf-dash-center .cf-alert-cta {
        padding: 5px 10px;
        font-size: 9.5px;
      }

      .cf-dash-trio .cf-dash-center .cf-dash-layout {
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-panel {
        padding: 12px 14px;
        gap: 10px;
      }
      .cf-dash-trio .cf-dash-center .cf-panel-title { font-size: 8.5px; }
      .cf-dash-trio .cf-dash-center .cf-issues-total .cf-countup {
        font-size: 14px;
      }

      /* Donut: smaller SVG */
      .cf-dash-trio .cf-dash-center .cf-donut {
        gap: 12px;
      }
      .cf-dash-trio .cf-dash-center .cf-donut svg {
        width: 108px; height: 108px;
      }
      .cf-dash-trio .cf-dash-center .cf-donut-legend {
        font-size: 10px;
        gap: 8px;
      }

      /* Score bars */
      .cf-dash-trio .cf-dash-center .cf-scorebars { gap: 10px; }
      .cf-dash-trio .cf-dash-center .cf-scorebar-label { font-size: 10px; }
      .cf-dash-trio .cf-dash-center .cf-scorebar-track {
        height: 7px;
      }

      /* Recent activity */
      .cf-dash-trio .cf-dash-center .cf-activity-list {
        gap: 10px;
        margin-top: 10px;
      }
      .cf-dash-trio .cf-dash-center .cf-activity-list li {
        font-size: 10.5px;
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-act-time { font-size: 9px; }

      /* Data processing trends sparkline */
      .cf-dash-trio .cf-dash-center .cf-chart-head { margin-bottom: 10px; }
      .cf-dash-trio .cf-dash-center .cf-chart-title { font-size: 8.5px; }
      .cf-dash-trio .cf-dash-center .cf-chart-tabs {
        font-size: 9px;
        padding: 2px;
      }
      .cf-dash-trio .cf-dash-center .cf-chart-tabs span {
        padding: 3px 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-spark {
        height: 95px;
      }

      /* Top issues */
      .cf-dash-trio .cf-dash-center .cf-issues-list {
        gap: 8px;
      }
      .cf-dash-trio .cf-dash-center .cf-issue-name { font-size: 9.5px; }
      .cf-dash-trio .cf-dash-center .cf-issue-count { font-size: 10px; }
      .cf-dash-trio .cf-dash-center .cf-issue-bar { height: 3px; }

      /* Side mock sizing — shorter than the center to fit the row */
      .cf-dash-mock {
        width: 100%;
        font-size: 11px;
        opacity: 0.96;
        filter: saturate(0.95);
      }
      .cf-dash-mock .cf-dash-chrome {
        padding: 10px 14px;
      }
      .cf-dash-mock .cf-chrome-dots span {
        width: 8px;
        height: 8px;
      }
      .cf-dash-mock .cf-chrome-url {
        padding: 5px 10px;
        font-size: 9.5px;
      }
      .cf-dash-mock .cf-chrome-badge {
        font-size: 8.5px;
        padding: 3px 7px;
      }

      /* ---- Data Catalog mock internals ---- */

      .cf-cat-body {
        padding: 20px 22px 22px;
        background: var(--bg-0);
      }
      .cf-cat-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .cf-cat-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: var(--ink);
        letter-spacing: -0.01em;
      }
      .cf-cat-chips {
        display: flex;
        gap: 6px;
      }
      .cf-cat-chip {
        font-family: var(--font-mono), monospace;
        font-size: 8.5px;
        letter-spacing: 0.12em;
        padding: 3px 7px;
        border-radius: 4px;
        background: var(--bg-2);
        color: var(--ink-3);
        text-transform: uppercase;
        font-weight: 600;
      }
      .cf-cat-chip-ok {
        background: rgba(42, 68, 119, 0.1);
        color: var(--blue);
      }
      .cf-cat-toolbar {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }
      .cf-cat-search {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--bg-1);
        font-size: 10px;
        color: var(--ink-4);
      }
      .cf-cat-import {
        padding: 6px 10px;
        background: var(--blue);
        color: #FFFFFF;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 600;
      }
      .cf-cat-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
      }
      .cf-cat-table th {
        text-align: left;
        padding: 8px 6px;
        font-family: var(--font-mono), monospace;
        font-size: 8.5px;
        letter-spacing: 0.1em;
        color: var(--ink-4);
        font-weight: 500;
        border-bottom: 1px solid var(--line);
        text-transform: uppercase;
      }
      .cf-cat-table td {
        padding: 10px 6px;
        border-bottom: 1px dashed var(--line);
      }
      .cf-cat-file {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .cf-cat-file-name {
        font-size: 10.5px;
        color: var(--ink);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 160px;
      }
      .cf-cat-file-size {
        font-family: var(--font-mono), monospace;
        font-size: 8.5px;
        color: var(--ink-4);
      }
      .cf-cat-q {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        font-weight: 700;
      }
      .cf-cat-q-hi { background: rgba(42, 68, 119, 0.12); color: var(--blue); }
      .cf-cat-q-mid { background: rgba(230, 193, 92, 0.2); color: #8a6400; }
      .cf-cat-q-lo { background: rgba(228, 88, 88, 0.15); color: #c23636; }
      .cf-cat-q-empty {
        font-family: var(--font-mono), monospace;
        color: var(--ink-4);
      }
      .cf-cat-rows {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        color: var(--ink-3);
      }
      .cf-cat-st {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-family: var(--font-mono), monospace;
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: 0.05em;
      }
      .cf-cat-st-ready {
        background: rgba(42, 68, 119, 0.12);
        color: var(--blue);
      }
      .cf-cat-st-complete {
        background: rgba(34, 139, 98, 0.12);
        color: #1f6d4a;
      }

      /* ---- Quarantine Editor mock internals ---- */

      .cf-qt-body {
        padding: 16px 18px 18px;
        background: var(--bg-0);
      }
      .cf-qt-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--line);
      }
      .cf-qt-left {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .cf-qt-tab,
      .cf-qt-tab-on {
        font-family: var(--font-sans), sans-serif;
        font-size: 9.5px;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid var(--line);
        color: var(--ink-3);
        background: var(--bg-1);
        font-weight: 500;
      }
      .cf-qt-tab-on {
        background: var(--blue);
        color: #FFFFFF;
        border-color: var(--blue);
      }
      .cf-qt-saved {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        color: #1f6d4a;
        font-weight: 700;
        letter-spacing: 0.1em;
      }
      .cf-qt-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
        table-layout: fixed;
      }
      .cf-qt-table th {
        text-align: left;
        padding: 6px 5px;
        font-family: var(--font-mono), monospace;
        font-size: 8px;
        letter-spacing: 0.08em;
        color: var(--ink-4);
        font-weight: 600;
        border-bottom: 1px solid var(--line-2);
        background: var(--bg-2);
      }
      .cf-qt-table td {
        padding: 7px 5px;
        border-bottom: 1px solid var(--line);
        font-size: 9.5px;
        color: var(--ink-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cf-qt-mono {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
      }
      .cf-qt-err {
        background: rgba(228, 88, 88, 0.12);
        color: #c23636;
        position: relative;
      }
      .cf-qt-err::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #e45858;
      }

      /* Hide side panels only on truly narrow viewports — keep the trio
         visible from ~1024px upwards. Above 1024 the max() / calc() in the
         panel positioning keeps them on-screen and overlapping the center. */
      @media (max-width: 1024px) {
        .cf-dash-trio { min-height: auto; padding: 40px 0 20px; }
        .cf-dash-panel { display: none; }
        .cf-dash-center { max-width: 920px; }
      }

      .cf-dash-frame {
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        background: var(--bg-0);
        box-shadow:
          0 50px 120px -40px rgba(15, 23, 42, 0.2),
          0 20px 50px -20px rgba(15, 23, 42, 0.12),
          0 0 0 1px rgba(42, 68, 119, 0.05);
      }
      .cf-dash-chrome {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 14px 18px;
        border-bottom: 1px solid var(--line);
        background: var(--bg-2);
      }
      .cf-chrome-dots {
        display: flex;
        gap: 6px;
      }
      .cf-chrome-dots span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .cf-chrome-dots span:nth-child(1) { background: #EF4444; }
      .cf-chrome-dots span:nth-child(2) { background: #F59E0B; }
      .cf-chrome-dots span:nth-child(3) { background: var(--teal); }
      .cf-chrome-url {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--bg-0);
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-4);
      }
      .cf-chrome-badge {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.18em;
        padding: 4px 10px;
        border-radius: 3px;
        background: rgba(42,68,119,0.1);
        color: var(--teal);
        border: 1px solid rgba(42,68,119,0.28);
      }

      .cf-dash-body {
        display: grid;
        grid-template-columns: 220px 1fr;
        min-height: 560px;
      }

      .cf-dash-side {
        border-right: 1px solid var(--line);
        padding: 22px 18px 22px;
        background: var(--bg-2);
        display: flex;
        flex-direction: column;
      }
      .cf-side-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 22px;
        border-bottom: 1px solid var(--line);
        margin-bottom: 22px;
      }
      .cf-side-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 13px;
        color: var(--ink);
      }
      .cf-side-sub {
        font-size: 10px;
        color: var(--ink-4);
        letter-spacing: 0.04em;
      }
      .cf-side-label {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        margin: 0 0 10px;
      }
      .cf-side-list {
        list-style: none;
        padding: 0;
        margin: 0 0 24px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .cf-side-list li {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 11px;
        border-radius: 6px;
        font-size: 13px;
        color: var(--ink-2);
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      }
      .cf-side-list li:hover { background: var(--bg-3); }
      .cf-side-list li svg { opacity: 0.7; }
      .cf-side-on {
        background: rgba(42, 68, 119, 0.1) !important;
        color: var(--teal) !important;
      }
      .cf-side-on svg { opacity: 1; }

      .cf-side-user {
        margin-top: auto;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .cf-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(42,68,119,0.12);
        color: var(--teal);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 600;
      }
      .cf-side-uname { font-size: 12.5px; color: var(--ink); }
      .cf-side-uemail { font-size: 10px; color: var(--ink-4); }

      .cf-dash-content {
        padding: 28px 32px 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .cf-dash-welcome {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
      }
      .cf-dash-hi {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: -0.022em;
        margin: 0 0 4px;
      }
      .cf-dash-hi-italic {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        color: var(--teal);
        font-weight: 600;
      }
      .cf-dash-date {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-4);
      }
      .cf-dash-actions {
        display: flex;
        gap: 8px;
      }
      .cf-dash-btn {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 14px;
        border: 1px solid var(--line-2);
        border-radius: 6px;
        background: var(--bg-0);
        color: var(--ink-2);
        font-size: 12px;
        font-family: inherit;
        cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
      }
      .cf-dash-btn:hover { border-color: var(--teal); color: var(--teal); }

      .cf-kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .cf-kpi {
        padding: 16px 18px 18px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--bg-0);
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .cf-kpi::before {
        content: "";
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: var(--line-2);
      }
      .cf-kpi-teal::before { background: var(--teal); }
      .cf-kpi-warn::before { background: var(--warn); }
      .cf-kpi-danger::before { background: #E45858; }
      .cf-kpi-top {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .cf-kpi-icon {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: var(--bg-3);
        color: var(--ink-3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cf-kpi-teal .cf-kpi-icon { background: rgba(42,68,119,0.1); color: var(--teal); }
      .cf-kpi-warn .cf-kpi-icon { background: rgba(180,83,9,0.1); color: var(--warn); }
      .cf-kpi-danger .cf-kpi-icon { background: rgba(228,88,88,0.1); color: #E45858; }
      .cf-kpi-danger .cf-kpi-value { color: #E45858; }
      .cf-kpi-label {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.14em;
        color: var(--ink-3);
      }
      .cf-kpi-value {
        font-family: var(--font-display), sans-serif;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: var(--ink);
        line-height: 1;
        margin-top: 4px;
      }
      .cf-kpi-teal .cf-kpi-value { color: var(--teal); }
      .cf-kpi-sub {
        font-size: 11px;
        color: var(--ink-4);
      }

      .cf-dash-split {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 12px;
      }
      .cf-chart-card,
      .cf-activity-card {
        padding: 18px 20px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--bg-0);
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .cf-chart-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }
      .cf-chart-title {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-3);
      }
      .cf-chart-tabs {
        display: flex;
        gap: 4px;
        background: var(--bg-2);
        padding: 3px;
        border-radius: 6px;
        font-size: 11px;
      }
      .cf-chart-tabs span {
        padding: 4px 10px;
        border-radius: 4px;
        color: var(--ink-3);
        cursor: pointer;
      }
      .cf-chart-tab-on {
        background: var(--bg-0);
        color: var(--teal) !important;
        box-shadow: 0 1px 2px rgba(15,23,42,0.08);
      }
      .cf-spark {
        width: 100%;
        height: 140px;
      }
      .cf-spark-svg {
        width: 100%;
        height: 100%;
      }

      /* sparkline traveling highlight dot — starts after draw-in completes */
      .cf-spark-traveler {
        offset-distance: 0%;
        opacity: 0;
        animation: cf-spark-travel 4.8s cubic-bezier(0.45, 0, 0.55, 1) 2.8s infinite;
      }
      @keyframes cf-spark-travel {
        0% { offset-distance: 0%; opacity: 0; }
        6% { opacity: 1; }
        94% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }

      .cf-activity-list {
        list-style: none;
        padding: 0;
        margin: 14px 0 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .cf-activity-list li {
        display: flex;
        gap: 11px;
        font-size: 12.5px;
        color: var(--ink-2);
        line-height: 1.45;
      }
      .cf-act-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-top: 6px;
        flex-shrink: 0;
      }
      .cf-act-ok { background: var(--teal); box-shadow: 0 0 0 3px rgba(42,68,119,0.16); }
      .cf-act-warn { background: var(--warn); box-shadow: 0 0 0 3px rgba(180,83,9,0.16); }
      .cf-act-time {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        color: var(--ink-4);
        margin-top: 2px;
      }

      /* ---------- METRICS STRIP (glassmorphism cards + parallax) ---------- */

      .cf-metrics {
        position: relative;
        padding: 110px 0 120px;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        background: var(--bg-2);
        overflow: hidden;
      }
      /* Parallax background decorations */
      .cf-metrics-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        pointer-events: none;
        z-index: 0;
      }
      .cf-metrics-blob-a {
        width: 540px;
        height: 540px;
        top: -140px;
        left: -160px;
        background: radial-gradient(circle, rgba(42, 68, 119, 0.22), transparent 60%);
      }
      .cf-metrics-blob-b {
        width: 620px;
        height: 620px;
        bottom: -220px;
        right: -200px;
        background: radial-gradient(circle, rgba(90, 127, 181, 0.18), transparent 60%);
      }
      .cf-metrics-grid-bg {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px);
        background-size: 52px 52px;
        mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
        pointer-events: none;
        z-index: 0;
      }
      .cf-metrics > .cf-container {
        position: relative;
        z-index: 2;
      }

      .cf-metrics-desc {
        font-family: var(--font-sans), sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink-3);
        max-width: 58ch;
        margin: 6px auto 0;
        text-align: center;
      }
      .cf-metrics-brand {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        color: var(--brand);
        letter-spacing: -0.005em;
      }
      .cf-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 22px;
      }

      /* Base card — brand blue gradient with white content */
      .cf-metric-card {
        position: relative;
        border: 1px solid rgba(90, 127, 181, 0.32);
        border-radius: 20px;
        background:
          radial-gradient(ellipse at 0% 0%, rgba(90, 127, 181, 0.28) 0%, transparent 55%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 65%, var(--navy) 100%);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.08) inset,
          0 16px 40px -20px rgba(15, 23, 42, 0.35),
          0 2px 6px -2px rgba(15, 23, 42, 0.15);
        padding: 28px 26px 26px;
        display: flex;
        flex-direction: column;
        gap: 22px;
        min-height: 220px;
      }

      .cf-metric-badge {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background:
          linear-gradient(
            155deg,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0.06) 100%
          );
        border: 1px solid rgba(255, 255, 255, 0.22);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.28) inset,
          0 8px 20px -10px rgba(0, 0, 0, 0.4);
        color: #FFFFFF;
      }
      .cf-metric-badge svg {
        width: 26px;
        height: 26px;
        stroke-width: 1.8;
      }

      .cf-metric-content {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .cf-metric-num {
        font-family: var(--font-display), sans-serif;
        font-size: clamp(44px, 4.4vw, 64px);
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 0.9;
        color: #FFFFFF;
        margin-bottom: 6px;
        font-feature-settings: "tnum";
      }
      .cf-metric-suffix {
        font-size: 0.58em;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: rgba(200, 220, 250, 0.9);
        margin-left: 2px;
      }
      .cf-metric-label {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 15px;
        color: #FFFFFF;
        letter-spacing: -0.005em;
      }
      .cf-metric-sub {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.12em;
        color: rgba(200, 215, 240, 0.7);
        text-transform: uppercase;
      }

      /* ---------- FEATURES ---------- */

      .cf-features {
        padding: 120px 0;
        overflow: hidden;
      }

      /* --- Discipline strip: 6 tiles with live animated icons --- */
      .cf-disc-strip {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        margin: 0 auto 80px;
        max-width: 1180px;
        background: var(--line);
        border: 1px solid var(--line);
        border-radius: 16px;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.6) inset,
          0 10px 40px -20px rgba(15, 23, 41, 0.08);
      }
      .cf-disc-tile {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 26px 26px 28px;
        background: var(--bg-0);
        color: var(--brand);
        position: relative;
        transition: background 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cf-disc-tile:hover {
        background: var(--bg-2);
      }
      .cf-disc-tile::after {
        content: "";
        position: absolute;
        bottom: 0; left: 26px;
        width: 0;
        height: 2px;
        background: var(--brand);
        transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .cf-disc-tile:hover::after { width: calc(100% - 52px); }
      .cf-disc-ico {
        color: var(--brand);
      }
      .cf-disc-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 17px;
        letter-spacing: -0.015em;
        color: var(--ink);
        margin-top: 6px;
      }
      .cf-disc-line {
        font-family: var(--font-sans), sans-serif;
        font-size: 13.5px;
        line-height: 1.45;
        color: var(--ink-4);
      }

      /* --- Live icon animations (each runs independently, infinitely) --- */

      /* Data Profiling — bars pulse up/down in sequence */
      .cf-di-pf {
        fill: var(--brand);
        transform-origin: bottom center;
        animation: cf-di-pf-rise 2.4s ease-in-out infinite;
      }
      .cf-di-pf-1 { animation-delay: 0s; }
      .cf-di-pf-2 { animation-delay: 0.2s; }
      .cf-di-pf-3 { animation-delay: 0.4s; }
      .cf-di-pf-4 { animation-delay: 0.6s; }
      @keyframes cf-di-pf-rise {
        0%, 100% { transform: scaleY(0.75); opacity: 0.75; }
        50%      { transform: scaleY(1);    opacity: 1; }
      }
      .cf-di-pf-dot {
        animation: cf-di-pf-dot 2s ease-in-out infinite;
      }
      @keyframes cf-di-pf-dot {
        0%, 100% { opacity: 1; transform: translateY(0); }
        50%      { opacity: 0.4; transform: translateY(-2px); }
      }

      /* Data Quality — checkmark draws in loop */
      .cf-di-q-check {
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
        animation: cf-di-q-draw 2.8s ease-in-out infinite;
      }
      @keyframes cf-di-q-draw {
        0%   { stroke-dashoffset: 30; }
        40%  { stroke-dashoffset: 0; }
        80%  { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 30; }
      }

      /* Data Transformation — arrow pulses between two blocks */
      .cf-di-tr-arrow {
        transform-origin: 50% 50%;
        animation: cf-di-tr-pulse 2s ease-in-out infinite;
      }
      @keyframes cf-di-tr-pulse {
        0%, 100% { transform: translateX(-3px); opacity: 0.55; }
        50%      { transform: translateX(0);    opacity: 1; }
      }

      /* Data Migration — dots travel along path in staggered sequence */
      .cf-di-mg-dot {
        animation: cf-di-mg-travel 2.2s linear infinite;
        opacity: 0;
      }
      .cf-di-mg-dot-1 { animation-delay: 0s; }
      .cf-di-mg-dot-2 { animation-delay: 0.73s; }
      .cf-di-mg-dot-3 { animation-delay: 1.46s; }
      @keyframes cf-di-mg-travel {
        0%   { transform: translateX(0);  opacity: 0; }
        15%  { opacity: 1; }
        85%  { opacity: 1; }
        100% { transform: translateX(24px); opacity: 0; }
      }

      /* Data Modernization — arrow rises + refreshes */
      .cf-di-md-up {
        transform-origin: 50% 50%;
        animation: cf-di-md-rise 2.6s ease-in-out infinite;
      }
      @keyframes cf-di-md-rise {
        0%, 100% { transform: translateY(3px);  opacity: 0.6; }
        50%      { transform: translateY(-2px); opacity: 1; }
      }

      /* Data Security — shield + inner dot pulse */
      .cf-di-sec-shield {
        stroke: var(--brand);
        animation: cf-di-sec-glow 2.8s ease-in-out infinite;
      }
      @keyframes cf-di-sec-glow {
        0%, 100% { stroke-opacity: 0.85; filter: none; }
        50%      { stroke-opacity: 1;    filter: drop-shadow(0 0 2px rgba(42, 68, 119, 0.45)); }
      }
      .cf-di-sec-dot {
        animation: cf-di-sec-pulse 1.8s ease-in-out infinite;
      }
      @keyframes cf-di-sec-pulse {
        0%, 100% { opacity: 0.45; }
        50%      { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .cf-di-pf, .cf-di-pf-dot, .cf-di-q-check, .cf-di-tr-arrow,
        .cf-di-mg-dot, .cf-di-md-up, .cf-di-sec-shield, .cf-di-sec-dot {
          animation: none !important;
        }
        .cf-di-q-check { stroke-dashoffset: 0; }
        .cf-di-mg-dot { opacity: 1; }
      }

      /* Disc strip responsive */
      @media (max-width: 960px) {
        .cf-disc-strip { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 540px) {
        .cf-disc-strip { grid-template-columns: 1fr; margin-bottom: 60px; }
        .cf-disc-tile { padding: 22px 22px 24px; }
      }
      .cf-feat-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .cf-feat-card {
        padding: 36px 32px 34px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--bg-0);
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: relative;
        overflow: hidden;
        transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .cf-feat-card:hover {
        border-color: var(--line-3);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.15);
      }
      .cf-feat-on {
        border-color: rgba(37,99,235,0.3);
        background: linear-gradient(180deg, rgba(37,99,235,0.04), var(--bg-0));
      }
      .cf-feat-on::before {
        content: "";
        position: absolute;
        top: 0; left: 20%; right: 20%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--blue-2), transparent);
      }
      .cf-feat-icon-box {
        width: 64px;
        height: 64px;
        border-radius: 12px;
        background: var(--bg-2);
        color: var(--ink-3);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cf-feat-on .cf-feat-icon-box {
        background: rgba(42,68,119,0.08);
        color: var(--teal);
      }
      .cf-feat-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: var(--blue);
      }
      .cf-feat-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 26px;
        letter-spacing: -0.02em;
        margin: 0;
        line-height: 1.1;
      }
      .cf-feat-body {
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--ink-3);
        margin: 0;
      }
      .cf-feat-link {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--blue);
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        margin-top: 6px;
      }

      /* ---------- PIPELINE (blue background) ---------- */

      .cf-pipeline {
        padding: 140px 0 150px;
        border-top: 1px solid rgba(90, 127, 181, 0.2);
        background:
          radial-gradient(ellipse 1100px 600px at 50% 20%, rgba(90, 127, 181, 0.22) 0%, transparent 55%),
          radial-gradient(ellipse 800px 500px at 15% 85%, rgba(30, 50, 100, 0.3) 0%, transparent 55%),
          radial-gradient(ellipse 800px 500px at 85% 85%, rgba(42, 68, 119, 0.28) 0%, transparent 55%),
          linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
        position: relative;
        overflow: hidden;
      }
      .cf-pipeline::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(120, 160, 220, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(120, 160, 220, 0.04) 1px, transparent 1px);
        background-size: 72px 72px;
        mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%);
        z-index: 0;
        pointer-events: none;
      }
      .cf-pipeline > .cf-container { position: relative; z-index: 1; }
      /* Invert section head text on dark bg */
      .cf-pipeline .cf-h2 { color: #FFFFFF; }
      .cf-pipeline .cf-h2-italic { color: #a0c4f0; }
      .cf-pipeline .cf-tag,
      .cf-pipeline .cf-tag-teal { color: rgba(200, 215, 240, 0.75); }
      .cf-pipeline .cf-lede { color: rgba(200, 215, 240, 0.7); }
      .cf-pipe-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        border: 1px solid var(--line);
        border-radius: 14px;
        overflow: hidden;
        background: var(--bg-0);
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .cf-pipe-stage {
        padding: 32px 22px 36px;
        border-right: 1px solid var(--line);
        transition: background 0.3s;
      }
      .cf-pipe-stage:last-child { border-right: none; }
      .cf-pipe-stage:hover { background: var(--bg-1); }
      .cf-pipe-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 26px;
      }
      .cf-pipe-num {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
      }
      .cf-pipe-arrow {
        color: var(--teal);
        font-family: var(--font-mono), monospace;
      }
      .cf-pipe-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 600;
        font-size: 22px;
        letter-spacing: -0.02em;
        margin: 0 0 8px;
        color: var(--ink);
      }
      .cf-pipe-desc {
        font-size: 13px;
        line-height: 1.5;
        color: var(--ink-3);
        margin: 0;
      }

      /* ---------- REVIEWS — horizontal stacked strips, scroll-revealed ---------- */

      .cf-reviews {
        padding: 130px 0 120px;
        background:
          radial-gradient(ellipse 900px 520px at 20% 30%, rgba(42, 68, 119, 0.08), transparent 60%),
          radial-gradient(ellipse 700px 460px at 85% 70%, rgba(90, 127, 181, 0.08), transparent 62%),
          var(--bg-1);
        overflow: hidden;
      }

      /* ─── Full-bleed marquee — card contents fade at the sides (JS-driven) ─── */
      .cf-reviews-marquee {
        position: relative;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-top: 56px;
        overflow: hidden;
        padding: 32px 0;
      }
      .cf-review-bcard-logo,
      .cf-review-bcard-glass {
        opacity: var(--cf-fade, 1);
        transition: opacity 0.08s linear;
        will-change: opacity;
      }
      .cf-reviews-track {
        display: flex;
        gap: 32px;
        width: max-content;
        animation: cf-reviews-scroll 90s linear infinite;
        padding: 8px 16px;
      }
      .cf-reviews-marquee:hover .cf-reviews-track { animation-play-state: paused; }
      @keyframes cf-reviews-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) { .cf-reviews-track { animation: none; } }

      /* ─── Navy card — full container width ─── */
      .cf-review-bcard {
        flex-shrink: 0;
        width: min(1160px, calc(100vw - 48px));
        padding: 44px 52px 42px;
        border-radius: 22px;
        background:
          radial-gradient(ellipse at 14% 0%, rgba(90, 127, 181, 0.36) 0%, transparent 58%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 55%, var(--navy-deep) 100%);
        border: 1px solid rgba(160, 196, 240, 0.28);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.1) inset,
          0 32px 70px -28px rgba(10, 18, 36, 0.6);
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "quote"
          "quote"
          "foot";
        column-gap: 0;
        row-gap: 18px;
        color: #FFFFFF;
        transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.6s;
      }
      .cf-review-bcard:hover {
        transform: translateY(-4px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.14) inset,
          0 40px 86px -30px rgba(42, 68, 119, 0.7);
      }

      /* Logo — big, left column, vertically centered */
      .cf-review-bcard-logo {
        grid-area: logo;
        display: flex; align-items: center; justify-content: flex-start;
      }
      .cf-review-bcard-logo img {
        max-width: 150px;
        max-height: 64px;
        width: auto; height: auto;
        object-fit: contain;
        filter: brightness(0) invert(1);
        opacity: 0.94;
      }

      /* Glass-morphic container — wraps quote + footer (role / org). Spans
         quote + foot grid rows so logo sits visually outside the glass. */
      .cf-review-bcard-glass {
        grid-area: quote / quote / foot / foot;
        padding: 26px 30px 22px;
        border-radius: 18px;
        background:
          linear-gradient(160deg, rgba(255, 255, 255, 0.14) 0%, rgba(160, 196, 240, 0.07) 55%, rgba(255, 255, 255, 0.04) 100%);
        border: 1px solid rgba(255, 255, 255, 0.22);
        backdrop-filter: blur(18px) saturate(1.3);
        -webkit-backdrop-filter: blur(18px) saturate(1.3);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.28) inset,
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 14px 36px -18px rgba(10, 18, 36, 0.5);
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr);
        grid-template-rows: auto auto;
        grid-template-areas:
          "mark  text"
          ".     foot";
        column-gap: 18px;
        row-gap: 16px;
      }
      .cf-review-bcard-mark {
        grid-area: mark;
        width: 32px;
        height: 24px;
        color: #a0c4f0;
        opacity: 0.75;
        flex-shrink: 0;
        margin-top: 4px;
      }
      .cf-review-bcard-text {
        grid-area: text;
        font-family: var(--font-display), sans-serif;
        font-size: clamp(17px, 1.55vw, 20px);
        line-height: 1.55;
        font-weight: 400;
        color: rgba(240, 246, 255, 0.96);
        margin: 0;
        letter-spacing: -0.008em;
        text-wrap: pretty;
      }
      .cf-review-bcard-em {
        background: linear-gradient(180deg, transparent 62%, rgba(160, 196, 240, 0.42) 62%);
        color: #FFFFFF;
        font-weight: 500;
        padding: 0 2px;
      }
      /* Footer: bottom-right inside the glass, matching the pre-marquee alignment */
      .cf-review-bcard-foot {
        grid-area: foot;
        justify-self: end;
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding-top: 14px;
        margin-top: 2px;
        border-top: 1px dashed rgba(160, 196, 240, 0.28);
        width: 100%;
        justify-content: flex-end;
      }
      .cf-review-bcard-role {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #a0c4f0;
        font-weight: 700;
      }
      .cf-review-bcard-sep { color: rgba(160, 196, 240, 0.45); font-family: var(--font-mono), monospace; }
      .cf-review-bcard-org {
        font-family: var(--font-display), sans-serif;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.01em;
        color: #FFFFFF;
      }

      @media (max-width: 900px) {
        .cf-reviews { padding: 84px 0 92px; }
        .cf-reviews-marquee { margin-top: 40px; padding: 20px 0; }
        .cf-reviews-track { gap: 20px; animation-duration: 60s; padding: 6px 10px; }
        .cf-review-bcard {
          width: min(680px, calc(100vw - 40px));
          padding: 28px 26px 26px;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "quote"
            "quote"
            "foot";
          column-gap: 0;
          row-gap: 18px;
        }
        .cf-review-bcard-glass {
          grid-area: quote / quote / foot / foot;
          padding: 20px 22px 18px;
          grid-template-columns: 28px minmax(0, 1fr);
          column-gap: 14px;
        }
        .cf-review-bcard-logo { justify-content: flex-start; }
        .cf-review-bcard-logo img { max-width: 110px; max-height: 48px; }
        .cf-review-bcard-text { font-size: 15.5px; }
        .cf-review-bcard-foot { justify-content: flex-start; justify-self: start; }
        .cf-review-bcard-org { font-size: 14.5px; }
      }
      @media (max-width: 540px) {
        .cf-review-strip-role {
          font-size: 12px;
          letter-spacing: 0.2em;
        }
        .cf-review-strip-org { font-size: 17px; }
      }

      /* ---------- QUOTES (legacy, unused) ---------- */

      .cf-quote {
        padding: 120px 0;
        overflow: hidden;
      }
      .cf-quote-em {
        color: #c0d4f0;
        font-style: italic;
        font-weight: 500;
      }

      /* ---------- QUOTES MARQUEE (auto-scrolling cards) ---------- */

      .cf-quotes-marquee {
        position: relative;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
        padding: 30px 0;
      }
      .cf-quotes-track {
        display: flex;
        gap: 32px;
        width: max-content;
        animation: cf-quotes-scroll 52s linear infinite;
        padding: 0 16px;
      }
      .cf-quotes-marquee:hover .cf-quotes-track {
        animation-play-state: paused;
      }
      @keyframes cf-quotes-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .cf-quote-card {
        flex-shrink: 0;
        width: 560px;
        min-height: 280px;
        padding: 44px 42px 38px;
        border: 1px solid rgba(90, 127, 181, 0.28);
        border-radius: 18px;
        background:
          radial-gradient(ellipse at 20% 0%, rgba(90, 127, 181, 0.32) 0%, transparent 55%),
          linear-gradient(155deg, var(--brand) 0%, var(--navy-cta) 60%, var(--navy) 100%);
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
        overflow: hidden;
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.08) inset,
          0 16px 40px -20px rgba(15, 23, 41, 0.35),
          0 2px 6px -2px rgba(15, 23, 41, 0.15);
        transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
      }
      .cf-quote-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 28px;
        right: 28px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #c0d4f0, transparent);
        opacity: 0;
        transition: opacity 0.4s;
      }
      .cf-quote-card:hover {
        border-color: rgba(120, 160, 220, 0.5);
        transform: translateY(-4px);
        box-shadow:
          0 1px 0 rgba(255, 255, 255, 0.12) inset,
          0 0 0 1px rgba(120, 160, 220, 0.35) inset,
          0 28px 60px -24px rgba(42, 68, 119, 0.55);
      }
      .cf-quote-card:hover::before {
        opacity: 1;
      }
      .cf-quote-mark-sm {
        font-family: var(--font-serif), serif;
        font-style: italic;
        font-size: 108px;
        line-height: 0.5;
        color: rgba(160, 196, 240, 0.55);
        margin-bottom: -22px;
        display: block;
        transform-origin: left center;
        user-select: none;
      }
      .cf-quote-text-sm {
        font-family: var(--font-sans), sans-serif;
        font-size: 22px;
        line-height: 1.45;
        font-weight: 400;
        margin: 0;
        color: #FFFFFF;
        letter-spacing: -0.008em;
        text-wrap: pretty;
        flex: 1;
      }
      .cf-quote-rule {
        height: 1px;
        background: linear-gradient(90deg, var(--line-2), transparent);
        margin: 4px 0 0;
      }
      .cf-quote-by-sm {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .cf-quote-name {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.005em;
        color: var(--ink);
      }
      .cf-quote-role {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        color: var(--ink-4);
        text-transform: uppercase;
      }

      @media (max-width: 780px) {
        .cf-quote-card { width: 340px; min-height: auto; padding: 32px 28px 28px; }
        .cf-quote-mark-sm { font-size: 76px; margin-bottom: -14px; }
        .cf-quote-text-sm { font-size: 19px; }
        .cf-quotes-track { gap: 20px; animation-duration: 36s; }
        .cf-hero-stats-bar {
          flex-wrap: wrap;
          gap: 18px 24px;
          padding: 18px 20px;
        }
        .cf-hs-rule { display: none; }
        .cf-hs-item { flex: 1 1 40%; }
        .cf-hs-num { font-size: 26px; }
        .cf-live-score-value { font-size: 46px; }
        .cf-hero-meta-right { display: none; }
      }

      /* ---------- PRICING ---------- */

      .cf-pricing {
        padding: 120px 0;
        border-top: 1px solid var(--line);
        background: var(--bg-1);
      }
      .cf-plans {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .cf-plan {
        position: relative;
        padding: 36px 30px 34px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--bg-0);
        display: flex;
        flex-direction: column;
        gap: 16px;
        transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .cf-plan:hover {
        border-color: var(--line-3);
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.15);
      }
      .cf-plan-on {
        border-color: rgba(37,99,235,0.32);
        background: linear-gradient(180deg, rgba(37,99,235,0.05), var(--bg-0));
      }
      .cf-plan-on::before {
        content: "";
        position: absolute;
        top: 0; left: 20%; right: 20%;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--blue-2), transparent);
      }
      .cf-plan-flag {
        position: absolute;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.2em;
        padding: 5px 12px;
        background: var(--blue);
        color: #FFFFFF;
        border-radius: 999px;
        font-weight: 700;
      }
      .cf-plan-name {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.2em;
        color: var(--blue);
      }
      .cf-plan-price {
        display: flex;
        align-items: baseline;
        gap: 6px;
      }
      .cf-plan-ccy {
        font-family: var(--font-display), sans-serif;
        font-size: 24px;
        color: var(--ink-2);
      }
      .cf-plan-amount {
        font-family: var(--font-display), sans-serif;
        font-size: 62px;
        font-weight: 600;
        letter-spacing: -0.035em;
        line-height: 0.9;
        color: var(--ink);
      }
      .cf-plan-amount-sm {
        font-size: 38px;
        letter-spacing: -0.025em;
      }
      .cf-plan-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-4);
        margin-left: 4px;
      }
      .cf-plan-for {
        font-size: 13px;
        color: var(--ink-3);
        line-height: 1.5;
      }
      .cf-plan-rule {
        height: 1px;
        background: var(--line);
      }
      .cf-plan-features {
        list-style: none;
        padding: 0;
        margin: 0 0 10px;
        display: flex;
        flex-direction: column;
        gap: 11px;
      }
      .cf-plan-features li {
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 13.5px;
        color: var(--ink-2);
      }
      .cf-plan-features svg { color: var(--teal); flex-shrink: 0; }
      .cf-plan .cf-btn { justify-content: center; }

      /* ---------- CTA ---------- */

      .cf-cta {
        padding: 0 0 100px;
        background: var(--bg-1);
      }
      .cf-cta-card {
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
      .cf-cta-card > * { position: relative; z-index: 2; }

      /* Concentric rings — ripple effect on right side */
      .cf-cta-rings {
        position: absolute;
        top: 50%;
        right: -5%;
        transform: translateY(-50%);
        width: 340px;
        height: 340px;
        z-index: 1;
        pointer-events: none;
      }
      .cf-cta-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: 2.5px solid rgba(255, 255, 255, 0.15);
        transform: translate(-50%, -50%);
      }
      .cf-cta-ring-1 {
        width: 100%; height: 100%;
        border-width: 2px;
        border-color: rgba(255, 255, 255, 0.22);
        animation: cf-ripple 3s ease-in-out infinite;
      }
      .cf-cta-ring-2 {
        width: 72%; height: 72%;
        border-width: 2.5px;
        border-color: rgba(255, 255, 255, 0.28);
        animation: cf-ripple 3s ease-in-out infinite 0.4s;
      }
      .cf-cta-ring-3 {
        width: 46%; height: 46%;
        border-width: 3px;
        border-color: rgba(255, 255, 255, 0.35);
        animation: cf-ripple 3s ease-in-out infinite 0.8s;
      }
      .cf-cta-ring-4 {
        width: 22%; height: 22%;
        border: none;
        background: rgba(255, 255, 255, 0.25);
        animation: cf-ripple-core 3s ease-in-out infinite 1.2s;
      }
      @keyframes cf-ripple {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.18); opacity: 0.4; }
      }
      @keyframes cf-ripple-core {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.5; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cf-cta-ring, .cf-cta-ring-4 { animation: none !important; }
      }

      .cf-cta-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 480px;
      }
      .cf-cta-h {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(26px, 3vw, 36px);
        line-height: 1.12;
        letter-spacing: -0.02em;
        margin: 0;
        color: #FFFFFF;
      }
      .cf-cta-card .cf-h2-italic {
        font-family: var(--font-display), sans-serif;
        font-style: italic;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
      }
      .cf-cta-sub {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.65);
        margin: 0 0 18px;
        line-height: 1.5;
        max-width: 38ch;
      }
      .cf-cta-buttons {
        display: flex;
        gap: 10px;
      }
      .cf-cta-pill {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 100px;
        background: #FFFFFF;
        color: var(--brand);
        font-family: var(--font-sans), sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        white-space: nowrap;
        box-shadow: 0 8px 20px -6px rgba(15, 23, 41, 0.3);
      }
      .cf-cta-pill:hover {
        background: #FAFAF5;
        transform: translateY(-2px);
        box-shadow: 0 14px 28px -10px rgba(15, 23, 41, 0.4);
      }
      .cf-cta-pill-arrow {
        display: flex;
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
      .cf-cta-pill:hover .cf-cta-pill-arrow {
        background: var(--navy-cta);
        transform: translateX(2px);
      }

      @media (max-width: 780px) {
        .cf-cta { padding: 0 0 72px; }
        .cf-cta-card { padding: 36px 32px; border-radius: 18px; }
        .cf-cta-rings { width: 260px; height: 260px; right: -8%; }
        .cf-cta-h { font-size: clamp(22px, 6vw, 30px); }
        .cf-cta-sub { font-size: 13px; margin-bottom: 16px; }
        .cf-cta-buttons { flex-wrap: wrap; }
        .cf-cta-pill { font-size: 12.5px; padding: 10px 16px; }
      }
      @media (max-width: 480px) {
        .cf-cta { padding: 0 0 56px; }
        .cf-cta-card { padding: 28px 22px; border-radius: 16px; }
        .cf-cta-rings { width: 200px; height: 200px; right: -12%; top: 60%; }
        .cf-cta-buttons { flex-direction: column; }
        .cf-cta-pill { width: 100%; justify-content: center; }
      }

      /* ---------- FOOTER (navy band + stencil watermark) ---------- */

      .cf-footer {
        position: relative;
        background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, #0A1420 100%);
        color: #FFFFFF;
        padding: 96px 0 0;
        margin-top: 100px;
        overflow: hidden;
      }
      .cf-footer::after {
        content: "";
        position: absolute; top: 0; left: 50%;
        transform: translateX(-50%);
        width: 80%; height: 320px;
        background: radial-gradient(ellipse at 50% 0%, rgba(90, 127, 181, 0.24), transparent 60%);
        pointer-events: none;
      }
      .cf-footer > .cf-container { position: relative; z-index: 1; }
      .cf-footer-inner {
        display: flex;
        flex-direction: column;
        gap: 48px;
      }
      .cf-footer-top {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
        gap: 72px;
      }
      .cf-footer-top > div:first-child { display: flex; flex-direction: column; gap: 20px; }
      .cf-footer-top .cf-logo-name { color: #FFFFFF; }
      .cf-footer-top .cf-logo-tag { color: rgba(160, 196, 240, 0.65); }
      .cf-footer-tag {
        max-width: 32ch;
        font-size: 14.5px;
        color: rgba(200, 215, 240, 0.72);
        line-height: 1.6;
        margin: 8px 0 0;
      }
      .cf-footer-cols {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 36px;
      }
      .cf-foot-h {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 700;
        margin-bottom: 18px;
        text-transform: uppercase;
      }
      .cf-footer-cols ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;
      }
      .cf-footer-cols a {
        color: rgba(220, 232, 250, 0.72);
        text-decoration: none;
        transition: color 0.2s, transform 0.2s;
        display: inline-block;
      }
      .cf-footer-cols a:hover { color: #FFFFFF; transform: translateX(2px); }

      /* CLEAN STENCIL WATERMARK */
      .cf-footer-watermark {
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
        user-select: none;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
      }

      .cf-footer-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 22px 0 28px;
        margin-top: -10px;
      }
      .cf-footer-bottom > span {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        letter-spacing: 0.1em;
        color: rgba(200, 215, 240, 0.55);
        text-align: center;
      }

      @media (max-width: 900px) {
        .cf-footer-top { grid-template-columns: 1fr; gap: 40px; }
      }
      @media (max-width: 600px) {
        .cf-footer { padding: 72px 0 0; margin-top: 72px; }
        .cf-footer-cols { grid-template-columns: 1fr 1fr; gap: 26px; }
        .cf-footer-watermark { margin: 28px 0 0; }
      }
      .cf-footer-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .cf-chip {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.1em;
        padding: 5px 10px;
        border: 1px solid var(--line);
        border-radius: 3px;
        background: var(--bg-0);
        color: var(--ink-3);
      }

      /* ---------- COUNTUP ---------- */

      .cf-countup {
        font-variant-numeric: tabular-nums;
        font-feature-settings: "tnum";
      }

      /* ---------- FEATURE ICON ANIMATIONS ---------- */

      .cf-feat-card .cf-fa-bar {
        transform-origin: center bottom;
        animation: cf-fa-grow 3.2s ease-in-out infinite;
      }
      .cf-feat-card .cf-fa-bar1 { animation-delay: 0s; }
      .cf-feat-card .cf-fa-bar2 { animation-delay: 0.2s; }
      .cf-feat-card .cf-fa-bar3 { animation-delay: 0.4s; }
      .cf-feat-card .cf-fa-bar4 { animation-delay: 0.6s; }
      @keyframes cf-fa-grow {
        0%, 100% { transform: scaleY(1); opacity: var(--s, 1); }
        50% { transform: scaleY(0.55); }
      }
      .cf-feat-card .cf-fa-dot {
        transform-origin: 35px 7px;
        animation: cf-fa-ping 2.4s ease-in-out infinite;
      }
      @keyframes cf-fa-ping {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.35); opacity: 0.6; }
      }

      .cf-feat-card .cf-fb-check {
        stroke-dasharray: 12;
        stroke-dashoffset: 12;
        animation: cf-fb-draw 2.8s ease-in-out infinite;
      }
      @keyframes cf-fb-draw {
        0%, 15% { stroke-dashoffset: 12; }
        35%, 75% { stroke-dashoffset: 0; }
        95%, 100% { stroke-dashoffset: 12; }
      }
      .cf-feat-card .cf-fb-cell {
        transform-origin: 20px 20px;
        animation: cf-fb-pulse 2.8s ease-in-out infinite;
      }
      @keyframes cf-fb-pulse {
        0%, 100% { transform: scale(1); }
        20% { transform: scale(1.08); }
      }

      .cf-feat-card .cf-fc-pulse {
        animation: cf-fc-travel 3s ease-in-out infinite;
        opacity: 0;
      }
      @keyframes cf-fc-travel {
        0% { cx: 15; cy: 20; opacity: 0; }
        10% { opacity: 1; }
        33% { cx: 27; cy: 10; opacity: 1; }
        36% { opacity: 0; cx: 15; cy: 20; }
        40% { opacity: 1; }
        60% { cx: 27; cy: 20; opacity: 1; }
        63% { opacity: 0; cx: 15; cy: 20; }
        68% { opacity: 1; }
        90% { cx: 27; cy: 30; opacity: 1; }
        100% { opacity: 0; }
      }
      .cf-feat-card .cf-fc-n1,
      .cf-feat-card .cf-fc-n2 {
        animation: cf-fc-blink 3s ease-in-out infinite;
      }
      .cf-feat-card .cf-fc-n1 { animation-delay: 0.9s; }
      .cf-feat-card .cf-fc-n2 { animation-delay: 1.8s; }
      .cf-feat-card .cf-fc-n3 { animation: cf-fc-blink 3s ease-in-out infinite; animation-delay: 2.6s; }
      @keyframes cf-fc-blink {
        0%, 90%, 100% { stroke: currentColor; fill: none; }
        10%, 30% { stroke: var(--teal); }
      }

      .cf-feat-card .cf-feat-icon-box {
        transition: background 0.4s, transform 0.4s, box-shadow 0.4s;
        position: relative;
      }
      .cf-feat-card:hover .cf-feat-icon-box {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 10px 24px -12px var(--teal-glow);
      }
      .cf-feat-card .cf-feat-icon-box::after {
        content: "";
        position: absolute;
        inset: -10px;
        border-radius: 16px;
        background: radial-gradient(circle, var(--teal-glow), transparent 60%);
        opacity: 0;
        transition: opacity 0.4s;
        pointer-events: none;
      }
      .cf-feat-card:hover .cf-feat-icon-box::after { opacity: 1; }

      /* ---------- PIPELINE LIVE FLOW ---------- */

      .cf-pipe-grid { position: relative; }
      .cf-pipe-flow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        pointer-events: none;
        z-index: 3;
      }
      .cf-pipe-flow-track {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, var(--line-2), transparent);
      }
      .cf-pipe-flow-dot {
        position: absolute;
        top: -3px;
        left: 0;
        width: 10%;
        height: 9px;
        background: radial-gradient(ellipse at center, var(--teal) 0%, rgba(42,68,119,0) 70%);
        filter: blur(1px);
        animation: cf-pipe-travel 6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
      @keyframes cf-pipe-travel {
        0% { left: -10%; }
        100% { left: 100%; }
      }

      .cf-pipe-stage {
        position: relative;
        overflow: hidden;
      }
      .cf-pipe-wash {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(42,68,119,0.08), transparent 60%);
        opacity: 0;
        pointer-events: none;
        animation: cf-stage-wash 6s linear infinite;
        animation-delay: calc(var(--i) * 1s);
      }
      @keyframes cf-stage-wash {
        0%, 8% { opacity: 0; }
        10% { opacity: 1; }
        16% { opacity: 0.6; }
        22% { opacity: 0; }
      }
      .cf-pipe-stage .cf-pipe-arrow {
        animation: cf-arrow-pulse 6s linear infinite;
        animation-delay: calc(var(--i) * 1s);
      }
      @keyframes cf-arrow-pulse {
        0%, 8% { color: var(--ink-4); transform: translateX(0); }
        12% { color: var(--teal); transform: translateX(3px); }
        20% { color: var(--ink-4); transform: translateX(0); }
      }

      /* ---------- DASHBOARD ALERT + LAYOUT ---------- */

      .cf-alert {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: rgba(245, 197, 92, 0.12);
        border: 1px solid rgba(245, 197, 92, 0.35);
        border-radius: 10px;
      }
      .cf-alert-ico {
        display: flex;
        width: 26px;
        height: 26px;
        border-radius: 6px;
        align-items: center;
        justify-content: center;
        background: rgba(245, 197, 92, 0.2);
        color: var(--warn);
      }
      .cf-alert-text {
        flex: 1;
        font-size: 13px;
        color: var(--ink-2);
      }
      .cf-alert-text b { color: var(--ink); font-weight: 600; }
      .cf-alert-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        font-size: 11.5px;
        font-family: inherit;
        border: 1px solid rgba(245, 197, 92, 0.4);
        border-radius: 6px;
        background: transparent;
        color: var(--warn);
        cursor: pointer;
        transition: background 0.2s;
      }
      .cf-alert-cta:hover { background: rgba(245, 197, 92, 0.15); }

      .cf-dash-layout {
        display: grid;
        grid-template-columns: 1fr 1fr 0.95fr;
        grid-template-rows: auto auto;
        gap: 12px;
        grid-template-areas:
          "rowdist scoredist activity"
          "trends  trends    issues";
      }
      .cf-panel {
        padding: 18px 20px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--bg-0);
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .cf-panel-rowdist { grid-area: rowdist; }
      .cf-panel-scoredist { grid-area: scoredist; }
      .cf-panel-activity { grid-area: activity; }
      .cf-panel-trends { grid-area: trends; }
      .cf-panel-issues { grid-area: issues; }

      .cf-panel-title {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.14em;
        color: var(--ink-3);
      }
      .cf-panel-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cf-issues-total {
        font-family: var(--font-mono), monospace;
        font-size: 11px;
        color: var(--ink-3);
        display: flex;
        gap: 6px;
        align-items: baseline;
      }
      .cf-issues-total .cf-countup {
        font-family: var(--font-display), sans-serif;
        font-size: 16px;
        color: var(--ink);
        font-weight: 600;
      }

      /* donut — scroll-triggered draw (framer-motion) + orbit dot only */
      .cf-donut {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .cf-donut svg { flex-shrink: 0; }
      .cf-donut-svg {
        overflow: visible;
        animation: cf-donut-breathe 5s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes cf-donut-breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.015); }
      }
      .cf-donut-legend {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 12px;
        color: var(--ink-2);
      }
      .cf-donut-legend > div { display: flex; align-items: center; gap: 8px; }
      .cf-donut-legend b { color: var(--ink); }
      .cf-lg-dot { width: 9px; height: 9px; border-radius: 2px; }
      .cf-lg-teal { background: var(--teal); }
      .cf-lg-red { background: #E45858; }

      /* score bars */
      .cf-scorebars {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .cf-scorebar-row {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .cf-scorebar-label {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--ink-2);
      }
      .cf-scorebar-val {
        font-family: var(--font-mono), monospace;
        color: var(--ink-3);
      }
      .cf-scorebar-track {
        height: 9px;
        border-radius: 5px;
        background: var(--bg-2);
        overflow: hidden;
      }
      .cf-scorebar-fill {
        height: 100%;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
      }
      .cf-scorebar-fill::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg,
          transparent 0%,
          rgba(255, 255, 255, 0) 25%,
          rgba(255, 255, 255, 0.6) 50%,
          rgba(255, 255, 255, 0) 75%,
          transparent 100%);
        transform: translateX(-100%);
        animation: cf-bar-shimmer 3.6s ease-in-out 2.2s infinite;
      }
      @keyframes cf-bar-shimmer {
        0%, 25% { transform: translateX(-100%); }
        55% { transform: translateX(100%); }
        100% { transform: translateX(100%); }
      }

      /* top issues */
      .cf-issues-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .cf-issues-list li {
        display: flex;
        flex-direction: column;
        gap: 5px;
        opacity: 0;
        animation: cf-issue-in 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        animation-delay: var(--d, 0s);
      }
      @keyframes cf-issue-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .cf-issue-top {
        display: flex;
        justify-content: space-between;
        font-size: 11.5px;
      }
      .cf-issue-name { color: var(--ink-2); }
      .cf-issue-count {
        font-family: var(--font-mono), monospace;
        color: var(--ink);
        font-weight: 500;
      }
      .cf-issue-bar {
        height: 4px;
        border-radius: 2px;
        background: var(--bg-2);
        overflow: hidden;
      }
      .cf-issue-fill {
        height: 100%;
        border-radius: 2px;
        background: linear-gradient(90deg, var(--teal), #E45858);
        transform-origin: left center;
        animation: cf-bar-grow 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
        animation-delay: var(--d, 0s);
      }

      /* sidebar badge */
      .cf-side-has-badge { padding-right: 8px; }
      .cf-side-badge {
        margin-left: auto;
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        font-weight: 700;
        background: #E45858;
        color: #FFFFFF;
        padding: 2px 6px;
        border-radius: 999px;
        line-height: 1;
      }

      /* ---------- SERVICE ROWS (ALTERNATING) ---------- */

      .cf-srv-rows {
        display: flex;
        flex-direction: column;
        gap: 80px;
      }
      .cf-srv-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 56px;
        align-items: center;
      }
      .cf-srv-row.cf-srv-flip .cf-srv-copy {
        order: 2;
        text-align: right;
        align-items: flex-end;
      }
      .cf-srv-row.cf-srv-flip .cf-srv-viz { order: 1; }
      .cf-srv-row.cf-srv-flip .cf-srv-title {
        text-align: right;
        margin-left: auto;
      }
      .cf-srv-row.cf-srv-flip .cf-srv-body {
        margin-left: auto;
        text-align: justify;
        hyphens: none;
        word-break: keep-all;
      }
      .cf-srv-row.cf-srv-flip .cf-feat-link {
        flex-direction: row-reverse;
      }
      .cf-srv-row.cf-srv-flip .cf-feat-link .cf-arrow {
        transform: scaleX(-1);
      }
      .cf-srv-row.cf-srv-flip .cf-feat-link:hover .cf-arrow {
        transform: scaleX(-1) translateX(3px);
      }

      .cf-srv-copy {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .cf-srv-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: clamp(34px, 4.2vw, 54px);
        line-height: 1.05;
        letter-spacing: -0.028em;
        margin: 0;
        text-wrap: balance;
        max-width: 14ch;
      }
      .cf-srv-body {
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink-3);
        margin: 0;
        max-width: 44ch;
        text-align: justify;
      }

      .cf-srv-viz {
        position: relative;
        aspect-ratio: 7 / 6;
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 20px;
        background:
          radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.08), transparent 70%),
          var(--bg-0);
        overflow: hidden;
        box-shadow: 0 30px 60px -30px rgba(15,23,42,0.15),
                    inset 0 1px 0 rgba(255,255,255,0.6);
      }
      .cf-srv-viz::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
        mask-image: radial-gradient(ellipse at center, black 50%, transparent 95%);
      }
      .cf-srv-viz-inner {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 10px;
      }
      .cf-viz-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .cf-viz-label {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.16em;
        fill: var(--ink-4);
        text-transform: uppercase;
      }
      .cf-viz-label-red { fill: #E45858; }
      .cf-viz-cell-label {
        font-family: var(--font-mono), monospace;
        font-size: 10px;
        fill: #FFFFFF;
        opacity: 0.95;
      }

      /* TransformViz — bars grow, particles flow */
      .cf-tv-bar {
        transform-origin: left center;
        animation: cf-tv-bar-in 1s cubic-bezier(0.19, 1, 0.22, 1) both,
                   cf-tv-bar-hum 4s ease-in-out 1.4s infinite;
      }
      @keyframes cf-tv-bar-in {
        from { transform: scaleX(0); opacity: 0; }
        to { transform: scaleX(1); opacity: 0.9; }
      }
      @keyframes cf-tv-bar-hum {
        0%, 100% { opacity: 0.85; }
        50% { opacity: 1; }
      }
      .cf-tv-particle {
        offset-distance: 0%;
        opacity: 0;
        animation: cf-tv-particle-fly 3.2s linear infinite;
      }
      @keyframes cf-tv-particle-fly {
        0% { offset-distance: 0%; opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }

      /* QualityViz — cells reveal row-by-row, check/X draws */
      .cf-qv-cell {
        transform-origin: center;
        animation: cf-qv-cell-in 0.5s cubic-bezier(0.19, 1, 0.22, 1) both,
                   cf-qv-cell-fill 5s ease-in-out 0.5s infinite;
      }
      @keyframes cf-qv-cell-in {
        from { opacity: 0; transform: scale(0.6); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes cf-qv-cell-fill {
        0%, 100% { fill: var(--bg-2); }
        50% { fill: rgba(42,68,119,0.12); }
      }
      .cf-qv-cell-fail {
        animation: cf-qv-cell-in 0.5s cubic-bezier(0.19, 1, 0.22, 1) both,
                   cf-qv-cell-fill-fail 5s ease-in-out 0.5s infinite;
      }
      @keyframes cf-qv-cell-fill-fail {
        0%, 100% { fill: var(--bg-2); }
        50% { fill: rgba(228,88,88,0.12); }
      }
      .cf-qv-check {
        stroke-dasharray: 40;
        stroke-dashoffset: 40;
        animation: cf-qv-draw 0.7s cubic-bezier(0.19, 1, 0.22, 1) both;
      }
      @keyframes cf-qv-draw {
        to { stroke-dashoffset: 0; }
      }
      .cf-qv-x {
        opacity: 0;
        animation: cf-qv-pop 0.6s cubic-bezier(0.19, 1, 0.22, 1) both;
      }
      @keyframes cf-qv-pop {
        from { opacity: 0; transform: scale(0.3); }
        to { opacity: 1; transform: scale(1); }
      }
      .cf-qv-sweep-rect {
        pointer-events: none;
        opacity: 0.8;
        animation: cf-qv-sweep 3.6s ease-in-out infinite;
      }
      @keyframes cf-qv-sweep {
        0%, 100% { transform: translateX(-100%); }
        50% { transform: translateX(0); }
      }

      /* ShieldViz — PII redaction table */
      .cf-viz-col-h {
        font-family: var(--font-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.16em;
        fill: var(--ink-4);
        text-transform: uppercase;
      }
      .cf-viz-row-label {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.1em;
        fill: var(--ink-3);
      }
      .cf-viz-row-raw {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        fill: var(--ink-2);
      }
      .cf-viz-row-out {
        font-family: var(--font-mono), monospace;
        font-size: 11.5px;
        fill: var(--teal);
        letter-spacing: 0.04em;
        opacity: 0;
        animation: cf-sv-out-in 5s ease-in-out infinite;
      }
      @keyframes cf-sv-out-in {
        0%, 4% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        96%, 100% { opacity: 0; }
      }
      .cf-sv-row-bg {
        opacity: 0;
        animation: cf-sv-rowbg 5s ease-in-out infinite;
      }
      @keyframes cf-sv-rowbg {
        0%, 3% { opacity: 0; }
        6% { opacity: 1; }
        14% { opacity: 0.4; }
        90% { opacity: 0.4; }
        96%, 100% { opacity: 0; }
      }
      .cf-sv-lock {
        opacity: 0;
        animation: cf-sv-lock-in 5s ease-in-out infinite;
      }
      @keyframes cf-sv-lock-in {
        0%, 6% { opacity: 0; transform-box: fill-box; transform: scale(0.5); }
        14% { opacity: 1; transform: scale(1); }
        90% { opacity: 1; }
        96%, 100% { opacity: 0; }
      }
      .cf-sv-scan {
        opacity: 0.8;
        animation: cf-sv-scan-move 5s linear infinite;
      }
      @keyframes cf-sv-scan-move {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 0.9; }
        50% { transform: translateY(276px); opacity: 0.9; }
        60% { opacity: 0; }
        100% { transform: translateY(276px); opacity: 0; }
      }
      .cf-sv-badge {
        opacity: 0;
        transform-origin: center;
        animation: cf-sv-badge-in 6s ease-in-out infinite;
      }
      @keyframes cf-sv-badge-in {
        0%, 40% { opacity: 0; transform: translateY(6px); }
        55% { opacity: 1; transform: translateY(0); }
        92% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(6px); }
      }
      .cf-viz-badge-label {
        font-family: var(--font-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.1em;
        fill: var(--ink-2);
        font-weight: 600;
      }

      /* ---------- PATHFLOW PIPELINE ---------- */

      .cf-pathflow {
        position: relative;
        max-width: 960px;
        margin: 0 auto;
        min-height: 1400px;
      }
      .cf-pathflow-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .cf-pathflow-traveler {
        offset-distance: 0%;
        filter: drop-shadow(0 0 8px rgba(42, 68, 119, 0.6));
        animation: cf-pathflow-travel 12s cubic-bezier(0.45, 0, 0.55, 1) infinite 3.6s;
      }
      @keyframes cf-pathflow-travel {
        0% { offset-distance: 0%; opacity: 0; }
        5% { opacity: 1; }
        95% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }

      .cf-pathflow-stages {
        position: relative;
        z-index: 2;
        height: 100%;
        min-height: 1400px;
      }
      /* Each stage is absolutely positioned so the NODE CENTER lands exactly on
         the SVG path anchor point. Node is 104px; half = 52px offset. Horizontal
         anchors: x=140 (14.583% of 960) and x=820 (right 14.583%). Vertical
         anchors: 80, 328, 576, 824, 1072, 1320 (evenly spaced in 1400-tall box). */
      .cf-pf-stage {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 28px;
        z-index: 2;
      }
      .cf-pf-stage:nth-child(1) {
        left: calc(14.583% - 52px);
        top: 28px;
        flex-direction: row;
      }
      .cf-pf-stage:nth-child(2) {
        right: calc(14.583% - 52px);
        top: 276px;
        flex-direction: row-reverse;
      }
      .cf-pf-stage:nth-child(3) {
        left: calc(14.583% - 52px);
        top: 524px;
        flex-direction: row;
      }
      .cf-pf-stage:nth-child(4) {
        right: calc(14.583% - 52px);
        top: 772px;
        flex-direction: row-reverse;
      }
      .cf-pf-stage:nth-child(5) {
        left: calc(14.583% - 52px);
        top: 1020px;
        flex-direction: row;
      }
      .cf-pf-stage:nth-child(6) {
        right: calc(14.583% - 52px);
        top: 1268px;
        flex-direction: row-reverse;
      }

      .cf-pf-node {
        position: relative;
        width: 104px;
        height: 104px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cf-pf-node-inner {
        position: relative;
        z-index: 2;
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: linear-gradient(155deg, #ffffff 0%, #eaf0fb 100%);
        border: 2px solid rgba(160, 196, 240, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:
          0 22px 48px -18px rgba(0, 0, 0, 0.5),
          0 0 0 6px rgba(255, 255, 255, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
        color: var(--blue-2);
      }
      .cf-pf-node-inner .cf-stg-ico {
        width: 44px;
        height: 44px;
      }
      .cf-pf-node-ring {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 1.5px dashed rgba(160, 196, 240, 0.4);
        opacity: 0.7;
        animation: cf-pf-ring-spin 18s linear infinite;
      }
      @keyframes cf-pf-ring-spin {
        to { transform: rotate(360deg); }
      }
      .cf-pf-node-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: linear-gradient(155deg, var(--navy-mid) 0%, var(--brand) 100%);
        color: #FFFFFF;
        font-family: var(--font-mono), monospace;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;
        box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.55);
        border: 2px solid var(--navy-deep);
      }

      .cf-pf-card {
        width: 520px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 4;
        /* No background — bare text on the dark pipeline backdrop.
           Wide + short keeps descriptions on 2 lines so the path
           passes cleanly above or below, never through. */
        background: transparent;
        border: none;
        padding: 0;
      }
      /* Left-aligned cards — everything flush left */
      .cf-pf-left .cf-pf-card {
        align-items: flex-start;
      }
      /* Right-aligned cards — everything flush right */
      .cf-pf-right .cf-pf-card {
        align-items: flex-end;
      }
      .cf-pf-tag {
        font-family: var(--font-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.22em;
        color: #a0c4f0;
        font-weight: 600;
        margin-bottom: 8px;
        text-transform: uppercase;
      }
      .cf-pf-title {
        font-family: var(--font-display), sans-serif;
        font-weight: 700;
        font-size: 30px;
        line-height: 1.05;
        letter-spacing: -0.028em;
        margin: 0 0 10px;
        color: #FFFFFF;
      }
      .cf-pf-desc {
        font-size: 14.5px;
        line-height: 1.55;
        color: rgba(210, 222, 245, 0.78);
        margin: 0;
        /* Wider max-width so description flows in ~2 lines */
        max-width: 62ch;
      }
      /* Right-aligned card — push every block to the right edge */
      .cf-pf-right .cf-pf-tag,
      .cf-pf-right .cf-pf-title,
      .cf-pf-right .cf-pf-desc {
        text-align: right;
      }

      .cf-stg-ico {
        width: 44px;
        height: 44px;
      }

      /* Per-icon live animations — professional, subtle */

      /* Upload: arrow rises inside cloud */
      .cf-stg-upload-arrow {
        transform-origin: 32px 40px;
        animation: cf-stg-upload-bob 2.4s ease-in-out infinite;
      }
      @keyframes cf-stg-upload-bob {
        0%, 100% { transform: translateY(3px); opacity: 0.85; }
        50% { transform: translateY(-4px); opacity: 1; }
      }

      /* Profile: magnifying glass drifts over the database rows */
      .cf-stg-prof-mag {
        transform-origin: 44px 40px;
        animation: cf-stg-prof-scan 3.4s ease-in-out infinite;
      }
      @keyframes cf-stg-prof-scan {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(-6px, -4px); }
        50% { transform: translate(-2px, 2px); }
        75% { transform: translate(-8px, 0); }
      }

      /* Configure: knobs slide along their sliders */
      .cf-stg-cfg-knob {
        transform-box: fill-box;
        transform-origin: center;
        animation: cf-stg-cfg-slide 3.6s ease-in-out infinite;
      }
      .cf-stg-cfg-k1 { animation-delay: 0s; }
      .cf-stg-cfg-k2 { animation-delay: 0.35s; }
      .cf-stg-cfg-k3 { animation-delay: 0.7s; }
      @keyframes cf-stg-cfg-slide {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-10px); }
      }

      /* Execute: arc fills from 0 → 100, play triangle gently pulses */
      .cf-stg-exec-arc {
        animation: cf-stg-exec-fill 3.2s ease-in-out infinite;
      }
      @keyframes cf-stg-exec-fill {
        0%, 4% { stroke-dashoffset: 100; }
        50% { stroke-dashoffset: 0; }
        96%, 100% { stroke-dashoffset: -100; }
      }
      .cf-stg-exec-play {
        transform-origin: 34px 32px;
        animation: cf-stg-exec-play-pulse 2.4s ease-in-out infinite;
      }
      @keyframes cf-stg-exec-play-pulse {
        0%, 100% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.08); opacity: 1; }
      }

      /* Review: stamp pops onto the clipboard, check draws in */
      .cf-stg-rev-stamp {
        transform-origin: 42px 44px;
        animation: cf-stg-rev-stamp 3s ease-in-out infinite;
      }
      @keyframes cf-stg-rev-stamp {
        0%, 10% { transform: scale(0.2); opacity: 0; }
        30% { transform: scale(1.15); opacity: 1; }
        45%, 85% { transform: scale(1); opacity: 1; }
        95%, 100% { transform: scale(0.2); opacity: 0; }
      }
      .cf-stg-rev-check-main {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
        animation: cf-stg-rev-draw 3s ease-in-out infinite;
      }
      @keyframes cf-stg-rev-draw {
        0%, 20% { stroke-dashoffset: 20; }
        45%, 85% { stroke-dashoffset: 0; }
        95%, 100% { stroke-dashoffset: 20; }
      }

      /* Export: arrow slides out to the right, fades */
      .cf-stg-export-arrow {
        animation: cf-stg-export-go 2.6s ease-in-out infinite;
      }
      @keyframes cf-stg-export-go {
        0%, 100% { transform: translateX(0); opacity: 0.85; }
        50% { transform: translateX(6px); opacity: 1; }
      }

      /* ---------- PRICING BUTTON ALIGNMENT ---------- */

      .cf-plan .cf-btn {
        margin-top: auto;
        justify-content: center;
      }
      .cf-plan-features {
        min-height: 160px;
      }

      /* ---------- RESPONSIVE ---------- */

      @media (max-width: 1100px) {
        .cf-hero-grid {
          grid-template-columns: 1fr;
          grid-template-areas:
            "meta"
            "copy"
            "side";
          gap: 40px;
        }
        .cf-hero-side {
          justify-content: flex-start;
          max-width: 480px;
        }
        .cf-hero-meta-bar {
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          padding: 12px 18px;
          font-size: 9.5px;
        }
        .cf-hero-stats-bar { gap: 18px; padding: 20px 24px; }
        .cf-hs-num { font-size: 30px; }
        .cf-srv-row { grid-template-columns: 1fr; gap: 28px; }
        .cf-srv-row.cf-srv-flip .cf-srv-copy { order: 1; }
        .cf-srv-row.cf-srv-flip .cf-srv-viz { order: 2; }
        .cf-plans { grid-template-columns: 1fr; }
        .cf-metrics-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
        .cf-kpi-grid { grid-template-columns: repeat(2, 1fr); }
        .cf-dash-layout {
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "rowdist scoredist"
            "activity issues"
            "trends trends";
        }
        .cf-footer-top { grid-template-columns: 1fr; gap: 40px; }
      }
      @media (max-width: 780px) {
        .cf-container { padding: 0 22px; }
        .cf-topbar-inner { padding: 14px 22px; }
        .cf-nav { gap: 14px; font-size: 12px; }
        .cf-nav > a:not(.cf-nav-cta):not(.cf-nav-signin) { display: none; }
        .cf-logo-text { display: none; }
        .cf-hero { min-height: 85vh; min-height: 85dvh; }
        .cf-hero-stats { gap: 20px; padding: 18px 22px; }
        .cf-stat-div { display: none; }
        .cf-dash-body { grid-template-columns: 1fr; }
        .cf-dash-side { border-right: none; border-bottom: 1px solid var(--line); }
        .cf-kpi-grid { grid-template-columns: 1fr 1fr; }
        .cf-dash-layout {
          grid-template-columns: 1fr;
          grid-template-areas:
            "rowdist"
            "scoredist"
            "activity"
            "trends"
            "issues";
        }
        .cf-alert { flex-wrap: wrap; }
        .cf-metrics-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
        .cf-footer-cols { grid-template-columns: 1fr 1fr; }
        .cf-footer-bottom { flex-direction: column; align-items: flex-start; }
      }

      /* ═══════════════════════════════════════════════════════════════
         COMPREHENSIVE MOBILE & RESPONSIVE RULES
         ═══════════════════════════════════════════════════════════════ */

      /* ═══ ≤960px: Pipeline becomes a centered vertical stack with a
             segmented live rail that lives ONLY in the gap between stages ═══ */
      @media (max-width: 960px) {
        .cf-pathflow { min-height: auto; padding: 8px 0; }
        .cf-pathflow-svg { display: none; }
        .cf-pathflow-stages {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: auto;
          height: auto;
          padding: 8px 0;
        }
        /* Centered stage: icon above text, text below — every column centered */
        .cf-pathflow-stages .cf-pf-stage,
        .cf-pathflow-stages .cf-pf-stage:nth-child(1),
        .cf-pathflow-stages .cf-pf-stage:nth-child(2),
        .cf-pathflow-stages .cf-pf-stage:nth-child(3),
        .cf-pathflow-stages .cf-pf-stage:nth-child(4),
        .cf-pathflow-stages .cf-pf-stage:nth-child(5),
        .cf-pathflow-stages .cf-pf-stage:nth-child(6) {
          position: relative;
          top: auto;
          left: auto;
          right: auto;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          padding: 0 16px 54px;    /* bottom padding hosts the live-rail segment */
          z-index: 2;
        }
        .cf-pathflow-stages .cf-pf-stage:last-child { padding-bottom: 8px; }

        /* Card: transparent, centered, no fixed width */
        .cf-pathflow-stages .cf-pf-stage .cf-pf-card,
        .cf-pathflow-stages .cf-pf-right .cf-pf-card,
        .cf-pathflow-stages .cf-pf-left  .cf-pf-card {
          width: auto; flex: none; min-width: 0;
          align-items: center;
          text-align: center;
          background: transparent;
          padding: 0;
          max-width: 440px;
        }
        .cf-pathflow-stages .cf-pf-card .cf-pf-tag,
        .cf-pathflow-stages .cf-pf-card .cf-pf-title,
        .cf-pathflow-stages .cf-pf-card .cf-pf-desc,
        .cf-pathflow-stages .cf-pf-right .cf-pf-tag,
        .cf-pathflow-stages .cf-pf-right .cf-pf-title,
        .cf-pathflow-stages .cf-pf-right .cf-pf-desc { text-align: center; }
        .cf-pathflow-stages .cf-pf-card .cf-pf-title { font-size: 22px; line-height: 1.15; margin: 4px 0 8px; }
        .cf-pathflow-stages .cf-pf-card .cf-pf-desc { font-size: 14.5px; line-height: 1.6; max-width: 44ch; margin: 0 auto; }

        /* LIVE RAIL — a single 2px segment positioned in the bottom padding
           of each stage so it only ever appears in the gap BETWEEN stages,
           never across the text. A sky-blue gradient travels from top-to-bottom
           via a running box-shadow glow. */
        .cf-pathflow-stages .cf-pf-stage::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 8px;
          width: 3px;
          height: 42px;
          /* Dotted pattern: 3px dot + 5px gap repeating vertically */
          background-image: linear-gradient(180deg, rgba(160, 196, 240, 0.85) 50%, transparent 50%);
          background-size: 3px 8px;
          background-repeat: repeat-y;
          background-position: center top;
          pointer-events: none;
          z-index: 1;
          animation: cf-rail-pulse 2.2s ease-in-out infinite;
        }
        .cf-pathflow-stages .cf-pf-stage:nth-child(2)::after { animation-delay: 0.2s; }
        .cf-pathflow-stages .cf-pf-stage:nth-child(3)::after { animation-delay: 0.4s; }
        .cf-pathflow-stages .cf-pf-stage:nth-child(4)::after { animation-delay: 0.6s; }
        .cf-pathflow-stages .cf-pf-stage:nth-child(5)::after { animation-delay: 0.8s; }
        .cf-pathflow-stages .cf-pf-stage:last-child::after { display: none; }
        @keyframes cf-rail-pulse {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 0 rgba(160, 196, 240, 0)); }
          50%      { opacity: 1;   filter: drop-shadow(0 0 4px rgba(160, 196, 240, 0.8)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cf-pathflow-stages .cf-pf-stage::after { animation: none; opacity: 0.7; }
        }
      }
      @media (max-width: 600px) {
        .cf-pathflow-stages .cf-pf-stage,
        .cf-pathflow-stages .cf-pf-stage:nth-child(1),
        .cf-pathflow-stages .cf-pf-stage:nth-child(2),
        .cf-pathflow-stages .cf-pf-stage:nth-child(3),
        .cf-pathflow-stages .cf-pf-stage:nth-child(4),
        .cf-pathflow-stages .cf-pf-stage:nth-child(5),
        .cf-pathflow-stages .cf-pf-stage:nth-child(6) { max-width: 100%; padding: 0 12px 48px; }
        .cf-pathflow-stages .cf-pf-card .cf-pf-title { font-size: 20px; }
        .cf-pathflow-stages .cf-pf-card .cf-pf-desc { font-size: 14px; }
        .cf-pathflow-stages .cf-pf-stage::after { height: 36px; bottom: 6px; background-size: 3px 7px; }
      }

      /* ----- ≤820px: Services rows stack, cards tighten ----- */
      @media (max-width: 820px) {
        .cf-srv-rows { gap: 56px; }
        .cf-srv-row {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        .cf-srv-row.cf-srv-flip .cf-srv-copy {
          order: 1 !important;
          text-align: left !important;
          align-items: flex-start !important;
        }
        .cf-srv-row.cf-srv-flip .cf-srv-viz { order: 2 !important; }
        .cf-srv-row.cf-srv-flip .cf-srv-title,
        .cf-srv-row.cf-srv-flip .cf-srv-body {
          text-align: left;
          margin-left: 0;
        }
        .cf-srv-row.cf-srv-flip .cf-feat-link {
          flex-direction: row;
        }
        .cf-srv-row.cf-srv-flip .cf-feat-link .cf-arrow {
          transform: none;
        }
        .cf-srv-title {
          font-size: clamp(28px, 6.4vw, 42px) !important;
          max-width: 16ch;
        }
        .cf-srv-body {
          font-size: 15px;
          max-width: 44ch;
        }
      }

      /* ----- ≤720px: Tablet → phone transition ----- */
      @media (max-width: 720px) {
        .cf-container { padding: 0 20px; }

        /* Hero */
        .cf-hero {
          padding-top: 30px;
          padding-bottom: 50px;
        }
        .cf-hero-centered { gap: 20px; padding-top: 18px; }
        .cf-h1 {
          font-size: clamp(34px, 10.5vw, 58px);
          letter-spacing: -0.032em;
        }
        .cf-h1-center { max-width: 14ch; }
        .cf-lede {
          font-size: 15.5px;
          max-width: 44ch;
        }
        .cf-cta-row { gap: 10px; flex-wrap: wrap; justify-content: center; }
        .cf-cta-row .cf-btn {
          font-size: 14px;
          padding: 13px 20px;
        }

        /* Section heads */
        .cf-section-head {
          margin-bottom: 44px;
          gap: 16px;
        }
        .cf-h2 {
          font-size: clamp(28px, 8vw, 44px);
          letter-spacing: -0.022em;
          max-width: 18ch;
        }

        /* Trust bar */
        .cf-trust { padding: 56px 0 40px; }
        .cf-trust-heading { padding-left: 20px; padding-right: 20px; }
        .cf-trust-sub { font-size: 18px; }
        .cf-marquee-track { gap: 36px; animation-duration: 34s; }
        .cf-logo-name-mq { font-size: 14px; gap: 10px; }

        /* Dashboard trio → center only */
        .cf-dash { padding: 72px 0; }
        .cf-dash-trio {
          padding: 20px 0 10px;
          min-height: auto;
          /* Disable the 3D perspective on mobile — no side panels to tilt, just show a flat frame */
          perspective: none;
          transform-style: flat;
        }
        .cf-dash-panel { display: none; }
        .cf-dash-center { max-width: 100%; transform: none !important; }
        .cf-dash-frame { max-width: 100%; overflow: hidden; }
        .cf-dash-chrome { padding: 10px 12px; gap: 10px; }
        .cf-chrome-url { font-size: 10px; padding: 5px 10px; }
        .cf-chrome-badge { font-size: 9px; padding: 3px 7px; }
        /* Collapse the dashboard mock's internal grid so it fits any phone width */
        .cf-dash-trio .cf-dash-center .cf-dash-body,
        .cf-dash-center .cf-dash-body { grid-template-columns: 1fr !important; min-height: auto; }
        .cf-dash-trio .cf-dash-center .cf-dash-side,
        .cf-dash-center .cf-dash-side { display: none; }
        .cf-dash-layout, .cf-dash-trio .cf-dash-center .cf-dash-layout { grid-template-columns: 1fr !important; }
        .cf-panel-kpis { grid-template-columns: 1fr 1fr !important; gap: 10px; }
        .cf-panel-kpis .cf-panel { padding: 14px 12px; }
        .cf-panel-rowdist, .cf-panel-activity, .cf-panel-trends, .cf-panel-issues { overflow-x: auto; }

        /* Metrics grid → 1 column */
        .cf-metrics { padding: 72px 0; }
        .cf-metrics-grid { grid-template-columns: 1fr !important; gap: 16px; }
        .cf-metric-card { min-height: 200px; padding: 26px 24px 26px; gap: 22px; }
        .cf-metric-badge { width: 50px; height: 50px; border-radius: 14px; }
        .cf-metric-badge svg { width: 26px; height: 26px; }
        .cf-metric-num { font-size: clamp(38px, 11vw, 52px) !important; }

        /* Services / feature rows */
        .cf-features { padding: 72px 0; }
        .cf-srv-rows { gap: 52px; }
        .cf-srv-viz { aspect-ratio: 4 / 3; }

        /* Pipeline stages */
        .cf-pipeline { padding: 72px 0; }
        .cf-pf-stage {
          gap: 20px;
          flex-direction: column !important;
          text-align: left !important;
          align-items: flex-start;
        }
        .cf-pf-node { width: 90px; height: 90px; }
        .cf-pf-node-inner { width: 72px; height: 72px; }
        .cf-pf-node-inner .cf-stg-ico { width: 36px; height: 36px; }
        .cf-pf-node-badge { width: 28px; height: 28px; font-size: 11px; }
        .cf-pf-title { font-size: 22px; }
        .cf-pf-desc { font-size: 14px; max-width: none; }

        /* Quotes marquee */
        .cf-quote { padding: 72px 0; }
        .cf-quote-card {
          width: 320px;
          min-height: auto;
          padding: 32px 28px 26px;
        }
        .cf-quote-mark-sm { font-size: 78px; margin-bottom: -14px; }
        .cf-quote-text-sm { font-size: 18px; line-height: 1.4; }
        .cf-quotes-marquee { padding: 18px 0; }
        .cf-quotes-track { gap: 18px; animation-duration: 36s; }

        /* Pricing */
        .cf-pricing { padding: 72px 0; }
        .cf-plans {
          grid-template-columns: 1fr !important;
          gap: 14px;
        }
        .cf-plan {
          padding: 32px 26px 30px;
        }
        .cf-plan-amount { font-size: 54px; }
        .cf-plan-amount-sm { font-size: 32px; }

        /* Footer */
        .cf-footer { padding: 56px 0 32px; }
        .cf-footer-inner { gap: 36px; }
        .cf-footer-top {
          grid-template-columns: 1fr !important;
          gap: 28px;
        }
        .cf-footer-tag { font-size: 13.5px; }
        .cf-footer-cols {
          grid-template-columns: 1fr 1fr;
          gap: 28px 16px;
        }
        .cf-foot-h { font-size: 9px; margin-bottom: 14px; }
        .cf-footer-cols ul { font-size: 13px; gap: 10px; }

        /* Top bar */
        .cf-topbar-inner {
          padding: 14px 20px;
        }
        .cf-wordmark .cf-logo-wrap { width: 34px; height: 34px; }
        .cf-wordmark .cf-logo-img { width: 34px; height: 34px; }
        .cf-nav-cta {
          padding: 9px 14px;
          font-size: 12.5px;
        }
      }

      /* ----- ≤480px: Small phone ----- */
      @media (max-width: 480px) {
        .cf-container { padding: 0 16px; }

        /* Hero */
        .cf-hero {
          padding-top: 16px;
          padding-bottom: 40px;
        }
        .cf-h1 {
          font-size: clamp(30px, 11vw, 48px);
          line-height: 1.02;
        }
        .cf-lede { font-size: 14.5px; }
        .cf-cta-row {
          flex-direction: column;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }
        .cf-cta-row .cf-btn {
          width: 100%;
          justify-content: center;
        }

        /* Section heads */
        .cf-section-head {
          margin-bottom: 36px;
        }
        .cf-h2 {
          font-size: clamp(26px, 9vw, 38px);
          line-height: 1.08;
          max-width: 16ch;
        }

        /* Trust sub */
        .cf-trust-sub { font-size: 15px; line-height: 1.45; }
        .cf-logo-name-mq { font-size: 12.5px; }

        /* Metric cards */
        .cf-metrics { padding: 56px 0; }
        .cf-metric-card { min-height: 170px; padding: 22px 20px 22px; gap: 18px; }
        .cf-metric-badge { width: 44px; height: 44px; border-radius: 12px; }
        .cf-metric-badge svg { width: 22px; height: 22px; }
        .cf-metric-num { font-size: clamp(34px, 12vw, 46px) !important; }
        .cf-metric-label { font-size: 14px; }
        .cf-metric-sub { font-size: 9px; }

        /* Features */
        .cf-features { padding: 56px 0; }
        .cf-srv-title {
          font-size: clamp(26px, 8vw, 38px) !important;
        }
        .cf-srv-body { font-size: 14px; }

        /* Pipeline stages */
        .cf-pipeline { padding: 56px 0; }
        .cf-pathflow-stages { gap: 28px; }
        .cf-pf-node { width: 78px; height: 78px; }
        .cf-pf-node-inner { width: 62px; height: 62px; }
        .cf-pf-node-inner .cf-stg-ico { width: 32px; height: 32px; }
        .cf-pf-node-badge { width: 24px; height: 24px; font-size: 10px; }
        .cf-pf-title { font-size: 20px; }
        .cf-pf-desc { font-size: 13.5px; }
        .cf-pf-tag { font-size: 9.5px; letter-spacing: 0.18em; }

        /* Quotes marquee */
        .cf-quote { padding: 56px 0; }
        .cf-quote-card {
          width: 288px;
          padding: 26px 22px 22px;
        }
        .cf-quote-mark-sm { font-size: 66px; margin-bottom: -12px; }
        .cf-quote-text-sm { font-size: 16.5px; }
        .cf-quote-name { font-size: 13px; }
        .cf-quote-role { font-size: 9.5px; letter-spacing: 0.14em; }

        /* Pricing */
        .cf-pricing { padding: 56px 0; }
        .cf-plan { padding: 28px 22px 26px; }
        .cf-plan-amount { font-size: 46px; }
        .cf-plan-amount-sm { font-size: 28px; }
        .cf-plan-name { font-size: 9.5px; letter-spacing: 0.18em; }
        .cf-plan-for { font-size: 12.5px; }
        .cf-plan-features li { font-size: 13px; }

        /* Footer */
        .cf-footer { padding: 44px 0 28px; }
        .cf-footer-cols {
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .cf-footer-bottom > span {
          font-size: 9.5px;
        }

        /* Top bar — logo tagline hidden, nav CTA smaller */
        .cf-topbar-inner {
          padding: 12px 16px;
        }
        .cf-nav {
          gap: 10px;
        }
        .cf-nav-cta {
          padding: 8px 12px;
          font-size: 11.5px;
          gap: 7px;
        }
        .cf-nav-cta .cf-arrow {
          width: 16px;
          height: 9px;
        }
      }

      /* ----- ≤360px: Very small phone (older iPhones, Galaxy Fold outer) ----- */
      @media (max-width: 360px) {
        .cf-container { padding: 0 14px; }
        .cf-h1 { font-size: clamp(26px, 11vw, 40px); }
        .cf-h2 { font-size: clamp(22px, 9vw, 32px); }
        .cf-lede { font-size: 13.5px; }
        .cf-metric-card { padding: 20px 16px 18px; min-height: 140px; }
        .cf-metric-badge { width: 40px; height: 40px; border-radius: 11px; }
        .cf-metric-badge svg { width: 20px; height: 20px; }
        .cf-quote-card { width: 260px; padding: 22px 18px 20px; }
        .cf-quote-text-sm { font-size: 15.5px; }
      }
    `}</style>
  )
}
