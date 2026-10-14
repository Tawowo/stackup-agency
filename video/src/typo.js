/**
 * LA TYPOGRAPHIE CINÉTIQUE — Poppins 700, énorme, qui touche les bords.
 *
 * Règle du brief : jamais de texte qui apparaît en simple fondu. Les mots se
 * déplient depuis leur ligne de base, sont découpés par un balayage ambre, ou
 * s'écrasent sur les temps. Les sorties passent sous la ligne de base ou sous
 * le balayage. Tout est posé sur la timeline GSAP en pause (seek-safe).
 */
import { alea } from "./outils.js";

const mesure = document.createElement("canvas").getContext("2d");

/** Largeur d'une ligne en Poppins 700 à 100 px (avec l'interlettrage −0,02 em). */
function largeur100(s, poids = 700, famille = "Poppins") {
  mesure.font = `${poids} 100px ${famille}`;
  return mesure.measureText(s).width - 2 * Math.max(0, s.length - 1);
}

/** Taille qui fait tenir les lignes dans la boîte (largeur, hauteur). */
export function ajuster(lignes, largeurMax, hauteurMax, interligne = 0.98) {
  const w = Math.max(...lignes.map((l) => largeur100(l)));
  let px = (largeurMax / w) * 100;
  if (hauteurMax) px = Math.min(px, hauteurMax / (lignes.length * interligne));
  return px;
}

/**
 * Crée un titre. `lignes` : tableau de chaînes (un `*` encadre un mot ambre :
 * « UN SITE QUI SE *DÉMARQUE* »).
 */
export function creerTitre(parent, { id, lignes, px, x, y, ancre = "gauche", style = "deplier" }) {
  const el = document.createElement("div");
  el.className = "titre";
  el.id = id;
  el.style.fontSize = `${px}px`;
  const lettres = [];
  const lignesEls = [];
  for (const brute of lignes) {
    const ligne = document.createElement("div");
    ligne.className = "ligne";
    const masque = document.createElement("div");
    masque.className = "masque";
    const contenu = document.createElement("div");
    contenu.className = "contenu";
    const remplir = (cible, collecter) => {
      let ambre = false;
      for (const morceau of brute.split(/(\*)/)) {
        if (morceau === "*") {
          ambre = !ambre;
          continue;
        }
        for (const ch of morceau) {
          const s = document.createElement("span");
          s.className = "lettre" + (ambre ? " ambre" : "");
          s.textContent = ch === " " ? " " : ch;
          cible.appendChild(s);
          if (collecter) lettres.push(s);
        }
      }
    };
    if (style === "morceaux") {
      // trois tranches horizontales du même texte, qui se recollent
      contenu.style.color = "transparent";
      remplir(contenu, false);
      const tranches = [];
      for (let k = 0; k < 3; k++) {
        const tr = document.createElement("div");
        tr.className = "tranche";
        tr.style.clipPath = `inset(${k * 33.4}% -5% ${100 - (k + 1) * 33.4}% -5%)`;
        tr.style.color = "#FFFDF9"; // le contenu est transparent : les tranches portent la couleur
        remplir(tr, false);
        contenu.appendChild(tr);
        tranches.push(tr);
      }
      ligne.tranches = tranches;
    } else {
      remplir(contenu, true);
    }
    const barre = document.createElement("div");
    barre.className = "barre";
    const rature = document.createElement("div");
    rature.className = "rature";
    masque.appendChild(contenu);
    ligne.append(masque, barre, rature);
    ligne.contenu = contenu;
    ligne.barre = barre;
    ligne.rature = rature;
    el.appendChild(ligne);
    lignesEls.push(ligne);
  }
  parent.appendChild(el);
  el.style.textAlign = ancre === "droite" ? "right" : ancre === "centre" ? "center" : "left";
  // position : (x, y) = coin selon l'ancre, en px
  const largeur = Math.max(...lignes.map((l) => largeur100(l.replace(/\*/g, "")))) * (px / 100);
  const gauche = ancre === "droite" ? x - largeur : ancre === "centre" ? x - largeur / 2 : x;
  el.style.left = `${gauche}px`;
  el.style.top = `${y}px`;
  el.style.width = `${largeur * 1.02}px`;
  return { el, lettres, lignes: lignesEls, px, largeur, hauteur: lignes.length * px * 0.98, style };
}

/** Entrées. */
export function entree(tl, T, t, style = T.style) {
  const { el, lettres, lignes } = T;
  tl.set(el, { opacity: 1 }, t - 0.001);
  if (style === "deplier") {
    tl.fromTo(
      lettres,
      { rotationX: -100, yPercent: 30, opacity: 0 },
      { rotationX: 0, yPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out", stagger: { each: 0.022 } },
      t,
    );
  } else if (style === "ecraser") {
    tl.fromTo(lettres, { yPercent: -160, scaleY: 1.7, opacity: 0 }, { yPercent: 0, scaleY: 1, opacity: 1, duration: 0.18, ease: "power3.in", stagger: 0.018 }, t);
    tl.to(lettres, { scaleY: 0.72, scaleX: 1.14, duration: 0.06, ease: "power2.out", stagger: 0.018 }, t + 0.18);
    tl.to(lettres, { scaleY: 1, scaleX: 1, duration: 0.22, ease: "power3.out", stagger: 0.018 }, t + 0.24);
  } else if (style === "balayage") {
    lignes.forEach((L, i) => {
      const d = t + i * 0.08;
      tl.set(L.barre, { transformOrigin: "0% 50%" }, d - 0.001);
      tl.fromTo(L.barre, { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "power3.in" }, d);
      tl.fromTo(L.contenu, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.01 }, d + 0.2);
      tl.set(L.barre, { transformOrigin: "100% 50%" }, d + 0.2);
      tl.to(L.barre, { scaleX: 0, duration: 0.24, ease: "power3.out" }, d + 0.21);
    });
  } else if (style === "morceaux") {
    lignes.forEach((L, i) => {
      L.tranches.forEach((tr, k) => {
        const dx = [-0.9, 0.7, -0.4][k] * (1 + i * 0.3);
        tl.fromTo(tr, { xPercent: dx * 40, yPercent: [-8, 0, 8][k], opacity: 0, skewX: [-12, 10, -6][k] }, { xPercent: 0, yPercent: 0, opacity: 1, skewX: 0, duration: 0.32 + k * 0.06, ease: "expo.out" }, t + i * 0.07 + k * 0.03);
      });
    });
  }
}

