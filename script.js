/* =============================================================================
   Troy Jennings — Resume site behavior
   - Reveals sections on scroll (and fills skill bars when they appear)
   - Highlights the active sidebar link as you scroll
   ============================================================================= */

(function () {
  'use strict';

  // ---- scroll reveals + skill bar fill ----
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      // fill any skill bars inside this section to their target width
      entry.target.querySelectorAll('.bar i').forEach(function (bar) {
        bar.style.width = bar.dataset.w;
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });

  // ---- active nav highlight on scroll ----
  const ids = ['intro', 'profile', 'experience', 'education', 'skills', 'interests', 'contact'];
  const links = Array.prototype.slice.call(document.querySelectorAll('nav.side a'));
  const sections = ids.map(function (id) { return document.getElementById(id); });

  function updateActiveLink() {
    let current = ids[0];
    sections.forEach(function (section, i) {
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.45) {
        current = ids[i];
      }
    });
    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();
