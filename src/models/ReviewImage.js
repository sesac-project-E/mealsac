module.exports = (sequelize, DataTypes) => {
  const ReviewImage = sequelize.define(
    'ReviewImage',
    {
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Review',
          key: 'review_id',
        },
      },
      image_url: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'ReviewImage',
      freezeTableName: true,
    },
  );

  ReviewImage.associate = models => {
    ReviewImage.belongsTo(models.Review, {
      foreignKey: 'review_id',
      targetKey: 'review_id',
      onDelete: 'CASCADE',
    });
  };

  return ReviewImage;
};
