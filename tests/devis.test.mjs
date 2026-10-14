import test from 'node:test'
import assert from 'node:assert/strict'
import { calculer } from '../src/domain/devis/calcul.ts'
import { HYDREAUX_SCAN, TOUTOUBIEN, VITRINE_CLASSIQUE } from '../src/domain/devis/exemples.ts'

// Valeurs calculées par l'onglet Simulateur de docs/tarifs/Grille-tarifaire-Stackup.xlsx
test("Hydr'eaux Scan : 4 050 €, 3 650–4 660 €, 90 €/mois", () => {
  const r = calculer(HYDREAUX_SCAN)
  assert.equal(r.total, 4050)
  assert.deepEqual(r.fourchette, { bas: 3650, haut: 4660 })
  assert.equal(r.abonnement.mensuel, 90)
  assert.equal(r.acompte, 1620)
  assert.equal(r.paiementEn4Fois, true)
  assert.deepEqual(r.delaiSemaines, { min: 5, max: 8 })
  assert.ok(Math.abs(r.heures - 74.5706896551724) < 1e-6)
  assert.ok(Math.abs(r.tauxHoraire - 54.3108829853645) < 1e-6)
})

test('ToutouBien : 4 130 €, 3 720–4 750 €, 173 €/mois', () => {
  const r = calculer(TOUTOUBIEN)
  assert.equal(r.total, 4130)
  assert.deepEqual(r.fourchette, { bas: 3720, haut: 4750 })
  assert.equal(r.abonnement.mensuel, 173)
  assert.equal(r.acompte, 1652)
  assert.deepEqual(r.delaiSemaines, { min: 6, max: 10 })
  assert.ok(Math.abs(r.heures - 78.5714285714286) < 1e-6)
})

test('Site vitrine Classique 1 page, démo et visio payées : 500 €, reste 455 €, 450–580 €, sans abonnement', () => {
  const r = calculer(VITRINE_CLASSIQUE)
  assert.equal(r.total, 500)
  assert.equal(r.reste, 455)
  assert.equal(r.acompte, 182)
  assert.deepEqual(r.fourchette, { bas: 450, haut: 580 })
  assert.equal(r.abonnement.mensuel, 0)
  assert.equal(r.paiementEn4Fois, false)
  assert.equal(r.heures, 10)
  assert.deepEqual(r.delaiSemaines, { min: 1, max: 2 })
})

import { configDe } from '../src/domain/devis/config.ts'

test('boutique : socle + 20 produits + 40 variantes + 3 catégories en plus', () => {
  const r = calculer(configDe({ accueil: 'Classique', boutique: { active: true, produits: 20, import: false, variantes: 40, categories: 8 } }))
  assert.equal(r.total, 1730) // 300 + 200 + 1100 + 60 + 20 + 45 = 1725 → 1730
  assert.equal(r.abonnement.hebergement, 25)
})

test("outil de gestion : majoration à 5 utilisateurs sur les modules seulement", () => {
  const r = calculer(configDe({ outil: { actif: true, utilisateurs: 5 }, options: { O01: 1, O02: 1 } }))
  assert.equal(r.total, 2030) // 300 + 900 + 750 × 1,1 = 2025 → 2030
  assert.equal(r.modules, 2)
})

test('dégressivité : 40 pages Classique', () => {
  const r = calculer(configDe({ accueil: 'Classique', pages: { Classique: 40 } }))
  // (10 + 20 × 0,6 + 10 × 0,4) = 26 pages équivalentes × 50 € = 1 300 ; + 300 + 200 = 1 800
  assert.equal(r.total, 1800)
})

test('urgence +20 %, remise 5 %, arrondi à 10 €', () => {
  const r = calculer(configDe({ accueil: 'Classique', urgence: true, remise: 0.05 }))
  assert.equal(r.total, 570) // 500 × 1,2 × 0,95 = 570
})

test('une ligne retirée de la grille vaut 0', () => {
  const sans = calculer(configDe({ accueil: 'Classique', options: { F99: 3 } }))
  assert.equal(sans.total, 500)
})
