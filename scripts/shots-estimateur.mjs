/**
 * SHOTS ESTIMATEUR — chaque étape, chaque raccourci, le récapitulatif, à 1440 et 390 px.
 * Usage : node --experimental-strip-types scripts/shots-estimateur.mjs [base=http://localhost:3000] [filtre]
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs'
import { RACCOURCIS, encoder } from '../src/domain/devis/etat.ts'
import { configDe } from '../src/domain/devis/config.ts'

const base = process.argv[2] ?? 'http://localhost:3000'
const filtre = process.argv[3] ?? ''
const dossier = 'docs/qa/shots/estimateur'
fs.mkdirSync(dossier, { recursive: true })

const complet = {
  cfg: configDe({
    accueil: 'Signature',
    pages: { Classique: 10, Signature: 3 },
    pagesSerie: 12,
    portee: 'Local',
    ia: 'Essentielle',
    options: { F02: 1, F04: 1, F07: 1, E03: 1, C01: 6, C02: 2, B05: 1, O01: 1, O02: 1, O03: 1, OP2: 1 },
    boutique: { active: true, produits: 40, import: false, variantes: 60, categories: 7 },
    outil: { actif: true, utilisateurs: 5 },
    abonnement: { actif: true, publications: 4, articles: 1, suivi: 'Local', suiviIA: true, liens: 0, ficheGoogle: true, rapport: true, heuresModifs: 1, annuel: false },
  }),
  metier: 'artisan du bâtiment',
}
const cas = []
for (let n = 1; n <= 10; n++) cas.push({ nom: `etape-${String(n).padStart(2, '0')}`, jeton: encoder({ ...complet, etape: n }) })
for (const r of RACCOURCIS) {
  cas.push({ nom: `raccourci-${r.id}`, jeton: encoder({ ...r.etat(), etape: 10 }) })
}
cas.push({ nom: 'depart-vide', jeton: '' })

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
for (const w of [1440, 390]) {
  const mobile = w < 768
  const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
  const page = await ctx.newPage()
  for (const c of cas.filter((x) => x.nom.includes(filtre))) {
    await page.goto(`${base}/tarifs?${c.jeton ? `e=${c.jeton}&` : ''}quality=high&pane=0#estimer`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)
    const zone = await page.locator('.su-est__colonnes').boundingBox()
    const tete = await page.locator('.su-est__tete').boundingBox()
    if (!zone || !tete) throw new Error('zone introuvable')
    const y0 = (await page.evaluate(() => window.scrollY)) + 0
    const top = c.nom.startsWith('raccourci') || c.nom === 'depart-vide' ? tete.y + y0 : zone.y + y0
    const bas = zone.y + y0 + zone.height
    const f = `${dossier}/${c.nom}-${w}.png`
    await page.screenshot({ path: f, fullPage: true, clip: { x: 0, y: Math.max(0, top - 10), width: w, height: Math.min(bas - top + 20, 6000) } })
    console.log('✓', f)
  }
  await ctx.close()
}
await browser.close()
