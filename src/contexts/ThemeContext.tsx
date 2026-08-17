'use client'
/**
 * V4 — Thème unique CLAIR. Plus de toggle, plus de dark mode.
 */
import React, { createContext, useContext, useEffect } from 'react'

interface ThemeContextType {
  dark: false
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggleDark: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ dark: false, toggleDark: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
