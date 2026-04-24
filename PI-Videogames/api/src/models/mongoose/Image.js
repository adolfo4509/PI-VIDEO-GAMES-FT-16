const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videogame: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videogame",
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Image", imageSchema);
