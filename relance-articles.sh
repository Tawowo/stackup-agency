#!/bin/bash
# Auto-reprise Phase 5 — 150 articles. S'arrête quand PROGRESSION.md affiche « 150/150 — TERMINÉ ».
cd /home/user/stackup-agency
mkdir -p logs
N=1
while [ $N -le 30 ]; do
  if grep -q "150/150 — TERMINÉ" PROGRESSION.md 2>/dev/null; then
    echo "$(date) — Mission terminée (150/150). Arrêt." >> logs/relance.log
    break
  fi
  echo "$(date) — Cycle $N : lancement session…" >> logs/relance.log
  IS_SANDBOX=1 claude -p "Lis PROGRESSION.md et MISSION-ARTICLES.md à la racine (et plan-contenu-volet-B-150-articles.md pour la liste), et continue la Phase 5 exactement là où elle s'est arrêtée, en respectant toutes les règles du fichier mission : gabarit complet, déduplication contre les 204 articles existants, publishAt échelonné 4-6/semaine, mise à jour de PROGRESSION.md après chaque article, commit + push sur main tous les 5 articles, build 0/0 avant chaque push. Aucune question." \
    --dangerously-skip-permissions \
    --add-dir /home/user/stackup-agency \
    > "logs/nuit-$N.log" 2>&1
  RC=$?
  if [ $RC -ne 0 ]; then
    echo "$(date) — Cycle $N : échec (code $RC), attente 15 min." >> logs/relance.log
    sleep 900
  else
    echo "$(date) — Cycle $N : terminé." >> logs/relance.log
    sleep 60
  fi
  N=$((N+1))
done
echo "$(date) — Boucle terminée après $((N-1)) cycles." >> logs/relance.log
