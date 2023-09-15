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
  sequelize,
} = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const { formatDate } = require('../utils/formatDate');


exports.getAllRestaurants = async (req, res) => {
  try {
    const {page} = req.params
    const {id} = req.session && req.session.userInfo ? req.session.userInfo : -1
    const response = await Restaurant.findAndCountAll({
      attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit : 20,
      offset : 20 * (page - 1),
      include : [{
        model : User,
        where : {id : (id ? id : 0)},
        required : false,
      }]
    })
    if (response.rows.length === 0)  {
      throw Error()
    }
    res.send(response)
  } catch (error) {
    console.log(error)
    res.redirect('/badpage')
  }
}

exports.getLikeRestaurants = async (req, res) => {
  try {
    const {page} = req.params
    const {id} = req.session && req.session.userInfo ? req.session.userInfo : -1
    const response = await Restaurant.findAndCountAll({
      attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit : 20,
      offset : 20 * (page - 1),
      order : [
        ['likes_count', 'DESC'],
        ['rating', 'DESC'],
        ['reviews_count', 'DESC'],

      ],
      include : [{
        model : User,
        where : {id : (id ? id : 0)},
        required : false,
      }]
    })
    if (response.rows.length === 0)  {
      throw Error()
    }
    res.send(response)
  } catch (error) {
    console.log(error)
    res.redirect('/badpage')
  }
}

exports.getRatingRestaurants = async (req, res) => {
  try {
    const {page} = req.params
    const {id} = req.session && req.session.userInfo ? req.session.userInfo : -1
    const response = await Restaurant.findAndCountAll({
      attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      limit : 20,
      offset : 20 * (page - 1),
      order : [
        ['rating', 'DESC'],
        ['likes_count', 'DESC'],
        ['reviews_count', 'DESC'],
      ],
      include : [{
        model : User,
        where : {id : (id ? id : 0)},
        required : false,
      }]
    })
    if (response.rows.length === 0)  {
      throw Error()
    }
    res.send(response)
  } catch (error) {
    console.log(error)
    res.redirect('/badpage')
  }
}

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
