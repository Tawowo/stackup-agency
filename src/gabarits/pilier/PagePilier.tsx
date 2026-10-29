/**
 * PAGE PILIER / COMPARATIF — gabarit Document + corps long + données structurées (Service ou Article, FAQPage, BreadcrumbList).
 */
import Document from '@/gabarits/document/Document'
import Action from '@/components/ui/Action'
import PilierCorps, { sommaireDe } from './PilierCorps'
import { JsonLd, ORIGINE, faqPage, filAriane, meta, offreService } from '@/lib/seo'
import { SITE } from '@/config/site'
import { sansLiens } from '@/components/editorial/Lie'
import { jetonsProfond } from '@/lib/jetons'
import type { Pilier } from '@/data/piliers/types'
import './pilier.css'

const OFFRE_DU_PILIER: Record<string, 'une-page' | 'multi-pages' | 'boutique' | 'outil'> = { 'logiciel-de-gestion': 'outil', 'ia-et-automatisation': 'outil', 'facture-electronique': 'outil', 'site-ecommerce': 'boutique' }

export function metaPilier(p: Pilier) {
  const j = jetonsProfond(p)
  return meta({ titre: j.titleSeo, description: j.descriptionSeo, chemin: p.chemin, type: p.type === 'comparatif' ? 'article' : 'website' })
}

export default function PagePilier({ pilier }: { pilier: Pilier }) {
  const p = jetonsProfond(pilier)
  const etapes = p.sections.find((x) => /se déroule|démarre-t-on/i.test(x.titre) && (x.liste?.length ?? 0) >= 3)
  const parent = p.type === 'comparatif' ? { nom: 'Comparatifs', chemin: '/comparatif/wix-wordpress-sur-mesure' } : { nom: 'Services', chemin: '/services' }
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
            <Action href="/contact?objet=demo" variante="contour">
              Demander ma démo
            </Action>
          </p>
        }
      >
        <PilierCorps pilier={pilier} avecReponse={false} />
      </Document>
    </>
  )
}
