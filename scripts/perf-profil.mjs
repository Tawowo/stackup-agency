/**
 * PROFIL CPU du défilement (CDP Profiler, processeur ×4) : fonctions qui consomment le plus de temps propre
 * pendant un défilement complet. Usage : node scripts/perf-profil.mjs [BASE] [route] [--webgl=0]
 */
import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const route = args.find((a) => a.startsWith('/')) ?? '/'
const webgl = !args.includes('--webgl=0')
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.goto(BASE + route + (webgl ? '?quality=medium' : '?webgl=0'), { waitUntil: 'load' })
await page.waitForTimeout(8000)
await cdp.send('Profiler.enable')
await cdp.send('Profiler.setSamplingInterval', { interval: 500 })
await cdp.send('Profiler.start')
await page.mouse.move(700, 450)
for (let i = 0; i < 400; i++) {
  const { y, max } = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }))
  if (y >= max - 2) break
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(60)
}
const { profile } = await cdp.send('Profiler.stop')
const dt = profile.timeDeltas
const propre = new Map()
const parId = new Map(profile.nodes.map((n) => [n.id, n]))
const total = dt.reduce((a, x) => a + x, 0)
profile.samples.forEach((id, i) => propre.set(id, (propre.get(id) ?? 0) + dt[i]))
const agg = new Map()
for (const [id, t] of propre) {
  const n = parId.get(id)
  const cf = n.callFrame
  const k = `${cf.functionName || '(anonyme)'} ${cf.url.split('/').slice(-1)[0]}:${cf.lineNumber + 1}:${cf.columnNumber + 1}`
  agg.set(k, (agg.get(k) ?? 0) + t)
}
console.log(`total échantillonné : ${Math.round(total / 1000)} ms`)
const top = [...agg].sort((a, c) => c[1] - a[1]).slice(0, 18)
for (const [k, t] of top) {
  const m = k.match(/ ([^ :]+):(\d+):(\d+)$/)
  let extrait = ''
  if (m && m[1].endsWith('.js')) {
    try {
      const src = readFileSync(`.next/static/chunks/${m[1]}`, 'utf8').split('\n')[Number(m[2]) - 1] ?? ''
      extrait = src.slice(Math.max(0, Number(m[3]) - 1), Number(m[3]) + 140).replace(/\s+/g, ' ')
    } catch {}
  }
  console.log(`${String(Math.round(t / 1000)).padStart(6)} ms  ${k}\n          ${extrait}`)
}
await b.close()
