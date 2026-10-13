/**
 * /outils/studio-de-style — le studio de style. Les choix vivent dans l'URL :
 * rendu serveur avec ces choix (ou ceux par défaut), formulaire GET sans JS.
 */
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Studio from '@/experiences/outils/Studio'
import { lireChoix } from '@/experiences/outils/studio-donnees'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Studio de style — essayez l’allure de votre futur site',
  description: 'Choisissez une activité, une ambiance, une palette, une typographie et une mise en page : l’accueil fictif de votre site se recompose en direct. Gratuit, sans inscription.',
  chemin: '/outils/studio-de-style',
})

const FAQ = [
  { q: 'À quoi sert le studio ?', r: 'À mettre des mots et des couleurs sur ce que vous aimez avant d’en parler. Repartir avec une fiche de style claire rend le premier échange plus concret, que vous travailliez avec nous ou non.' },
  { q: 'Le site final ressemblera-t-il à l’aperçu ?', r: 'L’aperçu est une maquette fictive qui montre une direction. La démo que nous préparons reprend vos choix, puis les ajuste à vos vrais textes, photos et contraintes de lisibilité.' },
  { q: 'Que se passe-t-il quand je demande une démo ?', r: 'Le formulaire de contact s’ouvre avec votre fiche de style déjà recopiée. Vous complétez en deux phrases ; Mathéo vous répond personnellement. Rien n’est engagé avant d’avoir vu la démo.' },
]

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const initial = lireChoix(await searchParams)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Studio de style', chemin: '/outils/studio-de-style' },
          ]),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-studio"
        forme="page"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/studio-de-style', nom: 'Studio de style' },
        ]}
        etiquette="Outil gratuit · sans inscription"
        titre="Essayez l’allure de votre site."
        chapo="Votre activité, une ambiance, puis la palette, la typographie et la mise en page : l’accueil se recompose à chaque choix. Repartez avec une fiche de style, ou demandez une démo qui la reprend."
        large
      >
        <Studio initial={initial} />
        <section className="su-sty-faq" aria-labelledby="su-sty-faq">
          <h2 id="su-sty-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} />
        </section>
      </Document>
    </>
  )
}
