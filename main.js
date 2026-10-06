// Navigation and small page-wide bits
(function () {
  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('nav.primary');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('nav.primary a');

  links.forEach(function (link) {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
