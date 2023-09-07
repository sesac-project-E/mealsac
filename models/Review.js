module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurant',
          key: 'restaurants_id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'review',
    },
  );

  Review.associate = function (models) {
    Review.hasMany(models.ReviewImage, {
      foreignKey: 'review_id',
      as: 'images',
    });

    Review.hasMany(models.ReviewUsefulness, {
      foreignKey: 'review_id',
      as: 'usefulnessFlags',
    });
  };

  return Review;
};
