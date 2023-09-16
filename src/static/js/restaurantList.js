let selectedMarker = null;
const markers = [];
let map;
let currentPage = 1;
let totalPages;
let sortTypeValue = '인기순';
const tags = [];
const searchName = document.querySelector('.searchName');
const searchType = document.querySelector('.searchType');
const nameRadio = document.querySelector('#name');
const menuRadio = document.querySelector('#menu');
const searchInput = document.querySelector('#searchInput');
const searchForm = document.querySelector('#searchForm');
const tagNstyle = document.querySelector('.tagNstyle');
const formContainer = document.querySelector('.formContainer');

const initMap = data => {
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

  data.forEach((restaurant, index) => {
    geocoder.geocode(
      { address: restaurant.restaurant_address },
      (results, status) => {
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
          marker.addListener('click', () => {
            map.setCenter(marker.getPosition());
          });
        } else {
          console.error('Geocode was not successful: ' + status);
        }
      },
    );
  });
};

const fetchData = async () => {
  let url = '';

  if (sortTypeValue === '인기순') {
    url = `/api/restaurant/like?page=${currentPage}`;
  } else if (sortTypeValue === '평점순') {
    url = `/api/restaurant/rating?page=${currentPage}`;
  } else {
    // 기본값 설정
    url = `/api/restaurant/all?page=1`;
  }

  try {
    const response = await axios.get(url);
    totalPages = Math.ceil(response.data.count / 20);
    drawPagination(currentPage);
    updatePage(response.data);
    // initMap(response.data.rows);
    return response.data.rows;
  } catch (error) {
    console.error('에러 발생 ', error);
  }
};

const updatePage = data => {
  const restaurantContainer = document.querySelector('.restaurants');
  const totalRestaurants = document.querySelector('.totalRestaurants');
  restaurantContainer.innerHTML = '';
  totalRestaurants.innerText = `${data.count}개의 매장`;

  if (Array.isArray(data.rows) && data.rows.length > 0) {
    data.rows.forEach(restaurant => {
      const article = document.createElement('article');
      article.className = 'restaurantContainer';
      article.dataset.id = restaurant.restaurant_address;

      const img = document.createElement('img');
      img.className = 'restaurantImg';
      img.src = restaurant.restaurant_image;
      img.alt = `${restaurant.restaurant_name} 이미지`;

      const divInfo = document.createElement('div');
      divInfo.className = 'restaurantInfo';

      const divTop = document.createElement('div');

      const h3 = document.createElement('h3');
      h3.className = 'restaurantName';
      h3.textContent = restaurant.restaurant_name;

      const imgHeart = document.createElement('img');
      imgHeart.className = 'heart';
      imgHeart.id = restaurant.restaurant_id;
      imgHeart.alt = '찜 아이콘';
      imgHeart.src =
        restaurant.Users && restaurant.Users.length === 0
          ? '/static/img/heart.png'
          : '/static/img/heartFilled.png';

      divTop.appendChild(h3);
      divTop.appendChild(imgHeart);

      const pAddress = document.createElement('p');
      pAddress.className = 'address';
      pAddress.textContent = restaurant.restaurant_address || '식당 주소 없음';

      const pType = document.createElement('p');
      pType.className = 'type';
      pType.textContent = restaurant.restaurant_type_id || '식당 타입 없음';

      const divBottom = document.createElement('div');

      const imgRating = document.createElement('img');
      imgRating.className = 'rating';
      imgRating.src = '/static/img/star.png';
      imgRating.alt = '평점 아이콘';

      const pRating = document.createElement('p');
      pRating.className = 'rate';
      pRating.textContent = restaurant.rating;

      const imgComment = document.createElement('img');
      imgComment.className = 'comment';
      imgComment.src = '/static/img/speechBalloon.png';
      imgComment.alt = '댓글 아이콘';

      const pComment = document.createElement('p');
      pComment.className = 'review';
      pComment.textContent = restaurant.reviews_count;

      const a = document.createElement('a');
      a.className = 'restaurantBtn';
      a.href = `/restaurant/${restaurant.restaurant_id}`;
      a.textContent = `${restaurant.restaurant_name} 페이지`;

      divBottom.appendChild(imgRating);
      divBottom.appendChild(pRating);
      divBottom.appendChild(imgComment);
      divBottom.appendChild(pComment);
      divBottom.appendChild(a);

      divInfo.appendChild(divTop);
      divInfo.appendChild(pAddress);
      divInfo.appendChild(pType);
      divInfo.appendChild(divBottom);

      article.appendChild(img);
      article.appendChild(divInfo);

      restaurantContainer.appendChild(article);
    });
  } else {
    restaurantContainer.innerHTML = '<p>해당하는 식당이 없습니다.</p>';
  }
};

