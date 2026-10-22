"""Probe ticket-24 masters: sizes + colour-region bounding boxes."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

def near(px, ref, tol):
    return all(abs(px[i] - ref[i]) <= tol for i in range(3))

def boxes(img, ref, tol, min_size=6):
    """Coarse connected regions via grid flood on downscaled mask."""
    rgb = img.convert("RGB")
    w, h = img.size
    step = 4
    cols, rows = w // step, h // step
    seen = [[False] * cols for _ in range(rows)]
    out = []
    for gy in range(0, h // step):
        for gx in range(0, w // step):
            if seen[gy][gx]:
                continue
            px = rgb.getpixel((gx * step, gy * step))
            if not near(px, ref, tol):
                seen[gy][gx] = True
                continue
            stack = [(gx, gy)]
            seen[gy][gx] = True
            x0 = x1 = gx
            y0 = y1 = gy
            n = 0
            while stack:
                cx, cy = stack.pop()
                n += 1
                x0, x1 = min(x0, cx), max(x1, cx)
                y0, y1 = min(y0, cy), max(y1, cy)
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w//step and 0 <= ny < h//step and not seen[ny][nx]:
                        p = rgb.getpixel((nx*step, ny*step))
                        if near(p, ref, tol):
                            seen[ny][nx] = True
                            stack.append((nx, ny))
                        else:
                            seen[ny][nx] = True
            if n * step * step >= min_size * min_size:
                out.append((x0*step, y0*step, (x1+1)*step, (y1+1)*step, n))
    return sorted(out, key=lambda r: (-r[4]))[:14]

for name in ["gen-1-2-game-boy-master.png", "gen-6-9-modern-master.png"]:
    img = Image.open(SRC / name)
    print(f"\n== {name} {img.size} mode={img.mode}")
    if "game" in name:
        probes = {
            "magenta": (201, 40, 115),
            "dpad-black": (25, 25, 28),
            "led-red": (224, 50, 44),
            "panel-dark": (56, 58, 63),
            "body-grey": (214, 211, 202),
            "screen-frame-green": (106, 122, 40),
        }
    else:
        probes = {
            "shell-orange": (244, 106, 61),
            "cyan": (62, 203, 232),
            "eye-blue": (53, 180, 232),
            "pill-orange": (255, 133, 96),
        }
    for label, ref in probes.items():
        print(f" -- {label} ~{ref}")
        for b in boxes(img, ref, 26):
            print(f"    box=({b[0]},{b[1]},{b[2]},{b[3]}) size={b[2]-b[0]}x{b[3]-b[1]} px={b[4]}")
