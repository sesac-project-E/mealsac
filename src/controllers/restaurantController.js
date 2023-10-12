const { Op } = require('sequelize');
const {
  RestaurantType,
  Menu,
  Tag,
  User,
  Restaurant,
  RestaurantImage,
  sequelize,
} = require('../models');
const dotenv = require('dotenv');
dotenv.config();

exports.getAllRestaurants = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;
    const response = await Restaurant.findAndCountAll({
      limit: 20,
      offset: 20 * (page - 1),
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
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

exports.getLikeRestaurants = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;
    const response = await Restaurant.findAndCountAll({
      limit: 20,
      offset: 20 * (page - 1),
      order: [
        ['likes_count', 'DESC'],
        ['rating', 'DESC'],
        ['reviews_count', 'DESC'],
      ],
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
    });
    console.log(response);
    if (response.rows.length === 0) {
      throw Error();
    }
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

exports.getRatingRestaurants = async (req, res) => {
  try {
    const { page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;
    const response = await Restaurant.findAndCountAll({
      limit: 20,
      offset: 20 * (page - 1),
      order: [
        ['rating', 'DESC'],
        ['likes_count', 'DESC'],
        ['reviews_count', 'DESC'],
      ],
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
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
exports.getSearchRestaurantByName = async (req, res) => {
  try {
    const { q, page } = req.query;
    const { id } =
      req.session && req.session.userInfo ? req.session.userInfo : -1;
    const response = await Restaurant.findAndCountAll({
      limit: 20,
      where: {
        restaurant_name: {
          [Op.like]: `%` + `${q}` + `%`,
        },
      },
      offset: 20 * (page - 1),
      order: [
        ['rating', 'DESC'],
        ['likes_count', 'DESC'],
        ['reviews_count', 'DESC'],
      ],
      include: [
        {
          model: User,
          where: { id: id ? id : 0 },
          required: false,
        },
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
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

exports.getSearchDataRestaurantByName = async (req, res) => {
  try {
    const { q } = req.query;
    const response = await Restaurant.findAndCountAll({
      where: {
        restaurant_name: {
          [Op.like]: `%` + `${q}` + `%`,
        },
      },
      order: [
        ['rating', 'DESC'],
        ['likes_count', 'DESC'],
        ['reviews_count', 'DESC'],
      ],
      include: [
        {
          model: RestaurantImage,
          attributes: ['restaurant_image_url'],
          limit: 1,
        },
      ],
    });
    if (response.rows.length === 0) {
      return null;
    }
    const ret = [];
    const data = response['rows'];
    for (let d of data) {
      ret.push(d.dataValues);
    }
    return ret;
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};

exports.getRestaurant = async (req, res) => {
  const { id } = req.session && req.session.userInfo ? req.session.userInfo : 0;
  const { restaurant_id } = req.params;
  const restaurant = await Restaurant.findOne({
    include: [
      {
        model: User,
        where: { id: `${id}` },
        required: false,
      },
      {
        model: Tag,
        attributes: ['tag_id', 'tag_name'],
        required: false,
      },
      {
        model: Menu,
        attributes: ['menu_name', 'menu_price'],
        required: false,
      },
      {
        model: RestaurantType,
        attributes: ['restaurant_type'],
        as: 'restaurant_type',
      },
      {
        model: RestaurantImage,
        attributes: ['restaurant_image_url'],
        required: false,
      },
    ],
    where: { restaurant_id: restaurant_id },
  });
  return restaurant;
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
