const {User, Tag, Restaurant, TagRestaurant, LikeRestaurant } = require("../models")
const {Op} = require('sequelize')

exports.getAllTags = (req, res) => {
  Tag.findAll()
  .then((response) => {
    res.send(response)
  })
}

exports.getRestaurantsByTag = async (req, res) => { 
  try {
    const {id} = (req.session && req.session.userInfo) ? req.session.userInfo : 0
    const tags = req.query
    const tagIds = []
    let page;
    for (let [k, v] of Object.entries(tags)) {
      try {
        console.log(k,v)
        if (k === "page") {
          page = v
          continue
        }
        await Tag.findOne({
          where : {tag_name_eng : v}
        })
        .then((response) => {
          const id = response.dataValues.tag_id ? response.dataValues.tag_id : -1
          tagIds.push({"tag_id" : id})
        })
      } catch (error) {
        res.status(400).send()
        return ;
      }
    }
    if (page > 0) { 
      Restaurant.findAndCountAll({
        attributes : ["restaurant_id", "restaurant_name", "likes_count", "reviews_count", "rating"],
        include: [{
            model : Tag,
            where : {
              [Op.or] : [...tagIds]
            },
          },
          { 
            model : User,
            where : {id : (id ? id : 0)},
            required : false,
          },
        ],
        order : [
          ['rating', 'DESC'],
          ['likes_count', 'DESC'],
          ['reviews_count', 'DESC'],
        ],
      })
      .then((response) => {
        rows = response.rows.filter((item) => {
          return item.Tags.length === tagIds.length
        })
        const count = rows.length
        rows = rows.slice(20 * (page - 1), 20 * (page - 1) + 20)
        res.send({rows: rows, count : count})
      })
    } else {
      res.status(400).send("올바르지 않은 페이지 번호입니다.")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("알 수 없는 에러")
  }
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