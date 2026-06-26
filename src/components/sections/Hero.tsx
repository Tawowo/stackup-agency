'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const shapes = [
  { size: 300, x: '80%', y: '10%', color: '#1E3A5F', opacity: 0.06, duration: 20 },
  { size: 200, x: '70%', y: '60%', color: '#F59E0B', opacity: 0.08, duration: 15 },
  { size: 150, x: '5%', y: '70%', color: '#2D7DD2', opacity: 0.07, duration: 25 },
  { size: 100, x: '15%', y: '15%', color: '#F59E0B', opacity: 0.1, duration: 18 },
]

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
    { text: '  client: votreBusiness,', color: '#7DD3FC' },
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
      <div className="bg-[#1E3A5F] rounded-xl border border-[#2D4F7A] overflow-hidden shadow-2xl shadow-navy/20">
        <div className="flex items-center gap-2 px-4 py-3 bg-[#162E4D] border-b border-[#2D4F7A]">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-2 text-xs text-white/40 font-mono">stackup.ts</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: line.color }} className="transition-all duration-300">
              <span className="text-white/20 mr-4 select-none">{String(i + 1).padStart(2, '0')}</span>
              {line.text}
            </div>
          ))}
          {visibleLines < lines.length && (
            <div className="inline-block w-2 h-4 bg-blue-300 animate-pulse ml-8" />
          )}
        </div>
      </div>
      <div className="absolute -inset-4 bg-blue-200/20 rounded-2xl blur-xl -z-10" />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF]">
      {/* Floating shapes */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color,
            opacity: s.opacity,
            animation: `floatShape${i % 2 === 0 ? 'A' : 'B'} ${s.duration}s ease-in-out infinite`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <style>{`
        @keyframes floatShapeA {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-30px); }
        }
        @keyframes floatShapeB {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(20px); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3A5F]/8 border border-[#1E3A5F]/15 text-[#1E3A5F] text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            Agence digitale — France
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-tight mb-6">
            Votre vision.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D7DD2] to-[#F59E0B]">
              Notre code.
            </span>
          </h1>

          <p className="text-xl text-[#475569] mb-10 leading-relaxed max-w-lg">
            Nous concevons des sites web, applications et systèmes de gestion sur mesure — livrés en 10 jours, à des prix accessibles.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="#services"
              className="px-8 py-4 bg-[#1E3A5F] text-white font-semibold rounded-lg hover:bg-[#162E4D] transition-all hover:scale-105 shadow-lg shadow-navy/20"
            >
              Voir nos services
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white text-[#1E3A5F] font-semibold rounded-lg border-2 border-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-all"
            >
              Devis gratuit →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '10j', label: 'Délai moyen' },
              { value: '100%', label: 'Sur mesure' },
              { value: '72h', label: 'Réponse garantie' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="text-2xl font-bold text-[#0F172A] mb-1">{stat.value}</div>
                <div className="text-xs text-[#64748B]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <CodeWindow />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#1E3A5F]/30">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#1E3A5F]/30 animate-pulse" />
      </div>
    </section>
  )
}
