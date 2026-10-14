/**
 * LES SEPT PLANS.
 *
 * Chaque plan pose ses objets 3D en fonction du temps (fonction pure de t),
 * décrit sa caméra par ce qu'elle doit cadrer (cible, angle, boîte : voir
 * monde.js › cadrer), et inscrit ses titres sur la timeline GSAP.
 *
 * Tous les instants viennent de la chorégraphie (src/choregraphie.js), donc
 * de la voix réelle. Les positions dépendent du format : en 9:16, les objets
 * s'empilent et la caméra monte ou plonge le long de la pile.
 */
import * as THREE from "three";
import { clamp, lerp, prog, seg, E, piste, alea, derive } from "./outils.js";
import { cadrer, majBokeh, SOL_Y, C3 } from "./monde.js";
import { creerRuban, Mur, creerRideau, poserRideau, MAT, LARGEUR_RUBAN, HAUTEUR_RUBAN } from "./plaques.js";
import * as EC from "./ecrans.js";
import { creerTitre, entree, sortie, rature, ajuster, pulser } from "./typo.js";

export function construire(X) {
  const { monde, F, ch, config, imgs, tl, dom } = X;
  const { scene, camera } = monde;
  const K = ch.k;
  const P = F.portrait;
  const SQ = F.carre;
  const L = F.L, H = F.H;
  const u = H / 1080; // unité typographique

  // ── Tailles d'écran selon le format ────────────────────────────────────
  const SP = P ? { w: 2.4, h: 4.0, cw: 960, ch: 1600, cols: 10, rows: 16 } : { w: 4.0, h: 2.5, cw: 1600, ch: 1000, cols: 16, rows: 10 };
  const ecran = (dessin, portrait = P) => new EC.Ecran(THREE, portrait ? 960 : 1600, portrait ? 1600 : 1000, dessin);
  const objets = []; // groupes racines, masqués par défaut à chaque image
  const ajouter = (g) => {
    scene.add(g);
    objets.push(g);
    return g;
  };

  scene.add(camera);
  const rideau = creerRideau(camera);

  // ── Étiquettes DOM accrochées à des points 3D ──────────────────────────
  const etiquettes = [];
  const vec = new THREE.Vector3();
  function etiquette(texte, claire = false) {
    const el = document.createElement("div");
    el.className = "etiquette" + (claire ? " claire" : "");
    el.textContent = texte;
    dom.calque.appendChild(el);
    const e = { el, a: 0 };
    etiquettes.push(e);
    return e;
  }
  function placer(e, obj, local, a) {
    e.a = a;
    if (a <= 0) return;
    obj.updateWorldMatrix(true, false);
    vec.set(...local);
    obj.localToWorld(vec);
    vec.project(camera);
    const x = (vec.x * 0.5 + 0.5) * L, y = (-vec.y * 0.5 + 0.5) * H;
    e.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
    e.el.style.clipPath = `inset(0% ${((1 - a) * 100).toFixed(1)}% 0% 0%)`;
  }

  // ── Zones de texte selon le format ─────────────────────────────────────
  const Z = {
    bas: P ? { x: 0.5 * L, y: 0.07 * H, w: 0.9 * L, h: 0.2 * H, ancre: "centre" } : { x: 0.5 * L, y: 0.655 * H, w: 0.92 * L, h: 0.21 * H, ancre: "centre" },
    cote: P ? { x: 0.5 * L, y: 0.06 * H, w: 0.9 * L, h: 0.22 * H, ancre: "centre" } : SQ ? { x: 0.5 * L, y: 0.05 * H, w: 0.9 * L, h: 0.25 * H, ancre: "centre" } : { x: 0.05 * L, y: 0.18 * H, w: 0.37 * L, h: 0.64 * H, ancre: "gauche" },
    centre: P ? { x: 0.5 * L, y: 0.1 * H, w: 0.92 * L, h: 0.36 * H, ancre: "centre" } : { x: 0.5 * L, y: 0.2 * H, w: 0.92 * L, h: 0.56 * H, ancre: "centre" },
  };
  function titre(id, lignesParFormat, zone, style) {
    const lignes = typeof lignesParFormat === "function" ? lignesParFormat() : lignesParFormat;
    const z = Z[zone];
    const px = ajuster(lignes.map((l) => l.replace(/\*/g, "")), z.w, z.h);
    const h = lignes.length * px * 0.98;
    const y = z.ancre === "gauche" ? z.y + (z.h - h) / 2 : z.y + (zone === "bas" && !P ? (z.h - h) / 2 : 0);
    const T = creerTitre(dom.typo, { id, lignes, px, x: z.x, y, ancre: z.ancre, style });
    T.el.style.opacity = 0;
    return T;
  }
  const lignes = (paysage, portrait, carre = portrait) => (P ? portrait : SQ ? carre : paysage);

  // ── Les écrans ─────────────────────────────────────────────────────────
  const imgPain = imgs.pain;
  const ecGris = ecran(EC.siteGris());
  const ecRecherche = ecran(EC.recherche());
  const ecVide = ecran(EC.tableauVide());
  const ecVisiteur = ecran(
    EC.siteGris({
      croix: true,
      curseur: (t) => {
        if (!K[2]) return null;
        const a = E.inout3(prog(t, K[2].sceneB + 0.1, K[2].croix));
        return t > K[2].croix + 0.1 ? null : { x: lerp(0.45, P ? 0.948 : 0.968, a), y: lerp(0.62, P ? 0.022 : 0.036, a) };
      },
      minuteur: (t) => {
        if (!K[2]) return null;
        const s = clamp(prog(t, K[2].sceneB, K[2].croix) * 2, 0, 2);
        return `00:0${Math.floor(s)}`;
      },
    }),
  );
  const ecSite = ecran(EC.siteArtisan(imgPain, (t) => 0.82 * E.inout2(prog(t, K[4].site + 0.6, K[4].boutique - 0.05))));
  const ajouts = [0.45, 0.7, 0.95].map((d) => K[4].boutique + d);
  const ecBoutique = ecran(EC.boutique(imgPain, ajouts));
  const ecOutil = ecran(EC.outil(K[4].outil));
  const ecLaptop = ecran(EC.siteArtisan(imgPain, (t) => 0.25 + 0.2 * E.inout2(prog(t, K[4].tableau ?? 0, (K[4].tableau ?? 0) + 2.5))), false);
  const ecTel = ecran(EC.boutique(imgPain, []), true);
  const ecCouches = [0, 1, 2, 3, 4].map((i) => ecran(EC.couche(i)));
  const ecDemo = ecran(EC.siteArtisan(imgPain, () => 0));
  const ecIA = K[5] ? ecran(EC.rechercheIA(K[5])) : null;
  const ecEstim = K[6] ? ecran(EC.estimateur(K[6], config)) : null;
  [ecGris, ecRecherche, ecVide, ecDemo, ...ecCouches].forEach((e) => e.maj(0, true));

  /* Assemblage d'un mur : chaque tuile arrive de loin et se pose, du centre
     vers les bords. */
  function assembler(mur, t, t0, dur, { etal = 0.35, rayon = 5, depuis = [0, 0, 4], courbe = E.pose } = {}) {
    for (const m of mur.tuiles) {
      const v = m.userData;
      const a = courbe(clamp((t - t0 - v.d * etal) / dur));
      m.visible = t >= t0;
      const sx = (v.r1 - 0.5) * 2 * rayon + depuis[0];
      const sy = (v.r2 - 0.5) * 1.4 * rayon + depuis[1];
      const sz = depuis[2] + v.r3 * rayon;
      m.position.set(lerp(v.cx + sx, v.cx, a), lerp(v.cy + sy, v.cy, a), lerp(sz, 0, a));
      m.rotation.set((1 - a) * (v.r4 - 0.5) * 7, (1 - a) * (v.r1 - 0.5) * 7, (1 - a) * (v.r2 - 0.5) * 4);
      m.scale.set(1, 1, 1);
    }
  }
  /** Aspiration d'un mur vers un point (repère local du mur). */
  function aspirer(mur, t, t0, dur, cible) {
    for (const m of mur.tuiles) {
      const v = m.userData;
      const a = E.in3(clamp((t - t0 - (1 - v.d) * dur * 0.4) / (dur * 0.6)));
      m.position.set(lerp(v.cx, cible[0], a), lerp(v.cy, cible[1], a), lerp(0, cible[2], a));
      m.rotation.set(a * (v.r1 - 0.5) * 6, a * (v.r2 - 0.5) * 6, a * 3);
      m.scale.setScalar(Math.max(0.001, 1 - a));
    }
  }
  /** Repli : les tuiles se replient vers le centre en une seule plaque. */
  function replier(mur, t, t0, dur) {
    for (const m of mur.tuiles) {
      const v = m.userData;
      const a = E.inout3(clamp((t - t0 - v.d * dur * 0.3) / (dur * 0.7)));
      m.position.set(lerp(v.cx, 0, a), lerp(v.cy, 0, a), a * 0.3 * (v.r1 - 0.5));
      m.rotation.set(0, 0, a * (v.r2 - 0.5) * 2);
      m.scale.setScalar(lerp(1, 0.25, a));
    }
  }

  /* ════════════════════════════ PLAN 1 ═══════════════════════════════ */
  const murGris = new Mur({ largeur: SP.w, hauteur: SP.h, cols: P ? 15 : 24, rows: P ? 24 : 15, epaisseur: 0.035, ecart: 0.0008, graine: 11 });
  murGris.textures(ecGris.tex, null);
  ajouter(murGris.groupe);
  const T1 = titre("t1", lignes(["IL VOUS RAPPORTE", "*QUOI ?*"], ["IL VOUS", "RAPPORTE", "*QUOI ?*"]), "centre", "morceaux");
  entree(tl, T1, K[1].titre);
  sortie(tl, T1, K[1].fin - 0.42, "chute");

  function poser1(t) {
    const k = K[1];
    const g = murGris.groupe;
    g.visible = t < k.fin + 0.4;
    if (!g.visible) return;
    g.position.set(0, 0, 0);
    const imp = k.impact;
    for (const m of murGris.tuiles) {
      const v = m.userData;
      if (t < imp) {
        const ordre = 1 - (v.j + 0.5) / murGris.rows;
        const a = clamp((t - k.apparition - ordre * 0.16) / 0.07);
        const tr = seg(t, imp - 0.2, imp, E.in2);
        m.visible = a > 0;
        m.position.set(v.cx + Math.sin(t * 90 + v.r1 * 40) * 0.012 * tr, v.cy + Math.cos(t * 83 + v.r2 * 40) * 0.012 * tr, (1 - E.out3(a)) * -0.5);
        m.rotation.set(0, 0, 0);
        const sc = (0.3 + 0.7 * E.out3(a)) * (1 - 0.04 * tr);
        m.scale.set(sc, sc, 1);
      } else {
        const tau = t - imp;
        const f = 0.55 * (1 - Math.exp(-tau * 4.5)) + 0.32 * tau; // l'éclatement, au ralenti
        const dx = v.cx / (SP.w / 2), dy = v.cy / (SP.h / 2);
        const vx = dx * 1.4 + (v.r1 - 0.5) * 1.5, vy = dy * 1.4 + (v.r2 - 0.5) * 1.5, vz = 0.2 + v.r3 * 1.5 + (1 - v.d) * 0.9;
        m.visible = true;
        m.position.set(v.cx + vx * f, v.cy + vy * f, vz * f);
        m.rotation.set((v.r1 - 0.5) * 6.5 * f, (v.r2 - 0.5) * 6.5 * f, (v.r4 - 0.5) * 3.5 * f);
        m.scale.set(1, 1, 1);
      }
    }
    const Lm = seg(t, imp, imp + 0.25, E.out3);
    const h = monde.halo.principal;
    h.position.set(0, 0, -2.5);
    h.scale.setScalar(1 + 7 * Lm);
    h.material.opacity = Lm * (0.5 + 0.06 * Math.sin(t * 23));
    monde.source.position.set(0, 0, -0.5);
    monde.source.intensity = 30 * Lm;
  }
  function camera1(t) {
    const k = K[1];
    const imp = k.impact;
    if (t < imp) return { cible: [0, 0, 0], boite: [SP.w, SP.h], marge: lerp(0.99, 0.94, prog(t, 0, imp)), remplir: true, lacet: derive(t, 1) * 0.015, tangage: derive(t, 2) * 0.01 };
    const s = E.in2(prog(t, imp, k.fin + 0.2));
    return { cible: [0, 0, 0], boite: [SP.w, SP.h], marge: lerp(0.94, 0.5, s), remplir: true, lacet: 0.14 * s + derive(t, 1) * 0.015, tangage: -0.05 * s, roulis: 0.09 * s };
  }

  /* ════════════════════════════ PLAN 2 ═══════════════════════════════ */
  const k2 = K[2];
  const pos2 = P ? [[0, 5.6, 0], [0, 0, 0], [0, -5.6, 0]] : [[-7.2, 0.3, 0], [0, 0.3, 0], [7.2, 0.3, 0]];
  const e2 = 0.86;
  const mk2 = (ec, graine) => {
    const m = new Mur({ largeur: SP.w * e2, hauteur: SP.h * e2, cols: P ? 8 : 12, rows: P ? 12 : 8, epaisseur: 0.045, graine });
    m.textures(ec.tex, null);
    ajouter(m.groupe);
    return m;
  };
  const murA = mk2(ecRecherche, 21), murB = mk2(ecVisiteur, 22), murC = mk2(ecVide, 23);
  const page3 = new Mur({ largeur: SP.w * 0.3, hauteur: SP.h * 0.3, cols: 1, rows: 1, epaisseur: 0.04 });
  page3.textures(ecGris.tex, null);
  page3.face.color.set(0x9aa0a8);
  ajouter(page3.groupe);
  const etPage3 = etiquette("PAGE 3");
  let T2a, T2b, T2c;
  if (k2) {
    T2a = titre("t2a", ["INTROUVABLE"], "bas", "ecraser");
    T2b = titre("t2b", ["OUBLIÉ"], "bas", "ecraser");
    T2c = titre("t2c", ["INUTILE"], "bas", "ecraser");
    entree(tl, T2a, k2.motA);
    rature(tl, T2a, k2.ratureA);
    sortie(tl, T2a, k2.sceneB - 0.05, "monte");
    entree(tl, T2b, k2.motB);
    rature(tl, T2b, k2.ratureB);
    sortie(tl, T2b, k2.sceneC - 0.05, "monte");
    entree(tl, T2c, k2.motC);
    rature(tl, T2c, k2.ratureC);
    sortie(tl, T2c, k2.aspiration + 0.05, "eclat");
  }
  function poser2(t) {
    const k = k2;
    if (!k || t < k.debut - 0.15 || t > k.fin + 0.1) return;
    const murs = [murA, murB, murC];
    const arrivee = [k.debut - 0.12, k.sceneB - 0.9, k.sceneC - 0.9];
    murs.forEach((m, i) => {
      m.groupe.visible = true;
      m.groupe.position.set(...pos2[i]);
      m.groupe.rotation.set(0, (P ? 0 : -0.06 * (i - 1)) + derive(t, i) * 0.02, 0);
      if (t < k.aspiration) assembler(m, t, arrivee[i], 0.45, { rayon: 4, depuis: [0, 0, 3], etal: 0.25 });
      else aspirer(m, t, k.aspiration, 0.5, [pos2[2][0] - pos2[i][0], pos2[2][1] - pos2[i][1], 1.5]);
    });
    ecVisiteur.maj(t);
    // la fenêtre que le visiteur ferme s'effondre
    if (t > k.croix && t < k.aspiration) {
      for (const m of murB.tuiles) {
        const v = m.userData;
        const tau = Math.max(0, t - k.croix - 0.05 - v.r1 * 0.12 - (1 - (v.j + 0.5) / murB.rows) * 0.1);
        m.position.set(v.cx + (v.r2 - 0.5) * tau * 1.2, v.cy - 4.9 * tau * tau - tau * 0.5, (v.r3 - 0.3) * tau * 2);
        m.rotation.set(tau * (v.r4 - 0.5) * 8, tau * (v.r1 - 0.5) * 6, tau * (v.r2 - 0.5) * 5);
        m.visible = tau < 1.2;
      }
    }
    // l'écran vide « s'éteint » : il se couche légèrement
    if (t > k.sceneC) murC.groupe.rotation.x = -0.18 * seg(t, k.sceneC, k.aspiration, E.out2);
    // page 3 : la plaque grise qui coule
    const a3 = seg(t, k.debut + 0.3, k.sceneB - 0.2, E.inout2);
    const g3 = page3.groupe;
    g3.visible = t > k.debut + 0.25 && t < k.sceneB + 0.3;
    g3.position.set(pos2[0][0] + (P ? 0.5 : 1.6) - 0.3 * a3, pos2[0][1] - (P ? 1.6 : 1.0) - 1.4 * a3, -0.6 - 2.6 * a3);
    g3.rotation.set(-0.5 * a3, 0.4 * a3, 0.15 * a3);
    placer(etPage3, g3, [0, SP.h * 0.15 + 0.12, 0], seg(t, k.debut + 0.55, k.debut + 0.8, E.out3) * (1 - seg(t, k.sceneB - 0.3, k.sceneB - 0.1)));
    // le point d'aspiration
    if (t >= k.aspiration) {
      const s = prog(t, k.aspiration, k.fin);
      const h = monde.halo.principal;
      h.position.set(pos2[2][0], pos2[2][1], 1.5);
      h.scale.setScalar(0.4 + 3.2 * Math.sin(Math.PI * s));
      h.material.opacity = 0.65 * Math.sin(Math.PI * Math.min(1, s * 1.1));
    }
  }
  function camera2(t) {
    const k = k2;
    const c = (i) => pos2[i];
    const pas = (a, b, s) => [lerp(a[0], b[0], s), lerp(a[1], b[1], s), lerp(a[2], b[2], s)];
    let cible;
    let obt = 0;
    const glisseA = P ? [0, -0.35, 0] : [0.35, 0, 0];
    const add = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
    if (t < k.sceneB - 0.3) cible = pas(add(c(0), [-glisseA[0], -glisseA[1], 0]), add(c(0), glisseA), E.lin(prog(t, k.debut, k.sceneB - 0.3)));
    else if (t < k.sceneB + 0.12) {
      const s = E.inout4(prog(t, k.sceneB - 0.3, k.sceneB + 0.12));
      cible = pas(add(c(0), glisseA), add(c(1), [-glisseA[0], -glisseA[1], 0]), s);
      obt = 0.03 * Math.sin(Math.PI * s);
    } else if (t < k.sceneC - 0.3) cible = pas(add(c(1), [-glisseA[0], -glisseA[1], 0]), add(c(1), glisseA), E.lin(prog(t, k.sceneB + 0.12, k.sceneC - 0.3)));
    else if (t < k.sceneC + 0.12) {
      const s = E.inout4(prog(t, k.sceneC - 0.3, k.sceneC + 0.12));
      cible = pas(add(c(1), glisseA), add(c(2), [-glisseA[0], -glisseA[1], 0]), s);
      obt = 0.03 * Math.sin(Math.PI * s);
    } else cible = pas(add(c(2), [-glisseA[0], -glisseA[1], 0]), add(c(2), glisseA), E.lin(prog(t, k.sceneC + 0.12, k.fin)));
    const asp = seg(t, k.aspiration, k.fin, E.in3);
    return {
      cible,
      boite: P ? [SP.w * 1.25, SP.h * 1.3] : [SP.w * 1.6, SP.h * 1.75],
      decalage: P ? [0, -0.06] : SQ ? [0, -0.08] : [0, 0.12],
      marge: lerp(1, 0.55, asp),
      lacet: derive(t, 3) * 0.04 + (P ? 0 : 0.05),
      tangage: derive(t, 4) * 0.03 + 0.03,
      obturation: obt,
    };
  }

  /* ════════════════════════════ PLAN 3 ═══════════════════════════════ */
  const k3 = K[3];
  const ruban = creerRuban({ couches: k3.court ? 18 : 28 });
  ajouter(ruban.groupe);
  const departs = [[-9, 7, -32], [10, -5, -36], [-6, -9, -30]];
  const T3 = titre("t3", lignes(["SUR *MESURE.*"], ["SUR", "*MESURE.*"]), "bas", "deplier");
  entree(tl, T3, k3.titre);
  sortie(tl, T3, k3.logo - 0.3, "balayage");
  // le logo officiel, en DOM (variante sombre du site), un instant
  const lockup3 = creerLockup(dom.calque, P ? 0.84 * L : SQ ? 0.78 * L : 0.6 * L, L / 2, P ? 0.42 * H : 0.46 * H);
  barreSur(tl, lockup3, k3.logo, k3.fin - 0.25);

  function poser3(t) {
    const k = k3;
    if (t < k.debut - 0.1 || t > k.fin + 0.1) return;
    const g = ruban.groupe;
    g.visible = true;
    g.position.set(0, 0, 0);
    g.rotation.set(0, 0, 0);
    g.scale.set(1, 1, 1);
    const arrivees = [k.plaque1, k.plaque2, k.plaque3];
    ruban.plaques.forEach((p, i) => {
      const a = clamp(prog(t, arrivees[i] - 0.55, arrivees[i]));
      const s = E.pose(a);
      p.visible = a > 0;
      const d = departs[i];
      const choc = Math.exp(-Math.max(0, t - arrivees[i]) * 18) * (t >= arrivees[i] ? 1 : 0);
      p.position.set(lerp(d[0], 0, s), lerp(d[1], 0, s), lerp(d[2], 0, s) + 0.12 * choc);
      p.rotation.set((1 - s) * 2.4 * (i - 1), (1 - s) * 3.1, (1 - s) * 1.6);
      p.scale.set(1, 1, 1);
    });
    // impression couche par couche
    const n = ruban.pile.length;
    ruban.pile.forEach((c, i) => {
      const tc = k.couchesDebut + ((k.couchesFin - k.couchesDebut) * i) / n;
      c.visible = t >= tc;
      const a = E.out3(clamp((t - tc) / 0.16));
      c.position.set(0, (1 - a) * 1.4, -0.11 - 0.07 - i * 0.085);
      c.scale.set(1, 1, 1);
    });
    // le S massif recule pendant le logo officiel
    if (t > k.logo - 0.15) {
      const s = seg(t, k.logo - 0.15, k.logo + 0.22, E.in3);
      g.position.set(0, 0, -14 * s);
      g.scale.setScalar(Math.max(0.001, 1 - 0.8 * s));
      g.visible = s < 1;
    }
    // lumière : le sol s'allume à l'assemblage
    const al = seg(t, k.assemblage, k.assemblage + 0.4, E.out3);
    monde.sol.material.uniforms.uAllume.value = lerp(0.08, 1.0, al);
    monde.sol.material.uniforms.uAnneau.value = t > k.assemblage ? (t - k.assemblage) * 9 : 0;
    const h = monde.halo.principal;
    h.position.set(0, 0.4, -3.5);
    h.scale.setScalar(4 + 10 * al);
    h.material.opacity = 0.15 + 0.6 * al + 0.5 * Math.exp(-Math.max(0, t - k.assemblage) * 6) * (t > k.assemblage ? 1 : 0);
    monde.source.position.set(2.5, 2.5, 3);
    monde.source.intensity = 20 * al;
  }
  function camera3(t) {
    const k = k3;
    const LR = LARGEUR_RUBAN;
    const base = { cible: [0, 0.05, 0], boite: [LR * 2.1, 5.6], fov: 34, decalage: P ? [0, -0.07] : SQ ? [0, 0.06] : [0, 0.07] };
    if (t < k.assemblage) {
      const s = prog(t, k.debut, k.assemblage);
      return { ...base, boite: [LR * 2.6, lerp(7.4, 6.0, s)], lacet: -0.12 * s + derive(t, 5) * 0.02, tangage: 0.05, roulis: 0.03 * (1 - s) };
    }
    if (t < k.logo - 0.45) {
      const s = E.inout2(prog(t, k.assemblage, k.logo - 0.45));
      return { ...base, cible: [0, 0.05, -1.1 * s], boite: [LR * 2.4, 6.5], lacet: lerp(-0.45, 0.62, s), tangage: lerp(0.05, 0.2, s), roulis: derive(t, 6) * 0.02 };
    }
    const s = E.inout4(prog(t, k.logo - 0.45, k.logo));
    const apres = prog(t, k.logo, k.fin);
    return { ...base, cible: [0, 0.05, lerp(-1.1, 0, s)], boite: [LR * 2.4, lerp(6.0, 7.0, s) - 1.2 * apres], lacet: lerp(0.62, 0, s) + derive(t, 23) * 0.05 * apres, tangage: lerp(0.2, 0.02, s) + 0.06 * apres, obturation: 0.03 * Math.sin(Math.PI * s) };
  }

  /* ════════════════════════════ PLAN 4 ═══════════════════════════════ */
  const k4 = K[4];
  const murProduit = new Mur({ largeur: SP.w, hauteur: SP.h, cols: SP.cols, rows: SP.rows, epaisseur: 0.05, graine: 31 });
  ajouter(murProduit.groupe);
  // ordinateur portable (écran + socle) et téléphone, pour le tableau final
  const portable = new THREE.Group();
  const murPortable = new Mur({ largeur: 3.2, hauteur: 2.0, cols: 8, rows: 5, epaisseur: 0.04, graine: 41 });
  murPortable.textures(ecLaptop.tex, null);
  const charniere = new THREE.Group();
  charniere.add(murPortable.groupe);
  murPortable.groupe.position.set(0, 1.0, 0);
  const socle = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 2.2), MAT.navy());
  socle.add(new THREE.LineSegments(new THREE.EdgesGeometry(socle.geometry), MAT.arete()));
  socle.position.set(0, -0.04, 1.1);
  portable.add(charniere, socle);
  ajouter(portable);
  const telephone = new THREE.Group();
  const murTel = new Mur({ largeur: 1.25, hauteur: 2.22, cols: 4, rows: 7, epaisseur: 0.04, graine: 42 });
  murTel.textures(ecTel.tex, null);
  const coque = new THREE.Mesh(new THREE.BoxGeometry(1.36, 2.36, 0.08), MAT.navy());
  coque.add(new THREE.LineSegments(new THREE.EdgesGeometry(coque.geometry), MAT.arete()));
  coque.position.z = -0.05;
  telephone.add(coque, murTel.groupe);
  ajouter(telephone);
  const etOrdi = etiquette("ORDINATEUR"), etTel = etiquette("TÉLÉPHONE"), etOutil = etiquette("OUTIL DE GESTION");
  const slots = P
    ? { produit: [0, -3.0, 0, 0, 0.62], portable: [0, 2.6, -0.4, -0.15, 0.62], tel: [0.95, 0.15, 1.2, -0.12, 1.0] }
    : { produit: [5.1, 0.35, -0.3, -0.38, 0.86], portable: [-4.6, -0.75, 0.3, 0.42, 0.95], tel: [0.25, -0.15, 1.3, 0.05, 1.05] };
  const T4a = titre("t4a", lignes(["UN SITE", "QUI SE", "*DÉMARQUE*"], ["UN SITE QUI", "SE *DÉMARQUE*"], ["UN SITE QUI", "SE *DÉMARQUE*"]), "cote", "deplier");
  const T4b = titre("t4b", lignes(["UNE", "BOUTIQUE", "QUI *VEND*"], ["UNE BOUTIQUE", "QUI *VEND*"]), "cote", "balayage");
  const T4c = titre("t4c", lignes(["UN OUTIL QUI", "VOUS FAIT", "GAGNER DES", "*HEURES*"], ["UN OUTIL QUI VOUS", "FAIT GAGNER", "DES *HEURES*"]), "cote", "ecraser");
  entree(tl, T4a, k4.motSite - 0.1);
  sortie(tl, T4a, k4.boutique - 0.1, "chute");
  entree(tl, T4b, k4.motBoutique - 0.05);
  sortie(tl, T4b, k4.outil - 0.1, "chute");
  entree(tl, T4c, k4.motOutil - 0.05);
  sortie(tl, T4c, (k4.tableau ?? k4.fin - 0.3) - 0.1, "balayage");

  function poser4(t) {
    const k = k4;
    if (t < k.debut - 0.1 || t > k.fin + 0.1) return;
    const g = murProduit.groupe;
    g.visible = true;
    const tab = k.tableau != null ? seg(t, k.tableau, k.tableau + 0.8, E.inout3) : 0;
    const base = [0, 0.1, 0, P ? 0 : 0.2 - 0.16 * prog(t, k.debut, k.tableau ?? k.fin), 1];
    const sl = slots.produit;
    g.position.set(lerp(base[0], sl[0], tab), lerp(base[1], sl[1], tab), lerp(base[2], sl[2], tab));
    g.rotation.set(-0.04 + derive(t, 7) * 0.02, lerp(base[3], sl[3], tab), 0);
    g.scale.setScalar(lerp(1, sl[4], tab));
    // textures : site → boutique → outil, par retournement des tuiles
    if (t < k.outil) murProduit.textures(ecSite.tex, ecBoutique.tex);
    else murProduit.textures(ecOutil.tex, ecBoutique.tex);
    if (t < k.boutique) {
      assembler(murProduit, t, k.debut - 0.05, 0.5, { rayon: 5, depuis: [0, 0, 5], etal: 0.3 });
      ecSite.maj(t);
      ecBoutique.maj(t);
    } else if (t < k.outil) {
      murProduit.retourner(prog(t, k.boutique, k.boutique + 0.55), 0, { sens: "haut", amplitude: 0.45 });
      ecBoutique.maj(t);
    } else {
      murProduit.retourner(prog(t, k.outil, k.outil + 0.55), 1, { sens: "gauche", amplitude: 0.45 });
      ecOutil.maj(t);
    }
    // le tableau final : ordinateur, téléphone, outil, reliés par des flux
    const vis = k.tableau != null && t > k.tableau;
    portable.visible = vis;
    telephone.visible = vis;
    if (vis) {
      const sp = slots.portable, st = slots.tel;
      const arr = seg(t, k.tableau, k.tableau + 0.75, E.pose);
      portable.position.set(sp[0] - (P ? 0 : 7) * (1 - arr), sp[1] + (P ? 6 : 0) * (1 - arr), sp[2] - 3 * (1 - arr));
      portable.rotation.set(0.05, sp[3] + derive(t, 8) * 0.03, 0);
      portable.scale.setScalar(sp[4]);
      charniere.rotation.x = -0.12 - 1.35 * (1 - seg(t, k.tableau + 0.15, k.tableau + 0.75, E.pose));
      assembler(murPortable, t, k.tableau, 0.45, { rayon: 3, depuis: [0, 0, 3], etal: 0.2 });
      const arrT = seg(t, k.tableau + 0.15, k.tableau + 0.9, E.pose);
      telephone.position.set(st[0] + (P ? 5 : 0) * (1 - arrT), st[1] + 0.05 * Math.sin(t * 2) - (P ? 0 : 6) * (1 - arrT), st[2] - 4 * (1 - arrT));
      telephone.rotation.set(0.02, st[3] + derive(t, 9) * 0.05, 0.03);
      telephone.scale.setScalar(st[4]);
      assembler(murTel, t, k.tableau + 0.15, 0.45, { rayon: 2.5, depuis: [0, 0, 3], etal: 0.2 });
      ecLaptop.maj(t);
      ecTel.maj(t);
      const fl = monde.flux.material.uniforms;
      fl.uLiens.value = seg(t, k.tableau + 0.5, k.tableau + 1.0);
      fl.uA.value.set(sp[0], sp[1] + 0.8, sp[2]);
      fl.uB.value.set(st[0], st[1], st[2]);
      fl.uC.value.set(sl[0], sl[1], sl[2]);
      const ae = seg(t, k.motTableau + 0.3, k.motTableau + 0.6, E.out3) * (1 - seg(t, k.fin - 0.4, k.fin - 0.25));
      placer(etOrdi, portable, [0, 2.45, 0], ae);
      placer(etTel, telephone, [0, 1.42, 0], ae);
      placer(etOutil, g, [0, SP.h / 2 + 0.28, 0], ae);
    }
    monde.sol.material.uniforms.uAllume.value = 0.55;
    monde.sol.material.uniforms.uAnneau.value = 0;
    const h = monde.halo.principal;
    h.position.set(0, 0.5, -5);
    h.scale.setScalar(14);
    h.material.opacity = 0.45;
  }
  function camera4(t) {
    const k = k4;
    const ent = seg(t, k.debut, k.debut + 0.7, E.out3);
    if (k.tableau == null || t < k.tableau) {
      const tt = prog(t, k.debut, k.tableau ?? k.fin);
      return {
        cible: [0, 0.1, 0],
        boite: P ? [SP.w * 1.14, SP.h * 1.2] : SQ ? [SP.w * 1.15, SP.h * 1.85] : [SP.w * 1.75, SP.h * 1.75],
        decalage: P ? [0, -0.11] : SQ ? [0, -0.13] : [0.215, 0],
        marge: lerp(1.5, 1.0, ent) - 0.06 * tt,
        lacet: (P ? 0.1 : 0.2) - 0.16 * tt + derive(t, 10) * 0.03,
        tangage: 0.06 + derive(t, 11) * 0.02,
        roulis: derive(t, 12) * 0.015,
      };
    }
    const s = E.inout3(prog(t, k.tableau, k.tableau + 1.0));
    const plonge = seg(t, k.fin - 0.4, k.fin + 0.05, E.in3);
    const pousse = prog(t, k.tableau + 1.0, k.fin - 0.4);
    const st = slots.tel;
    return {
      cible: [lerp(0, st[0] * plonge, s), lerp(0.1, st[1] * plonge, s), lerp(0, st[2] * plonge, s)],
      boite: P ? [lerp(SP.w * 1.14, 5.0, s) - 0.5 * pousse, lerp(SP.h * 1.2, 9.2, s) - 0.9 * pousse] : [lerp(SP.w * 1.75, 15.2, s) - 1.4 * pousse, lerp(SP.h * 1.75, 5.4, s) - 0.6 * pousse],
      decalage: [lerp(P ? 0 : 0.215, 0, s), lerp(P ? -0.11 : 0, P ? -0.02 : 0.02, s)],
      marge: lerp(1, 0.06, plonge),
      lacet: lerp(0.06, -0.1, s) - 0.16 * pousse + derive(t, 10) * 0.03,
      tangage: lerp(0.06, 0.13, s) - 0.04 * pousse,
      obturation: 0.03 * plonge,
    };
  }

  /* ════════════════════════════ PLAN 5 ═══════════════════════════════ */
  const k5 = K[5];
  const g5 = new THREE.Group();
  ajouter(g5);
  const couches = ecCouches.map((ec, i) => {
    const m = new Mur({ largeur: SP.w, hauteur: SP.h, cols: 1, rows: 1, epaisseur: 0.03, graine: 50 + i });
    m.textures(ec.tex, null);
    m.face.transparent = true;
    g5.add(m.groupe);
    return m;
  });
  const nomsCouches = ["01 DESIGN", "02 CONTENU", "03 CODE", "04 DONNÉES", "05 HÉBERGEMENT"].map((n) => etiquette(n));
  const murDemo = new Mur({ largeur: SP.w, hauteur: SP.h, cols: SP.cols / 2, rows: SP.rows / 2, epaisseur: 0.05, graine: 55 });
  murDemo.textures(ecDemo.tex, null);
  g5.add(murDemo.groupe);
  const tagDemo = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.36, 0.06), MAT.ambre());
  tagDemo.add(new THREE.LineSegments(new THREE.EdgesGeometry(tagDemo.geometry), MAT.arete()));
  murDemo.groupe.add(tagDemo);
  const etDemo = etiquette(config.demo.etiquette.toUpperCase(), true);
  // la clé, faite de plaques ambre
  const cle = new THREE.Group();
  const morceauxCle = [];
  {
    const geo = new THREE.BoxGeometry(0.26, 0.13, 0.1);
    const mat = MAT.ambre();
    const pose = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      pose.push([Math.cos(a) * 0.55 - 1.0, Math.sin(a) * 0.55, 0, a + Math.PI / 2]);
    }
    for (let i = 0; i < 7; i++) pose.push([-0.33 + i * 0.27, 0, 0, 0]);
    pose.push([1.15, -0.2, 0, Math.PI / 2], [0.88, -0.2, 0, Math.PI / 2], [0.62, -0.17, 0, Math.PI / 2]);
    const r = alea(66);
    for (const [x, y, z, rot] of pose) {
      const m = new THREE.Mesh(geo, mat);
      m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), MAT.arete()));
      m.userData = { x, y, z, rot, r1: r(), r2: r(), r3: r() };
      cle.add(m);
      morceauxCle.push(m);
    }
  }
  ajouter(cle);
  const murIA = new Mur({ largeur: SP.w, hauteur: SP.h, cols: SP.cols * 0.75, rows: SP.rows * 0.75, epaisseur: 0.05, graine: 58 });
  if (ecIA) murIA.textures(ecIA.tex, null);
  ajouter(murIA.groupe);
  if (k5) {
    const T5a = titre("t5a", lignes(["VOTRE *DÉMO*", "AVANT DE", "DÉCIDER"], ["VOTRE *DÉMO*", "AVANT DE DÉCIDER"]), "cote", "deplier");
    const T5b = titre("t5b", lignes(["VOTRE CODE", "VOUS", "*APPARTIENT*"], ["VOTRE CODE VOUS", "*APPARTIENT*"]), "cote", "balayage");
    const T5c = titre("t5c", lignes(["TROUVÉ SUR", "GOOGLE…", "ET PAR", "LES *IA*"], ["TROUVÉ SUR GOOGLE…", "ET PAR LES *IA*"]), "cote", "ecraser");
    entree(tl, T5a, k5.demo - 0.25);
    sortie(tl, T5a, k5.cle - 0.08, "chute");
    entree(tl, T5b, k5.cle + 0.05);
    sortie(tl, T5b, k5.ia - 0.08, "chute");
    entree(tl, T5c, k5.ia + 0.1);
    sortie(tl, T5c, k5.fin - 0.4, "eclat");
  }
  function poser5(t) {
    const k = k5;
    if (!k || t < k.debut - 0.1 || t > k.fin + 0.2) return;
    // vue éclatée
    const pDemo = t >= k.recompression + 0.35;
    g5.visible = t < k.ia + 0.4;
    const rx = lerp(-1.02, -0.12, seg(t, k.recompression, k.demo + 0.3, E.inout3));
    const sortieDemo = seg(t, k.cle - 0.1, k.cle + 0.5, E.inout3);
    g5.position.set(P ? 0 : lerp(0, 5.5, sortieDemo), P ? lerp(0, 3.2, sortieDemo) : lerp(0, 1.2, sortieDemo), lerp(0, -7, sortieDemo));
    g5.rotation.set(rx, (P ? 0 : 0.35) + derive(t, 13) * 0.04 + lerp(0, 0.5, sortieDemo), P ? 0 : 0.0);
    g5.scale.setScalar(lerp(1, 0.45, sortieDemo));
    const ecart = piste([[k.debut, 0.02], [k.eclate + 0.5, P ? 0.75 : 0.62, E.pose], [k.recompression, P ? 0.82 : 0.68, E.lin], [k.recompression + 0.35, 0.0, E.in3]])(t);
    couches.forEach((m, i) => {
      m.groupe.visible = !pDemo;
      m.groupe.position.set(0, 0, (2 - i) * ecart);
      m.repos();
      const a = seg(t, k.eclate + 0.25 + i * 0.05, k.eclate + 0.45 + i * 0.05, E.out3) * (1 - seg(t, k.recompression - 0.15, k.recompression));
      placer(nomsCouches[i], m.groupe, [-SP.w / 2 - (P ? -0.2 : 0.15), SP.h / 2 - 0.25, 0.05], a);
    });
    murDemo.groupe.visible = pDemo;
    if (pDemo) {
      murDemo.retourner(0, 0);
      // petite onde à l'impression du site fini
      const s = prog(t, k.recompression + 0.35, k.recompression + 0.85);
      for (const m of murDemo.tuiles) {
        const v = m.userData;
        m.position.z = Math.sin(Math.PI * clamp(s * 1.5 - v.d * 0.5)) * 0.25;
      }
      const ap = E.outBack(clamp(prog(t, k.demo, k.demo + 0.3)));
      tagDemo.position.set(-SP.w / 2 + 0.55, SP.h / 2 + 0.05, 0.12);
      tagDemo.scale.setScalar(Math.max(0.001, ap));
      placer(etDemo, tagDemo, [0, 0, 0.06], seg(t, k.demo + 0.1, k.demo + 0.35, E.out3) * (1 - sortieDemo));
    }
    // la clé
    cle.visible = t > k.cle - 0.05 && t < k.ia + 0.5;
    if (cle.visible) {
      const out = seg(t, k.ia - 0.15, k.ia + 0.35, E.in3);
      cle.position.set(P ? 0.25 : 2.35, (P ? -0.6 : 0.1) + out * 3, out * 6);
      cle.rotation.set(0.25, -0.5 + (t - k.cle) * 0.7, 0.1);
      cle.scale.setScalar(P ? 1.0 : 1.1);
      morceauxCle.forEach((m) => {
        const v = m.userData;
        const a = E.pose(clamp((t - k.cle - v.r1 * 0.25) / 0.45));
        m.position.set(lerp(v.x + (v.r2 - 0.5) * 8, v.x, a), lerp(v.y + (v.r3 - 0.5) * 6, v.y, a), lerp(4 + v.r1 * 4, v.z, a));
        m.rotation.set((1 - a) * 6 * v.r2, (1 - a) * 5 * v.r3, v.rot + (1 - a) * 4);
      });
    }
    // la recherche et l'assistant IA
    murIA.groupe.visible = t > k.ia - 0.05;
    if (murIA.groupe.visible) {
      murIA.groupe.position.set(0, P ? -0.4 : 0.1, 0);
      murIA.groupe.rotation.set(-0.03, (P ? 0.04 : 0.12) + derive(t, 14) * 0.03, 0);
      assembler(murIA, t, k.ia - 0.05, 0.45, { rayon: 5, depuis: [0, 0, 5], etal: 0.25 });
      if (ecIA) ecIA.maj(t);
    }
    const h = monde.halo.principal;
    h.position.set(0, 0.5, -5);
    h.scale.setScalar(13);
    h.material.opacity = 0.4 + 0.3 * Math.exp(-Math.max(0, t - k.cle) * 4) * (t > k.cle ? 1 : 0);
    monde.sol.material.uniforms.uAllume.value = 0.45;
  }
  function camera5(t) {
    const k = k5;
    const em = seg(t, k.debut - 0.05, k.debut + 0.5, E.out3);
    const phase = t < k.cle - 0.1 ? 0 : t < k.ia - 0.1 ? 1 : 2;
    const cibles = P ? [[0, 0, 0], [0, -0.6, 0], [0, -0.4, 0]] : [[0, 0, 0], [2.1, 0.1, 0], [0, 0.1, 0]];
    const s1 = seg(t, k.cle - 0.25, k.cle + 0.25, E.inout3), s2 = seg(t, k.ia - 0.25, k.ia + 0.25, E.inout3);
    const c = [0, 1, 2].map((d) => lerp(lerp(cibles[0][d], cibles[1][d], s1), cibles[2][d], s2));
    void phase;
    const boites = P ? [[SP.w * 1.35, SP.h * 1.9], [3.4, 4.8], [SP.w * 1.12, SP.h * 1.18]] : [[SP.w * 2.4, SP.h * 2.9], [5.4, 3.6], [SP.w * 1.62, SP.h * 1.62]];
    const b = [0, 1].map((d) => lerp(lerp(boites[0][d], boites[1][d], s1), boites[2][d], s2));
    const titreLa = seg(t, k.demo - 0.5, k.demo, E.inout3);
    return {
      cible: [c[0], c[1] + 0.95 * (1 - titreLa), c[2]],
      boite: b,
      decalage: P ? [0, lerp(-0.02, -0.1, titreLa)] : SQ ? [0, lerp(-0.02, -0.12, titreLa)] : [lerp(0, 0.215, titreLa), 0],
      marge: lerp(0.4, 1, em),
      lacet: (P ? 0.06 : 0.12) + derive(t, 15) * 0.05 + 0.05 * Math.sin(t * 0.6),
      tangage: 0.1 + derive(t, 16) * 0.03,
      obturation: 0.02 * (1 - em),
    };
  }

  /* ════════════════════════════ PLAN 6 ═══════════════════════════════ */
  const k6 = K[6];
  const murEstim = new Mur({ largeur: SP.w, hauteur: SP.h, cols: SP.cols, rows: SP.rows, epaisseur: 0.05, graine: 61 });
  if (ecEstim) murEstim.textures(ecEstim.tex, null);
  ajouter(murEstim.groupe);
  if (k6) {
    const T6a = titre("t6a", lignes(["COMBIEN", "ÇA *COÛTE ?*"], ["COMBIEN", "ÇA *COÛTE ?*"]), "cote", "ecraser");
    const T6b = titre("t6b", lignes(["ESTIMEZ EN", "*2 MINUTES*"], ["ESTIMEZ EN", "*2 MINUTES*"]), "cote", "deplier");
    entree(tl, T6a, K[6].debut + 0.25);
    sortie(tl, T6a, k6.titre - 0.15, "chute");
    entree(tl, T6b, k6.titre);
    sortie(tl, T6b, k6.fin - 0.35, "eclat");
    // « Site vitrine à partir de {prixVitrine} € » — lu depuis config.json
    const s = document.createElement("div");
    s.className = "sous";
    const texteS = `Site vitrine à partir de ${config.prixVitrine} ${config.devise}`;
    const z = Z.cote;
    const deuxLignes = !P && !SQ;
    const px = Math.round((P ? 50 : SQ ? 48 : 52) * u);
    if (deuxLignes) {
      s.innerHTML = "";
      const [a, b] = [texteS.slice(0, texteS.indexOf(" à ")), texteS.slice(texteS.indexOf(" à ") + 1)];
      [a, b].forEach((x) => { const d = document.createElement("div"); d.textContent = x; s.appendChild(d); });
    } else s.textContent = texteS;
    s.style.fontSize = `${px}px`;
    s.style.lineHeight = "1.25";
    dom.typo.appendChild(s);
    const largeurS = (deuxLignes ? 18 : texteS.length) * px * 0.6;
    s.style.left = `${z.ancre === "centre" ? z.x - largeurS / 2 : z.x}px`;
    s.style.top = `${z.ancre === "centre" ? z.y + z.h + 16 * u : z.y + z.h * 0.82}px`;
    s.style.clipPath = "inset(0% 100% 0% 0%)";
    tl.fromTo(s, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "power3.out" }, k6.fige);
    tl.to(s, { yPercent: 120, clipPath: "inset(0% 0% 100% 0%)", duration: 0.25, ease: "power3.in" }, k6.fin - 0.35);
  }
  function poser6(t) {
    const k = k6;
    if (!k || t < k.debut - 0.1 || t > k.fin + 0.1) return;
    const g = murEstim.groupe;
    g.visible = true;
    g.position.set(0, P ? -0.25 : 0.1, 0);
    g.rotation.set(-0.03 + derive(t, 17) * 0.02, (P ? 0.04 : 0.14) - 0.08 * prog(t, k.debut, k.fin), 0);
    g.scale.setScalar(1);
    if (t < k.fin - 0.5) assembler(murEstim, t, k.debut - 0.1, 0.5, { rayon: 5, depuis: [0, 0, 5], etal: 0.3 });
    else replier(murEstim, t, k.fin - 0.5, 0.45);
    if (ecEstim) ecEstim.maj(t);
    const h = monde.halo.principal;
    h.position.set(0, 0.5, -5);
    h.scale.setScalar(13);
    h.material.opacity = 0.45 + 0.4 * Math.exp(-Math.max(0, t - k.fige) * 5) * (t > k.fige ? 1 : 0);
    monde.sol.material.uniforms.uAllume.value = 0.45;
  }
  function camera6(t) {
    const k = k6;
    const pousse = seg(t, k.cadran - 0.2, k.fige + 0.3, E.inout2);
    return {
      cible: [0, P ? -0.25 : 0.1, 0],
      boite: P ? [SP.w * 1.12, SP.h * 1.18] : SQ ? [SP.w * 1.12, SP.h * 1.8] : [SP.w * 1.62, SP.h * 1.62],
      decalage: P ? [0, -0.11] : SQ ? [0, -0.13] : [0.215, 0],
      marge: lerp(1.08, 0.94, pousse) - 0.04 * prog(t, k.debut, k.fin),
      lacet: (P ? 0.08 : 0.16) - 0.08 * prog(t, k.debut, k.fin) + derive(t, 18) * 0.03,
      tangage: 0.06 + derive(t, 19) * 0.02,
      roulis: derive(t, 20) * 0.012,
    };
  }

  /* ════════════════════════════ PLAN 7 ═══════════════════════════════ */
  const k7 = K[7];
  // l'essaim : des plaques qui convergent et reforment le S
  const essaim = new THREE.Group();
  const morceauxEssaim = [];
  {
    const r = alea(707);
    const geo = new THREE.BoxGeometry(0.2, 0.12, 0.04);
    const matN = MAT.navy(), matA = MAT.ambre();
    const poly = [
      [[144, 1], [144, 49], [50, 88], [145, 125], [144, 171], [87, 148], [1, 115], [0, 68], [4, 60]],
      [[87, 148], [144, 171], [144, 173], [1, 228], [1, 181]],
    ];
    const dedans = (pt, pl) => {
      let c = false;
      for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) {
        const [xi, yi] = pl[i], [xj, yj] = pl[j];
        if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
      }
      return c;
    };
    const ech = HAUTEUR_RUBAN / 227;
    let n = 0;
    while (n < 240) {
      const x = r() * 145, y = 1 + r() * 227;
      const ambre = dedans([x, y], poly[1]);
      if (!ambre && !dedans([x, y], poly[0])) continue;
      const m = new THREE.Mesh(geo, ambre ? matA : matN);
      const dir = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
      const R = 9 + r() * 9;
      m.userData = { tx: (x - 72.5) * ech, ty: (114.5 - y) * ech, tz: (r() - 0.5) * 0.18, sx: dir.x * R, sy: dir.y * R * 0.7, sz: dir.z * R - 4, r1: r(), r2: r(), r3: r() };
      essaim.add(m);
      morceauxEssaim.push(m);
      n++;
    }
  }
  ajouter(essaim);
  const ruban7 = creerRuban({ couches: 0 });
  ajouter(ruban7.groupe);
  const IVOIRE_LOGO = new THREE.Color("#F5F3EE");
  const NAVY = new THREE.Color(C3.navy);

  // Mise en page finale : logo officiel, URL, appel.
  const final = (() => {
    const largeurLockup = P ? 0.84 * L : SQ ? 0.72 * L : 0.6 * L;
    const Hr = largeurLockup / 3.898;
    const cy = P ? 0.33 * H : SQ ? 0.34 * H : 0.38 * H;
    const gauche = L / 2 - largeurLockup / 2;
    return { Hr, cy, xR: gauche + 0.3195 * Hr, largeurLockup, urlY: P ? 0.455 * H : SQ ? 0.56 * H : 0.6 * H, appelY: P ? 0.555 * H : SQ ? 0.7 * H : 0.75 * H };
  })();
  const lockupFinal = creerLockup(dom.calque, final.largeurLockup, L / 2, final.cy);
  const motFinal = lockupFinal.querySelector(".mot");
  const svgFinal = lockupFinal.querySelector("svg");
  // l'URL qui s'écrit lettre par lettre
  const url = document.createElement("div");
  url.className = "url";
  const urlPx = ajuster([config.url.toUpperCase()], P ? 0.86 * L : SQ ? 0.74 * L : 0.52 * L, 200) * 1.08;
  url.style.fontSize = `${urlPx}px`;
  const lettresUrl = [...config.url].map((c) => {
    const s = document.createElement("span");
    s.textContent = c;
    s.style.visibility = "hidden";
    url.appendChild(s);
    return s;
  });
  const curseur = document.createElement("span");
  curseur.className = "curseur";
  url.appendChild(curseur);
  dom.calque.appendChild(url);
  const appel = document.createElement("div");
  appel.className = "appel";
  appel.textContent = config.appel;
  const appelPx = Math.round((P ? 50 : SQ ? 44 : 40) * u);
  appel.style.fontSize = `${appelPx}px`;
  appel.style.padding = `${0.42 * appelPx}px ${0.9 * appelPx}px`;
  dom.calque.appendChild(appel);
  const sous7 = document.createElement("div");
  sous7.className = "sous";
  sous7.textContent = "SITES ET OUTILS SUR MESURE";
  sous7.style.fontSize = `${Math.round((P ? 50 : 48) * u)}px`;
  dom.typo.appendChild(sous7);
  {
    const k = k7;
    // positions (mesurées après chargement des polices)
    const mesurer = () => {
      const wU = url.getBoundingClientRect().width;
      url.style.left = `${L / 2 - wU / 2}px`;
      url.style.top = `${final.urlY - urlPx * 0.55}px`;
      const wA = appel.getBoundingClientRect().width;
      appel.style.left = `${L / 2 - wA / 2}px`;
      appel.style.top = `${final.appelY - appelPx}px`;
      const wS = sous7.getBoundingClientRect().width;
      sous7.style.left = `${L / 2 - wS / 2}px`;
      sous7.style.top = `${final.urlY + 0.25 * urlPx}px`;
    };
    lettresUrl.forEach((s) => (s.style.visibility = "visible"));
    mesurer();
    lettresUrl.forEach((s) => (s.style.visibility = "hidden"));
    url.style.opacity = 0;
    tl.set(url, { opacity: 1 }, k.url - 0.05);
    lettresUrl.forEach((s, i) => tl.set(s, { visibility: "visible" }, k.url + ((k.urlFin - k.url) * i) / lettresUrl.length));
    tl.fromTo(curseur, { opacity: 1 }, { opacity: 0, duration: 0.01, repeat: Math.max(0, Math.floor((k.fixe - 0.2 - k.url) / 0.5) * 2 - 1), repeatDelay: 0.24, yoyo: true }, k.url);
    tl.set(curseur, { opacity: 0 }, k.fixe - 0.15);
    // l'appel : la pastille se déroule, le texte glisse
    appel.style.clipPath = "inset(0% 50% 0% 50% round 999px)";
    tl.fromTo(appel, { clipPath: "inset(0% 50% 0% 50% round 999px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 0.4, ease: "power4.out" }, k.appel);
    // la devise
    sous7.style.clipPath = "inset(0% 100% 0% 0%)";
    const p7b = ch.calage.p7b;
    if (p7b) {
      tl.fromTo(sous7, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.out" }, p7b.debut);
      tl.to(sous7, { yPercent: -120, clipPath: "inset(100% 0% 0% 0%)", duration: 0.25, ease: "power3.in" }, k.url - 0.3);
    }
    // le lettrage du logo se dévoile pendant la montée ; le ruban DOM prend le relais du 3D sous l'éclair
    lockupFinal.style.opacity = 1;
    motFinal.style.clipPath = "inset(0% 100% 0% 0%)";
    svgFinal.style.opacity = 0;
    tl.fromTo(motFinal, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" }, k.montee + 0.55);
    tl.set(svgFinal, { opacity: 1 }, k.fixe - 0.12);
    tl.fromTo(dom.flash, { opacity: 0 }, { opacity: 0.85, duration: 0.06, ease: "power2.out" }, k.fixe - 0.18);
    tl.to(dom.flash, { opacity: 0, duration: 0.14, ease: "power2.in" }, k.fixe - 0.12);
  }

  function poser7(t) {
    const k = k7;
    if (t < k.debut - 0.1) return;
    const tf = Math.min(t, k.fixe - 0.12); // tout se fige au logo final
    // essaim
    essaim.visible = tf < k.pose + 0.08;
    if (essaim.visible) {
      for (const m of morceauxEssaim) {
        const v = m.userData;
        const t0 = k.pose - 1.15 - v.r1 * 0.35;
        const a = E.inout3(clamp((tf - t0) / 1.15));
        m.visible = tf > k.debut - 0.05;
        m.position.set(lerp(v.sx, v.tx, a), lerp(v.sy, v.ty, a), lerp(v.sz, v.tz, a));
        m.rotation.set((1 - a) * v.r2 * 9, (1 - a) * v.r3 * 9, (1 - a) * 4);
        m.scale.setScalar(lerp(1.8, 0.85, a));
      }
    }
    // le S solide
    const g = ruban7.groupe;
    g.visible = tf > k.pose - 0.12 && t < k.fixe - 0.12;
    const mont = seg(tf, k.montee, k.fixe - 0.12, E.inout3);
    const pose = seg(tf, k.pose - 0.12, k.pose + 0.05, E.out3);
    g.position.set(0, 0.06 * Math.sin(tf * 1.6) * (1 - mont), 0);
    g.rotation.set(0.05 * (1 - mont), (0.32 * Math.sin((tf - k.pose) * 0.55) + 0.12) * (1 - mont), 0);
    g.scale.set(lerp(1.06, 1, pose), lerp(1.06, 1, pose), lerp(1, 0.001, mont));
    ruban7.plaques.forEach((p) => {
      p.position.set(0, 0, 0);
      p.rotation.set(0, 0, 0);
      p.userData.aretes.visible = mont < 0.6;
    });
    // le navy du S rejoint l'ivoire de la variante sombre du logo
    [ruban7.mats.navy, ruban7.plaques[1].material].forEach((m) => {
      m.color.copy(NAVY);
      m.emissiveIntensity = lerp(0.25, 0.6, mont);
    });
    ruban7.mats.ambre.emissiveIntensity = lerp(0.35, 0.6, mont);
    // lumière
    const imp = Math.exp(-Math.max(0, tf - k.pose) * 5) * (tf > k.pose ? 1 : 0);
    const h = monde.halo.principal;
    h.position.set(0, 0.3, -3);
    h.scale.setScalar(10 + 6 * imp);
    h.material.opacity = 0.5 + 0.5 * imp;
    monde.sol.material.uniforms.uAllume.value = lerp(0.4, 1, seg(tf, k.pose, k.pose + 0.3));
    monde.sol.material.uniforms.uAnneau.value = tf > k.pose ? (tf - k.pose) * 8 : 0;
    monde.source.position.set(-3, 3, 4);
    monde.source.intensity = 25 * seg(tf, k.pose - 0.3, k.pose);
  }
  function camera7(t) {
    const k = k7;
    const tf = Math.min(t, k.fixe - 0.12);
    // cadrage final exact : le ruban 3D tombe pile sur le ruban DOM
    const finalCam = { cible: [0, 0, 0], boite: [0.0001, (HAUTEUR_RUBAN * H) / final.Hr], marge: 1, fov: 36, decalage: [(final.xR - L / 2) / L, (H / 2 - final.cy) / H], lacet: 0, tangage: 0, roulis: 0 };
    const libre = {
      cible: [0, 0, 0],
      boite: [0.0001, (HAUTEUR_RUBAN * H) / (final.Hr * 1.5)],
      marge: 1,
      fov: 36,
      decalage: [0, (H / 2 - final.cy) / H],
      lacet: 0.18 * Math.sin(tf * 0.45) + derive(tf, 21) * 0.03,
      tangage: 0.06 + derive(tf, 22) * 0.02,
      roulis: 0,
    };
    const arrivee = seg(tf, k.debut, k.pose + 0.4, E.out3);
    libre.boite[1] *= lerp(2.2, 1, arrivee);
    const s = seg(tf, k.montee, k.fixe - 0.12, E.inout3);
    const mix = (a, b) => (Array.isArray(a) ? a.map((x, i) => lerp(x, b[i], s)) : lerp(a, b, s));
    const c = {};
    for (const cle of Object.keys(finalCam)) c[cle] = mix(libre[cle], finalCam[cle]);
    return c;
  }

  /* ════════════════════════ ORCHESTRATION ════════════════════════════ */
  const plans = [
    { n: 1, poser: poser1, camera: camera1 },
    { n: 2, poser: poser2, camera: camera2 },
    { n: 3, poser: poser3, camera: camera3 },
    { n: 4, poser: poser4, camera: camera4 },
    { n: 5, poser: poser5, camera: camera5 },
    { n: 6, poser: poser6, camera: camera6 },
    { n: 7, poser: poser7, camera: camera7 },
  ].filter((p) => K[p.n]);

  // transitions par la matière : les plaques balaient l'écran
  const rideaux = [[K[1].fin - 0.45, K[1].fin + 0.32, 1]];
  if (K[5] && K[6]) rideaux.push([K[5].fin - 0.38, K[5].fin + 0.36, -1]);
  if (!K[2]) rideaux.push([K[1].fin - 0.45, K[1].fin + 0.32, 1]);

  function courant(t) {
    let c = plans[0];
    for (const p of plans) if (t >= K[p.n].debut) c = p;
    return c;
  }

  let derniereCamera = null;
  function poser(t) {
    for (const g of objets) g.visible = false;
    for (const e of etiquettes) e.a = 0;
    monde.halo.principal.material.opacity = 0;
    monde.halo.second.material.opacity = 0;
    monde.source.intensity = 0;
    monde.sol.material.uniforms.uAllume.value = 0.35;
    monde.sol.material.uniforms.uAnneau.value = 0;
    monde.sol.position.y = P && K[2] && t > K[2].debut - 0.2 && t < K[2].fin + 0.1 ? -8.6 : SOL_Y;
    const fl = monde.flux.material.uniforms;
    fl.uLiens.value = 0;
    fl.uAspiration.value = K[2] ? seg(t, K[2].aspiration, K[2].fin, E.in2) * (t < K[2].fin + 0.05 ? 1 : 0) : 0;
    fl.uPoint.value.set(...(K[2] ? pos2[2] : [0, 0, 0])).add(new THREE.Vector3(0, 0, 1.5));
    const tFige = K[7] ? Math.min(t, K[7].fixe - 0.12) : t;
    fl.uTemps.value = tFige;
    fl.uIntensite.value = 0.55;
    fl.uEchelle.value = H / 1080;
    const c = courant(t);
    const cam = c.camera(t);
    cadrer(monde, cam);
    camera.updateMatrixWorld(true);
    derniereCamera = cam;
    for (const p of plans) p.poser(t);
    // rideaux
    let rv = false;
    for (const [a, b, sens] of rideaux) {
      if (t >= a && t <= b) {
        poserRideau(rideau, camera, monde.aspect, prog(t, a, b), sens);
        rv = true;
      }
    }
    if (!rv) rideau.children.forEach((m) => (m.visible = false));
    rideau.visible = rv;
    majBokeh(monde, tFige, t < K[1].impact ? 0 : 0.3);
    camera.updateMatrixWorld(true);
    for (const e of etiquettes) {
      if (e.a <= 0) e.el.style.opacity = 0;
      else e.el.style.opacity = 1;
    }
    // positionner les étiquettes demande la caméra à jour : on rejoue les plans
    // qui en ont (coût négligeable : ce sont des projections)
  }

  /** Durée d'obturation (flou de mouvement) à l'instant t. */
  function obturation(t) {
    let o = derniereCamera?.obturation ?? 0;
    for (const [a, b] of rideaux) if (t >= a && t <= b) o = Math.max(o, 0.025);
    if (t >= K[1].impact && t < K[1].impact + 0.12) o = Math.max(o, 0.012);
    return o;
  }

  return { poser, obturation, plans, final };
}

/* ── Le logo officiel en DOM : tracés exacts + lettrage extrait du fichier de
   marque (masque alpha), dans la variante sombre du site. Proportions
   mesurées sur public/Logo_Stackup-Agency.png : ruban 144 × 226, lettrage
   décalé de 0,336 × la hauteur du ruban, haut à 0,195, hauteur 0,796. */
export function creerLockup(parent, largeur, cx, cy) {
  const Hr = largeur / 3.898;
  const el = document.createElement("div");
  el.className = "lockup";
  el.style.width = `${largeur}px`;
  el.style.height = `${Hr}px`;
  el.style.left = `${cx - largeur / 2}px`;
  el.style.top = `${cy - Hr / 2}px`;
  const wR = (Hr * 145) / 227;
  el.innerHTML = `<svg viewBox="0 1 145 227" width="${wR}" height="${Hr}" preserveAspectRatio="none" aria-hidden="true">
      <path d="M87 148 L144 171 L144 173 L1 228 L1 181 Z" fill="#F69106"/>
      <path d="M144 1 L144 49 L50 88 L145 125 L144 171 L87 148 L1 115 L0 68 L4 60 Z" fill="#F5F3EE"/>
    </svg><div class="mot"></div>`;
  const mot = el.querySelector(".mot");
  const hm = 0.796 * Hr;
  mot.style.left = `${0.973 * Hr}px`;
  mot.style.top = `${0.195 * Hr}px`;
  mot.style.height = `${hm}px`;
  mot.style.width = `${(hm * 665) / 181}px`;
  parent.appendChild(el);
  return el;
}

/** Dévoile un élément sous un balayage ambre, le fait vivre, puis le recouvre. */
function barreSur(tl, el, debut, fin) {
  const barre = document.createElement("div");
  barre.style.cssText = "position:absolute;left:-4%;top:-12%;width:108%;height:124%;background:#F69106;transform:scaleX(0);transform-origin:0 50%";
  el.appendChild(barre);
  el.style.clipPath = "inset(-20% -10% -20% -10%)";
  const contenu = [...el.children].filter((c) => c !== barre);
  contenu.forEach((c) => (c.style.visibility = "hidden"));
  tl.set(el, { opacity: 1 }, debut - 0.01);
  tl.fromTo(barre, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.2, ease: "power3.in" }, debut);
  contenu.forEach((c) => tl.set(c, { visibility: "visible" }, debut + 0.2));
  tl.set(barre, { transformOrigin: "100% 50%" }, debut + 0.2);
  tl.to(barre, { scaleX: 0, duration: 0.26, ease: "power3.out" }, debut + 0.21);
  tl.fromTo(el, { scale: 0.98 }, { scale: 1.03, duration: fin - debut, ease: "none" }, debut);
  tl.set(barre, { transformOrigin: "0% 50%" }, fin - 0.22);
  tl.to(barre, { scaleX: 1, duration: 0.16, ease: "power3.in" }, fin - 0.22);
  contenu.forEach((c) => tl.set(c, { visibility: "hidden" }, fin - 0.06));
  tl.set(barre, { transformOrigin: "100% 50%" }, fin - 0.06);
  tl.to(barre, { scaleX: 0, duration: 0.16, ease: "power3.out" }, fin - 0.05);
  tl.set(el, { opacity: 0 }, fin + 0.12);
}
