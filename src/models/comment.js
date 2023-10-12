module.exports = (sequelize, Datatypes) => {
  // Sequelize: models/index.js에서 sequelize
  // DataTypes: models/index.js에서 Sequelize
  const Comment = sequelize.define(
    'Comment',
    {
      comment_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Datatypes.TEXT(),
        allowNull: true,
      },
      post_id: {
        type: Datatypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Datatypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'Comment',
      freezeTableName: true,
      timestamps: true, // 모델의 createdAt, updatedAt 컬럼 자동 생성
    },
  );

  Comment.associate = function (models) {
    // 4. User - Comment
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      targetKey: 'post_id',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return Comment;
};
