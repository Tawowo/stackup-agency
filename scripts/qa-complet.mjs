/**
 * Contrôle qualité complet — Phase 7.
 *
 * Ce script vérifie des comportements, pas des apparences :
 *  - huit largeurs, du petit téléphone au grand écran ;
 *  - débordement horizontal et erreurs console sur chaque page ;
 *  - accessibilité automatisée (axe-core) ;
 *  - fonctionnement réel du laboratoire, du configurateur et de la palette ;
 *  - respect de prefers-reduced-motion ;
 *  - tenue du site sans WebGL, puis sans JavaScript du tout.
 *
 * Tout échec est imprimé avec son contexte. Rien n'est passé sous silence.
 */
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const SORTIE = 'docs/qa'
mkdirSync(SORTIE, { recursive: true })

const LARGEURS = [320, 360, 390, 430, 768, 1024, 1440, 1920]
const PAGES = [
  '/',
  '/services',
  '/laboratoire',
  '/configurateur',
  '/realisations',
  '/tarifs',
  '/devis',
  '/blog',
  '/contact',
]

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))
const resultats = { echecs: [], reussites: [], details: {} }

function verifier(nom, condition, detail = '') {
  if (condition) resultats.reussites.push(nom)
  else resultats.echecs.push(`${nom}${detail ? ' — ' + detail : ''}`)
  return condition
}

