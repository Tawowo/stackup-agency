/**
 * BRIEFS DE CONTENU — un fichier par page à enrichir ou à renforcer (seo/content-briefs/<slug>.md), tiré de seo/keyword-map.csv.
 * Pages retenues : toutes les cibles dont au moins un cluster est « à enrichir » ou « à fusionner » (requêtes à absorber dans la page, jamais dans une page de plus).
 * Chaque brief donne : rôle de la page, requêtes à couvrir (par intention), état actuel (inventaire), consignes de rédaction et liens à poser.
 * Usage : node scripts/seo/content-briefs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, lireCsv } from './lib.mjs'

const lire = (f) => {
  const [h, ...b] = lireCsv(fs.readFileSync(path.join(RACINE, f), 'utf8'))
  return b.filter((r) => r.length > 3).map((r) => Object.fromEntries(h.map((c, i) => [c, r[i] ?? ''])))
}
const carte = lire('seo/keyword-map.csv')
const inv = new Map(lire('seo/inventory.csv').map((r) => [r.url, r]))
const parUrl = new Map()
for (const r of carte) {
  if (r.statut === 'existe' || !r.url_cible) continue
  ;(parUrl.get(r.url_cible) ?? parUrl.set(r.url_cible, []).get(r.url_cible)).push(r)
}
const dossier = path.join(RACINE, 'seo/content-briefs')
fs.rmSync(dossier, { recursive: true, force: true })
fs.mkdirSync(dossier, { recursive: true })
const famille = (u) => (u.startsWith('/blog/') ? 'article' : u.startsWith('/creation-site-internet/') ? 'métier' : u.startsWith('/zones-intervention') ? 'zone' : u.startsWith('/agence-web') ? 'ville' : u.startsWith('/solutions') ? 'solution' : u.startsWith('/comparatif') ? 'comparatif' : 'autre')
const CONSIGNES = {
  article: ['Ajouter un h2 par grande question regroupée ci-dessous, avec une réponse directe de 2 à 3 phrases en tête de section.', 'Sourcer chaque règle légale (service-public.fr, cnil.fr, economie.gouv.fr) ; ne citer aucune statistique sans source.', 'Terminer par un encadré « à retenir » et un lien vers l’outil ou la page de service le plus proche.'],
  métier: ['Ajouter les questions ci-dessous à la FAQ de la page (Q/R propres au métier, pas de reprise d’un autre métier).', 'Citer au moins un cas type fictif annoncé comme tel ; aucun chiffre client.', 'Lier vers 2 métiers voisins, 1 solution (module) et 1 article du cluster.'],
  zone: ['Citer les communes de la zone en contexte (distance, desserte, tissu économique réel) ; aucune statistique inventée.', 'Répondre à « comment travaille-t-on avec vous depuis cette commune » : rendez-vous sur place ou en visio.', 'Lier vers la ville pilier la plus proche et vers 3 métiers fréquents du secteur.'],
  ville: ['Compléter avec des éléments locaux vérifiables (secteurs d’activité réels, quartiers, marchés) ; aucun chiffre sans source.', 'Rappeler le positionnement exact : basé en Touraine, intervient sur place ou à distance.'],
  solution: ['Ajouter une section « ce que ce module remplace et ne remplace pas » factuelle, sans prix de tiers.'],
  comparatif: ['Tableau de critères vérifiables ; reconnaître où la solution tierce est préférable ; aucune donnée tarifaire de tiers.'],
  autre: ['Répondre à chaque question ci-dessous dans une section dédiée.'],
}
let n = 0
for (const [url, lignes] of [...parUrl].sort((a, b) => b[1].length - a[1].length)) {
  const slug = url.replace(/^\//, '').replace(/\//g, '--') || 'accueil'
  const i = inv.get(url)
  const f = famille(url)
  const requetes = lignes.flatMap((l) => [l.requete_principale, ...l.variantes.split(' | ').slice(0, 5)]).filter(Boolean)
  const intentions = [...new Set(lignes.map((l) => l.intention))].join(', ')
  const md = [
    `# Brief — ${url}`,
    '',
    `- **Type** : ${f} · **Mots actuels** : ${i?.mots_contenu ?? 'n.c.'} · **Liens entrants** : ${i?.liens_entrants ?? 'n.c.'}`,
    `- **Title actuel** : ${i?.title ?? 'n.c.'}`,
    `- **Intentions à servir** : ${intentions} · **Clusters** : ${lignes.length}`,
    '',
    '## Requêtes à absorber (échantillon)',
    ...[...new Set(requetes)].slice(0, 25).map((q) => `- ${q}`),
    '',
    '## Consignes',
    ...CONSIGNES[f].map((c) => `- ${c}`),
    '- Une seule page par intention : ces requêtes se traitent ici, pas dans une page de plus.',
    '- Ton : vouvoiement, direct ; prix par jetons `{{prix:…}}` uniquement ; aucune durée de livraison ni témoignage inventé.',
    '',
    '## Contrôle',
    '- `npm run seo:check` et `npm run seo:links` sans manquement ; relancer `scripts/seo/couverture.mjs` : la couverture de la requête principale doit dépasser 80 %.',
    '',
  ]
  fs.writeFileSync(path.join(dossier, `${slug}.md`), md.join('\n'))
  n++
}
console.log(`${n} briefs écrits dans seo/content-briefs/`)
