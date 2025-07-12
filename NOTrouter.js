;(function() {
  const app = document.getElementById('app');
  const router = new Navigo('/', { hash: false });

  // Charge un fragment HTML et injecte le terme, si présent
  function render(fragment, term = '') {
    fetch(fragment)
      .then(res => res.text())
      .then(html => {
        app.innerHTML = html;
        // Injecte le mot-clé recherché
        app.querySelectorAll('[data-search-term]').forEach(el => {
          el.textContent = decodeURIComponent(term);
        });
      });
  }

  router
    .on('/', () => render('index.html'))
    .on('/searched/:term+', ({ data }) => render('indeed.html', data.term))
    .notFound(() => render('404.html', window.location.pathname))
    .resolve();

  // Réactive le router sur les liens internes
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-navigo]')) {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
    }
  });
})();