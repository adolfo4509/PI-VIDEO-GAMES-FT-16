const { default: axios } = require("axios");
const { Router } = require("express");
const { Videogame, Genres, Platforms } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const { getAllInfo } = require("./functions.js");
const { v4: uuidv4 } = require("uuid");
const router = Router();

router.get("/videogames", async (req, res, next) => {
  const gameAll = await getAllInfo();
  res.status(200).send(gameAll);
});

/*
 GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
*/
router.get("/videogame/:name", async (req, res, next) => {
  const { name } = req.params;

  try {
    let infoApiUrl = await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    const videogameId = await infoApiUrl.data.results.map((e) => e.id);

    let nameVideogame = [];
    for (let i = 0; i < videogameId.length; i++) {
      let temp = await axios.get(
        ` https://api.rawg.io/api/games/${videogameId[i]}?key=${API_KEY}`
      );
      nameVideogame.push({
        id: temp.data.id,
        name: temp.data.name,
        image: temp.data.background_image,
        genres: temp.data.genres.map((e) => e.name + ", "),
        platforms: temp.data.platforms.map((e) => e.platform.name + ", "),
        rating: temp.data.rating,
        released: temp.data.released,
        description: temp.data.description
          .replace(/<[^>]*>?/g, "")
          .replace(/(\r\n|\n|\r)/gm, ""),
      });
    }

    res.status(200).send(nameVideogame);
  } catch (error) {
    console.log("hola mnudo desde el back", error);
    next(error);
  }
});

/*
 GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
*/
router.get("/videogames/:id", async (req, res, next) => {
  const { id } = req.params;

  const idPeticion = id;
  if (idPeticion.length <= 4) {
    let infoApiUrl = await axios.get(
      ` https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    const videogameDetail = infoApiUrl;
    let infoId = [videogameDetail.data].map((e) => {
      return {
        id: e.id,
        name: e.name,
        background_image: e.background_image,
        released: e.released,
        rating: e.rating,
        genres: e.genres.map((e) => e.name),
        platforms: e.platforms.map((e) => e.platform.name),
        description: e.description
          .replace(/<[^>]*>?/g, "")
          .replace(/(\r\n|\n|\r)/gm, ""),
      };
    });

    res.status(200).send(infoId);
  } else {
    let videogameDb = async () => {
      return await Videogame.findAll({
        include: [
          {
            model: Genres,
          },

          {
            model: Platforms,
          },
        ],
        where: {
          id: id,
        },
      }).then((juego) => {
        const juegosDb = juego.map((e) => {
          return {
            name: e.name,
            rating: e.rating,
            released: e.released,
            description: e.description,
            background_image: e.background_image,
            createInDb: true,
            genres: e.genres.map((e) => e.name),
            platforms: e.platforms.map((e) => e.name),
          };
        });

        return juegosDb;
      });
    };

    let videoGDb = await videogameDb();
    res.status(200).send(videoGDb);
  }
});

/*
 POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos
 Un formulario controlado con los siguientes campos
    Nombre
    Descripción
    Fecha de lanzamiento
    Rating
** Posibilidad de seleccionar/agregar varios géneros
** Posibilidad de seleccionar/agregar varias plataformas
*/
router.post("/videogame", async (req, res, next) => {
  const {
    name,
    description,
    released,
    rating,
    createdInDb,
    genreId,
    platformId,
    background_image,
  } = req.body;

  try {
    const videogameCreate = await Videogame.create({
      id: uuidv4(),
      name,
      description,
      released,
      rating,
      genreId,
      platformId,
      createdInDb,
      background_image,
    });
    await videogameCreate.setGenres(genreId);
    await videogameCreate.setPlatforms(platformId);

    res.status(200).send({ message: "Video creado exitosamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
