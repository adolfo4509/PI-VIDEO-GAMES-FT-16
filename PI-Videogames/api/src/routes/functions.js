const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const apiInfo = async () => {
  const urlApi = async () => {
    return await axios.get(` https://api.rawg.io/api/games?key=${API_KEY}`);
  };
  const urlApi2 = async () => {
    return await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&page=2`
    );
  };
  const urlApi3 = async () => {
    return await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    );
  };
  const urlApi4 = async () => {
    return await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&page=4`
    );
  };
  const urlApi5 = async () => {
    return await axios.get(
      ` https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    );
  };
  let infoTotal = Promise.all([
    urlApi(),
    urlApi2(),
    urlApi3(),
    urlApi4(),
    urlApi5(),
  ]).then((resp) => {
    resp.map((e) => {
      e.data;
    });
    return resp;
  });

  return infoTotal;
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
  const infoTotal = await apiInfo();
  let temp = await infoTotal.map((e) => {
    return e.data.results.map((e) => {
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
  });

  const dbInfo = await getDbInfo();
  const totalApi = temp.concat(dbInfo).flat();

  return totalApi;
};
const platfor = async () => {
  const plataformas = await apiInfo();
  const plat = plataformas.map((e) => e.data.results).flat();
  const platas = plat.map((e) => e.platforms).flat();
  const ultima = platas.map((e) => {
    return e.platform.name;
  });

  //AQUI SACO TODAS LAS PLATAFORMAS

  let tempoPlatf = [...new Set(ultima)].sort();
  let platf = await tempoPlatf.map((e) => {
    return { platforms: e };
  });

  return platf;
};
module.exports = { apiInfo, getAllInfo, platfor };
