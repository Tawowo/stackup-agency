/**
 * Sonde géométrique du PASSAGE.
 *
 * Vérifie que le canvas occupe bien le viewport et rien d'autre. C'est une
 * mesure, pas une supposition : un `position: fixed` hérite du bloc conteneur
 * du premier ancêtre portant un `transform`, `filter` ou `perspective`, et le
 * canvas se retrouve alors dimensionné à la PAGE entière — techniquement
 * présent, visuellement hors cadre.
 *
 * Usage : node scripts/sonde-passage.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const LARGEUR = Number(process.argv[2] ?? 1440)
const HAUTEUR = LARGEUR < 700 ? 844 : 900

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const navigateur = await chromium.launch({
  executablePath: CHROME,
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await navigateur.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()

const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))

await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 })
await page.evaluate(() => {
  try {
    localStorage.setItem('cookie-consent', 'accepted')
  } catch {}
})
await page.reload({ waitUntil: 'networkidle' })
await dormir(4500)

const mesure = await page.evaluate(() => {
  const hote = document.querySelector('.su-passage')
  const canvas = hote?.querySelector('canvas')
  if (!hote) return { hote: false }

  const arrondi = (r) => ({
    l: Math.round(r.width),
    h: Math.round(r.height),
    y: Math.round(r.top),
  })

  // Remonte la chaîne jusqu'à <html> en notant tout ancêtre qui crée un
  // bloc conteneur pour les descendants `fixed`.
  const coupables = []
  let n = hote.parentElement
  while (n && n !== document.documentElement) {
    const s = getComputedStyle(n)
    const causes = []
    if (s.transform !== 'none') causes.push(`transform:${s.transform.slice(0, 30)}`)
    if (s.filter !== 'none') causes.push(`filter:${s.filter}`)
    if (s.perspective !== 'none') causes.push(`perspective:${s.perspective}`)
    if (s.willChange.includes('transform')) causes.push(`will-change:${s.willChange}`)
    if (s.contain.includes('paint') || s.contain.includes('layout'))
      causes.push(`contain:${s.contain}`)
    if (causes.length)
      coupables.push(`${n.tagName.toLowerCase()}.${n.className?.toString().slice(0, 40)} → ${causes.join(' ')}`)
    n = n.parentElement
  }

  return {
    hote: true,
    hoteRect: arrondi(hote.getBoundingClientRect()),
    canvasRect: canvas ? arrondi(canvas.getBoundingClientRect()) : null,
    canvasAttrs: canvas ? [canvas.width, canvas.height] : null,
    parent: `${hote.parentElement?.tagName.toLowerCase()}`,
    coupables,
    passage: document.documentElement.dataset.passage ?? 'inactif',
    nuit: getComputedStyle(document.documentElement).getPropertyValue('--su-nuit').trim(),
    vue: [window.innerWidth, window.innerHeight],
  }
})

console.log(JSON.stringify(mesure, null, 2))

// On compare à la hauteur RÉELLEMENT mesurée, pas à celle demandée : le
// viewport de mise en page peut différer de la fenêtre demandée, et comparer
// à la consigne produisait une fausse alerte « hors cadre » sur un canvas
// pourtant exactement au format de la fenêtre.
const attendu =
  mesure.canvasRect && mesure.vue && Math.abs(mesure.canvasRect.h - mesure.vue[1]) < 4
console.log(`\ngéométrie : ${attendu ? '✓ le canvas occupe le viewport' : '✗ HORS CADRE'}`)
if (mesure.coupables?.length) {
  console.log('ancêtres créant un bloc conteneur :')
  mesure.coupables.forEach((c) => console.log('   ', c))
}
console.log(`erreurs console : ${erreurs.length}`)
erreurs.slice(0, 4).forEach((e) => console.log('   ', e.slice(0, 160)))

mkdirSync('docs/passage', { recursive: true })
await page.screenshot({ path: `docs/passage/sonde-${LARGEUR}.png` })
console.log(`\n→ docs/passage/sonde-${LARGEUR}.png`)

await navigateur.close()
process.exit(attendu && erreurs.length === 0 ? 0 : 1)
