/* ═══════════════════════════════════════
   ANIMATIONS — Scroll reveal + gauge + contador
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Scroll Reveal ───────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Gauge animado (Hero) ────────────── */
  const gaugeFill = document.querySelector('.hero__gauge-fill');

  if (gaugeFill) {
    const circumference  = 251;
    const targetPercent  = 70;
    const targetOffset   = circumference - (circumference * targetPercent / 100);

    const gaugeObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        gaugeFill.style.strokeDashoffset = targetOffset;
        gaugeObserver.disconnect();
      }
    }, { threshold: 0.5 });

    const gaugeEl = document.querySelector('.hero__gauge');
    if (gaugeEl) gaugeObserver.observe(gaugeEl);
  }

  /* ── Barras animadas do Hero ─────────── */
  const barHeights = [35, 55, 42, 70, 60, 78, 65, 48, 82, 70];
  document.querySelectorAll('.hero__bar').forEach((bar, i) => {
    bar.style.height = `${barHeights[i] ?? 50}%`;
  });

  /* ── Contador animado ────────────────── */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target ?? el.textContent);
    const suffix   = el.dataset.suffix ?? '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  /* ── Parallax sutil no Hero ──────────── */
  const glows = document.querySelectorAll('.hero__glow-1, .hero__glow-2');

  if (glows.length && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('mousemove', e => {
      const xR = (e.clientX / window.innerWidth  - 0.5) * 20;
      const yR = (e.clientY / window.innerHeight - 0.5) * 20;

      glows.forEach((glow, i) => {
        const f = i === 0 ? 1 : -0.5;
        glow.style.transform = `translate(${xR * f}px, ${yR * f}px)`;
      });
    }, { passive: true });
  }
})();
