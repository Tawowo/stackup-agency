/**
 * LES ÉCRANS — interfaces dessinées en canvas 2D, puis plaquées sur les
 * plaques 3D comme textures. Chaque écran est une fonction du temps (défilement,
 * panier qui se remplit, cadrans qui tournent) : rien n'est une capture figée,
 * sauf la photo du site Au Pain Doré, reprise des réalisations du site.
 *
 * Chaque écran sait se dessiner en paysage (bureau) ou en portrait (mobile).
 */
import { clamp, prog, E, seg, lerp, alea } from "./outils.js";

export const COUL = {
  ivoire: "#FFFDF9",
  creme: "#F6F2EA",
  navy: "#1E3A5F",
  navyLogo: "#0D2C4C",
  encre: "#0C1626",
  nuit: "#0B1E36",
  nuit2: "#102A4A",
  ambre: "#F69106",
  or: "#F59E0B",
  orTexte: "#B45309",
  ardoise: "#64748B",
  ardoiseClair: "#94A3B8",
  ligne: "rgba(30,58,95,0.12)",
  vert: "#047857",
};

export const POL = {
  titre: (px, w = 700) => `${w} ${px}px Poppins`,
  texte: (px, w = 400) => `${w} ${px}px Inter`,
  mono: (px, w = 500) => `${w} ${px}px "JetBrains Mono"`,
  vieux: (px, w = 400) => `${w} ${px}px "Times New Roman", "DejaVu Serif", serif`,
};

// ------------------------------------------------------------ primitives

