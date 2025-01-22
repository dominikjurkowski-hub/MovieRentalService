const express = require("express");
const db = require("../database");

const router = express.Router();

// Dodawanie opinii
router.post("/", async (req, res) => {
    const {movieId, name, rating, text, date} = req.body;
    //movieId, userId,
    try {
        await db("reviews").insert({movieId, name, rating, text, date});
        res.status(201).json({message: "Review added successfully"});
    } catch (error) {
        console.log("Inserting review with data:", { movieId, name, rating, text, date });
        res.status(400).json({error: "Error adding review", details: error.message});
    }
});

// Pobieranie opinii dla konkretnego filmu
router.get("/:movieId", async (req, res) => {
    const {movieId} = req.params;

    try {
        const reviews = await db("reviews").where({movieId});
        res.json(reviews);
    } catch (error) {
        res.status(500).json({error: "Error fetching reviews", details: error.message});
    }
});

module.exports = router;
