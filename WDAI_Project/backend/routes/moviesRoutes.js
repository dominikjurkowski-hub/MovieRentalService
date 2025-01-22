const express = require("express");
const Movie = require("../models/Movie");
const router = express.Router();

// Pobieranie wszystkich filmów
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Pobieranie filmu po ID
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodawanie nowego filmu
router.post("/", async (req, res) => {
    const { title, year, rating, genres, coverImage, description, imdbCode } = req.body;
    try {
        const newMovie = new Movie({
            title,
            year,
            rating,
            genres,
            coverImage,
            description,
            imdbCode,
        });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Usuwanie filmu
router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        await movie.remove();
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
