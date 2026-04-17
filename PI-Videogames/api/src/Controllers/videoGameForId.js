const axios = require("axios");
const { Videogame, Genres, Platforms, Image } = require("../db");
const { API_KEY } = process.env;

const videoGameForId = async (id) => {
  try {
    const idPeticion = id;
    if (idPeticion.length <= 7) {
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
          genres: e.genres.map((e) => e.name + " "),
          platforms: e.platforms.map((e) => e.platform.name + " "),
          description: e.description
            .replace(/<[^>]*>?/g, "")
            .replace(/(\r\n|\n|\r)/gm, ""),
        };
      });
      return infoId;
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
          const juegosDb = juego.map(
            ({
              name,
              rating,
              released,
              description,
              background_image,
              genres,
              platforms,
            }) => {
              return {
                name,
                rating,
                released,
                description,
                background_image,
                createInDb: true,
                genres: genres.map((e) => e.name + "-"),
                platforms: platforms.map((e) => e.name + " "),
              };
            }
          );

          return juegosDb;
        });
      };

      let videoGDb = await videogameDb();

      return videoGDb;
    }
  } catch (error) {
    return { message: "Videogame not found" };
  }
};
module.exports = { videoGameForId };