export function rr(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function boite(c, x, y, w, h, { fond, r = 0, trait, epaisseur = 2, ombre } = {}) {
  if (ombre) {
    c.save();
    c.shadowColor = ombre;
    c.shadowBlur = 30;
    c.shadowOffsetY = 10;
  }
  rr(c, x, y, w, h, r);
  if (fond) {
    c.fillStyle = fond;
    c.fill();
  }
  if (ombre) c.restore();
  if (trait) {
    rr(c, x, y, w, h, r);
    c.strokeStyle = trait;
    c.lineWidth = epaisseur;
    c.stroke();
  }
}

function texte(c, s, x, y, { font, coul = COUL.encre, align = "left", base = "alphabetic", max } = {}) {
  c.font = font;
  c.fillStyle = coul;
  c.textAlign = align;
  c.textBaseline = base;
  if (max) c.fillText(s, x, y, max);
  else c.fillText(s, x, y);
}

/** Texte sur plusieurs lignes, coupé aux mots. Renvoie la hauteur utilisée. */
function paragraphe(c, s, x, y, largeur, interligne, opts) {
  c.font = opts.font;
  const mots = s.split(" ");
  let ligne = "";
  let n = 0;
  for (const m of mots) {
    const essai = ligne ? ligne + " " + m : m;
    if (c.measureText(essai).width > largeur && ligne) {
      texte(c, ligne, x, y + n * interligne, opts);
      ligne = m;
      n++;
    } else ligne = essai;
  }
  if (ligne) texte(c, ligne, x, y + n * interligne, opts);
  return (n + 1) * interligne;
}

/** Dessine une image en mode « cover » dans un rectangle, avec point focal. */
function couverture(c, img, x, y, w, h, fx = 0.5, fy = 0.5, zoom = 1) {
  const r = Math.max(w / img.width, h / img.height) * zoom;
  const sw = w / r, sh = h / r;
  const sx = clamp(fx * img.width - sw / 2, 0, img.width - sw);
  const sy = clamp(fy * img.height - sh / 2, 0, img.height - sh);
  c.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function chrome(c, W, url, { sombre = false, h = 64, croix = false } = {}) {
  c.fillStyle = sombre ? "#1B2433" : "#E9E6E0";
  c.fillRect(0, 0, W, h);
  const cy = h / 2;
  ["#EF6B5E", "#F4BE4F", "#61C454"].forEach((col, i) => {
    c.beginPath();
    c.arc(30 + i * 26, cy, 8, 0, Math.PI * 2);
    c.fillStyle = col;
    c.fill();
  });
  boite(c, 130, cy - 18, W - 260, 36, { fond: sombre ? "#2A3445" : "#FFFFFF", r: 18 });
  texte(c, url, 158, cy + 7, { font: POL.mono(18), coul: sombre ? "#B8C2D3" : COUL.ardoise });
  if (croix) {
    c.strokeStyle = sombre ? "#B8C2D3" : "#5B6472";
    c.lineWidth = 3;
    const x = W - 50;
    c.beginPath();
    c.moveTo(x - 10, cy - 10);
    c.lineTo(x + 10, cy + 10);
    c.moveTo(x + 10, cy - 10);
    c.lineTo(x - 10, cy + 10);
    c.stroke();
  }
  return h;
}

function curseurFleche(c, x, y, echelle = 1.6) {
  c.save();
  c.translate(x, y);
  c.scale(echelle, echelle);
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(0, 26);
  c.lineTo(7, 20);
  c.lineTo(12, 31);
  c.lineTo(17, 29);
  c.lineTo(12, 18);
  c.lineTo(21, 18);
  c.closePath();
  c.fillStyle = "#111";
  c.fill();
  c.strokeStyle = "#fff";
  c.lineWidth = 2;
  c.stroke();
  c.restore();
}

function doigt(c, x, y, presse = 0, echelle = 1) {
  c.save();
  c.translate(x, y);
  c.scale(echelle, echelle);
  // onde du toucher
  if (presse > 0 && presse < 1) {
    c.beginPath();
    c.arc(0, 0, 20 + 60 * presse, 0, Math.PI * 2);
    c.strokeStyle = `rgba(246,145,6,${0.8 * (1 - presse)})`;
    c.lineWidth = 6;
    c.stroke();
  }
  c.beginPath();
  c.arc(0, 0, 26, 0, Math.PI * 2);
  c.fillStyle = "rgba(255,253,249,0.85)";
  c.fill();
  c.lineWidth = 4;
  c.strokeStyle = COUL.ambre;
  c.stroke();
  c.restore();
}

/** Chiffres en cadran : chaque chiffre défile verticalement vers sa valeur. */
function cadran(c, valeur, x, y, { font, coul, hauteur, progres, largeurChiffre, align = "left", tours = 2 }) {
  const s = String(valeur);
  c.save();
  c.font = font;
  c.textBaseline = "alphabetic";
  const lw = largeurChiffre ?? c.measureText("0").width * 1.02;
  let total = 0;
  for (const ch of s) total += /\d/.test(ch) ? lw : c.measureText(ch).width;
  let cx = align === "right" ? x - total : align === "center" ? x - total / 2 : x;
  const chiffres = [...s].filter((ch) => /\d/.test(ch)).length;
  let k = 0;
  for (const ch of s) {
    if (!/\d/.test(ch)) {
      texte(c, ch, cx, y, { font, coul });
      cx += c.measureText(ch).width;
      continue;
    }
    const cible = Number(ch);
    // les chiffres de droite tournent plus longtemps
    const p = E.out4(clamp(progres * (1 + 0.35 * (chiffres - 1 - k)) - 0.0, 0, 1) ** 0.9);
    const position = (cible + 10 * tours) * p; // tours complets puis arrêt
    const base = Math.floor(position);
    const frac = position - base;
    c.save();
    c.beginPath();
    c.rect(cx - 4, y - hauteur * 0.86, lw + 8, hauteur * 1.12);
    c.clip();
    for (let d = -1; d <= 1; d++) {
      const n = (((base + d) % 10) + 10) % 10;
      const dy = (d - frac) * hauteur;
      texte(c, String(n), cx + lw / 2, y + dy, { font, coul, align: "center" });
    }
    c.restore();
    cx += lw;
    k++;
  }
  c.restore();
}

// ------------------------------------------------------------- l'écran

export class Ecran {
  constructor(THREE, W, H, dessin) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = W;
    this.canvas.height = H;
    this.W = W;
    this.H = H;
    this.c = this.canvas.getContext("2d");
    this.dessin = dessin;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    this.tex.generateMipmaps = true;
    this.tex.minFilter = THREE.LinearMipmapLinearFilter;
    this.dernier = null;
  }
  /** Redessine si l'instant a changé (et seulement si l'écran est animé). */
  maj(t, force = false) {
    const cle = this.dessin.statique ? 0 : Math.round(t * 240) / 240;
    if (!force && cle === this.dernier) return;
    this.dernier = cle;
    this.c.save();
    this.dessin(this.c, this.W, this.H, t);
    this.c.restore();
    this.tex.needsUpdate = true;
  }
}

// ======================================================= les écrans du film

/* 1. LE SITE DATÉ — gris, centré, photo de banque d'images. Le « avant ». */
export function siteGris({ croix = false, curseur = null, minuteur = null } = {}) {
  const f = (c, W, H, t) => {
    const portrait = H > W;
    c.fillStyle = "#D9D9D9";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "www.mon-entreprise.fr/index.html", { croix });
    // bandeau
    const bh = portrait ? 150 : 130;
    const g = c.createLinearGradient(0, top, 0, top + bh);
    g.addColorStop(0, "#9AA3AD");
    g.addColorStop(1, "#7D8691");
    c.fillStyle = g;
    c.fillRect(0, top, W, bh);
    texte(c, "MON ENTREPRISE", W / 2, top + bh * 0.58, { font: POL.vieux(portrait ? 56 : 54, 700), coul: "#F2F2F2", align: "center" });
    texte(c, "Qualité · Sérieux · Professionnalisme", W / 2, top + bh * 0.86, { font: POL.vieux(24), coul: "#E2E2E2", align: "center" });
    // menu
    const my = top + bh;
    c.fillStyle = "#BDBDBD";
    c.fillRect(0, my, W, 54);
    const menu = portrait ? ["Accueil", "Services", "Contact"] : ["Accueil", "Qui sommes-nous ?", "Nos services", "Galerie", "Contact"];
    const pas = W / (menu.length + 1);
    menu.forEach((m, i) => {
      texte(c, m, pas * (i + 1), my + 35, { font: POL.vieux(24), coul: "#1A3C9E", align: "center" });
      c.fillStyle = "#1A3C9E";
      c.font = POL.vieux(24);
      const w = c.measureText(m).width;
      c.fillRect(pas * (i + 1) - w / 2, my + 39, w, 2);
    });
    // photo « banque d'images »
    const py = my + 80;
    const pw = portrait ? W - 120 : W * 0.56;
    const ph = portrait ? 520 : 380;
    const px = (W - pw) / 2;
    const gg = c.createLinearGradient(0, py, 0, py + ph);
    gg.addColorStop(0, "#B9C6D2");
    gg.addColorStop(1, "#8E9AA5");
    c.fillStyle = gg;
    c.fillRect(px, py, pw, ph);
    c.fillStyle = "#77818B";
    c.beginPath();
    c.moveTo(px, py + ph);
    c.lineTo(px + pw * 0.3, py + ph * 0.45);
    c.lineTo(px + pw * 0.48, py + ph * 0.7);
    c.lineTo(px + pw * 0.68, py + ph * 0.35);
    c.lineTo(px + pw, py + ph * 0.8);
    c.lineTo(px + pw, py + ph);
    c.closePath();
    c.fill();
    c.beginPath();
    c.arc(px + pw * 0.8, py + ph * 0.25, 34, 0, Math.PI * 2);
    c.fillStyle = "#D9DEE3";
    c.fill();
    texte(c, "© photo libre de droits", px + pw - 12, py + ph - 14, { font: POL.vieux(18), coul: "#EEE", align: "right" });
    // texte centré
    let y = py + ph + 64;
    texte(c, "Bienvenue sur notre site internet !", W / 2, y, { font: POL.vieux(38, 700), coul: "#333", align: "center", max: W - 80 });
    y += 46;
    const l = portrait ? W - 140 : W * 0.6;
    c.textAlign = "center";
    paragraphe(c, "Nous sommes une entreprise sérieuse à votre service depuis de nombreuses années. N'hésitez pas à nous contacter pour tout renseignement.", W / 2, y, l, 32, { font: POL.vieux(24), coul: "#555", align: "center" });
    // compteur de visites
    texte(c, "Vous êtes le visiteur n° 004217", W / 2, H - 40, { font: POL.vieux(20), coul: "#666", align: "center" });
    texte(c, "Dernière mise à jour : 12/03/2014", W / 2, H - 14, { font: POL.vieux(16), coul: "#777", align: "center" });
    if (minuteur) {
      const m = minuteur(t);
      if (m) {
        boite(c, 40, top + 24, 250, 70, { fond: "rgba(12,22,38,0.88)", r: 35 });
        texte(c, m, 165, top + 72, { font: POL.mono(38, 700), coul: "#FBBF24", align: "center" });
      }
    }
    if (curseur) {
      const p = curseur(t);
      if (p) curseurFleche(c, p.x * W, p.y * H, 1.8);
    }
  };
  f.statique = !curseur && !minuteur;
  return f;
}

