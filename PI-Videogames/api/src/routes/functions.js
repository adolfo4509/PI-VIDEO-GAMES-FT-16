const axios = require("axios");
const { VideoGames, Genres } = require("../db");
const { API_KEY } = process.env;

const apiInfo = async () => {
  const urlApi = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const apiInfo = await urlApi.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
    };
  });
  return apiInfo;
};
const getDbInfo = async () => {
  return await VideoGames.findAll({
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
  const apiInfo = await getInfo();
  const dbInfo = await getDbInfo();
  const totalApi = apiInfo.concat(dbInfo);

  return totalApi;
};
module.exports = { apiInfo, getAllInfo };
