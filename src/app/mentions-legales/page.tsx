import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Mentions légales — Stackup Agency' }

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au site
          </Link>
          <h1 className="text-4xl font-bold text-white">Mentions légales</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Éditeur du site</h2>
          <p>
            <strong>Stackup Agency</strong><br />
            Fondateur : Mathéo<br />
            Email : contact@stackup.agency<br />
            Statut : Auto-entrepreneur (en cours d&apos;immatriculation)
          </p>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 800, San Francisco, CA 94104, États-Unis<br />
            <a href="https://vercel.com">https://vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos, design) est la propriété exclusive de Stackup Agency et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Stackup Agency s&apos;efforce de fournir sur ce site des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, inexactitudes et carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens hypertextes vers d&apos;autres sites internet. Stackup Agency n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.
          </p>
        </div>
      </div>
    </div>
  )
}
