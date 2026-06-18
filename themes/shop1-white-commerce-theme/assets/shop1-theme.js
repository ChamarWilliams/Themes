document.addEventListener('change', event => {
  if (event.target && event.target.id === 'SortBy') {
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', event.target.value);
    window.location.href = url.toString();
  }
});
