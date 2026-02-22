/**
 * Electronics Recycler — minimal JS: mobile nav, form UX.
 */
(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var navMain = document.getElementById('nav-main');
  if (navToggle && navMain) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var open = navMain.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close mobile nav when a link is clicked (in-page or anchor)
  if (navMain) {
    navMain.addEventListener('click', function (e) {
      if (e.target.matches('a')) {
        navMain.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
