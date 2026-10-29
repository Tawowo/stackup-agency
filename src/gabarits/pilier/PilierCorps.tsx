/**
 * LE CORPS D'UNE PAGE PILIER OU D'UN COMPARATIF — sections h2/h3, exemples types, tableau, FAQ, sources, liens.
 * Texte pur, rendu serveur, aucune animation : tout le contenu est dans le HTML.
 */
import Link from 'next/link'
import Accordeon from '@/components/editorial/Accordeon'
import { jetonsProfond } from '@/lib/jetons'
import type { Pilier } from '@/data/piliers/types'

/** Les sources ne pointent que vers des domaines officiels, à la racine ou vers un répertoire stable (jamais une URL profonde non vérifiée). */
const RACINES: Record<string, string> = {
  'www.service-public.fr': 'https://www.service-public.fr/', 'entreprendre.service-public.fr': 'https://entreprendre.service-public.fr/', 'www.cnil.fr': 'https://www.cnil.fr/', 'www.impots.gouv.fr': 'https://www.impots.gouv.fr/',
  'www.economie.gouv.fr': 'https://www.economie.gouv.fr/', 'www.legifrance.gouv.fr': 'https://www.legifrance.gouv.fr/', 'developers.google.com': 'https://developers.google.com/search/docs', 'support.google.com': 'https://support.google.com/business', 'web.dev': 'https://web.dev/',
}
export const sourceSure = (url: string) => {
  try {
    return RACINES[new URL(url).hostname] ?? null
  } catch {
    return null
  }
}

export function sommaireDe(p: Pilier) {
  return [
    ...p.sections.map((s) => ({ id: s.id, titre: s.titre })),
    ...(p.comparaison ? [{ id: 'comparatif', titre: p.comparaison.titre }] : []),
    ...(p.exemples.length ? [{ id: 'exemples', titre: 'Exemples types' }] : []),
    { id: 'faq', titre: 'Questions fréquentes' },
  ]
}

export default function PilierCorps({ pilier, avecReponse = true }: { pilier: Pilier; avecReponse?: boolean }) {
  const p = jetonsProfond(pilier)
  return (
    <>
      {avecReponse && (
        <p className="su-doc__reponse">
          <strong>{p.reponse}</strong>
        </p>
      )}
      {p.sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`}>
          <h2 id={`${s.id}-t`}>{s.titre}</h2>
          {s.paragraphes.map((t) => (
            <p key={t.slice(0, 48)}>{t}</p>
          ))}
          {s.liste && (
            <ul>
              {s.liste.map((l) => (
                <li key={l.slice(0, 48)}>{l}</li>
              ))}
            </ul>
          )}
          {s.sous?.map((x) => (
            <div key={x.titre}>
              <h3>{x.titre}</h3>
              {x.paragraphes.map((t) => (
                <p key={t.slice(0, 48)}>{t}</p>
              ))}
              {x.liste && (
                <ul>
                  {x.liste.map((l) => (
                    <li key={l.slice(0, 48)}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
      {p.comparaison && (
        <section id="comparatif" aria-labelledby="comparatif-t">
          <h2 id="comparatif-t">{p.comparaison.titre}</h2>
          <div className="su-doc__tableau" role="region" aria-label={p.comparaison.titre} tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">{p.comparaison.colonnes[0]}</th>
                  <th scope="col">{p.comparaison.colonnes[1]}</th>
                </tr>
              </thead>
              <tbody>
                {p.comparaison.lignes.map((l) => (
                  <tr key={l.critere}>
                    <th scope="row">{l.critere}</th>
                    <td>{l.a}</td>
                    <td>{l.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {p.comparaison.note && <p>{p.comparaison.note}</p>}
        </section>
      )}
      {p.exemples.length > 0 && (
        <section id="exemples" aria-labelledby="exemples-t">
          <h2 id="exemples-t">Exemples types</h2>
          {p.exemples.map((e) => (
            <div key={e.titre}>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </div>
          ))}
        </section>
      )}
      <section id="faq" aria-labelledby="faq-t">
        <h2 id="faq-t">Questions fréquentes</h2>
        <Accordeon questions={p.faq.map((f) => ({ q: f.q, r: f.a }))} groupe={`faq-${p.slug}`} />
      </section>
      {p.liens.length > 0 && (
        <section id="aller-plus-loin" aria-labelledby="liens-t">
          <h2 id="liens-t">Pour aller plus loin</h2>
          <ul>
            {p.liens.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.nom}</Link>
                {l.note && <span> — {l.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
      {p.sources && p.sources.length > 0 && (
        <section id="sources" aria-labelledby="sources-t">
          <h2 id="sources-t">Sources officielles</h2>
          <ul>
            {p.sources
              .filter((s) => sourceSure(s.url))
              .map((s) => (
                <li key={s.url}>
                  <a href={sourceSure(s.url)!} rel="noopener noreferrer" target="_blank">
                    {s.nom}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      )}
      <p className="su-mono su-doc__maj-fin">Mis à jour le {new Date(p.maj).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · {`Mathéo Reboul`}</p>
    </>
  )
}
