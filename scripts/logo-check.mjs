/**
 * SUPERPOSITION DU LOGO (règle bloquante 9, § 11.4).
 * Capture la scène au repos (layout logo, orthographique, figée, sans mur ni
 * ombre, sur ivoire), isole l'encre, compare à `logo_Stackup-Agency_seul.png`
 * redimensionné sur la même boîte englobante. Seuil : 2 % des pixels.
 *
 * Usage : node scripts/logo-check.mjs [--url=/lab?...] [--largeur=1440]
 */
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=') ?? d
const url = arg('url', '/lab?quality=high&pane=0&hud=0&layout=logo&still=1&proj=1&mur=0&ombre=0&fond=ivoire')
const largeur = Number(arg('largeur', '1440'))
const SEUIL = 2

/** Encre = ce qui n'est pas le papier. Seuil de luminance 176 (dérivé : demi-
 *  couverture navy/papier 147, ambre/papier 206, moyenne 176). */
function encre(data, w, h) {
  const m = new Uint8Array(w * h)
  let minX = w, minY = h, maxX = -1, maxY = -1
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
      if (lum < 176) {
        m[y * w + x] = 1
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  return { m, box: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 } }
}

async function main() {
  const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
  const page = await browser.newPage({ viewport: { width: largeur, height: largeur < 600 ? 844 : 900 } })
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle' })
  await page.waitForSelector('html[data-su-ready="1"]', { timeout: 20000 })
  // Le rail de profondeur et la nav vivent dans les marges : hors mesure.
  await page.addStyleTag({ content: '.su-rail, .su-nav { display: none !important; }' })
  await page.waitForTimeout(600)
  const box = await page.locator('[data-su-frame]').first().boundingBox()
  const marge = 12
  const clip = { x: Math.max(0, box.x - marge), y: Math.max(0, box.y - marge), width: box.width + 2 * marge, height: box.height + 2 * marge }
  mkdirSync('docs/qa/shots/logo-check', { recursive: true })
  const capturePath = `docs/qa/shots/logo-check/capture-${largeur}.png`
  await page.screenshot({ path: capturePath, clip })
  await browser.close()

  const cap = await sharp(capturePath).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const C = encre(cap.data, cap.info.width, cap.info.height)
  const ref = await sharp('public/logo_Stackup-Agency_seul.png').removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const R = encre(ref.data, ref.info.width, ref.info.height)

  // Référence recadrée sur son encre puis redimensionnée sur la boîte de la capture.
  const refResized = await sharp('public/logo_Stackup-Agency_seul.png')
    .extract({ left: R.box.x, top: R.box.y, width: R.box.w, height: R.box.h })
    .resize(C.box.w, C.box.h, { fit: 'fill', kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const RR = encre(refResized.data, C.box.w, C.box.h)

  let diff = 0
  let encreRef = 0
  const out = Buffer.alloc(C.box.w * C.box.h * 3)
  for (let y = 0; y < C.box.h; y++)
    for (let x = 0; x < C.box.w; x++) {
      const a = C.m[(y + C.box.y) * cap.info.width + (x + C.box.x)]
      const b = RR.m[y * C.box.w + x]
      encreRef += b
      const o = (y * C.box.w + x) * 3
      if (a !== b) {
        diff++
        // Rouge : en trop dans la capture ; bleu : manquant.
        out[o] = a ? 230 : 40
        out[o + 1] = 40
        out[o + 2] = a ? 40 : 230
      } else {
        const v = a ? 30 : 245
        out[o] = out[o + 1] = out[o + 2] = v
      }
    }
  const total = C.box.w * C.box.h
  const pct = (100 * diff) / total
  const pctEncre = (100 * diff) / encreRef
  await sharp(out, { raw: { width: C.box.w, height: C.box.h, channels: 3 } }).png().toFile(`docs/qa/shots/logo-check/diff-${largeur}.png`)
  const ratioCap = C.box.w / C.box.h
  const ratioRef = R.box.w / R.box.h
  const rapport = {
    largeur,
    url,
    boite: C.box,
    ratio: { capture: +ratioCap.toFixed(4), reference: +ratioRef.toFixed(4), ecartPct: +((100 * Math.abs(ratioCap - ratioRef)) / ratioRef).toFixed(2) },
    pixelsDifferents: diff,
    ecartPct: +pct.toFixed(2),
    ecartPctDeLEncre: +pctEncre.toFixed(2),
    seuil: SEUIL,
    ok: pct <= SEUIL,
  }
  console.log(JSON.stringify(rapport, null, 2))
  if (!rapport.ok) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
