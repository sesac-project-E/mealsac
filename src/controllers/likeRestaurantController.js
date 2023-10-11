const {
  LikeRestaurant,
  User,
  Restaurant,
  RestaurantImage,
} = require('../models');

exports.postLike = async (req, res) => {
  try {
    const { id } = req.session.userInfo;
    const { restaurant_id } = req.body;
    if (!id) {
      res.status(400).send('세션을 체크해주세요');
    }
    if (!restaurant_id) {
      res
        .status(400)
        .send(
          'body에 restaurant_id 값이 json으로 저장되어 있는지 체크해주세요',
        );
    }
    const exist = await LikeRestaurant.findOne({
      where: { id: id, restaurant_id: restaurant_id },
    });
    if (exist) {
      res.status(400).send('이미 생성되었습니다.');
    } else {
      LikeRestaurant.create({
        id: id,
        restaurant_id: restaurant_id,
      })
        .then(async () => {
          let likes_count = await Restaurant.findOne({
            attributes: ['likes_count'],
            where: { restaurant_id: restaurant_id },
          });
          likes_count = likes_count.dataValues.likes_count;
          Restaurant.update(
            { likes_count: likes_count + 1 },
            { where: { restaurant_id: restaurant_id } },
          );
          res.status(201).send('잘 생성되었습니다.');
        })
        .catch(() => {
          res.status(400).send('유효하지 않은 id나 restaurant_id입니다.');
        });
    }
  } catch {
    res.status(500).send('알 수 없는 에러');
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { id } = req.session.userInfo;
    const { restaurant_id } = req.body;
    if (!id) {
      res.status(400).send('세션을 체크해주세요');
    }
    if (!restaurant_id) {
      res
        .status(400)
        .send(
          'body에 restaurant_id 값이 json으로 저장되어 있는지 체크해주세요',
        );
    }
    const exist = await LikeRestaurant.findOne({
      where: { id: id, restaurant_id: restaurant_id },
    });
    if (!exist) {
      res
        .status(400)
        .send(
          '테이블에 존재하지 않습니다. 이미 지워졌거나, 올바르지 않은 id나 restaurant_id일수도 있습니다.',
        );
    } else {
      LikeRestaurant.destroy({
        where: {
          id: id,
          restaurant_id: restaurant_id,
        },
      })
        .then(async () => {
          let likes_count = await Restaurant.findOne({
            attributes: ['likes_count'],
            where: { restaurant_id: restaurant_id },
          });
          likes_count = likes_count.dataValues.likes_count;
          Restaurant.update(
            { likes_count: likes_count - 1 },
            { where: { restaurant_id: restaurant_id } },
          );
          res.send('성공적으로 제거하였습니다.');
        })
        .catch(() => {
          res.status(500).send('알 수 없는 에러');
        });
    }
  } catch {
    res.status(500).send('알 수 없는 에러');
  }
};
exports.getUserLikes = async (req, res) => {
  const { id } =
    req.session && req.session.userInfo ? req.session.userInfo : -1;
  if (id > 0) {
    const response = await Restaurant.findAll({
      include: [
        {
          model: User,
          where: { id: id },
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
    });
    const ret = [];
    for (let [k, v] in Object.entries(response)) {
      ret.push(response[k].dataValues);
    }
    return ret.slice(0);
  } else {
    res.send('session에 저장된 정보가 없습니다.').status(400);
  }
};

exports.getMyPageUserLikes = async (req, res) => {
  const { id } =
    req.session && req.session.userInfo ? req.session.userInfo : -1;
  if (id > 0) {
    const response = await Restaurant.findAll({
      include: [
        {
          model: User,
          where: { id: id },
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
    });
    const ret = [];
    for (let [k, v] in Object.entries(response)) {
      ret.push(response[k].dataValues);
    }
    return ret
  } else {
    res.send('session에 저장된 정보가 없습니다.').status(400);
  }
};