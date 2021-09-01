const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const apiInfo = async () => {
  const urlApi = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const urlApi2 = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  const urlApi3 = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  const urlApi4 = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  const urlApi5 = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );
  const apiInfo = await urlApi.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genresName: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
      description: e.description,
    };
  });
  const apiInfo2 = await urlApi2.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genresName: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
      description: e.description,
    };
  });
  const apiInf3 = await urlApi3.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genresName: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
      description: e.description,
    };
  });
  const apiInf4 = await urlApi4.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genresName: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
      description: e.description,
    };
  });
  const apiInf5 = await urlApi5.data.results.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genresName: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
      description: e.description,
    };
  });
  const apiInfoTotal = apiInfo
    .concat(apiInfo2)
    .concat(apiInf3)
    .concat(apiInf4)
    .concat(apiInf5);

  return apiInfoTotal;
};
const getDbInfo = async () => {
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
  const apiInfoUrl = await apiInfo();
  const dbInfo = await getDbInfo();
  const totalApi = apiInfoUrl.concat(dbInfo);

  return totalApi;
};
module.exports = { apiInfo, getAllInfo };
