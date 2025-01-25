import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./reviews.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Utwórz tabele, jeśli nie istnieją
db.serialize(() => {
    // Tabela users
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created or already exists');
        }
    });

    // Tabela cart
    db.run(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            movieId TEXT,
            title TEXT,
            image TEXT,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating cart table:', err);
        } else {
            console.log('Cart table created or already exists');
        }
    });

    // Tabela reviews (istniejąca)
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movieId TEXT,
            name TEXT,
            rating INTEGER,
            text TEXT,
            date TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating reviews table:', err);
        } else {
            console.log('Reviews table created or already exists');
        }
    });
});

export default db;