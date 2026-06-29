import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales — Stackup Agency',
  description: 'Mentions légales du site stackup-agency.vercel.app',
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12">Mentions légales</h1>

        <div className="prose dark:prose-invert prose-sm max-w-none space-y-10">
          <section>
            <h2>1. Éditeur du site</h2>
            <p>Le site <strong>stackup-agency.vercel.app</strong> est édité par :</p>
            <ul>
              <li><strong>Raison sociale :</strong> Stackup Agency (micro-entreprise)</li>
              <li><strong>SIRET :</strong> À compléter lors de l&apos;immatriculation</li>
              <li><strong>Adresse :</strong> Indre-et-Loire (37), France</li>
              <li><strong>Email :</strong> contact@stackup.agency</li>
              <li><strong>Téléphone :</strong> +33 7 64 02 08 98</li>
            </ul>
          </section>

          <section>
            <h2>2. Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de Stackup Agency.</p>
          </section>

          <section>
            <h2>3. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <ul>
              <li><strong>Vercel Inc.</strong> — 340 Pine Street, Suite 900, San Francisco, CA 94104, États-Unis — <a href="https://vercel.com" className="text-electric">vercel.com</a></li>
              <li>Les données de base de données sont hébergées par <strong>Supabase Inc.</strong>, infrastructure AWS région eu-west-3 (Paris).</li>
            </ul>
          </section>

          <section>
            <h2>4. Propriété intellectuelle</h2>
            <p>L&apos;ensemble des éléments composant ce site (textes, images, logos, code source, charte graphique) est la propriété exclusive de Stackup Agency, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation préalable et écrite de Stackup Agency.</p>
          </section>

          <section>
            <h2>5. Limitation de responsabilité</h2>
            <p>Stackup Agency s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Cependant, Stackup Agency ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur le site. En conséquence, Stackup Agency décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</p>
            <p>Stackup Agency ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;accès au site ou de l&apos;utilisation des informations qui y sont contenues.</p>
          </section>

          <section>
            <h2>6. Liens hypertextes</h2>
            <p>Ce site peut contenir des liens vers d&apos;autres sites internet. Stackup Agency n&apos;exerce aucun contrôle sur ces sites tiers et décline toute responsabilité quant à leur contenu.</p>
          </section>

          <section>
            <h2>7. Droit applicable et juridiction compétente</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
          </section>

          <section>
            <h2>8. Délais de livraison</h2>
            <p>Les délais de livraison indiqués sur le site sont des délais indicatifs exprimés en jours ouvrés :</p>
            <ul>
              <li><strong>Site vitrine 1 page :</strong> 10 jours ouvrés</li>
              <li><strong>Site multi-pages :</strong> 17 jours ouvrés</li>
              <li><strong>Site e-commerce :</strong> 21 jours ouvrés</li>
              <li><strong>Système de gestion métier :</strong> 21 jours ouvrés</li>
              <li><strong>Site association :</strong> 7 jours ouvrés</li>
            </ul>
            <p>Stackup Agency se réserve le droit de prolonger ces délais de <strong>20 jours ouvrés maximum</strong> en cas de forte demande, d&apos;imprévus techniques ou de circonstances exceptionnelles. Le client en sera informé par email dans les meilleurs délais, avec proposition d&apos;un nouveau calendrier.</p>
            <p>Les délais courent à compter de la réception de l&apos;acompte et de la transmission de l&apos;ensemble des éléments nécessaires à la réalisation du projet (textes, images, accès, informations).</p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>Pour toute question relative au site ou à son contenu : <a href="mailto:contact@stackup.agency" className="text-electric">contact@stackup.agency</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
