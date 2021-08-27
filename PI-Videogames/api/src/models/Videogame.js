const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: { type: DataTypes.UUID, allowNull: false, defaultValue: UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    genres: { type: DataTypes.STRING, allowNull: false },
    platforms: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    rating: { type: DataTypes.STRING, allowNull: true },
    released: { type: DataTypes.STRING, allowNull: true },
  });
};
