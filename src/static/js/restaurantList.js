// const { query } = require('express');

let selectedMarker = null;
let initialMarker;
let markers = [];
let currentExpandedMarker;
let map;
let geocoder;
let apiUrl;
let currentPage = 1;
let totalPages;
let sortTypeValue = '인기순';
let style;
let tags = [];
let tagQuery = '';
const searchName = document.querySelector('.searchName');
const searchType = document.querySelector('.searchType');
const nameRadio = document.querySelector('#name');
const menuRadio = document.querySelector('#menu');
const searchInput = document.querySelector('#searchInput');
const searchNameMenu = document.querySelector('#searchNameMenu');
const tagRadio = document.querySelector('#tag');
const styleRadio = document.querySelector('#category');
const styleContainer = document.querySelector('.styleContainer');
const tagContainer = document.querySelector('.tagContainer');
const searchTagStyle = document.querySelector('#searchTagStyle');
const tagNstyle = document.querySelector('.tagNstyle');
const tagsMore = document.querySelector('.tagsMore');
const stylesMore = document.querySelector('.stylesMore');
const tagNstyleBtn = document.querySelector('.tagNstyleBtn');
const formContainer = document.querySelector('.formContainer');

// 지도
const initMap = async () => {
  const { Map } = await google.maps.importLibrary('maps');

  map = new Map(document.querySelector('.map'), {
    zoom: 15,
    center: { lat: 37.51805933031688, lng: 126.8873621375354 },
  });

  geocoder = new google.maps.Geocoder();

  initialMarker = addMarker({
    lat: 37.51805933031688,
    lng: 126.8873621375354,
    title: '새싹 위치',
    icon: {
      url: '/static/img/sesac.png',
      scaledSize: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(25, 25),
    },
    isInitial: true,
  });
};

const addMarker = options => {
  const marker = new google.maps.Marker({
    map: map,
    position: { lat: options.lat, lng: options.lng },
    title: options.title,
    icon: options.icon,
  });

  marker.isInitial = options.isInitial || false;

  markers.push(marker);

  return marker;
};

const clearMarkers = () => {
  for (let marker of markers) {
    if (marker.isInitial) {
      continue;
    }
    marker.setMap(null);
  }
  markers = markers.filter(marker => marker.isInitial);
};

// 주소를 좌표로 변환
const geocodeAddress = async address => {
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK') {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();

      addMarker({
        lat: lat,
        lng: lng,
        title: address,
        icon: {
          url: '/static/img/korean.png',
          scaledSize: new google.maps.Size(40, 40),
        },
      });
    } else {
      console.error(
        'Geocode was not successful for the following reason: ' + status,
      );
    }
  });
};

// 정렬 방식 선택 시 모든 식당 데이터
document.querySelector('.sort').addEventListener('click', e => {
  const sortType = document.querySelector('.sortType');
  const sortArticle = document.querySelector('.sortArticle');

  if (e.target.classList.contains('sortingMethod')) {
    document.querySelector('.sorting').textContent = e.target.textContent;
    sortTypeValue = e.target.textContent;
    currentPage = 1;
    fetchData();
    drawPagination(currentPage);
  }
  sortType.classList.toggle('active');
  sortArticle.classList.toggle('active');
});

// 검색 방식
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

// 검색 방식 세부 설정
nameRadio.addEventListener('change', () => {
  searchInput.placeholder = '매장명 검색';
});

menuRadio.addEventListener('change', () => {
  searchInput.placeholder = '메뉴명 검색';
});

tagRadio.addEventListener('change', () => {
  tagContainer.classList.remove('invisible');
  styleContainer.classList.add('invisible');

  tags = [];

  const tagElements = document.querySelectorAll('.tag');
  tagElements.forEach(tag => {
    tag.classList.remove('tagActive');
  });

  tagsMore.innerText = '더보기';
  tagContainer.style.height = '30px';
});

styleRadio.addEventListener('change', () => {
  styleContainer.classList.remove('invisible');
  tagContainer.classList.add('invisible');

  const tagElements = document.querySelectorAll('.tag');
  tagElements.forEach(tag => {
    tag.classList.remove('tagActive');
  });

  stylesMore.innerText = '더보기';
  tagContainer.style.height = '30px';
});

// 카테고리 더보기 이벤트
stylesMore.addEventListener('click', e => {
  const styleContainer = document.querySelector('.styleContainer');

  if (e.target.innerText === '더보기') {
    e.target.innerText = '접기';
    styleContainer.style.height = 'initial';
  } else {
    e.target.innerText = '더보기';
    styleContainer.style.height = '30px';
  }
});

