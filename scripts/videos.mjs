/**
 * VIDÉOS — un scroll entier de l'accueil, en desktop (1440), mobile (390) et
 * mouvement réduit. L'enregistrement natif de Playwright ne produit pas de
 * trames sous SwiftShader : on capture donc des trames (screenshot JPEG, une
 * par pas de scroll) et ffmpeg (celui de Playwright) les assemble en WebM.
 * Sortie : docs/qa/videos/<nom>.webm.
 */
import { chromium } from '@playwright/test'
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'
const CAS = [
  { nom: 'accueil-1440', viewport: { width: 1440, height: 900 }, rm: false, pas: 36 },
  { nom: 'accueil-390', viewport: { width: 390, height: 844 }, rm: false, mobile: true, pas: 28 },
  { nom: 'accueil-1440-rm', viewport: { width: 1440, height: 900 }, rm: true, pas: 60 },
]
const seul = process.argv.find((a) => a.startsWith('--cas='))?.split('=')[1]
mkdirSync('docs/qa/videos', { recursive: true })
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
for (const c of CAS) {
  if (seul && c.nom !== seul) continue
  const dir = `docs/qa/videos/_trames-${c.nom}`
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  const ctx = await browser.newContext({ viewport: c.viewport, isMobile: !!c.mobile, hasTouch: !!c.mobile, reducedMotion: c.rm ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  await page.goto(`${BASE}/?quality=high`, { waitUntil: 'networkidle' })
  await page.waitForSelector('html[data-su-ready="1"]', { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(1500)
  const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
  let n = 0
  const trame = async () => {
    await page.screenshot({ path: `${dir}/${String(n++).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 70 })
  }
  for (let k = 0; k < 12; k++) await trame()
  for (let y = 0; y <= total; y += c.pas) {
    await page.evaluate((yy) => {
      window.__suLenis?.scrollTo(yy, { immediate: true })
      window.scrollTo(0, yy)
    }, y)
    await page.waitForTimeout(40)
    // Sous SwiftShader (1-3 i/s), la simulation (glissement, dissolution) avance
    // sans rendre de trois trames à 60 i/s par pas : l'allure d'un vrai scroll.
    await page.evaluate(() => window.__suSettle?.(3))
    await trame()
  }
  for (let k = 0; k < 24; k++) {
    await page.waitForTimeout(80)
    await trame()
  }
  await ctx.close()
  const sortie = `docs/qa/videos/${c.nom}.webm`
  // Le ffmpeg de Playwright n'a ni image2 ni VP9 : on lui envoie les JPEG en
  // flux (image2pipe + mjpeg) et on encode en VP8, comme son enregistreur.
  const flux = Buffer.concat(readdirSync(dir).sort().map((f) => readFileSync(`${dir}/${f}`)))
  execFileSync(
    FFMPEG,
    ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', '24', '-i', 'pipe:0', '-c:v', 'vp8', '-qmin', '0', '-qmax', '50', '-crf', '10', '-deadline', 'realtime', '-speed', '8', '-b:v', '1500k', '-pix_fmt', 'yuv420p', sortie],
    { input: flux, maxBuffer: 1 << 30 },
  )
  // Une planche-contact (une trame sur 30) reste à côté de la vidéo, pour la lire sans la jouer.
  const planche = `docs/qa/videos/planche-${c.nom}`
  rmSync(planche, { recursive: true, force: true })
  mkdirSync(planche, { recursive: true })
  readdirSync(dir)
    .sort()
    .filter((_, i) => i % 30 === 0)
    .forEach((f) => copyFileSync(`${dir}/${f}`, `${planche}/${f}`))
  rmSync(dir, { recursive: true, force: true })
  console.log('✓', sortie, `${n} trames, ${Math.round(statSync(sortie).size / 1024)} ko`)
}
await browser.close()
