const axios = require("axios");
const { Videogame, Genres, Platforms, Image } = require("../db");
const { API_KEY } = process.env;

const apiInfo = async () => {
  const getVideogamesPromises = [];

  for (let index = 0; index < 10; index++) {
    getVideogamesPromises.push(
      axios.get(
        ` https://api.rawg.io/api/games?key=${API_KEY}&page=${index + 1}`
      )
    );
  }
  const responses = await Promise.all(getVideogamesPromises);
  let results = [];

  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];

    results = [...results, ...element.data.results];
  }
  return results;
};

const getDbInfo = async () => {
  const dbInfo = await Videogame.findAll({
    include: [{ model: Genres }, { model: Platforms }],
  });
  let temp = dbInfo.map((e) => {
    return {
      id: e.dataValues.id,
      image: e.dataValues.background_image,
      rating: e.dataValues.rating,
      name: e.dataValues.name,
      released: e.dataValues.released,
      genres: e.dataValues.genres.map((el) => el.dataValues.name),
      platforms: e.dataValues.platforms.map((el) => el.dataValues.name),
      createInDb: e.dataValues.createInDb,
      descriptions: e.dataValues.description,
    };
  });
  return temp;
};

async function getAllInfo() {
  const infoTotal = await apiInfo();

  let temp = infoTotal.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.background_image,
      rating: e.rating,
      released: e.released,
      genres: e.genres.map((e) => e.name + " "),
      platforms: e.platforms.map((e) => e.platform).map((e) => e.name),
    };
  });

  const dbInfo = await getDbInfo();

  const totalApi = temp.concat(dbInfo).flat();

  return totalApi;
}

const platfor = async () => {
  const plataformas = await apiInfo();
  const plat = plataformas.map((e) => e.platforms).flat();
  const temp = plat.map((e) => e.platform);
  const plataformaFilter = temp.map((e) => e.name);
  const filteredArray = plataformaFilter.filter((ele, pos) => {
    return plataformaFilter.indexOf(ele) == pos;
  });

  //AQUI SACO TODAS LAS PLATAFORMAS
  let platf = filteredArray.map((e) => {
    return { name: e };
  });
  return platf;
};
module.exports = { apiInfo, getAllInfo, platfor, getDbInfo };
