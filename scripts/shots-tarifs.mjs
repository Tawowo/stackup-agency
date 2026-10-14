/** Sections de la page tarifs, parcours client sur l'accueil et page référencement, à 1440 et 390 px. */
import { chromium } from '@playwright/test'
import fs from 'node:fs'
const base = process.argv[2] ?? 'http://localhost:3000'
const dossier = 'docs/qa/shots/tarifs'
fs.mkdirSync(dossier, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const cas = [
  ['/tarifs', 'tarifs-hero', '.su-tar__hero'],
  ['/tarifs', 'tarifs-parcours', '#parcours'],
  ['/tarifs', 'tarifs-inclus', '.su-tg--inclus'],
  ['/tarifs', 'tarifs-offres', '.su-tar__offres'],
  ['/tarifs', 'tarifs-abonnement', '.su-tg--abo'],
  ['/tarifs', 'tarifs-a-la-carte', '#a-la-carte'],
  ['/', 'accueil-parcours', '#parcours'],
  ['/services/referencement', 'referencement', 'main'],
]
for (const w of [1440, 390]) {
  const mobile = w < 768
  const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
  const page = await ctx.newPage()
  let derniere = ''
  for (const [route, nom, sel] of cas) {
    if (route !== derniere) {
      await page.goto(`${base}${route}?quality=high&pane=0`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1500)
      derniere = route
    }
    const el = page.locator(sel).first()
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    const f = `${dossier}/${nom}-${w}.png`
    if (nom === 'referencement') await page.screenshot({ path: f, fullPage: true })
    else await el.screenshot({ path: f })
    console.log('✓', f)
  }
  await ctx.close()
}
await browser.close()
