const express = require('express');
const reviewRouter = express.Router();
const controller = require('../controllers/reviewController');

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: 리뷰 관련 엔드포인트
 */

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/myreview:
 *   get:
 *     summary: 내가 작성한 리뷰 조회
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: 성공적으로 내 리뷰를 가져온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 data:
 *                   type: array
 *                   description: 사용자가 작성한 리뷰 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: integer
 *                         description: 리뷰의 고유 ID
 *                       title:
 *                         type: string
 *                         description: 리뷰 제목
 *                       content:
 *                         type: string
 *                         description: 리뷰 내용
 *                       rating:
 *                         type: number
 *                         description: 리뷰 평점
 *                       images:
 *                         type: array
 *                         description: 리뷰에 첨부된 이미지 URL 목록
 *                         items:
 *                           type: string
 *                           description: 이미지 URL
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 리뷰 작성 일자 및 시간
 *               example:
 *                 status: success
 *                 data:
 *                   - review_id: 1
 *                     title: "맛있어요"
 *                     content: "음식이 정말 맛있어요."
 *                     rating: 4.5
 *                     images:
 *                       - "/static/img/reviewImages/image1.jpg"
 *                       - "/static/img/reviewImages/image2.jpg"
 *                     createdAt: "2023-09-11T12:34:56Z"
 *       400:
 *         description: 요청이 잘못된 경우 (세션에서 사용자 정보를 찾을 수 없는 경우 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류로 인해 리뷰를 가져오지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 가져오는 동안 오류가 발생했습니다."
 */
reviewRouter.get('/myreview', controller.getMyReviews);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/myreview/{review_id}:
 *   patch:
 *     summary: 내 리뷰 수정하기
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: 수정할 리뷰의 고유 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: 리뷰 수정 내용
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 리뷰의 제목
 *               content:
 *                 type: string
 *                 description: 수정할 리뷰의 내용
 *               rating:
 *                 type: number
 *                 description: 수정할 리뷰의 평점
 *             required:
 *               - title
 *               - content
 *               - rating
 *     responses:
 *       200:
 *         description: 성공적으로 리뷰를 수정한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                 data:
 *                   type: object
 *                   description: 수정된 리뷰 정보
 *                   properties:
 *                     review_id:
 *                       type: integer
 *                       description: 리뷰의 고유 ID
 *                     title:
 *                       type: string
 *                       description: 리뷰 제목
 *                     content:
 *                       type: string
 *                       description: 리뷰 내용
 *                     rating:
 *                       type: number
 *                       description: 리뷰 평점
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: 리뷰 수정 일자 및 시간
 *               example:
 *                 status: success
 *                 message: "리뷰가 성공적으로 업데이트되었습니다."
 *                 data:
 *                   review_id: 1
 *                   title: "맛있어요 (수정)"
 *                   content: "음식이 정말 맛있어요. (수정)"
 *                   rating: 4.8
 *                   updatedAt: "2023-09-11T13:45:00Z"
 *       400:
 *         description: 요청이 잘못된 경우 (세션에서 사용자 정보를 찾을 수 없는 경우 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       403:
 *         description: 리뷰를 수정할 권한이 없는 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 수정할 권한이 없습니다."
 *       404:
 *         description: 해당 리뷰를 찾을 수 없거나 사용자가 작성한 리뷰가 아닌 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "해당 리뷰를 찾을 수 없거나 사용자가 작성한 리뷰가 아닙니다."
 *       500:
 *         description: 서버 오류로 인해 리뷰를 수정하지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 업데이트하는 동안 오류가 발생했습니다."
 */
reviewRouter.patch('/myreview/:review_id', controller.editReview);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/myreview/{review_id}:
 *   delete:
 *     summary: 내 리뷰 삭제하기
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: 삭제할 리뷰의 고유 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 리뷰를 삭제한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *               example:
 *                 status: success
 *                 message: "리뷰가 성공적으로 삭제되었습니다."
 *       400:
 *         description: 요청이 잘못된 경우 (세션에서 사용자 정보를 찾을 수 없는 경우 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       403:
 *         description: 리뷰를 삭제할 권한이 없는 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 삭제할 권한이 없습니다."
 *       404:
 *         description: 해당 리뷰를 찾을 수 없는 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "해당 리뷰를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류로 인해 리뷰를 삭제하지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 삭제하는 동안 오류가 발생했습니다."
 */
reviewRouter.delete('/myreview/:review_id', controller.deleteReview);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/{restaurant_id}:
 *   get:
 *     summary: 특정 레스토랑의 모든 리뷰 조회
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: 조회할 레스토랑의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 리뷰 목록을 가져온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 data:
 *                   type: array
 *                   description: 리뷰 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: integer
 *                         description: 리뷰 ID
 *                       user_id:
 *                         type: integer
 *                         description: 사용자 ID
 *                       title:
 *                         type: string
 *                         description: 리뷰 제목
 *                       content:
 *                         type: string
 *                         description: 리뷰 내용
 *                       rating:
 *                         type: number
 *                         description: 평점
 *                       totalRecommendations:
 *                         type: integer
 *                         description: 총 추천 수
 *                       is_useful:
 *                         type: boolean
 *                         description: 현재 사용자가 리뷰를 추천한 경우 true, 그렇지 않으면 false
 *               example:
 *                 status: success
 *                 data:
 *                   - review_id: 1
 *                     user_id: 123
 *                     title: "맛있어요!"
 *                     content: "음식이 정말 맛있어요."
 *                     rating: 4.5
 *                     totalRecommendations: 10
 *                     is_useful: true
 *                   - review_id: 2
 *                     user_id: 456
 *                     title: "좋아요!"
 *                     content: "서비스가 좋아요."
 *                     rating: 4.0
 *                     totalRecommendations: 5
 *                     is_useful: false
 *       500:
 *         description: 서버 오류로 인해 리뷰를 가져오지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 가져오는 동안 오류가 발생했습니다."
 */
reviewRouter.get('/:restaurant_id', controller.getAllReviews);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/{restaurant_id}:
 *   post:
 *     summary: 레스토랑에 새로운 리뷰 작성
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         description: 리뷰를 작성할 음식점의 고유 ID
 *         schema:
 *           type: integer
 *       - in: body
 *         name: review
 *         required: true
 *         description: 리뷰 정보
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: 리뷰 제목
 *             content:
 *               type: string
 *               description: 리뷰 내용
 *             rating:
 *               type: number
 *               description: 별점 (0에서 5까지의 실수)
 *             user_id:
 *               type: integer
 *               description: 사용자의 고유 ID
 *         examples:
 *           example1:
 *             value:
 *               title: "맛있어요!"
 *               content: "음식이 정말 맛있어서 좋았어요."
 *               rating: 4.5
 *               user_id: 1
 *       - in: formData
 *         name: image
 *         type: file
 *         description: 리뷰에 첨부할 이미지 파일 (선택 사항)
 *     responses:
 *       201:
 *         description: 성공적으로 리뷰를 작성한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *               example:
 *                 status: success
 *                 message: "성공적으로 리뷰를 등록했습니다."
 *       400:
 *         description: 요청이 잘못된 경우 (세션에서 사용자 정보를 찾을 수 없는 경우 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류로 인해 리뷰를 작성하지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "리뷰를 등록하는 동안 오류가 발생했습니다."
 */
reviewRouter.post('/:restaurant_id', controller.postReview);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 *
 * /review/{review_id}/usefulness:
 *   post:
 *     summary: 리뷰 추천
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         description: 추천을 할 리뷰의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공적으로 리뷰를 추천한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *               example:
 *                 message: "성공적으로 리뷰를 추천하셨습니다."
 *       400:
 *         description: 요청이 잘못된 경우 (세션에서 사용자 정보를 찾을 수 없는 경우 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류로 인해 추천을 하지 못한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 응답 상태
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *               example:
 *                 status: error
 *                 message: "해당 리뷰를 추천하는 것에 오류가 발생했습니다."
 */
reviewRouter.post('/:review_id/usefulness', controller.recommendReview);

module.exports = reviewRouter;
