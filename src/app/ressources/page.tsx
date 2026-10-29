/**
 * /ressources — l'index : le cahier des charges interactif, les documents PDF,
 * les deux outils gratuits. Rendu serveur, des plaques-liens.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Plaque from '@/components/ui/Plaque'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { tousLesArticles } from '@/lib/blog'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Centre de ressources : guides, réponses, outils gratuits',
  description: 'Guides, réponses précises, règles à connaître, comparatifs et outils gratuits pour les artisans, commerçants et TPE : site, référencement, devis, facture électronique.',
  chemin: '/ressources',
})

const RESSOURCES = [
  {
    href: '/ressources/cahier-des-charges',
    etiquette: 'À remplir · imprimable',
    titre: 'Cahier des charges',
    texte: 'Cinq étapes de questions sur votre activité, vos objectifs, vos besoins, votre identité et votre budget. À la fin, une feuille propre à imprimer ou à nous envoyer.',
    action: 'Préparer mon cahier',
  },
  {
    href: '/ressources/documents',
    etiquette: 'PDF · téléchargement',
    titre: 'Documents contractuels',
    texte: 'CGV, contrats, cession de droits, modèles de devis et de facture : le cadre de chaque projet, à lire avant de signer ou à retrouver après.',
    action: 'Voir les documents',
  },
  {
    href: '/outils/audit-site',
    etiquette: 'Outil gratuit',
    titre: 'Audit de site',
    texte: 'Performances, référencement, accessibilité : une lecture rapide de votre site actuel, avec les points à corriger en priorité.',
    action: 'Lancer un audit',
  },
  {
    href: '/tarifs#estimer',
    etiquette: 'Outil gratuit',
    titre: 'Estimateur de prix',
    texte: 'Site, boutique ou outil de gestion : une fourchette de prix qui se précise à chaque choix, à partager ou à envoyer avec votre demande.',
    action: 'Estimer mon projet',
  },
]

const TYPES: { id: 'guide' | 'question' | 'reglementation'; titre: string; texte: string }[] = [
  { id: 'question', titre: 'Réponses précises', texte: 'Une question, la réponse dans les deux premières phrases, puis le détail.' },
  { id: 'guide', titre: 'Guides', texte: 'Les sujets qui demandent de prendre le temps : choisir, mettre en place, durer.' },
  { id: 'reglementation', titre: 'Règles et obligations', texte: 'Mentions légales, RGPD, facture électronique : ce que dit la règle, et vers quelle source officielle se tourner.' },
]
const COMPARATIFS = [
  { href: '/comparatif/wix-wordpress-sur-mesure', nom: 'Wix, WordPress ou site sur mesure' },
  { href: '/comparatif/shopify-ou-boutique-sur-mesure', nom: 'Shopify ou boutique sur mesure' },
  { href: '/comparatif/obat-tolteck-logiciel-sur-mesure', nom: 'Obat, Tolteck ou outil sur mesure' },
]
const OUTILS = [
  { href: '/outils/audit-site', nom: 'Audit de site' },
  { href: '/outils/generateur-mentions-legales', nom: 'Générateur de mentions légales' },
  { href: '/outils/modele-devis', nom: 'Modèle de devis' },
  { href: '/outils/calculateur-clients-perdus', nom: 'Calculateur de clients perdus' },
  { href: '/outils/calculateur-abonnement-saas', nom: 'Abonnement ou outil sur mesure' },
  { href: '/outils/checklist-facture-electronique', nom: 'Checklist facture électronique' },
]

export default function Page() {
  const articles = tousLesArticles().filter((a) => a.type)
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Ressources', chemin: '/ressources' },
        ])}
      />
      <Document
        moment="doc-ressources"
        forme="strates"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/ressources', nom: 'Ressources' },
        ]}
        etiquette="Gratuit · sans inscription"
        titre="De quoi préparer votre projet."
        chapo="Un cahier des charges à remplir, les documents qui encadrent chaque projet, et deux outils pour regarder votre site actuel ou essayer un style. Rien à créer, rien à payer."
        large
      >
        <div className="su-res">
          <section className="su-res__section" aria-labelledby="su-res-liste">
            <h2 id="su-res-liste" className="sr-only">
              Les ressources
            </h2>
            <ul className="su-res__grille">
              {RESSOURCES.map((r) => (
                <li key={r.href}>
                  <Plaque as={Link} href={r.href} className="su-res__carte">
                    <p className="su-mono su-res__etiquette">{r.etiquette}</p>
                    <h3 className="su-res__carte-titre">{r.titre}</h3>
                    <p className="su-res__carte-texte">{r.texte}</p>
                    <span className="su-res__carte-pied">
                      <span className="su-res__lien">{r.action}</span>
                    </span>
                  </Plaque>
                </li>
              ))}
            </ul>
          </section>

          <section className="su-res__section" aria-labelledby="su-res-aussi">
            <h2 id="su-res-aussi" className="su-res__h2">
              Pour aller plus loin
            </h2>
            <p className="su-res__chapo">Les questions qu’on nous pose le plus souvent, et un comparatif entre Wix, WordPress et un site sur mesure qui dit aussi quand le sur mesure n’est pas le bon choix.</p>
            <div className="su-res__suite">
              <Link className="su-res__lien" href="/faq">
                Questions fréquentes
              </Link>
              <Link className="su-res__lien" href="/comparatif/wix-wordpress-sur-mesure">
                Wix, WordPress ou sur mesure
              </Link>
              <Link className="su-res__lien" href="/parrainage">
                Le parrainage
              </Link>
            </div>
          </section>

          {TYPES.map((t) => {
            const liste = articles.filter((a) => a.type === t.id)
            if (!liste.length) return null
            return (
              <section key={t.id} className="su-res__section" aria-labelledby={`su-res-${t.id}`}>
                <h2 id={`su-res-${t.id}`} className="su-res__h2">
                  {t.titre}
                </h2>
                <p className="su-res__chapo">{t.texte}</p>
                <ul className="su-res__liste">
                  {liste.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`}>{a.titre}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

          <section className="su-res__section" aria-labelledby="su-res-comp">
            <h2 id="su-res-comp" className="su-res__h2">
              Comparatifs honnêtes
            </h2>
            <ul className="su-res__liste">
              {COMPARATIFS.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.nom}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="su-res__section" aria-labelledby="su-res-outils">
            <h2 id="su-res-outils" className="su-res__h2">
              Tous les outils gratuits
            </h2>
            <ul className="su-res__liste">
              {OUTILS.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.nom}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Document>
    </>
  )
}
