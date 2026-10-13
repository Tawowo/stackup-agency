/** SONDE — état du store de scène et des ScrollTriggers après un saut à un moment (diagnostic). */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const moment = process.argv[2] ?? '01'
const frac = Number(process.argv[3] ?? '1')
const rm = process.argv[4] === 'rm'
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm ? 'reduce' : 'no-preference' })
const page = await ctx.newPage()
await page.goto(`http://localhost:3000/?quality=high`, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]')
const lire = async (etape) => {
  const r = await page.evaluate(() => {
    const s = window.__su.scene.getState()
    const u = window.__su.u
    const st = window.__suST?.getAll().map((t) => `${t.vars.trigger?.dataset?.moment ?? t.vars.trigger?.className?.slice(0, 12)}:${Math.round(t.start)}-${Math.round(t.end)}${t.isActive ? '*' : ''}`)
    return { scrollY: window.scrollY, moment: s.moment, layout: s.layout, nuit: +s.nuit.toFixed(2), uMorph: +u.uMorph.value.toFixed(3), st }
  })
  console.log(etape, JSON.stringify(r))
}
await lire('chargé')
const aller = async (f) => {
  await page.evaluate(([f, m]) => {
    const el = document.querySelector(`[data-moment="${m}"]`)
    const r = el.getBoundingClientRect()
    const top = r.top + window.scrollY
    const dist = Math.max(0, r.height - window.innerHeight)
    const y = Math.round(top + dist * f)
    window.__suLenis?.scrollTo(y, { immediate: true })
    window.scrollTo(0, y)
  }, [f, moment])
}
await aller(0)
await page.waitForTimeout(400)
await lire('aller(0)')
await aller(frac)
await page.waitForTimeout(900)
await lire('aller(frac)')
await page.waitForTimeout(1800)
await lire('+1800')
await browser.close()
