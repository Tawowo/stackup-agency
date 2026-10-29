/**
 * COOKIES — reprise de l'ancienne page, mise à jour : la V5 ne dépose aucun
 * cookie (ni thème, ni consentement, ni mesure d'audience). Seule une clé de
 * stockage de session mémorise le niveau de qualité 3D forcé par l'adresse (?quality=).
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { SITE } from '@/config/site'
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Cookies du site : aucun cookie publicitaire ni traceur',
  description: 'Le site stackup-agency.fr ne dépose aucun cookie publicitaire ni de mesure d’audience. Ce qui est stocké dans votre navigateur, et comment le supprimer.',
  chemin: '/cookies',
})

const SOMMAIRE = [
  { id: 'definition', titre: 'Qu’est-ce qu’un cookie ?' },
  { id: 'ce-site', titre: 'Ce que ce site dépose' },
  { id: 'tiers', titre: 'Tiers et publicité' },
  { id: 'gestion', titre: 'Gérer votre navigateur' },
  { id: 'contact', titre: 'Contact' },
]

export default function Cookies() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Cookies', chemin: '/cookies' }])} />
      <Document
        moment="doc-cookies"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/cookies', nom: 'Cookies' },
        ]}
        etiquette="Cookies"
        titre="Aucun cookie à accepter"
        chapo="Pas de bandeau, parce qu’il n’y a rien à vous demander : ce site ne vous suit pas."
        maj="13 octobre 2026"
        sommaire={SOMMAIRE}
      >
        <h2 id="definition">Qu’est-ce qu’un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, téléphone) lors de la visite d’un site. Il permet au site de mémoriser des informations sur votre visite. Les autres moyens de stockage du navigateur suivent les mêmes règles.
        </p>

        <h2 id="ce-site">Ce que ce site dépose</h2>
        <p>
          À ce jour, stackup-agency.fr <strong>ne dépose aucun cookie</strong>. Une seule information technique peut être gardée dans le stockage de session de votre navigateur, sans donnée personnelle :
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Finalité</th>
              <th scope="col">Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>su-quality</code>
              </td>
              <td>Garder le niveau de qualité de l’affichage 3D quand il est choisi dans l’adresse (paramètre ?quality=, usage de test) ; absente en navigation normale</td>
              <td>Jusqu’à la fermeture de l’onglet</td>
            </tr>
          </tbody>
        </table>
        <p>Strictement nécessaire à l’affichage, ce stockage est exempté de consentement.</p>

        <h2 id="tiers">Tiers et publicité</h2>
        <p>
          Le site n’utilise <strong>aucun cookie publicitaire, aucune mesure d’audience tierce et aucun pistage</strong>. Les polices sont servies par le site lui-même, et les liens vers les réseaux sociaux sont de simples liens : rien n’est chargé chez eux tant que vous ne cliquez pas.
        </p>

        <h2 id="gestion">Gérer votre navigateur</h2>
        <p>Vous pouvez à tout moment effacer les cookies et les données de site stockés par votre navigateur :</p>
        <ul>
          <li>
            <strong>Chrome</strong> : Paramètres → Confidentialité et sécurité → Cookies et autres données des sites ;
          </li>
          <li>
            <strong>Firefox</strong> : Paramètres → Vie privée et sécurité → Cookies et données de sites ;
          </li>
          <li>
            <strong>Safari</strong> : Réglages → Confidentialité → Gérer les données de sites web ;
          </li>
          <li>
            <strong>Edge</strong> : Paramètres → Cookies et autorisations de site.
          </li>
        </ul>

        <h2 id="contact">Contact</h2>
        <p>
          Une question sur les cookies ou vos données : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Voir aussi la <Link href="/politique-confidentialite">politique de confidentialité</Link> et les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </Document>
    </>
  )
}
