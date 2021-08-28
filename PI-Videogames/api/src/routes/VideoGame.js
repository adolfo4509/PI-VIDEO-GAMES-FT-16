const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const apiInfo = require("./functions.js");
const { VideoGame, Genders } = require("../db.js");
const router = Router();

router.get("/videogames", async (req, res, next) => {
  const gameAll = await apiInfo();

  res.status(200).json(gameAll);
  console.log("==>", gameAll);
});

module.exports = router;
