'use client'
import { createContext, useContext, useState } from 'react'

type BanniereContextType = { banniereActive: boolean; setBanniereActive: (v: boolean) => void }
const BanniereContext = createContext<BanniereContextType>({ banniereActive: false, setBanniereActive: () => {} })

export function BanniereProvider({ children, initialActive = false }: { children: React.ReactNode; initialActive?: boolean }) {
  const [banniereActive, setBanniereActive] = useState(initialActive)
  return <BanniereContext.Provider value={{ banniereActive, setBanniereActive }}>{children}</BanniereContext.Provider>
}

export function useBanniere() { return useContext(BanniereContext) }
