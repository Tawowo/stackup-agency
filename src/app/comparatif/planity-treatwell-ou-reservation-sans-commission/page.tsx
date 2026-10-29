import PagePilier, { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/planity-treatwell-ou-reservation-sans-commission'

export const metadata = metaPilier(PILIER)

export default function Page() {
  return <PagePilier pilier={PILIER} />
}
