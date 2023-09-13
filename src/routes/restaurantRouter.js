const express = require("express")
const restaurantRouter = express.Router()
const restaurantController = require("../controllers/restaurantController.js")

/**
 * @swagger
 * tags:
 *   name: Restaurant
 */

/**
 * @swagger
 * tags:
 *   name: Restaurant
 * @swagger
 * /api/restaurant/:restaurant_id:
 *  get:
 *   summary: 식당 데이터 가져오기
 *   tags : [Restaurant]
 *   responses:
 *     200:
 *      description : 식당 디테일 페이지 데이터 조회
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                restaurant_id:
 *                  type: int
 *                  example: 4
 *                restaurant_name:
 *                  type: string
 *                  example: "영일분식"
 *                restaurant_phone:
 *                  type: string
 *                  example: "02 1881444"
 *                restaurant_address:
 *                  type: string
 *                  example: "서울특별시 영등포구 문래동4가 8-26 "
 *                restaurant_location_X:
 *                  type: string
 *                  example: "190177.110614033    "
 *                restaurant_location_Y:
 *                  type: string
 *                  example: "446015.362952783    "
 *                restaurant_kakao:
 *                  type: string
 *                  example: "https://place.map.kakao.com/10651104"
 *                restaurant_naver:
 *                  type: string
 *                  example: "https://pcmap.place.naver.com/place/11721719?from=map&fromPanelNum=2&x=126.889675&y=37.5162833&timestamp=202309081056"
 *                restaurant_type:
 *                  type: int
 *                  example: 3
 *                Users:
 *                  type: array
 *                  example: [{"user_name": "오렌지","LikeRestaurant": {"restaurant_id": 4,"id": 1}},{"user_name": "moss","LikeRestaurant": {"restaurant_id": 4,"id": 5}}]
 *                Tags:
 *                  type: array 
 *                  example: [{"tag_id": 1, "tag_name": "가성비가 좋은", "TagRestaurant": { "restaurant_id": 4, "tag_id": 1}}, { "tag_id": 2, "tag_name": "점심식사 하기 좋은", "TagRestaurant": { "restaurant_id": 4, "tag_id": 2}}]
 *                Reviews:
 *                  type: array 
 *                  example: [{"review_id": 2, "user_id": 1, "rating": "5.0", "title": "맛있어요", "updatedAt": null, "image_id": [ { "image_id": 2,"image_url": "../static/img/reviews/2/sss.png","review_id": 2}]}]
 *                Menus:
 *                  type: array  
 *                  example : [{"menu_name": "칼국수", "menu_price": 8000},{"menu_name": "소면","menu_price": 8000},{"menu_name": "칼비빔국수","menu_price": 8000},{"menu_name": "소면비빔국수","menu_price": 8000},{"menu_name": "만두","menu_price": 7000}]
 *     404:
 *      description : 존재하지 않는 pk값일 경우 404로 렌더링 됩니다.
 *      content:
 *        html:
 * 
 * 
 * */
 
restaurantRouter.get('/:restaurant_id', restaurantController.getRestaurant)
restaurantRouter.delete('/:restaurant_id', restaurantController.deleteRestaurant)


module.exports = restaurantRouter