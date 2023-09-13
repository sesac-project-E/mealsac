const {ReviewUsefulness, ReviewImage, RestaurantType, Menu, Review, Tag, User, Restaurant} = require("../models")

exports.getRestaurant = (req, res) => {
  const {restaurant_id} = req.params
  Restaurant.findOne({
    include : [
    {
      model : User,
      attributes : ["user_name"]
    },
    {
      model : Tag,
      attributes : ["tag_id", "tag_name"]
    },
    {
      model : Review,
      attributes : ["review_id", "user_id", "rating", "title", "updatedAt"],
      order: [
        ['updatedAt', 'DESC']
      ],
      include : [
        {
          model : ReviewImage,
          as : "image_id",
          limit : 1
        },
      ]
    },
    {
      model : Menu,
      attributes : ["menu_name", "menu_price"]
    }
  ],
    where : {restaurant_id : restaurant_id},
  })
  .then((restaurant) => {
    res.send(restaurant)
  })
}

exports.createRestaurant = (req, res) => {
  const {restaurant_name} = req.body
  restaurant.create({
    restaurant_name : restaurant_name
  })
  .then(() => {
    res.send()
  })
}

exports.deleteRestaurant = (req, res) => {
  const {restaurant_id} = req.body
  restaurant.destroy({
    where : {restaurant_id : restaurant_id}
  })
  .then(() => {
    res.status(204).send()
  })
}


