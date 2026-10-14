#!/usr/bin/env python3
"""
LE SON — lit musical de travail à 120 BPM et design sonore, tout par synthèse.

  python3 scripts/son.py            → audio/musique.mp3 (si absent) + audio/sons-<montage>.wav
  python3 scripts/son.py --musique  → régénère aussi le lit musical (écrase musique.mp3)

Le lit musical est une piste de TRAVAIL : aucune musique protégée. Pour la
remplacer, déposer un autre fichier à la place de audio/musique.mp3 et relancer
le rendu (voir JOURNAL.md). Les bruitages, eux, sont recalculés à chaque fois
depuis audio/cues-<montage>.json, écrit par scripts/build.mjs à partir des
timings réels de la voix.

Synthèse en numpy (oscillateurs, bruit filtré, enveloppes), encodage et
normalisation par ffmpeg.
"""
import argparse
import json
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf

RACINE = Path(__file__).resolve().parent.parent
AUDIO = RACINE / "audio"
SR = 44100
BPM = 120
TEMPS = 60 / BPM
rng = np.random.default_rng(20261014)  # graine fixe : le son est reproductible


# ------------------------------------------------------------- primitives


def t_(d):
    return np.arange(int(d * SR)) / SR


def env(n, a=0.005, r=0.2, courbe=4.0):
    """Enveloppe attaque linéaire, chute exponentielle."""
    x = np.arange(n) / SR
    e = np.minimum(1, x / max(a, 1e-4)) * np.exp(-courbe * np.maximum(0, x - a) / max(r, 1e-4))
    return e


def passe_bas(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):  # un pôle, suffisant pour des bruits de travail
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def passe_bas_rapide(x, fc):
    """Passe-bas un pôle vectorisé par FFT (approximation de sa réponse)."""
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    h = 1 / np.sqrt(1 + (f / fc) ** 2)
    return np.fft.irfft(np.fft.rfft(x) * h, n)


def passe_bande(x, f0, largeur):
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    h = np.exp(-0.5 * ((f - f0) / largeur) ** 2)
    return np.fft.irfft(np.fft.rfft(x) * h, n)


def passe_haut(x, fc):
    n = len(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    h = (f / fc) ** 2 / (1 + (f / fc) ** 2)
    return np.fft.irfft(np.fft.rfft(x) * h, n)


def bruit(d):
    return rng.standard_normal(int(d * SR))


def scie(freq, d, harmoniques=14, desaccord=0.0):
    t = t_(d)
    y = np.zeros_like(t)
    for h in range(1, harmoniques + 1):
        if freq * h > SR / 2.2:
            break
        y += np.sin(2 * np.pi * freq * h * (1 + desaccord) * t + h) / h
    return y


def reverb(x, duree=1.2, mix=0.25):
    queue = bruit(duree) * np.exp(-6 * t_(duree) / duree)
    queue = passe_bas_rapide(queue, 5000)
    queue /= np.sqrt(np.sum(queue**2))
    n = len(x) + len(queue)
    y = np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(queue, n), n)
    sec = np.pad(x, (0, len(queue)))
    return (1 - mix) * sec + mix * y * 0.6


def note(n):  # numéro MIDI → Hz
    return 440 * 2 ** ((n - 69) / 12)


def poser(piste, son, t, gain=1.0):
    i = int(round(t * SR))
    if i >= len(piste):
        return
    j = min(len(piste), i + len(son))
    piste[i:j] += gain * son[: j - i]


# --------------------------------------------------------------- bruitages


def s_impact(gain=1.0):
    d = 1.6
    t = t_(d)
    f = 38 + 70 * np.exp(-t * 18)
    corps = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, 0.9, 3.0)
    claque = passe_bas_rapide(bruit(d), 2500) * env(len(t), 0.001, 0.06, 6) * 0.7
    return reverb(corps + claque, 1.4, 0.3) * gain


def s_impact_final():
    x = s_impact() * 1.1
    t = t_(len(x) / SR)
    accord = sum(np.sin(2 * np.pi * note(n) * t) for n in [50, 57, 62, 66]) * np.exp(-t * 1.4) * 0.12
    return reverb(x + accord, 2.2, 0.35)


def s_verre():
    d = 1.4
    y = np.zeros(int(d * SR))
    for _ in range(70):
        f = rng.uniform(2200, 9000)
        debut = rng.exponential(0.12)
        long = rng.uniform(0.03, 0.25)
        tt = t_(long)
        ping = np.sin(2 * np.pi * f * tt) * np.exp(-tt * rng.uniform(18, 60))
        poser(y, ping, min(debut, d - long), rng.uniform(0.05, 0.25))
    crepit = passe_haut(bruit(d), 3000) * env(len(y), 0.001, 0.35, 5) * 0.25
    return reverb(y + crepit, 1.0, 0.25)


