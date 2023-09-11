const {userModels, LikeRestaurant} = require("../models")

exports.postLike = (req, res) => {
  const {user_id, restaurant_id} = req.body
  LikeRestaurant.create({
    id : user_id,
    restaurant_id : restaurant_id
  })
  .then(() => {
    res.status(201).send()
  })
  .catch(() => {
    res.status(400).send("이미 삭제되었습니다.")
  })
}

exports.deleteLike = (req, res) => {
  const {user_id, restaurant_id} = req.body
  LikeRestaurant.destroy({
    where : {
      id : user_id, 
      restaurant_id : restaurant_id
    }
  })
  .then(() => {
    res.status(204).send()
  })
  .catch(() => {
    res.status(400).send()
  })
}