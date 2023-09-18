const {Restaurant, Menu} = require('../models')
const {Op} = require('sequelize')

exports.searchMenu = (req, res) => {
  try {
    const { q, page } = req.query
    Menu.findAndCountAll({
      include : [
        {
          model : Restaurant,
        }
      ],
      limit : 20,
      offset : 20 * (page - 1),
      where : {
        menu_name : {
          [Op.like] : `%${q}%`
        }
      }
    })
    .then((response) => {
      res.send(response)
    })
  } catch {
    res.status(500).send()
  }
}

exports.getRestaurantMenu = (req, res) => {
  const {restaurant_id} = req.params
  Menu.findAll({
    where : {restaurant_id : restaurant_id}
  })
  .then((response) => {
    res.send(response)
  })
}