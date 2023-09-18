const {Restaurant, RestaurantType, RestaurantImage} = require("../models")

exports.getTypeRestaurants = (req, res) => {
  try {
    const { type } = req.params
    const { page } = req.query
    const restaurant_type_eng = type
    RestaurantType.findOne({
      where : {restaurant_type_eng : restaurant_type_eng}
    })
    .then((restaurantTypeRecord) => {
      try {
        if (!restaurantTypeRecord) {
          throw Error("존재하지 않는 타입")
        }
        Restaurant.findAndCountAll({
          where : {restaurant_type_id : restaurantTypeRecord.restaurant_type_id},
          order : [
            ['rating', 'DESC'],
            ['likes_count', 'DESC'],
            ['reviews_count', 'DESC'],
          ],
          include : [{
            model : RestaurantImage,
            attributes : ["restaurant_image_url"],
            limit : 1
          }],
          offset : 20 * (page - 1),
          limit : 20
        })
        .then((response) => {
          res.send(response)
        })
      } catch (error) {
        console.log(error)
        res.status(404).send(error.message)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(404).send(error.message)
  }
}
