const express = require('express');
const tagRouter = express.Router();
const tagController = require('../controllers/tagController.js');
/**
 * @swagger
 * tags:
 *   name: Tag
 */

tagRouter.get('/all', tagController.getAllTags);

/**
 * @swagger
 * tags:
 *   name: Tag
 *
 * /api/tag/search?tag1=""&tag2=""&page=1:
 *  get:
 *   summary: 태그로 지정된 식당 가져오기. 만약 Users === []이면 로그인 되어 있지 않은 상태이거나 like를 누르지 않은 것입니다.
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
 *                count:
 *                  type: int
 *                  example : 27
 *                rows:
 *                  type: array
 *                  example: [{"restaurant_id": 4,"restaurant_name": "영일분식","likes_count": 0,"reviews_count": 1,"rating": 4,"Tags": [{"tag_id": 1,"tag_name": "로맨틱한","TagRestaurant": {"restaurant_id": 4,"tag_id": 1}},{"tag_id": 2,"tag_name": "가족과 오기 좋은","TagRestaurant": {"restaurant_id": 4,"tag_id": 2}}],"Users": []}]
 *     400:
 *      description : 올바르지 않은 태그이름 일 경우 400신호가 전송됩니다.
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
tagRouter.get('/search', tagController.getRestaurantsByTag);
module.exports = tagRouter;
