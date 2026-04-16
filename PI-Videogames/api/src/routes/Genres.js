const { Router } = require("express");
require("dotenv").config();
const { genresInfo } = require("../Controllers/functionsGenres");
const router = Router();

router.get("/genres", async (req, res, next) => {
  const genresAll = await genresInfo();
  res.status(200).send(genresAll);

  
});

module.exports = router;
