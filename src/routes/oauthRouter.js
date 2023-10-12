const express = require('express');
const oauthRouter = express.Router();
const oauthController = require('../controllers/oauthController');

oauthRouter.get('/kakao', oauthController.kakaoLogin);

oauthRouter.get('/kakao/result', oauthController.kakaoResult);

module.exports = oauthRouter;
