const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = express.Router();
const indexController = require('../controllers/indexController.js');
const userController = require('../controllers/userController.js');
const restaurantController = require('../controllers/restaurantController.js');
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

indexRouter.get('/resister', (req, res) => {
  res.render('resister/index');
});

indexRouter.get('/login', (req, res) => {
  res.render('login/index');
});

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

indexRouter.get('/mypage', (req, res) => {
  res.render('mypage/index', { restaurant: restaurant });
});

indexRouter.get('/profile', userController.getProfile);

indexRouter.get('/restaurants', (req, res) => {
  res.render('restaurantList/index', {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    restaurants: restaurant,
  });
});
indexRouter.get(
  '/restaurant/:restaurant_id',
  restaurantController.getRestaurant,
);

indexRouter.get('/badpage', (req, res) => {
  res.render('404');
});

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage');
});

module.exports = indexRouter;
