/**
 * Corrige les couleurs de texte à l'intérieur des sections sombres.
 *
 * Après que le jeton `electric` est devenu #1B5A9E (lisible sur fond clair,
 * cas très majoritaire du site), les quelques sections à fond sombre doivent
 * basculer sur `electric-clair` et sur de l'or pur — qui y sont lisibles.
 *
 * L'analyse se fait par blocs JSX délimités, pas par fenêtre de lignes :
 * c'est ce qui manquait aux premières tentatives, dont le classement par
 * voisinage s'est révélé peu fiable.
 *
 * Usage : node scripts/corriger-sections-sombres.mjs <fichier> <motif-de-fond>
 */
import { readFileSync, writeFileSync } from 'node:fs'

const [fichier, motifFond] = process.argv.slice(2)
if (!fichier || !motifFond) {
  console.error('usage : node scripts/corriger-sections-sombres.mjs <fichier> <motif>')
  process.exit(1)
}

const source = readFileSync(fichier, 'utf8')
const lignes = source.split('\n')

// Repère la ligne d'ouverture de la section sombre, puis suit l'indentation
// pour déterminer où elle se referme. Une section JSX se termine quand on
// retrouve une balise fermante à la même profondeur d'indentation.
const debut = lignes.findIndex((l) => l.includes(motifFond))
if (debut === -1) {
  console.error(`motif « ${motifFond} » introuvable dans ${fichier}`)
  process.exit(1)
}

const indentation = lignes[debut].match(/^\s*/)[0].length
let fin = lignes.length - 1
for (let i = debut + 1; i < lignes.length; i++) {
  const l = lignes[i]
  if (!l.trim()) continue
  const ind = l.match(/^\s*/)[0].length
  if (ind <= indentation && /^\s*<\//.test(l)) {
    fin = i
    break
  }
}

const SUBSTITUTIONS = [
  // #1B5A9E tombe à 2,5:1 sur ces fonds ; la déclinaison claire donne ~7,9:1.
  [/\btext-electric\b(?!-)/g, 'text-electric-clair'],
  [/\b(hover|group-hover):text-electric\b(?!-)/g, '$1:text-electric-clair'],
  // L'ambre foncé, choisi pour les fonds clairs, est illisible ici :
  // l'or pur y atteint 8:1 et plus.
  [/text-\[#B45309\]/g, 'text-gold'],
  [/text-\[#92400E\]/g, 'text-gold'],
  // Les gris choisis pour fond clair deviennent trop sombres.
  [/text-\[#475569\]/g, 'text-white/75'],
  [/text-\[#64748B\]/g, 'text-white/70'],
  [/\btext-navy\b(?!\/)/g, 'text-white'],
]

let modifications = 0
for (let i = debut; i <= fin; i++) {
  const avant = lignes[i]
  let apres = avant
  for (const [motif, cible] of SUBSTITUTIONS) apres = apres.replace(motif, cible)
  if (apres !== avant) {
    lignes[i] = apres
    modifications++
  }
}

if (modifications) writeFileSync(fichier, lignes.join('\n'))
console.log(
  `${fichier} : lignes ${debut + 1}–${fin + 1} (section sombre), ${modifications} ligne(s) corrigée(s)`,
)
