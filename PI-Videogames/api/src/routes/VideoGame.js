const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { VideoGame, Genders } = require("../db.js");
const router = Router();

router.get("/videogames", async (req, res, next) => {
  res.send("estoy en videoGames");
});

module.exports = router;
