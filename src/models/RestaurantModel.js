const RestaurantModel = (sequelize, Datatypes) => {
  const Restaurant = sequelize.define("Restaurant", {
    restaurant_id : {
      type : Datatypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    restaurant_name : {
      type : Datatypes.STRING(256),
      allowNull : false,
    },
    restaurant_likes : {
      type : Datatypes.INTEGER,
      default : 0,
    },
    restaurant_phone : {
      type : Datatypes.STRING(256),
    },
    restaurant_address: {
      type : Datatypes.STRING(256),
    }    
  }, {
    tableName : "Restaurant",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  });
  return Restaurant;
};
module.exports = RestaurantModel;