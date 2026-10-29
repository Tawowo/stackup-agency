import PagePilier, { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/pixieset-pictime-ou-galerie-photo-sur-mesure'

export const metadata = metaPilier(PILIER)

export default function Page() {
  return <PagePilier pilier={PILIER} />
}
