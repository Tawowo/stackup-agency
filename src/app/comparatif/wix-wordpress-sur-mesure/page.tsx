/**
 * /comparatif/wix-wordpress-sur-mesure — un tableau honnête, sans score ni
 * pourcentage : huit critères, un verdict en mots et une phrase par case.
 * Dit quand Wix ou WordPress sont le meilleur choix. Nos prix viennent de
 * SITE, toujours « à partir de ». Rendu serveur ; la découpe des lignes à
 * l'entrée dans la vue est en CSS (animation-timeline), sans JS.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import { formatAPartirDe, offre } from '@/config/site'
import { exemplesAbonnement } from '@/domain/devis/offres'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Wix, WordPress ou site sur mesure — un comparatif honnête | Stackup Agency',
  description: 'Propriété du code, frais récurrents, souplesse, performances, maintenance : Wix, WordPress et le sur mesure comparés critère par critère, avec les cas où Wix ou WordPress sont le meilleur choix.',
  chemin: '/comparatif/wix-wordpress-sur-mesure',
  type: 'article',
})

type Niveau = 'fort' | 'moyen' | 'faible'
interface Case {
  n: Niveau
  mot: string
  t: string
}
interface Ligne {
  critere: string
  wix: Case
  wp: Case
  nous: Case
}

const ABONNEMENT_MIN = exemplesAbonnement()[0]!.mensuel

const LIGNES: Ligne[] = [
  {
    critere: 'Propriété du site',
    wix: { n: 'faible', mot: 'Vous louez', t: 'Le site vit sur la plateforme. On ne peut pas en exporter le code complet pour l’emmener ailleurs.' },
    wp: { n: 'fort', mot: 'À vous', t: 'Logiciel libre : le site et ses données vous appartiennent, hébergeables où vous voulez.' },
    nous: { n: 'fort', mot: 'À vous', t: 'Le code vous est cédé à réception du solde, par une cession de droits écrite.' },
  },
  {
    critere: 'Frais récurrents',
    wix: { n: 'faible', mot: 'Abonnement obligatoire', t: 'Un abonnement mensuel est nécessaire pour garder le site en ligne, avec votre nom de domaine et sans publicité de la plateforme.' },
    wp: { n: 'moyen', mot: 'Selon les choix', t: 'Le logiciel est gratuit ; l’hébergement ne l’est pas, ni souvent les thèmes et extensions payants, facturés à l’année.' },
    nous: { n: 'moyen', mot: 'Au choix', t: `Nom de domaine offert la première année. Ensuite, l’hébergement à votre charge, ou un abonnement composé selon vos besoins, à partir d’environ ${ABONNEMENT_MIN} € par mois, sans engagement, préavis d’un mois.` },
  },
  {
    critere: 'Coût de départ',
    wix: { n: 'fort', mot: 'Faible', t: 'Presque rien si vous le faites vous-même : c’est votre temps qui paie.' },
    wp: { n: 'moyen', mot: 'Très variable', t: 'De presque rien si vous le montez seul à un vrai budget avec un prestataire.' },
    nous: { n: 'moyen', mot: 'Plus élevé', t: `Un site une page ${formatAPartirDe(offre('une-page'))}. Plus qu’un abonnement au départ, sans abonnement de plateforme ensuite.` },
  },
  {
    critere: 'Souplesse',
    wix: { n: 'moyen', mot: 'Dans le cadre', t: 'Large dans les limites de l’éditeur et de ses applications ; au-delà, on bute.' },
    wp: { n: 'fort', mot: 'Très large', t: 'Des extensions pour presque tout, au prix d’un empilement qu’il faut surveiller.' },
    nous: { n: 'fort', mot: 'Sans limite d’outil', t: 'Tout ce qui se programme : réservation, devis, espace client, outil de gestion. Chaque ajout passe par un développeur.' },
  },
  {
    critere: 'Performances',
    wix: { n: 'moyen', mot: 'Correctes', t: 'Suffisantes pour un site simple ; on a peu de prise sur ce que la page charge.' },
    wp: { n: 'moyen', mot: 'Selon le thème', t: 'Excellentes sur un site sobre et bien tenu, lentes quand thème et extensions s’accumulent.' },
    nous: { n: 'fort', mot: 'Maîtrisées', t: 'Chaque page n’embarque que ce dont elle a besoin. C’est là que le sur mesure se voit le plus.' },
  },
  {
    critere: 'Modifier soi-même',
    wix: { n: 'fort', mot: 'Le plus simple', t: 'Un éditeur visuel, rien à installer : c’est le grand point fort de Wix.' },
    wp: { n: 'moyen', mot: 'À apprendre', t: 'Une interface d’administration très répandue, qui demande un peu de prise en main.' },
    nous: { n: 'moyen', mot: 'Ce qui est prévu', t: 'Ce que vous changez souvent est rendu modifiable (espace d’administration si besoin) ; le reste passe par nous.' },
  },
  {
    critere: 'Qui maintient',
    wix: { n: 'fort', mot: 'La plateforme', t: 'Mises à jour et sécurité sont comprises dans l’abonnement : vous n’avez rien à faire.' },
    wp: { n: 'faible', mot: 'Vous', t: 'Le cœur, le thème et les extensions demandent des mises à jour régulières ; négligées, elles deviennent une faille.' },
    nous: { n: 'moyen', mot: 'Nous, ou qui vous voulez', t: 'Peu de dépendances à suivre. Avec la maintenance, c’est nous ; sans, un autre développeur peut reprendre le code.' },
  },
  {
    critere: 'Changer de prestataire',
    wix: { n: 'faible', mot: 'Difficile', t: 'Quitter la plateforme revient le plus souvent à refaire le site.' },
    wp: { n: 'fort', mot: 'Facile', t: 'Un très grand nombre de prestataires connaissent WordPress.' },
    nous: { n: 'fort', mot: 'Possible', t: 'Un code courant (React, Next.js) qui vous appartient : un autre développeur peut le reprendre.' },
  },
]

const COLONNES = [
  { cle: 'wix', nom: 'Wix' },
  { cle: 'wp', nom: 'WordPress' },
  { cle: 'nous', nom: 'Sur mesure' },
] as const

const QUAND = [
  {
    titre: 'Choisissez Wix si…',
    points: ['vous voulez le faire vous-même, vite, avec un budget de départ minimal ;', 'c’est un site personnel, un projet à tester, une activité qui démarre ;', 'vous changerez le contenu vous-même chaque semaine et n’avez besoin d’aucune fonction particulière.'],
  },
  {
    titre: 'Choisissez WordPress si…',
    points: ['vous publiez beaucoup (blog, actualités) avec une équipe habituée à son interface ;', 'vous voulez un large choix d’extensions et de prestataires ;', 'quelqu’un s’occupera sérieusement des mises à jour.'],
  },
  {
    titre: 'Choisissez le sur mesure si…',
    points: ['le site est un outil de travail : il doit être rapide, à vous, et faire exactement ce que votre métier demande ;', 'vous avez besoin d’une fonction précise (réservation, devis, gestion) sans empiler des extensions ;', 'vous préférez un interlocuteur qui a écrit le code.'],
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Wix, WordPress ou sur mesure', chemin: '/comparatif/wix-wordpress-sur-mesure' },
        ])}
      />
      <Document
        moment="doc-comparatif"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/ressources', nom: 'Ressources' },
          { href: '/comparatif/wix-wordpress-sur-mesure', nom: 'Comparatif' },
        ]}
        etiquette="Comparatif · 8 critères"
        titre="Wix, WordPress ou sur mesure ?"
        chapo="Trois façons honnêtes de faire un site. Aucune n’est la meilleure pour tout le monde : voici ce que chacune vous coûte et vous rapporte, critère par critère."
        large
      >
        <div className="su-res">
          <section className="su-res__section" aria-labelledby="su-cmp-titre">
            <h2 id="su-cmp-titre" className="su-res__h2">
              Critère par critère
            </h2>
            <table className="su-cmp">
              <caption>Chaque case : un verdict en un mot, puis pourquoi. Aucun score, aucun pourcentage.</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  {COLONNES.map((c) => (
                    <th key={c.cle} scope="col" data-nous={c.cle === 'nous' ? '1' : '0'}>
                      {c.nom}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LIGNES.map((l) => (
                  <tr key={l.critere}>
                    <th scope="row">{l.critere}</th>
                    {COLONNES.map((c) => {
                      const x = l[c.cle]
                      return (
                        <td key={c.cle} data-col={c.nom} data-nous={c.cle === 'nous' ? '1' : '0'}>
                          <span className="su-cmp__verdict" data-v={x.n}>
                            {x.mot}
                          </span>
                          {x.t}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="su-res__section" aria-labelledby="su-cmp-quand">
            <h2 id="su-cmp-quand" className="su-res__h2">
              Quand choisir quoi
            </h2>
            <ul className="su-cmp-quand">
              {QUAND.map((q) => (
                <li key={q.titre}>
                  <Plaque as="article" className="su-res__carte">
                    <h3 className="su-res__carte-titre">{q.titre}</h3>
                    <ul>
                      {q.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </Plaque>
                </li>
              ))}
            </ul>
          </section>

          <div className="su-prose">
            <h2 id="avis">Notre avis, en clair</h2>
            <p>
              Nous faisons du sur mesure, donc nous ne sommes pas neutres. Mais un site une page que vous voulez retoucher vous-même chaque semaine, sans aucune fonction particulière, sera très bien sur Wix — et nous vous le dirons si c’est votre cas.
            </p>
            <p>
              WordPress reste un excellent outil quand il est tenu : mis à jour, sobre en extensions, confié à quelqu’un qui le connaît. Ses défauts viennent presque toujours de l’empilement et de l’abandon, pas du logiciel lui-même.
            </p>
            <p>
              Le sur mesure coûte plus au départ. Il prend l’avantage quand le site doit travailler pour vous : être rapide, faire une chose précise pour votre métier, et rester à vous. Chez nous, un site une page est {formatAPartirDe(offre('une-page'))}, un outil de gestion {formatAPartirDe(offre('outil'))} ; le calendrier et le prix exact se fixent ensemble au devis.
            </p>
          </div>

          <div className="su-res__entete">
            <Action href="/contact">Parler de mon projet</Action>
            <Action href="/tarifs" variante="contour">
              Voir les tarifs
            </Action>
          </div>

          <div className="su-res__suite">
            <Link className="su-res__lien" href="/ressources/cahier-des-charges">
              Préparer mon cahier des charges
            </Link>
            <Link className="su-res__lien" href="/realisations">
              Les démos en ligne
            </Link>
            <Link className="su-res__lien" href="/faq">
              Questions fréquentes
            </Link>
          </div>
        </div>
      </Document>
    </>
  )
}
