import PagePilier, { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/squarespace-jimdo-ou-site-sur-mesure'

export const metadata = metaPilier(PILIER)

export default function Page() {
  return <PagePilier pilier={PILIER} />
}
