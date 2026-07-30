'use client'
import { useEffect } from 'react'

const SELECTORS = '.reveal-item, .reveal-scale, .heading-underline'

export default function RevealObserver() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      document.querySelectorAll(SELECTORS).forEach(el => el.classList.add('is-visible'))
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
      document.querySelectorAll(`${SELECTORS}`).forEach(el => {
        if (!el.classList.contains('is-visible')) obs.observe(el)
      })
    }

    watch()
    const t1 = setTimeout(watch, 300)
    const t2 = setTimeout(watch, 800)
    // Safety fallback: after 1500ms force-reveal anything still invisible
    const t3 = setTimeout(() => {
      document.querySelectorAll(SELECTORS).forEach(el => el.classList.add('is-visible'))
    }, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      obs.disconnect()
    }
  }, [])

  return null
}
