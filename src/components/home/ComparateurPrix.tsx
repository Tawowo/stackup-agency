/* eslint-disable react/no-unescaped-entities */
"use client";
/**
 * ComparateurPrix — panneau « Prix comparés » de la section Pourquoi Stackup.
 * Sélecteur par type de projet · barres animées · « ×N fois moins cher » en chiffre héros.
 * Aucune dépendance. À intégrer dans PreuvePar3 (onglet Prix comparés) à la place de l'actuel.
 * Fourchettes agences classiques : ordres de grandeur constatés en France, libellés prudents.
 */
import React, { useEffect, useRef, useState } from "react";

type Offre = {
  id: string;
  label: string;
  stackup: number;          // prix Stackup (€)
  stackupNote?: string;     // ex. "à partir de"
  delai: string;            // délai Stackup
  agenceMin: number;        // fourchette agence classique (€)
  agenceMax: number;
  agenceDelai: string;
  varie?: boolean;          // prix variable selon périmètre
};

const OFFRES: Offre[] = [
  { id: "vitrine",  label: "Site vitrine",       stackup: 449,  delai: "10 jours ouvrés", agenceMin: 2000,  agenceMax: 6000,  agenceDelai: "2 à 4 mois" },
  { id: "multi",    label: "Site multi-pages",   stackup: 749,  delai: "17 jours ouvrés", agenceMin: 4000,  agenceMax: 9000,  agenceDelai: "3 à 6 mois" },
  { id: "ecom",     label: "Boutique en ligne",  stackup: 1647, delai: "21 jours ouvrés", agenceMin: 8000,  agenceMax: 20000, agenceDelai: "4 à 8 mois" },
  { id: "gestion",  label: "Système de gestion", stackup: 1447, stackupNote: "à partir de", delai: "sur mesure", agenceMin: 10000, agenceMax: 40000, agenceDelai: "6 à 12 mois", varie: true },
];

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CountX({ value, run }: { value: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const t0 = performance.now(); const dur = 900;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(value * e * 10) / 10);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return <>{v.toFixed(1).replace(".", ",")}</>;
}

/**
 * Une barre et son étiquette de délai.
 *
 * L'étiquette passe À L'EXTÉRIEUR de la barre quand celle-ci est trop courte
 * pour la contenir. Sans cela, « 10 jours ouvrés » était rogné en « s ouvrés »
 * sur la barre Stackup, large de 7 % seulement — et c'est justement la barre
 * dont le délai compte le plus.
 */
function Barre({
  teinte,
  largeur,
  etiquette,
}: {
  teinte: 'grey' | 'gold'
  largeur: number
  etiquette: string
}) {
  // 34 % : en dessous, une étiquette de ~100 px ne tient pas dans la barre
  // aux largeurs de colonne usuelles.
  const dehors = largeur < 34
  return (
    <div className="cp-track">
      <div className={`cp-bar ${teinte}`} style={{ width: `${largeur}%` }} />
      <em
        className={`cp-etiquette ${dehors ? 'dehors' : 'dedans'} ${teinte}`}
        style={{ ['--w' as string]: `${largeur}%` }}
      >
        {etiquette}
      </em>

      {/* ── Ces règles DOIVENT vivre ici ────────────────────────────────────
          styled-jsx scope ses styles PAR COMPOSANT : il n'ajoute sa classe de
          portée qu'aux éléments écrits dans le JSX du composant qui contient
          le bloc `<style jsx>`. Les trois éléments ci-dessus sont rendus par
          `Barre`, pas par `ComparateurPrix` — tant que leurs règles étaient
          dans le bloc du parent, elles ne les atteignaient tout simplement
          pas.

          Conséquence observée au navigateur : `.cp-track` mesurait 25,6 px
          au lieu de 40 et n'avait aucun fond, `.cp-bar` faisait 0 px de haut
          sans dégradé, et `.cp-etiquette` restait en `position: static` et
          en italique — le style par défaut de `<em>`. Autrement dit, les
          deux barres du comparateur de prix N'ÉTAIENT PAS AFFICHÉES, et ce
          sur le site en ligne.

          C'est une régression que j'ai introduite moi-même en extrayant
          `Barre` pour corriger l'étiquette « 10 jours ouvrés » rognée en
          « s ouvrés » : j'avais vérifié le texte de l'étiquette, pas la
          présence des barres. Les keyframes `cpShine` descendent avec les
          règles, styled-jsx les scopant de la même façon. */}
      <style jsx>{`
        .cp-track { background: rgba(22,35,63,0.06); border-radius: 12px; height: 40px; position: relative; }
        .cp-bar { height: 100%; border-radius: 12px; transition: width 1.1s cubic-bezier(.22,1,.36,1);
          min-width: 0; position: relative; }
        .cp-etiquette { font-style: normal; font-size: 12.5px; font-weight: 700; white-space: nowrap;
          position: absolute; top: 50%; transform: translateY(-50%);
          transition: left 1.1s cubic-bezier(.22,1,.36,1); }
        /* Dedans : calée à droite de la barre. Dehors : juste après son bout. */
        .cp-etiquette.dedans { left: auto; right: calc(100% - var(--w) + 12px); }
        .cp-etiquette.dehors { left: calc(var(--w) + 12px); color: #334155; }
        .cp-etiquette.dedans.grey { color: #1f2937; }
        .cp-etiquette.dedans.gold { color: #3a2a05; }
        .cp-bar.grey { background: linear-gradient(90deg, #cbd5e1, #94a3b8); color: #1f2937; overflow: hidden; }
        .cp-bar.gold { background: linear-gradient(90deg, #fbbf24, #f59e0b); color: #3a2a05; box-shadow: 0 6px 16px rgba(245,158,11,0.35); overflow: hidden; }
        .cp-bar.grey::after, .cp-bar.gold::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 45%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.30) 50%, transparent 100%);
          pointer-events: none;
          animation: cpShine 1.4s cubic-bezier(0.22,1,0.36,1) 1.3s both;
          border-radius: inherit;
        }
        @keyframes cpShine { 0%{left:-60%} 100%{left:130%} }
        @media (prefers-reduced-motion: reduce) {
          .cp-bar { transition: none; }
          .cp-bar::after { animation: none; }
          .cp-etiquette { transition: none; }
        }
      `}</style>
    </div>
  )
}

