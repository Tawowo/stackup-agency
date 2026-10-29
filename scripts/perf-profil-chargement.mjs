/** PROFIL CPU du CHARGEMENT (processeur ×4) : fonctions les plus coûteuses entre la navigation et 5 s après `load`. */
import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const route = args.find((a) => a.startsWith('/')) ?? '/'
const webgl = !args.includes('--webgl=0')
const mobile = args.includes('--mobile')
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await (await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } })).newPage()
const cdp = await page.context().newCDPSession(page)
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await cdp.send('Profiler.enable')
await cdp.send('Profiler.setSamplingInterval', { interval: 500 })
await cdp.send('Profiler.start')
await page.goto(BASE + route + (webgl ? '' : '?webgl=0'), { waitUntil: 'load' })
await page.waitForTimeout(5000)
const { profile } = await cdp.send('Profiler.stop')
const dt = profile.timeDeltas
const noeuds = new Map(profile.nodes.map((n) => [n.id, n]))
const parent = new Map()
for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id)
const agg = new Map()
const cumul = new Map()
profile.samples.forEach((id, i) => {
  const cf = noeuds.get(id).callFrame
  const k = `${cf.functionName || '(anonyme)'} ${cf.url.split('/').pop()}:${cf.lineNumber + 1}:${cf.columnNumber + 1}`
  agg.set(k, (agg.get(k) ?? 0) + dt[i])
})
const total = dt.reduce((a, x) => a + x, 0)
console.log(`échantillonné : ${Math.round(total / 1000)} ms, dont inactif ${Math.round((agg.get('(idle) :0:0') ?? 0) / 1000)} ms`)
for (const [k, t] of [...agg].sort((a, c) => c[1] - a[1]).slice(1, 22)) {
  const m = k.match(/ ([^ :]+):(\d+):(\d+)$/)
  let ex = ''
  if (m && m[1].endsWith('.js')) {
    try { ex = readFileSync(`.next/static/chunks/${m[1]}`, 'utf8').split('\n')[Number(m[2]) - 1].slice(Number(m[3]) - 1, Number(m[3]) + 110).replace(/\s+/g, ' ') } catch {}
  }
  console.log(`${String(Math.round(t / 1000)).padStart(6)} ms  ${k}  ${ex}`)
}
await b.close()
