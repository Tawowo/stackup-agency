/**
 * CONTEXTE DES DOCUMENTS — tout ce que les textes ont le droit d'afficher : identité légale (site.ts), paramètres
 * commerciaux (Excel → prix-publics.generated.ts) et « à partir de » du moteur. AUCUN montant n'est écrit à la main
 * dans un document : on lit `ctx.prix.*`, `ctx.e.*`, `ctx.s.*`.
 */
import { SITE } from '../../src/config/site.ts'
import { PRIX_PUBLICS as P } from '../../src/config/prix-publics.generated.ts'
import { PARAMS, LIGNES, NIVEAUX, PORTEES, NIVEAUX_IA } from '../../src/config/tarifs.generated.ts'
import { resultatOffre } from '../../src/domain/devis/offres.ts'

/** 1 234 € (espace insécable). */
export const euros = (n) => `${Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ')} €`
export const pct = (n) => `${n} %`

export function contexte() {
  const offres = Object.fromEntries(['une-page', 'multi-pages', 'boutique', 'outil'].map((id) => [id, resultatOffre(id)]))
  const c = PARAMS.coefficient
  return {
    e: SITE.entreprise,
    s: SITE,
    doc: SITE.documents,
    p: SITE.parrainage,
    euros,
    pct,
    prix: {
      demo: P.demo,
      visio: P.visio,
      heure: P.tarifHoraire,
      acompte: P.acomptePourcent,
      solde: 100 - P.acomptePourcent,
      paiement4FoisDes: P.paiement4FoisDes,
      rdvInclus: P.rdvInclus,
      seriesIncluses: P.seriesIncluses,
      pleinTarifJusqua: P.pleinTarifJusqua,
      abonnementMin: P.abonnementMin,
      indemniteRecouvrement: SITE.conditions.indemniteRecouvrement,
      offres: P.offres,
      /** Fourchettes « à partir de » du moteur (bas – haut) de chaque offre minimale. */
      fourchettes: Object.fromEntries(Object.entries(offres).map(([k, r]) => [k, r.fourchette])),
    },
    /** Lignes du catalogue vues par le client : libellé, description, « dès » (prix × coefficient), unité. Jamais d'heures ni de taux interne. */
    ligne: (code) => {
      const l = LIGNES.find((x) => x.code === code)
      return l ? { code, libelle: l.libelle, description: l.description, des: Math.round(l.prix * c), unite: l.unite } : null
    },
    lignes: (famille) => LIGNES.filter((l) => l.famille === famille).map((l) => ({ code: l.code, libelle: l.libelle, description: l.description, groupe: l.groupe, des: Math.round(l.prix * c), unite: l.unite })),
    niveaux: NIVEAUX.filter((n) => n.id !== 'Aucun').map((n) => ({ id: n.id, description: n.description, accueil: Math.round(n.accueil.prix * c), page: Math.round(n.page.prix * c) })),
    portees: PORTEES.filter((n) => n.id !== 'Aucun'),
    iaNiveaux: NIVEAUX_IA.filter((n) => n.id !== 'Aucune'),
  }
}
