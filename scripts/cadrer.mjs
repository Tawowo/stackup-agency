/**
 * Cadrer une section et la photographier, quand la page bouge sous les pieds.
 *
 * `vue-section.mjs` mesure la position de la section, défile jusque-là, puis
 * capture. Ça ne marche que si la page garde la même hauteur entre la mesure
 * et le défilement. Sur l'accueil en 390 px elle ne la garde pas : la
 * démonstration logicielle passe de 4 à 12 lignes selon l'avancement, chaque
 * ligne faisant trois fois sa hauteur de bureau. La capture tombait donc
 * 2 000 px au-dessus de la cible — et montrait la section PRÉCÉDENTE.
 *
 * Ici on défile, on re-mesure, et on recommence jusqu'à ce que la cible soit
 * stable au bord haut du cadre. Une capture prise pour vérifier quelque chose
 * doit d'abord prouver qu'elle regarde la bonne chose.
 *
 * Usage : node scripts/cadrer.mjs <sélecteur> [largeur] [décalage] [nom]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const SEL = process.argv[2] ?? '#pourquoi'
const L = Number(process.argv[3] ?? 1440)
const DECALAGE = Number(process.argv[4] ?? 0)
const NOM = process.argv[5] ?? SEL.replace(/[^a-z0-9]/gi, '')
const H = L < 700 ? 844 : 900
const SORTIE = 'docs/cadre'
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
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))
page.on('pageerror', (e) => erreurs.push(String(e)))

await page.goto('http://localhost:3100/', { waitUntil: 'networkidle' })

// Un premier balayage complet : il déclenche tous les `IntersectionObserver`
// et toutes les images paresseuses, donc il FIXE la hauteur de la page. Sans
// lui, la cible se déplace encore pendant qu'on vise.
await page.evaluate(async () => {
  const pas = Math.round(innerHeight * 0.8)
  for (let y = 0; y < document.body.scrollHeight; y += pas) {
    scrollTo({ top: y, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 90))
  }
})
await dormir(700)

// Puis on vise, on re-mesure, on corrige. Trois passes suffisent en pratique ;
// on s'arrête dès que l'écart tombe sous 4 px.
let ecart = Infinity
for (let essai = 0; essai < 6 && Math.abs(ecart) > 4; essai++) {
  ecart = await page.evaluate(
    ([s, d]) => {
      const el = document.querySelector(s)
      if (!el) return 0
      const haut = el.getBoundingClientRect().top + scrollY
      scrollTo({ top: haut + d, behavior: 'instant' })
      // Visé juste, `top` vaut exactement -d : l'écart est donc top + d.
      return el.getBoundingClientRect().top + d
    },
    [SEL, DECALAGE],
  )
  await dormir(450)
}

await dormir(1400) // laisser les animations d'entrée se jouer
const fichier = `${SORTIE}/${NOM}-${L}${DECALAGE ? `-plus${DECALAGE}` : ''}.png`
await page.screenshot({ path: fichier })

const info = await page.evaluate((s) => {
  const el = document.querySelector(s)
  if (!el) return 'section ABSENTE'
  const r = el.getBoundingClientRect()
  return `haut ${Math.round(r.top)} · hauteur ${Math.round(r.height)}`
}, SEL)

console.log(`${SEL} @ ${L} — ${info} · écart final ${Math.round(ecart)} px`)
console.log(`erreurs console : ${erreurs.length}`)
erreurs.slice(0, 4).forEach((e) => console.log('  ' + e.slice(0, 130)))
console.log('→ ' + fichier)
await n.close()
