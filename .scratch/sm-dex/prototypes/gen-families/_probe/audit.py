"""Audit: template-match extracted faces back onto masters to find true rest offsets."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")
AST = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\prototypes\gen-families\assets")

def score(master_px, mw, face, fx, fy):
    """Mean abs diff of face over master at (fx,fy), sampling every 2px."""
    fw, fh = face.size
    fpx = face.load()
    total = 0
    n = 0
    for y in range(0, fh, 2):
        for x in range(0, fw, 2):
            p = fpx[x, y]
            if p[3] < 200:
                continue
            q = master_px[fx + x, fy + y]
            total += abs(p[0]-q[0]) + abs(p[1]-q[1]) + abs(p[2]-q[2])
            n += 1
    return total / max(n, 1)

def best_offset(master, face, cx, cy, radius=40):
    """Search around (cx,cy) for lowest-diff placement of face's top-left."""
    mpx = master.load()
    best = None
    for dy in range(-radius, radius + 1, 1):
        for dx in range(-radius, radius + 1, 1):
            s = score(mpx, master.width, face, cx + dx, cy + dy)
            if best is None or s < best[0]:
                best = (s, dx, dy)
    return best

JOBS = [
    # (master file, face file, assumed top-left of face on master)
    ("gen-1-2-game-boy-master.png", "gb-dpad-face.png", (137, 599)),
    ("gen-1-2-game-boy-master.png", "gb-a-face.png",     (730, 594)),
    ("gen-1-2-game-boy-master.png", "gb-b-face.png",     (623, 645)),
]

for mname, fname, (ax, ay) in JOBS:
    master = Image.open(SRC / mname).convert("RGBA")
    face = Image.open(AST / fname)
    s, dx, dy = best_offset(master, face, ax, ay, 30)
    print(f"{fname}: assumed=({ax},{ay}) best=({ax+dx},{ay+dy}) delta=({dx},{dy}) diff={s:.1f}")

# Gen IV/V: cross face onto deck base area; ring face likewise.
g45 = Image.open(SRC / "gen-4-5-open-master.png").convert("RGBA")
for fname, ax, ay, r in [("g45-cross-face.png", 232, 767, 60),
                         ("g45-ring-face.png", 603, 763, 60)]:
    face = Image.open(AST / fname)
    s, dx, dy = best_offset(g45, face, ax, ay, r)
    print(f"{fname}: assumed=({ax},{ay}) best=({ax+dx},{ay+dy}) delta=({dx},{dy}) diff={s:.1f}")

# Attachment geometry for Rotom pieces vs body bbox.
rot = Image.open(SRC / "gen-6-9-modern-master.png").convert("RGBA")
a = rot.getchannel("A").getbbox()
print(f"\nrotom alpha bbox={a}")
for label, box in [("wing-L", (20, 560, 106, 724)), ("wing-R", (858, 560, 946, 724)),
                   ("antenna", (420, 130, 508, 252)), ("tail", (400, 760, 500, 812))]:
    print(f"{label}: box={box}")
