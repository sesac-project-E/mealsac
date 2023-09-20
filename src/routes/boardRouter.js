const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController.js');

router.get('/notice', boardController.getNotice);
router.get('/free', boardController.getFree);

module.exports = router;