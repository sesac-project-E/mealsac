const mainElement = document.querySelector('main');
const callButton = document.getElementById('callButton');
const reviewForm = document.getElementById('reviewForm');
const renderReviews = document.querySelector('.renderReviews');

// 갤럭시 폴드를 위한 코드
const checkWidth = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 285) {
    mainElement.classList.remove('container');
  } else {
    mainElement.classList.add('container');
  }
};

checkWidth();

window.addEventListener('resize', checkWidth);

// 찜
document.querySelector('.heart').addEventListener('click', async e => {
  const currentSrc = e.target.getAttribute('src');

  if (currentSrc === '/static/img/heart.png') {
    try {
      const response = await axios({
        method: 'POST',
        url: `/api/like`,
        data: { restaurant_id: restaurant.restaurant_id },
      });

      if (response.status === 201) {
        alert('찜 목록에 추가되었습니다.');
        e.target.setAttribute('src', '/static/img/heartFilled.png');
      }
    } catch (error) {
      console.error('에러 정보:', error);
      alert('로그인 후 찜이 가능합니다.');
    }
  } else if (currentSrc === '/static/img/heartFilled.png') {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `/api/like`,
        data: { restaurant_id: restaurant.restaurant_id },
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
});

// 전화 걸기 or 전화번호 복사
callButton.addEventListener('click', function () {
  const phoneNumber = restaurant.restaurant_phone;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    window.location.href = `tel:${phoneNumber}`;
  } else {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(function () {
        alert(`전화번호 ${phoneNumber}이(가) 클립보드에 복사되었습니다.`);
      })
      .catch(function (err) {
        alert('전화번호를 복사하는 데 실패했습니다.');
      });
  }
});

// 리뷰 작성 폼 토글
document
  .getElementById('showReviewForm')
  .addEventListener('click', function () {
    if (
      reviewForm.style.display === 'none' ||
      reviewForm.style.display === ''
    ) {
      reviewForm.style.display = 'block';
    } else {
      reviewForm.style.display = 'none';
    }
  });

reviewForm.addEventListener('submit', function (event) {
  event.preventDefault();
  reviewForm.style.display = 'none';
});

// 리뷰 등록
document.getElementById('submitbtn').addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData(reviewForm);
  const content = formData.get('content');
  const rating = formData.get('rating');
  const imageFiles = formData.getAll('image');
  const restaurant_id = restaurant.restaurant_id;

  if (!content || !rating) {
    alert('내용과 평점을 모두 입력해주세요.');
    return;
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `http://localhost:8000/api/review/${restaurant_id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      alert('성공적으로 리뷰를 등록했습니다.');
      reviewForm.style.display = 'none';
      reviewForm.reset();

      document.querySelector('.review').innerText =
        Number(document.querySelector('.review').innerText) + 1;

      const newReviewData = response.data.review;
      addNewReview(newReviewData);
    }
  } catch (error) {
    console.error('에러 정보:', error);

    if (
      error.response.data.message === '세션에서 사용자 정보를 찾을 수 없습니다.'
    ) {
      alert('로그인 후 리뷰를 등록해주세요.');
    } else {
      alert('리뷰를 등록하는 동안 오류가 발생했습니다.');
    }
  }
});

// 리뷰 등록 후 등록한 리뷰 바로 보여지도록 하는 함수
const addNewReview = reviewData => {
  const newReviewElement = document.createElement('section');
  newReviewElement.classList.add('reviewContainer');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}.${mm}.${dd}`;

  let imagesHTML = '';

  reviewData.images.forEach(image => {
    imagesHTML += `<img src="${image}" alt="후기 이미지">`;
  });

  newReviewElement.innerHTML = `
  <div>
    <div>
     <p>작성자</p>
    </div>
     <div>
     <p><img src="/static/img/star.png" alt="평점" class="starIcon"> ${
       reviewData.rating
     }</p>
    <p><img src="/static/img/like.png" alt="추천하기" class="thumbsIcon" id=${
      reviewData.review_id
    }> ${reviewData.is_useful === undefined ? 0 : reviewData.is_useful}</p>
     <p>${formattedDate}</p>
    </div>
    </div>
    <div class="reviewImg">${imagesHTML}</div>
    <p class="reviewContent">${reviewData.content}</p>
  `;

  renderReviews.prepend(newReviewElement);
};

