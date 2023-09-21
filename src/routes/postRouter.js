const path = require('path');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, path.join(__dirname, '../static/img/postImage'));
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//post_id로 개별 포스팅 조회
router.get('/:post_id', postController.getPost);

//게시글 생성
router.post(
  '/create',
  uploadDetail.array('imageFiles'),
  postController.postCreatePost,
);

//게시글 삭제
router.delete('/:post_id', postController.deletePost);

//내 게시글 조회
router.get('/my/post', postController.getMyPosts);

module.exports = router;
