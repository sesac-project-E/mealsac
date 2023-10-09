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
      const apiUrl = `/api/menu/search?q=${searchInput.value}&page=1`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          mainSearch = data;
          console.log(mainSearch);
        })
        .catch(error => {
          console.error('API 요청 실패:', error);
        });
    }
  });
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
