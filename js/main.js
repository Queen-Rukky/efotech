document.documentElement.classList.add('js');

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('open', open);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Header shadow and back-to-top button
const header = document.querySelector('.site-header');
const toTop = document.querySelector('.to-top');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 10);
  toTop.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll and count-up stats
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
  const target = Number(el.dataset.count);
  if (reducedMotion) { el.textContent = target; return; }
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
}

// Contact form: submits to Netlify Forms when hosted there, otherwise falls back to email
const form = document.querySelector('.contact-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Sending…';
  const data = new FormData(form);
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    status.textContent = 'Thank you! We’ll be in touch within one business day.';
  } catch {
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    window.location.href = `mailto:hello@efotech.com?subject=${encodeURIComponent('New enquiry from website')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app to send the message…';
  } finally {
    button.disabled = false;
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
