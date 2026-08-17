/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-unsafe-function-type */
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Copy, Check, Shuffle, ChevronRight, Monitor, Smartphone, Columns2, Share2, Download } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Config {
  arch: string
  pal: string
  font: string
  anim: number      // 0-3
  density: number   // 0-2
  corners: number   // 0-2
  imagery: string
  theme: string     // light|dark|auto
  tone: string
}

interface Architecture { id: string; label: string; ideal: string; tags: string[] }
interface Palette5 { id: string; name: string; fam: string; dom: string; sec: string; bg: string; txt: string; acc: string }
interface FontDuo { id: string; name: string; style: string; title: string; body: string; titleStack: string; bodyStack: string }
interface Preset { id: string; label: string; emoji: string; config: Partial<Config> }

// ─── Architectures ────────────────────────────────────────────────────────────

const ARCHS: Architecture[] = [
  { id: 'A01', label: 'One-page storytelling', ideal: 'Freelance, portfolio', tags: ['scroll', 'narration'] },
  { id: 'A02', label: 'Magazine éditorial', ideal: 'Blog, presse, media', tags: ['colonnes', 'contenus'] },
  { id: 'A03', label: 'SaaS landing', ideal: 'App, logiciel, startup', tags: ['feature', 'CTA', 'pricing'] },
  { id: 'A04', label: 'Vitrine locale', ideal: 'Commerce, artisan, TPE', tags: ['horaires', 'contact', 'map'] },
  { id: 'A05', label: 'Portfolio galerie', ideal: 'Photographe, designer', tags: ['grille', 'lightbox'] },
  { id: 'A06', label: 'E-commerce boutique', ideal: 'Vente en ligne, produits', tags: ['fiches', 'panier'] },
  { id: 'A07', label: 'Cabinet pro', ideal: 'Avocat, médecin, conseil', tags: ['credibilité', 'RDV'] },
  { id: 'A08', label: 'Association & ONG', ideal: 'Assos, cause, bénévoles', tags: ['cause', 'don', 'actus'] },
  { id: 'A09', label: 'Restaurant & food', ideal: 'Resto, traiteur, café', tags: ['menu', 'résa', 'photo'] },
  { id: 'A10', label: 'Immobilier', ideal: 'Agence, promoteur', tags: ['annonces', 'filtres', 'visite'] },
  { id: 'A11', label: 'Formation & cours', ideal: 'École, coach, e-learning', tags: ['programme', 'avis'] },
  { id: 'A12', label: 'Hôtel & tourisme', ideal: 'Hôtel, gîte, tourisme', tags: ['chambres', 'résa', 'galerie'] },
  { id: 'A13', label: 'Dashboard / Webapp', ideal: 'Back-office, outil SaaS', tags: ['sidebar', 'tableaux'] },
  { id: 'A14', label: 'Luxe & premium', ideal: 'Bijou, mode, prestige', tags: ['plein écran', 'silence', 'or'] },
]

// ─── Palettes ─────────────────────────────────────────────────────────────────

const PALETTES: Palette5[] = [
  // Bleu professionnel
  { id:'P01', name:'Navy Clair',    fam:'Bleu pro',    dom:'#1E3A5F', sec:'#2D5A8E', bg:'#F8FAFF', txt:'#0D1626', acc:'#4F9CF9' },
  { id:'P02', name:'Cobalt Pure',   fam:'Bleu pro',    dom:'#0047AB', sec:'#003580', bg:'#FFFFFF', txt:'#0D1626', acc:'#FF6B35' },
  { id:'P03', name:'Ciel Horizon',  fam:'Bleu pro',    dom:'#2196F3', sec:'#1565C0', bg:'#E3F2FD', txt:'#0D2A4A', acc:'#FF9800' },
  { id:'P04', name:'Minuit Pro',    fam:'Bleu pro',    dom:'#1A237E', sec:'#283593', bg:'#E8EAF6', txt:'#1A237E', acc:'#FFD600' },
  { id:'P05', name:'Acier Digital', fam:'Bleu pro',    dom:'#37474F', sec:'#455A64', bg:'#ECEFF1', txt:'#263238', acc:'#00BCD4' },
  // Neutre premium
  { id:'P06', name:'Blanc Cassé',   fam:'Neutre',      dom:'#F5F0E8', sec:'#E8DCC8', bg:'#FAFAF8', txt:'#1C1C1C', acc:'#8B7355' },
  { id:'P07', name:'Gris Parisien', fam:'Neutre',      dom:'#6B7280', sec:'#4B5563', bg:'#F9FAFB', txt:'#111827', acc:'#1E3A5F' },
  { id:'P08', name:'Graphite',      fam:'Neutre',      dom:'#374151', sec:'#1F2937', bg:'#F3F4F6', txt:'#111827', acc:'#EF4444' },
  { id:'P09', name:'Sable Doux',    fam:'Neutre',      dom:'#D4B896', sec:'#C4A882', bg:'#FAF6F1', txt:'#3D2B1F', acc:'#8B4513' },
  { id:'P10', name:'Zinc Cool',     fam:'Neutre',      dom:'#71717A', sec:'#52525B', bg:'#FAFAFA', txt:'#18181B', acc:'#3B82F6' },
  // Chaleureux & artisanal
  { id:'P11', name:'Terracotta',    fam:'Chaleureux',  dom:'#C67C3C', sec:'#A0522D', bg:'#FDF8F0', txt:'#2C1810', acc:'#2D7DD2' },
  { id:'P12', name:'Olive Craft',   fam:'Chaleureux',  dom:'#6B7C3F', sec:'#556B2F', bg:'#F5F4EE', txt:'#2C2C1E', acc:'#C67C3C' },
  { id:'P13', name:'Miel Artisan',  fam:'Chaleureux',  dom:'#D4922A', sec:'#B8860B', bg:'#FFFEF7', txt:'#2C1E10', acc:'#1E3A5F' },
  { id:'P14', name:'Brique Vieux',  fam:'Chaleureux',  dom:'#B85C38', sec:'#8B4513', bg:'#FEF9F5', txt:'#2A1008', acc:'#4A7C59' },
  { id:'P15', name:'Forêt Douce',   fam:'Chaleureux',  dom:'#4A7C59', sec:'#2D6A4F', bg:'#F4FBF6', txt:'#1A3020', acc:'#C67C3C' },
  // Tech & sombre
  { id:'P16', name:'Nuit Électrique',fam:'Tech dark',  dom:'#4F9CF9', sec:'#2563EB', bg:'#0A0F1C', txt:'#E8F0FE', acc:'#00E5FF' },
  { id:'P17', name:'Hacker Green',  fam:'Tech dark',   dom:'#00FF41', sec:'#00CC33', bg:'#0D1117', txt:'#C9D1D9', acc:'#58A6FF' },
  { id:'P18', name:'Purple Cyber',  fam:'Tech dark',   dom:'#7C3AED', sec:'#5B21B6', bg:'#0F0A1E', txt:'#EDE9FE', acc:'#F59E0B' },
  { id:'P19', name:'Neon Coral',    fam:'Tech dark',   dom:'#FF6B6B', sec:'#EE4D4D', bg:'#1A0A0A', txt:'#FFE4E4', acc:'#4ECDC4' },
  { id:'P20', name:'Cyan Futur',    fam:'Tech dark',   dom:'#00BCD4', sec:'#0097A7', bg:'#011627', txt:'#D6E8F0', acc:'#FF9800' },
  // Luxe & élégance
  { id:'P21', name:'Or & Noir',     fam:'Luxe',        dom:'#C9A84C', sec:'#A07830', bg:'#0C0C0C', txt:'#F5F0E8', acc:'#FFFFFF' },
  { id:'P22', name:'Champagne',     fam:'Luxe',        dom:'#D4AF7A', sec:'#C19A6B', bg:'#1C1410', txt:'#F5EDD8', acc:'#E8C87A' },
  { id:'P23', name:'Platine',       fam:'Luxe',        dom:'#B8C5D6', sec:'#8899AA', bg:'#0A0C0F', txt:'#E8ECF0', acc:'#D4AF7A' },
  { id:'P24', name:'Bordeaux Prestige',fam:'Luxe',     dom:'#722F37', sec:'#5C1A22', bg:'#0F0508', txt:'#F5EDD8', acc:'#C9A84C' },
  { id:'P25', name:'Ivoire Couture',fam:'Luxe',        dom:'#F5F0E8', sec:'#E8DCC8', bg:'#1A1510', txt:'#F5F0E8', acc:'#C9A84C' },
  // Vert & nature
  { id:'P26', name:'Émeraude Bio',  fam:'Nature',      dom:'#2ECC71', sec:'#27AE60', bg:'#F0FFF4', txt:'#1A3020', acc:'#1E3A5F' },
  { id:'P27', name:'Sauge Éco',     fam:'Nature',      dom:'#87A878', sec:'#6B8F5E', bg:'#F4F8F0', txt:'#2C3E28', acc:'#C67C3C' },
  { id:'P28', name:'Mousse Forêt',  fam:'Nature',      dom:'#3D6B47', sec:'#2D5236', bg:'#EEF5EE', txt:'#1A2E1D', acc:'#FFB347' },
  { id:'P29', name:'Teal Propre',   fam:'Nature',      dom:'#009688', sec:'#00796B', bg:'#E0F2F1', txt:'#1A3030', acc:'#FF5722' },
  { id:'P30', name:'Pistache Zen',  fam:'Nature',      dom:'#A8C97F', sec:'#8FB862', bg:'#F8FCF2', txt:'#2A3A1E', acc:'#7B68EE' },
  // Vif & pop
  { id:'P31', name:'Corail Vivant', fam:'Vif & pop',   dom:'#FF6B35', sec:'#E55A24', bg:'#FFF8F5', txt:'#1A0A05', acc:'#1E3A5F' },
  { id:'P32', name:'Fuchsia Bold',  fam:'Vif & pop',   dom:'#E91E8C', sec:'#C2177A', bg:'#FFF0F8', txt:'#1A0012', acc:'#FFD600' },
  { id:'P33', name:'Citron Fresh',  fam:'Vif & pop',   dom:'#F9E000', sec:'#E6CE00', bg:'#FDFDF0', txt:'#1A1A00', acc:'#1E3A5F' },
  { id:'P34', name:'Orange Punch',  fam:'Vif & pop',   dom:'#FF6600', sec:'#E55A00', bg:'#FFF5EE', txt:'#1A0800', acc:'#1E3A5F' },
  { id:'P35', name:'Violet Flash',  fam:'Vif & pop',   dom:'#9C27B0', sec:'#7B1FA2', bg:'#F8F0FF', txt:'#1A0020', acc:'#FFD600' },
  // Pastel & doux
  { id:'P36', name:'Rose Poudré',   fam:'Pastel',      dom:'#F8C8D4', sec:'#F0A0B4', bg:'#FFF5F7', txt:'#3D1520', acc:'#7B68EE' },
  { id:'P37', name:'Bleu Lavande',  fam:'Pastel',      dom:'#B3C8F0', sec:'#8AAAE8', bg:'#F5F8FF', txt:'#1A2040', acc:'#FF9E9E' },
  { id:'P38', name:'Menthe Claire', fam:'Pastel',      dom:'#B8E8D0', sec:'#90D8B0', bg:'#F0FDF8', txt:'#1A3020', acc:'#FF9E9E' },
  { id:'P39', name:'Pêche Velours', fam:'Pastel',      dom:'#FFCBA4', sec:'#FFB380', bg:'#FFF8F3', txt:'#3D1A08', acc:'#7B68EE' },
  { id:'P40', name:'Parme Doux',    fam:'Pastel',      dom:'#D8B4FE', sec:'#C084FC', bg:'#FAF5FF', txt:'#2D1A50', acc:'#F59E0B' },
  // Monochrome
  { id:'P41', name:'Noir Radical',  fam:'Mono',        dom:'#000000', sec:'#1A1A1A', bg:'#FFFFFF', txt:'#000000', acc:'#FF0000' },
  { id:'P42', name:'Blanc Absolu',  fam:'Mono',        dom:'#FFFFFF', sec:'#F0F0F0', bg:'#FAFAFA', txt:'#000000', acc:'#000000' },
  { id:'P43', name:'Gris Cinquante',fam:'Mono',        dom:'#808080', sec:'#606060', bg:'#F8F8F8', txt:'#1A1A1A', acc:'#404040' },
  { id:'P44', name:'Charbon',       fam:'Mono',        dom:'#2C2C2C', sec:'#1A1A1A', bg:'#F5F5F5', txt:'#0A0A0A', acc:'#666666' },
  { id:'P45', name:'Encre Profonde',fam:'Mono',        dom:'#1A1A2E', sec:'#16213E', bg:'#EEEEF8', txt:'#0A0A1E', acc:'#4A4A8A' },
  // Institutionnel
  { id:'P46', name:'Tricolore FR',  fam:'Institutionnel', dom:'#002395', sec:'#EF4135', bg:'#FFFFFF', txt:'#002395', acc:'#EF4135' },
  { id:'P47', name:'Sécurité Pro',  fam:'Institutionnel', dom:'#FF6600', sec:'#CC5200', bg:'#FFF8F4', txt:'#1A1A1A', acc:'#1E3A5F' },
  { id:'P48', name:'Santé Bleue',   fam:'Institutionnel', dom:'#0077B6', sec:'#005F8E', bg:'#F0F8FF', txt:'#003A5C', acc:'#2ECC71' },
  { id:'P49', name:'Éducation',     fam:'Institutionnel', dom:'#1565C0', sec:'#0D47A1', bg:'#E3F2FD', txt:'#0D1E3D', acc:'#FF8F00' },
  { id:'P50', name:'ONG Solidaire', fam:'Institutionnel', dom:'#E87722', sec:'#C96010', bg:'#FFF8F0', txt:'#1A0A00', acc:'#2ECC71' },
]

