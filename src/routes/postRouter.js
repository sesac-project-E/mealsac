const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/:post_id', postController.getPost);

router.get('/all/all', postController.getPosts);

router.post('/create', postController.postCreatePost);

module.exports = router;
