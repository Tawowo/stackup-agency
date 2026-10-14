#!/usr/bin/env bash
# Rend toutes les vidéos livrées, en une commande.
#   scripts/rendre.sh                 → 16x9, 9x16, 1x1 et 9x16-20s (+ versions sous-titrées et miniatures)
#   scripts/rendre.sh 9x16 9x16-20s   → seulement ces formats
# Prérequis : la voix (audio/voix-*.wav) et script.json à jour (python3 scripts/voix.py).
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.mjs
python3 scripts/son.py          # bruitages recalés ; la musique (audio/musique.mp3) n'est pas touchée
mkdir -p livrables
declare -A PROJET=( [16x9]=. [9x16]=formats/vertical [1x1]=formats/carre [9x16-20s]=formats/vertical-20s )
declare -A CALQUE=( [16x9]=formats/soustitres-16x9 [9x16]=formats/soustitres-vertical [1x1]=formats/soustitres-carre [9x16-20s]=formats/soustitres-vertical-20s )
# instant de la miniature : l'accroche « IL VOUS RAPPORTE QUOI ? »
MINIATURE=1.55
for f in ${@:-16x9 9x16 1x1 9x16-20s}; do
  sortie=livrables/stackup-pub-$f.mp4
  if [ -n "${REPRENDRE:-}" ] && [ -s "$sortie" ]; then
    echo "── $f : film déjà rendu (REPRENDRE), on le garde"
  else
    echo "── $f : rendu du film"
    npx hyperframes render "${PROJET[$f]}" --fps 60 --crf 18 --output "$sortie"
  fi
  echo "── $f : calque de sous-titres (HyperFrames, fond transparent)"
  npx hyperframes render "${CALQUE[$f]}" --fps 60 --format mov --workers 2 --protocol-timeout 900000 --output "livrables/.calque-$f.mov"
  echo "── $f : incrustation des sous-titres"
  ffmpeg -loglevel error -y -i "$sortie" -i "livrables/.calque-$f.mov" \
    -filter_complex "[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v]" -map "[v]" -map 0:a \
    -c:v libx264 -preset slow -crf 18 -r 60 -c:a copy -movflags +faststart "livrables/stackup-pub-$f-soustitres.mp4"
  rm -f "livrables/.calque-$f.mov"
  ffmpeg -loglevel error -y -ss "$MINIATURE" -i "$sortie" -frames:v 1 "livrables/thumbnail-$f.png"
done
echo "Livrables :"; ls -la livrables
