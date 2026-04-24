const mongoose = require("mongoose");

const platformsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Platforms", platformsSchema);
