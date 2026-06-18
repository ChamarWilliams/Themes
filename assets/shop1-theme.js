document.addEventListener('change', event => {
  if (event.target && event.target.id === 'SortBy') {
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', event.target.value);
    window.location.href = url.toString();
  }
});

const drawer = document.getElementById('CategoryDrawer');
const overlay = document.querySelector('[data-category-drawer-close].drawer-overlay');
const openButtons = document.querySelectorAll('[data-category-drawer-open]');
const closeButtons = document.querySelectorAll('[data-category-drawer-close]');

function setDrawer(open) {
  if (!drawer || !overlay) return;
  drawer.classList.toggle('is-open', open);
  overlay.classList.toggle('is-open', open);
  overlay.hidden = !open;
  drawer.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('drawer-open', open);
  openButtons.forEach(button => button.setAttribute('aria-expanded', String(open)));
  if (open) {
    const firstInput = drawer.querySelector('input, button, a');
    if (firstInput) firstInput.focus();
  }
}

openButtons.forEach(button => {
  button.addEventListener('click', () => setDrawer(true));
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => setDrawer(false));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setDrawer(false);
});

const cookieBanner = document.querySelector('[data-cookie-banner]');
const cookieAccept = document.querySelector('[data-cookie-accept]');

if (cookieBanner && window.localStorage.getItem('shop1-cookie-notice') !== 'accepted') {
  cookieBanner.hidden = false;
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    window.localStorage.setItem('shop1-cookie-notice', 'accepted');
    if (cookieBanner) cookieBanner.hidden = true;
  });
}