export default function ComparateurPrix() {
  const [active, setActive] = useState<Offre>(OFFRES[0]);
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const mid = (active.agenceMin + active.agenceMax) / 2;
  const fois = Math.round((mid / active.stackup) * 10) / 10;               // ex. 8,9
  const pct = Math.round((1 - active.stackup / mid) * 100);                // secondaire
  const barAgence = 100;
  const barStackup = Math.max(6, Math.round((active.stackup / active.agenceMax) * 100));
  const fmt = (n: number) => n.toLocaleString("fr-FR") + " €";

  return (
    <div ref={ref} className="cp-root">
      {/* Sélecteur */}
      <div className="cp-tabs" role="tablist" aria-label="Type de projet">
        {OFFRES.map((o) => (
          <button key={o.id} role="tab" aria-selected={active.id === o.id}
            className={`cp-tab ${active.id === o.id ? "on" : ""}`} onClick={() => setActive(o)}>
            {o.label}
          </button>
        ))}
      </div>

      {/* Chiffre héros */}
      <div className="cp-hero">
        <span className="cp-x">×</span>
        <span className="cp-n"><CountX value={fois} run={inView} key={active.id} /></span>
        <span className="cp-suite">moins cher qu'une agence classique</span>
      </div>
      <p className="cp-sub">soit environ <strong>{pct}% d'économie</strong> — pour un cahier des charges équivalent, livré en <strong>{active.delai}</strong> au lieu de {active.agenceDelai}.</p>

      {/* Barres */}
      <div className="cp-rows">
        <div className="cp-row">
          <div className="cp-row-head"><span>Agence classique</span><strong>{fmt(active.agenceMin)} – {fmt(active.agenceMax)}</strong></div>
          <Barre teinte="grey" largeur={inView ? barAgence : 0} etiquette={active.agenceDelai} />
        </div>
        <div className="cp-row">
          <div className="cp-row-head"><span>Stackup Agency</span><strong className="gold">{active.stackupNote ? `${active.stackupNote} ` : ""}{fmt(active.stackup)}</strong></div>
          <Barre teinte="gold" largeur={inView ? barStackup : 0} etiquette={active.delai} />
        </div>
      </div>

      {active.varie && (
        <p className="cp-note">Le périmètre d'un système de gestion varie d'un métier à l'autre : le prix s'affine avec vous au devis (à ± 500 € près autour de ce tarif dans la majorité des projets).</p>
      )}
      <p className="cp-legende">Fourchettes indicatives constatées auprès d'agences françaises pour des prestations comparables.</p>

      <style jsx>{`
        .cp-root { display: grid; gap: 18px; }
        .cp-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
        .cp-tab { padding: 9px 16px; border-radius: 999px; border: 1px solid rgba(30,58,138,0.18); background: #fff;
          color: #1e3a5f; font-weight: 600; font-size: 14px; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease; }
        .cp-tab:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(15,23,42,0.10); }
        .cp-tab.on { background: #16233f; color: #fff; border-color: #16233f; box-shadow: 0 10px 22px rgba(22,35,63,0.28); }
        .cp-hero { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .cp-x { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #d97706; }
        .cp-n { font-size: clamp(56px, 7vw, 92px); line-height: 1; font-weight: 900; letter-spacing: -0.02em;
          background: linear-gradient(92deg, #d97706, #f59e0b 60%, #2563eb); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .cp-suite { font-size: clamp(16px, 1.6vw, 20px); font-weight: 700; color: #16233f; }
        .cp-sub { color: rgba(22,35,63,0.75); font-size: 15px; margin: -6px 0 0; }
        .cp-sub strong { color: #16233f; }
        .cp-rows { display: grid; gap: 14px; margin-top: 6px; }
        .cp-row-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; color: rgba(22,35,63,0.8); margin-bottom: 6px; }
        .cp-row-head strong { font-variant-numeric: tabular-nums; color: #16233f; }
        .cp-row-head strong.gold { color: #b45309; }
        /* Les règles de la piste, de la barre et de l'étiquette sont
           descendues dans « Barre », seul composant qui rend ces éléments :
           styled-jsx ne scope qu'au composant où le bloc est écrit. */
        .cp-note { font-size: 13.5px; color: rgba(22,35,63,0.7); background: #fff7ea; border: 1px solid rgba(217,119,6,0.25); border-radius: 10px; padding: 10px 12px; }
        .cp-legende { font-size: 12px; color: rgba(22,35,63,0.78); }
      `}</style>
    </div>
  );
}
