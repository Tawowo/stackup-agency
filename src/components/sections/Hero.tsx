'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ChevronRight, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const N = 55
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      o: Math.random() * 0.45 + 0.15,
    }))

    let id: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150,190,255,${p.o})`
        ctx.fill()
      })
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(150,190,255,${0.18 * (1 - d / 130)})`
            ctx.lineWidth = 0.7
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      id = requestAnimationFrame(draw)
    }
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(id); ro.disconnect() }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

/* ── Typing text ── */
function Typed({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 55)
    return () => clearTimeout(t)
  }, [started, displayed, text])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

/* ── Code illustration ── */
function CodeWindow() {
  const lines = [
    { indent: 0, text: 'const site = new StackupAgency({', color: 'text-blue-300' },
    { indent: 1, text: 'design: "sur-mesure",', color: 'text-emerald-300' },
    { indent: 1, text: 'performance: "< 3s",', color: 'text-emerald-300' },
    { indent: 1, text: 'seo: true,', color: 'text-emerald-300' },
    { indent: 1, text: 'responsive: true,', color: 'text-emerald-300' },
    { indent: 1, text: 'delai: "10 jours",', color: 'text-amber-300' },
    { indent: 0, text: '})', color: 'text-blue-300' },
    { indent: 0, text: '', color: '' },
    { indent: 0, text: 'site.launch() // ✓ En ligne', color: 'text-white/40' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0D1829]/80 backdrop-blur shadow-2xl shadow-black/40"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-amber-400/70" />
        <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-white/30 text-xs font-mono">stackup.agency/projet.ts</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.12, duration: 0.3 }}
            className="flex"
          >
            <span className="text-white/20 select-none mr-4 text-xs w-4">{i + 1}</span>
            <span className={`${line.color}`} style={{ paddingLeft: line.indent * 16 }}>
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Hero ── */
export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(30,58,95,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(45,125,210,0.25) 0%, transparent 50%)',
            'radial-gradient(ellipse at 60% 30%, rgba(30,58,95,0.7) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(45,125,210,0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(30,58,95,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(45,125,210,0.25) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gold accent blob */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gold/8 blur-[80px] pointer-events-none" />

      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left — text */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/15 border border-electric/20 text-electric text-sm font-semibold mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              Agence digitale — France
            </motion.div>

            <div className="mb-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                <Typed text={t.hero.title1} delay={200} />
              </h1>
            </div>
            <div className="mb-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
                style={{ background: 'linear-gradient(135deg, #2D7DD2 30%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                <Typed text={t.hero.title2} delay={t.hero.title1.length * 55 + 400} />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#services"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl backdrop-blur transition-all hover:-translate-y-0.5 text-sm"
              >
                {t.hero.cta1}
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gold hover:bg-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all hover:-translate-y-0.5 text-sm"
              >
                <Mail size={16} />
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.3 }}
              className="mt-14 flex gap-8 sm:gap-12"
            >
              {[
                { value: '10j', label: 'Délai moyen' },
                { value: '449€', label: 'Dès' },
                { value: '72h', label: 'Réponse garantie' },
              ].map(stat => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — code window */}
          <div className="hidden lg:block">
            <CodeWindow />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/30"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