/* 2. LA RECHERCHE — « plombier Tours », première page, sans vous. */
export function recherche() {
  const f = (c, W, H) => {
    const portrait = H > W;
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "recherche · plombier Tours");
    const m = portrait ? 50 : 120;
    const by = top + 50;
    boite(c, m, by, W - 2 * m, 74, { fond: "#fff", r: 37, trait: "#D5DAE1", epaisseur: 3 });
    // loupe
    c.strokeStyle = "#5F6B7A";
    c.lineWidth = 5;
    c.beginPath();
    c.arc(m + 46, by + 34, 14, 0, Math.PI * 2);
    c.moveTo(m + 56, by + 45);
    c.lineTo(m + 68, by + 57);
    c.stroke();
    texte(c, "plombier Tours", m + 90, by + 48, { font: POL.texte(30, 400), coul: "#1F2937" });
    texte(c, "Environ 1 240 000 résultats", m + 10, by + 120, { font: POL.texte(20), coul: "#70757A" });
    const res = [
      ["Plomberie Martin — dépannage 7j/7 à Tours", "plomberie-martin.fr", "Intervention rapide, devis gratuit, chauffe-eau, fuites…"],
      ["SOS Plomberie Touraine", "sos-plomberie-37.fr", "Plombier chauffagiste certifié. Urgence 24h/24."],
      ["Les meilleurs plombiers à Tours", "annuaire-artisans.fr", "Comparez les avis et les tarifs des plombiers de Tours."],
      ["Plombier Tours Nord — Atelier Durand", "atelier-durand.fr", "Rénovation de salle de bain, sanitaires, dépannage."],
      ["Chauffage & sanitaire — Tours Sud", "ts-chauffage.fr", "Entretien de chaudière, installation de pompe à chaleur."],
    ];
    let y = by + 190;
    const pasY = portrait ? 210 : 150;
    for (const [titre, url, desc] of res) {
      if (y > H - 120) break;
      texte(c, url, m + 10, y - 40, { font: POL.texte(19), coul: "#202124" });
      texte(c, titre, m + 10, y, { font: POL.texte(portrait ? 30 : 29, 600), coul: "#1A0DAB", max: W - 2 * m - 20 });
      paragraphe(c, desc, m + 10, y + 38, W - 2 * m - 20, 28, { font: POL.texte(21), coul: "#4D5156" });
      y += pasY;
    }
    // pagination
    const py = H - 60;
    const pages = ["1", "2", "3", "4", "Suivant ›"];
    let px = W / 2 - 200;
    pages.forEach((p, i) => {
      texte(c, p, px, py, { font: POL.texte(26, i === 0 ? 700 : 400), coul: i === 0 ? "#202124" : "#1A0DAB" });
      px += i === 3 ? 70 : 60;
    });
  };
  f.statique = true;
  return f;
}

/* 3. LE TABLEAU VIDE — un outil qui ne fait rien. */
export function tableauVide() {
  const f = (c, W, H) => {
    const portrait = H > W;
    c.fillStyle = "#E4E6EA";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "gestion.mon-entreprise.fr");
    const sb = portrait ? 0 : 260;
    if (!portrait) {
      c.fillStyle = "#B7BCC4";
      c.fillRect(0, top, sb, H - top);
      ["Tableau de bord", "Clients", "Devis", "Factures", "Planning"].forEach((m, i) =>
        boite(c, 30, top + 50 + i * 70, 200, 40, { fond: "#C9CDD3", r: 8 }),
      );
    }
    const x0 = sb + 40;
    const w = W - x0 - 40;
    texte(c, "Tableau de bord", x0, top + 70, { font: POL.texte(38, 700), coul: "#6B7280" });
    const n = portrait ? 2 : 3;
    const cw = (w - (n - 1) * 24) / n;
    for (let i = 0; i < n; i++) {
      boite(c, x0 + i * (cw + 24), top + 110, cw, 150, { fond: "#F3F4F6", r: 14, trait: "#CBD0D6" });
      texte(c, "—", x0 + i * (cw + 24) + 30, top + 210, { font: POL.texte(64, 700), coul: "#9CA3AF" });
    }
    const gy = top + 300;
    const gh = portrait ? 520 : H - gy - 60;
    boite(c, x0, gy, w, gh, { fond: "#F3F4F6", r: 14, trait: "#CBD0D6" });
    c.setLineDash([14, 12]);
    c.strokeStyle = "#B4BAC2";
    c.lineWidth = 3;
    c.strokeRect(x0 + 60, gy + 60, w - 120, gh - 120);
    c.setLineDash([]);
    texte(c, "Aucune donnée", x0 + w / 2, gy + gh / 2 + 12, { font: POL.texte(34, 600), coul: "#9CA3AF", align: "center" });
    if (portrait) {
      for (let i = 0; i < 5; i++) boite(c, 40, gy + gh + 40 + i * 70, W - 80, 46, { fond: "#EDEEF1", r: 8 });
    }
  };
  f.statique = true;
  return f;
}

