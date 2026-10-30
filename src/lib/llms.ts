/**
 * LLMS.TXT — la carte du site pour les assistants et moteurs d'IA : qui, quoi, où, prix « à partir de », pages de référence,
 * réponses courtes. Généré depuis les mêmes données que le site (prix du moteur de devis, zones, services, ressources).
 */
import { SITE, offre } from '@/config/site'
import { ZONES } from '@/data/zones'
import { ORIGINE } from './seo'
import { jetons, nombreFr } from './jetons'
import { tousLesArticles } from './blog'
import { toutesLesEntrees } from './lexique'
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
import { PILIER as SQUARESPACE } from '@/data/piliers/squarespace-jimdo-ou-site-sur-mesure'
import { PILIER as SOLOCAL } from '@/data/piliers/solocal-pages-jaunes-recuperer-son-site'
import { PILIER as PLANITY } from '@/data/piliers/planity-treatwell-ou-reservation-sans-commission'
import { PILIER as THEFORK } from '@/data/piliers/thefork-zenchef-ou-reservation-restaurant-direct'
import { PILIER as PIXIESET } from '@/data/piliers/pixieset-pictime-ou-galerie-photo-sur-mesure'
import { PILIER as BATAPPLI } from '@/data/piliers/batappli-henrri-ou-devis-factures-sur-mesure'
import { PILIER as UBER } from '@/data/piliers/uber-eats-ou-commande-directe'
import type { Pilier } from '@/data/piliers/types'
import { routesClubs } from './clubs'
import { PRICING } from '@/data/offre-clubs/pricing'
import { prixPack } from '@/domain/clubs/calcul'
import { PRODUCT_NAME, MENTION_FFT } from '@/config/offre-clubs'

const PILIERS: Pilier[] = [CREATION, REFONTE, REFERENCEMENT, LOCAL, ECOMMERCE, LOGICIEL, IA, FACTURE, MAINTENANCE]
const COMPARATIFS: Pilier[] = [SHOPIFY, OBAT, SQUARESPACE, SOLOCAL, PLANITY, THEFORK, PIXIESET, BATAPPLI, UBER]
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
  const pack = PRICING.categories.map((c) => prixPack(c))
  l.push(
    '## Offre pour les clubs de tennis, de padel et de pickleball',
    `- ${PRODUCT_NAME} : le site du club et le logiciel de gestion du bureau, connectés, par abonnement. Prix indicatifs « à partir de », selon le nombre de licenciés (5 catégories) : site à partir de ${nombreFr(Math.min(...PRICING.categories.map((c) => c.site.mensuel)))} € par mois, logiciel à partir de ${nombreFr(Math.min(...PRICING.categories.map((c) => c.logiciel.mensuel)))} € par mois, site + logiciel de ${nombreFr(Math.min(...pack.map((p) => p.mensuel)))} à ${nombreFr(Math.max(...pack.map((p) => p.mensuel)))} € par mois selon la catégorie, plus une mise en place. Import et export des fichiers ADOC (aucune connexion directe).`,
    `- ${MENTION_FFT}`,
    ...routesClubs().filter((r) => !r.chemin.startsWith('/cgv')).map((r) => `- [${r.nom}](${ORIGINE}${r.chemin})`),
    `- [Conditions générales de la plateforme](${ORIGINE}/cgv-plateforme)`,
    '',
  )
  l.push('## Zones d’intervention', `- [Toutes les zones et moteur « Votre commune »](${ORIGINE}/zones-intervention)`, ...ZONES.map((z) => `- [${z.nom}](${ORIGINE}/zones-intervention/${z.slug}) : ${z.communes.length} communes`), '')
  l.push('## Outils gratuits', `- [Audit de site](${ORIGINE}/outils/audit-site)`, `- [Générateur de mentions légales](${ORIGINE}/outils/generateur-mentions-legales)`, `- [Modèle de devis](${ORIGINE}/outils/modele-devis)`, `- [Calculateur de clients perdus](${ORIGINE}/outils/calculateur-clients-perdus)`, `- [Abonnement ou outil sur mesure](${ORIGINE}/outils/calculateur-abonnement-saas)`, `- [Checklist facture électronique](${ORIGINE}/outils/checklist-facture-electronique)`, `- [Cahier des charges](${ORIGINE}/ressources/cahier-des-charges)`, '')
  l.push('## Pages de référence', `- [Stackup Agency en bref](${ORIGINE}/stackup-agency-en-bref)`, `- [Tarifs et estimateur](${ORIGINE}/tarifs)`, `- [Réalisations](${ORIGINE}/realisations)`, `- [À propos](${ORIGINE}/a-propos)`, `- [Contact](${ORIGINE}/contact)`, `- [Questions fréquentes](${ORIGINE}/faq)`, '')
  const recents = tousLesArticles().filter((a) => a.maj ?? a.date).slice(0, 25)
  l.push('## Ressources récentes', ...recents.map((a) => `- [${a.titre}](${ORIGINE}/blog/${a.slug})`), '')
  l.push('## Lexique (définitions courtes)', `- [Tout le lexique](${ORIGINE}/lexique) : ${toutesLesEntrees().length} termes du web, du référencement, du légal et de la gestion`, ...toutesLesEntrees().map((e) => `- [${e.terme}](${ORIGINE}/lexique/${e.slug}) : ${e.definition}`), '')
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
  l.push('## Lexique', '')
  for (const e of toutesLesEntrees()) l.push(`**${e.terme}** (${ORIGINE}/lexique/${e.slug}) : ${e.definition}`, '')
  return l.join('\n') + '\n'
}
