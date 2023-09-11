let selectedMarker = null;
const markers = [];
const sortType = document.querySelector('.sortType');
const article = document.querySelector('.sortArticle');

document.addEventListener('click', function (e) {
  if (e.target.closest('.restaurantContainer')) {
    const index = Array.from(
      document.querySelectorAll('.restaurantContainer'),
    ).indexOf(e.target.closest('.restaurantContainer'));
    const marker = markers[index];
    if (selectedMarker) {
      selectedMarker.setIcon(customIcon);
    }
    if (marker) {
      map.setCenter(marker.getPosition());
    }
  }

  if (
    !e.target.closest('.sort') &&
    !e.target.closest('.sortingMethod') &&
    !e.target.closest('.sortArticle')
  ) {
    sortType.classList.remove('active');
    article.classList.remove('active');
  }
});

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 17,
    center: { lat: 37.51777, lng: 126.886418 },
  });

  // 초기 위치에 마커 추가
  const initialMarker = new google.maps.Marker({
    map: map,
    position: { lat: 37.51777, lng: 126.886418 },
    title: '초기 위치',
  });

  const geocoder = new google.maps.Geocoder();

  restaurants.forEach((restaurant, index) => {
    geocoder.geocode(
      { address: restaurant.restaurantAddress },
      function (results, status) {
        if (status == 'OK') {
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: restaurant.restaurantName,
          });
          markers.push(marker);
          marker.addListener('click', function () {
            map.setCenter(marker.getPosition());
          });
        } else {
          console.error('Geocode was not successful: ' + status);
        }
      },
    );
  });
}

document.querySelector('.sort').addEventListener('click', function (e) {
  if (e.target.classList.contains('sortingMethod')) {
    document.querySelector('.sorting').textContent = e.target.textContent;
    sortType.classList.remove('active');
    article.classList.remove('active');
    return;
  }
  sortType.classList.toggle('active');
  article.classList.toggle('active');
});

// 찜버튼
const heartElements = document.querySelectorAll('.heart');
heartElements.forEach(heartElement => {
  heartElement.addEventListener('click', e => {
    e.target.setAttribute('src', '../../static/images/heart-filled.png');
  });
});
