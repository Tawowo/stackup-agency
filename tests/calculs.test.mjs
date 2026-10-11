/**
 * Vérification des calculs du LABORATOIRE et du CONFIGURATEUR.
 *
 * Volontairement sans dépendance de test : `node --test` est dans Node 22,
 * déjà présent. Ajouter Vitest ou Jest pour une centaine d'assertions serait
 * un coût de maintenance et d'installation sans contrepartie.
 *
 * Lancer : npm run verif:calculs
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

// Les modules sont en TypeScript avec des alias `@/` : on les charge via le
// transpileur déjà présent dans le projet.
register('./scripts/loader-ts.mjs', pathToFileURL('./'))

const labo = await import('../src/lib/laboratoire.ts')
const conf = await import('../src/lib/configurateur.ts')

// ────────────────────────────────────────────────────────────────────────────
test('un total de ligne est le produit exact quantité × prix unitaire', () => {
  assert.equal(labo.totalLigneHT({ designation: 'x', quantite: 6, prixUnitaireHT: 48000 }), 288000)
  assert.equal(labo.totalLigneHT({ designation: 'x', quantite: 120, prixUnitaireHT: 4200 }), 504000)
  assert.equal(labo.totalLigneHT({ designation: 'x', quantite: 1, prixUnitaireHT: 0 }), 0)
})

test('HT + TVA donne exactement le TTC, sans dérive d’arrondi', () => {
  for (const intervention of labo.JEU_DESSAI) {
    const ht = labo.totalHT(intervention)
    const tva = labo.totalTVA(intervention)
    const ttc = labo.totalTTC(intervention)
    assert.equal(ht + tva, ttc, `${intervention.id} : HT+TVA ≠ TTC`)
    assert.equal(tva, Math.round(ht * 0.2), `${intervention.id} : TVA incorrecte`)
    assert.ok(Number.isInteger(ttc), `${intervention.id} : TTC non entier`)
  }
})

test('la synthèse d’un ensemble égale la somme de ses éléments', () => {
  const s = labo.synthetiser(labo.JEU_DESSAI)
  const attenduTTC = labo.JEU_DESSAI.reduce((t, i) => t + labo.totalTTC(i), 0)
  const attenduHT = labo.JEU_DESSAI.reduce((t, i) => t + labo.totalHT(i), 0)
  assert.equal(s.totalTTC, attenduTTC)
  assert.equal(s.totalHT, attenduHT)
  assert.equal(s.nombre, labo.JEU_DESSAI.length)
  // engagé + en attente doit reconstituer le total, sans centime perdu.
  assert.equal(s.engage + s.enAttente, s.totalTTC)
})

test('le panier moyen vaut zéro sur un ensemble vide, sans division par zéro', () => {
  const s = labo.synthetiser([])
  assert.equal(s.panierMoyen, 0)
  assert.equal(s.totalTTC, 0)
  assert.equal(s.nombre, 0)
})

test('un filtre de statut ne retient que ce statut', () => {
  const r = labo.filtrerEtTrier(labo.JEU_DESSAI, {
    recherche: '',
    statuts: ['termine'],
    tri: 'date-desc',
  })
  assert.ok(r.length > 0, 'le jeu d’essai doit contenir des interventions terminées')
  assert.ok(r.every((i) => i.statut === 'termine'))
})

test('le cumul de statuts est une union, pas une intersection', () => {
  const r = labo.filtrerEtTrier(labo.JEU_DESSAI, {
    recherche: '',
    statuts: ['termine', 'brouillon'],
    tri: 'date-desc',
  })
  const attendu = labo.JEU_DESSAI.filter(
    (i) => i.statut === 'termine' || i.statut === 'brouillon',
  ).length
  assert.equal(r.length, attendu)
})

test('la recherche ignore les accents et la casse', () => {
  const avec = labo.filtrerEtTrier(labo.JEU_DESSAI, {
    recherche: 'Joué-lès-Tours',
    statuts: [],
    tri: 'date-desc',
  })
  const sans = labo.filtrerEtTrier(labo.JEU_DESSAI, {
    recherche: 'joue-les-tours',
    statuts: [],
    tri: 'date-desc',
  })
  assert.ok(avec.length > 0, 'la commune doit être trouvée')
  assert.deepEqual(
    avec.map((i) => i.id),
    sans.map((i) => i.id),
  )
})

test('la recherche porte aussi sur les désignations de lignes', () => {
  const r = labo.filtrerEtTrier(labo.JEU_DESSAI, {
    recherche: 'plomberie',
    statuts: [],
    tri: 'date-desc',
  })
  assert.ok(r.length > 0)
  assert.ok(
    r.every((i) =>
      i.lignes.some((l) => l.designation.toLowerCase().includes('plomberie')),
    ),
  )
})

test('chaque tri ordonne réellement, dans le bon sens', () => {
  const base = { recherche: '', statuts: [] }

  const dDesc = labo.filtrerEtTrier(labo.JEU_DESSAI, { ...base, tri: 'date-desc' })
  for (let i = 1; i < dDesc.length; i++) {
    assert.ok(dDesc[i - 1].date >= dDesc[i].date, 'date-desc mal ordonné')
  }

  const dAsc = labo.filtrerEtTrier(labo.JEU_DESSAI, { ...base, tri: 'date-asc' })
  for (let i = 1; i < dAsc.length; i++) {
    assert.ok(dAsc[i - 1].date <= dAsc[i].date, 'date-asc mal ordonné')
  }

  const mDesc = labo.filtrerEtTrier(labo.JEU_DESSAI, { ...base, tri: 'montant-desc' })
  for (let i = 1; i < mDesc.length; i++) {
    assert.ok(
      labo.totalTTC(mDesc[i - 1]) >= labo.totalTTC(mDesc[i]),
      'montant-desc mal ordonné',
    )
  }

  const cAsc = labo.filtrerEtTrier(labo.JEU_DESSAI, { ...base, tri: 'client-asc' })
  for (let i = 1; i < cAsc.length; i++) {
    assert.ok(
      cAsc[i - 1].client.localeCompare(cAsc[i].client, 'fr') <= 0,
      'client-asc mal ordonné',
    )
  }
})

test('un tri ne perd ni ne duplique aucun élément', () => {
  for (const tri of ['date-desc', 'date-asc', 'montant-desc', 'montant-asc', 'client-asc']) {
    const r = labo.filtrerEtTrier(labo.JEU_DESSAI, { recherche: '', statuts: [], tri })
    assert.equal(r.length, labo.JEU_DESSAI.length, `${tri} : nombre d’éléments modifié`)
    assert.equal(new Set(r.map((i) => i.id)).size, labo.JEU_DESSAI.length, `${tri} : doublon`)
  }
})

test('le cycle de statut avance et s’arrête à « terminé »', () => {
  assert.equal(labo.statutSuivant('brouillon'), 'envoye')
  assert.equal(labo.statutSuivant('envoye'), 'accepte')
  assert.equal(labo.statutSuivant('accepte'), 'planifie')
  assert.equal(labo.statutSuivant('planifie'), 'termine')
  // Butée : « terminé » ne doit jamais déborder du tableau.
  assert.equal(labo.statutSuivant('termine'), 'termine')
})

test('chaque identifiant du jeu d’essai est unique', () => {
  const ids = labo.JEU_DESSAI.map((i) => i.id)
  assert.equal(new Set(ids).size, ids.length)
})

// ────────────────────────────────────────────────────────────────────────────
// CONFIGURATEUR — le point de contrôle commercial : aucun prix inventé.

test('tout prix de base provient de SITE.pricing', async () => {
  const { SITE } = await import('../src/config/site.ts')
  const publics = new Set(Object.values(SITE.pricing))
  for (const b of conf.BASES) {
    assert.ok(publics.has(b.prix), `${b.titre} : prix ${b.prix} absent de SITE.pricing`)
  }
})

test('toute option chiffrée provient de SITE.pricing ; les autres sont sur devis', async () => {
  const { SITE } = await import('../src/config/site.ts')
  const publics = new Set(Object.values(SITE.pricing))
  for (const o of conf.OPTIONS) {
    if (o.prix !== null) {
      assert.ok(publics.has(o.prix), `${o.titre} : prix ${o.prix} inventé`)
    }
  }
})

test('une estimation vide n’annonce aucun montant', () => {
  const e = conf.estimer(conf.CONFIGURATION_VIDE)
  assert.equal(e.planchePonctuel, 0)
  assert.equal(e.plancheMensuel, 0)
  assert.equal(e.surDevis.length, 0)
  assert.equal(e.delai, null)
})

test('le plancher est la somme de la base et des options ponctuelles publiques', () => {
  const e = conf.estimer({
    base: 'vitrine',
    options: ['redaction', 'maintenance-starter'],
    echeance: 'trimestre',
    contexte: '',
  })
  const vitrine = conf.BASES.find((b) => b.id === 'vitrine').prix
  const redaction = conf.OPTIONS.find((o) => o.id === 'redaction').prix
  const starter = conf.OPTIONS.find((o) => o.id === 'maintenance-starter').prix

  // La rédaction est ponctuelle, la maintenance est mensuelle : elles ne
  // doivent surtout pas tomber dans le même total.
  assert.equal(e.planchePonctuel, vitrine + redaction)
  assert.equal(e.plancheMensuel, starter)
})

test('une option sans tarif public est signalée au lieu d’être chiffrée', () => {
  const e = conf.estimer({
    base: 'gestion',
    options: ['integrations', 'reprise'],
    echeance: 'urgent',
    contexte: '',
  })
  assert.equal(e.surDevis.length, 2)
  // Elle ne doit rien ajouter au plancher : sinon le total serait inventé.
  assert.equal(e.planchePonctuel, conf.BASES.find((b) => b.id === 'gestion').prix)
})

test('les options proposées correspondent toujours à la base choisie', () => {
  for (const b of conf.BASES) {
    for (const o of conf.optionsPour(b.id)) {
      assert.ok(o.pour.includes(b.id), `${o.titre} proposée à tort pour ${b.titre}`)
    }
  }
})

test('la synthèse transmise mentionne « à partir de » et jamais un prix ferme', () => {
  const texte = conf.resumer({
    base: 'ecommerce',
    options: ['maintenance-pro', 'integrations'],
    echeance: 'trimestre',
    contexte: 'Je vends des produits frais.',
  })
  assert.match(texte, /à partir de/)
  assert.match(texte, /sur devis/)
  assert.match(texte, /Je vends des produits frais\./)
})
