/* LA SCÈNE DESSINE-T-ELLE SUR CETTE ROUTE ?
   On lit le compteur du renderer (window.__SU_SCENE), pas des pixels :
   voir le commentaire du témoin dans src/webgl/Scene.tsx. */
import { chromium } from 'playwright'

/* CE QUI DOIT PEINDRE, ET CE QUI NE DOIT PAS.
 *
 * Au départ, seule la page d'accueil devait dessiner : la scène n'existait
 * que là. Depuis la TRAVERSÉE (dossier §11.6), des pages intérieures
 * DÉCLARENT un état — les tarifs un plan coté, une fiche projet la bande en
 * ombre teintée, un article la bande repliée en signature.
 *
 * L'attendu est donc par route, et non « seule l'accueil ». Un script dont
 * l'attendu n'évolue pas avec le code finit par crier au loup à chaque
 * passage, et on cesse de le lire — c'est la pire fin pour une vérification.
 *
 * Le portrait a son propre attendu : les signatures des pages intérieures
 * sont retirées sous 900 px, où un titre de deux lignes occupe toute la
 * largeur (voir le bloc des places dans `stackup.css`).
 */
const ROUTES = [
  // route, doit peindre en paysage, doit peindre en portrait
  ['/', true, true],
  ['/tarifs', true, false],
  ['/blog/hebergement-web-choisir', true, true],
  ['/realisations/demo-videaste', true, false],
  ['/faq', false, false],
  ['/contact', false, false],
  ['/a-propos', false, false],
  ['/services', false, false],
  ['/realisations', false, false],
  ['/blog', false, false],
  ['/parrainage', false, false],
  ['/devis', false, false],
  ['/configurateur', false, false],
  ['/solutions', false, false],
  ['/services/site-vitrine', false, false],
  ['/services-locaux/creation-site-restaurant', false, false],
  ['/cgv', false, false],
  ['/mentions-legales', false, false],
  ['/plan-du-site', false, false],
  ['/zones-intervention', false, false],
]
const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
let fuites = 0
for (const l of [1440, 390]) {
  console.log('\n═══ ' + l + ' ═══')
  for (const [r, enPaysage, enPortrait] of ROUTES) {
    const p = await b.newPage({ viewport: { width: l, height: l === 390 ? 844 : 900 } })
    let t = null
    let code = 0
    try {
      const rep = await p.goto('http://localhost:3100' + r, { waitUntil: 'networkidle', timeout: 25000 })
      code = rep?.status() ?? 0
      await p.waitForTimeout(2200)
      t = await p.evaluate(() => window.__SU_SCENE ?? null)
    } catch (e) { console.log('  !!  ' + r + ' — ' + e.message.split('\n')[0]) }
    const dessine = !!t && t.triangles > 0
    const attendu = l === 390 ? enPortrait : enPaysage
    /* La route répond-elle seulement ? Ce contrôle a été ajouté après coup :
       la liste contenait `/realisations/portfolio-photographe`, qui n'existe
       pas. Le script criait à la fuite sur une page 404 — une heure
       d'enquête sur un défaut imaginaire. Une route morte doit se dire comme
       telle, pas se déguiser en anomalie de rendu. */
    const ok = code === 200 && dessine === attendu
    if (!ok) fuites++
    const verdict = code !== 200 ? `HTTP ${code}` : ok ? '  ok ' : dessine ? 'FUITE' : 'ABSENT'
    console.log(`${verdict}  ${r.padEnd(44)} ${t ? `tri=${t.triangles} état=${t.etat}` : 'pas de scène'}`)
    await p.close()
  }
}
await b.close()
console.log('\nfuites : ' + fuites)
