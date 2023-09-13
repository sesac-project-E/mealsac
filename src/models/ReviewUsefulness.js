module.exports = (sequelize, DataTypes) => {
  const ReviewUsefulness = sequelize.define(
    'ReviewUsefulness',
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Review',
          key: 'review_id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ReviewUsefulness',
      indexes: [
        {
          unique: true,
          fields: ['review_id', 'user_id'],
        },
      ],
      hasTrigger: true,
    },
  );

  ReviewUsefulness.associate = function (models) {
    ReviewUsefulness.belongsTo(models.Review, {
      foreignKey: 'review_id',
      as: 'Review',
    });
    ReviewUsefulness.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
    });
  };

  return ReviewUsefulness;
};
