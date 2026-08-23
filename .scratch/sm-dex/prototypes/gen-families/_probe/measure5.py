"""Final targeted measurements before extraction."""
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\sm\Desktop\portfolio\.scratch\sm-dex\assets\ticket-24")

def near(px, ref, tol):
    return px[3] > 200 and all(abs(px[i] - ref[i]) <= tol for i in range(3))

def regions(img, ref, tol=14, min_px=120, limit=20, clip=None):
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
    return sorted(out, key=lambda r: (-r[6]))[:limit]

def silhouette(img, box, cols=44):
    region = img.crop(box)
    rows = max(1, round(cols * region.height / region.width / 2))
    small = region.resize((cols, rows), Image.BILINEAR)
    px = small.load()
    chars = " .:*#@"
    return "\n".join("".join(chars[min(5, px[x, y][3] * 6 // 256)] for x in range(cols)) for y in range(rows))

GB = Image.open(SRC / "gen-1-2-game-boy-master.png").convert("RGBA")
G45 = Image.open(SRC / "gen-4-5-open-master.png").convert("RGBA")
ROT = Image.open(SRC / "gen-6-9-modern-master.png").convert("RGBA")

print("=== GB body pills (grey 119,114,110 tol12) clip=(80,540,880,875)")
for b in regions(GB, (119, 114, 110), 12, clip=(80, 540, 880, 875)):
    print(f"  ({b[0]},{b[1]},{b[2]},{b[3]}) {b[4]}x{b[5]}")
print("=== GB body dark pills (88,84,81 tol10)")
for b in regions(GB, (88, 84, 81), 10, clip=(80, 540, 880, 875)):
    print(f"  ({b[0]},{b[1]},{b[2]},{b[3]}) {b[4]}x{b[5]}")
print("=== GB body red-ish LED scan (200,45,45 tol55)")
for b in regions(GB, (200, 45, 45), 55, min_px=60, clip=(80, 150, 880, 875)):
    print(f"  ({b[0]},{b[1]},{b[2]},{b[3]}) {b[4]}x{b[5]}")

print("\n=== G45 ring silhouettes")
for label, box in [("ring-1", (78, 766, 208, 900)), ("ring-2", (230, 766, 362, 900)),
                   ("ring-3", (428, 760, 576, 908)), ("ring-4", (602, 762, 746, 906))]:
    print(f"-- {label} {box}")
    print(silhouette(G45, box, 40))
print("=== G45 small circles")
for label, box in [("circ-light", (804, 796, 892, 884)), ("circ-grey", (914, 796, 1004, 884))]:
    print(f"-- {label} {box}")
    print(silhouette(G45, box, 32))
print("=== G45 long pill")
print(silhouette(G45, (1254, 832, 1378, 862), 44))

print("\n=== ROT body orange-pill scan (221,78,53 tol16) clip=(36,204,892,794) minus apertures")
for b in regions(ROT, (221, 78, 53), 16, clip=(36, 600, 900, 800)):
    print(f"  ({b[0]},{b[1]},{b[2]},{b[3]}) {b[4]}x{b[5]}")
print("=== ROT body cyan scan (62,203,232 tol20)")
for b in regions(ROT, (62, 203, 232), 20, min_px=80, clip=(36, 204, 900, 800)):
    print(f"  ({b[0]},{b[1]},{b[2]},{b[3]}) {b[4]}x{b[5]}")
print("=== ROT wing/tail silhouettes")
for label, box in [("wing-L", (948, 620, 1034, 784)), ("wing-R", (1376, 620, 1464, 784)),
                   ("tail-a", (1156, 694, 1256, 746)), ("top-piece", (1170, 112, 1258, 234)),
                   ("pill-o1", (960, 858, 1032, 902)), ("pill-c1", (1254, 858, 1326, 902))]:
    print(f"-- {label} {box}")
    print(silhouette(ROT, box, 30))
