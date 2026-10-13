/** Capture rapide de l'accueil à une position de scroll (fraction d'un moment épinglé) ; sortie + sonde. */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [out, moment = '00', frac = '0', w = '1440', h = '900', attente = '2500', mouse = ''] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } })
const logs = []
page.on('console', (m) => { if (m.type() === 'error') logs.push(m.text().slice(0, 200)) })
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message.slice(0, 300)))
await page.goto('http://localhost:3000/?quality=high', { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => logs.push('pas prêt'))
await page.waitForTimeout(800)
await page.evaluate(([frac, moment]) => {
  const el = document.querySelector(`[data-moment="${moment}"]`)
  const r = el.getBoundingClientRect()
  const top = r.top + window.scrollY
  const dist = Math.max(0, r.height - window.innerHeight)
  const y = frac > 1 ? document.documentElement.scrollHeight : Math.round(top + dist * frac)
  window.__suLenis?.scrollTo(y, { immediate: true })
  window.scrollTo(0, y)
}, [Number(frac), moment])
await page.waitForTimeout(400)
await page.evaluate(() => window.__suSettle?.(150))
if (mouse) { const [mx, my] = mouse.split(',').map(Number); await page.mouse.move(mx - 30, my - 30); await page.mouse.move(mx, my, { steps: 6 }) }
await page.waitForTimeout(Number(attente))
await page.screenshot({ path: out })
console.log(await page.evaluate(() => { const s = window.__su?.scene.getState(); const u = window.__su?.u; return s ? JSON.stringify({ moment: s.moment, layout: s.layout, target: s.target, morph: +u.uMorph.value.toFixed(2), nuit: +s.nuit.toFixed(2), dissolve: +u.uDissolve.value.toFixed(2), y: window.scrollY, fps: s.fps }) : 'pas de scène' }))
console.log(logs.join('\n') || 'console propre')
await browser.close()
