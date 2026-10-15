// node scripts/shot-scroll.mjs <url> <prefixe> <largeur> <hauteur> <y1,y2,...>  (positions de scroll en px ou en % du total, ex 50%)
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [url, pre, w, h, ys] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
for (const y of ys.split(',')) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
  const px = y.endsWith('%') ? Math.round((parseFloat(y) / 100) * total) : +y
  await page.evaluate((v) => window.scrollTo(0, v), px)
  await page.waitForTimeout(2200)
  await page.screenshot({ path: `${pre}-${y.replace('%', 'p')}.png` })
}
await browser.close()
