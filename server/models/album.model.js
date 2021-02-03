const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    email: { type: String, required: true },
    listened: { type: Boolean, required: true, default: false },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
