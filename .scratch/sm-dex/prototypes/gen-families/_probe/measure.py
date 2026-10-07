"""Measure ticket-24 masters: alpha bbox, transparent holes, colour regions."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

def alpha_bbox(img):
    a = img.getchannel("A")
    return a.getbbox()

def holes(img, min_w=30, min_h=30):
    """Connected fully-transparent regions inside alpha bbox."""
    w, h = img.size
    px = img.load()
    x0, y0, x1, y1 = alpha_bbox(img)
    seen = bytearray(w * h)
    out = []
    for yy in range(y0, y1):
        for xx in range(x0, x1):
            if seen[yy * w + xx]:
                continue
            if px[xx, yy][3] != 0:
                # mark opaque pixel visited lazily via scan; skip
                seen[yy * w + xx] = 1
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
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = cx + dx, cy + dy
                    if x0 <= nx < x1 and y0 <= ny < y1 and not seen[ny*w+nx]:
                        seen[ny*w+nx] = 1
                        if px[nx, ny][3] == 0:
                            stack.append((nx, ny))
            bw, bh = bx1-bx0+1, by1-by0+1
            if bw >= min_w and bh >= min_h:
                out.append((bx0, by0, bx1+1, by1+1, bw, bh, n))
    return sorted(out, key=lambda r: -r[6])

def near(px, ref, tol):
    return px[3] > 200 and all(abs(px[i]-ref[i]) <= tol for i in range(3))

def regions(img, ref, tol=26, min_px=400, limit=16):
    w, h = img.size
    px = img.load()
    step = 2
    seen = bytearray(((w//step)+2) * ((h//step)+2))
    out = []
    for gy in range(0, h//step):
        for gx in range(0, w//step):
            if seen[gy*(w//step)+gx]:
                continue
            p = px[gx*step, gy*step]
            if not near(p, ref, tol):
                seen[gy*(w//step)+gx] = 1
                continue
            stack = [(gx, gy)]
            seen[gy*(w//step)+gx] = 1
            bx0 = bx1 = gx; by0 = by1 = gy; n = 0
            while stack:
                cx, cy = stack.pop()
                n += 1
                bx0, bx1 = min(bx0,cx), max(bx1,cx)
                by0, by1 = min(by0,cy), max(by1,cy)
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = cx+dx, cy+dy
                    if 0 <= nx < w//step and 0 <= ny < h//step and not seen[ny*(w//step)+nx]:
                        seen[ny*(w//step)+nx] = 1
                        if near(px[nx*step, ny*step], ref, tol):
                            stack.append((nx, ny))
            if n*step*step >= min_px:
                out.append((bx0*step, by0*step, (bx1+1)*step, (by1+1)*step, (bx1-bx0+1)*step, (by1-by0+1)*step, n))
    return sorted(out, key=lambda r: -r[6])[:limit]

NAMES = [
    "gen-1-2-game-boy-master.png",
    "gen-4-5-open-master.png",
    "gen-4-5-closed-master.png",
    "gen-6-9-modern-master.png",
]

for name in NAMES:
    img = Image.open(SRC / name).convert("RGBA")
    print(f"\n===== {name} {img.size}")
    bb = alpha_bbox(img)
    print(f"alpha bbox = {bb}")
    print("transparent holes:")
    for hl in holes(img):
        print(f"   hole box=({hl[0]},{hl[1]},{hl[2]},{hl[3]}) size={hl[4]}x{hl[5]} px={hl[6]}")
