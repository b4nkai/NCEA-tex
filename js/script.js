(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('nv-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('is-open');
    });

    document.querySelectorAll('.nv-mobile-item').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('is-open');
      });
    });
  }

  var navItems = document.querySelectorAll('.nv-item');
  var sections = Array.prototype.map.call(navItems, function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function updateActiveNav() {
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 120) {
        current = section;
      }
    });
    navItems.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('is-active', isActive);
    });
  }

  if (sections.length) {
    document.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  var revealTargets = document.querySelectorAll('.reveal');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var form = document.getElementById('order-form');
  var successBox = document.getElementById('success-box');
  if (form && successBox) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      successBox.classList.add('is-visible');
      form.reset();
    });
  }
})();
