document.addEventListener('click', e => {
  const sortType = document.querySelector('.sortType');
  const article = document.querySelector('.sortArticle');

  // 클릭한 요소가 .sort나 .sortingMethod, .sortArticle 내부가 아닐 때
  if (
    !e.target.closest('.sort') &&
    !e.target.closest('.sortingMethod') &&
    !e.target.closest('.sortArticle')
  ) {
    sortType.classList.remove('active');
    article.classList.remove('active');
  }
});

document.querySelector('.sort').addEventListener('click', e => {
  const sortType = document.querySelector('.sortType');
  const article = document.querySelector('.sortArticle');

  if (e.target.classList.contains('sortingMethod')) {
    document.querySelector('.sorting').textContent = e.target.textContent;
    sortType.classList.remove('active');
    article.classList.remove('active');
    return;
  }

  if (sortType.classList.contains('active')) {
    sortType.classList.remove('active');
    article.classList.remove('active');
  } else {
    sortType.classList.add('active');
    article.classList.add('active');
  }
});
