const express = require("express")
const likeRestaurantRouter = express.Router()
const likeRestaurantController = require("../controllers/likeController.js")


likeRestaurantRouter.post("/like", likeRestaurantController.postLike)
likeRestaurantRouter.delete("/like", likeRestaurantController.deleteLike)



module.exports = likeRestaurantRouter