// Auto-extracted from the monolithic index.html.
// Behavior is preserved exactly: functions are attached to `window.*` so that
// inline `onclick=` attributes in the markup continue to work.
//
// Data is injected by the page template into `window.__DATA__` (see _layouts/base.njk).

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [];
function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = [];
  const count = Math.min(
    300,
    Math.floor((canvas.width * canvas.height) / 5000),
  );
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      hue: Math.random() > 0.85 ? (Math.random() > 0.5 ? 30 : 200) : 0,
    });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.a += s.speed;
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.a));
    ctx.fillStyle = s.hue
      ? `hsla(${s.hue},60%,70%,${alpha * 0.7})`
      : `rgba(237,228,211,${alpha * 0.6})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
initStars();
drawStars();
window.addEventListener("resize", initStars);
