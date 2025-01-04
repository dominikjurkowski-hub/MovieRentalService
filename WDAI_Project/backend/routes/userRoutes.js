import express from 'express';
//import cors from 'cors';
const router = express.Router();

// Prosta trasa zwracająca użytkowników
router.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Jan Kowalski' },
        { id: 2, name: 'Anna Nowak' }
    ]);
});

export default router;
