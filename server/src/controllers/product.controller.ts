import { Request, Response } from 'express';
import prisma from '../prisma';

// Helper to parse images JSON string to array
const parseProduct = (product: any) => {
    if (!product) return null;
    return {
        ...product,
        images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        price: Number(product.price) // Convert Decimal to number
    };
};

const parseProducts = (products: any[]) => {
    return products.map(parseProduct);
};

// Get all products with filtering, sorting, and pagination
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            search,
            categoryId,
            brandId,
            minPrice,
            maxPrice,
            sort = 'newest',
            page = 1,
            limit = 12
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Build filter object
        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: 'insensitive' } },
                { description: { contains: String(search), mode: 'insensitive' } },
            ];
        }

        if (categoryId) {
            where.categoryId = String(categoryId);
        }

        if (brandId) {
            where.brandId = String(brandId);
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = Number(minPrice);
            if (maxPrice) where.price.lte = Number(maxPrice);
        }

        // Build sort object
        let orderBy: any = {};
        switch (sort) {
            case 'price_asc':
                orderBy = { price: 'asc' };
                break;
            case 'price_desc':
                orderBy = { price: 'desc' };
                break;
            case 'popular':
                // Fallback to views or ordered count if available, for now newest
                orderBy = { createdAt: 'desc' }; // TODO: Add popularity logic
                break;
            case 'newest':
            default:
                orderBy = { createdAt: 'desc' };
                break;
        }

        const [products, total] = await prisma.$transaction([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limitNumber,
                include: {
                    category: true,
                    brand: true,
                }
            }),
            prisma.product.count({ where })
        ]);

        res.json({
            data: parseProducts(products),
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber)
            }
        });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            where: { featured: true },
            take: 8,
            include: { category: true, brand: true }
        });
        res.json(parseProducts(products));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured products' });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                brand: true,
                variants: true,
                reviews: {
                    include: { user: { select: { name: true } } },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json(parseProduct(product));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

// Create Product (Admin) - Placeholder logic for now
export const createProduct = async (req: Request, res: Response) => {
    // Implementation for admin
    res.status(501).json({ message: 'Not implemented yet' });
};
