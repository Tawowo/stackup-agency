import { defineConfig, devices } from '@playwright/test'

/** Chromium pré-installé (révision 1194) ; SwiftShader pour le WebGL sans GPU. */
export const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
export const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 90_000,
  workers: 1,
  use: { baseURL: process.env.E2E_BASE ?? 'http://localhost:3000' },
  projects: [
    {
      name: 'desktop-1440',
      use: { viewport: { width: 1440, height: 900 }, launchOptions: { executablePath: CHROMIUM, args: ARGS } },
    },
    {
      name: 'tablet-768',
      testMatch: /clubs\.spec\.ts/,
      use: { viewport: { width: 768, height: 1024 }, launchOptions: { executablePath: CHROMIUM, args: ARGS } },
    },
    {
      name: 'mobile-390',
      use: { ...devices['Pixel 5'], launchOptions: { executablePath: CHROMIUM, args: ARGS } },
    },
  ],
})
