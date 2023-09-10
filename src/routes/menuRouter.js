const express = require('express')
const menuRouter = express.Router()
const menuController = require('../controllers/menuController.js')

menuRouter.get('/:search', menuController.searchMenu)



module.exports = menuRouter