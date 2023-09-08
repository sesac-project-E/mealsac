const express = require("express")
const restaurantRouter = express.Router()
const restaurantController = require("../controller/restaurantController.js")

restaurantRouter.get("/:restaurant_id", restaurantController.getRestaurant)
restaurantRouter.delete("/:restaurant_id", restaurantController.deleteRestaurant)


module.exports = restaurantRouter