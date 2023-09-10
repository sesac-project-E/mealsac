module.exports = (sequelize, Datatypes) => {
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
    // restaurant_likes : {
    //   type : Datatypes.INTEGER,
    //   default : 0,
    // },
    restaurant_phone : {
      type : Datatypes.STRING(256),
    },
    restaurant_address: {
      type : Datatypes.STRING(256),
    },
    restaurant_kakao : {
      type : Datatypes.STRING(1024),
    },
    restaurant_naver : {
      type : Datatypes.STRING(1024)
    }
  }, {
    tableName : "Restaurant",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })

  Restaurant.associate = function(models) {
    // Restaurant.hasMany(models.Review, {
    //   foreignKey : 'review_id',
    //   as : "review"
    // });
    Restaurant.hasMany(models.Tag, {
      foreignKey : "tag_id",
      as : "tag"
    });
    // Restaurant.hasMany(models.RestaurantImage, {
    //   foreignKey : "restaurant_image_id",
    //   as : "restaurant_image"
    // });
    Restaurant.hasOne(models.RestaurantType, {
      as : "restaurant_type",
      foreignKey : "restaurant_type_id",
      
    })
  }
  return Restaurant;
};