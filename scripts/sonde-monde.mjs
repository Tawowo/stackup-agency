/** SONDE — état du monde (uniforms, scène) sur une URL, après `attente` ms. */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const [url = '/lab?quality=high&pane=0', attente = '3000'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => { if (m.type() === 'error') console.log('[console]', m.text().slice(0, 600)) })
await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(Number(attente))
console.log(await page.evaluate(() => {
  const su = window.__su
  if (!su) return 'pas de __su'
  const u = su.u
  const s = su.scene.getState()
  const v = (k) => { const x = u[k]?.value; return x && x.isVector3 ? [x.x, x.y, x.z].map((n) => +n.toFixed(3)) : x && x.isVector4 ? [x.x, x.y, x.z, x.w].map((n) => +n.toFixed(3)) : x && x.isVector2 ? [x.x, x.y] : typeof x === 'number' ? +x.toFixed(3) : x }
  return JSON.stringify({ frame: s.frame, dissolve: v('uDissolve'), solY: v('uSolY'), stack: v('uStack'), ecran: v('uStackEcran'), lampe: v('uLampe'), code: v('uCode'), flux: v('uFlux'), wall: v('uWall'), etage: v('uEtage'), probe: v('uProbe'), probeActive: v('uProbeActive'), nuit: v('uNuit'), params: { sol: s.params.sol, code: s.params.code, tangage: s.params.tangage }, fps: s.fps })
}))
await browser.close()
