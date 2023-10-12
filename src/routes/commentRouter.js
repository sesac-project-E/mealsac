const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentController');
/**
 * @swagger
 * tags:
 *   name: Comment
 */

commentRouter.post('', commentController.createComment);

commentRouter.put('', commentController.updateComment);

commentRouter.delete('', commentController.deleteComment);

module.exports = commentRouter;