/* 4. LE SITE D'ARTISAN — Au Pain Doré, qui défile tout seul. */
export function siteArtisan(img, defilement = () => 0) {
  return (c, W, H, t) => {
    const portrait = H > W;
    c.fillStyle = "#FBF4EA";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "aupaindore.fr");
    c.save();
    c.beginPath();
    c.rect(0, top, W, H - top);
    c.clip();
    const s = defilement(t); // 0 → 1
    const hauteurPage = portrait ? 3000 : 2050;
    const dy = -s * (hauteurPage - (H - top));
    c.translate(0, top + dy);
    if (!portrait) {
      // héros : la capture réelle du site (1200 × 559), mise à la largeur
      const hh = W * (img.height / img.width);
      c.drawImage(img, 0, 0, W, hh);
      let y = hh + 90;
      texte(c, "NOS SPÉCIALITÉS", 140, y, { font: POL.mono(22, 700), coul: "#C2872B" });
      texte(c, "Cuits chaque matin, ici.", 140, y + 64, { font: POL.vieux(54, 700), coul: "#2B1D10" });
      const cartes = [
        ["Pain de campagne", "Levain naturel", 0.62, 0.42, 2.2],
        ["Baguette tradition", "Farine Label Rouge", 0.7, 0.55, 2.8],
        ["Viennoiseries", "Pur beurre", 0.58, 0.6, 3.2],
      ];
      const cw = (W - 280 - 60) / 3;
      cartes.forEach(([n, d, fx, fy, z], i) => {
        const x = 140 + i * (cw + 30);
        const yy = y + 110;
        boite(c, x, yy, cw, 400, { fond: "#FFFFFF", r: 18, ombre: "rgba(80,50,20,0.12)" });
        c.save();
        rr(c, x, yy, cw, 260, 18);
        c.clip();
        couverture(c, img, x, yy, cw, 260, fx, fy, z);
        c.restore();
        texte(c, n, x + 26, yy + 316, { font: POL.vieux(32, 700), coul: "#2B1D10" });
        texte(c, d, x + 26, yy + 356, { font: POL.texte(21), coul: "#8A6B47" });
      });
      y += 600;
      boite(c, 140, y, W - 280, 240, { fond: "#2B1D10", r: 24 });
      texte(c, "Commandez la veille, retirez le matin.", 200, y + 100, { font: POL.vieux(44, 700), coul: "#FBF4EA" });
      boite(c, 200, y + 140, 300, 64, { fond: "#D9A441", r: 32 });
      texte(c, "Voir le catalogue", 350, y + 182, { font: POL.texte(24, 600), coul: "#2B1D10", align: "center" });
      texte(c, "Mar–Sam 6h30–19h30 · Dim 7h–13h", W - 200, y + 182, { font: POL.texte(24), coul: "#E8D5B5", align: "right" });
    } else {
      // version mobile : composition verticale
      const hh = 760;
      c.save();
      c.beginPath();
      c.rect(0, 0, W, hh);
      c.clip();
      couverture(c, img, 0, 0, W, hh, 0.66, 0.5, 1.0);
      c.restore();
      c.fillStyle = "rgba(251,244,234,0.0)";
      let y = hh + 80;
      texte(c, "DEPUIS 1962 — ANGERS", 60, y, { font: POL.mono(24, 700), coul: "#C2872B" });
      texte(c, "Boulangerie", 60, y + 90, { font: POL.vieux(78, 700), coul: "#2B1D10" });
      texte(c, "Artisanale", 60, y + 170, { font: POL.vieux(78, 700), coul: "#2B1D10" });
      paragraphe(c, "Trois générations de passion. Du levain naturel, de la farine française et des mains qui pétrissent depuis l'aube.", 60, y + 240, W - 120, 40, { font: POL.texte(28), coul: "#6B5236" });
      boite(c, 60, y + 400, W - 120, 92, { fond: "#D9A441", r: 46 });
      texte(c, "Voir notre catalogue", W / 2, y + 458, { font: POL.texte(32, 600), coul: "#2B1D10", align: "center" });
      y += 600;
      [[0.62, 0.42, 2.2, "Pain de campagne"], [0.7, 0.55, 2.8, "Baguette tradition"], [0.58, 0.6, 3.2, "Viennoiseries"]].forEach(([fx, fy, z, n], i) => {
        const yy = y + i * 470;
        boite(c, 60, yy, W - 120, 430, { fond: "#fff", r: 26, ombre: "rgba(80,50,20,0.12)" });
        c.save();
        rr(c, 60, yy, W - 120, 320, 26);
        c.clip();
        couverture(c, img, 60, yy, W - 120, 320, fx, fy, z);
        c.restore();
        texte(c, n, 96, yy + 386, { font: POL.vieux(40, 700), coul: "#2B1D10" });
      });
    }
    c.restore();
  };
}

