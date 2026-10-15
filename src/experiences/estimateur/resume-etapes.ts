/** Une ligne par étape : ce que le visiteur a choisi, en mots simples (rappel cliquable, étapes passées). */
import { LIGNES } from '@/config/tarifs.generated'
import type { ConfigDevis } from '@/domain/devis/types'
import { TITRE_PORTEE } from './donnees'

const nb = (cfg: ConfigDevis, familles: string[]) => LIGNES.filter((l) => familles.includes(l.famille) && (cfg.options[l.code] ?? 0) > 0).length
const pl = (n: number, un: string, plus: string) => `${n} ${n > 1 ? plus : un}`

export function resumeEtape(id: number, cfg: ConfigDevis, metier: string): string {
  switch (id) {
    case 1: {
      const l = [cfg.accueil !== 'Aucun' && 'Site', cfg.boutique.active && 'Boutique', cfg.outil.actif && 'Outil de gestion'].filter(Boolean)
      return l.length ? l.join(' · ') : 'à définir'
    }
    case 2:
      return cfg.accueil
    case 3: {
      const n = Object.values(cfg.pages).reduce((a, b) => a + b, 0)
      const serie = cfg.pagesSerie > 0 ? ` + ${pl(cfg.pagesSerie, 'page par ville', 'pages par ville')}` : ''
      return `${n === 0 ? 'aucune autre page' : pl(n, 'autre page', 'autres pages')}${serie}`
    }
    case 4:
      return cfg.portee === 'Aucun' && cfg.ia === 'Aucune' ? 'pas pour l’instant' : [cfg.portee !== 'Aucun' && (TITRE_PORTEE[cfg.portee] ?? cfg.portee), cfg.ia !== 'Aucune' && 'assistants IA'].filter(Boolean).join(' · ')
    case 5: {
      const n = nb(cfg, ['fonctionnalite', 'effet'])
      return n ? pl(n, 'fonction choisie', 'fonctions choisies') : 'rien en plus'
    }
    case 6:
      return (cfg.options.C01 ?? 0) + (cfg.options.C02 ?? 0) > 0 ? 'Stackup rédige' : 'je fournis mes textes'
    case 7:
      return cfg.boutique.import ? 'catalogue importé' : pl(cfg.boutique.produits, 'produit', 'produits')
    case 8: {
      const n = nb(cfg, ['outil'])
      return `${n ? pl(n, 'module', 'modules') : 'socle seul'} · ${pl(cfg.outil.utilisateurs, 'personne', 'personnes')}${metier ? ` · ${metier}` : ''}`
    }
    default:
      return cfg.abonnement.actif ? 'accompagnement choisi' : 'pas d’abonnement'
  }
}
