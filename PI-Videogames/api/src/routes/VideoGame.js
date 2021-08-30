const { Router } = require("express");
require("dotenv").config();
const { getAllInfo } = require("./functions.js");
const router = Router();

/*
 GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal
*/
router.get("/videogames", async (req, res, next) => {
  const gameAll = await getAllInfo();

  const gameRutaP = await gameAll.map((e) => {
    return {
      name: e.name,
      image: e.image,
      genres: e.genres,
      platforms: e.platforms,
    };
  });

  res.status(200).json(gameRutaP);
});

/*
 GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
*/
router.get("/videogame", async (req, res, next) => {
  const { name } = req.query;
  const gameAll = await getAllInfo();
  let videogameAll = await gameAll.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      genres: e.genres,
    };
  });
  if (name) {
    const gameRutaQ = await videogameAll.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    gameRutaQ.length
      ? res.status(200).send(gameRutaQ)
      : res.status(404).send("Videogame no encontrado, lo sentimos");
  } else {
    res.status(200).send(videogameAll);
  }
});

/*
 GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
*/
router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  const videogameDetail = await getAllInfo();
  const videogameIdParams = videogameDetail.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      genres: e.genres,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms,
      description: e.description,
    };
  });
  if (id) {
    let videogameId = await videogameIdParams.filter(
      (e) => e.id == id.toString()
    );
    videogameId.length
      ? res.status(200).json(videogameId)
      : res.status(404).send("Videogame no encontrado, lo sentimos");
  }
});

/*
 POST /videogame:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos
*/

module.exports = router;