/* 5. LA BOUTIQUE — le panier se remplit d'un « tic » par article. */
export function boutique(img, ajouts = []) {
  const produits = [
    ["Pain de campagne", "3,80 €", 0.62, 0.42, 2.2],
    ["Baguette tradition", "1,30 €", 0.7, 0.55, 2.8],
    ["Croissant", "1,20 €", 0.58, 0.6, 3.2],
    ["Pain aux céréales", "4,20 €", 0.55, 0.45, 2.5],
    ["Brioche", "6,50 €", 0.66, 0.38, 3.5],
    ["Fougasse", "3,90 €", 0.6, 0.5, 2.0],
  ];
  return (c, W, H, t) => {
    const portrait = H > W;
    c.fillStyle = "#FBF4EA";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "aupaindore.fr/boutique");
    // en-tête boutique
    c.fillStyle = "#2B1D10";
    c.fillRect(0, top, W, 96);
    texte(c, "Au Pain Doré", 50, top + 62, { font: POL.vieux(40, 700), coul: "#FBF4EA" });
    texte(c, "Click & collect", portrait ? 50 : 340, top + (portrait ? 86 : 60), { font: POL.mono(portrait ? 18 : 22, 700), coul: "#D9A441" });
    const n = ajouts.filter((a) => t >= a).length;
    // panier
    const px = W - 90, py = top + 48;
    c.strokeStyle = "#FBF4EA";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(px - 30, py - 18);
    c.lineTo(px - 22, py - 18);
    c.lineTo(px - 14, py + 14);
    c.lineTo(px + 18, py + 14);
    c.lineTo(px + 24, py - 8);
    c.lineTo(px - 18, py - 8);
    c.stroke();
    if (n > 0) {
      const dernier = ajouts[n - 1];
      const pop = 1 + 0.5 * Math.exp(-(t - dernier) * 14);
      c.save();
      c.translate(px + 22, py - 20);
      c.scale(pop, pop);
      c.beginPath();
      c.arc(0, 0, 17, 0, Math.PI * 2);
      c.fillStyle = COUL.ambre;
      c.fill();
      texte(c, String(n), 0, 7, { font: POL.texte(21, 700), coul: "#fff", align: "center" });
      c.restore();
    }
    const cols = portrait ? 2 : 3;
    const m = portrait ? 40 : 60;
    const gx = (W - 2 * m - (cols - 1) * 26) / cols;
    const gy = portrait ? 520 : 360;
    const y0 = top + 96 + (portrait ? 40 : 36);
    produits.forEach(([nom, prix, fx, fy, z], i) => {
      const col = i % cols, lig = Math.floor(i / cols);
      const x = m + col * (gx + 26);
      const y = y0 + lig * (gy + 26);
      if (y > H) return;
      boite(c, x, y, gx, gy, { fond: "#fff", r: 18, ombre: "rgba(80,50,20,0.1)" });
      c.save();
      rr(c, x, y, gx, gy * 0.56, 18);
      c.clip();
      couverture(c, img, x, y, gx, gy * 0.56, fx, fy, z);
      c.restore();
      texte(c, nom, x + 22, y + gy * 0.56 + 52, { font: POL.vieux(portrait ? 34 : 30, 700), coul: "#2B1D10", max: gx - 44 });
      texte(c, prix, x + 22, y + gy - 34, { font: POL.mono(portrait ? 30 : 27, 700), coul: "#8A6B47" });
      // bouton « Ajouter » — pressé au moment où l'article part au panier
      const k = [0, 4, 2].indexOf(i);
      const a = k >= 0 ? ajouts[k] : null;
      const presse = a != null && t >= a - 0.12 && t < a + 0.25;
      const fait = a != null && t >= a;
      const bw = portrait ? 150 : 150, bh = 52;
      boite(c, x + gx - bw - 20, y + gy - bh - 18, bw, bh, { fond: fait ? COUL.ambre : presse ? "#F4C77E" : "#2B1D10", r: 26 });
      texte(c, fait ? "Ajouté ✓" : "Ajouter", x + gx - bw / 2 - 20, y + gy - 34, { font: POL.texte(22, 600), coul: "#fff", align: "center" });
      // la petite plaque qui vole vers le panier
      if (a != null && t >= a && t < a + 0.35) {
        const s = E.inout2(prog(t, a, a + 0.35));
        const sx = x + gx - bw / 2 - 20, sy = y + gy - 40;
        const fx2 = lerp(sx, px, s), fy2 = lerp(sy, py, s) - Math.sin(s * Math.PI) * 140;
        boite(c, fx2 - 18, fy2 - 18, 36, 36, { fond: COUL.ambre, r: 6 });
      }
    });
  };
}

