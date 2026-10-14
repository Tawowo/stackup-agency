/** Le projet décrit en mots (fiche du contact, e-mail) et la partie interne de l'e-mail. */
import { calculer } from './calcul.ts'
import { TARIFS } from './tarifs.ts'
import type { Tarifs } from './tarifs.ts'
import type { ConfigDevis, ResultatDevis } from './types.ts'

export interface LigneResume {
  cle: string
  valeur: string
}

export const euros = (n: number) => `${Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ')} €`
export const fourchetteTexte = (r: ResultatDevis) => `entre ${euros(r.fourchette.bas)} et ${euros(r.fourchette.haut)}`

/** Ce que le client a choisi, en langage client. */
export function lignesConfig(cfg: ConfigDevis, metier = '', t: Tarifs = TARIFS): LigneResume[] {
  const out: LigneResume[] = []
  const projets = [cfg.accueil !== 'Aucun' && 'site', cfg.boutique.active && 'boutique en ligne', cfg.outil.actif && 'outil de gestion'].filter(Boolean)
  out.push({ cle: 'Projet', valeur: projets.length ? projets.join(' + ') : 'à définir ensemble' })
  if (cfg.accueil !== 'Aucun') {
    out.push({ cle: 'Page d’accueil', valeur: cfg.accueil })
    const pages = Object.entries(cfg.pages).filter(([, n]) => n > 0)
    if (pages.length) out.push({ cle: 'Autres pages', valeur: pages.map(([id, n]) => `${n} en ${id}`).join(', ') })
    if (cfg.pagesSerie > 0) out.push({ cle: 'Pages par ville ou par métier', valeur: String(cfg.pagesSerie) })
  }
  if (cfg.portee !== 'Aucun') out.push({ cle: 'Être trouvé sur Google', valeur: `${cfg.portee} — ${t.portees.find((p) => p.id === cfg.portee)?.objectif ?? ''}` })
  if (cfg.ia !== 'Aucune') out.push({ cle: 'Visibilité dans les IA', valeur: cfg.ia })
  const liste = (familles: string[]) =>
    t.lignes
      .filter((l) => familles.includes(l.famille) && (cfg.options[l.code] ?? 0) > 0 && !(l.famille === 'boutique' && ['B00', 'B01', 'B02', 'B03', 'B04'].includes(l.code)))
      .map((l) => (cfg.options[l.code]! > 1 ? `${l.libelle} ×${cfg.options[l.code]}` : l.libelle))
  const f = liste(['fonctionnalite'])
  if (f.length) out.push({ cle: 'Fonctionnalités', valeur: f.join(', ') })
  const ef = liste(['effet'])
  if (ef.length) out.push({ cle: 'Effets', valeur: ef.join(', ') })
  const c = liste(['contenu'])
  if (c.length) out.push({ cle: 'Contenus', valeur: c.join(', ') })
  const s = liste(['seo'])
  if (s.length) out.push({ cle: 'Référencement à la carte', valeur: s.join(', ') })
  if (cfg.boutique.active) {
    const b = cfg.boutique
    out.push({ cle: 'Boutique', valeur: `${b.import ? 'catalogue importé depuis un fichier' : `${b.produits} produit${b.produits > 1 ? 's' : ''}`}, ${b.variantes} variante${b.variantes > 1 ? 's' : ''}, ${b.categories} catégorie${b.categories > 1 ? 's' : ''}` })
    const o = liste(['boutique'])
    if (o.length) out.push({ cle: 'Options boutique', valeur: o.join(', ') })
  }
  if (cfg.outil.actif) {
    const m = liste(['outil'])
    out.push({ cle: 'Outil de gestion', valeur: `${cfg.outil.utilisateurs} utilisateur${cfg.outil.utilisateurs > 1 ? 's' : ''}${metier ? `, métier : ${metier}` : ''}${m.length ? ` — ${m.join(', ')}` : ''}` })
    const o = liste(['outil-option'])
    if (o.length) out.push({ cle: 'Options de l’outil', valeur: o.join(', ') })
  }
  const ab = cfg.abonnement
  if (ab.actif) {
    const p: string[] = []
    if (ab.publications) p.push(`${ab.publications} publication${ab.publications > 1 ? 's' : ''}/mois`)
    if (ab.articles) p.push(`${ab.articles} article${ab.articles > 1 ? 's' : ''}/mois`)
    if (ab.suivi !== 'Aucun') p.push(`suivi du référencement ${ab.suivi}`)
    if (ab.suiviIA) p.push('suivi dans les IA')
    if (ab.liens) p.push(`${ab.liens} lien${ab.liens > 1 ? 's' : ''}/mois`)
    if (ab.ficheGoogle) p.push('fiche Google')
    if (ab.rapport) p.push('rapport mensuel')
    if (ab.heuresModifs) p.push(`${ab.heuresModifs} h de modifications/mois`)
    if (ab.annuel) p.push('paiement annuel')
    out.push({ cle: 'Abonnement', valeur: p.length ? p.join(', ') : 'hébergement et maintenance' })
  }
  return out
}

export function resumeTexte(cfg: ConfigDevis, metier = ''): string {
  return lignesConfig(cfg, metier)
    .map((l) => `${l.cle} : ${l.valeur}`)
    .join('\n')
}

/** Ce que le client voit : la fourchette, jamais le prix exact. */
export function resumeClient(cfg: ConfigDevis): string {
  const r = calculer(cfg)
  const abo = r.abonnement.mensuel > 0 ? ` · abonnement estimé ${euros(r.abonnement.mensuel)}/mois` : ''
  return `Création ${fourchetteTexte(r)}${abo} · délai indicatif ${r.delaiSemaines.min} à ${r.delaiSemaines.max} semaines`
}

/** INTERNE — réservé à l'e-mail reçu par Mathéo. Ne jamais afficher au client. */
export function blocInterne(cfg: ConfigDevis): LigneResume[] {
  const r = calculer(cfg)
  const h = (n: number) => `${n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} h`
  return [
    { cle: 'Prix exact (création)', valeur: euros(r.total) },
    { cle: 'Fourchette montrée au client', valeur: fourchetteTexte(r) },
    { cle: 'Temps estimé', valeur: h(r.heures) },
    { cle: 'Taux horaire effectif', valeur: `${r.tauxHoraire.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} €/h` },
    { cle: `Acompte (${Math.round(TARIFS.params.acompte * 100)} %)`, valeur: euros(r.acompte) },
    { cle: 'Délai indicatif', valeur: `${r.delaiSemaines.min} à ${r.delaiSemaines.max} semaines` },
    { cle: 'Abonnement mensuel', valeur: r.abonnement.mensuel > 0 ? `${euros(r.abonnement.mensuel)} (hébergement ${euros(r.abonnement.hebergement)}, maintenance ${euros(r.abonnement.maintenance)}, contenus ${euros(r.abonnement.contenus)})` : 'aucun' },
    { cle: 'Détail par bloc', valeur: r.blocs.filter((b) => b.montant > 0).map((b) => `${b.libelle} ${euros(b.montant)}`).join(' · ') },
  ]
}
