// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderNakshatras() {
  const grid = document.getElementById("nakshatraGrid");
  const rulerColors = {
    Ketu: "#b07040",
    Venus: "#e88ab0",
    Sun: "#e8a33a",
    Moon: "#c8c8e8",
    Mars: "#e85d3a",
    Rahu: "#8a5aa0",
    Jupiter: "#d4a040",
    Saturn: "#6a7a9a",
    Mercury: "#6ac47a",
    Brahma: "#e8a33a",
  };
  let html = NAKSHATRAS.map(
    (n, i) => `
    <div class="nakshatra-card" onclick="toggleNakshatra(this,${i})" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleNakshatra(this,${i})}">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold px-2 py-0.5 rounded mono" style="background:rgba(163,59,110,0.15);color:var(--rose)">${n.num}</span>
          <div><h4 class="text-sm font-bold" style="font-family:var(--font-display)">${n.name}</h4><p class="text-xs" style="color:var(--muted)">${n.deity.split("(")[0].trim()}</p></div>
        </div>
        <span class="text-xs px-2 py-0.5 rounded mono" style="color:${rulerColors[n.ruler] || "var(--muted)"};background:${rulerColors[n.ruler] || "var(--muted)"}15;border:1px solid ${rulerColors[n.ruler] || "var(--muted)"}30">${n.ruler}</span>
      </div>
      <div class="nakshatra-detail">
        <div class="text-xs space-y-1.5 pt-2" style="border-top:1px solid var(--border);color:var(--muted)">
          <div><strong style="color:var(--cream)">Deity:</strong> ${n.deity}</div>
          <div><strong style="color:var(--cream)">Symbol:</strong> ${n.symbol}</div>
          <div><strong style="color:var(--cream)">Theme:</strong> ${n.theme}</div>
        </div>
      </div>
    </div>`,
  ).join("");
  html += `
    <div class="nakshatra-card" onclick="toggleNakshatra(this,27)" style="border-color:rgba(212,148,58,0.3)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleNakshatra(this,27)}">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold px-2 py-0.5 rounded mono" style="background:rgba(212,148,58,0.15);color:var(--gold)">*</span>
          <div><h4 class="text-sm font-bold" style="font-family:var(--font-display)">${ABHIJIT.name}</h4><p class="text-xs" style="color:var(--gold)">The 28th — Intercalary</p></div>
        </div>
        <span class="text-xs px-2 py-0.5 rounded mono" style="color:var(--gold);background:rgba(212,148,58,0.1);border:1px solid rgba(212,148,58,0.3)">${ABHIJIT.ruler}</span>
      </div>
      <div class="nakshatra-detail">
        <div class="text-xs space-y-1.5 pt-2" style="border-top:1px solid var(--border);color:var(--muted)">
          <div><strong style="color:var(--cream)">Symbol:</strong> ${ABHIJIT.symbol}</div>
          <div><strong style="color:var(--cream)">Theme:</strong> ${ABHIJIT.theme}</div>
        </div>
      </div>
    </div>`;
  grid.innerHTML = html;
}
window.toggleNakshatra = function (el, idx) {
  const detail = el.querySelector(".nakshatra-detail");
  const wasOpen = detail.classList.contains("open");
  document
    .querySelectorAll(".nakshatra-detail")
    .forEach((d) => d.classList.remove("open"));
  document.querySelectorAll(".nakshatra-card").forEach((c) => {
    c.classList.remove("active");
    c.setAttribute("aria-expanded", "false");
  });
  if (!wasOpen) {
    detail.classList.add("open");
    el.classList.add("active");
    el.setAttribute("aria-expanded", "true");
  }
};
renderNakshatras();
