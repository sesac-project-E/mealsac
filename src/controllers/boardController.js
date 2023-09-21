const { Post, User, ReviewImage } = require('../models'); //Post, User모델 참조

//공지게시판조회
exports.getNotice = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10); // 여기에 추가

    const response = await Post.findAndCountAll({
      limit: 10,
      offset: 10 * (page - 1),
      where: { board_id: 1 },
      include: [
        {
          model: ReviewImage,
          attributes: ['image_url'],
        },
        {
          model: User,
          required: true,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (response.rows.length === 0) {
      return res.send({ rows: [], count: 0 });
    }
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

//자유게시판조회
exports.getFree = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10); // 여기에 추가

    const response = await Post.findAndCountAll({
      limit: 10,
      offset: 10 * (page - 1),
      where: { board_id: 2 },
      include: [
        {
          model: User,
          required: true,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (response.rows.length === 0) {
      throw Error();
    }
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};
