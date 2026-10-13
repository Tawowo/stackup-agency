/**
 * LE PARCOURS DE CONVERSION, DE BOUT EN BOUT.
 *
 * Critère d'acceptation §17.7 n° 6 : « Le parcours configurateur → devis →
 * e-mail fonctionne sans ressaisie. » Ce script le joue comme un visiteur :
 * il remplit le configurateur, transmet, et regarde ce qui arrive dans le
 * formulaire de devis.
 *
 * Il ne poste PAS le formulaire : l'envoi part sur une vraie API d'e-mail,
 * et un script de vérification n'a pas à écrire à qui que ce soit. La
 * dernière étape — l'e-mail reçu — se vérifie à la main, une fois.
 */
import { chromium } from 'playwright'
const BASE = process.argv[2] ?? 'http://localhost:3100'
const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
let ko = 0
const verif = (ok, quoi, detail = '') => {
  if (!ok) ko++
  console.log(`${ok ? '  ok ' : 'ÉCHEC'}  ${quoi}${detail ? '\n          ' + detail : ''}`)
}

for (const l of [1440, 390]) {
  console.log(`\n═══ ${l} ═══`)
  const p = await b.newPage({ viewport: { width: l, height: l === 390 ? 844 : 900 } })
  await p.goto(BASE + '/configurateur', { waitUntil: 'networkidle' })
  await p.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
  await p.reload({ waitUntil: 'networkidle' })
  await p.waitForTimeout(1000)

  // Étape 1 : un type de projet, choisi par son libellé visible.
  const choisi = await p.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) =>
      x.textContent.includes('Boutique en ligne'))
    b?.click()
    return b?.textContent.trim().slice(0, 20) ?? null
  })
  verif(!!choisi, 'étape 1 : un type de projet se choisit', choisi ?? 'aucun bouton trouvé')

  /* On avance étape par étape. À chaque tour, si « Continuer » est
     DÉSACTIVÉ, c'est que l'étape attend un choix : on prend la première
     option proposée. La première version de ce script cliquait « Continuer »
     sans rien choisir et restait bloquée à l'étape 3 — elle accusait le site
     d'un défaut qui était le sien. */
  for (let i = 0; i < 8; i++) {
    await p.waitForTimeout(450)
    const avance = await p.evaluate(() => {
      const tous = [...document.querySelectorAll('button')]
      const suivant = tous.find((x) => x.textContent.trim() === 'Continuer')
      if (suivant && !suivant.disabled) { suivant.click(); return 'continuer' }
      /* Les options d'une étape sont les boutons qui ne sont ni la
         navigation du site, ni les commandes du configurateur. */
      const exclus = /^(Services|Outils|Rechercher|Retour|Continuer|Tout refuser|Tout accepter|Personnaliser|Recommencer)/
      const option = tous.find((x) => {
        const t = x.textContent.trim()
        return t.length > 8 && !exclus.test(t) && !t.includes('Étape') && !x.disabled
      })
      if (option) { option.click(); return 'choix : ' + option.textContent.trim().slice(0, 30) }
      return null
    })
    if (!avance) break
  }
  await p.waitForTimeout(600)

  const lien = await p.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) =>
      x.textContent.includes('demander mon devis'))
    return a?.getAttribute('href') ?? null
  })
  verif(!!lien, 'la synthèse propose le passage au devis', lien ?? 'lien absent')
  if (!lien) { await p.close(); continue }

  await p.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) =>
      x.textContent.includes('demander mon devis'))
    a?.click()
  })
  await p.waitForURL('**/devis*', { timeout: 15000 }).catch(() => {})
  await p.waitForTimeout(1800)

  /* LE DEVIS EST LUI AUSSI UN ASSISTANT.

     Première version de ce contrôle : lire `document.querySelector('textarea')`
     dès l'arrivée. Il n'y en a pas — le champ « message » est à une étape
     ultérieure, et le test accusait le site d'une perte de données qui
     n'existait pas. On vérifie donc ce qui est réellement à l'écran à
     l'arrivée : le type de projet est-il DÉJÀ coché ? */
  const preselection = await p.evaluate(() =>
    [...document.querySelectorAll('button[aria-pressed="true"]')].map((x) =>
      x.textContent.trim().slice(0, 30)))
  verif(preselection.some((t) => /boutique/i.test(t)),
    'le type de projet arrive présélectionné, sans ressaisie',
    preselection.join(' | ') || 'aucun bouton coché')

  // Puis on avance jusqu'au champ « message » pour vérifier la synthèse.
  for (let i = 0; i < 8; i++) {
    await p.waitForTimeout(400)
    if (await p.evaluate(() => !!document.querySelector('textarea'))) break
    await p.evaluate(() => {
      const b = [...document.querySelectorAll('button')].find((x) =>
        /continuer|suivant/i.test(x.textContent.trim()) && !x.disabled)
      b?.click()
    })
  }
  const message = await p.evaluate(() => document.querySelector('textarea')?.value ?? '')
  verif(message.length > 20, 'la synthèse du configurateur est reprise dans le message',
    message.slice(0, 110).replace(/\n/g, ' · ') || '(vide)')

  await p.close()
}
await b.close()
console.log(ko === 0 ? '\n✓ parcours complet' : `\n✗ ${ko} point(s) en échec`)
process.exit(ko ? 1 : 0)
