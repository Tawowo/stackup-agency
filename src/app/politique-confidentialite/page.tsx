import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Stackup Agency',
  description: 'Politique de confidentialité et traitement des données personnelles — Stackup Agency',
}

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Politique de confidentialité</h1>
        <p className="text-gray-500 dark:text-white/50 text-sm mb-12">Dernière mise à jour : juin 2026</p>

        <div className="prose dark:prose-invert prose-sm max-w-none space-y-10">
          <section>
            <h2>1. Responsable du traitement</h2>
            <p>Stackup Agency (micro-entreprise), Indre-et-Loire (37), France — <a href="mailto:contact@stackup-agency.fr" className="text-electric">contact@stackup-agency.fr</a></p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous collectons les données suivantes via le formulaire de contact :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Type de projet</li>
              <li>Message</li>
            </ul>
            <p>Aucune donnée n&apos;est collectée à l&apos;insu des utilisateurs. Aucune donnée bancaire n&apos;est traitée sur ce site.</p>
          </section>

          <section>
            <h2>3. Finalité du traitement</h2>
            <p>Les données collectées via le formulaire de contact sont utilisées exclusivement pour :</p>
            <ul>
              <li>Répondre à votre demande de contact ou de devis</li>
              <li>Établir un devis personnalisé</li>
              <li>Vous contacter dans le cadre de votre projet</li>
            </ul>
            <p>Vos données ne sont pas utilisées à des fins commerciales, publicitaires ou transmises à des tiers sans votre consentement explicite.</p>
          </section>

          <section>
            <h2>4. Base légale du traitement</h2>
            <p>Le traitement de vos données repose sur l&apos;<strong>intérêt légitime</strong> de Stackup Agency à répondre aux demandes de contact (article 6.1.f du RGPD).</p>
          </section>

          <section>
            <h2>5. Durée de conservation</h2>
            <p>Vos données sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter du dernier contact, conformément aux recommandations de la CNIL.</p>
          </section>

          <section>
            <h2>6. Destinataires des données</h2>
            <p>Vos données sont traitées par Stackup Agency et ne sont pas transmises à des tiers, à l&apos;exception des sous-traitants techniques strictement nécessaires au fonctionnement du service (hébergement Vercel, envoi de notifications email). Ces sous-traitants agissent en tant que sous-traitants au sens du RGPD et sont soumis à des obligations contractuelles de confidentialité.</p>
          </section>

          <section>
            <h2>7. Transfert hors Union Européenne</h2>
            <p>Vercel Inc. est un prestataire américain. Les données peuvent être transférées aux États-Unis dans le cadre des clauses contractuelles types de la Commission européenne. Les données de base de données (Supabase) sont hébergées en région Paris (AWS eu-west-3).</p>
          </section>

          <section>
            <h2>8. Vos droits</h2>
            <p>Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> (&quot;droit à l&apos;oubli&quot;) : demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation</strong> : demander la limitation du traitement</li>
            </ul>
          </section>

          <section>
            <h2>9. Exercer vos droits</h2>
            <p>Pour exercer vos droits ou pour toute question relative au traitement de vos données personnelles, contactez-nous à : <a href="mailto:contact@stackup-agency.fr" className="text-electric">contact@stackup-agency.fr</a></p>
            <p>Nous nous engageons à répondre à votre demande dans un délai d&apos;un mois.</p>
          </section>

          <section>
            <h2>10. Cookies</h2>
            <p>Ce site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement (préférence de thème clair/sombre). Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé. Pour plus d&apos;informations, consultez notre <Link href="/cookies" className="text-electric">politique de cookies</Link>.</p>
          </section>

          <section>
            <h2>11. Délais de livraison</h2>
            <p>Les délais de livraison communiqués lors de la commande sont des délais indicatifs en jours ouvrés. Stackup Agency s&apos;engage à respecter ces délais dans la mesure du possible et à informer le client par email en cas de prolongation nécessaire. Conformément aux conditions générales de vente, le délai peut être prolongé de 20 jours ouvrés maximum en cas de forte demande ou d&apos;imprévu, avec notification préalable au client.</p>
          </section>

          <section>
            <h2>12. Droit de réclamation</h2>
            <p>Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d&apos;introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" className="text-electric" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
