const router = require("express").Router();
require("dotenv").config();

let Album = require("../models/album.model");

router.route("/").get((req, res) => {
    Album.find()
        .then(albums => res.json(albums))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const email = req.body.email;
    const listened = false;
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;

    const newAlbum = new Album({
        email,
        listened,
        title,
        artist,
        genre
    });

    newAlbum.save()
        .then(() => res.json("Album added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Album.findById(req.params.id)
        .then(album => res.json(album))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Album.findByIdAndDelete(req.params.id)
        .then(() => res.json("Album deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Album.findById(req.params.id)
        .then(album => {
            album.email = req.body.email;
            album.listened = req.body.listened;
            album.title = req.body.title;
            album.artist = req.body.artist;
            album.genre = req.body.genre;

            album.save()
                .then(() => res.json("Album updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;