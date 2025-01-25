// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Użyj routów
app.use('/api/reviews', reviewRoutes);

// Uruchom serwer
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});