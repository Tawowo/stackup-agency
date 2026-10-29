import type { Metadata } from 'next'
import Hall from '@/experiences/galerie/Hall'
import { PROJETS } from '@/experiences/galerie/projets'
import Link from 'next/link'
import '@/components/editorial/editorial.css'
import '@/gabarits/document/document.css'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: 'Réalisations — un site en ligne et notre logiciel de gestion | Stackup Agency',
  description: 'Le site du Tennis Club Savigné-Gizeux, en ligne, et Artibox, le logiciel de gestion pour artisans, en développement : deux réalisations réelles, avec leurs vraies captures d’écran.',
  chemin: '/realisations',
})

export default function Page() {
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Réalisations', chemin: '/realisations' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: PROJETS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${ORIGINE}/realisations/${p.slug}`, name: p.nom })),
          },
        ]}
      />
      <Hall />
      <section className="su-doc__corps" data-nuit="1" aria-labelledby="realisations-texte" style={{ padding: '3rem var(--su-gouttiere, 24px)' }}>
        <div className="su-prose su-doc__prose su-real__texte">
          <h2 id="realisations-texte">Ce que montrent ces réalisations</h2>
          <p>
            Deux projets réels, sans maquette habillée : le site d’un club de sport de proximité, en ligne, et un logiciel de gestion pour artisans, en développement. Chacun a sa fiche détaillée, avec le contexte, le besoin, la solution, les choix de fabrication et ce que l’on peut déjà dire des résultats : aucun chiffre n’est avancé tant qu’il n’est pas confirmé par le client.
          </p>
          <ul>
            {PROJETS.map((p) => (
              <li key={p.slug}>
                <Link href={`/realisations/${p.slug}`}>{p.nom}</Link> — {p.type.toLowerCase()}.
              </li>
            ))}
          </ul>
          <h2>Comment un projet se déroule</h2>
          <p>
            Vous racontez votre activité, vous voyez une démo de votre page d’accueil avant de signer, le prix est écrit avant de commencer, puis le site ou l’outil est fabriqué à la main, sans WordPress ni constructeur en ligne. À la fin, le code et les données vous appartiennent. Pour estimer votre projet, utilisez l’<Link href="/tarifs#estimer">estimateur de prix</Link> ; pour parler du vôtre, <Link href="/contact?a=appel">réservez un appel gratuit de 30 minutes</Link>.
          </p>
          <p>
            Pour aller plus loin : les <Link href="/solutions">modules de l’outil de gestion</Link>, les <Link href="/comparatif">comparatifs plateforme ou sur mesure</Link> et les <Link href="/creation-site-internet">pages par métier</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
