module.exports = (sequelize, DataTypes) => {
  const ReviewUsefulness = sequelize.define(
    'ReviewUsefulness',
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'review',
          key: 'review_id',
        },
        unique: 'compositeIndex',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
        unique: 'compositeIndex',
      },
      is_useful: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'review_usefulness',
      underscored: true,
      timestamps: false,
    },
  );

  ReviewUsefulness.associate = function (models) {
    ReviewUsefulness.belongsTo(models.Review, {
      foreignKey: 'review_id',
      as: 'review',
    });

    ReviewUsefulness.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return ReviewUsefulness;
};
