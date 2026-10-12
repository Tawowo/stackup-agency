/**
 * Y a-t-il un défilement horizontal, et de combien ?
 *
 * On ne mesure PAS `scrollWidth` : il fluctue d'une image à l'autre pendant
 * les animations et désigne des éléments pourtant découpés. On mesure ce que
 * le visiteur peut réellement faire — tenter d'aller à droite, et regarder où
 * l'on atterrit — à seize hauteurs réparties sur toute la page.
 *
 * Usage : node scripts/defilement-horizontal.mjs [largeur]
 */
import { chromium } from 'playwright'
const L = Number(process.argv[2] ?? 1440)
const n = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-sandbox']})
const p = await n.newPage({viewport:{width:L,height:900}})
await p.goto('http://127.0.0.1:3100/',{waitUntil:'networkidle'})
await p.evaluate(()=>{try{localStorage.setItem('cookie-consent','accepted')}catch{}})
await p.reload({waitUntil:'networkidle'})
await new Promise(r=>setTimeout(r,3000))
// `scroll-behavior: smooth` est actif sur le site : lire scrollX juste après
// un scrollTo renvoyait une valeur EN COURS D'ANIMATION, soit la moitié du
// trajet — d'où un « défilement horizontal » fantôme de 50 % de la fenêtre,
// identique à toutes les largeurs. On neutralise le lissage pour mesurer.
await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
const H = await p.evaluate(()=>document.body.scrollHeight)
let pireX = 0, pireY = 0
for (let i=0;i<16;i++){
  const y = Math.round((H-900)*i/15)
  await p.evaluate(v=>window.scrollTo({top:v,behavior:'instant'}), y)
  await new Promise(r=>setTimeout(r,420))
  const x = await p.evaluate(() => {
    const y0 = window.scrollY
    window.scrollTo({ left: 9999, top: y0, behavior: 'instant' })
    return window.scrollX
  })
  await p.evaluate((y0) => window.scrollTo({ left: 0, top: y0, behavior: 'instant' }), y)
  if (x > pireX) { pireX = x; pireY = y }
}
console.log(`${L}px → défilement horizontal réellement possible : ${pireX} px${pireX ? ` (à y=${pireY})` : ''} ${pireX ? '⚠' : '✓'}`)
await n.close()
