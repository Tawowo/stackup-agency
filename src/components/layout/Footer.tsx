import Link from 'next/link'
import LogoMarque from '@/components/ui/LogoMarque'
import { ENTREES, RESSOURCES } from './entrees'
import { SITE } from '@/config/site'
import { ZONES } from '@/data/zones'
import { SOLUTIONS } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { VILLES } from '@/data/villes'
import { DEPARTEMENTS } from '@/data/departements'
import { SERVICES_LOCAUX } from '@/data/services-locaux'
import { RAYONS } from '@/lib/blog'

/** Les métiers et villes les plus demandés (priorité P1 des données) : le footer en cite quelques-uns, le reste est à un clic. */
const METIERS_PHARES = METIERS.filter((m) => m.priorite === 'P1').slice(0, 7)
const VILLES_PHARES = VILLES.filter((v) => v.priorite === 'P1').slice(0, 7)

const PILIERS_PIED: [string, string][] = [
  ['/services/creation-de-site-internet', 'Création de site internet'],
  ['/services/refonte-de-site-internet', 'Refonte de site'],
  ['/services/referencement', 'Référencement'],
  ['/services/referencement-local', 'Référencement local'],
  ['/services/site-ecommerce', 'Boutique en ligne'],
  ['/services/logiciel-de-gestion', 'Logiciel de gestion'],
  ['/services/ia-et-automatisation', 'IA et automatisation'],
  ['/services/facture-electronique', 'Facture électronique'],
  ['/services/maintenance', 'Maintenance'],
]

/**
 * FOOTER COMPLET — logo exact, puis toutes les familles de pages : offres,
 * outils de gestion, métiers, villes, journal, outils gratuits, légal. Chaque
 * famille a sa porte « tout voir ». Pas de filigrane, pas d'étoiles.
 */
export default function Footer() {
  return (
    <footer className="su-footer">
      <div className="su-footer__grille">
        <div className="su-footer__marque">
          <span className="su-logo-plaque">
            <LogoMarque taille={40} />
          </span>
          <p className="su-footer__ligne">
            Sites et outils sur mesure. {SITE.ville}, {SITE.departement}.
          </p>
          <a className="su-footer__mail" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <a className="su-footer__mail" href={SITE.telephoneLien}>
            {SITE.telephone}
          </a>
        </div>
        <nav className="su-footer__familles" aria-label="Pied de page">
          <div className="su-footer__famille">
            <h2>L’agence</h2>
            <ul>
              {[...ENTREES, { href: '/contact', nom: 'Contact' }].map((e) => (
                <li key={e.href}>
                  <Link href={e.href}>{e.nom}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Services</h2>
            <ul>
              {PILIERS_PIED.map(([href, nom]) => (
                <li key={href}>
                  <Link href={href}>{nom}</Link>
                </li>
              ))}
              {Object.entries(SERVICES_LOCAUX)
                .slice(0, 3)
                .map(([slug, s]) => (
                  <li key={slug}>
                    <Link href={`/services-locaux/${slug}`}>{s.title.replace('Création de site web pour ', 'Site pour ').replace('Création de ', '')}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Outils de gestion</h2>
            <ul>
              {SOLUTIONS.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`}>{s.nom}</Link>
                </li>
              ))}
              <li>
                <Link href="/solutions">Les {SOLUTIONS.length} outils →</Link>
              </li>
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Métiers</h2>
            <ul>
              {METIERS_PHARES.map((m) => (
                <li key={m.slug}>
                  <Link href={`/creation-site-internet/${m.slug}`}>{m.metier.charAt(0).toUpperCase() + m.metier.slice(1)}</Link>
                </li>
              ))}
              <li>
                <Link href="/creation-site-internet">Les {METIERS.length} métiers →</Link>
              </li>
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Villes</h2>
            <ul>
              {VILLES_PHARES.map((v) => (
                <li key={v.slug}>
                  <Link href={`/agence-web/${v.slug}`}>{v.ville}</Link>
                </li>
              ))}
              <li>
                <Link href="/agence-web">Les {VILLES.length} villes →</Link>
              </li>
              <li>
                <Link href="/zones-intervention">{ZONES.length} zones et votre commune →</Link>
              </li>
              <li>
                <Link href="/zones-intervention/touraine-ouest-val-de-loire">Touraine Ouest Val de Loire</Link>
              </li>
              <li>
                <Link href="/agence-web/departement/indre-et-loire">{DEPARTEMENTS.length} départements</Link>
              </li>
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Le journal</h2>
            <ul>
              {RAYONS.slice(0, 6).map((r) => (
                <li key={r.id}>
                  <Link href={`/blog/categorie/${r.id}`}>{r.nom}</Link>
                </li>
              ))}
              <li>
                <Link href="/blog">Tous les articles →</Link>
              </li>
            </ul>
          </div>
          <div className="su-footer__famille">
            <h2>Outils gratuits</h2>
            <ul>
              <li>
                <Link href="/outils/audit-site">Audit de site</Link>
              </li>
              <li>
                <Link href="/outils/generateur-mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/outils/modele-devis">Modèle de devis</Link>
              </li>
              <li>
                <Link href="/outils/calculateur-clients-perdus">Clients perdus</Link>
              </li>
              <li>
                <Link href="/outils/calculateur-abonnement-saas">Abonnement ou sur mesure</Link>
              </li>
              <li>
                <Link href="/outils/checklist-facture-electronique">Facture électronique</Link>
              </li>
              <li>
                <Link href="/tarifs#estimer">Estimer mon projet</Link>
              </li>
              <li>
                <Link href="/ressources/cahier-des-charges">Cahier des charges</Link>
              </li>
              <li>
                <Link href="/ressources/documents">Documents</Link>
              </li>
              {RESSOURCES.filter((r) => ['/faq', '/parrainage'].includes(r.href)).map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.nom}</Link>
                </li>
              ))}
              <li>
                <Link href="/lexique">Lexique</Link>
              </li>
              <li>
                <Link href="/comparatif">Comparatifs</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="su-footer__bas su-mono">
          <ul>
            <li>
              <Link href="/stackup-agency-en-bref">Stackup en bref</Link>
            </li>
            <li>
              <Link href="/auteur/matheo-reboul">L’auteur</Link>
            </li>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/politique-confidentialite">Confidentialité</Link>
            </li>
            <li>
              <Link href="/cgv">CGV</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/plan-du-site">Plan du site</Link>
            </li>
          </ul>
          <span>{SITE.mentions.tva}</span>
        </div>
      </div>
    </footer>
  )
}
