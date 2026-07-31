// Offre de rentrée — date d'extinction 15/09/2026 23h59 Paris (UTC+2)
export const RENTREE_DEADLINE = new Date('2026-09-15T21:59:59Z')

export function isRentreeActive(): boolean {
  return Date.now() < RENTREE_DEADLINE.getTime()
}

export function getRemainingTime(deadline = RENTREE_DEADLINE) {
  const diff = Math.max(0, deadline.getTime() - Date.now())
  return {
    j: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
    expired: diff <= 0,
  }
}
