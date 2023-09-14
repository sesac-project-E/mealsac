const reviewForm = document.getElementById('reviewForm');
const renderReviews = document.querySelector('.renderReviews');
console.log(document.cookie);

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

document.getElementById('submitbtn').addEventListener('click', async e => {
  e.preventDefault();

  const formData = new FormData(reviewForm);
  const content = formData.get('content');
  const rating = formData.get('rating');
  const imageFiles = formData.getAll('image');
  const restaurant_id = 1;

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

      const newReviewData = response.data.data;
      addNewReview(newReviewData);
    }
  } catch (error) {
    console.error('에러 정보:', error);
    alert('리뷰를 등록하는 동안 오류가 발생했습니다.');
  }
});

const addNewReview = reviewData => {
  const newReviewElement = document.createElement('div');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}.${mm}.${dd}`;

  const review = reviewData.review;

  newReviewElement.innerHTML = `
    <p>Rating: ${review.rating}</p>
    <p>${review.content}</p>
    <p>작성일 : ${formattedDate}</p>
    <p>추천 : ${review.is_useful === undefined ? 0 : review.is_useful}</p>
  `;

  (reviewData.reviewImages || []).forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.image_url;
    imgElement.alt = 'Review Image';
    newReviewElement.appendChild(imgElement);
  });

  renderReviews.prepend(newReviewElement);
};
