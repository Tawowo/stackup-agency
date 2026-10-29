import PagePilier, { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/solocal-pages-jaunes-recuperer-son-site'

export const metadata = metaPilier(PILIER)

export default function Page() {
  return <PagePilier pilier={PILIER} />
}
