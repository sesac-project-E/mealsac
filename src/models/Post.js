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
        type: Datatypes.STRING(100),
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
        type: Datatypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Datatypes.DATE,
        allowNull: false,
      },
      views: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
  return Post;
};