// 지도
let geocoder;
let map;

function initMap() {
  geocoder = new google.maps.Geocoder();
  const latlng = new google.maps.LatLng(-34.397, 150.644);
  const mapOptions = {
    zoom: 17,
    center: latlng,
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);
  codeAddress();
}

function codeAddress() {
  const address = restaurant.restaurant_address;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// 리뷰 페이지네이션
let currentPage = 1;
const reviewsPerPage = 5;

const renderReviewsPage = page => {
  const start = (page - 1) * reviewsPerPage;
  const end = page * reviewsPerPage;

  const reviews = restaurant.Reviews.reverse();

  const reviewsToRender = reviews.slice(start, end);
  const reviewsElement = document.querySelector('.renderReviews');

  reviewsElement.innerHTML = ''; // 리뷰 컨테이너 초기화

  if (reviewsToRender.length === 0) {
    reviewsElement.innerHTML = '<p>후기가 없습니다.</p>';
    return;
  }

  reviewsToRender.forEach(review => {
    let imagesHTML = '';

    review.ReviewImages.forEach(image => {
      imagesHTML += `<img src="${image.image_url}" alt="후기 이미지">`;
    });

    console.log(review.reviewUsefulness);

    let imgSrc;
    review.reviewUsefulness.length > 0
      ? (imgSrc = '/static/img/likeFilled.png')
      : (imgSrc = '/static/img/like.png');

    const reviewHTML = `
    <section class="reviewContainer" >
    <div>
      <div>
       <p>${review.user.user_name}</p>
      </div>
       <div>
       <p><img src="/static/img/star.png" alt="평점" class="starIcon"> ${
         review.rating
       }</p>
      <p><img src=${imgSrc} alt="추천하기" class="thumbsIcon" id=${
      review.review_id
    }> <span>${
      review.reviewUsefulness.length > 0 ? review.reviewUsefulness.length : 0
    }<span></p>
       <p>${new Date(review.updatedAt)
         .toLocaleDateString()
         .replace(/\.$/, '')}</p>
      </div>
      </div>
      <div class="reviewImg">${imagesHTML}</div>
      <p class="reviewContent">${review.content}</p>
    </section>
    `;

    reviewsElement.innerHTML += reviewHTML;
  });
};

renderReviewsPage(currentPage);

document.querySelector('#nextPage').addEventListener('click', () => {
  if (currentPage * reviewsPerPage < restaurant.Reviews.length) {
    currentPage++;
    renderReviewsPage(currentPage);
  } else {
    alert('이전에 작성된 후기가 더이상 없습니다.');
  }
});

document.querySelector('#prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderReviewsPage(currentPage);
  } else {
    alert('이후에 작성된 후기가 더이상 없습니다.');
  }
});

// 리뷰 추천
document
  .querySelector('.renderReviews')
  .addEventListener('click', async function (e) {
    const target = e.target;

    if (target.classList.contains('thumbsIcon')) {
      const review_id = target.id;
      const currentSrc = target.getAttribute('src');

      if (id === 0) {
        alert('로그인 후 찜이 가능합니다.');
      } else if (currentSrc === '/static/img/like.png') {
        try {
          const response = await axios({
            method: 'POST',
            url: `/api/review/usefulness/${review_id}`,
          });

          if (response.status === 200) {
            alert('성공적으로 리뷰를 추천하셨습니다.');
            e.target.setAttribute('src', '/static/img/likeFilled.png');
            e.target.nextElementSibling.innerText =
              Number(e.target.nextElementSibling.innerText) + 1;
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(error.response.data.message);
          } else {
            console.error('에러 정보:', error);
            alert('리뷰를 추천하는 것을 실패했습니다.');
          }
        }
      } else if (currentSrc === '/static/img/likeFilled.png') {
        try {
          const response = await axios({
            method: 'DELETE',
            url: `/api/review/usefulness/${review_id}`,
          });

          if (response.status === 200) {
            alert('리뷰 추천을 취소하였습니다.');
            e.target.setAttribute('src', '/static/img/like.png');
            e.target.nextElementSibling.innerText =
              Number(e.target.nextElementSibling.innerText) - 1;
          }
        } catch (error) {
          console.error('에러 정보:', error);
          alert('리뷰 추천 취소를 실패하였습니다.');
        }
      }
    }
  });
