import Link from 'next/link'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, Faq, LiensOffre, MentionFft, Section, j } from '@/gabarits/clubs/blocs'
import { CLUBS } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { FAQ_CLUBS, metaClubs } from '@/lib/clubs'
import { faqPage } from '@/lib/seo'
import { serviceClubs } from '@/lib/schema-clubs'

const CHEMIN = `${CLUBS}/faq`
export const metadata = metaClubs({
  titre: 'FAQ du site et du logiciel pour club de tennis',
  description: 'Toutes les questions des présidents et des trésoriers : prix, catégories, ADOC et Ten’Up, données et RGPD, mise en place, fonctionnement, padel et pickleball.',
  chemin: CHEMIN,
})

const THEMES = [
  { id: 'offre', titre: 'L’offre' },
  { id: 'prix', titre: 'Les prix et le paiement' },
  { id: 'adoc-fft', titre: 'ADOC, Ten’Up et la FFT' },
  { id: 'donnees', titre: 'Les données et le RGPD' },
  { id: 'mise-en-place', titre: 'La mise en place' },
  { id: 'fonctionnement', titre: 'Le fonctionnement au quotidien' },
  { id: 'padel-pickleball', titre: 'Padel et pickleball' },
] as const

export default function Page() {
  return (
    <PageClubs
      moment="clubs-faq"
      chemin={CHEMIN}
      etiquette="Questions fréquentes"
      titre="Les questions des présidents et des trésoriers de clubs de tennis"
      chapo="Prix, ADOC, données, mise en place, fonctionnement : les réponses, sans jargon. Une question manque ? Écrivez-nous, nous vous répondons personnellement."
      maj="2026-10-30"
      schema={[serviceClubs({ chemin: CHEMIN, nom: 'Questions fréquentes de l’offre pour clubs de tennis' }), faqPage(FAQ_CLUBS.map((q) => ({ q: j(q.q), a: j(q.a) })))]}
    >
      <nav aria-label="Thèmes" className="cl-sec">
        <p className="su-mono cl-sec__etiquette">Aller directement à</p>
        <ul className="cl-chips">
          {THEMES.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`}>{t.titre}</a>
            </li>
          ))}
        </ul>
      </nav>
      {THEMES.map((t) => (
        <Section key={t.id} id={t.id} titre={t.titre}>
          <Faq questions={FAQ_CLUBS.filter((q) => q.theme === t.id)} id={`faq-${t.id}`} />
        </Section>
      ))}
      <p className="cl-aide">
        Vous ne trouvez pas votre réponse ? <Link href="/contact?a=appel">Réservez un appel gratuit</Link> ou consultez les <Link href={`${CLUBS}/guides`}>guides pour clubs</Link>.
      </p>
      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
