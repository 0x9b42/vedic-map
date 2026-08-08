// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

function renderTools() {
        document.getElementById("toolsAccordion").innerHTML = TOOLS.map(
          (t, i) => `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(${i})" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleAccordion(${i})}">
        <i class="fas ${t.icon}" style="color:var(--sage);width:20px;text-align:center"></i>
        <span class="flex-1 font-bold text-sm" style="font-family:var(--font-display)">${t.title}</span>
        <i class="fas fa-chevron-down text-xs transition-transform duration-300" style="color:var(--muted)" id="toolIcon${i}"></i>
      </div>
      <div class="accordion-body" id="toolBody${i}"><div class="px-5 pb-5 text-sm" style="color:var(--muted)">${t.content}</div></div>
    </div>`,
        ).join("");
      }
      window.toggleAccordion = function (idx) {
        const body = document.getElementById("toolBody" + idx);
        const icon = document.getElementById("toolIcon" + idx);
        const wasOpen = body.classList.contains("open");
        document
          .querySelectorAll(".accordion-body")
          .forEach((b) => b.classList.remove("open"));
        document
          .querySelectorAll('[id^="toolIcon"]')
          .forEach((i) => (i.style.transform = "rotate(0deg)"));
        document
          .querySelectorAll(".accordion-header")
          .forEach((h) => h.setAttribute("aria-expanded", "false"));
        if (!wasOpen) {
          body.classList.add("open");
          icon.style.transform = "rotate(180deg)";
          icon
            .closest(".accordion-item")
            .querySelector(".accordion-header")
            .setAttribute("aria-expanded", "true");
        }
      };
      renderTools();
