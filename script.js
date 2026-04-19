/* ── Scroll Reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── Active Nav Link ── */
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

/* ── Cursor Glow ── */
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
let mx = 0, my = 0, cx = 0, cy = 0;
window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animate() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  glow.style.left = cx + 'px';
  glow.style.top  = cy + 'px';
  requestAnimationFrame(animate);
})();

/* ── Counter Animations ── */
function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/([+\-]?)(\d+)(%|px)?/);
  if (!match) return;
  const prefix = match[1], end = parseInt(match[2]), suffix = match[3] || '';
  let start = 0, duration = 1400, startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(eased * end) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-big-stat').forEach(el => counterObs.observe(el));

/* ── Project card tilt ── */
document.querySelectorAll('.project-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── Navbar blur on scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(8,12,20,0.95)'
    : 'rgba(8,12,20,0.82)';
});

/* ── Smooth page fade-in ── */
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.6s ease';
  document.body.style.opacity = '1';
});
