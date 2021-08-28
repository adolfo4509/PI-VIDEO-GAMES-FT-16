const axios = require("axios");
const { API_KEY } = process.env;
const { Genres } = require("../db");

const genresInfo = async () => {
  const apiGenresInfo = await axios.get(
    ` https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const infoGenres = await apiGenresInfo.data.results.map((e) =>
    e.genres.map((e) => e.name)
  );

  let temp = [];
  infoGenres.map((e) => {
    if (e) {
      temp = [...temp, ...e];
    }
  });

  temp = [...new Set(temp)].flat().sort();

  temp.map((e) => {
    Genres.findOrCreate({
      where: { genres: e },
    });
  });

  const allGenres = await Genres.findAll();

  return allGenres;
};

module.exports = { genresInfo };
