import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { jetons } from '../src/lib/jetons.ts'
import { decoder } from '../src/domain/devis/etat.ts'

test('jetons : les montants viennent du moteur (500 € pour une page Classique)', () => {
  assert.equal(jetons('à partir de {{prix:une-page}} €'), 'à partir de 500 €')
  assert.equal(jetons('rien à remplacer'), 'rien à remplacer')
})

test('tous les jetons des articles et des données sont connus', () => {
  const dossiers = ['src/content/blog', 'src/data', 'src/app', 'src/experiences']
  const inconnus = []
  const parcourir = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name)
      if (f.isDirectory()) parcourir(p)
      else if (/\.(md|ts|tsx)$/.test(f.name)) {
        const t = fs.readFileSync(p, 'utf8')
        for (const m of t.matchAll(/\{\{([a-z:-]+)\}\}/g)) if (jetons(m[0]) === m[0]) inconnus.push(`${p} ${m[0]}`)
      }
    }
  }
  dossiers.forEach(parcourir)
  assert.deepEqual(inconnus, [])
})

test('liens directs vers une étape de l’estimateur', () => {
  assert.equal(decoder('eyJzIjo5fQ').etape, 9)
  assert.equal(decoder('eyJzIjo2fQ').etape, 6)
})
