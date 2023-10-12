const { Comment } = require('../models');

exports.createComment = (req, res) => {
  try {
    const { id } = req?.session?.userInfo;
    const { post_id, content } = req.body;
    if (!id || !post_id || !content) {
      res.status(400).send();
    }
    Comment.create({
      user_id: id,
      post_id: post_id,
      content: content,
    })
      .then(() => {
        res.send('잘 생성되었습니다.');
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

exports.updateComment = (req, res) => {
  try {
    const { comment_id, content } = req.body;
    if (comment_id && content) {
      Comment.findOne({
        where: { comment_id: comment_id },
      }).then(response => {
        if (
          response.dataValues &&
          response.dataValues.user_id === Number(req.session.userInfo.id)
        ) {
          Comment.update(
            {
              content: content,
            },
            {
              where: { comment_id: comment_id },
            },
          )
            .then(() => {
              res.status(201).send();
            })
            .catch(error => {
              console.log(error);
              res.status(500).send();
            });
        } else {
          res.status(403).send();
        }
      });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.body;
    if (comment_id) {
      Comment.findOne({
        where: { comment_id: comment_id },
      }).then(response => {
        if (
          response.dataValues?.user_id === Number(req.session?.userInfo?.id)
        ) {
          Comment.destroy({
            where: { comment_id: comment_id },
          })
            .then(() => {
              res.send('잘 삭제되었습니다.');
            })
            .catch(() => {
              throw Error();
            });
        } else {
          res.status(400).send('세션에 유저 정보가 없습니다.');
        }
      });
    } else {
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
