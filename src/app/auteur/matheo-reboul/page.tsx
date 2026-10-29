/**
 * /auteur/matheo-reboul — la page de l'auteur : qui écrit, ce qu'il sait faire (et ne fait pas), comment les contenus sont
 * préparés, mis à jour et sourcés, et la liste de ses articles. Aucune qualification ni distinction n'est inventée.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { SITE } from '@/config/site'
import { tousLesArticles } from '@/lib/blog'
import { JsonLd, ORIGINE, filAriane, meta } from '@/lib/seo'
import '@/gabarits/pilier/pilier.css'

export const metadata = meta({
  titre: 'Mathéo Reboul, auteur : sites, référencement, outils',
  description: 'Mathéo Reboul conçoit et code des sites et des outils de gestion sur mesure en Touraine. Ses guides, ses sources, sa méthode de mise à jour, et tous ses articles.',
  chemin: '/auteur/matheo-reboul',
})

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Page() {
  const articles = tousLesArticles()
  return (
    <>
      <JsonLd
        data={[
          filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Mathéo Reboul', chemin: '/auteur/matheo-reboul' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              '@id': `${ORIGINE}/#matheo`,
              name: SITE.fondateur,
              url: `${ORIGINE}/auteur/matheo-reboul`,
              jobTitle: 'Fondateur de Stackup Agency, développeur web',
              worksFor: { '@id': `${ORIGINE}/#agence` },
              address: { '@type': 'PostalAddress', addressLocality: SITE.entreprise.commune, postalCode: SITE.entreprise.codePostal, addressCountry: 'FR' },
              sameAs: Object.values(SITE.social),
              knowsAbout: ['création de site internet', 'référencement naturel', 'référencement local', 'logiciel de gestion sur mesure', 'facture électronique', 'automatisation'],
            },
          },
        ]}
      />
      <Document
        moment="auteur"
        ariane={[{ href: '/', nom: 'Accueil' }, { href: '/auteur/matheo-reboul', nom: SITE.fondateur }]}
        etiquette="L’auteur"
        titre="Mathéo Reboul."
        chapo="Je conçois, code et mets en ligne des sites et des outils de gestion sur mesure pour des gens qui ont un métier à faire tourner. J’écris ici ce que je répondrais à un client."
        maj="29 octobre 2026"
      >
        <h2>Qui écrit ces pages</h2>
        <p>
          Je m’appelle Mathéo Reboul, j’exerce en entreprise individuelle sous le nom Stackup Agency, depuis Savigné-sur-Lathan, en Touraine. Je suis seul : la personne qui répond à votre demande est celle qui écrit le code. Le détail est sur la page <Link href="/a-propos">à propos</Link> et la fiche <Link href="/stackup-agency-en-bref">Stackup Agency en bref</Link>.
        </p>
        <h2>Sur quoi je peux vous renseigner</h2>
        <ul>
          <li>Création et refonte de sites internet pour artisans, commerçants, TPE et professions libérales.</li>
          <li>Référencement naturel et local : fiche Google, avis, structure d’un site.</li>
          <li>Outils de gestion sur mesure : devis, factures, planning, rendez-vous, automatisations.</li>
          <li>Maintenance, sécurité et récupération d’un site abandonné.</li>
        </ul>
        <h2>Sur quoi je ne suis pas un expert</h2>
        <p>Je ne suis ni juriste, ni expert-comptable. Quand un article touche à la loi (mentions légales, RGPD, facture électronique), je décris les grandes lignes, je cite les sites officiels et je vous renvoie vers votre comptable ou un professionnel du droit pour votre cas précis.</p>
        <h2>Comment ces contenus sont préparés</h2>
        <p>Chaque article répond à une question réellement posée par des artisans et des commerçants. Les règles sont vérifiées sur les sites officiels cités en fin d’article, les prix de Stackup viennent de la grille tarifaire du site (toujours « à partir de »), et aucune statistique n’est inventée. La date de dernière mise à jour est affichée sur chaque page ; une erreur peut m’être signalée à {SITE.email}.</p>
        <h2>Mes derniers articles</h2>
        <p>
          {articles.length} articles et guides sont réunis dans <Link href="/blog">le journal</Link>, les définitions dans le <Link href="/lexique">lexique</Link>. Les plus récents :
        </p>
        <ul className="su-bref-liste">
          {articles.slice(0, 12).map((a) => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}`}>{a.titre}</Link> <span className="su-mono">· {dateFr(a.maj ?? a.date)}</span>
            </li>
          ))}
        </ul>
      </Document>
    </>
  )
}
