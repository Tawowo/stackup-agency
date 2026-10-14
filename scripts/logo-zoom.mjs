/**
 * SUPERPOSITION À FORT ZOOM — les deux plis du logo (gauche : le ruban se replie ;
 * droite : la bande ambre sort de dessous). Capture le S au repos en DPR 3, le
 * superpose au PNG officiel (rouge = en trop, cyan = en moins) et écrit trois
 * vues : le S entier, le pli gauche, le pli droit. Rapporte l'écart par zone.
 */
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'
const url = process.argv[2] ?? '/lab?quality=high&pane=0&hud=0&layout=logo&still=1&proj=1&mur=0&ombre=0&fond=ivoire&rim=0&halo=0'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 })
const page = await ctx.newPage()
await page.goto(BASE + url, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 })
await page.addStyleTag({ content: '.su-rail, .su-nav { display: none !important; }' })
await page.waitForTimeout(800)
const box = await page.locator('[data-su-frame]').first().boundingBox()
mkdirSync('docs/qa/shots/logo-check', { recursive: true })
await page.screenshot({ path: 'docs/qa/shots/logo-check/zoom-capture.png', clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } })
await browser.close()

const encre = (d, w, h) => {
  const m = new Uint8Array(w * h)
  let x0 = w, y0 = h, x1 = -1, y1 = -1
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 3
    if (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2] < 176) { m[y * w + x] = 1; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
  }
  return { m, box: { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 } }
}
const cap = await sharp('docs/qa/shots/logo-check/zoom-capture.png').removeAlpha().raw().toBuffer({ resolveWithObject: true })
const C = encre(cap.data, cap.info.width, cap.info.height)
const refImg = await sharp('public/logo_Stackup-Agency_seul.png').flatten({ background: '#fff' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const R = encre(refImg.data, refImg.info.width, refImg.info.height)
const rr = await sharp('public/logo_Stackup-Agency_seul.png').flatten({ background: '#fff' }).extract({ left: R.box.x, top: R.box.y, width: R.box.w, height: R.box.h }).resize(C.box.w, C.box.h, { fit: 'fill', kernel: 'lanczos3' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const RR = encre(rr.data, C.box.w, C.box.h)
const W = C.box.w, H = C.box.h
const out = Buffer.alloc(W * H * 3, 255)
const zones = { 'pli gauche': [0, 0.2, 0.2, 0.62], 'pli droit': [0.62, 0.45, 1, 0.8], 'haut': [0, 0, 1, 0.3], 'bas': [0, 0.7, 1, 1], 'total': [0, 0, 1, 1] }
const err = Object.fromEntries(Object.keys(zones).map((k) => [k, { en_trop: 0, en_moins: 0, encre: 0 }]))
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const a = C.m[(y + C.box.y) * cap.info.width + x + C.box.x], b = RR.m[y * W + x]
  const o = (y * W + x) * 3
  const col = a && b ? [60, 60, 70] : a ? [230, 40, 40] : b ? [30, 190, 220] : [255, 255, 255]
  out[o] = col[0]; out[o + 1] = col[1]; out[o + 2] = col[2]
  for (const [k, [fx0, fy0, fx1, fy1]] of Object.entries(zones)) if (x >= fx0 * W && x < fx1 * W && y >= fy0 * H && y < fy1 * H) { if (b) err[k].encre++; if (a && !b) err[k].en_trop++; if (!a && b) err[k].en_moins++ }
}
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile('docs/qa/shots/logo-check/zoom-diff.png')
const crop = (n, [fx0, fy0, fx1, fy1]) => sharp(out, { raw: { width: W, height: H, channels: 3 } }).extract({ left: Math.round(fx0 * W), top: Math.round(fy0 * H), width: Math.round((fx1 - fx0) * W), height: Math.round((fy1 - fy0) * H) }).png().toFile(`docs/qa/shots/logo-check/zoom-${n}.png`)
await crop('pli-gauche', zones['pli gauche'])
await crop('pli-droit', zones['pli droit'])
for (const [k, v] of Object.entries(err)) console.log(k.padEnd(10), `en trop ${(100 * v.en_trop / v.encre).toFixed(2)} % · en moins ${(100 * v.en_moins / v.encre).toFixed(2)} % (de l'encre de la zone)`)
console.log('boîte capture', C.box.w, 'x', C.box.h)
