/**
 * Le logo, vérifié là où il apparaît réellement.
 *
 * Un logo ne se juge pas sur un seul fond : on le regarde sur l'encre de
 * l'accueil, sur l'ivoire d'une page intérieure et sur le pied de page.
 *
 * Usage : node scripts/logo.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const L = Number(process.argv[2] ?? 1440)
const H = L < 700 ? 844 : 900
const SORTIE = `docs/logo/${L}`
mkdirSync(SORTIE, { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: H },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))

await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })

const vues = [
  ['accueil-encre', '/', 0],
  ['services-ivoire', '/services', 0],
]

for (const [nom, chemin] of vues) {
  await page.goto(`http://127.0.0.1:3100${chemin}`, { waitUntil: 'networkidle' })
  await dormir(2600)
  const boite = await page.locator('header .su-logo, nav .su-logo').first().boundingBox()
  if (!boite) { console.log(`  ${nom.padEnd(18)} ✗ logo introuvable`); continue }
  await page.screenshot({
    path: `${SORTIE}/${nom}.png`,
    clip: { x: Math.max(0, boite.x - 20), y: Math.max(0, boite.y - 18), width: Math.min(L, boite.width + 60), height: boite.height + 36 },
  })
  const m = await page.evaluate(() => {
    const l = document.querySelector('header .su-logo, nav .su-logo')
    const mot = l?.querySelector('.su-logo__mot')
    const svg = l?.querySelector('svg')
    const s = mot ? getComputedStyle(mot) : null
    return {
      marque: svg ? `${Math.round(svg.getBoundingClientRect().width)}×${Math.round(svg.getBoundingClientRect().height)}` : 'absente',
      lettrage: mot ? `${Math.round(mot.getBoundingClientRect().width)}×${Math.round(mot.getBoundingClientRect().height)}` : 'absent',
      couleurLettrage: s?.backgroundColor ?? '—',
      masque: (s?.maskImage ?? s?.webkitMaskImage ?? 'aucun').slice(0, 44),
    }
  })
  console.log(`  ${nom.padEnd(18)} marque ${m.marque} · lettrage ${m.lettrage} · ${m.couleurLettrage}`)
}

// Le pied de page, sur l'encre.
await page.goto('http://127.0.0.1:3100/services', { waitUntil: 'networkidle' })
await dormir(1500)
const pied = await page.locator('footer .su-logo').first().boundingBox()
if (pied) {
  await page.evaluate(() => document.querySelector('footer .su-logo')?.scrollIntoView({ block: 'center' }))
  await dormir(900)
  const b = await page.locator('footer .su-logo').first().boundingBox()
  await page.screenshot({ path: `${SORTIE}/pied-encre.png`, clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 18), width: Math.min(L, b.width + 60), height: b.height + 36 } })
  console.log(`  ${'pied-encre'.padEnd(18)} présent`)
} else {
  console.log('  pied-encre         ✗ absent')
}

console.log(`\nerreurs console : ${erreurs.length}`)
console.log(`→ ${SORTIE}`)
await n.close()
