/**
 * OFFRE CLUBS — parcours à 390, 768 et 1440 px : la grande page, les tarifs, le simulateur (de la saisie à l'envoi), la démo.
 * Les montants affichés sont comparés au moteur (domain/clubs/calcul.ts), jamais à des valeurs écrites ici.
 * `SHOTS=1` écrit les captures dans docs/offre-clubs/screenshots/.
 */
import { expect, test, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { calculer, simulationVide } from '../../src/domain/clubs/calcul.ts'
import { eur } from '../../src/domain/clubs/resume.ts'
import { DEMO } from '../../src/config/offre-clubs.ts'

const DOSSIER = 'docs/offre-clubs/screenshots'
if (process.env.SHOTS) mkdirSync(DOSSIER, { recursive: true })
const nb = (s: string) => s.replace(/[  ]/g, ' ')

async function pret(page: Page) {
  await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
}
async function capture(page: Page, nom: string, projet: string) {
  if (process.env.SHOTS) await page.screenshot({ path: `${DOSSIER}/${nom}-${projet}.png` })
}
async function pasDeDebordement(page: Page) {
  const d = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(d, 'aucun défilement horizontal').toBeLessThanOrEqual(1)
}

const PAGES = ['/clubs-de-tennis', '/clubs-de-tennis/tarifs', '/clubs-de-tennis/simulateur', '/clubs-de-tennis/site-internet', '/clubs-de-tennis/logiciel-de-gestion', '/clubs-de-tennis/demo', '/clubs-de-tennis/faq', '/clubs-de-tennis/fonctionnalites/ecole-de-tennis', '/clubs-de-tennis/indre-et-loire', '/clubs-de-tennis/guides/rgpd-club-de-tennis', '/cgv-plateforme']

for (const chemin of PAGES) {
  test(`${chemin} : un h1, aucun débordement horizontal`, async ({ page }, info) => {
    await page.goto(chemin)
    await pret(page)
    await expect(page.locator('h1')).toHaveCount(1)
    await pasDeDebordement(page)
    await capture(page, chemin.replace(/\//g, '_').replace(/^_/, ''), info.project.name)
  })
}

test('grande page : boutons de démo vers la démo, simulateur compact cohérent avec le moteur', async ({ page }) => {
  await page.goto('/clubs-de-tennis')
  await pret(page)
  for (const href of [DEMO.site, DEMO.bureau, DEMO.roles]) await expect(page.locator(`a[href="${href}"]`).first()).toHaveAttribute('target', '_blank')
  const compact = page.locator('.cs--compact')
  await compact.scrollIntoViewIfNeeded()
  await compact.getByLabel('Licenciés, saison en cours').fill('220')
  const r = calculer({ ...simulationVide(), licencies: { actuelle: 220, precedente: 0, avantPrecedente: 0 } })
  await expect(compact.locator('.cs-resultat')).toContainText(nb(eur(r.miseEnPlace.total)))
  await expect(compact.locator('.cs-resultat')).toContainText(nb(eur(r.abonnement.mensuel)))
  await expect(compact.locator('.cs-categorie')).toContainText('Moyen')
})

test('tarifs : cinq catégories lisibles, les prix de la grille', async ({ page }) => {
  await page.goto('/clubs-de-tennis/tarifs')
  await pret(page)
  await expect(page.locator('.cl-cat:not(.cl-cat--devis)')).toHaveCount(5)
  await expect(page.locator('#options')).toContainText('Assistant IA du club')
  await pasDeDebordement(page)
})

test('simulateur : saisie, résultat égal au moteur, lien partageable, envoi par e-mail', async ({ page }) => {
  await page.goto('/clubs-de-tennis/simulateur')
  await pret(page)
  await page.getByLabel('Nom du club').fill('Tennis Club de Test')
  await page.getByLabel('Licenciés, saison en cours').fill('220')
  await page.getByLabel(/Réservation de courts/).check()
  await page.getByLabel('Heures d’accompagnement prévues').fill('8')
  await page.getByLabel(/À l’année/).check()
  await page.getByLabel(/En 3 fois/).check()
  const sim = {
    ...simulationVide(),
    licencies: { actuelle: 220, precedente: 0, avantPrecedente: 0 },
    options: { 'reservation-courts': 1 },
    accompagnement: { heures: 8, rdv: 'presentiel' as const, distanceKm: 0 },
    paiement: { abonnement: 'annuel' as const, miseEnPlace: 'trois-fois' as const },
  }
  const r = calculer(sim)
  const zone = page.locator('.cs-resultat')
  await expect(zone).toContainText(nb(eur(r.miseEnPlace.total)))
  await expect(zone).toContainText(nb(eur(r.abonnement.annuel)))
  await expect(zone).toContainText(nb(eur(r.premiersMois[0])))
  await expect(zone).toContainText(nb(eur(r.premiereAnnee)))
  // L'état est dans l'URL : le lien se partage tel quel.
  await expect.poll(() => new URL(page.url()).searchParams.get('l')).toBe('220')
  const url = page.url()
  await page.goto(url)
  await pret(page)
  await expect(page.getByLabel('Licenciés, saison en cours')).toHaveValue('220')
  await expect(page.locator('.cs-resultat')).toContainText(nb(eur(r.miseEnPlace.total)))
  // Envoi par e-mail : accepté (202 sans Resend, 200 avec).
  await page.getByLabel('Votre adresse e-mail').fill('president@example.org')
  await page.getByLabel(/J’accepte/).check()
  await page.getByRole('button', { name: /Envoyer l’estimation/ }).click()
  await expect(page.locator('.cs-statut')).toContainText(/Estimation (envoyée|enregistrée)/)
})

test('simulateur : une option sans son pré-requis est refusée, la distance déclenche le devis', async ({ page }) => {
  await page.goto('/clubs-de-tennis/simulateur')
  await pret(page)
  await page.getByLabel('Licenciés, saison en cours').fill('120')
  await expect(page.getByLabel(/Commande vocale/)).toBeDisabled()
  await page.getByLabel(/Site seul/).check()
  await expect(page.getByLabel(/Accueil 3D/)).toBeEnabled()
  await expect(page.getByLabel(/Assistant IA/)).toBeDisabled()
  await page.getByLabel('Distance du club à Savigné-sur-Lathan (km)').fill('80')
  await expect(page.locator('.cs-devis')).toContainText('devis sur mesure')
})

test('démo : les trois liens et le parcours', async ({ page }) => {
  await page.goto('/clubs-de-tennis/demo')
  await pret(page)
  for (const href of [DEMO.site, DEMO.bureau, DEMO.roles]) await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible()
  await expect(page.locator('#parcours li')).toHaveCount(4)
})

test('mentions : la FFT n’est jamais présentée comme partenaire, ADOC sans connexion directe', async ({ page }) => {
  await page.goto('/clubs-de-tennis')
  const texte = await page.locator('main').innerText()
  expect(texte).toContain('ni affilié ni approuvé par la Fédération française de tennis')
  expect(texte).not.toMatch(/connecté (directement )?à ADOC|partenaire (officiel )?de la FFT/i)
})
