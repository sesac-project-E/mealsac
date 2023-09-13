const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.render('index');
});

// 내가 추가한 코드
const restaurant = {
  restaurantName: '장수식당',
  restaurantStyle: '한식',
  restaurantPhone: '0226331870',
  restaurantAddress: '서울특별시 영등포구 문래동2가 2-0번지 ',
  restaurantImage: '../../static/img/food/jpeg',
  restaurantPhone: '02-0000-0000',
  restaurant_kakao: '#',
  restaurant_naver: '#',
  restaurant_type_id: '가성비 좋은',
  restaurantRate: '4.5',
  restaurantComment: '15',
};

const reviews = {
  status: 'success',
  data: [
    {
      review_id: 1,
      restaurant_id: 1,
      user_id: 16,
      title: '맛있다',
      content: '맛있어',
      rating: '5.0',
      createdAt: '2023-09-12T19:11:08.000Z',
      updatedAt: '2023-09-12T19:11:08.000Z',
      ReviewImages: [],
      reviewUsefulness: [],
      totalRecommendations: 0,
      is_useful: false,
    },
    {
      review_id: 2,
      restaurant_id: 1,
      user_id: 16,
      title: '맛있다222',
      content: '맛있어222',
      rating: '5.0',
      createdAt: '2023-09-12T19:11:23.000Z',
      updatedAt: '2023-09-12T19:11:23.000Z',
      ReviewImages: [],
      reviewUsefulness: [],
      totalRecommendations: 0,
      is_useful: 1,
    },
    {
      review_id: 3,
      restaurant_id: 1,
      user_id: 16,
      title: '맛있다333',
      content: '맛있어333 사진 포함!',
      rating: '5.0',
      createdAt: '2023-09-12T19:31:38.000Z',
      updatedAt: '2023-09-12T19:31:38.000Z',
      ReviewImages: [
        {
          image_url: '/static/img/reviewImage/food1694547098045.jpeg',
        },
        {
          image_url:
            '/static/img/reviewImage/food áá©á¨áá¡áá©á«1694547098044.jpeg',
        },
      ],
      reviewUsefulness: [],
      totalRecommendations: 0,
      is_useful: 5,
    },
  ],
};

indexRouter.get('/restaurant-detail', (req, res) => {
  res.render('restaurantDetail/index', { restaurant, reviews });
});

indexRouter.get('/badpage', (req, res) => {
  res.render('404');
});

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage');
});
module.exports = indexRouter;
