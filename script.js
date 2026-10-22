/* Troy Jennings — portfolio interactions */
(function () {
  'use strict';

  var revealTargets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add('in');
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.top-nav a'));
  var sectionIds = navLinks.map(function (link) {
    return link.getAttribute('href').replace('#', '');
  });
  var sections = sectionIds.map(function (id) {
    return document.getElementById(id);
  });

  function updateActiveNavigation() {
    var activeId = '';
    sections.forEach(function (section, index) {
      if (!section) return;
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
        activeId = sectionIds[index];
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  }

  window.addEventListener('scroll', updateActiveNavigation, { passive: true });
  updateActiveNavigation();

  Array.prototype.slice.call(document.querySelectorAll('[data-print]')).forEach(function (button) {
    button.addEventListener('click', function () {
      window.print();
    });
  });
})();
