/**
 * Capture de LA SALLE DE PROJECTION pendant le défilement.
 *
 * On ne juge pas une bande qui défile sur un seul arrêt : on la traverse,
 * on relève la vignette au centre et on vérifie que l'épinglage tient.
 *
 * Usage : node scripts/capture-salle.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const LARGEUR = Number(process.argv[2] ?? 1440)
const HAUTEUR = LARGEUR < 700 ? 844 : 900
const SORTIE = `docs/salle/${LARGEUR}`
mkdirSync(SORTIE, { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))

await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.reload({ waitUntil: 'networkidle' })
await dormir(3000)

const cadre = await page.evaluate(() => {
  const el = document.getElementById('realisations')
  if (!el) return null
  return { haut: el.offsetTop, hauteur: el.offsetHeight, defile: el.dataset.defile ?? 'non' }
})
if (!cadre) { console.log('section absente'); await n.close(); process.exit(1) }
console.log(`salle : haut ${cadre.haut} · hauteur ${cadre.hauteur} · défile ${cadre.defile}`)

const course = cadre.hauteur - HAUTEUR
const pas = 7
for (let i = 0; i < pas; i++) {
  const y = Math.round(cadre.haut + (course * i) / (pas - 1))
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
  await dormir(800)
  const m = await page.evaluate(() => {
    const scene = document.querySelector('.su-salle__scene')
    const courant = document.querySelector('.su-salle__vignette[aria-current="true"] .su-salle__nom')
    const r = scene?.getBoundingClientRect()
    return {
      p: getComputedStyle(document.getElementById('realisations')).getPropertyValue('--p').trim(),
      epingle: r ? Math.round(r.top) : null,
      centre: courant?.textContent ?? null,
    }
  })
  await page.screenshot({ path: `${SORTIE}/${i}-p${m.p}.png` })
  console.log(`  ${i} · y=${String(y).padStart(5)} · p=${m.p} · scène à ${m.epingle}px · « ${m.centre} »`)
}

console.log(`\nerreurs console : ${erreurs.length}`)
erreurs.slice(0, 3).forEach((e) => console.log('   ', e.slice(0, 150)))
console.log(`→ ${SORTIE}`)
await n.close()
