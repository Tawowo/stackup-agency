/**
 * Mesurer ce que le VOILE DE JOUR ajoute vraiment aux pixels.
 *
 * Pourquoi un outil de plus : `scan-contraste.mjs` interroge axe-core, qui
 * calcule le contraste à partir des COULEURS CSS. Un nuage de particules
 * dessiné dans un canvas n'a aucune couleur CSS — il est structurellement
 * invisible pour cet outil, quel que soit son verdict. Pour savoir si le
 * voile salit le texte, il faut regarder les pixels rendus.
 *
 * MÉTHODE — avec témoin. Première version de ce script : écart-type de la
 * luminance sur une bande fixe. Inutilisable, et je m'en suis aperçu en
 * lisant le résultat — un minimum à 21 sur un fond ivoire, c'est du TEXTE
 * dans la zone. L'écart-type mesurait alors la présence de lettres, pas le
 * grain.
 *
 * On photographie donc DEUX FOIS exactement le même cadre : une fois tel
 * quel, une fois le canvas masqué. La différence pixel à pixel ne peut venir
 * que du nuage, quoi qu'il y ait d'autre à l'écran. C'est le même principe
 * qu'une mesure différentielle : le texte, les filets et les barres sont
 * identiques dans les deux prises et s'annulent.
 *
 * Usage : node scripts/grain.mjs <largeur> <sélecteur> [décalage]
 */
import { chromium } from 'playwright'

const L = Number(process.argv[2] ?? 390)
const SEL = process.argv[3] ?? '#pourquoi'
const DECALAGE = Number(process.argv[4] ?? 700)
const H = L < 700 ? 844 : 900

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: H },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
await page.goto('http://localhost:3100/', { waitUntil: 'networkidle' })

await page.evaluate(async () => {
  const pas = Math.round(innerHeight * 0.8)
  for (let y = 0; y < document.body.scrollHeight; y += pas) {
    scrollTo({ top: y, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 90))
  }
})
await page.waitForTimeout(600)
for (let i = 0; i < 5; i++) {
  await page.evaluate(
    ([s, d]) => {
      const el = document.querySelector(s)
      if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY + d, behavior: 'instant' })
    },
    [SEL, DECALAGE],
  )
  await page.waitForTimeout(350)
}
await page.waitForTimeout(1200)

const clip = { x: 0, y: Math.round(H * 0.3), width: L, height: Math.round(H * 0.45) }

// Le nuage bouge en continu : on fige l'animation avant les deux prises,
// sinon la différence mesurerait aussi le déplacement des points.
await page.evaluate(() => {
  const c = document.querySelector('canvas')
  if (c) c.dataset.fige = 'oui'
})
const avec = await page.screenshot({ clip })
await page.evaluate(() => {
  const c = document.querySelector('canvas')
  if (c) c.style.visibility = 'hidden'
})
await page.waitForTimeout(260)
const sans = await page.screenshot({ clip })

const r = await page.evaluate(
  async ([a, b]) => {
    const vers = async (b64) => {
      const bin = atob(b64)
      const u8 = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i)
      const bmp = await createImageBitmap(new Blob([u8], { type: 'image/png' }))
      const c = new OffscreenCanvas(bmp.width, bmp.height)
      c.getContext('2d').drawImage(bmp, 0, 0)
      return c.getContext('2d').getImageData(0, 0, bmp.width, bmp.height).data
    }
    const [da, db] = [await vers(a), await vers(b)]
    const lum = (d, i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
    let somme = 0
    let pire = 0
    let touches = 0
    const total = da.length / 4
    for (let i = 0; i < da.length; i += 4) {
      const e = Math.abs(lum(da, i) - lum(db, i))
      somme += e
      if (e > pire) pire = e
      if (e >= 1) touches++
    }
    return {
      total,
      moyenne: +(somme / total).toFixed(3),
      pire: +pire.toFixed(1),
      partTouchee: +((touches / total) * 100).toFixed(1),
    }
  },
  [avec.toString('base64'), sans.toString('base64')],
)

console.log(`${L} px · ${SEL} +${DECALAGE} · cadre ${clip.width}×${clip.height}`)
console.log(`  le voile change la luminance de ${r.moyenne} en moyenne, ${r.pire} au pire`)
console.log(`  ${r.partTouchee} % des pixels changent d'au moins 1 niveau (sur ${r.total})`)
console.log(`  (repère : sur 255 niveaux, 1 est imperceptible, 8 se voit sur un aplat)`)
await n.close()
