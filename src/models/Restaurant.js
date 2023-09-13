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
    restaurant_phone : {
      type : Datatypes.STRING(256),
    },
    restaurant_address: {
      type : Datatypes.STRING(256),
    },
    restaurant_location_X : {
      type : Datatypes.STRING(256),
    },
    restaurant_location_Y : {
      type : Datatypes.STRING(256),
    },
    restaurant_kakao : {
      type : Datatypes.STRING(1024),
    },
    restaurant_naver : {
      type : Datatypes.STRING(1024)
    },
    likes_count : {
      type : Datatypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    reviews_count : {
      type : Datatypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    rating: {
      type : Datatypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName : "Restaurant",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })

  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Review, {
      foreignKey : 'restaurant_id',
      allowNull : false
    })
    Restaurant.belongsToMany(models.Tag, {
      through : "TagRestaurant",
      foreignKey : "restaurant_id",
      allowNull : false
    })
    Restaurant.belongsToMany(models.User, {
      through : "LikeRestaurant",
      foreignKey : "restaurant_id",
      allowNull : false
    })
    Restaurant.hasMany(models.RestaurantImage, {
      foreignKey : "restaurant_id",
      allowNull : false
    });
    Restaurant.hasMany(models.Menu, {
      foreignKey : "restaurant_id",
      allowNull : false
    }) 
    Restaurant.belongsTo(models.RestaurantType, {
      foreignKey : "restaurant_type_id",
      allowNull : false,
      as : "restaurant_type",
      allowNull : false
    });
    Restaurant.belongsToMany(models.User, {
      through : "LikeRestaurant",
      allowNull : false,
      foreignKey : "restaurant_id",
      timestamps : false,
      onDelete : "CASCADE",
    });
    Restaurant.hasMany(models.Review, {
      foreignKey : "restaurant_id",
      allowNull : false
    })
  }
  return Restaurant;
};