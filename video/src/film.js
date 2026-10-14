/**
 * LE FILM — démarrage.
 *
 * Charge polices et images, construit le monde et les plans, puis :
 *  - la 3D est rendue à chaque `hf-seek` (temps HyperFrames → image exacte) ;
 *  - le DOM (titres, sous-titres, logo, URL) est animé par UNE timeline GSAP
 *    en pause, enregistrée sur window.__timelines une fois construite.
 */
import * as THREE from "three";
import { SCRIPT, CONFIG } from "./donnees.js";
import { choregraphie } from "./choregraphie.js";
import { creerMonde, rendre } from "./monde.js";
import { construire } from "./plans.js";
import { sousTitres } from "./typo.js";
import { alea } from "./outils.js";

const FILM = window.FILM;
const racine = document.getElementById("root");
const ID = racine.dataset.compositionId;

// Le moteur attend que la scène soit réellement dessinable (polices, images,
// textures, compilation) avant de publier « prêt ».
window.__hf = window.__hf || {};
window.__hf.buildReady = window.__hf.buildReady || {};
let pret;
window.__hf.buildReady["stackup-film"] = new Promise((r) => (pret = r));
// La timeline est enregistrée par le script en ligne de chaque composition,
// une fois construite (voir scripts/build.mjs).
let livrer;
export const timelinePrete = new Promise((r) => (livrer = r));

function charger(src) {
  return new Promise((ok, ko) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = ko;
    i.src = src;
  });
}

/* Le code vivant de l'arrière-plan : du vrai code de site, qui défile. */
function codeVivant(el, tl, duree) {
  const r = alea(1962);
  const lignes = [
    '<section class="hero">', '  <h1>Boulangerie <b>artisanale</b></h1>', "</section>", ".carte { border-radius: 14px; }",
    "const panier = useCart();", "export async function getProduits() {", '  return fetch("/api/produits")', "}", "<b>@media</b> (max-width: 640px) {",
    "  .grille { grid-template-columns: 1fr; }", "}", '<meta name="description" content="…">', '<link rel="canonical" href="/">',
    "function estimer(projet) {", "  return <b>tarifs</b>[projet.base];", "}", '{ "@type": "LocalBusiness" }', "deploy --prod ✓",
    "transition: transform 620ms <b>var(--su-pose)</b>;", "<nav aria-label=\"Principale\">", "planning.ajouter(rdv);", "devis.envoyer();",
  ];
  for (let c = 0; c < 3; c++) {
    const col = document.createElement("div");
    col.className = "col";
    col.style.left = `${c * 34}%`;
    let html = "";
    for (let i = 0; i < 70; i++) html += lignes[Math.floor(r() * lignes.length)].replace(/</g, "&lt;").replace(/&lt;b>/g, "<b>").replace(/&lt;\/b>/g, "</b>") + "\n";
    col.innerHTML = html;
    el.appendChild(col);
    tl.fromTo(col, { yPercent: -10 * c }, { yPercent: -10 * c - 22 - c * 4, duration: duree, ease: "none" }, 0);
  }
}

async function demarrer() {
  await Promise.all([
    document.fonts.load("700 100px Poppins"),
    document.fonts.load("800 100px Poppins"),
    document.fonts.load("600 100px Poppins"),
    document.fonts.load("400 40px Inter"),
    document.fonts.load("600 40px Inter"),
    document.fonts.load("700 40px Inter"),
    document.fonts.load('500 40px "JetBrains Mono"'),
    document.fonts.load('700 40px "JetBrains Mono"'),
  ]);
  const imgs = { pain: await charger("assets/au-pain-dore.webp") };

  const montage = SCRIPT.montages[FILM.montage];
  const ch = choregraphie(montage);
  const L = FILM.largeur, H = FILM.hauteur;
  const F = { L, H, aspect: L / H, portrait: H / L > 1.2, carre: Math.abs(L / H - 1) < 0.05 };

  const tl = gsap.timeline({ paused: true });
  const dom = {
    typo: document.getElementById("typo"),
    calque: document.getElementById("calque"),
    soustitres: document.getElementById("soustitres"),
    voile: document.getElementById("voile"),
  };
  const noir = document.createElement("div");
  noir.className = "noir";
  const flash = document.createElement("div");
  flash.className = "flash";
  dom.voile.append(noir, flash);
  dom.flash = flash;

  const fixe = ch.k[7].fixe - 0.12;
  codeVivant(document.getElementById("code"), tl, fixe);

  // Le noir : avant l'apparition du site daté, et entre l'aspiration et la révélation.
  tl.set(noir, { opacity: 1 }, 0);
  tl.set(noir, { opacity: 0 }, ch.k[1].apparition);
  if (ch.k[2]) {
    tl.to(noir, { opacity: 1, duration: 0.15, ease: "power2.in" }, ch.k[2].fin - 0.15);
    tl.to(noir, { opacity: 0, duration: 0.6, ease: "power2.out" }, ch.k[3].debut + 0.3);
  }

  const monde = creerMonde(document.getElementById("scene"), L, H);
  const film = construire({ monde, F, ch, config: CONFIG, imgs, tl, dom });

  // Sous-titres incrustés (variable de composition `sousTitres`).
  const vars = window.__hyperframes?.getVariables?.() ?? {};
  if (vars.sousTitres) {
    const u = Math.min(L, H) / 1080;
    sousTitres(dom.soustitres, tl, montage.sousTitres, F.portrait
      ? { bas: 0.17 * H, px: 58 * u, largeurMax: 0.9 * L }
      : F.carre
        ? { bas: 0.045 * H, px: 42 * u, largeurMax: 0.86 * L }
        : { bas: 0.05 * H, px: 42 * u, largeurMax: 0.72 * L });
  }

  const decalage = FILM.decalage || 0;
  const rendreA = (temps) => {
    const t = temps + decalage;
    rendre(monde, t, film.poser, film.obturation(t));
  };
  window.addEventListener("hf-seek", (e) => rendreA(e.detail.time));
  // compilation des programmes et premier dessin
  monde.renderer.compile(monde.scene, monde.camera);
  rendreA(window.__hfThreeTime || 0);

  let maitre = tl;
  if (decalage) {
    maitre = gsap.timeline({ paused: true });
    maitre.add(tl.tweenFromTo(decalage, decalage + Number(racine.dataset.duration), { ease: "none" }), 0);
  }
  window.__film = { ch, F, monde, film, rendreA, THREE, ID };
  livrer({ tl: maitre }); // emballée : une timeline GSAP est « thenable »
  pret();
}

demarrer().catch((e) => {
  console.error("Échec du démarrage du film :", e);
  pret();
});
