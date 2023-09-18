const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/qqqq', postController.getPost);

module.exports = router;
