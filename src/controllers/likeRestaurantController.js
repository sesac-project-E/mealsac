const {userModels, likeModels} = require("../models")

exports.postLike = (req, res) => {
  const {user_id, restaurant_id} = req.body
  likeModels.create({
   restaurant_id : restaurant_id,
   user_id : user_id
  })
  .then(() => {
    res.status(201).send()
  })
  
}
exports.deleteLike = (req, res) => {
  const {userId, restaurantId} = req.body
  likeModels.destroy({
    where : {user_id : userId, restaurant_id : restaurantId}
  })
  .then(() => {
    res.status(204).send()
  })
}