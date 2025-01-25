// backend/controllers/reviewController.js
import db from '../db/db.js';

// Pobierz opinie dla danego filmu
export const getReviews = (req, res) => {
    const { movieId } = req.params;
    db.all('SELECT * FROM reviews WHERE movieId = ?', [movieId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Dodaj nową opinię
export const addReview = (req, res) => {
    const { movieId, name, rating, text, date } = req.body;
    const sql = 'INSERT INTO reviews (movieId, name, rating, text, date) VALUES (?, ?, ?, ?, ?)';
    const params = [movieId, name, rating, text, date];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
};