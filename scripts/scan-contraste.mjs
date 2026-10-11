/**
 * Scan de contraste piloté par axe-core.
 *
 * Les heuristiques « cette classe est sûrement sur fond clair » sont
 * dangereuses dans les deux sens : elles assombrissent du texte qui était
 * lisible sur fond sombre, et en oublient sur fond clair. Seul axe mesure
 * les couleurs réellement calculées, fond composite compris.
 *
 * Ce script liste donc chaque échec avec sa classe exacte et ses couleurs
 * mesurées, regroupés par classe pour pouvoir corriger à la source.
 *
 * Usage : node scripts/scan-contraste.mjs
 */
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

const PAGES = (process.env.PAGES ?? [
  '/',
  '/services',
  '/services/site-vitrine',
  '/laboratoire',
  '/configurateur',
  '/tarifs',
  '/realisations',
  '/devis',
  '/contact',
  '/blog',
  '/a-propos',
  '/parrainage',
].join(',')).split(',')

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const RE = /contrast of ([\d.]+).*?foreground color: (#[0-9a-f]+), background color: (#[0-9a-f]+).*?font size: [\d.]+pt \(([\d.]+)px\), font weight: (\w+)/s

async function main() {
  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })
  const ctx = await navigateur.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const parClasse = new Map()
  let total = 0

  for (const chemin of PAGES) {
    await page.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle', timeout: 60000 })
    await dormir(2300)
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const contraste = r.violations.filter((v) => v.id === 'color-contrast')
    const autres = r.violations.filter((v) => v.id !== 'color-contrast')

    for (const v of autres) {
      console.log(`  ⚠ ${chemin} :: ${v.id} [${v.impact}] ×${v.nodes.length} — ${v.help}`)
    }

    for (const v of contraste) {
      for (const n of v.nodes) {
        total++
        const m = (n.failureSummary ?? '').match(RE)
        const classes = (n.html.match(/class="([^"]*)"/)?.[1] ?? '(sans classe)')
        // On ne retient que les classes de couleur : c'est ce qu'il faut changer.
        const cles = classes
          .split(/\s+/)
          .filter((c) => /^(group-hover:|hover:)?text-/.test(c))
          .join(' ') || classes.slice(0, 50)
        const entree = parClasse.get(cles) ?? {
          nombre: 0,
          ratio: m?.[1],
          fg: m?.[2],
          bg: m?.[3],
          taille: m?.[4],
          graisse: m?.[5],
          pages: new Set(),
          exemple: n.html.slice(0, 110),
        }
        entree.nombre++
        entree.pages.add(chemin)
        parClasse.set(cles, entree)
      }
    }
    process.stdout.write(`${chemin} (${contraste.reduce((s, v) => s + v.nodes.length, 0)})  `)
  }

  await navigateur.close()

  const liste = [...parClasse.entries()]
    .map(([classe, d]) => ({ classe, ...d, pages: [...d.pages] }))
    .sort((a, b) => b.nombre - a.nombre)

  console.log(`\n\n═══ ${total} nœud(s) en échec, ${liste.length} motif(s) distinct(s) ═══\n`)
  for (const e of liste) {
    console.log(
      `×${String(e.nombre).padStart(3)}  ratio ${String(e.ratio ?? '?').padStart(5)}  ` +
        `fg ${e.fg ?? '?'} / bg ${e.bg ?? '?'}  ${e.taille ?? '?'}px ${e.graisse ?? ''}`,
    )
    console.log(`      classes : ${e.classe}`)
    console.log(`      pages   : ${e.pages.join(' ')}`)
  }

  mkdirSync('docs/qa', { recursive: true })
  writeFileSync('docs/qa/contraste.json', JSON.stringify(liste, null, 2))
  console.log(`\n→ docs/qa/contraste.json`)
  process.exitCode = total ? 1 : 0
}

main().catch((e) => {
  console.error('ÉCHEC :', e)
  process.exit(1)
})
