/** SONDE — position de scroll, triggers et morph à un moment donné (mobile ou desktop). */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [moment = '01', frac = '0', w = '390'] = process.argv.slice(2)
const mobile = Number(w) < 600
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const ctx = await browser.newContext({ viewport: { width: Number(w), height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
const page = await ctx.newPage()
await page.goto('http://localhost:3000/?quality=high', { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
await page.waitForTimeout(800)
const lire = () => page.evaluate(([moment, frac]) => {
  const el = document.querySelector(`[data-moment="${moment}"]`)
  const r = el.getBoundingClientRect()
  const top = r.top + window.scrollY
  const dist = Math.max(0, r.height - window.innerHeight)
  const y = Math.round(top + dist * frac)
  const sts = window.__suST.getAll().filter((t) => t.pin).map((t) => ({ pin: t.pin.className.slice(0, 14), start: Math.round(t.start), end: Math.round(t.end), p: +t.progress.toFixed(3) }))
  const s = window.__su.scene.getState()
  return { top: Math.round(top), h: Math.round(r.height), y, scrollY: window.scrollY, inner: [innerWidth, innerHeight], moment: s.moment, layout: s.layout, target: s.target, morph: +window.__su.u.uMorph.value.toFixed(3), pins: sts }
}, [moment, Number(frac)])
console.log('avant', JSON.stringify(await lire()))
await page.evaluate(([moment, frac]) => {
  const el = document.querySelector(`[data-moment="${moment}"]`)
  const r = el.getBoundingClientRect()
  const top = r.top + window.scrollY
  const dist = Math.max(0, r.height - window.innerHeight)
  const y = Math.round(top + dist * frac)
  window.__suLenis?.scrollTo(y, { immediate: true })
  window.scrollTo(0, y)
}, [moment, Number(frac)])
await page.waitForTimeout(900)
await page.evaluate(() => window.__suSettle?.(150))
console.log('après', JSON.stringify(await lire()))
await browser.close()