/** Sorties : le texte passe sous sa ligne de base, ou sous le balayage. */
export function sortie(tl, T, t, style = "chute") {
  const { el, lignes } = T;
  // les titres « en morceaux » n'ont pas de lettres isolées : on fait voler les tranches
  const lettres = T.lettres.length ? T.lettres : lignes.flatMap((L) => L.tranches || [L.contenu]);
  // la rature part avec le mot
  lignes.forEach((L) => {
    tl.set(L.rature, { transformOrigin: "100% 50%" }, t - 0.001);
    tl.to(L.rature, { scaleX: 0, duration: 0.18, ease: "power3.in" }, t);
  });
  if (style === "chute") {
    lignes.forEach((L, i) => tl.to(L.contenu, { yPercent: 118, duration: 0.26, ease: "power3.in" }, t + i * 0.04));
  } else if (style === "monte") {
    lignes.forEach((L, i) => tl.to(L.contenu, { yPercent: -118, duration: 0.26, ease: "power3.in" }, t + i * 0.04));
  } else if (style === "balayage") {
    lignes.forEach((L, i) => {
      const d = t + i * 0.06;
      tl.set(L.barre, { transformOrigin: "0% 50%" }, d - 0.001);
      tl.to(L.barre, { scaleX: 1, duration: 0.18, ease: "power3.in" }, d);
      tl.set(L.contenu, { clipPath: "inset(0% 0% 0% 100%)" }, d + 0.18);
      tl.set(L.barre, { transformOrigin: "100% 50%" }, d + 0.18);
      tl.to(L.barre, { scaleX: 0, duration: 0.2, ease: "power3.out" }, d + 0.19);
    });
  } else if (style === "eclat") {
    const r = alea(lettres.length * 13);
    tl.to(
      lettres,
      {
        x: () => (r() - 0.5) * T.px * 3,
        y: () => (r() - 0.5) * T.px * 2.4,
        rotation: () => (r() - 0.5) * 140,
        scale: () => 0.4 + r(),
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        stagger: { each: 0.008, from: "center" },
      },
      t,
    );
  }
  tl.set(el, { opacity: 0 }, t + 0.55);
}

export function rature(tl, T, t, ligne = 0) {
  tl.fromTo(T.lignes[ligne].rature, { scaleX: 0 }, { scaleX: 1, duration: 0.22, ease: "power4.out" }, t);
}

/** Pulsation sur les temps : le titre « s'écrase » en rythme pendant qu'il tient. */
export function pulser(tl, T, debut, fin, pas = 0.5) {
  for (let b = debut; b < fin - 0.2; b += pas) {
    tl.to(T.el, { scale: 1.035, duration: 0.05, ease: "power2.out" }, b);
    tl.to(T.el, { scale: 1, duration: 0.3, ease: "power3.out" }, b + 0.05);
  }
}

/** Dérive lente pendant la tenue : un titre n'est jamais immobile. */
export function deriver(tl, T, debut, fin, dx = 0.02) {
  tl.fromTo(T.el, { xPercent: -dx * 50 }, { xPercent: dx * 50, duration: Math.max(0.1, fin - debut), ease: "none" }, debut);
}

/* ── Sous-titres ─────────────────────────────────────────────────────── */

export function sousTitres(parent, tl, segments, { bas, px, largeurMax }) {
  segments.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "st";
    el.style.bottom = `${bas}px`;
    el.style.maxWidth = `${largeurMax}px`;
    const plaque = document.createElement("div");
    plaque.className = "plaque";
    const txt = document.createElement("span");
    txt.className = "txt";
    txt.style.fontSize = `${px}px`;
    txt.textContent = s.texte;
    plaque.appendChild(txt);
    el.appendChild(plaque);
    parent.appendChild(el);
    const suivant = segments[i + 1];
    const fin = suivant && suivant.debut - s.fin < 0.35 ? suivant.debut : s.fin + 0.25;
    tl.set(el, { opacity: 1 }, s.debut - 0.06);
    tl.fromTo(txt, { yPercent: 110 }, { yPercent: 0, duration: 0.16, ease: "power3.out" }, s.debut - 0.06);
    tl.fromTo(plaque, { scaleX: 0.92 }, { scaleX: 1, duration: 0.16, ease: "power3.out" }, s.debut - 0.06);
    tl.to(txt, { yPercent: -110, duration: 0.1, ease: "power2.in" }, fin - 0.1);
    tl.set(el, { opacity: 0 }, fin);
  });
}
