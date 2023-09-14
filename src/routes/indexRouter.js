const express = require('express');
const indexRouter = express.Router();
const indexController = require('../controllers/indexController.js')

indexRouter.get('/', indexController.indexPage);

indexRouter.get('/badpage', (req, res) => {
  res.render('404');
});

indexRouter.get('*', (req, res) => {
  res.redirect('/badpage');
});
module.exports = indexRouter;
