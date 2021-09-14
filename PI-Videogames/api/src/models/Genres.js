const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("genres", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });
};
