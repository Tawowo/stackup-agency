import test from 'node:test'
import assert from 'node:assert/strict'
import { calculer, categoriePour, echeances, prixPack, simulationVide } from '../src/domain/clubs/calcul.ts'
import { PRICING, categorieDe } from '../src/data/offre-clubs/pricing.ts'

const sim = (o = {}) => ({ ...simulationVide(), ...o, licencies: { actuelle: 220, precedente: 0, avantPrecedente: 0, ...(o.licencies ?? {}) } })

test('catégories : bornes de licenciés', () => {
  const att = { 1: 'mini', 49: 'mini', 50: 'petit', 149: 'petit', 150: 'moyen', 299: 'moyen', 300: 'grand', 499: 'grand', 500: 'tres-grand', 1800: 'tres-grand' }
  for (const [n, id] of Object.entries(att)) assert.equal(categoriePour(Number(n)).id, id, `${n} licenciés`)
})

test('pack site + logiciel : −15 %, mise en place à la dizaine, abonnement à l’euro (valeurs du tableau)', () => {
  const att = { mini: [1000, 37], petit: [1510, 51], moyen: [2020, 63], grand: [2620, 80], 'tres-grand': [3300, 105] }
  for (const [id, [mep, abo]] of Object.entries(att)) {
    const p = prixPack(categorieDe(id))
    assert.equal(p.miseEnPlace, mep, `${id} mise en place`)
    assert.equal(p.mensuel, abo, `${id} abonnement`)
  }
})

test('formules site seul et logiciel seul : prix du tableau', () => {
  const r1 = calculer(sim({ formule: 'site' }))
  assert.equal(r1.miseEnPlace.total, 1190)
  assert.equal(r1.abonnement.mensuel, 29)
  const r2 = calculer(sim({ formule: 'logiciel' }))
  assert.equal(r2.miseEnPlace.total, 1190)
  assert.equal(r2.abonnement.mensuel, 45)
  const r3 = calculer(sim({ formule: 'logiciel', licencies: { actuelle: 320 } }))
  assert.equal(r3.miseEnPlace.total, 1590)
  assert.equal(r3.abonnement.mensuel, 59)
})

test('club de 220 licenciés, pack : 2 020 € de mise en place, 63 €/mois, premières échéances et coût par licencié', () => {
  const r = calculer(sim())
  assert.equal(r.categorie.id, 'moyen')
  assert.equal(r.miseEnPlace.total, 2020)
  assert.equal(r.abonnement.mensuel, 63)
  assert.deepEqual(r.premiersMois, [2020 + 63, 63, 63])
  assert.equal(r.premiereAnnee, 2020 + 63 * 12)
  assert.equal(r.anneesSuivantes, 63 * 12)
  assert.equal(r.coutParLicencieAn, Math.round(((63 * 12) / 220) * 100) / 100)
  assert.equal(r.accompagnement.incluses, 6)
  assert.equal(r.stockageGo, 10)
})

test('mise en place en 3 fois : échéances, dernière absorbe l’arrondi, premiers mois', () => {
  assert.deepEqual(echeances(2020, 3), [673, 673, 674])
  assert.deepEqual(echeances(1000, 3), [333, 333, 334])
  assert.deepEqual(echeances(900, 3), [300, 300, 300])
  const r = calculer(sim({ paiement: { abonnement: 'mensuel', miseEnPlace: 'trois-fois' } }))
  assert.deepEqual(r.miseEnPlace.echeances, [673, 673, 674])
  assert.deepEqual(r.premiersMois, [673 + 63, 673 + 63, 674 + 63])
  assert.equal(r.miseEnPlace.echeances.reduce((a, b) => a + b, 0), r.miseEnPlace.total)
})

test('abonnement annuel : −10 %, payé le premier mois', () => {
  const r = calculer(sim({ paiement: { abonnement: 'annuel', miseEnPlace: 'une-fois' } }))
  assert.equal(r.abonnement.annuel, Math.round(63 * 12 * 0.9))
  assert.equal(r.abonnement.economieAnnuelle, 63 * 12 - Math.round(63 * 12 * 0.9))
  assert.deepEqual(r.premiersMois, [2020 + r.abonnement.annuel, 0, 0])
  assert.equal(r.premiereAnnee, 2020 + r.abonnement.annuel)
  assert.equal(r.anneesSuivantes, r.abonnement.annuel)
  const r3 = calculer(sim({ paiement: { abonnement: 'annuel', miseEnPlace: 'trois-fois' } }))
  assert.deepEqual(r3.premiersMois, [673 + r3.abonnement.annuel, 673, 674])
})

test('options : prix, quantités par page, cumul de la mise en place et de l’abonnement', () => {
  const r = calculer(sim({ options: { 'reservation-courts': 1, 'page-supplementaire': 4, 'redaction-page': 2 } }))
  assert.equal(r.miseEnPlace.options, 290 + 4 * 50 + 2 * 60)
  assert.equal(r.abonnement.mensuel, 63 + 12)
  assert.equal(r.miseEnPlace.total, 2020 + 290 + 200 + 120)
})

