---
title: Calculating Airplane Window Seat Sunlight with Aviation Math & Canvas
published: true
description: Which side of the plane has the sun? How I engineered an open-source flight sun and shade tracker in TypeScript and HTML5 Canvas using great-circle solar azimuths.
tags: typescript, webdev, math, opensource
canonical_url: https://shivammahajan.com/projects/flight-sun-tracker/
---

When booking a long-haul flight, picking a window seat usually comes down to a guess: *Will the afternoon sun blind me for six hours, or will I get cool cabin shade and a scenic sunset?*

On east-to-west routes in the Northern Hemisphere, sitting on the left side (Seat A) often means hours of direct, high-altitude solar glare that overheats your row. Sitting on the right side (Seat F/K) keeps you in constant shade. But as flight headings curve along great-circle routes and seasonal solar declination shifts, the sun can flip from port to starboard mid-flight.

To solve this deterministically, I engineered **[Flight Sun Tracker](https://shivammahajan.com/projects/flight-sun-tracker/)**, an open-source interactive web tool built with TypeScript and HTML5 Canvas that calculates exact solar elevation and seat shade along any flight route.

Here is the mathematics behind calculating solar positions relative to an airplane in flight, and how to render it smoothly at 60 FPS in Canvas without external API dependencies.

---

## 1. The Core Geometric Problem

Determining sunlight exposure for a passenger requires solving three distinct geometric variables for every minute along a flight trajectory:

1. **The Aircraft's Geodesic Position & Heading:** Where is the plane along its great-circle path, and what is its instantaneous true bearing?
2. **The Sun's Subsolar Point:** Exactly which coordinate on Earth is currently experiencing the sun directly overhead (zenith)?
3. **The Relative Azimuth Vector:** What is the angle between the aircraft’s nose (true heading) and the line of sight to the sun?

```
         True Heading (0°)
                ▲
                │  Aircraft
                │
                ├─── θ (Relative Azimuth) ───► ☼ (Sun Position)
               / \
              /   \
          Port     Starboard
        (Left/A)   (Right/F)
```

If relative azimuth $\theta$ falls between $0^\circ$ and $180^\circ$, sunlight strikes the **starboard (right)** side. If $\theta$ falls between $180^\circ$ and $360^\circ$ ($-180^\circ$ to $0^\circ$), sunlight strikes the **port (left)** side. If the sun's altitude angle is below $0^\circ$, the aircraft is in night or astronomical twilight.

---

## 2. Step 1: Great-Circle Waypoint Interpolation

Planes do not fly straight lines on flat Mercator maps; they follow geodesic great-circle arcs. 

Given origin airport $(\phi_1, \lambda_1)$ and destination $(\phi_2, \lambda_2)$, we compute the angular distance $\delta$ using spherical trigonometry:

$$\delta = 2 \arcsin \sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos\phi_1 \cos\phi_2 \sin^2\left(\frac{\Delta\lambda}{2}\right)}$$

For any fractional progress $f \in [0, 1]$ along the flight duration, the intermediate latitude $\phi_f$ and longitude $\lambda_f$ are:

```typescript
function interpolateGreatCircle(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
  f: number
): { lat: number; lon: number } {
  const d = angularDistance(lat1, lon1, lat2, lon2);
  const a = Math.sin((1 - f) * d) / Math.sin(d);
  const b = Math.sin(f * d) / Math.sin(d);

  const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);
  const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);
  const z = a * Math.sin(lat1) + b * Math.sin(lat2);

  const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
  const lon = Math.atan2(y, x);

  return { lat: toDegrees(lat), lon: toDegrees(lon) };
}
```

The instantaneous true heading $\beta$ is computed via forward azimuth:

$$\beta = \operatorname{atan2}\left(\sin(\Delta\lambda)\cos\phi_2, \; \cos\phi_1\sin\phi_2 - \sin\phi_1\cos\phi_2\cos(\Delta\lambda)\right)$$

---

## 3. Step 2: Deterministic Solar Ephemeris (Jean Meeus Algorithms)

Instead of pinging slow astronomical REST APIs during user interaction, Flight Sun Tracker computes solar coordinates client-side in under 1 millisecond using low-discrepancy astronomical formulas.

From the flight waypoint timestamp (converted to Julian centuries $T$ from J2000.0):
1. Compute the **Geometric Mean Longitude of the Sun** ($L_0$) and **Mean Anomaly** ($M$).
2. Solve the **Equation of Center** to find the sun's true ecliptic longitude.
3. Calculate the **Solar Declination** ($\delta_\odot$) and the **Greenwich Hour Angle** ($\text{GHA}_\odot$).

```typescript
export function getSubsolarPoint(date: Date): { lat: number; lon: number } {
  const jd = getJulianDate(date);
  const T = (jd - 2451545.0) / 36525.0;

  // Mean anomaly and solar longitude
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const L0 = 280.46646 + T * (36000.76983 + 0.0003032 * T);
  const C = (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(toRadians(M));
  const sunTrueLon = L0 + C;

  // Obliquity of the ecliptic
  const epsilon = 23.439291 - T * 0.0130042;
  const declination = Math.asin(Math.sin(toRadians(epsilon)) * Math.sin(toRadians(sunTrueLon)));

  // Greenwich Apparent Sidereal Time -> Subsolar longitude
  const gha = getGreenwichHourAngle(jd, date);
  const subsolarLon = normalizeLongitude(-gha);

  return { lat: toDegrees(declination), lon: subsolarLon };
}
```

---

## 4. Step 3: Local Azimuth & Elevation Projection

Once we know the subsolar point $(\phi_\odot, \lambda_\odot)$ and the aircraft's current coordinate $(\phi_a, \lambda_a)$, we project into the horizontal coordinate system (Altitude $h$ and Absolute Azimuth $A$):

$$\sin h = \sin\phi_a \sin\phi_\odot + \cos\phi_a \cos\phi_\odot \cos(\lambda_\odot - \lambda_a)$$

Finally, subtracting the aircraft's true heading from the solar azimuth produces the **relative bearing**:

$$\theta_{\text{rel}} = (A - \beta + 360^\circ) \bmod 360^\circ$$

- **$0^\circ < \theta_{\text{rel}} < 180^\circ$:** Sun on starboard side (Seat F/K).
- **$180^\circ < \theta_{\text{rel}} < 360^\circ$:** Sun on port side (Seat A).
- **$h < -6^\circ$:** Civil twilight/night (both sides enjoy dim cabin rest).

---

## 5. Rendering on HTML5 Canvas: Why Avoid Three.js

A common trap for geospatial tools is reaching for heavy 3D WebGL libraries like Three.js or Cesium. While visually flashy, they ship 600KB+ JS bundles and drain mobile battery during travel.

Flight Sun Tracker renders on a lightweight 2D HTML5 Canvas:
- **Equirectangular Projection Grid:** Custom rasterized vector map paths drawn with native canvas paths.
- **Flight Path Gradient:** The flight line color-codes dynamically (Yellow for direct port glare, Orange for starboard glare, Deep Indigo for shaded twilight).
- **Instant Latency:** Sub-millisecond scrubbing along the flight progress slider.

---

## Verification & Architecture Links

* **Live Technical Case Study:** [shivammahajan.com/projects/flight-sun-tracker/](https://shivammahajan.com/projects/flight-sun-tracker/)
* **GitHub Repository:** [github.com/smresponsibilities/flight-sun-tracker](https://github.com/smresponsibilities/flight-sun-tracker)
* **Author Portfolio:** [Shivam Mahajan — Systems & Web Engineering](https://shivammahajan.com/)

---

*Authored by [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Open Source Developer.*
