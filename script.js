// mobile menu + dropdown + back button
document.addEventListener('DOMContentLoaded', function () {
  var t = document.querySelector('.mobile-menu-toggle');
  var m = document.querySelector('.mobile-menu');
  if (t && m) {
    t.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    m.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { m.classList.remove('open'); });
    });
  }
  // back button
  document.querySelectorAll('[data-back]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.history.length > 1) { window.history.back(); }
      else { window.location.href = b.getAttribute('data-fallback') || '/'; }
    });
  });
  // inquiry forms -> mailto
  document.querySelectorAll('form[data-mailto]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      var subject = encodeURIComponent(d.get('subject') || 'Website inquiry');
      var body = encodeURIComponent(
        'Name: ' + (d.get('name') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        'Subject: ' + (d.get('subject') || '') + '\n\n' +
        (d.get('message') || '')
      );
      window.location.href = 'mailto:' + f.getAttribute('data-mailto') +
        '?subject=' + subject + '&body=' + body;
    });
  });
});
