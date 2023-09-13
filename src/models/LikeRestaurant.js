module.exports = (sequelize, Datatypes) => {
  const LikeRestaurant = sequelize.define("LikeRestaurant", {
  }, {
    freezeTableName : true,
    timestamps : false
  })

  return LikeRestaurant
}
