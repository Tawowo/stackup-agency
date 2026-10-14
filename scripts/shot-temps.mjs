/** SHOT TEMPS — une route capturée à plusieurs instants (ms) après le chargement : pour les mondes en boucle. */
import { chromium } from '@playwright/test'
const [route, w = '1440', ...temps] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const mobile = Number(w) < 768
const ctx = await browser.newContext({ viewport: { width: Number(w), height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
const page = await ctx.newPage()
await page.goto(`http://localhost:3000${route}?quality=high&pane=0`, { waitUntil: 'networkidle' })
let t0 = Date.now()
for (const t of temps.map(Number)) {
  const reste = t - (Date.now() - t0)
  if (reste > 0) await page.waitForTimeout(reste)
  const f = `docs/qa/shots/temps/${route.replace(/\W+/g, '_')}-${t}-${w}.png`
  await page.screenshot({ path: f })
  console.log('✓', f)
}
await browser.close()
