const likeList = () => {
  document.getElementById('myLike').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myPost').classList.remove('clicked');
  document.getElementById('myLikes').style.display = 'block';
  document.getElementById('myReviews').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';
};

const reviewList = async () => {
  const reviewsContainer = document.querySelector('#myReviews');
  while (reviewsContainer.firstChild) {
    reviewsContainer.removeChild(reviewsContainer.firstChild);
  }

  document.getElementById('myReview').classList.add('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.getElementById('myPost').classList.remove('clicked');
  document.getElementById('myReviews').style.display = 'block';
  document.getElementById('myLikes').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';

  try {
    const res = await axios.get('/api/review/myreview');
    if (res.data.status === 'success') {
      const reviews = res.data.data;

      if (Array.isArray(reviews) && reviews.length > 0) {
        reviews.forEach(review => {
          // 리뷰 컨테이너 생성
          const reviewContainer = document.createElement('div');
          reviewContainer.classList.add('reviews');

          // 리뷰 정보 템플릿 리터럴로 구성
          reviewContainer.innerHTML = `
          <div class="reviewInfo">
            <div><a href="/restaurant/${review.restaurant_id}">
              <span>${review.Restaurant.restaurant_name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
                  fill="#4DDA67"
                />
              </svg>
              </a>
            </div>
            <div>
              <img src="/static/img/star.png" alt="평점" class="starIcon" />
              <span>${review.rating}</span>
            </div>
            </div>
            <p>${review.content}</p>
            <div class="reviewImg"></div>
            <div>
            <button type="button" class="reviewDelete">삭제</button>
            <button type="button" class="reviewEdit">수정</button>
            </div>
          `;

          // 리뷰 이미지 처리
          const reviewImgContainer =
            reviewContainer.querySelector('.reviewImg');
          (review.ReviewImages || []).forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.image_url;
            imgElement.alt = 'Review Image';
            console.log('Image URL:', image.image_url);
            reviewImgContainer.appendChild(imgElement);

            imgElement.onload = () => {
              reviewImgContainer.style.height = `${imgElement.height}px`;
            };
          });

          if (!review.ReviewImages || review.ReviewImages.length === 0) {
            reviewImgContainer.style.height = '0';
          }

          // 리뷰 컨테이너를 #reviews에 추가
          document.querySelector('#myReviews').appendChild(reviewContainer);
        });
      } else {
        // 리뷰 데이터가 없는 경우 메시지 출력
        document.querySelector('#myReviews').innerHTML =
          '<div id="none">남긴 리뷰가 없습니다.</div>';
      }
    } else {
      console.log('서버 응답 오류:', res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

const postList = () => {
  document.getElementById('myPost').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.getElementById('myReviews').style.display = 'none';
  document.getElementById('myLikes').style.display = 'none';
  document.getElementById('myPosts').style.display = 'block';
};

const heartElements = document.querySelectorAll('.heart');
heartElements.forEach(heartElement => {
  heartElement.addEventListener('click', e => {
    e.target.setAttribute('src', '../../static/img/heartFilled.png');
  });
});
