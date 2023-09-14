const {Restaurant, RestaurantType} = require("../models")

exports.getTypeRestaurants = (req, res) => {
  const { type } = req.params
  const restaurant_type_eng = type
  RestaurantType.findOne({
    where : {restaurant_type_eng : restaurant_type_eng}
  })
  .then((restaurantTypeRecord) => {
    Restaurant.findAll({
      attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
      where : {restaurant_type_id : restaurantTypeRecord.restaurant_type_id}
    })
    .then((response) => {
      res.send(response)
    })
  })
}