// ─── Typographies ─────────────────────────────────────────────────────────────

const FONTS: FontDuo[] = [
  // Moderne sans
  { id:'F01', name:'Inter + Inter',          style:'Moderne sans',   title:'Inter',              body:'Inter',              titleStack:'Inter, sans-serif',                 bodyStack:'Inter, sans-serif' },
  { id:'F02', name:'Manrope + Manrope',      style:'Moderne sans',   title:'Manrope',            body:'Manrope',            titleStack:'Manrope, sans-serif',               bodyStack:'Manrope, sans-serif' },
  { id:'F03', name:'Plus Jakarta + Inter',   style:'Moderne sans',   title:'Plus Jakarta Sans',  body:'Inter',              titleStack:'"Plus Jakarta Sans", sans-serif',    bodyStack:'Inter, sans-serif' },
  { id:'F04', name:'Outfit + DM Sans',       style:'Moderne sans',   title:'Outfit',             body:'DM Sans',            titleStack:'Outfit, sans-serif',                bodyStack:'"DM Sans", sans-serif' },
  { id:'F05', name:'Syne + Inter',           style:'Moderne sans',   title:'Syne',               body:'Inter',              titleStack:'Syne, sans-serif',                  bodyStack:'Inter, sans-serif' },
  { id:'F06', name:'Space Grotesk + DM',     style:'Moderne sans',   title:'Space Grotesk',      body:'DM Sans',            titleStack:'"Space Grotesk", sans-serif',        bodyStack:'"DM Sans", sans-serif' },
  // Éditorial serif
  { id:'F07', name:'Playfair + Lato',        style:'Éditorial serif',title:'Playfair Display',   body:'Lato',               titleStack:'"Playfair Display", serif',          bodyStack:'Lato, sans-serif' },
  { id:'F08', name:'Cormorant + Jost',       style:'Éditorial serif',title:'Cormorant Garamond', body:'Jost',               titleStack:'"Cormorant Garamond", serif',         bodyStack:'Jost, sans-serif' },
  { id:'F09', name:'Libre Baskerville + Source', style:'Éditorial serif', title:'Libre Baskerville', body:'Source Sans 3', titleStack:'"Libre Baskerville", serif',          bodyStack:'"Source Sans 3", sans-serif' },
  { id:'F10', name:'EB Garamond + Nunito',   style:'Éditorial serif',title:'EB Garamond',        body:'Nunito',             titleStack:'"EB Garamond", serif',               bodyStack:'Nunito, sans-serif' },
  { id:'F11', name:'Lora + Open Sans',       style:'Éditorial serif',title:'Lora',               body:'Open Sans',          titleStack:'Lora, serif',                        bodyStack:'"Open Sans", sans-serif' },
  { id:'F12', name:'Merriweather + Roboto',  style:'Éditorial serif',title:'Merriweather',       body:'Roboto',             titleStack:'Merriweather, serif',                bodyStack:'Roboto, sans-serif' },
  // Humaniste
  { id:'F13', name:'Raleway + Mulish',       style:'Humaniste',      title:'Raleway',            body:'Mulish',             titleStack:'Raleway, sans-serif',               bodyStack:'Mulish, sans-serif' },
  { id:'F14', name:'Nunito + Nunito Sans',   style:'Humaniste',      title:'Nunito',             body:'Nunito Sans',        titleStack:'Nunito, sans-serif',                bodyStack:'"Nunito Sans", sans-serif' },
  { id:'F15', name:'Poppins + Hind',         style:'Humaniste',      title:'Poppins',            body:'Hind',               titleStack:'Poppins, sans-serif',               bodyStack:'Hind, sans-serif' },
  { id:'F16', name:'Quicksand + Karla',      style:'Humaniste',      title:'Quicksand',          body:'Karla',              titleStack:'Quicksand, sans-serif',             bodyStack:'Karla, sans-serif' },
  { id:'F17', name:'Cabin + Cabin',          style:'Humaniste',      title:'Cabin',              body:'Cabin',              titleStack:'Cabin, sans-serif',                 bodyStack:'Cabin, sans-serif' },
  { id:'F18', name:'Barlow + Barlow',        style:'Humaniste',      title:'Barlow',             body:'Barlow',             titleStack:'Barlow, sans-serif',                bodyStack:'Barlow, sans-serif' },
  // Géométrique
  { id:'F19', name:'Montserrat + Open Sans', style:'Géométrique',    title:'Montserrat',         body:'Open Sans',          titleStack:'Montserrat, sans-serif',            bodyStack:'"Open Sans", sans-serif' },
  { id:'F20', name:'Futura-like + Jost',     style:'Géométrique',    title:'Josefin Sans',       body:'Jost',               titleStack:'"Josefin Sans", sans-serif',         bodyStack:'Jost, sans-serif' },
  { id:'F21', name:'Rubik + Rubik',          style:'Géométrique',    title:'Rubik',              body:'Rubik',              titleStack:'Rubik, sans-serif',                 bodyStack:'Rubik, sans-serif' },
  { id:'F22', name:'Exo 2 + Noto Sans',      style:'Géométrique',    title:'Exo 2',              body:'Noto Sans',          titleStack:'"Exo 2", sans-serif',               bodyStack:'"Noto Sans", sans-serif' },
  { id:'F23', name:'Lexend + Lexend',        style:'Géométrique',    title:'Lexend',             body:'Lexend',             titleStack:'Lexend, sans-serif',                bodyStack:'Lexend, sans-serif' },
  { id:'F24', name:'Comfortaa + Hind',       style:'Géométrique',    title:'Comfortaa',          body:'Hind',               titleStack:'Comfortaa, sans-serif',             bodyStack:'Hind, sans-serif' },
  // Technique / monospace
  { id:'F25', name:'IBM Plex + IBM Body',    style:'Technique',      title:'IBM Plex Sans',      body:'IBM Plex Sans',      titleStack:'"IBM Plex Sans", sans-serif',        bodyStack:'"IBM Plex Sans", sans-serif' },
  { id:'F26', name:'Space Mono + Inter',     style:'Technique',      title:'Space Mono',         body:'Inter',              titleStack:'"Space Mono", monospace',            bodyStack:'Inter, sans-serif' },
  { id:'F27', name:'Fira Code + Fira Sans',  style:'Technique',      title:'Fira Code',          body:'Fira Sans',          titleStack:'"Fira Code", monospace',             bodyStack:'"Fira Sans", sans-serif' },
  { id:'F28', name:'JetBrains + DM Sans',    style:'Technique',      title:'JetBrains Mono',     body:'DM Sans',            titleStack:'"JetBrains Mono", monospace',        bodyStack:'"DM Sans", sans-serif' },
  { id:'F29', name:'Source Code + Source',   style:'Technique',      title:'Source Code Pro',    body:'Source Sans 3',      titleStack:'"Source Code Pro", monospace',       bodyStack:'"Source Sans 3", sans-serif' },
  // Condensé / impact
  { id:'F30', name:'Oswald + Source Sans',   style:'Condensé',       title:'Oswald',             body:'Source Sans 3',      titleStack:'Oswald, sans-serif',                bodyStack:'"Source Sans 3", sans-serif' },
  { id:'F31', name:'Barlow Cond + Barlow',   style:'Condensé',       title:'Barlow Condensed',   body:'Barlow',             titleStack:'"Barlow Condensed", sans-serif',     bodyStack:'Barlow, sans-serif' },
  { id:'F32', name:'Anton + Roboto',         style:'Condensé',       title:'Anton',              body:'Roboto',             titleStack:'Anton, sans-serif',                 bodyStack:'Roboto, sans-serif' },
  { id:'F33', name:'Bebas-like + Lato',      style:'Condensé',       title:'Teko',               body:'Lato',               titleStack:'Teko, sans-serif',                  bodyStack:'Lato, sans-serif' },
  { id:'F34', name:'Saira Cond + Saira',     style:'Condensé',       title:'Saira Condensed',    body:'Saira',              titleStack:'"Saira Condensed", sans-serif',      bodyStack:'Saira, sans-serif' },
  // Élégant luxe
  { id:'F35', name:'Cinzel + Raleway',       style:'Élégant luxe',   title:'Cinzel',             body:'Raleway',            titleStack:'Cinzel, serif',                     bodyStack:'Raleway, sans-serif' },
  { id:'F36', name:'Bodoni-like + Jost',     style:'Élégant luxe',   title:'Bodoni Moda',        body:'Jost',               titleStack:'"Bodoni Moda", serif',              bodyStack:'Jost, sans-serif' },
  { id:'F37', name:'Didact + Didact',        style:'Élégant luxe',   title:'Didact Gothic',      body:'Didact Gothic',      titleStack:'"Didact Gothic", sans-serif',        bodyStack:'"Didact Gothic", sans-serif' },
  { id:'F38', name:'Forum + Jost',           style:'Élégant luxe',   title:'Forum',              body:'Jost',               titleStack:'Forum, serif',                      bodyStack:'Jost, sans-serif' },
  { id:'F39', name:'Gilda + Jost',           style:'Élégant luxe',   title:'Gilda Display',      body:'Jost',               titleStack:'"Gilda Display", serif',            bodyStack:'Jost, sans-serif' },
  // Friendly / arrondi
  { id:'F40', name:'Fredoka + Nunito',       style:'Friendly',       title:'Fredoka One',        body:'Nunito',             titleStack:'"Fredoka One", sans-serif',          bodyStack:'Nunito, sans-serif' },
  { id:'F41', name:'Pacifico + Mulish',      style:'Friendly',       title:'Pacifico',           body:'Mulish',             titleStack:'Pacifico, cursive',                 bodyStack:'Mulish, sans-serif' },
  { id:'F42', name:'Baloo 2 + Hind',         style:'Friendly',       title:'Baloo 2',            body:'Hind',               titleStack:'"Baloo 2", sans-serif',             bodyStack:'Hind, sans-serif' },
  { id:'F43', name:'Varela Round + Nunito',  style:'Friendly',       title:'Varela Round',       body:'Nunito',             titleStack:'"Varela Round", sans-serif',         bodyStack:'Nunito, sans-serif' },
  { id:'F44', name:'Righteous + Open Sans',  style:'Friendly',       title:'Righteous',          body:'Open Sans',          titleStack:'Righteous, sans-serif',             bodyStack:'"Open Sans", sans-serif' },
  { id:'F45', name:'Kumbh Sans + Kumbh',     style:'Friendly',       title:'Kumbh Sans',         body:'Kumbh Sans',         titleStack:'"Kumbh Sans", sans-serif',           bodyStack:'"Kumbh Sans", sans-serif' },
  // Mixed (serif titre + sans corps)
  { id:'F46', name:'DM Serif + DM Sans',     style:'Mixed',          title:'DM Serif Display',   body:'DM Sans',            titleStack:'"DM Serif Display", serif',          bodyStack:'"DM Sans", sans-serif' },
  { id:'F47', name:'Fraunces + Cabin',       style:'Mixed',          title:'Fraunces',           body:'Cabin',              titleStack:'Fraunces, serif',                   bodyStack:'Cabin, sans-serif' },
  { id:'F48', name:'Spectral + Karla',       style:'Mixed',          title:'Spectral',           body:'Karla',              titleStack:'Spectral, serif',                   bodyStack:'Karla, sans-serif' },
  { id:'F49', name:'Bitter + Source Sans',   style:'Mixed',          title:'Bitter',             body:'Source Sans 3',      titleStack:'Bitter, serif',                     bodyStack:'"Source Sans 3", sans-serif' },
  { id:'F50', name:'Zilla Slab + Nunito',    style:'Mixed',          title:'Zilla Slab',         body:'Nunito',             titleStack:'"Zilla Slab", serif',               bodyStack:'Nunito, sans-serif' },
]

