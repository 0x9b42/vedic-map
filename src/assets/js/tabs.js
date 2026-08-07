// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

const tabBtns = document.querySelectorAll(".tab-btn");
      const tabContents = document.querySelectorAll(".tab-content");
      const topbarCurrent = document.getElementById("topbarCurrent");
      const topbarIndex = document.getElementById("topbarIndex");
      const tabLabels = {};
      tabBtns.forEach((b, i) => {
        tabLabels[b.dataset.tab] = b.textContent.trim();
      });
      const sectionTitles = {
        hero: "History & Origin",
        foundation: "Foundation",
        grahas: "Grahas",
        rashis: "Rashis",
        bhavas: "Bhavas",
        nakshatras: "Nakshatras",
        kala: "Kala",
        charts: "Charts",
        yogas: "Yogas",
        tools: "Tools & Techniques",
        flow: "Flow",
        principles: "Principles",
        wisdom: "Wisdom",
        branches: "Branches",
        essence: "Essence",
      };

      tabBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          const tabId = btn.getAttribute("data-tab");
          tabBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          tabContents.forEach((content) => {
            content.classList.toggle("active", content.id === tabId);
          });
          topbarCurrent.textContent = sectionTitles[tabId] || tabId;
          topbarIndex.textContent =
            String(i + 1).padStart(2, "0") + " / " + tabBtns.length;
          window.scrollTo(0, 0);
          setTimeout(() => {
            document.querySelectorAll(".reveal, .stagger").forEach((el) => {
              if (el.closest(".tab-content.active"))
                el.classList.add("visible");
            });
          }, 300);
        });
      });
