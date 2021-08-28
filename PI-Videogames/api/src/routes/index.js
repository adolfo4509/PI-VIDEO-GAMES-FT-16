const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRoutes = require("./VideoGame");
const genresRoutes = require("./Genres");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGameRoutes);
router.use("/genres", genresRoutes);

module.exports = router;
