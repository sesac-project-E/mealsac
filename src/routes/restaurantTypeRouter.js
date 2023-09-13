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
 * /api/restaurant_type/:type_eng:
 *  get:
 *   summary: 해당 타입 식당 데이터 가져오기
 *   tags : [RestaurantType]
 *   responses:
 *     200:
 *      description : 해당 타입에 해당하는 식당 데이터가 배열로 전송됩니다.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             properties: 
 *              restaurant_id:
 *                type : int
 *                example : 1 
 *              restaurant_name:
 *                type : string
 *                example : "장수식당"
 *              likes_count:
 *                type : int
 *                example : '0'
 *              reviews_count:
 *                type : int
 *                example : '0'
 *              rating:
 *                type : int
 *                example : '0'
 * 
 * 
 * */
restaurantTypeRouter.get("/:type", restaurantTypeController.getTypeRestaurants)

module.exports = restaurantTypeRouter;