/**
 * OG + ICÔNES — l'image de partage (1200 × 630) et les icônes, depuis le logo
 * officiel uniquement (aucun pictogramme réinventé). Sortie : public/og.png,
 * src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (copie de l'ancien).
 */
import sharp from 'sharp'
import { copyFileSync } from 'node:fs'
const NAVY = '#0B1E36'
const logo = await sharp('public/Logo_Stackup-Agency.png').resize({ width: 470 }).png().toBuffer()
const lm = await sharp(logo).metadata()
const plaque = await sharp({ create: { width: lm.width + 64, height: lm.height + 48, channels: 4, background: '#FFFFFF' } })
  .composite([{ input: logo, left: 32, top: 24 }])
  .png()
  .toBuffer()
const texte = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect x="80" y="430" width="120" height="6" fill="#F69106"/>
  <text x="80" y="500" font-family="Inter Display" font-weight="800" font-size="58" fill="#FFFDF9">Sites et outils sur mesure.</text>
  <text x="80" y="552" font-family="Inter" font-size="28" fill="#8A97A8">Agence web à Tours · une démo avant de signer</text>
</svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 4, background: NAVY } })
  .composite([{ input: plaque, left: 80, top: 110 }, { input: texte, left: 0, top: 0 }])
  .png()
  .toFile('public/og.png')
const icone = (taille, fond) =>
  sharp('public/logo_Stackup-Agency_seul.png')
    .resize({ width: Math.round(taille * 0.72), height: Math.round(taille * 0.72), fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
    .then((b) => sharp({ create: { width: taille, height: taille, channels: 4, background: fond } }).composite([{ input: b, gravity: 'center' }]).png())
await (await icone(512, '#FFFFFF')).toFile('src/app/icon.png')
await (await icone(180, '#FFFFFF')).toFile('src/app/apple-icon.png')
copyFileSync('ancien/src/app/favicon.ico', 'src/app/favicon.ico')
console.log('✓ og.png, icon.png, apple-icon.png, favicon.ico')
