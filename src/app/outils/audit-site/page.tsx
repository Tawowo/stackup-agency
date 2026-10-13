/**
 * /outils/audit-site — l'audit gratuit (Google PageSpeed Insights). Avec
 * ?url=…, la mesure est faite côté serveur : le formulaire fonctionne sans JS.
 */
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Audit from '@/experiences/outils/Audit'
import { auditer } from '@/lib/audit'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'

export const maxDuration = 60

export const metadata = meta({
  titre: 'Audit de site gratuit — performance, accessibilité, SEO',
  description: 'Mesurez gratuitement votre site avec Google PageSpeed Insights : trois scores sur 100 et les recommandations prioritaires, expliquées en français. Sans inscription.',
  chemin: '/outils/audit-site',
})

const FAQ = [
  { q: 'D’où viennent les chiffres ?', r: 'De Google PageSpeed Insights, l’outil public de Google, qui charge votre page sur un téléphone simulé et la note avec Lighthouse. Nous ne modifions aucun score.' },
  { q: 'Les scores sont-ils fiables ?', r: 'Ils sont indicatifs. Une même page peut gagner ou perdre quelques points d’une mesure à l’autre selon le réseau et la charge du serveur. Et ils ne mesurent qu’une page : ni vos textes, ni votre visibilité réelle sur Google.' },
  { q: 'Qu’est-ce qu’un bon score ?', r: 'Google considère 90 à 100 comme bon, 50 à 89 comme à améliorer, et moins de 50 comme faible. Les deux crans sur chaque cadran marquent ces seuils.' },
  { q: 'Mes scores sont faibles : que faire ?', r: 'Commencez par les recommandations listées : certaines se corrigent sans tout refaire. Si le site repose sur une base trop ancienne ou trop lourde, une refonte peut être plus simple. On peut regarder ça ensemble, sans engagement.' },
]

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const adresse = typeof q.url === 'string' ? q.url.slice(0, 500) : ''
  const initial = adresse ? await auditer(adresse) : null
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Audit de site', chemin: '/outils/audit-site' },
          ]),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-audit"
        forme="cadran"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/audit-site', nom: 'Audit de site' },
        ]}
        etiquette="Outil gratuit · mesure Google"
        titre="Votre site, mesuré par Google."
        chapo="Entrez une adresse : Google PageSpeed Insights charge la page sur mobile et la note sur trois volets. On vous traduit les priorités en français clair."
        large
      >
        <Audit adresse={adresse} initial={initial} />
        <section className="su-aud-faq" aria-labelledby="su-aud-faq">
          <h2 id="su-aud-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} />
        </section>
      </Document>
    </>
  )
}