const drawPagination = centerPage => {
  const container = document.querySelector('#pagination-container');
  const oldPageNumbers = document.querySelectorAll('.page-number');
  let startPage = centerPage - 2;
  let endPage = centerPage + 2;

  oldPageNumbers.forEach(el => el.remove());

  if (startPage < 1) {
    startPage = 1;
    endPage = 5;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - 4;
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageElement = document.createElement('a');
    pageElement.textContent = i;
    pageElement.href = '#up';
    pageElement.className = 'page-number';
    pageElement.onclick = function () {
      changePage(i);
    };
    if (i === centerPage) {
      pageElement.classList.add('active');
    }
    container.insertBefore(pageElement, document.querySelector('#nextPage'));
  }
};

const changePage = newPage => {
  if (newPage < 1 || newPage > totalPages) return;
  currentPage = newPage;
  drawPagination(currentPage);
  fetchData();
};

nameRadio.addEventListener('change', function () {
  if (this.checked) {
    searchInput.placeholder = '매장명 검색';
  }
});

menuRadio.addEventListener('change', function () {
  if (this.checked) {
    searchInput.placeholder = '메뉴명 검색';
  }
});

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value;
  let apiUrl;
  // currentPage=1

  if (nameRadio.checked) {
    apiUrl = `/api/menu/search?q=${query}&page=1`;
  } else if (menuRadio.checked) {
    apiUrl = `/api/menu/search?menu=${query}&page=1`;
  }

  axios
    .get(apiUrl)
    .then(response => {
      updatePage(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

document.querySelector('.sort').addEventListener('click', e => {
  const sortType = document.querySelector('.sortType');
  const sortArticle = document.querySelector('.sortArticle');

  if (e.target.classList.contains('sortingMethod')) {
    document.querySelector('.sorting').textContent = e.target.textContent;
    sortTypeValue = e.target.textContent;
    currentPage = 1;
    drawPagination(currentPage);
    fetchData();
  }
  sortType.classList.toggle('active');
  sortArticle.classList.toggle('active');
});

document
  .querySelector('.allRestaurantContainer')
  .addEventListener('click', async e => {
    const target = e.target;

    const restaurantContainer = target.closest('.restaurantContainer');

    if (restaurantContainer) {
      const restaurantAddress = restaurantContainer.dataset.id;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: restaurantAddress }, (results, status) => {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
        } else {
          console.log('주소 변환 실패 ' + status);
        }
      });
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

document.addEventListener('click', e => {
  if (e.target.closest('.allRestaurantContainer')) {
    const index = Array.from(
      document.querySelectorAll('.allRestaurantContainer'),
    ).indexOf(e.target.closest('.allRestaurantContainer'));
    const marker = markers[index];
    if (selectedMarker) {
      selectedMarker.setIcon(customIcon);
    }
    if (marker) {
      map.setCenter(marker.getPosition());
    }
  }

  const tag = e.target.closest('.tag');

  if (tag) {
    if (tag.classList.contains('tagActive')) {
      tag.classList.remove('tagActive');
      tags = tags.filter(item => (item !== tag.innerText[0]) === '#');
    } else {
      tag.classList.add('tagActive');
      if (tag.innerText[0] === '#') {
        tags.push(tag.innerText.substr(2));
      }
    }
  }
});

document.querySelector('.tagsMore').addEventListener('click', e => {
  const tagContainer = document.querySelector('.tagContainer');

  if (e.target.innerText === '더보기') {
    e.target.innerText = '접기';
    tagContainer.style.height = 'initial';
  } else {
    e.target.innerText = '더보기';
    tagContainer.style.height = '30px';
  }
});

searchName.addEventListener('click', e => {
  e.target.classList.add('clicked');
  searchType.classList.remove('clicked');
  formContainer.classList.remove('searchInvisible');
  tagNstyle.classList.add('searchInvisible');
});

searchType.addEventListener('click', e => {
  e.target.classList.add('clicked');
  searchName.classList.remove('clicked');
  tagNstyle.classList.remove('searchInvisible');
  formContainer.classList.add('searchInvisible');
});

document.querySelector('.stylesMore').addEventListener('click', e => {
  const styleContainer = document.querySelector('.styleContainer');

  if (e.target.innerText === '더보기') {
    e.target.innerText = '접기';
    styleContainer.style.height = 'initial';
  } else {
    e.target.innerText = '더보기';
    styleContainer.style.height = '30px';
  }
});

fetchData();
drawPagination(currentPage);
