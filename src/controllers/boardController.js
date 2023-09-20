const { Post, User } = require('../models'); //Post, User모델 참조

//공지게시판조회
exports.getNotice = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;

    //공지글 20개 단위 페이지네이션
    const response = await Post.findAndCountAll({
      // attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit: 20,
      offset: 20 * (page - 1),
      where: { board_id: 1 },
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
      ],
      //최근 작성된 게시글이 맨위로 오도록함
      order: [['createdAt', 'DESC']],
    });

    //만약 조회된 글이 없다면 에러 발생
    if (response.rows.length === 0) {
      throw Error();
    }
    res.send(response);
    // return response;
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

//자유게시판조회
exports.getFree = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;

    //자유글 20개 단위 페이지네이션
    const response = await Post.findAndCountAll({
      // attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit: 20,
      offset: 20 * (page - 1),
      //2가 자유게시판 아이디
      where: { board_id: 2 },
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
      ],
      //최근 작성된 게시글이 맨위로 오도록함
      order: [['createdAt', 'DESC']],
    });
    //만약 조회된 글이 없다면 에러 발생
    if (response.rows.length === 0) {
      throw Error();
    }
    res.send(response);
    // return response;
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};
