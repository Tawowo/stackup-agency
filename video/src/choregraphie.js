/**
 * LA CHORÉGRAPHIE — tous les instants du film, déduits de la voix.
 *
 * Une seule fonction, lue à la fois par le navigateur (le film) et par Node
 * (le design sonore, via scripts/build.mjs). Aucun instant n'est écrit en dur
 * ailleurs : chaque événement est calé sur le début ou la fin réelle d'une
 * phrase, ou sur une coupe de plan, telles que scripts/voix.py les a mesurées.
 *
 * Les coupes tombent sur la grille de 120 BPM (un temps = 0,5 s) ; les
 * événements internes se posent sur le demi-temps quand c'est possible.
 */

export const TEMPS = 0.5;

const q = (t, pas = 0.25) => Math.round(t / pas) * pas;

export function choregraphie(montage) {
  const P = {};
  for (const p of montage.plans) P[p.plan] = { debut: p.debut, fin: p.fin };
  const C = montage.calage;
  const ph = (id) => C[id] || null;
  const total = montage.duree;
  const k = {}; // instants clés, par plan
  const sons = [];
  const son = (t, type, extra = {}) => sons.push({ t: +t.toFixed(3), type, ...extra });

  /* ── PLAN 1 : l'accroche ─────────────────────────────────────────────── */
  {
    const d = P[1].debut, f = P[1].fin;
    k[1] = {
      debut: d, fin: f,
      apparition: d + 0.1,
      impact: d + 1.0,
      titre: d + 1.0,
      sortie: f - 0.45,
    };
    son(k[1].apparition, "souffle");
    son(k[1].impact, "impact");
    son(k[1].impact, "verre");
    son(k[1].sortie, "whoosh");
  }

  /* ── PLAN 2 : le problème ────────────────────────────────────────────── */
  if (P[2]) {
    const d = P[2].debut, f = P[2].fin;
    const a = ph("p2a"), b = ph("p2b"), c = ph("p2c");
    k[2] = {
      debut: d, fin: f,
      sceneA: d,
      motA: a.debut,
      ratureA: q(a.debut + 0.75),
      sceneB: b.debut - 0.25,
      motB: b.debut,
      ratureB: q(b.debut + 0.75),
      croix: b.debut + 0.55,
      sceneC: c.debut - 0.25,
      motC: c.debut,
      ratureC: q(c.debut + 0.9),
      aspiration: f - 0.6,
    };
    son(k[2].motA, "clac");
    son(k[2].ratureA, "rature");
    son(k[2].sceneB, "whoosh");
    son(k[2].motB, "clac");
    son(k[2].croix, "clic");
    son(k[2].ratureB, "rature");
    son(k[2].sceneC, "whoosh");
    son(k[2].motC, "clac");
    son(k[2].ratureC, "rature");
    son(k[2].aspiration, "aspiration", { duree: 0.6 });
  }

  /* ── PLAN 3 : la révélation ──────────────────────────────────────────── */
  {
    const d = P[3].debut, f = P[3].fin;
    const a = ph("p3a"), b = ph("p3b");
    const court = f - d < 5;
    const pas = court ? 0.25 : 0.5;
    const assemblage = d + (court ? 0.75 : 1.5);
    const logo = b ? q(b.debut + 0.25) : f - 1.25;
    k[3] = {
      debut: d, fin: f, court,
      plaque1: assemblage - 2 * pas,
      plaque2: assemblage - pas,
      plaque3: assemblage,
      assemblage,
      couchesDebut: assemblage + 0.25,
      couchesFin: Math.min(logo - 0.5, assemblage + (court ? 1.75 : 2.5)),
      titre: q(Math.min(a.fin - 1.0, logo - 1.5)),
      logo,
      logoFin: f - 0.2,
    };
    son(d, "montee", { duree: assemblage - d });
    son(k[3].plaque1, "clac");
    son(k[3].plaque2, "clac");
    son(k[3].assemblage, "impact");
    const n = 12;
    for (let i = 0; i < n; i++) son(k[3].couchesDebut + ((k[3].couchesFin - k[3].couchesDebut) * i) / n, "tick", { gain: 0.5 });
    son(k[3].titre, "clac");
    son(k[3].logo, "souffle");
  }

  /* ── PLAN 4 : ce qu'on fabrique ──────────────────────────────────────── */
  {
    const d = P[4].debut, f = P[4].fin;
    const a = ph("p4a"), b = ph("p4b"), c = ph("p4c"), e = ph("p4d");
    k[4] = {
      debut: d, fin: f,
      site: d,
      motSite: a.debut,
      boutique: b.debut - 0.25,
      motBoutique: b.debut,
      outil: c.debut - 0.25,
      motOutil: c.debut,
      tableau: e ? e.debut - 0.25 : null,
      motTableau: e ? e.debut : null,
    };
    son(d, "whoosh");
    son(k[4].boutique, "pliage");
    // le panier se remplit d'un « tic » par article
    for (let i = 0; i < 3; i++) son(k[4].boutique + 0.45 + i * 0.25, "tic");
    son(k[4].outil, "pliage");
    for (let i = 0; i < 8; i++) son(k[4].outil + 0.5 + i * 0.125, "tick", { gain: 0.45 });
    if (e) son(k[4].tableau, "whoosh");
  }

  /* ── PLAN 5 : la preuve et la différence ─────────────────────────────── */
  if (P[5]) {
    const d = P[5].debut, f = P[5].fin;
    const a = ph("p5a"), b = ph("p5b"), c = ph("p5c");
    k[5] = {
      debut: d, fin: f,
      eclate: d + 0.25,
      recompression: d + 1.25,
      demo: d + 1.5,
      cle: b.debut - 0.25,
      ia: c.debut - 0.25,
      bulle: q(c.debut + (c.fin - c.debut) * 0.55),
    };
    son(k[5].eclate, "whoosh");
    son(k[5].recompression, "pliage");
    son(k[5].demo, "impact", { gain: 0.6 });
    son(k[5].cle, "impact", { gain: 0.6 });
    son(k[5].ia, "clac");
    son(k[5].bulle, "ding");
  }

  /* ── PLAN 6 : l'estimateur ───────────────────────────────────────────── */
  if (P[6]) {
    const d = P[6].debut, f = P[6].fin;
    const b = ph("p6b");
    k[6] = {
      debut: d, fin: f,
      carte: d,
      toucher: d + 1.0,
      assemblage: d + 1.25,
      curseur: d + 2.0,
      cadran: d + 2.75,
      fige: Math.min(f - 1.0, d + 3.75),
      titre: b.debut,
    };
    son(k[6].toucher, "clic");
    son(k[6].assemblage, "pliage");
    for (let i = 0; i < 6; i++) son(k[6].curseur + i * 0.125, "tick", { gain: 0.4 });
    const nCadran = Math.round((k[6].fige - k[6].cadran) / 0.0625);
    for (let i = 0; i < nCadran; i++) son(k[6].cadran + i * 0.0625, "tick", { gain: 0.35 });
    son(k[6].fige, "ding");
  }

  /* ── PLAN 7 : l'appel à l'action ─────────────────────────────────────── */
  {
    const d = P[7].debut, f = P[7].fin;
    const c = ph("p7c");
    const fixe = total - 1.5;
    // l'URL s'écrit au moment où la voix la prononce (≈ 20 % → 60 % de la phrase)
    const url = c.debut + (c.fin - c.debut) * 0.18;
    const urlFin = c.debut + (c.fin - c.debut) * 0.55;
    k[7] = {
      debut: d, fin: f,
      convergence: d,
      pose: d + (f - d > 7 ? 1.5 : 1.0),
      url,
      urlFin,
      appel: Math.min(fixe - 1.0, c.debut + (c.fin - c.debut) * 0.68),
      montee: fixe - 1.5,
      fixe,
    };
    son(d, "aspiration", { duree: k[7].pose - d });
    son(k[7].pose, "impact");
    const lettres = 17;
    for (let i = 0; i < lettres; i++) son(url + ((urlFin - url) * i) / lettres, "tic", { gain: 0.35 });
    son(k[7].appel, "clac");
    son(k[7].montee, "montee", { duree: 1.5 });
    son(fixe, "impactFinal");
  }

  return { total, plans: P, calage: C, k, sons };
}
