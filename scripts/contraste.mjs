/**
 * AUDIT DE CONTRASTE SUR LE RENDU RÉEL (WebGL compris) : pour chaque morceau de texte visible, on lit sa couleur,
 * on photographie la page avec le texte rendu transparent, puis on mesure le fond juste derrière lui.
 * Une mesure n'est retenue que si les couleurs du texte n'ont pas bougé entre la lecture et la photo (sinon la
 * page était en pleine transition de lumière : on recommence).
 * Seuils WCAG AA : 4,5 : 1 (3 : 1 pour le grand texte). Usage : node scripts/contraste.mjs /route [/route…] (env LARGEURS=1440,390)
 */
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const routes = process.argv.slice(2)
const largeurs = (process.env.LARGEURS ?? '1440,390').split(',').map(Number)
const lum = ([r, g, b]) => {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Lit les textes visibles (dans la page) : position, taille, couleur normalisée en rgba. */
function lireTextes() {
  const out = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let n
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim()
    if (t.length < 2) continue
    const el = n.parentElement
    if (!el || el.closest('script,style,noscript,svg,[aria-hidden="true"],[inert]')) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue
    const range = document.createRange()
    range.selectNodeContents(n)
    const r = range.getBoundingClientRect()
    if (r.width < 4 || r.height < 6 || r.top < 0 || r.bottom > innerHeight || r.right < 0 || r.left > innerWidth) continue
    // Sous la barre fixe du haut : on ne mesure pas (la barre est mesurée en haut de page).
    if (scrollY > 0 && (r.top < 84 || el.closest('.su-nav'))) continue
    let rogne = false
    for (let a = el, k = 0; a && k < 5; a = a.parentElement, k++) if (getComputedStyle(a).clipPath !== 'none' || a.closest('.sr-only')) rogne = true
    if (rogne || el.closest('.su-logo-plaque')) continue
    // Chrome rend color-mix() en « color(srgb …) » : on le normalise en rgba via un canvas 1×1.
    const cv = document.createElement('canvas')
    cv.width = cv.height = 1
    const g = cv.getContext('2d', { willReadFrequently: true })
    g.clearRect(0, 0, 1, 1)
    g.fillStyle = cs.color
    g.fillRect(0, 0, 1, 1)
    const px = g.getImageData(0, 0, 1, 1).data
    out.push({ t: t.slice(0, 50), x: r.left, y: r.top, w: r.width, h: r.height, c: [px[0], px[1], px[2], px[3] / 255], taille: parseFloat(cs.fontSize), gras: Number(cs.fontWeight) >= 700 })
  }
  return out
}
const CACHER = '*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}'

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ARGS })
let mauvais = 0
let instables = 0
for (const route of routes) {
  for (const w of largeurs) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto(`http://localhost:3000${route}${route.includes('?') ? '&' : '?'}quality=high`, { waitUntil: 'networkidle' })
    await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
    const hauteur = await page.evaluate(() => document.documentElement.scrollHeight)
    const vus = new Set()
    for (let y = 0; y < Math.min(hauteur, 14000); y += 800) {
      await page.evaluate((v) => window.scrollTo(0, v), y)
      let retenu = null
      for (let essai = 0; essai < 5 && !retenu; essai++) {
        await page.waitForTimeout(900)
        const avant = await page.evaluate(lireTextes)
        await page.evaluate((css) => {
          const st = document.createElement('style')
          st.id = 'su-contraste'
          st.textContent = css
          document.head.appendChild(st)
        }, CACHER)
        const photo = await page.screenshot({ type: 'png' })
        await page.evaluate(() => document.getElementById('su-contraste')?.remove())
        await page.waitForTimeout(600) // les liens ont une transition de couleur de 320 ms
        const apres = await page.evaluate(lireTextes)
        const meme = avant.length === apres.length && avant.every((e, i) => e.t === apres[i].t && Math.abs(e.y - apres[i].y) < 1 && e.c.every((v, k) => Math.abs(v - apres[i].c[k]) < 0.01))
        if (meme) retenu = { textes: avant, photo }
      }
      if (!retenu) {
        instables++
        console.log(`… ${route} @${w} y=${y} : page instable, position ignorée`)
        continue
      }
      const { data, info } = await sharp(retenu.photo).raw().toBuffer({ resolveWithObject: true })
      for (const e of retenu.textes) {
        const x0 = Math.max(0, Math.floor(e.x)), y0 = Math.max(0, Math.floor(e.y))
        const x1 = Math.min(info.width - 1, Math.ceil(e.x + e.w)), y1 = Math.min(info.height - 1, Math.ceil(e.y + e.h))
        if (x1 <= x0 || y1 <= y0) continue
        const bg = []
        const sx = Math.max(1, Math.floor((x1 - x0) / 12)), sy = Math.max(1, Math.floor((y1 - y0) / 4))
        for (let yy = y0; yy <= y1; yy += sy) for (let xx = x0; xx <= x1; xx += sx) bg.push([0, 1, 2].map((c) => data[(yy * info.width + xx) * info.channels + c]))
        if (!bg.length) continue
        const [r, g, b, a] = e.c
        const pire = Math.min(...bg.map((p) => ratio([r * a + p[0] * (1 - a), g * a + p[1] * (1 - a), b * a + p[2] * (1 - a)], p)))
        const grand = e.taille >= 24 || (e.taille >= 18.66 && e.gras)
        const seuil = grand ? 3 : 4.5
        const cle = `${e.t}|${Math.round(e.x)}|${Math.round(y + e.y)}`
        if (pire < seuil && !vus.has(cle)) {
          vus.add(cle)
          mauvais++
          console.log(`✗ ${route} @${w} y=${Math.round(y + e.y)} ${pire.toFixed(2)}:1 (< ${seuil}) « ${e.t} » ${e.taille}px`)
        }
      }
    }
    await ctx.close()
  }
}
await browser.close()
console.log(`${mauvais ? `${mauvais} texte(s) sous le seuil` : 'contraste : aucun texte sous le seuil'}${instables ? ` (${instables} position(s) instables ignorées)` : ''}`)
