const { Image, Videogame } = require("../db");
const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    const { id } = req.query;
    callback(null, "../client/src/assets/imageVideogame/");
  },
  filename: (req, file, callback) => {
    const { image_Videogame } = req.query;
    const ext = file.mimetype.split("/")[1];
    const nombre = file.originalname;
    callback(null, `img-Videogame-${image_Videogame}.${nombre}`);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fieldSize: 1000000 },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

exports.uploadImage2 = upload.single("img");

exports.createImage = async (req, res, next) => {
  try {
    const { image_Videogame } = req.query;
    const namefile = req.file.originalname;

    const name = `img-Videogame-${image_Videogame}.${namefile}`;
    const imgInsert = await Image.create(
      {
        name,
        image_Videogame,
      },
      { include: [Videogame] }
    );

    res.json(imgInsert);
  } catch (error) {
    next(error);
  }
};

//module.exports = createImage, uploadImage2;
