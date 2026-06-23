'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
      })
    }

    let animId: number
    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(45, 125, 210, 0.6)'
        ctx.fill()

        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(45, 125, 210, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function CodeWindow() {
  const lines = [
    { text: 'const stackup = new Agency({', color: '#E2E8F0' },
    { text: '  mission: "transformer vos idées",', color: '#94A3B8' },
    { text: '  quality: "premium",', color: '#94A3B8' },
    { text: '  price: "accessible",', color: '#94A3B8' },
    { text: '  delivery: "10 jours",', color: '#F59E0B' },
    { text: '})', color: '#E2E8F0' },
    { text: '', color: '' },
    { text: 'stackup.build({', color: '#E2E8F0' },
    { text: '  client: votreBusiness,', color: '#2D7DD2' },
    { text: '  result: "succès garanti ✓"', color: '#10B981' },
    { text: '})', color: '#E2E8F0' },
  ]
  const [visibleLines, setVisibleLines] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(v => (v < lines.length ? v + 1 : 0))
    }, 400)
    return () => clearInterval(interval)
  }, [lines.length])

  return (
    <div className="hidden lg:block relative">
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-gray-400 font-mono">stackup.ts</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: line.color }} className="transition-all duration-300">
              <span className="text-gray-600 mr-4 select-none">{String(i + 1).padStart(2, '0')}</span>
              {line.text}
            </div>
          ))}
          {visibleLines < lines.length && (
            <div className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-8" />
          )}
        </div>
      </div>
      <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl blur-xl -z-10" />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050A14]">
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1F3C]/50 via-transparent to-[#0A0F1E]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-8 backdrop-blur-sm">
            <span className="text-yellow-400">✦</span>
            <span>Agence digitale — France</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Votre vision.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D7DD2] to-[#F59E0B]">
              Notre code.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
            Nous concevons des sites web, applications et systèmes de gestion sur mesure — livrés en 10 jours, à des prix accessibles.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2D7DD2] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Voir nos services
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Devis gratuit →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '10j', label: 'Délai moyen' },
              { value: '100%', label: 'Sur mesure' },
              { value: '72h', label: 'Réponse garantie' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <CodeWindow />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
      </div>
    </section>
  )
}
