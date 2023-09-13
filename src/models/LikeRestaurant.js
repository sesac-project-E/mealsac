

module.exports = (sequelize, Datatypes) => {
  const likeRestaurant = sequelize.define("likeRestaurant", {
  }, {
    timestamps : false
  })
  return likeRestaurant
}