import localFont from 'next/font/local'

export const poppins = localFont({
  src: [
    { path: './fonts/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--su-font-display',
  display: 'swap',
  preload: true,
})

export const inter = localFont({
  src: [{ path: './fonts/Inter-Variable.woff2', weight: '100 900', style: 'normal' }],
  variable: '--su-font-sans',
  display: 'swap',
  preload: true,
})

export const jetbrains = localFont({
  src: [
    { path: './fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/jetbrains-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--su-font-mono',
  display: 'swap',
  preload: false,
})
