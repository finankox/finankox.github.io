  console.log("one**")
;(function() {
  const app = document.getElementById('appli');
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
    .on('/', () => render('home.html'))
    .on('/about', () => render('about.html'))
    .on('/search', () => render('search.html'))

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


var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}
