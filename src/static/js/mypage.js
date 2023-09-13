const restaurant = {
  restaurantName: '장수식당',
  restaurantStyle: '한식',
  restaurantPhone: '0226331870',
  restaurantAddress: '서울특별시 영등포구 문래동2가 2-0번지',
  restaurantRate: '4.5',
  restaurantComment: '15',
};

const likeList = () => {
  document.getElementById('myLike').classList.add('clicked');
  document.getElementById('myReview').classList.remove('clicked');
  document.querySelector('.list').innerHTML = '<h1>찜 목록입니다~</h1>';
};

const reviewList = () => {
  document.getElementById('myReview').classList.add('clicked');
  document.getElementById('myLike').classList.remove('clicked');
  document.querySelector('.list').innerHTML = '<h1>리뷰관리</h1>';
};
