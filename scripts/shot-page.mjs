// Capture pleine page : node scripts/shot-page.mjs <url> <sortie> <largeur> [hauteur]
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [url, out, w = '1440', h = '900'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } })
await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
await page.waitForTimeout(1500)
await page.screenshot({ path: out, fullPage: true })
await browser.close()
