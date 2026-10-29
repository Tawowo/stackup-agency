import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Kiosque from '@/experiences/journal/Kiosque'
import { RAYONS, tousLesArticles } from '@/lib/blog'
import { meta, filAriane, JsonLd } from '@/lib/seo'

// Les articles programmés (publishAt) paraissent à leur date sans redéploiement.
export const revalidate = 43200

/** Une page par rayon (9). Les 21 catégories de l'ancien site redirigent (301) vers leur rayon : voir scripts/redirections.mjs. */
function categories() {
  return RAYONS.map((r) => r.id)
}

export function generateStaticParams() {
  return categories().map((cat) => ({ cat }))
}

function rayon(cat: string) {
  return RAYONS.find((r) => r.id === cat)
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params
  const r = rayon(cat)
  if (!r) return {}
  const assez = tousLesArticles().filter((a) => r.categories.includes(a.categorie)).length >= 3
  return meta({ titre: `${r.nom} — le blog de Stackup Agency`, description: `${r.ligne} Les guides du rayon « ${r.nom} » pour les artisans, commerçants et petites entreprises.`, chemin: `/blog/categorie/${cat}`, noindex: !assez })
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
