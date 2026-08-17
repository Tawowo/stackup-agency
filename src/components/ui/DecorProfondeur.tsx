"use client";
/**
 * DecorProfondeur — décor d'arrière-plan riche pour les sections claires.
 * À placer en PREMIER enfant d'une <section className="relative overflow-hidden">.
 * Aucune dépendance. Zéro mouse-follow. Respecte prefers-reduced-motion.
 * Usage : <DecorProfondeur variant="warm" seed={2} />
 * Variants : "warm" (or/pêche) · "cool" (bleu/ciel) · "gold" (or dominant) · "mixte"
 * seed (0-3) : décale la composition pour que deux sections voisines ne soient jamais identiques.
 */
import React from "react";

type Variant = "warm" | "cool" | "gold" | "mixte";

const PALETTES: Record<Variant, { a: string; b: string; c: string; ring: [string, string]; dot: string }> = {
  warm:  { a: "255,178,102", b: "255,214,153", c: "120,170,255", ring: ["#F59E0B", "#FBBF24"], dot: "30,58,138" },
  cool:  { a: "120,170,255", b: "165,215,255", c: "255,196,120", ring: ["#2563EB", "#60A5FA"], dot: "30,58,138" },
  gold:  { a: "255,190,80",  b: "255,222,160", c: "255,170,120", ring: ["#D97706", "#FBBF24"], dot: "146,64,14" },
  mixte: { a: "255,190,110", b: "140,180,255", c: "255,150,170", ring: ["#F59E0B", "#3B82F6"], dot: "30,58,138" },
};

export default function DecorProfondeur({ variant = "warm", seed = 0 }: { variant?: Variant; seed?: number }) {
  const p = PALETTES[variant];
  const flip = seed % 2 === 1;      // miroir horizontal une fois sur deux
  const high = seed >= 2;           // composition haute ou basse
  const side = flip ? "right" : "left";
  const oppo = flip ? "left" : "right";

  return (
    <div aria-hidden className="dp-root" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {/* 1 — Grand halo maillé principal (nettement visible, dérive lente) */}
      <div className="dp-drift-a" style={{
        position: "absolute", [side]: "-12%", top: high ? "-18%" : "auto", bottom: high ? "auto" : "-22%",
        width: "58vw", height: "58vw", minWidth: 520, minHeight: 520, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, rgba(${p.a},0.55), rgba(${p.a},0.18) 45%, transparent 70%)`,
        filter: "blur(60px)",
      }} />
      {/* 2 — Halo secondaire complémentaire, à l'opposé */}
      <div className="dp-drift-b" style={{
        position: "absolute", [oppo]: "-8%", top: high ? "30%" : "-14%",
        width: "42vw", height: "42vw", minWidth: 380, minHeight: 380, borderRadius: "50%",
        background: `radial-gradient(circle at 60% 40%, rgba(${p.c},0.38), rgba(${p.c},0.12) 50%, transparent 72%)`,
        filter: "blur(70px)",
      }} />
      {/* 3 — Voile doux central pour lier les deux (matière, pas de vide) */}
      <div style={{
        position: "absolute", left: "20%", right: "20%", top: "20%", bottom: "20%",
        background: `radial-gradient(ellipse at 50% 50%, rgba(${p.b},0.22), transparent 65%)`,
        filter: "blur(50px)",
      }} />
      {/* 4 — Anneau 3D (tore en dégradé, ombre portée réaliste, rotation très lente) */}
      <svg className="dp-spin" viewBox="0 0 200 200" style={{
        position: "absolute", [oppo]: high ? "6%" : "8%", top: high ? "8%" : "auto", bottom: high ? "auto" : "12%",
        width: "clamp(140px, 16vw, 240px)", height: "auto", opacity: 0.9,
        filter: "drop-shadow(0 24px 40px rgba(15,23,42,0.18)) drop-shadow(0 6px 12px rgba(15,23,42,0.10))",
      }}>
        <defs>
          <linearGradient id={`dpg-${variant}-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.ring[0]} />
            <stop offset="100%" stopColor={p.ring[1]} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="72" fill="none" stroke={`url(#dpg-${variant}-${seed})`} strokeWidth="26" strokeLinecap="round"
          strokeDasharray="335 118" transform="rotate(-30 100 100)" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="8"
          strokeDasharray="60 393" transform="rotate(-14 100 100)" />
      </svg>
      {/* 5 — Pastille verre (profondeur premier plan) */}
      <div className="dp-float" style={{
        position: "absolute", [side]: high ? "10%" : "14%", top: high ? "58%" : "16%",
        width: "clamp(64px, 7vw, 104px)", height: "clamp(64px, 7vw, 104px)", borderRadius: 28,
        background: "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.28))",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 40px rgba(15,23,42,0.12), 0 4px 10px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)", transform: "rotate(-8deg)",
      }} />
      {/* 6 — Nappe de points locale (jamais un quadrillage pleine page) */}
      <div style={{
        position: "absolute", [oppo]: "22%", top: high ? "auto" : "8%", bottom: high ? "10%" : "auto",
        width: 300, height: 220, opacity: 0.5,
        backgroundImage: `radial-gradient(rgba(${p.dot},0.35) 1.4px, transparent 1.6px)`,
        backgroundSize: "18px 18px",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%)",
      }} />
      {/* 7 — Filet d'arc fin (précision, signature) */}
      <svg viewBox="0 0 400 400" style={{ position: "absolute", [side]: "-4%", top: high ? "34%" : "-6%", width: "clamp(220px,26vw,380px)", opacity: 0.5 }}>
        <circle cx="200" cy="200" r="180" fill="none" stroke={`rgba(${p.dot},0.28)`} strokeWidth="1.4" strokeDasharray="4 10" />
        <circle cx="200" cy="200" r="140" fill="none" stroke={`rgba(${p.dot},0.18)`} strokeWidth="1" />
      </svg>
      <style jsx>{`
        .dp-drift-a { animation: dpDriftA 26s ease-in-out infinite alternate; }
        .dp-drift-b { animation: dpDriftB 32s ease-in-out infinite alternate; }
        .dp-spin    { animation: dpSpin 60s linear infinite; }
        .dp-float   { animation: dpFloat 9s ease-in-out infinite alternate; }
        @keyframes dpDriftA { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(4%, -3%, 0) scale(1.06); } }
        @keyframes dpDriftB { from { transform: translate3d(0,0,0) scale(1.04); } to { transform: translate3d(-3%, 4%, 0) scale(1); } }
        @keyframes dpSpin  { to { transform: rotate(360deg); } }
        @keyframes dpFloat { from { transform: rotate(-8deg) translateY(0); } to { transform: rotate(-5deg) translateY(-14px); } }
        @media (prefers-reduced-motion: reduce) {
          .dp-drift-a, .dp-drift-b, .dp-spin, .dp-float { animation: none; }
        }
        @media (max-width: 767px) {
          .dp-spin { opacity: 0.55; }
        }
      `}</style>
    </div>
  );
}
