const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("genres", {
    genres: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
};
