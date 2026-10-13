import Link from 'next/link'
import LogoMarque from '@/components/ui/LogoMarque'
import { ENTREES } from './entrees'
import { SITE } from '@/config/site'

/** FOOTER — logo exact, navigation, mentions. Pas de filigrane, pas d'étoiles. */
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
        </div>
        <nav className="su-footer__nav" aria-label="Pied de page">
          <ul>
            {[...ENTREES, { href: '/contact', nom: 'Contact' }].map((e) => (
              <li key={e.href}>
                <Link href={e.href}>{e.nom}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="su-footer__legal su-mono">
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </li>
          <li>
            <Link href="/cgv">CGV</Link>
          </li>
          <li>{SITE.mentions.tva}</li>
        </ul>
      </div>
    </footer>
  )
}
