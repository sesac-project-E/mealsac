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
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
  User.associate = function (models) {
    User.belongsToMany(models.Restaurant, {
      through: 'LikeRestaurant',
      foreignKey: 'id',
      onDelete: 'CASCADE',
      timestamps: false,
    });
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
      as: 'reviews',
    });
    User.hasMany(models.ReviewUsefulness, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'reviewUsefulness',
    });
    User.belongsToMany(models.Restaurant, {
      through: 'LikeRestaurant',
      as: 'restaurants',
      foreignKey: 'id',
    });
    // User - Board
    // 한명의 유저는 여러개 게시글 업로드 가능 / 게시글 올린 사람 존재
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
    // User - Comment
    // 한명의 유저는 여러개의 댓글 가능 / 댓글 올린 유저 존재
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
