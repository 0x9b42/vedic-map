// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderPanchanga() {
  document.getElementById("panchangaGrid").innerHTML = PANCHANGA.map(
    (p) => `
    <div class="p-5 rounded-xl text-center data-card">
      <i class="fas ${p.icon} text-2xl mb-3" style="color:var(--gold2)"></i>
      <h4 class="text-sm font-bold mb-2" style="font-family:var(--font-display);color:var(--cream)">${p.name}</h4>
      <p class="text-xs leading-relaxed" style="color:var(--muted)">${p.desc}</p>
    </div>`,
  ).join("");
}
function renderDasha() {
  const container = document.getElementById("dashaTimeline");
  const total = 120;
  let html = `<div class="flex rounded-lg overflow-hidden" style="height:32px">`;
  DASHA.forEach((d) => {
    const pct = (d.years / total) * 100;
    html += `<div class="dasha-bar flex items-center justify-center text-xs font-bold mono" style="width:${pct}%;background:${d.color};color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.5)" title="${d.planet}: ${d.years} years">${d.years > 8 ? d.planet : ""}</div>`;
  });
  html += `</div>`;
  html += `<div class="flex justify-between mt-2 text-xs mono" style="color:var(--muted)"><span>0 years</span><span>120 years total</span></div>`;
  html += `<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mt-4">`;
  DASHA.forEach((d) => {
    html += `<div class="p-2 rounded text-center data-card">
      <div class="w-3 h-3 rounded-full mx-auto mb-1" style="background:${d.color}"></div>
      <div class="text-xs font-bold" style="color:var(--cream)">${d.planet}</div>
      <div class="text-xs mono" style="color:var(--muted)">${d.years} yrs</div>
    </div>`;
  });
  html += `</div>`;
  html += `<p class="text-xs mt-4" style="color:var(--muted-dim)">The order follows the Nakshatra sequence: Ketu → Venus → Sun → Moon → Mars → Rahu → Jupiter → Saturn → Mercury. The starting planet is determined by the Moon's birth Nakshatra.</p>`;
  container.innerHTML = html;
}
renderPanchanga();
renderDasha();
