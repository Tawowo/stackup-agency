/**
 * CAPTURES DES RÉALISATIONS — prépare les captures d'écran RÉELLES des projets exposés.
 *
 * Sources : docs/captures-sources/<slug>/{bureau,mobile}-<n>.(jpg|png|webp), dans l'ordre d'affichage.
 * Pour chaque famille (bureau, mobile), TOUTES les captures de TOUS les projets partagent un même
 * ratio, pour que l'appareil (ordinateur ou téléphone) soit rempli exactement, sans bande vide :
 *   1. rognage des bords (coins arrondis de l'écran, barre de défilement) ;
 *   2. ratio commun = le plus large des ratios rognés ; chaque capture est coupée par le BAS
 *      (ancrage en haut), jamais étirée ni agrandie ;
 *   3. sorties AVIF : une image par capture (public/realisations/<slug>/<famille>-<n>.avif) et une
 *      « bande » verticale (les captures empilées + la première répétée) pour la scène 3D.
 * Écrit src/config/captures.generated.ts (ratios, fichiers, dimensions, captures manquantes).
 * Une capture absente n'est jamais inventée : l'interface affiche alors un emplacement neutre.
 *
 * Usage : node --experimental-strip-types --no-warnings scripts/realisations-captures.mjs
 */
import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SOURCES = 'docs/captures-sources'
const SORTIE = 'public/realisations'
/** Les projets exposés, dans l'ordre. */
const SLUGS = ['tennis-club-savigne-gizeux', 'logiciel-gestion-artisans']
/** Rognage en pixels source : [gauche, droite, haut, bas]. */
const ROGNAGE = { bureau: [14, 14, 14, 30], mobile: [0, 32, 0, 0] }
const LARGEUR = { bureau: 1600, mobile: 720 }
const LARGEUR_BANDE = { bureau: 1600, mobile: 640 }
const POIDS_MAX = { bureau: 190, mobile: 140 }

const fichiersDe = (slug, famille) => {
  const dir = join(SOURCES, slug)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => new RegExp(`^${famille}-\\d+\\.(jpe?g|png|webp)$`, 'i').test(f))
    .sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]))
    .map((f) => join(dir, f))
}

async function rogner(fichier, famille) {
  const [g, d, h, b] = ROGNAGE[famille]
  const meta = await sharp(fichier).metadata()
  const zone = { left: g, top: h, width: meta.width - g - d, height: meta.height - h - b }
  const buf = await sharp(fichier).extract(zone).toBuffer()
  return { buf, w: zone.width, h: zone.height }
}

async function avif(entree, sortie, largeur, kmax) {
  let q = 56
  let taille = Infinity
  while (q >= 24) {
    await sharp(entree).resize({ width: largeur, withoutEnlargement: true }).avif({ quality: q, effort: 6 }).toFile(sortie)
    taille = statSync(sortie).size
    if (taille <= kmax * 1024) break
    q -= 6
  }
  return { q, ko: Math.round(taille / 1024) }
}

const manifeste = { ratio: {}, projets: {} }
const rognees = {}
for (const famille of ['bureau', 'mobile']) {
  let ratio = 0
  for (const slug of SLUGS) {
    const liste = []
    for (const f of fichiersDe(slug, famille)) {
      const r = await rogner(f, famille)
      ratio = Math.max(ratio, r.w / r.h)
      liste.push(r)
    }
    rognees[`${slug}/${famille}`] = liste
  }
  manifeste.ratio[famille] = Math.round(ratio * 10000) / 10000
}

for (const slug of SLUGS) {
  manifeste.projets[slug] = {}
  mkdirSync(join(SORTIE, slug), { recursive: true })
  for (const famille of ['bureau', 'mobile']) {
    const liste = rognees[`${slug}/${famille}`]
    if (!liste.length) {
      manifeste.projets[slug][famille] = { manquant: true, images: [], bande: null }
      console.log(`⚠ ${slug} / ${famille} : AUCUNE capture — emplacement neutre`)
      continue
    }
    const R = manifeste.ratio[famille]
    const images = []
    const tuiles = []
    for (let i = 0; i < liste.length; i++) {
      const { buf, w, h } = liste[i]
      const hh = Math.round(w / R)
      if (hh > h) throw new Error(`${slug} ${famille}-${i + 1} : plus court que le ratio commun`)
      // Ancrage en haut : on coupe par le bas.
      const coupe = await sharp(buf).extract({ left: 0, top: 0, width: w, height: hh }).toBuffer()
      const nom = `${famille}-${i + 1}.avif`
      const { ko, q } = await avif(coupe, join(SORTIE, slug, nom), LARGEUR[famille], POIDS_MAX[famille])
      const L = Math.min(LARGEUR[famille], w)
      images.push({ fichier: `/realisations/${slug}/${nom}`, largeur: L, hauteur: Math.round(L / R) })
      tuiles.push(await sharp(coupe).resize({ width: LARGEUR_BANDE[famille], withoutEnlargement: false }).toBuffer())
      console.log(`✓ ${slug}/${nom} ${w}×${h} → ratio ${R} · ${ko} ko (q${q})`)
    }
    // La bande : captures empilées, la première répétée à la fin (boucle sans saut).
    const lb = LARGEUR_BANDE[famille]
    const hb = Math.round(lb / R)
    const pile = [...tuiles, tuiles[0]]
    const composite = await Promise.all(pile.map(async (t, k) => ({ input: await sharp(t).resize({ width: lb, height: hb, fit: 'fill' }).toBuffer(), left: 0, top: k * hb })))
    const bandeBuf = await sharp({ create: { width: lb, height: hb * pile.length, channels: 3, background: '#ffffff' } }).composite(composite).png().toBuffer()
    const nomBande = `${famille}-bande.avif`
    const r = await avif(bandeBuf, join(SORTIE, slug, nomBande), lb, 520)
    console.log(`✓ ${slug}/${nomBande} ${lb}×${hb * pile.length} (${pile.length} cases) · ${r.ko} ko`)
    manifeste.projets[slug][famille] = { manquant: false, images, bande: { fichier: `/realisations/${slug}/${nomBande}`, cases: pile.length, largeur: lb, hauteur: hb * pile.length } }
  }
}

writeFileSync(
  'src/config/captures.generated.ts',
  `// FICHIER GÉNÉRÉ par scripts/realisations-captures.mjs. Ne pas modifier : déposer les captures dans docs/captures-sources/ et relancer.\n\nexport const CAPTURES = ${JSON.stringify(manifeste, null, 2)} as const\n`,
)
console.log('✓ src/config/captures.generated.ts — ratios', manifeste.ratio)