// ─── Presets métiers ──────────────────────────────────────────────────────────

const PRESETS: Preset[] = [
  { id:'restaurant', label:'Restaurant', emoji:'🍽️', config:{ arch:'A09', pal:'P11', font:'F07', anim:1, corners:1, imagery:'photos', tone:'chaleureux', theme:'light' } },
  { id:'artisan',    label:'Artisan',    emoji:'🔨', config:{ arch:'A04', pal:'P12', font:'F13', anim:0, corners:0, imagery:'atelier', tone:'authentique', theme:'light' } },
  { id:'cabinet',    label:'Cabinet pro',emoji:'⚖️', config:{ arch:'A07', pal:'P07', font:'F08', anim:0, corners:0, imagery:'bureau', tone:'expert', theme:'light' } },
  { id:'startup',    label:'Startup',    emoji:'🚀', config:{ arch:'A03', pal:'P16', font:'F03', anim:2, corners:2, imagery:'abstract', tone:'innovant', theme:'dark' } },
  { id:'boutique',   label:'Boutique',   emoji:'🛍️', config:{ arch:'A06', pal:'P31', font:'F15', anim:1, corners:1, imagery:'produits', tone:'tendance', theme:'light' } },
  { id:'luxe',       label:'Luxe',       emoji:'💎', config:{ arch:'A14', pal:'P21', font:'F35', anim:0, corners:0, imagery:'minimaliste', tone:'prestige', theme:'dark' } },
  { id:'sante',      label:'Santé',      emoji:'🏥', config:{ arch:'A07', pal:'P48', font:'F01', anim:0, corners:1, imagery:'soin', tone:'rassurant', theme:'light' } },
  { id:'coach',      label:'Coach',      emoji:'🎯', config:{ arch:'A01', pal:'P26', font:'F14', anim:1, corners:2, imagery:'personnes', tone:'motivant', theme:'light' } },
  { id:'association',label:'Association',emoji:'🤝', config:{ arch:'A08', pal:'P50', font:'F13', anim:0, corners:1, imagery:'communauté', tone:'engagé', theme:'light' } },
  { id:'hotel',      label:'Hôtel',      emoji:'🏨', config:{ arch:'A12', pal:'P22', font:'F36', anim:1, corners:0, imagery:'ambiance', tone:'accueillant', theme:'dark' } },
]

// ─── Default config ───────────────────────────────────────────────────────────

const DEFAULT_CONFIG: Config = { arch:'A01', pal:'P01', font:'F01', anim:1, density:1, corners:1, imagery:'photo', theme:'light', tone:'professionnel' }

function loadConfig(): Config {
  if (typeof window === 'undefined') return DEFAULT_CONFIG
  try {
    const s = sessionStorage.getItem('studioConfig')
    return s ? { ...DEFAULT_CONFIG, ...JSON.parse(s) } : DEFAULT_CONFIG
  } catch { return DEFAULT_CONFIG }
}

function saveConfig(c: Config) {
  try { sessionStorage.setItem('studioConfig', JSON.stringify(c)) } catch {}
}

