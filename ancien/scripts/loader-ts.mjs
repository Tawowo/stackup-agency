/**
 * Résolveur minimal pour `node --test`.
 *
 * Deux besoins seulement :
 *  - traduire l'alias `@/…` du projet en chemin réel vers `src/` ;
 *  - laisser Node charger les fichiers `.ts` lui-même, via le retrait de
 *    types natif (`--experimental-strip-types`).
 *
 * Aucune transpilation maison : le code exécuté par les tests est donc bien
 * celui du site, pas une copie transformée.
 */

import { pathToFileURL } from 'node:url'
import { resolve as resoudreChemin } from 'node:path'
import { existsSync } from 'node:fs'

const RACINE = process.cwd()

/** Les imports TypeScript omettent l'extension : il faut la retrouver. */
const EXTENSIONS = ['', '.ts', '.tsx', '/index.ts', '/index.tsx']

export async function resolve(specificateur, contexte, suivant) {
  if (specificateur.startsWith('@/')) {
    const base = resoudreChemin(RACINE, 'src', specificateur.slice(2))
    const trouve = EXTENSIONS.map((e) => base + e).find(existsSync)
    if (trouve) return suivant(pathToFileURL(trouve).href, contexte)
  }
  return suivant(specificateur, contexte)
}
