const { Platforms } = require("../db");
const { apiInfo } = require("./functions");

const platfor = async () => {
  const plataformas = await apiInfo();
  const plat = plataformas.map((e) => e.platforms).flat();
  const temp = plat
    .map((e) => e.platform)
    .map((e) => {
      return {
        id: e.id,
        name: e.slug,
      };
    });
  function filtrarArraySinRepetir(array, idKey) {
    const elementosVistos = {};
    return array.filter((elemento) => {
      if (!elementosVistos[elemento[idKey]]) {
        elementosVistos[elemento[idKey]] = true;
        return true;
      }
      return false;
    });
  }
  const arrayFiltrado = filtrarArraySinRepetir(temp, "id");

  const consultDb = await Platforms.findAll({});
  if (consultDb.length === 0) {
    await Platforms.bulkCreate(arrayFiltrado);
  }
  return arrayFiltrado;
};

module.exports = { platfor };
