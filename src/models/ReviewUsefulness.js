module.exports = (sequelize, DataTypes) => {
  const ReviewUsefulness = sequelize.define(
    'ReviewUsefulness',
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        primaryKey: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Review',
          key: 'review_id',
        },
        primaryKey: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'review_id'],
        },
      ],
    },
  );

  ReviewUsefulness.associate = function (models) {
    ReviewUsefulness.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    ReviewUsefulness.belongsTo(models.Review, {
      foreignKey: 'review_id',
      targetKey: 'review_id',
      onDelete: 'CASCADE',
    });
  };

  return ReviewUsefulness;
};
