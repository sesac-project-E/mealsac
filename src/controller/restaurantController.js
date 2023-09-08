const {RestaurantModel} = require("../models")

exports.getIndex = (req, res) => {
  res.render("index")
}

exports.getRestaurant = (req, res) => {
  const {restaurant_id} = req.params
  RestaurantModel.findOne({
    where : {restaurant_id : restaurant_id}
  })
  .then((response) =>{
    res.send({restaurant : response.dataValues})
  })
}

exports.createRestaurant = (req, res) => {
  const {restaurant_name} = req.body
  restaurantModels.create({
    restaurant_name : restaurant_name
  })
  .then(() => {
    res.send()
  })
}

exports.deleteRestaurant = (req, res) => {
  const {restaurant_id} = req.body
  restaurantModels.destroy({
    where : {restaurant_id : restaurant_id}
  })
  .then(() => {
    res.status(204).send()
  })
}


