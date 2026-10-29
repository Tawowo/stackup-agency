/**
 * TRACE DE PERFORMANCE — défilement complet d'une page sur le build de production, processeur ralenti ×4.
 * Mesure : tâches longues (> 50 ms), régularité des images du navigateur (rAF de mesure, hors du site), trames 3D réellement
 * dessinées (appels de dessin WebGL interceptés), réactivité de la molette (position 100 ms après un coup de molette),
 * INP approché (durée maximale d'un événement : clic, touche) et rendu à l'arrêt (trames 3D par seconde sur une page immobile).
 *
 * Usage : node scripts/perf-trace.mjs [BASE=http://localhost:3000] [route=/] [--mobile] [--webgl=0] [--q=high] [--json=chemin]
 * Attention : le conteneur n'a pas de GPU (WebGL logiciel SwiftShader) : les images/s 3D y sont bien plus basses que sur un vrai poste ;
 * les tâches longues et la réactivité de la molette, elles, sont significatives.
 */
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const route = args.find((a) => a.startsWith('/')) ?? '/'
const mobile = args.includes('--mobile')
const webgl = !args.includes('--webgl=0')
const palier = (args.find((a) => a.startsWith('--q=')) ?? '--q=high').slice(4)
const sortie = (args.find((a) => a.startsWith('--json=')) ?? '').slice(7)
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ARGS })
const ctx = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true } : { viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.addInitScript(() => {
  const m = (window.__mesure = { taches: [], images: [], dessinees: 0, lastDessin: false, evenements: [], enCours: false })
  new PerformanceObserver((l) => l.getEntries().forEach((e) => m.taches.push({ d: e.duration, t: e.startTime }))).observe({ type: 'longtask', buffered: true })
  m.loaf = []
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => m.loaf.push({ t: e.startTime, d: e.duration, bloque: e.blockingDuration, style: e.startTime + e.duration - e.styleAndLayoutStart, scripts: (e.scripts || []).map((x) => ({ u: (x.sourceURL || '').split('/').slice(-2).join('/'), f: x.sourceFunctionName || x.invoker, d: x.duration, forcé: x.forcedStyleAndLayoutDuration })) }))).observe({ type: 'long-animation-frame', buffered: true })
  } catch {}
  try {
    new PerformanceObserver((l) => l.getEntries().forEach((e) => e.interactionId && m.evenements.push({ d: e.duration, n: e.name }))).observe({ type: 'event', durationThreshold: 16, buffered: true })
  } catch {}
  const marquer = () => (m.lastDessin = true)
  for (const nom of ['drawElements', 'drawElementsInstanced', 'drawArrays', 'drawArraysInstanced']) {
    for (const C of [window.WebGL2RenderingContext, window.WebGLRenderingContext]) {
      const o = C?.prototype[nom]
      if (o) C.prototype[nom] = function (...a) { marquer(); return o.apply(this, a) }
    }
  }
  let prec = performance.now()
  const boucle = (t) => {
    if (m.enCours) m.images.push(t - prec)
    prec = t
    if (m.lastDessin) { m.dessinees++; m.lastDessin = false }
    requestAnimationFrame(boucle)
  }
  requestAnimationFrame(boucle)
})
const cdp = await ctx.newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.goto(BASE + route + (webgl ? `?quality=${palier}` : '?webgl=0'), { waitUntil: 'load' })
await page.waitForTimeout(9000)

// 1. Rendu à l'arrêt : page immobile pendant 3 s.
await page.evaluate(() => (window.__mesure.dessinees = 0))
await page.waitForTimeout(3000)
const arret = await page.evaluate(() => window.__mesure.dessinees / 3)

// 2. Réactivité de la molette : un coup de 400 px, position lue après 100 ms.
const y0 = await page.evaluate(() => scrollY)
await page.mouse.move(700, 450)
await page.mouse.wheel(0, 400)
await page.waitForTimeout(100)
const apres100 = (await page.evaluate(() => scrollY)) - y0
await page.waitForTimeout(1500)
const final = (await page.evaluate(() => scrollY)) - y0
await page.evaluate(() => scrollTo(0, 0))
await page.waitForTimeout(800)

// 3. Défilement complet à la molette (pas de 300 px toutes les 60 ms).
await page.evaluate(() => { const m = window.__mesure; m.avantScroll = { taches: m.taches.filter((t) => t.d > 50).length, cumul: Math.round(m.taches.filter((t) => t.d > 50).reduce((a, t) => a + t.d, 0)) }; m.debut = performance.now(); m.taches = []; m.images = []; m.dessinees = 0; m.enCours = true })
const t0 = Date.now()
let guard = 0
while (guard++ < 600) {
  const { y, max } = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }))
  if (y >= max - 2) break
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(60)
}
await page.waitForTimeout(600)
const duree = (Date.now() - t0) / 1000
await page.evaluate(() => (window.__mesure.enCours = false))

// 4. Interactions (INP approché) : touche, clic sur le menu, clic sur le corps.
await page.evaluate(() => scrollTo(0, 0))
await page.waitForTimeout(500)
await page.keyboard.press('Tab')
await page.keyboard.press('Tab')
for (const sel of ['header button', 'header a', 'main a', 'main button']) {
  const el = page.locator(sel).first()
  if (await el.count()) { try { await el.hover({ timeout: 1000 }); } catch {} }
}
await page.mouse.click(700, 500)
await page.waitForTimeout(800)

const r = await page.evaluate(() => {
  const m = window.__mesure
  const im = [...m.images].sort((a, b) => a - b)
  const p = (q) => im.length ? im[Math.min(im.length - 1, Math.floor(im.length * q))] : 0
  const longues = m.taches.filter((t) => t.d > 50)
  return {
    chargement: m.avantScroll,
    tachesLonguesNb: longues.length,
    tacheMax: Math.round(Math.max(0, ...m.taches.map((t) => t.d))),
    tachesCumulMs: Math.round(longues.reduce((a, t) => a + t.d, 0)),
    imageMedianeMs: Math.round(p(0.5)),
    imageP95Ms: Math.round(p(0.95)),
    imagesSup50ms: im.filter((x) => x > 50).length,
    imagesNb: im.length,
    trames3D: m.dessinees,
    loafTop: Object.entries(m.loaf.filter((e) => e.t >= m.debut && e.d > 50).flatMap((e) => e.scripts).reduce((a, x) => { const k = x.u + ' ' + x.f; a[k] = (a[k] || 0) + x.d; return a }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => k + ' ' + Math.round(v) + 'ms'),
    loafStyleMs: Math.round(m.loaf.filter((e) => e.t >= m.debut && e.d > 50).reduce((a, e) => a + Math.max(0, e.style), 0)),
    loafForceMs: Math.round(m.loaf.filter((e) => e.t >= m.debut).flatMap((e) => e.scripts).reduce((a, x) => a + (x.forcé || 0), 0)),
    inpMs: Math.round(Math.max(0, ...m.evenements.map((e) => e.d))),
  }
})
const res = { route, mobile, webgl, cpu: 'x4', arret3DParSeconde: +arret.toFixed(1), molette100ms: Math.round(apres100), molette1600ms: Math.round(final), dureeScrollS: +duree.toFixed(1), ...r, images3DParSeconde: +(r.trames3D / duree).toFixed(1) }
console.log(JSON.stringify(res, null, 1))
if (sortie) writeFileSync(sortie, JSON.stringify(res, null, 1))
await browser.close()
