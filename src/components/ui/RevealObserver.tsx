'use client'
import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-visible'))
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const watch = () => {
      document.querySelectorAll('.reveal-item:not(.is-visible)').forEach(el => obs.observe(el))
    }

    watch()
    // re-scan after hydration / dynamic content
    const t = setTimeout(watch, 300)
    return () => {
      clearTimeout(t)
      obs.disconnect()
    }
  }, [])

  return null
}
