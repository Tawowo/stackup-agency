import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  baseUrl?: string
}

export default function Breadcrumb({ items, baseUrl = 'https://stackup-agency.fr' }: BreadcrumbProps) {
  const allItems = [{ name: 'Accueil', href: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* V4 : breadcrumb sur fond clair */}
      <nav className="flex items-center gap-1.5 text-navy/35 text-xs mb-6" aria-label="Fil d'Ariane">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={11} />}
            {i === 0 ? (
              <Link href="/" className="hover:text-navy transition-colors flex items-center gap-1">
                <Home size={11} /> {item.name}
              </Link>
            ) : item.href ? (
              <Link href={item.href} className="hover:text-navy transition-colors">{item.name}</Link>
            ) : (
              <span className="text-navy/55">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
