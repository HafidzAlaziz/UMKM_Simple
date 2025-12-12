import { Router } from 'express';
import { getBrands, getBrandById } from '../controllers/brand.controller';

const router = Router();

router.get('/', getBrands);
router.get('/:id', getBrandById);

export default router;
