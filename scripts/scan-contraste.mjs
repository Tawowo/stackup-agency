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

/**
 * Sous-arbres qu'axe ne doit pas mesurer.
 *
 * Le panneau de navigation mobile est rendu en permanence, hors écran, avec
 * `inert` et `aria-hidden` : personne ne peut le voir ni l'atteindre. Axe le
 * mesurait quand même contre le fond de la page et remontait six violations
 * fantômes — qui masquaient les vraies dans la liste. On l'exclut parce qu'il
 * est réellement inerte, pas pour faire taire l'outil : son contraste est
 * vérifié quand il est ouvert, sur son propre fond opaque.
 */
const EXCLUS = [['.mobile-menu-overlay[inert]']]
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

/**
 * Les routes auditées.
 *
 * Elles étaient douze. C'était une couverture insuffisante, et je m'en suis
 * aperçu en corrigeant un défaut de contraste sur `/zones-intervention` —
 * une page que ce scan ne visitait pas. Un audit qui ne regarde que les
 * pages déjà jugées bonnes ne trouve jamais rien.
 *
 * La liste couvre maintenant au moins un représentant de chaque GABARIT,
 * puisque c'est le gabarit qui porte le défaut : une page générée par ville
 * ou par métier en vaut quatre cents.
 */
const PAGES = (process.env.PAGES ?? [
  '/',
  // Commerciales
  '/services',
  '/services/site-vitrine',
  '/services/redaction-blog-seo',
  '/tarifs',
  '/tarifs/pro',
  '/realisations',
  '/a-propos',
  '/contact',
  '/parrainage',
  // Conversion et outils
  '/devis',
  '/laboratoire',
  '/configurateur',
  '/outils',
  '/outils/audit-site',
  '/outils/studio-de-style',
  // Territoire — un gabarit, des centaines d'URL
  '/zones-intervention',
  '/agence-web',
  '/agence-web/tours',
  '/agence-web/departement/indre-et-loire',
  // Métiers et solutions — mêmes gabarits démultipliés
  '/creation-site-internet',
  '/solutions',
  // Éditorial
  '/blog',
  '/blog/categorie/seo',
  '/ressources',
  '/ressources/documents',
  '/ressources/cahier-des-charges',
  // Utilitaires et mentions
  '/faq',
  '/plan-du-site',
  '/mentions-legales',
  '/cgv',
].join(',')).split(',')

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const RE = /contrast of ([\d.]+).*?foreground color: (#[0-9a-f]+), background color: (#[0-9a-f]+).*?font size: [\d.]+pt \(([\d.]+)px\), font weight: (\w+)/s

async function main() {
  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })
  const largeur = Number(process.env.LARGEUR ?? 1440)
  const ctx = await navigateur.newContext({
    viewport: { width: largeur, height: largeur < 700 ? 844 : 900 },
    ...(largeur < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
  })
  const page = await ctx.newPage()
  console.log(`viewport : ${largeur}px`)

  const parClasse = new Map()
  let total = 0

  for (const chemin of PAGES) {
    await page.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle', timeout: 60000 })
    await dormir(2300)

    // ── Plusieurs passes, à des positions de défilement différentes ──────
    //
    // L'accueil change de couleurs AVEC le défilement : le fond voyage de
    // l'encre au plein jour et revient. Analyser toute la page depuis le
    // haut mesurait donc des sections lointaines sous l'ambiance du hero —
    // un fond nocturne sous des blocs que le lecteur ne voit qu'en plein
    // jour. Cinq violations remontaient ainsi d'un état que personne ne
    // rencontre, et elles noyaient les vraies.
    //
    // On repasse donc à plusieurs hauteurs, chacune laissée se stabiliser,
    // et on fusionne. Un défaut réel apparaît dans la passe où la section
    // concernée est à l'écran ; un artefact disparaît.
    const hauteur = await page.evaluate(() => document.body.scrollHeight)
    const vue = await page.evaluate(() => window.innerHeight)
    const passes = Math.max(1, Math.min(8, Math.ceil((hauteur - vue) / vue / 1.6)))

    const violations = new Map()
    for (let i = 0; i < passes; i++) {
      const y = Math.round(((hauteur - vue) * i) / Math.max(passes - 1, 1))
      await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
      await dormir(passes > 1 ? 900 : 0)
      const partiel = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude(EXCLUS)
        .analyze()
      // Axe évalue TOUS les nœuds du document, y compris ceux qui sont hors
      // du cadre — en les composant sur le fond courant. Sur une page dont
      // le fond voyage avec le défilement, cela fabrique des violations
      // imaginaires : l'Atelier mesuré sur l'encre du hero, alors qu'on ne
      // le lit qu'en plein jour. On ne retient donc que les nœuds
      // réellement à l'écran pendant CETTE passe.
      for (const v of partiel.violations) {
        if (v.id === 'color-contrast') {
          const cibles = v.nodes.map((n) => (Array.isArray(n.target) ? n.target[0] : n.target))
          const vus = await page.evaluate((liste) => {
            return liste.map((sel) => {
              try {
                const el = document.querySelector(sel)
                if (!el) return false
                const r = el.getBoundingClientRect()
                return (
                  r.bottom > 0 &&
                  r.top < window.innerHeight &&
                  r.right > 0 &&
                  r.left < window.innerWidth &&
                  r.width > 1 &&
                  r.height > 1
                )
              } catch {
                // Sélecteur illisible : on garde le nœud. Dans le doute, on
                // signale — jamais l'inverse.
                return true
              }
            })
          }, cibles)
          v.nodes = v.nodes.filter((_, i) => vus[i])
          if (v.nodes.length === 0) continue
        }
        const existante = violations.get(v.id)
        if (!existante) {
          violations.set(v.id, { ...v, nodes: [...v.nodes] })
          continue
        }
        // Dédoublonnage par cible : le même nœud vu dans deux passes ne
        // compte qu'une fois.
        const connues = new Set(existante.nodes.map((n) => String(n.target)))
        for (const n of v.nodes) {
          if (!connues.has(String(n.target))) existante.nodes.push(n)
        }
      }
    }
    const r = { violations: [...violations.values()] }

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
        const cible = Array.isArray(n.target) ? n.target.join(' ') : String(n.target ?? '')
        const entree = parClasse.get(cles) ?? {
          nombre: 0,
          cibles: [],
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
        if (entree.cibles.length < 4 && cible) entree.cibles.push(cible)
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