test('conditions : la commande vocale exige l’assistant IA ; les options « avec le logiciel » disparaissent avec le site seul', () => {
  const sans = calculer(sim({ options: { 'commande-vocale': 1 } }))
  assert.equal(sans.miseEnPlace.options, 0)
  assert.ok(sans.avertissements.some((a) => a.includes('Commande vocale')))
  const avec = calculer(sim({ options: { 'assistant-ia': 1, 'commande-vocale': 1 } }))
  assert.equal(avec.miseEnPlace.options, 190 + 90)
  assert.equal(avec.abonnement.mensuel, 63 + 19 + 9)
  const siteSeul = calculer(sim({ formule: 'site', options: { 'assistant-ia': 1, 'accueil-3d': 1 } }))
  assert.equal(siteSeul.miseEnPlace.options, 900)
  assert.ok(siteSeul.avertissements.some((a) => a.includes('Assistant IA')))
  const logicielSeul = calculer(sim({ formule: 'logiciel', options: { 'accueil-3d': 1, 'referencement-local': 1 } }))
  assert.equal(logicielSeul.miseEnPlace.options, 0)
})

test('référencement local et régional s’excluent : le premier l’emporte', () => {
  const r = calculer(sim({ options: { 'referencement-local': 1, 'referencement-regional': 1 } }))
  assert.equal(r.miseEnPlace.options, 350)
  assert.equal(r.abonnement.mensuel, 63 + 60)
  assert.equal(r.avertissements.length, 1)
})

test('accompagnement : heures comprises, puis 40 € l’heure par tranche de 30 minutes', () => {
  const dans = calculer(sim({ accompagnement: { heures: 6, rdv: 'visio', distanceKm: 0 } }))
  assert.equal(dans.accompagnement.coutSupplementaire, 0)
  const hors = calculer(sim({ accompagnement: { heures: 8.2, rdv: 'visio', distanceKm: 0 } }))
  assert.equal(hors.accompagnement.supplementaires, 2.5)
  assert.equal(hors.accompagnement.coutSupplementaire, 100)
  assert.equal(hors.miseEnPlace.total, 2020 + 100)
})

test('déplacement : gratuit jusqu’à 30 km, au-delà visio ou devis', () => {
  assert.equal(calculer(sim({ accompagnement: { heures: 0, rdv: 'presentiel', distanceKm: 30 } })).devis.requis, false)
  const loin = calculer(sim({ accompagnement: { heures: 0, rdv: 'presentiel', distanceKm: 45 } }))
  assert.equal(loin.deplacement.gratuit, false)
  assert.equal(loin.devis.requis, true)
  assert.equal(calculer(sim({ accompagnement: { heures: 0, rdv: 'visio', distanceKm: 300 } })).devis.requis, false)
})

test('hors catalogue : devis sur mesure', () => {
  const r = calculer(sim({ horsCatalogue: ['connexion à un autre logiciel'] }))
  assert.equal(r.devis.requis, true)
})

test('baisse sensible : saison en cours sous 90 % de la moyenne des trois saisons', () => {
  assert.equal(calculer(sim({ licencies: { actuelle: 180, precedente: 230, avantPrecedente: 240 } })).baisseSensible, true)
  assert.equal(calculer(sim({ licencies: { actuelle: 220, precedente: 230, avantPrecedente: 225 } })).baisseSensible, false)
  assert.equal(calculer(sim({ licencies: { actuelle: 180 } })).baisseSensible, false)
})

test('les données de prix sont complètes et valides', () => {
  assert.equal(PRICING.categories.length, 5)
  assert.equal(PRICING.packDiscount, 0.15)
  assert.equal(PRICING.annualDiscount, 0.1)
  assert.equal(PRICING.miseEnPlaceEnFois, 3)
  assert.ok(PRICING.options.length >= 19)
  const ids = new Set(PRICING.options.map((o) => o.id))
  assert.equal(ids.size, PRICING.options.length)
  for (const o of PRICING.options) assert.ok(o.requiertOption === null || ids.has(o.requiertOption))
})

import { decoder, encoder } from '../src/domain/clubs/etat.ts'

test('URL du simulateur : aller-retour, valeurs invalides ignorées', () => {
  const s = sim({ club: { nom: 'TC Test', commune: 'Tours', departement: 'Indre-et-Loire' }, formule: 'site', options: { 'reservation-courts': 1, 'page-supplementaire': 3 }, paiement: { abonnement: 'annuel', miseEnPlace: 'trois-fois' }, accompagnement: { heures: 4, rdv: 'visio', distanceKm: 40 }, horsCatalogue: ['traduction'] })
  const retour = decoder(encoder(s))
  assert.deepEqual(retour, s)
  const sale = decoder('l=abc&f=zzz&o=inconnu:5,reservation-courts&k=-4&x=pirate')
  assert.equal(sale.licencies.actuelle, 0)
  assert.equal(sale.formule, 'pack')
  assert.deepEqual(sale.options, { 'reservation-courts': 1 })
  assert.deepEqual(sale.horsCatalogue, [])
})

import { jetons } from '../src/lib/jetons.ts'

test('jetons {{club:…}} : lus dans pricing.ts, jamais écrits à la main', () => {
  assert.equal(jetons('{{club:abo-moyen-pack}}'), '63')
  assert.equal(jetons('{{club:mep-tres-grand-pack}}'), '3 300')
  assert.equal(jetons('{{club:mep-mini-site}}'), '590')
  assert.equal(jetons('{{club:opt-reservation-courts-mensuel}}'), '12')
  assert.equal(jetons('{{club:remise-pack}} % et {{club:fois}} fois, {{club:km}} km'), '15 % et 3 fois, 30 km')
  assert.equal(jetons('{{club:heures-grand-logiciel}} h'), '5 h')
  assert.equal(jetons('{{club:inconnu}}'), '{{club:inconnu}}')
})

test('jeton {{nom:produit}}', () => {
  assert.equal(jetons('Bienvenue sur {{nom:produit}}'), 'Bienvenue sur Stackup Club')
})
