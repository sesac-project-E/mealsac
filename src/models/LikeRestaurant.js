module.exports = (sequelize, Datatypes) => {
  const LikeRestaurant = sequelize.define(
    'LikeRestaurant',
    {},
    {
      freezeTableName: true,
      allowNull: false,
      timestamps: false,
    },
  );

  return LikeRestaurant;
};
