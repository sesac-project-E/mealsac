const path = require('path');
const multer = require('multer');
const express = require('express');
const reviewRouter = express.Router();
const controller = require('../controllers/reviewController');

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, '../static/img/reviewImage'));
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: 리뷰 관련 API 엔드포인트
 */

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 * @swagger
 * /api/review/myreview/{review_id}:
 *   patch:
 *     summary: 로그인 한 사용자의 리뷰 수정하기
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
 * @swagger
 * /api/review/myreview/{review_id}:
 *   delete:
 *     summary: 로그인 한 작성자 본인의 리뷰 삭제하기
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
 * @swagger
 * /api/review/{review_id}/usefulness:
 *   post:
 *     summary: 로그인 한 사용자가 특정 리뷰 추천
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
reviewRouter.post('/usefulness/:review_id', controller.recommendReview);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 * @swagger
 * /api/review/unrecommend/{review_id}:
 *   delete:
 *     summary: 로그인한 사용자가 특정 리뷰에 대한 추천 취소
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 추천을 취소할 리뷰의 ID
 *     responses:
 *       200:
 *         description: 리뷰 추천을 성공적으로 취소함
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "성공적으로 리뷰 추천을 취소하셨습니다."
 *       400:
 *         description: 세션에서 사용자 정보를 찾을 수 없거나 추천을 하지 않은 리뷰에 대한 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "세션에서 사용자 정보를 찾을 수 없습니다." or "해당 리뷰에 추천을 하지 않으셨습니다."
 *       500:
 *         description: 내부 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "리뷰 추천을 취소하는 것에 오류가 발생했습니다."
 */
reviewRouter.delete('/usefulness/:review_id', controller.unrecommendReview);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 * @swagger
 * /api/review/myreview?page=1
 *   get:
 *     summary: 로그인한 사용자가 작성한 리뷰를 페이지네이션 하여 조회
 *     description: 각 페이지에는 최대 5개의 리뷰를 포함하고 있으며, 총 페이지 수를 포함하여 응답
 *     tags: [Review]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         type: integer
 *         description: 현재 페이지 번호 (기본값 1)
 *     responses:
 *       200:
 *         description: 리뷰를 성공적으로 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       review_id:
 *                         type: integer
 *                       restaurant_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       usefulnessCount:
 *                         type: integer
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *         examples:
 *           application/json: |
 *             {
 *               "status": "success",
 *               "data": [
 *                 {
 *                   "review_id": 1,
 *                   "restaurant_id": 10,
 *                   "user_id": 2,
 *                   "content": "맛있습니다!",
 *                   "rating": 4.5,
 *                   "usefulnessCount": 3
 *                 },
 *                 {
 *                   "review_id": 2,
 *                   "restaurant_id": 11,
 *                   "user_id": 2,
 *                   "content": "그냥 그래요",
 *                   "rating": 2.0,
 *                   "usefulnessCount": 1
 *                 }
 *               ],
 *               "totalPages": 10
 *             }
 *       400:
 *         description: 세션에서 사용자 정보를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "세션에서 사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 내부 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "리뷰를 가져오는 동안 오류가 발생했습니다."
 */
reviewRouter.get('/myreview', controller.getMyReviews);

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: 리뷰 관련 API 엔드포인트
 * @swagger
 * /api/review/{restaurant_id}:
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
 * @swagger
 * /api/review/{restaurant_id}:
 *   post:
 *     summary: 로그인 한 사용자가 식당에 새로운 리뷰 작성
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
reviewRouter.post(
  '/:restaurant_id',
  uploadDetail.array('imageFiles'),
  controller.postReview,
);

module.exports = reviewRouter;
