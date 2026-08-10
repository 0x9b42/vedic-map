// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

setTimeout(() => {
  document
    .querySelectorAll(".reveal,.stagger")
    .forEach((el) => observer.observe(el));
}, 100);
