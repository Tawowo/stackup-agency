/**
 * /outils — l'index des outils gratuits : deux outils interactifs (audit,
 * estimateur de prix) et deux ressources à télécharger. Rendu serveur.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import MondeOutils from '@/components/mondes/MondeOutils'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/outils/outils.css'

export const metadata = meta({
  titre: 'Outils gratuits — audit de site, estimateur de prix, ressources',
  description: 'Mesurez votre site avec Google, essayez l’allure de votre futur site, préparez votre projet avec un cahier des charges et nos documents contractuels. Gratuit, sans inscription.',
  chemin: '/outils',
})

const OUTILS = [
  { href: '/outils/audit-site', nom: 'Audit de site', genre: 'Outil', texte: 'Une adresse, une mesure Google PageSpeed Insights : performance, accessibilité et SEO sur 100, et les priorités expliquées en français.' },
  { href: '/outils/generateur-mentions-legales', nom: 'Générateur de mentions légales', genre: 'Outil', texte: 'Statut, éditeur, hébergeur, TVA : le texte de vos mentions légales se compose en direct, à copier ou à imprimer. Tout reste dans votre navigateur.' },
  { href: '/outils/calculateur-abonnement-saas', nom: 'Abonnement ou outil sur mesure', genre: 'Outil', texte: 'Ce que vous payez chaque mois, cumulé sur 3 et 5 ans, face à un outil de gestion à vous. Vos chiffres, aucune comparaison inventée.' },
  { href: '/outils/calculateur-clients-perdus', nom: 'Calculateur de clients perdus', genre: 'Outil', texte: 'Vos propres hypothèses, un calcul écrit étape par étape et un ordre de grandeur du manque à gagner d’un site peu visible. Jamais une promesse.' },
  { href: '/outils/checklist-facture-electronique', nom: 'Checklist facture électronique', genre: 'Outil', texte: 'Vingt et un points à cocher pour faire le point avant la facture électronique : clients, logiciel, données, comptable. Imprimable, sans avis de conformité.' },
  { href: '/outils/modele-devis', nom: 'Modèle de devis', genre: 'Outil', texte: 'Remplissez votre devis : totaux HT, TVA, TTC et acompte calculés au centime, aperçu à imprimer en PDF ou à copier. Rien n’est envoyé.' },
  { href: '/tarifs#estimer', nom: 'Estimateur de prix', genre: 'Outil', texte: 'Site, boutique ou outil de gestion : répondez à quelques questions simples et voyez une fourchette de prix se préciser à chaque choix.' },
  { href: '/ressources/cahier-des-charges', nom: 'Cahier des charges', genre: 'Ressource', texte: 'Les bonnes questions à se poser avant de demander un site ou un outil, dans l’ordre où on les pose.' },
  { href: '/ressources/documents', nom: 'Documents en PDF', genre: 'Ressource', texte: 'Les documents qui encadrent un projet : conditions générales, contrats de prestation et de maintenance, cession de droits, modèles de devis et de facture.' },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Outils', chemin: '/outils' },
        ])}
      />
      <Document
        moment="outils"
        monde={<MondeOutils />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
        ]}
        etiquette="Gratuit · sans inscription"
        titre="Des outils pour préparer votre projet."
        chapo="Mesurer votre site actuel, essayer une allure pour le prochain, poser vos besoins par écrit, lire nos contrats avant de signer. Utilisez-les seuls ; on en reparle si vous le souhaitez."
        large
      >
        <ol className="su-out">
          {OUTILS.map((o, i) => (
            <li key={o.href} style={{ '--i': i } as React.CSSProperties}>
              <Link href={o.href} className="su-plaque su-plaque--ivoire su-out__plaque">
                <span className="su-mono su-out__num">
                  0{i + 1} · {o.genre}
                </span>
                <span className="su-display su-out__nom">{o.nom}</span>
                <span className="su-out__texte">{o.texte}</span>
                <span className="su-mono su-out__ouvrir" aria-hidden="true">
                  Ouvrir →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Document>
    </>
  )
}
