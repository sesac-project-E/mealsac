let selectedMarker = null;
const markers = [];
const sortType = document.querySelector('.sortType');
const article = document.querySelector('.sortArticle');

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 15,
    center: { lat: 37.51805933031688, lng: 126.8873621375354 },
  });

  // 초기 위치에 마커 추가
  const initialMarker = new google.maps.Marker({
    map: map,
    position: { lat: 37.51805933031688, lng: 126.8873621375354 },
    title: '초기 위치',
    icon: {
      url: '/static/img/sesac.png',
      scaledSize: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(25, 25),
    },
  });

  const geocoder = new google.maps.Geocoder();

  restaurants.forEach((restaurant, index) => {
    geocoder.geocode(
      { address: restaurant.restaurant_address },
      function (results, status) {
        if (status == 'OK') {
          let markerOptions = {
            map: map,
            position: results[0].geometry.location,
            title: restaurant.restaurant_name,
          };

          // if (
          //   restaurant.restaurant_type &&
          //   restaurant.restaurant_type.restaurant_type === '한식'
          // ) {
          //   markerOptions.icon = {
          //     url: '/static/img/korean.png',
          //     scaledSize: new google.maps.Size(50, 50),
          //   };
          // }

          const marker = new google.maps.Marker(markerOptions);
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

document
  .querySelector('.allRestaurantContainer')
  .addEventListener('click', async function (e) {
    const target = e.target;

    const restaurantContainer = target.closest('.restaurantContainer');

    if (restaurantContainer) {
      const restaurantAddress = restaurantContainer.dataset.id; // 주소 형태로 저장된 데이터
      alert(restaurantAddress);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: restaurantAddress },
        function (results, status) {
          if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
          } else {
            console.log('주소 변환 실패 ' + status);
          }
        },
      );
    }

    if (target.classList.contains('heart')) {
      const restaurant_id = target.id;
      const currentSrc = target.getAttribute('src');

      if (currentSrc === '/static/img/heart.png') {
        try {
          const response = await axios({
            method: 'POST',
            url: `/api/like`,
            data: { restaurant_id },
          });

          if (response.status === 201) {
            alert('찜 목록에 추가되었습니다.');
            e.target.setAttribute('src', '/static/img/heartFilled.png');
          }
        } catch (error) {
          console.error('에러 정보:', error);
          alert('찜 목록에 추가하는 것을 실패했습니다.');
        }
      } else if (currentSrc === '/static/img/heartFilled.png') {
        try {
          const response = await axios({
            method: 'DELETE',
            url: `/api/like`,
            data: { restaurant_id },
          });

          if (response.status === 200) {
            alert('찜 목록에서 삭제되었습니다.');
            e.target.setAttribute('src', '/static/img/heart.png');
          }
        } catch (error) {
          console.error('에러 정보:', error);
          alert('찜 목록에서 삭제하는 것을 실패했습니다.');
        }
      }
    }
  });

let currentPage = 1; // 현재 페이지 번호
const restaurantsPerPage = 20; // 페이지당 식당 수

// "이전" 버튼 클릭 이벤트
document.querySelector('#prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderRestaurantsPage(currentPage);
  } else {
    alert('더 많은 식당을 보고싶으시다면 다음 버튼을 클릭해주세요.');
  }
});

// "다음" 버튼 클릭 이벤트
document.querySelector('#nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  if (currentPage < totalPages) {
    currentPage += 1;
    renderRestaurantsPage(currentPage);
  } else {
    alert('더 이상 식당 정보가 없습니다.');
  }
});
