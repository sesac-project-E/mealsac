const {User, Restaurant} = require("../models")

exports.getIndex = (req, res) => {
  res.render("index")
}

exports.getRestaurant = (req, res) => {
  const {restaurant_id} = req.params
  Restaurant.findOne({
    include : [{
      model : User,
      attributes : ["user_name"]
      }],
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


