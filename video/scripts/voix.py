#!/usr/bin/env python3
"""
LA VOIX OFF — synthèse phrase par phrase, puis calage sur la grille 120 BPM.

Tout le montage du film se recale sur ce que ce script écrit dans
`script.json` : pour chaque montage, le début et la fin réels de chaque
phrase, les bornes des sept plans et les segments de sous-titres.

Moteurs :
  piper       (défaut) voix locale fr_FR-tom-medium via sherpa-onnx — PROVISOIRE
  google      Google Cloud Text-to-Speech   (GOOGLE_TTS_API_KEY, voix : GOOGLE_TTS_VOICE)
  elevenlabs  ElevenLabs                     (ELEVENLABS_API_KEY, voix : ELEVENLABS_VOICE_ID)

Exemples :
  python3 scripts/voix.py                       # voix provisoire, tous les montages
  GOOGLE_TTS_API_KEY=… python3 scripts/voix.py --moteur google
  ELEVENLABS_API_KEY=… ELEVENLABS_VOICE_ID=… python3 scripts/voix.py --moteur elevenlabs

Règles de calage (une seule source de vérité, ici) :
  - une coupe de plan tombe toujours sur un temps (0,5 s à 120 BPM) ;
  - la première phrase d'un plan démarre un demi-temps après la coupe ;
  - les phrases d'un même plan s'enchaînent sur la grille du demi-temps ;
  - le film se termine 1,5 s de logo fixe après la dernière phrase.
"""
import argparse
import base64
import json
import math
import os
import subprocess
import sys
import tarfile
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf

RACINE = Path(__file__).resolve().parent.parent
SCRIPT = RACINE / "script.json"
AUDIO = RACINE / "audio"
MODELES = RACINE / ".modeles"
TAUX = 44100

TEMPS = 0.5  # un temps à 120 BPM
DEMI = 0.25
PAUSE_PHRASE = 0.18  # silence minimal entre deux phrases d'un même plan
PAUSE_PLAN = 0.30  # silence minimal avant une coupe de plan
ATTAQUE_PLAN = 0.25  # la voix part un demi-temps après la coupe
ATTAQUE_FILM = 0.25
QUEUE_LOGO = 1.5  # logo final immobile
MAX_CAR_SOUS_TITRE = 42

VOIX_PIPER = "vits-piper-fr_FR-tom-medium"
URL_PIPER = f"https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/{VOIX_PIPER}.tar.bz2"


def au_dessus(t, pas):
    return math.ceil(round(t / pas, 6)) * pas


# ---------------------------------------------------------------- moteurs


class Piper:
    nom = "piper fr_FR-tom-medium (local, provisoire)"

    def __init__(self):
        import sherpa_onnx

        dossier = MODELES / VOIX_PIPER
        if not dossier.exists():
            MODELES.mkdir(exist_ok=True)
            archive = MODELES / f"{VOIX_PIPER}.tar.bz2"
            print(f"Téléchargement de la voix {VOIX_PIPER}…")
            urllib.request.urlretrieve(URL_PIPER, archive)
            with tarfile.open(archive) as t:
                t.extractall(MODELES)
            archive.unlink()
        cfg = sherpa_onnx.OfflineTtsConfig(
            model=sherpa_onnx.OfflineTtsModelConfig(
                vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                    model=str(dossier / "fr_FR-tom-medium.onnx"),
                    tokens=str(dossier / "tokens.txt"),
                    data_dir=str(dossier / "espeak-ng-data"),
                    noise_scale=0.6,
                    noise_scale_w=0.75,
                ),
                num_threads=4,
            )
        )
        self.tts = sherpa_onnx.OfflineTts(cfg)

    def dire(self, texte, vitesse):
        a = self.tts.generate(texte, sid=0, speed=vitesse)
        return reechantillonner(np.asarray(a.samples, dtype=np.float32), a.sample_rate)


