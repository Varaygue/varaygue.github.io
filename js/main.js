/* ═══════════════════════════════════════════════
   KENZI KHAMMES — main.js
   ═══════════════════════════════════════════════ */

// Highlight the active nav link based on current page
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html':    '.nav-btn--about',
    'projects.html': '.nav-btn--projects',
    'blogs.html':    '.nav-btn--blogs',
    'contact.html':  '.nav-btn--contact',
  };

  const selector = map[page];
  if (selector) {
    const el = document.querySelector(selector);
    if (el) el.classList.add('active');
  }
})();