function genProfileCode(c: Config): string {
  const f = FONTS.find(x => x.id === c.font)
  const fs = f?.style.charAt(0) || 'M'
  return `STK-${c.arch}-${c.pal}-${c.font}-${fs}${c.anim}${c.density}${c.corners}`
}

function randomConfig(): Config {
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
  return {
    arch: pick(ARCHS).id,
    pal: pick(PALETTES).id,
    font: pick(FONTS).id,
    anim: Math.floor(Math.random() * 4),
    density: Math.floor(Math.random() * 3),
    corners: Math.floor(Math.random() * 3),
    imagery: pick(['photo', 'illustration', 'abstract', 'minimaliste']),
    theme: pick(['light', 'dark', 'auto']),
    tone: pick(['professionnel', 'chaleureux', 'innovant', 'prestige', 'engagé']),
  }
}

// ─── ArchWireframe ────────────────────────────────────────────────────────────

function ArchWireframe({ archId, pal }: { archId: string; pal: Palette5 }) {
  const s = { bg: pal.bg, dom: pal.dom, sec: pal.sec, txt: pal.txt, acc: pal.acc }
  const base = { background: s.bg, borderRadius: 8, overflow: 'hidden', border: `1px solid ${s.dom}22`, width: '100%', aspectRatio: '4/3' }

  const wireframes: Record<string, JSX.Element> = {
    A01: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 20, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
          <div style={{ width: 40, height: 6, background: '#fff', borderRadius: 3, opacity: 0.9 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 30, height: 14, background: s.acc, borderRadius: 3 }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, gap: 6 }}>
          <div style={{ width: '70%', height: 10, background: s.dom, borderRadius: 3, opacity: 0.8 }} />
          <div style={{ width: '50%', height: 6, background: s.txt, borderRadius: 2, opacity: 0.4 }} />
          <div style={{ width: 60, height: 18, background: s.acc, borderRadius: 4, marginTop: 6 }} />
        </div>
        <div style={{ background: s.sec + '22', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 20, height: 20, background: s.dom, borderRadius: 3, opacity: 0.3 }} />)}
        </div>
      </div>
    ),
    A02: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 18, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ width: 30, height: 6, background: '#fff', borderRadius: 3 }} />
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 6, padding: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ background: s.dom, height: 40, borderRadius: 4, opacity: 0.2 }} />
            <div style={{ height: 6, background: s.txt, borderRadius: 2, opacity: 0.6 }} />
            <div style={{ height: 6, background: s.txt, borderRadius: 2, opacity: 0.3, width: '80%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[0,1,2].map(i => <div key={i} style={{ background: s.sec + '33', height: 18, borderRadius: 3 }} />)}
          </div>
        </div>
      </div>
    ),
    A03: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 18, display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
          <div style={{ width: 24, height: 6, background: '#fff', borderRadius: 2, opacity: 0.8 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: 24, height: 12, background: s.acc, borderRadius: 3 }} />
        </div>
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: '80%', height: 10, background: s.dom, borderRadius: 3 }} />
          <div style={{ width: '60%', height: 6, background: s.txt, borderRadius: 2, opacity: 0.4 }} />
          <div style={{ width: 70, height: 18, background: s.acc, borderRadius: 4 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: '0 8px 8px' }}>
          {[0,1,2].map(i => <div key={i} style={{ background: s.sec + '22', height: 28, borderRadius: 4, border: `1px solid ${s.dom}22` }} />)}
        </div>
      </div>
    ),
    A04: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 18, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <div style={{ width: 30, height: 6, background: '#fff', borderRadius: 2 }} />
        </div>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ background: s.dom + '22', height: 36, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 50, height: 8, background: s.dom, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ background: s.sec + '22', height: 18, borderRadius: 3 }} />)}
          </div>
          <div style={{ height: 18, background: s.acc, borderRadius: 4 }} />
        </div>
      </div>
    ),
    A05: (
      <div style={base}>
        <div style={{ background: s.dom, height: 18 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: 8 }}>
          {[0,1,2,3,4,5].map(i => <div key={i} style={{ background: s.dom + (i % 2 === 0 ? '33' : '22'), aspectRatio: '1', borderRadius: 3 }} />)}
        </div>
      </div>
    ),
    A06: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 18 }} />
        <div style={{ display: 'flex', gap: 4, padding: 8 }}>
          <div style={{ width: 50, background: s.sec + '22', borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ height: 6, background: s.txt + '33', borderRadius: 2 }} />)}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ background: s.sec + '22', height: 40, borderRadius: 4, border: `1px solid ${s.dom}22` }} />)}
          </div>
        </div>
      </div>
    ),
    A07: (
      <div style={base} className="flex flex-col">
        <div style={{ background: s.dom, height: 18 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10, gap: 6 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 8, background: s.dom, borderRadius: 2, width: '80%' }} />
              <div style={{ height: 5, background: s.txt, borderRadius: 2, opacity: 0.4 }} />
              <div style={{ height: 5, background: s.txt, borderRadius: 2, opacity: 0.3, width: '60%' }} />
              <div style={{ height: 14, background: s.acc, borderRadius: 3, width: 60, marginTop: 3 }} />
            </div>
            <div style={{ width: 40, height: 50, background: s.dom + '22', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 20, background: s.sec + '22', borderRadius: 3 }} />)}
          </div>
        </div>
      </div>
    ),
  }

  const fallback = (
    <div style={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
      <div style={{ background: s.dom, height: 18, width: '100%', position: 'absolute', top: 0, left: 0 }} />
      <div style={{ width: '60%', height: 8, background: s.dom, borderRadius: 3, opacity: 0.7 }} />
      <div style={{ width: '80%', height: 5, background: s.txt, borderRadius: 2, opacity: 0.3 }} />
      <div style={{ width: 50, height: 14, background: s.acc, borderRadius: 3 }} />
    </div>
  )

  return wireframes[archId] ?? fallback
}

// ─── LivePreview (multi-screen) ───────────────────────────────────────────────

type PreviewMode = 'desktop' | 'mobile' | 'ab'

function DesktopMockup({ pal, font, arch, borderRadius, padding, isDark }: {
  pal: Palette5; font: FontDuo; arch: Architecture
  borderRadius: string; padding: string; isDark: boolean
}) {
  return (
    <div className="device-frame" style={{ background: pal.bg, fontFamily: font.bodyStack, color: pal.txt, borderRadius: 10, overflow: 'hidden', border: `1px solid ${pal.dom}22` }}>
      {/* Browser chrome */}
      <div style={{ background: '#e8e8e8', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
        {['#ff5f57','#febc2e','#28c840'].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: '#fff', borderRadius: 3, height: 14, margin: '0 8px', display: 'flex', alignItems: 'center', padding: '0 6px' }}>
          <span style={{ fontSize: 8, color: '#999' }}>monsite.fr</span>
        </div>
      </div>
      {/* Header */}
      <div style={{ background: pal.dom, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ fontFamily: font.titleStack, color: '#fff', fontSize: 11, fontWeight: 700 }}>MonSite.fr</div>
        <div style={{ flex: 1, display: 'flex', gap: 8, justifyContent: 'center' }}>
          {['Accueil','Services','Contact'].map(n => <span key={n} style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)' }}>{n}</span>)}
        </div>
        <div style={{ background: pal.acc, color: pal.bg.slice(1,3) < '80' ? '#fff' : '#000', padding: '3px 8px', borderRadius, fontSize: 8, fontWeight: 600 }}>CTA</div>
      </div>
      {/* Hero */}
      <div style={{ padding, display: 'flex', gap: 8, background: isDark ? pal.sec + '22' : pal.bg, borderBottom: `1px solid ${pal.dom}11`, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font.titleStack, color: pal.dom, fontSize: 16, fontWeight: 700, marginBottom: 4, lineHeight: 1.2 }}>{arch.label}</div>
          <div style={{ fontSize: 9, opacity: 0.65, marginBottom: 8, lineHeight: 1.4 }}>{arch.ideal} — votre site sur-mesure</div>
          <div style={{ background: pal.acc, color: '#fff', padding: '4px 10px', borderRadius, fontSize: 9, fontWeight: 600, display: 'inline-block' }}>Découvrir →</div>
        </div>
        <div style={{ width: 60, height: 48, background: pal.dom + '33', borderRadius, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🖼️</div>
      </div>
      {/* 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: '8px 10px' }}>
        {['Services','À propos','Contact'].map((t, i) => (
          <div key={i} style={{ background: isDark ? pal.dom + '22' : pal.sec + '11', padding: 6, borderRadius, border: `1px solid ${pal.dom}22` }}>
            <div style={{ fontFamily: font.titleStack, fontWeight: 600, fontSize: 8, marginBottom: 2, color: pal.dom }}>{t}</div>
            <div style={{ width: '80%', height: 4, background: pal.txt + '22', borderRadius: 2, marginBottom: 2 }} />
            <div style={{ width: '60%', height: 4, background: pal.txt + '15', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ background: pal.dom, padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>© 2025 MonSite.fr</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[pal.dom, pal.acc, pal.sec].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.2)' }} />)}
        </div>
      </div>
    </div>
  )
}

function MobileMockup({ pal, font, arch, borderRadius, isDark }: {
  pal: Palette5; font: FontDuo; arch: Architecture
  borderRadius: string; isDark: boolean
}) {
  return (
    <div className="device-frame" style={{ maxWidth: 140, margin: '0 auto', background: '#1a1a1a', borderRadius: 16, padding: '8px 4px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
      {/* notch */}
      <div style={{ width: 40, height: 6, background: '#333', borderRadius: 3, margin: '0 auto 6px' }} />
      {/* screen */}
      <div style={{ background: pal.bg, borderRadius: 8, overflow: 'hidden', fontFamily: font.bodyStack, color: pal.txt }}>
        <div style={{ background: pal.dom, padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: font.titleStack, color: '#fff', fontSize: 9, fontWeight: 700 }}>MonSite</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 12, height: 1.5, background: 'rgba(255,255,255,0.7)', borderRadius: 1 }} />)}
          </div>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ fontFamily: font.titleStack, color: pal.dom, fontSize: 12, fontWeight: 700, marginBottom: 3, lineHeight: 1.2 }}>{arch.label}</div>
          <div style={{ fontSize: 7, opacity: 0.6, marginBottom: 6, lineHeight: 1.4 }}>{arch.ideal}</div>
          <div style={{ background: pal.acc, color: '#fff', padding: '3px 8px', borderRadius, fontSize: 7, fontWeight: 600, display: 'inline-block', marginBottom: 6 }}>En savoir plus →</div>
          {[0,1].map(i => (
            <div key={i} style={{ background: isDark ? pal.dom + '22' : pal.sec + '11', padding: 5, borderRadius, border: `1px solid ${pal.dom}22`, marginBottom: 4 }}>
              <div style={{ width: '70%', height: 4, background: pal.dom + '66', borderRadius: 2, marginBottom: 2 }} />
              <div style={{ width: '90%', height: 3, background: pal.txt + '33', borderRadius: 2 }} />
            </div>
          ))}
        </div>
        <div style={{ background: pal.dom, padding: '5px 8px', textAlign: 'center' }}>
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>© MonSite.fr</span>
        </div>
      </div>
      {/* home bar */}
      <div style={{ width: 40, height: 3, background: '#555', borderRadius: 2, margin: '6px auto 0' }} />
    </div>
  )
}

