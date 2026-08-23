"""Probe control regions within assembled-body bbox of each master."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

def near(px, ref, tol):
    return px[3] > 200 and all(abs(px[i] - ref[i]) <= tol for i in range(3))

def regions(img, ref, tol=26, min_px=250, limit=20, clip=None):
    w, h = img.size
    step = 2
    gw, gh = w // step, h // step
    seen = bytearray(gw * gh)
    out = []
    cx0, cy0, cx1, cy1 = clip or (0, 0, w, h)
    for gy in range(cy0 // step, cy1 // step):
        for gx in range(cx0 // step, cx1 // step):
            if seen[gy * gw + gx]:
                continue
            p = img.getpixel((gx * step, gy * step))
            if not near(p, ref, tol):
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
                    if cx0//step <= nx < cx1//step and cy0//step <= ny < cy1//step and not seen[ny * gw + nx]:
                        seen[ny * gw + nx] = 1
                        if near(img.getpixel((nx * step, ny * step)), ref, tol):
                            stack.append((nx, ny))
            bw, bh = (bx1 - bx0 + 1) * step, (by1 - by0 + 1) * step
            if n * step * step >= min_px:
                out.append((bx0 * step, by0 * step, (bx1 + 1) * step, (by1 + 1) * step, bw, bh, n * step * step))
    return sorted(out, key=lambda r: -r[6])[:limit]

JOBS = {
    "gen-1-2-game-boy-master.png": {
        "clip": (76, 150, 880, 880),
        "probes": {
            "dpad-black": ((25, 25, 28), 22),
            "ab-magenta": ((168, 14, 72), 30),
            "led-red": ((224, 50, 44), 30),
            "pill-grey": ((119, 114, 110), 18),
            "pills-dark": ((88, 84, 81), 14),
            "frame-olive": ((106, 122, 40), 24),
        },
    },
    "gen-4-5-open-master.png": {
        "clip": (53, 130, 730, 700),
        "probes": {
            "nav-dark": ((34, 33, 33), 10),
            "nav-light": ((207, 201, 194), 18),
            "panel-black": ((35, 34, 34), 8),
        },
    },
    "gen-6-9-modern-master.png": {
        "clip": (31, 200, 900, 800),
        "probes": {
            "cyan-rim": ((62, 203, 232), 26),
            "shell-orange": ((221, 78, 53), 22),
            "pale-shell": ((244, 106, 61), 22),
        },
    },
}

for name, job in JOBS.items():
    img = Image.open(SRC / name).convert("RGBA")
    print(f"\n===== {name} clip={job['clip']}")
    for label, (ref, tol) in job["probes"].items():
        print(f" -- {label} ~{ref} tol{tol}")
        for b in regions(img, ref, tol, clip=job["clip"]):
            print(f"    box=({b[0]},{b[1]},{b[2]},{b[3]}) size={b[4]}x{b[5]} px={b[6]}")
