const mongoose = require("mongoose");
const { schema } = require("./user.model");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    username: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: false },
}, {
    timestamps: true
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;