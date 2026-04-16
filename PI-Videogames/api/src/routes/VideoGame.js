const { default: axios } = require("axios");
const { Router } = require("express");
const { Videogame, Genres, Platforms } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const { getAllInfo } = require("../Controllers/allVideoGames.js");
const { v4: uuidv4 } = require("uuid");
const { videoGameForName } = require("../Controllers/videoGamePorName.js");
const { videoGameForId } = require("../Controllers/videoGameForId.js");
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
    const nameVideogame = await videoGameForName(name);
    res.status(200).send(nameVideogame);
  } catch (error) {
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
  try {
    const videoGameId = await videoGameForId(id);
    res.status(200).send(videoGameId);
  } catch (error) {
    return res.send({ message: "Videogame not found desd el back" });
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

      background_image,
    });
    await videogameCreate.setGenres(genreId);
    await videogameCreate.setPlatforms(platformId);

    res
      .status(200)
      .send({ message: "VideoGame creado exitósamente" });
  } catch (error) {
    next('Este es el error desde el backend metodo post', error);
  }
});

module.exports = router;
