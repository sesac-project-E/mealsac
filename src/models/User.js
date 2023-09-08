module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.TYNYINT(1),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );

  return User;
};
