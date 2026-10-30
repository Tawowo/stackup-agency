/**
 * IMAGES DE PARTAGE DE L'OFFRE « CLUBS DE TENNIS » — une image 1200 × 630 par page du catalogue : nuit de la marque,
 * logo officiel, nom de la page, promesse, et une vraie capture de la démo à droite. Sortie : public/og/clubs.png et
 * public/og/clubs/<chemin>.png (lue par metaPageClub). Usage : node --experimental-strip-types --no-warnings scripts/clubs-og.mjs
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { CATALOGUE_CLUBS } from '../src/data/offre-clubs/catalogue.ts'
import { PRODUCT_NAME, RACINE_CLUBS } from '../src/config/offre-clubs.ts'

const NAVY = '#0B1E36'
const echapper = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
/** Coupe un titre en lignes d'environ `max` caractères, sur les espaces. */
function lignes(t, max) {
  const mots = t.split(' ')
  const out = []
  let l = ''
  for (const m of mots) {
    if ((l + ' ' + m).trim().length > max && l) {
      out.push(l)
      l = m
    } else l = (l + ' ' + m).trim()
  }
  if (l) out.push(l)
  return out.slice(0, 3)
}
const CAPTURE = (chemin) => {
  const c = chemin.replace(RACINE_CLUBS, '')
  if (/ecole|gerer-une-ecole/.test(c)) return 'bureau-ecole'
  if (/challenge/.test(c)) return 'site-challenge'
  if (/adhesion|reinscription|helloasso|encaisser/.test(c)) return 'site-adhesion'
  if (/adoc/.test(c)) return 'bureau-licences'
  if (/equipes|convoquer/.test(c)) return 'bureau-equipes'
  if (/tournois/.test(c)) return 'bureau-tournois'
  if (/communication/.test(c)) return 'bureau-communication'
  if (/assistant/.test(c)) return 'bureau-assistant'
  if (/reservation|padel|pickleball/.test(c)) return 'site-reserver'
  if (/statistiques|financer/.test(c)) return 'bureau-statistiques'
  if (/site-modifiable|site-internet|creer-le-site/.test(c)) return 'editeur'
  if (/tarifs|simulateur/.test(c)) return 'bureau-tresorerie'
  if (/logiciel|ma-journee|^$/.test(c)) return 'bureau-journee'
  return 'site-accueil'
}

const logo = await sharp('public/Logo_Stackup-Agency.png').resize({ width: 220 }).png().toBuffer()
const lm = await sharp(logo).metadata()
const plaque = await sharp({ create: { width: lm.width + 32, height: lm.height + 24, channels: 4, background: '#FFFFFF' } }).composite([{ input: logo, left: 16, top: 12 }]).png().toBuffer()

let n = 0
for (const p of CATALOGUE_CLUBS.filter((x) => x.groupe !== 'legal')) {
  const titre = p.chemin === RACINE_CLUBS ? 'Le site de votre club et le logiciel du bureau, connectés.' : p.nom
  const ls = lignes(titre, 22)
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="64" y="178" font-family="DejaVu Sans Mono, monospace" font-size="22" letter-spacing="3" fill="#FFB84D">${echapper(PRODUCT_NAME.toUpperCase())} · CLUBS DE TENNIS</text>
  ${ls.map((l, i) => `<text x="64" y="${250 + i * 64}" font-family="Poppins, DejaVu Sans, sans-serif" font-weight="700" font-size="54" fill="#FFFDF9">${echapper(l)}</text>`).join('\n  ')}
  <rect x="64" y="${270 + ls.length * 64}" width="110" height="6" fill="#F69106"/>
  <text x="64" y="${330 + ls.length * 64}" font-family="DejaVu Sans, sans-serif" font-size="24" fill="#A9B6C7">Site + logiciel pour clubs de tennis, padel, pickleball</text>
</svg>`)
  const cap = await sharp(`public/clubs-de-tennis/demo/${CAPTURE(p.chemin)}-bureau.avif`).resize({ width: 560 }).png().toBuffer()
  const cm = await sharp(cap).metadata()
  const cadre = await sharp({ create: { width: cm.width + 16, height: cm.height + 16, channels: 4, background: '#163A62' } }).composite([{ input: cap, left: 8, top: 8 }]).png().toBuffer()
  const sortie = p.chemin === RACINE_CLUBS ? 'public/og/clubs.png' : `public/og/clubs${p.chemin.slice(RACINE_CLUBS.length)}.png`
  mkdirSync(dirname(sortie), { recursive: true })
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: NAVY } })
    .composite([
      { input: cadre, left: 1200 - cm.width - 16 + 120, top: 630 - cm.height - 16 - 40 },
      { input: svg, left: 0, top: 0 },
      { input: plaque, left: 64, top: 48 },
    ])
    .png({ compressionLevel: 9, palette: true, quality: 85 })
    .toFile(sortie)
  n++
}
console.log(`✓ ${n} images de partage → public/og/clubs*`)
