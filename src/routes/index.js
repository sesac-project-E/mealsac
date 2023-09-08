const express = require('express');
const router = express.Router();
const restaurantRouter = require("./restaurantRouter.js")

router.use("/restaurant", restaurantRouter)

module.exports = router;
