"""Enumerate alpha islands in ticket-24 masters with bbox + mean colour."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

NAMES = [
    "gen-1-2-game-boy-master.png",
    "gen-4-5-open-master.png",
    "gen-4-5-closed-master.png",
    "gen-6-9-modern-master.png",
]

def islands(img, min_px=800):
    w, h = img.size
    step = 2
    gw, gh = w // step, h // step
    seen = bytearray(gw * gh)
    out = []
    for gy in range(gh):
        for gx in range(gw):
            if seen[gy * gw + gx]:
                continue
            p = img.getpixel((gx * step, gy * step))
            if p[3] < 128:
                seen[gy * gw + gx] = 1
                continue
            stack = [(gx, gy)]
            seen[gy * gw + gx] = 1
            bx0 = bx1 = gx; by0 = by1 = gy; n = 0
            while stack:
                cx, cy = stack.pop()
                n += 1
                bx0, bx1 = min(bx0, cx), max(bx1, cx)
                by0, by1 = min(by0, cy), max(by1, cy)
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < gw and 0 <= ny < gh and not seen[ny * gw + nx]:
                        seen[ny * gw + nx] = 1
                        if img.getpixel((nx * step, ny * step))[3] >= 128:
                            stack.append((nx, ny))
            if n * step * step >= min_px:
                out.append((bx0 * step, by0 * step, (bx1 + 1) * step, (by1 + 1) * step, n * step * step))
    return sorted(out, key=lambda r: (-r[4], r[0]))

def mean_col(img, box):
    region = img.crop(box)
    hist = region.convert("RGBA")
    data = [p for p in hist.getdata() if p[3] >= 200]
    if not data:
        return None
    r = sum(p[0] for p in data) // len(data)
    g = sum(p[1] for p in data) // len(data)
    b = sum(p[2] for p in data) // len(data)
    return (r, g, b)

for name in NAMES:
    img = Image.open(SRC / name).convert("RGBA")
    print(f"\n===== {name} {img.size}")
    for bb in islands(img):
        mc = mean_col(img, bb[:4])
        print(f"  island box=({bb[0]},{bb[1]},{bb[2]},{bb[3]}) size={bb[2]-bb[0]}x{bb[3]-bb[1]} px={bb[4]} rgb~{mc}")
