/**
 * CODE VIVANT — extrait de vraies lignes de nos propres sources pour la
 * matière d'arrière-plan de la Fabrique. Sortie : src/webgl/code-vivant.ts.
 */
import { readFileSync, writeFileSync } from 'node:fs'
const FICHIERS = ['src/webgl/plates.tsx', 'src/webgl/materials/plate.ts', 'src/webgl/layouts/logo.ts', 'src/webgl/layouts/pile.ts', 'src/webgl/engine.ts', 'src/webgl/camera.ts']
const lignes = []
for (const f of FICHIERS) {
  const src = readFileSync(f, 'utf8').split('\n')
  for (const l of src) {
    const t = l.replace(/\t/g, '  ').trimEnd()
    if (!t.trim() || t.trim().startsWith('//') || t.trim().startsWith('*') || t.trim().startsWith('/*')) continue
    lignes.push(t.slice(0, 72))
    if (lignes.length >= 160) break
  }
  if (lignes.length >= 160) break
}
writeFileSync('src/webgl/code-vivant.ts', `/* GÉNÉRÉ PAR scripts/code-vivant.mjs — nos propres sources, pour la matière d'arrière-plan. */\nexport const CODE_VIVANT: readonly string[] = ${JSON.stringify(lignes, null, 0)}\n`)
console.log(lignes.length, 'lignes')
