/** CADENCE — fps SwiftShader (proxy, ≥ 30 accepté) par configuration, aux deux largeurs. `node scripts/cadence.mjs` */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1]
const CAS = {
  defaut: [
    ['logo', 'layout=logo'],
    ['pile', 'layout=pile'],
    ['pile sans mur', 'layout=pile&mur=0'],
    ['pile sans ombre', 'layout=pile&ombre=0'],
  ],
  diagnostic: [
    ['logo', 'layout=logo'],
    ['logo sans aa', 'layout=logo&aa=0'],
    ['logo sans grain', 'layout=logo&grain=0'],
    ['logo sans aa ni grain', 'layout=logo&aa=0&grain=0'],
    ['mur seul', 'layout=logo&plaques=0'],
    ['mur seul sans aa', 'layout=logo&plaques=0&aa=0'],
    ['rien (mur coupé, sans plaques)', 'layout=logo&plaques=0&mur=0&aa=0'],
  ],
}
const cas = CAS[arg('cas') ?? 'defaut']
const tailles = arg('largeur') === '1440' ? [[1440, 900]] : [[1440, 900], [390, 844]]
for (const [w, h] of tailles) {
  for (const [nom, q] of cas) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.goto(`http://localhost:3000/lab?quality=high&pane=0&${q}`, { waitUntil: 'networkidle' })
    await page.waitForSelector('html[data-su-ready="1"]')
    await page.waitForTimeout(3500)
    const txt = await page.locator('header p').textContent()
    console.log(w, nom, '→', txt.match(/(\d+) fps/)?.[1], 'fps')
    await page.close()
  }
}
await browser.close()
