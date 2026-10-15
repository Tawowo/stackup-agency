/**
 * DOCUMENTS PDF — `npm run documents`. Rend chaque document (scripts/documents/NN-*.mjs) en HTML de marque, puis en
 * PDF via Chromium (Playwright). Écrit public/documents/<slug>.pdf et src/config/documents.generated.ts
 * (liste, descriptions, pages, poids) lu par /ressources/documents. Les variables viennent de src/config/site.ts.
 * Usage : node --experimental-strip-types --no-warnings scripts/documents.mjs [slug…]
 */
import { chromium } from '@playwright/test'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { contexte } from './documents/contexte.mjs'
import { enveloppe, pied } from './documents/gabarit.mjs'

const filtre = process.argv.slice(2)
const ctx = contexte()
mkdirSync('public/documents', { recursive: true })

const fichiers = readdirSync('scripts/documents').filter((f) => /^\d\d-.*\.mjs$/.test(f)).sort()
const attendus = new Set()
const manifeste = []
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const f of fichiers) {
  const m = await import(`./documents/${f}`)
  const { slug, titre, sousTitre, revue } = m.meta
  attendus.add(`${slug}.pdf`)
  if (filtre.length && !filtre.includes(slug)) continue
  const html = enveloppe({ titre, sousTitre, corps: m.corps(ctx), ctx })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  await page.pdf({ path: `public/documents/${slug}.pdf`, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: pied({ titre, revue: !!revue, ctx }), margin: { top: '22mm', bottom: '26mm', left: '17mm', right: '17mm' } })
  await page.close()
  console.log('✓', slug)
}
await browser.close()
// Manifeste : relu sur disque pour inclure aussi les documents non régénérés cette fois.
for (const f of fichiers) {
  const m = await import(`./documents/${f}`)
  const { slug, titre, description, groupe, revue } = m.meta
  const chemin = `public/documents/${slug}.pdf`
  if (!existsSync(chemin)) continue
  const taille = statSync(chemin).size
  const pages = (readFileSync(chemin, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
  manifeste.push({ slug, titre, description, groupe, revue: !!revue, pages, ko: Math.round(taille / 1024) })
}
// Les anciens PDF (identité de l'ancien titulaire) sont retirés : seuls les documents listés restent.
if (!filtre.length) for (const f of readdirSync('public/documents')) if (f.endsWith('.pdf') && !attendus.has(f)) unlinkSync(`public/documents/${f}`)
writeFileSync(
  'src/config/documents.generated.ts',
  `// FICHIER GÉNÉRÉ par scripts/documents.mjs (npm run documents). Ne pas modifier.\n\nexport interface DocumentPdf { slug: string; titre: string; description: string; groupe: string; revue: boolean; pages: number; ko: number }\nexport const DOCUMENTS: DocumentPdf[] = ${JSON.stringify(manifeste, null, 2)}\n`,
)
console.log(`${manifeste.length} documents`)
