const router = new Navigo('/', {
  hash:        false,   // mode history (true pour hash)
  linksSelector: "[data-navigo]" // sélecteur des liens à intercepter
});

router
  .on('/', () => {
    // Callback pour la route racine
    loadPage('index.html');
  })
  .on('/about', () => {
    loadPage('about.html');
  })
  .on('/search', () => {
    loadPage('search.html');
  })
  .on('/searched/:term+', ({ data }) => {
    // ':term+' capture tout après /searched/
    loadPage('indeed.html', data.term);
  })
  .notFound(() => {
    // Route fallback (404)
    loadPage('404.html');
  })
  .resolve();