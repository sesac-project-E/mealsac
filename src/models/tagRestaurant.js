module.exports = (sequelize, dataTypes) => {
  const TagRestaurant = sequelize.define("TagRestaurant", {

  }, {
    freezeTableName : true,
    timestamps : false
  })
  return TagRestaurant
}
