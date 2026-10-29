import { chromium } from '@playwright/test'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] })
const liste = process.argv.slice(2)
for (const [nom, ctxo] of [['b', { viewport: { width: 1440, height: 900 } }], ['m', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
  const p = await (await b.newContext(ctxo)).newPage()
  for (const u of liste) {
    await p.goto('http://localhost:3100' + u + '?quality=low', { waitUntil: 'load' }); await p.waitForTimeout(1500)
    await p.screenshot({ path: `/tmp/claude-0/shots/p-${u.replace(/\W+/g, '_')}-${nom}.png`, fullPage: false })
  }
}
await b.close()
