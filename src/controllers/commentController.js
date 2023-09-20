const {User, Post, Comment} = require('../models')


exports.createComment = (req, res) => {
  const {id} = req.session.userInfo
  const {post_id, content} = req.body
  if (!id || !post_id || !content) {
    res.status(400).send()
  }
  Comment.create({
    user_id : id,
    post_id : post_id,
    content : content
  })
  .then(() => {
    res.send("잘 생성되었습니다.")
  })
  .catch((error) => {
    console.log(error)
  })
}

exports.updateComment = (req, res) => {
  const {comment_id, content} = req.body
  Comment.update({content : content}, {
    where : {comment_id : comment_id}
  })
  .then(() => {
    res.send("잘 수정되었습니다.")
  })
  .catch((error) => {
    console.log(error)
  })
}

exports.deleteComment = (req, res) => {
  const {comment_id} = req.body
  Comment.destroy({
    where : {comment_id : comment_id}
  })
  .then(() => {
    res.send("잘 삭제되었습니다.")
  })
  .catch((error) => {
    console.log(error)
  })
}