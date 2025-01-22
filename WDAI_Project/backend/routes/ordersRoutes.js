const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const router = express.Router();

// Tworzenie zamówienia
router.post("/", async (req, res) => {
    const { userId, movieIds, totalPrice } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newOrder = new Order({
            user: userId,
            movies: movieIds,
            totalPrice,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Pobieranie historii zamówień użytkownika
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate("movies");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Aktualizacja statusu zamówienia
router.put("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = req.body.status || order.status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
