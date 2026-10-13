import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Kiosque from '@/experiences/journal/Kiosque'
import { RAYONS, rayonDe, tousLesArticles } from '@/lib/blog'
import { meta, filAriane, JsonLd } from '@/lib/seo'

// Les articles programmés (publishAt) paraissent à leur date sans redéploiement.
export const revalidate = 43200

/** Les URL de catégorie de l'ancien site (21 catégories) et les 9 rayons. */
function categories() {
  const anciennes = new Set(tousLesArticles().map((a) => a.categorie))
  RAYONS.forEach((r) => anciennes.add(r.id))
  return [...anciennes]
}

export function generateStaticParams() {
  return categories().map((cat) => ({ cat }))
}

function rayon(cat: string) {
  return RAYONS.find((r) => r.id === cat) ?? (tousLesArticles().some((a) => a.categorie === cat) ? rayonDe(cat) : undefined)
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params
  const r = rayon(cat)
  if (!r) return {}
  return meta({ titre: `${r.nom} — le blog de Stackup Agency`, description: `${r.ligne} Les guides du rayon « ${r.nom} » pour les artisans, commerçants et petites entreprises.`, chemin: `/blog/categorie/${cat}` })
}

export default async function Page({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params
  const r = rayon(cat)
  if (!r) notFound()
  return (
    <main>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Blog', chemin: '/blog' }, { nom: r.nom, chemin: `/blog/categorie/${cat}` }])} />
      <Kiosque articles={tousLesArticles()} rayons={RAYONS} rayonInitial={r.id} titre={r.nom} intro={r.ligne} />
    </main>
  )
}
