const path = require('path');
const multer = require('multer');
const express = require('express');
const reviewRouter = express.Router();
const controller = require('../controllers/reviewController');

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, '../static/img/reviewImage'));
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

reviewRouter.patch('/myreview/:review_id', controller.editReview);

reviewRouter.delete('/myreview/:review_id', controller.deleteReview);

reviewRouter.post('/usefulness/:review_id', controller.recommendReview);

reviewRouter.delete('/usefulness/:review_id', controller.unrecommendReview);

reviewRouter.get('/myreview', controller.getMyReviews);

reviewRouter.get('/:restaurant_id', controller.getAllReviews);

reviewRouter.post(
  '/:restaurant_id',
  uploadDetail.array('imageFiles'),
  controller.postReview,
);

module.exports = reviewRouter;
