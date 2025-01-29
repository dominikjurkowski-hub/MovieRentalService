
import jwt from 'jsonwebtoken';
import db from "../db/db.js";

const SECRET_KEY = 'your-secret-key';

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};


