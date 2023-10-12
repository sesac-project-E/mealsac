module.exports = (sequelize, Datatypes) => {
  // Sequelize: models/index.js에서 sequelize
  // DataTypes: models/index.js에서 Sequelize
  const Post = sequelize.define(
    'Post',
    {
      post_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      board_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: Datatypes.TEXT(),
        allowNull: false,
      },
    },
    {
      tableName: 'Post',
      freezeTableName: true,
      timestamps: true,
    },
  );

  Post.associate = function (models) {
    // Board - post
    // 포스트는 보드에 속해있음

    Post.belongsTo(models.Board, {
      foreignKey: 'board_id',
      targetKey: 'board_id',
      onDelete: 'CASCADE',
    });
    // user - post
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
    Post.hasMany(models.PostImage, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });
  };
  return Post;
};
