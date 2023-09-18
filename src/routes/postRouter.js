const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/:post_id', postController.getPost);

router.get('/all/all', postController.getPosts);

module.exports = router;
