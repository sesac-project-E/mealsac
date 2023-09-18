const express = require("express")
const restaurantTypeRouter = express.Router()
const restaurantTypeController = require("../controllers/restaurantTypeController.js")

/**
 * @swagger
 * tags:
 *   name: RestaurantType
 */

/**
 * @swagger
 * tags:
 *   name: RestaurantType
 * @swagger
 * /api/restaurant_type/:type_eng?page=1:
 *  get:
 *   summary: 해당 타입 식당 데이터 가져오기
 *   tags : [RestaurantType]
 *   responses:
 *     200:
 *      description : 해당 타입에 해당하는 식당 데이터가 배열로 전송됩니다. rows = []은 데이터가 존재하지 않음을 의미. 
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                count:
 *                  type: int
 *                  example: 297
 *                rows:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당", "likes_count": 4,"reviews_count": 1,"rating": 1,"Users": [{"id": 8,"password": "$2b$11$zP3mW6mJOIkcDcAkSyDlEuw5F..pPE6VMDC43Oyq2YllsrVPLmEfO","user_name": "js","user_id": "js","is_admin": null,"LikeRestaurant": {"restaurant_id": 1,"id": 8}}]},             "RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800"}]]
 *     404:
 *      description : 해당 페이지가 없거나 존재하는 타입이 아님.
 * */
restaurantTypeRouter.get("/:type", restaurantTypeController.getTypeRestaurants)

module.exports = restaurantTypeRouter;