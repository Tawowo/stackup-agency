'use client'
import { useBanniere } from '@/contexts/BanniereContext'

/*
 * Spacer en flux normal, visible uniquement sur mobile quand la bannière est active.
 * Compense les 44px de la bannière placée sous la navbar (top-16 fixe).
 * Sur desktop la bannière est au top-0 et décale la navbar — pas besoin de spacer.
 */
export default function MobileBannerSpacer() {
  const { banniereActive } = useBanniere()
  if (!banniereActive) return null
  return <div className="h-11 lg:hidden" aria-hidden="true" />
}
