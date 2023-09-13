const reviewForm = document.getElementById('reviewForm');

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
  // const restaurant_id = formData.get('restaurantId');
  // const title = formData.get('title');
  const content = formData.get('content');
  const rating = formData.get('rating');
  const imageFiles = formData.getAll('image');
  const restaurant_id = 1;

  if (!title || !content || !rating) {
    alert('제목, 내용, 평점을 모두 입력해주세요.');
    return;
  }

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
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
    }
  } catch (error) {
    console.error('에러 정보:', error);
    alert('리뷰를 등록하는 동안 오류가 발생했습니다.');
  }
});
