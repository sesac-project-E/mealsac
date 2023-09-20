const { Post, User, Board } = require('../models');

exports.getNotice = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;

    console.log('**************공지게시판 요청이 맞습니다***********');
    const response = await Post.findAndCountAll({
      // attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit: 20,
      offset: 20 * (page - 1),
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
        {
          model: Post,
          attributes: ['title', 'createdAt'],
          limit: 1,
        },
      ],
    });

    if (response.rows.length === 0) {
      throw Error();
    }
    // res.send(response);
    return response;
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

exports.getFree = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};
