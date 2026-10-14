// Lit docs/tarifs/Grille-tarifaire-Stackup.xlsx et génère src/config/tarifs.generated.ts.
// Lecture par nom d'onglet et par code, jamais par numéro de ligne : une ligne supprimée
// de l'Excel disparaît du site au prochain `npm run tarifs`.
import ExcelJS from 'exceljs'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(racine, 'docs/tarifs/Grille-tarifaire-Stackup.xlsx')
const SORTIE = join(racine, 'src/config/tarifs.generated.ts')

const wb = new ExcelJS.Workbook()
await wb.xlsx.readFile(SOURCE)

const onglet = (nom) => {
  const ws = wb.getWorksheet(nom)
  if (!ws) throw new Error(`Onglet introuvable : « ${nom} »`)
  return ws
}
const brut = (c) => {
  const v = c.value
  if (v == null) return null
  if (typeof v === 'object') {
    if ('result' in v) return v.result ?? null
    if ('richText' in v) return v.richText.map((r) => r.text).join('')
    if ('text' in v) return v.text
  }
  return v
}
const txt = (c) => {
  const v = brut(c)
  return v == null ? '' : String(v).trim()
}
const num = (c) => {
  const v = brut(c)
  return typeof v === 'number' ? v : 0
}
const lignesDe = (ws) => {
  const out = []
  ws.eachRow({ includeEmpty: false }, (row) => out.push(row))
  return out
}
const colonnesRemplies = (row) => {
  let n = 0
  row.eachCell({ includeEmpty: false }, (c) => {
    if (brut(c) != null && txt(c) !== '') n++
  })
  return n
}

// ───────── Paramètres (par libellé) ─────────
const PARAMS_CLES = [
  [/^Taux horaire cible/i, 'tauxHoraireCible'],
  [/^Coefficient g[ée]n[ée]ral/i, 'coefficient'],
  [/^Fourchette affich[ée]e\s*:\s*bas/i, 'fourchetteBas'],
  [/^Fourchette affich[ée]e\s*:\s*haut/i, 'fourchetteHaut'],
  [/^Arrondi/i, 'arrondi'],
  [/^D[ée]gressivit[ée]\s*:\s*pages au plein tarif/i, 'pleinTarifJusqua'],
  [/^D[ée]gressivit[ée]\s*:\s*2e tranche jusqu/i, 'tranche2Jusqua'],
  [/^D[ée]gressivit[ée]\s*:\s*taux de la 2e/i, 'tauxTranche2'],
  [/^D[ée]gressivit[ée]\s*:\s*taux au-del/i, 'tauxAuDela'],
  [/^Acompte/i, 'acompte'],
  [/^Majoration d[ée]lai acc[ée]l[ée]r[ée]/i, 'majorationUrgence'],
  [/^Heures disponibles/i, 'heuresParSemaine'],
  [/^Coefficient d.attente/i, 'coefficientAttente'],
  [/^Paiement en 4 fois/i, 'paiement4FoisDes'],
  [/^Nombre de cat[ée]gories boutique/i, 'categoriesBoutiqueIncluses'],
]
const params = {}
for (const row of lignesDe(onglet('Paramètres'))) {
  const label = txt(row.getCell(1))
  const cle = PARAMS_CLES.find(([re]) => re.test(label))
  if (cle) params[cle[1]] = num(row.getCell(2))
}
for (const [, k] of PARAMS_CLES) {
  if (!(k in params)) throw new Error(`Paramètre manquant dans l'Excel : ${k}`)
}

// ───────── Catalogue (par code) ─────────
const RE_CODE = /^(OP|[LFECSBOAKP])\d+$/
const FAMILLES = { L: 'lancement', F: 'fonctionnalite', E: 'effet', C: 'contenu', S: 'seo', B: 'boutique', O: 'outil', OP: 'outil-option', A: 'abonnement', K: 'carte', P: 'parcours' }
const ONGLETS_CATALOGUE = ['Parcours client', 'Création site', 'Référencement', 'Boutique', 'Outil de gestion', 'Abonnements', 'À la carte']
const lignes = []
for (const nom of ONGLETS_CATALOGUE) {
  let groupe = ''
  for (const row of lignesDe(onglet(nom))) {
    const a = txt(row.getCell(1))
    if (!a) continue
    if (RE_CODE.test(a)) {
      const prefixe = a.replace(/\d+$/, '')
      lignes.push({
        code: a,
        famille: FAMILLES[prefixe],
        onglet: nom,
        groupe,
        libelle: txt(row.getCell(2)),
        description: txt(row.getCell(3)),
        prix: num(row.getCell(4)),
        heures: num(row.getCell(5)),
        unite: txt(row.getCell(7)),
        note: txt(row.getCell(8)),
      })
    } else if (colonnesRemplies(row) === 1 && !/^(Code|Niveau)$/.test(a)) {
      groupe = a
    }
  }
}
const doublon = lignes.find((l, i) => lignes.findIndex((m) => m.code === l.code) !== i)
if (doublon) throw new Error(`Code en double dans l'Excel : ${doublon.code}`)

