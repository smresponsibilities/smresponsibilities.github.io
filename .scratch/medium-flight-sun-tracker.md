# Calculating Airplane Window Seat Sunlight with Aviation Mathematics and Canvas

*Which side of the plane has the sun? How I engineered an open-source flight sun and shade tracker in TypeScript and HTML5 Canvas using great-circle solar azimuths.*

---

**Canonical URL:** `https://shivammahajan.com/projects/flight-sun-tracker/`  
*(In Medium: Story settings -> Advanced Settings -> "Customize canonical link" -> Enter URL above)*

---

When booking a long-haul flight, choosing a window seat is usually a gamble: *Will the afternoon sun blind you for seven hours straight, or will you enjoy cool cabin shade and a scenic golden hour?*

On east-to-west routes across the Northern Hemisphere, sitting on the left side (Seat A) frequently guarantees direct, high-altitude solar glare that overheats your seat. Sitting on the right side (Seat F/K) keeps you comfortably shaded. But because airplane headings curve continuously along great-circle arcs and solar declination varies with the season, the sun can flip sides mid-flight.

To solve this deterministically, I engineered **[Flight Sun Tracker](https://shivammahajan.com/projects/flight-sun-tracker/)**, an open-source interactive web tool built in TypeScript and HTML5 Canvas that calculates exact solar elevation and seat shade along any flight route.

Here is an architectural walkthrough of how to calculate solar positions relative to an airplane in flight, and how to render it smoothly at 60 FPS in Canvas without external API dependencies.

---

## 1. The Core Geometric Problem

Determining sunlight exposure for a seated passenger requires calculating three geometric coordinates for every waypoint along a flight trajectory:

1. **The Aircraft's Geodesic Position & Heading:** Where is the plane along its great-circle path, and what is its instantaneous true bearing?
2. **The Sun's Subsolar Point:** What exact latitude and longitude on Earth is currently experiencing the sun directly overhead at zenith?
3. **The Relative Azimuth Angle:** What is the angle between the aircraft’s nose (true heading) and the line of sight to the sun?

If relative azimuth $\theta$ falls between $0^\circ$ and $180^\circ$, direct sunlight hits the **starboard (right)** side. If $\theta$ falls between $180^\circ$ and $360^\circ$, direct sunlight hits the **port (left)** side. If the sun's elevation angle is below $0^\circ$, the aircraft is in night or astronomical twilight.

---

## 2. Great-Circle Waypoint Interpolation

Airplanes follow spherical geodesic arcs rather than flat straight lines. 

Given origin airport $(\phi_1, \lambda_1)$ and destination $(\phi_2, \lambda_2)$, we compute intermediate coordinates for any fractional progress $f \in [0, 1]$ using spherical trigonometry:

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

The aircraft's true heading $\beta$ is computed via forward azimuth:

$$\beta = \operatorname{atan2}\left(\sin(\Delta\lambda)\cos\phi_2, \; \cos\phi_1\sin\phi_2 - \sin\phi_1\cos\phi_2\cos(\Delta\lambda)\right)$$

---

## 3. Deterministic Solar Ephemeris (Jean Meeus Algorithms)

Instead of pinging slow astronomical REST APIs during user interaction, Flight Sun Tracker computes solar coordinates client-side in under 1 millisecond using low-discrepancy astronomical formulas.

From the waypoint timestamp (converted to Julian centuries $T$ from J2000.0):
1. Compute the **Geometric Mean Longitude of the Sun** ($L_0$) and **Mean Anomaly** ($M$).
2. Solve the **Equation of Center** to find the sun's true ecliptic longitude.
3. Calculate the **Solar Declination** ($\delta_\odot$) and the **Greenwich Hour Angle** ($\text{GHA}_\odot$).

---

## 4. Local Azimuth & Elevation Projection

Once the subsolar point and aircraft coordinates are known, projecting into the horizontal coordinate system (Altitude $h$ and Solar Azimuth $A$) yields the relative bearing:

$$\theta_{\text{rel}} = (A - \beta + 360^\circ) \bmod 360^\circ$$

- **$0^\circ < \theta_{\text{rel}} < 180^\circ$:** Sun on starboard side (Seats F / K).
- **$180^\circ < \theta_{\text{rel}} < 360^\circ$:** Sun on port side (Seats A).
- **$h < -6^\circ$:** Civil twilight / night (both sides enjoy dim cabin rest).

---

## 5. Rendering on HTML5 Canvas: Why Avoid Three.js

A common trap for geospatial tools is reaching for heavy 3D WebGL engines like Three.js. While visually flashy, they ship 600KB+ JS bundles and drain mobile battery while traveling.

Flight Sun Tracker renders on a lightweight 2D HTML5 Canvas:
- **Equirectangular Projection Grid:** Custom rasterized vector map paths drawn with native canvas paths.
- **Flight Path Gradient:** The flight trajectory color-codes dynamically (Yellow for port glare, Orange for starboard glare, Deep Indigo for shaded twilight).
- **Sub-Millisecond Scrubbing:** Real-time scrubbing along the flight progress slider at 60 FPS.

---

## Verification & Architecture Links

* **Live Technical Case Study:** [shivammahajan.com/projects/flight-sun-tracker/](https://shivammahajan.com/projects/flight-sun-tracker/)
* **GitHub Repository:** [github.com/smresponsibilities/flight-sun-tracker](https://github.com/smresponsibilities/flight-sun-tracker)
* **Author Portfolio:** [Shivam Mahajan — Systems & Web Engineering](https://shivammahajan.com/)

---

*Authored by [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Open Source Developer.*