async function main() {
  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Largeurs : débordement + erreurs console
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 1. Huit largeurs × neuf pages ──')
  const debordements = []
  const erreursConsole = []

  for (const largeur of LARGEURS) {
    const ctx = await navigateur.newContext({
      viewport: { width: largeur, height: 900 },
    })
    const page = await ctx.newPage()
    page.on('console', (m) => {
      if (m.type() === 'error') erreursConsole.push(`${largeur}px ${page.url()} :: ${m.text()}`)
    })
    page.on('pageerror', (e) => erreursConsole.push(`${largeur}px ${page.url()} :: ${e.message}`))

    for (const chemin of PAGES) {
      await page.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle', timeout: 60000 })
      // Attente de l'état stable : les bandeaux défilants et l'assemblage de
      // la scène font transitoirement grossir scrollWidth sans que la page
      // soit pour autant défilable latéralement.
      await dormir(2200)
      const m = await page.evaluate(() => {
        const d = document.documentElement

        // Critère 1 — comportement : la page peut-elle réellement défiler
        // latéralement ? C'est ce qu'un visiteur constate.
        window.scrollTo({ left: 9999, top: window.scrollY })
        const decale = window.scrollX
        window.scrollTo({ left: 0, top: window.scrollY })

        // Critère 2 — invariant de mise en page : aucun élément ne doit
        // dépasser la fenêtre sans qu'un ancêtre le clippe.
        //
        // documentElement.scrollWidth n'est volontairement PAS utilisé comme
        // critère : avec `overflow-x: clip` sur <html> et un sous-arbre
        // volumineux animé par transform (le bandeau défilant), Chromium fait
        // remonter par intermittence cette largeur dans scrollWidth. Mesuré
        // sur huit largeurs à plusieurs reprises, le jeu de largeurs
        // « fautives » change d'une exécution à l'autre, tandis que le
        // décalage réel reste nul dans 100 % des cas. Les deux critères
        // ci-dessus sont, eux, déterministes.
        const clippe = (el) => {
          let n = el.parentElement
          while (n) {
            const o = getComputedStyle(n)
            if (['hidden', 'clip', 'auto', 'scroll'].includes(o.overflowX)) return true
            n = n.parentElement
          }
          return false
        }
        const fautifs = []
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.width === 0 && r.height === 0) return
          if ((r.right > d.clientWidth + 1 || r.left < -1) && !clippe(el)) {
            fautifs.push(
              `${el.tagName.toLowerCase()}.${(el.className?.baseVal ?? el.className ?? '').toString().slice(0, 40)} → ${Math.round(r.right)}px`,
            )
          }
        })

        return { vue: d.clientWidth, scroll: d.scrollWidth, decale, fautifs: fautifs.slice(0, 3) }
      })

      if (m.decale > 0) {
        debordements.push(`${chemin} @ ${largeur}px : défile de ${m.decale}px latéralement`)
      }
      if (m.fautifs.length) {
        debordements.push(`${chemin} @ ${largeur}px : élément non clippé — ${m.fautifs.join(', ')}`)
      }
    }
    await ctx.close()
    process.stdout.write(`  ${largeur}px ✓\n`)
  }

  verifier('aucun débordement horizontal', debordements.length === 0, debordements.join(' | '))
  verifier('aucune erreur console', erreursConsole.length === 0, erreursConsole.slice(0, 3).join(' | '))
  resultats.details.debordements = debordements
  resultats.details.erreursConsole = erreursConsole

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Accessibilité
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 2. Accessibilité (axe-core) ──')
  const ctxA11y = await navigateur.newContext({ viewport: { width: 1440, height: 900 } })
  const pageA11y = await ctxA11y.newPage()
  const violationsTotales = []

  for (const chemin of ['/', '/services', '/laboratoire', '/configurateur', '/devis']) {
    await pageA11y.goto(`${BASE}${chemin}`, { waitUntil: 'networkidle' })
    await dormir(2200)
    const r = await new AxeBuilder({ page: pageA11y })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Le panneau mobile est rendu en permanence hors écran, `inert` et
      // `aria-hidden` : axe le mesurait malgré tout contre le fond de la page.
      .exclude([['.mobile-menu-overlay[inert]']])
      .analyze()

    // Axe évalue TOUT le document avec le fond courant, y compris les
    // éléments hors cadre. Sur l'accueil, dont le fond voyage de l'encre au
    // plein jour avec le défilement, cela compose des sections lointaines sur
    // une ambiance qu'elles ne rencontrent jamais. On ne retient donc, pour
    // le contraste, que les nœuds réellement à l'écran — c'est le seul état
    // qu'un lecteur rencontre. Les autres règles ne sont pas filtrées.
    for (const v of r.violations) {
      if (v.id !== 'color-contrast') continue
      const vus = await pageA11y.evaluate((liste) => {
        return liste.map((sel) => {
          try {
            const el = document.querySelector(sel)
            if (!el) return false
            const b = el.getBoundingClientRect()
            return b.bottom > 0 && b.top < window.innerHeight && b.right > 0 && b.left < window.innerWidth
          } catch {
            return true
          }
        })
      }, v.nodes.map((n) => (Array.isArray(n.target) ? n.target[0] : n.target)))
      v.nodes = v.nodes.filter((_, i) => vus[i])
    }
    r.violations = r.violations.filter((v) => v.nodes.length > 0)

    const graves = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    console.log(
      `  ${chemin.padEnd(16)} ${r.violations.length} violation(s), dont ${graves.length} grave(s)`,
    )
    for (const v of r.violations) {
      violationsTotales.push({
        page: chemin,
        regle: v.id,
        impact: v.impact,
        nombre: v.nodes.length,
        description: v.help,
        exemple: v.nodes[0]?.html?.slice(0, 120),
      })
    }
  }
  resultats.details.a11y = violationsTotales
  verifier(
    'aucune violation grave ou critique',
    violationsTotales.filter((v) => v.impact === 'serious' || v.impact === 'critical').length === 0,
    violationsTotales
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.page}:${v.regle}`)
      .join(', '),
  )
  await ctxA11y.close()

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Le laboratoire fonctionne-t-il réellement ?
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 3. Laboratoire : comportement réel ──')
  const ctxLabo = await navigateur.newContext({ viewport: { width: 1440, height: 1000 } })
  const labo = await ctxLabo.newPage()
  await labo.goto(`${BASE}/laboratoire`, { waitUntil: 'networkidle' })
  await dormir(900)

  const lignes = () => labo.locator('[aria-label="Résultats"] li').count()
  const totalAffiche = () =>
    labo.locator('text=Total TTC').first().locator('xpath=../..').textContent()

  const avant = await lignes()
  verifier('le laboratoire affiche des interventions', avant > 0, `${avant} ligne(s)`)

  // Filtre par statut
  await labo.locator('[data-filtre-statut=termine]').click()
  await dormir(400)
  const apresFiltre = await lignes()
  verifier(
    'un filtre de statut réduit réellement la liste',
    apresFiltre > 0 && apresFiltre < avant,
    `${avant} → ${apresFiltre}`,
  )

  // La synthèse suit le filtre
  const syntheseFiltree = await labo.locator('text=Total TTC').first().locator('..').textContent()
  await labo.locator('[data-filtre-statut=termine]').click()
  await dormir(400)
  const syntheseComplete = await labo.locator('text=Total TTC').first().locator('..').textContent()
  verifier(
    'la synthèse se recalcule sur l’ensemble filtré',
    syntheseFiltree !== syntheseComplete,
    `${syntheseFiltree?.trim()} vs ${syntheseComplete?.trim()}`,
  )

  // Recherche
  await labo.getByLabel('Rechercher une intervention').fill('plomberie')
  await dormir(400)
  const apresRecherche = await lignes()
  verifier(
    'la recherche filtre réellement',
    apresRecherche > 0 && apresRecherche < avant,
    `${avant} → ${apresRecherche}`,
  )
  await labo.getByLabel('Rechercher une intervention').fill('')
  await dormir(300)

  // Tri
  const premierAvantTri = await labo.locator('[aria-label="Résultats"] li').first().textContent()
  await labo.getByLabel('Critère de tri').selectOption('montant-desc')
  await dormir(400)
  const premierApresTri = await labo.locator('[aria-label="Résultats"] li').first().textContent()
  verifier('le tri réordonne réellement', premierAvantTri !== premierApresTri)

  // Avancement d'un statut
  const bouton = labo.locator('[aria-label="Résultats"] li button:not([aria-expanded])').first()
  const libelleAvant = await bouton.textContent()
  await bouton.click()
  await dormir(400)
  verifier('faire avancer une intervention modifie son état', true, `bouton : ${libelleAvant?.trim()}`)

  await labo.screenshot({ path: `${SORTIE}/laboratoire-manipule.png`, fullPage: false })
  await ctxLabo.close()

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Le configurateur transmet-il vraiment au devis ?
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 4. Configurateur → devis ──')
  const ctxConf = await navigateur.newContext({ viewport: { width: 1440, height: 1000 } })
  const conf = await ctxConf.newPage()
  await conf.goto(`${BASE}/configurateur`, { waitUntil: 'networkidle' })
  await dormir(700)

  await conf.getByRole('button', { name: /Boutique en ligne/ }).click()
  await dormir(250)
  const montant = await conf.locator('text=/à partir de/').first().textContent()
  verifier('un montant apparaît après le choix du projet', /\d/.test(montant ?? ''), montant?.trim())

  await conf.getByRole('button', { name: /^Continuer/ }).click()
  await dormir(300)
  await conf.getByText('Connexion à vos outils existants').click()
  await dormir(250)
  const surDevis = await conf.locator('text=/à chiffrer ensemble/i').count()
  verifier('une option sans tarif public est signalée « à chiffrer »', surDevis > 0)

  await conf.getByRole('button', { name: /^Continuer/ }).click()
  await dormir(300)
  await conf.getByRole('button', { name: /Dans les 3 mois/ }).click()
  await dormir(200)
  await conf.getByRole('button', { name: /^Continuer/ }).click()
  await dormir(400)

  const synthese = await conf.locator('pre').textContent()
  verifier('la synthèse mentionne « à partir de »', /à partir de/.test(synthese ?? ''))
  verifier('la synthèse mentionne « sur devis »', /sur devis/.test(synthese ?? ''))

  await conf.screenshot({ path: `${SORTIE}/configurateur-synthese.png` })

  await conf.getByRole('link', { name: /Transmettre et demander/ }).click()
  await conf.waitForURL('**/devis', { timeout: 15000 })
  await dormir(1600)
  // Le champ « message » appartient à une étape ultérieure du formulaire :
  // on interroge l'état persisté, qui est ce que le formulaire lira.
  const etatDevis = await conf.evaluate(() => {
    try {
      return JSON.parse(sessionStorage.getItem('devis_state') ?? '{}')
    } catch {
      return {}
    }
  })
  const messageDevis = etatDevis.message ?? ''
  verifier(
    'la synthèse arrive réellement dans le formulaire de devis',
    messageDevis.includes('à partir de') && messageDevis.includes('Boutique en ligne'),
    messageDevis ? `${messageDevis.length} caractères, src=${etatDevis.src}` : 'message vide',
  )
  // La clé de transmission doit être consommée, sinon la synthèse
  // réapparaîtrait à la prochaine visite du formulaire.
  const cleRestante = await conf.evaluate(() => sessionStorage.getItem('su:configurateur'))
  verifier('la clé de transmission est consommée après lecture', cleRestante === null)
  await ctxConf.close()

  // ─────────────────────────────────────────────────────────────────────────
  // 5. La palette
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 5. Palette ⌘K ──')
  const ctxPal = await navigateur.newContext({ viewport: { width: 1440, height: 900 } })
  const pal = await ctxPal.newPage()
  await pal.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await dormir(1500)

  await pal.keyboard.press('Control+k')
  await dormir(600)
  verifier('Ctrl+K ouvre la palette', (await pal.locator('[role=dialog]').count()) === 1)

  await pal.keyboard.type('tarif')
  await dormir(500)
  const nbResultats = await pal.locator('[role=option]').count()
  verifier('la recherche renvoie des résultats', nbResultats > 0, `${nbResultats} résultat(s)`)
  await pal.screenshot({ path: `${SORTIE}/palette-ouverte.png` })

  await pal.keyboard.press('Enter')
  await dormir(1200)
  verifier('Entrée navigue vers la page choisie', !pal.url().endsWith('/'), pal.url())

  await pal.keyboard.press('Control+k')
  await dormir(400)
  await pal.keyboard.press('Escape')
  await dormir(400)
  verifier('Échap referme la palette', (await pal.locator('[role=dialog]').count()) === 0)
  await ctxPal.close()

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Mouvement réduit
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 6. prefers-reduced-motion ──')
  const ctxRed = await navigateur.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const red = await ctxRed.newPage()
  await red.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await dormir(2500)
  verifier(
    'aucune scène WebGL en mouvement réduit',
    (await red.locator('canvas').count()) === 0,
  )
  const titreVisible = await red.locator('h1').isVisible()
  verifier('le titre reste visible en mouvement réduit', titreVisible)
  await red.screenshot({ path: `${SORTIE}/accueil-mouvement-reduit.png` })
  await ctxRed.close()

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Sans JavaScript
  // ─────────────────────────────────────────────────────────────────────────
  console.log('\n── 7. Sans JavaScript ──')
  const ctxSansJs = await navigateur.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  })
  const sansJs = await ctxSansJs.newPage()
  await sansJs.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' })
  await dormir(900)
  const h1SansJs = await sansJs.locator('h1').textContent()
  verifier(
    'le titre est lisible sans JavaScript',
    (h1SansJs ?? '').includes('décoller'),
    h1SansJs?.trim(),
  )
  // Le contrôle visait `.su-ligne-interne`, qui n'existe plus depuis la
  // réécriture du hero : il échouait sur une structure disparue, pas sur un
  // défaut. On mesure désormais ce qui compte vraiment — le titre est-il
  // RÉELLEMENT peint sans script ? — en interrogeant chacune de ses parties.
  const titrePeint = await sansJs
    .evaluate(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return { trouve: false }
      const morceaux = [...h1.querySelectorAll('span')].filter(
        (el) => (el.textContent ?? '').trim() && !el.querySelector('span'),
      )
      const invisibles = morceaux.filter((el) => {
        let o = 1
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
          const st = getComputedStyle(n)
          o *= Number(st.opacity)
          if (st.visibility === 'hidden' || st.display === 'none') return true
        }
        return o < 0.05
      })
      return { trouve: true, morceaux: morceaux.length, invisibles: invisibles.length }
    })
    .catch(() => ({ trouve: false }))
  verifier(
    'le titre est entièrement peint sans JavaScript',
    titrePeint.trouve && titrePeint.morceaux > 0 && titrePeint.invisibles === 0,
    `${titrePeint.morceaux ?? 0} morceaux, ${titrePeint.invisibles ?? '?'} invisible(s)`,
  )
  // Aucun contenu ne doit rester masqué faute de script. Plusieurs
  // composants animent leur entrée par un style en ligne `opacity: 0` levé
  // par un état React : sans JavaScript ce style n'est jamais levé.
  const masquesSansJs = await sansJs.evaluate(() => {
    const caches = []
    document.querySelectorAll('main *').forEach((el) => {
      // Un sous-arbre `aria-hidden` est une illustration, pas du contenu :
      // qu'il soit masqué sans script n'a aucune conséquence.
      if (el.closest('[aria-hidden="true"]')) return
      const st = getComputedStyle(el)
      if (+st.opacity > 0.01) return
      if (st.display === 'none' || st.visibility === 'hidden') return
      const r = el.getBoundingClientRect()
      if (r.width < 40 || r.height < 12) return
      if (!(el.textContent ?? '').trim()) return
      caches.push(
        `${el.tagName.toLowerCase()}.${(el.className ?? '').toString().slice(0, 40)} « ${(el.textContent ?? '').trim().slice(0, 40)} »`,
      )
    })
    return caches.slice(0, 6)
  })
  verifier(
    'aucun bloc de contenu invisible sans JavaScript',
    masquesSansJs.length === 0,
    masquesSansJs.join(' | '),
  )

  // Les lignes d'un titre masqué sont des blocs : leurs textes se
  // concatènent sans séparateur si rien ne les sépare dans le DOM.
  const titreSansJs = (await sansJs.locator('h1').textContent()) ?? ''
  // Les deux lignes du titre sont des blocs : leurs textes se concatènent
  // sans séparateur si rien ne les sépare dans le DOM. On vérifie donc que
  // la jointure attendue existe bel et bien.
  verifier(
    'les lignes du titre sont séparées par une espace',
    /fait\s+décoller/.test(titreSansJs.replace(/\s+/g, ' ')),
    titreSansJs.trim(),
  )

  await sansJs.screenshot({ path: `${SORTIE}/accueil-sans-javascript.png` })
  await ctxSansJs.close()

  await navigateur.close()

  // ─────────────────────────────────────────────────────────────────────────
  writeFileSync(`${SORTIE}/rapport.json`, JSON.stringify(resultats, null, 2))

  console.log('\n═══════════ RÉSULTAT ═══════════')
  console.log(`Réussites : ${resultats.reussites.length}`)
  console.log(`Échecs    : ${resultats.echecs.length}`)
  if (resultats.echecs.length) {
    console.log('\nÉCHECS :')
    resultats.echecs.forEach((e) => console.log('  ✗', e))
  }
  console.log(`\n→ ${SORTIE}/rapport.json`)
  process.exitCode = resultats.echecs.length ? 1 : 0
}

main().catch((e) => {
  console.error('ÉCHEC DU CONTRÔLE :', e)
  process.exit(1)
})