// ───────── Niveaux visuels (Création site) ─────────
const niveaux = []
{
  let dedans = false
  for (const row of lignesDe(onglet('Création site'))) {
    const a = txt(row.getCell(1))
    if (a === 'Niveau') { dedans = true; continue }
    if (!dedans) continue
    if (!a || RE_CODE.test(a) || a === 'Code') break
    niveaux.push({
      id: a,
      description: txt(row.getCell(2)),
      accueil: { prix: num(row.getCell(4)), heures: num(row.getCell(5)) },
      page: { prix: num(row.getCell(6)), heures: num(row.getCell(7)) },
      exemple: txt(row.getCell(8)),
    })
  }
}

// ───────── Référencement : portées (A) et visibilité IA (B) ─────────
const portees = []
const iaNiveaux = []
{
  let section = ''
  let dedans = false
  for (const row of lignesDe(onglet('Référencement'))) {
    const a = txt(row.getCell(1))
    if (/^[A-C]\.\s/.test(a)) { section = a[0]; dedans = false; continue }
    if (a === 'Niveau') { dedans = true; continue }
    if (!dedans || !a || a === 'Code') { if (!a) dedans = false; continue }
    if (section === 'A') {
      portees.push({
        id: a,
        objectif: txt(row.getCell(2)),
        contenu: txt(row.getCell(3)),
        forfait: { prix: num(row.getCell(4)), heures: num(row.getCell(5)) },
        parPage: { prix: num(row.getCell(6)), heures: num(row.getCell(7)) },
        parPageSerie: { prix: num(row.getCell(8)), heures: num(row.getCell(9)) },
        suivi: txt(row.getCell(10)),
      })
    } else if (section === 'B') {
      iaNiveaux.push({
        id: a,
        objectif: txt(row.getCell(2)),
        contenu: txt(row.getCell(3)),
        forfait: { prix: num(row.getCell(4)), heures: num(row.getCell(5)) },
        parPage: { prix: num(row.getCell(6)), heures: num(row.getCell(7)) },
        suivi: txt(row.getCell(10)),
      })
    }
  }
}

// ───────── Majoration selon le nombre d'utilisateurs ─────────
const majorationUtilisateurs = []
{
  let dedans = false
  for (const row of lignesDe(onglet('Outil de gestion'))) {
    const a = txt(row.getCell(1))
    if (/^Utilisateurs/i.test(a)) { dedans = true; continue }
    if (!dedans) continue
    const de = brut(row.getCell(1))
    if (typeof de !== 'number') break
    majorationUtilisateurs.push({ des: de, taux: num(row.getCell(2)) })
  }
}

// ───────── Contrôles de cohérence ─────────
const exiger = (cond, msg) => { if (!cond) throw new Error(msg) }
exiger(niveaux.length >= 2, 'Niveaux visuels introuvables')
exiger(portees.length >= 2 && iaNiveaux.length >= 2, 'Portées de référencement ou niveaux IA introuvables')
exiger(majorationUtilisateurs.length >= 1, "Majoration selon les utilisateurs introuvable")
for (const c of ['L01', 'L02', 'P02', 'P03', 'P05', 'B00', 'O00', 'A01', 'A19']) {
  exiger(lignes.some((l) => l.code === c), `Code obligatoire absent de l'Excel : ${c}`)
}



