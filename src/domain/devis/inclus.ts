/** Ce qui est inclus dans toute création — les nombres viennent de l'Excel (onglet Parcours client). */
import { accesseurs, TARIFS } from './tarifs.ts'
import type { Tarifs } from './tarifs.ts'

export interface Inclus {
  id: string
  texte: string
}

const entierDe = (s: string | undefined, defaut: number) => {
  const m = s?.match(/\d+/)
  return m ? Number(m[0]) : defaut
}

export function inclusCreation(t: Tarifs = TARIFS): Inclus[] {
  const a = accesseurs(t)
  const out: Inclus[] = []
  if (a.existe('P04')) out.push({ id: 'rdv', texte: `${entierDe(a.ligne('P04')?.unite, 3)} rendez-vous de finalisation, en visio ou sur place` })
  if (a.existe('P06')) out.push({ id: 'modifs', texte: `${entierDe(a.ligne('P06')?.unite, 2)} séries de modifications sur la maquette, avant le développement final` })
  if (a.existe('P07')) out.push({ id: 'mois', texte: 'Un mois d’ajustements après la mise en ligne' })
  out.push({ id: 'domaine', texte: 'Nom de domaine offert la première année' })
  out.push({ id: 'propriete', texte: 'Propriété du code et du design à votre nom, au paiement complet' })
  if (a.existe('K13') && a.prix('K13') === 0) out.push({ id: 'mention', texte: 'Mention « Réalisé par Stackup » retirable gratuitement' })
  return out
}

/** La phrase « au-delà » : tarif horaire du rendez-vous supplémentaire (P05). */
export function auDela(t: Tarifs = TARIFS): string | null {
  const p = accesseurs(t).prix('P05')
  return p > 0 ? `Au-delà : ${p} € de l’heure.` : null
}
