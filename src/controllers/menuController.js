const {Restaurant, Menu} = require('../models')
const {Op} = require('sequelize')

exports.searchMenu = (req, res) => {
  const { key } = req.params
  Menu.findAll({
    include : [
      {
        model : Restaurant,
        attributes : ["restaurant_name"]
      }
    ],
    where : {
      menu_name : {
        [Op.like] : `%${key}%`
      }
    }
  })
  .then((response) => {
    res.json({data : response})
  })
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