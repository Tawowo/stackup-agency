/**
 * PAGE PILIER / COMPARATIF — gabarit Document + corps long + données structurées (Service ou Article, FAQPage, BreadcrumbList).
 */
import Link from 'next/link'
import { COMPARATIFS } from '@/data/piliers/comparatifs'
import Document from '@/gabarits/document/Document'
import Action from '@/components/ui/Action'
import PilierCorps, { sommaireDe } from './PilierCorps'
import { JsonLd, ORIGINE, faqPage, filAriane, meta, offreService } from '@/lib/seo'
import { SITE } from '@/config/site'
import { sansLiens } from '@/components/editorial/Lie'
import { jetonsProfond } from '@/lib/jetons'
import { liensPublies } from '@/lib/liens-publies'
import type { Pilier } from '@/data/piliers/types'
import './pilier.css'

const OFFRE_DU_PILIER: Record<string, 'une-page' | 'multi-pages' | 'boutique' | 'outil'> = { 'logiciel-de-gestion': 'outil', 'ia-et-automatisation': 'outil', 'facture-electronique': 'outil', 'site-ecommerce': 'boutique' }

export function metaPilier(p: Pilier) {
  const j = jetonsProfond(p)
  return meta({ titre: j.titleSeo, description: j.descriptionSeo, chemin: p.chemin, type: p.type === 'comparatif' ? 'article' : 'website' })
}

export default function PagePilier({ pilier }: { pilier: Pilier }) {
  const p = liensPublies(jetonsProfond(pilier))
  const etapes = p.sections.find((x) => /se déroule|démarre-t-on/i.test(x.titre) && (x.liste?.length ?? 0) >= 3)
  const parent = p.type === 'comparatif' ? { nom: 'Comparatifs', chemin: '/comparatif' } : { nom: 'Services', chemin: '/services' }
  const ariane = [
    { href: '/', nom: 'Accueil' },
    { href: parent.chemin, nom: parent.nom },
    { href: p.chemin, nom: p.titre },
  ]
  return (
    <>
      <JsonLd
        data={[
          filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))),
          p.type === 'comparatif'
            ? { '@context': 'https://schema.org', '@type': 'Article', headline: p.titre, description: p.descriptionSeo, dateModified: p.maj, datePublished: p.maj, author: { '@type': 'Person', name: SITE.fondateur, url: `${ORIGINE}/a-propos` }, publisher: { '@id': `${ORIGINE}/#agence` }, mainEntityOfPage: `${ORIGINE}${p.chemin}` }
            : { '@context': 'https://schema.org', '@type': 'Service', name: p.titre, description: p.descriptionSeo, url: `${ORIGINE}${p.chemin}`, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: [{ '@type': 'AdministrativeArea', name: 'Indre-et-Loire' }, { '@type': 'Country', name: 'France' }], serviceType: p.etiquette, offers: offreService(OFFRE_DU_PILIER[p.slug] ?? 'une-page') },
          faqPage(p.faq),
          ...(etapes ? [{ '@context': 'https://schema.org', '@type': 'HowTo', name: etapes.titre, step: (etapes.liste ?? []).map((l, i) => { const [nom, ...suite] = sansLiens(l).split(' : '); return { '@type': 'HowToStep', position: i + 1, name: nom, text: suite.length ? suite.join(' : ') : nom } }) }] : []),
        ]}
      />
      <Document
        moment={`pilier-${p.slug}`}
        ariane={ariane}
        etiquette={p.etiquette}
        titre={p.titre}
        chapo={p.reponse}
        maj={new Date(p.maj).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        sommaire={sommaireDe(p)}
        entete={
          <p className="su-pil__actions">
            <Action href="/tarifs#estimer">Estimer mon projet</Action>
            <Action href="/contact?a=demo" variante="contour">
              Demander ma démo
            </Action>
          </p>
        }
      >
        <PilierCorps pilier={liensPublies(pilier)} avecReponse={false} />
        {p.type === 'comparatif' && (
          <section aria-labelledby="autres-comparatifs">
            <h2 id="autres-comparatifs">Autres comparatifs</h2>
            <ul>
              {COMPARATIFS.filter((c) => c.chemin !== p.chemin)
                .slice(0, 4)
                .map((c) => (
                  <li key={c.chemin}>
                    <Link href={c.chemin}>{c.nom}</Link>
                  </li>
                ))}
              <li>
                <Link href="/comparatif">Tous les comparatifs</Link>
              </li>
            </ul>
          </section>
        )}
      </Document>
    </>
  )
}
