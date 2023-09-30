const mainElement = document.querySelector('main');
const callButton = document.getElementById('callButton');
const reviewForm = document.getElementById('reviewForm');
const renderReviews = document.querySelector('.renderReviews');
const reviewsElement = document.querySelector('.renderReviews');
const prevPage = document.querySelector('#prevPage');
const nextPage = document.querySelector('#nextPage');

const reviewsPerPage = 5;
let currentPage = 1;

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
  if (userInfo) {
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
        alert('찜 목록에 추가하는 것을 실패했습니다.');
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
  } else {
    alert('로그인 후 식당 찜이 가능합니다.');
  }
});

// 전화 걸기 or 전화번호 복사
callButton.addEventListener('click', () => {
  const phoneNumber = restaurant.restaurant_phone;

  if (!phoneNumber || phoneNumber.trim() === '') {
    alert('전화번호가 등록되어 있지 않습니다.');
    return;
  }

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
document.getElementById('showReviewForm').addEventListener('click', () => {
  if (!userInfo) {
    alert('로그인 후 리뷰 작성이 가능합니다.');
    return;
  }
  if (reviewForm.style.display === 'none' || reviewForm.style.display === '') {
    reviewForm.style.display = 'block';
  } else {
    reviewForm.style.display = 'none';
  }
});

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
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
      url: `/api/review/${restaurant_id}`,
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
    alert('리뷰를 등록하는 동안 오류가 발생했습니다.');
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
     <p>${userInfo.user_name}</p>
    </div>
     <div>
     <p><img src="/static/img/star.png" alt="평점" class="starIcon"> ${reviewData.rating}</p>
     <p><img src="/static/img/like.png" alt="추천하기" class="thumbsIcon" id=${review.review_id}> <span>0<span></p>
     <p>${formattedDate}</p>
    </div>
    </div>
    <div class="reviewImg">${imagesHTML}</div>
    <p class="reviewContent">${reviewData.content}</p>
  `;

  renderReviews.prepend(newReviewElement);
};

const renderReview = review => {
  const imagesHTML = review.ReviewImages
    ? review.ReviewImages.map(
        image => `<img src="${image.image_url}" alt="후기 이미지">`,
      ).join('')
    : '';

  const imgSrc =
    userInfo && review.reviewUsefulness.some(u => u.user_id === userInfo.id)
      ? '/static/img/likeFilled.png'
      : '/static/img/like.png';

  const usefulnessCount = review.reviewUsefulness
    ? review.reviewUsefulness.length
    : 0;

  const editDeleteHTML =
    userInfo && userInfo.user_name === review.user.user_name
      ? `
    <div class="editNdelete">
      <input id="edit" type="button" value="수정" />
      <input id="delete" type="button" value="삭제" />
    </div>`
      : '';

  return `
    <section class="reviewContainer" id="${review.review_id}">
      <div>
        <div>
          <p>${review.user.user_name}</p>
        </div>
        <div>
          <p class="ratingContainer"><img src="/static/img/star.png" alt="평점" class="starIcon"> <span class="reviewRatingText">${
            review.rating
          }</span></p>
          <p><img src=${imgSrc} alt="추천하기" class="thumbsIcon" id=${
    review.review_id
  }> <span>${usefulnessCount}<span></p>
          <p>${new Date(review.updatedAt)
            .toLocaleDateString()
            .replace(/\.$/, '')}</p>
        </div>
      </div>
      <div class="reviewImg">${imagesHTML}</div>
      <p class="reviewContent">${review.content}</p>
      ${editDeleteHTML}
    </section>
  `;
};

const replaceWithEditableFields = (
  reviewContainer,
  originalContent,
  originalRating,
) => {
  const textareaElement = document.createElement('textarea');
  const selectElement = document.createElement('select');
  textareaElement.value = originalContent;

  selectElement.innerHTML = Array.from(
    { length: 10 },
    (_, i) => `<option value="${(i + 1) / 2}">${(i + 1) / 2}</option>`,
  ).join('');
  selectElement.value = originalRating;

  const reviewContentElement = reviewContainer.querySelector('.reviewContent');
  const reviewRatingElement =
    reviewContainer.querySelector('.reviewRatingText');

  if (reviewContentElement) {
    reviewContentElement.replaceWith(textareaElement);
  }

  if (reviewRatingElement) {
    reviewRatingElement.replaceWith(selectElement);
  }

  return { textareaElement, selectElement };
};

const replaceWithOriginalFields = (
  textareaElement,
  selectElement,
  newContent,
  newRating,
) => {
  const newContentElement = document.createElement('p');
  const newRatingElement = document.createElement('span');
  newContentElement.innerText = newContent;
  newRatingElement.innerText = newRating;

  textareaElement.replaceWith(newContentElement);
  selectElement.replaceWith(newRatingElement);
};

const handleEditClick = async reviewContainer => {
  const reviewContentElement = reviewContainer.querySelector('.reviewContent');
  const reviewRatingElement =
    reviewContainer.querySelector('.reviewRatingText');
  const editSubmit = reviewContainer.querySelector('#edit');

  const originalContent = reviewContentElement
    ? reviewContentElement.innerText
    : '';
  const originalRating = reviewRatingElement
    ? parseFloat(reviewRatingElement.innerText)
    : '';

  const { textareaElement, selectElement } = replaceWithEditableFields(
    reviewContainer,
    originalContent,
    originalRating,
  );

  editSubmit.value = '수정 완료';

  if (editSubmit.value === '수정 완료') {
    editSubmit.addEventListener('click', async () => {
      try {
        const response = await axios({
          method: 'PATCH',
          url: `/api/review/myreview/${reviewContainer.id}`,
          data: {
            content: textareaElement.value,
            rating: selectElement.value,
          },
        });

        if (response.status === 200) {
          alert('해당 리뷰가 수정되었습니다.');
          replaceWithOriginalFields(
            textareaElement,
            selectElement,
            textareaElement.value,
            selectElement.value,
          );
          editSubmit.value = '수정';
        }
      } catch (error) {
        console.error('에러 정보:', error);
        alert('리뷰 수정을 실패했습니다.');
      }
    });
  }
};

const handleDeleteClick = async reviewContainer => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: `/api/review/myreview/${reviewContainer.id}`,
      data: { review_id: reviewContainer.id },
    });

    if (response.status === 200) {
      alert('해당 리뷰가 삭제되었습니다.');
      window.location.reload();
    }
  } catch (error) {
    console.error('에러 정보:', error);
    alert('리뷰 삭제를 실패했습니다.');
  }
};

const renderReviewsPage = page => {
  const start = (page - 1) * reviewsPerPage;
  const end = page * reviewsPerPage;
  const reviewsToRender = review.slice(start, end);
  if (review.length) {
    const reviewsElement = document.querySelector('.renderReviews');
    reviewsElement.innerHTML = reviewsToRender
      .map(review => renderReview(review, userInfo))
      .join('');
  } else {
    reviewsElement.innerHTML = '<p>후기가 없습니다.</p>';
  }
};

reviewsElement.addEventListener('click', async e => {
  const reviewContainer = e.target.closest('.reviewContainer');
  if (e.target.id === 'edit') handleEditClick(reviewContainer, userInfo);
  if (e.target.id === 'delete') handleDeleteClick(reviewContainer);
});

renderReviewsPage(currentPage);

if (nextPage) {
  nextPage.addEventListener('click', () => {
    if (currentPage * reviewsPerPage < review.length) {
      currentPage++;
      renderReviewsPage(currentPage);
    } else {
      alert('이전에 작성된 후기가 더이상 없습니다.');
    }
  });
}

if (prevPage) {
  prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderReviewsPage(currentPage);
    } else {
      alert('이후에 작성된 후기가 더이상 없습니다.');
    }
  });
}

// 리뷰 추천
document
  .querySelector('.renderReviews')
  .addEventListener('click', async function (e) {
    const target = e.target;

    if (target.classList.contains('thumbsIcon')) {
      if (!userInfo) {
        alert('로그인 후 리뷰를 추천해주세요.');
        return;
      }
      const review_id = target.id;
      const currentSrc = target.getAttribute('src');

      if (currentSrc === '/static/img/like.png') {
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

const codeAddress = () => {
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
};
