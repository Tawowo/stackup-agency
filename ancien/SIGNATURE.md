# SIGNATURE VISUELLE STACKUP — Langage Propriétaire

> Test de validation : logo masqué → on reconnaît Stackup en 3 secondes.  
> La clarté n'est jamais sacrifiée.

---

## 1. Fondations philosophiques

Stackup n'est pas une agence corporate. C'est un artisan numérique haut de gamme qui construit **à la main**. Notre esthétique reflète cette tension : technologie de précision + chaleur artisanale.

**Tension centrale** : Exactitude géométrique ↔ Souffle humain  
**Ton visuel** : Ambitieux sans arrogance. Dense sans lourdeur. Luxe sans ostentation.

---

## 2. Composition asymétrique — règles

### Grille de base
- Jamais centré-centré. Les éléments cherchent leur propre équilibre.
- Règle des tiers appliquée *asymétriquement* : masse principale à gauche, air à droite — ou inversé avec intention.
- Colonnes : 5, 7 ou 12. Jamais 4 ou 6 (trop symétriques).

### Décalage signature
- Un élément par section *déborde* volontairement hors de la grille de 1.5–3rem.
- Les numéros de section XXL (`01–05`) flottent derrière le contenu, légèrement coupés par le bord.
- Les cartes s'empilent avec un offset de 8–12px en alternance.

### Règle de l'espace vide actif
- Chaque section conserve **au moins une zone de silence** (min 30% de surface non meublée).
- L'œil doit *respirer* avant de se poser sur l'information.

---

## 3. Typographie comme matière graphique

### Hiérarchie des tailles
```
Display XXL : clamp(4rem, 10vw, 9rem)   — titres de section, 1 par page
Display XL  : clamp(3rem, 6vw, 5.5rem)  — heroes
H1          : clamp(2.2rem, 4vw, 3.5rem)
H2          : clamp(1.5rem, 2.5vw, 2rem)
H3          : 1.25rem
Body        : 1rem / 1.125rem
Caption     : 0.8125rem
```

### Effets typographiques propriétaires

**Texte fantôme** : `color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.07)`  
→ Les grands numéros de section s'inscrivent sans écraser le contenu.

**Soulignement animé** : `::after` pseudo-élément, `width: 0→100%` déclenché par IntersectionObserver.  
→ Jamais de soulignement natif HTML.

**Gradient sur texte** : `background-clip: text` pour les accents électriques.  
→ Réservé aux CTA et chiffres clés, pas aux corps de texte.

**Coupure de mot intentionnelle** : Les titres longs cassent à un mot précis pour rythmer la lecture.

---

## 4. Palette — Logique chromatique

### Couleurs primaires
```
Navy profond    : #060D1A  — fond principal, autorité
Bleu nuit       : #0A0F1C  — fond secondaire, profondeur
Électrique      : #2D7DD2  — accent, énergie, actions
Blanc pur       : #FFFFFF  — texte principal sur dark
```

### Déclinaisons d'opacité (signature)
```
Blanc/60  → corps de texte secondaire
Blanc/40  → labels, captions
Blanc/10  → bordures subtiles
Blanc/06  → text-stroke fantôme
Électrique/20 → backgrounds de carte sur hover
Électrique/60 → glows et halos
```

### Règle des accents colorés
- Un seul accent coloré par section visible (électrique **ou** vert succès **ou** rouge — jamais deux).
- Les glows (drop-shadow) sont toujours `color60` jamais `colorFF`.

---

## 5. Repères de navigation inventés

### Indicateurs de position propriétaires

**Progress liseuse** : barre `scaleX(0→1)` en `position:fixed; top:0` sur les pages de contenu long.  
→ Fine (2px), gradient navy→électrique.

**Numéros de section flottants** : `01` à `0N` en XXL translucide, position `absolute; right: -0.05em; top: -0.15em`.  
→ Débordent hors du container. Servent de repère de scroll visuel.

**Ligne de scan** : `section-divider::before` animée `left: -5%→105%` en 3s.  
→ Signale la transition entre sections au lieu d'un simple `<hr>`.

**Breadcrumb typographique** : `→` comme séparateur, taille `0.8rem`, opacité 60%.  
→ Jamais `›` ou `/`.

---

## 6. Rythme narratif entre sections

### Séquençage obligatoire par page

```
[Impact immédiat]    → Hero : claim XXL + sous-titre + CTA visible above fold
[Preuve rapide]      → Statistiques ou logos en 3 chiffres max
[Corps de valeur]    → Section principale (services / produit / outil)
[Pause respiration]  → Section neutre : citation, témoignage ou visuel plein-fond
[Relance]            → Section secondaire (avantages, processus)
[Friction réduite]   → FAQ courte ou comparatif
[Conversion]         → CTA final avec halos de particules
```

### Transitions entre sections
1. Section divider scanline (CSS, toujours)
2. Changement de fond : navy → nuit ou nuit → navy (alternance)
3. Animation de reveal : `opacity:0,y:30px → opacity:1,y:0px` avec délai staggeré

---

## 7. Micro-interactions systématiques

Chaque élément interactif a *exactement* une micro-interaction :

| Élément | Micro-interaction |
|---------|------------------|
| Bouton CTA | Scale 1.03 + glow électrique + translateY -2px |
| Card produit | TranslateY -4px + box-shadow 20px électrique/15% |
| Lien nav | Underline slide depuis gauche (::after, 300ms) |
| Badge/chip | Scale 1.05 + border électrique |
| Input form | Border électrique + label float |
| Icône | Scale 1.1 + rotate ±5° selon contexte |
| Image | Scale 1.02 sur le container (overflow hidden) |

**Durées** : hover → 200ms ease-out. Leave → 300ms ease-in-out.  
**Jamais** : color change brutal, opacity 0 sur hover, déplacement > 6px.

---

## 8. Particules et halos — règles d'emploi

Les halos de lumière électrique (`halo-particle`) sont **exclusivement réservés** aux CTA finaux de page.  
Jamais plus de 3 particules par zone.  
Orbit lente : 8–12s, opacité 0.4–0.6.  
Taille : 4–8px, border-radius: 50%.

---

## 9. Grille d'évaluation — Test de signature

Un design Stackup réussit si :

- [ ] Le fond est sombre avec au moins 70% de surface navy/nuit
- [ ] Un seul élément par section sort de la grille intentionnellement
- [ ] Les numéros de section sont présents ou un équivalent de repère de scroll
- [ ] Les animations sont `transform/opacity` only, 60fps
- [ ] Aucun élément centré-centré sur toute la page (sauf texte de paragraphe)
- [ ] La palette respecte la hiérarchie : navy → électrique → blanc → accents
- [ ] Chaque interaction a sa micro-animation
- [ ] Il y a au moins une zone de silence par section

---

## 10. Ce que Stackup ne fait JAMAIS

- ❌ Fond blanc ou gris clair (hors mode light forcé)
- ❌ Gradients arc-en-ciel ou dégradés pastels
- ❌ Ombres grises standard (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`)
- ❌ Boutons avec border-radius > 12px (pas de "pill" génériques)
- ❌ Animations de parallaxe sur le scroll (performance + mal des transports)
- ❌ Effets de suivi de souris
- ❌ Popups ou modals sans raison fonctionnelle claire
- ❌ Compteurs, rareté ou notifications inventés
- ❌ Icônes emoji dans les textes de corps
- ❌ Texte centré sur les blocs > 3 lignes

---

*Document vivant — mis à jour à chaque évolution du système de design Stackup.*
