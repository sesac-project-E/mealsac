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
 * /api/restaurant/all/:page:
 *  get:
 *   summary: 모든 식당 20개 별로 가져오기 page(1~39)까지
 *   tags : [Restaurant]
 *   responses:
 *     200:
 *       description: 식당 데이터가 rows안에 들어오고 모든 식당의 개수는 count에 들어 있습니다. Users 데이터가 존재하면 찜 하기를 누른 식당입니다.
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                count:
 *                  type: int
 *                  example: 761
 *                rows:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 3,"reviews_count": 1,"rating": 1,"Users": [{"id": 8,"password": "$2b$11$zP3mW6mJOIkcDcAkSyDlEuw5F..pPE6VMDC43Oyq2YllsrVPLmEfO","user_name": "js","user_id": "js","is_admin": null,"LikeRestaurant": {"restaurant_id": 1,"id": 8}}]},{"restaurant_id": 2,"restaurant_name": "하나식당","likes_count": 0,"reviews_count": 0,"rating": 0,"Users": []}]
 *       404:
 *         description: 오류 혹은 잘못된 페이지 번호 입력시 404가 리턴됩니다.
 * */
restaurantRouter.get('/all/:page', restaurantController.getAllRestaurants)
/**
 * @swagger
 * tags:
 *   name: Restaurant
 * @swagger
 * /api/restaurant/like/:page:
 *  get:
 *   summary: 찜한 순 내림차순 식당 20개 별로 가져오기 page(1~39)까지, 좋아요 -> 점수 -> 리뷰 수 -> pk 오름차순
 *   tags : [Restaurant]
 *   responses:
 *     200:
 *       description: 식당 데이터가 rows안에 들어오고 모든 식당의 개수는 count에 들어 있습니다. Users 데이터가 존재하면 찜 하기를 누른 식당입니다.
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                count:
 *                  type: int
 *                  example: 761
 *                rows:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당", "likes_count": 4,"reviews_count": 1,"rating": 1,"Users": [{"id": 8,"password": "$2b$11$zP3mW6mJOIkcDcAkSyDlEuw5F..pPE6VMDC43Oyq2YllsrVPLmEfO","user_name": "js","user_id": "js","is_admin": null,"LikeRestaurant": {"restaurant_id": 1,"id": 8}}]}]
 *       404:
 *         description: 오류 혹은 잘못된 페이지 번호 입력시 404가 리턴됩니다.
 * */
restaurantRouter.get('/like/:page', restaurantController.getLikeRestaurants)

/**
 * @swagger
 * tags:
 *   name: Restaurant
 * @swagger
 * /api/restaurant/rating/:page:
 *  get:
 *   summary: 평점 순 내림차순 식당 20개 별로 가져오기 page(1~39)까지, 점수 -> 좋아요 -> 리뷰 수 -> pk 오름차순
 *   tags : [Restaurant]
 *   responses:
 *     200:
 *       description: 식당 데이터가 rows안에 들어오고 모든 식당의 개수는 count에 들어 있습니다. Users 데이터가 존재하면 찜 하기를 누른 식당입니다.
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                count:
 *                  type: int
 *                  example: 761
 *                rows:
 *                  type: array
 *                  example: [{"restaurant_id": 4,"restaurant_name": "영일분식","likes_count": 0,"reviews_count": 1,"rating": 4,"Users": [{"id": 8,"password": "$2b$11$zP3mW6mJOIkcDcAkSyDlEuw5F..pPE6VMDC43Oyq2YllsrVPLmEfO","user_name": "js","user_id": "js","is_admin": null,"LikeRestaurant": {"restaurant_id": 4,"id": 8}}]},{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 4,"reviews_count": 1,"rating": 1,"Users": []}]
 *       404:
 *         description: 오류 혹은 잘못된 페이지 번호 입력시 404가 리턴됩니다.
 * */
restaurantRouter.get('/rating/:page', restaurantController.getRatingRestaurants)



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
 *       description: 식당 디테일 페이지 데이터
 *       content:
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
 *                restaurant_type_id:
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
 *                restaurant_type:
 *                  type: json 
 *                  example : {"restaurant_type": "분식"}
 * 
 *       500:
 *         description: 알 수 없는 오류의 경우 500이 전송됩니다.
 * */
 
restaurantRouter.get('/:restaurant_id', restaurantController.getRestaurant)
restaurantRouter.delete('/:restaurant_id', restaurantController.deleteRestaurant)


module.exports = restaurantRouter