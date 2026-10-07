"""Small static integrity check for the throwaway prototype."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"


def main() -> None:
    manifest = json.loads((ASSETS / "extraction-manifest.json").read_text(encoding="utf-8"))
    assert len(manifest["components"]) == 34
    assert sum(len(group["files"]) for group in manifest["generatedSlices"].values()) == 17

    for component in manifest["components"].values():
        assert (ROOT / component["file"]).is_file(), component["file"]
        assert component["mask"] == "source alpha"

    for group in manifest["generatedSlices"].values():
        for filename in group["files"]:
            assert (ASSETS / filename).is_file(), filename

    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    js = (ROOT / "app.js").read_text(encoding="utf-8")
    assert "<iframe" not in html
    assert "<audio" not in html
    assert "prefers-reduced-motion: reduce" in css
    assert "translateY(4px)" in css
    assert "rotateY(-180deg)" in css
    assert 'addEventListener("click"' in js
    assert "CLOSED" not in html  # no explanatory state label over the casing
    print("prototype integrity: ok")


if __name__ == "__main__":
    main()
