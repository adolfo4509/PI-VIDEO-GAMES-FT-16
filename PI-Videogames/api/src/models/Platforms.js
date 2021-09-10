const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("paltforms", {
    paltforms: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
  });
};
