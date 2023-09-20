const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

//post 아이디로 조회

//api/post/36
router.get('/:post_id', postController.getPost);

//api/create
router.post('/create', postController.postCreatePost);

router.delete('/:post_id', postController.deletePost);

module.exports = router;
