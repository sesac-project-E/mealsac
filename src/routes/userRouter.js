const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js');

/**
 * @swagger
 * /api/user/user?user_id={user_id}:
 * /user/profile:

 *  get:
 *    summary: "세션 프로필 조회 방식"
 *    description: "요청 경로를 보낸다.."
 *    tags: [User]
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "user_name": "유저1", "password" : "", "user_id" : "", "is_admin" : "" }]
 *
 * 
 */
router.get('/', controller.index);

router.get('/users', controller.getUsers);

router.get('/register', controller.getRegister);

router.post('/register', controller.postRegister);

router.post('/overlapid', controller.postOverLapId);

router.post('/overlapname', controller.postOverLapName);

router.get('/login', controller.getLogin);

router.post('/login', controller.postLogin);

router.post('/logout', controller.postLogout);

router.get('/profile', controller.getProfile);

router.patch('/patch', controller.patchProfile);

router.delete('/destroy', controller.deleteUser);

module.exports = router;
