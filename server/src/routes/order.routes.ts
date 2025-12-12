import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
} from '../controllers/order.controller';

const router = express.Router();

// Public routes
router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.get('/:id', getOrderById);

// Admin routes (will add auth middleware later)
router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;
