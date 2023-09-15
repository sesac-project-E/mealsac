const express = require("express")
const tagRouter = express.Router()
const tagController = require("../controllers/tagController.js")
/**
 * @swagger
 * tags:
 *   name: Tag
 */



tagRouter.get('/all',tagController.getAllTags)
/**
 * @swagger
 * tags:
 *   name: Tag
 * 
 * /api/tag/search?tag1=""&tag2="":
 *  get:
 *   summary: 태그로 지정된 식당 가져오기
 *   tags : [Tag]
 *   responses:
 *     200:
 *      description : 잘 가져왔다면 얻는 응답
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: array
 *                  example: [{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 2,"reviews_count": 1,"rating": 1,"Tags": [{"tag_id": 1,"tag_name": "로맨틱한","TagRestaurant": {"restaurant_id": 1,"tag_id": 1}},{"tag_id": 3,"tag_name": "편안한","TagRestaurant": {"restaurant_id": 1,"tag_id": 3}}]},{"restaurant_id": 4,"restaurant_name": "영일분식","likes_count": 0,"reviews_count": 1,"rating": 4,"Tags": [{"tag_id": 1,"tag_name": "로맨틱한","TagRestaurant": {"restaurant_id": 4,"tag_id": 1}},{"tag_id": 3,"tag_name": "편안한","TagRestaurant": {"restaurant_id": 4,"tag_id": 3}}]}]
 *     404:
 *      description : 올바르지 않은 태그이름 일경우 404로 넘어갑니다.
 *     500:
 *      description : 알 수 없는 에러
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: string
 *                  example: "알 수 없는 에러"
 * */
tagRouter.get('/search', tagController.getRestaurantsByTag)
module.exports = tagRouter