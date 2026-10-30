/**
 * OFFRE « CLUBS DE TENNIS » — parcours à 390, 768 et 1440 px (projets de playwright.config.ts) :
 * la grande page, les tarifs, le simulateur jusqu'à l'envoi, la démo, la désinscription.
 * Chaque montant affiché est comparé au moteur (src/domain/clubs/simulation.ts) : aucun prix n'est écrit en dur.
 * `SHOTS=1` écrit une capture pleine page de chaque page dans docs/offre-clubs/screenshots/.
 */
import { expect, test, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { CATEGORIES, coutParLicencieAn, tarif } from '../../src/data/offre-clubs/pricing.ts'
import { simuler, SIMULATION_DEFAUT } from '../../src/domain/clubs/simulation.ts'

const DOSSIER = 'docs/offre-clubs/screenshots'
if (process.env.SHOTS) mkdirSync(DOSSIER, { recursive: true })
const fr = (n: number) => n.toLocaleString('fr-FR').replace(/[  ]/g, ' ')
const texte = async (page: Page) => (await page.locator('main').innerText()).replace(/[  ]/g, ' ')

async function ouvrir(page: Page, chemin: string) {
  await page.goto(chemin)
  await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
  await expect(page.locator('h1')).toHaveCount(1)
}

async function sansDebordement(page: Page) {
  const deborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(deborde, 'aucun défilement horizontal').toBeLessThanOrEqual(1)
}

async function capture(page: Page, nom: string, largeur: number) {
  if (!process.env.SHOTS) return
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${DOSSIER}/${nom}-${largeur}.png`, fullPage: true })
}

test('la grande page : promesse, démo, prix du moteur, mentions', async ({ page }, info) => {
  await ouvrir(page, '/clubs-de-tennis')
  await expect(page.locator('h1')).toContainText('Le site de votre club et le logiciel de votre bureau')
  const t = await texte(page)
  expect(t).not.toContain('{{')
  // Prix : lus dans la grille, jamais écrits à la main.
  const moyen = CATEGORIES.find((c) => c.id === 'moyen')!
  expect(t).toContain(`${tarif(CATEGORIES[0]!, 'site').mois} €`)
  expect(t).toContain(`${coutParLicencieAn(tarif(moyen, 'pack').mois, moyen.clubType).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`)
  expect(t).toContain('Import et export des fichiers ADOC')
  expect(t).toContain('ni affilié ni approuvé par la Fédération française de tennis')
  expect(t).not.toMatch(/connecté à ADOC|partenaire de la FFT/i)
  // Les trois entrées de la démo.
  for (const lien of ['Voir le site d’un club', 'Ouvrir le logiciel du bureau', 'Essayer en tant que parent']) await expect(page.getByRole('link', { name: new RegExp(`^${lien}`) }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /^Essayer en tant que parent/ }).first()).toHaveAttribute('href', /\/demo\?role=parent/)
  await sansDebordement(page)
  await capture(page, 'clubs-de-tennis', info.project.use.viewport!.width)
})

test('les tarifs : cinq catégories, chaque prix égal à la grille, lisible sur téléphone', async ({ page }, info) => {
  await ouvrir(page, '/clubs-de-tennis/tarifs')
  const cartes = page.locator('.ct-cat')
  await expect(cartes).toHaveCount(5)
  for (const [i, c] of CATEGORIES.entries()) {
    const carte = (await cartes.nth(i).innerText()).replace(/[  ]/g, ' ')
    for (const f of ['site', 'logiciel', 'pack'] as const) {
      expect(carte).toContain(`${fr(tarif(c, f).mois)} €`)
      expect(carte).toContain(`${fr(tarif(c, f).miseEnPlace)} €`)
    }
  }
  expect(await texte(page)).toContain('Prix indicatifs')
  await sansDebordement(page)
  await capture(page, 'tarifs', info.project.use.viewport!.width)
})

test('le simulateur : catégorie, baisse, formule, options, paiement, lien, envoi', async ({ page }, info) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `203.0.113.${(info.project.use.viewport!.width % 200) + info.retry}` })
  await ouvrir(page, '/clubs-de-tennis/simulateur')
  await page.getByLabel('Nom du club').fill('TC des Bords de Loire')
  await page.getByLabel('Licenciés de la saison en cours').fill('180')
  await page.getByLabel('Saison précédente (facultatif)').fill('220')
  await page.getByLabel('Il y a deux saisons (facultatif)').fill('230')
  await expect(page.locator('.cs-categorie')).toContainText('Moyen')
  await expect(page.getByText('Nous vous demanderons un justificatif')).toBeVisible()

  // Le logiciel seul : l'accueil 3D (avec le site) est grisé, l'assistant IA est disponible.
  await page.locator('label.su-est__carte', { hasText: 'Le logiciel du bureau' }).click()
  await expect(page.locator('.cs-indispo', { hasText: 'Accueil 3D sur mesure' })).toBeVisible()
  await page.locator('label.su-est__case', { hasText: 'Assistant IA du club' }).click()
  await page.locator('label.su-est__carte', { hasText: 'Abonnement annuel' }).click()
  await page.locator('label.su-est__carte', { hasText: 'Mise en place en une fois' }).click()

  const attendu = simuler({ ...SIMULATION_DEFAUT, licencies: { courante: 180, precedente: 220, avantDerniere: 230 }, formule: 'logiciel', options: { 'assistant-ia': 1 }, abonnement: 'annuel', miseEnPlace: 'une-fois' })
  const recap = page.locator('.cs-recap')
  await expect(recap).toContainText(`${fr(attendu.miseEnPlace.total)} €`)
  await expect(recap).toContainText(`${fr(attendu.abonnement.annuel!)} €`)
  await expect(recap).toContainText(`${fr(attendu.premiereAnnee)} €`)

  // Le lien partageable porte la simulation.
  await expect.poll(() => new URL(page.url()).searchParams.get('abo')).toBe('annuel')
  const lien = page.url()
  expect(lien).toContain('o=assistant-ia')
  expect(lien).toContain('abo=annuel')

  // Recevoir l'estimation par e-mail.
  await page.getByRole('button', { name: 'Recevoir cette estimation par e-mail' }).click()
  const form = page.locator('form.cs-form')
  await form.getByLabel('Nom', { exact: true }).fill('Martin')
  await form.getByLabel('E-mail').fill('presidence@club.example')
  await form.getByLabel(/J’accepte/).check()
  await page.waitForTimeout(2100)
  await form.getByRole('button', { name: 'Recevoir le récapitulatif' }).click()
  await expect(page.locator('.cs-form--ok')).toBeVisible({ timeout: 15000 })
  await sansDebordement(page)

  // La simulation se rouvre telle quelle depuis le lien.
  await page.goto(lien)
  await expect(page.getByLabel('Nom du club')).toHaveValue('TC des Bords de Loire')
  await expect(page.locator('.cs-recap')).toContainText(`${fr(attendu.premiereAnnee)} €`)
  await capture(page, 'simulateur', info.project.use.viewport!.width)
})

test('le simulateur au clavier : la formule se choisit aux flèches', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'clavier physique : ordinateur et tablette')
  await ouvrir(page, '/clubs-de-tennis/simulateur?l=40')
  const radio = page.locator('input[type="radio"][value="pack"]').first()
  await radio.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('input[type="radio"][value="site"]').first()).toBeChecked()
  await expect(page.locator('.cs-recap__formule')).toContainText('Le site du club')
})

test('la démo : trois entrées et des liens par rôle', async ({ page }, info) => {
  await ouvrir(page, '/clubs-de-tennis/demo')
  await expect(page.locator('a[href*="/demo?role=enseignant"]').first()).toBeAttached()
  await expect(page.locator('a[href*="/demo?role=parent"]').first()).toBeAttached()
  expect(await texte(page)).toContain('La démo simule l’envoi de SMS')
  await sansDebordement(page)
  await capture(page, 'demo', info.project.use.viewport!.width)
})

test('la désinscription enregistre l’opposition', async ({ page }, info) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': `198.51.100.${(info.project.use.viewport!.width % 200) + info.retry}` })
  await ouvrir(page, '/desinscription?email=bureau@club.example')
  await expect(page.getByLabel('Votre adresse e-mail')).toHaveValue('bureau@club.example')
  await page.getByRole('button', { name: 'Ne plus recevoir d’e-mails' }).click()
  await expect(page.getByText('C’est noté.')).toBeVisible()
})

for (const chemin of ['/clubs-de-tennis/fonctionnalites/ecole-de-tennis', '/clubs-de-tennis/indre-et-loire', '/clubs-de-tennis/guides/rgpd-club-de-tennis', '/clubs-de-tennis/faq', '/cgv-plateforme']) {
  test(`page ${chemin} : un h1, aucun jeton, aucun débordement`, async ({ page }, info) => {
    await ouvrir(page, chemin)
    expect(await texte(page)).not.toContain('{{')
    await sansDebordement(page)
    await capture(page, chemin.split('/').filter(Boolean).join('-'), info.project.use.viewport!.width)
  })
}
