import { logo } from './logo.ts'
import { pile, type PileOptions } from './pile.ts'
import type { LayoutData } from './types.ts'

export type LayoutName = 'logo' | 'pile'

export const LAYOUTS: Record<LayoutName, (n: number, o: PileOptions) => LayoutData> = {
  logo: (n) => logo(n),
  pile: (n, o) => pile(n, o),
}

export type { LayoutData } from './types.ts'
export { logo, pile }
