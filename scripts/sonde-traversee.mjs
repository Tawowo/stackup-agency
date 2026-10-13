/** SONDE TRAVERSÉE — clique un lien de la nav et capture le passage (repli, dépliage, arrivée). */
import { chromium } from '@playwright/test'
const [depart = '/', lien = 'Tarifs', w = '1440'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 } })
const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') erreurs.push(m.type() + ' ' + m.text().slice(0, 300)) })
await page.goto(`http://localhost:3000${depart}?quality=high&pane=0`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
const nom = (t) => `docs/qa/shots/traversee/${depart.replace(/\W+/g, '_') || 'accueil'}-${lien}-${t}-${w}.png`
await page.locator('.su-nav__entrees a', { hasText: lien }).first().click()
for (const t of [140, 420, 700, 1600]) {
  await page.waitForTimeout(t === 140 ? 140 : t - [140, 420, 700, 1600][[140, 420, 700, 1600].indexOf(t) - 1])
  await page.screenshot({ path: nom(t) })
  console.log('✓', nom(t))
}
console.log('url', page.url(), erreurs.length ? erreurs : 'sans erreur')
await browser.close()
