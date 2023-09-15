const { Sequelize } = require('sequelize');
const {
  ReviewUsefulness,
  ReviewImage,
  RestaurantType,
  Menu,
  Review,
  Tag,
  User,
  Restaurant,
} = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const { formatDate } = require('../utils/formatDate');

exports.getRestaurant = (req, res) => {
  const { restaurant_id } = req.params;
  Restaurant.findOne({
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      {
        model: Tag,
        attributes: ['tag_id', 'tag_name']
      },
      {
        model: Review,
        attributes: ['review_id', 'user_id', 'rating', 'content', 'updatedAt'],
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: ReviewImage,
            // as : "image_id",
            limit: 1,
          },
        ],
      },
      {
        model: Menu,
        attributes: ['menu_name', 'menu_price'],
      },
      {
        model: RestaurantType,
        attributes: ["restaurant_type"],
        as : "restaurant_type"
      }
    ],
    where: { restaurant_id: restaurant_id },
  }).then(restaurant => {
    res.render('restaurantDetail/index', {
      restaurant,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });
  });
};

exports.createRestaurant = (req, res) => {
  const { restaurant_name } = req.body;
  restaurant
    .create({
      restaurant_name: restaurant_name,
    })
    .then(() => {
      res.send();
    });
};

exports.deleteRestaurant = (req, res) => {
  const { restaurant_id } = req.body;
  restaurant
    .destroy({
      where: { restaurant_id: restaurant_id },
    })
    .then(() => {
      res.status(204).send();
    });
};
