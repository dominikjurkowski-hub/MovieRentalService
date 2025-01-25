import db from '../db/db.js';

class Cart {
    static async addToCart(userId, movie) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO cart (userId, movieId, title, image) VALUES (?, ?, ?, ?)',
                [userId, movie.id, movie.title, movie.image],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
    }

    static async getCart(userId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM cart WHERE userId = ?', [userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static async removeFromCart(userId, movieId) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM cart WHERE userId = ? AND movieId = ?',
                [userId, movieId],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        });
    }
}

export default Cart;