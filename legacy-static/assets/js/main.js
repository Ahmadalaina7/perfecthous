// Perfecthous — progressive enhancement only. Page works fully without JS.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- sticky header shadow ---------- */
  var head = document.querySelector('[data-header]');
  if (head) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    head.parentNode.insertBefore(sentinel, head);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        head.classList.toggle('is-stuck', !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(sentinel);
    }
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.navtoggle');
  var menu = document.getElementById('mobilemenu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      menu.hidden = !open;
    };
    toggle.addEventListener('click', function () {
      setOpen(menu.hidden);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && !menu.hidden) setOpen(false);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (items.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- quote form -> WhatsApp ---------- */
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.formmsg');
      var naam = form.naam.value.trim();
      var tel = form.tel.value.trim();
      if (!naam || !tel) {
        if (msg) {
          msg.textContent = 'Vul in ieder geval uw naam en telefoonnummer in, dan kunnen we contact opnemen.';
          msg.className = 'formmsg is-shown is-error';
        }
        (naam ? form.tel : form.naam).focus();
        return;
      }
      var regel = function (label, val) { return val ? label + ': ' + val + '\n' : ''; };
      var tekst = 'Aanvraag via perfecthous-website\n\n'
        + regel('Naam', naam)
        + regel('Telefoon', tel)
        + regel('E-mail', form.email.value.trim())
        + regel('Plaats', form.plaats.value.trim())
        + regel('Soort werk', form.werk.value)
        + regel('Gewenste start', form.start.value)
        + '\n' + (form.bericht.value.trim() || '(geen omschrijving)');
      if (msg) {
        msg.textContent = 'Uw aanvraag is klaar. WhatsApp opent in een nieuw venster — druk daar op verzenden om hem af te ronden.';
        msg.className = 'formmsg is-shown';
      }
      window.open('https://wa.me/31616298837?text=' + encodeURIComponent(tekst), '_blank', 'noopener');
    });
  }
})();
