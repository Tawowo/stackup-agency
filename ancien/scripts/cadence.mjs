/** Relève la cadence du banc. Usage : node scripts/cadence.mjs [largeur] [p] */
import { chromium } from 'playwright'
const L = Number(process.argv[2] ?? 1440)
const P = process.argv[3] ?? '0.5'
const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: L < 700 ? 844 : 900 },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
await page.goto(`http://localhost:3100/lab?p=${P}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(6000)
const r = await page.evaluate(() => window.__SU_LAB)
console.log(`  ${L} px · p=${P} → ${r.fps} fps · ${r.tempsTrame} ms/trame · ${r.trames} trames · ${r.repli ? 'REPLI' : 'webgl'}`)
await n.close()
