// mobile menu (mirrors source behaviour) + back button + mailto inquiry forms
(function () {
  var openButton = document.querySelector('[data-menu-open]');
  var closeButton = document.querySelector('[data-menu-close]');
  var backdrop = document.querySelector('[data-menu-backdrop]');
  var menu = document.querySelector('[data-mobile-menu]');
  var previousFocus = null;
  function openMenu() {
    previousFocus = document.activeElement;
    document.body.classList.add('menu-open');
    if (openButton) openButton.setAttribute('aria-expanded', 'true');
    if (menu) menu.setAttribute('aria-hidden', 'false');
    if (closeButton) closeButton.focus();
  }
  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (openButton) openButton.setAttribute('aria-expanded', 'false');
    if (menu) menu.setAttribute('aria-hidden', 'true');
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }
  if (openButton) openButton.addEventListener('click', openMenu);
  if (closeButton) closeButton.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (!document.body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') closeMenu();
  });
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  // back button
  document.querySelectorAll('[data-back]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.history.length > 1) { window.history.back(); }
      else { window.location.href = b.getAttribute('data-fallback') || '/'; }
    });
  });
  // inquiry forms -> mailto
  document.querySelectorAll('form[data-inquiry-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var d = new FormData(f);
      var lines = [];
      ['inquiryType', 'name', 'email', 'phone', 'company', 'fleetSize', 'subject', 'service'].forEach(function (k) {
        var v = d.get(k);
        if (v) lines.push(k + ': ' + v);
      });
      lines.push('', d.get('message') || '');
      var subject = encodeURIComponent(d.get('subject') || 'Website inquiry');
      window.location.href = 'mailto:' + f.getAttribute('data-mailto') + '?subject=' + subject + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
