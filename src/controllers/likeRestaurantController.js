const {userModels, LikeRestaurant} = require("../models")

exports.postLike = (req, res) => {
  const {user_id, restaurant_id} = req.body
  LikeRestaurant.create({
   restaurant_id : restaurant_id,
   id : user_id
  })
  .then(() => {
    res.status(201).send()
  })
}


exports.deleteLike = (req, res) => {
  const {userId, restaurantId} = req.body
  LikeRestaurant.destroy({
    where : {user_id : userId, restaurant_id : restaurantId}
  })
  .then(() => {
    res.status(204).send()
  })
}