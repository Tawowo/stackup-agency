/**
 * ESTIMATEUR — parcours pas à pas, à 1440 et 390 px (voir playwright.config.ts).
 * Un test par raccourci (5) et un parcours entièrement personnalisé (boutique + outil).
 * À chaque étape : un seul titre d'étape visible, le focus sur ce titre, le haut de l'estimateur
 * en haut de l'écran, les choix précédents résumés, les boutons au même endroit, le récapitulatif
 * visible sans recouvrir les boutons, et la fourchette affichée égale à celle du moteur.
 * `SHOTS=1` écrit une capture par étape dans docs/qa/shots/estimateur/e2e/.
 */
import { expect, test, type Page } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { calculer } from '../../src/domain/devis/calcul.ts'
import { decoder, RACCOURCIS } from '../../src/domain/devis/etat.ts'

const DOSSIER = 'docs/qa/shots/estimateur/e2e'
if (process.env.SHOTS) mkdirSync(DOSSIER, { recursive: true })

const nombres = (t: string) => (t.match(/\d[\d\s\u00a0\u202f]*\d|\d/g) ?? []).map((x) => Number(x.replace(/\D/g, '')))

async function ouvrir(page: Page) {
  await page.goto('/tarifs#estimer')
  await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
  await expect(page.locator('.su-est__depart').first()).toBeVisible()
}

/** La fourchette du récapitulatif = celle du moteur pour l'état courant (lu dans l'URL). */
async function verifierRecap(page: Page) {
  await expect
    .poll(
      async () => {
        const jeton = new URL(page.url()).searchParams.get('e')
        const texte = await page.locator('.su-est__recap-haut .su-est__recap-ligne').first().innerText()
        if (!jeton) return texte.includes('à définir') ? 'ok' : `${texte} ≠ à définir`
        const attendu = calculer(decoder(jeton).cfg).fourchette
        const n = nombres(texte)
        return n.includes(attendu.bas) && n.includes(attendu.haut) ? 'ok' : `${texte} ≠ ${attendu.bas}–${attendu.haut}`
      },
      { timeout: 5000, message: 'la fourchette du récapitulatif doit être celle du moteur' },
    )
    .toBe('ok')
}

async function verifierEtape(page: Page, projet: string, scenario: string, i: number, premiere: boolean) {
  const visibles = page.locator('.su-est__etape:not([hidden])')
  await expect(visibles).toHaveCount(1)
  const titre = visibles.locator('h3').first()
  await expect(titre).toBeVisible()
  if (!premiere) await expect(titre).toBeFocused()
  const progres = await page.locator('.su-est__progres-texte').innerText()
  expect(progres).toMatch(/Étape \d+ sur \d+ · /)
  if (!premiere) {
    // Le haut de l'estimateur est en haut de l'écran.
    await expect
      .poll(async () => page.locator('.su-est__gauche').evaluate((el) => Math.round(el.getBoundingClientRect().top)), { timeout: 4000 })
      .toBeLessThan(130)
    await expect
      .poll(async () => page.locator('.su-est__gauche').evaluate((el) => Math.round(el.getBoundingClientRect().top)), { timeout: 4000 })
      .toBeGreaterThan(-20)
  }
  if (process.env.SHOTS) await page.screenshot({ path: `${DOSSIER}/${projet}-${scenario}-${String(i).padStart(2, '0')}.png` })
  if (process.env.SHOTS && (await page.locator('#su-est-fin').isVisible())) await page.locator('.su-est__etape:not([hidden])').screenshot({ path: `${DOSSIER}/${projet}-${scenario}-bilan.png` })
  // Une ligne de résumé par étape déjà vue (le bilan final les détaille toutes).
  if (i > 0 && !(await page.locator('#su-est-fin').isVisible())) {
    const recent = page.locator('.su-est__avant-recent .su-est__resume')
    await expect(recent.first()).toBeVisible()
    await expect(recent.first()).toContainText('Modifier')
    expect(await recent.count()).toBe(Math.min(i, 2))
  }
  await verifierRecap(page)
}

/** Les boutons Précédent / Suivant restent au même endroit, et ne sont pas recouverts par le récapitulatif. */
async function positionBoutons(page: Page, premiere: boolean) {
  const suivant = page.locator('.su-est__nav .su-est__suivant')
  // Première étape : le visiteur vient de choisir un départ, on l'amène devant les boutons. Ensuite, la page remonte seule.
  if (premiere) await suivant.evaluate((el) => el.scrollIntoView({ block: 'center' }))
  const r = await suivant.boundingBox()
  expect(r).not.toBeNull()
  const vh = page.viewportSize()!.height
  expect(r!.y + r!.height).toBeLessThanOrEqual(vh + 2)
  // Rien ne recouvre le bouton : l'élément au centre du bouton en fait partie.
  const ok = await suivant.evaluate((el) => {
    const b = el.getBoundingClientRect()
    const h = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)
    return !!h && (el === h || el.contains(h)) ? 'ok' : `recouvert par <${h?.tagName.toLowerCase()} class="${h?.className}">`
  })
  expect(ok, 'le bouton Suivant est recouvert').toBe('ok')
  return Math.round(r!.y)
}

