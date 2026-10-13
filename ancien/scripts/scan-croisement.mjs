/**
 * Balayage FIN du franchissement.
 *
 * Le relevé à 11 paliers passe au-dessus de la bascule : elle ne dure que
 * quelques centaines de pixels. Ce script la traverse pas à pas et mesure le
 * contraste de CHAQUE texte réellement visible — pas seulement du premier
 * titre trouvé. C'est là, et nulle part ailleurs, que le contraste peut
 * s'effondrer.
 *
 * Usage : node scripts/scan-croisement.mjs [largeur] [debut] [fin] [pas]
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const LARGEUR = Number(process.argv[2] ?? 1440)
const HAUTEUR = LARGEUR < 700 ? 844 : 900
const PAS = Number(process.argv[5] ?? 60)

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.reload({ waitUntil: 'networkidle' })
await dormir(3500)

const hauteur = await page.evaluate(() => document.body.scrollHeight)
const debut = Number(process.argv[3] ?? 700)
const fin = Number(process.argv[4] ?? Math.min(2600, hauteur - HAUTEUR))

await page.addScriptTag({
  content: `
    window.__mesure = () => {
      const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
      const lire = (css) => {
        const m = String(css).match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?/)
        return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null
      }
      const lum = ([r, g, b]) => 0.2126*lin(r/255) + 0.7152*lin(g/255) + 0.0722*lin(b/255)
      const ratio = (a, b) => {
        const l1 = lum(a), l2 = lum(b)
        return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)
      }
      // Fond effectif : on remonte jusqu'au premier ancêtre réellement opaque.
      const fondDe = (el) => {
        for (let n = el; n; n = n.parentElement) {
          const c = lire(getComputedStyle(n).backgroundColor)
          if (c && c[3] > 0.92) return c
        }
        return lire(getComputedStyle(document.body).backgroundColor)
      }
      const opaciteEffective = (el) => {
        let o = 1
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
          o *= Number(getComputedStyle(n).opacity)
          if (o < 0.001) break
        }
        return o
      }
      const resultats = []
      const cibles = document.querySelectorAll('h1,h2,h3,p,li,a,span,.su-seuil__mot')
      for (const el of cibles) {
        if (!el.textContent || !el.textContent.trim()) continue
        if (el.querySelector('h1,h2,h3,p,li,span')) continue
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) continue
        if (r.width < 4 || r.height < 4) continue
        if (opaciteEffective(el) <= 0.06) continue
        const st = getComputedStyle(el)
        // Texte peint par background-clip:text : sa couleur est
        // transparente, et color ne dit rien de ce qui est à l'écran.
        // On ne devine pas un chiffre — on passe. Inventer une valeur ici
        // produirait un faux défaut, et masquerait les vrais.
        const remplissage = st.webkitTextFillColor || st.color
        if (/transparent|rgba?\\([^)]*,\\s*0\\s*\\)/.test(remplissage)) continue
        const t = lire(remplissage)
        const f = fondDe(el)
        if (!t || !f) continue
        // Seuil WCAG selon la taille réelle : 3:1 pour du grand texte
        // (≥ 24 px, ou ≥ 18,66 px en graisse ≥ 700), 4,5:1 sinon.
        // Sans cette distinction, l'outil signalait comme défaut un « × » de
        // 40 px en graisse 800 à 3,14:1 — parfaitement conforme.
        const px = parseFloat(st.fontSize)
        const gras = parseInt(st.fontWeight, 10) >= 700
        const seuil = px >= 24 || (px >= 18.66 && gras) ? 3 : 4.5
        const c = Math.round(ratio(t, f) * 100) / 100
        resultats.push({
          texte: el.textContent.trim().slice(0, 36),
          c,
          seuil,
          // Marge au seuil : c'est elle qu'on classe, pas le ratio brut.
          marge: Math.round((c - seuil) * 100) / 100,
        })
      }
      return {
        nuit: Number(getComputedStyle(document.documentElement).getPropertyValue('--su-nuit')) || 0,
        pire: resultats.length ? resultats.reduce((a, b) => (a.marge < b.marge ? a : b)) : null,
        nombre: resultats.length,
      }
    }
  `,
})

console.log(`balayage ${debut} → ${fin} px, pas de ${PAS}`)
let pire = { c: Infinity, marge: Infinity }
const releves = []
for (let y = debut; y <= fin; y += PAS) {
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
  // 700 ms : le moteur lisse ses valeurs vers leur cible, et le lecteur qui
  // s'arrête de défiler voit cet état-là. Mesurer plus tôt reviendrait à
  // juger une image que personne ne regarde.
  await dormir(700)
  const m = await page.evaluate(() => window.__mesure())
  releves.push({ y, ...m })
  if (m.pire && m.pire.marge < (pire.marge ?? Infinity)) pire = { ...m.pire, y, nuit: m.nuit }
  const drapeau = m.pire && m.pire.marge < 0 ? '⚠' : ' '
  console.log(
    `  y=${String(y).padStart(5)} nuit=${m.nuit.toFixed(3)} · ${String(m.nombre).padStart(3)} textes · pire ${m.pire ? m.pire.c.toFixed(2) : 'n/a'}:1 (seuil ${m.pire ? m.pire.seuil : '—'}) ${drapeau} ${m.pire ? '« ' + m.pire.texte + ' »' : ''}`,
  )
}

console.log(
  `\npire marge au seuil sur tout le balayage : ${
    pire.c === Infinity ? 'n/a' : `${pire.c.toFixed(2)}:1 pour un seuil de ${pire.seuil}:1`
  }`,
)
if (pire.c !== Infinity && pire.marge < 0) {
  console.log(`  à y=${pire.y}, nuit=${pire.nuit.toFixed(3)} · « ${pire.texte} »`)
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), pire.y)
  await dormir(700)
  mkdirSync('docs/passage', { recursive: true })
  await page.screenshot({ path: `docs/passage/croisement-pire-${LARGEUR}.png` })
  console.log(`  → docs/passage/croisement-pire-${LARGEUR}.png`)
}
writeFileSync(`docs/passage/croisement-${LARGEUR}.json`, JSON.stringify({ releves, pire }, null, 2))
await n.close()
process.exit(pire.marge >= 0 ? 0 : 1)
