/** SONDE PROD — erreurs console et état de la scène sur le build de production. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => ['error', 'warning'].includes(m.type()) && console.log(m.type(), m.text().slice(0, 300)))
page.on('pageerror', (e) => console.log('pageerror', e.message.slice(0, 300)))
await page.goto(`http://localhost:3100${process.argv[2] ?? '/'}`, { waitUntil: 'load' })
await page.waitForTimeout(8000)
console.log(await page.evaluate(() => ({ mode: document.documentElement.dataset.suMode, pret: document.documentElement.dataset.suReady, canvas: document.querySelectorAll('canvas').length })))
await browser.close()
