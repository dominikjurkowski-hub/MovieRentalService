import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Klucz do podpisywania tokenów JWT

// Funkcja rejestracji
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userId = await User.create(email, password);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        if (err.message === 'User already exists') {
            res.status(409).json({ error: 'User already exists' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Funkcja logowania
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserData = async (req, res) => {
    try {
        const userId = req.user.userId;  // Odczytujemy userId z middleware
        const user = await User.findById(userId);  // Funkcja findById w modelu User

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ id: user.id, email: user.email });  // Zwracamy dane użytkownika
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
};