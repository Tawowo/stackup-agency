import { test } from 'node:test'
import assert from 'node:assert/strict'
import { serialiser, deserialiser, estimer, normaliser } from '../src/lib/configuration.ts'

test('configuration : aller-retour URL sans perte', () => {
  const c = normaliser({ type: 'outil', fonctions: ['rdv', 'devis-factures', 'blog'], maintenance: 'pro', redaction: 4 })
  assert.deepEqual(c.fonctions, ['rdv', 'devis-factures'], 'blog n est pas compatible avec outil')
  const s = serialiser(c)
  assert.equal(s, 't=outil;f=rdv,devis-factures;m=pro;r=4')
  assert.deepEqual(deserialiser(s), c)
})

test('configuration : entrée hostile → configuration vide ou nettoyée', () => {
  assert.deepEqual(deserialiser('t=pirate;f=<script>;m=x;r=99').type, null)
  assert.deepEqual(deserialiser(null).fonctions, [])
})

test('estimer : un plancher, jamais un prix ; les fonctions sont sur devis', () => {
  const e = estimer(normaliser({ type: 'multi-pages', fonctions: ['blog'], maintenance: 'starter', redaction: 8 }))
  assert.equal(e.ponctuel, 749 + 159)
  assert.equal(e.mensuel, 29)
  assert.equal(e.surDevis.length, 1)
  assert.ok(e.jauge > 0 && e.jauge <= 1)
})
