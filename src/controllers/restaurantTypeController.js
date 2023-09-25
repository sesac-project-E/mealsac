const {Restaurant, RestaurantType, RestaurantImage, User} = require("../models")

exports.getTypeRestaurants = (req, res) => {
  try {
    const { type } = req.params
    const {id} = req.session && req.session.userInfo ? req.session.userInfo : -1
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
          include : [
            {
            model : RestaurantImage,
            attributes : ["restaurant_image_url"],
            limit : 1
            },
            {
              model: User,
              where : {id : (id ? id : 0)},
              required : false
            },
          ],
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
