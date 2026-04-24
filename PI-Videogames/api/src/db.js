require("dotenv").config();
const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

let conn;
let Videogame, Genres, Platforms, Image;

if (isProduction) {
  // MONGODB en producción (Vercel)
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI no está configurada en variables de entorno");
  }

  // Conectar a MongoDB
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB conectado correctamente"))
    .catch((err) => console.error("Error conectando a MongoDB:", err));

  // Importar modelos Mongoose
  Videogame = require("./models/mongoose/Videogame");
  Genres = require("./models/mongoose/Genres");
  Platforms = require("./models/mongoose/Platforms");
  Image = require("./models/mongoose/Image");

  conn = mongoose.connection;
} else {
  // SEQUELIZE en desarrollo (PostgreSQL local)
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

  // Leemos todos los archivos de la carpeta Models (excepto mongoose)
  fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file !== "mongoose" &&
        file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

  // Injectamos la conexion (sequelize) a todos los modelos
  modelDefiners.forEach((model) => model(sequelize));

  // Capitalizamos los nombres de los modelos
  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);

  // Destructuring de modelos
  Videogame = sequelize.models.Videogame;
  Genres = sequelize.models.Genres;
  Platforms = sequelize.models.Platforms;
  Image = sequelize.models.Image;

  // Relaciones Sequelize
  Videogame.belongsToMany(Genres, { through: "VideoGame_Genres" });
  Genres.belongsToMany(Videogame, { through: "VideoGame_Genres" });
  Videogame.belongsToMany(Platforms, { through: "VideoGame_Plataforms" });
  Platforms.belongsToMany(Videogame, { through: "VideoGame_Plataforms" });
  Image.belongsToMany(Videogame, { through: "VideoGame_Image" });
  Videogame.belongsToMany(Image, { through: "VideoGame_Image" });

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

  conn = sequelize;
}

module.exports = {
  conn,
  Videogame,
  Genres,
  Platforms,
  Image,
};
