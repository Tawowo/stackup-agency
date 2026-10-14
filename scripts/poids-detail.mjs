/** POIDS DÉTAIL — les scripts chargés avant `load`, triés par taille transférée. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
const page = await ctx.newPage()
const client = await ctx.newCDPSession(page)
await client.send('Network.enable')
const urls = new Map()
const t = []
client.on('Network.responseReceived', (e) => urls.set(e.requestId, e.response.url))
client.on('Network.loadingFinished', (e) => { const u = urls.get(e.requestId) ?? ''; if (/\.js/.test(u)) t.push([Math.round(e.encodedDataLength / 1024), u.split('/').pop()]) })
await page.goto('http://localhost:3100' + (process.argv[2] ?? '/cgv'), { waitUntil: 'load' })
t.sort((a, b) => b[0] - a[0]).forEach(([k, u]) => console.log(k, 'ko', u))
await browser.close()
