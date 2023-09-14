const express = require("express")
const likeRestaurantRouter = express.Router()
const likeRestaurantController = require("../controllers/likeRestaurantController.js")
/**
 * @swagger
 * tags:
 *   name: Like
 */


/**
 * @swagger
 * tags:
 *   name: Like
 * 
 * /api/like:
 *  post:
 *   summary: session에 있는 User pk와 body에 존재하는 restaurant_id로 찜하기
 *   tags : [Like]
 *   requestBody:
 *     description : 찜할 restaurant_id를 넣기
 *     required : true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           restaurant_id:
 *             type : int
 *             description : 찜할 restaurant_id
 *             example: 4
 *   responses:
 *     201:
 *      description : 잘 생성 되었다면 받는 응답
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: string
 *                  example: "잘 생성되었습니다."
 *     400:
 *      description : 세션이 존재하지 않거나 존재하지 않는 restaurant_id일 경우 받는 응답
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: string
 *                  example: "유효하지 않은 id나 restaurant_id입니다."
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
likeRestaurantRouter.post("", likeRestaurantController.postLike)

/**
 * @swagger
 * tags:
 *   name: Like
 * 
 * /api/like:
 *  delete:
 *   summary: session에 있는 User pk와 body에 존재하는 restaurant_id로 찜 지우기
 *   tags : [Like]
 *   requestBody:
 *     description : 찜 취소할 restaurant_id를 넣기
 *     required : true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *           restaurant_id:
 *             type : int
 *             description : 찜 취소할 restaurant_id
 *             example: 4
 *   responses:
 *     200:
 *      description : 잘 지워졌다면 받는 응답
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: string
 *                  example: "성공적으로 제거하였습니다."
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
likeRestaurantRouter.delete("", likeRestaurantController.deleteLike)

/**
 * @swagger
 * tags:
 *   name: Like
 * @swagger
 * /api/like/user:
 *  get:
 *   summary: session에 있는 User pk를 통한 찜한 식당 찾기
 *   tags : [Like]
 *   responses:
 *     200:
 *      description : 찜한 식당 받기, 찜한 식당은 Restaurants 배열에 존재하고 이미지는 각 json 안에 있는 RestaurantImages에 restaurant_image_url에 존재함
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              properties: 
 *                data:
 *                  type: array
 *                  example: [{"id": 8,"Restaurants": [{"restaurant_id": 1,"restaurant_name": "장수식당","likes_count": 0,"reviews_count": 1,"rating": 1,"LikeRestaurant": {"restaurant_id": 1,"id": 8},"RestaurantImages": [{"restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800"}]}]}]
 * */
likeRestaurantRouter.get("/user", likeRestaurantController.getUserLikes)


module.exports = likeRestaurantRouter