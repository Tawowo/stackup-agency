import PagePilier, { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/uber-eats-ou-commande-directe'

export const metadata = metaPilier(PILIER)

export default function Page() {
  return <PagePilier pilier={PILIER} />
}