// 태그 더보기 이벤트
tagsMore.addEventListener('click', e => {
  const tagContainer = document.querySelector('.tagContainer');

  if (e.target.innerText === '더보기') {
    e.target.innerText = '접기';
    tagContainer.style.height = 'initial';
  } else {
    e.target.innerText = '더보기';
    tagContainer.style.height = '30px';
  }
});

// 선택된 태그 배열화해 저장
document.addEventListener('click', e => {
  const tag = e.target.closest('.tag');

  if (tag) {
    if (tag.classList.contains('tagActive')) {
      tag.classList.remove('tagActive');
      if (tag.innerText[0] === '#') {
        tags = tags.filter(item => item !== tag.id);
      }
    } else {
      tag.classList.add('tagActive');
      if (tag.innerText[0] === '#') {
        tags.push(tag.id);
      }
    }
  }
});

// 매장, 메뉴명 검색 시 데이터 요청
searchNameMenu.addEventListener('submit', e => {
  e.preventDefault();

  const query = searchInput.value;
  let apiUrl;

  if (nameRadio.checked) {
    apiUrl = `/api/menu/search?page=1&q=${query}`;
  } else if (menuRadio.checked) {
    apiUrl = `/api/menu/search?q=${query}&page=1`;
  }

  axios
    .get(apiUrl)
    .then(response => {
      initMap();
      clearMarkers();

      const restaurants = response.data.rows;
      for (const restaurant of restaurants) {
        geocodeAddress(restaurant.restaurant_address);
      }

      updatePage(restaurants);

      Math.ceil(response.data.count / 20)
        ? (totalPages = Math.ceil(response.data.count / 20))
        : (totalPages = 1);

      drawPagination(1);

      document.querySelector('.sorting').textContent = '인기순';
    })
    .catch(error => {
      console.log(error);
    });
});

// 카테고리, 태그명 검색 시 데이터 요청
tagNstyleBtn.addEventListener('click', e => {
  if (tagRadio.checked) {
    tagQuery = '';
    for (let i = 0; i < tags.length; i++) {
      tagQuery += `tag${i + 1}=${tags[i]}&`;
    }
    apiUrl = `/api/tag/search?${tagQuery}page=1`;
  } else if (styleRadio.checked) {
    const styleRadio = document.querySelector(
      '.styleContainer input[type="radio"]:checked',
    );
    style = styleRadio.id;
    apiUrl = `/api/restaurant_type/${style}`;
    console.log(apiUrl);
  }

  axios
    .get(apiUrl)
    .then(response => {
      const restaurants = response.data.rows;

      updatePage(restaurants);

      Math.ceil(response.data.count / 20)
        ? (totalPages = Math.ceil(response.data.count / 20))
        : (totalPages = 1);

      drawPagination(1);

      document.querySelector('.sorting').textContent = '인기순';

      clearMarkers();
      for (const restaurant of restaurants) {
        geocodeAddress(restaurant.restaurant_address);
      }
    })
    .catch(error => {
      console.log(error);
    });
});

