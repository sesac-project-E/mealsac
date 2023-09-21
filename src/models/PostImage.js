module.exports = (sequelize, Datatypes) => {
  const PostImage = sequelize.define(
    'PostImage',
    {
      restaurant_image_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      restaurant_image_url: {
        type: Datatypes.STRING(2048),
      },
    },
    {
      tableName: 'PostImage',
      freezeTableName: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    },
  );
  PostImage.associate = function (models) {
    PostImage.belongsTo(models.Restaurant, {
      foreignKey: 'restaurant_id',
      allowNull: false,
      onDelete: 'CASCADE',
    });
  };
  return PostImage;
};
