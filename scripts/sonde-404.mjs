/** SONDE 404 — liste les ressources qui répondent 404 sur une page. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
page.on('requestfailed', (r) => console.log('échec', r.url()))
page.on('response', (r) => r.status() >= 400 && console.log(r.status(), r.url()))
await page.goto(`http://localhost:3000${process.argv[2] ?? '/'}?webgl=0`, { waitUntil: 'load' })
await page.waitForTimeout(1000)
await browser.close()
