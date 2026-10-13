/**
 * PORTRAITS — prépare les images du fondateur aux couleurs de la charte.
 *
 * 1. La photo d'atelier (public/images/portrait-fondateur.webp, noir et blanc) →
 *    bichromie navy / ivoire chaud : public/images/atelier-nuit-{720,1200}.avif.
 * 2. Le portrait de face, s'il est posé en public/images/source/matheo-reboul.(jpg|png) :
 *    le fond clair uni est détouré (remplissage depuis les bords, tolérance sur
 *    la luminance et la saturation), puis recomposé sur deux fonds :
 *    - nuit : dégradé navy #0B1E36 → #102A4A et halo ambre derrière l'épaule ;
 *    - ivoire : #F3EFE6 → #FFFDF9, halo ambre très léger.
 *    Sorties : public/images/matheo-reboul-{nuit,ivoire}-{640,1080}.avif.
 * Usage : node scripts/portrait.mjs
 */
import sharp from 'sharp'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('public/images', { recursive: true })

async function atelier() {
  const src = 'public/images/portrait-fondateur.webp'
  if (!existsSync(src)) return
  for (const w of [720, 1200]) {
    const { data, info } = await sharp(src).resize({ width: w }).greyscale().raw().toBuffer({ resolveWithObject: true })
    const out = Buffer.alloc(info.width * info.height * 3)
    // Bichromie : ombres navy profond, lumières ivoire chaud, une pointe d'ambre dans les hautes lumières.
    const ombre = [11, 30, 54]
    const lumiere = [255, 244, 226]
    for (let i = 0; i < info.width * info.height; i++) {
      const v = data[i] / 255
      const t = Math.pow(v, 0.85)
      const ambre = Math.max(0, t - 0.7) * 0.6
      out[i * 3] = Math.min(255, ombre[0] + (lumiere[0] - ombre[0]) * t + 246 * ambre * 0.3)
      out[i * 3 + 1] = Math.min(255, ombre[1] + (lumiere[1] - ombre[1]) * t + 145 * ambre * 0.3)
      out[i * 3 + 2] = Math.min(255, ombre[2] + (lumiere[2] - ombre[2]) * t)
    }
    await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).avif({ quality: 58 }).toFile(`public/images/atelier-nuit-${w}.avif`)
    console.log('✓ atelier-nuit', w)
  }
}

function fond(w, h, nuit) {
  const buf = Buffer.alloc(w * h * 3)
  const haut = nuit ? [16, 42, 74] : [255, 253, 249]
  const bas = nuit ? [11, 30, 54] : [243, 239, 230]
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const t = y / h
      const dx = (x - w * 0.72) / w
      const dy = (y - h * 0.62) / h
      const halo = Math.exp(-(dx * dx + dy * dy) * 6) * (nuit ? 0.35 : 0.12)
      const o = (y * w + x) * 3
      for (let c = 0; c < 3; c++) {
        const base = haut[c] + (bas[c] - haut[c]) * t
        const ambre = [246, 145, 6][c]
        buf[o + c] = Math.round(base + (ambre - base) * halo)
      }
    }
  return buf
}

async function face() {
  const src = ['public/images/source/matheo-reboul.jpg', 'public/images/source/matheo-reboul.jpeg', 'public/images/source/matheo-reboul.png'].find(existsSync)
  if (!src) {
    console.log('— pas de portrait de face (public/images/source/matheo-reboul.jpg) : étape sautée')
    return
  }
  for (const w of [640, 1080]) {
    const img = sharp(src).resize({ width: w }).removeAlpha()
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
    const W = info.width
    const H = info.height
    // Fond : clair, peu saturé, connexe aux bords (remplissage par file).
    const fondPx = (i) => {
      const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2]
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      return max > 175 && max - min < 26
    }
    const masque = new Uint8Array(W * H)
    const file = []
    for (let x = 0; x < W; x++) file.push(x, (H - 1) * W + x)
    for (let y = 0; y < H; y++) file.push(y * W, y * W + W - 1)
    while (file.length) {
      const i = file.pop()
      if (masque[i] || !fondPx(i)) continue
      masque[i] = 1
      const x = i % W, y = (i / W) | 0
      if (x > 0) file.push(i - 1)
      if (x < W - 1) file.push(i + 1)
      if (y > 0) file.push(i - W)
      if (y < H - 1) file.push(i + W)
    }
    // Bord adouci (flou du masque).
    const alpha = await sharp(Buffer.from(masque.map((m) => (m ? 0 : 255))), { raw: { width: W, height: H, channels: 1 } }).blur(1.2).raw().toBuffer()
    for (const nuit of [true, false]) {
      const f = fond(W, H, nuit)
      const out = Buffer.alloc(W * H * 3)
      for (let i = 0; i < W * H; i++) {
        const a = alpha[i] / 255
        for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(data[i * 3 + c] * a + f[i * 3 + c] * (1 - a))
      }
      const nom = `public/images/matheo-reboul-${nuit ? 'nuit' : 'ivoire'}-${w}.avif`
      await sharp(out, { raw: { width: W, height: H, channels: 3 } }).avif({ quality: 60 }).toFile(nom)
      console.log('✓', nom)
    }
  }
}

await atelier()
await face()
// Le site lit ce fichier pour savoir quel portrait afficher.
const aFace = existsSync('public/images/matheo-reboul-nuit-1080.avif')
writeFileSync(
  'src/config/portrait.ts',
  `/* GÉNÉRÉ PAR scripts/portrait.mjs */\nexport const PORTRAIT_FACE = ${aFace}\n`,
)
