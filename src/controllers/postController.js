const { User, Post } = require('../models');

exports.getPost = async (req, res) => {
  // [after]
  const { post_id } = req.params;
  const result = await Post.findOne({
    where: { post_id: post_id },
    attributes: [
      'title',
      'content',
      'user_id',
      'board_id',
      'post_id',
      'createdAt',
    ],
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
    ],
  });
  // console.log(result);
  res.send(result);
};

//게시글 작성
exports.postCreatePost = async (req, res) => {
  const { id } =
    req.session && req.session.userInfo ? req.session.userInfo : -1;

  console.log('*************');
  console.log(req); //is_admin조회를 어떻게 할까?????
  console.log('*************');

  //아이디 세션에서 조회후 있으면 if문 실행
  if (req.session.userInfo) {
    const { title, content, board_id, is_admin } = req.body;

    const result = await Post.create({
      title,
      content,
      user_id: id,
      board_id,
    });
    res.json({ result: true, message: '전송 완료!' });
  } else {
    //로그인 되어있지 않으면 false제줄
    res.json({ result: false, message: '현재 로그인되어있지 않습니다.' });
  }
  // res.send({
  //   post_id: result.dataValues.post_id,
  //   user_id: result.dataValues.user_id,
  //   board_id: result.dataValues.board_id,
  //   title: result.dataValues.title,
  //   content: result.dataValues.content,
  //   // createdAt: result.dataValues.createdAt,
  //   // updatedAt: result.dataValues.updatedAt,
  // });
};

exports.deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (post_id) {
      Post.findOne({
        where: { post_id: post_id },
      }).then(response => {
        if (
          response &&
          response.dataValues.user_id === req.session.userInfo.id
        ) {
          Post.destroy({
            where: { post_id: post_id },
          })
            .then(() => {
              res.send('잘 삭제되었습니다.');
            })
            .catch(() => {
              throw Error();
            });
        } else {
          res.status(400).send();
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
