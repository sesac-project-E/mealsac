const express = require('express');
const router = express.Router();
const userRouter = require("./user.js")
const restaurantRouter = require("./restaurantRouter.js")
const restaurantTypeRouter = require("./restaurantTypeRouter.js")
const reviewRouter = require("./reviewRouter.js")
const likeRestaurantRouter = require("./likeRestaurantRouter.js")


router.use("/user", userRouter)
router.use("/restaurant", restaurantRouter)
router.use("/restaurant_type", restaurantTypeRouter)
router.use("/review", reviewRouter)
router.use("/like", likeRestaurantRouter)

module.exports = router;
