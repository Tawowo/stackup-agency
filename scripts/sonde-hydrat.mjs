/** SONDE HYDRATATION — le message complet d'une erreur d'hydratation sur une route. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => m.type() === 'error' && console.log(m.text().slice(0, 1800)))
await page.goto(`http://localhost:3000${process.argv[2]}?webgl=0`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
if (process.argv[3]) console.log(await page.evaluate((s) => [...document.querySelectorAll(s)].map((e) => e.outerHTML.slice(0, 300)), process.argv[3]))
await browser.close()
