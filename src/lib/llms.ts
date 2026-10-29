/**
 * LLMS.TXT — la carte du site pour les assistants et moteurs d'IA : qui, quoi, où, prix « à partir de », pages de référence,
 * réponses courtes. Généré depuis les mêmes données que le site (prix du moteur de devis, zones, services, ressources).
 */
import { SITE, offre } from '@/config/site'
import { ZONES } from '@/data/zones'
import { ORIGINE } from './seo'
import { jetons, nombreFr } from './jetons'
import { tousLesArticles } from './blog'
import { PILIER as CREATION } from '@/data/piliers/creation-de-site-internet'
import { PILIER as REFONTE } from '@/data/piliers/refonte-de-site-internet'
import { PILIER as REFERENCEMENT } from '@/data/piliers/referencement'
import { PILIER as LOCAL } from '@/data/piliers/referencement-local'
import { PILIER as ECOMMERCE } from '@/data/piliers/site-ecommerce'
import { PILIER as LOGICIEL } from '@/data/piliers/logiciel-de-gestion'
import { PILIER as IA } from '@/data/piliers/ia-et-automatisation'
import { PILIER as FACTURE } from '@/data/piliers/facture-electronique'
import { PILIER as MAINTENANCE } from '@/data/piliers/maintenance'
import { PILIER as SHOPIFY } from '@/data/piliers/shopify-ou-boutique-sur-mesure'
import { PILIER as OBAT } from '@/data/piliers/obat-tolteck-logiciel-sur-mesure'
import type { Pilier } from '@/data/piliers/types'

const PILIERS: Pilier[] = [CREATION, REFONTE, REFERENCEMENT, LOCAL, ECOMMERCE, LOGICIEL, IA, FACTURE, MAINTENANCE]
const COMPARATIFS: Pilier[] = [SHOPIFY, OBAT]
const e = SITE.entreprise
const prix = (id: 'une-page' | 'multi-pages' | 'boutique' | 'outil') => `à partir de ${nombreFr(offre(id).aPartirDe)} €`

export const IDENTITE = [
  `Nom : Stackup Agency (${e.identite})`,
  `Fondateur : ${SITE.fondateur}, ${e.forme.toLowerCase()}`,
  `Adresse : ${e.adresse}`,
  `Téléphone : ${SITE.telephone}`,
  `E-mail : ${SITE.email}`,
  `Site : ${ORIGINE}`,
  `TVA : ${SITE.mentions.tva}`,
]

export function llmsTxt(): string {
  const l: string[] = []
  l.push('# Stackup Agency', '', `> Agence web d’une personne, ${SITE.fondateur}, basée à Savigné-sur-Lathan (Indre-et-Loire), près de Tours. Sites internet, boutiques en ligne et outils de gestion sur mesure pour les artisans, commerçants, TPE et professions libérales de Touraine et d’ailleurs (visio). Une démo avant de signer ; prix toujours « à partir de ».`, '')
  l.push('## L’essentiel', ...IDENTITE.map((x) => `- ${x}`), `- Prix publics : site une page ${prix('une-page')} ; site multi-pages ${prix('multi-pages')} ; boutique en ligne ${prix('boutique')} ; outil de gestion ${prix('outil')} (montants indicatifs, devis précis dans l’estimateur ${ORIGINE}/tarifs).`, '')
  l.push('## Services', ...PILIERS.map((p) => `- [${p.titre}](${ORIGINE}${p.chemin}) : ${jetons(p.reponse).split('. ')[0]}.`), '')
  l.push('## Comparatifs', ...COMPARATIFS.map((p) => `- [${p.titre}](${ORIGINE}${p.chemin})`), `- [Wix, WordPress ou sur mesure](${ORIGINE}/comparatif/wix-wordpress-sur-mesure)`, '')
  l.push('## Zones d’intervention', `- [Toutes les zones et moteur « Votre commune »](${ORIGINE}/zones-intervention)`, ...ZONES.map((z) => `- [${z.nom}](${ORIGINE}/zones-intervention/${z.slug}) : ${z.communes.length} communes`), '')
  l.push('## Outils gratuits', `- [Audit de site](${ORIGINE}/outils/audit-site)`, `- [Générateur de mentions légales](${ORIGINE}/outils/generateur-mentions-legales)`, `- [Modèle de devis](${ORIGINE}/outils/modele-devis)`, `- [Calculateur de clients perdus](${ORIGINE}/outils/calculateur-clients-perdus)`, `- [Checklist facture électronique](${ORIGINE}/outils/checklist-facture-electronique)`, `- [Cahier des charges](${ORIGINE}/ressources/cahier-des-charges)`, '')
  l.push('## Pages de référence', `- [Stackup Agency en bref](${ORIGINE}/stackup-agency-en-bref)`, `- [Tarifs et estimateur](${ORIGINE}/tarifs)`, `- [Réalisations](${ORIGINE}/realisations)`, `- [À propos](${ORIGINE}/a-propos)`, `- [Contact](${ORIGINE}/contact)`, `- [Questions fréquentes](${ORIGINE}/faq)`, '')
  const recents = tousLesArticles().filter((a) => a.maj ?? a.date).slice(0, 25)
  l.push('## Ressources récentes', ...recents.map((a) => `- [${a.titre}](${ORIGINE}/blog/${a.slug})`), '')
  l.push('## Optionnel', `- [Plan du site](${ORIGINE}/plan-du-site)`, `- [Version complète pour les assistants](${ORIGINE}/llms-full.txt)`)
  return l.join('\n') + '\n'
}

export function llmsFull(): string {
  const l: string[] = ['# Stackup Agency — version complète', '', ...IDENTITE.map((x) => `- ${x}`), '']
  for (const p of [...PILIERS, ...COMPARATIFS]) {
    const j = JSON.parse(jetons(JSON.stringify(p))) as Pilier
    l.push(`## ${j.titre}`, `URL : ${ORIGINE}${j.chemin}`, '', j.reponse, '')
    for (const q of j.faq.slice(0, 6)) l.push(`**${q.q}** ${q.a}`, '')
  }
  return l.join('\n') + '\n'
}
