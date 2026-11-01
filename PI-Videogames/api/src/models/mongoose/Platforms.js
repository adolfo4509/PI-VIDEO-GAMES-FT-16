const mongoose = require("mongoose");

const platformsSchema = new mongoose.Schema(
  {
    id: Number,
    name: {
      type: String,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Platforms", platformsSchema);
