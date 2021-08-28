const { Router } = require("express");
require("dotenv").config();
const { genresInfo } = require("./functionsGenres");
const router = Router();

router.get("/genres", async (req, res, next) => {
  const genresAll = await genresInfo();
  res.status(200).json(genresAll);
});

module.exports = router;