// 클릭된 식당 지도 중앙으로 이동, 찜 이벤트
document
  .querySelector('.allRestaurantContainer')
  .addEventListener('click', async e => {
    const target = e.target;

    const restaurantContainer = target.closest('.restaurantContainer');

    if (restaurantContainer) {
      const restaurantAddress = restaurantContainer.dataset.id;

      geocoder.geocode({ address: restaurantAddress }, (results, status) => {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);

          const targetMarker = markers.find(marker =>
            marker.getPosition().equals(results[0].geometry.location),
          );

          if (targetMarker) {
            if (currentExpandedMarker) {
              // 이전에 확대된 마커를 원래 크기로 복원
              const originalIcon = {
                ...currentExpandedMarker.getIcon(),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20),
              };
              currentExpandedMarker.setIcon(originalIcon);
              currentExpandedMarker.setZIndex(1); // 원래 zIndex로 복원
            }

            // 새로운 마커 확대
            const newIcon = {
              ...targetMarker.getIcon(),
              scaledSize: new google.maps.Size(60, 60),
              anchor: new google.maps.Point(30, 30),
              optimized: false,
            };
            targetMarker.setIcon(newIcon);
            targetMarker.setZIndex(9999); // 높은 zIndex로 설정하여 가장 위에 올림

            // 현재 확대된 마커 업데이트
            currentExpandedMarker = targetMarker;
          }
        } else {
          console.log('주소 변환 실패 ' + status);
        }
      });
    }

    if (target.classList.contains('heart')) {
      const restaurant_id = target.id;
      const currentSrc = target.getAttribute('src');

      if (!userInfo) {
        alert('로그인 유저만 가능합니다.');
      } else if (currentSrc === '/static/img/heart.png') {
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

// 서버에 데이터 요청
const fetchData = async (url = '') => {
  if (!url) {
    if (sortTypeValue === '인기순') {
      url = `/api/restaurant/like?page=${currentPage}`;
    } else if (sortTypeValue === '평점순') {
      url = `/api/restaurant/rating?page=${currentPage}`;
    } else {
      url = `/api/restaurant/all?page=1`;
    }
  }

  try {
    const response = await axios.get(url);
    const restaurants = response.data.rows;

    totalPages = Math.ceil(response.data.count / 20);
    updatePage(restaurants);
    drawPagination(currentPage);

    await initMap();
    clearMarkers();

    for (const restaurant of restaurants) {
      geocodeAddress(restaurant.restaurant_address);
    }

    return response.data.rows;
  } catch (error) {
    console.error('에러 발생 ', error);
  }
};

// 식당 목록 렌더
const updatePage = data => {
  const restaurantContainer = document.querySelector('.restaurants');
  const totalRestaurants = document.querySelector('.totalRestaurants');
  restaurantContainer.innerHTML = '';
  totalRestaurants.innerText = `${data.count || 0}개의 매장`;

  if (Array.isArray(data) && data.length > 0) {
    data.forEach(item => {
      const restaurant = item.Restaurant ? item.Restaurant : item;
      const article = createRestaurantArticle(restaurant);

      restaurantContainer.appendChild(article);
    });
  } else {
    restaurantContainer.innerHTML =
      '<p class="noResult">해당하는 식당이 없습니다.</p>';
  }
};

// 페이지네이션 렌더
const drawPagination = centerPage => {
  console.log(centerPage);
  const container = document.querySelector('#pagination-container');
  const oldPageNumbers = document.querySelectorAll('.page-number');

  oldPageNumbers.forEach(el => el.remove());

  if (totalPages === 0) {
    totalPages = 1;
  }

  let startPage;
  let endPage;

  if (totalPages >= 5) {
    startPage = Math.max(centerPage - 2, 1);
    endPage = Math.min(centerPage + 2, totalPages);

    if (startPage === 1) {
      endPage = 5;
    } else if (endPage === totalPages) {
      startPage = totalPages - 4;
    }
  } else {
    startPage = 1;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageElement = document.createElement('a');
    pageElement.textContent = i;
    pageElement.href = '#up';
    pageElement.className = 'page-number';

    pageElement.onclick = () => {
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

  let url;
  let query;

  if (nameRadio.checked) {
    query = searchInput.value;
    url = `/api/menu/search?page=${currentPage}&q=${query}`;
  } else if (menuRadio.checked) {
    query = searchInput.value;
    url = `/api/menu/search?q=${query}&page=${currentPage}`;
  } else if (styleRadio.checked) {
    query = styles;
    url = `/api/restaurant_type/${query}&page=${currentPage}`;
  } else if (tagRadio.checked) {
    query = tags.map((tag, i) => `tag${i + 1}=${tag}`).join('&');
    url = `/api/tag/search?${query}page=${currentPage}`;
  }

  document.querySelector('.sorting').textContent = '인기순';
  fetchData(url);
};

// 세로모드 드래그 이벤트
let startY = 0;

const hamburger = document.querySelector('.hamburgerIcon');
const mapElement = document.querySelector('.map');
const restaurantListElement = document.querySelector('.restaurantList');

window.addEventListener('resize', function () {
  if (window.innerWidth > 768) {
    mapElement.style.height = '93vh';
    restaurantListElement.style.height = '93vh';
  } else {
    mapElement.style.height = '43vh';
    restaurantListElement.style.height = '50vh';
  }
});

hamburger.addEventListener('dragstart', function (e) {
  startY = e.clientY;
});

hamburger.addEventListener('dragend', function (e) {
  let diffY = e.clientY;

  if (diffY < 300 && startY > 100) {
    mapElement.style.height = '0';
    restaurantListElement.style.height = '93vh';
  } else if (startY < 100) {
    mapElement.style.height = '43vh';
    restaurantListElement.style.height = '50vh';
  } else if (diffY > 500) {
    mapElement.style.height = '83vh';
    restaurantListElement.style.height = '10vh';
  } else {
    mapElement.style.height = '43vh';
    restaurantListElement.style.height = '50vh';
  }
});

// 식당 컴포넌트 생성
const createRestaurantArticle = restaurant => {
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
    restaurant.Users && restaurant.Users.length !== 0
      ? '/static/img/heartFilled.png'
      : '/static/img/heart.png';

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

  return article;
};

fetchData();
drawPagination(currentPage);