async function parcourir(page: Page, projet: string, scenario: string) {
  let i = 0
  const ys: number[] = []
  for (;;) {
    await verifierEtape(page, projet, scenario, i, i === 0)
    if (await page.locator('#su-est-fin').isVisible()) break
    const y = await positionBoutons(page, i === 0)
    if (i > 0) ys.push(y)
    await page.locator('.su-est__nav .su-est__suivant').click()
    i++
    expect(i).toBeLessThan(12)
  }
  // Mêmes boutons, mêmes places, à quelques pixels près.
  expect(Math.max(...ys) - Math.min(...ys)).toBeLessThanOrEqual(6)
  return i
}

test.describe('estimateur pas à pas', () => {
  for (const r of RACCOURCIS) {
    test(`raccourci « ${r.id} » : toutes les étapes, une à la fois`, async ({ page }, info) => {
      await ouvrir(page)
      await page.locator('.su-est__depart', { hasText: r.titre }).click()
      const n = await parcourir(page, info.project.name, r.id)
      expect(n).toBeGreaterThanOrEqual(2)
      // Dernière étape : bilan lisible, puis les deux actions.
      await expect(page.locator('.su-est__bilan')).toBeVisible()
      await expect(page.getByRole('link', { name: /Réserver mon appel gratuit/ }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /Demander ma démo/ }).first()).toBeVisible()
    })
  }

  test('parcours personnalisé : site, boutique et outil, choix conservés au retour', async ({ page }, info) => {
    await ouvrir(page)
    const p = info.project.name
    const suivant = () => page.locator('.su-est__nav .su-est__suivant').click()
    const precedent = () => page.getByRole('button', { name: 'Précédent' }).click()
    const etape = page.locator('.su-est__etape:not([hidden])')
    // 1. Projet : site + boutique + outil, sans raccourci.
    await verifierEtape(page, p, 'perso', 0, true)
    await etape.locator('label', { hasText: 'Un site internet' }).click()
    await etape.locator('label', { hasText: 'Une boutique en ligne' }).click()
    await etape.locator('label', { hasText: 'Un outil pour gérer mon activité' }).click()
    await verifierRecap(page)
    await suivant()
    // 2. Accueil : « Animé ».
    await verifierEtape(page, p, 'perso', 1, false)
    await etape.locator('label.su-est__carte:has(input[value="Animé"])').click()
    await verifierRecap(page)
    await suivant()
    // 3. Pages : 5 autres pages.
    await verifierEtape(page, p, 'perso', 2, false)
    await etape.locator('input[type="number"]').first().fill('5')
    await suivant()
    // 4. Google : Local.
    await verifierEtape(page, p, 'perso', 3, false)
    await etape.locator('label.su-est__carte:has(input[value="Local"])').click()
    // Retour : « Précédent » garde le nombre de pages ; en revenant, Local est resté coché.
    await precedent()
    await expect(etape.locator('input[type="number"]').first()).toHaveValue('5')
    await suivant()
    await expect(etape.locator('input[value="Local"]')).toBeChecked()
    await suivant()
    // 5. Fonctions, 6. Textes : on passe.
    await verifierEtape(page, p, 'perso', 4, false)
    await suivant()
    await verifierEtape(page, p, 'perso', 5, false)
    await suivant()
    // 7. Boutique : 25 produits.
    await verifierEtape(page, p, 'perso', 6, false)
    await etape.locator('input[type="number"]').first().fill('25')
    await suivant()
    // 8. Outil : un module (clients).
    await verifierEtape(page, p, 'perso', 7, false)
    await etape.locator('label', { hasText: 'Clients et contacts' }).first().click()
    await verifierRecap(page)
    await suivant()
    // 9. Suivi, puis le bilan.
    await verifierEtape(page, p, 'perso', 8, false)
    await suivant()
    await verifierEtape(page, p, 'perso', 9, false)
    const bilan = await page.locator('.su-est__bilan').innerText()
    expect(bilan).toContain('site')
    expect(bilan).toContain('boutique')
    expect(bilan).toContain('outil de gestion')
    expect(bilan).toContain('Animé')
    expect(bilan).toContain('25 produits')
    // Retour depuis le bilan : le choix de l'outil est resté.
    await precedent()
    await precedent()
    await expect(etape.locator('label', { hasText: 'Clients et contacts' }).first().locator('input')).toBeChecked()
  })

  test('étapes sans objet sautées : outil seul', async ({ page }) => {
    await ouvrir(page)
    await page.locator('.su-est__depart', { hasText: 'Un outil pour gérer mon activité' }).click()
    const total = await page.locator('.su-est__progres-texte').innerText()
    // Sans site ni boutique : les étapes 2 à 7 disparaissent de la progression.
    expect(total).toMatch(/Étape 1 sur 3/)
    await page.locator('.su-est__nav .su-est__suivant').click()
    await expect(page.locator('.su-est__etape:not([hidden]) h3').first()).toContainText('gérer votre activité')
    await expect(page.locator('.su-est__progres-texte')).toContainText('Étape 2 sur 3')
  })
})
