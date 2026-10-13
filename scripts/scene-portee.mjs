/* LA SCÈNE DESSINE-T-ELLE SUR CETTE ROUTE ?
   On lit le compteur du renderer (window.__SU_SCENE), pas des pixels :
   voir le commentaire du témoin dans src/webgl/Scene.tsx. */
import { chromium } from 'playwright'

const ROUTES = [
  '/', '/faq', '/tarifs', '/contact', '/a-propos', '/services', '/realisations',
  '/blog', '/parrainage', '/devis', '/configurateur', '/solutions',
  '/services/site-vitrine', '/services-locaux/creation-site-restaurant',
  '/cgv', '/mentions-legales', '/plan-du-site', '/zones-intervention',
  '/blog/hebergement-web-choisir', '/realisations/portfolio-photographe',
]
const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
let fuites = 0
for (const l of [1440, 390]) {
  console.log('\n═══ ' + l + ' ═══')
  for (const r of ROUTES) {
    const p = await b.newPage({ viewport: { width: l, height: l === 390 ? 844 : 900 } })
    let t = null
    try {
      await p.goto('http://localhost:3100' + r, { waitUntil: 'networkidle', timeout: 25000 })
      await p.waitForTimeout(2200)
      t = await p.evaluate(() => window.__SU_SCENE ?? null)
    } catch (e) { console.log('  !!  ' + r + ' — ' + e.message.split('\n')[0]) }
    const dessine = !!t && t.triangles > 0
    const attendu = r === '/'
    const ok = dessine === attendu
    if (!ok) fuites++
    console.log(`${ok ? '  ok ' : 'FUITE'}  ${r.padEnd(44)} ${t ? `tri=${t.triangles} appels=${t.appels} état=${t.etat}` : 'pas de scène'}`)
    await p.close()
  }
}
await b.close()
console.log('\nfuites : ' + fuites)
