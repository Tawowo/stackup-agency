import { PARAMS, NIVEAUX, PORTEES, NIVEAUX_IA, MAJORATION_UTILISATEURS, LIGNES } from '../../config/tarifs.generated.ts'
import type { Ligne, Niveau, Portee, NiveauIA, TarifParams } from '../../config/tarifs.generated.ts'

export interface Tarifs {
  params: TarifParams
  niveaux: Niveau[]
  portees: Portee[]
  iaNiveaux: NiveauIA[]
  majoration: { des: number; taux: number }[]
  lignes: Ligne[]
}

export const TARIFS: Tarifs = {
  params: PARAMS,
  niveaux: NIVEAUX,
  portees: PORTEES,
  iaNiveaux: NIVEAUX_IA,
  majoration: MAJORATION_UTILISATEURS,
  lignes: LIGNES,
}

/** Accès par code. Un code absent de l'Excel vaut 0 : la ligne a été retirée de la grille. */
export function accesseurs(t: Tarifs) {
  const parCode = new Map(t.lignes.map((l) => [l.code, l]))
  return {
    ligne: (code: string) => parCode.get(code),
    prix: (code: string) => parCode.get(code)?.prix ?? 0,
    heures: (code: string) => parCode.get(code)?.heures ?? 0,
    existe: (code: string) => parCode.has(code),
  }
}

export function ligneDe(code: string, t: Tarifs = TARIFS) {
  return t.lignes.find((l) => l.code === code)
}
