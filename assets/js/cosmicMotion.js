// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

document.getElementById("astroRealityBody").innerHTML = ASTRO_REALITY.map(
        (r) => `
        <tr style="border-bottom:1px solid var(--border)"><td class="p-4">${r[0]}</td><td class="p-4">${r[1]}</td><td class="p-4 mono">${r[2]}</td><td class="p-4 mono">${r[3]}</td></tr>`,
      ).join("");
      document.getElementById("apparentMotionBody").innerHTML =
        APPARENT_MOTION.map(
          (r) => `
        <tr style="border-bottom:1px solid var(--border)"><td class="p-4">${r[0]}</td><td class="p-4 mono">${r[1]}</td><td class="p-4 mono">${r[2]}</td><td class="p-4">${r[3]}</td></tr>`,
        ).join("");
