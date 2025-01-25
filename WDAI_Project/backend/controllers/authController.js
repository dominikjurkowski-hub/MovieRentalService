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
        res.status(500).json({ error: err.message });
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