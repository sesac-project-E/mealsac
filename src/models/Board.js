module.exports = (Sequelize, DataTypes) => {
  // Sequelize: models/index.js에서 sequelize
  // DataTypes: models/index.js에서 Sequelize
  const Board = Sequelize.define(
    'Board',
    {
      board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      board_type: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
    },
    {
      tableName: 'Board', // 실제 db 테이블명
      freezeTableName: true, // 테이블명 고정 (모델 이름 테이블로 바꿀 때 복수형으로 바뀜)
      timestamps: false,
    },
  );
  Board.associate = function (models) {
    // 8. Board - Comment
    // 하나의 게시판에는 여러개의 post 가능
    Board.hasMany(models.Post, {
      foreignKey: 'board_id',
      sourceKey: 'board_id',
      onDelete: 'CASCADE',
    });
  };
  return Board;
};
