const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Genres", genresSchema);