function LivePreview({ config, abConfig }: { config: Config; abConfig?: Config }) {
  const [mode, setMode] = useState<PreviewMode>('desktop')
  const pal = PALETTES.find(p => p.id === config.pal) ?? PALETTES[0]
  const font = FONTS.find(f => f.id === config.font) ?? FONTS[0]
  const arch = ARCHS.find(a => a.id === config.arch) ?? ARCHS[0]

  const borderRadius = config.corners === 0 ? '0px' : config.corners === 1 ? '8px' : '20px'
  const padding = config.density === 0 ? '8px' : config.density === 1 ? '14px' : '22px'
  const isDark = config.theme === 'dark' || (config.theme === 'auto' && pal.bg.length > 1 && parseInt(pal.bg.slice(1,3),16) < 100)

  const palB = abConfig ? (PALETTES.find(p => p.id === abConfig.pal) ?? PALETTES[1]) : null
  const fontB = abConfig ? (FONTS.find(f => f.id === abConfig.font) ?? FONTS[1]) : null
  const archB = abConfig ? (ARCHS.find(a => a.id === abConfig.arch) ?? ARCHS[0]) : null
  const brB = abConfig ? (abConfig.corners === 0 ? '0px' : abConfig.corners === 1 ? '8px' : '20px') : '8px'
  const padB = abConfig ? (abConfig.density === 0 ? '8px' : abConfig.density === 1 ? '14px' : '22px') : '14px'
  const isDarkB = abConfig ? (abConfig.theme === 'dark' || (abConfig.theme === 'auto' && (palB?.bg ?? '#fff').slice(1,3) < '80')) : false

  const btnCls = (m: PreviewMode) =>
    `flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${mode === m ? 'bg-electric-ink text-white' : 'text-gray-500 dark:text-white/40 hover:bg-gray-100 dark:hover:bg-white/10'}`

  return (
    <div>
      {/* Mode tabs */}
      <div className="flex items-center gap-1 mb-3 p-1 bg-gray-100 dark:bg-white/5 rounded-xl w-fit">
        <button className={btnCls('desktop')} onClick={() => setMode('desktop')}>
          <Monitor size={11} /> Bureau
        </button>
        <button className={btnCls('mobile')} onClick={() => setMode('mobile')}>
          <Smartphone size={11} /> Mobile
        </button>
        {abConfig && (
          <button className={btnCls('ab')} onClick={() => setMode('ab')}>
            <Columns2 size={11} /> A/B
          </button>
        )}
      </div>

      {mode === 'desktop' && (
        <DesktopMockup pal={pal} font={font} arch={arch} borderRadius={borderRadius} padding={padding} isDark={isDark} />
      )}
      {mode === 'mobile' && (
        <MobileMockup pal={pal} font={font} arch={arch} borderRadius={borderRadius} isDark={isDark} />
      )}
      {mode === 'ab' && abConfig && palB && fontB && archB && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-bold text-center mb-1 text-gray-500 dark:text-white/40 uppercase tracking-widest">Version A</div>
            <DesktopMockup pal={pal} font={font} arch={arch} borderRadius={borderRadius} padding={padding} isDark={isDark} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-center mb-1 text-electric-ink uppercase tracking-widest">Version B</div>
            <DesktopMockup pal={palB} font={fontB} arch={archB} borderRadius={brB} padding={padB} isDark={isDarkB} />
          </div>
        </div>
      )}

      {/* Palette bar */}
      <div className="flex items-center gap-1.5 mt-2 px-1">
        {[pal.dom, pal.sec, pal.acc, pal.bg, pal.txt].map((c, i) => (
          <div key={i} title={c} className="studio-color-swatch" style={{ width: 16, height: 16, background: c, borderRadius: 4, border: `1px solid ${pal.dom}33`, flexShrink: 0 }} />
        ))}
        <span className="text-[9px] text-gray-400 dark:text-white/30 ml-1">{pal.name} · {font.title}</span>
      </div>
    </div>
  )
}

// ─── Font lazy loader ─────────────────────────────────────────────────────────

const loadedFonts = new Set<string>()
const loadingFonts = new Set<string>()

