const { Restaurant, User, RestaurantImage } = require('../models');
const { Op } = require('sequelize');

exports.indexPage = async (req, res) => {
  const { id } = req.session && req.session.userInfo ? req.session.userInfo : 0;
  let userLikeRestaurants;
  const recentRestaurants = await Restaurant.findAll({
    where: { restaurant_type_id: { [Op.not]: 14 } },
    order: [['restaurant_id', 'DESC']],
    attributes: [
      'restaurant_id',
      'restaurant_name',
      'likes_count',
      'reviews_count',
      'rating',
    ],
    include: [
      {
        model: RestaurantImage,
        attributes: ['restaurant_image_url'],
        limit: 1,
      },
    ],
    limit: 8,
  });
  const popularRestaurants = await Restaurant.findAll({
    order: [
      ['likes_count', 'DESC'],
      ['rating', 'DESC'],
      ['reviews_count', 'DESC'],
    ],
    attributes: [
      'restaurant_id',
      'restaurant_name',
      'likes_count',
      'reviews_count',
      'rating',
    ],
    include: [
      {
        model: RestaurantImage,
        attributes: ['restaurant_image_url'],
        limit: 1,
      },
    ],
    limit: 8,
  });
  if (id > 0) {
    userLikeRestaurants = await User.findAll({
      where: { id: id },
      attributes: ['id'],
      include: [
        {
          model: Restaurant,
          attributes: [
            'restaurant_id',
            'restaurant_name',
            'likes_count',
            'reviews_count',
            'rating',
          ],
          include: [
            {
              model: RestaurantImage,
              attributes: ['restaurant_image_url'],
              limit: 1,
            },
          ],
        },
      ],
      limit: 8,
    });

    userLikeRestaurants =
      userLikeRestaurants && userLikeRestaurants[0]
        ? userLikeRestaurants[0].Restaurants
        : [];
  }

  const renderData = {
    recentRestaurants: recentRestaurants,
    popularRestaurants: popularRestaurants,
  };

  if (userLikeRestaurants && userLikeRestaurants.length > 0) {
    renderData.userLikeRestaurants = userLikeRestaurants;
  }

  try {
    res.render('index', renderData);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
