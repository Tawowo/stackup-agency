/** Vues réelles (viewport) : hero, estimateur avec la chaîne 3D, barre mobile repliée / dépliée. */
import { chromium } from '@playwright/test'
import fs from 'node:fs'
import { RACCOURCIS, encoder } from '../src/domain/devis/etat.ts'
const base = process.argv[2] ?? 'http://localhost:3000'
const dossier = 'docs/qa/shots/estimateur'
fs.mkdirSync(dossier, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
for (const w of [1440, 390]) {
  const mobile = w < 768
  const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
  const page = await ctx.newPage()
  const e = RACCOURCIS.find((r) => r.id === 'demarque').etat()
  await page.goto(`${base}/tarifs?quality=high&pane=0`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${dossier}/vue-hero-${w}.png` })
  await page.goto(`${base}/tarifs?e=${encoder({ ...e, etape: 2 })}&quality=high&pane=0`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.getElementById('estimer').scrollIntoView())
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${dossier}/vue-estimer-${w}.png` })
  if (mobile) {
    const b = await page.locator('.su-est__recap-bascule').boundingBox()
    await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2)
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${dossier}/vue-recap-ouvert-${w}.png` })
  }
  await ctx.close()
}
await browser.close()
