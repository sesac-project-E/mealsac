let currentPage = 1;
const reviewsPerPage = 5;
const postsPerPage = 5;

const likeList = () => {
  document.getElementById('myLike').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myPost').classList.remove('clicked');
  document.getElementById('myLikes').style.display = 'block';
  document.getElementById('myReviews').style.display = 'none';
  document.getElementById('myPosts').style.display = 'none';
  document.querySelector('.reviewPage').style.display = 'none';
  document.querySelector('.postPage').style.display = 'none';
};

function paginateReviews(reviews, page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return reviews.slice(startIndex, endIndex);
}

function paginatePosts(posts, page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return posts.slice(startIndex, endIndex);
}

function paginateLikes(likes, page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return likes.slice(startIndex, endIndex);
}

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
  document.querySelector('.reviewPage').style.display = 'block';
  document.querySelector('.postPage').style.display = 'none';

  try {
    const res = await axios.get('/api/review/myreview');
    if (res.data.status === 'success') {
      const reviews = res.data.data;

      if (Array.isArray(reviews) && reviews.length > 0) {
        const paginatedPosts = paginateReviews(
          reviews,
          currentPage,
          reviewsPerPage,
        );

        paginatedPosts.forEach(review => {
          const reviewContainer = document.createElement('div');
          reviewContainer.classList.add('reviews');
          reviewContainer.id = `review_${review.review_id}`;

          reviewContainer.innerHTML = `
            <div class="reviewInfo">
              <div><a href="/restaurant/${review.restaurant_id}">
                <span class="restaurantName">${review.Restaurant.restaurant_name}</span>
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
                <span class="rate">${review.rating}</span>
              </div>
            </div>
            <p>${review.content}</p>
            <div class="reviewImg"></div>
            <div class="updateBtn">
              <button type="button" class="reviewDelete" onclick="deleteReview(${review.review_id})">삭제</button>
              <button type="button" class="reviewEdit" onclick="edit(${review.review_id})">수정</button>
            </div>
            
          `;

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

          document.querySelector('#myReviews').appendChild(reviewContainer);
        });
      } else {
        document.querySelector('#myReviews').innerHTML =
          '<div class="none">남긴 리뷰가 없습니다.</div>';
      }
    } else {
      console.log('서버 응답 오류:', res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById('reviewPrev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    reviewList();
  }
});

document.getElementById('reviewNext').addEventListener('click', () => {
  currentPage++;
  reviewList();
});

// 리뷰 삭제
const deleteReview = async reviewId => {
  try {
    const res = await axios.delete(`/api/review/myreview/${reviewId}`);
    if (res.data.status === 'success') {
      const reviewContainer = document.querySelector(`#review_${reviewId}`);
      if (reviewContainer) {
        reviewContainer.remove();
      }

      await reviewList();
    } else {
      console.error('리뷰 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

// 리뷰 수정
const edit = reviewId => {
  try {
    const reviewContainer = document.querySelector(`#review_${reviewId}`);

    if (reviewContainer) {
      const restaurant =
        reviewContainer.querySelector('.restaurantName').textContent;
      const rating = reviewContainer.querySelector('.rate').textContent;
      const content = reviewContainer.querySelector('p').textContent;

      reviewContainer.innerHTML = `
        <div class="reviewInfo">
          <div>
            <span>${restaurant}</span>
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
            <input type="number" id="editedRating" value="${rating}" step="0.5" min="0" max="5" />
          </div>
        </div>
        <div class="editContent">
        <textarea id="editedContent">${content}</textarea>
        <div class="updateBtn">
          <button type="button" class="reviewEdit" onclick="editDone(${reviewId})">수정완료</button>
        </div>
        </div>
      `;
    } else {
      console.error('리뷰 컨테이너를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

const editDone = async reviewId => {
  try {
    const editedRating = document.querySelector('#editedRating').value;
    const editedContent = document.querySelector('#editedContent').value;

    const res = await axios({
      method: 'PATCH',
      url: `/api/review/myreview/${reviewId}`,
      data: {
        rating: editedRating,
        content: editedContent,
      },
    });

    if (res.data.status === 'success') {
      await reviewList();
    } else {
      console.error('리뷰 업데이트에 실패했습니다.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

// 게시글
const postList = async () => {
  const likesContainer = document.querySelector('#myPosts');
  while (likesContainer.firstChild) {
    likesContainer.removeChild(likesContainer.firstChild);
  }

  document.getElementById('myPost').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.getElementById('myReviews').style.display = 'none';
  document.getElementById('myLikes').style.display = 'none';
  document.getElementById('myPosts').style.display = 'block';
  document.querySelector('.reviewPage').style.display = 'none';
  document.querySelector('.postPage').style.display = 'block';

  try {
    const res = await axios.get('/api/post/my/post');
    if (res.data.status === 'success') {
      const posts = res.data.data;

      if (Array.isArray(posts) && posts.length > 0) {
        // const paginatedPosts = paginatePosts(posts, currentPage, postsPerPage);

        paginatedPosts.forEach(post => {
          const postContainer = document.createElement('div');
          postContainer.classList.add('posts');

          postContainer.innerHTML = `
            <div class="postInfo">
            <div><a href="/restaurant/${post.post_id}">
            <span class="restaurantName">${post.title}</span>
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
          <span class="rate">${post.createdAt}</span>
            </div>
            <p>${post.content}</p>
          `;

          document.querySelector('#myPosts').appendChild(postContainer);
        });
      } else {
        document.querySelector('#myPosts').innerHTML =
          '<div class="none">나의 게시물이 없습니다.</div>';
      }
    } else {
      console.log('서버 응답 오류:', res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// 찜삭제
const heartElements = document.querySelectorAll('.heart');
heartElements.forEach(heartElement => {
  heartElement.addEventListener('click', async () => {
    const restaurant_id = heartElement.id;
    try {
      const response = await axios({
        method: 'DELETE',
        url: `/api/like`,
        data: { restaurant_id: restaurant_id },
      });

      if (response.status === 200) {
        alert('찜 목록에서 삭제되었습니다.');
        heartElement.setAttribute('src', '/static/img/heart.png');
        window.location.reload();
      } else {
        console.error('서버 응답 오류:', response.data.message);
        alert('찜 목록에서 삭제하는 것을 실패했습니다.');
      }
    } catch (error) {
      console.error('에러 정보:', error);
      alert('찜 목록에서 삭제하는 것을 실패했습니다.');
    }
  });
});
