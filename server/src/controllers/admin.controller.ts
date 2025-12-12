import { Request, Response } from 'express';
import prisma from '../prisma';

// Get dashboard stats
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const [totalOrders, totalUsers, totalProducts, recentOrders] = await Promise.all([
            prisma.order.count(),
            prisma.user.count(),
            prisma.product.count(),
            prisma.order.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: { email: true, name: true }
                    }
                }
            })
        ]);

        const totalRevenue = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } }
        });

        res.json({
            totalOrders,
            totalUsers,
            totalProducts,
            totalRevenue: Number(totalRevenue._sum.totalAmount || 0),
            recentOrders: recentOrders.map(order => ({
                ...order,
                totalAmount: Number(order.totalAmount),
                shippingAddress: JSON.parse(order.shippingAddress)
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
};

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role' });
    }
};

// Create product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, images, categoryId, brandId } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                images: JSON.stringify(images),
                categoryId,
                brandId,
                featured: false
            },
            include: {
                category: true,
                brand: true
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, images, categoryId, brandId, isFeatured } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                stock,
                images: images ? JSON.stringify(images) : undefined,
                categoryId,
                brandId,
                featured: isFeatured
            },
            include: {
                category: true,
                brand: true
            }
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};
