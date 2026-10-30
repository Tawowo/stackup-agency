import test from 'node:test'
import assert from 'node:assert/strict'
import { CATEGORIES, PRICING, categorieDe, coutParLicencieAn, economiePack, tarif } from '../src/data/offre-clubs/pricing.ts'
import { SIMULATION_DEFAUT, echeances, optionDisponible, simuler } from '../src/domain/clubs/simulation.ts'
import { ecrireEtat, lireEtat } from '../src/domain/clubs/etat.ts'
import { jetons } from '../src/lib/jetons.ts'
import { PricingSchema } from '../src/data/offre-clubs/pricing.schema.ts'

const entree = (x = {}) => ({ ...SIMULATION_DEFAUT, ...x, licencies: { ...SIMULATION_DEFAUT.licencies, ...(x.licencies ?? {}) } })

// Tableau de référence de l'offre (montants affichés, remise de 15 % déjà appliquée au pack).
const REFERENCE = {
  mini: { site: [590, 19], logiciel: [590, 25], pack: [1000, 37], heures: [1, 2, 3], go: 2 },
  petit: { site: [890, 25], logiciel: [890, 35], pack: [1510, 51], heures: [2, 3, 5], go: 5 },
  moyen: { site: [1190, 29], logiciel: [1190, 45], pack: [2020, 63], heures: [2, 4, 6], go: 10 },
  grand: { site: [1490, 35], logiciel: [1590, 59], pack: [2620, 80], heures: [3, 5, 8], go: 20 },
  'tres-grand': { site: [1890, 45], logiciel: [1990, 79], pack: [3300, 105], heures: [3, 6, 9], go: 50 },
}

test('la grille est valide (zod : types, catégories contiguës, options complètes)', () => {
  assert.doesNotThrow(() => PricingSchema.parse(PRICING))
  assert.throws(() => PricingSchema.parse({ ...PRICING, categories: PRICING.categories.slice(1) }))
})

test('chaque catégorie : site, logiciel et pack calculé (−15 %, mise en place à la dizaine, abonnement à l’euro)', () => {
  for (const c of CATEGORIES) {
    const r = REFERENCE[c.id]
    for (const f of ['site', 'logiciel', 'pack']) {
      const t = tarif(c, f)
      assert.deepEqual([t.miseEnPlace, t.mois], r[f], `${c.id} ${f}`)
    }
    assert.deepEqual([c.heures.site, c.heures.logiciel, c.heures.pack], r.heures)
    assert.equal(c.stockageGo, r.go)
  }
})

test('catégorie selon les licenciés de la saison en cours (bornes comprises)', () => {
  assert.equal(categorieDe(1).id, 'mini')
  assert.equal(categorieDe(49).id, 'mini')
  assert.equal(categorieDe(50).id, 'petit')
  assert.equal(categorieDe(149).id, 'petit')
  assert.equal(categorieDe(150).id, 'moyen')
  assert.equal(categorieDe(299).id, 'moyen')
  assert.equal(categorieDe(300).id, 'grand')
  assert.equal(categorieDe(499).id, 'grand')
  assert.equal(categorieDe(500).id, 'tres-grand')
  assert.equal(categorieDe(2400).id, 'tres-grand')
  assert.equal(categorieDe(0).id, 'mini')
})

test('économie du pack et coût par licencié (Moyen, 220 licenciés : 63 €/mois ≈ 3,40 € par an)', () => {
  const moyen = CATEGORIES.find((c) => c.id === 'moyen')
  assert.deepEqual(economiePack(moyen), { miseEnPlace: 360, mois: 11 })
  assert.equal(coutParLicencieAn(63, 220), 3.4)
  assert.equal(coutParLicencieAn(63, 0), 0)
})

test('simulation par défaut : pack Moyen, 3 fois, mensuel', () => {
  const r = simuler(entree())
  assert.equal(r.categorie.id, 'moyen')
  assert.equal(r.miseEnPlace.total, 2020)
  assert.deepEqual(r.miseEnPlace.echeances, [673.33, 673.33, 673.34])
  assert.equal(r.abonnement.mensuel, 63)
  assert.equal(r.abonnement.annuel, null)
  assert.deepEqual(r.troisPremiersMois.map((m) => m.total), [736.33, 736.33, 736.34])
  assert.equal(r.premiereAnnee, 2020 + 63 * 12)
  assert.equal(r.anneesSuivantes, 756)
  assert.equal(r.coutParLicencieAn, 3.4)
  assert.deepEqual(r.economiePack, { miseEnPlace: 360, mois: 11 })
  assert.deepEqual(r.surDevis, [])
})

test('paiement en une fois et abonnement annuel (−10 % sur tout l’abonnement)', () => {
  const r = simuler(entree({ miseEnPlace: 'une-fois', abonnement: 'annuel' }))
  assert.deepEqual(r.miseEnPlace.echeances, [2020])
  assert.equal(r.abonnement.annuel, Math.round(63 * 12 * 0.9))
  assert.equal(r.abonnement.annuel, 680)
  assert.equal(r.abonnement.economieAnnuelle, 76)
  assert.deepEqual(r.troisPremiersMois.map((m) => m.total), [2700, 0, 0])
  assert.equal(r.premiereAnnee, 2020 + 680)
})

