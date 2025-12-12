import express from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import categoryRoutes from './category.routes';
import brandRoutes from './brand.routes';
import adminRoutes from './admin.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/admin', adminRoutes);

export default router;