class Google:
    nom = "Google Cloud Text-to-Speech"

    def __init__(self):
        self.cle = os.environ["GOOGLE_TTS_API_KEY"]
        self.voix = os.environ.get("GOOGLE_TTS_VOICE", "fr-FR-Chirp3-HD-Charon")

    def dire(self, texte, vitesse):
        corps = {
            "input": {"text": texte},
            "voice": {"languageCode": "fr-FR", "name": self.voix},
            "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": TAUX, "speakingRate": vitesse},
        }
        req = urllib.request.Request(
            f"https://texttospeech.googleapis.com/v1/text:synthesize?key={self.cle}",
            data=json.dumps(corps).encode(),
            headers={"Content-Type": "application/json"},
        )
        brut = base64.b64decode(json.load(urllib.request.urlopen(req))["audioContent"])
        return decoder_wav(brut)


class ElevenLabs:
    nom = "ElevenLabs"

    def __init__(self):
        self.cle = os.environ["ELEVENLABS_API_KEY"]
        self.voix = os.environ["ELEVENLABS_VOICE_ID"]
        self.modele = os.environ.get("ELEVENLABS_MODEL", "eleven_multilingual_v2")

    def dire(self, texte, vitesse):
        corps = {
            "text": texte,
            "model_id": self.modele,
            "voice_settings": {"stability": 0.45, "similarity_boost": 0.8, "style": 0.35, "speed": vitesse},
        }
        req = urllib.request.Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{self.voix}?output_format=pcm_44100",
            data=json.dumps(corps).encode(),
            headers={"Content-Type": "application/json", "xi-api-key": self.cle},
        )
        brut = urllib.request.urlopen(req).read()
        return np.frombuffer(brut, dtype="<i2").astype(np.float32) / 32768.0


def decoder_wav(octets):
    import io

    data, sr = sf.read(io.BytesIO(octets), dtype="float32")
    if data.ndim > 1:
        data = data.mean(axis=1)
    return reechantillonner(data, sr)


def reechantillonner(x, sr):
    if sr == TAUX:
        return x
    n = int(round(len(x) * TAUX / sr))
    return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)


def rogner(x, seuil=0.012, marge=0.02):
    """Retire le silence en tête et en queue, en gardant 20 ms de souffle."""
    pic = np.max(np.abs(x)) or 1.0
    actif = np.where(np.abs(x) > seuil * pic)[0]
    if len(actif) == 0:
        return x
    m = int(marge * TAUX)
    return x[max(0, actif[0] - m) : min(len(x), actif[-1] + m)]


# --------------------------------------------------------------- montage


def caler(durees, ordre, plan_de):
    """Place les phrases sur la grille. Renvoie (phrases, plans, total)."""
    t = 0.0
    phrases = {}
    plans = []
    plan_courant = None
    for i, pid in enumerate(ordre):
        p = plan_de[pid]
        if p != plan_courant:
            coupe = 0.0 if plan_courant is None else au_dessus(t + PAUSE_PLAN, TEMPS)
            if plans:
                plans[-1]["fin"] = coupe
            plans.append({"plan": p, "debut": coupe})
            debut = coupe + (ATTAQUE_FILM if plan_courant is None else ATTAQUE_PLAN)
            plan_courant = p
        else:
            debut = au_dessus(t + PAUSE_PHRASE, DEMI)
        fin = debut + durees[pid]
        phrases[pid] = {"debut": round(debut, 3), "fin": round(fin, 3)}
        t = fin
    total = au_dessus(t + QUEUE_LOGO - 0.4, TEMPS)
    plans[-1]["fin"] = total
    for p in plans:
        p["debut"] = round(p["debut"], 3)
        p["fin"] = round(p["fin"], 3)
    return phrases, plans, total


