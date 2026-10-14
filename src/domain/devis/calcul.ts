import { TARIFS, accesseurs } from './tarifs.ts'
import type { Tarifs } from './tarifs.ts'
import type { Bloc, ConfigDevis, ResultatDevis } from './types.ts'

/** ROUND d'Excel : arrondi « loin de zéro », avec une tolérance pour les flottants. */
export function arrondiExcel(x: number): number {
  const s = x < 0 ? -1 : 1
  return s * Math.floor(Math.abs(x) + 0.5 + 1e-9)
}
const arrondiA = (x: number, pas: number) => arrondiExcel(x / pas) * pas
const plafond = (x: number) => Math.ceil(x - 1e-9)

/** Familles dont la quantité est saisie par code (Simulateur : sections 3, 4, 5, 5b, 6b, 7b, 7c). */
function estOptionQuantifiee(code: string, famille: string): boolean {
  if (famille === 'fonctionnalite' || famille === 'effet' || famille === 'contenu' || famille === 'seo' || famille === 'outil-option') return true
  if (famille === 'boutique') return !['B00', 'B01', 'B02', 'B03', 'B04'].includes(code)
  if (famille === 'outil') return code !== 'O00'
  return false
}

export function calculer(config: ConfigDevis, tarifs: Tarifs = TARIFS): ResultatDevis {
  const { params: p } = tarifs
  const t = accesseurs(tarifs)
  const niveau = (id: string) => tarifs.niveaux.find((n) => n.id === id)
  const portee = (id: string) => tarifs.portees.find((n) => n.id === id)
  const ia = (id: string) => tarifs.iaNiveaux.find((n) => n.id === id)
  const q = (code: string) => Math.max(0, config.options[code] ?? 0)

  const aSite = config.accueil !== 'Aucun'
  const nPages = (id: string) => Math.max(0, Math.floor(config.pages[id] ?? 0))
  const idsNiveaux = tarifs.niveaux.map((n) => n.id).filter((id) => id !== 'Aucun')
  const totalPages = idsNiveaux.reduce((s, id) => s + nPages(id), 0)
  const serie = Math.max(0, Math.floor(config.pagesSerie))

  // Dégressivité des pages intérieures (Paramètres)
  const coefDegressif =
    totalPages === 0
      ? 0
      : (Math.min(totalPages, p.pleinTarifJusqua) +
          Math.max(0, Math.min(totalPages, p.tranche2Jusqua) - p.pleinTarifJusqua) * p.tauxTranche2 +
          Math.max(0, totalPages - p.tranche2Jusqua) * p.tauxAuDela) /
        totalPages
  const pagesReferencees = (aSite ? 1 : 0) + totalPages

  const accueil = niveau(config.accueil)
  const lancement = t.prix('L01')
  const montantAccueil = accueil?.accueil.prix ?? 0
  const montantPages = coefDegressif * idsNiveaux.reduce((s, id) => s + nPages(id) * (niveau(id)?.page.prix ?? 0), 0)
  const montantSerie = serie * t.prix('L02')

  const po = portee(config.portee)
  const montantSeo = po ? po.forfait.prix + pagesReferencees * po.parPage.prix + serie * po.parPageSerie.prix : 0
  const niv = ia(config.ia)
  const montantIA = niv ? niv.forfait.prix + pagesReferencees * niv.parPage.prix : 0

  // Sous-totaux par famille (quantité × prix)
  const parFamille = (famille: string) =>
    tarifs.lignes
      .filter((l) => l.famille === famille && estOptionQuantifiee(l.code, l.famille))
      .reduce((s, l) => s + q(l.code) * l.prix, 0)
  const fonctionnalites = parFamille('fonctionnalite')
  const effets = parFamille('effet')
  const contenus = parFamille('contenu')
  const seoCarte = parFamille('seo')
  const optionsBoutique = parFamille('boutique')
  const optionsOutil = parFamille('outil-option')
  const modulesPrix = parFamille('outil')
  const modules = tarifs.lignes.filter((l) => l.famille === 'outil' && l.code !== 'O00').reduce((s, l) => s + q(l.code), 0)

  const b = config.boutique
  const boutique = b.active
    ? t.prix('B00') +
      (b.import ? t.prix('B02') : b.produits * t.prix('B01')) +
      b.variantes * t.prix('B03') +
      Math.max(0, b.categories - p.categoriesBoutiqueIncluses) * t.prix('B04')
    : 0

  const o = config.outil
  const maj = tarifs.majoration.reduce((m, l) => (o.utilisateurs >= l.des ? l.taux : m), 0)
  const outil = o.actif ? t.prix('O00') + modulesPrix * (1 + maj) : 0

  const rdv = Math.max(0, config.rdvSupplementaires)
  const km = Math.max(0, config.kmAuDela)
  const extras = rdv * t.prix('P05') + km * t.prix('P08')

  const blocs: Bloc[] = [
    { id: 'lancement', libelle: 'Forfait de lancement', montant: lancement },
    { id: 'accueil', libelle: "Page d'accueil", montant: montantAccueil },
    { id: 'pages', libelle: 'Autres pages', montant: montantPages },
    { id: 'serie', libelle: 'Pages en série', montant: montantSerie },
    { id: 'seo', libelle: 'Être trouvé sur Google', montant: montantSeo + seoCarte },
    { id: 'ia', libelle: 'Visibilité dans les IA', montant: montantIA },
    { id: 'fonctionnalites', libelle: 'Fonctionnalités', montant: fonctionnalites },
    { id: 'effets', libelle: 'Effets sur mesure', montant: effets },
    { id: 'contenus', libelle: 'Contenus', montant: contenus },
    { id: 'boutique', libelle: 'Boutique en ligne', montant: boutique + optionsBoutique },
    { id: 'outil', libelle: 'Outil de gestion', montant: outil + optionsOutil },
    { id: 'extras', libelle: 'Rendez-vous et déplacements en plus', montant: extras },
  ]
  const totalBrut = blocs.reduce((s, x) => s + x.montant, 0)
  const apresCoefficient = totalBrut * p.coefficient * (config.urgence ? 1 + p.majorationUrgence : 1) * (1 - config.remise)
  const total = arrondiA(apresCoefficient, p.arrondi)
  const deduction = -((config.demoPayee ? t.prix('P02') : 0) + (config.visioPayee ? t.prix('P03') : 0))
  const reste = total + deduction
  const acompte = arrondiExcel(reste * p.acompte)
  const bas = arrondiA(total * p.fourchetteBas, p.arrondi)
  const haut = arrondiA(total * p.fourchetteHaut, p.arrondi)

  // Temps (mêmes termes que la ligne « Temps estimé » du Simulateur)
  const sommeHeuresFamille = (famille: string) =>
    tarifs.lignes.filter((l) => l.famille === famille && estOptionQuantifiee(l.code, l.famille)).reduce((s, l) => s + q(l.code) * l.heures, 0)
  const heures =
    t.heures('L01') +
    (accueil?.accueil.heures ?? 0) +
    coefDegressif * idsNiveaux.reduce((s, id) => s + nPages(id) * (niveau(id)?.page.heures ?? 0), 0) +
    serie * t.heures('L02') +
    (po ? po.forfait.heures + pagesReferencees * po.parPage.heures + serie * po.parPageSerie.heures : 0) +
    (niv ? niv.forfait.heures + pagesReferencees * niv.parPage.heures : 0) +
    sommeHeuresFamille('fonctionnalite') +
    sommeHeuresFamille('effet') +
    sommeHeuresFamille('contenu') +
    sommeHeuresFamille('seo') +
    sommeHeuresFamille('boutique') +
    sommeHeuresFamille('outil-option') +
    sommeHeuresFamille('outil') +
    (b.active ? t.heures('B00') + (b.import ? t.heures('B02') : b.produits * t.heures('B01')) : 0) +
    (o.actif ? t.heures('O00') : 0) +
    rdv
  const tauxHoraire = heures > 0 ? total / heures : 0
  const delaiMin = Math.max(1, plafond(heures / p.heuresParSemaine))
  const delaiMax = plafond(delaiMin * p.coefficientAttente)

  // Abonnement mensuel
  const ab = config.abonnement
  const immersif = config.accueil === 'Immersif' || nPages('Immersif') > 0
  const hebergement =
    (o.actif ? t.prix('A05') : 0) +
    (b.active ? t.prix('A04') : !aSite ? 0 : pagesReferencees > 10 ? t.prix('A02') : t.prix('A01')) +
    (immersif ? t.prix('A03') : 0)
  const maintenance =
    (aSite ? t.prix('A06') + pagesReferencees * t.prix('A07') + serie * t.prix('A08') : 0) +
    (b.active ? t.prix('A09') : 0) +
    (o.actif ? t.prix('A10') + modules * t.prix('A11') : 0)
  const suiviPrix = ab.suivi === 'Local' ? t.prix('A14') : ab.suivi === 'Régional' ? t.prix('A15') : ab.suivi === 'National' ? t.prix('A20') : 0
  const contenusAbo =
    Math.max(0, ab.publications) * t.prix('A12') +
    Math.max(0, ab.articles) * t.prix('A13') +
    suiviPrix +
    (ab.suiviIA ? t.prix('A21') : 0) +
    Math.max(0, ab.liens) * t.prix('A22') +
    (ab.ficheGoogle ? t.prix('A16') : 0) +
    (ab.rapport ? t.prix('A17') : 0) +
    Math.max(0, ab.heuresModifs) * t.prix('A18')
  const mensuel = ab.actif
    ? arrondiExcel((hebergement + maintenance + contenusAbo) * p.coefficient * (ab.annuel ? 1 - t.prix('A19') : 1))
    : 0

  return {
    blocs,
    totalBrut,
    apresCoefficient,
    total,
    deduction,
    reste,
    acompte,
    fourchette: { bas, haut },
    paiementEn4Fois: total >= p.paiement4FoisDes,
    heures,
    tauxHoraire,
    delaiSemaines: { min: delaiMin, max: delaiMax },
    pagesReferencees,
    coefficientDegressivite: coefDegressif,
    abonnement: { hebergement, maintenance, contenus: contenusAbo, mensuel, annuelTotal: mensuel * 12 },
    modules,
  }
}