/* 6. L'OUTIL — planning, devis, chiffres en cadran, graphique tracé. */
export function outil(debut) {
  const r = alea(7);
  const blocs = [];
  for (let j = 0; j < 5; j++) for (let h = 0; h < 2; h++) if (r() > 0.25) blocs.push({ j, h, l: 1 + Math.floor(r() * 2), coul: r() > 0.5 ? COUL.ambre : COUL.navy });
  const noms = ["Chantier Dupont", "Devis Lefèvre", "Pose cuisine", "Dépannage", "RDV Morel", "Livraison", "Visite Roy", "Finitions"];
  return (c, W, H, t) => {
    const portrait = H > W;
    const tt = t - debut;
    c.fillStyle = "#F4F1EA";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "outil.atelier-martin.fr", { sombre: true });
    const sb = portrait ? 0 : 250;
    if (!portrait) {
      c.fillStyle = COUL.navyLogo;
      c.fillRect(0, top, sb, H - top);
      texte(c, "Atelier Martin", 30, top + 60, { font: POL.titre(26), coul: "#FFFDF9" });
      ["Tableau de bord", "Planning", "Devis", "Clients", "Factures"].forEach((m, i) => {
        if (i === 0) boite(c, 18, top + 100 + i * 64, sb - 36, 48, { fond: "rgba(246,145,6,0.18)", r: 10 });
        texte(c, m, 36, top + 132 + i * 64, { font: POL.texte(22, i === 0 ? 700 : 400), coul: i === 0 ? "#FBBF24" : "#C7D2E0" });
      });
    }
    const x0 = sb + 36, w = W - x0 - 36;
    texte(c, "Bonjour Julien", x0, top + 64, { font: POL.titre(portrait ? 46 : 38), coul: COUL.encre });
    texte(c, "SEMAINE 42", x0 + w, top + 60, { font: POL.mono(22, 700), coul: COUL.orTexte, align: "right" });
    // KPI en cadran
    const kpis = [
      ["DEVIS DU MOIS", "24"],
      ["CHIFFRE DU MOIS", "18 450 €"],
      ["INTERVENTIONS", "37"],
    ];
    const n = portrait ? 1 : 3;
    const kh = portrait ? 150 : 150;
    const kw = (w - (n - 1) * 22) / n;
    kpis.forEach(([lab, val], i) => {
      const x = x0 + (portrait ? 0 : i * (kw + 22));
      const y = top + 100 + (portrait ? i * (kh + 18) : 0);
      boite(c, x, y, kw, kh, { fond: "#fff", r: 16, ombre: "rgba(30,58,95,0.10)" });
      texte(c, lab, x + 24, y + 42, { font: POL.mono(19, 700), coul: COUL.ardoise });
      cadran(c, val, x + 24, y + 116, { font: POL.titre(58), coul: i === 1 ? COUL.orTexte : COUL.encre, hauteur: 66, progres: prog(tt, 0.35 + i * 0.12, 1.45 + i * 0.12) });
    });
    // planning
    const py = top + 100 + (portrait ? 3 * (kh + 18) + 10 : kh + 30);
    const ph = portrait ? 520 : 330;
    const pw = portrait ? w : w * 0.58;
    boite(c, x0, py, pw, ph, { fond: "#fff", r: 16, ombre: "rgba(30,58,95,0.10)" });
    texte(c, "PLANNING", x0 + 24, py + 42, { font: POL.mono(19, 700), coul: COUL.ardoise });
    const jours = ["LUN", "MAR", "MER", "JEU", "VEN"];
    const colw = (pw - 48) / 5;
    jours.forEach((j, i) => texte(c, j, x0 + 24 + i * colw + 8, py + 82, { font: POL.mono(18, 700), coul: COUL.ardoiseClair }));
    const lh = (ph - 120) / 2;
    blocs.forEach((b, i) => {
      const s = E.out3(prog(tt, 0.15 + i * 0.07, 0.45 + i * 0.07));
      if (s <= 0) return;
      const bx = x0 + 24 + b.j * colw + 6, by = py + 100 + b.h * lh + 6;
      const bw = colw - 12, bh = lh * Math.min(1, b.l * 0.6) - 12;
      c.save();
      c.globalAlpha = 1;
      boite(c, bx, by, bw * s, bh, { fond: b.coul === COUL.ambre ? "rgba(246,145,6,0.85)" : "rgba(30,58,95,0.9)", r: 8 });
      if (s > 0.9) texte(c, noms[i % noms.length], bx + 10, by + 30, { font: POL.texte(15, 600), coul: "#fff", max: bw - 16 });
      c.restore();
    });
    // devis / graphique
    const gx = portrait ? x0 : x0 + pw + 22;
    const gy = portrait ? py + ph + 22 : py;
    const gw = portrait ? w : w - pw - 22;
    const gh = portrait ? H - gy - 40 : ph;
    boite(c, gx, gy, gw, gh, { fond: "#fff", r: 16, ombre: "rgba(30,58,95,0.10)" });
    texte(c, "CHIFFRE D'AFFAIRES", gx + 24, gy + 42, { font: POL.mono(19, 700), coul: COUL.ardoise });
    const pts = [0.2, 0.32, 0.28, 0.45, 0.42, 0.58, 0.55, 0.72, 0.68, 0.86];
    const s = E.inout2(prog(tt, 0.5, 1.6));
    const ax = gx + 30, ay = gy + gh - 40, aw = gw - 60, ah = gh - 120;
    c.strokeStyle = "rgba(30,58,95,0.12)";
    c.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      c.beginPath();
      c.moveTo(ax, ay - (ah * i) / 3);
      c.lineTo(ax + aw, ay - (ah * i) / 3);
      c.stroke();
    }
    const nPts = 1 + s * (pts.length - 1);
    c.beginPath();
    for (let i = 0; i < Math.ceil(nPts); i++) {
      const f = Math.min(1, nPts - i);
      const xi = ax + (aw * Math.min(i, nPts - 1)) / (pts.length - 1);
      const yi = i === 0 ? pts[0] : lerp(pts[i - 1], pts[i], f);
      const yy = ay - ah * yi;
      if (i === 0) c.moveTo(ax, ay - ah * pts[0]);
      else c.lineTo(ax + (aw * (i - 1 + f)) / (pts.length - 1), yy);
    }
    c.strokeStyle = COUL.ambre;
    c.lineWidth = 6;
    c.lineJoin = "round";
    c.stroke();
    if (s > 0) {
      const xe = ax + (aw * (nPts - 1)) / (pts.length - 1);
      const ie = Math.min(pts.length - 1, Math.floor(nPts - 1));
      const fe = nPts - 1 - ie;
      const ye = ay - ah * (ie + 1 < pts.length ? lerp(pts[ie], pts[ie + 1], fe) : pts[ie]);
      c.beginPath();
      c.arc(xe, ye, 10, 0, Math.PI * 2);
      c.fillStyle = COUL.ambre;
      c.fill();
    }
  };
}

/* 7. LES CINQ COUCHES d'un site (vue éclatée). */
export function couche(i) {
  const titres = ["DESIGN", "CONTENU", "CODE", "DONNÉES", "HÉBERGEMENT"];
  const f = (c, W, H) => {
    c.clearRect(0, 0, W, H);
    const fonds = ["rgba(255,253,249,0.96)", "rgba(255,253,249,0.94)", "rgba(12,22,38,0.95)", "rgba(16,42,74,0.95)", "rgba(30,58,95,0.95)"];
    boite(c, 4, 4, W - 8, H - 8, { fond: fonds[i], r: 26, trait: i < 2 ? "rgba(30,58,95,0.25)" : "rgba(255,253,249,0.35)", epaisseur: 4 });
    const clair = i >= 2;
    const enc = clair ? "#FFFDF9" : COUL.encre;
    texte(c, `0${i + 1} — ${titres[i]}`, 50, 76, { font: POL.mono(38, 700), coul: COUL.ambre });
    if (i === 0) {
      ["#0D2C4C", "#F69106", "#FFFDF9", "#64748B", "#1E3A5F"].forEach((col, k) => boite(c, 50 + k * 110, 130, 90, 90, { fond: col, r: 14, trait: "rgba(0,0,0,0.15)" }));
      texte(c, "Aa", 640, 225, { font: POL.titre(120), coul: COUL.navy });
      c.strokeStyle = "rgba(246,145,6,0.6)";
      c.lineWidth = 3;
      for (let k = 0; k < 6; k++) c.strokeRect(50 + k * ((W - 100) / 6), 280, (W - 100) / 6 - 16, H - 330);
    } else if (i === 1) {
      boite(c, 50, 130, W * 0.4, H - 190, { fond: "#E8DCC8", r: 18 });
      for (let k = 0; k < 7; k++) boite(c, W * 0.45 + 30, 140 + k * 70, (W * 0.5 - 60) * (k % 3 === 2 ? 0.6 : 1), 30, { fond: k === 0 ? COUL.navy : "rgba(30,58,95,0.25)", r: 8 });
    } else if (i === 2) {
      const lignes = ['<header class="hero">', '  <h1>Boulangerie artisanale</h1>', '  <a href="/catalogue">Commander</a>', "</header>", "const panier = useCart();", "export default function Accueil() {", "  return <Catalogue produits={pains} />"];
      lignes.forEach((l, k) => texte(c, l, 60, 160 + k * 62, { font: POL.mono(36), coul: k % 3 === 1 ? "#FBBF24" : "#7DB3EA" }));
    } else if (i === 3) {
      for (let r2 = 0; r2 < 6; r2++)
        for (let k = 0; k < 4; k++)
          boite(c, 60 + k * ((W - 120) / 4), 140 + r2 * 72, (W - 120) / 4 - 12, 56, { fond: r2 === 0 ? "rgba(246,145,6,0.85)" : "rgba(255,253,249,0.14)", r: 8 });
    } else {
      for (let k = 0; k < 4; k++) {
        boite(c, 60, 140 + k * 100, W * 0.45, 76, { fond: "rgba(255,253,249,0.12)", r: 12, trait: "rgba(255,253,249,0.3)" });
        c.beginPath();
        c.arc(100, 178 + k * 100, 10, 0, Math.PI * 2);
        c.fillStyle = "#10B981";
        c.fill();
      }
      c.beginPath();
      c.arc(W * 0.75, H * 0.55, 170, 0, Math.PI * 2);
      c.strokeStyle = "#7DB3EA";
      c.lineWidth = 5;
      c.stroke();
      c.beginPath();
      c.ellipse(W * 0.75, H * 0.55, 80, 170, 0, 0, Math.PI * 2);
      c.moveTo(W * 0.75 - 170, H * 0.55);
      c.lineTo(W * 0.75 + 170, H * 0.55);
      c.stroke();
      texte(c, "https ✓", W * 0.75, H * 0.55 + 240, { font: POL.mono(40, 700), coul: "#10B981", align: "center" });
    }
    void enc;
  };
  f.statique = true;
  return f;
}

