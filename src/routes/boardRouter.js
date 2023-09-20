const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController.js');

router.get('/', boardController.getNotice);

module.exports = router;
