// backend/db/db.js
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./reviews.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Utwórz tabelę reviews, jeśli nie istnieje
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movieId TEXT,
            name TEXT,
            rating INTEGER,
            text TEXT,
            date TEXT
        )
    `);
});

export default db;