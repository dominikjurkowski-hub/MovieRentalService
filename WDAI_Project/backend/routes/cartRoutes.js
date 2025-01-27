import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.use(authenticate); // Wymagaj autoryzacji dla wszystkich endpointów koszyka

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.delete('/cart/:movieId', removeFromCart);


export default router;