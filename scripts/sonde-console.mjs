/** SONDE — erreurs console du navigateur sur une URL (diagnostic). */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const url = process.argv[2] ?? '/?quality=high'
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[${m.type()}]`, m.text().slice(0, 400)) })
page.on('pageerror', (e) => console.log('[pageerror]', String(e).slice(0, 400)))
await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
console.log('ready =', await page.evaluate(() => document.documentElement.dataset.suReady))
await browser.close()
