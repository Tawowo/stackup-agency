'use client'
import { useRef, useEffect, useState } from 'react'

const WORDS = [
  { text: 'Stratégie', highlight: false },
  { text: 'rigoureuse.', highlight: false },
  { text: 'Design', highlight: false },
  { text: 'soigné.', highlight: false },
  { text: 'Code', highlight: false },
  { text: 'sur', highlight: false },
  { text: 'mesure.', highlight: false },
  { text: 'Performance.', highlight: true },
]

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef    = useRef<HTMLSpanElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      // All words visible immediately
      wordsRef.current.forEach(el => { if (el) el.style.opacity = '1' })
      if (lineRef.current) lineRef.current.style.width = '100%'
      return
    }

    const section = sectionRef.current
    if (!section) return

    const updateProgress = () => {
      const { top, height } = section.getBoundingClientRect()
      const vh = window.innerHeight
      // start when section top hits 80% of viewport, end when section bottom reaches 20%
      const start = top - vh * 0.8
      const end   = top + height - vh * 0.2
      const range = end - start
      const p     = Math.max(0, Math.min(1, -start / range))

      const count = WORDS.length
      wordsRef.current.forEach((el, i) => {
        if (!el) return
        // Each word lights up in sequence
        const wordP = Math.max(0, Math.min(1, (p * count) - i))
        // Cubic ease
        const eased = wordP < 0.5
          ? 4 * wordP * wordP * wordP
          : 1 - Math.pow(-2 * wordP + 2, 3) / 2
        const opacity = 0.12 + eased * 0.88
        el.style.opacity = String(opacity)
      })

      // Gold underline on last word when fully revealed
      if (lineRef.current) {
        const lastP = Math.max(0, Math.min(1, p * count - (count - 1)))
        lineRef.current.style.width = `${lastP * 100}%`
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-40 bg-[#060D1A] overflow-hidden"
      aria-label="Manifeste Stackup Agency"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p
          className="font-display font-bold leading-tight text-balance"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', letterSpacing: '-0.025em' }}
          aria-label="Stratégie rigoureuse. Design soigné. Code sur mesure. Performance."
        >
          {WORDS.map((w, i) => {
            const isLast = w.highlight
            return (
              <span key={i} className="inline-block mr-[0.25em]">
                <span
                  ref={el => { wordsRef.current[i] = el }}
                  className="inline-block text-white transition-none"
                  style={{ opacity: reducedMotion ? 1 : 0.12 }}
                >
                  {isLast ? (
                    <span className="relative">
                      {w.text}
                      <span
                        ref={lineRef}
                        className="absolute left-0 -bottom-1 h-[3px] rounded-full overflow-hidden"
                        style={{
                          width: reducedMotion ? '100%' : '0%',
                          background: 'linear-gradient(90deg, #F59E0B, #FDE68A)',
                          boxShadow: '0 0 8px #F59E0B88',
                          transition: reducedMotion ? 'none' : 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                        }}
                        aria-hidden="true"
                      />
                    </span>
                  ) : w.text}
                </span>
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