/* 8. LA RECHERCHE ET L'ASSISTANT IA qui cite Stackup. */
export function rechercheIA(k) {
  const question = "Qui crée des sites sur mesure près de Tours ?";
  return (c, W, H, t) => {
    const portrait = H > W;
    c.fillStyle = "#FFFDF9";
    c.fillRect(0, 0, W, H);
    const top = chrome(c, W, "assistant · recherche");
    const m = portrait ? 40 : 70;
    // la question se tape
    const by = top + 34;
    const fq = portrait ? 40 : 44;
    boite(c, m, by, W - 2 * m, fq * 2.3, { fond: "#fff", r: fq * 1.15, trait: "#D5DAE1", epaisseur: 3 });
    const n = Math.floor(question.length * E.out2(prog(t, k.ia, k.ia + 0.9)));
    const qTxt = question.slice(0, n) + (t < k.ia + 1.0 && Math.floor(t * 4) % 2 === 0 ? "|" : "");
    if (portrait) paragraphe(c, qTxt, m + 34, by + fq * 1.45, W - 2 * m - 60, fq * 1.2, { font: POL.texte(fq - 6, 600), coul: COUL.encre });
    else texte(c, qTxt, m + 40, by + fq * 1.5, { font: POL.texte(fq, 600), coul: COUL.encre, max: W - 2 * m - 80 });
    // la bulle de l'assistant, qui cite Stackup
    const sb = E.pose(prog(t, k.bulle - 0.35, k.bulle + 0.15));
    if (sb > 0) {
      const bx = m, bw = W - 2 * m;
      const yb = by + fq * 2.3 + 34 + (1 - sb) * 60;
      const bh = H - yb - 30;
      c.save();
      c.globalAlpha = Math.min(1, sb * 1.5);
      boite(c, bx, yb, bw, bh, { fond: "#EEF3F9", r: 28, trait: "rgba(30,58,95,0.15)" });
      c.beginPath();
      c.arc(bx + 60, yb + 64, 30, 0, Math.PI * 2);
      c.fillStyle = COUL.navy;
      c.fill();
      texte(c, "IA", bx + 60, yb + 75, { font: POL.mono(26, 700), coul: "#FFFDF9", align: "center" });
      texte(c, "Assistant", bx + 108, yb + 76, { font: POL.texte(30, 600), coul: COUL.ardoise });
      const fs = portrait ? 58 : 80;
      const lignes = portrait
        ? ["Par exemple,", "Stackup Agency,", "à Tours, conçoit", "des sites et des", "outils sur mesure."]
        : ["Par exemple,", "Stackup Agency, à Tours :", "sites et outils sur mesure."];
      const total = lignes.join(" ").length;
      const visibles = Math.floor(total * E.lin(prog(t, k.bulle - 0.1, k.bulle + 1.0)));
      let compte = 0;
      lignes.forEach((l, i) => {
        const y = yb + 110 + fs * 1.2 + i * (fs * 1.28);
        const part = l.slice(0, Math.max(0, visibles - compte));
        compte += l.length + 1;
        c.font = POL.texte(fs, 600);
        const idx = l.indexOf("Stackup Agency");
        if (idx >= 0 && part.length > idx) {
          const x1 = bx + 50 + c.measureText(l.slice(0, idx)).width;
          const w1 = c.measureText(l.slice(idx, Math.min(part.length, idx + 14))).width;
          boite(c, x1 - 8, y - fs * 0.95, w1 + 16, fs * 1.3, { fond: "rgba(246,145,6,0.3)", r: 10 });
        }
        texte(c, part, bx + 50, y, { font: POL.texte(fs, 600), coul: COUL.encre });
        if (idx >= 0 && part.length > idx) {
          const x1 = bx + 50 + c.measureText(l.slice(0, idx)).width;
          texte(c, l.slice(idx, Math.min(part.length, idx + 14)), x1, y, { font: POL.texte(fs, 700), coul: COUL.orTexte });
        }
      });
      c.restore();
    }
  };
}

