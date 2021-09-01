const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("genres", {
    genresName: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
};
