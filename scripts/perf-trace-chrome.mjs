/** Trace Chrome du défilement : durées cumulées Layout / UpdateLayoutTree / Paint… et origine (pile JS) des mises en page. */
import { chromium } from '@playwright/test'
const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const route = args.find((a) => a.startsWith('/')) ?? '/'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.goto(BASE + route + '?webgl=0', { waitUntil: 'load' })
await page.waitForTimeout(8000)
const evts = []
cdp.on('Tracing.dataCollected', (d) => evts.push(...d.value))
await cdp.send('Tracing.start', { transferMode: 'ReportEvents', categories: 'devtools.timeline,disabled-by-default-devtools.timeline,disabled-by-default-devtools.timeline.stack,v8.execute' })
await page.mouse.move(700, 450)
for (let i = 0; i < 400; i++) {
  const { y, max } = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }))
  if (y >= max - 2) break
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(60)
}
const fin = new Promise((r) => cdp.once('Tracing.tracingComplete', r))
await cdp.send('Tracing.end')
await fin
const somme = {}
const nb = {}
const piles = {}
for (const e of evts) {
  if (e.ph !== 'X' || !e.dur) continue
  somme[e.name] = (somme[e.name] ?? 0) + e.dur / 1000
  nb[e.name] = (nb[e.name] ?? 0) + 1
  if (e.name === 'Layout' || e.name === 'UpdateLayoutTree') {
    const st = e.args?.beginData?.stackTrace ?? e.args?.data?.stackTrace ?? []
    const k = e.name + ' ← ' + st.slice(0, 3).map((f) => `${f.functionName || '?'} ${String(f.url).split('/').pop()}:${f.lineNumber}:${f.columnNumber}`).join(' < ')
    piles[k] = (piles[k] ?? 0) + e.dur / 1000
  }
}
for (const n of ['Layout', 'UpdateLayoutTree', 'Paint', 'PrePaint', 'Layerize', 'Commit', 'FunctionCall', 'EventDispatch', 'FireAnimationFrame', 'RunTask'])
  console.log(n.padEnd(20), String(Math.round(somme[n] ?? 0)).padStart(6), 'ms', String(nb[n] ?? 0).padStart(6), 'fois')
const grosses = evts.filter((e) => e.ph === 'X' && e.name === 'UpdateLayoutTree').map((e) => ({ d: Math.round(e.dur / 1000), n: e.args?.elementCount, t: Math.round(e.ts / 1000) }))
const comptes = {}
for (const g of grosses) comptes[g.n] = (comptes[g.n] ?? 0) + 1
console.log('éléments recalculés (n → fois, durée cumulée) :', Object.entries(comptes).sort((a, c) => c[1] - a[1]).slice(0, 8).map(([n, f]) => `${n}→${f}×(${grosses.filter((g) => String(g.n) === n).reduce((a, g) => a + g.d, 0)}ms)`).join('  '))
console.log('— origines des mises en page —')
for (const [k, v] of Object.entries(piles).sort((a, c) => c[1] - a[1]).slice(0, 12)) console.log(String(Math.round(v)).padStart(6), 'ms', k)
await b.close()
