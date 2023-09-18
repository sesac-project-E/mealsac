const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = express.Router();
const indexController = require('../controllers/indexController.js');
const userController = require('../controllers/userController.js');
const restaurantController = require('../controllers/restaurantController.js');
const likeRestaurantController = require('../controllers/likeRestaurantController.js');

/**
 * @swagger
 * tags:
 *   name: Index
 */

/**
 * @swagger
 * tags:
 *   name: Index
 * @swagger
 * /:
 *  get:
 *   summary: 메인 페이지 가져오기
 *   tags : [Index]
 *   responses:
 *     200:
 *      description : 메인 페이지가 json 데이터와 함께 전송됩니다. 빈 배열 혹은 ""은 데이터가 없는 것을 의미합니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties:
 *                recentRestaurants:
 *                  type: array
 *                  example: [{"restaurant_id": 760,"restaurant_name": "제이스쿠키팩토리","likes_count": 0,"reviews_count": 0,"rating": 0,"RestaurantImages": []},{"restaurant_id": 759,"restaurant_name": "정직유부 문래점","likes_count": 0,"reviews_count": 0,"rating": 0,"RestaurantImages": []}]
 *                popularRestaurants:
 *                  type: array
 *                  example: [{"restaurant_id": 5,"restaurant_name": "남성호프","likes_count": -1,"reviews_count": 0,"rating": 0,"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MjJfMjA1/MDAxNTkyNzg0NjAxMTM5.RKKpCY89B_vyXNkySi8csQcTks_XjLR4LfKJyH4AXXIg.peUl7Q_FMvAhnnudENfNrYwxUW4n2PmKJZjPLowabGgg.JPEG.kyungha926/SE-a6fd1722-f3f0-4a98-9592-e55e9e938b68.jpg?type=w800"}]},{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 0,"reviews_count": 1,"rating": 1,"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800"}]}]
 *                userPickRestaurants:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 0,"reviews_count": 1,"rating": 1,"LikeRestaurant": {"restaurant_id": 1,"id": 8},"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800"}]},{"restaurant_id": 2,"restaurant_name": "하나식당","likes_count": 0,"reviews_count": 0,"rating": 0,"LikeRestaurant": {"restaurant_id": 2,"id": 8},"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjhfMjI4/MDAxNTg1MzU1MzEzMDIw.0_lGiZbqxarmfmwKka-NSM-I3w104Ph-pP04J0Cs8DEg.Pc6R4Wcwg35SrDlhwm-O2SmOJupgjL_BKfDRE5043i0g.JPEG.nidduguy/IMG_1102.JPG?type=w800"}]}]
 *     500:
 *      description : 알 수 없는 에러 발생
 * */
indexRouter.get('/', indexController.indexPage);

indexRouter.get('/register', (req, res) => {
  res.render('register/index');
});

indexRouter.get('/login', (req, res) => {
  res.render('login/index');
});

const restaurant = [
  {
    restaurant_id: '1',
    restaurant_name: '장수식당',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address: '서울특별시 영등포구 문래동2가 2-0번지 ',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
  {
    restaurant_id: '2',
    restaurant_name: '하나식당',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address: '서울특별시 영등포구 문래동3가 54-30번지 ',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
  {
    restaurant_id: '3',
    restaurant_name: '대영각',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address: '서울특별시 영등포구 문래동3가 54-5번지 ',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
  {
    restaurant_id: '4',
    restaurant_name: '영일분식',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address: '서울특별시 영등포구 문래동4가 8-26 ',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
  {
    restaurant_id: '5',
    restaurant_name: '남성호프',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address:
      '서울특별시 영등포구 문래동2가 35번지 남성아파트 상가 1층 3호',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
  {
    restaurant_id: '6',
    restaurant_name: '쟁반집',
    restaurant_style: '한식',
    restaurant_phone: '02-0000-0000',
    restaurant_address: '서울특별시 영등포구 문래동4가 9-6 1층 ',
    restaurant_image: '/static/img/food/jpeg',
    restaurant_kakao: '#',
    restaurant_naver: '#',
    restaurant_type_id: '1',
    rating: '4.5',
    reviews_count: '15',
    Reviews: [
      {
        review_id: 5,
        user_id: 8,
        rating: '1.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:49.000Z',
        ReviewImages: [
          {
            image_id: 5,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718436.jpeg',
          },
        ],
      },
      {
        review_id: 6,
        user_id: 8,
        rating: '2.0',
        content: 'ss2',
        updatedAt: '2023-09-13T12:22:53.000Z',
        ReviewImages: [
          {
            image_id: 6,
            review_id: 16,
            image_url: '/static/img/reviewImage/food1694669718438.jpeg',
          },
        ],
      },
    ],
    restaurant_type: { restaurant_type: '한식' },
  },
];

indexRouter.get('/mypage', (req, res) => {
  const userInfo = req.session.userInfo;

  res.render('mypage/index', {
    user_name: userInfo.user_name,
    restaurant: likeRestaurantController.getUserLikes,
  });
  // res.render('mypage/index');
});

indexRouter.get('/profile', userController.getProfile);

indexRouter.get(
  '/restaurant/:restaurant_id',
  restaurantController.getRestaurant,
);

indexRouter.get('/restaurants', (req, res) => {
  res.render('restaurantList/index', {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
});

indexRouter.get('/random', (req, res) => {
  res.render('./random.ejs');
});

indexRouter.get('/badpage', (req, res) => {
  res.render('404');
});

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage');
});

module.exports = indexRouter;
