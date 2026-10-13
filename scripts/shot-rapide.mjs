import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [url, out, w = '1440', h = '900', attente = '1500', mouse = ''] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } })
const logs = []
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text().slice(0, 300)) })
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message.slice(0, 300)))
await page.goto('http://localhost:3000' + url, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => logs.push('pas prêt'))
if (mouse) { const [mx, my] = mouse.split(',').map(Number); await page.mouse.move(mx - 40, my - 40); await page.mouse.move(mx, my, { steps: 8 }) }
await page.waitForTimeout(Number(attente))
await page.screenshot({ path: out })
console.log(logs.join('\n') || 'console propre')
await browser.close()
