import { Request, Response } from 'express';
import prisma from '../prisma';

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands = await prisma.brand.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands' });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const brand = await prisma.brand.findUnique({
            where: { id },
            include: {
                products: {
                    take: 12,
                    include: {
                        category: true,
                        brand: true
                    }
                }
            }
        });

        if (!brand) {
            res.status(404).json({ message: 'Brand not found' });
            return;
        }

        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brand' });
    }
};
