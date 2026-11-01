const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema(
  {
    id: Number,
    name: {
      type: String,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Genres", genresSchema);
