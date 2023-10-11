const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = express.Router();
const indexController = require('../controllers/indexController.js');
const userController = require('../controllers/userController.js');
const restaurantController = require('../controllers/restaurantController.js');
const likeRestaurantController = require('../controllers/likeRestaurantController.js');
const reviewController = require('../controllers/reviewController.js');
const postController = require('../controllers/postController.js');

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
 *                userLikeRestaurants:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 0,"reviews_count": 1,"rating": 1,"LikeRestaurant": {"restaurant_id": 1,"id": 8},"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800"}]},{"restaurant_id": 2,"restaurant_name": "하나식당","likes_count": 0,"reviews_count": 0,"rating": 0,"LikeRestaurant": {"restaurant_id": 2,"id": 8},"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjhfMjI4/MDAxNTg1MzU1MzEzMDIw.0_lGiZbqxarmfmwKka-NSM-I3w104Ph-pP04J0Cs8DEg.Pc6R4Wcwg35SrDlhwm-O2SmOJupgjL_BKfDRE5043i0g.JPEG.nidduguy/IMG_1102.JPG?type=w800"}]}]
 *     500:
 *      description : 알 수 없는 에러 발생
 * */
indexRouter.get('/', indexController.indexPage);

indexRouter.get('/register', (req, res) => {
  res.render('register');
});

indexRouter.get('/login', (req, res) => {
  res.render('login');
});

indexRouter.get('/mypage', async (req, res) => {
  const userInfo = await req.session.userInfo;
  const restaurant = await likeRestaurantController.getUserLikes(req, res);
  res.render('mypage', {
    user_name: userInfo.user_name,
    restaurant,
  });
});

indexRouter.get('/profile', userController.getProfile);

indexRouter.get('/restaurants', (req, res) => {
  const userInfo = req.session.userInfo;

  res.render('restaurantList', {
    userInfo,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
});

indexRouter.get('/search/menu', async (req, res) => {
  const query = req.query.q;
  const restaurants = await restaurantController.getSearchDataRestaurantByName(
    req,
    res,
  );
  res.render('searchMenu', { query, restaurants });
});

indexRouter.get('/restaurant/:restaurant_id', async (req, res) => {
  const userInfo = req.session.userInfo;
  const restaurantData = await restaurantController.getRestaurant(req, res);
  const reviewData = await reviewController.getAllReviews(req, res);

  res.render('restaurantDetail', {
    userInfo,
    restaurant: restaurantData,
    review: reviewData,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
});

indexRouter.get('/board', (req, res) => {
  res.render('board');
});

indexRouter.get('/post/write', (req, res) => {
  res.render('boardWrite');
});

indexRouter.get('/post/edit/:post_id', postController.getEditPost);

//post_id로 개별 포스팅 조회
indexRouter.get('/post/:post_id', postController.getPost);

indexRouter.get('/random', (req, res) => {
  res.render('random');
});

indexRouter.get('/badpage', (req, res) => {
  res.render('404');
});

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage');
});

module.exports = indexRouter;
