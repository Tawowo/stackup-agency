/**
 * L'outil de capture unique du chantier.
 *
 * Toutes les autres captures du dépôt partaient dans des dossiers différents,
 * avec des conventions différentes, et aucune ne notait ce qu'elle montrait.
 * Celui-ci produit un dossier par lot, une image par état, et un index JSON
 * que `docs/qa/rapport.json` agrège — parce que le dossier de refonte exige
 * (17.1) que chaque capture soit indexée, lue et commentée.
 *
 * Usage :
 *   node scripts/capture.mjs <lot> <route> [options]
 *
 * Options :
 *   --y=0,800,1600      positions de défilement (défaut : 0)
 *   --l=1440,390        largeurs (défaut : 1440,390)
 *   --reduit            force prefers-reduced-motion: reduce
 *   --grille            appuie sur G avant de capturer
 *   --attendre=1500     millisecondes après le positionnement
 *   --plein             capture la page entière (ignore --y)
 *   --nom=xxx           préfixe des fichiers
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const LOT = args[0]
const ROUTE = args[1] ?? '/'
const opt = (n, d) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.slice(n.length + 3) : d
}
const flag = (n) => args.includes(`--${n}`)

const YS = opt('y', '0').split(',').map(Number)
const LARGEURS = opt('l', '1440,390').split(',').map(Number)
const REDUIT = flag('reduit')
const GRILLE = flag('grille')
const ATTENTE = Number(opt('attendre', 1500))
const PLEIN = flag('plein')
const NOM = opt('nom', ROUTE === '/' ? 'accueil' : ROUTE.replace(/\//g, '-').replace(/^-/, ''))

const SORTIE = `docs/captures/${LOT}`
mkdirSync(SORTIE, { recursive: true })
const BASE = process.env.BASE ?? 'http://localhost:3100'

const navigateur = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})

const index = []
const souci = []

for (const L of LARGEURS) {
  const H = L < 700 ? 844 : 900
  const ctx = await navigateur.newContext({
    viewport: { width: L, height: H },
    ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
    ...(REDUIT ? { reducedMotion: 'reduce' } : {}),
  })
  const page = await ctx.newPage()
  const erreurs = []
  page.on('console', (m) => {
    if (m.type() === 'error') erreurs.push(m.text().slice(0, 180))
  })
  page.on('pageerror', (e) => erreurs.push(String(e).slice(0, 180)))

  const rep = await page.goto(BASE + ROUTE, { waitUntil: 'networkidle' }).catch((e) => {
    souci.push(`${ROUTE} @ ${L} : ${e.message.slice(0, 120)}`)
    return null
  })
  if (!rep) {
    await ctx.close()
    continue
  }

  // Un balayage complet fixe la hauteur de la page : sans lui, les positions
  // visées glissent pendant que les sections paresseuses se montent.
  await page.evaluate(async () => {
    const pas = Math.round(innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += pas) {
      scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 70))
    }
    scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(500)
  if (GRILLE) await page.keyboard.press('g')

  const hauteur = await page.evaluate(() => document.body.scrollHeight)

  if (PLEIN) {
    const f = `${SORTIE}/${NOM}-${L}-plein${REDUIT ? '-reduit' : ''}.png`
    await page.screenshot({ path: f, fullPage: true })
    index.push({ fichier: f, route: ROUTE, largeur: L, hauteur, plein: true, reduit: REDUIT })
  } else {
    for (const y of YS) {
      await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y)
      await page.waitForTimeout(ATTENTE)
      const f = `${SORTIE}/${NOM}-${L}-y${y}${GRILLE ? '-grille' : ''}${REDUIT ? '-reduit' : ''}.png`
      await page.screenshot({ path: f })
      index.push({ fichier: f, route: ROUTE, largeur: L, y, hauteur, grille: GRILLE, reduit: REDUIT })
    }
  }

  if (erreurs.length) souci.push(`${ROUTE} @ ${L} : ${erreurs.length} erreur(s) console — ${erreurs[0]}`)
  await ctx.close()
}

await navigateur.close()

const chemin = `${SORTIE}/index.json`
const ancien = existsSync(chemin) ? JSON.parse(readFileSync(chemin, 'utf8')) : []
writeFileSync(chemin, JSON.stringify([...ancien, ...index], null, 1))

for (const e of index) console.log(`  ${e.fichier}`)
if (souci.length) {
  console.log('\nPROBLÈMES :')
  souci.forEach((s) => console.log('  ✗ ' + s))
} else {
  console.log('\nconsole : 0 erreur')
}
