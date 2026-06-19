import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Politique de confidentialité — Stackup Agency' }

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au site
          </Link>
          <h1 className="text-4xl font-bold text-white">Politique de confidentialité</h1>
          <p className="text-white/50 mt-2 text-sm">Dernière mise à jour : juin 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Collecte des données</h2>
          <p>Stackup Agency collecte uniquement les données que vous nous fournissez volontairement via le formulaire de contact :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Type de projet</li>
            <li>Message</li>
          </ul>

          <h2>2. Utilisation des données</h2>
          <p>Ces données sont utilisées exclusivement pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact</li>
            <li>Vous envoyer un devis</li>
            <li>Vous contacter dans le cadre de votre projet</li>
          </ul>
          <p>Nous ne vendons, ne louons et ne partageons jamais vos données personnelles avec des tiers à des fins commerciales.</p>

          <h2>3. Conservation des données</h2>
          <p>Vos données sont conservées pendant 3 ans à compter de votre dernier contact, conformément aux recommandations de la CNIL.</p>

          <h2>4. Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d&apos;accès :</strong> consulter vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> corriger vos données</li>
            <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format lisible</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@stackup.agency">contact@stackup.agency</a></p>

          <h2>5. Cookies</h2>
          <p>Ce site n&apos;utilise pas de cookies de tracking. Seuls des cookies techniques essentiels au fonctionnement du site peuvent être déposés.</p>

          <h2>6. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</p>

          <h2>7. Contact</h2>
          <p>Pour toute question relative à cette politique de confidentialité : <a href="mailto:contact@stackup.agency">contact@stackup.agency</a></p>
        </div>
      </div>
    </div>
  )
}
