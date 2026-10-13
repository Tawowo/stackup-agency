/**
 * LES BUDGETS DE PERFORMANCE DU DOSSIER (§16.3), MESURÉS.
 *
 * Le critère d'acceptation §17.7 n° 7 demande que les budgets soient tenus.
 * Ils n'avaient jamais été mesurés : « le build passe » ne dit rien du temps
 * que met un titre à s'afficher sur un téléphone.
 *
 * CE QUE CE SCRIPT MESURE ET CE QU'IL NE MESURE PAS.
 *
 * Il tourne sur SwiftShader, un rendu logiciel sans GPU. Le dossier le dit
 * lui-même (§17.5) : « SwiftShader ne reflète pas un vrai GPU — probabilité
 * CERTAINE ». Les chiffres de rendu 3D sont donc un plancher, pas une
 * prévision : une vraie machine fera mieux. En revanche, le poids du
 * JavaScript, le CLS et le LCP du TITRE — qui est du HTML, pas du canvas —
 * sont mesurés dans des conditions comparables à un téléphone, parce que
 * Lighthouse applique son propre bridage réseau et processeur.
 *
 * Les seuils sont ceux du tableau 16.3, recopiés, avec la colonne
 * « objectif » comme avertissement et la colonne « plafond » comme échec.
 *
 * CE QU'IL FAUT SAVOIR AVANT DE LIRE LE LCP D'ICI.
 *
 * Lighthouse applique son bridage simulé — processeur divisé par quatre,
 * réseau 4G lente — PAR-DESSUS une machine qui est déjà un conteneur
 * partagé. Les deux se cumulent, et le LCP qui en sort est pessimiste d'un
 * facteur qu'on ne connaît pas. Deux passages du même build donnent ici des
 * TBT allant du simple au triple.
 *
 * Ce qui se lit malgré tout sans réserve :
 *   — le POIDS transféré, qui ne dépend d'aucune machine ;
 *   — le CLS, qui mesure un décalage de mise en page, pas une vitesse ;
 *   — le temps de réponse du serveur.
 * Le LCP et le TBT d'ici servent à comparer deux états du MÊME code dans la
 * même session, pas à juger ce que verra un visiteur. Le dossier l'avait
 * prévu (§17.5) : la mesure doit être refaite sur le déploiement réel.
 */
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.argv[2] ?? 'http://localhost:3100'
const ROUTES = ['/', '/tarifs', '/realisations', '/blog', '/contact']

/* Tableau 16.3. `plafond` fait échouer, `objectif` avertit seulement. */
const BUDGETS = {
  'largest-contentful-paint': { nom: 'LCP (mobile throttlé)', plafond: 2500, objectif: 2000, unite: 'ms' },
  'cumulative-layout-shift': { nom: 'CLS', plafond: 0.05, objectif: 0.05, unite: '' },
  'total-blocking-time': { nom: 'TBT (proxy d’INP)', plafond: 200, objectif: 200, unite: 'ms' },
}

mkdirSync('docs/qa', { recursive: true })
const chrome = await launch({
  chromePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--use-gl=swiftshader'],
})

const resultats = []
let echecs = 0

for (const route of ROUTES) {
  const r = await lighthouse(
    BASE + route,
    { port: chrome.port, output: 'json', logLevel: 'error' },
    // Le préréglage mobile applique le bridage : c'est la condition que le
    // dossier nomme, pas un chargement de bureau en fibre.
    { extends: 'lighthouse:default', settings: { formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2 } } },
  )
  const a = r.lhr.audits
  const ligne = { route, perf: Math.round((r.lhr.categories.performance?.score ?? 0) * 100), mesures: {} }

  for (const [cle, b] of Object.entries(BUDGETS)) {
    const v = a[cle]?.numericValue
    if (v === undefined) continue
    const depasse = v > b.plafond
    if (depasse) echecs++
    ligne.mesures[cle] = { valeur: Math.round(v * 1000) / 1000, plafond: b.plafond, ok: !depasse }
  }

  // Poids du JavaScript réellement transféré.
  const js = (a['network-requests']?.details?.items ?? [])
    .filter((i) => (i.mimeType ?? '').includes('javascript'))
    .reduce((n, i) => n + (i.transferSize ?? 0), 0)
  ligne.jsKo = Math.round(js / 1024)

  resultats.push(ligne)
  const etat = Object.values(ligne.mesures).every((m) => m.ok) ? '  ok ' : 'ÉCHEC'
  const d = Object.entries(ligne.mesures)
    .map(([c, m]) => `${BUDGETS[c].nom.split(' ')[0]}=${m.valeur}${BUDGETS[c].unite}${m.ok ? '' : ' ✗'}`)
    .join('  ')
  console.log(`${etat}  ${route.padEnd(16)} perf=${ligne.perf}  ${d}  js=${ligne.jsKo} ko`)
}

await chrome.kill()
writeFileSync('docs/qa/budgets.json', JSON.stringify({ date: new Date().toISOString(), base: BASE, resultats }, null, 2))
console.log(`\n→ docs/qa/budgets.json`)
console.log(echecs === 0 ? '✓ tous les budgets 16.3 sont tenus' : `✗ ${echecs} dépassement(s) de plafond`)
process.exit(echecs === 0 ? 0 : 1)
