require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
//const { platform } = require("os");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

let sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genres, Platforms, Image } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Videogame.belongsToMany(Genres, { through: "VideoGame_Genres" });
Genres.belongsToMany(Videogame, { through: "VideoGame_Genres" });
Videogame.belongsToMany(Platforms, { through: "VideoGame_Plataforms" });
Platforms.belongsToMany(Videogame, { through: "VideoGame_Plataforms" });

// Platforms.hasOne(Videogame, {
//   foreignKey: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });
// Videogame.belongsTo(Platforms);

Videogame.hasMany(Image, {
  foreignKey: {
    name: "image_Videogame",
  },
});
Image.belongsTo(Videogame, {
  foreignKey: {
    name: "image_Videogame",
  },
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Videogame,
  Genres,
  Platforms,
  Image,
};
