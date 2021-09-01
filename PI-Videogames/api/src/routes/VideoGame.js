const { default: axios } = require("axios");
const { Router } = require("express");
const { Videogame, Genres } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
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
      id: e.id,
      name: e.name,
      image: e.image,
      genresName: e.genres,
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
        genresName: temp.data.genres.map((e) => e.name),
        platforms: temp.data.platforms.map((e) => e.platform.name),
        description: temp.data.description,
      });
    }

    res.status(200).json(nameVideogame);
  } catch (error) {
    console.log(error);
    res.status(404).send("Videogame no encontrado, lo sentimos");
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
  try {
    let infoApiUrl = await axios.get(
      ` https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    const videogameDetail = await infoApiUrl;
    let infoId = [videogameDetail.data].map((e) => {
      return {
        id: e.id,
        name: e.name,
        background_image: e.background_image,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
        description: e.description,
      };
    });
    let videogameDb = async () => {
      return await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["genresName"],
          through: {
            attributes: [],
          },
        },
      });
    };
    const getAllInfo = async () => {
      const apiInfo = await infoId;
      const dbInfo = await videogameDb();
      const totalApi = apiInfo.concat(dbInfo);

      return totalApi;
    };
    let videogameAll = await getAllInfo();
    if (id) {
      let videogameId = await videogameAll.filter((e) => e.id == id.toString());
      videogameId.length;
      res.status(200).json(videogameId);
    }
  } catch (error) {
    res.status(404).send({ mess: "Videogame no encontrado, lo sentimos" });
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
router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    createdInDb,
    genresName,
    platforms,
    image,
  } = req.body;
  try {
    const videogameCreate = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      genresName,
      platforms,
      createdInDb,
    });

    let genresDb = await Genres.findAll({
      where: { genresName: genresName },
      include: {
        model: Videogame,
      },
    });

    videogameCreate.addGenres(genresDb);

    res.status(200).send("Videogame agregado con exito");
  } catch {
    res.status(404).send("verifique los datos");
  }
});
module.exports = router;
