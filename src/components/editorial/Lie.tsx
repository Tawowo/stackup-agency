/**
 * TEXTE AVEC LIENS — rend `[texte](/chemin)` en lien et `**texte**` en gras dans un texte de données.
 * Rien d'autre n'est interprété : le reste reste du texte.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

const MOTIF = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

export function sansLiens(t: string): string {
  return t.replace(MOTIF, (_, texte, _url, gras) => texte ?? gras)
}

export default function Lie({ t }: { t: string }): ReactNode {
  const morceaux: ReactNode[] = []
  let dernier = 0
  for (const m of t.matchAll(MOTIF)) {
    if (m.index > dernier) morceaux.push(t.slice(dernier, m.index))
    const [, texte = '', url = '', gras] = m
    if (gras !== undefined) morceaux.push(<strong key={m.index}>{gras}</strong>)
    else if (url.startsWith('/')) morceaux.push(<Link key={m.index} href={url}>{texte}</Link>)
    else morceaux.push(<a key={m.index} href={url} rel="noopener noreferrer">{texte}</a>)
    dernier = m.index + m[0].length
  }
  if (!morceaux.length) return t
  if (dernier < t.length) morceaux.push(t.slice(dernier))
  return <>{morceaux}</>
}