function useLazyFont(fontId: string, isVisible: boolean) {
  useEffect(() => {
    if (!isVisible) return
    const f = FONTS.find(x => x.id === fontId)
    if (!f) return
    const families = [f.title, f.body].filter((x, i, arr) => arr.indexOf(x) === i)
    families.forEach(family => {
      if (loadedFonts.has(family) || loadingFonts.has(family)) return
      if (loadingFonts.size >= 12) return
      loadingFonts.add(family)
      const text = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
      const encoded = encodeURIComponent(text)
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&text=${encoded}&display=swap`
      link.onload = () => { loadedFonts.add(family); loadingFonts.delete(family) }
      link.onerror = () => loadingFonts.delete(family)
      document.head.appendChild(link)
    })
  }, [fontId, isVisible])
}

function FontCard({ font, selected, onSelect }: { font: FontDuo; selected: boolean; onSelect: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useLazyFont(font.id, visible)

  return (
    <button ref={ref} onClick={onSelect}
      className={`text-left p-3 rounded-xl border-2 transition-all ${selected ? 'border-electric-ink bg-blue-50 dark:bg-white/5' : 'border-transparent bg-white dark:bg-gray-900/60 hover:border-gray-200 dark:hover:border-white/20'}`}>
      <div style={{ fontFamily: font.titleStack, fontSize: 17, fontWeight: 700, lineHeight: 1.2, marginBottom: 2 }}>Titre exemple</div>
      <div style={{ fontFamily: font.bodyStack, fontSize: 11, lineHeight: 1.4, opacity: 0.65, marginBottom: 6 }}>Corps du texte en {font.body}</div>
      <div className="text-[10px] text-gray-500 dark:text-white/40">{font.name}</div>
    </button>
  )
}

// ─── Section components ───────────────────────────────────────────────────────

function Section1Arch({ config, setConfig }: { config: Config; setConfig: (c: Config) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Architecture</h2>
      <p className="text-sm text-gray-500 dark:text-white/50 mb-6">Quelle est la structure principale de votre site ?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ARCHS.map(arch => {
          const pal = PALETTES.find(p => p.id === config.pal) ?? PALETTES[0]
          const sel = config.arch === arch.id
          return (
            <button key={arch.id} onClick={() => setConfig({ ...config, arch: arch.id })}
              className={`text-left p-4 rounded-xl border-2 transition-all ${sel ? 'border-electric-ink dark:border-electric bg-blue-50 dark:bg-white/5' : 'border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900/60 hover:border-gray-300'}`}>
              <div className="mb-3 pointer-events-none">
                <ArchWireframe archId={arch.id} pal={pal} />
              </div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">{arch.label}</div>
              <div className="text-xs text-gray-500 dark:text-white/40 mt-0.5">{arch.ideal}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {arch.tags.map(t => <span key={t} className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/10 text-[9px] rounded-full text-gray-600 dark:text-white/50">{t}</span>)}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const PAL_FAMILIES = ['Bleu pro','Neutre','Chaleureux','Tech dark','Luxe','Nature','Vif & pop','Pastel','Mono','Institutionnel']

function Section2Pal({ config, setConfig }: { config: Config; setConfig: (c: Config) => void }) {
  const [fam, setFam] = useState<string|null>(null)
  const visible = fam ? PALETTES.filter(p => p.fam === fam) : PALETTES

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Palette de couleurs</h2>
      <p className="text-sm text-gray-500 dark:text-white/50 mb-4">50 palettes, 9 univers. Choisissez celle qui vous ressemble.</p>
      <div className="flex flex-wrap gap-2 mb-5">
        <button onClick={() => setFam(null)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!fam ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>Toutes</button>
        {PAL_FAMILIES.map(f => (
          <button key={f} onClick={() => setFam(f === fam ? null : f)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${fam === f ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{f}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visible.map(pal => {
          const sel = config.pal === pal.id
          return (
            <button key={pal.id} onClick={() => setConfig({ ...config, pal: pal.id })}
              className={`rounded-xl border-2 overflow-hidden transition-all ${sel ? 'border-electric-ink dark:border-electric' : 'border-transparent hover:border-gray-300 dark:hover:border-white/20'}`}>
              <div className="flex h-12">
                {[pal.dom, pal.sec, pal.acc, pal.bg, pal.txt].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>
              <div className="px-2 py-1.5 bg-white dark:bg-gray-900 text-left">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">{pal.name}</div>
                <div className="text-[10px] text-gray-400 dark:text-white/30">{pal.fam}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const FONT_STYLES = ['Moderne sans','Éditorial serif','Humaniste','Géométrique','Technique','Condensé','Élégant luxe','Friendly','Mixed']

function Section3Font({ config, setConfig }: { config: Config; setConfig: (c: Config) => void }) {
  const [style, setStyle] = useState<string|null>(null)
  const visible = style ? FONTS.filter(f => f.style === style) : FONTS

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Typographie</h2>
      <p className="text-sm text-gray-500 dark:text-white/50 mb-4">50 duos titre/corps. Les polices se chargent à la volée.</p>
      <div className="flex flex-wrap gap-2 mb-5">
        <button onClick={() => setStyle(null)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!style ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>Tous</button>
        {FONT_STYLES.map(s => (
          <button key={s} onClick={() => setStyle(s === style ? null : s)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${style === s ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{s}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visible.map(f => (
          <FontCard key={f.id} font={f} selected={config.font === f.id} onSelect={() => setConfig({ ...config, font: f.id })} />
        ))}
      </div>
    </div>
  )
}

function Section4Finitions({ config, setConfig }: { config: Config; setConfig: (c: Config) => void }) {
  const set = (k: keyof Config, v: Config[keyof Config]) => setConfig({ ...config, [k]: v })

  const animLabels = ['Aucune', 'Subtile', 'Marquée', 'Spectaculaire']
  const densityLabels = ['Aéré', 'Équilibré', 'Dense']
  const cornerLabels = ['Anguleux', 'Doux', 'Très arrondi']
  const imageryOpts = ['photo', 'illustration', 'abstract', 'minimaliste', 'icônes']
  const themeOpts = ['light', 'dark', 'auto']
  const toneOpts = ['professionnel', 'chaleureux', 'innovant', 'prestige', 'engagé', 'ludique', 'rassurant']

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Finitions</h2>
        <p className="text-sm text-gray-500 dark:text-white/50 mb-6">Les derniers ajustements qui font la différence.</p>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Animations <span className="font-normal text-gray-500 dark:text-white/40">— {animLabels[config.anim]}</span></div>
        <input type="range" min={0} max={3} value={config.anim} onChange={e => set('anim', +e.target.value)} className="w-full accent-electric-ink" />
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-white/30 mt-1">
          {animLabels.map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Densité <span className="font-normal text-gray-500 dark:text-white/40">— {densityLabels[config.density]}</span></div>
        <div className="flex gap-2">
          {densityLabels.map((l, i) => (
            <button key={l} onClick={() => set('density', i)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${config.density === i ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Coins <span className="font-normal text-gray-500 dark:text-white/40">— {cornerLabels[config.corners]}</span></div>
        <div className="flex gap-3">
          {cornerLabels.map((l, i) => {
            const r = i === 0 ? '0px' : i === 1 ? '8px' : '20px'
            return (
              <button key={l} onClick={() => set('corners', i)}
                className={`flex-1 py-3 text-xs font-medium border-2 transition-all ${config.corners === i ? 'border-electric-ink bg-blue-50 dark:bg-white/5' : 'border-gray-200 dark:border-white/10 hover:border-gray-300'}`}
                style={{ borderRadius: r }}>{l}</button>
            )
          })}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Imagerie</div>
        <div className="flex flex-wrap gap-2">
          {imageryOpts.map(o => (
            <button key={o} onClick={() => set('imagery', o)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${config.imagery === o ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{o}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Thème</div>
        <div className="flex gap-2">
          {themeOpts.map(o => (
            <button key={o} onClick={() => set('theme', o)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${config.theme === o ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{o}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold text-sm text-gray-800 dark:text-white/80 mb-3">Ton & personnalité</div>
        <div className="flex flex-wrap gap-2">
          {toneOpts.map(o => (
            <button key={o} onClick={() => set('tone', o)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${config.tone === o ? 'bg-electric-ink text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/60 hover:bg-gray-200'}`}>{o}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Profile result ───────────────────────────────────────────────────────────

function ProfileCard({ config }: { config: Config }) {
  const [copied, setCopied] = useState(false)
  const [sharedUrl, setSharedUrl] = useState(false)
  const [exported, setExported] = useState(false)
  const pal = PALETTES.find(p => p.id === config.pal) ?? PALETTES[0]
  const font = FONTS.find(f => f.id === config.font) ?? FONTS[0]
  const arch = ARCHS.find(a => a.id === config.arch) ?? ARCHS[0]
  const code = genProfileCode(config)

  const devisUrl = `/devis?style=${encodeURIComponent(code)}&arch=${config.arch}&pal=${config.pal}&font=${config.font}&theme=${config.theme}&tone=${encodeURIComponent(config.tone)}&src=studio`

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.('event', 'studio_copy_profile', { profile_code: code })
    }
  }, [code])

  const shareUrl = useCallback(() => {
    const url = `${window.location.origin}/outils/studio-de-style?arch=${config.arch}&pal=${config.pal}&font=${config.font}&anim=${config.anim}&density=${config.density}&corners=${config.corners}&theme=${config.theme}&tone=${encodeURIComponent(config.tone)}`
    navigator.clipboard.writeText(url).then(() => {
      setSharedUrl(true)
      setTimeout(() => setSharedUrl(false), 2500)
    })
  }, [config])

  const exportStyleGuide = useCallback(() => {
    const swatches = [pal.dom, pal.sec, pal.bg, pal.txt, pal.acc]
    const swatchHtml = swatches.map(c => `
      <div style="display:inline-block;margin-right:8px;text-align:center">
        <div style="width:48px;height:48px;border-radius:8px;background:${c};border:1px solid #e0e0e0;margin-bottom:4px"></div>
        <div style="font-size:10px;color:#555;font-family:monospace">${c}</div>
      </div>`).join('')
    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
    <title>Guide de style — ${code}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; color: #111; background: #fff; padding: 32px; max-width: 780px; margin: 0 auto; }
      h1 { font-size: 22px; font-weight: 700; color: #1E3A5F; margin-bottom: 4px; }
      .meta { font-size: 12px; color: #999; margin-bottom: 32px; border-bottom: 1px solid #e0e0e0; padding-bottom: 16px; }
      .code-badge { display: inline-block; background: #1E3A5F; color: #fff; font-family: monospace; padding: 4px 12px; border-radius: 6px; font-size: 14px; }
      h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #1E3A5F; margin: 28px 0 12px; border-left: 3px solid #1E3A5F; padding-left: 10px; }
      .row { display: flex; gap: 12px; margin-bottom: 6px; }
      .label { font-size: 12px; color: #777; min-width: 110px; }
      .value { font-size: 13px; font-weight: 600; }
      .pill { display: inline-block; background: #f0f4ff; color: #1E3A5F; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 600; margin-right: 4px; margin-bottom: 4px; }
      .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center; }
      .footer a { color: #1E3A5F; }
      @media print {
        body { padding: 16px; }
        @page { margin: 1.5cm; size: A4; }
      }
    </style></head><body>
    <h1>Guide de style — Stackup Studio</h1>
    <div class="meta">
      Code de style&nbsp;: <span class="code-badge">${code}</span>
      &nbsp;&nbsp;•&nbsp;&nbsp;Généré le ${new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' })}
    </div>
    <h2>Architecture du site</h2>
    <div class="row"><span class="label">Type</span><span class="value">${arch.label}</span></div>
    <div class="row"><span class="label">Idéal pour</span><span class="value">${arch.ideal}</span></div>
    <div>${arch.tags.map(t => `<span class="pill">${t}</span>`).join('')}</div>
    <h2>Palette de couleurs</h2>
    <div style="margin-bottom:16px">${swatchHtml}</div>
    <div class="row"><span class="label">Famille</span><span class="value">${pal.fam} — ${pal.name}</span></div>
    <div class="row"><span class="label">Couleur dominante</span><span class="value" style="font-family:monospace">${pal.dom}</span></div>
    <div class="row"><span class="label">Secondaire</span><span class="value" style="font-family:monospace">${pal.sec}</span></div>
    <div class="row"><span class="label">Fond</span><span class="value" style="font-family:monospace">${pal.bg}</span></div>
    <div class="row"><span class="label">Texte</span><span class="value" style="font-family:monospace">${pal.txt}</span></div>
    <div class="row"><span class="label">Accent</span><span class="value" style="font-family:monospace">${pal.acc}</span></div>
    <h2>Typographie</h2>
    <div class="row"><span class="label">Titres</span><span class="value">${font.title}</span></div>
    <div class="row"><span class="label">Corps de texte</span><span class="value">${font.body}</span></div>
    <div class="row"><span class="label">Style</span><span class="value">${font.style}</span></div>
    <h2>Finitions & personnalité</h2>
    <div class="row"><span class="label">Ton</span><span class="value capitalize">${config.tone}</span></div>
    <div class="row"><span class="label">Thème</span><span class="value capitalize">${config.theme}</span></div>
    <div class="row"><span class="label">Densité</span><span class="value">${['Aéré','Équilibré','Dense'][config.density]}</span></div>
    <div class="row"><span class="label">Coins</span><span class="value">${['Anguleux (0px)','Doux (8px)','Très arrondi (20px)'][config.corners]}</span></div>
    <div class="row"><span class="label">Animations</span><span class="value">${['Aucune','Subtile','Marquée','Spectaculaire'][config.anim]}</span></div>
    <div class="footer">
      Transmettez ce guide à votre agence pour votre devis.<br>
      <a href="${typeof window !== 'undefined' ? window.location.origin : 'https://stackup.agency'}/devis">stackup.agency/devis</a>
    </div>
    <script>window.onload = () => { window.print() }<\/script>
    </body></html>`
    const w = window.open('', '_blank', 'width=900,height=700')
    if (w) { w.document.write(html); w.document.close() }
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }, [code, arch, pal, font, config])

  return (
    <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0A0F1C] rounded-2xl p-6 text-white">
      <div className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Votre profil de style</div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/5 rounded-xl p-3 transition-all hover:bg-white/10">
          <div className="text-[10px] text-white/40 mb-1">Architecture</div>
          <div className="text-sm font-semibold">{arch.label}</div>
          <div className="text-[10px] text-white/30 mt-0.5">{arch.id}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 transition-all hover:bg-white/10">
          <div className="text-[10px] text-white/40 mb-1">Palette</div>
          <div className="flex gap-1 mb-1">
            {[pal.dom, pal.sec, pal.acc].map((c, i) => <div key={i} style={{ background: c }} className="studio-color-swatch w-4 h-4 rounded-full" />)}
          </div>
          <div className="text-sm font-semibold">{pal.name}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 transition-all hover:bg-white/10">
          <div className="text-[10px] text-white/40 mb-1">Typographie</div>
          <div className="text-sm font-semibold">{font.title}</div>
          <div className="text-[10px] text-white/40">{font.body}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 transition-all hover:bg-white/10">
          <div className="text-[10px] text-white/40 mb-1">Finitions</div>
          <div className="text-sm font-semibold capitalize">{config.tone}</div>
          <div className="text-[10px] text-white/40 capitalize">{config.theme} · {['Aéré','Équilibré','Dense'][config.density]}</div>
        </div>
      </div>

      {/* Code */}
      <div className="bg-white/10 rounded-xl p-3 mb-4 flex items-center justify-between">
        <span className="font-mono text-sm text-white/90 tracking-wider">{code}</span>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors">
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copié !' : 'Code'}
        </button>
      </div>

      {/* Share + Export */}
      <div className="flex gap-2 mb-4">
        <button onClick={shareUrl}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 ${sharedUrl ? 'text-green-400' : 'text-white/60'}`}>
          {sharedUrl ? <Check size={13} /> : <Share2 size={13} />}
          {sharedUrl ? 'URL copiée !' : 'Partager'}
        </button>
        <button onClick={exportStyleGuide}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border border-white/10 hover:border-white/20 hover:bg-white/5 ${exported ? 'text-green-400' : 'text-white/60'}`}>
          {exported ? <Check size={13} /> : <Download size={13} />}
          {exported ? 'PDF ouvert !' : 'Exporter PDF'}
        </button>
      </div>

      <Link href={devisUrl} onClick={() => {
        if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
          (window as Window & { gtag?: Function }).gtag?.('event', 'studio_cta_maquette', { profile_code: code })
        }
      }}
        className="btn-lift block w-full text-center py-3.5 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/30 text-sm">
        Recevoir MA MAQUETTE →
      </Link>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 's1', label: 'Architecture' },
  { id: 's2', label: 'Palette' },
  { id: 's3', label: 'Typographie' },
  { id: 's4', label: 'Finitions' },
]

export default function StudioClient() {
  const [config, setConfigState] = useState<Config>(DEFAULT_CONFIG)
  const [abConfig, setAbConfig] = useState<Config | null>(null)
  const [abMode, setAbMode] = useState(false)
  const [section, setSection] = useState(0)
  const [mounted, setMounted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionTitleRef = useRef<HTMLSpanElement>(null)

  const goToSection = useCallback((next: number | ((s: number) => number)) => {
    setSection(prev => {
      const n = typeof next === 'function' ? next(prev) : next
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
        sectionTitleRef.current?.focus({ preventScroll: true })
      }, 50)
      return n
    })
  }, [])

  useEffect(() => {
    // Load from URL params first, then sessionStorage
    const params = new URLSearchParams(window.location.search)
    const urlConfig: Partial<Config> = {}
    if (params.get('arch')) urlConfig.arch = params.get('arch')!
    if (params.get('pal'))  urlConfig.pal  = params.get('pal')!
    if (params.get('font')) urlConfig.font = params.get('font')!
    if (params.get('anim') !== null) urlConfig.anim = Number(params.get('anim'))
    if (params.get('density') !== null) urlConfig.density = Number(params.get('density'))
    if (params.get('corners') !== null) urlConfig.corners = Number(params.get('corners'))
    if (params.get('theme')) urlConfig.theme = params.get('theme')!
    if (params.get('tone'))  urlConfig.tone  = decodeURIComponent(params.get('tone')!)
    const fromUrl = Object.keys(urlConfig).length > 0
    const saved = fromUrl ? { ...DEFAULT_CONFIG, ...urlConfig } : loadConfig()
    setConfigState(saved)
    setMounted(true)
  }, [])

  const setConfig = useCallback((c: Config) => {
    setConfigState(c)
    saveConfig(c)
    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.('event', 'studio_section', { section: SECTIONS[section].label })
    }
  }, [section])

  const applyPreset = useCallback((preset: Preset) => {
    const newConfig = { ...config, ...preset.config }
    setConfigState(newConfig)
    saveConfig(newConfig)
    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.('event', 'studio_preset', { preset_id: preset.id })
    }
  }, [config])

  const surprise = useCallback(() => {
    const newConfig = randomConfig()
    setConfigState(newConfig)
    saveConfig(newConfig)
    if (typeof window !== 'undefined' && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.('event', 'studio_surprise')
    }
  }, [])

  if (!mounted) return <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-900/50 rounded-2xl m-8" />

  const progress = ((section + 1) / SECTIONS.length) * 100

  return (
    <div ref={wrapperRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-8" style={{ scrollMarginTop: '5rem' }}>
      {/* Presets bandeau */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-1">
          <span className="text-xs text-gray-500 dark:text-white/40 self-center mr-1 shrink-0">Démarrer avec :</span>
          {PRESETS.map(p => (
            <button key={p.id} type="button" onClick={() => applyPreset(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 hover:border-electric-ink dark:hover:border-electric text-xs font-medium text-gray-700 dark:text-white/70 transition-colors whitespace-nowrap">
              <span>{p.emoji}</span> {p.label}
            </button>
          ))}
          <button type="button" onClick={surprise}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric-ink text-white text-xs font-medium hover:bg-electric-ink/80 transition-colors whitespace-nowrap">
            <Shuffle size={12} /> Surprends-moi
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Left: configurator */}
        <div>
          {/* Focus target for scroll discipline */}
          <span ref={sectionTitleRef} tabIndex={-1} className="sr-only" aria-live="polite">
            {SECTIONS[section].label}
          </span>

          {/* Progress + sommaire */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-white/70">Étape {section + 1} / {SECTIONS.length}</span>
              <span className="text-xs text-gray-400 dark:text-white/30">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-electric-ink rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex gap-1">
              {SECTIONS.map((s, i) => (
                <button key={s.id} type="button" onClick={() => goToSection(i)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${i === section ? 'bg-electric-ink text-white' : i < section ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/40'}`}>
                  {i < section ? '✓ ' : ''}{s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section content */}
          <div className="mb-6">
            {section === 0 && <Section1Arch config={config} setConfig={setConfig} />}
            {section === 1 && <Section2Pal config={config} setConfig={setConfig} />}
            {section === 2 && <Section3Font config={config} setConfig={setConfig} />}
            {section === 3 && <Section4Finitions config={config} setConfig={setConfig} />}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {section > 0 && (
              <button type="button" onClick={() => goToSection(s => s - 1)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                ← Précédent
              </button>
            )}
            {section < SECTIONS.length - 1 ? (
              <button type="button" onClick={() => goToSection(s => s + 1)}
                className="flex-1 py-2.5 bg-electric-ink hover:bg-electric-ink/90 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
                Suivant : {SECTIONS[section + 1].label} <ChevronRight size={14} className="inline" />
              </button>
            ) : (
              <button type="button" onClick={() => goToSection(0)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                Recommencer
              </button>
            )}
          </div>
        </div>

        {/* Right: live preview + profile */}
        <div className="space-y-5 lg:sticky lg:top-24 self-start" id="studio-preview-panel">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider">Aperçu en direct</div>
              <button
                type="button"
                onClick={() => {
                  if (abMode) { setAbConfig(null); setAbMode(false) }
                  else { setAbConfig(randomConfig()); setAbMode(true) }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${abMode ? 'bg-electric-ink text-white border-electric-ink' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-gray-300'}`}
              >
                <Columns2 size={11} /> {abMode ? 'Quitter A/B' : 'Mode A/B'}
              </button>
            </div>
            <LivePreview config={config} abConfig={abMode && abConfig ? abConfig : undefined} />
          </div>
          <ProfileCard config={config} />
        </div>
      </div>

      {/* ── Galerie des courants de style ───────────────────────────── */}
      <StyleCurrentsGallery />
    </div>
  )
}

// ─── Style Currents Gallery ───────────────────────────────────────────────────

const STYLE_CURRENTS = [
  {
    id: 'minimaliste',
    name: 'Minimaliste Scandinave',
    desc: 'Blanc, beaucoup d\'espace, typographie épurée, zéro décoration superflue. Le contenu est roi.',
    refs: [
      { name: 'Linear', url: 'https://linear.app' },
      { name: 'Notion', url: 'https://notion.so' },
    ],
    bg: '#FAFAFA', header: '#F0F0F0', accent: '#111111',
    preview: 'minimal',
  },
  {
    id: 'editorial',
    name: 'Éditorial Bold',
    desc: 'Contrastes marqués, typographies expressives XXL, compositions asymétriques. Le layout EST le message.',
    refs: [
      { name: 'Pentagram', url: 'https://pentagram.com' },
      { name: 'It\'s Nice That', url: 'https://itsnicethat.com' },
    ],
    bg: '#FFFFFF', header: '#000000', accent: '#FF2D2D',
    preview: 'editorial',
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    desc: 'Fond sombre profond, couleurs lumineuses, effets de lumière, verre dépoli. La sophistication nocturne.',
    refs: [
      { name: 'Stripe', url: 'https://stripe.com' },
      { name: 'Vercel', url: 'https://vercel.com' },
    ],
    bg: '#0A0F1C', header: '#161E34', accent: '#4F9CF9',
    preview: 'dark',
  },
  {
    id: 'artisanal',
    name: 'Artisanal & Chaleureux',
    desc: 'Textures organiques, tons terre, polices expressives à empattements. L\'authenticité du fait-main.',
    refs: [
      { name: 'Mailchimp', url: 'https://mailchimp.com' },
      { name: 'Basecamp', url: 'https://basecamp.com' },
    ],
    bg: '#FAF6F1', header: '#F0E8D8', accent: '#C67C3C',
    preview: 'artisan',
  },
  {
    id: 'tech-saas',
    name: 'Tech & SaaS',
    desc: 'Interface dense et efficace, données mises en avant, grilles structurées, CTAs clairs. L\'outil d\'abord.',
    refs: [
      { name: 'Figma', url: 'https://figma.com' },
      { name: 'Airtable', url: 'https://airtable.com' },
    ],
    bg: '#F8FAFC', header: '#1E3A5F', accent: '#2563EB',
    preview: 'saas',
  },
  {
    id: 'luxe',
    name: 'Luxe & Prestige',
    desc: 'Fond noir, or, silence habité, typographies fines, photos plein-écran. La rareté comme esthétique.',
    refs: [
      { name: 'Rolex', url: 'https://rolex.com' },
      { name: 'Net-a-Porter', url: 'https://net-a-porter.com' },
    ],
    bg: '#0C0C0C', header: '#161610', accent: '#C9A84C',
    preview: 'luxe',
  },
]

type StyleCurrent = typeof STYLE_CURRENTS[0]

function StyleMockup({ c }: { c: StyleCurrent }) {
  const isDark = c.bg < '#500000'
  const textMain = isDark ? '#FFFFFF' : '#111111'
  const textMuted = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.32)'
  const cardBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)'

  return (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" className="w-full block" role="img" aria-label={`Maquette originale — courant ${c.name}`}>
      <rect width="280" height="180" fill={c.bg} />
      <rect width="280" height="28" fill={c.header} />
      <rect x="10" y="9" width="30" height="10" rx="2" fill={c.accent} opacity="0.9" />
      <rect x="160" y="11" width="28" height="6" rx="1" fill={textMuted} />
      <rect x="196" y="11" width="28" height="6" rx="1" fill={textMuted} />
      <rect x="232" y="8" width="38" height="12" rx="2" fill={c.accent} />
      {c.preview === 'editorial' && <>
        <text x="10" y="74" fill={textMain} fontSize="28" fontFamily="Georgia,serif" fontWeight="700">BOLD</text>
        <text x="10" y="102" fill={c.accent} fontSize="28" fontFamily="Georgia,serif" fontWeight="700">TYPE</text>
        <rect x="185" y="36" width="84" height="72" rx="4" fill={cardBg} />
        <rect x="192" y="44" width="70" height="56" rx="2" fill={textMuted} opacity="0.25" />
      </>}
      {c.preview === 'dark' && <>
        <circle cx="140" cy="76" r="44" fill={c.accent} opacity="0.07" />
        <circle cx="140" cy="76" r="28" fill={c.accent} opacity="0.06" />
        <text x="140" y="71" fill={textMain} fontSize="12" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">STACKUP</text>
        <text x="140" y="86" fill={c.accent} fontSize="6.5" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">PERFORMANCE · DESIGN</text>
        <rect x="112" y="96" width="56" height="10" rx="5" fill={c.accent} />
      </>}
      {c.preview === 'artisan' && <>
        <rect x="10" y="38" width="120" height="78" rx="6" fill={cardBg} />
        <text x="70" y="66" fill={c.accent} fontSize="11" fontFamily="Georgia,serif" fontWeight="700" textAnchor="middle">Fait à la main</text>
        <text x="70" y="81" fill={textMuted} fontSize="6.5" fontFamily="Georgia,serif" textAnchor="middle">Authenticité · Savoir-faire</text>
        <rect x="46" y="91" width="48" height="8" rx="4" fill={c.accent} opacity="0.7" />
        <circle cx="195" cy="77" r="36" fill={cardBg} />
        <rect x="179" y="63" width="32" height="28" rx="2" fill={c.accent} opacity="0.18" />
      </>}
      {c.preview === 'saas' && <>
        <rect x="10" y="36" width="78" height="100" rx="4" fill={cardBg} />
        <rect x="14" y="42" width="40" height="4" rx="1" fill={c.accent} opacity="0.6" />
        {[0,1,2,3,4].map(i => <rect key={i} x="14" y={52+i*14} width={58} height="7" rx="1" fill={textMuted} opacity="0.35" />)}
        <rect x="98" y="36" width="172" height="48" rx="4" fill={cardBg} />
        <rect x="104" y="44" width="58" height="6" rx="1" fill={textMain} opacity="0.7" />
        <rect x="104" y="56" width="100" height="4" rx="1" fill={textMuted} opacity="0.4" />
        <rect x="104" y="66" width="78" height="4" rx="1" fill={textMuted} opacity="0.3" />
        <rect x="98" y="92" width="82" height="44" rx="4" fill={c.accent} opacity="0.1" />
        <rect x="188" y="92" width="82" height="44" rx="4" fill={cardBg} />
      </>}
      {c.preview === 'luxe' && <>
        <rect x="40" y="38" width="200" height="80" rx="2" fill={cardBg} />
        <line x1="140" y1="42" x2="140" y2="115" stroke={c.accent} strokeWidth="0.5" opacity="0.4" />
        <text x="90" y="72" fill={c.accent} fontSize="8" fontFamily="Georgia,serif" textAnchor="middle" letterSpacing="3">MAISON</text>
        <text x="90" y="88" fill={textMain} fontSize="14" fontFamily="Georgia,serif" textAnchor="middle" fontWeight="700">STACKUP</text>
        <text x="190" y="72" fill={textMuted} fontSize="6.5" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">EST. 2020</text>
        <rect x="116" y="104" width="48" height="5" rx="0" fill={c.accent} opacity="0.8" />
      </>}
      {c.preview === 'minimal' && <>
        <text x="30" y="66" fill={textMain} fontSize="13" fontFamily="sans-serif" fontWeight="700">Titre principal</text>
        <text x="30" y="80" fill={textMuted} fontSize="6.5" fontFamily="sans-serif">Sous-titre descriptif en gris clair</text>
        <rect x="30" y="89" width="48" height="10" rx="2" fill={textMain} />
        <rect x="84" y="89" width="48" height="10" rx="2" fill={cardBg} stroke={textMuted} strokeWidth="0.5" />
        <rect x="158" y="40" width="112" height="80" rx="6" fill={cardBg} />
        <rect x="166" y="50" width="96" height="56" rx="2" fill={textMuted} opacity="0.14" />
      </>}
      <rect y="160" width="280" height="20" fill={c.header} opacity="0.65" />
      <rect x="10" y="166" width="56" height="4" rx="1" fill={textMuted} opacity="0.5" />
      <rect x="100" y="166" width="38" height="4" rx="1" fill={textMuted} opacity="0.3" />
      <rect x="198" y="166" width="70" height="4" rx="1" fill={textMuted} opacity="0.3" />
    </svg>
  )
}

function StyleCurrentsGallery() {
  return (
    <section className="border-t border-gray-100 dark:border-white/10 mt-6 pt-12 pb-4">
      <div className="mb-8">
        <div className="text-xs font-semibold text-electric-ink dark:text-electric uppercase tracking-widest mb-2">Inspiration</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Courants de style</h2>
        <p className="text-gray-500 dark:text-white/40 text-sm max-w-2xl">
          Six grandes directions esthétiques illustrées par des maquettes originales.
          Cliquez « Voir le site » pour vous inspirer.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {STYLE_CURRENTS.map(c => (
          <article key={c.id}
            className="group bg-white dark:bg-white/3 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 hover:border-electric-ink/40 dark:hover:border-electric/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative overflow-hidden rounded-t-2xl">
              <StyleMockup c={c} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/8 pointer-events-none" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5">{c.name}</h3>
              <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed mb-3">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.refs.map(r => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-electric-ink dark:text-electric hover:underline font-medium">
                    {r.name}
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 10L10 2M10 2H5M10 2V7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-gray-400 dark:text-white/20 px-4">
        Sites cités à titre de référence et d&apos;inspiration — aucune affiliation ni partenariat avec ces marques.
        Les maquettes présentées ci-dessus sont des créations originales Stackup.
      </p>
    </section>
  )
}
