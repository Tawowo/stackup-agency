#!/usr/bin/env node
/**
 * Génère les compositions HyperFrames (une par format) et la liste des sons,
 * à partir de script.json (timings réels de la voix) et config.json.
 *
 *   node scripts/build.mjs                      → toutes les entrées
 *   node scripts/build.mjs --apercu 16x9 --plan 4 [--echelle 0.5]
 *        → apercu.html : un seul plan, en basse définition, pour le contrôle
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, symlinkSync, rmSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { choregraphie } from "../src/choregraphie.js";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const lire = (f) => JSON.parse(readFileSync(join(RACINE, f), "utf8"));
const script = lire("script.json");
const config = lire("config.json");

export const FORMATS = {
  "16x9": { largeur: 1920, hauteur: 1080 },
  "9x16": { largeur: 1080, hauteur: 1920 },
  "1x1": { largeur: 1080, hauteur: 1080 },
};

/* Une seule composition racine par projet (règle HyperFrames) : le 16:9 est
   video/index.html ; chaque autre format est un petit projet frère dans
   video/formats/<nom>/, qui partage src/, audio/, fonts/… par liens. */
const SORTIES = [
  { dossier: ".", format: "16x9", montage: "complet" },
  { dossier: "formats/vertical", format: "9x16", montage: "complet" },
  { dossier: "formats/carre", format: "1x1", montage: "complet" },
  { dossier: "formats/vertical-20s", format: "9x16", montage: "court20" },
];
const PARTAGES = ["src", "audio", "fonts", "vendor", "assets"];

function projetFrere(dossier) {
  const d = join(RACINE, dossier);
  mkdirSync(d, { recursive: true });
  for (const p of PARTAGES) {
    const lien = join(d, p);
    if (!existsSync(lien)) symlinkSync(join("..", "..", p), lien);
  }
  for (const f of ["hyperframes.json"]) copyFileSync(join(RACINE, f), join(d, f));
  writeFileSync(join(d, "meta.json"), JSON.stringify({ id: dossier.split("/").pop(), name: dossier.split("/").pop() }, null, 2));
  return d;
}

const arg = (nom) => {
  const i = process.argv.indexOf(`--${nom}`);
  return i > 0 ? process.argv[i + 1] : null;
};

// Volumes du brief : musique −18 dB sous la voix, sons −10 dB.
const DB = (db) => +Math.pow(10, db / 20).toFixed(4);
const VOL_MUSIQUE = DB(-18);
const VOL_SONS = DB(-10);

