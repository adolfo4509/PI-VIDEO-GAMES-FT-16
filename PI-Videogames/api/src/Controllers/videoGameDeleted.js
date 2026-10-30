const { Videogame } = require("../db");

const deleteVideoGame = async (id) => {
  try {
    const videoGameDeleted = await Videogame.findByPk(id);
    if (!videoGameDeleted) {

      return { message: "Videogame not found" };
    } else {
      await videoGameDeleted.destroy();
      return { message: "VideoGame eliminado exitósamente" };
    }
  } catch (error) {

    return { message: "Error al eliminar el VideoGame" };
  }
};

module.exports = deleteVideoGame;