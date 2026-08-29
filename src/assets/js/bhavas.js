// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderBhavaWheel() {
  const container = document.getElementById("bhavaWheelContainer");
  const size = Math.min(460, window.innerWidth - 40);
  const pad = 6;
  const cs = size - 2 * pad;
  const sc = cs / 480;
  const pt = (px, py) => [
    +(px * sc + pad).toFixed(2),
    +(py * sc + pad).toFixed(2),
  ];
  const TL = pt(0, 0),
    T = pt(240, 0),
    TR = pt(480, 0);
  const L = pt(0, 240),
    C = pt(240, 240),
    R = pt(480, 240);
  const BL = pt(0, 480),
    B = pt(240, 480),
    BR = pt(480, 480);
  const TLm = pt(120, 120),
    TRm = pt(360, 120),
    BRm = pt(360, 360),
    BLm = pt(120, 360);
  const toPS = (pts) => pts.map((p) => p.join(",")).join(" ");
  const ctr = (pts) => [
    pts.reduce((s, p) => s + p[0], 0) / pts.length,
    pts.reduce((s, p) => s + p[1], 0) / pts.length,
  ];
  const housePolys = [
    [T, TRm, C, TLm],
    [TL, T, TLm],
    [TL, TLm, L],
    [L, BLm, C, TLm],
    [BL, L, BLm],
    [BL, BLm, B],
    [B, BLm, C, BRm],
    [BR, B, BRm],
    [BR, BRm, R],
    [R, BRm, C, TRm],
    [TR, R, TRm],
    [TR, TRm, T],
  ];
  const nSz = Math.max(9, Math.round(size * 0.036));
  const lSz = Math.max(5, Math.round(size * 0.021));
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block">`;
  svg += `<rect width="${size}" height="${size}" fill="var(--bg2)" rx="6"/>`;
  housePolys.forEach((pts, i) => {
    const ps = toPS(pts);
    const [cx, cy] = ctr(pts);
    const sName = BHAVAS[i].name.split("/")[0].trim().split(" ")[0];
    const isKite = pts.length === 4;
    svg += `<polygon points="${ps}" fill="var(--card)" stroke="var(--border)" stroke-width="0.75" class="bhava-node" data-idx="${i}" style="cursor:pointer;transition:all 0.3s" tabindex="0" role="button" aria-label="House ${i + 1} — ${BHAVAS[i].name}" onclick="selectBhava(${i})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectBhava(${i})}"/>`;
    svg += `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Cinzel,serif" style="pointer-events:none">`;
    svg += `<tspan x="${cx}" dy="-0.38em" fill="var(--teal)" font-size="${isKite ? nSz : nSz * 0.9}" font-weight="700">${i + 1}</tspan>`;
    svg += `<tspan x="${cx}" dy="${isKite ? "1.25em" : "1.1em"}" fill="var(--muted)" font-size="${isKite ? lSz : lSz * 0.85}">${sName}</tspan>`;
    svg += `</text>`;
    if (i === 0)
      svg += `<text x="${cx}" y="${+(cy + nSz * 1.7).toFixed(1)}" text-anchor="middle" fill="var(--teal)" font-size="${Math.max(5, lSz - 1)}" font-family="Cinzel,serif" opacity="0.6" style="pointer-events:none">ASC</text>`;
  });
  svg += `</svg>`;
  container.innerHTML = svg;
}
let activeBhava = -1;
window.selectBhava = function (idx) {
  if (activeBhava === idx) return;
  activeBhava = idx;
  document.querySelectorAll(".bhava-node").forEach((n, i) => {
    const isActive = i === idx;
    n.setAttribute("fill", isActive ? "var(--card2)" : "var(--card)");
    n.setAttribute("stroke", isActive ? "var(--teal)" : "var(--border)");
    n.setAttribute("stroke-width", isActive ? "2.5" : "1.5");
  });
  const b = BHAVAS[idx];
  document.getElementById("bhavaDetail").innerHTML = `
    <div class="p-6 rounded-2xl" style="background:var(--card);border:1px solid var(--border)">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mono" style="background:rgba(42,157,143,0.15);color:var(--teal);border:2px solid var(--teal)">${b.num}</div>
        <div><h3 class="text-xl font-bold" style="font-family:var(--font-display)">${b.name}</h3><p class="text-sm" style="color:var(--muted)">${b.en}</p></div>
      </div>
      <p class="text-sm mb-4" style="color:var(--cream);opacity:0.9">${b.theme}</p>
      ${b.extra ? `<p class="text-xs mb-4 italic" style="color:var(--teal)">${b.extra}</p>` : ""}
      <h4 class="font-bold mb-2 section-eyebrow" style="margin-bottom:0.5rem;color:var(--teal)">KEY SIGNIFICATIONS</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        ${b.signif.map((s) => `<div class="flex items-start gap-2 text-sm" style="color:var(--muted)"><span style="color:var(--teal)">▸</span>${s}</div>`).join("")}
      </div>
    </div>`;
};
renderBhavaWheel();
window.addEventListener("resize", renderBhavaWheel);
