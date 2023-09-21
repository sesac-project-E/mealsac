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

router.post('/uploadImg', uploadDetail.single('imageFiles'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '이미지 업로드에 실패했습니다.' });
  }

  const imageUrl = `/static/img/postImage/${req.file.filename}`;
  res.json({
    uploaded: true,
    url: imageUrl,
  });
});

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
