const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "platforms",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
