// const Comment = require('moment');
// visitor 모델 정의

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

  //   model.prototype.dateFormat = date => {
  //     //moment 라이브러리를 이용하여 원하는 포맷으로 날짜 리턴
  //     return moment(date).format('YYYY-MM-DD %H%i%s');
  //   };

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
