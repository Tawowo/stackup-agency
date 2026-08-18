#!/bin/bash
# Auto-reprise MISSION 3H30. S'arrête quand PROGRESSION.md affiche « MISSION 3H30 : TERMINÉ ».
cd /home/user/stackup-agency
mkdir -p logs
N=1
while [ $N -le 30 ]; do
  if grep -q "MISSION 3H30 : TERMINÉ" PROGRESSION.md 2>/dev/null; then
    echo "$(date) — Mission 3H30 terminée. Arrêt." >> logs/relance.log
    break
  fi
  echo "$(date) — [3H30] Cycle $N : lancement session…" >> logs/relance.log
  IS_SANDBOX=1 claude -p "Lis PROGRESSION.md et MISSION-3H30.md à la racine, et continue la mission exactement où elle s'est arrêtée (phases dans l'ordre : 1 corrections visuelles, 2 blog hub, 3 crawl liens, 4 géographie 800+ communes, 4bis studio de style produit, 6 clôture — la phase 5 articles est déjà 150/150). Respecte toutes les règles : build 0/0 avant chaque push, commit+push main par étapes stables, PROGRESSION.md à jour, zéro emoji, pas de Stripe, prix réels uniquement. Quand TOUT est fait : écris « MISSION 3H30 : TERMINÉ » dans PROGRESSION.md. Aucune question." \
    --dangerously-skip-permissions \
    --add-dir /home/user/stackup-agency \
    > "logs/3h30-$N.log" 2>&1
  RC=$?
  if [ $RC -ne 0 ]; then
    echo "$(date) — [3H30] Cycle $N : échec (code $RC), attente 15 min." >> logs/relance.log
    sleep 900
  else
    echo "$(date) — [3H30] Cycle $N : terminé." >> logs/relance.log
    sleep 60
  fi
  N=$((N+1))
done
echo "$(date) — [3H30] Boucle terminée après $((N-1)) cycles." >> logs/relance.log
