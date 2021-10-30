const { Router } = require("express");
require("dotenv").config();
const { platfor } = require("./pfunctionPlatforms");

const router = Router();

router.get("/plataforms", async (req, res, next) => {
  try {
    const genresAll = await platfor();
    res.status(200).json(genresAll);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
