const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Rejestracja użytkownika
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db("users").insert({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error registering user", details: error.message });
    }
});

// Logowanie użytkownika
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db("users").where({ email }).first();
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
});

module.exports = router;
