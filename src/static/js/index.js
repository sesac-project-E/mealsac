document.addEventListener('DOMContentLoaded', function () {
  const slideGroups = document.querySelectorAll('.restaurants');

  slideGroups.forEach(group => {
    const cardContainer = group.querySelector('.cardMenu');
    const cards = cardContainer.querySelectorAll('.card-container');
    const cardWidth = cards[0].offsetWidth;
    let slideIndex = 0;

    group
      .querySelector('.slide-btn.prev')
      .addEventListener('click', function () {
        if (slideIndex > 0) {
          slideIndex -= 4;
          updateSlidePosition(cardContainer, slideIndex, cardWidth);
        }
      });

    group
      .querySelector('.slide-btn.next')
      .addEventListener('click', function () {
        if (slideIndex < cards.length - 4) {
          slideIndex += 4;
          updateSlidePosition(cardContainer, slideIndex, cardWidth);
        }
      });
  });

  function updateSlidePosition(cardContainer, slideIndex, cardWidth) {
    const offset = -cardWidth * slideIndex;
    cardContainer.style.transform = `translateX(${offset}px)`;
  }
});
