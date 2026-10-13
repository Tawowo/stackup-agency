import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SITE } from '@/config/site'

/* UNE SEULE VERSION DU PARRAINAGE.

   Trois formulations coexistaient sur cette seule page : le titre annonçait
   « 1 mois Premium offert ou −10 % », la description « 1 mois d'abonnement
   Premium (89 €) offert », et l'image Open Graph — celle qui part sur les
   réseaux et dans les messageries — « gagnez 200 € pour chaque client ».
   Les deux dernières étaient fausses, et la troisième l'était de beaucoup.

   Le dossier en fait une règle bloquante (§15.3) : une seule version de
   chaque condition commerciale, identique aux CGV. Tout vient désormais de
   `site.ts`, qui recopie l'article 13. */
const P = SITE.parrainage

export const metadata: Metadata = {
  title: `Parrainage — ${P.parrainCourt}`,
  description: `Parrainez un professionnel : à la signature, vous choisissez — ${P.parrainCourt}. Votre filleul : −${P.filleulRemise} % sur son premier projet.`,
  alternates: { canonical: 'https://stackup-agency.fr/parrainage' },
  openGraph: {
    url: 'https://stackup-agency.fr/parrainage',
    title: `Parrainage — ${P.parrainCourt}`,
    description: `Vous : ${P.parrainRecompenseA} ou ${P.parrainRecompenseB}. Votre filleul : −${P.filleulRemise} % sur son premier projet.`,
    type: 'website',
  },
}

export default function ParrainageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
