/**
 * LES APPAREILS — géométries et matériaux d'un ordinateur portable et d'un
 * téléphone, en métal brossé : plaques extrudées à angles arrondis et chanfrein
 * fin (les arêtes accrochent la lumière), clavier gravé, encoche, charnière.
 * Hors Stack Engine : ce sont les OBJETS exposés, pas la matière de la scène.
 */
import { CanvasTexture, DoubleSide, ExtrudeGeometry, LinearFilter, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, Shape, SRGBColorSpace, type BufferGeometry } from 'three'

/** Plaque arrondie centrée (largeur × hauteur), extrudée sur `epaisseur`, chanfrein `bord`. */
export function plaqueArrondie(w: number, h: number, rayon: number, epaisseur: number, bord = 0.012): BufferGeometry {
  const x = -w / 2
  const y = -h / 2
  const s = new Shape()
  s.moveTo(x + rayon, y)
  s.lineTo(x + w - rayon, y)
  s.quadraticCurveTo(x + w, y, x + w, y + rayon)
  s.lineTo(x + w, y + h - rayon)
  s.quadraticCurveTo(x + w, y + h, x + w - rayon, y + h)
  s.lineTo(x + rayon, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - rayon)
  s.lineTo(x, y + rayon)
  s.quadraticCurveTo(x, y, x + rayon, y)
  const g = new ExtrudeGeometry(s, { depth: epaisseur - bord * 2, bevelEnabled: true, bevelThickness: bord, bevelSize: bord, bevelSegments: 2, curveSegments: 10 })
  g.translate(0, 0, -epaisseur / 2 + bord)
  return g
}

/** Plan arrondi (pour les écrans) : un shape rempli, normales vers +z. */
export function planArrondi(w: number, h: number, rayon: number): BufferGeometry {
  const g = plaqueArrondie(w, h, rayon, 0.002, 0.0005)
  return g
}

/** Texture de clavier : touches sombres sur fond de châssis, rangées décalées. */
export function textureClavier(): CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 512
  const g = c.getContext('2d')!
  g.fillStyle = '#20252d'
  g.fillRect(0, 0, 1024, 512)
  const rangees = [14, 14, 14, 13, 12]
  const marge = 36
  const hauteur = (512 - marge * 2 - 150) / rangees.length
  rangees.forEach((n, r) => {
    const larg = (1024 - marge * 2) / n
    for (let i = 0; i < n; i++) {
      g.fillStyle = '#0d1014'
      g.beginPath()
      g.roundRect(marge + i * larg + 3, marge + r * hauteur + 3, larg - 6, hauteur - 6, 6)
      g.fill()
      g.fillStyle = '#1a1f26'
      g.fillRect(marge + i * larg + 6, marge + r * hauteur + 6, larg - 12, 3)
    }
  })
  // Barre d'espace.
  g.fillStyle = '#0d1014'
  g.beginPath()
  g.roundRect(1024 * 0.26, 512 - 150 + 6, 1024 * 0.48, 44, 6)
  g.fill()
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  t.minFilter = LinearFilter
  t.wrapS = t.wrapT = RepeatWrapping
  t.repeat.set(1, 1)
  return t
}

export function materiauxAppareils(clavier: CanvasTexture) {
  const alu = new MeshPhysicalMaterial({ color: '#c3c8cf', metalness: 1, roughness: 0.3, clearcoat: 0.25, clearcoatRoughness: 0.4, envMapIntensity: 1.35 })
  const aluSombre = new MeshStandardMaterial({ color: '#9aa1ab', metalness: 1, roughness: 0.4, envMapIntensity: 1.1 })
  const cadre = new MeshStandardMaterial({ color: '#05070b', metalness: 0.2, roughness: 0.28, envMapIntensity: 0.6 })
  const deck = new MeshStandardMaterial({ map: clavier, metalness: 0.5, roughness: 0.55, envMapIntensity: 0.5 })
  const pave = new MeshStandardMaterial({ color: '#b4bac2', metalness: 1, roughness: 0.22, envMapIntensity: 1.2 })
  const titane = new MeshPhysicalMaterial({ color: '#8f8b86', metalness: 1, roughness: 0.34, clearcoat: 0.3, envMapIntensity: 1.3, side: DoubleSide })
  return { alu, aluSombre, cadre, deck, pave, titane }
}
