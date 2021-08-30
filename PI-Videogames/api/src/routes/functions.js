const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const apiInfo = async () => {
  const urlApi = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const apiInfo = await urlApi.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genres: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
    };
  });
  return apiInfo;
};
const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["genres"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const apiInfoUrl = await apiInfo();
  const dbInfo = await getDbInfo();
  const totalApi = apiInfoUrl.concat(dbInfo);

  return totalApi;
};
module.exports = { apiInfo, getAllInfo };
