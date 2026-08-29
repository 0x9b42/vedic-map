// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderBranches() {
        document.getElementById("branchesGrid").innerHTML = BRANCHES.map(
          (b) => `
    <div class="branch-card">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background:rgba(184,115,51,0.12)"><i class="fas ${b.icon}" style="color:var(--copper)"></i></div>
        <div><h4 class="text-sm font-bold" style="font-family:var(--font-display)">${b.name}</h4><p class="text-xs" style="color:var(--muted)">${b.en}</p></div>
      </div>
      <p class="text-sm leading-relaxed" style="color:var(--muted)">${b.desc}</p>
      <p class="text-xs mt-3 leading-relaxed" style="color:var(--cream);opacity:0.6">${b.details}</p>
    </div>`,
        ).join("");
      }
      renderBranches();
