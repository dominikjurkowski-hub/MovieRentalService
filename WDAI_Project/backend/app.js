import express from 'express';
import cors from 'cors';
const app = express();
import userRoutes from './routes/userRoutes.js';

app.use('/api', userRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Testowa trasa
app.get('/api', (req, res) => {
    res.json({ message: 'Backend działa!' });
});

// Uruchom serwer
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
