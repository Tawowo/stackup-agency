/**
 * Captures du site réel, à plusieurs largeurs et à plusieurs instants.
 *
 * Usage : node scripts/capture-site.mjs [chemin...]
 * Sans argument, parcourt la liste par défaut.
 *
 * Relève aussi, pour chaque page : erreurs console, débordement horizontal,
 * et présence du canvas WebGL. Rien n'est déduit — tout est mesuré dans la page.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const SORTIE = process.env.SORTIE ?? 'docs/captures'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

const LARGEURS = [
  { nom: 'mobile', largeur: 390, hauteur: 844 },
  { nom: 'desktop', largeur: 1440, hauteur: 900 },
]

const PAGES_DEFAUT = ['/', '/services', '/realisations', '/tarifs', '/devis', '/blog']

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const chemins = process.argv.slice(2).length ? process.argv.slice(2) : PAGES_DEFAUT
  mkdirSync(SORTIE, { recursive: true })

  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })

  const rapport = []

  for (const { nom, largeur, hauteur } of LARGEURS) {
    const contexte = await navigateur.newContext({
      viewport: { width: largeur, height: hauteur },
      deviceScaleFactor: 1,
    })
    const page = await contexte.newPage()

    for (const chemin of chemins) {
      const erreurs = []
      const surConsole = (m) => m.type() === 'error' && erreurs.push(m.text())
      const surErreur = (e) => erreurs.push(`pageerror: ${e.message}`)
      page.on('console', surConsole)
      page.on('pageerror', surErreur)

      await page.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle', timeout: 60000 })
      // Laisse l'assemblage de la scène se terminer (1,8 s) + marge.
      await dormir(2600)

      const slug = chemin === '/' ? 'accueil' : chemin.replace(/\//g, '-').replace(/^-/, '')
      const fichier = `${SORTIE}/${slug}-${nom}.png`
      await page.screenshot({ path: fichier })

      const mesures = await page.evaluate(() => ({
        debordement: document.documentElement.scrollWidth > window.innerWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        canvas: document.querySelectorAll('canvas').length,
        h1: document.querySelector('h1')?.textContent?.trim().slice(0, 80) ?? null,
        titre: document.title,
      }))

      rapport.push({ chemin, largeur: nom, fichier, erreurs, ...mesures })

      page.off('console', surConsole)
      page.off('pageerror', surErreur)
    }

    await contexte.close()
  }

  await navigateur.close()
  writeFileSync(`${SORTIE}/rapport.json`, JSON.stringify(rapport, null, 2))

  console.log('\n═══ CAPTURES ═══\n')
  for (const r of rapport) {
    const pb = []
    if (r.debordement) pb.push(`DÉBORDEMENT ${r.scrollWidth}>${r.innerWidth}`)
    if (r.erreurs.length) pb.push(`${r.erreurs.length} ERREUR(S)`)
    console.log(
      `${(r.chemin + ' [' + r.largeur + ']').padEnd(34)} canvas:${r.canvas}  ${
        pb.length ? '⚠ ' + pb.join(' · ') : 'ok'
      }`,
    )
    r.erreurs.slice(0, 2).forEach((e) => console.log('      ', e.slice(0, 160)))
  }
  console.log(`\n→ ${SORTIE}`)
}

main().catch((e) => {
  console.error('ÉCHEC :', e)
  process.exit(1)
})
