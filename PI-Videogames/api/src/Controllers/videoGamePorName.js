const axios = require("axios");
const { Videogame, Genres, Platforms, Image } = require("../db");
const { API_KEY } = process.env;

const videoGameForName = async (name) => {

  try {
    let infoApiUrl = await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    const videogameId = await infoApiUrl.data.results.map(({ id }) => id);

    let nameVideogame = [];
    for (let i = 0; i < videogameId.length; i++) {
      let { data } = await axios.get(
        ` https://api.rawg.io/api/games/${videogameId[i]}?key=${API_KEY}`
      );

      let { name, id, background_image, genres, platforms, rating, released, description } = data;
      nameVideogame.push({
        id: id,
        name: name,
        image: background_image,
        genres: genres.map((e) => e.name + ", "),
        platforms: platforms.map((e) => e.platform.name + ", "),
        rating: rating,
        released: released,
        description: description
          .replace(/<[^>]*>?/g, "")
          .replace(/(\r\n|\n|\r)/gm, ""),
      });
    }

    return nameVideogame
  } catch (error) {

    (error);
  }

}
module.exports = { videoGameForName }
