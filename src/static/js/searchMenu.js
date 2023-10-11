const searchInput = document.querySelector('.searchInput');

searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    location.href = `/search/menu?q=${searchInput.value}`;
  }
});
