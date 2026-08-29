// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

let activeGraha = -1;
      function renderGrahas() {
        const grid = document.getElementById("grahasGrid");
        grid.innerHTML = GRAHAS.map(
          (g, i) => `
    <div class="planet-card" data-idx="${i}" onclick="toggleGraha(${i})" role="button" tabindex="0" aria-expanded="false">
      <div class="planet-symbol" style="color:${g.color}">${g.sym}</div>
      <h3 class="mt-3 text-sm font-bold" style="font-family:var(--font-display)">${g.name}</h3>
      <p class="text-xs mt-0.5" style="color:var(--muted)">${g.en}</p>
      <p class="text-xs mt-1.5 mono" style="color:${g.color}">Ruler: ${g.ruler}</p>
    </div>`,
        ).join("");
        grid.querySelectorAll(".planet-card").forEach((c) => {
          c.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleGraha(+c.dataset.idx);
            }
          });
        });
      }
      window.toggleGraha = function (idx) {
        const panel = document.getElementById("grahaDetail");
        const cards = document.querySelectorAll(".planet-card");
        if (activeGraha === idx) {
          activeGraha = -1;
          panel.classList.remove("open");
          cards[idx].classList.remove("active");
          cards[idx].setAttribute("aria-expanded", "false");
          return;
        }
        cards.forEach((c) => {
          c.classList.remove("active");
          c.setAttribute("aria-expanded", "false");
        });
        cards[idx].classList.add("active");
        cards[idx].setAttribute("aria-expanded", "true");
        activeGraha = idx;
        const g = GRAHAS[idx];
        panel.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-shrink-0 text-center md:text-left">
        <div class="planet-symbol" style="color:${g.color};font-size:4rem">${g.sym}</div>
        <h3 class="mt-2 text-xl font-bold" style="font-family:var(--font-display)">${g.name} <span style="color:var(--muted);font-weight:400">(${g.en})</span></h3>
        <div class="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
          <span class="tag" style="color:${g.color};border-color:${g.color}">${g.nature}</span>
          <span class="tag" style="color:var(--muted);border-color:var(--border)">${g.gender}</span>
          <span class="tag" style="color:var(--muted);border-color:var(--border)">${g.caste}</span>
          <span class="tag" style="color:var(--muted);border-color:var(--border)">${g.day}</span>
          <span class="tag" style="color:var(--muted);border-color:var(--border)">${g.dir}</span>
        </div>
      </div>
      <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 class="font-bold mb-2 section-eyebrow" style="margin-bottom:0.5rem">SIGNIFICATIONS</h4>
          <ul class="space-y-1" style="color:var(--muted)">${g.rep.map((r) => `<li class="flex items-start gap-2"><span style="color:${g.color}">▸</span>${r}</li>`).join("")}</ul>
        </div>
        <div>
          <h4 class="font-bold mb-2 section-eyebrow" style="margin-bottom:0.5rem">SIGN POSITION</h4>
          <div class="space-y-2" style="color:var(--muted)">
            <div><span class="text-xs font-bold" style="color:var(--cream)">Rulership:</span> ${g.ruler}</div>
            <div><span class="text-xs font-bold" style="color:var(--cream)">Exaltation:</span> <span class="readout">${g.exalt}</span></div>
            <div><span class="text-xs font-bold" style="color:var(--cream)">Debilitation:</span> <span class="readout">${g.debl}</span></div>
            <div><span class="text-xs font-bold" style="color:var(--cream)">Moolatrikona:</span> <span class="readout">${g.mt}</span></div>
          </div>
          <h4 class="font-bold mt-4 mb-2 section-eyebrow" style="margin-bottom:0.5rem">RELATIONSHIPS</h4>
          <div class="space-y-1 text-xs" style="color:var(--muted)">
            <div>Friends: <span style="color:var(--earth)">${g.friends.join(", ") || "None"}</span></div>
            <div>Enemies: <span style="color:var(--vermillion)">${g.enemies.join(", ") || "None"}</span></div>
            <div>Neutral: ${g.neutral.join(", ") || "None"}</div>
          </div>
          <h4 class="font-bold mt-4 mb-2 section-eyebrow" style="margin-bottom:0.5rem">BODY PARTS</h4>
          <p style="color:var(--muted)">${g.body.join(", ")}</p>
        </div>
      </div>
    </div>`;
        panel.classList.add("open");
        setTimeout(
          () => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          100,
        );
      };
      renderGrahas();
