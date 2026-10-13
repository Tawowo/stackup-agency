'use client'
/** GSAP configuré une fois : plugins enregistrés, un seul ticker pour tout le site. */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

let fait = false
export function initGsap() {
  if (fait || typeof window === 'undefined') return
  fait = true
  gsap.registerPlugin(ScrollTrigger, SplitText)
  gsap.ticker.lagSmoothing(0)
  if (process.env.NODE_ENV !== 'production') {
    ;(window as unknown as { __suST?: unknown }).__suST = ScrollTrigger
  }
}

export { gsap, ScrollTrigger, SplitText }
