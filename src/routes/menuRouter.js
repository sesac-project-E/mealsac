const express = require('express');
const menuRouter = express.Router();
const menuController = require('../controllers/menuController.js');
/**
 * @swagger
 * tags:
 *   name: Menu
 */

/**
 * @swagger
 * tags:
 *   name: Menu
 * @swagger
 * /api/menu/search?q=아메리카노&page=2:
 *  get:
 *   summary: 메뉴 이름으로 검색하기, 헤더에 charset=utf8 필수!!
 *   tags : [Menu]
 *   responses:
 *     200:
 *      description : 메뉴 테이블에서 검색한 이름과 같은 메뉴 받기. rows가 비어있다면 없는 데이터입니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties:
 *                count:
 *                  type: int
 *                  example: 35
 *                rows:
 *                  type: array
 *                  example: [{"menu_id": 797,"menu_name": "아메리카노","menu_price": 4800,"restaurant_id": 474,"Restaurant": {"restaurant_name": "극락왕생","likes_count": 0,"reviews_count": 0,"rating": 0}},         {"menu_id": 869,"menu_name": "아메리카노","menu_price": 2500,"restaurant_id": 541,"Restaurant": {"restaurant_name": "미태리 파스타 문래점","likes_count": 0,"reviews_count": 0,"rating": 0}}]
 * */
menuRouter.get('/search', menuController.searchMenu);

/**
 * @swagger
 * tags:
 *   name: Menu
 * @swagger
 * /api/menu/restaurant/restaurant_id:
 *  get:
 *   summary: 식당 이름으로 검색하기, 헤더에 charset=utf8 필수!!
 *   tags : [Menu]
 *   responses:
 *     200:
 *      description : 검색한 식당에서
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties:
 *                data:
 *                  type: array
 *                  example: [{"menu_id": 1,"menu_name": "칼국수","menu_price": 8000,"restaurant_id": 4}]
 * */
menuRouter.get('/restaurant/:restaurant_id', menuController.getRestaurantMenu);

module.exports = menuRouter;
