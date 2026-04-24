const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
    released: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    background_image: {
      type: String,
    },
    createInDb: {
      type: Boolean,
      default: true,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genres",
      },
    ],
    platforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platforms",
      },
    ],
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
  },
  { timestamps: false }
);

module.exports = mongoose.model("Videogame", videogameSchema);
