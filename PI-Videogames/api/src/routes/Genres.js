const { Router } = require("express");
require("dotenv").config();
const { genresInfo } = require("./functionsGenres");
const router = Router();

router.get("/genres", async (req, res, next) => {
  const genresAll = await genresInfo();
  res.status(200).send(genresAll);

  //console.log("dfdfdffdfdf", genresAll);
  //res.sendStatus(200).json(genresAll);
  //res.sendStatus(200).json(genresAll);
});

module.exports = router;