def s_whoosh(d=0.55, montant=False):
    n = int(d * SR)
    b = bruit(d)
    t = t_(d)
    centre = 400 + 3200 * (t / d if montant else np.sin(np.pi * t / d))
    # balayage de filtre par tranches
    y = np.zeros(n)
    pas = 1024
    for i in range(0, n, pas):
        seg = b[i : i + pas * 2]
        if len(seg) < 8:
            break
        f0 = centre[min(i + pas // 2, n - 1)]
        z = passe_bande(seg, f0, f0 * 0.6)
        y[i : i + len(seg)] += z * np.hanning(len(seg))
    forme = np.sin(np.pi * t / d) ** (1.5 if not montant else 0.7)
    if montant:
        forme = (t / d) ** 2.2
    return y * forme * 1.4


def s_aspiration(d):
    return s_whoosh(max(0.3, d), montant=True)


def s_montee(d):
    t = t_(d)
    f = 180 * 2 ** (3.0 * (t / d) ** 1.6)
    ton = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.3
    souffle = s_whoosh(d, montant=True)[: len(t)] * 0.9
    trem = 0.6 + 0.4 * np.sin(2 * np.pi * (4 + 20 * t / d) * t)
    return (ton + souffle) * (t / d) ** 1.8 * trem


def s_clac():
    d = 0.18
    t = t_(d)
    corps = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 40)
    b = passe_bande(bruit(d), 1800, 900) * np.exp(-t * 60)
    return (corps * 0.8 + b) * 1.2


def s_rature():
    return s_whoosh(0.28) * 0.9


def s_clic():
    d = 0.05
    t = t_(d)
    return (np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 180) + passe_haut(bruit(d), 4000) * np.exp(-t * 300) * 0.4)


def s_tick(gain=1.0):
    d = 0.03
    t = t_(d)
    return np.sin(2 * np.pi * 5200 * t) * np.exp(-t * 400) * gain


def s_tic(gain=1.0):
    d = 0.08
    t = t_(d)
    return (np.sin(2 * np.pi * 1450 * t) + 0.4 * np.sin(2 * np.pi * 2900 * t)) * np.exp(-t * 70) * gain


def s_pliage():
    d = 0.4
    t = t_(d)
    b = passe_bande(bruit(d), 2500, 1500)
    am = 0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 34 * t))
    return b * am * np.sin(np.pi * t / d) * 0.7


def s_ding():
    d = 1.4
    t = t_(d)
    y = np.sin(2 * np.pi * 1318.5 * t) + 0.5 * np.sin(2 * np.pi * 1975.5 * t) + 0.25 * np.sin(2 * np.pi * 2637 * t)
    return reverb(y * np.exp(-t * 3.2) * 0.5, 0.9, 0.2)


def s_souffle():
    d = 0.6
    return passe_bas_rapide(bruit(d), 1200) * np.sin(np.pi * t_(d) / d) ** 2 * 0.5


def sons(montage):
    cues = json.loads((AUDIO / f"cues-{montage}.json").read_text())
    total = cues["total"]
    piste = np.zeros(int((total + 3) * SR))
    for c in cues["sons"]:
        g = c.get("gain", 1.0)
        type_ = c["type"]
        d = c.get("duree", 0.5)
        son = {
            "impact": lambda: s_impact(),
            "impactFinal": s_impact_final,
            "verre": s_verre,
            "whoosh": lambda: s_whoosh(),
            "aspiration": lambda: s_aspiration(d),
            "montee": lambda: s_montee(d),
            "clac": s_clac,
            "rature": s_rature,
            "clic": s_clic,
            "tick": lambda: s_tick(),
            "tic": lambda: s_tic(),
            "pliage": s_pliage,
            "ding": s_ding,
            "souffle": s_souffle,
        }[type_]()
        poser(piste, son, c["t"], g)
    piste = piste[: int(total * SR)]
    piste /= max(1e-6, np.max(np.abs(piste))) / 0.9
    brut = AUDIO / f"_sons-{montage}.wav"
    sf.write(brut, piste.astype(np.float32), SR)
    sortie = AUDIO / f"sons-{montage}.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(brut), "-af", "loudnorm=I=-16:TP=-1:LRA=11",
                    "-ar", str(SR), "-ac", "2", str(sortie)], check=True)
    brut.unlink()
    print(f"{sortie.relative_to(RACINE)} · {len(cues['sons'])} sons · {total:.2f} s")


# --------------------------------------------------------- le lit musical

# Ré mineur : Rém9 – Si♭maj7 – Fa – Do(add9), un accord toutes les deux mesures.
ACCORDS = [[50, 57, 60, 64, 65], [46, 53, 57, 62, 65], [41, 53, 57, 60, 65], [48, 55, 60, 62, 67]]
BASSES = [38, 34, 41, 36]


