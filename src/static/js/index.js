document.addEventListener('DOMContentLoaded', function () {
  const cardContainer = document.querySelector('.likeCards');
  const nextButton = document.querySelector('.slide-btn.next');
  const prevButton = document.querySelector('.slide-btn.prev');
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
});

// ===============================
// document.addEventListener('DOMContentLoaded', function () {
//   const slideGroups = document.querySelectorAll('.restaurants');

//   slideGroups.forEach(group => {
//     const cardContainer = group.querySelector('.cardMenu');
//     const cards = cardContainer.querySelectorAll('.card-container');
//     const cardWidth = cards[0].offsetWidth;
//     let slideIndex = 0;

//     group
//       .querySelector('.slide-btn.next')
//       .addEventListener('click', function () {
//         if (slideIndex < cards.length - 4) {
//           slideIndex += 4;
//           updateSlidePosition(cardContainer, slideIndex, cardWidth);
//         }
//       });
//   });

//   function updateSlidePosition(cardContainer, slideIndex, cardWidth) {
//     const offset = -cardWidth * slideIndex;
//     cardContainer.style.transform = `translateX(${offset}px)`;
//   }
// });

// // 검색 기능을 추가
// const searchForm = document.getElementById('searchForm');
// const searchInput = document.getElementById('searchInput');

// searchForm.addEventListener('submit', function (e) {
//   const searchQuery = searchInput.value.trim();

//   if (searchQuery) {
//     // 검색어가 있을 경우, 폼의 action을 수정
//     searchForm.action = `/restaurants?query=${encodeURIComponent(searchQuery)}`;
//   } else {
//     // 검색어가 없을 경우, 폼의 action을 기본 경로로 설정
//     searchForm.action = '/restaurants';
//   }
// });
