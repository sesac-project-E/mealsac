const {User, LikeRestaurant} = require("../models")

exports.postLike = async (req, res) => {
  const { id } = req.session.userInfo
  const { restaurant_id } = req.body
  if (!id) {
    res.status(400).send("세션을 체크해주세요")
  }
  if (!restaurant_id) {    
    res.status(400).send("body에 restaurant_id 값이 json으로 저장되어 있는지 체크해주세요")
  }
  const exist = await LikeRestaurant.findOne({
    where : { id : id, restaurant_id : restaurant_id}
  })
  if (exist) {
    res.status(400).send("이미 생성되었습니다.")
  } else {
    LikeRestaurant.create({
      id : id,
      restaurant_id : restaurant_id
    })
    .then(() => {
      res.status(201).send()
    })
    .catch(() => {
      res.status(400).send("유효하지 않은 id나 restaurant_id입니다.")
    })
  }
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