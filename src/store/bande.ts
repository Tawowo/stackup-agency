/**
 * L'état partagé entre l'interface et la scène 3D.
 *
 * Pourquoi un store plutôt que des props : la bande est montée UNE fois dans
 * le layout racine et ne se démonte jamais (c'est tout l'intérêt du canvas
 * persistant). Les pages, elles, se montent et se démontent. Elles ne peuvent
 * donc pas lui passer de props ; elles déclarent ce qu'elles veulent, et la
 * scène lit.
 *
 * Pourquoi zustand et pas un contexte React : les valeurs qui changent à
 * chaque image du défilement (`progression`) ne doivent JAMAIS provoquer de
 * rendu React. Avec `subscribe`, `useFrame` lit la valeur courante sans que
 * React en sache rien. Un contexte, lui, re-rendrait tout l'arbre soixante
 * fois par seconde.
 */
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

/** Les états que la bande peut prendre. Une page = un état. */
export type EtatBande =
  | 'absent' // la page ne demande rien : la scène ne montre RIEN
  | 'logo' // à plat, silhouette exacte, projection orthographique
  | 'volume' // extrudée, pivotée, ombrée
  | 'strates' // découpée en cinq lamelles
  | 'offre' // configurée selon l'offre sélectionnée
  | 'ombre' // en retrait, teintée par un accent (pellicule)
  | 'reseau' // modules reliés (salle des machines, solutions)
  | 'plan' // à plat vue de dessus, cotée (tarifs)
  | 'repos' // repliée en logo, petite, immobile (pages éditoriales)
  | 'depart' // revient au centre et se replie en logo exact : la boucle se ferme

export type Offre = 'vitrine' | 'multipages' | 'boutique' | 'gestion'

export type Palier = 'bas' | 'moyen' | 'haut'

/** Trois niveaux, exigés par le dossier (14.10) : plein / léger / aucun. */
export type Mouvement = 'plein' | 'leger' | 'aucun'

interface EtatGlobal {
  /** Ce que la page courante demande à la scène. */
  etat: EtatBande
  /** Progression 0 → 1 de l'expérience en cours. Écrite à chaque image. */
  progression: number
  /** L'offre sélectionnée, partagée entre l'accueil, les tarifs et le devis. */
  offre: Offre
  /** Couleur d'accent du projet courant, pour la pellicule. */
  accent: string | null
  /** Palier de qualité, choisi au chargement puis ajusté en continu. */
  qualite: Palier
  /** Préférence de mouvement de l'utilisateur. */
  mouvement: Mouvement
  /** Vrai quand WebGL est indisponible ou perdu : le repli SVG prend la main. */
  repli: boolean
  /** La scène est-elle prête à être affichée (évite un clignotement) ? */
  prete: boolean
  /**
   * Où la bande doit se placer à l'écran, en fraction de la fenêtre.
   *
   * C'est une page HTML qui décide, pas la scène : le hero contient une
   * boîte vide qui tient la place du ruban, à côté du lettrage. La scène lit
   * sa position et s'y cale. C'est la seule façon d'avoir un objet 3D qui
   * s'aligne au pixel sur une mise en page fluide — et la raison pour
   * laquelle le lettrage peut rester du HTML, donc sélectionnable, traduisible
   * et lisible par un lecteur d'écran.
   */
  ancrage: { cx: number; cy: number; hauteur: number } | null
  /**
   * La couche isolée dans les STRATES, ou `null` si la pile est entière.
   *
   * L'isolement est une interaction au CLIC, jamais au survol : le dossier
   * l'interdit (§17.6 règle 16) et le tactile n'a pas de survol du tout.
   */
  isolee: number | null

  setEtat: (e: EtatBande) => void
  setProgression: (p: number) => void
  setOffre: (o: Offre) => void
  setAccent: (a: string | null) => void
  setQualite: (q: Palier) => void
  setMouvement: (m: Mouvement) => void
  setRepli: (r: boolean) => void
  setPrete: (p: boolean) => void
  setAncrage: (a: { cx: number; cy: number; hauteur: number } | null) => void
  setIsolee: (i: number | null) => void
}

export const useBande = create<EtatGlobal>()(
  subscribeWithSelector((set) => ({
    /* ABSENT PAR DÉFAUT, et c'est une correction.

       L'état initial était 'logo'. Conséquence vue en capture sur
       /services-locaux/creation-site-restaurant : la bande, que personne
       n'avait demandée, se plaçait au centre de la fenêtre à l'échelle 1 et
       barrait le texte de la section. Le canvas est en `position: fixed`
       au-dessus du fond de page, donc le défaut se propageait à toutes les
       routes qui ne déclarent rien — c'est-à-dire presque toutes.

       Le principe du canvas persistant est que les pages DÉCLARENT et que la
       scène obéit. Une page qui ne déclare rien doit donc obtenir le vide,
       pas le dernier état en date. */
    etat: 'absent',
    progression: 0,
    offre: 'vitrine',
    accent: null,
    qualite: 'moyen',
    mouvement: 'plein',
    repli: false,
    prete: false,
    ancrage: null,
    isolee: null,

    setEtat: (etat) => set({ etat }),
    // Pas de `set` si la valeur n'a pas bougé : la progression est écrite à
    // chaque image, et zustand notifie ses abonnés à chaque appel.
    setProgression: (progression) =>
      set((s) => (Math.abs(s.progression - progression) < 0.0005 ? s : { progression })),
    setOffre: (offre) => set({ offre }),
    setAccent: (accent) => set({ accent }),
    setQualite: (qualite) => set({ qualite }),
    setMouvement: (mouvement) => set({ mouvement }),
    setRepli: (repli) => set({ repli }),
    setPrete: (prete) => set({ prete }),
    setAncrage: (ancrage) => set({ ancrage }),
    setIsolee: (isolee) => set({ isolee }),
  })),
)

/** Lecture hors React, pour `useFrame` et les boucles. */
export const lireBande = () => useBande.getState()
