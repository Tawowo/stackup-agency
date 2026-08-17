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
          <div className="cp-track"><div className="cp-bar grey" style={{ width: inView ? `${barAgence}%` : "0%" }}><em>{active.agenceDelai}</em></div></div>
        </div>
        <div className="cp-row">
          <div className="cp-row-head"><span>Stackup Agency</span><strong className="gold">{active.stackupNote ? `${active.stackupNote} ` : ""}{fmt(active.stackup)}</strong></div>
          <div className="cp-track"><div className="cp-bar gold" style={{ width: inView ? `${barStackup}%` : "0%" }}><em>{active.delai}</em></div></div>
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
        .cp-row-head strong.gold { color: #d97706; }
        .cp-track { background: rgba(22,35,63,0.06); border-radius: 12px; overflow: hidden; height: 40px; }
        .cp-bar { height: 100%; display: flex; align-items: center; justify-content: flex-end; padding: 0 12px;
          border-radius: 12px; transition: width 1.1s cubic-bezier(.22,1,.36,1); min-width: 0; }
        .cp-bar em { font-style: normal; font-size: 12.5px; font-weight: 700; white-space: nowrap; }
        .cp-bar.grey { background: linear-gradient(90deg, #cbd5e1, #94a3b8); color: #1f2937; }
        .cp-bar.gold { background: linear-gradient(90deg, #fbbf24, #f59e0b); color: #3a2a05; box-shadow: 0 6px 16px rgba(245,158,11,0.35); }
        .cp-note { font-size: 13.5px; color: rgba(22,35,63,0.7); background: #fff7ea; border: 1px solid rgba(217,119,6,0.25); border-radius: 10px; padding: 10px 12px; }
        .cp-legende { font-size: 12px; color: rgba(22,35,63,0.5); }
        @media (prefers-reduced-motion: reduce) { .cp-bar { transition: none; } }
      `}</style>
    </div>
  );
}
