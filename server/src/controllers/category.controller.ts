import { Request, Response } from 'express';
import prisma from '../prisma';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
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

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category' });
    }
};
