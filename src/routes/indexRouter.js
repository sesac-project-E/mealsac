const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const indexRouter = express.Router();
const indexController = require('../controllers/indexController.js');
const userController = require('../controllers/userController.js');
const restaurantController = require('../controllers/restaurantController.js');

indexRouter.get('/', indexController.indexPage);

indexRouter.get('/resister', (req, res) => {
  res.render('resister/index');
});

indexRouter.get('/login', (req, res) => {
  res.render('login/index');
});

const restaurant = {
  restaurant_name: '장수식당',
  restaurant_style: '한식',
  restaurant_phone: '0226331870',
  restaurant_address: '서울특별시 영등포구 문래동2가 2-0번지 ',
  restaurant_image: '/static/img/food/jpeg',
  restaurant_phone: '02-0000-0000',
  restaurant_kakao: '#',
  restaurant_naver: '#',
  restaurant_type_id: '1',
  rating: '4.5',
  reviews_count: '15',
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
