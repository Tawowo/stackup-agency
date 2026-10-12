/**
 * Débordement horizontal.
 *
 * Un élément plus large que la fenêtre fait élargir le viewport de mise en
 * page sur mobile : la page entière se retrouve dézoomée, et tous les textes
 * rapetissent. Ce script nomme les coupables au lieu de les deviner.
 *
 * Usage : node scripts/debordement.mjs [largeur]
 */
import { chromium } from 'playwright'

const L = Number(process.argv[2] ?? 390)
const H = L < 700 ? 844 : 900

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: H },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.reload({ waitUntil: 'networkidle' })
await new Promise((r) => setTimeout(r, 3500))

const r = await page.evaluate(() => {
  const vue = document.documentElement.clientWidth
  const coupables = []
  for (const el of document.querySelectorAll('body *')) {
    const b = el.getBoundingClientRect()
    if (b.width === 0 && b.height === 0) continue
    const droite = b.right + window.scrollX
    if (droite <= vue + 1 && b.left >= -1) continue
    // On ne retient que les éléments dont un PARENT ne déborde pas déjà :
    // sinon on liste cent descendants d'une même cause.
    const p = el.parentElement
    if (p) {
      const pb = p.getBoundingClientRect()
      if (pb.right > vue + 1 || pb.left < -1) continue
    }
    coupables.push({
      sel: `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 48)}`,
      gauche: Math.round(b.left),
      droite: Math.round(b.right),
      largeur: Math.round(b.width),
    })
  }
  return {
    vue,
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    coupables: coupables.slice(0, 18),
  }
})

console.log(`fenêtre demandée ${L} · clientWidth ${r.vue} · innerWidth ${r.innerWidth} · scrollWidth ${r.scrollWidth}`)
console.log(`débordements racine : ${r.coupables.length}`)
for (const c of r.coupables) console.log(`   ${String(c.gauche).padStart(6)} → ${String(c.droite).padStart(6)} (${String(c.largeur).padStart(5)}) ${c.sel}`)
await n.close()
