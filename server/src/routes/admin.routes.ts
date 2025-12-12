import { Router } from 'express';
import {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/admin.controller';

const router = Router();

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);

// Product management
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
