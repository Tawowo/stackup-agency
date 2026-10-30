'use client'
/**
 * BARRE D'APPEL — mobile uniquement : le téléphone et la demande de démo restent à portée de pouce.
 * Rendue côté serveur (présente sans JS), masquée à partir de 768 px et sur les pages où le formulaire est déjà là.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE } from '@/config/site'

const SANS_BARRE = /^\/(contact|tarifs|mentions-legales|cgv|cgv-plateforme|politique-confidentialite|cookies|desinscription|clubs-de-tennis\/simulateur)(\/|$)/

export default function BarreAppel() {
  const chemin = usePathname() ?? '/'
  if (SANS_BARRE.test(chemin)) return null
  const club = chemin === '/clubs-de-tennis' || chemin.startsWith('/clubs-de-tennis/')
  return (
    <nav className="su-barre-appel" aria-label="Contact rapide">
      <a className="su-barre-appel__tel" href={SITE.telephoneLien}>
        Appeler
        <span className="sr-only"> le {SITE.telephone}</span>
      </a>
      {club ? (
        <Link className="su-barre-appel__demo" href="/clubs-de-tennis/demo" data-evt="clubs_clic_demo">
          Voir la démo
        </Link>
      ) : (
        <Link className="su-barre-appel__demo" href="/contact?a=demo">
          Demander ma démo
        </Link>
      )}
    </nav>
  )
}
