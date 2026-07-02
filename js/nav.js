/* ═══════════════════════════════════════
   NAV — Header scroll + menu mobile
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      header.classList.toggle('mobile-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });
  }

  document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
      burger && burger.classList.remove('open');
      header.classList.remove('mobile-open');
    });
  });

  /* Scroll suave com offset do header fixo */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (header.offsetHeight + 16);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* Link ativo conforme seção visível */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
})();
