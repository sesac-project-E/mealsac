module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define(
    'PostImage',
    {
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Post',
          key: 'post_id',
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
      tableName: 'PostImage',
      freezeTableName: true,
    },
  );

  PostImage.associate = models => {
    PostImage.belongsTo(models.Post, {
      foreignKey: 'post_id',
      targetKey: 'post_id',
      onDelete: 'CASCADE',
    });
  };

  return PostImage;
};
