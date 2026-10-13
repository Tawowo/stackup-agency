/** SONDE GALERIE — projette à l'écran la position des écrans du hall (debug du cadrage). */
import { chromium } from '@playwright/test'
const [w = '390'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(w) < 768 ? 844 : 900 }, isMobile: Number(w) < 768, hasTouch: Number(w) < 768, deviceScaleFactor: Number(w) < 768 ? 2 : 1 })
await page.goto('http://localhost:3000/realisations?quality=high&pane=0', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const r = await page.evaluate(async () => {
  const el = document.querySelector('[data-moment="galerie"]')
  const y = el.getBoundingClientRect().top + scrollY
  window.__suLenis?.scrollTo(y, { immediate: true })
  scrollTo(0, y)
  await new Promise((r) => setTimeout(r, 1500))
  const g = window.__suGalerie
  const cam = window.__suCam
  if (!g || !cam) return 'pas de galerie/cam'
  const V = g.position.constructor
  const out = { racine: g.position.toArray().map((v) => +v.toFixed(2)), cam: cam.position.toArray().map((v) => +v.toFixed(2)), ecrans: [] }
  g.children.slice(0, 3).forEach((c) => {
    const p = new V()
    c.getWorldPosition(p)
    const q = p.clone().project(cam)
    out.ecrans.push({ monde: p.toArray().map((v) => +v.toFixed(2)), ecran: [Math.round((q.x * 0.5 + 0.5) * innerWidth), Math.round((-q.y * 0.5 + 0.5) * innerHeight)], visible: c.visible })
  })
  const pile = document.elementsFromPoint(195, 304).slice(0, 6).map((e) => e.tagName + '.' + String(e.className).slice(0, 40) + ' bg=' + getComputedStyle(e).backgroundColor)
  out.pile = pile
  return out
})
await page.screenshot({ path: 'docs/qa/shots/realisations/sonde-galerie.png' })
console.log(JSON.stringify(r, null, 1))
await browser.close()