/* 9. L'ESTIMATEUR — reconstitué d'après le configurateur du site. */
export function estimateur(k, config) {
  const choix = config.estimateur.choix;
  const etapes = config.estimateur.etapes;
  const prix = config.prixVitrine;
  return (c, W, H, t) => {
    const portrait = H > W;
    c.fillStyle = "#FFFDF9";
    c.fillRect(0, 0, W, H);
    // progression
    const etape = t < k.assemblage + 0.4 ? 0 : t < k.cadran ? 1 : 3;
    const eh = 86;
    etapes.forEach((e, i) => {
      const w = W / etapes.length;
      c.fillStyle = i === etape ? "#FFFFFF" : "#F6F2EA";
      c.fillRect(i * w, 0, w, eh);
      if (i === etape) {
        c.fillStyle = COUL.or;
        c.fillRect(i * w, eh - 5, w, 5);
      }
      texte(c, `0${i + 1}`, i * w + 22, 36, { font: POL.mono(portrait ? 18 : 18, 700), coul: i === etape ? COUL.orTexte : COUL.ardoise });
      texte(c, portrait ? e.split(" ").slice(-1)[0].toUpperCase() : e.toUpperCase(), i * w + 22, 68, { font: POL.mono(portrait ? 17 : 19, 700), coul: i === etape ? COUL.encre : COUL.ardoise, max: w - 30 });
    });
    const m = portrait ? 50 : 80;
    let y = eh + (portrait ? 90 : 90);
    if (etape === 0) {
      texte(c, "Quel est votre projet ?", m, y, { font: POL.titre(portrait ? 56 : 54), coul: COUL.encre });
      y += 50;
      const n = choix.length;
      const cw = portrait ? W - 2 * m : (W - 2 * m - 2 * 26) / 3;
      const ch = portrait ? 200 : 300;
      choix.forEach((ch2, i) => {
        const x = portrait ? m : m + i * (cw + 26);
        const yy = portrait ? y + i * (ch + 24) : y;
        const sel = i === 0 && t >= k.toucher;
        boite(c, x, yy, cw, ch, { fond: sel ? "#FFF7EA" : "#FFFFFF", r: 18, trait: sel ? COUL.or : "rgba(30,58,95,0.15)", epaisseur: sel ? 6 : 3 });
        // pictogramme : une petite pile de plaques
        for (let p = 0; p < 3; p++) boite(c, x + 30, yy + 40 + p * 22, 90, 16, { fond: p === 2 ? COUL.ambre : COUL.navy, r: 4 });
        paragraphe(c, ch2, x + 30, yy + (portrait ? 150 : 190), cw - 60, 40, { font: POL.titre(portrait ? 36 : 32, 600), coul: COUL.encre });
        if (sel) {
          c.beginPath();
          c.arc(x + cw - 40, yy + 40, 18, 0, Math.PI * 2);
          c.fillStyle = COUL.or;
          c.fill();
          texte(c, "✓", x + cw - 40, yy + 49, { font: POL.texte(24, 700), coul: "#fff", align: "center" });
        }
        void n;
      });
      // le doigt qui touche
      const xd = portrait ? m + cw * 0.7 : m + cw * 0.6;
      const yd = portrait ? y + ch * 0.6 : y + ch * 0.62;
      const arrivee = E.out3(prog(t, k.toucher - 0.6, k.toucher));
      const presse = prog(t, k.toucher, k.toucher + 0.4);
      doigt(c, lerp(W * 0.85, xd, arrivee), lerp(H * 1.05, yd, arrivee), presse, 1.4);
    } else if (etape === 1) {
      texte(c, "Combien de pages ?", m, y, { font: POL.titre(portrait ? 56 : 54), coul: COUL.encre });
      y += 140;
      const lw = W - 2 * m;
      boite(c, m, y, lw, 14, { fond: "#E7E2D8", r: 7 });
      const v = E.inout3(prog(t, k.curseur, k.curseur + 0.7));
      boite(c, m, y, lw * (0.1 + 0.4 * v), 14, { fond: COUL.or, r: 7 });
      const kx = m + lw * (0.1 + 0.4 * v);
      c.beginPath();
      c.arc(kx, y + 7, 26, 0, Math.PI * 2);
      c.fillStyle = "#fff";
      c.fill();
      c.lineWidth = 6;
      c.strokeStyle = COUL.or;
      c.stroke();
      const pages = 1 + Math.round(v * 4);
      texte(c, `${pages} page${pages > 1 ? "s" : ""}`, kx, y - 40, { font: POL.mono(30, 700), coul: COUL.orTexte, align: "center" });
      // les plaques s'assemblent : aperçu du site
      const ay = y + 90;
      const ah = portrait ? 700 : H - ay - 50;
      boite(c, m, ay, lw, ah, { fond: "#F6F2EA", r: 16, trait: "rgba(30,58,95,0.12)" });
      const blocsA = portrait ? 6 : 5;
      for (let b = 0; b < blocsA; b++) {
        const s = E.pose(prog(t, k.assemblage + b * 0.1, k.assemblage + 0.35 + b * 0.1));
        if (s <= 0) continue;
        const bh = (ah - 60) / blocsA - 14;
        const by = ay + 30 + b * (bh + 14) - (1 - s) * 80;
        c.globalAlpha = s;
        boite(c, m + 30, by, (lw - 60) * (b === 0 ? 1 : b % 2 ? 0.62 : 0.85), bh, { fond: b === 0 ? COUL.navy : b === 2 ? COUL.ambre : "#FFFFFF", r: 10, trait: "rgba(30,58,95,0.1)" });
        c.globalAlpha = 1;
      }
    } else {
      texte(c, "Votre estimation", m, y, { font: POL.titre(portrait ? 56 : 54), coul: COUL.encre });
      y += portrait ? 160 : 150;
      texte(c, "SITE VITRINE — À PARTIR DE", m, y, { font: POL.mono(portrait ? 30 : 30, 700), coul: COUL.ardoise });
      y += portrait ? 200 : 200;
      const p = prog(t, k.cadran, k.fige);
      cadran(c, `${prix} €`, m, y, { font: POL.titre(portrait ? 210 : 200, 800), coul: COUL.encre, hauteur: 230, progres: p, tours: 3 });
      if (t >= k.fige) {
        const s = E.out3(prog(t, k.fige, k.fige + 0.3));
        c.fillStyle = COUL.or;
        c.fillRect(m, y + 40, (W - 2 * m) * s, 10);
      }
      texte(c, "Estimation indicative, établie à partir des tarifs publics.", m, y + (portrait ? 120 : 110), { font: POL.texte(portrait ? 28 : 26), coul: COUL.ardoise, max: W - 2 * m });
    }
  };
}

export { couverture, cadran, boite, texte, paragraphe, doigt };
