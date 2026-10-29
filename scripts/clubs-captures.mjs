/**
 * CAPTURES DE LA DÉMO « CLUBS DE TENNIS » — vraies captures du club fictif Grand Chelem Tennis Club, prises sur la démo.
 * Chaque identifiant (src/data/offre-clubs/captures.ts) donne une capture d'ordinateur et une de téléphone, aux mêmes
 * ratios que les réalisations (src/config/captures-ratios.ts), en AVIF, dans public/clubs-de-tennis/demo/.
 * Les rôles s'ouvrent par le lien direct de la démo (/demo?role=…&vers=…), mouvement réduit, thème clair.
 * Écrit src/config/captures-clubs.generated.ts.
 *
 * Usage : node --experimental-strip-types --no-warnings scripts/clubs-captures.mjs [--base=https://grand-chelem-platform.vercel.app]
 */
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'
import { CAPTURES } from '../src/config/captures.generated.ts'

const base = (process.argv.find((a) => a.startsWith('--base=')) ?? '--base=https://grand-chelem-platform.vercel.app').slice(7).replace(/\/$/, '')
const SORTIE = 'public/clubs-de-tennis/demo'
const RATIO = CAPTURES.ratio
const BUREAU = { largeur: 1600, vue: { width: 1468, height: Math.round(1468 / RATIO.bureau) } }
const MOBILE = { largeur: 640, vue: { width: 390, height: Math.round(390 / RATIO.mobile) } }

/** id → [rôle ou null pour un visiteur, chemin, défilement en px avant la capture (ordinateur, téléphone)] */
const PLAN = {
  'site-accueil': [null, '/', 0, 0],
  'site-adhesion': [null, '/adherer', 0, 0],
  'site-challenge': [null, '/challenge', 620, 560],
  'site-reserver': [null, '/reserver', 560, 520],
  'site-ecole': [null, '/ecole-de-tennis', 0, 0],
  'bureau-journee': ['presidente', '/bureau', 0, 0],
  'bureau-adherents': ['secretaire', '/bureau/adherents', 0, 0],
  'bureau-adhesions': ['secretaire', '/bureau/adhesions', 0, 0],
  'bureau-licences': ['secretaire', '/bureau/licences', 0, 0],
  'bureau-ecole': ['enseignant', '/bureau/ecole', 0, 0],
  'bureau-challenge': ['presidente', '/bureau/challenge', 0, 0],
  'bureau-equipes': ['capitaine', '/bureau/equipes', 0, 0],
  'bureau-tournois': ['presidente', '/bureau/tournois', 0, 0],
  'bureau-communication': ['presidente', '/bureau/communication', 0, 0],
  'bureau-tresorerie': ['tresorier', '/bureau/tresorerie', 0, 0],
  'bureau-statistiques': ['presidente', '/bureau/statistiques', 0, 0],
  'bureau-automatisations': ['presidente', '/bureau/automatisations', 0, 0],
  'bureau-assistant': ['presidente', '/bureau/assistant', 0, 0],
  editeur: ['presidente', '/editeur', 0, 0],
  'espace-parent': ['parent', '/espace', 0, 0],
  'espace-jeu': ['membre', '/espace/jeu', 0, 0],
}

const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
mkdirSync(SORTIE, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROMIUM })
const sortie = {}

async function prendre(id, famille, [role, chemin, defBureau, defMobile]) {
  const conf = famille === 'bureau' ? BUREAU : MOBILE
  const ctx = await browser.newContext({
    viewport: conf.vue,
    deviceScaleFactor: famille === 'bureau' ? 1.2 : 2,
    isMobile: famille === 'mobile',
    hasTouch: famille === 'mobile',
    reducedMotion: 'reduce',
    colorScheme: 'light',
  })
  const page = await ctx.newPage()
  const url = role ? `${base}/demo?role=${role}&vers=${encodeURIComponent(chemin)}` : `${base}${chemin}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 })
  if (role) await page.waitForURL((u) => u.pathname === chemin, { timeout: 30000 })
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2500)
  const y = famille === 'bureau' ? defBureau : defMobile
  if (y) {
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(900)
  }
  const png = await page.screenshot()
  await ctx.close()
  const hauteur = Math.round(conf.largeur / (famille === 'bureau' ? RATIO.bureau : RATIO.mobile))
  const fichier = `${SORTIE}/${id}-${famille}.avif`
  await sharp(png).resize(conf.largeur, hauteur, { fit: 'cover', position: 'top' }).avif({ quality: 52, effort: 6 }).toFile(fichier)
  return { fichier: fichier.replace(/^public/, ''), largeur: conf.largeur, hauteur }
}

for (const [id, plan] of Object.entries(PLAN)) {
  sortie[id] = { bureau: await prendre(id, 'bureau', plan), mobile: await prendre(id, 'mobile', plan) }
  console.log('✓', id)
}
await browser.close()

writeFileSync(
  'src/config/captures-clubs.generated.ts',
  `// FICHIER GÉNÉRÉ par scripts/clubs-captures.mjs (source : ${base}). Ne pas modifier : relancer le script.\n\nexport const CAPTURES_CLUBS = ${JSON.stringify({ source: base, captures: sortie }, null, 2)} as const\n`,
)
console.log(`${Object.keys(sortie).length} captures → ${SORTIE}`)
