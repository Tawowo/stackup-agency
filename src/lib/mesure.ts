/**
 * MESURE D'AUDIENCE RESPECTUEUSE — aucun cookie, aucun identifiant, aucune adresse IP conservée, aucun script tiers.
 * Le navigateur envoie un message anonyme (nom de l'événement, chemin de la page, origine du visiteur réduite au domaine)
 * à /api/mesure, qui le consigne dans les journaux du serveur. Respecte « Ne pas me suivre » et le signal GPC.
 * Événements : vue, estimation_lancee, contact_envoye, clic_telephone, clic_email, clic_demo, clic_appel, telechargement.
 * Chaque événement porte la page d'entrée de la session (sessionStorage, jamais envoyée à un tiers) pour rattacher une demande à la page qui l'a amenée.
 */
export type EvenementMesure = 'vue' | 'estimation_lancee' | 'contact_envoye' | 'clic_telephone' | 'clic_email' | 'clic_demo' | 'clic_appel' | 'telechargement'

export function suivre(evenement: EvenementMesure, extra?: string) {
  if (typeof window === 'undefined') return
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  if (nav.doNotTrack === '1' || nav.globalPrivacyControl) return
  let origine = ''
  try {
    origine = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''
    if (origine === location.hostname.replace(/^www\./, '')) origine = ''
  } catch {}
  let entree = ''
  try {
    entree = sessionStorage.getItem('su_entree') ?? ''
    if (!entree) sessionStorage.setItem('su_entree', (entree = location.pathname.slice(0, 200)))
  } catch {}
  const corps = JSON.stringify({ e: evenement, p: location.pathname.slice(0, 200), o: origine.slice(0, 80), x: extra?.slice(0, 60), l: entree })
  try {
    if (!navigator.sendBeacon?.('/api/mesure', new Blob([corps], { type: 'application/json' }))) void fetch('/api/mesure', { method: 'POST', body: corps, keepalive: true, headers: { 'content-type': 'application/json' } })
  } catch {}
}
