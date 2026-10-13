import { test } from 'node:test'
import assert from 'node:assert/strict'
import { logo } from '../src/webgl/layouts/logo.ts'
import { pile, PILE_DEFAUT } from '../src/webgl/layouts/pile.ts'
import { LOGO_POSES } from '../src/webgl/logo-geometry.ts'

const proche = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} ≠ ${b}`)

test('logo : les trois plaques exactes, les autres dissoutes', () => {
  const d = logo(50)
  for (const p of LOGO_POSES) {
    proche(d.pos[p.index * 3], p.x)
    proche(d.pos[p.index * 3 + 1], p.y)
    proche(d.rot[p.index * 3 + 1], p.rotY)
    assert.equal(d.scale[p.index], 1)
  }
  for (let i = 3; i < 50; i++) {
    assert.equal(d.scale[i], 0)
    assert.ok(d.pos[i * 3 + 2] < -3, 'hors champ, derrière')
  }
})

test('pile : le logo reste, la tour est bornée en hauteur, le reste dissous, déterministe', () => {
  const a = pile(800, PILE_DEFAUT)
  const b = pile(800, PILE_DEFAUT)
  assert.deepEqual(Array.from(a.pos), Array.from(b.pos))
  for (const p of LOGO_POSES) proche(a.pos[p.index * 3 + 1], p.y)
  for (let i = 0; i < 3; i++) assert.equal(a.scale[i], 1)
  const niveaux = Math.floor(PILE_DEFAUT.hauteur / PILE_DEFAUT.ecart)
  const posees = niveaux * PILE_DEFAUT.parNiveau
  const enVol = Math.round(posees * PILE_DEFAUT.chantier)
  for (let i = 3; i < 3 + posees + enVol; i++) proche(a.scale[i], PILE_DEFAUT.echelle)
  for (let i = 3 + posees + enVol; i < 800; i++) assert.equal(a.scale[i], 0)
  assert.ok(a.mur < -0.9, 'le mur recule derrière la tour')
  // La tour monte : la dernière plaque posée est plus haute que la première.
  assert.ok(a.pos[(3 + posees - 1) * 3 + 1] > a.pos[3 * 3 + 1])
  // Et reste derrière le logo.
  for (let i = 3; i < 3 + posees; i++) assert.ok(a.pos[i * 3 + 2] < -0.1)
})

test('pile : parNiveau = 1 donne une colonne sur l axe', () => {
  const o = { ...PILE_DEFAUT, parNiveau: 1, chantier: 0 }
  const d = pile(40, o)
  const posees = Math.min(37, Math.floor(o.hauteur / o.ecart))
  for (let i = 3; i < 3 + posees; i++) proche(d.pos[i * 3], 0)
})
