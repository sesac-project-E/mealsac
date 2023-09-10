const {Menu} = require('../models')
const {Op} = require('sequelize')

exports.index = (req, res) => {
  res.send("1")
}
exports.searchMenu = (req, res) => {
  const {search} = req.params
  console.log(search)
  Menu.findAll({
    where : {
      menu_name : {
        [Op.like] : `%${search}%`
      }
    }
  })
  .then((response) => {
    res.send(response)
  })
}