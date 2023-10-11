document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.querySelector('.likeCards');
  const nextButton = document.querySelector('.slide-btn.next');
  const prevButton = document.querySelector('.slide-btn.prev');
  if (cardContainer) {
    const cardWidth = cardContainer.querySelector('.cardContainer').offsetWidth;
    let slideIndex = 0;

    nextButton.addEventListener('click', function () {
      if (slideIndex < cardContainer.children.length - 4) {
        slideIndex++;
        updateSlidePosition(cardContainer, slideIndex, cardWidth);
      }
    });

    prevButton.addEventListener('click', function () {
      if (slideIndex > 0) {
        slideIndex--;
        updateSlidePosition(cardContainer, slideIndex, cardWidth);
      }
    });

    function updateSlidePosition(cardContainer, slideIndex, cardWidth) {
      const offset = -cardWidth * slideIndex;
      cardContainer.style.transform = `translateX(${offset}px)`;
    }
  }
});

// 스크롤 이벤트
document.addEventListener('DOMContentLoaded', function () {
  const scrollButton = document.getElementById('scroll');

  scrollButton.addEventListener('click', function () {
    scrollButton.scrollIntoView({ behavior: 'smooth' });
  });
});

// 검색 기능
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.searchInput');
  let mainSearch = null;

  searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      location.href = `/search/menu?q=${searchInput.value}`;
    }
  });
});
