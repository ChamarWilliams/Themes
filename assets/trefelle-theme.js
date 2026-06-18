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

const cookieStorageKey = 'trefelle-cookie-notice';
const cookieBanner = document.querySelector('[data-cookie-banner]');

function getCookieNoticeAccepted() {
  try {
    return window.localStorage.getItem(cookieStorageKey) === 'accepted';
  } catch (error) {
    return document.cookie.includes(`${cookieStorageKey}=accepted`);
  }
}

function setCookieNoticeAccepted() {
  try {
    window.localStorage.setItem(cookieStorageKey, 'accepted');
  } catch (error) {
    document.cookie = `${cookieStorageKey}=accepted; path=/; max-age=31536000; SameSite=Lax`;
  }
}

function hideCookieBanner() {
  if (!cookieBanner) return;
  setCookieNoticeAccepted();
  cookieBanner.classList.remove('is-visible');
  cookieBanner.classList.add('is-dismissing');
  window.setTimeout(() => {
    cookieBanner.hidden = true;
    cookieBanner.classList.remove('is-dismissing');
  }, 200);
}

if (cookieBanner && !getCookieNoticeAccepted()) {
  cookieBanner.hidden = false;
  window.requestAnimationFrame(() => cookieBanner.classList.add('is-visible'));
}

document.addEventListener('click', event => {
  const acceptButton = event.target.closest('[data-cookie-accept]');
  if (acceptButton) hideCookieBanner();
});

const policyModal = document.querySelector('[data-policy-modal]');
const policyTitle = document.querySelector('[data-policy-title]');
const policyBody = document.querySelector('[data-policy-body]');
const policyContentScript = document.querySelector('[data-policy-content]');
let policyContent = {};

if (policyContentScript) {
  try {
    policyContent = JSON.parse(policyContentScript.textContent);
  } catch (error) {
    policyContent = {};
  }
}

function openPolicy(policyKey) {
  const policy = policyContent[policyKey];
  if (!policyModal || !policyTitle || !policyBody || !policy) return;
  policyTitle.textContent = policy.title;
  policyBody.innerHTML = policy.html;
  policyModal.hidden = false;
  window.requestAnimationFrame(() => policyModal.classList.add('is-open'));
  document.body.classList.add('drawer-open');
}

function closePolicy() {
  if (!policyModal) return;
  policyModal.classList.remove('is-open');
  document.body.classList.remove('drawer-open');
  window.setTimeout(() => {
    policyModal.hidden = true;
  }, 200);
}

function openPolicyFromHash() {
  const match = window.location.hash.match(/^#policy-(.+)$/);
  if (match) openPolicy(match[1]);
}

document.addEventListener('click', event => {
  const policyLink = event.target.closest('[data-policy-open]');
  if (policyLink) {
    event.preventDefault();
    const policyKey = policyLink.getAttribute('data-policy-open');
    window.history.replaceState(null, '', `#policy-${policyKey}`);
    openPolicy(policyKey);
    return;
  }

  if (event.target.closest('[data-policy-close]')) {
    event.preventDefault();
    closePolicy();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closePolicy();
});

window.addEventListener('hashchange', openPolicyFromHash);
openPolicyFromHash();
