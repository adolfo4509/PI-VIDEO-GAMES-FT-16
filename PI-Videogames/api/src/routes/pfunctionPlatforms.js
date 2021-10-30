const { Platforms } = require("../db");
const { apiInfo } = require("./functions");

const platfor = async () => {
  const plataformas = await apiInfo();
  const plat = plataformas.map((e) => e.platforms).flat();
  const temp = plat.map((e) => e.platform);
  const plataformaFilter = temp.map((e) => e.name);
  const filteredArray = plataformaFilter.filter((ele, pos) => {
    return plataformaFilter.indexOf(ele) == pos;
  });

  let platf = filteredArray.map((e) => {
    return { name: e };
  });

  const infoPlatfor = platf.map((e) => {
    return { name: e.name };
  });

  const consultDb = await Platforms.findAll();
  if (consultDb.length === 0) {
    await Platforms.bulkCreate(infoPlatfor);
  }
  return consultDb;
};

module.exports = { platfor };
