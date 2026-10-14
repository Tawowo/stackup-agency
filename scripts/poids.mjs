/** POIDS — JS transféré (gzip) au chargement initial puis après 6 s, par route, sur le build de production. */
import { chromium } from '@playwright/test'
const BASE = process.env.PROD ?? 'http://localhost:3100'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
for (const r of process.argv.slice(2)) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
  const page = await ctx.newPage()
  const client = await ctx.newCDPSession(page)
  await client.send('Network.enable')
  const tailles = new Map()
  const urls = new Map()
  client.on('Network.responseReceived', (e) => urls.set(e.requestId, e.response.url))
  client.on('Network.loadingFinished', (e) => tailles.set(e.requestId, e.encodedDataLength))
  let initial = 0
  await page.goto(BASE + r, { waitUntil: 'load' })
  const js = () => [...tailles].filter(([id]) => /\.js(\?|$)/.test(urls.get(id) ?? '')).reduce((s, [, t]) => s + t, 0)
  initial = js()
  await page.waitForTimeout(6000)
  const total = js()
  const lcp = await page.evaluate(() => new Promise((res) => new PerformanceObserver((l) => res(Math.round(l.getEntries().at(-1).startTime))).observe({ type: 'largest-contentful-paint', buffered: true })))
  const cls = await page.evaluate(() => new Promise((res) => { let c = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) c += e.value; res(+c.toFixed(3)) }).observe({ type: 'layout-shift', buffered: true }); setTimeout(() => res(+c.toFixed(3)), 300) }))
  console.log(`${r}  JS initial ${Math.round(initial / 1024)} ko · après 6 s ${Math.round(total / 1024)} ko · LCP ${lcp} ms (sans throttling) · CLS ${cls}`)
  await ctx.close()
}
await browser.close()
