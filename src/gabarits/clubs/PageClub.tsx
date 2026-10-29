/**
 * PAGE DE L'OFFRE « CLUBS DE TENNIS » — formules, fonctionnalités, pages locales, padel et pickleball, guides.
 * Gabarit Document (en-tête de nuit avec les appareils de la démo, corps ivoire), puis : réponse, démo, étapes,
 * sections, prix, FAQ, pages voisines, appel final et mentions de l'offre. Données structurées : Service (ou
 * Article pour un guide), FAQPage, BreadcrumbList, HowTo.
 */
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Lie from '@/components/editorial/Lie'
import Action from '@/components/ui/Action'
import { Duo } from '@/components/appareils/Appareils'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { ID } from '@/lib/schema'
import { jetonsProfond } from '@/lib/jetons'
import { RACINE_CLUBS } from '@/config/offre-clubs'
import { captureDemo } from '@/data/offre-clubs/captures'
import { nomDe } from '@/data/offre-clubs/catalogue'
import type { PageClub as Page } from '@/data/offre-clubs/types'
import { AppelFinal, CarteTarif, Etapes, GrilleLiens, PiedOffre } from './composants'
import { howTo, serviceClubs } from './schema'

const PARENTS: Record<Page['famille'], { nom: string; chemin: string } | null> = {
  formule: null,
  fonctionnalite: { nom: 'Fonctionnalités', chemin: `${RACINE_CLUBS}#fonctionnalites` },
  local: null,
  sport: null,
  guide: { nom: 'Guides', chemin: `${RACINE_CLUBS}/guides` },
}

const ZONES: Record<string, string> = {
  'centre-val-de-loire': 'Centre-Val de Loire',
  'indre-et-loire': 'Indre-et-Loire',
  cher: 'Cher',
  'eure-et-loir': 'Eure-et-Loir',
  indre: 'Indre',
  'loir-et-cher': 'Loir-et-Cher',
  loiret: 'Loiret',
}

export function metaPageClub(p: Page) {
  const j = jetonsProfond(p)
  return meta({ titre: j.titleSeo, description: j.descriptionSeo, chemin: p.chemin, type: p.famille === 'guide' ? 'article' : 'website', image: `/og/clubs${p.chemin.slice(RACINE_CLUBS.length) || ''}.png` })
}

export function arianeDe(p: { chemin: string; titre: string; famille: Page['famille'] }) {
  const parent = PARENTS[p.famille]
  return [{ href: '/', nom: 'Accueil' }, { href: RACINE_CLUBS, nom: 'Clubs de tennis' }, ...(parent ? [{ href: parent.chemin, nom: parent.nom }] : []), { href: p.chemin, nom: nomDe(p.chemin) }]
}

export default function PageClub({ page }: { page: Page }) {
  const p = jetonsProfond(page)
  const ariane = arianeDe(p)
  const sommaire = [
    ...(p.etapes?.length ? [{ id: 'comment-ca-marche', titre: p.famille === 'guide' ? 'La méthode, étape par étape' : 'Comment ça marche' }] : []),
    ...p.sections.map((s) => ({ id: s.id, titre: s.titre })),
    ...(p.tarif ? [{ id: 'prix', titre: 'Ce que ça coûte' }] : []),
    { id: 'faq', titre: 'Questions fréquentes' },
  ]
  const dateLisible = new Date(p.maj).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const zone = p.famille === 'local' ? ZONES[p.slug] : undefined
  const capture = p.capture ? captureDemo(p.capture) : null
  return (
    <>
      <JsonLd
        data={[
          filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))),
          p.famille === 'guide'
            ? { '@context': 'https://schema.org', '@type': 'Article', headline: p.titre, description: p.descriptionSeo, datePublished: p.maj, dateModified: p.maj, author: { '@id': ID.personne }, publisher: { '@id': ID.agence }, mainEntityOfPage: `${ORIGINE}${p.chemin}`, inLanguage: 'fr-FR' }
            : serviceClubs({ nom: p.titre, chemin: p.chemin, description: p.descriptionSeo, formule: p.tarif?.formule, zone }),
          faqPage(p.faq),
          ...(p.etapes?.length ? [howTo(p.titre, p.etapes)] : []),
        ]}
      />
      <Document
        moment={`clubs-${p.slug}`}
        ariane={ariane}
        etiquette={p.etiquette}
        titre={p.titre}
        chapo={p.reponse}
        maj={dateLisible}
        sommaire={sommaire}
        monde={capture ? <Duo projet={capture} prioritaire /> : undefined}
        entete={
          <p className="cl-demo-boutons">
            <Action href={`${RACINE_CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
            <Action href={p.demo?.[0]?.url ?? `${RACINE_CLUBS}/demo`} variante="contour">
              {p.demo?.[0] ? 'Voir dans la démo' : 'Voir la démo'}
            </Action>
          </p>
        }
      >
        {p.demo && p.demo.length > 0 && (
          <section aria-labelledby="dans-la-demo-t" className="cl-bloc" style={{ marginTop: 0 }}>
            <h2 id="dans-la-demo-t">À voir dans la démo</h2>
            <p>Le club fictif « Grand Chelem Tennis Club » est en ligne : ouvrez directement l’écran qui correspond.</p>
            <ul className="cl-demo-liens">
              {p.demo.map((d) => (
                <li key={d.url}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer">
                    {d.libelle} <span className="sr-only">(nouvel onglet)</span>↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {p.etapes && p.etapes.length > 0 && <Etapes etapes={p.etapes} titre={p.famille === 'guide' ? 'La méthode, étape par étape' : 'Comment ça marche'} />}
        {p.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="cl-bloc">
            <h2 id={`${s.id}-t`}>{s.titre}</h2>
            {s.paragraphes.map((t) => (
              <p key={t.slice(0, 48)}>
                <Lie t={t} />
              </p>
            ))}
            {s.liste && (
              <ul>
                {s.liste.map((l) => (
                  <li key={l.slice(0, 48)}>
                    <Lie t={l} />
                  </li>
                ))}
              </ul>
            )}
            {s.sous?.map((x) => (
              <div key={x.titre}>
                <h3>{x.titre}</h3>
                {x.paragraphes.map((t) => (
                  <p key={t.slice(0, 48)}>
                    <Lie t={t} />
                  </p>
                ))}
                {x.liste && (
                  <ul>
                    {x.liste.map((l) => (
                      <li key={l.slice(0, 48)}>
                        <Lie t={l} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
        {p.tarif && (
          <section id="prix" aria-labelledby="prix-t" className="cl-bloc">
            <h2 id="prix-t">Ce que ça coûte</h2>
            <CarteTarif formule={p.tarif.formule} optionId={p.tarif.option} texte={p.tarif.texte} />
          </section>
        )}
        <section id="faq" aria-labelledby="faq-t" className="cl-bloc">
          <h2 id="faq-t">Questions fréquentes</h2>
          <Accordeon questions={p.faq.map((f) => ({ q: f.q, r: f.a }))} groupe={`faq-${p.slug}`} />
        </section>
        {p.liens.length > 0 && <GrilleLiens id="aller-plus-loin" titre="Pour aller plus loin" liens={p.liens} />}
        {p.sources && p.sources.length > 0 && (
          <section id="sources" aria-labelledby="sources-t" className="cl-bloc">
            <h2 id="sources-t">Sources officielles</h2>
            <ul>
              {p.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer">
                    {s.nom}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <AppelFinal />
        <PiedOffre />
      </Document>
    </>
  )
}
