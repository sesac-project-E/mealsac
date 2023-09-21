const { User, Post } = require('../models');

//post_id 값으로 특정 게시물 조회
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

//내가 작성한 게시물 조회
exports.getMyPosts = async (req, res) => {
  const userInfo = req.session ? req.session.userInfo : null;

  //로그인 안되어 있는경우
  if (!userInfo || !userInfo.id) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;

  try {
    //포스트 제목, 작성날짜, 게시판 종류
    const myPosts = await Post.findAll({
      where: { user_id },
      attributes: ['title', 'content', 'post_id', 'createdAt'],
      //작성날짜 최신순 정렬
      order: [['createdAt', 'DESC']],
    });
    //포스트가 없는 경우
    if (myPosts.length === 0) {
      return res.json({
        status: 'success',
        message: '사용자가 작성한 포스트가 없습니다.',
        data: [],
      });
    }
    //내 게시물 전송
    res.send(myPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '포스트를 가져오는 동안 오류가 발생했습니다.',
    });
  }
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

// 본인포스팅 삭제 or 관리자가 특정포스팅 삭제
exports.deletePost = async (req, res) => {
  console.log(req.session.userInfo);
  const userInfo = req.session ? req.session.userInfo : null;

  if (!userInfo || (!userInfo.id && !userInfo.isAdmin)) {
    return res.status(400).json({
      status: 'error',
      message: '세션에서 사용자 정보를 찾을 수 없습니다.',
    });
  }

  const user_id = userInfo.id;

  //포스트 아이디를 파라미터로 가져와서 삭제
  const { post_id } = req.params;

  try {
    const post = await Post.findOne({
      where: { post_id },
    });

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: '해당 포스팅을 찾을 수 없습니다.',
      });
    }

    // 리뷰 작성자 또는 관리자만 리뷰를 삭제할 수 있도록 함
    if (post.user_id !== user_id && !userInfo.isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: '리뷰를 포스팅을 삭제할 권한이 없습니다.',
      });
    }

    await post.destroy();

    res.json({
      status: 'success',
      message: '포스팅이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: '포스팅을 삭제하는 동안 오류가 발생했습니다.',
    });
  }
};
