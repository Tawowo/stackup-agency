/**
 * PARCOURS COMPLET — raccourci → ajustements → contact pré-rempli → envoi → contenu de l'e-mail
 * (mode test : sans RESEND_API_KEY et hors production, l'API renvoie le texte de l'e-mail).
 * Usage : node scripts/parcours-estimateur.mjs [base]
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs'
const base = process.argv[2] ?? 'http://localhost:3000'
fs.mkdirSync('docs/qa/shots/estimateur', { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const ok = (c, m) => { console.log(c ? '✓' : '✗', m); if (!c) process.exitCode = 1 }
await page.goto(`${base}/tarifs?quality=high&pane=0`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /Un site qui se démarque/ }).click()
await page.waitForTimeout(400)
const avant = await page.locator('.su-est__recap-haut').innerText()
// étape 3 : 8 pages
await page.locator('.su-est__pastille', { hasText: 'Pages' }).click()
await page.getByLabel('Combien d’autres pages ?', { exact: true }).fill('8')
await page.waitForTimeout(400)
const apres = await page.locator('.su-est__recap-haut').innerText()
ok(avant !== apres, `la fourchette suit les ajustements (${avant.replace(/\n/g, ' ')} → ${apres.replace(/\n/g, ' ')})`)
ok(/entre\s+[\d\s  ]+€\s+et/.test(apres), 'le récapitulatif montre une fourchette')
ok(page.url().includes('e='), `l'URL porte l'estimation (${page.url().slice(0, 90)}…)`)
// la configuration survit au rechargement
const url = page.url()
await page.goto(url, { waitUntil: 'networkidle' })
ok((await page.locator('.su-est__recap-haut').innerText()) === apres, 'rechargement : même estimation')
// fin de parcours → démo
await page.getByRole('button', { name: /Voir mon estimation|Suivant/ }).first().isVisible()
await page.getByRole('link', { name: 'Demander ma démo' }).first().click()
await page.waitForURL(/\/contact\?/)
ok(page.url().includes('a=demo') && page.url().includes('e='), 'contact : jeton et action dans l’URL')
await page.waitForTimeout(800)
const texteContact = await page.locator('main').innerText()
ok(/votre estimation/i.test(texteContact) && /entre/i.test(texteContact), 'contact : estimation pré-remplie (fourchette)')
await page.screenshot({ path: 'docs/qa/shots/estimateur/contact-prerempli-1440.png', fullPage: true })
ok(await page.getByLabel(/Demander ma démo/).isChecked(), 'contact : « Demander ma démo » pré-coché')
await page.getByLabel('Prénom').fill('Camille')
await page.getByLabel('Nom', { exact: true }).fill('Durand')
await page.getByLabel('E-mail', { exact: true }).fill('camille@exemple.fr')
await page.getByLabel(/Votre projet, en quelques phrases/).fill('Un site pour mon atelier de menuiserie à Tours, avec galerie.')
await page.getByLabel(/J’accepte/).check()
const [rep] = await Promise.all([page.waitForResponse((r) => r.url().includes('/api/contact') && r.request().method() === 'POST'), page.getByRole('button', { name: /Envoyer ma demande/ }).click()])
const j = await rep.json()
ok(j.ok === true, `envoi accepté (${rep.status()})`)
const mail = j.apercu
ok(!!mail, 'mode test : texte de l’e-mail renvoyé')
if (mail) {
  console.log('--- E-MAIL REÇU PAR MATHÉO ---\n' + mail.sujet + '\n' + mail.texte)
  ok(/Prix exact \(création\) : \d/.test(mail.texte), 'e-mail interne : prix exact')
  ok(/Temps estimé : /.test(mail.texte) && /Taux horaire effectif : /.test(mail.texte), 'e-mail interne : temps estimé et taux horaire effectif')
  ok(/Demande : Demander la démo/.test(mail.texte), 'e-mail interne : action demandée')
  console.log('--- ACCUSÉ AU CLIENT ---\n' + mail.accuse)
  const exact = /Prix exact \(création\) : ([\d\s  ]+)/.exec(mail.texte)?.[1]?.replace(/[\s  ]/g, '')
  ok(!!exact && !mail.accuse.replace(/[\s  ]/g, '').includes(exact + '€'), 'accusé client : jamais le prix exact')
  ok(!texteContact.replace(/[\s  ]/g, '').includes(`${exact}€`), 'page contact : jamais le prix exact')
}
await browser.close()
