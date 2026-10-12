/**
 * Détecteur d'éléments invisibles.
 *
 * axe-core ne vérifie le contraste que du TEXTE. Une icône, un trait ou un
 * liseré peut donc être parfaitement invisible sans qu'aucun outil ne le
 * signale — c'est ce qui était arrivé à un chevron en `text-white/65` posé
 * sur une carte blanche.
 *
 * Ce script mesure, pour chaque SVG et chaque bordure visible de la page, le
 * contraste entre sa couleur rendue et le fond effectif derrière lui, et
 * signale tout ce qui descend sous un seuil de perceptibilité.
 *
 * Usage : node scripts/detecter-invisibles.mjs
 *         LARGEUR=390 node scripts/detecter-invisibles.mjs
 */
import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const LARGEUR = Number(process.env.LARGEUR ?? 1440)

const PAGES = (process.env.PAGES ?? [
  '/', '/services', '/laboratoire', '/configurateur', '/tarifs', '/realisations',
  '/devis', '/contact', '/blog', '/a-propos', '/parrainage', '/faq', '/outils',
  '/zones-intervention', '/agence-web', '/creation-site-internet', '/solutions',
  '/comparatif', '/offre-rentree',
].join(',')).split(',')

/** Seuil de perceptibilité pour un élément graphique (WCAG 1.4.11). */
const SEUIL = 3.0

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const SONDE = (seuil) => {
  const lire = (c) => {
    const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/)
    return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null
  }
  const lin = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  const ratio = (a, b) => {
    const l1 = lum(a)
    const l2 = lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }
  const composer = (fg, bg) => {
    const a = fg[3]
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a))
  }

  /**
   * Remonte les ancêtres jusqu'à trouver un fond opaque.
   *
   * Retourne `null` si un ancêtre peint un dégradé ou une image : la couleur
   * effective n'est alors pas déterminable depuis le CSS, et la signaler
   * reviendrait à inventer un chiffre. Sans cette précaution, le détecteur
   * annonçait 152 éléments « à 1:1 » qui étaient en réalité posés sur des
   * pastilles en dégradé — des faux positifs.
   */
  const fondEffectif = (el) => {
    let n = el.parentElement
    let accumule = [255, 255, 255]
    const pile = []
    while (n) {
      const st = getComputedStyle(n)
      if (st.backgroundImage && st.backgroundImage !== 'none') return null
      const c = lire(st.backgroundColor)
      if (c && c[3] > 0) pile.push(c)
      if (c && c[3] === 1) break
      n = n.parentElement
    }
    for (const c of pile.reverse()) accumule = composer(c, accumule)
    return accumule
  }

  const resultats = []

  // --- Icônes SVG ---
  document.querySelectorAll('svg').forEach((svg) => {
    const r = svg.getBoundingClientRect()
    if (r.width < 6 || r.height < 6) return
    const st = getComputedStyle(svg)
    if (st.visibility === 'hidden' || st.display === 'none' || +st.opacity === 0) return
    // Les icônes Lucide peignent avec `stroke: currentColor`.
    const couleur = lire(st.color)
    if (!couleur || couleur[3] === 0) return
    const fond = fondEffectif(svg)
    if (!fond) return // fond non déterminable : on ne devine pas
    const rendu = composer(couleur, fond)
    const c = ratio(rendu, fond)
    if (c < seuil) {
      resultats.push({
        type: 'icone',
        contraste: Math.round(c * 100) / 100,
        couleur: st.color,
        classe: (svg.getAttribute('class') ?? '').slice(0, 70),
        parent: (svg.parentElement?.className ?? '').toString().slice(0, 60),
      })
    }
  })

  return resultats
}

async function main() {
  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })
  const ctx = await navigateur.newContext({
    viewport: { width: LARGEUR, height: LARGEUR < 700 ? 844 : 900 },
    ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
  })
  const page = await ctx.newPage()

  const parMotif = new Map()
  let total = 0

  console.log(`viewport : ${LARGEUR}px · seuil : ${SEUIL}:1\n`)

  for (const chemin of PAGES) {
    await page.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle', timeout: 60000 })
    await dormir(1800)
    const r = await page.evaluate(SONDE, SEUIL)
    for (const x of r) {
      total++
      const cle = `${x.classe} | ${x.couleur}`
      const e = parMotif.get(cle) ?? { ...x, nombre: 0, pages: new Set() }
      e.nombre++
      e.pages.add(chemin)
      parMotif.set(cle, e)
    }
    process.stdout.write(`${chemin} (${r.length})  `)
  }

  await navigateur.close()

  const liste = [...parMotif.values()]
    .map((e) => ({ ...e, pages: [...e.pages] }))
    .sort((a, b) => a.contraste - b.contraste)

  console.log(`\n\n═══ ${total} élément(s) graphique(s) sous ${SEUIL}:1 ═══\n`)
  for (const e of liste) {
    console.log(`×${String(e.nombre).padStart(3)}  ${String(e.contraste).padStart(5)}:1  ${e.couleur}`)
    console.log(`      classe : ${e.classe}`)
    console.log(`      parent : ${e.parent}`)
    console.log(`      pages  : ${e.pages.join(' ')}`)
  }

  mkdirSync('docs/qa', { recursive: true })
  writeFileSync(`docs/qa/invisibles-${LARGEUR}.json`, JSON.stringify(liste, null, 2))
  process.exitCode = total ? 1 : 0
}

main().catch((e) => {
  console.error('ÉCHEC :', e)
  process.exit(1)
})
