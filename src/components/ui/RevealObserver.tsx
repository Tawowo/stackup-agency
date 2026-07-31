'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SELECTORS = '.reveal-item, .reveal-scale, .heading-underline'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mq.matches) {
      document.querySelectorAll(SELECTORS).forEach(el => {
        el.classList.remove('reveal-pending')
        el.classList.add('is-visible')
      })
      return
    }

    // Mark elements pending (hidden) only when observer is ready to watch them
    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS))
    elements.forEach(el => {
      if (!el.classList.contains('is-visible')) {
        el.classList.add('reveal-pending')
      }
    })

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.remove('reveal-pending')
            el.classList.add('is-visible')
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach(el => {
      if (!el.classList.contains('is-visible')) obs.observe(el)
    })

    // Safety: after 1200ms force-reveal anything still pending
    const t = setTimeout(() => {
      document.querySelectorAll(`${SELECTORS}.reveal-pending`).forEach(el => {
        el.classList.remove('reveal-pending')
        el.classList.add('is-visible')
      })
    }, 1200)

    return () => {
      clearTimeout(t)
      obs.disconnect()
      // On navigation, clear pending so new DOM starts visible by default
      document.querySelectorAll(`${SELECTORS}.reveal-pending`).forEach(el => {
        el.classList.remove('reveal-pending')
      })
    }
  }, [pathname])

  return null
}
