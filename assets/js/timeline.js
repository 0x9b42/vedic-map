// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

document.getElementById("timelineList").innerHTML = TIMELINE.map(
        (t) => `
        <div class="data-card">
          <div class="section-eyebrow" style="margin-bottom:0.4rem">${t.era}</div>
          <h4 class="font-bold mb-2">${t.title}</h4>
          <p class="text-sm" style="color:var(--muted)">${t.desc}</p>
        </div>`,
      ).join("");