def decouper(texte):
    """Segments de sous-titres d'au plus deux lignes (≈ 42 caractères)."""
    if len(texte) <= MAX_CAR_SOUS_TITRE:
        return [texte]
    for sep in [" : ", "… ", ", ", ". "]:
        if sep in texte:
            i = texte.index(sep) + len(sep.rstrip(" "))
            a, b = texte[:i].strip(), texte[i:].strip()
            if a and b:
                return decouper(a) + decouper(b)
    mots = texte.split()
    meilleur = None
    for k in range(1, len(mots)):
        a, b = " ".join(mots[:k]), " ".join(mots[k:])
        score = abs(len(a) - len(b))
        if meilleur is None or score < meilleur[0]:
            meilleur = (score, a, b)
    return decouper(meilleur[1]) + decouper(meilleur[2])


def sous_titres(phrases_txt, calage, ordre):
    segs = []
    for pid in ordre:
        texte = phrases_txt[pid]
        morceaux = decouper(texte)
        d, f = calage[pid]["debut"], calage[pid]["fin"]
        total = sum(len(m) for m in morceaux)
        t = d
        for m in morceaux:
            duree = (f - d) * len(m) / total
            segs.append({"texte": m, "debut": round(t, 3), "fin": round(t + duree, 3), "phrase": pid})
            t += duree
    return segs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--moteur", default="piper", choices=["piper", "google", "elevenlabs"])
    ap.add_argument("--montage", default=None, help="un seul montage (complet, court20)")
    args = ap.parse_args()

    moteur = {"piper": Piper, "google": Google, "elevenlabs": ElevenLabs}[args.moteur]()
    script = json.loads(SCRIPT.read_text())
    textes = {p["id"]: p["texte"] for p in script["phrases"]}
    a_dire = {p["id"]: p.get("tts", p["texte"]) for p in script["phrases"]}
    plan_de = {p["id"]: p["plan"] for p in script["phrases"]}

    montages = script["montages"]
    noms = [args.montage] if args.montage else list(montages)
    for nom in noms:
        m = montages[nom]
        ordre = m["phrases"]
        cible = m["cible"]
        vitesse = m.get("vitesse", 1.0)
        dossier = AUDIO / "voix" / nom
        dossier.mkdir(parents=True, exist_ok=True)
        for essai in range(4):
            sons = {pid: rogner(moteur.dire(a_dire[pid], vitesse)) for pid in ordre}
            durees = {pid: len(s) / TAUX for pid, s in sons.items()}
            calage, plans, total = caler(durees, ordre, plan_de)
            print(f"[{nom}] vitesse {vitesse:.3f} → {total:.2f} s (cible {cible} s)")
            if abs(total - cible) <= 0.75:
                break
            parole = sum(durees.values())
            fixe = total - parole
            vitesse = round(min(1.35, max(0.85, vitesse * parole / max(1.0, cible - fixe))), 3)

        piste = np.zeros(int((total + 0.5) * TAUX), dtype=np.float32)
        for pid in ordre:
            s = sons[pid]
            sf.write(dossier / f"{pid}.wav", s, TAUX)
            i = int(round(calage[pid]["debut"] * TAUX))
            piste[i : i + len(s)] += s
        brut = dossier / "_brut.wav"
        sf.write(brut, piste[: int(total * TAUX)], TAUX)
        sortie = AUDIO / f"voix-{nom}.wav"
        # Normalisation de la voix (−16 LUFS, crête −1,5 dBTP), légère compression
        # pour qu'elle reste devant la musique.
        subprocess.run(
            [
                "ffmpeg", "-loglevel", "error", "-y", "-i", str(brut),
                "-af", "highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,"
                "loudnorm=I=-16:TP=-1.5:LRA=7",
                "-ar", str(TAUX), "-ac", "1", str(sortie),
            ],
            check=True,
        )
        brut.unlink()
        m["vitesse"] = vitesse
        m["duree"] = total
        m["calage"] = calage
        m["plans"] = plans
        m["sousTitres"] = sous_titres(textes, calage, ordre)
        m["moteur"] = moteur.nom
        print(f"[{nom}] {sortie.relative_to(RACINE)} · {total:.2f} s · plans : "
              + ", ".join(f"{p['plan']}:{p['debut']}-{p['fin']}" for p in plans))

    SCRIPT.write_text(json.dumps(script, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    sys.exit(main())
