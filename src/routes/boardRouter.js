const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController.js');
// /api/board/?page=1
router.get('/', boardController.getFree);

// /api/board/notice?page=1
router.get('/notice', boardController.getNotice);

module.exports = router;
