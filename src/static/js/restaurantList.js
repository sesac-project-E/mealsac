let initialMarker;
let markers = [];
let currentExpandedMarker;
let map;
let geocoder;
let apiUrl;
let currentPage = 1;
let totalPages;
let category;
let tags = [];
let tagQuery = '';

const $ = selector => document.querySelector(selector);
const $All = selector => document.querySelectorAll(selector);

const searchName = $('.searchName');
const searchType = $('.searchType');
const nameRadio = $('#name');
const menuRadio = $('#menu');
const searchInput = $('#searchInput');
const searchNameMenu = $('#searchNameMenu');
const tagRadio = $('#tag');
const categoryRadio = $('#category');
const categoryContainer = $('.categoryContainer');
const tagContainer = $('.tagContainer');
const tagNcategory = $('.tagNcategory');
const tagsMore = $('.tagsMore');
const categoryMore = $('.categoryMore');
const tagNcategoryBtn = $('.tagNcategoryBtn');
const formContainer = $('.formContainer');
const sortContainer = $('.sortContainer');
const sorting = $('.sorting');
const allRestaurants1 = $('#allRestaurants1');
const allRestaurants2 = $('#allRestaurants2');

// 지도
const initMap = async () => {
  const { Map } = await google.maps.importLibrary('maps');

  map = new Map($('.map'), {
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
const geocodeAddress = async (address, type) => {
  if (!address) return;

  geocoder.geocode({ address: address }, (results, status) => {
    if (status !== 'OK') {
      // console.error(
      //   'Geocode was not successful for the following reason: ' + status,
      // );
      return;
    }

    const lat = results[0].geometry.location.lat();
    const lng = results[0].geometry.location.lng();

    addMarker({
      lat: lat,
      lng: lng,
      title: address,
      icon: {
        url: getIconUrlByType(type),
        scaledSize: new google.maps.Size(40, 40),
      },
    });
  });
};

// 선택된 정렬에 따라 api 요청
const sortingTextToUrl = {
  평점순: '/api/restaurant/rating',
  최신등록순: '/api/restaurant/all',
  default: '/api/restaurant/like',
};

const getUrl = () => {
  const baseUrl =
    sortingTextToUrl[sorting.textContent] || sortingTextToUrl.default;
  return `${baseUrl}?page=${currentPage}`;
};

const fetchData = async (url = '') => {
  url = url || getUrl();

  try {
    const response = await axios.get(url);
    totalPages = Math.ceil(response.data.count / 20);
    updateUI(response.data);
    return response.data.rows;
  } catch (error) {
    console.error('에러 발생 ', error);
    alert('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const updateUI = data => {
  updatePage(data);
  drawPagination(currentPage);
  updateMap(data.rows);
};

const updateMap = async restaurants => {
  await initMap();
  clearMarkers();
  restaurants.forEach(data => {
    const address =
      data.restaurant_address ?? data.Restaurant.restaurant_address;
    const type_id =
      data.restaurant_type_id ?? data.Restaurant.restaurant_type_id;
    geocodeAddress(address, type_id);
  });
};

const updatePage = data => {
  const restaurantContainer = $('.restaurants');
  const totalRestaurants = $('.totalRestaurants');

  totalRestaurants.innerText = `${data.count || 0}개의 매장`;
  restaurantContainer.innerHTML = '';

  if (Array.isArray(data.rows) && data.rows.length > 0) {
    data.rows.forEach(item => {
      const restaurantData = item.RestaurantImages ? item : item.Restaurant;
      const article = createRestaurantArticle(
        restaurantData,
        restaurantData.RestaurantImages,
      );
      restaurantContainer.appendChild(article);
    });
  } else {
    restaurantContainer.innerHTML =
      '<p class="noResult">해당하는 식당이 없습니다.</p>';
  }
};

const createPageElement = (pageNumber, isActive) => {
  const pageElement = document.createElement('a');
  pageElement.textContent = pageNumber;
  pageElement.href = '#up';
  pageElement.className = 'page-number';
  pageElement.onclick = () => changePage(pageNumber);
  if (isActive) pageElement.classList.add('active');
  return pageElement;
};

const drawPagination = centerPage => {
  const container = $('#pagination-container');
  $All('.page-number').forEach(el => el.remove());
  totalPages = totalPages || 1;

  let [startPage, endPage] = getPageRange(centerPage);

  for (let i = startPage; i <= endPage; i++) {
    const pageElement = createPageElement(i, i === centerPage);
    container.insertBefore(pageElement, $('#nextPage'));
  }
};

const getPageRange = centerPage => {
  if (totalPages === 0) {
    totalPages = 1;
  }

  let startPage;
  let endPage;

  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    // centerPage가 3 이하일 경우
    if (centerPage <= 3) {
      startPage = 1;
      endPage = 5;
    }
    // centerPage가 (totalPages - 2) 이상일 경우
    else if (centerPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }
    // 그 외의 경우
    else {
      startPage = centerPage - 2;
      endPage = centerPage + 2;
    }
  }

  return [startPage, endPage];
};

const getSearchUrl = () => {
  if (nameRadio.checked) {
    return `/api/restaurant/search?page=${currentPage}&q=${searchInput.value}`;
  }
  if (menuRadio.checked) {
    return `/api/menu/search?q=${searchInput.value}&page=${currentPage}`;
  }
  if (categoryRadio.checked) {
    return `/api/restaurant_type/${category}?page=${currentPage}`;
  }
  if (tagRadio.checked) {
    const query = tags.map((tag, i) => `tag${i + 1}=${tag}`).join('&');
    return `/api/tag/search?${query}&page=${currentPage}`;
  }
};

const changePage = newPage => {
  if (newPage < 1 || newPage > totalPages) return;
  currentPage = newPage;
  drawPagination(currentPage);
  fetchData(getSearchUrl());
};

// 클릭된 식당 지도 중앙으로 이동, 찜 이벤트
$('.allRestaurantContainer').addEventListener('click', async e => {
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
            size: new google.maps.Size(50, 50), // 원래 이미지의 크기
            origin: new google.maps.Point(0, 0), // 이미지의 시작점
            scaledSize: new google.maps.Size(50, 50), // 화면에 표시될 이미지의 크기
            anchor: new google.maps.Point(25, 25),
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

// 모든 식당 클릭 시 정렬 아이콘 삽입, 모든 식당 데이터 렌더
const handleAllRestaurantsChange = element => {
  element.addEventListener('change', () => {
    if (element === allRestaurants1) {
      $('#searchNameMenu div:last-child').style.display = 'none';
    } else if (element === allRestaurants2) {
      categoryContainer.classList.add('invisible');
      tagContainer.classList.add('invisible');
      tagNcategoryBtn.style.display = 'none';
    }

    currentPage = 1;
    searchInput.value = '';
    sortContainer.style.display = 'flex';
    fetchData();
    drawPagination(currentPage);
  });
};

// 정렬 방식 선택 시 모든 식당 데이터 반환
$('.sort').addEventListener('click', e => {
  if (e.target.classList.contains('sortingMethod')) {
    sorting.textContent = e.target.textContent;
    currentPage = 1;
    fetchData();
    drawPagination(currentPage);
  }
  $('.sortType').classList.toggle('active');
  $('.sortArticle').classList.toggle('active');
});

// 검색 방식
searchName.addEventListener('click', e => {
  e.target.classList.add('clicked');
  searchType.classList.remove('clicked');
  formContainer.classList.remove('searchInvisible');
  tagNcategory.classList.add('searchInvisible');
  allRestaurants1.checked = true;
  sortContainer.style.display = 'flex';
  fetchData();
  drawPagination(1);
});

searchType.addEventListener('click', e => {
  e.target.classList.add('clicked');
  searchName.classList.remove('clicked');
  tagNcategory.classList.remove('searchInvisible');
  formContainer.classList.add('searchInvisible');
  categoryContainer.classList.add('invisible');
  tagContainer.classList.add('invisible');
  tagNcategoryBtn.style.display = 'none';
  sortContainer.style.display = 'flex';
  $('#searchNameMenu div:nth-child(2)').style.display = 'none';
  allRestaurants2.checked = true;
  fetchData();
  drawPagination(1);
});

// 검색 방식 세부 설정
const setSearchPlaceholderAndStyle = placeholderText => {
  searchInput.value = '';
  searchInput.placeholder = placeholderText;
  $('#searchNameMenu div:last-child').style.display = 'block';
  sortContainer.style.display = 'none';
};

const setTagAndCategoryVisibility = (tagVisible, categoryVisible) => {
  tagContainer.classList.toggle('invisible', !tagVisible);
  categoryContainer.classList.toggle('invisible', !categoryVisible);
};

const resetTagStates = () => {
  tags = [];
  $All('.tag').forEach(tag => tag.classList.remove('tagActive'));
};

const setContainerDisplay = moreBtn => {
  moreBtn.innerText = '더보기';
  categoryContainer.style.height = '30px';
  tagContainer.style.height = '30px';
  tagNcategoryBtn.style.display = 'inline-block';
};

const addRadioEventListener = (
  element,
  placeholder,
  isTagVisible,
  isCategoryVisible,
  moreBtn,
) => {
  element.addEventListener('change', () => {
    setSearchPlaceholderAndStyle(placeholder);
    setTagAndCategoryVisibility(isTagVisible, isCategoryVisible);
    resetTagStates();
    setContainerDisplay(moreBtn);
  });
};

addRadioEventListener(nameRadio, '매장명 검색', false, false, null, null);
addRadioEventListener(menuRadio, '메뉴명 검색', false, false, null, null);
addRadioEventListener(tagRadio, null, true, false, tagsMore);
addRadioEventListener(categoryRadio, null, false, true, categoryMore);

// 더보기 이벤트
const toggleMore = (element, targetContainer) => {
  element.addEventListener('click', e => {
    const isMore = e.target.innerText === '더보기';
    e.target.innerText = isMore ? '접기' : '더보기';
    targetContainer.style.height = isMore ? 'initial' : '30px';
  });
};

const toggleTagActivity = tag => {
  tag.classList.toggle('tagActive');
  if (tag.innerText[0] === '#') {
    tags = tag.classList.contains('tagActive')
      ? [...tags, tag.id]
      : tags.filter(item => item !== tag.id);
  }
};

document.addEventListener('click', e => {
  const tag = e.target.closest('.tag');
  if (tag) toggleTagActivity(tag);
});

handleAllRestaurantsChange(allRestaurants1);
handleAllRestaurantsChange(allRestaurants2);
toggleMore(categoryMore, categoryContainer);
toggleMore(tagsMore, tagContainer);

searchNameMenu.addEventListener('submit', e => {
  e.preventDefault();
  currentPage = 1;

  const query = searchInput.value;
  const apiUrl = nameRadio.checked
    ? `/api/restaurant/search?page=${currentPage}&q=${query}`
    : `/api/menu/search?q=${query}&page=${currentPage}`;

  fetchData(apiUrl);
});

tagNcategoryBtn.addEventListener('click', () => {
  let apiUrl;
  currentPage = 1;

  if (tagRadio.checked) {
    const tagQuery = tags.map((tag, i) => `tag${i + 1}=${tag}`).join('&');
    apiUrl = `/api/tag/search?${tagQuery}&page=${currentPage}`;
  } else if (categoryRadio.checked) {
    const selectedCategory = $(
      '.categoryContainer input[type="radio"]:checked',
    );
    category = selectedCategory.id;
    apiUrl = `/api/restaurant_type/${category}?page=${currentPage}`;
  }

  fetchData(apiUrl);
});

// 식당 컴포넌트 생성
const createRestaurantArticle = (restaurant, restaurantImg) => {
  const label = document.createElement('label');
  label.className = 'restaurantLabel';

  const radioInput = document.createElement('input');
  radioInput.type = 'radio';
  radioInput.name = 'restaurantSelection';
  radioInput.value = restaurant.restaurant_id;
  radioInput.style.display = 'none';
  label.appendChild(radioInput);

  const article = document.createElement('article');
  article.className = 'restaurantContainer';
  article.dataset.id = restaurant.restaurant_address;

  const img = document.createElement('img');
  img.className = 'restaurantImg';
  if (
    restaurantImg &&
    restaurantImg[0] &&
    restaurantImg[0].restaurant_image_url
  ) {
    img.src = restaurantImg[0].restaurant_image_url;
  } else {
    img.src = '/static/img/commingsoon.jpg';
  }
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
  pType.textContent =
    restaurantType(restaurant.restaurant_type_id) || '식당 타입 없음';

  const divBottom = document.createElement('div');

  const imgRating = document.createElement('img');
  imgRating.className = 'rating';
  imgRating.src = '/static/img/star.png';
  imgRating.alt = '평점 아이콘';

  const pRating = document.createElement('p');
  pRating.className = 'rate';
  pRating.textContent = restaurant.rating.toFixed(1);

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
  a.textContent = '상세 페이지';

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

  label.appendChild(article);

  return label;
};

const restaurantType = restaurantType => {
  const type = [
    '한식',
    '중식',
    '분식',
    '일식',
    '양식',
    '펍',
    '치킨',
    '족발, 보쌈',
    '카페',
    '고기구이',
    '아시안',
    '디저트',
    '패스트푸드',
    '편의점',
  ];

  return type[restaurantType - 1];
};

// 식당 타입에 따른 지도 마커 아이콘
const getIconUrlByType = type => {
  switch (type) {
    case 1:
      return '/static/img/korean.png';
    case 2:
      return '/static/img/chinese.png';
    case 3:
      return '/static/img/street.png';
    case 4:
      return '/static/img/japanese.png';
    case 5:
      return '/static/img/western.png';
    case 6:
      return '/static/img/pub.png';
    case 7:
      return '/static/img/chicken.png';
    case 8:
      return '/static/img/pork.png';
    case 9:
      return '/static/img/cafe.png';
    case 10:
      return '/static/img/meat.png';
    case 11:
      return '/static/img/asian.png';
    case 12:
      return '/static/img/dessert.png';
    case 13:
      return '/static/img/fast.png';
    case 14:
      return '/static/img/convenience.png';
    default:
      return '/static/img/korean.png';
  }
};

fetchData();
drawPagination(currentPage);

// 세로모드 드래그 이벤트
let startY = 0;

const hamburger = $('.hamburgerIcon');
const mapElement = $('.map');
const restaurantListElement = $('.restaurantList');

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
