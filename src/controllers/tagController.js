const { Tag, Restaurant, TagRestaurant } = require("../models")
const {Op} = require('sequelize')

exports.getAllTags = (req, res) => {
  Tag.findAll()
  .then((response) => {
    res.send(response)
  })
}

exports.getRestaurantsByTag = async (req, res) => {
  const tags = req.query
  const tagIds = []
  for (let [k, v] of Object.entries(tags)) {
    try {
      await Tag.findOne({
        where : {tag_name_eng : v}
      })
      .then((response) => {
        const id = response.dataValues.tag_id ? response.dataValues.tag_id : -1
        tagIds.push({"tag_id" : id})
      })
    } catch (error) {
      res.redirect("/badpage")
      return ;
    }
  }
  Restaurant.findAll({
    attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
    include: [{
        model : Tag,
        where : {
          [Op.or] : [...tagIds]
        },
      },
    ],
  })
  .then((response) => {
    response = response.filter((item) => {
      return item.Tags.length == tagIds.length
    })
    res.send(response)
  })
  .catch(() => {
    res.status(500).send("알 수 없는 에러")
  })
}
// exports.getTagRestaurant = (req, res) => {
//   const {tag} = req.params
//   tagModels.findOne({
//     where : {tag_name : tag}
//   })
//   .then((response) => {
//     const tagId = response.dataValues.id
//     tagRestaurantModels.findAll({
//       where : {tag_id : tagId}
//     })
//     .then((response) => {
//       res.send(response.dataValues)
//     })
//   })
// }