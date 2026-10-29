/** Limitation de débit simple, en mémoire, par clé (adresse IP) : N requêtes par fenêtre glissante. */
export function creerLimite(maxParFenetre: number, fenetreMs: number) {
  const compteurs = new Map<string, number[]>()
  return (cle: string): boolean => {
    const maintenant = Date.now()
    const liste = (compteurs.get(cle) ?? []).filter((t) => maintenant - t < fenetreMs)
    if (liste.length >= maxParFenetre) return true
    liste.push(maintenant)
    compteurs.set(cle, liste)
    if (compteurs.size > 5000) compteurs.clear()
    return false
  }
}

/** Envoi par Resend. Sans clé (prévisualisation, développement) : rien n'est envoyé, l'appelant le dit. */
export async function envoyer(messages: { to: string; subject: string; html: string; text: string; replyTo?: string }[]): Promise<boolean> {
  const cle = process.env.RESEND_API_KEY
  if (!cle) return false
  const { Resend } = await import('resend')
  const resend = new Resend(cle)
  const from = process.env.CONTACT_FROM || 'Stackup Agency <contact@stackup-agency.fr>'
  for (const m of messages) await resend.emails.send({ from, ...m })
  return true
}
