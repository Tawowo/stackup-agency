import { PARAMS } from '@/config/tarifs.generated'
import type { Ligne } from '@/config/tarifs.generated'
import { euros } from '@/domain/devis/resume'

/** Le prix d'une ligne de catalogue, comme on le lit : « 120 € », « +30 % », « Gratuit »… */
export function prixLigne(l: Ligne): string {
  const u = l.unite.toLowerCase()
  if (u.includes('%')) return `+ ${Math.round(l.prix * 100)} %`
  if (u.includes('gratuit') || (l.prix === 0 && /inclus/.test(u))) return 'Gratuit'
  if (u.includes('coût réel')) return 'Au coût réel'
  if (u.includes('simulateur')) return 'Selon l’estimation'
  if (l.prix === 0) return 'Gratuit'
  return euros(l.prix * PARAMS.coefficient)
}

/** L'unité, sans les mots techniques : « forfait » ne s'affiche pas. */
export function uniteLigne(l: Ligne): string {
  const u = l.unite.trim()
  if (!u || /forfait|inclus|gratuit|%|coût réel|simulateur/i.test(u)) return ''
  return u
}
