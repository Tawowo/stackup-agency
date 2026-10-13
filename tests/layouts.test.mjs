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

import { strates, STRATES } from '../src/webgl/layouts/strates.ts'
import { pageLayout, multi, boutique, logiciel } from '../src/webgl/layouts/offres.ts'
import { pellicule } from '../src/webgl/layouts/pellicule.ts'

test('strates : cinq groupes, retard par lamelle, écartement piloté', () => {
  const ouvert = strates(450, { ouverture: 1 })
  const ferme = strates(450, { ouverture: 0 })
  const groupes = new Set()
  for (let i = 2; i < 3 + 5 * 54; i++) {
    if (i === 2 || ouvert.scale[i] > 0) groupes.add(ouvert.group[i])
  }
  assert.equal(groupes.size, STRATES.length)
  // La lamelle 0 part avant la lamelle 4.
  assert.ok(ouvert.delay[3] < ouvert.delay[3 + 4 * 54])
  // Fermé : hauteur totale < 0,4 ; ouvert : > 1,5.
  const hauteur = (d) => d.pos[3 * 3 + 1] - d.pos[(3 + 4 * 54) * 3 + 1]
  assert.ok(hauteur(ferme) < 0.4, `fermé ${hauteur(ferme)}`)
  assert.ok(hauteur(ouvert) > 1.5, `ouvert ${hauteur(ouvert)}`)
  // La plaque ambre (2) est dans Design (groupe 0), visible.
  assert.equal(ouvert.group[2], 0)
  assert.ok(ouvert.scale[2] > 0)
})

test('offres : chaque layout emploie la plaque ambre et dissout le reste', () => {
  for (const f of [pageLayout, multi, boutique, logiciel]) {
    const d = f(450)
    assert.ok(d.scale[2] > 0, `${f.name} : plaque ambre visible`)
    assert.equal(d.scale[0], 0)
    let visibles = 0
    for (let i = 0; i < 450; i++) if (d.scale[i] > 0) visibles++
    assert.ok(visibles > 40 && visibles < 300, `${f.name} : ${visibles} plaques`)
    assert.equal(d.scale[449], 0, 'le reste est dissous')
  }
})

test('pellicule : le glissement décale tout le cadre', () => {
  const a = pellicule(450, { glisse: 0 })
  const b = pellicule(450, { glisse: 2.8 })
  for (let i = 3; i < 60; i++) if (a.scale[i] > 0) assert.ok(Math.abs(b.pos[i * 3] - a.pos[i * 3] - 2.8) < 1e-5)
})

import { machines, aretes } from '../src/webgl/layouts/machines.ts'
import { cadran } from '../src/webgl/layouts/cadran.ts'
import { methode } from '../src/webgl/layouts/methode.ts'

test('machines : un groupe par module, des arêtes, le hub ambre', () => {
  const d = machines(800, 12)
  const groupes = new Set()
  for (let i = 3; i < 800; i++) if (d.scale[i] > 0) groupes.add(d.group[i])
  assert.equal(groupes.size, 13, '12 modules + le groupe des arêtes')
  assert.ok(d.scale[2] > 0)
  assert.ok(aretes(12).length >= 12)
  const p = machines(800, 12, true)
  for (let i = 3; i < 800; i++) if (p.scale[i] > 0) assert.ok(Math.abs(p.pos[i * 3]) < 0.73, 'portrait : tout tient en largeur')
})

test('cadran : l aiguille suit le paramètre', () => {
  const a = cadran(450, 0)
  const b = cadran(450, 1)
  assert.ok(a.pos[2 * 3] < 0 && b.pos[2 * 3] > 0, 'la pointe ambre passe de gauche à droite')
  assert.ok(a.scale[2] > 0)
})

test('methode : chaque étape ajoute des plaques, l ambre arrive à l étape 2', () => {
  const visibles = (d) => { let v = 0; for (let i = 0; i < 450; i++) if (d.scale[i] > 0) v++; return v }
  let prev = 0
  for (let k = 0; k <= 5; k++) {
    const v = visibles(methode(450, k))
    assert.ok(v >= prev, `étape ${k}`)
    prev = v
  }
  assert.equal(methode(450, 1).scale[2], 0)
  assert.ok(methode(450, 2).scale[2] > 0)
})

import { configurateur } from '../src/webgl/layouts/configurateur.ts'
import { formulaire } from '../src/webgl/layouts/formulaire.ts'

test('configurateur : chaque fonction cochée ajoute un module', () => {
  const vis = (d) => { let v = 0; for (let i = 0; i < 450; i++) if (d.scale[i] > 0) v++; return v }
  const a = configurateur(450, 0, 0)
  const b = configurateur(450, 0, 0b101)
  assert.ok(vis(b) > vis(a) + 8)
  assert.ok(b.scale[2] > 0)
})

test('formulaire : une rangée par champ rempli, l ambre à la fin', () => {
  const vis = (d) => { let v = 0; for (let i = 3; i < 450; i++) if (d.scale[i] > 0) v++; return v }
  let prev = vis(formulaire(450, 0))
  for (let k = 1; k <= 9; k++) {
    const v = vis(formulaire(450, k))
    assert.ok(v > prev, `champ ${k}`)
    prev = v
  }
  assert.equal(formulaire(450, 8).scale[2], 0)
  assert.ok(formulaire(450, 9).scale[2] > 0)
})
