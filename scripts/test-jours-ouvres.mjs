import { register } from 'node:module'
register('./loader-ts.mjs', import.meta.url)
const { joursFeries, ajouterJoursOuvres, formaterJour, estOuvre } =
  await import('../src/lib/joursOuvres.ts')

let ko = 0
const eq = (a, b, quoi) => { const ok = a === b; if (!ok) ko++; console.log(`${ok ? '  ok ' : 'ÉCHEC'}  ${quoi}\n        obtenu ${a}\n        attendu ${b}`) }

// Pâques : valeurs publiées, vérifiables.
const p = (an) => [...joursFeries(an)].sort()
console.log('— Pâques et dérivés —')
eq(p(2026).includes('2026-04-06'), true, 'lundi de Pâques 2026 = 6 avril')
eq(p(2026).includes('2026-05-14'), true, 'Ascension 2026 = 14 mai')
eq(p(2026).includes('2026-05-25'), true, 'lundi de Pentecôte 2026 = 25 mai')
eq(p(2025).includes('2025-04-21'), true, 'lundi de Pâques 2025 = 21 avril')
eq(p(2024).includes('2024-04-01'), true, 'lundi de Pâques 2024 = 1er avril')
eq(joursFeries(2026).size, 11, '11 fériés en 2026')

console.log('\n— jours ouvrés —')
// Vendredi 9 oct 2026 + 1 ouvré = lundi 12.
eq(formaterJour(ajouterJoursOuvres(new Date(2026, 9, 9), 1)), 'lundi 12 octobre', 'vendredi +1 saute le week-end')
// Samedi → premier ouvré = lundi.
eq(formaterJour(ajouterJoursOuvres(new Date(2026, 9, 10), 0)), 'lundi 12 octobre', 'samedi +0 = lundi')
// 30 avril 2026 (jeudi) + 1 : le 1er mai est férié (vendredi) → lundi 4.
eq(formaterJour(ajouterJoursOuvres(new Date(2026, 3, 30), 1)), 'lundi 4 mai', 'saute le 1er mai férié')
// Franchissement d'année : 24 déc 2026 (jeudi) + 5 ouvrés.
//  25 fér., 26-27 we, 28,29,30,31 ouvrés = 4, 1er jan fér., 2-3 we, 4 jan = 5e.
eq(formaterJour(ajouterJoursOuvres(new Date(2026, 11, 24), 5)), 'lundi 4 janvier', 'franchit le 1er janvier')
// 10 jours ouvrés depuis aujourd'hui : doit être ouvré.
const f = new Set([...joursFeries(2026), ...joursFeries(2027)])
eq(estOuvre(ajouterJoursOuvres(new Date(), 10), f), true, 'J+10 ouvrés tombe un jour ouvré')

console.log(ko === 0 ? '\n✓ tous les cas passent' : `\n✗ ${ko} échec(s)`)
process.exit(ko ? 1 : 0)
