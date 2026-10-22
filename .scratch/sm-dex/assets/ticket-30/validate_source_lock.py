#!/usr/bin/env python3
"""Validate ticket 30's eight source-locked casing packages."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "asset-manifest.json"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)
    print(f"FAIL {message}")


def check_manifest() -> int:
    errors: list[str] = []
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    packages = data.get("packages", [])

    if data.get("packageCount") != 8 or len(packages) != 8:
        fail("manifest must contain exactly eight packages", errors)

    sheet = data.get("sheetContract", {})
    expected_sheet = {
        "width": 1536,
        "height": 1024,
        "mode": "RGBA",
        "columns": 4,
        "rows": 2,
        "slotWidth": 384,
        "slotHeight": 512,
        "maxOccupiedSlots": 8,
    }
    for key, expected in expected_sheet.items():
        if sheet.get(key) != expected:
            fail(f"sheetContract.{key} must be {expected!r}", errors)

    package_ids: set[str] = set()
    prefixes: set[str] = set()
    masters: set[str] = set()

    for package in packages:
        package_id = package.get("id", "<missing>")
        prefix = package.get("prefix", "")
        master_name = package.get("sourceMaster", "")
        reference_name = package.get("reference", "")

        for value, seen, label in (
            (package_id, package_ids, "package id"),
            (prefix, prefixes, "prefix"),
            (master_name, masters, "source master"),
        ):
            if not value or value in seen:
                fail(f"{package_id}: duplicate or missing {label} {value!r}", errors)
            seen.add(value)

        master = ROOT / master_name
        reference = ROOT / reference_name
        if not master.is_file():
            fail(f"{package_id}: missing source master {master_name}", errors)
            continue
        if not reference.is_file():
            fail(f"{package_id}: missing reference {reference_name}", errors)
            continue

        master_hash = sha256(master)
        reference_hash = sha256(reference)
        expected_hash = package.get("sha256")
        if master_hash != reference_hash:
            fail(f"{package_id}: source master is not a byte-exact reference copy", errors)
        if master_hash != expected_hash:
            fail(f"{package_id}: SHA-256 differs from frozen manifest", errors)

        with Image.open(master) as image:
            expected_size = (package.get("width"), package.get("height"))
            if image.size != expected_size:
                fail(
                    f"{package_id}: size {image.size} != frozen {expected_size}",
                    errors,
                )

        physical = set(package.get("physicalControlIds", []))
        noninteractive = set(package.get("nonInteractiveIds", []))
        overlap = physical & noninteractive
        if overlap:
            fail(f"{package_id}: controls also marked inert: {sorted(overlap)}", errors)

        slot_ids: list[str] = []
        for component_sheet in package.get("componentSheets", []):
            slots = component_sheet.get("slots", [])
            if len(slots) > 8:
                fail(
                    f"{package_id}/{component_sheet.get('id')}: {len(slots)} slots exceeds eight",
                    errors,
                )
            if len(slots) != len(set(slots)):
                fail(
                    f"{package_id}/{component_sheet.get('id')}: duplicate slot ids",
                    errors,
                )
            slot_ids.extend(slots)

        if len(slot_ids) != len(set(slot_ids)):
            fail(f"{package_id}: component id appears on multiple sheets", errors)

        slot_set = set(slot_ids)
        for control_id in physical:
            face = f"{control_id}-face"
            base = f"{control_id}-base"
            if face not in slot_set or base not in slot_set:
                fail(
                    f"{package_id}: {control_id} lacks adjacent planned face/base assets",
                    errors,
                )
                continue
            if slot_ids.index(base) != slot_ids.index(face) + 1:
                fail(f"{package_id}: {control_id} face/base are not adjacent", errors)

    software_refs = data.get("softwareReferenceFiles", [])
    if len(software_refs) != 19 or len(set(software_refs)) != 19:
        fail("softwareReferenceFiles must contain 19 unique captures", errors)
    for relative_name in software_refs:
        if not (ROOT / relative_name).is_file():
            fail(f"missing software reference {relative_name}", errors)

    fidelity = data.get("fidelityPolicy", {})
    if fidelity.get("visibleRestingPixels") != "exact-source-copy":
        fail("visible resting pixels must remain exact source copies", errors)
    if fidelity.get("generatedSupportStatus") != "none-accepted":
        fail("unexpected generated support marked accepted", errors)
    if fidelity.get("reassemblyToleranceOutsideMasks") != 0:
        fail("reassembly tolerance outside masks must be zero", errors)

    if errors:
        print(f"\n{len(errors)} validation error(s)")
        return 1

    print("PASS eight source masters match frozen references byte-for-byte")
    print("PASS eight package plans use at most eight slots per 4x2 sheet")
    print("PASS every planned physical control has an adjacent face/base pair")
    print("PASS 19 software reference captures are present")
    print("PASS no generated support asset is accepted")
    return 0


if __name__ == "__main__":
    sys.exit(check_manifest())