def musique():
    cues = json.loads((AUDIO / "cues-complet.json").read_text())
    plans = {int(k): v for k, v in cues["plans"].items()}
    total = cues["total"]
    d = total + 2.5
    n = int(d * SR)
    g = np.zeros((n, 2))

    def poser_st(son, t, gain=1.0, pan=0.0):
        i = int(round(t * SR))
        j = min(n, i + len(son))
        if i >= n:
            return
        g[i:j, 0] += son[: j - i] * gain * (1 - max(0, pan))
        g[i:j, 1] += son[: j - i] * gain * (1 + min(0, pan))

    debut_musique = 1.0  # silence, puis l'impact
    revelation = plans[3]["debut"] + 1.5
    groove = plans[4]["debut"]
    fin = total - 1.5

    mesure = 4 * TEMPS
    # NAPPE : accords tenus, attaque lente, filtrés
    t0 = debut_musique
    i = 0
    while t0 < fin:
        dur = 2 * mesure
        acc = ACCORDS[i % 4]
        nappe = np.zeros(int((dur + 1.5) * SR))
        for k, nt in enumerate(acc):
            for det in (-0.004, 0.0035):
                v = scie(note(nt), dur + 1.5, 10, det)
                nappe += v * (0.16 if k else 0.22)
        tt = t_(dur + 1.5)
        e = np.minimum(1, tt / 0.6) * np.where(tt > dur, np.exp(-(tt - dur) * 3), 1)
        ouverture = 700 if t0 < revelation else 1400
        nappe = passe_bas_rapide(nappe * e, ouverture)
        poser_st(nappe, t0, 0.5, pan=(-0.3 if i % 2 else 0.3))
        t0 += dur
        i += 1

    # PULSATION : grosse caisse, charleston, claquement, basse
    kick_t = t_(0.35)
    kick = np.sin(2 * np.pi * np.cumsum(45 + 90 * np.exp(-kick_t * 30)) / SR) * np.exp(-kick_t * 9)
    hat = passe_haut(bruit(0.05), 7000) * np.exp(-t_(0.05) * 90)
    clap = passe_bande(bruit(0.15), 1500, 700) * np.exp(-t_(0.15) * 28)
    b = 0
    t = debut_musique
    while t < fin - 0.01:
        battue = int(round((t - debut_musique) / TEMPS))
        intense = t >= revelation
        plein = t >= groove
        if intense or battue % 2 == 0:
            poser_st(kick, t, 0.9 if intense else 0.55)
        if plein:
            poser_st(hat, t + TEMPS / 2, 0.22, pan=0.25)
            if battue % 2 == 1:
                poser_st(clap, t, 0.28, pan=-0.1)
        # basse en croches
        acc = int(((t - debut_musique) // (2 * mesure)) % 4)
        for croche in (0, 0.5):
            if not intense and croche:
                continue
            tc = t + croche * TEMPS
            bn = scie(note(BASSES[acc]), 0.22, 8) * np.exp(-t_(0.22) * 9)
            poser_st(passe_bas_rapide(bn, 500), tc, 0.35 if intense else 0.2)
        # arpège discret pendant le groove
        if plein:
            notes = ACCORDS[acc][1:]
            for dbl in range(4):
                nt = notes[(battue * 4 + dbl) % len(notes)] + 12
                p = scie(note(nt), 0.14, 6) * np.exp(-t_(0.14) * 22)
                poser_st(p, t + dbl * TEMPS / 4, 0.06, pan=(0.4 if dbl % 2 else -0.4))
        t += TEMPS
        b += 1

    # la musique s'éteint sur le logo : dernier accord qui résonne
    queue = np.zeros(int(2.5 * SR))
    for nt in [50, 57, 62, 65, 69]:
        queue += scie(note(nt), 2.5, 8) * 0.14
    queue = passe_bas_rapide(queue * np.exp(-t_(2.5) * 2.2), 1600)
    poser_st(queue, fin, 0.6)

    g /= np.max(np.abs(g)) / 0.9
    brut = AUDIO / "_musique.wav"
    sf.write(brut, g.astype(np.float32), SR)
    sortie = AUDIO / "musique.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(brut), "-af", "loudnorm=I=-14:TP=-1:LRA=9",
                    "-ar", str(SR), "-b:a", "192k", str(sortie)], check=True)
    brut.unlink()
    print(f"{sortie.relative_to(RACINE)} · {d:.1f} s · 120 BPM")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--musique", action="store_true", help="régénérer le lit musical de travail")
    args = ap.parse_args()
    if args.musique or not (AUDIO / "musique.mp3").exists():
        musique()
    for f in sorted(AUDIO.glob("cues-*.json")):
        sons(f.stem.replace("cues-", ""))


if __name__ == "__main__":
    main()