const attr = (obj) => JSON.stringify(obj).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function entree({ format, montage, decalage = 0, duree = null, echelle = 1, id }) {
  const f = FORMATS[format];
  const L = Math.round(f.largeur * echelle);
  const H = Math.round(f.hauteur * echelle);
  const m = script.montages[montage];
  const D = duree ?? m.duree;
  const fixe = m.duree - 1.5;
  // La musique s'éteint sur le logo final.
  const automation = {
    version: 1,
    lanes: [
      {
        target: "volume",
        points: [
          { t: 0, v: 1 },
          { t: Math.max(0, fixe - decalage - 0.05), v: 1 },
          { t: Math.max(0.01, fixe - decalage + 1.1), v: 0, curve: -0.4 },
        ],
      },
    ],
  };
  const film = {
    format,
    montage,
    largeur: L,
    hauteur: H,
    decalage,
    echelle,
  };
  return `<!doctype html>
<!-- Généré par scripts/build.mjs — ne pas éditer à la main. -->
<html lang="fr" data-composition-variables="${attr([
    { id: "sousTitres", type: "boolean", label: "Sous-titres incrustés", default: false },
  ])}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${L}, height=${H}" />
    <title>Stackup Agency — ${format} ${montage}</title>
    <style>
      @font-face { font-family: "Poppins"; font-weight: 700; src: url("fonts/poppins-latin-700-normal.woff2") format("woff2"); }
      @font-face { font-family: "Poppins"; font-weight: 800; src: url("fonts/poppins-latin-800-normal.woff2") format("woff2"); }
      @font-face { font-family: "Poppins"; font-weight: 600; src: url("fonts/poppins-latin-600-normal.woff2") format("woff2"); }
      @font-face { font-family: "Inter"; font-weight: 400; src: url("fonts/inter-latin-400-normal.woff2") format("woff2"); }
      @font-face { font-family: "Inter"; font-weight: 600; src: url("fonts/inter-latin-600-normal.woff2") format("woff2"); }
      @font-face { font-family: "Inter"; font-weight: 700; src: url("fonts/inter-latin-700-normal.woff2") format("woff2"); }
      @font-face { font-family: "JetBrains Mono"; font-weight: 500; src: url("fonts/jetbrains-mono-latin-500-normal.woff2") format("woff2"); }
      @font-face { font-family: "JetBrains Mono"; font-weight: 700; src: url("fonts/jetbrains-mono-latin-700-normal.woff2") format("woff2"); }
      html, body { margin: 0; width: ${L}px; height: ${H}px; overflow: hidden; background: #0b1e36; }
    </style>
    <link rel="stylesheet" href="src/film.css" />
    <script src="vendor/gsap.min.js"></script>
    <script type="importmap">{ "imports": { "three": "./vendor/three.module.min.js" } }</script>
    <script>window.FILM = ${JSON.stringify(film)};</script>
  </head>
  <body>
    <div id="root" data-composition-id="${id}" data-start="0" data-width="${L}" data-height="${H}" data-duration="${D}" data-fps="60" style="--u:${(H / 1080).toFixed(5)}px; --uw:${(L / 1920).toFixed(5)}px;">
      <div id="ciel"></div>
      <div id="code"></div>
      <canvas id="scene" width="${L}" height="${H}"></canvas>
      <div id="calque"></div>
      <div id="typo"></div>
      <div id="soustitres"></div>
      <div id="voile"></div>
      <audio id="voix" src="audio/voix-${montage}.wav" data-start="0" data-media-start="${decalage}" data-duration="${D}" data-track-index="10" data-volume="1"></audio>
      <audio id="musique" src="audio/musique.mp3" data-start="0" data-media-start="${decalage}" data-duration="${D}" data-track-index="11" data-volume="${VOL_MUSIQUE}" data-automation="${attr(automation)}"></audio>
      <audio id="sons" src="audio/sons-${montage}.wav" data-start="0" data-media-start="${decalage}" data-duration="${D}" data-track-index="12" data-volume="${VOL_SONS}"></audio>
    </div>
    <script type="module">
      import { timelinePrete } from "./src/film.js";
      timelinePrete.then(({ tl }) => {
        window.__timelines["${id}"] = tl;
      });
    </script>
  </body>
</html>
`;
}

// Données partagées par le film (lecture synchrone côté navigateur).
writeFileSync(
  join(RACINE, "src/donnees.js"),
  `// Généré par scripts/build.mjs — ne pas éditer à la main.\nexport const SCRIPT = ${JSON.stringify(script)};\nexport const CONFIG = ${JSON.stringify(config)};\n`,
);

// Liste des sons de chaque montage, pour scripts/son.py.
mkdirSync(join(RACINE, "audio"), { recursive: true });
for (const nom of Object.keys(script.montages)) {
  const ch = choregraphie(script.montages[nom]);
  writeFileSync(join(RACINE, `audio/cues-${nom}.json`), JSON.stringify({ total: ch.total, plans: ch.plans, sons: ch.sons }, null, 1));
}

const apercu = arg("apercu");
if (apercu) {
  const plan = Number(arg("plan") || 1);
  const montage = arg("montage") || "complet";
  const echelle = Number(arg("echelle") || 0.5);
  const m = script.montages[montage];
  const p = m.plans.find((x) => x.plan === plan);
  const debut = arg("debut") ? Number(arg("debut")) : p.debut;
  const fin = arg("fin") ? Number(arg("fin")) : p.fin;
  const d = projetFrere("formats/apercu");
  writeFileSync(join(d, "index.html"), entree({ format: apercu, montage, decalage: debut, duree: +(fin - debut).toFixed(3), echelle, id: "apercu" }));
  console.log(`formats/apercu : ${apercu} ${montage} plan ${plan} [${debut}–${fin}] ×${echelle}`);
} else {
  for (const s of SORTIES) {
    const id = `stackup-${s.format}${s.montage === "complet" ? "" : "-" + s.montage}`;
    const d = s.dossier === "." ? RACINE : projetFrere(s.dossier);
    writeFileSync(join(d, "index.html"), entree({ ...s, id }));
    console.log(`${s.dossier}/index.html : ${s.format} ${s.montage} ${script.montages[s.montage].duree} s`);
  }
}
