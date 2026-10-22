"""Validate AI-generated master sheets before they become extraction sources.

Usage: python validate_masters.py <image> [<image> ...]
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def holes(img, min_w=40, min_h=40):
    w, h = img.size
    bbox = img.getchannel("A").getbbox()
    if not bbox:
        return []
    px = img.load()
    x0, y0, x1, y1 = bbox
    seen = bytearray(w * h)
    out = []
    for yy in range(y0, y1):
        for xx in range(x0, x1):
            if seen[yy * w + xx]:
                continue
            if px[xx, yy][3] != 0:
                continue
            stack = [(xx, yy)]
            seen[yy * w + xx] = 1
            bx0 = bx1 = xx
            by0 = by1 = yy
            n = 0
            while stack:
                cx, cy = stack.pop()
                n += 1
                bx0, bx1 = min(bx0, cx), max(bx1, cx)
                by0, by1 = min(by0, cy), max(by1, cy)
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = cx + dx, cy + dy
                    if x0 <= nx < x1 and y0 <= ny < y1 and not seen[ny * w + nx]:
                        seen[ny * w + nx] = 1
                        if px[nx, ny][3] == 0:
                            stack.append((nx, ny))
            bw, bh = bx1 - bx0 + 1, by1 - by0 + 1
            if bw >= min_w and bh >= min_h and n > 0.5 * bw * bh:
                out.append((bx0, by0, bx1 + 1, by1 + 1, bw, bh))
    return out


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
            n = 0
            while stack:
                cx, cy = stack.pop()
                n += 1
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < gw and 0 <= ny < gh and not seen[ny * gw + nx]:
                        seen[ny * gw + nx] = 1
                        if img.getpixel((nx * step, ny * step))[3] >= 128:
                            stack.append((nx, ny))
            if n * step * step >= min_px:
                out.append(n)
    return out


def validate(path: Path) -> bool:
    ok = True
    img = Image.open(path).convert("RGBA")
    name = path.name

    def fail(msg):
        nonlocal ok
        ok = False
        print(f"FAIL {name}: {msg}")

    if img.size != (1536, 1024):
        fail(f"size {img.size}, expected 1536x1024")

    a = img.getchannel("A")
    lo, hi = a.getextrema()
    if hi != 255 or lo != 0:
        print(f"WARN {name}: alpha extrema {lo}..{hi}; sheet may lack true transparency")

    corners = [img.getpixel(p)[3] for p in [(0, 0), (img.width - 1, 0), (0, img.height - 1), (img.width - 1, img.height - 1)]]
    if any(c != 0 for c in corners):
        fail(f"corners not transparent: {corners}")

    hs = holes(img)
    big = [h for h in hs if h[4] >= 120 and h[5] >= 100]
    print(f"INFO {name}: {len(hs)} transparent holes; screen-sized: {[f'{h[4]}x{h[5]}@({h[0]},{h[1]})' for h in big]}")
    parts = islands(img)
    print(f"INFO {name}: {len(parts)} separate opaque parts (min 800px each)")
    if len(parts) < 2:
        fail("fewer than 2 parts — exploded grid missing?")
    if not hs:
        fail("no transparent screen openings found")
    print(f"{'PASS' if ok else 'CHECK'} {name}")
    return ok


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        raise SystemExit(2)
    results = [validate(Path(p)) for p in sys.argv[1:]]
    raise SystemExit(0 if all(results) else 1)
