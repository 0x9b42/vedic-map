// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderZodiacWheel() {
        const container = document.getElementById("zodiacWheelContainer");
        const size = Math.min(460, window.innerWidth - 40);
        const cx = size / 2,
          cy = size / 2,
          outerR = size / 2 - 10,
          innerR = outerR * 0.55;
        const elemColors = {
          Fire: "var(--fire)",
          Earth: "var(--earth)",
          Air: "var(--air)",
          Water: "var(--water)",
        };
        let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block">`;
        svg += `<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="var(--border)" stroke-width="1"/>`;
        svg += `<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="var(--bg)" stroke="var(--border)" stroke-width="1"/>`;
        svg += `<circle cx="${cx}" cy="${cy}" r="${innerR * 0.6}" fill="none" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="3,3"/>`;
        for (let i = 0; i < 12; i++) {
          const startA = ((i * 30 - 90) * Math.PI) / 180;
          const endA = (((i + 1) * 30 - 90) * Math.PI) / 180;
          const x1o = cx + outerR * Math.cos(startA),
            y1o = cy + outerR * Math.sin(startA);
          const x2o = cx + outerR * Math.cos(endA),
            y2o = cy + outerR * Math.sin(endA);
          const x1i = cx + innerR * Math.cos(startA),
            y1i = cy + innerR * Math.sin(startA);
          const x2i = cx + innerR * Math.cos(endA),
            y2i = cy + innerR * Math.sin(endA);
          const midA = (startA + endA) / 2,
            midR = (outerR + innerR) / 2;
          const tx = cx + midR * Math.cos(midA),
            ty = cy + midR * Math.sin(midA);
          const r = RASHIS[i];
          const col = elemColors[r.elem];
          const path = `M${x1i},${y1i} L${x1o},${y1o} A${outerR},${outerR} 0 0,1 ${x2o},${y2o} L${x2i},${y2i} A${innerR},${innerR} 0 0,0 ${x1i},${y1i} Z`;
          svg += `<path d="${path}" fill="${col}" fill-opacity="0.1" stroke="${col}" stroke-width="1" stroke-opacity="0.4" class="rashi-seg" data-idx="${i}" style="cursor:pointer;transition:all 0.3s" tabindex="0" role="button" aria-label="${r.name} — ${r.en}" onmouseover="this.style.fillOpacity='0.25'" onmouseout="if(!this.classList.contains('active'))this.style.fillOpacity='0.1'" onclick="selectRashi(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectRashi(${i})}"/>`;
          svg += `<text x="${tx}" y="${ty - 8}" text-anchor="middle" dominant-baseline="middle" fill="${col}" font-size="${size > 350 ? "20" : "14"}" font-family="'Noto Sans Symbols 2','Segoe UI Symbol',serif" style="pointer-events:none;font-variant-emoji:text">${r.sym}</text>`;
          svg += `<text x="${tx}" y="${ty + 12}" text-anchor="middle" dominant-baseline="middle" fill="var(--cream)" font-size="${size > 350 ? "9" : "7"}" font-family="Cinzel,serif" style="pointer-events:none;opacity:0.8">${r.name}</text>`;
          svg += `<line x1="${cx + innerR * Math.cos(startA)}" y1="${cy + innerR * Math.sin(startA)}" x2="${cx + outerR * Math.cos(startA)}" y2="${cy + outerR * Math.sin(startA)}" stroke="var(--border)" stroke-width="0.5"/>`;
        }
        svg += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" fill="var(--gold)" font-size="11" font-family="Cinzel,serif" font-weight="700">ZODIAC</text>`;
        svg += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" fill="var(--muted)" font-size="8" font-family="Cinzel,serif">RASHIS</text>`;
        svg += `</svg>`;
        container.innerHTML = svg;
      }
      let activeRashi = -1;
      window.selectRashi = function (idx) {
        if (activeRashi === idx) return;
        activeRashi = idx;
        document.querySelectorAll(".rashi-seg").forEach((s, i) => {
          s.classList.toggle("active", i === idx);
          s.style.fillOpacity = i === idx ? "0.3" : "0.1";
        });
        const r = RASHIS[idx];
        const elemColors = {
          Fire: "var(--fire)",
          Earth: "var(--earth)",
          Air: "var(--air)",
          Water: "var(--water)",
        };
        const col = elemColors[r.elem];
        document.getElementById("rashiDetail").innerHTML = `
    <div class="p-6 rounded-2xl" style="background:var(--card);border:1px solid var(--border)">
      <div class="flex items-center gap-4 mb-4">
        <span style="font-size:3rem;color:${col};filter:drop-shadow(0 0 10px ${col})">${r.sym}</span>
        <div><h3 class="text-2xl font-bold" style="font-family:var(--font-display)">${r.name}</h3><p class="text-sm" style="color:var(--muted)">${r.en}</p></div>
      </div>
      <div class="flex flex-wrap gap-2 mb-5">
        <span class="tag" style="color:${col};border-color:${col}">${r.elem}</span>
        <span class="tag" style="color:var(--cream);border-color:var(--border)">${r.mode}</span>
        <span class="tag" style="color:var(--gold);border-color:var(--gold)">Ruler: ${r.ruler}</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div><h4 class="font-bold mb-2 section-eyebrow" style="margin-bottom:0.5rem">KEY THEMES</h4><p style="color:var(--muted)">${r.theme}</p></div>
        <div>
          <h4 class="font-bold mb-2 section-eyebrow" style="margin-bottom:0.5rem">SIGN ATTRIBUTES</h4>
          <div class="space-y-1.5" style="color:var(--muted)">
            ${r.exalt !== "—" ? `<div>Exalted planet: <strong style="color:var(--cream)">${r.exalt}</strong></div>` : ""}
            ${r.debl !== "—" ? `<div>Debilitated planet: <strong style="color:var(--cream)">${r.debl}</strong></div>` : ""}
            <div>Body parts: <strong style="color:var(--cream)">${r.body}</strong></div>
          </div>
        </div>
      </div>
    </div>`;
      };
      renderZodiacWheel();
      window.addEventListener("resize", renderZodiacWheel);
