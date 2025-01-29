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
            IDcart INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            id INTEGER,
            url TEXT,
            imdb_code TEXT,
            title TEXT,
            title_english TEXT,
            title_long TEXT,
            slug TEXT,
            year INTEGER,
            rating REAL,
            runtime INTEGER,
            genres TEXT,
            summary TEXT,
            description_full TEXT,
            yt_trailer_code TEXT,
            language TEXT,
            mpa_rating TEXT,
            background_image TEXT,
            small_cover_image TEXT,
            medium_cover_image TEXT,
            large_cover_image TEXT,
            Director TEXT,
            Plot TEXT,
            Awards TEXT,
            price REAL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating cart table:', err);
        } else {
            console.log('Cart table created or already exists');
        }
    });

    // Tabela reviews (dodana kolumna userId)
    db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            movieId TEXT,
            name TEXT,
            rating INTEGER,
            text TEXT,
            date TEXT,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id)
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
