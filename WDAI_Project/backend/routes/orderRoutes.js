import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {addAnOrder, getOrders} from "../controllers/orderController.js";
const router = express.Router();

router.post('/orders', authenticate, addAnOrder);
router.get('/orders', authenticate, getOrders);

export default router;