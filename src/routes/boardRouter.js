const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController.js');

// 자유게시판 목록 전송
router.get('/', boardController.getFree);

// /api/board/notice?page=1
// 공지게시판 목록 전송
router.get('/notice', boardController.getNotice);

module.exports = router;
