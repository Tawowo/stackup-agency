/**
 * Capture de l'OUVERTURE, image par image.
 *
 * Une animation ne se juge pas sur son état final. On capture donc le début,
 * le milieu et la fin de l'entrée, puis quelques interactions. Chaque fichier
 * porte l'instant qu'il montre.
 *
 * Usage : node scripts/capture-ouverture.mjs [largeur] [qualite]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const LARGEUR = Number(process.argv[2] ?? 1440)
const QUALITE = process.argv[3] ?? ''
const HAUTEUR = LARGEUR < 700 ? 844 : 900
const SORTIE = `docs/ouverture/${LARGEUR}${QUALITE ? '-' + QUALITE : ''}`
const URL = `http://127.0.0.1:3100/${QUALITE ? '?qualite=' + QUALITE : ''}`

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

await page.goto(URL, { waitUntil: 'commit', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.goto(URL, { waitUntil: 'commit', timeout: 90000 })

// ── Pendant l'entrée ────────────────────────────────────────────────────
const instants = [250, 600, 1100, 1700, 2600, 4200]
let precedent = 0
for (const ms of instants) {
  await dormir(ms - precedent)
  precedent = ms
  await page.screenshot({ path: `${SORTIE}/t${String(ms).padStart(4, '0')}.png` })
}

// Ce qui est réellement lisible à la fin de l'entrée.
const lisible = await page.evaluate(() => {
  const vu = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return 'absent'
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return `opacité ${s.opacity} · ${Math.round(r.width)}×${Math.round(r.height)}`
  }
  return {
    surtitre: vu('.su-surtitre'),
    titre: vu('h1'),
    mot: vu('.su-lettre'),
    accroche: vu('.su-accroche span'),
    action: vu('.su-magnetique'),
    carte: vu('.su-confiance__item'),
  }
})
console.log('à la fin de l’entrée :')
for (const [k, v] of Object.entries(lisible)) console.log(`   ${k.padEnd(10)} ${v}`)

// ── Interactions ────────────────────────────────────────────────────────
await page.mouse.move(LARGEUR * 0.72, HAUTEUR * 0.45)
await dormir(900)
await page.screenshot({ path: `${SORTIE}/i1-pointeur-sur-objet.png` })

await page.mouse.click(LARGEUR * 0.72, HAUTEUR * 0.45)
await dormir(260)
await page.screenshot({ path: `${SORTIE}/i2-clic-impulsion.png` })
await dormir(900)
await page.screenshot({ path: `${SORTIE}/i3-apres-impulsion.png` })

await page.mouse.move(LARGEUR * 0.21, HAUTEUR * 0.69)
await dormir(700)
await page.screenshot({ path: `${SORTIE}/i4-pointeur-sur-bouton.png` })

// Navigation clavier : le focus doit rester visible sur l'encre.
await page.keyboard.press('Tab')
await page.keyboard.press('Tab')
await dormir(400)
await page.screenshot({ path: `${SORTIE}/i5-focus-clavier.png` })

console.log(`\nerreurs console : ${erreurs.length}`)
erreurs.slice(0, 3).forEach((e) => console.log('   ', e.slice(0, 150)))
console.log(`→ ${SORTIE}`)
await n.close()
