'use client'
import { createContext, useContext, useState } from 'react'

type BanniereContextType = { banniereActive: boolean; setBanniereActive: (v: boolean) => void }
const BanniereContext = createContext<BanniereContextType>({ banniereActive: false, setBanniereActive: () => {} })

export function BanniereProvider({ children }: { children: React.ReactNode }) {
  const [banniereActive, setBanniereActive] = useState(false)
  return <BanniereContext.Provider value={{ banniereActive, setBanniereActive }}>{children}</BanniereContext.Provider>
}

export function useBanniere() { return useContext(BanniereContext) }
