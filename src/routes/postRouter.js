const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

//post_id로 개별 포스팅 조회
router.get('/:post_id', postController.getPost);

//게시글 생성
router.post('/create', postController.postCreatePost);

//게시글 삭제
router.delete('/:post_id', postController.deletePost);

//내 게시글 조회
router.get('/my/post', postController.getMyPosts);

module.exports = router;
