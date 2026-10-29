import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { JsonLd, ORIGINE, filAriane, meta } from '@/lib/seo'
import { RUBRIQUES_LEXIQUE, toutesLesEntrees } from '@/lib/lexique'

export const metadata = meta({
  titre: 'Lexique du site web, du SEO et de la gestion',
  description: 'Les mots du web expliqués simplement : CMS, SEO, RGPD, facture électronique, CRM… Une définition claire et un exemple pour chaque terme.',
  chemin: '/lexique',
})

export default function Page() {
  const entrees = toutesLesEntrees()
  return (
    <>
      <JsonLd
        data={[
          filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Lexique', chemin: '/lexique' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': `${ORIGINE}/lexique#termes`,
            name: 'Lexique Stackup Agency : le web, le référencement et la gestion expliqués simplement',
            url: `${ORIGINE}/lexique`,
            inLanguage: 'fr-FR',
            hasDefinedTerm: entrees.map((e) => ({ '@type': 'DefinedTerm', name: e.terme, description: e.definition, url: `${ORIGINE}/lexique/${e.slug}`, inDefinedTermSet: `${ORIGINE}/lexique#termes` })),
          },
        ]}
      />
      <Document
        moment="lexique"
        ariane={[{ href: '/', nom: 'Accueil' }, { href: '/lexique', nom: 'Lexique' }]}
        etiquette="Ressource · lexique"
        titre="Le lexique du web, du SEO et de la gestion."
        chapo={`${entrees.length} mots expliqués en deux phrases, puis en détail : à quoi ils servent, ce qu’il faut vérifier, ce que ça change pour un artisan, un commerçant ou une TPE.`}
        maj="29 octobre 2026"
        sommaire={RUBRIQUES_LEXIQUE.filter((r) => entrees.some((e) => e.rubrique === r.id)).map((r) => ({ id: `rub-${r.id}`, titre: r.nom }))}
      >
        {RUBRIQUES_LEXIQUE.map((r) => {
          const liste = entrees.filter((e) => e.rubrique === r.id)
          if (!liste.length) return null
          return (
            <section key={r.id} aria-labelledby={`rub-${r.id}`}>
              <h2 id={`rub-${r.id}`}>{r.nom}</h2>
              <p>{r.ligne}</p>
              <dl>
                {liste.map((e) => (
                  <div key={e.slug}>
                    <dt>
                      <Link href={`/lexique/${e.slug}`}>{e.terme}</Link>
                    </dt>
                    <dd>{e.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )
        })}
      </Document>
    </>
  )
}
