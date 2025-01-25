// backend/routes/reviewRoutes.js
import express from 'express';
import { getReviews, addReview } from '../controllers/reviewController.js';

const router = express.Router();

// Pobierz opinie dla danego filmu
router.get('/:movieId', getReviews);

// Dodaj nową opinię
router.post('/', addReview);

export default router;