const entete = `// FICHIER GÉNÉRÉ par scripts/tarifs-depuis-excel.mjs à partir de docs/tarifs/Grille-tarifaire-Stackup.xlsx.
// Ne pas modifier à la main : éditer l'Excel puis lancer \`npm run tarifs\`.

export interface TarifParams {
  tauxHoraireCible: number
  coefficient: number
  fourchetteBas: number
  fourchetteHaut: number
  arrondi: number
  pleinTarifJusqua: number
  tranche2Jusqua: number
  tauxTranche2: number
  tauxAuDela: number
  acompte: number
  majorationUrgence: number
  heuresParSemaine: number
  coefficientAttente: number
  paiement4FoisDes: number
  categoriesBoutiqueIncluses: number
}
export interface PrixHeures { prix: number; heures: number }
export interface Niveau { id: string; description: string; accueil: PrixHeures; page: PrixHeures; exemple: string }
export interface Portee {
  id: string; objectif: string; contenu: string
  forfait: PrixHeures; parPage: PrixHeures; parPageSerie: PrixHeures; suivi: string
}
export interface NiveauIA {
  id: string; objectif: string; contenu: string
  forfait: PrixHeures; parPage: PrixHeures; suivi: string
}
export interface Ligne {
  code: string
  famille: 'lancement' | 'fonctionnalite' | 'effet' | 'contenu' | 'seo' | 'boutique' | 'outil' | 'outil-option' | 'abonnement' | 'carte' | 'parcours'
  onglet: string
  groupe: string
  libelle: string
  description: string
  prix: number
  heures: number
  unite: string
  note: string
}

`
const corps = `export const PARAMS: TarifParams = ${JSON.stringify(params, null, 2)}

export const NIVEAUX: Niveau[] = ${JSON.stringify(niveaux, null, 2)}

export const PORTEES: Portee[] = ${JSON.stringify(portees, null, 2)}

export const NIVEAUX_IA: NiveauIA[] = ${JSON.stringify(iaNiveaux, null, 2)}

export const MAJORATION_UTILISATEURS: { des: number; taux: number }[] = ${JSON.stringify(majorationUtilisateurs, null, 2)}

export const LIGNES: Ligne[] = ${JSON.stringify(lignes, null, 2)}
`
writeFileSync(SORTIE, entete + corps)
console.log(`✓ ${SORTIE.replace(racine + '/', '')} — ${lignes.length} lignes, ${niveaux.length} niveaux, ${portees.length} portées, ${iaNiveaux.length} niveaux IA`)

// ───────── Fichier léger : les montants publics, calculés par le moteur ─────────
// Les pages d'accueil, les données éditoriales et les jetons n'ont pas besoin du catalogue entier :
// ils lisent ce petit fichier, produit par le moteur à partir de l'Excel.
const { aPartirDe, exemplesAbonnement } = await import('../src/domain/devis/offres.ts')
const ligne = (code) => lignes.find((l) => l.code === code)
const unite = (code, defaut) => Number(ligne(code)?.unite.match(/\d+/)?.[0] ?? defaut)
const publics = {
  offres: { 'une-page': aPartirDe('une-page'), 'multi-pages': aPartirDe('multi-pages'), boutique: aPartirDe('boutique'), outil: aPartirDe('outil') },
  abonnementMin: exemplesAbonnement()[0].mensuel,
  suiviLocal: ligne('A14')?.prix ?? 0,
  publication: ligne('A12')?.prix ?? 0,
  article: ligne('A13')?.prix ?? 0,
  rapport: ligne('A17')?.prix ?? 0,
  heureMois: ligne('A18')?.prix ?? 0,
  tarifHoraire: ligne('P05')?.prix ?? 0,
  demo: ligne('P02')?.prix ?? 0,
  visio: ligne('P03')?.prix ?? 0,
  acomptePourcent: Math.round(params.acompte * 100),
  pleinTarifJusqua: params.pleinTarifJusqua,
  paiement4FoisDes: params.paiement4FoisDes,
  rdvInclus: unite('P04', 3),
  seriesIncluses: unite('P06', 2),
  nbModulesOutil: lignes.filter((l) => l.famille === 'outil' && l.code !== 'O00').length,
  descriptions: { L01: ligne('L01')?.description ?? '', B00: ligne('B00')?.description ?? '', O00: ligne('O00')?.description ?? '' },
}
const SORTIE2 = join(racine, 'src/config/prix-publics.generated.ts')
writeFileSync(
  SORTIE2,
  `// FICHIER GÉNÉRÉ par scripts/tarifs-depuis-excel.mjs (résultats du moteur de devis). Ne pas modifier : \`npm run tarifs\`.\n\nexport const PRIX_PUBLICS = ${JSON.stringify(publics, null, 2)} as const\n`,
)
console.log(`✓ ${SORTIE2.replace(racine + '/', '')}`)
