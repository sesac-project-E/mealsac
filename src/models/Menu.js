const Menu = (sequelize, Datatypes) => {
  const Menu = sequelize.define("Menu", {
    menu_id : {
      type : Datatypes.INT,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true
    },
    menu_name : {
      type : Datatypes.STRING(32)
    },
    menu_price : {
      type : Datatypes.INT
    }
  }, {
    tableName : "Menu",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  return Menu
}

exports.module = Menu