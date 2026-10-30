const axios = require("axios");
const { API_KEY } = process.env;
const { Genres } = require("../db");

const genresInfo = async () => {
  const apiGenresInfo = await axios.get(
    ` https://api.rawg.io/api/genres?key=${API_KEY}`
  );

  const infoGenres = await apiGenresInfo.data.results.map((e) => {
    return { id: e.id, name: e.name };
  });
 
  
  const consultDb = await Genres.find({});

  if (consultDb.length === 0) {
    await Genres.insertMany(infoGenres);
  }

  return infoGenres;
};

module.exports = { genresInfo };
