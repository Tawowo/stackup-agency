/**
 * PDF SIMPLE — un générateur de PDF texte (A4, Helvetica, accents français) sans aucune dépendance.
 * Sert au téléchargement du cahier des charges côté visiteur : titre, sous-titres, paragraphes et listes.
 * (Les documents contractuels sont, eux, rendus depuis HTML par `npm run documents`.)
 */

export type BlocPdf = { type: 'titre' | 'sous-titre' | 'texte' | 'puce' | 'espace'; texte?: string }

const LARGEUR = 595
const HAUTEUR = 842
const MARGE = 56
/** Largeurs moyennes Helvetica (1/1000 em) : approximation suffisante pour couper les lignes. */
const LARGEUR_MOY = 0.5

// Windows-1252 (WinAnsiEncoding) : les caractères au-delà de Latin-1 que le texte français utilise.
const WIN1252: Record<string, number> = { '€': 0x80, '’': 0x92, '‘': 0x91, '“': 0x93, '”': 0x94, '–': 0x96, '—': 0x97, '…': 0x85, '•': 0x95, 'œ': 0x9c, 'Œ': 0x8c }

function octets(s: string): number[] {
  const out: number[] = []
  for (const ch of s.replace(/[  ]/g, ' ')) {
    const c = ch.codePointAt(0)!
    if (WIN1252[ch] !== undefined) out.push(WIN1252[ch]!)
    else if (c < 256) out.push(c)
    else out.push(0x3f)
  }
  return out
}
const echapper = (b: number[]) => b.map((c) => (c === 0x28 || c === 0x29 || c === 0x5c ? `\\${String.fromCharCode(c)}` : c < 32 || c > 126 ? `\\${c.toString(8).padStart(3, '0')}` : String.fromCharCode(c))).join('')

function couper(texte: string, taille: number, largeurMax: number): string[] {
  const maxCar = Math.max(10, Math.floor(largeurMax / (taille * LARGEUR_MOY)))
  const lignes: string[] = []
  for (const para of texte.split('\n')) {
    let ligne = ''
    for (const mot of para.split(/\s+/).filter(Boolean)) {
      if ((ligne + ' ' + mot).trim().length > maxCar && ligne) {
        lignes.push(ligne)
        ligne = mot
      } else ligne = (ligne + ' ' + mot).trim()
    }
    lignes.push(ligne)
  }
  return lignes
}

/** Construit le PDF et renvoie ses octets. */
export function creerPdf(blocs: BlocPdf[], pied = ''): Uint8Array {
  const pages: string[][] = [[]]
  let y = HAUTEUR - MARGE
  const nouvellePage = () => {
    pages.push([])
    y = HAUTEUR - MARGE
  }
  const ecrire = (texte: string, taille: number, gras: boolean, x: number, interligne: number) => {
    if (y - interligne < MARGE + 20) nouvellePage()
    y -= interligne
    pages[pages.length - 1]!.push(`BT /${gras ? 'F2' : 'F1'} ${taille} Tf ${x} ${y.toFixed(1)} Td (${echapper(octets(texte))}) Tj ET`)
  }
  for (const b of blocs) {
    if (b.type === 'espace') {
      y -= 10
      continue
    }
    const t = b.texte ?? ''
    if (b.type === 'titre') couper(t, 22, LARGEUR - 2 * MARGE).forEach((l) => ecrire(l, 22, true, MARGE, 28))
    else if (b.type === 'sous-titre') {
      y -= 8
      couper(t, 13, LARGEUR - 2 * MARGE).forEach((l) => ecrire(l, 13, true, MARGE, 18))
    } else if (b.type === 'puce') couper(t, 10.5, LARGEUR - 2 * MARGE - 16).forEach((l, i) => ecrire(i === 0 ? `• ${l}` : `  ${l}`, 10.5, false, MARGE + 8, 14.5))
    else couper(t, 10.5, LARGEUR - 2 * MARGE).forEach((l) => ecrire(l, 10.5, false, MARGE, 14.5))
  }
  // Objets : 1 catalogue, 2 pages, 3 police, 4 police grasse, puis (contenu, page) par page.
  const objets: string[] = []
  const nPages = pages.length
  const idPage = (i: number) => 5 + i * 2 + 1
  const idContenu = (i: number) => 5 + i * 2
  objets[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objets[2] = `<< /Type /Pages /Kids [${pages.map((_, i) => `${idPage(i)} 0 R`).join(' ')}] /Count ${nPages} >>`
  objets[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
  objets[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
  pages.forEach((p, i) => {
    const flux = [...p, `BT /F1 8 Tf ${MARGE} 30 Td (${echapper(octets(`${pied}${pied ? ' — ' : ''}page ${i + 1} sur ${nPages}`))}) Tj ET`].join('\n')
    objets[idContenu(i)] = `<< /Length ${flux.length} >>\nstream\n${flux}\nendstream`
    objets[idPage(i)] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${LARGEUR} ${HAUTEUR}] /Contents ${idContenu(i)} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>`
  })
  let pdf = '%PDF-1.4\n'
  const positions: number[] = []
  for (let i = 1; i < objets.length; i++) {
    positions[i] = pdf.length
    pdf += `${i} 0 obj\n${objets[i]}\nendobj\n`
  }
  const xref = pdf.length
  pdf += `xref\n0 ${objets.length}\n0000000000 65535 f \n${positions.slice(1).map((p) => `${String(p).padStart(10, '0')} 00000 n \n`).join('')}`
  pdf += `trailer\n<< /Size ${objets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  // Le contenu est en « octets » WinAnsi échappés en ASCII : chaque caractère = un octet.
  return Uint8Array.from(pdf, (c) => c.charCodeAt(0) & 0xff)
}