test('options : prix ajoutés, pages à l’unité, conditions respectées', () => {
  const r = simuler(entree({ formule: 'site', licencies: { courante: 40 }, options: { 'assistant-ia': 1, 'page-supplementaire': 3, 'reservation-courts': 1, 'commande-vocale': 1 } }))
  // Site seul : l'assistant IA (avec le logiciel) et la commande vocale (avec l'IA) sont ignorés.
  assert.deepEqual(r.optionsIgnorees.sort(), ['assistant-ia', 'commande-vocale'])
  assert.equal(r.miseEnPlace.total, 590 + 3 * 50 + 290)
  assert.equal(r.abonnement.mensuel, 19 + 12)
  const r2 = simuler(entree({ formule: 'logiciel', options: { 'assistant-ia': 1, 'commande-vocale': 1 } }))
  assert.deepEqual(r2.optionsIgnorees, [])
  assert.equal(r2.miseEnPlace.total, 1190 + 190 + 90)
  assert.equal(r2.abonnement.mensuel, 45 + 19 + 9)
  assert.equal(optionDisponible('commande-vocale', 'pack', {}), false)
  assert.equal(optionDisponible('commande-vocale', 'pack', { 'assistant-ia': 1 }), true)
  assert.equal(optionDisponible('copie-autonome', 'pack', {}), false)
})

test('heures d’accompagnement : incluses, puis 40 €/h par tranche de 30 min', () => {
  const r = simuler(entree({ heuresPrevues: 7.2 }))
  assert.equal(r.heures.incluses, 6)
  assert.equal(r.heures.supplementaires, 1.5)
  assert.equal(r.heures.cout, 60)
  assert.equal(r.miseEnPlace.total, 2080)
  assert.equal(simuler(entree({ heuresPrevues: 4 })).heures.cout, 0)
})

test('baisse des licenciés : message au-dessous de 90 % de la moyenne des trois saisons', () => {
  assert.equal(simuler(entree({ licencies: { courante: 180, precedente: 220, avantDerniere: 230 } })).baisse, true)
  assert.equal(simuler(entree({ licencies: { courante: 200, precedente: 210, avantDerniere: 220 } })).baisse, false)
  assert.equal(simuler(entree({ licencies: { courante: 140, precedente: null, avantDerniere: null } })).baisse, false)
  assert.equal(simuler(entree({ licencies: { courante: 180, precedente: 220, avantDerniere: 230 } })).moyenneLicencies, 210)
})

test('déplacement et besoins sur devis', () => {
  assert.equal(simuler(entree({ distanceKm: 25 })).deplacement, 'gratuit')
  assert.equal(simuler(entree({ distanceKm: PRICING.premierRdvGratuitKm + 1 })).deplacement, 'visio-ou-devis')
  assert.equal(simuler(entree({ premierRdv: 'visio', distanceKm: 300 })).deplacement, 'visio')
  assert.equal(simuler(entree({ besoins: ['omnisport', 'traduction'] })).surDevis.length, 2)
})

test('échéances : la dernière absorbe l’arrondi, la somme est exacte', () => {
  for (const total of [1000, 1510, 2020, 2620, 3300, 1001]) {
    const e = echeances(total, 3)
    assert.equal(Math.round(e.reduce((a, b) => a + b, 0) * 100) / 100, total)
  }
})

test('chaque catégorie × chaque formule × chaque paiement : totaux cohérents', () => {
  for (const c of CATEGORIES) {
    for (const formule of ['site', 'logiciel', 'pack']) {
      for (const abonnement of ['mensuel', 'annuel']) {
        const r = simuler(entree({ formule, abonnement, licencies: { courante: c.min } }))
        const t = tarif(c, formule)
        assert.equal(r.categorie.id, c.id)
        assert.equal(r.miseEnPlace.total, t.miseEnPlace)
        assert.equal(r.abonnement.mensuel, t.mois)
        assert.equal(r.anneesSuivantes, abonnement === 'annuel' ? Math.round(t.mois * 12 * 0.9) : t.mois * 12)
        assert.equal(r.premiereAnnee, t.miseEnPlace + r.anneesSuivantes)
      }
    }
  }
})

test('état partageable : aller-retour par l’adresse', () => {
  const etat = { club: { nom: 'TC des Bords de Loire', commune: 'Langeais', departement: 'Indre-et-Loire' }, entree: entree({ formule: 'logiciel', options: { 'assistant-ia': 1, 'page-supplementaire': 2 }, abonnement: 'annuel', miseEnPlace: 'une-fois', heuresPrevues: 5.5, distanceKm: 18, besoins: ['traduction'], licencies: { courante: 260, precedente: 240, avantDerniere: 250 } }) }
  const lu = lireEtat(new URLSearchParams(ecrireEtat(etat)))
  assert.deepEqual(lu, etat)
  const faux = lireEtat(new URLSearchParams('l=abc&f=pirate&o=inconnu,assistant-ia&km=-3'))
  assert.equal(faux.entree.formule, 'pack')
  assert.deepEqual(faux.entree.options, { 'assistant-ia': 1 })
  assert.equal(faux.entree.distanceKm, null)
})

test('jetons {{club:…}} : les textes lisent la grille', () => {
  assert.equal(jetons('{{club:pack:moyen:mois}} €'), '63 €')
  assert.equal(jetons('{{club:site:mini:mise}} €'), '590 €')
  assert.equal(jetons('{{club:option:assistant-ia:mois}} €'), '19 €')
  assert.equal(jetons('{{club:heure}} €/h'), '40 €/h')
  assert.equal(jetons('{{produit}}'), 'Stackup Club')
  assert.equal(jetons('{{club:par-licencie:moyen}} €'), '3,40 €')
})
