/**
 * Les signatures d'ouverture, page par page.
 *
 * Capture le haut de chaque page commerciale pendant que sa signature se
 * joue, puis une fois posée. Deux images par page : une animation ne se juge
 * pas sur son état final.
 *
 * Usage : node scripts/signatures.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const L = Number(process.argv[2] ?? 1440)
const H = L < 700 ? 844 : 900
const SORTIE = `docs/signatures/${L}`
mkdirSync(SORTIE, { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const PAGES = [
  ['/services', 'trace'],
  ['/realisations', 'masque'],
  ['/tarifs', 'echelle'],
  ['/a-propos', 'chronologie'],
  ['/contact', 'signal'],
  ['/parrainage', 'signal'],
]

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: H },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3100/', { waitUntil: 'commit' })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })

let soucis = 0
for (const [chemin, attendue] of PAGES) {
  const erreurs = []
  const onErr = (e) => erreurs.push(String(e.message ?? e))
  page.on('pageerror', onErr)
  await page.goto(`http://127.0.0.1:3100${chemin}`, { waitUntil: 'commit', timeout: 60000 })

  // Pendant que la signature se joue.
  await dormir(650)
  const nom = chemin.replace(/\//g, '') || 'accueil'
  await page.screenshot({ path: `${SORTIE}/${nom}-pendant.png`, clip: { x: 0, y: 0, width: L, height: Math.min(H, 560) } })

  // Une fois posée.
  await dormir(1900)
  await page.screenshot({ path: `${SORTIE}/${nom}-pose.png`, clip: { x: 0, y: 0, width: L, height: Math.min(H, 560) } })

  const m = await page.evaluate(() => {
    const el = document.querySelector('.su-sig')
    const h1 = document.querySelector('h1')
    if (!el || !h1) return { trouve: false }
    const s = getComputedStyle(h1)
    const r = h1.getBoundingClientRect()
    return {
      trouve: true,
      signature: el.getAttribute('data-signature'),
      titreVisible: Number(s.opacity) > 0.9 && r.width > 10 && r.height > 10,
      titre: (h1.textContent ?? '').trim().slice(0, 34),
    }
  })
  page.off('pageerror', onErr)
  const ok = m.trouve && m.signature === attendue && m.titreVisible && erreurs.length === 0
  if (!ok) soucis++
  console.log(
    `  ${chemin.padEnd(14)} ${String(m.signature).padEnd(12)} titre ${m.titreVisible ? '✓' : '✗'} · erreurs ${erreurs.length} ${ok ? '' : '⚠'}  « ${m.titre ?? ''} »`,
  )
}

console.log(`\n${soucis === 0 ? 'toutes les signatures sont en place' : soucis + ' page(s) à revoir'}`)
console.log(`→ ${SORTIE}`)
await n.close()
process.exit(soucis === 0 ? 0 : 1)
